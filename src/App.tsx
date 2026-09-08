import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from './components/Header';
import { QuestionCard } from './components/QuestionCard';
import { JumpGrid } from './components/JumpGrid';
import { SummaryView } from './components/SummaryView';
import { ThemeModal } from './components/ThemeModal';
import { ExportModal } from './components/ExportModal';
import { ResetConfirmDialog } from './components/ResetConfirmDialog';
import { InspectorLabModal } from './components/InspectorLabModal';
import { LandingPage } from './components/LandingPage';
import { curatedQuizzes } from './data/curatedQuizzes';
import { QuizDataset, QuestionAnswerState } from './types';

export default function App() {
  const [activeQuiz, setActiveQuiz] = useState<QuizDataset>(
    curatedQuizzes.find((q) => q.id === 'roman-empire-60') || curatedQuizzes[0]
  );
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, QuestionAnswerState>>({});
  const [isSummaryView, setIsSummaryView] = useState<boolean>(false);
  const [isLandingPage, setIsLandingPage] = useState<boolean>(true);

  // Modals
  const [isThemeModalOpen, setIsThemeModalOpen] = useState<boolean>(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState<boolean>(false);
  const [isInspectorLabOpen, setIsInspectorLabOpen] = useState<boolean>(false);

  const totalQuestions = activeQuiz.questions.length;
  const currentQuestion = activeQuiz.questions[currentIndex];

  // Handle MCQ Selection
  const handleAnswerMCQ = useCallback((selectedIdx: 0 | 1 | 2) => {
    if (answers[currentIndex]?.isChecked) return;
    if (currentQuestion.type !== 'mcq') return;
    if (selectedIdx >= currentQuestion.options.length) return;

    const isCorrect = selectedIdx === currentQuestion.correctIndex;
    setAnswers((prev) => ({
      ...prev,
      [currentIndex]: {
        selectedOption: selectedIdx,
        isCorrect,
        isChecked: true,
        answeredAt: Date.now(),
      },
    }));
  }, [answers, currentIndex, currentQuestion]);

  // Handle Guess the Number Check
  const handleCheckNumber = useCallback((guess: number) => {
    if (answers[currentIndex]?.isChecked) return;
    if (currentQuestion.type !== 'number') return;

    const target = currentQuestion.target;
    const offBy = Math.abs(guess - target);
    const closerSpan: [number, number] = [target - offBy, target + offBy];
    const direction = guess === target ? 'exact' : guess > target ? 'higher' : 'lower';

    setAnswers((prev) => ({
      ...prev,
      [currentIndex]: {
        guess,
        offBy,
        closerSpan,
        direction,
        isChecked: true,
        answeredAt: Date.now(),
      },
    }));
  }, [answers, currentIndex, currentQuestion]);

  // Navigation handlers
  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  const handleNext = useCallback(() => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsSummaryView(true);
    }
  }, [currentIndex, totalQuestions]);

  const handleJumpToQuestion = (index: number) => {
    if (index >= 0 && index < totalQuestions) {
      setCurrentIndex(index);
      setIsSummaryView(false);
    }
  };

  const handleRestartQuiz = () => {
    setAnswers({});
    setCurrentIndex(0);
    setIsSummaryView(false);
  };

  const handleSelectQuiz = (newQuiz: QuizDataset) => {
    setActiveQuiz(newQuiz);
    setAnswers({});
    setCurrentIndex(0);
    setIsSummaryView(false);
    setIsLandingPage(false);
  };

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts if inside text inputs or modals open
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) {
        return;
      }
      if (isThemeModalOpen || isExportModalOpen || isResetConfirmOpen || isInspectorLabOpen) {
        return;
      }

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (currentQuestion.type === 'mcq' && !answers[currentIndex]?.isChecked) {
        if (e.key === '1' || e.key.toLowerCase() === 'a') {
          handleAnswerMCQ(0);
        } else if (e.key === '2' || e.key.toLowerCase() === 'b') {
          handleAnswerMCQ(1);
        } else if (e.key === '3' || e.key.toLowerCase() === 'c') {
          handleAnswerMCQ(2);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, currentQuestion, answers, handleNext, handlePrev, handleAnswerMCQ, isThemeModalOpen, isExportModalOpen, isResetConfirmOpen, isInspectorLabOpen]);

  if (isLandingPage) {
    return (
      <>
        <LandingPage
          onStartQuiz={handleSelectQuiz}
          onBrowseQuizzes={() => setIsThemeModalOpen(true)}
        />
        <ThemeModal
          isOpen={isThemeModalOpen}
          onClose={() => setIsThemeModalOpen(false)}
          onSelectQuiz={handleSelectQuiz}
          currentQuizId={activeQuiz.id}
          landingEntry
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f2eb] text-[#2b2520] antialiased p-2 sm:p-3 md:p-4 flex flex-col items-center justify-between">
      <div className="w-full max-w-6xl flex flex-col justify-between gap-2 sm:gap-2.5 min-h-0">
        {/* Header with tracker, score, and actions */}
        <div className="shrink-0">
          <Header
            quiz={activeQuiz}
            currentIndex={currentIndex}
            answers={answers}
            onOpenThemeModal={() => setIsThemeModalOpen(true)}
            onOpenExportModal={() => setIsExportModalOpen(true)}
            onOpenResetConfirm={() => setIsResetConfirmOpen(true)}
            onOpenInspectorLab={() => setIsInspectorLabOpen(true)}
          />
        </div>

        {/* Main Content Area: Question Card or Summary View */}
        <div className="flex-1 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {isSummaryView ? (
              <motion.div
                key="summary-view"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="my-auto"
              >
                <SummaryView
                  quiz={activeQuiz}
                  answers={answers}
                  onRestartQuiz={handleRestartQuiz}
                  onOpenThemeModal={() => setIsThemeModalOpen(true)}
                  onOpenExportModal={() => setIsExportModalOpen(true)}
                  onJumpToQuestion={handleJumpToQuestion}
                />
              </motion.div>
            ) : (
              <motion.div
                key={`question-${currentIndex}-${activeQuiz.id}`}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className="my-auto"
              >
                <QuestionCard
                  question={currentQuestion}
                  questionNumber={currentIndex + 1}
                  totalQuestions={totalQuestions}
                  answerState={answers[currentIndex]}
                  onAnswerMCQ={handleAnswerMCQ}
                  onCheckNumber={handleCheckNumber}
                  onPrev={handlePrev}
                  onNext={handleNext}
                  onFinish={() => setIsSummaryView(true)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Question Jump Grid (1-60) */}
        <div className="shrink-0">
          <JumpGrid
            questions={activeQuiz.questions}
            currentIndex={currentIndex}
            answers={answers}
            onSelectIndex={handleJumpToQuestion}
          />
        </div>
      </div>

      {/* Modals & Dialogs */}
      <ThemeModal
        isOpen={isThemeModalOpen}
        onClose={() => setIsThemeModalOpen(false)}
        onSelectQuiz={handleSelectQuiz}
        currentQuizId={activeQuiz.id}
      />

      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        quiz={activeQuiz}
      />

      <ResetConfirmDialog
        isOpen={isResetConfirmOpen}
        onClose={() => setIsResetConfirmOpen(false)}
        onConfirm={handleRestartQuiz}
      />

      <InspectorLabModal
        isOpen={isInspectorLabOpen}
        onClose={() => setIsInspectorLabOpen(false)}
        onLoadAndPlay={handleSelectQuiz}
        currentQuiz={activeQuiz}
      />
    </div>
  );
}
