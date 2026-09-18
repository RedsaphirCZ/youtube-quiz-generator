import assetCredits from './assetCredits.json';
import React, { useEffect, useState } from 'react';
import { PictureQuizDataset } from './types';
import { countryAssetPath, countryCatalog, findCountry } from './countryAssets';
import { embedImage, readImageFile, verifyImage } from './imageAssets';

type AssetState = { kind: 'loading' | 'ready' | 'error'; message?: string };

export function PictureReview({ initialQuiz, onSave, onPlay }: {
  initialQuiz: PictureQuizDataset;
  onSave: (quiz: PictureQuizDataset) => Promise<void>;
  onPlay: (quiz: PictureQuizDataset) => void;
}) {
  const [quiz, setQuiz] = useState(initialQuiz);
  const [states, setStates] = useState<AssetState[]>(initialQuiz.questions.map(() => ({ kind: 'loading' })));
  const [confirmed, setConfirmed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');
  const versions = React.useRef<number[]>([]);
  const active = React.useRef(true);

  const replace = async (index: number, source: string | File, countryCode?: string) => {
    const version = (versions.current[index] || 0) + 1;
    versions.current[index] = version;
    setConfirmed(false);
    setStates(previous => previous.map((state, i) => i === index ? { kind: 'loading' } : state));
    try {
      const data = typeof source === 'string' ? await embedImage(source) : await readImageFile(source);
      await verifyImage(data);
      if (!active.current || versions.current[index] !== version) return;
      setQuiz(previous => ({ ...previous, questions: previous.questions.map((question, i) => i === index ? {
        ...question, image: { ...question.image, src: data, countryCode,
          credit: countryCode ? (previous.category === 'flags' ? 'flag-icons / FlagCDN (MIT)' : 'Natural Earth (public domain)') : typeof source === 'string' ? question.image.credit : undefined,
          sourceUrl: typeof source === 'string' && !countryCode ? question.image.sourceUrl : undefined },
      } : question) }));
      setStates(previous => previous.map((state, i) => i === index ? { kind: 'ready' } : state));
    } catch (error) {
      if (!active.current || versions.current[index] !== version) return;
      setStates(previous => previous.map((state, i) => i === index ? { kind: 'error', message: error instanceof Error ? error.message : 'Upload a local picture.' } : state));
    }
  };

  useEffect(() => {
    active.current = true;
    // A small worker pool avoids flooding the browser for large imports.
    let next = 0;
    let cancelled = false;
    const worker = async () => {
      while (!cancelled && active.current && next < initialQuiz.questions.length) {
        const index = next++;
        const image = initialQuiz.questions[index].image;
        await replace(index, image.src, image.countryCode);
      }
    };
    void Promise.all(Array.from({ length: Math.min(4, initialQuiz.questions.length) }, worker));
    return () => { cancelled = true; active.current = false; versions.current = versions.current.map(v => v + 1); };
  }, [initialQuiz]);

  const ready = states.filter(state => state.kind === 'ready').length;
  const mismatch = (index: number) => { const question = quiz.questions[index]; const answer = findCountry(question.options[question.correctIndex] ?? ''); return !!(question.image.countryCode && answer && answer.iso2 !== question.image.countryCode); };
  const allReady = ready === quiz.questions.length && !quiz.questions.some((_, index) => mismatch(index));
  const save = async (play: boolean) => {
    setBusy(true); setNotice('');
    try { await onSave(quiz); setNotice('Saved with pictures in this browser.'); if (play) onPlay(quiz); }
    catch { setNotice('Could not save: browser storage may be full or unavailable. Download the project to keep your work.'); }
    finally { setBusy(false); }
  };
  const download = () => {
    const url = URL.createObjectURL(new Blob([JSON.stringify({ ...quiz, assetCredits }, null, 2)], { type: 'application/json' }));
    const link = document.createElement('a'); link.href = url; link.download = 'picture-quiz-project.json'; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return <section className="picture-review space-y-5">
    <div><h2 className="text-2xl font-black">Review pictures</h2><p className="mt-2 text-sm text-slate-600">{quiz.title} · {ready} / {quiz.questions.length} pictures ready. Check that each picture matches the highlighted answer. Saved projects include the pictures for offline playback.</p></div>
    <div className="grid gap-4 sm:grid-cols-2">{quiz.questions.map((question, index) => <article key={index} className="min-w-0 rounded-xl border border-slate-200 p-4 space-y-3">
      <h3 className="font-bold">{index + 1}. {question.question}</h3>
      <div className="flex h-44 items-center justify-center rounded-lg bg-slate-100 p-3">
        {states[index].kind === 'ready' ? <img src={question.image.src} alt={question.image.alt} className="max-h-full max-w-full object-contain" /> : <p role="status" className="text-sm text-slate-700">{states[index].kind === 'loading' ? 'Checking picture…' : 'Picture needs replacement'}</p>}
      </div>
      {states[index].kind === 'error' && <p className="text-sm text-rose-700">{states[index].message}</p>}
      {question.image.searchHint && <p className="text-sm text-slate-600">Find: {question.image.searchHint}</p>}
      {mismatch(index) && <p role="alert" className="text-sm text-rose-700">The selected country does not match the correct answer. Choose the matching country below.</p>}
      <p className="text-sm font-bold text-emerald-800">Correct answer: {question.options[question.correctIndex]}</p>
      <p className="text-sm text-slate-600">{question.explanation}</p>
      {['flags', 'country-shapes'].includes(quiz.category) && <label className="block text-sm font-bold">Country picture
        <select disabled={states[index].kind === 'loading'} aria-label={`Country picture ${index + 1}`} value={question.image.countryCode || ''} onChange={event => { const code = event.target.value; if (code) void replace(index, countryAssetPath(code, quiz.category), code); }} className="mt-1 min-h-11 w-full rounded-lg border px-2">
          <option value="">Choose a country</option>{countryCatalog.map(country => <option key={country.iso2} value={country.iso2}>{country.name}</option>)}
        </select>
      </label>}
      <label className="flex min-h-11 items-center justify-center rounded-lg border-2 border-cyan-700 px-3 text-sm font-bold text-cyan-800 cursor-pointer">Upload / replace picture
        <input disabled={states[index].kind === 'loading'} aria-label={`Replace picture ${index + 1}`} type="file" accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml" className="sr-only" onChange={event => { const file = event.target.files?.[0]; event.target.value = ''; if (file) void replace(index, file); }} />
      </label>
    </article>)}</div>
    <div className="sticky bottom-0 rounded-xl border border-slate-200 bg-white p-4 shadow-lg space-y-3">
      <label className="flex min-h-11 items-center gap-3 text-sm font-bold"><input type="checkbox" checked={confirmed} disabled={!allReady} onChange={event => setConfirmed(event.target.checked)} />I checked that every picture matches its answer</label>
      <div className="flex flex-wrap gap-2">
        <button className="studio-button studio-button-primary" disabled={!allReady || !confirmed || busy} onClick={() => void save(true)}>Save &amp; play</button>
        <button className="studio-button studio-button-secondary" disabled={busy} onClick={() => void save(false)}>Save draft</button>
        <button className="studio-button studio-button-secondary" disabled={!allReady || !confirmed} onClick={download}>Download project + pictures</button>
      </div>
      {notice && <p role="status" className="text-sm">{notice}</p>}
    </div>
  </section>;
}
