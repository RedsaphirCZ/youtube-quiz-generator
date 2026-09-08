import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Wrench, 
  Copy, 
  Check, 
  Play, 
  Download, 
  Code2, 
  FileText, 
  HelpCircle,
  Sparkles,
  Layers,
  BarChart3
} from 'lucide-react';
import { QuizDataset, ValidationReport } from '../types';
import { validateQuizDataset, sanitizeQuestions, generateRepairPrompt } from '../lib/validator';
import { generateStandaloneQuizHTML } from '../lib/htmlExporter';
import { chatGptBrokenFixture, chatGptRepairedFixture } from '../data/testFixtures';
import { curatedQuizzes } from '../data/curatedQuizzes';
import { saveQuizToLibrary } from '../lib/quizStorage';

interface InspectorLabModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadAndPlay: (quiz: QuizDataset) => void;
  currentQuiz?: QuizDataset;
}

export const InspectorLabModal: React.FC<InspectorLabModalProps> = ({
  isOpen,
  onClose,
  onLoadAndPlay,
  currentQuiz,
}) => {
  const initialQuiz = currentQuiz || chatGptRepairedFixture;
  const [jsonInput, setJsonInput] = useState<string>(
    JSON.stringify(initialQuiz, null, 2)
  );
  const [parsedDataset, setParsedDataset] = useState<QuizDataset | null>(initialQuiz);
  const [validationReport, setValidationReport] = useState<ValidationReport>(() => 
    validateQuizDataset(initialQuiz.questions)
  );
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);
  const [savedToLibSuccess, setSavedToLibSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'audit' | 'editor' | 'prompt'>('audit');

  // When modal opens or currentQuiz changes, reload it into validator
  React.useEffect(() => {
    if (isOpen && currentQuiz) {
      handleLoadPreset(currentQuiz);
    }
  }, [isOpen, currentQuiz]);

  if (!isOpen) return null;

  const handleValidateJSON = (rawText: string) => {
    setJsonInput(rawText);
    setJsonError(null);

    try {
      const parsed = JSON.parse(rawText);
      if (!parsed || !Array.isArray(parsed.questions)) {
        setJsonError('Invalid JSON structure: missing "questions" array.');
        setParsedDataset(null);
        return;
      }

      const dataset: QuizDataset = {
        id: parsed.id || `custom-json-${Date.now()}`,
        theme: parsed.topic || parsed.theme || 'Custom Validated Quiz',
        title: parsed.title || 'Custom Validated Quiz',
        description: parsed.description || 'Structured 60-question interactive assessment dataset.',
        difficulty: parsed.difficulty || 'moderate',
        questions: parsed.questions,
        createdAt: parsed.createdAt || new Date().toISOString(),
      };

      setParsedDataset(dataset);
      const report = validateQuizDataset(dataset.questions);
      setValidationReport(report);
    } catch (err: any) {
      setJsonError(`JSON Syntax Error: ${err.message}`);
      setParsedDataset(null);
    }
  };

  const handleLoadPreset = (dataset: QuizDataset) => {
    const formatted = JSON.stringify(dataset, null, 2);
    handleValidateJSON(formatted);
  };

  const handleAutoRepair = () => {
    if (!parsedDataset) return;
    const sanitizedQuestions = sanitizeQuestions(parsedDataset.questions);
    const repairedDataset: QuizDataset = {
      ...parsedDataset,
      title: parsedDataset.title.replace(/\(Violations Demo\)/, '(Auto-Repaired)'),
      questions: sanitizedQuestions,
    };

    const newJson = JSON.stringify(repairedDataset, null, 2);
    handleValidateJSON(newJson);
  };

  const handleCopyRepairPrompt = async () => {
    if (!parsedDataset) return;
    const prompt = generateRepairPrompt(parsedDataset, validationReport);
    try {
      await navigator.clipboard.writeText(prompt);
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCopyJson = async () => {
    try {
      await navigator.clipboard.writeText(jsonInput);
      setCopiedJson(true);
      setTimeout(() => setCopiedJson(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePlayNow = () => {
    if (!parsedDataset) return;
    onLoadAndPlay(parsedDataset);
    onClose();
  };

  const handleDownloadStandalone = () => {
    if (!parsedDataset) return;
    const html = generateStandaloneQuizHTML(parsedDataset);
    const filename = `${(parsedDataset.title || 'quiz').toLowerCase().replace(/[^a-z0-9]+/g, '-')}.html`;
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSaveToLibrary = () => {
    if (!parsedDataset) return;
    saveQuizToLibrary(parsedDataset);
    setSavedToLibSuccess(true);
    setTimeout(() => setSavedToLibSuccess(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white border border-[#e0d8cb] rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-5 md:p-6 border-b border-[#e0d8cb] bg-[#faf8f4] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#8b1e1e] text-white flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg md:text-xl font-bold text-[#8b1e1e]">
                  Quiz Factory &amp; 15-Point Inspector Lab
                </h2>
                <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                  validationReport.isValid 
                    ? 'bg-[#e8f5e9] text-[#2e7d32] border border-[#2e7d32]/30' 
                    : 'bg-[#ffebee] text-[#c62828] border border-[#c62828]/30'
                }`}>
                  {validationReport.isValid ? '15/15 PASS' : `${validationReport.errors.length} Violations Found`}
                </span>
              </div>
              <p className="text-xs text-[#6b635b]">
                Deterministic validator, repair prompt generator, and live dataset test harness
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#6b635b] hover:text-[#8b1e1e] hover:bg-[#eee8dc] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preset Selector Banner */}
        <div className="bg-[#fbf9f5] border-b border-[#e0d8cb] px-5 py-3 flex items-center justify-between gap-3 flex-wrap">
          <span className="text-xs font-bold uppercase tracking-wider text-[#6b635b] flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#8b1e1e]" />
            Load Preset Test Fixture:
          </span>

          <div className="flex items-center gap-2 flex-wrap text-xs">
            {currentQuiz && (
              <button
                onClick={() => handleLoadPreset(currentQuiz)}
                className="px-2.5 py-1.5 rounded-lg border border-[#8b1e1e]/40 bg-[#8b1e1e]/10 text-[#8b1e1e] font-bold hover:brightness-95 transition cursor-pointer flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" />
                Active Quiz: {currentQuiz.title.split(':')[0].substring(0, 18)}...
              </button>
            )}

            <button
              onClick={() => handleLoadPreset(chatGptBrokenFixture)}
              className="px-2.5 py-1.5 rounded-lg border border-[#c62828]/40 bg-[#ffebee] text-[#c62828] font-bold hover:brightness-95 transition cursor-pointer flex items-center gap-1"
            >
              <AlertTriangle className="w-3 h-3" />
              ChatGPT Fixture (With Violations)
            </button>

            <button
              onClick={() => handleLoadPreset(chatGptRepairedFixture)}
              className="px-2.5 py-1.5 rounded-lg border border-[#2e7d32]/40 bg-[#e8f5e9] text-[#2e7d32] font-bold hover:brightness-95 transition cursor-pointer flex items-center gap-1"
            >
              <CheckCircle2 className="w-3 h-3" />
              ChatGPT Fixture (Repaired &amp; Clean)
            </button>

            <button
              onClick={() => handleLoadPreset(curatedQuizzes[0])}
              className="px-2.5 py-1.5 rounded-lg border border-[#e0d8cb] bg-white text-[#2b2520] font-semibold hover:border-[#c59b27] transition cursor-pointer"
            >
              Roman Empire (60-Q)
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#e0d8cb] bg-[#fbf9f5] px-6 pt-2">
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-4 py-2.5 text-xs md:text-sm font-bold border-b-2 transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'audit'
                ? 'border-[#8b1e1e] text-[#8b1e1e]'
                : 'border-transparent text-[#6b635b] hover:text-[#2b2520]'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            15-Rule Validation Audit ({validationReport.ruleChecks.filter(r => r.passed).length}/15)
          </button>

          <button
            onClick={() => setActiveTab('editor')}
            className={`px-4 py-2.5 text-xs md:text-sm font-bold border-b-2 transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'editor'
                ? 'border-[#8b1e1e] text-[#8b1e1e]'
                : 'border-transparent text-[#6b635b] hover:text-[#2b2520]'
            }`}
          >
            <Code2 className="w-4 h-4" />
            Raw JSON Dataset Editor
          </button>

          <button
            onClick={() => setActiveTab('prompt')}
            className={`px-4 py-2.5 text-xs md:text-sm font-bold border-b-2 transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'prompt'
                ? 'border-[#8b1e1e] text-[#8b1e1e]'
                : 'border-transparent text-[#6b635b] hover:text-[#2b2520]'
            }`}
          >
            <FileText className="w-4 h-4" />
            Generated Repair Prompt (LLM Feedback)
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* TAB 1: 15-RULE AUDIT */}
          {activeTab === 'audit' && (
            <div className="space-y-6">
              
              {/* Summary Banner */}
              {validationReport.isValid ? (
                <div className="p-4 rounded-xl bg-[#e8f5e9] border border-[#2e7d32] flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#2e7d32] shrink-0" />
                    <div>
                      <div className="font-bold text-[#2e7d32] text-sm md:text-base">
                        100% Validated: All 15 Specification Rules Passed
                      </div>
                      <div className="text-xs text-[#1b5e20] mt-0.5">
                        Dataset is fully formatted, balanced, bracket-free, and ready for offline export or live play.
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handlePlayNow}
                    className="px-4 py-2 rounded-lg font-bold text-xs md:text-sm bg-[#2e7d32] hover:bg-[#1b5e20] text-white transition flex items-center gap-1.5 shrink-0 cursor-pointer shadow-xs"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    Play Quiz Now
                  </button>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-[#ffebee] border border-[#c62828] flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-6 h-6 text-[#c62828] shrink-0" />
                    <div>
                      <div className="font-bold text-[#c62828] text-sm md:text-base">
                        Validation Failed: {validationReport.errors.length} Critical Issue{validationReport.errors.length > 1 ? 's' : ''} Detected
                      </div>
                      <div className="text-xs text-[#b71c1c] mt-0.5">
                        Fails deterministic requirements in RULES.md. Use 1-Click Auto-Repair or send the generated repair prompt to ChatGPT/Gemini.
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleAutoRepair}
                    className="px-4 py-2 rounded-lg font-bold text-xs md:text-sm bg-[#c62828] hover:bg-[#b71c1c] text-white transition flex items-center gap-1.5 shrink-0 cursor-pointer shadow-xs"
                  >
                    <Wrench className="w-3.5 h-3.5" />
                    1-Click Auto-Repair
                  </button>
                </div>
              )}

              {/* Metrics & Balance Overview */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 bg-[#faf8f4] border border-[#e0d8cb] rounded-xl text-center">
                  <span className="text-[10px] uppercase font-bold text-[#6b635b] block">Total Questions</span>
                  <span className="text-xl font-bold text-[#8b1e1e]">
                    {validationReport.totalQuestions} <span className="text-xs font-normal text-[#6b635b]">/ 60</span>
                  </span>
                </div>

                <div className="p-3.5 bg-[#faf8f4] border border-[#e0d8cb] rounded-xl text-center">
                  <span className="text-[10px] uppercase font-bold text-[#6b635b] block">MCQs vs Number</span>
                  <span className="text-xl font-bold text-[#2e7d32]">
                    {validationReport.mcqCount} <span className="text-xs text-[#6b635b]">/</span> {validationReport.numberCount}
                  </span>
                </div>

                <div className="p-3.5 bg-[#faf8f4] border border-[#e0d8cb] rounded-xl text-center">
                  <span className="text-[10px] uppercase font-bold text-[#6b635b] block">5:1 Repeating Cycles</span>
                  <span className="text-xl font-bold text-[#185a9d]">
                    {validationReport.cycleCount} <span className="text-xs font-normal text-[#6b635b]">cycles</span>
                  </span>
                </div>

                <div className="p-3.5 bg-[#faf8f4] border border-[#e0d8cb] rounded-xl text-center">
                  <span className="text-[10px] uppercase font-bold text-[#6b635b] block">Position Balance</span>
                  <span className="text-xs font-bold text-[#2b2520] block mt-1">
                    A: {validationReport.positionBalance.A} • B: {validationReport.positionBalance.B} • C: {validationReport.positionBalance.C}
                  </span>
                </div>
              </div>

              {/* 15 Specification Rules Checklist Grid */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#6b635b] flex items-center gap-1.5">
                  <BarChart3 className="w-3.5 h-3.5 text-[#8b1e1e]" />
                  Authoritative Specification Checklist (RULES.md)
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {validationReport.ruleChecks.map((rule) => (
                    <div
                      key={rule.ruleNumber}
                      className={`p-3 rounded-lg border flex items-start gap-2.5 text-xs transition ${
                        rule.passed
                          ? 'bg-[#fbfdfa] border-[#c8e6c9] text-[#2e7d32]'
                          : 'bg-[#fffbfa] border-[#ffcdd2] text-[#c62828]'
                      }`}
                    >
                      {rule.passed ? (
                        <CheckCircle2 className="w-4 h-4 text-[#2e7d32] shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-4 h-4 text-[#c62828] shrink-0 mt-0.5" />
                      )}

                      <div className="min-w-0 flex-1">
                        <div className="font-bold flex items-center justify-between gap-1">
                          <span>Rule #{rule.ruleNumber}: {rule.title}</span>
                          <span className="text-[10px] uppercase tracking-wider font-semibold opacity-80">
                            {rule.passed ? 'PASS' : 'FAIL'}
                          </span>
                        </div>
                        {rule.details && (
                          <p className="text-[11px] text-[#6b635b] mt-0.5">
                            {rule.details}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specific Errors & Warnings List */}
              {validationReport.errors.length > 0 && (
                <div className="bg-[#fff8f8] border border-[#ffcdd2] rounded-xl p-4 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#c62828] flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Specific Error Details ({validationReport.errors.length})
                  </h4>
                  <ul className="space-y-1.5 text-xs text-[#b71c1c] max-h-48 overflow-y-auto">
                    {validationReport.errors.map((err, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="font-bold">•</span>
                        <span>{err}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: RAW JSON EDITOR */}
          {activeTab === 'editor' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-[#6b635b]">
                <span>Paste or edit raw quiz JSON schema from ChatGPT, Gemini, or file:</span>
                <button
                  onClick={handleCopyJson}
                  className="inline-flex items-center gap-1 font-semibold text-[#8b1e1e] hover:underline cursor-pointer"
                >
                  {copiedJson ? <Check className="w-3.5 h-3.5 text-[#2e7d32]" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedJson ? 'Copied JSON!' : 'Copy Raw JSON'}
                </button>
              </div>

              {jsonError && (
                <div className="p-3 bg-[#ffebee] border border-[#c62828] text-xs text-[#c62828] rounded-lg">
                  {jsonError}
                </div>
              )}

              <textarea
                value={jsonInput}
                onChange={(e) => handleValidateJSON(e.target.value)}
                rows={16}
                className="w-full font-mono text-xs p-4 bg-[#2b2520] text-[#f5f2eb] rounded-xl outline-none focus:ring-2 focus:ring-[#8b1e1e] transition resize-y leading-relaxed"
                spellCheck={false}
              />
            </div>
          )}

          {/* TAB 3: GENERATED REPAIR PROMPT */}
          {activeTab === 'prompt' && parsedDataset && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-[#6b635b]">
                <span>Deterministic repair instructions generated according to repair_prompt.py:</span>
                <button
                  onClick={handleCopyRepairPrompt}
                  className="inline-flex items-center gap-1 font-semibold text-[#8b1e1e] hover:underline cursor-pointer"
                >
                  {copiedPrompt ? <Check className="w-3.5 h-3.5 text-[#2e7d32]" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedPrompt ? 'Copied to Clipboard!' : 'Copy Repair Prompt'}
                </button>
              </div>

              <pre className="p-4 bg-[#faf8f4] border border-[#e0d8cb] text-[#2b2520] rounded-xl text-xs font-mono whitespace-pre-wrap max-h-96 overflow-y-auto leading-relaxed">
                {generateRepairPrompt(parsedDataset, validationReport)}
              </pre>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 md:p-5 border-t border-[#e0d8cb] bg-[#faf8f4] flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleAutoRepair}
              disabled={!parsedDataset || validationReport.isValid}
              className="px-3.5 py-2.5 rounded-xl font-bold text-xs md:text-sm bg-white border-2 border-[#c59b27] text-[#7c5c0a] hover:bg-[#faf7f0] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer"
            >
              <Wrench className="w-4 h-4 text-[#c59b27]" />
              Auto-Repair
            </button>

            <button
              onClick={handleSaveToLibrary}
              disabled={!parsedDataset}
              className="px-3.5 py-2.5 rounded-xl font-bold text-xs md:text-sm bg-white border border-[#2e7d32] text-[#2e7d32] hover:bg-[#e8f5e9] transition disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              {savedToLibSuccess ? 'Saved to Library!' : 'Save to Library'}
            </button>

            <button
              onClick={handleDownloadStandalone}
              disabled={!parsedDataset}
              className="px-3.5 py-2.5 rounded-xl font-bold text-xs md:text-sm bg-white border border-[#e0d8cb] text-[#2b2520] hover:border-[#8b1e1e] hover:bg-[#faf7f0] transition disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#8b1e1e]" />
              Export HTML
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl font-semibold text-xs md:text-sm text-[#6b635b] hover:bg-[#eee8dc] transition cursor-pointer"
            >
              Close
            </button>

            <button
              onClick={handlePlayNow}
              disabled={!parsedDataset}
              className="px-6 py-2.5 rounded-xl font-bold text-xs md:text-sm bg-[#8b1e1e] hover:bg-[#731818] text-white transition disabled:opacity-50 flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <Play className="w-4 h-4 fill-current" />
              Load &amp; Play in Engine
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
