import React from 'react';
import { Sparkles, Download, RotateCcw, Award, CheckCircle2, HelpCircle, ShieldCheck } from 'lucide-react';
import { QuizDataset, QuestionAnswerState } from '../types';

interface HeaderProps {
  quiz: QuizDataset;
  currentIndex: number;
  answers: Record<number, QuestionAnswerState>;
  onOpenThemeModal: () => void;
  onOpenExportModal: () => void;
  onOpenResetConfirm: () => void;
  onOpenInspectorLab: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  quiz,
  currentIndex,
  answers,
  onOpenThemeModal,
  onOpenExportModal,
  onOpenResetConfirm,
  onOpenInspectorLab,
}) => {
  const totalQuestions = quiz.questions.length;
  
  let mcqAnswered = 0;
  let mcqCorrect = 0;
  let numbersChecked = 0;
  let totalCompleted = 0;

  for (let i = 0; i < totalQuestions; i++) {
    const a = answers[i];
    if (a && a.isChecked) {
      totalCompleted++;
      if (quiz.questions[i].type === 'mcq') {
        mcqAnswered++;
        if (a.isCorrect) mcqCorrect++;
      } else {
        numbersChecked++;
      }
    }
  }

  const completionPct = totalQuestions > 0 ? (totalCompleted / totalQuestions) * 100 : 0;
  const accuracyPct = mcqAnswered > 0 ? Math.round((mcqCorrect / mcqAnswered) * 100) : 0;
  const totalNumberQuestions = quiz.questions.filter((question) => question.type === 'number').length;

  return (
    <header className="bg-white border-2 border-[#ded4c3] border-t-4 border-t-[#8b1e1e] rounded-xl p-2.5 sm:p-3 shadow-xs">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <h1 className="text-base sm:text-lg font-black text-[#8b1e1e] tracking-tight truncate">
            {quiz.title || quiz.theme}
          </h1>
          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded text-[11px] font-black bg-[#fef8e7] text-[#7c5c0a] border border-[#c59b27] shrink-0">
            {totalQuestions} Q
          </span>
        </div>

        {/* Clean Action Buttons */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={onOpenThemeModal}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-black bg-[#8b1e1e] text-white hover:bg-[#731818] transition cursor-pointer active:scale-95"
            title="Themes"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Themes</span>
          </button>

          <button
            onClick={onOpenExportModal}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-black bg-[#faf8f4] border border-[#ded4c3] text-[#2b2520] hover:border-[#8b1e1e] hover:bg-white transition cursor-pointer active:scale-95"
            title="Export PDF Cards & Quiz"
          >
            <Download className="w-3.5 h-3.5 text-[#8b1e1e]" />
            <span className="hidden sm:inline">Export</span>
          </button>

          <button
            onClick={onOpenInspectorLab}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-black bg-white border border-[#2e7d32]/40 text-[#2e7d32] hover:bg-[#e8f5e9] transition cursor-pointer"
            title="Agentic Quiz Review"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#2e7d32]" />
            <span className="hidden sm:inline">Review</span>
          </button>

          <button
            onClick={onOpenResetConfirm}
            className="inline-flex items-center p-1.5 rounded-lg text-xs font-bold border border-[#ded4c3] text-[#6b635b] hover:text-[#8b1e1e] hover:border-[#8b1e1e] hover:bg-[#fbf4f4] transition cursor-pointer"
            title="Reset Quiz"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Live Score Metrics Bar */}
      <div className="flex items-center justify-between gap-2 mt-2 pt-2 border-t border-[#ebdccb] text-xs">
        <div className="flex items-center gap-1.5">
          <span className="uppercase text-[10px] tracking-wider text-[#6b635b] font-bold">Q:</span>
          <span className="font-black text-[#2b2520]">{currentIndex + 1} / {totalQuestions}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="uppercase text-[10px] tracking-wider text-[#6b635b] font-bold flex items-center gap-0.5">
            <CheckCircle2 className="w-3 h-3 text-[#2e7d32]" /> Score:
          </span>
          <span className="font-black text-[#2e7d32]">{mcqCorrect} / {mcqAnswered} ({accuracyPct}%)</span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="uppercase text-[10px] tracking-wider text-[#6b635b] font-bold flex items-center gap-0.5">
            <HelpCircle className="w-3 h-3 text-[#185a9d]" /> Est:
          </span>
          <span className="font-black text-[#185a9d]">{numbersChecked} / {totalNumberQuestions}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-[#ebdccb] rounded-full overflow-hidden mt-2">
        <div
          className="h-full bg-gradient-to-r from-[#c59b27] to-[#8b1e1e] transition-all duration-300"
          style={{ width: `${completionPct}%` }}
        />
      </div>
    </header>
  );
};
