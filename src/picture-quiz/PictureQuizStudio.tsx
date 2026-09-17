import React, { useMemo, useState } from 'react';
import {
  ArrowLeft, ArrowRight, Check, Copy, Download, FileImage, FileJson,
  Home, ImageOff, Images, Play, RotateCcw, Sparkles, Upload, X,
} from 'lucide-react';
import { generatePictureQuizPrompt, parsePictureQuizResponse, pictureQuizDemo } from './pictureQuiz';
import { PicturePromptConfig, PictureQuizCategory, PictureQuizDataset } from './types';

type StudioView = 'home' | 'import' | 'prompt' | 'play' | 'summary';
type ImportStatus = { kind: 'success' | 'error'; text: string } | null;

interface PictureQuizStudioProps {
  onExit: () => void;
}

const fileToDataUrl = (file: File) => new Promise<string>((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => resolve(String(reader.result));
  reader.onerror = () => reject(new Error(`Could not read ${file.name}.`));
  reader.readAsDataURL(file);
});

const slugify = (value: string) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'picture-quiz';

export const PictureQuizStudio: React.FC<PictureQuizStudioProps> = ({ onExit }) => {
  const [view, setView] = useState<StudioView>('home');
  const [quiz, setQuiz] = useState<PictureQuizDataset>(pictureQuizDemo);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [importText, setImportText] = useState('');
  const [assetMap, setAssetMap] = useState<Map<string, string>>(new Map());
  const [loadedFiles, setLoadedFiles] = useState<string[]>([]);
  const [status, setStatus] = useState<ImportStatus>(null);
  const [copied, setCopied] = useState(false);
  const [config, setConfig] = useState<PicturePromptConfig>({
    title: '', topic: '', category: 'brands', questionCount: 20,
    answerChoiceCount: 3, difficulty: 'easy-medium', specialInstructions: '',
  });

  const prompt = useMemo(
    () => config.title.trim() && config.topic.trim() ? generatePictureQuizPrompt(config) : '',
    [config],
  );

  const startQuiz = (nextQuiz: PictureQuizDataset) => {
    setQuiz(nextQuiz);
    setCurrentIndex(0);
    setAnswers({});
    setView('play');
  };

  const handleFiles = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []) as File[];
    event.target.value = '';
    if (!files.length) return;
    setStatus(null);
    try {
      const nextAssets = new Map(assetMap);
      let nextText = importText;
      for (const file of files) {
        if (file.type.startsWith('image/')) {
          const dataUrl = await fileToDataUrl(file);
          nextAssets.set(file.name, dataUrl);
          nextAssets.set(file.webkitRelativePath || file.name, dataUrl);
        } else if (/\.(json|md|txt)$/i.test(file.name)) {
          nextText = await file.text();
        }
      }
      setAssetMap(nextAssets);
      setImportText(nextText);
      setLoadedFiles(files.map((file) => file.name));
      setStatus({ kind: 'success', text: `Loaded ${files.length} file${files.length === 1 ? '' : 's'}. Review the JSON, then import.` });
    } catch (error) {
      setStatus({ kind: 'error', text: error instanceof Error ? error.message : 'Could not read the selected files.' });
    }
  };

  const handleImport = () => {
    try {
      startQuiz(parsePictureQuizResponse(importText, assetMap));
    } catch (error) {
      setStatus({ kind: 'error', text: error instanceof Error ? error.message : 'Could not import this picture quiz.' });
    }
  };

  const handleCopy = async () => {
    if (!prompt) return;
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setStatus({ kind: 'error', text: 'Copy was blocked. Use the preview to copy the prompt manually.' });
    }
  };

  const handleDownload = () => {
    if (!prompt) return;
    const url = URL.createObjectURL(new Blob([prompt], { type: 'text/markdown;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `${slugify(config.title)}-picture-quiz-prompt.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (view === 'play' || view === 'summary') {
    const score = Object.entries(answers).filter(([index, answer]) => quiz.questions[Number(index)]?.correctIndex === answer).length;
    return (
      <main className="min-h-screen bg-[#10151f] text-white px-4 py-5 sm:py-8">
        <div className="mx-auto max-w-5xl">
          <header className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <button onClick={() => setView('home')} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 font-bold hover:bg-white/10 cursor-pointer"><ArrowLeft className="w-4 h-4" /> Picture studio</button>
            <div className="text-right"><p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-300">Picture quiz</p><h1 className="text-xl sm:text-2xl font-black">{quiz.title}</h1></div>
          </header>

          {view === 'summary' ? (
            <section className="rounded-3xl border border-white/15 bg-white/8 p-6 sm:p-10 text-center shadow-2xl">
              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-cyan-300 text-3xl font-black text-[#10151f]">{score}</div>
              <h2 className="text-3xl sm:text-5xl font-black">You scored {score} / {quiz.questions.length}</h2>
              <p className="mt-3 text-slate-300">Replay the set or load a different picture pack.</p>
              <div className="mt-7 flex flex-col sm:flex-row justify-center gap-3">
                <button onClick={() => startQuiz(quiz)} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-cyan-300 px-5 font-black text-[#10151f] cursor-pointer"><RotateCcw className="w-4 h-4" /> Play again</button>
                <button onClick={() => setView('home')} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/25 px-5 font-black cursor-pointer"><Images className="w-4 h-4" /> Picture studio</button>
              </div>
            </section>
          ) : (
            <PicturePlayer
              quiz={quiz}
              index={currentIndex}
              selected={answers[currentIndex]}
              onSelect={(answer) => setAnswers((previous) => ({ ...previous, [currentIndex]: answer }))}
              onPrevious={() => setCurrentIndex((index) => Math.max(0, index - 1))}
              onNext={() => currentIndex === quiz.questions.length - 1 ? setView('summary') : setCurrentIndex((index) => index + 1)}
            />
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#eef5f7] text-[#16212b] px-4 py-8 sm:py-12">
      <section className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-[#c9d9de] bg-white shadow-xl">
        <header className="border-t-[6px] border-cyan-700 bg-[#f7fbfc] px-5 py-6 sm:px-9 sm:py-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-700 text-white"><Images className="w-5 h-5" /></span>
              <div><p className="text-[11px] font-black uppercase tracking-[0.2em] text-cyan-700">Separate visual mode</p><h1 className="text-2xl sm:text-3xl font-black">Picture Quiz Studio</h1></div>
            </div>
            <button onClick={onExit} aria-label="Return to main quiz studio" className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#c9d9de] hover:border-cyan-700 cursor-pointer"><Home className="w-5 h-5" /></button>
          </div>
          <p className="mt-4 max-w-2xl text-sm sm:text-base text-slate-600">Build visual rounds for brands, country shapes, flags, landmarks, people, objects, or your own category. This mode has its own import format and player.</p>
        </header>

        <div className="px-5 py-6 sm:px-9 sm:py-8">
          {view !== 'home' && <button onClick={() => { setView('home'); setStatus(null); }} className="mb-5 inline-flex min-h-10 items-center gap-2 rounded-lg border border-[#c9d9de] px-3 text-sm font-black text-cyan-800 cursor-pointer"><ArrowLeft className="w-4 h-4" /> Picture studio</button>}

          {view === 'home' && (
            <div className="grid gap-4 sm:grid-cols-3">
              <StudioButton icon={Play} title="Try demo" description="Play a three-question offline flag round." onClick={() => startQuiz(pictureQuizDemo)} />
              <StudioButton icon={Upload} title="Import picture quiz" description="Choose JSON plus optional local image files, or paste JSON." onClick={() => setView('import')} />
              <StudioButton icon={Sparkles} title="Create research prompt" description="Download a prompt for brands, country shapes, landmarks, and more." onClick={() => setView('prompt')} />
            </div>
          )}

          {view === 'import' && (
            <div className="space-y-4">
              <div className="rounded-xl border border-cyan-200 bg-cyan-50 p-4 text-sm text-cyan-950"><strong>Two ways to supply pictures:</strong> use direct HTTPS URLs in the JSON, or select the JSON and its local image files together. Local files are kept only for this browser session.</div>
              <label className="inline-flex min-h-12 items-center gap-2 rounded-xl border-2 border-[#c9d9de] px-4 font-black text-cyan-800 hover:border-cyan-700 cursor-pointer"><FileImage className="w-5 h-5" /> Select JSON + pictures<input className="hidden" type="file" multiple accept=".json,.md,.txt,image/*" onChange={handleFiles} /></label>
              {loadedFiles.length > 0 && <p className="text-xs text-slate-500">Loaded: {loadedFiles.join(', ')}</p>}
              <textarea value={importText} onChange={(event) => { setImportText(event.target.value); setStatus(null); }} aria-label="Picture quiz JSON" placeholder={'Paste picture-quiz/v1 JSON here, or select a JSON file above.'} className="h-64 w-full resize-y rounded-xl border-2 border-[#26323b] bg-[#10151f] px-4 py-3 font-mono text-xs leading-relaxed text-white outline-none focus:border-cyan-400" />
              {status && <StatusMessage status={status} />}
              <button onClick={handleImport} disabled={!importText.trim()} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-cyan-700 px-5 font-black text-white disabled:opacity-40 cursor-pointer"><FileJson className="w-4 h-4" /> Import and play</button>
            </div>
          )}

          {view === 'prompt' && (
            <div className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField label="Quiz name *" value={config.title} placeholder="World Brand Challenge" onChange={(title) => setConfig({ ...config, title })} />
                <TextField label="Topic *" value={config.topic} placeholder="Recognizable global brand logos" onChange={(topic) => setConfig({ ...config, topic })} />
                <SelectField label="Picture category" value={config.category} onChange={(category) => setConfig({ ...config, category: category as PictureQuizCategory })} options={[
                  ['brands', 'Brands'], ['country-shapes', 'Country shapes'], ['flags', 'Flags'], ['landmarks', 'Landmarks'], ['people', 'People'], ['objects', 'Objects'], ['custom', 'Custom'],
                ]} />
                <SelectField label="Difficulty" value={config.difficulty} onChange={(difficulty) => setConfig({ ...config, difficulty: difficulty as PicturePromptConfig['difficulty'] })} options={[
                  ['easy', 'Easy'], ['easy-medium', 'Easy-medium'], ['medium', 'Medium'], ['challenging', 'Challenging'],
                ]} />
                <label><FieldLabel>Number of questions</FieldLabel><input type="number" min={1} max={100} value={config.questionCount} onChange={(event) => setConfig({ ...config, questionCount: Math.max(1, Number(event.target.value) || 1) })} className="min-h-11 w-full rounded-lg border-2 border-[#c9d9de] px-3 font-bold outline-none focus:border-cyan-700" /></label>
                <SelectField label="Answer choices" value={String(config.answerChoiceCount)} onChange={(answerChoiceCount) => setConfig({ ...config, answerChoiceCount: Number(answerChoiceCount) as 2 | 3 })} options={[["2", 'AB — 2 choices'], ["3", 'ABC — 3 choices']]} />
              </div>
              <label className="block"><FieldLabel>Special instructions</FieldLabel><textarea value={config.specialInstructions} onChange={(event) => setConfig({ ...config, specialInstructions: event.target.value })} placeholder="Optional tone, regions, exclusions, or image requirements" className="h-24 w-full resize-y rounded-xl border-2 border-[#c9d9de] px-4 py-3 outline-none focus:border-cyan-700" /></label>
              <details className="rounded-xl border border-[#26323b] bg-[#10151f] text-white"><summary className="cursor-pointer px-4 py-3 font-black">Preview generated Markdown</summary><textarea readOnly value={prompt || 'Enter a quiz name and topic to generate the prompt.'} className="h-64 w-full resize-y border-t border-white/15 bg-[#080b10] px-4 py-3 font-mono text-[11px] leading-relaxed" /></details>
              {status && <StatusMessage status={status} />}
              <div className="grid gap-3 sm:grid-cols-2">
                <button onClick={handleDownload} disabled={!prompt} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-cyan-700 px-4 font-black text-white disabled:opacity-40 cursor-pointer"><Download className="w-4 h-4" /> Download prompt .md</button>
                <button onClick={handleCopy} disabled={!prompt} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border-2 border-[#c9d9de] px-4 font-black disabled:opacity-40 cursor-pointer">{copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-cyan-700" />}{copied ? 'Copied' : 'Copy prompt'}</button>
              </div>
              <button onClick={() => setView('import')} className="w-full text-sm font-bold text-cyan-800 underline underline-offset-4 cursor-pointer">I already have the response — import it</button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

const PicturePlayer = ({ quiz, index, selected, onSelect, onPrevious, onNext }: { quiz: PictureQuizDataset; index: number; selected?: number; onSelect: (answer: number) => void; onPrevious: () => void; onNext: () => void }) => {
  const question = quiz.questions[index];
  const answered = selected !== undefined;
  const [imageFailed, setImageFailed] = useState(false);
  React.useEffect(() => setImageFailed(false), [question.image.src]);
  return (
    <section className="overflow-hidden rounded-3xl border border-white/15 bg-white/8 shadow-2xl">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-4"><span className="rounded-lg bg-cyan-300 px-3 py-1 text-sm font-black text-[#10151f]">IMAGE {index + 1}</span><span className="font-bold text-slate-300">{index + 1} / {quiz.questions.length}</span></div>
      <div className="grid lg:grid-cols-[1.08fr_.92fr]">
        <div className="flex min-h-72 items-center justify-center bg-[#080b10] p-4 sm:p-6">
          {imageFailed ? <div className="text-center text-slate-400"><ImageOff className="mx-auto mb-3 h-12 w-12" /><p className="font-bold">This image could not be loaded.</p>{question.image.sourceUrl && <a href={question.image.sourceUrl} target="_blank" rel="noreferrer" className="mt-2 inline-block text-cyan-300 underline">Open source page</a>}</div> : <img src={question.image.src} alt={question.image.alt} onError={() => setImageFailed(true)} className="max-h-[52vh] w-full rounded-xl object-contain" />}
        </div>
        <div className="p-5 sm:p-7">
          <h2 className="text-2xl sm:text-4xl font-black leading-tight">{question.question}</h2>
          <div className="mt-5 space-y-3">{question.options.map((option, optionIndex) => {
            const correct = optionIndex === question.correctIndex;
            const chosen = selected === optionIndex;
            const state = !answered ? 'border-white/20 bg-white/5 hover:border-cyan-300' : correct ? 'border-emerald-400 bg-emerald-400/15' : chosen ? 'border-rose-400 bg-rose-400/15' : 'border-white/10 bg-white/[.03] opacity-50';
            return <button key={option} disabled={answered} onClick={() => onSelect(optionIndex)} className={`flex min-h-14 w-full items-center gap-3 rounded-xl border-2 px-4 text-left text-lg font-black transition cursor-pointer ${state}`}><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10">{String.fromCharCode(65 + optionIndex)}</span>{option}{answered && correct && <Check className="ml-auto text-emerald-300" />}{answered && chosen && !correct && <X className="ml-auto text-rose-300" />}</button>;
          })}</div>
          {answered && <div className="mt-5 rounded-xl border border-cyan-300/25 bg-cyan-300/10 p-4 text-sm leading-relaxed text-slate-200"><strong className="text-cyan-200">Answer:</strong> {question.explanation}{question.image.credit && <span className="mt-2 block text-xs text-slate-400">Image: {question.image.credit}</span>}</div>}
          <div className="mt-6 flex gap-3"><button onClick={onPrevious} disabled={index === 0} className="min-h-12 rounded-xl border border-white/20 px-4 font-black disabled:opacity-30 cursor-pointer"><ArrowLeft className="w-4 h-4" /></button><button onClick={onNext} disabled={!answered} className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-cyan-300 px-5 font-black text-[#10151f] disabled:opacity-30 cursor-pointer">{index === quiz.questions.length - 1 ? 'See score' : 'Next picture'} <ArrowRight className="w-4 h-4" /></button></div>
        </div>
      </div>
    </section>
  );
};

const StudioButton = ({ icon: Icon, title, description, onClick }: { icon: typeof Play; title: string; description: string; onClick: () => void }) => <button onClick={onClick} className="min-h-48 rounded-2xl border-2 border-[#c9d9de] bg-[#f7fbfc] p-5 text-left transition hover:-translate-y-0.5 hover:border-cyan-700 hover:bg-white hover:shadow-md cursor-pointer"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-700 text-white"><Icon className="w-5 h-5" /></span><span className="mt-4 block text-xl font-black text-cyan-900">{title}</span><span className="mt-2 block text-sm leading-relaxed text-slate-600">{description}</span></button>;
const FieldLabel = ({ children }: { children: React.ReactNode }) => <span className="mb-1.5 block text-xs font-black uppercase tracking-wider">{children}</span>;
const TextField = ({ label, value, placeholder, onChange }: { label: string; value: string; placeholder: string; onChange: (value: string) => void }) => <label><FieldLabel>{label}</FieldLabel><input value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} className="min-h-11 w-full rounded-lg border-2 border-[#c9d9de] px-3 font-bold outline-none focus:border-cyan-700" /></label>;
const SelectField = ({ label, value, options, onChange }: { label: string; value: string; options: Array<[string, string]>; onChange: (value: string) => void }) => <label><FieldLabel>{label}</FieldLabel><select value={value} onChange={(event) => onChange(event.target.value)} className="min-h-11 w-full rounded-lg border-2 border-[#c9d9de] bg-white px-3 font-bold outline-none focus:border-cyan-700 cursor-pointer">{options.map(([optionValue, optionLabel]) => <option key={optionValue} value={optionValue}>{optionLabel}</option>)}</select></label>;
const StatusMessage = ({ status }: { status: Exclude<ImportStatus, null> }) => <div className={`rounded-lg border px-3 py-2.5 text-sm font-semibold ${status.kind === 'success' ? 'border-emerald-300 bg-emerald-50 text-emerald-800' : 'border-rose-300 bg-rose-50 text-rose-800'}`}>{status.text}</div>;
