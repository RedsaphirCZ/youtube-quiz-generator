import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, 
  X, 
  ArrowRight, 
  ArrowLeft, 
  Hash, 
  HelpCircle, 
  BookOpen, 
  Compass, 
  Target,
  Sparkles
} from 'lucide-react';
import { Question, QuestionAnswerState } from '../types';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  answerState?: QuestionAnswerState;
  onAnswerMCQ: (selectedIdx: 0 | 1 | 2) => void;
  onCheckNumber: (guess: number) => void;
  onPrev: () => void;
  onNext: () => void;
  onFinish: () => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
  answerState,
  onAnswerMCQ,
  onCheckNumber,
  onPrev,
  onNext,
  onFinish,
}) => {
  const [numInputVal, setNumInputVal] = useState<string>('');
  const isLast = questionNumber === totalQuestions;
  const isAnswered = !!answerState?.isChecked;
  const cycleNumber = Math.floor((questionNumber - 1) / 6) + 1;
  const cyclePos = ((questionNumber - 1) % 6) + 1;

  // Sync input value when question changes or answer state exists
  useEffect(() => {
    if (question.type === 'number') {
      if (answerState?.guess !== undefined) {
        setNumInputVal(String(answerState.guess));
      } else {
        setNumInputVal('');
      }
    }
  }, [question, answerState]);

  const handleNumberSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isAnswered) return;
    const val = parseFloat(numInputVal);
    if (!isNaN(val)) {
      onCheckNumber(val);
    }
  };

  const optionLetters = ['A', 'B', 'C'];

  return (
    <div className="quiz-question-card bg-white border border-[#e2d9cc] rounded-2xl p-5 sm:p-6 md:p-7 shadow-sm relative transition-colors">
      {/* Clean Meta Header */}
      <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-[#ebdccb]">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-lg text-xs sm:text-sm font-black tracking-wider uppercase bg-[#8b1e1e] text-white shadow-xs">
            Q{questionNumber}
          </span>

          {question.type === 'mcq' ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-[#fef8e7] text-[#7c5c0a] border border-[#c59b27]">
              <HelpCircle className="w-3.5 h-3.5 text-[#8b1e1e]" />
              Multiple Choice
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-[#eef6fc] text-[#185a9d] border border-[#185a9d]">
              <Hash className="w-3.5 h-3.5" />
              Numerical Estimate
            </span>
          )}
        </div>

        <div className="text-xs sm:text-sm font-bold text-[#706860]">
          <span className="text-[#8b1e1e] font-extrabold text-sm sm:text-base">{questionNumber}</span> / {totalQuestions}
        </div>
      </div>

      {/* Main Question Heading */}
      <h2 className="quiz-question-heading text-2xl sm:text-3xl md:text-5xl font-extrabold text-[#1f1a16] leading-snug mb-5 tracking-tight">
        {question.question}
      </h2>

      {/* Interactive MCQ View */}
      {question.type === 'mcq' && (
        <div className="flex flex-col gap-2.5 sm:gap-3">
          {question.options.map((optText, optIdx) => {
            const letter = optionLetters[optIdx];
            const isSelected = answerState?.selectedOption === optIdx;
            const isCorrect = optIdx === question.correctIndex;
            const showCorrectHighlight = isAnswered && isCorrect;
            const showWrongHighlight = isAnswered && isSelected && !isCorrect;

            let buttonClasses = 'quiz-option-button w-full text-left flex items-center gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-xl border-2 text-xl sm:text-2xl md:text-3xl font-bold transition cursor-pointer shadow-xs active:scale-[0.99] ';

            if (!isAnswered) {
              buttonClasses += 'border-[#e4ded5] bg-[#faf8f4] text-[#1f1a16] hover:border-[#8b1e1e] hover:bg-white hover:shadow-sm';
            } else if (showCorrectHighlight) {
              buttonClasses += 'border-[#2e7d32] bg-[#eef7ee] text-[#1b5e20] shadow-xs ring-2 ring-[#2e7d32]/20';
            } else if (showWrongHighlight) {
              buttonClasses += 'border-[#dc2626] bg-[#fef2f2] text-[#991b1b] shadow-xs ring-2 ring-[#dc2626]/20';
            } else {
              buttonClasses += 'border-[#e8e2d8] bg-[#f8f6f0] text-[#9c9388] opacity-50';
            }

            let markerClasses = 'w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-sm sm:text-base font-black shrink-0 transition shadow-inner ';
            if (!isAnswered) {
              markerClasses += 'bg-[#ede5d6] text-[#1f1a16]';
            } else if (showCorrectHighlight) {
              markerClasses += 'bg-[#2e7d32] text-white';
            } else if (showWrongHighlight) {
              markerClasses += 'bg-[#dc2626] text-white';
            } else {
              markerClasses += 'bg-[#e4ded5] text-[#9c9388]';
            }

            return (
              <button
                key={optIdx}
                disabled={isAnswered}
                onClick={() => onAnswerMCQ(optIdx as 0 | 1 | 2)}
                className={buttonClasses}
              >
                <span className={markerClasses}>
                  {isAnswered && showCorrectHighlight ? (
                    <Check className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3]" />
                  ) : isAnswered && showWrongHighlight ? (
                    <X className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3]" />
                  ) : (
                    letter
                  )}
                </span>
                <span className="flex-1 leading-snug">{optText}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Interactive Guess the Number View */}
      {question.type === 'number' && (
        <div className="space-y-4">
          <form onSubmit={handleNumberSubmit} className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 items-stretch">
            <div className="flex items-center flex-1 border-2 border-[#e4ded5] focus-within:border-[#185a9d] rounded-xl px-4 py-2 bg-white transition shadow-xs focus-within:shadow-md">
              <input
                type="number"
                step="any"
                disabled={isAnswered}
                placeholder="Enter estimate..."
                value={numInputVal}
                onChange={(e) => setNumInputVal(e.target.value)}
                className="w-full text-lg sm:text-xl font-black text-[#1f1a16] outline-none py-1 bg-transparent"
              />
              {question.metricUnit && (
                <span className="text-xs sm:text-sm font-extrabold text-[#4a423b] bg-[#ede5d8] px-2.5 py-1 rounded-lg ml-2 whitespace-nowrap">
                  {question.metricUnit}
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={isAnswered || !numInputVal.trim()}
              className="px-6 py-3 rounded-xl font-extrabold text-sm sm:text-base bg-[#185a9d] hover:bg-[#124479] text-white transition disabled:opacity-40 disabled:cursor-not-allowed shadow-sm shrink-0 cursor-pointer active:scale-95"
            >
              Reveal Result
            </button>
          </form>

          {/* Comparison Metrics Box */}
          {isAnswered && answerState?.guess !== undefined && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#eef6fc] border border-[#185a9d]/30 rounded-xl p-4 space-y-3 shadow-xs"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs md:text-sm uppercase font-black tracking-wider text-[#185a9d] flex items-center gap-1.5">
                  <Target className="w-4 h-4" />
                  Estimate Analysis
                </span>

                {answerState.direction === 'exact' && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-[#e8f5e9] text-[#2e7d32] border border-[#2e7d32]">
                    EXACT MATCH!
                  </span>
                )}
                {answerState.direction === 'higher' && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-[#fff3e0] text-[#e65100] border border-[#e65100]/40">
                    High Guess
                  </span>
                )}
                {answerState.direction === 'lower' && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-[#e1f5fe] text-[#0277bd] border border-[#0277bd]/40">
                    Low Guess
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                <div className="bg-white p-3 rounded-xl border border-[#185a9d]/20 shadow-xs">
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#706860] block">
                    Actual Target
                  </span>
                  <span className="text-base sm:text-lg font-black text-[#185a9d] block mt-0.5">
                    {question.target.toLocaleString()} {question.metricUnit}
                  </span>
                  {question.imperialDisplay && (
                    <span className="text-[10px] sm:text-xs font-semibold text-[#706860] block mt-0.5">
                      ({question.imperialDisplay})
                    </span>
                  )}
                </div>

                <div className="bg-white p-3 rounded-xl border border-[#185a9d]/20 shadow-xs">
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#706860] block">
                    Your Guess
                  </span>
                  <span className="text-base sm:text-lg font-black text-[#1f1a16] block mt-0.5">
                    {answerState.guess.toLocaleString()} {question.metricUnit}
                  </span>
                </div>

                <div className="bg-white p-3 rounded-xl border border-[#185a9d]/20 shadow-xs col-span-2 sm:col-span-1">
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#706860] block">
                    Difference
                  </span>
                  <span className="text-base sm:text-lg font-black text-[#dc2626] block mt-0.5">
                    {answerState.offBy?.toLocaleString()} {question.metricUnit}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* Clean Factual Context Box */}
      <AnimatePresence>
        {isAnswered && question.explanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="quiz-explanation mt-4 p-3.5 sm:p-4 rounded-xl bg-[#faf7f0] border-l-4 border-l-[#8b1e1e] border border-[#e2d9cc] text-lg sm:text-xl text-[#1f1a16] space-y-1 shadow-xs"
          >
            <div className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-[#8b1e1e]">
              <BookOpen className="w-3.5 h-3.5" />
              Behind the answer
            </div>
            <p className="leading-relaxed font-medium text-[#2d251e]">
              {question.explanation}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Clean Navigation Controls */}
      <div className="flex items-center justify-between gap-3 mt-5 pt-4 border-t border-[#ebdccb]">
        <button
          onClick={onPrev}
          disabled={questionNumber === 1}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-sm border border-[#ded4c3] text-[#1f1a16] hover:border-[#8b1e1e] hover:text-[#8b1e1e] hover:bg-[#faf7f0] transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer active:scale-95 shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          Previous
        </button>

        {isLast ? (
          <button
            onClick={onFinish}
            className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl font-extrabold text-base bg-[#8b1e1e] hover:bg-[#731818] text-white transition shadow-sm cursor-pointer active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-[#fef8e7]" />
            Finish Quiz
          </button>
        ) : (
          <button
            onClick={onNext}
            className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl font-extrabold text-base bg-[#8b1e1e] hover:bg-[#731818] text-white transition shadow-sm cursor-pointer active:scale-95"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
