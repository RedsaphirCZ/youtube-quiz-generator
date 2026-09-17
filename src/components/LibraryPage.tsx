import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, BookOpen, CheckCircle2, Download, Home, Library, Play, Search, ShieldAlert, ShieldCheck, Sparkles, Trash2, Upload, X } from 'lucide-react';
import { curatedQuizzes } from '../data/curatedQuizzes';
import { generateStandaloneQuizHTML } from '../lib/htmlExporter';
import { deleteSavedQuiz, getSavedQuizzes, saveQuizToLibrary } from '../lib/quizStorage';
import { FlexibleQuizExpectation, validateQuizDataset } from '../lib/validator';
import { QuizDataset } from '../types';

interface LibraryPageProps {
  currentQuizId: string;
  returnLabel: string;
  onBack: () => void;
  onHome: () => void;
  onSelectQuiz: (quiz: QuizDataset) => void;
}

const CATEGORIES = ['All', 'Ancient Civilizations & Empires', 'Modern History & Landmark Wars', 'Nature, Wildlife & Biology', 'Astronomy, Physics & Chemistry', 'Geography, Capitals & Landscapes', 'Tech, Inventions & Engineering', 'Arts, Music, Literature & Philosophy', 'Sports, Records & General Knowledge'] as const;

const CATEGORY_LABELS: Record<string, string> = {
  All: 'All topics',
  'Ancient Civilizations & Empires': 'Ancient empires',
  'Modern History & Landmark Wars': 'Modern history',
  'Nature, Wildlife & Biology': 'Nature & wildlife',
  'Astronomy, Physics & Chemistry': 'Science & space',
  'Geography, Capitals & Landscapes': 'Geography & cities',
  'Tech, Inventions & Engineering': 'Tech & engineering',
  'Arts, Music, Literature & Philosophy': 'Arts & culture',
  'Sports, Records & General Knowledge': 'Sports & general',
};

const inferExpectation = (questionCount: number): number | FlexibleQuizExpectation | undefined => {
  if (questionCount === 20) return 4;
  if (questionCount > 0 && questionCount % 6 === 0) return questionCount / 6;
  if (questionCount > 0) return { questionCount, flexible: true };
  return undefined;
};

