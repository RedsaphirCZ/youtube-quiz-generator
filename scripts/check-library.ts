import assert from 'node:assert/strict';
import { parseFlexibleQuizResponse } from '../src/lib/quizPrompt';
import { getSavedQuizzes, saveQuizToLibrary, validateLibraryQuiz } from '../src/lib/quizStorage';

let stored = '[]';
Object.defineProperty(globalThis, 'localStorage', { value: {
  getItem: () => stored,
  setItem: (_key: string, value: string) => { stored = value; },
} });
const question = { type: 'mcq', question: 'Which country is this?', options: ['Japan', 'Canada'], correctIndex: 0, explanation: 'This is Japan.' };
for (const count of [6, 20, 24, 25, 60]) {
  const { quiz } = parseFlexibleQuizResponse(JSON.stringify({ title: 'Flexible pack', questions: Array.from({ length: count }, (_, i) => ({ ...question, question: `Which country is shown in picture ${i + 1}?`, correctIndex: i % 2 })) }));
  assert.equal(validateLibraryQuiz(quiz).isValid, true, `${count}-question MCQ pack must remain valid in the library`);
  assert.equal(saveQuizToLibrary(quiz), true);
}
for (const bad of [null, {}, { ...question, question: 42 }, { ...question, options: [null, 'Canada'] }, { ...question, correctIndex: 2 }, { ...question, type: 'toString' }, { type: 'number', question: 'How many?', target: '42', explanation: '' }]) {
  assert.throws(() => parseFlexibleQuizResponse(JSON.stringify({ title: 'Bad', questions: [bad] })));
}
const valid = getSavedQuizzes()[0];
stored = JSON.stringify([null, {}, { ...valid, questions: [null] }, valid]);
assert.deepEqual(getSavedQuizzes(), [valid], 'One corrupt entry must not hide valid saved packs');
const before = stored;
assert.equal(saveQuizToLibrary({ ...valid, questions: [null] } as unknown as typeof valid), false);
assert.equal(stored, before, 'Rejected saves must not change storage');
const draft = parseFlexibleQuizResponse(JSON.stringify({ ...valid, validated: true, agentValidation: { verdict: 'ready_for_human_review' } })).quiz;
assert.equal(draft.validated, false);
assert.equal(draft.agentValidation, undefined);
console.log('PASS: flexible library validation, malformed imports and saved records, rejected writes, and unreviewed import status.');
