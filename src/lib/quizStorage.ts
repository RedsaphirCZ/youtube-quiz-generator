import { QuizDataset } from '../types';

const STORAGE_KEY = 'quiz_factory_saved_quizzes_v1';

/**
 * Retrieves all custom & AI generated quizzes saved in persistent browser storage.
 */
export function getSavedQuizzes(): QuizDataset[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch (err) {
    console.error('Failed to load saved quizzes from localStorage:', err);
    return [];
  }
}

/**
 * Saves a quiz dataset into persistent storage.
 * Updates existing if matching ID exists, otherwise prepends.
 */
export function saveQuizToLibrary(quiz: QuizDataset): boolean {
  try {
    const existing = getSavedQuizzes();
    const index = existing.findIndex((q) => q.id === quiz.id);
    
    // Ensure metadata is intact
    const datasetToSave: QuizDataset = {
      ...quiz,
      id: quiz.id || `quiz-${Date.now()}`,
      createdAt: quiz.createdAt || new Date().toISOString(),
    };

    let updatedList: QuizDataset[];
    if (index >= 0) {
      updatedList = [...existing];
      updatedList[index] = datasetToSave;
    } else {
      updatedList = [datasetToSave, ...existing];
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
    return true;
  } catch (err) {
    console.error('Failed to save quiz to localStorage:', err);
    return false;
  }
}

/**
 * Deletes a saved quiz from persistent storage by ID.
 */
export function deleteSavedQuiz(quizId: string): void {
  try {
    const existing = getSavedQuizzes();
    const filtered = existing.filter((q) => q.id !== quizId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (err) {
    console.error('Failed to delete saved quiz:', err);
  }
}

/**
 * Checks whether the evidence agent cleared a quiz for final human review.
 */
export function isQuizVerified(quiz: QuizDataset): boolean {
  return quiz.agentValidation?.verdict === 'ready_for_human_review';
}
