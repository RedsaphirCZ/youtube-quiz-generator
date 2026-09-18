import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Download, Languages } from 'lucide-react';
import { StudioMenu } from '../components/StudioMenu';
import { generateLanguagePrompt, languageDemo, languageDirection, languageName, languages, levels, loadLanguageLibrary, parseLanguageQuiz, questionTypes, saveLanguageQuiz } from './languageQuiz';
import type { LanguageCode, LanguagePromptConfig, LanguageQuiz } from './languageQuiz';

type View = 'home' | 'prompt' | 'import' | 'library' | 'review' | 'play' | 'summary';
const defaults: LanguagePromptConfig = { title: '', topic: 'Everyday words and greetings', targetLanguage: 'en', instructionLanguage: 'cs', variety: '', level: 'A1', questionCount: 20, answerChoiceCount: 3, focus: 'mixed', transliteration: true, instructions: '' };
function download(content: string, name: string, mime: string) {
  const url = URL.createObjectURL(new Blob([content], { type: mime }));
  const link = document.createElement('a'); link.href = url; link.download = name; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
const filename = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'language-quiz';
const message = (error: unknown) => error instanceof Error ? error.message : 'Something went wrong. Please try again.';

export default function LanguageQuizStudio({ onExit }: { onExit: () => void }) {
  const [view, setView] = useState<View>('home');
  const [config, setConfig] = useState(defaults);
  const [raw, setRaw] = useState('');
  const [quiz, setQuiz] = useState<LanguageQuiz>(languageDemo);
  const [library, setLibrary] = useState<LanguageQuiz[]>([]);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const [reading, setReading] = useState(false);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  useEffect(() => { try { setLibrary(loadLanguageLibrary()); } catch { setError('Browser storage is unavailable or unreadable. You can still import, play and download projects.'); } }, []);
  const prompt = useMemo(() => {
    if (!config.title.trim() || !config.topic.trim()) return '';
    try { return generateLanguagePrompt(config); } catch { return ''; }
  }, [config]);
  const navigate = (next: View) => { setNotice(''); setError(''); setView(next); };
  const openQuiz = (project: LanguageQuiz) => { setQuiz(project); navigate('review'); };
  const play = () => { setIndex(0); setAnswers({}); navigate('play'); };
  const save = () => { try { setLibrary(saveLanguageQuiz(quiz)); setError(''); setNotice('Draft saved in this browser.'); } catch { setError('Could not save to browser storage. Download the JSON to keep your project.'); } };
  const importQuiz = () => { try { openQuiz(parseLanguageQuiz(raw)); } catch (err) { setError(message(err)); } };
  const exportQuiz = () => download(JSON.stringify(quiz, null, 2), `${filename(quiz.title)}.json`, 'application/json');
  const question = quiz.questions[index];
  const selected = answers[index];
  const score = Object.entries(answers).filter(([key, value]) => quiz.questions[Number(key)].correctIndex === value).length;

  return <main className="min-h-screen bg-[#f3f0f8] px-4 py-6 text-slate-900 sm:py-10">
    <section className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-violet-200 bg-white shadow-lg">
      <header className="border-t-[6px] border-violet-700 bg-violet-50 p-5 sm:p-8">
        <div className="flex items-start justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-widest text-violet-700">YouTube Quiz Studio</p><h1 className="mt-2 flex items-center gap-3 text-2xl font-black sm:text-3xl"><Languages aria-hidden="true" />Language Quiz</h1></div>
          <button className="studio-button studio-button-secondary" onClick={onExit}><ArrowLeft size={16} />Quiz modes</button></div>
        <p className="mt-3 text-sm text-slate-600">Create language rounds with native scripts, clear explanations, and your choice of teaching language.</p>
      </header>
      <div className="p-5 sm:p-8">
        {view !== 'home' && <button className="studio-button studio-button-secondary mb-5" onClick={() => navigate('home')}><ArrowLeft size={16} />Language home</button>}
        {error && <p role="alert" className="mb-4 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">{error}</p>}
        {notice && <p role="status" className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">{notice}</p>}
        {view === 'home' && <>
          <StudioMenu onPrompt={() => navigate('prompt')} onImport={() => navigate('import')} onLibrary={() => navigate('library')} />
          <section className="mt-8"><h2 className="text-xl font-black">Your language priorities</h2><p className="mt-2 text-sm text-slate-600">Select a language to start its prompt. All 22 languages are available for learning and instructions.</p>
            {(['High', 'Medium', 'Low'] as const).map(tier => <div key={tier} className="mt-5"><h3 className="mb-2 text-xs font-black uppercase tracking-widest text-violet-700">{tier} priority</h3><div className="flex flex-wrap gap-2">{languages.filter(item => item[2] === tier).map(([code, name]) => <button key={code} className="rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-bold hover:bg-violet-100" onClick={() => { setConfig(previous => ({ ...previous, targetLanguage: code, variety: '' })); navigate('prompt'); }}>{name}</button>)}</div></div>)}
          </section>
        </>}
        {view === 'prompt' && <div className="space-y-5">
          <div><h2 className="text-2xl font-black">Create a language prompt</h2><p className="mt-2 text-sm text-slate-600">Download or copy this prompt, run it in your AI tool, then import the JSON response here.</p></div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-bold">Quiz name *<input className="studio-input mt-1" value={config.title} onChange={e => setConfig({ ...config, title: e.target.value })} placeholder="Japanese first words" /></label>
            <label className="text-sm font-bold">Topic *<input className="studio-input mt-1" value={config.topic} onChange={e => setConfig({ ...config, topic: e.target.value })} /></label>
            <LanguageSelect label="Language to learn" value={config.targetLanguage} onChange={targetLanguage => setConfig({ ...config, targetLanguage, variety: '' })} />
            <LanguageSelect label="Instructions and explanations in" value={config.instructionLanguage} onChange={instructionLanguage => setConfig({ ...config, instructionLanguage })} />
            <label className="text-sm font-bold">Level (CEFR)<select className="studio-input mt-1" value={config.level} onChange={e => setConfig({ ...config, level: e.target.value as LanguagePromptConfig['level'] })}>{levels.map(level => <option key={level}>{level}</option>)}</select></label>
            <label className="text-sm font-bold">Question focus<select className="studio-input mt-1" value={config.focus} onChange={e => setConfig({ ...config, focus: e.target.value as LanguagePromptConfig['focus'] })}><option value="mixed">Mixed practice</option>{Object.entries(questionTypes).map(([type, label]) => <option key={type} value={type}>{label}</option>)}</select></label>
            <label className="text-sm font-bold">Number of questions<input className="studio-input mt-1" type="number" min={1} max={100} step={1} value={config.questionCount} onChange={e => setConfig({ ...config, questionCount: Math.min(100, Math.max(1, Math.round(Number(e.target.value) || 1))) })} /></label>
            <label className="text-sm font-bold">Answer choices<select className="studio-input mt-1" value={config.answerChoiceCount} onChange={e => setConfig({ ...config, answerChoiceCount: Number(e.target.value) as 2 | 3 })}><option value={2}>AB — 2 choices</option><option value={3}>ABC — 3 choices</option></select></label>
            <label className="text-sm font-bold sm:col-span-2">Variety / dialect (optional)<input className="studio-input mt-1" value={config.variety} onChange={e => setConfig({ ...config, variety: e.target.value })} placeholder="e.g. Modern Standard Arabic, Brazilian Portuguese, Norwegian Bokmål" /></label>
          </div>
          <label className="flex items-center gap-3 text-sm font-bold"><input type="checkbox" checked={config.transliteration} onChange={e => setConfig({ ...config, transliteration: e.target.checked })} />Include transliteration for non-Latin scripts</label>
          <label className="block text-sm font-bold">Special instructions<textarea className="studio-input mt-1 h-24" value={config.instructions} onChange={e => setConfig({ ...config, instructions: e.target.value })} /></label>
          <details className="rounded-xl border border-violet-200 p-4"><summary className="cursor-pointer font-bold">Preview generated Markdown</summary><textarea aria-label="Generated language prompt" className="mt-3 h-64 w-full rounded-lg bg-slate-950 p-3 font-mono text-xs text-white" readOnly value={prompt || 'Enter a quiz name and topic.'} /></details>
          <div className="flex flex-wrap gap-3"><button className="studio-button studio-button-primary disabled:opacity-40" disabled={!prompt} onClick={() => download(prompt, `${filename(config.title)}-language-prompt.md`, 'text/markdown;charset=utf-8')}><Download size={16} />Download prompt .md</button><button className="studio-button studio-button-secondary disabled:opacity-40" disabled={!prompt} onClick={async () => { try { await navigator.clipboard.writeText(prompt); setNotice('Prompt copied.'); } catch { setError('Copy was blocked. Use the prompt preview or download instead.'); } }}>Copy prompt</button><button className="studio-button studio-button-secondary" onClick={() => navigate('import')}>Import response</button></div>
        </div>}
        {view === 'import' && <div className="space-y-4"><h2 className="text-2xl font-black">Import a language quiz</h2><p className="text-sm text-slate-600">Paste plain or fenced JSON from the Language Quiz prompt, or select a saved project. Imports stay unreviewed until you check their language content.</p>
          <label className="block text-sm font-bold">Select JSON or text file<input className="mt-2 block w-full text-sm" type="file" accept=".json,.txt,.md" disabled={reading} onChange={async e => { const file = e.target.files?.[0]; e.target.value = ''; if (!file) return; setReading(true); setError(''); try { if (file.size > 2 * 1024 * 1024) throw new Error('Choose a file smaller than 2 MB.'); setRaw(await file.text()); } catch (err) { setError(message(err)); } finally { setReading(false); } }} /></label>
          <textarea aria-label="Language quiz JSON" className="h-80 w-full rounded-xl bg-slate-950 p-4 font-mono text-xs text-white" value={raw} onChange={e => { setRaw(e.target.value); setError(''); }} placeholder="Paste language-quiz/v1 JSON here" />
          <button className="studio-button studio-button-primary disabled:opacity-40" disabled={!raw.trim() || reading} onClick={importQuiz}>{reading ? 'Reading file…' : 'Import & review'}</button>
        </div>}
        {view === 'library' && <section><h2 className="text-2xl font-black">Language library</h2><p className="mt-2 text-sm text-slate-600">Drafts are saved in this browser. Download JSON to keep a backup or move to another device.</p><div className="mt-5 grid gap-3 sm:grid-cols-2"><LibraryButton quiz={languageDemo} label="Sample" onClick={() => openQuiz(languageDemo)} />{library.map(project => <LibraryButton key={project.id} quiz={project} label="Saved draft" onClick={() => openQuiz(project)} />)}</div></section>}
        {view === 'review' && <section className="space-y-5"><div><p className="text-xs font-bold uppercase text-violet-700">Unreviewed draft · {languageName(quiz.targetLanguage)} · {quiz.level}</p><h2 className="mt-2 text-2xl font-black" dir="auto">{quiz.title}</h2><p className="mt-2 text-sm text-slate-600">{quiz.questions.length} questions · Instructions in {languageName(quiz.instructionLanguage)}{quiz.variety ? ` · ${quiz.variety}` : ''}. Check spelling, meaning and the highlighted answers before using this pack.</p></div>
          <div className="flex flex-wrap gap-2"><button className="studio-button studio-button-primary" onClick={play}>Play quiz</button><button className="studio-button studio-button-secondary" onClick={save}>Save draft</button><button className="studio-button studio-button-secondary" onClick={exportQuiz}>Download project JSON</button></div>
          {quiz.questions.map((item, i) => <article key={i} className="rounded-xl border border-violet-100 p-4"><p className="text-xs font-bold text-violet-700">{i + 1}. {questionTypes[item.type]}</p><h3 className="mt-2 font-bold" lang={quiz.instructionLanguage} dir={languageDirection(quiz.instructionLanguage)}>{item.question}</h3><p className="mt-3 text-2xl" lang={quiz.targetLanguage} dir={languageDirection(quiz.targetLanguage)}>{item.text}</p>{item.transliteration && <p className="mt-1 text-sm text-slate-500" dir="auto">{item.transliteration}</p>}<ul className="mt-3 space-y-1">{item.options.map((option, j) => <li key={j} dir="auto" className={j === item.correctIndex ? 'font-bold text-emerald-800' : 'text-slate-600'}>{j === item.correctIndex ? '✓ ' : ''}{option}</li>)}</ul><p className="mt-3 text-sm text-slate-600" dir={languageDirection(quiz.instructionLanguage)} lang={quiz.instructionLanguage}>{item.explanation}</p></article>)}
        </section>}
        {view === 'play' && <section className="space-y-5"><div className="flex flex-wrap justify-between gap-2"><h2 className="font-black" dir="auto">{quiz.title}</h2><span className="text-sm text-violet-700">Question {index + 1} / {quiz.questions.length} · {quiz.level}</span></div><h3 className="text-xl font-bold" lang={quiz.instructionLanguage} dir={languageDirection(quiz.instructionLanguage)}>{question.question}</h3><div className="rounded-2xl bg-violet-50 p-6"><p className="text-3xl leading-relaxed sm:text-4xl" lang={quiz.targetLanguage} dir={languageDirection(quiz.targetLanguage)}>{question.text}</p>{question.transliteration && <p className="mt-3 text-slate-600" dir="auto">{question.transliteration}</p>}</div>
          <div className="space-y-3">{question.options.map((option, i) => <button key={i} disabled={selected !== undefined} onClick={() => setAnswers(previous => previous[index] !== undefined ? previous : { ...previous, [index]: i })} className={`flex min-h-14 w-full items-center gap-3 rounded-xl border-2 p-4 text-start font-bold ${selected === undefined ? 'border-violet-200 hover:border-violet-700' : i === question.correctIndex ? 'border-emerald-500 bg-emerald-50' : i === selected ? 'border-rose-400 bg-rose-50' : 'border-slate-100 text-slate-500'}`}><span className="shrink-0 text-sm">{String.fromCharCode(65 + i)}</span><span className="flex-1" dir="auto">{option}</span>{selected !== undefined && i === question.correctIndex && <span aria-label="Correct answer">✓</span>}</button>)}</div>
          {selected !== undefined && <div role="status" className="rounded-xl bg-slate-50 p-4"><p className="mb-2 font-bold">{selected === question.correctIndex ? 'Correct' : 'Not quite'} · {question.options[question.correctIndex]}</p><p lang={quiz.instructionLanguage} dir={languageDirection(quiz.instructionLanguage)}>{question.explanation}</p></div>}
          <div className="flex justify-between gap-3"><button className="studio-button studio-button-secondary disabled:opacity-40" disabled={index === 0} onClick={() => setIndex(index - 1)}>Previous</button><button className="studio-button studio-button-primary disabled:opacity-40" disabled={selected === undefined} onClick={() => index === quiz.questions.length - 1 ? navigate('summary') : setIndex(index + 1)}>{index === quiz.questions.length - 1 ? 'See score' : 'Next question'}</button></div>
        </section>}
        {view === 'summary' && <section className="py-8 text-center"><p className="text-sm font-bold text-violet-700" dir="auto">{quiz.title}</p><h2 className="mt-3 text-4xl font-black">You scored {score} / {quiz.questions.length}</h2><p className="mt-3 text-slate-600">Review the explanations, then try the round again.</p><div className="mt-6 flex flex-wrap justify-center gap-3"><button className="studio-button studio-button-primary" onClick={play}>Play again</button><button className="studio-button studio-button-secondary" onClick={() => navigate('review')}>Review answers</button></div></section>}
      </div>
    </section>
  </main>;
}

function LanguageSelect({ label, value, onChange }: { label: string; value: LanguageCode; onChange: (value: LanguageCode) => void }) {
  return <label className="text-sm font-bold">{label}<select className="studio-input mt-1" value={value} onChange={event => onChange(event.target.value as LanguageCode)}>{(['High', 'Medium', 'Low'] as const).map(tier => <optgroup key={tier} label={`${tier} priority`}>{languages.filter(item => item[2] === tier).map(([code, name]) => <option key={code} value={code}>{name}</option>)}</optgroup>)}</select></label>;
}
function LibraryButton({ quiz, label, onClick }: { quiz: LanguageQuiz; label: string; onClick: () => void }) {
  return <button onClick={onClick} className="rounded-2xl border-2 border-violet-200 bg-violet-50 p-5 text-left hover:border-violet-700"><span className="text-xs font-black uppercase text-violet-700">{label} · {languageName(quiz.targetLanguage)} · {quiz.level}</span><span className="mt-2 block text-xl font-black" dir="auto">{quiz.title}</span><span className="mt-2 block text-sm text-slate-600">{quiz.questions.length} questions · {languageName(quiz.instructionLanguage)} instructions</span></button>;
}
