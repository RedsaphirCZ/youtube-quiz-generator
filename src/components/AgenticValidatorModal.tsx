import React, { useEffect, useMemo, useState } from 'react';
import DOMPurify from 'dompurify';
import {
  AlertTriangle,
  Bot,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleAlert,
  Download,
  ExternalLink,
  FileJson,
  Globe2,
  Loader2,
  Play,
  RefreshCw,
  Save,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Wrench,
  X,
  XCircle,
} from 'lucide-react';
import {
  AgentQuestionReview,
  AgentValidationReport,
  QualityScores,
  Question,
  QuizDataset,
  ReviewVerdict,
  ValidationReport,
} from '../types';
import { auditQuizQuality } from '../lib/qualityValidator';
import { saveQuizToLibrary } from '../lib/quizStorage';
import { validateQuizDataset } from '../lib/validator';
import { isStaticDeployment } from '../lib/runtimeMode';

interface AgenticValidatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadAndPlay: (quiz: QuizDataset) => void;
  currentQuiz: QuizDataset;
}

type Tab = 'overview' | 'questions' | 'json';
type QuestionFilter = 'all' | 'flagged' | 'uncertain' | 'contradicted';

const SCORE_LABELS: Array<{ key: keyof QualityScores; label: string }> = [
  { key: 'factuality', label: 'Factuality' },
  { key: 'clarity', label: 'Clarity' },
  { key: 'fairness', label: 'Fairness' },
  { key: 'distractors', label: 'Answers' },
  { key: 'explanation', label: 'Explanations' },
  { key: 'value', label: 'Learning value' },
];

function expectedCyclesFor(questionCount: number): number | undefined {
  if (questionCount === 20) return 4;
  if (questionCount > 0 && questionCount % 6 === 0) return questionCount / 6;
  return undefined;
}

function validationFor(quiz: QuizDataset): ValidationReport {
  return validateQuizDataset(quiz.questions, expectedCyclesFor(quiz.questions.length));
}

function verdictPresentation(verdict: ReviewVerdict) {
  if (verdict === 'ready_for_human_review') {
    return {
      label: 'Ready for human review',
      className: 'bg-[#e8f5e9] text-[#216b27] border-[#a5d6a7]',
      icon: CheckCircle2,
    };
  }
  if (verdict === 'blocked') {
    return {
      label: 'Blocked — repair required',
      className: 'bg-[#ffebee] text-[#b4232b] border-[#ef9a9a]',
      icon: XCircle,
    };
  }
  return {
    label: 'Needs editorial review',
    className: 'bg-[#fff8e1] text-[#7c5c0a] border-[#d7bd68]',
    icon: AlertTriangle,
  };
}

function questionVerdictClass(review: AgentQuestionReview): string {
  if (review.verdict === 'replace') return 'bg-[#ffebee] text-[#b4232b] border-[#ef9a9a]';
  if (review.verdict === 'review') return 'bg-[#fff8e1] text-[#7c5c0a] border-[#d7bd68]';
  return 'bg-[#e8f5e9] text-[#216b27] border-[#a5d6a7]';
}

function questionAnswer(question: Question): string {
  if (question.type === 'mcq') return question.options[question.correctIndex];
  return `${question.target.toLocaleString()} ${question.metricUnit || ''}`.trim();
}