const downloadQuiz = (quiz: QuizDataset) => {
  const html = generateStandaloneQuizHTML(quiz);
  const filename = `${(quiz.title || 'quiz').toLowerCase().replace(/[^a-z0-9]+/g, '-')}.html`;
  const url = URL.createObjectURL(new Blob([html], { type: 'text/html;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const LibraryPage: React.FC<LibraryPageProps> = ({ currentQuizId, returnLabel, onBack, onHome, onSelectQuiz }) => {
  const [activeTab, setActiveTab] = useState<'curated' | 'saved'>('curated');
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<(typeof CATEGORIES)[number]>('All');
  const [savedQuizzes, setSavedQuizzes] = useState<QuizDataset[]>([]);
  const [pendingDelete, setPendingDelete] = useState<QuizDataset | null>(null);
  const [importMessage, setImportMessage] = useState<string | null>(null);
  const [isImporting, setIsImporting] = useState(false);

  useEffect(() => setSavedQuizzes(getSavedQuizzes()), []);

  const totalCuratedQuestions = useMemo(() => curatedQuizzes.reduce((sum, quiz) => sum + quiz.questions.length, 0), []);
  const visibleCurated = useMemo(() => {
    const query = search.trim().toLowerCase();
    return curatedQuizzes.filter((quiz) => {
      const category = quiz.category || 'Sports, Records & General Knowledge';
      return (selectedCategory === 'All' || category === selectedCategory) && (!query || [quiz.title, quiz.theme, quiz.description, category].some((value) => value.toLowerCase().includes(query)));
    });
  }, [search, selectedCategory]);
  const visibleSaved = useMemo(() => {
    const query = search.trim().toLowerCase();
    return savedQuizzes.filter((quiz) => !query || [quiz.title, quiz.theme, quiz.description].some((value) => value.toLowerCase().includes(query)));
  }, [savedQuizzes, search]);

  const handleBulkImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = (Array.from(event.target.files || []) as File[]).filter((file) => file.name.toLowerCase() === 'dataset.json');
    event.target.value = '';
    if (!files.length) return;
    setIsImporting(true);
    setImportMessage(null);
    let imported = 0;
    let skipped = 0;
    for (const file of files) {
      try {
        const parsed = JSON.parse(await file.text()) as QuizDataset;
        if (!parsed || !Array.isArray(parsed.questions) || !parsed.questions.length) { skipped += 1; continue; }
        const quiz: QuizDataset = { ...parsed, id: parsed.id || `imported-${Date.now()}-${imported}`, title: parsed.title || parsed.theme || file.webkitRelativePath || file.name, theme: parsed.theme || parsed.title || 'Imported Quiz', description: parsed.description || 'Imported quiz dataset.', createdAt: parsed.createdAt || new Date().toISOString(), validated: false };
        if (saveQuizToLibrary(quiz)) imported += 1; else skipped += 1;
      } catch { skipped += 1; }
    }
    setSavedQuizzes(getSavedQuizzes());
    setImportMessage(`Imported ${imported} quiz${imported === 1 ? '' : 'zes'}${skipped ? `; skipped ${skipped}` : ''}.`);
    setIsImporting(false);
  };

  const confirmDelete = () => {
    if (!pendingDelete) return;
    deleteSavedQuiz(pendingDelete.id);
    setSavedQuizzes(getSavedQuizzes());
    setPendingDelete(null);
  };

  const visibleCount = activeTab === 'curated' ? visibleCurated.length : visibleSaved.length;

  return (
    <main className="studio-page min-h-screen text-[#2b2520]">
      <header className="studio-topbar">
        <div className="studio-topbar-inner">
          <div className="flex items-center gap-3 min-w-0"><div className="studio-mark"><Library className="w-5 h-5" /></div><div className="min-w-0"><p className="studio-eyebrow">YouTube Quiz Studio</p><h1 className="text-xl sm:text-2xl font-black tracking-tight text-[#8b1e1e] truncate">Quiz library</h1></div></div>
          <nav className="flex items-center gap-2" aria-label="Library navigation">
            <button onClick={onBack} className="studio-button studio-button-secondary"><ArrowLeft className="w-4 h-4" /><span className="hidden sm:inline">{returnLabel}</span><span className="sm:hidden">Back</span></button>
            {returnLabel !== 'Home' && <button onClick={onHome} className="studio-button studio-button-ghost" aria-label="Home"><Home className="w-4 h-4" /><span className="hidden sm:inline">Home</span></button>}
          </nav>
        </div>
      </header>

      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        <section className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl"><h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#211b17]">Find your next quiz</h2><p className="mt-2 text-sm sm:text-base leading-relaxed text-[#6b635b]">Browse {curatedQuizzes.length} ready-made packs or continue with drafts saved in this browser.</p></div>
          <div className="relative w-full lg:w-96"><Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#83796f]" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={`Search ${activeTab === 'curated' ? 'topics and categories' : 'saved quizzes'}…`} className="studio-input pl-11" aria-label="Search quizzes" /></div>
        </section>

        <div className="mb-5 flex items-center gap-2 border-b border-[#d9cebc]" role="tablist" aria-label="Quiz library sections">
          <TabButton active={activeTab === 'curated'} onClick={() => { setActiveTab('curated'); setSearch(''); }}><BookOpen className="w-4 h-4" /> Curated <span className="studio-count">{curatedQuizzes.length}</span></TabButton>
          <TabButton active={activeTab === 'saved'} onClick={() => { setActiveTab('saved'); setSearch(''); }}><Sparkles className="w-4 h-4" /> My drafts <span className="studio-count">{savedQuizzes.length}</span></TabButton>
        </div>

        {activeTab === 'curated' ? (
          <section>
            <div className="mb-5 flex flex-wrap gap-2" aria-label="Quiz categories">
              {CATEGORIES.map((category) => {
                const count = category === 'All' ? curatedQuizzes.length : curatedQuizzes.filter((quiz) => (quiz.category || 'Sports, Records & General Knowledge') === category).length;
                return <button key={category} onClick={() => setSelectedCategory(category)} className={`studio-filter ${selectedCategory === category ? 'studio-filter-active' : ''}`} aria-pressed={selectedCategory === category}>{CATEGORY_LABELS[category]} <span>{count}</span></button>;
              })}
            </div>
            <LibrarySummary count={visibleCount} totalQuestions={totalCuratedQuestions} />
            {visibleCurated.length ? <div className="library-grid">{visibleCurated.map((quiz) => <QuizCard key={quiz.id} quiz={quiz} isCurrent={quiz.id === currentQuizId} onPlay={() => onSelectQuiz(quiz)} />)}</div> : <EmptyState title="No matching quizzes" body="Try a broader search or choose another category." />}
          </section>
        ) : (
          <section>
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><LibrarySummary count={visibleCount} /><label className={`studio-button studio-button-secondary cursor-pointer ${isImporting ? 'opacity-50 pointer-events-none' : ''}`}><Upload className="w-4 h-4" /> {isImporting ? 'Importing…' : 'Import quiz folder'}<input type="file" multiple accept=".json,application/json" onChange={handleBulkImport} className="hidden" {...({ webkitdirectory: 'true', directory: 'true' } as React.InputHTMLAttributes<HTMLInputElement>)} /></label></div>
            {importMessage && <p className="mb-4 rounded-xl border border-[#2e7d32]/30 bg-[#e8f5e9] px-4 py-3 text-sm font-semibold text-[#2e7d32]">{importMessage}</p>}
            {visibleSaved.length ? <div className="library-grid">{visibleSaved.map((quiz) => <QuizCard key={quiz.id} quiz={quiz} isCurrent={quiz.id === currentQuizId} saved onPlay={() => onSelectQuiz(quiz)} onExport={() => downloadQuiz(quiz)} onDelete={() => setPendingDelete(quiz)} />)}</div> : <EmptyState title={search ? 'No matching drafts' : 'No drafts saved yet'} body={search ? 'Try a broader search.' : 'Use Get prompt or Import from Home to create your first unreviewed draft.'} action={!search ? <button onClick={onHome} className="studio-button studio-button-primary"><Home className="w-4 h-4" /> Go home</button> : undefined} />}
          </section>
        )}
      </div>

      {pendingDelete && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4"><section className="w-full max-w-md rounded-2xl border border-[#d9cebc] bg-white p-6 shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="delete-title"><div className="flex items-start justify-between gap-4"><div><p className="studio-eyebrow">Saved draft</p><h2 id="delete-title" className="mt-1 text-xl font-black">Delete this quiz?</h2></div><button onClick={() => setPendingDelete(null)} className="studio-icon-button" aria-label="Close delete confirmation"><X className="w-4 h-4" /></button></div><p className="mt-4 text-sm leading-relaxed text-[#6b635b]">“{pendingDelete.title}” will be removed from this browser. This cannot be undone.</p><div className="mt-6 flex justify-end gap-2"><button onClick={() => setPendingDelete(null)} className="studio-button studio-button-secondary">Cancel</button><button onClick={confirmDelete} className="studio-button bg-[#b4232b] text-white hover:bg-[#921b22]"><Trash2 className="w-4 h-4" /> Delete quiz</button></div></section></div>}
    </main>
  );
};

const TabButton = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => <button role="tab" aria-selected={active} onClick={onClick} className={`studio-tab ${active ? 'studio-tab-active' : ''}`}>{children}</button>;
const LibrarySummary = ({ count, totalQuestions }: { count: number; totalQuestions?: number }) => <p className="mb-4 text-xs font-black uppercase tracking-[0.12em] text-[#776d64]">{count} quiz{count === 1 ? '' : 'zes'}{totalQuestions ? ` · ${totalQuestions.toLocaleString()} questions total` : ''}</p>;
const EmptyState = ({ title, body, action }: { title: string; body: string; action?: React.ReactNode }) => <div className="studio-empty"><Sparkles className="w-8 h-8 text-[#c59b27]" /><h3 className="text-lg font-black text-[#2b2520]">{title}</h3><p>{body}</p>{action}</div>;

interface QuizCardProps { quiz: QuizDataset; isCurrent: boolean; saved?: boolean; onPlay: () => void; onExport?: () => void; onDelete?: () => void; }
const QuizCard: React.FC<QuizCardProps> = ({ quiz, isCurrent, saved, onPlay, onExport, onDelete }) => {
  const mcqCount = quiz.questions.filter((question) => question.type === 'mcq').length;
  const estimateCount = quiz.questions.length - mcqCount;
  const report = saved ? validateQuizDataset(quiz.questions, inferExpectation(quiz.questions.length)) : null;
  const reviewed = quiz.agentValidation?.verdict === 'ready_for_human_review' || quiz.validated;
  const hasIssues = quiz.agentValidation?.verdict === 'blocked' || (report ? !report.isValid : false);
  return <article className={`library-card ${isCurrent ? 'library-card-current' : ''}`}><div className="flex items-start justify-between gap-3"><div className="studio-card-icon">{saved ? <Sparkles className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />}</div><div className="flex flex-wrap justify-end gap-1.5">{isCurrent && <span className="studio-badge studio-badge-active">Active</span>}{saved && <span className={`studio-badge ${hasIssues ? 'studio-badge-warning' : reviewed ? 'studio-badge-success' : 'studio-badge-draft'}`}>{hasIssues ? <ShieldAlert className="w-3 h-3" /> : reviewed ? <ShieldCheck className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}{hasIssues ? 'Needs attention' : reviewed ? 'Reviewed' : 'Unreviewed draft'}</span>}</div></div><div className="mt-4 flex-1"><p className="text-[11px] font-black uppercase tracking-[0.11em] text-[#8c6a0c]">{CATEGORY_LABELS[quiz.category || ''] || quiz.category || (saved ? 'Custom quiz' : 'Quiz pack')}</p><h3 className="mt-1.5 text-lg font-black leading-snug text-[#211b17] line-clamp-2">{quiz.title}</h3><p className="mt-2 text-sm leading-relaxed text-[#6b635b] line-clamp-2">{quiz.description}</p></div><div className="mt-5 flex items-center justify-between gap-3 border-t border-[#e6ddd0] pt-4"><p className="text-xs font-bold text-[#756b62]">{quiz.questions.length} questions · {mcqCount} choice · {estimateCount} estimate</p><div className="flex items-center gap-1.5 shrink-0">{onExport && <button onClick={onExport} className="studio-icon-button" aria-label={`Export ${quiz.title}`} title="Export HTML"><Download className="w-4 h-4" /></button>}{onDelete && <button onClick={onDelete} className="studio-icon-button hover:!border-[#b4232b] hover:!text-[#b4232b]" aria-label={`Delete ${quiz.title}`} title="Delete"><Trash2 className="w-4 h-4" /></button>}<button onClick={onPlay} className="studio-button studio-button-primary"><Play className="w-4 h-4 fill-current" /> Open</button></div></div></article>;
};
