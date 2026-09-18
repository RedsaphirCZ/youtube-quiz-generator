import { Question, QuizDataset } from '../types';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

/** Structural boundary for imported and persisted data; editorial checks run separately. */
export function assertQuestions(value: unknown): asserts value is Question[] {
  if (!Array.isArray(value) || value.length === 0) throw new Error('The quiz needs a non-empty questions array.');
  value.forEach((question: unknown, index) => {
    const fail = (message: string): never => { throw new Error(`Question ${index + 1} ${message}`); };
    if (!isRecord(question)) return fail('must be an object.');
    if (typeof question.question !== 'string' || !question.question.trim()) fail('needs question text.');
    if (typeof question.explanation !== 'string') fail('needs an explanation string.');
    if (question.type === 'mcq') {
      if (!Array.isArray(question.options) || ![2, 3].includes(question.options.length)
        || !question.options.every(option => typeof option === 'string' && option.trim())) fail('needs 2 or 3 text options.');
      const options = question.options as string[];
      if (typeof question.correctIndex !== 'number' || !Number.isInteger(question.correctIndex)
        || question.correctIndex < 0 || question.correctIndex >= options.length) fail('has an invalid correctIndex.');
    } else if (question.type === 'number') {
      if (typeof question.target !== 'number' || !Number.isFinite(question.target)) fail('needs a finite numeric target.');
      for (const field of ['metricUnit', 'imperialDisplay']) {
        if (question[field] !== undefined && typeof question[field] !== 'string') fail(`has an invalid ${field}.`);
      }
    } else fail(`uses unsupported type "${String(question.type)}".`);
  });
}

export function isStoredQuiz(value: unknown): value is QuizDataset {
  if (!isRecord(value)) return false;
  if (!['id', 'title', 'theme', 'description', 'createdAt'].every(field => typeof value[field] === 'string')) return false;
  if (value.category !== undefined && typeof value.category !== 'string') return false;
  try { assertQuestions(value.questions); return true; } catch { return false; }
}
