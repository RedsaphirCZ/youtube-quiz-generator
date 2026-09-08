import React, { useMemo, useState } from 'react';
import { ArrowLeft, BookOpen, Check, ClipboardPaste, Copy, Download, FileJson, Sparkles, Upload } from 'lucide-react';
import { QuizDataset } from '../types';
import { validateQuizDataset } from '../lib/validator';
import { saveQuizToLibrary } from '../lib/quizStorage';
import { generateQuizResearchPromptMarkdown, parseFlexibleQuizResponse, QuizResearchPromptConfig } from '../lib/quizPrompt';

type LandingAction = 'home' | 'import' | 'prompt';

interface LandingPageProps {
  onStartQuiz: (quiz: QuizDataset) => void;
  onBrowseQuizzes: () => void;
}

const slugify = (value: string) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'new-quiz';

export const LandingPage: React.FC<LandingPageProps> = ({ onStartQuiz, onBrowseQuizzes }) => {
  const [action, setAction] = useState<LandingAction>('home');
  const [importText, setImportText] = useState('');
  const [importFileName, setImportFileName] = useState('');
  const [status, setStatus] = useState<{ kind: 'success' | 'error'; text: string } | null>(null);
  const [topic, setTopic] = useState('');
  const [questionCount, setQuestionCount] = useState(25);
  const [answerChoiceCount, setAnswerChoiceCount] = useState<2 | 3>(3);
  const [difficulty, setDifficulty] = useState<QuizResearchPromptConfig['difficulty']>('easy-medium');
  const [includeNumberGuesses, setIncludeNumberGuesses] = useState(false);
  const [numberGuessCount, setNumberGuessCount] = useState(3);
  const [currentInformation, setCurrentInformation] = useState(false);
  const [language, setLanguage] = useState('Simple natural English');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [copied, setCopied] = useState(false);

  const promptConfig = useMemo<QuizResearchPromptConfig>(() => ({
    topic, questionCount, difficulty, answerChoiceCount, includeNumberGuesses,
    numberGuessCount, currentInformation, language, specialInstructions,
  }), [topic, questionCount, difficulty, answerChoiceCount, includeNumberGuesses, numberGuessCount, currentInformation, language, specialInstructions]);
  const markdown = topic.trim() ? generateQuizResearchPromptMarkdown(promptConfig) : '';

  const goHome = () => { setAction('home'); setStatus(null); };

  const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    setImportFileName(file.name);
    setImportText(await file.text());
    setStatus({ kind: 'success', text: `${file.name} loaded. Check it, then import the draft.` });
  };

  const handleImport = () => {
    setStatus(null);
    try {
      const parsed = parseFlexibleQuizResponse(importText);
      const expectation = parsed.cycles ?? { questionCount: parsed.quiz.questions.length, flexible: true as const };
      const report = validateQuizDataset(parsed.quiz.questions, expectation);
      if (!report.isValid) throw new Error(`Format check failed: ${report.errors.slice(0, 4).join('; ')}`);
      if (!saveQuizToLibrary(parsed.quiz)) throw new Error('The quiz passed format checks, but browser storage could not save it.');
      setStatus({ kind: 'success', text: 'Format passed. Saved as an unreviewed draft.' });
      onStartQuiz(parsed.quiz);
    } catch (error) {
      setStatus({ kind: 'error', text: error instanceof Error ? error.message : 'Could not import this quiz.' });
    }
  };

  const handleCopy = async () => {
    if (!markdown) return;
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setStatus({ kind: 'error', text: 'Copy was blocked. Select the prompt preview and copy it manually.' });
    }
  };

  const handleDownloadMarkdown = () => {
    if (!markdown) return;
    const url = URL.createObjectURL(new Blob([markdown], { type: 'text/markdown;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `${slugify(topic)}-quiz-research-prompt.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-[#f5f2eb] text-[#2b2520] px-4 py-8 sm:py-12 flex items-center justify-center">
      <section className="w-full max-w-3xl rounded-3xl border border-[#d9cebc] bg-white shadow-xl overflow-hidden">
        <div className="border-t-[6px] border-[#8b1e1e] px-5 py-6 sm:px-9 sm:py-8 bg-[#faf8f4]">
          {action !== 'home' && (
            <button onClick={goHome} className="mb-5 inline-flex min-h-10 items-center gap-2 rounded-lg border border-[#d9cebc] bg-white px-3 text-sm font-extrabold text-[#8b1e1e] hover:border-[#8b1e1e] cursor-pointer">
              <ArrowLeft className="w-4 h-4" /> Home
            </button>
          )}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#8b1e1e] text-white flex items-center justify-center shadow-sm">
              {action === 'import' ? <FileJson className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] font-black text-[#8c6a0c]">YouTube Quiz Studio</p>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#8b1e1e]">
                {action === 'home' ? 'Start a quiz project' : action === 'prompt' ? 'Get a research prompt' : 'Import a quiz'}
              </h1>
            </div>
          </div>
          {action === 'home' && <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#6b635b]">Choose one place to begin.</p>}
        </div>

        <div className="px-5 py-6 sm:px-9 sm:py-8">
          {action === 'home' && (
            <div className="grid sm:grid-cols-3 gap-4">
              <LandingButton icon={Sparkles} title="Get prompt" description="Fill in the quiz details and download a research-ready .md prompt." onClick={() => setAction('prompt')} />
              <LandingButton icon={FileJson} title="Import" description="Paste quiz JSON or load a JSON, Markdown, or text file." onClick={() => setAction('import')} />
              <LandingButton icon={BookOpen} title="Library" description="Browse curated quizzes and your saved drafts." onClick={onBrowseQuizzes} />
            </div>
          )}

          {action === 'import' && (
            <div className="space-y-4">
              <p className="text-sm text-[#6b635b]">Plain JSON and JSON inside Markdown code fences are supported. Imported quizzes remain unreviewed until you run Review.</p>
              <label className="inline-flex min-h-11 items-center gap-2 rounded-lg border-2 border-[#d9cebc] px-4 text-sm font-extrabold text-[#8b1e1e] hover:border-[#8b1e1e] cursor-pointer">
                <Upload className="w-4 h-4" /> {importFileName || 'Choose .json, .md, or .txt file'}
                <input type="file" accept=".json,.md,.txt,application/json,text/markdown,text/plain" onChange={handleFile} className="hidden" />
              </label>
              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-[#8c827a]"><span className="h-px bg-[#e4dbce] flex-1" />or paste below<span className="h-px bg-[#e4dbce] flex-1" /></div>
              <textarea value={importText} onChange={(event) => { setImportText(event.target.value); setStatus(null); }} aria-label="Quiz JSON or Markdown" placeholder={'Paste { "title": "...", "questions": [...] } or a Markdown-fenced JSON response'} className="w-full h-56 resize-y rounded-xl border-2 border-[#d9cebc] bg-[#111318] px-4 py-3 font-mono text-xs leading-relaxed text-white placeholder:text-[#777e89] outline-none focus:border-[#c59b27]" />
              {status && <StatusMessage status={status} />}
              <button onClick={handleImport} disabled={!importText.trim()} className="w-full min-h-12 rounded-xl bg-[#8b1e1e] text-white font-extrabold disabled:opacity-40 flex items-center justify-center gap-2 cursor-pointer"><ClipboardPaste className="w-4 h-4" /> Import draft &amp; start quiz</button>
            </div>
          )}

          {action === 'prompt' && (
            <div className="space-y-5">
              <p className="text-sm text-[#6b635b]">Answer the essentials below. The downloaded prompt tells your chosen AI chat to research, fact-check, audit, and return import-ready JSON. This website never needs an API key.</p>
              <label className="block"><FieldLabel>Quiz topic *</FieldLabel><input value={topic} onChange={(event) => setTopic(event.target.value)} placeholder="e.g. Cozy autumn trivia" className="w-full min-h-12 rounded-xl border-2 border-[#d9cebc] px-4 font-bold outline-none focus:border-[#8b1e1e]" /></label>
              <div className="grid sm:grid-cols-2 gap-4">
                <label><FieldLabel>Number of questions</FieldLabel><input type="number" min={1} max={200} value={questionCount} onChange={(event) => setQuestionCount(Math.max(1, Number(event.target.value) || 1))} className="w-full min-h-11 rounded-lg border-2 border-[#d9cebc] px-3 text-sm font-bold outline-none focus:border-[#8b1e1e]" /></label>
                <PromptSelect label="Difficulty" value={difficulty} onChange={(value) => setDifficulty(value as QuizResearchPromptConfig['difficulty'])} options={[["easy", 'Easy'], ['easy-medium', 'Easy–medium'], ['medium', 'Medium'], ['challenging', 'Challenging']]} />
                <PromptSelect label="Answer choices" value={answerChoiceCount} onChange={(value) => setAnswerChoiceCount(Number(value) as 2 | 3)} options={[[2, 'AB — 2 choices'], [3, 'ABC — 3 choices']]} />
                <label><FieldLabel>Language</FieldLabel><input value={language} onChange={(event) => setLanguage(event.target.value)} className="w-full min-h-11 rounded-lg border-2 border-[#d9cebc] px-3 text-sm font-bold outline-none focus:border-[#8b1e1e]" /></label>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 rounded-xl border border-[#e4dbce] bg-[#faf8f4] p-4">
                <ToggleField checked={includeNumberGuesses} onChange={setIncludeNumberGuesses} label="Include number guessing" description="Adds dedicated estimate questions, never numerical MCQs." />
                {includeNumberGuesses && <label><FieldLabel>How many number guesses?</FieldLabel><input type="number" min={1} max={questionCount} value={numberGuessCount} onChange={(event) => setNumberGuessCount(Math.max(1, Number(event.target.value) || 1))} className="w-full min-h-11 rounded-lg border-2 border-[#d9cebc] bg-white px-3 text-sm font-bold outline-none focus:border-[#8b1e1e]" /></label>}
                <ToggleField checked={currentInformation} onChange={setCurrentInformation} label="Current information involved" description="Requires live verification and a verified-as-of date." />
              </div>
              <label className="block"><FieldLabel>Special themes or restrictions</FieldLabel><textarea value={specialInstructions} onChange={(event) => setSpecialInstructions(event.target.value)} placeholder="Optional: tone, must-cover areas, facts to avoid…" className="w-full h-24 resize-y rounded-xl border-2 border-[#d9cebc] px-4 py-3 text-sm outline-none focus:border-[#8b1e1e]" /></label>
              <details className="rounded-xl border border-[#e4dbce] bg-[#111318] text-white"><summary className="px-4 py-3 text-sm font-extrabold cursor-pointer">Preview generated Markdown</summary><textarea readOnly value={markdown || 'Enter a topic to generate the research prompt.'} aria-label="Generated Markdown prompt" className="w-full h-56 resize-y border-t border-[#30343d] bg-[#08090b] px-4 py-3 font-mono text-[11px] leading-relaxed text-[#e5e7eb]" /></details>
              {status && <StatusMessage status={status} />}
              <div className="grid sm:grid-cols-2 gap-3">
                <button onClick={handleDownloadMarkdown} disabled={!markdown} className="min-h-12 rounded-xl bg-[#8b1e1e] text-white font-extrabold disabled:opacity-40 flex items-center justify-center gap-2 cursor-pointer"><Download className="w-4 h-4" /> Download research prompt .md</button>
                <button onClick={handleCopy} disabled={!markdown} className="min-h-12 rounded-xl border-2 border-[#d9cebc] font-extrabold text-[#2b2520] disabled:opacity-40 flex items-center justify-center gap-2 cursor-pointer">{copied ? <Check className="w-4 h-4 text-[#2e7d32]" /> : <Copy className="w-4 h-4 text-[#8b1e1e]" />}{copied ? 'Copied' : 'Copy research prompt'}</button>
              </div>
              <button onClick={() => setAction('import')} className="w-full text-sm font-bold text-[#8b1e1e] underline underline-offset-4 cursor-pointer">I already have a response — import it</button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

const LandingButton = ({ icon: Icon, title, description, onClick }: { icon: typeof Sparkles; title: string; description: string; onClick: () => void }) => (
  <button onClick={onClick} className="min-h-48 rounded-2xl border-2 border-[#d9cebc] bg-[#faf8f4] p-5 text-left hover:border-[#8b1e1e] hover:bg-white hover:-translate-y-0.5 transition cursor-pointer"><span className="w-11 h-11 rounded-xl bg-[#8b1e1e] text-white flex items-center justify-center"><Icon className="w-5 h-5" /></span><span className="block mt-4 text-xl font-black text-[#8b1e1e]">{title}</span><span className="block mt-2 text-sm leading-relaxed text-[#6b635b]">{description}</span></button>
);

const FieldLabel = ({ children }: { children: React.ReactNode }) => <span className="block mb-1.5 text-xs font-black uppercase tracking-wider">{children}</span>;
const StatusMessage = ({ status }: { status: { kind: 'success' | 'error'; text: string } }) => <div className={`rounded-lg border px-3 py-2.5 text-xs font-semibold ${status.kind === 'success' ? 'border-[#2e7d32]/30 bg-[#e8f5e9] text-[#2e7d32]' : 'border-[#c62828]/30 bg-[#ffebee] text-[#b4232b]'}`}>{status.text}</div>;

const PromptSelect = ({ label, value, onChange, options }: { label: string; value: string | number; onChange: (value: string) => void; options: Array<[string | number, string]> }) => (
  <label><FieldLabel>{label}</FieldLabel><select value={value} onChange={(event) => onChange(event.target.value)} className="w-full min-h-11 rounded-lg border-2 border-[#d9cebc] bg-white px-3 text-sm font-bold outline-none focus:border-[#8b1e1e] cursor-pointer">{options.map(([optionValue, optionLabel]) => <option key={optionValue} value={optionValue}>{optionLabel}</option>)}</select></label>
);

const ToggleField = ({ checked, onChange, label, description }: { checked: boolean; onChange: (checked: boolean) => void; label: string; description: string }) => (
  <label className="flex items-start gap-3 cursor-pointer"><input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="mt-1 w-4 h-4 accent-[#8b1e1e]" /><span><span className="block text-sm font-extrabold">{label}</span><span className="block mt-0.5 text-xs leading-relaxed text-[#6b635b]">{description}</span></span></label>
);
