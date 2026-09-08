import React from 'react';
import { Question, QuestionAnswerState } from '../types';

interface JumpGridProps {
  questions: Question[];
  currentIndex: number;
  answers: Record<number, QuestionAnswerState>;
  onSelectIndex: (index: number) => void;
}

export const JumpGrid: React.FC<JumpGridProps> = ({
  questions,
  currentIndex,
  answers,
  onSelectIndex,
}) => {
  return (
    <section className="bg-white border-2 border-[#ded4c3] rounded-xl p-2 sm:p-2.5 shadow-xs select-none">
      {/* Jump Header & Clean High-Contrast Legend */}
      <div className="flex items-center justify-between gap-2 mb-1.5">
        <h3 className="text-xs font-black uppercase tracking-wider text-[#4a423b]">
          Navigator (Q1 – Q{questions.length})
        </h3>

        {/* Legend */}
        <div className="flex items-center gap-2.5 text-[11px] font-bold text-[#6b635b] flex-wrap">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#2e7d32]" />
            <span>Correct</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#c62828]" />
            <span>Missed</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#185a9d]" />
            <span>Estimate</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-xs border-2 border-[#8b1e1e] bg-white" />
            <span>Active</span>
          </div>
        </div>
      </div>

      {/* Grid of Number Buttons: Fixed height buttons for absolute layout stability */}
      <div className="grid grid-cols-10 sm:grid-cols-15 md:grid-cols-20 gap-1">
        {questions.map((q, idx) => {
          const ans = answers[idx];
          const isCurrent = idx === currentIndex;
          const isChecked = !!ans?.isChecked;

          let btnClasses = 'w-full h-6 sm:h-7 rounded-md text-[11px] sm:text-xs font-black transition flex items-center justify-center border cursor-pointer active:scale-90 ';

          if (isChecked) {
            if (q.type === 'mcq') {
              if (ans.isCorrect) {
                btnClasses += 'bg-[#2e7d32] text-white border-[#2e7d32] hover:brightness-110';
              } else {
                btnClasses += 'bg-[#c62828] text-white border-[#c62828] hover:brightness-110';
              }
            } else {
              btnClasses += 'bg-[#185a9d] text-white border-[#185a9d] hover:brightness-110';
            }
          } else {
            btnClasses += 'bg-[#faf8f4] text-[#4a423b] border-[#ded4c3] hover:border-[#8b1e1e] hover:bg-white';
          }

          if (isCurrent) {
            btnClasses += ' ring-2 ring-[#8b1e1e] ring-offset-1 font-black scale-105 shadow-xs z-10 bg-white text-[#8b1e1e]';
          }

          return (
            <button
              key={idx}
              onClick={() => onSelectIndex(idx)}
              className={btnClasses}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>
    </section>
  );
};