function downloadJson(filename: string, data: unknown): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export const AgenticValidatorModal: React.FC<AgenticValidatorModalProps> = ({
  isOpen,
  onClose,
  onLoadAndPlay,
  currentQuiz,
}) => {
  const [workingQuiz, setWorkingQuiz] = useState<QuizDataset>(currentQuiz);
  const [agentReport, setAgentReport] = useState<AgentValidationReport | null>(currentQuiz.agentValidation ?? null);
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [mode, setMode] = useState<'editorial' | 'evidence'>('evidence');
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [jsonInput, setJsonInput] = useState(JSON.stringify(currentQuiz, null, 2));
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [questionFilter, setQuestionFilter] = useState<QuestionFilter>('flagged');
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    setWorkingQuiz(currentQuiz);
    setAgentReport(currentQuiz.agentValidation ?? null);
    setJsonInput(JSON.stringify(currentQuiz, null, 2));
    setJsonError(null);
    setError(null);
    setSaved(false);
    setExpandedQuestion(null);
  }, [isOpen, currentQuiz]);

  const structuralReport = useMemo(() => validationFor(workingQuiz), [workingQuiz]);
  const localReport = useMemo(() => auditQuizQuality(workingQuiz), [workingQuiz]);

  if (!isOpen) return null;

  const runAgentReview = async () => {
    if (isStaticDeployment) {
      setError('Online agent review is disabled on the static website because it has no private API server. Local format and quality checks above still run in your browser.');
      return;
    }
    setIsRunning(true);
    setError(null);
    setSaved(false);
    try {
      const response = await fetch('/api/validate-quiz-agentic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quiz: workingQuiz, mode }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.error || `Review server returned HTTP ${response.status}.`);
      const report = payload as AgentValidationReport;
      setAgentReport(report);
      setWorkingQuiz((quiz) => ({ ...quiz, agentValidation: report }));
      setJsonInput(JSON.stringify({ ...workingQuiz, agentValidation: report }, null, 2));
      setActiveTab('overview');
      setQuestionFilter('flagged');
    } catch (reviewError) {
      setError(reviewError instanceof Error ? reviewError.message : 'Agent review failed.');
    } finally {
      setIsRunning(false);
    }
  };

  const useWorkingCopy = () => {
    onLoadAndPlay(workingQuiz);
    onClose();
  };

  const saveWorkingCopy = () => {
    saveQuizToLibrary(workingQuiz);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  };

  const applySuggestedRepair = (review: AgentQuestionReview) => {
    const repair = review.suggestedRepair;
    if (!repair) return;
    const original = workingQuiz.questions[review.questionIndex];
    let replacement: Question;
    if (original.type === 'mcq' && repair.options && repair.correctIndex !== undefined) {
      replacement = {
        type: 'mcq',
        question: repair.question,
        options: repair.options,
        correctIndex: repair.correctIndex,
        explanation: repair.explanation,
        validated: false,
      };
    } else if (original.type === 'number' && repair.target !== undefined) {
      replacement = {
        type: 'number',
        question: repair.question,
        target: repair.target,
        metricUnit: repair.metricUnit,
        imperialDisplay: repair.imperialDisplay,
        explanation: repair.explanation,
        validated: false,
      };
    } else {
      return;
    }

    const questions = [...workingQuiz.questions];
    questions[review.questionIndex] = replacement;
    const updatedQuiz = { ...workingQuiz, questions, agentValidation: undefined };
    setWorkingQuiz(updatedQuiz);
    setAgentReport(null);
    setJsonInput(JSON.stringify(updatedQuiz, null, 2));
    setActiveTab('questions');
    setError('Repair applied to this working copy. Run the agents again before treating it as reviewed.');
  };

  const parseJsonEditor = () => {
    setJsonError(null);
    try {
      const parsed = JSON.parse(jsonInput) as QuizDataset;
      if (!parsed || !Array.isArray(parsed.questions) || parsed.questions.length === 0) {
        throw new Error('The JSON must contain a non-empty questions array.');
      }
      const normalized: QuizDataset = {
        ...parsed,
        id: parsed.id || `review-copy-${Date.now()}`,
        title: parsed.title || parsed.theme || 'Untitled Quiz',
        theme: parsed.theme || parsed.title || 'Untitled Quiz',
        description: parsed.description || 'Quiz dataset loaded for review.',
        createdAt: parsed.createdAt || new Date().toISOString(),
        agentValidation: undefined,
      };
      setWorkingQuiz(normalized);
      setAgentReport(null);
      setJsonInput(JSON.stringify(normalized, null, 2));
      setActiveTab('overview');
    } catch (parseError) {
      setJsonError(parseError instanceof Error ? parseError.message : 'Invalid JSON.');
    }
  };

  const filteredReviews = (agentReport?.questions ?? []).filter((review) => {
    if (questionFilter === 'flagged') return review.verdict !== 'pass';
    if (questionFilter === 'uncertain') return review.factualStatus === 'uncertain' || review.factualStatus === 'not_checked';
    if (questionFilter === 'contradicted') return review.factualStatus === 'contradicted';
    return true;
  });
  const sourceMap = new Map((agentReport?.sources ?? []).map((source) => [source.id, source]));
  const verdict = agentReport ? verdictPresentation(agentReport.verdict) : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/65 backdrop-blur-xs">
      <div className="bg-white border border-[#d7cec0] rounded-2xl w-full max-w-6xl h-[96vh] sm:h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        <div className="px-4 py-3.5 sm:px-6 sm:py-4 border-b border-[#e0d8cb] bg-[#faf8f4] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#8b1e1e] text-white flex items-center justify-center shrink-0">
              <SearchCheck className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base sm:text-xl font-black text-[#8b1e1e]">Agentic Quiz Review</h2>
                {agentReport && verdict && (
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] sm:text-xs font-bold ${verdict.className}`}>
                    <verdict.icon className="w-3 h-3" />
                    {verdict.label}
                  </span>
                )}
              </div>
              <p className="text-xs text-[#6b635b] truncate">{workingQuiz.title} · {workingQuiz.questions.length} questions</p>
            </div>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-lg flex items-center justify-center text-[#6b635b] hover:bg-[#eee8dc] hover:text-[#8b1e1e] cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-4 sm:px-6 pt-2 bg-[#fbf9f5] border-b border-[#e0d8cb] flex gap-1 overflow-x-auto shrink-0">
          {([
            ['overview', 'Overview', ShieldCheck],
            ['questions', `Questions${agentReport ? ` (${agentReport.questions.filter((question) => question.verdict !== 'pass').length} flagged)` : ''}`, CircleAlert],
            ['json', 'Dataset JSON', FileJson],
          ] as const).map(([tab, label, Icon]) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 sm:px-4 py-2.5 border-b-2 text-xs sm:text-sm font-bold flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${activeTab === tab ? 'border-[#8b1e1e] text-[#8b1e1e]' : 'border-transparent text-[#6b635b] hover:text-[#2b2520]'}`}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </button>
          ))}
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 bg-white">
          {activeTab === 'overview' && (
            <div className="space-y-5">
              {!agentReport && (
                <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-4">
                  <section className="rounded-2xl border border-[#d8cdbd] bg-[#fcfaf6] p-5 space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.17em] text-[#8b1e1e]">Local preflight</p>
                        <h3 className="text-lg font-black text-[#2b2520] mt-1">
                          {structuralReport.isValid ? 'Format checks passed' : `${structuralReport.errors.length} format issue${structuralReport.errors.length === 1 ? '' : 's'}`}
                        </h3>
                        <p className="text-xs text-[#6b635b] mt-1">This proves structure—not factual accuracy.</p>
                      </div>
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-black border ${localReport.score >= 85 ? 'bg-[#e8f5e9] text-[#216b27] border-[#a5d6a7]' : 'bg-[#fff8e1] text-[#7c5c0a] border-[#d7bd68]'}`}>
                        {localReport.score}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <Metric label="Rules" value={`${structuralReport.ruleChecks.filter((rule) => rule.passed).length}/15`} />
                      <Metric label="Local flags" value={String(localReport.issues.length)} />
                      <Metric label="Changing facts" value={String(localReport.timeSensitiveQuestionIndexes.length)} />
                    </div>

                    {(structuralReport.errors.length > 0 || localReport.issues.length > 0) && (
                      <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                        {structuralReport.errors.slice(0, 6).map((item) => <IssueLine key={item} text={item} tone="red" />)}
                        {localReport.issues.slice(0, 8).map((issue) => <IssueLine key={`${issue.code}-${issue.message}`} text={issue.message} tone="amber" />)}
                      </div>
                    )}
                  </section>

                  <section className="rounded-2xl border-2 border-[#8b1e1e]/20 bg-[#fffdf9] p-5 space-y-4">
                    <div>
                      <div className="flex items-center gap-2 text-[#8b1e1e]">
                        <Sparkles className="w-5 h-5" />
                        <h3 className="font-black">Run the review team</h3>
                      </div>
                      <p className="text-xs leading-relaxed text-[#6b635b] mt-2">
                        The editorial critic checks every question, the investigator tests factual claims, and the pack editor judges variety, difficulty, and payoff.
                      </p>
                    </div>

                    <label className="block">
                      <span className="text-[10px] uppercase tracking-wider font-black text-[#6b635b]">Review depth</span>
                      <select
                        value={mode}
                        onChange={(event) => setMode(event.target.value as 'editorial' | 'evidence')}
                        disabled={isRunning || isStaticDeployment}
                        className="mt-1.5 w-full rounded-xl border-2 border-[#d8cdbd] bg-white px-3 py-2.5 text-sm font-bold outline-none focus:border-[#8b1e1e]"
                      >
                        <option value="evidence">Deep evidence review · every question</option>
                        <option value="editorial">Editorial scan · no web sources</option>
                      </select>
                    </label>

                    <div className="rounded-xl bg-[#f4efe6] p-3 text-[11px] leading-relaxed text-[#5f574f]">
                      {isStaticDeployment
                        ? 'Website mode runs the local preflight only. Use the private server version for Gemini-powered editorial or evidence review.'
                        : mode === 'evidence'
                        ? 'Sends this quiz to Gemini and uses billable Google Search grounding. Missing or unmapped evidence stays uncertain.'
                        : 'Cheaper and faster, but this is not a fact-check. All factual claims remain unverified.'}
                    </div>

                    <button
                      onClick={runAgentReview}
                      disabled={isRunning || isStaticDeployment}
                      className="w-full rounded-xl bg-[#8b1e1e] hover:bg-[#731818] text-white px-4 py-3 font-black text-sm flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
                    >
                      {isRunning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Bot className="w-4 h-4" />}
                      {isStaticDeployment ? 'Online review unavailable on website' : isRunning ? 'Agents are reviewing the pack…' : mode === 'evidence' ? 'Start deep agent review' : 'Start editorial scan'}
                    </button>
                    {isRunning && <p className="text-center text-[11px] text-[#6b635b]">A 20-question evidence pass can take a few minutes. Keep this window open.</p>}
                  </section>
                </div>
              )}

              {agentReport && verdict && (
                <>
                  <section className={`rounded-2xl border p-5 ${verdict.className}`}>
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="flex items-start gap-3 max-w-3xl">
                        <verdict.icon className="w-6 h-6 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.16em]">Deterministic judge</p>
                          <h3 className="text-lg sm:text-xl font-black mt-0.5">{verdict.label}</h3>
                          <p className="text-xs sm:text-sm leading-relaxed mt-1 opacity-90">{agentReport.summary}</p>
                        </div>
                      </div>
                      <div className="bg-white/80 border border-current/20 rounded-2xl px-5 py-3 text-center">
                        <span className="block text-3xl font-black">{agentReport.score}</span>
                        <span className="block text-[10px] uppercase font-bold">quality score</span>
                      </div>
                    </div>
                  </section>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <Metric label="Evidence supported" value={`${agentReport.evidenceCoverage.supported}/${agentReport.evidenceCoverage.total}`} />
                    <Metric label="Uncertain" value={String(agentReport.evidenceCoverage.uncertain + (agentReport.evidenceCoverage.total - agentReport.evidenceCoverage.checked))} />
                    <Metric label="Contradicted" value={String(agentReport.evidenceCoverage.contradicted)} />
                    <Metric label="Question flags" value={String(agentReport.questions.filter((question) => question.verdict !== 'pass').length)} />
                  </div>

                  <section className="rounded-2xl border border-[#e0d8cb] p-5">
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <h3 className="font-black text-[#2b2520]">Quality rubric</h3>
                      <span className="text-[10px] font-bold text-[#6b635b]">Model: {agentReport.model}</span>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3">
                      {SCORE_LABELS.map(({ key, label }) => (
                        <ScoreBar key={key} label={label} score={agentReport.scores[key]} />
                      ))}
                    </div>
                  </section>

                  <div className="grid md:grid-cols-2 gap-4">
                    <ListCard title="What works" items={agentReport.strengths} tone="green" empty="The critic did not record a clear strength." />
                    <ListCard title="Pack-level concerns" items={agentReport.packIssues} tone="amber" empty="No pack-level concern was returned." />
                  </div>

                  {agentReport.warnings.length > 0 && (
                    <section className="rounded-xl bg-[#f4efe6] border border-[#d8cdbd] p-4 space-y-1.5">
                      {agentReport.warnings.map((warning) => <IssueLine key={warning} text={warning} tone="neutral" />)}
                    </section>
                  )}

                  {agentReport.searchEntryPoints?.length > 0 && (
                    <section className="rounded-xl border border-[#d8cdbd] bg-white p-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <Globe2 className="w-4 h-4 text-[#185a9d]" />
                        <h3 className="text-xs font-black uppercase tracking-wider text-[#514a44]">Google Search suggestions</h3>
                      </div>
                      <div className="space-y-2">
                        {agentReport.searchEntryPoints.map((entryPoint, index) => (
                          <div
                            key={`${index}-${entryPoint.length}`}
                            className="overflow-x-auto"
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(entryPoint) }}
                          />
                        ))}
                      </div>
                    </section>
                  )}

                  <div className="flex items-center gap-2 flex-wrap">
                    <button onClick={() => setActiveTab('questions')} className="rounded-xl bg-[#8b1e1e] text-white px-4 py-2.5 text-sm font-black flex items-center gap-2 cursor-pointer">
                      <CircleAlert className="w-4 h-4" /> Review question findings
                    </button>
                    <button onClick={() => { setAgentReport(null); setWorkingQuiz((quiz) => ({ ...quiz, agentValidation: undefined })); }} className="rounded-xl border border-[#d8cdbd] px-4 py-2.5 text-sm font-bold flex items-center gap-2 cursor-pointer hover:border-[#8b1e1e]">
                      <RefreshCw className="w-4 h-4" /> Run a new review
                    </button>
                  </div>
                </>
              )}

              {error && (
                <div className="rounded-xl bg-[#fff4f0] border border-[#ef9a9a] p-3 text-xs text-[#9f272d] flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}
            </div>
          )}

          {activeTab === 'questions' && (
            <div className="space-y-4">
              {!agentReport ? (
                <div className="rounded-2xl border border-dashed border-[#cbbfae] p-10 text-center">
                  <Bot className="w-9 h-9 text-[#8b1e1e] mx-auto" />
                  <h3 className="font-black mt-3">No agent findings yet</h3>
                  <p className="text-xs text-[#6b635b] mt-1">Run a review from Overview to inspect questions individually.</p>
                  <button onClick={() => setActiveTab('overview')} className="mt-4 rounded-xl bg-[#8b1e1e] text-white px-4 py-2 text-sm font-bold cursor-pointer">Go to review setup</button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div>
                      <h3 className="font-black text-lg">Question findings</h3>
                      <p className="text-xs text-[#6b635b]">Repairs change only this working copy and clear the old report.</p>
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {(['all', 'flagged', 'uncertain', 'contradicted'] as QuestionFilter[]).map((filter) => (
                        <button
                          key={filter}
                          onClick={() => setQuestionFilter(filter)}
                          className={`px-3 py-1.5 rounded-full text-xs font-bold capitalize cursor-pointer ${questionFilter === filter ? 'bg-[#8b1e1e] text-white' : 'bg-[#f4efe6] text-[#6b635b] hover:bg-[#e8dfcf]'}`}
                        >
                          {filter}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    {filteredReviews.length === 0 && (
                      <div className="rounded-xl bg-[#f5fbf6] border border-[#a5d6a7] p-6 text-center text-sm font-bold text-[#216b27]">No questions match this filter.</div>
                    )}
                    {filteredReviews.map((review) => {
                      const question = workingQuiz.questions[review.questionIndex];
                      const isExpanded = expandedQuestion === review.questionIndex;
                      const sources = review.sourceIds.map((id) => sourceMap.get(id)).filter(Boolean);
                      return (
                        <article key={review.questionIndex} className="rounded-xl border border-[#ded4c3] overflow-hidden">
                          <button
                            onClick={() => setExpandedQuestion(isExpanded ? null : review.questionIndex)}
                            className="w-full text-left p-3.5 sm:p-4 flex items-start gap-3 hover:bg-[#fcfaf6] cursor-pointer"
                          >
                            <span className="w-8 h-8 rounded-lg bg-[#f4efe6] text-[#8b1e1e] flex items-center justify-center text-xs font-black shrink-0">{review.questionIndex + 1}</span>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2 flex-wrap mb-1">
                                <span className={`px-2 py-0.5 rounded-full border text-[10px] font-black uppercase ${questionVerdictClass(review)}`}>{review.verdict}</span>
                                <span className="text-[10px] font-bold uppercase text-[#6b635b]">{review.factualStatus.replace('_', ' ')}</span>
                                <span className="text-[10px] text-[#8b8177]">confidence: {review.confidence}</span>
                              </div>
                              <p className="text-sm font-bold text-[#2b2520] leading-snug">{question.question}</p>
                              <p className="text-xs text-[#6b635b] mt-1 truncate">Answer: <strong>{questionAnswer(question)}</strong> · {review.summary}</p>
                            </div>
                            <ChevronDown className={`w-4 h-4 text-[#6b635b] shrink-0 transition ${isExpanded ? 'rotate-180' : ''}`} />
                          </button>

                          {isExpanded && (
                            <div className="border-t border-[#e0d8cb] bg-[#fcfaf6] p-4 space-y-4">
                              <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                  <p className="text-[10px] font-black uppercase tracking-wider text-[#6b635b]">Agent assessment</p>
                                  <p className="text-sm leading-relaxed mt-1">{review.evidenceSummary || review.summary}</p>
                                  {review.issues.length > 0 && (
                                    <ul className="mt-2 space-y-1">
                                      {review.issues.map((issue) => <li key={issue} className="text-xs text-[#9a5d0b] flex gap-1.5"><span>•</span><span>{issue}</span></li>)}
                                    </ul>
                                  )}
                                </div>
                                <div>
                                  <p className="text-[10px] font-black uppercase tracking-wider text-[#6b635b]">Evidence</p>
                                  {sources.length > 0 ? (
                                    <div className="mt-1.5 space-y-1.5">
                                      {sources.map((source) => source && (
                                        <a key={source.id} href={source.url} target="_blank" rel="noreferrer" className="text-xs text-[#185a9d] hover:underline flex items-start gap-1.5">
                                          <ExternalLink className="w-3 h-3 shrink-0 mt-0.5" />
                                          <span>{source.title}</span>
                                        </a>
                                      ))}
                                    </div>
                                  ) : (
                                    <p className="text-xs text-[#9a5d0b] mt-1">No question-level source was mapped. Treat the claim as unverified.</p>
                                  )}
                                </div>
                              </div>

                              <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                                {SCORE_LABELS.map(({ key, label }) => (
                                  <div key={key} className="rounded-lg border border-[#e0d8cb] bg-white px-2 py-1.5 text-center">
                                    <span className="block text-sm font-black text-[#8b1e1e]">{review.scores[key]}</span>
                                    <span className="block text-[9px] text-[#6b635b] truncate" title={label}>{label}</span>
                                  </div>
                                ))}
                              </div>

                              {review.suggestedRepair && (
                                <div className="rounded-xl border border-[#c59b27] bg-[#fffaf0] p-3 flex items-start justify-between gap-3">
                                  <div>
                                    <p className="text-xs font-black text-[#7c5c0a] flex items-center gap-1.5"><Wrench className="w-3.5 h-3.5" /> Suggested repair</p>
                                    <p className="text-xs font-semibold mt-1">{review.suggestedRepair.question}</p>
                                    <p className="text-[11px] text-[#6b635b] mt-1">Proposed answer: {review.suggestedRepair.options && review.suggestedRepair.correctIndex !== undefined ? review.suggestedRepair.options[review.suggestedRepair.correctIndex] : `${review.suggestedRepair.target} ${review.suggestedRepair.metricUnit || ''}`}</p>
                                  </div>
                                  <button onClick={() => applySuggestedRepair(review)} className="shrink-0 rounded-lg bg-[#7c5c0a] text-white px-3 py-2 text-xs font-black cursor-pointer hover:bg-[#624905]">Apply to copy</button>
                                </div>
                              )}
                            </div>
                          )}
                        </article>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          )}

          {activeTab === 'json' && (
            <div className="space-y-3 h-full flex flex-col">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div>
                  <h3 className="font-black">Dataset JSON</h3>
                  <p className="text-xs text-[#6b635b]">Paste another Antigravity dataset or edit this working copy.</p>
                </div>
                <button onClick={parseJsonEditor} className="rounded-xl bg-[#8b1e1e] text-white px-4 py-2 text-xs font-black flex items-center gap-1.5 cursor-pointer"><Check className="w-3.5 h-3.5" /> Load into validator</button>
              </div>
              {jsonError && <div className="rounded-lg bg-[#ffebee] border border-[#ef9a9a] p-2.5 text-xs text-[#b4232b]">{jsonError}</div>}
              <textarea
                value={jsonInput}
                onChange={(event) => setJsonInput(event.target.value)}
                spellCheck={false}
                className="w-full min-h-[520px] flex-1 rounded-xl bg-[#27231f] text-[#f7f0e6] p-4 font-mono text-xs leading-relaxed outline-none focus:ring-2 focus:ring-[#c59b27] resize-y"
              />
            </div>
          )}
        </div>

        <div className="px-4 py-3 sm:px-6 border-t border-[#e0d8cb] bg-[#faf8f4] flex items-center justify-between gap-3 flex-wrap shrink-0">
          <div className="flex items-center gap-2 flex-wrap">
            <button onClick={saveWorkingCopy} className="rounded-xl border border-[#a5d6a7] bg-white text-[#216b27] px-3 py-2 text-xs font-black flex items-center gap-1.5 cursor-pointer hover:bg-[#f5fbf6]">
              {saved ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
              {saved ? 'Saved' : 'Save working copy'}
            </button>
            <button onClick={() => downloadJson(`${workingQuiz.id}-reviewed.json`, workingQuiz)} className="rounded-xl border border-[#d8cdbd] bg-white px-3 py-2 text-xs font-bold flex items-center gap-1.5 cursor-pointer hover:border-[#8b1e1e]">
              <Download className="w-3.5 h-3.5" /> Dataset
            </button>
            {agentReport && (
              <button onClick={() => downloadJson(`${workingQuiz.id}-agent-review.json`, agentReport)} className="rounded-xl border border-[#d8cdbd] bg-white px-3 py-2 text-xs font-bold flex items-center gap-1.5 cursor-pointer hover:border-[#8b1e1e]">
                <Globe2 className="w-3.5 h-3.5" /> Review report
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="px-3 py-2 text-xs font-bold text-[#6b635b] cursor-pointer">Close</button>
            <button onClick={useWorkingCopy} className="rounded-xl bg-[#8b1e1e] text-white px-4 py-2 text-xs font-black flex items-center gap-1.5 cursor-pointer hover:bg-[#731818]"><Play className="w-3.5 h-3.5" /> Use this copy</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Metric: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="rounded-xl border border-[#e0d8cb] bg-white p-3 text-center">
    <span className="block text-lg sm:text-xl font-black text-[#8b1e1e]">{value}</span>
    <span className="block text-[9px] sm:text-[10px] uppercase tracking-wider font-bold text-[#6b635b]">{label}</span>
  </div>
);

const IssueLine: React.FC<{ text: string; tone: 'red' | 'amber' | 'neutral' }> = ({ text, tone }) => (
  <div className={`text-xs flex items-start gap-1.5 ${tone === 'red' ? 'text-[#b4232b]' : tone === 'amber' ? 'text-[#8a5a0a]' : 'text-[#5f574f]'}`}>
    <span className="font-black">•</span><span>{text}</span>
  </div>
);

const ScoreBar: React.FC<{ label: string; score: number }> = ({ label, score }) => (
  <div>
    <div className="flex items-center justify-between text-xs mb-1">
      <span className="font-bold text-[#514a44]">{label}</span>
      <span className="font-black text-[#8b1e1e]">{score.toFixed(1)}/5</span>
    </div>
    <div className="h-2 rounded-full bg-[#eee8dc] overflow-hidden">
      <div className={`h-full rounded-full ${score >= 4 ? 'bg-[#2e7d32]' : score >= 3 ? 'bg-[#c59b27]' : 'bg-[#c62828]'}`} style={{ width: `${Math.max(0, Math.min(100, score * 20))}%` }} />
    </div>
  </div>
);

const ListCard: React.FC<{ title: string; items: string[]; tone: 'green' | 'amber'; empty: string }> = ({ title, items, tone, empty }) => (
  <section className={`rounded-2xl border p-4 ${tone === 'green' ? 'bg-[#f5fbf6] border-[#c8e6c9]' : 'bg-[#fffaf0] border-[#ead79e]'}`}>
    <h3 className={`font-black text-sm ${tone === 'green' ? 'text-[#216b27]' : 'text-[#7c5c0a]'}`}>{title}</h3>
    <ul className="mt-2 space-y-1.5">
      {(items.length > 0 ? items : [empty]).map((item) => <li key={item} className="text-xs leading-relaxed text-[#514a44] flex gap-1.5"><span>•</span><span>{item}</span></li>)}
    </ul>
  </section>
);
