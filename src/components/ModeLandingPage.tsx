import React from 'react';
import { ArrowRight, Flag, Images, Languages, ListChecks } from 'lucide-react';

interface ModeLandingPageProps {
  onOpenClassic: () => void;
  onOpenPictures: () => void;
  onOpenFlagCards: () => void;
  onOpenLanguages: () => void;
}

export const ModeLandingPage: React.FC<ModeLandingPageProps> = ({ onOpenClassic, onOpenPictures, onOpenFlagCards, onOpenLanguages }) => (
  <main className="min-h-screen bg-[#f1eee7] px-4 py-8 text-[#201c18] sm:py-12 flex items-center justify-center">
    <section className="w-full max-w-5xl overflow-hidden rounded-[2rem] border border-[#d6ccbd] bg-white shadow-xl">
      <header className="px-6 pb-6 pt-8 text-center sm:px-10 sm:pb-8 sm:pt-10">
        <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[#8b1e1e]">YouTube Quiz Studio</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-5xl">Choose your studio</h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[#6b635b] sm:text-base">Build playable quizzes, visual rounds, language practice, or print-ready flag cards and worksheets.</p>
      </header>

      <div className="grid gap-4 border-t border-[#e5ddd1] bg-[#faf8f4] p-5 md:grid-cols-2 md:gap-5 sm:p-8">
        <ModeButton
          icon={ListChecks}
          eyebrow="Text and numbers"
          title="Classic Quiz"
          description="Create prompts, import quiz JSON, browse the library, play, review, and export."
          accent="classic"
          onClick={onOpenClassic}
        />
        <ModeButton
          icon={Images}
          eyebrow="Visual recognition"
          title="Picture Quiz"
          description="Build rounds for brands, country shapes, flags, landmarks, people, and objects."
          accent="pictures"
          onClick={onOpenPictures}
        />
        <ModeButton icon={Languages} eyebrow="Words and conversation" title="Language Quiz"
          description="Research learning quizzes or translate one phrase into 24 languages with IPA, Czech pronunciation, colours and printable cards."
          accent="languages" onClick={onOpenLanguages} />
        <ModeButton
          icon={Flag}
          eyebrow="Print workshop"
          title="Flag Card Studio"
          description="Create Poker or Tarot cards and A4/A5 write-under worksheets from 195 bundled countries."
          accent="cards"
          onClick={onOpenFlagCards}
        />
      </div>
    </section>
  </main>
);

const ModeButton = ({ icon: Icon, eyebrow, title, description, accent, onClick }: {
  icon: typeof Images;
  eyebrow: string;
  title: string;
  description: string;
  accent: 'classic' | 'pictures' | 'cards' | 'languages';
  onClick: () => void;
}) => {
  const pictureMode = accent === 'pictures';
  const cardMode = accent === 'cards';
  const languageMode = accent === 'languages';
  const borderClass = languageMode ? 'border-violet-200 bg-violet-50 hover:border-violet-700' : pictureMode
    ? 'border-cyan-200 bg-[#eef9fb] hover:border-cyan-700'
    : cardMode
      ? 'border-emerald-200 bg-[#f1f8f4] hover:border-[#143f3a]'
      : 'border-[#decfbd] bg-white hover:border-[#8b1e1e]';
  const accentClass = languageMode ? 'bg-violet-700' : pictureMode ? 'bg-cyan-700' : cardMode ? 'bg-[#143f3a]' : 'bg-[#8b1e1e]';
  const textClass = languageMode ? 'text-violet-800' : pictureMode ? 'text-cyan-800' : cardMode ? 'text-[#285b51]' : 'text-[#8b1e1e]';
  return (
    <button
      onClick={onClick}
      className={`group min-h-64 rounded-3xl border-2 p-6 text-left transition hover:-translate-y-1 hover:shadow-lg cursor-pointer sm:p-7 ${borderClass}`}
    >
      <span className={`flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-sm ${accentClass}`}><Icon className="h-7 w-7" /></span>
      <span className={`mt-6 block text-[11px] font-black uppercase tracking-[0.18em] ${textClass}`}>{eyebrow}</span>
      <span className="mt-1 block text-3xl font-black">{title}</span>
      <span className="mt-3 block max-w-sm text-sm leading-relaxed text-[#655e57]">{description}</span>
      <span className={`mt-6 inline-flex items-center gap-2 font-black ${textClass}`}>Open studio <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
    </button>
  );
};
