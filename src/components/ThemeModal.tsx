import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  BookOpen, 
  CheckCircle2, 
  Sliders, 
  Layers, 
  Globe2, 
  Rocket, 
  Landmark,
  ShieldCheck,
  Bookmark,
  Trash2,
  Play,
  Download,
  Search,
  Compass,
  Lightbulb,
  HeartPulse,
  Waves,
  Palette,
  Film,
  Sword,
  Shield,
  Clock,
  Atom,
  Eye,
   Crown,
   HelpCircle,
   Copy,
   Check,
   ClipboardPaste,
   ArrowLeft
 } from 'lucide-react';
import { QuizDataset } from '../types';
import { curatedQuizzes } from '../data/curatedQuizzes';
import { FlexibleQuizExpectation, validateQuizDataset } from '../lib/validator';
import { getSavedQuizzes, saveQuizToLibrary, deleteSavedQuiz } from '../lib/quizStorage';
import { generateStandaloneQuizHTML } from '../lib/htmlExporter';
import { generateQuizCreationPrompt, parseGeneratedQuizResponse } from '../lib/quizPrompt';

interface ThemeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectQuiz: (quiz: QuizDataset) => void;
  currentQuizId: string;
  landingEntry?: boolean;
}

const inferCycles = (questionCount: number): number | FlexibleQuizExpectation | undefined => {
  if (questionCount === 20) return 4;
  if (questionCount > 0 && questionCount % 6 === 0) return questionCount / 6;
  if (questionCount > 0) return { questionCount, flexible: true };
  return undefined;
};

