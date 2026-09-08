import {
  AgentQuestionReview,
  AgentValidationReport,
  EvidenceSource,
  FactualStatus,
  LocalQualityReport,
  QualityScores,
  QuizDataset,
  SuggestedQuestionRepair,
  ValidationReport,
} from '../types';

export interface EditorialFinding {
  questionIndex: number;
  verdict: 'pass' | 'review' | 'replace';
  factualStatus: 'likely_supported' | 'uncertain' | 'likely_incorrect';
  confidence: 'low' | 'medium' | 'high';
  scores: QualityScores;
  summary: string;
  issues: string[];
}

export interface EvidenceFinding {
  questionIndex: number;
  factualStatus: 'supported' | 'uncertain' | 'contradicted';
  confidence: 'low' | 'medium' | 'high';
  evidenceSummary: string;
  citationTitles: string[];
  sourceIds: string[];
  suggestedRepair?: SuggestedQuestionRepair;
}

export interface PackCritique {
  scores: QualityScores;
  summary: string;
  strengths: string[];
  issues: string[];
}

export interface AgentReportInput {
  dataset: QuizDataset;
  mode: 'editorial' | 'evidence';
  model: string;
  structuralReport: ValidationReport;
  localReport: LocalQualityReport;
  editorialFindings: EditorialFinding[];
  evidenceFindings: EvidenceFinding[];
  packCritique: PackCritique;
  sources: EvidenceSource[];
  searchEntryPoints?: string[];
  warnings?: string[];
}

const SCORE_KEYS: Array<keyof QualityScores> = [
  'factuality',
  'clarity',
  'fairness',
  'distractors',
  'explanation',
  'value',
];

function clampFive(value: unknown, fallback = 3): number {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return fallback;
  return Math.max(1, Math.min(5, Math.round(numeric * 10) / 10));
}

function normalizeScores(scores?: Partial<QualityScores>): QualityScores {
  return {
    factuality: clampFive(scores?.factuality),
    clarity: clampFive(scores?.clarity),
    fairness: clampFive(scores?.fairness),
    distractors: clampFive(scores?.distractors),
    explanation: clampFive(scores?.explanation),
    value: clampFive(scores?.value),
  };
}

function averageScores(scoreSets: QualityScores[]): QualityScores {
  if (scoreSets.length === 0) return normalizeScores();
  return Object.fromEntries(
    SCORE_KEYS.map((key) => [
      key,
      Math.round((scoreSets.reduce((sum, scores) => sum + scores[key], 0) / scoreSets.length) * 10) / 10,
    ]),
  ) as unknown as QualityScores;
}

function scoreToHundred(scores: QualityScores): number {
  const average = SCORE_KEYS.reduce((sum, key) => sum + scores[key], 0) / SCORE_KEYS.length;
  return Math.round(average * 20);
}

function mapEditorialStatus(status: EditorialFinding['factualStatus']): FactualStatus {
  if (status === 'likely_incorrect') return 'contradicted';
  if (status === 'uncertain') return 'uncertain';
  return 'not_checked';
}

export function buildAgentValidationReport(input: AgentReportInput): AgentValidationReport {
  const editorialByIndex = new Map(input.editorialFindings.map((finding) => [finding.questionIndex, finding]));
  const evidenceByIndex = new Map(input.evidenceFindings.map((finding) => [finding.questionIndex, finding]));

  const questions: AgentQuestionReview[] = input.dataset.questions.map((_, questionIndex) => {
    const editorial = editorialByIndex.get(questionIndex);
    const evidence = evidenceByIndex.get(questionIndex);
    const localIssues = input.localReport.issues
      .filter((issue) => issue.questionIndexes.includes(questionIndex))
      .map((issue) => issue.message);
    const editorialScores = normalizeScores(editorial?.scores);
    const factualStatus: FactualStatus = evidence?.factualStatus
      ?? (editorial ? mapEditorialStatus(editorial.factualStatus) : 'not_checked');

    if (factualStatus === 'supported') editorialScores.factuality = Math.max(4, editorialScores.factuality);
    if (factualStatus === 'uncertain') editorialScores.factuality = Math.min(3, editorialScores.factuality);
    if (factualStatus === 'contradicted') editorialScores.factuality = 1;

    const issues = [...new Set([...(editorial?.issues ?? []), ...localIssues])];
    const hasHighLocalIssue = input.localReport.issues.some(
      (issue) => issue.severity === 'high' && issue.questionIndexes.includes(questionIndex),
    );
    const verdict = factualStatus === 'contradicted' || editorial?.verdict === 'replace' || hasHighLocalIssue
      ? 'replace'
      : factualStatus === 'uncertain' || editorial?.verdict === 'review' || issues.length > 0
        ? 'review'
        : 'pass';

    return {
      questionIndex,
      verdict,
      factualStatus,
      confidence: evidence?.confidence ?? editorial?.confidence ?? 'low',
      scores: editorialScores,
      summary: evidence?.evidenceSummary || editorial?.summary || 'No agent finding was returned for this question.',
      issues,
      sourceIds: evidence?.sourceIds ?? [],
      evidenceSummary: evidence?.evidenceSummary,
      suggestedRepair: evidence?.suggestedRepair,
    };
  });

  const evidenceCoverage = {
    checked: questions.filter((question) => question.factualStatus !== 'not_checked').length,
    supported: questions.filter((question) => question.factualStatus === 'supported').length,
    uncertain: questions.filter((question) => question.factualStatus === 'uncertain').length,
    contradicted: questions.filter((question) => question.factualStatus === 'contradicted').length,
    total: questions.length,
  };

  const questionScores = questions.map((question) => question.scores);
  const scores = averageScores([...questionScores, normalizeScores(input.packCritique.scores)]);
  const localPenalty = Math.max(0, (100 - input.localReport.score) * 0.2);
  const score = Math.max(0, Math.round(scoreToHundred(scores) - localPenalty));
  const hasBlockingQuestion = questions.some((question) => question.verdict === 'replace');
  const hasReviewQuestion = questions.some((question) => question.verdict === 'review');
  const fullEvidence = input.mode === 'evidence'
    && evidenceCoverage.checked === evidenceCoverage.total
    && evidenceCoverage.supported === evidenceCoverage.total;

  const verdict = !input.structuralReport.isValid || hasBlockingQuestion
    ? 'blocked'
    : !fullEvidence || hasReviewQuestion || score < 85
      ? 'needs_review'
      : 'ready_for_human_review';

  const warnings = [
    'Agent review is decision support, not automatic publication approval.',
    ...(input.mode === 'editorial'
      ? ['Editorial mode does not use web evidence and must not be described as a fact-check.']
      : []),
    ...(input.warnings ?? []),
  ];

  return {
    schema: 'quiz-agent-review/v1',
    quizId: input.dataset.id,
    reviewedAt: new Date().toISOString(),
    verdict,
    mode: input.mode,
    model: input.model,
    score,
    scores,
    summary: input.packCritique.summary,
    strengths: input.packCritique.strengths,
    packIssues: input.packCritique.issues,
    structuralPassed: input.structuralReport.isValid,
    evidenceCoverage,
    localReport: input.localReport,
    questions,
    sources: input.sources,
    searchEntryPoints: input.searchEntryPoints ?? [],
    warnings,
  };
}
