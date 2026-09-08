import React, { useState } from 'react';
import { 
  Trophy, 
  RotateCcw, 
  Download, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  Target, 
  ChevronRight,
  Filter
} from 'lucide-react';
import { QuizDataset, QuestionAnswerState } from '../types';

interface SummaryViewProps {
  quiz: QuizDataset;
  answers: Record<number, QuestionAnswerState>;
  onRestartQuiz: () => void;
  onOpenThemeModal: () => void;
  onOpenExportModal: () => void;
  onJumpToQuestion: (index: number) => void;
}

export const SummaryView: React.FC<SummaryViewProps> = ({
  quiz,
  answers,
  onRestartQuiz,
  onOpenThemeModal,
  onOpenExportModal,
  onJumpToQuestion,
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'missed' | 'estimates'>('all');
  const totalCount = quiz.questions.length;

  let mcqAnswered = 0;
  let mcqCorrect = 0;
  let numbersChecked = 0;
  let totalDiff = 0;
  let completedCount = 0;

  for (let i = 0; i < totalCount; i++) {
    const a = answers[i];
    if (a && a.isChecked) {
      completedCount++;
      if (quiz.questions[i].type === 'mcq') {
        mcqAnswered++;
        if (a.isCorrect) mcqCorrect++;
      } else {
        numbersChecked++;
        if (a.offBy !== undefined) {
          totalDiff += a.offBy;
        }
      }
    }
  }

  const accuracyPct = mcqAnswered > 0 ? Math.round((mcqCorrect / mcqAnswered) * 100) : 0;
  const avgDiff = numbersChecked > 0 ? (totalDiff / numbersChecked).toFixed(1) : '0';

  const filteredQuestions = quiz.questions.map((q, idx) => ({ q, idx, ans: answers[idx] })).filter(({ q, ans }) => {
    if (filterMode === 'missed') {
      return q.type === 'mcq' && ans?.isChecked && !ans.isCorrect;
    }
    if (filterMode === 'estimates') {
      return q.type === 'number';
    }
    return true;
  });

  return (
    <div className="bg-white border border-[#e0d8cb] border-t-4 border-t-[#c59b27] rounded-xl p-6 md:p-10 shadow-lg space-y-8">
      {/* Header Banner */}
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <div className="w-16 h-16 rounded-full bg-[#fef8e7] border-2 border-[#c59b27] text-[#8b1e1e] flex items-center justify-center mx-auto shadow-inner">
          <Trophy className="w-8 h-8 text-[#c59b27]" />
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#8b1e1e] tracking-tight">
          Quiz Completed!
        </h2>
        <p className="text-sm md:text-base text-[#6b635b]">
          {quiz.title || quiz.theme} — Final Results & Knowledge Breakdown
        </p>
      </div>

      {/* Main Score Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
        <div className="bg-[#faf8f4] border border-[#e0d8cb] rounded-xl p-5 text-center space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#6b635b]">
            MCQ Accuracy
          </span>
          <div className="text-3xl font-extrabold text-[#2e7d32]">
            {accuracyPct}%
          </div>
          <span className="text-xs font-semibold text-[#6b635b] block">
            {mcqCorrect} correct of {mcqAnswered} answered
          </span>
        </div>

        <div className="bg-[#faf8f4] border border-[#e0d8cb] rounded-xl p-5 text-center space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#6b635b]">
            Numeric Estimates
          </span>
          <div className="text-3xl font-extrabold text-[#185a9d]">
            {numbersChecked} <span className="text-lg font-normal text-[#6b635b]">/ {Math.floor(totalCount / 6)}</span>
          </div>
          <span className="text-xs font-semibold text-[#6b635b] block">
            Avg Discrepancy: {avgDiff}
          </span>
        </div>

        <div className="bg-[#faf8f4] border border-[#e0d8cb] rounded-xl p-5 text-center space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#6b635b]">
            Total Completed
          </span>
          <div className="text-3xl font-extrabold text-[#8b1e1e]">
            {completedCount} <span className="text-lg font-normal text-[#6b635b]">/ {totalCount}</span>
          </div>
          <span className="text-xs font-semibold text-[#6b635b] block">
            {Math.round((completedCount / totalCount) * 100)}% coverage
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <button
          onClick={onRestartQuiz}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-lg font-bold text-sm md:text-base bg-[#8b1e1e] hover:bg-[#731818] text-white transition shadow-sm cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          Restart This Quiz
        </button>

        <button
          onClick={onOpenExportModal}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-lg font-bold text-sm md:text-base bg-white border-2 border-[#8b1e1e] text-[#8b1e1e] hover:bg-[#faf4f4] transition cursor-pointer"
        >
          <Download className="w-4 h-4 text-[#8b1e1e]" />
          Export for Recording / HTML
        </button>

        <button
          onClick={onOpenThemeModal}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-lg font-bold text-sm md:text-base bg-[#faf8f4] border border-[#e0d8cb] text-[#2b2520] hover:border-[#8b1e1e] hover:bg-white transition cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-[#8b1e1e]" />
          Generate New Theme
        </button>
      </div>

      {/* Question Review List */}
      <div className="pt-6 border-t border-[#e0d8cb] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#2b2520] flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#8b1e1e]" />
            Detailed Question Review
          </h3>

          <div className="inline-flex rounded-lg border border-[#e0d8cb] p-0.5 bg-[#faf8f4] text-xs font-semibold">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1 rounded-md transition cursor-pointer ${filterMode === 'all' ? 'bg-white text-[#8b1e1e] shadow-2xs font-bold' : 'text-[#6b635b]'}`}
            >
              All ({totalCount})
            </button>
            <button
              onClick={() => setFilterMode('missed')}
              className={`px-3 py-1 rounded-md transition cursor-pointer ${filterMode === 'missed' ? 'bg-white text-[#c62828] shadow-2xs font-bold' : 'text-[#6b635b]'}`}
            >
              Missed ({mcqAnswered - mcqCorrect})
            </button>
            <button
              onClick={() => setFilterMode('estimates')}
              className={`px-3 py-1 rounded-md transition cursor-pointer ${filterMode === 'estimates' ? 'bg-white text-[#185a9d] shadow-2xs font-bold' : 'text-[#6b635b]'}`}
            >
              Estimates ({Math.floor(totalCount / 6)})
            </button>
          </div>
        </div>

        <div className="divide-y divide-[#e0d8cb] border border-[#e0d8cb] rounded-lg overflow-hidden max-h-96 overflow-y-auto">
          {filteredQuestions.length === 0 ? (
            <div className="p-8 text-center text-sm text-[#6b635b]">
              No questions match the selected filter.
            </div>
          ) : (
            filteredQuestions.map(({ q, idx, ans }) => {
              const isChecked = !!ans?.isChecked;

              return (
                <div
                  key={idx}
                  onClick={() => onJumpToQuestion(idx)}
                  className="p-3.5 hover:bg-[#faf7f0] transition cursor-pointer flex items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <span className="w-7 h-7 rounded-md bg-[#eee8dc] text-xs font-bold flex items-center justify-center shrink-0 text-[#2b2520] mt-0.5">
                      {idx + 1}
                    </span>

                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#2b2520] truncate">
                        {q.question}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-[#6b635b] mt-0.5">
                        {q.type === 'mcq' ? (
                          isChecked ? (
                            ans.isCorrect ? (
                              <span className="text-[#2e7d32] font-semibold flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" /> Correct (Option {String.fromCharCode(65 + (ans.selectedOption ?? 0))})
                              </span>
                            ) : (
                              <span className="text-[#c62828] font-semibold flex items-center gap-1">
                                <XCircle className="w-3 h-3" /> Selected {String.fromCharCode(65 + (ans.selectedOption ?? 0))} • Answer was {String.fromCharCode(65 + q.correctIndex)}
                              </span>
                            )
                          ) : (
                            <span className="text-[#8c827a]">Unanswered</span>
                          )
                        ) : (
                          isChecked ? (
                            <span className="text-[#185a9d] font-semibold flex items-center gap-1">
                              <Target className="w-3 h-3" /> Guess: {ans.guess} • Target: {q.target} {q.metricUnit}
                            </span>
                          ) : (
                            <span className="text-[#8c827a]">Not estimated yet</span>
                          )
                        )}
                      </div>
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-[#8c827a] shrink-0" />
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
