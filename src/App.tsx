import { lazy, Suspense, useState } from 'react';
import { ModeLandingPage } from './components/ModeLandingPage';

const ClassicStudio = lazy(() => import('./ClassicStudio'));
const PictureQuizStudio = lazy(() => import('./picture-quiz/PictureQuizStudio').then(module => ({ default: module.PictureQuizStudio })));

export default function App() {
  const [mode, setMode] = useState<'home' | 'classic' | 'pictures'>('home');
  const exit = () => setMode('home');
  return <Suspense fallback={<main role="status" className="min-h-screen flex items-center justify-center">Loading studio…</main>}>
    {mode === 'classic' ? <ClassicStudio onExit={exit} /> : mode === 'pictures' ? <PictureQuizStudio onExit={exit} /> :
      <ModeLandingPage onOpenClassic={() => setMode('classic')} onOpenPictures={() => setMode('pictures')}
        onOpenFlagCards={() => window.location.assign(new URL('flag-card-studio/', document.baseURI).href)} />}
  </Suspense>;
}
