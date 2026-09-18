import { PictureQuizDataset } from './types';
import { parsePictureQuizResponse } from './pictureQuiz';
const key = 'picture-quiz-library-v1';
function readLegacy(): PictureQuizDataset[] {
  try {
    const stored: unknown = JSON.parse(localStorage.getItem(key) || '[]');
    if (!Array.isArray(stored)) return [];
    return stored.flatMap(item => {
      try {
        const quiz = parsePictureQuizResponse(JSON.stringify(item));
        return [{ ...quiz, id: typeof item.id === 'string' ? item.id : quiz.id, createdAt: typeof item.createdAt === 'string' ? item.createdAt : quiz.createdAt }];
      } catch { return []; }
    });
  } catch { return []; }
}
function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('picture-quiz-projects', 1);
    request.onupgradeneeded = () => request.result.createObjectStore('quizzes', { keyPath: 'id' });
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
    request.onblocked = () => reject(new Error('Close other quiz tabs and try again.'));
  });
}
export async function loadPictureLibrary(): Promise<PictureQuizDataset[]> {
  const legacy = readLegacy();
  if (typeof indexedDB === 'undefined') return legacy;
  const db = await openDatabase();
  try {
    const saved = await new Promise<PictureQuizDataset[]>((resolve, reject) => {
      const request = db.transaction('quizzes').objectStore('quizzes').getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
    return [...saved, ...legacy.filter(item => !saved.some(project => project.id === item.id))];
  } finally { db.close(); }
}
export async function savePictureQuiz(quiz: PictureQuizDataset): Promise<PictureQuizDataset[]> {
  if (typeof indexedDB === 'undefined') {
    const next = [quiz, ...readLegacy().filter(item => item.id !== quiz.id)];
    localStorage.setItem(key, JSON.stringify(next));
    return next;
  }
  const db = await openDatabase();
  try {
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction('quizzes', 'readwrite');
      transaction.objectStore('quizzes').put(quiz);
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
      transaction.onabort = () => reject(transaction.error || new Error('Save cancelled.'));
    });
  } finally { db.close(); }
  return loadPictureLibrary();
}
