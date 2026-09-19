import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, BookOpenCheck, Download, Languages, MessageSquareText, Printer } from 'lucide-react';
import { generateLanguagePrompt, languageDemo, languageDirection, languageName, languages, levels, loadLanguageLibrary, parseLanguageQuiz, questionTypes, saveLanguageQuiz } from './languageQuiz';
import type { LanguageCode, LanguagePromptConfig, LanguageQuiz } from './languageQuiz';
import { embedPhraseFlags, flagPath, generatePhrasePrompt, loadPhraseLibrary, parsePhraseDeck, phraseCardTheme, phraseDeckHTML, phraseProfiles, savePhraseDeck } from './phraseCards';
import type { PhraseCard, PhraseConfig, PhraseDeck } from './phraseCards';

type View = 'home' | 'prompt' | 'import' | 'library' | 'review' | 'play' | 'summary' | 'phrasePrompt' | 'phraseImport' | 'phraseLibrary' | 'phraseReview';
const defaults: LanguagePromptConfig = { title: '', topic: 'Everyday words and greetings', targetLanguage: 'en', instructionLanguage: 'cs', variety: '', level: 'A1', questionCount: 20, answerChoiceCount: 3, focus: 'mixed', transliteration: true, instructions: '' };
const phraseDefaults: PhraseConfig = { title: '', phrase: '', sourceLanguage: 'en', context: 'Natural, neutral-polite everyday speech' };
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
  const [phraseConfig, setPhraseConfig] = useState(phraseDefaults);
  const [phraseRaw, setPhraseRaw] = useState('');
  const [phraseDeck, setPhraseDeck] = useState<PhraseDeck | null>(null);
  const [phraseLibrary, setPhraseLibrary] = useState<PhraseDeck[]>([]);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const [reading, setReading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  useEffect(() => {
    try { setLibrary(loadLanguageLibrary()); setPhraseLibrary(loadPhraseLibrary()); }
    catch { setError('Browser storage is unavailable or unreadable. You can still import, review and download projects.'); }
  }, []);
  const prompt = useMemo(() => {
    if (!config.title.trim() || !config.topic.trim()) return '';
    try { return generateLanguagePrompt(config); } catch { return ''; }
  }, [config]);
  const phrasePrompt = useMemo(() => {
    if (!phraseConfig.title.trim() || !phraseConfig.phrase.trim()) return '';
    try { return generatePhrasePrompt(phraseConfig); } catch { return ''; }
  }, [phraseConfig]);
  const navigate = (next: View) => { setNotice(''); setError(''); setView(next); };
  const openQuiz = (project: LanguageQuiz) => { setQuiz(project); navigate('review'); };
  const play = () => { setIndex(0); setAnswers({}); navigate('play'); };
  const save = () => { try { setLibrary(saveLanguageQuiz(quiz)); setError(''); setNotice('Draft saved in this browser.'); } catch { setError('Could not save to browser storage. Download the JSON to keep your project.'); } };
  const importQuiz = () => { try { openQuiz(parseLanguageQuiz(raw)); } catch (err) { setError(message(err)); } };
  const exportQuiz = () => download(JSON.stringify(quiz, null, 2), `${filename(quiz.title)}.json`, 'application/json');
  const openPhraseDeck = (project: PhraseDeck) => { setPhraseDeck(project); navigate('phraseReview'); };
  const importPhraseDeck = () => { try { openPhraseDeck(parsePhraseDeck(phraseRaw)); } catch (err) { setError(message(err)); } };
  const savePhrases = () => {
    if (!phraseDeck) return;
    try { setPhraseLibrary(savePhraseDeck(phraseDeck)); setError(''); setNotice('Phrase deck saved in this browser.'); }
    catch { setError('Could not save to browser storage. Download the JSON to keep your project.'); }
  };
  const exportPhraseJSON = () => { if (phraseDeck) download(JSON.stringify(phraseDeck, null, 2), `${filename(phraseDeck.title)}.json`, 'application/json'); };
  const buildPhraseHTML = async () => {
    if (!phraseDeck) throw new Error('Import a phrase deck first.');
    return phraseDeckHTML(phraseDeck, await embedPhraseFlags());
  };
  const downloadPhraseHTML = async () => {
    if (!phraseDeck) return;
    setExporting(true); setError('');
    try { download(await buildPhraseHTML(), `${filename(phraseDeck.title)}-print.html`, 'text/html;charset=utf-8'); setNotice('Printable file downloaded. Open it and choose Print / Save as PDF.'); }
    catch (err) { setError(message(err)); }
    finally { setExporting(false); }
  };
  const openPhrasePrint = () => {
    if (!phraseDeck) return;
    const target = window.open('', '_blank');
    if (!target) { setError('The print preview was blocked. Allow pop-ups or download the printable HTML instead.'); return; }
    target.opener = null;
    target.document.write('<!doctype html><title>Preparing phrase cards</title><p style="font:16px sans-serif;padding:24px">Preparing embedded flags and print layout…</p>');
    setExporting(true); setError('');
    void buildPhraseHTML().then(html => { target.document.open(); target.document.write(html); target.document.close(); setNotice('Print view opened. Choose Print / Save as PDF.'); })
      .catch(err => { target.close(); setError(message(err)); }).finally(() => setExporting(false));
  };
  const question = quiz.questions[index];
  const selected = answers[index];
  const score = Object.entries(answers).filter(([key, value]) => quiz.questions[Number(key)].correctIndex === value).length;

  return <main className="min-h-screen bg-[#f3f0f8] px-4 py-6 text-slate-900 sm:py-10">
    <section className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-violet-200 bg-white shadow-lg">
      <header className="border-t-[6px] border-violet-700 bg-violet-50 p-5 sm:p-8">
        <div className="flex items-start justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-widest text-violet-700">YouTube Quiz Studio</p><h1 className="mt-2 flex items-center gap-3 text-2xl font-black sm:text-3xl"><Languages aria-hidden="true" />Language Quiz</h1></div>
          <button className="studio-button studio-button-secondary" onClick={onExit}><ArrowLeft size={16} />Quiz modes</button></div>
        <p className="mt-3 text-sm text-slate-600">Choose a researched learning quiz or translate one phrase into all 24 languages with IPA, Czech pronunciation and printable cards.</p>
      </header>
      <div className="p-5 sm:p-8">
        {view !== 'home' && <button className="studio-button studio-button-secondary mb-5" onClick={() => navigate('home')}><ArrowLeft size={16} />Language home</button>}
        {error && <p role="alert" className="mb-4 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">{error}</p>}
        {notice && <p role="status" className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">{notice}</p>}
        {view === 'home' && <>
          <div className="grid gap-5 lg:grid-cols-2">
            <section className="rounded-2xl border-2 border-violet-200 bg-violet-50 p-5 sm:p-6">
              <BookOpenCheck className="text-violet-700" aria-hidden="true" />
              <h2 className="mt-3 text-xl font-black">Research a language quiz</h2>
              <p className="mt-2 text-sm text-slate-600">Choose one language, topic and CEFR level. Gemini researches the material and returns a playable learning quiz.</p>
              <div className="mt-5 flex flex-wrap gap-2"><button className="studio-button studio-button-primary" onClick={() => navigate('prompt')}>Get research prompt</button><button className="studio-button studio-button-secondary" onClick={() => navigate('import')}>Import quiz</button><button className="studio-button studio-button-secondary" onClick={() => navigate('library')}>Quiz library</button></div>
            </section>
            <section className="rounded-2xl border-2 border-fuchsia-200 bg-fuchsia-50 p-5 sm:p-6">
              <MessageSquareText className="text-fuchsia-700" aria-hidden="true" />
              <h2 className="mt-3 text-xl font-black">Translate one phrase</h2>
              <p className="mt-2 text-sm text-slate-600">Give Gemini one phrase. It returns all 24 translations in native scripts, full-phrase IPA, Czech-reader pronunciation, named varieties and printable flag cards.</p>
              <div className="mt-5 flex flex-wrap gap-2"><button className="studio-button studio-button-primary" onClick={() => navigate('phrasePrompt')}>Get translation prompt</button><button className="studio-button studio-button-secondary" onClick={() => navigate('phraseImport')}>Import translations</button><button className="studio-button studio-button-secondary" onClick={() => navigate('phraseLibrary')}>Phrase library</button></div>
            </section>
          </div>
          <section className="mt-8"><h2 className="text-xl font-black">Your 24 languages</h2><p className="mt-2 text-sm text-slate-600">Select one to start a research quiz. Phrase decks automatically include every language below.</p>
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
        {view === 'phrasePrompt' && <div className="space-y-5">
          <div><p className="text-xs font-black uppercase tracking-widest text-fuchsia-700">Mode 2 · all 24 languages</p><h2 className="mt-2 text-2xl font-black">Create a phrase translation prompt</h2><p className="mt-2 text-sm text-slate-600">Describe the exact meaning and register, then give this prompt to Gemini. It must return one checked translation and full-phrase IPA transcription for every language.</p></div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-bold">Deck name *<input className="studio-input mt-1" value={phraseConfig.title} onChange={e => setPhraseConfig({ ...phraseConfig, title: e.target.value })} placeholder="Where is the train station?" /></label>
            <LanguageSelect label="Original phrase language" value={phraseConfig.sourceLanguage} onChange={sourceLanguage => setPhraseConfig({ ...phraseConfig, sourceLanguage })} />
            <label className="text-sm font-bold sm:col-span-2">Phrase to translate *<textarea aria-label="Phrase to translate" className="studio-input mt-1 h-24" value={phraseConfig.phrase} onChange={e => setPhraseConfig({ ...phraseConfig, phrase: e.target.value })} placeholder="Where is the train station?" /></label>
            <label className="text-sm font-bold sm:col-span-2">Meaning, situation and register<textarea className="studio-input mt-1 h-24" value={phraseConfig.context} onChange={e => setPhraseConfig({ ...phraseConfig, context: e.target.value })} placeholder="A traveller politely asking a stranger for directions." /></label>
          </div>
          <p className="rounded-xl border border-fuchsia-200 bg-fuchsia-50 p-4 text-sm text-fuchsia-950">Included automatically: {languages.map(item => item[1]).join(', ')}.</p>
          <details className="rounded-xl border border-violet-200 p-4"><summary className="cursor-pointer font-bold">Preview generated Markdown</summary><textarea aria-label="Generated phrase prompt" className="mt-3 h-72 w-full rounded-lg bg-slate-950 p-3 font-mono text-xs text-white" readOnly value={phrasePrompt || 'Enter a deck name and phrase.'} /></details>
          <div className="flex flex-wrap gap-3"><button className="studio-button studio-button-primary disabled:opacity-40" disabled={!phrasePrompt} onClick={() => download(phrasePrompt, `${filename(phraseConfig.title)}-phrase-prompt.md`, 'text/markdown;charset=utf-8')}><Download size={16} />Download prompt .md</button><button className="studio-button studio-button-secondary disabled:opacity-40" disabled={!phrasePrompt} onClick={async () => { try { await navigator.clipboard.writeText(phrasePrompt); setNotice('Phrase prompt copied.'); } catch { setError('Copy was blocked. Use the prompt preview or download instead.'); } }}>Copy prompt</button><button className="studio-button studio-button-secondary" onClick={() => navigate('phraseImport')}>Import response</button></div>
        </div>}
        {view === 'phraseImport' && <div className="space-y-4"><div><p className="text-xs font-black uppercase tracking-widest text-fuchsia-700">Mode 2 · all 24 languages</p><h2 className="mt-2 text-2xl font-black">Import phrase translations</h2><p className="mt-2 text-sm text-slate-600">Paste plain or fenced phrase-flashcards/v1 JSON from Gemini. The importer requires all 24 languages exactly once, with complete IPA and Czech-reader pronunciation for every phrase.</p></div>
          <label className="block text-sm font-bold">Select JSON or text file<input className="mt-2 block w-full text-sm" type="file" accept=".json,.txt,.md" disabled={reading} onChange={async e => { const file = e.target.files?.[0]; e.target.value = ''; if (!file) return; setReading(true); setError(''); try { if (file.size > 2 * 1024 * 1024) throw new Error('Choose a file smaller than 2 MB.'); setPhraseRaw(await file.text()); } catch (err) { setError(message(err)); } finally { setReading(false); } }} /></label>
          <textarea aria-label="Phrase deck JSON" className="h-80 w-full rounded-xl bg-slate-950 p-4 font-mono text-xs text-white" value={phraseRaw} onChange={e => { setPhraseRaw(e.target.value); setError(''); }} placeholder="Paste phrase-flashcards/v1 JSON here" />
          <button className="studio-button studio-button-primary disabled:opacity-40" disabled={!phraseRaw.trim() || reading} onClick={importPhraseDeck}>{reading ? 'Reading file…' : 'Import & review 24 cards'}</button>
        </div>}
        {view === 'phraseLibrary' && <section><h2 className="text-2xl font-black">Phrase library</h2><p className="mt-2 text-sm text-slate-600">Saved phrase decks stay in this browser. Each deck contains all 24 languages, IPA and printable front/back cards.</p>{phraseLibrary.length === 0 ? <p className="mt-5 rounded-xl bg-slate-50 p-5 text-sm text-slate-600">No saved phrase decks yet. Create a prompt, import Gemini’s JSON and save the reviewed draft.</p> : <div className="mt-5 grid gap-3 sm:grid-cols-2">{phraseLibrary.map(project => <button key={project.id} onClick={() => openPhraseDeck(project)} className="rounded-2xl border-2 border-fuchsia-200 bg-fuchsia-50 p-5 text-left hover:border-fuchsia-700"><span className="text-xs font-black uppercase text-fuchsia-700">Saved phrase deck · {project.cards.length} languages</span><span className="mt-2 block text-xl font-black" dir="auto">{project.title}</span><span className="mt-2 block text-sm text-slate-600" dir="auto">{project.sourcePhrase}</span></button>)}</div>}</section>}
        {view === 'import' && <div className="space-y-4"><h2 className="text-2xl font-black">Import a language quiz</h2><p className="text-sm text-slate-600">Paste plain or fenced JSON from the Language Quiz prompt, or select a saved project. Imports stay unreviewed until you check their language content.</p>
          <label className="block text-sm font-bold">Select JSON or text file<input className="mt-2 block w-full text-sm" type="file" accept=".json,.txt,.md" disabled={reading} onChange={async e => { const file = e.target.files?.[0]; e.target.value = ''; if (!file) return; setReading(true); setError(''); try { if (file.size > 2 * 1024 * 1024) throw new Error('Choose a file smaller than 2 MB.'); setRaw(await file.text()); } catch (err) { setError(message(err)); } finally { setReading(false); } }} /></label>
          <textarea aria-label="Language quiz JSON" className="h-80 w-full rounded-xl bg-slate-950 p-4 font-mono text-xs text-white" value={raw} onChange={e => { setRaw(e.target.value); setError(''); }} placeholder="Paste language-quiz/v1 JSON here" />
          <button className="studio-button studio-button-primary disabled:opacity-40" disabled={!raw.trim() || reading} onClick={importQuiz}>{reading ? 'Reading file…' : 'Import & review'}</button>
        </div>}
        {view === 'library' && <section><h2 className="text-2xl font-black">Language library</h2><p className="mt-2 text-sm text-slate-600">Drafts are saved in this browser. Download JSON to keep a backup or move to another device.</p><div className="mt-5 grid gap-3 sm:grid-cols-2"><LibraryButton quiz={languageDemo} label="Sample" onClick={() => openQuiz(languageDemo)} />{library.map(project => <LibraryButton key={project.id} quiz={project} label="Saved draft" onClick={() => openQuiz(project)} />)}</div></section>}
        {view === 'phraseReview' && phraseDeck && <section className="space-y-5"><div><p className="text-xs font-black uppercase tracking-widest text-fuchsia-700">Unreviewed phrase deck · {phraseDeck.cards.length} languages</p><h2 className="mt-2 text-2xl font-black" dir="auto">{phraseDeck.title}</h2><p className="mt-2 text-sm text-slate-600"><strong>Source:</strong> <span dir="auto">{phraseDeck.sourcePhrase}</span>{phraseDeck.context ? ` · ${phraseDeck.context}` : ''}. Check translations, IPA and Czech-reader pronunciation with a fluent speaker or trusted reference before publishing.</p></div>
          <div className="grid gap-4 rounded-2xl border border-fuchsia-200 bg-fuchsia-50 p-4 sm:grid-cols-2"><label className="text-sm font-bold">Card backgrounds<select className="studio-input mt-1" value={phraseDeck.design.backgroundMode} onChange={e => setPhraseDeck({ ...phraseDeck, design: { ...phraseDeck.design, backgroundMode: e.target.value as PhraseDeck['design']['backgroundMode'] } })}><option value="language">Permanent flag-inspired colour per language</option><option value="set">One colour for the whole set</option></select></label><label className="text-sm font-bold">Set colour<input aria-label="Set background colour" className="mt-1 h-11 w-full cursor-pointer rounded-lg border border-violet-200 bg-white p-1 disabled:cursor-not-allowed disabled:opacity-40" type="color" value={phraseDeck.design.setColor} disabled={phraseDeck.design.backgroundMode !== 'set'} onChange={e => setPhraseDeck({ ...phraseDeck, design: { ...phraseDeck.design, setColor: e.target.value } })} /></label><p className="text-xs text-slate-600 sm:col-span-2">The flag-inspired colours are fixed for each language, so the same language always keeps the same design. Your selected mode and set colour are saved in the project.</p></div>
          <div className="flex flex-wrap gap-2"><button className="studio-button studio-button-primary disabled:opacity-40" disabled={exporting} onClick={openPhrasePrint}><Printer size={16} />{exporting ? 'Preparing…' : 'Open print / Save PDF'}</button><button className="studio-button studio-button-secondary disabled:opacity-40" disabled={exporting} onClick={() => void downloadPhraseHTML()}><Download size={16} />Download printable HTML</button><button className="studio-button studio-button-secondary" onClick={savePhrases}>Save draft</button><button className="studio-button studio-button-secondary" onClick={exportPhraseJSON}>Download project JSON</button></div>
          <div className="grid gap-4 md:grid-cols-2">{phraseDeck.cards.map((card, i) => <PhraseCardPreview key={card.language} card={card} deck={phraseDeck} index={i} />)}</div>
        </section>}
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

function PhraseCardPreview({ card, deck, index }: { card: PhraseCard; deck: PhraseDeck; index: number }) {
  const theme = phraseCardTheme(deck, card.language);
  const cardStyle = { backgroundColor: theme.background, color: theme.text, borderTopColor: theme.accent };
  return <article className="overflow-hidden rounded-3xl shadow-lg"><div className="grid min-h-64 grid-cols-2"><div style={cardStyle} className="relative flex items-center justify-center border-r border-dashed border-white/40 border-t-8 p-5 text-center"><span className="absolute -bottom-12 -right-12 h-32 w-32 rounded-full border-[18px] opacity-10" style={{ borderColor: theme.accent }} /><p className="relative text-3xl font-black leading-tight sm:text-4xl" lang={card.language} dir={languageDirection(card.language)}>{card.phrase}</p></div><div style={cardStyle} className="relative flex flex-col items-center justify-center border-t-8 p-4 text-center"><p className="text-xl font-black leading-tight" lang={card.language} dir={languageDirection(card.language)}>{card.phrase}</p><div className="mt-3 flex flex-wrap justify-center gap-1">{phraseProfiles[card.language].flags.map(country => <img key={country} className="h-5 w-7 object-contain drop-shadow" src={flagPath(country)} alt={`${country.toUpperCase()} flag`} />)}</div><h3 className="mt-2 font-black">{languageName(card.language)}</h3><p className="mt-2 text-sm leading-snug"><strong>Česky:</strong> {card.czechPronunciation}</p><p className="mt-1 text-xs" dir="ltr"><strong>IPA:</strong> {card.ipa}</p><p className="mt-1 text-[10px] opacity-75">{card.variety}</p></div></div><p className="bg-white px-4 py-2 text-xs font-bold text-fuchsia-700">{String(index + 1).padStart(2, '0')} / {deck.cards.length} · front / back preview</p></article>;
}
