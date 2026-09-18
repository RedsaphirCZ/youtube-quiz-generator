import assert from 'node:assert/strict';
import { generateLanguagePrompt, languageDemo, languageDirection, languages, loadLanguageLibrary, parseLanguageQuiz, questionTypes, saveLanguageQuiz } from '../src/language-quiz/languageQuiz';
import type { LanguagePromptConfig } from '../src/language-quiz/languageQuiz';

assert.equal(languages.length, 22);
assert.equal(new Set(languages.map(item => item[0])).size, 22);
assert.deepEqual(['High', 'Medium', 'Low'].map(tier => languages.filter(item => item[2] === tier).length), [6, 13, 3]);
const config: LanguagePromptConfig = { title: 'Japanese “First words”', topic: 'Greetings', targetLanguage: 'ja', instructionLanguage: 'cs', variety: 'Standard Japanese', level: 'A1', questionCount: 20, answerChoiceCount: 2, focus: 'mixed', transliteration: true, instructions: 'Keep a calm tone.' };
const prompt = generateLanguagePrompt(config);
assert.ok(prompt.includes(JSON.stringify(config.title)));
assert.match(prompt, /Czech \(cs\)/);
assert.match(prompt, /exactly 20 questions/);
assert.match(prompt, /Exactly 2 distinct options/);
assert.match(prompt, /Standard Japanese/);
assert.match(prompt, /Keep a calm tone/);
for (const type of Object.keys(questionTypes)) assert.ok(prompt.includes(type));
assert.match(generateLanguagePrompt({ ...config, transliteration: false }), /Omit transliteration/);
for (const count of [0, 101, 1.5, NaN]) assert.throws(() => generateLanguagePrompt({ ...config, questionCount: count }));

const imported = parseLanguageQuiz('```json\n' + JSON.stringify(languageDemo) + '\n```');
assert.equal(imported.title, languageDemo.title);
assert.deepEqual(JSON.parse(JSON.stringify(imported.questions)), languageDemo.questions);
assert.notEqual(imported.id, languageDemo.id);
assert.equal(parseLanguageQuiz(JSON.stringify({ ...languageDemo, reviewed: true })).reviewed, false);
const bad = (changes: object) => JSON.stringify({ ...languageDemo, ...changes });
for (const changes of [{ schema: 'picture-quiz/v1' }, { targetLanguage: 'zz' }, { level: 'A0' }, { title: '' }, { questions: [] }, { questions: [null] }]) assert.throws(() => parseLanguageQuiz(bad(changes)));
for (const changes of [{ type: 'toString' }, { correctIndex: 3 }, { correctIndex: '0' }, { options: ['A', 'a'] }, { options: [null, 'b'] }, { options: ['é', 'e\u0301'] }, { text: '' }, { explanation: '' }, { transliteration: {} }]) {
  assert.throws(() => parseLanguageQuiz(bad({ questions: [{ ...languageDemo.questions[0], ...changes }] })));
}
for (const code of ['ar', 'he'] as const) {
  assert.equal(languageDirection(code), 'rtl');
  const pack = parseLanguageQuiz(bad({ targetLanguage: code, questions: [{ ...languageDemo.questions[0], text: code === 'ar' ? 'مرحبا' : 'שלום' }] }));
  assert.equal(pack.targetLanguage, code);
}
let stored = '[]'; let quota = false;
Object.defineProperty(globalThis, 'localStorage', { value: { getItem: () => stored, setItem: (_key: string, value: string) => { if (quota) throw new Error('Quota exceeded'); stored = value; } } });
assert.deepEqual(loadLanguageLibrary(), []);
assert.equal(saveLanguageQuiz(imported).length, 1);
assert.equal(saveLanguageQuiz({ ...imported, title: 'Updated' }).length, 1);
assert.equal(loadLanguageLibrary()[0].title, 'Updated');
stored = JSON.stringify([null, {}, imported]);
assert.equal(loadLanguageLibrary().length, 1);
quota = true;
assert.throws(() => saveLanguageQuiz(imported), /Quota/);
quota = false; stored = '{bad';
assert.throws(() => saveLanguageQuiz(imported));
assert.equal(stored, '{bad', 'Unreadable storage must not be overwritten');
console.log('PASS: 22 languages and priorities, prompt contract, native scripts, strict import types, draft status, storage updates and failure handling.');
