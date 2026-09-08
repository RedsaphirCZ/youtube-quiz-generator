import { MCQQuestion, QuizDataset } from '../types';

export type ExportAnswerChoiceMode = 'source' | 2;

/**
 * Builds an export-only quiz variant without mutating the saved source pack.
 * Three-choice questions keep the correct answer plus one deterministic
 * distractor, with the correct position alternating between A and B.
 */
export function createQuizExportVariant(
  quiz: QuizDataset,
  answerChoiceMode: ExportAnswerChoiceMode = 'source'
): QuizDataset {
  if (answerChoiceMode === 'source') return quiz;

  let mcqIndex = 0;
  const questions = quiz.questions.map((question) => {
    if (question.type !== 'mcq' || question.options.length <= 2) return question;

    const currentMcqIndex = mcqIndex++;
    const correctOption = question.options[question.correctIndex];
    const distractorIndexes = question.options
      .map((_, index) => index)
      .filter((index) => index !== question.correctIndex);
    const distractorIndex = distractorIndexes[currentMcqIndex % distractorIndexes.length];
    const distractor = question.options[distractorIndex];
    const putCorrectFirst = currentMcqIndex % 2 === 0;
    const options: [string, string] = putCorrectFirst
      ? [correctOption, distractor]
      : [distractor, correctOption];

    return {
      ...question,
      options,
      correctIndex: putCorrectFirst ? 0 : 1,
    } as MCQQuestion;
  });

  return {
    ...quiz,
    answerChoiceCount: 2,
    questions,
  };
}