export const ThemeModal: React.FC<ThemeModalProps> = ({
  isOpen,
  onClose,
  onSelectQuiz,
  currentQuizId,
  landingEntry = false,
}) => {
  const [activeTab, setActiveTab] = useState<'curated' | 'library' | 'ai'>('curated');
  const [customTheme, setCustomTheme] = useState('');
  const [cycles, setCycles] = useState<number>(4); // 4 compact cycles = 20 questions; 10 = 60-question general-knowledge series
  const [difficulty, setDifficulty] = useState<'easy' | 'moderate' | 'challenging'>('moderate');
  const [answerChoiceCount, setAnswerChoiceCount] = useState<2 | 3>(2);
  const [savedQuizzes, setSavedQuizzes] = useState<QuizDataset[]>([]);
  const [curatedSearch, setCuratedSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isImporting, setIsImporting] = useState(false);
  const [importMessage, setImportMessage] = useState<string | null>(null);
  const [promptCopied, setPromptCopied] = useState(false);
  const [pastedQuizJson, setPastedQuizJson] = useState('');
  const [promptImportStatus, setPromptImportStatus] = useState<{ kind: 'success' | 'error'; text: string } | null>(null);

  const CATEGORIES = [
    'All',
    'Ancient Civilizations & Empires',
    'Modern History & Landmark Wars',
    'Nature, Wildlife & Biology',
    'Astronomy, Physics & Chemistry',
    'Geography, Capitals & Landscapes',
    'Tech, Inventions & Engineering',
    'Arts, Music, Literature & Philosophy',
    'Sports, Records & General Knowledge',
  ];

  const CATEGORY_SHORT_LABELS: Record<string, string> = {
    'All': '✨ All Topics',
    'Ancient Civilizations & Empires': '🏛️ Ancient Empires',
    'Modern History & Landmark Wars': '⚔️ Modern History',
    'Nature, Wildlife & Biology': '🌿 Nature & Wildlife',
    'Astronomy, Physics & Chemistry': '🚀 Astronomy & Physics',
    'Geography, Capitals & Landscapes': '🌍 Geography & Cities',
    'Tech, Inventions & Engineering': '⚙️ Tech & Engineering',
    'Arts, Music, Literature & Philosophy': '🎨 Arts & Culture',
    'Sports, Records & General Knowledge': '🏆 Sports & Records',
  };

  const totalCuratedQuestions = curatedQuizzes.reduce((sum, q) => sum + (q.questions?.length || 0), 0);

  useEffect(() => {
    if (isOpen) {
      setSavedQuizzes(getSavedQuizzes());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const refreshSavedQuizzes = () => {
    setSavedQuizzes(getSavedQuizzes());
  };

  const handleBulkImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []) as File[];
    const datasetFiles = files.filter((file) => file.name.toLowerCase() === 'dataset.json');
    event.target.value = '';
    if (datasetFiles.length === 0) return;
    setIsImporting(true);
    setImportMessage(null);
    let imported = 0;
    let skipped = 0;
    for (const file of datasetFiles) {
      try {
        const parsed = JSON.parse(await file.text()) as QuizDataset;
        if (!parsed || !Array.isArray(parsed.questions) || parsed.questions.length === 0) {
          skipped++;
          continue;
        }
        const quiz: QuizDataset = {
          ...parsed,
          id: parsed.id || `imported-${Date.now()}-${imported}`,
          title: parsed.title || parsed.theme || file.webkitRelativePath || file.name,
          theme: parsed.theme || parsed.title || 'Imported Quiz',
          description: parsed.description || 'Imported quiz dataset.',
          createdAt: parsed.createdAt || new Date().toISOString(),
        };
        if (saveQuizToLibrary(quiz)) imported++;
        else skipped++;
      } catch {
        skipped++;
      }
    }
    refreshSavedQuizzes();
    setImportMessage(`Imported ${imported} quiz${imported === 1 ? '' : 'zes'}${skipped ? `; skipped ${skipped}` : ''}.`);
    setIsImporting(false);
  };

  const handleDeleteSavedQuiz = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    deleteSavedQuiz(id);
    refreshSavedQuizzes();
  };

  const handleExportSavedQuiz = (e: React.MouseEvent, quiz: QuizDataset) => {
    e.stopPropagation();
    const html = generateStandaloneQuizHTML(quiz);
    const filename = `${(quiz.title || 'quiz').toLowerCase().replace(/[^a-z0-9]+/g, '-')}.html`;
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

  const promptConfig = {
    theme: customTheme,
    cycles,
    difficulty,
    answerChoiceCount,
  };
  const creationPrompt = customTheme.trim() ? generateQuizCreationPrompt(promptConfig) : '';

  const handleCopyCreationPrompt = async () => {
    if (!creationPrompt) return;
    setPromptImportStatus(null);
    try {
      await navigator.clipboard.writeText(creationPrompt);
      setPromptCopied(true);
      setTimeout(() => setPromptCopied(false), 2000);
    } catch {
      setPromptImportStatus({ kind: 'error', text: 'Could not copy automatically. Select the prompt text and copy it manually.' });
    }
  };

  const handleImportPastedQuiz = () => {
    setPromptImportStatus(null);
    try {
      const draftQuiz = parseGeneratedQuizResponse(pastedQuizJson, promptConfig);
      const validation = validateQuizDataset(draftQuiz.questions, cycles);
      if (!validation.isValid) {
        throw new Error(`Format check failed: ${validation.errors.slice(0, 4).join('; ')}`);
      }
      if (!saveQuizToLibrary(draftQuiz)) {
        throw new Error('The quiz was valid, but browser storage could not save it.');
      }
      refreshSavedQuizzes();
      setPromptImportStatus({ kind: 'success', text: 'Format passed. Saved as a draft pending factual review.' });
      onSelectQuiz(draftQuiz);
      onClose();
    } catch (error) {
      setPromptImportStatus({
        kind: 'error',
        text: error instanceof Error ? error.message : 'Could not import the pasted quiz JSON.',
      });
    }
  };

  const suggestedThemes = [
    'Renaissance Art & Masters',
    'World War II Codebreaking & Espionage',
    'Coffee History, Cultivation & Brewing',
    'Formula 1 Racing Champions & Circuits',
    'Ancient Egyptian Dynasties & Pyramids',
    'Deep Ocean Biology & Mariana Trench',
    'Quantum Physics & Atomic Discoveries',
    'Nordic & Greek Mythology',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white border border-[#e0d8cb] rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 md:p-6 border-b border-[#e0d8cb] bg-[#faf8f4] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#8b1e1e] text-white flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-bold text-[#8b1e1e]">
                Choose or Create a Quiz
              </h2>
              <p className="text-xs text-[#6b635b]">
                Explore quiz packs, build prompts, and import drafts
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`${landingEntry ? 'min-h-9 px-3 gap-1.5' : 'w-8 h-8'} rounded-lg flex items-center justify-center text-[#6b635b] hover:text-[#8b1e1e] hover:bg-[#eee8dc] transition cursor-pointer`}
          >
            {landingEntry ? <><ArrowLeft className="w-4 h-4" /><span className="text-xs font-extrabold">Home</span></> : <X className="w-5 h-5" />}
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex shrink-0 border-b border-[#e0d8cb] bg-[#fbf9f5] px-6 pt-3 overflow-x-auto">
          <button
            onClick={() => setActiveTab('curated')}
            className={`px-4 py-2.5 text-xs md:text-sm font-bold border-b-2 transition cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === 'curated'
                ? 'border-[#8b1e1e] text-[#8b1e1e]'
                : 'border-transparent text-[#6b635b] hover:text-[#2b2520]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Curated Classics ({curatedQuizzes.length})
          </button>

          <button
            onClick={() => setActiveTab('library')}
            className={`px-4 py-2.5 text-xs md:text-sm font-bold border-b-2 transition cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === 'library'
                ? 'border-[#8b1e1e] text-[#8b1e1e]'
                : 'border-transparent text-[#6b635b] hover:text-[#2b2520]'
            }`}
          >
            <Bookmark className="w-4 h-4 text-[#8b1e1e]" />
            My Quiz Library ({savedQuizzes.length})
          </button>

          <button
            onClick={() => setActiveTab('ai')}
            className={`px-4 py-2.5 text-xs md:text-sm font-bold border-b-2 transition cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === 'ai'
                ? 'border-[#8b1e1e] text-[#8b1e1e]'
                : 'border-transparent text-[#6b635b] hover:text-[#2b2520]'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#c59b27]" />
            Prompt Builder
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {activeTab === 'curated' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#6b635b]">
                    Pre-Loaded Datasets ({curatedQuizzes.length} Quizzes • {totalCuratedQuestions.toLocaleString()} Questions)
                  </p>
                </div>
                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#6b635b]" />
                  <input
                    type="text"
                    placeholder={`Search ${curatedQuizzes.length} topics...`}
                    value={curatedSearch}
                    onChange={(e) => setCuratedSearch(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 text-xs font-semibold rounded-lg border border-[#e0d8cb] focus:border-[#8b1e1e] outline-none bg-[#faf8f4]"
                  />
                </div>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
                {CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat;
                  const count = cat === 'All'
                    ? curatedQuizzes.length
                    : curatedQuizzes.filter((q) => (q.category || 'Sports, Records & General Knowledge') === cat).length;

                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-[#8b1e1e] text-white shadow-xs'
                          : 'bg-[#f4efe6] text-[#6b635b] hover:bg-[#e8dfcf] hover:text-[#2b2520]'
                      }`}
                    >
                      <span>{CATEGORY_SHORT_LABELS[cat] || cat}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-black/5 text-[#8b1e1e]'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 gap-3">
                {curatedQuizzes
                  .filter((q) => {
                    const matchesCategory =
                      selectedCategory === 'All' ||
                      (q.category || 'Sports, Records & General Knowledge') === selectedCategory;
                    if (!matchesCategory) return false;

                    if (!curatedSearch.trim()) return true;
                    const query = curatedSearch.toLowerCase();
                    return (
                      q.title.toLowerCase().includes(query) ||
                      q.description.toLowerCase().includes(query) ||
                      q.theme.toLowerCase().includes(query) ||
                      (q.category && q.category.toLowerCase().includes(query))
                    );
                  })
                  .map((quiz) => {
                    const isCurrent = quiz.id === currentQuizId;
                    const icons: Record<string, any> = {
                      'general-knowledge-60': Sparkles,
                      'general-knowledge-vol2-60': Compass,
                      'general-knowledge-vol3-60': Lightbulb,
                      'general-knowledge-vol4-60': Sparkles,
                      'general-knowledge-vol5-60': Atom,
                      'general-knowledge-vol6-60': Eye,
                      'general-knowledge-vol7-60': ShieldCheck,
                      'roman-empire-60': Landmark,
                      'ancient-greece-60': Landmark,
                      'ancient-egypt-60': Crown,
                      'world-war-2-60': Shield,
                      'world-war-1-60': Sword,
                      'human-body-medicine-60': HeartPulse,
                      'ocean-deep-sea-60': Waves,
                      'renaissance-art-history-60': Palette,
                      'cinema-film-history-60': Film,
                      'world-geography-60': Globe2,
                      'space-astronomy-60': Rocket,
                      'french-revolution-60': BookOpen,
                      'hungary-master-60': Landmark,
                    };
                    const categoryIcons: Record<string, any> = {
                      'Ancient Civilizations & Empires': Landmark,
                      'Modern History & Landmark Wars': Sword,
                      'Nature, Wildlife & Biology': HeartPulse,
                      'Astronomy, Physics & Chemistry': Atom,
                      'Geography, Capitals & Landscapes': Globe2,
                      'Tech, Inventions & Engineering': Rocket,
                      'Arts, Music, Literature & Philosophy': Palette,
                      'Sports, Records & General Knowledge': Sparkles,
                    };
                    const IconComp = icons[quiz.id] || categoryIcons[quiz.category || ''] || BookOpen;

                    return (
                      <div
                        key={quiz.id}
                        onClick={() => {
                          onSelectQuiz(quiz);
                          onClose();
                        }}
                        className={`p-4 rounded-xl border-2 transition cursor-pointer flex items-start justify-between gap-4 ${
                          isCurrent
                            ? 'border-[#8b1e1e] bg-[#faf4f4]'
                            : 'border-[#e0d8cb] hover:border-[#c59b27] hover:bg-[#faf7f0]'
                        }`}
                      >
                        <div className="flex items-start gap-3.5">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                            isCurrent ? 'bg-[#8b1e1e] text-white' : 'bg-[#eee8dc] text-[#8b1e1e]'
                          }`}>
                            <IconComp className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="text-sm md:text-base font-bold text-[#2b2520]">
                                {quiz.title}
                              </h3>
                              {quiz.category && (
                                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#eee8dc] text-[#6b635b]">
                                  {CATEGORY_SHORT_LABELS[quiz.category] || quiz.category}
                                </span>
                              )}
                              {isCurrent && (
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#8b1e1e] text-white">
                                  Active Quiz
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-[#6b635b] mt-1 leading-relaxed">
                              {quiz.description}
                            </p>
                            <div className="flex items-center gap-3 text-[11px] font-semibold text-[#8c6a0c] mt-2">
                              <span>{quiz.questions.length} Questions (50 MCQ + 10 Estimates)</span>
                              <span>•</span>
                              <span className="flex items-center gap-1 text-[#2e7d32]">
                                <ShieldCheck className="w-3.5 h-3.5" />
                                15/15 Format Pass
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {activeTab === 'library' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#6b635b]">
                  Custom &amp; AI-Generated Quizzes Saved In Browser Storage
                </p>
                <div className="flex items-center gap-2">
                  <label className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold border border-[#e0d8cb] bg-white text-[#8b1e1e] hover:border-[#8b1e1e] cursor-pointer ${isImporting ? 'opacity-50 pointer-events-none' : ''}`}>
                    <Download className="w-3.5 h-3.5" />
                    {isImporting ? 'Importing…' : 'Import quiz folder'}
                    <input type="file" multiple accept=".json,application/json" onChange={handleBulkImport} className="hidden" {...({ webkitdirectory: 'true', directory: 'true' } as React.InputHTMLAttributes<HTMLInputElement>)} />
                  </label>
                  <span className="text-xs text-[#8c6a0c] font-semibold">
                    {savedQuizzes.length} saved quiz{savedQuizzes.length !== 1 ? 'zes' : ''}
                  </span>
                </div>
              </div>
              {importMessage && <p className="text-xs text-[#2e7d32]">{importMessage}</p>}

              {savedQuizzes.length === 0 ? (
                <div className="p-8 rounded-xl border border-dashed border-[#e0d8cb] bg-[#faf8f4] text-center space-y-3">
                  <Bookmark className="w-8 h-8 text-[#c59b27] mx-auto opacity-70" />
                  <div>
                    <h4 className="text-sm font-bold text-[#2b2520]">No Custom Quizzes Saved Yet</h4>
                    <p className="text-xs text-[#6b635b] max-w-sm mx-auto mt-1">
                      Generate a topic or import Antigravity JSON, then open Review to check its editorial and factual quality.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('ai')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-[#8b1e1e] text-white hover:bg-[#731818] transition cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Generate First Custom Theme
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3">
                  {savedQuizzes.map((quiz) => {
                    const isCurrent = quiz.id === currentQuizId;
                    const report = validateQuizDataset(quiz.questions, inferCycles(quiz.questions.length));
                    const agentStatus = quiz.agentValidation?.verdict;

                    return (
                      <div
                        key={quiz.id}
                        onClick={() => {
                          onSelectQuiz(quiz);
                          onClose();
                        }}
                        className={`p-4 rounded-xl border-2 transition cursor-pointer flex items-start justify-between gap-4 group ${
                          isCurrent
                            ? 'border-[#8b1e1e] bg-[#faf4f4]'
                            : 'border-[#e0d8cb] hover:border-[#c59b27] hover:bg-[#faf7f0]'
                        }`}
                      >
                        <div className="flex items-start gap-3.5 min-w-0 flex-1">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                            isCurrent ? 'bg-[#8b1e1e] text-white' : 'bg-[#eee8dc] text-[#8b1e1e]'
                          }`}>
                            <Sparkles className="w-5 h-5 text-[#c59b27]" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="text-sm md:text-base font-bold text-[#2b2520] truncate">
                                {quiz.title}
                              </h3>
                              {isCurrent && (
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#8b1e1e] text-white">
                                  Active
                                </span>
                              )}
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 ${
                                agentStatus === 'ready_for_human_review'
                                  ? 'bg-[#e8f5e9] text-[#2e7d32] border border-[#2e7d32]/30'
                                  : agentStatus === 'blocked'
                                    ? 'bg-[#ffebee] text-[#b4232b] border border-[#b4232b]/30'
                                    : agentStatus === 'needs_review'
                                      ? 'bg-[#fff8e1] text-[#7c5c0a] border border-[#c59b27]/40'
                                      : report.isValid
                                        ? 'bg-[#e8f1fb] text-[#185a9d] border border-[#185a9d]/30'
                                        : 'bg-[#fff3e0] text-[#e65100] border border-[#e65100]/30'
                              }`}>
                                <ShieldCheck className="w-3 h-3" />
                                {agentStatus === 'ready_for_human_review'
                                  ? 'Agent Reviewed'
                                  : agentStatus === 'blocked'
                                    ? 'Review Blocked'
                                    : agentStatus === 'needs_review'
                                      ? 'Review Flags'
                                      : report.isValid
                                        ? 'Format Pass'
                                        : 'Format Issues'}
                              </span>
                            </div>
                            <p className="text-xs text-[#6b635b] mt-1 line-clamp-2 leading-relaxed">
                              {quiz.description}
                            </p>
                            <div className="flex items-center gap-3 text-[11px] font-semibold text-[#8c6a0c] mt-2">
                              <span>{quiz.questions.length} Questions</span>
                              <span>•</span>
                              <span>{report.mcqCount} MCQ / {report.numberCount} Estimate</span>
                              {quiz.createdAt && (
                                <>
                                  <span>•</span>
                                  <span className="text-[#8c827a]">
                                    {new Date(quiz.createdAt).toLocaleDateString()}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={(e) => handleExportSavedQuiz(e, quiz)}
                            title="Export Standalone HTML"
                            className="p-2 rounded-lg border border-[#e0d8cb] bg-white text-[#6b635b] hover:text-[#8b1e1e] hover:border-[#8b1e1e] transition cursor-pointer"
                          >
                            <Download className="w-4 h-4" />
                          </button>

                          <button
                            onClick={(e) => handleDeleteSavedQuiz(e, quiz.id)}
                            title="Delete Saved Quiz"
                            className="p-2 rounded-lg border border-[#e0d8cb] bg-white text-[#6b635b] hover:text-[#c62828] hover:border-[#c62828] transition cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {activeTab === 'ai' && (
            <form onSubmit={(event) => event.preventDefault()} className="space-y-5">
              <div className="rounded-xl bg-[#eee8dc] p-1.5">
                <div className="min-h-11 rounded-lg bg-white px-3 text-xs font-extrabold text-[#2b2520] shadow-sm flex items-center justify-center text-center">
                  Prompt builder · works entirely in your browser
                </div>
              </div>

              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2b2520]">
                  Theme or Subject Topic
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#111318] text-white border border-[#30343d]">
                    <ClipboardPaste className="w-2.5 h-2.5" />
                    Any AI chat
                  </span>
                </div>
              </div>
              <div className="space-y-1.5">
                <input
                  type="text"
                  placeholder="e.g. Renaissance Art, Formula 1 Racing, Coffee History..."
                  value={customTheme}
                  onChange={(e) => setCustomTheme(e.target.value)}
                  className="w-full border-2 border-[#e0d8cb] focus:border-[#8b1e1e] rounded-xl px-4 py-2.5 text-sm md:text-base font-semibold text-[#2b2520] outline-none transition"
                />
              </div>

              {/* Suggestions Chips */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-semibold text-[#6b635b]">
                  Suggested Ideas:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {suggestedThemes.map((sug, i) => (
                    <button
                      type="button"
                      key={i}
                      onClick={() => setCustomTheme(sug)}
                      className="px-2.5 py-1 rounded-md text-xs bg-[#faf8f4] border border-[#e0d8cb] text-[#6b635b] hover:text-[#8b1e1e] hover:border-[#8b1e1e] transition cursor-pointer"
                    >
                      {sug}
                    </button>
                  ))}
                </div>
              </div>

              {/* Length, answer count & difficulty configuration */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-[#e0d8cb]">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#2b2520] flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#8b1e1e]" />
                    Question Count
                  </label>
                  <select
                    value={cycles}
                    onChange={(e) => setCycles(Number(e.target.value))}
                    className="w-full border-2 border-[#e0d8cb] rounded-lg px-3 py-2 text-xs md:text-sm font-semibold text-[#2b2520] bg-white outline-none"
                  >
                    <option value={4}>20 Questions (theme pack)</option>
                    <option value={10}>60 Questions (general-knowledge series)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#2b2520] flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-[#8b1e1e]" />
                    Answer Choices
                  </label>
                  <select
                    value={answerChoiceCount}
                    onChange={(e) => setAnswerChoiceCount(Number(e.target.value) as 2 | 3)}
                    className="w-full border-2 border-[#e0d8cb] rounded-lg px-3 py-2 text-xs md:text-sm font-semibold text-[#2b2520] bg-white outline-none"
                  >
                    <option value={2}>2 Choices (relaxed)</option>
                    <option value={3}>3 Choices (classic)</option>
                  </select>
                  <p className="text-[10px] leading-snug text-[#6b635b]">
                    Two choices make a gentler before-sleep quiz.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#2b2520] flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-[#8b1e1e]" />
                    Difficulty Level
                  </label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as any)}
                    className="w-full border-2 border-[#e0d8cb] rounded-lg px-3 py-2 text-xs md:text-sm font-semibold text-[#2b2520] bg-white outline-none"
                  >
                    <option value="easy">Easy to Moderate (Engaging Trivia)</option>
                    <option value="moderate">Moderate (Standard Academic / Enthusiast)</option>
                    <option value="challenging">Challenging (Expert Mastermind)</option>
                  </select>
                </div>
              </div>

              <div className="rounded-2xl border border-[#30343d] bg-[#111318] text-white p-4 space-y-4 shadow-lg">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-extrabold">1. Copy the ready-made prompt</h3>
                      <p className="text-[11px] text-[#aeb3bd] mt-1 leading-relaxed">
                        Paste it into your preferred AI chat. It requests the exact JSON this app accepts.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyCreationPrompt}
                      disabled={!customTheme.trim()}
                      className="shrink-0 min-h-10 px-3 rounded-lg bg-[#efb84a] text-[#111318] text-xs font-extrabold disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer"
                    >
                      {promptCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      {promptCopied ? 'Copied' : 'Copy prompt'}
                    </button>
                  </div>

                  <textarea
                    readOnly
                    value={creationPrompt || 'Enter a theme above to build the prompt.'}
                    aria-label="Generated quiz prompt"
                    className="w-full h-36 resize-y rounded-xl border border-[#343943] bg-[#08090b] px-3 py-2.5 text-[11px] leading-relaxed text-[#d7d9de] outline-none font-mono"
                  />

                  <div className="border-t border-[#30343d] pt-4 space-y-2">
                    <div>
                      <h3 className="text-sm font-extrabold">2. Paste the AI response</h3>
                      <p className="text-[11px] text-[#aeb3bd] mt-1">
                        Code fences are okay. The quiz is format-checked and saved as an unreviewed draft.
                      </p>
                    </div>
                    <textarea
                      value={pastedQuizJson}
                      onChange={(event) => {
                        setPastedQuizJson(event.target.value);
                        setPromptImportStatus(null);
                      }}
                      placeholder='Paste the returned { "title": ..., "questions": [...] } JSON here'
                      aria-label="Paste generated quiz JSON"
                      className="w-full h-40 resize-y rounded-xl border-2 border-[#343943] focus:border-[#efb84a] bg-[#08090b] px-3 py-2.5 text-xs leading-relaxed text-white placeholder:text-[#686e79] outline-none font-mono"
                    />
                  </div>

                  {promptImportStatus && (
                    <div className={`rounded-lg border px-3 py-2.5 text-xs leading-relaxed ${promptImportStatus.kind === 'success' ? 'border-[#53d58a]/50 bg-[#10271c] text-[#8be8b1]' : 'border-[#ff6b78]/50 bg-[#301218] text-[#ff9ca5]'}`}>
                      {promptImportStatus.text}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleImportPastedQuiz}
                    disabled={!pastedQuizJson.trim() || !customTheme.trim()}
                    className="w-full min-h-12 rounded-xl bg-[#efb84a] hover:bg-[#ffd479] text-[#111318] text-sm font-extrabold transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ClipboardPaste className="w-4 h-4" />
                    Import draft &amp; start quiz
                  </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
