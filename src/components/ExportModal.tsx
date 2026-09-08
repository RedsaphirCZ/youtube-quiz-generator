import React, { useState } from 'react';
import { PDFCardPreview } from './PDFCardPreview';
import { 
  X, 
  Download, 
  Copy, 
  Check, 
  ExternalLink, 
  CreditCard, 
  Layers, 
  Video, 
  Eye, 
  CheckCircle2, 
  Package, 
  Printer, 
  Sparkles,
  FileText,
  Moon,
  Sun,
  Radio
} from 'lucide-react';
import { QuizDataset } from '../types';
import { generateStandaloneQuizHTML, QuizExportAppearance, splitQuizIntoVideoParts, VideoQuizPart } from '../lib/htmlExporter';
import { validateQuizDataset } from '../lib/validator';
import { generateNanDeckCSV, generateNanDeckScript, generateNanDeckCardRows } from '../lib/nandeckExporter';
import { downloadQuizPDF, generateQuizPDF } from '../lib/pdfExporter';
import { createQuizExportVariant, ExportAnswerChoiceMode } from '../lib/exportVariant';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  quiz: QuizDataset;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  quiz,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | number | null>(null);
  const [activeTab, setActiveTab] = useState<'pdf' | 'full' | 'video-parts'>('full');
  const [answerChoiceMode, setAnswerChoiceMode] = useState<ExportAnswerChoiceMode>(2);
  const [appearance, setAppearance] = useState<QuizExportAppearance>('studio-dark');
  const [htmlPartCount, setHtmlPartCount] = useState<number>(3);
  
  // Card Preview State
  const [previewCardIndex, setPreviewCardIndex] = useState<number>(0);
  const [previewSide, setPreviewSide] = useState<'front' | 'back'>('back');

  if (!isOpen) return null;

  const exportOptions = { answerChoiceMode, appearance };
  const exportedQuiz = createQuizExportVariant(quiz, answerChoiceMode);
  const htmlContentFull = generateStandaloneQuizHTML(quiz, exportOptions);
  const validation = validateQuizDataset(exportedQuiz.questions);
  const videoParts: VideoQuizPart[] = splitQuizIntoVideoParts(quiz, htmlPartCount, exportOptions);

  const themeSlug = (quiz.theme || quiz.title || 'quiz')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  const printablePageCount = quiz.questions.length * 2;
  const quizPartCount = Math.ceil(quiz.questions.length / 20) || 1;

  const nandeckCSV = generateNanDeckCSV(quiz);
  const nandeckScript = generateNanDeckScript(quiz, `${themeSlug}-cards.csv`);
  const cardRows = generateNanDeckCardRows(quiz);

  const activeFrontRow = cardRows[previewCardIndex] || cardRows[0];
  const activeBackRow = cardRows[quiz.questions.length + previewCardIndex] || cardRows[quiz.questions.length];
  const activeRow = previewSide === 'front' ? activeFrontRow : activeBackRow;

  const handleCopy = async (content: string, key: string | number) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleDownloadFile = (content: string, filename: string, mimeType = 'text/html;charset=utf-8') => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadPDF = () => {
    downloadQuizPDF(quiz, `${themeSlug}-poker-cards-duplex.pdf`);
  };

  const handlePreviewPDF = () => {
    const doc = generateQuizPDF(quiz);
    const blob = doc.output('blob');
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  const handleDownloadFull = () => {
    const choiceSuffix = answerChoiceMode === 2 ? '-2-choice' : '';
    const styleSuffix = appearance === 'studio-dark' ? '-studio-black' : '';
    handleDownloadFile(htmlContentFull, `${themeSlug}-full-${quiz.questions.length}q${choiceSuffix}${styleSuffix}.html`);
  };

  const handleDownloadNanDeckScript = () => {
    handleDownloadFile(nandeckScript, `${themeSlug}-deck.nde`, 'text/plain;charset=utf-8');
  };

  const handleDownloadNanDeckCSV = () => {
    handleDownloadFile(nandeckCSV, `${themeSlug}-cards.csv`, 'text/csv;charset=utf-8');
  };

  const handlePreviewInNewTab = (content: string) => {
    const blob = new Blob([content], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  const recordingSettings = (
    <div className="rounded-2xl border border-[#2b2f37] bg-[#0d0f12] text-white p-4 sm:p-5 shadow-lg">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-[#efb84a] text-[#111318] flex items-center justify-center shrink-0">
          <Radio className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-sm sm:text-base font-extrabold">Recording export settings</h3>
          <p className="text-xs text-[#b8bdc7] mt-0.5">
            These changes affect the exported HTML only. Your saved quiz stays untouched.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <fieldset className="space-y-2">
          <legend className="text-[10px] uppercase tracking-[0.16em] font-bold text-[#8f96a3]">Answers on screen</legend>
          <div className="grid grid-cols-2 gap-2 rounded-xl bg-[#17191f] p-1.5">
            <button
              onClick={() => setAnswerChoiceMode(2)}
              aria-pressed={answerChoiceMode === 2}
              className={`min-h-11 rounded-lg px-3 text-xs font-extrabold transition cursor-pointer ${answerChoiceMode === 2 ? 'bg-[#efb84a] text-[#111318] shadow-sm' : 'text-[#b8bdc7] hover:text-white hover:bg-[#22252c]'}`}
            >
              2 choices only
            </button>
            <button
              onClick={() => setAnswerChoiceMode('source')}
              aria-pressed={answerChoiceMode === 'source'}
              className={`min-h-11 rounded-lg px-3 text-xs font-extrabold transition cursor-pointer ${answerChoiceMode === 'source' ? 'bg-[#efb84a] text-[#111318] shadow-sm' : 'text-[#b8bdc7] hover:text-white hover:bg-[#22252c]'}`}
            >
              Keep source
            </button>
          </div>
          <p className="text-[10px] leading-relaxed text-[#8f96a3]">
            Two-choice mode keeps the correct answer and one plausible distractor, balanced between A and B.
          </p>
        </fieldset>

        <fieldset className="space-y-2">
          <legend className="text-[10px] uppercase tracking-[0.16em] font-bold text-[#8f96a3]">Screen style</legend>
          <div className="grid grid-cols-2 gap-2 rounded-xl bg-[#17191f] p-1.5">
            <button
              onClick={() => setAppearance('studio-dark')}
              aria-pressed={appearance === 'studio-dark'}
              className={`min-h-11 rounded-lg px-3 text-xs font-extrabold transition cursor-pointer flex items-center justify-center gap-1.5 ${appearance === 'studio-dark' ? 'bg-[#efb84a] text-[#111318] shadow-sm' : 'text-[#b8bdc7] hover:text-white hover:bg-[#22252c]'}`}
            >
              <Moon className="w-3.5 h-3.5" />
              Studio black
            </button>
            <button
              onClick={() => setAppearance('classic-light')}
              aria-pressed={appearance === 'classic-light'}
              className={`min-h-11 rounded-lg px-3 text-xs font-extrabold transition cursor-pointer flex items-center justify-center gap-1.5 ${appearance === 'classic-light' ? 'bg-[#efb84a] text-[#111318] shadow-sm' : 'text-[#b8bdc7] hover:text-white hover:bg-[#22252c]'}`}
            >
              <Sun className="w-3.5 h-3.5" />
              Classic light
            </button>
          </div>
          <p className="text-[10px] leading-relaxed text-[#8f96a3]">
            Studio black enlarges the question and answers on desktop for cleaner screen capture.
          </p>
        </fieldset>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white border border-[#e2d9cc] rounded-2xl w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#e8dfd2] bg-[#faf8f4] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#8b1e1e] text-white flex items-center justify-center shadow-xs">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-extrabold text-[#1f1a16]">
                  Printable Cards & Quiz Export
                </h2>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#fef8e7] text-[#7c5c0a] border border-[#c59b27] font-bold">
                  {quiz.questions.length} Cards
                </span>
              </div>
              <p className="text-xs text-[#706860]">
                {quiz.title || quiz.theme} • Recording-ready HTML, video parts & printable cards
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#706860] hover:text-[#8b1e1e] hover:bg-[#eee8dc] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Clean Tab Bar */}
        <div className="flex border-b border-[#e8dfd2] bg-[#fbf9f5] px-4 sm:px-6 pt-2 gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('pdf')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === 'pdf'
                ? 'border-[#8b1e1e] text-[#8b1e1e] bg-white rounded-t-lg'
                : 'border-transparent text-[#706860] hover:text-[#1f1a16]'
            }`}
          >
            <FileText className="w-4 h-4 text-[#8b1e1e]" />
            Printable PDF Cards
          </button>

          <button
            onClick={() => setActiveTab('full')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === 'full'
                ? 'border-[#8b1e1e] text-[#8b1e1e] bg-white rounded-t-lg'
                : 'border-transparent text-[#706860] hover:text-[#1f1a16]'
            }`}
          >
            <Layers className="w-4 h-4 text-[#c59b27]" />
            Interactive Web App (.html)
          </button>

          <button
            onClick={() => setActiveTab('video-parts')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === 'video-parts'
                ? 'border-[#8b1e1e] text-[#8b1e1e] bg-white rounded-t-lg'
                : 'border-transparent text-[#706860] hover:text-[#1f1a16]'
            }`}
          >
            <Video className="w-4 h-4 text-[#185a9d]" />
            Split HTML
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5">
          
          {/* ========================================================================= */}
          {/* TAB 1: PRINTABLE PDF CARDS (FRONT-BACK DUPLEX) */}
          {/* ========================================================================= */}
          {activeTab === 'pdf' && (
            <div className="space-y-4">
              {/* Primary Action Hero */}
              <div className="bg-[#fef8e7] border border-[#c59b27] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="text-[11px] font-bold text-[#7c5c0a] uppercase tracking-wider block">
                    Trim: 63.5 × 88.9 mm (2.5 × 3.5 in) + 3 mm bleed • PDF page: 69.5 × 94.9 mm • {printablePageCount} Pages
                  </span>
                  <h3 className="text-sm sm:text-base font-extrabold text-[#1f1a16]">
                    Download {printablePageCount}-Page Front-Back PDF (Montax Ready)
                  </h3>
                  <p className="text-xs text-[#706860]">
                    Each card face on its own page (Q1 Front, Q1 Back, Q2 Front, Q2 Back...) for direct imposition in Montax.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleDownloadPDF}
                    className="py-2.5 px-4 rounded-xl font-extrabold text-xs sm:text-sm bg-[#8b1e1e] hover:bg-[#731818] text-white transition flex items-center justify-center gap-2 shadow-sm cursor-pointer active:scale-95"
                  >
                    <Download className="w-4 h-4" />
                    Download {printablePageCount}-Page PDF
                  </button>

                  <button
                    onClick={handlePreviewPDF}
                    className="py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm bg-white border border-[#ded4c3] text-[#1f1a16] hover:bg-[#faf8f4] transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    title="Preview PDF in a new tab"
                  >
                    <ExternalLink className="w-4 h-4 text-[#8b1e1e]" />
                    Preview
                  </button>
                </div>
              </div>

              {/* Live Card Mockup & Controls */}
              <div className="bg-[#faf8f4] border border-[#e4ded5] rounded-xl p-4 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#e4ded5] pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#706860]">Preview Card:</span>
                    <select
                      value={previewCardIndex}
                      onChange={(e) => setPreviewCardIndex(Number(e.target.value))}
                      className="text-xs font-bold bg-white border border-[#ded4c3] rounded-lg px-2.5 py-1 text-[#1f1a16] focus:outline-none focus:border-[#8b1e1e]"
                    >
                      {quiz.questions.map((q, idx) => {
                        const part = Math.floor(idx / 20) + 1;
                        const partQ = (idx % 20) + 1;
                        return (
                          <option key={idx} value={idx}>
                            Part {part}/{quizPartCount} • Q{String(partQ).padStart(2, '0')}/20 (#{String(idx + 1).padStart(2, '0')}) - {q.type === 'mcq' ? 'MCQ' : 'Estimate'}: {q.question.substring(0, 28)}...
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  {/* Front/Back Switcher */}
                  <div className="flex items-center gap-1 bg-[#ede7dc] p-1 rounded-lg">
                    <button
                      onClick={() => setPreviewSide('front')}
                      className={`px-3 py-1 rounded-md text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                        previewSide === 'front'
                          ? 'bg-[#8b1e1e] text-white shadow-xs'
                          : 'text-[#706860] hover:text-[#1f1a16]'
                      }`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Front (Question)
                    </button>
                    <button
                      onClick={() => setPreviewSide('back')}
                      className={`px-3 py-1 rounded-md text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                        previewSide === 'back'
                          ? 'bg-[#2e7d32] text-white shadow-xs'
                          : 'text-[#706860] hover:text-[#1f1a16]'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Back (Answer Reveal)
                    </button>
                  </div>
                </div>

                <PDFCardPreview quiz={quiz} index={previewCardIndex} side={previewSide} />
              </div>

              {/* Instructions Callout */}
              <div className="bg-[#f7f5f0] border border-[#e2d9cc] rounded-xl p-3.5 text-xs text-[#1f1a16] space-y-1.5">
                <span className="font-bold text-[#8b1e1e] flex items-center gap-1.5">
                  <Printer className="w-4 h-4 text-[#8b1e1e]" />
                  Montax Imposer Workflow
                </span>
                <ol className="list-decimal list-inside space-y-0.5 text-[#706860] text-[11px] leading-relaxed">
                  <li>Click <b>Download {printablePageCount}-Page PDF</b> (contains {quiz.questions.length} questions × 2 sides in alternating Front/Back order).</li>
                  <li>Import the PDF into <b>Montax Imposer</b> as a Two-Sided (Duplex) job.</li>
                  <li>The PDF declares a <b>63.5 × 88.9 mm TrimBox</b> and a <b>3 mm BleedBox</b> on every side. Keep those imported page boxes.</li>
                  <li>Add crop marks in Montax outside the trim box. Do not add a printed card border.</li>
                </ol>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: INTERACTIVE WEB APP (.HTML) */}
          {/* ========================================================================= */}
          {activeTab === 'full' && (
            <div className="space-y-4">
              {recordingSettings}
              <div className="bg-[#faf8f4] border border-[#e2d9cc] rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-extrabold text-[#8b1e1e] flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#c59b27]" />
                      Full Standalone HTML Interactive Quiz
                    </h3>
                    <p className="text-xs text-[#706860] mt-0.5">
                      100% self-contained single file with zero external dependencies.
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-[#e8f5e9] text-[#2e7d32] text-xs font-bold">
                    {quiz.questions.length} Questions
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2.5 pt-1">
                  <div className="p-3 bg-white border border-[#e2d9cc] rounded-lg text-center">
                    <span className="text-[10px] uppercase font-bold text-[#706860] block">MCQs</span>
                    <span className="text-base font-extrabold text-[#8b1e1e]">{validation.mcqCount}</span>
                  </div>
                  <div className="p-3 bg-white border border-[#e2d9cc] rounded-lg text-center">
                    <span className="text-[10px] uppercase font-bold text-[#706860] block">Estimates</span>
                    <span className="text-base font-extrabold text-[#185a9d]">{validation.numberCount}</span>
                  </div>
                  <div className="p-3 bg-white border border-[#e2d9cc] rounded-lg text-center">
                    <span className="text-[10px] uppercase font-bold text-[#706860] block">Answer balance</span>
                    <span className="text-base font-extrabold text-[#2e7d32]">
                      {answerChoiceMode === 2
                        ? `${validation.positionBalance.A} A / ${validation.positionBalance.B} B`
                        : `${validation.positionBalance.A}/${validation.positionBalance.B}/${validation.positionBalance.C}`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={handleDownloadFull}
                  className="flex-1 py-3 px-4 rounded-xl font-extrabold text-sm bg-[#8b1e1e] hover:bg-[#731818] text-white transition flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  Download Full Standalone .html
                </button>

                <button
                  onClick={() => handleCopy(htmlContentFull, 'full')}
                  className="py-3 px-4 rounded-xl font-bold text-sm bg-[#faf8f4] border border-[#ded4c3] text-[#1f1a16] hover:bg-white transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  {copiedKey === 'full' ? <Check className="w-4 h-4 text-[#2e7d32]" /> : <Copy className="w-4 h-4" />}
                  {copiedKey === 'full' ? 'Copied HTML!' : 'Copy Code'}
                </button>

                <button
                  onClick={() => handlePreviewInNewTab(htmlContentFull)}
                  className="py-3 px-4 rounded-xl font-bold text-sm bg-[#faf8f4] border border-[#ded4c3] text-[#1f1a16] hover:bg-white transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  title="Open raw standalone HTML in a new tab"
                >
                  <ExternalLink className="w-4 h-4" />
                  Preview
                </button>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: CONFIGURABLE SPLIT HTML EXPORT */}
          {/* ========================================================================= */}
          {activeTab === 'video-parts' && (
            <div className="space-y-4">
              {recordingSettings}
              <div className="rounded-xl border border-[#e2d9cc] bg-[#faf8f4] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <label htmlFor="html-part-count" className="text-sm font-extrabold text-[#1f1a16]">How many HTML files?</label>
                  <p className="mt-0.5 text-xs text-[#706860]">Questions are divided as evenly as possible. Every file remains a complete standalone quiz.</p>
                </div>
                <select
                  id="html-part-count"
                  value={htmlPartCount}
                  onChange={(event) => setHtmlPartCount(Number(event.target.value))}
                  className="min-h-11 rounded-xl border-2 border-[#ded4c3] bg-white px-4 text-sm font-extrabold text-[#1f1a16] outline-none focus:border-[#8b1e1e] cursor-pointer shrink-0"
                >
                  <option value={1}>Whole quiz — 1 file</option>
                  {Array.from({ length: Math.min(10, Math.max(1, quiz.questions.length)) - 1 }, (_, index) => index + 2).map((count) => (
                    <option key={count} value={count}>{count} equal parts</option>
                  ))}
                </select>
              </div>
              <div className="bg-[#fef8e7] border border-[#c59b27] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="text-[11px] font-bold text-[#7c5c0a] uppercase tracking-wider block">
                    {videoParts.length === 1 ? 'Whole Quiz HTML' : `${videoParts.length}-Episode YouTube Video Kit`}
                  </span>
                  <h3 className="text-sm sm:text-base font-extrabold text-[#1f1a16]">
                    {videoParts.length === 1
                      ? `Export all ${quiz.questions.length} questions in one file`
                      : `Export ${videoParts.length} balanced standalone parts`}
                  </h3>
                  <p className="text-xs text-[#706860]">
                    Each episode is self-contained with questions, scoring, and end summary.
                  </p>
                </div>

                <button
                  onClick={() => {
                    videoParts.forEach((part, index) => {
                      setTimeout(() => {
                        handleDownloadFile(part.htmlContent, part.filename);
                      }, index * 300);
                    });
                  }}
                  className="py-2.5 px-4 rounded-xl font-extrabold text-xs sm:text-sm bg-[#8b1e1e] hover:bg-[#731818] text-white transition flex items-center justify-center gap-2 shrink-0 shadow-sm cursor-pointer active:scale-95"
                >
                  <Package className="w-4 h-4" />
                  Download All {videoParts.length} {videoParts.length === 1 ? 'Part' : 'Parts'}
                </button>
              </div>

              {/* Generated part rows */}
              <div className="grid grid-cols-1 gap-2.5">
                {videoParts.map((part) => {
                  const partVal = validateQuizDataset(part.dataset.questions);

                  return (
                    <div
                      key={part.partNumber}
                      className="p-3.5 rounded-xl border border-[#e2d9cc] bg-white hover:border-[#c59b27] transition flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#8b1e1e] text-white">
                            Part {part.partNumber}/{part.totalParts}
                          </span>
                          <span className="text-xs font-extrabold text-[#1f1a16]">
                            Questions {part.startIndex + 1} – {part.endIndex + 1}
                          </span>
                          <span className="text-[11px] text-[#706860]">
                            ({partVal.mcqCount} MCQs • {partVal.numberCount} Estimates)
                          </span>
                        </div>
                        <p className="text-[11px] text-[#706860] font-mono truncate max-w-md">
                          {part.filename}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleDownloadFile(part.htmlContent, part.filename)}
                          className="py-1.5 px-3 rounded-lg text-xs font-bold bg-[#8b1e1e] text-white hover:bg-[#731818] transition flex items-center gap-1.5 cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                          Download
                        </button>

                        <button
                          onClick={() => handleCopy(part.htmlContent, part.partNumber)}
                          className="p-1.5 rounded-lg border border-[#ded4c3] text-[#706860] hover:text-[#1f1a16] hover:bg-[#faf8f4] transition cursor-pointer"
                          title="Copy HTML"
                        >
                          {copiedKey === part.partNumber ? (
                            <Check className="w-4 h-4 text-[#2e7d32]" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>

                        <button
                          onClick={() => handlePreviewInNewTab(part.htmlContent)}
                          className="p-1.5 rounded-lg border border-[#ded4c3] text-[#706860] hover:text-[#1f1a16] hover:bg-[#faf8f4] transition cursor-pointer"
                          title="Preview in new tab"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
