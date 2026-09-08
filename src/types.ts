export interface MCQQuestion {
  type: 'mcq';
  question: string;
  options: [string, string] | [string, string, string];
  correctIndex: 0 | 1 | 2;
  explanation: string;
  validated?: boolean;
}

export interface NumberQuestion {
  type: 'number';
  question: string;
  target: number;
  metricUnit?: string;
  imperialDisplay?: string;
  explanation: string;
  validated?: boolean;
}

export type Question = MCQQuestion | NumberQuestion;

export type ReviewVerdict = 'ready_for_human_review' | 'needs_review' | 'blocked';
export type QuestionReviewVerdict = 'pass' | 'review' | 'replace';
export type FactualStatus = 'supported' | 'uncertain' | 'contradicted' | 'not_checked';
export type IssueSeverity = 'low' | 'medium' | 'high';

export interface QualityScores {
  factuality: number;
  clarity: number;
  fairness: number;
  distractors: number;
  explanation: number;
  value: number;
}

export interface QualityIssue {
  code: string;
  severity: IssueSeverity;
  message: string;
  questionIndexes: number[];
}

export interface LocalQualityReport {
  score: number;
  issues: QualityIssue[];
  nearDuplicateGroups: number[][];
  timeSensitiveQuestionIndexes: number[];
}

export interface EvidenceSource {
  id: string;
  title: string;
  url: string;
}

export interface SuggestedQuestionRepair {
  question: string;
  explanation: string;
  options?: [string, string] | [string, string, string];
  correctIndex?: 0 | 1 | 2;
  target?: number;
  metricUnit?: string;
  imperialDisplay?: string;
}

export interface AgentQuestionReview {
  questionIndex: number;
  verdict: QuestionReviewVerdict;
  factualStatus: FactualStatus;
  confidence: 'low' | 'medium' | 'high';
  scores: QualityScores;
  summary: string;
  issues: string[];
  sourceIds: string[];
  evidenceSummary?: string;
  suggestedRepair?: SuggestedQuestionRepair;
}

export interface AgentValidationReport {
  schema: 'quiz-agent-review/v1';
  quizId: string;
  reviewedAt: string;
  verdict: ReviewVerdict;
  mode: 'editorial' | 'evidence';
  model: string;
  score: number;
  scores: QualityScores;
  summary: string;
  strengths: string[];
  packIssues: string[];
  structuralPassed: boolean;
  evidenceCoverage: {
    checked: number;
    supported: number;
    uncertain: number;
    contradicted: number;
    total: number;
  };
  localReport: LocalQualityReport;
  questions: AgentQuestionReview[];
  sources: EvidenceSource[];
  searchEntryPoints: string[];
  warnings: string[];
}

export interface QuizDataset {
  id: string;
  theme: string;
  title: string;
  description: string;
  category?: string;
  difficulty?: 'easy' | 'moderate' | 'challenging';
  answerChoiceCount?: 2 | 3;
  questions: Question[];
  createdAt: string;
  validated?: boolean;
  lastValidated?: string;
  agentValidation?: AgentValidationReport;
}

export interface QuestionAnswerState {
  selectedOption?: 0 | 1 | 2;
  guess?: number;
  isChecked?: boolean;
  isCorrect?: boolean;
  offBy?: number;
  closerSpan?: [number, number];
  direction?: 'higher' | 'lower' | 'exact';
  answeredAt?: number;
}

export interface RuleCheckResult {
  ruleNumber: number;
  title: string;
  passed: boolean;
  details?: string;
}

export interface ValidationReport {
  isValid: boolean;
  totalQuestions: number;
  mcqCount: number;
  numberCount: number;
  cycleCount: number;
  isPatternStrict: boolean;
  positionBalance: { A: number; B: number; C: number };
  bracketViolations: string[];
  arithmeticViolations: string[];
  numberProblemViolations: string[];
  ruleChecks: RuleCheckResult[];
  errors: string[];
  warnings: string[];
}
