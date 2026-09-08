import React from 'react';
import { AlertTriangle, RotateCcw, X } from 'lucide-react';

interface ResetConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ResetConfirmDialog: React.FC<ResetConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white border border-[#e0d8cb] rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#ffebee] text-[#c62828] flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-[#2b2520]">
              Reset Quiz Progress?
            </h3>
            <p className="text-xs text-[#6b635b] leading-relaxed">
              This will clear all submitted answers, scored MCQs, and numeric estimates for this quiz, returning you to Question 1.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs md:text-sm font-semibold text-[#6b635b] hover:bg-[#faf8f4] border border-[#e0d8cb] transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 rounded-lg text-xs md:text-sm font-bold bg-[#c62828] hover:bg-[#b71c1c] text-white transition flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Answers
          </button>
        </div>
      </div>
    </div>
  );
};
