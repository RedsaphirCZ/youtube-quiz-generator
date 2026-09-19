import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { generateLanguagePrompt, languageDemo, languageDirection, languages, loadLanguageLibrary, parseLanguageQuiz, questionTypes, saveLanguageQuiz } from '../src/language-quiz/languageQuiz';
import type { LanguagePromptConfig } from '../src/language-quiz/languageQuiz';
import { flagPath, generatePhrasePrompt, loadPhraseLibrary, parsePhraseDeck, phraseCardTheme, phraseDeckHTML, phraseProfiles, savePhraseDeck } from '../src/language-quiz/phraseCards';

assert.equal(languages.length, 24);
assert.equal(new Set(languages.map(item => item[0])).size, 24);
assert.deepEqual(['High', 'Medium', 'Low'].map(tier => languages.filter(item => item[2] === tier).length), [6, 15, 3]);
assert.ok(languages.some(item => item[0] === 'ro' && item[1] === 'Romanian'));
assert.ok(languages.some(item => item[0] === 'tr' && item[1] === 'Turkish'));
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
const stores = new Map<string, string>(); let quota = false;
Object.defineProperty(globalThis, 'localStorage', { value: { getItem: (key: string) => stores.get(key) ?? null, setItem: (key: string, value: string) => { if (quota) throw new Error('Quota exceeded'); stores.set(key, value); } } });
assert.deepEqual(loadLanguageLibrary(), []);
assert.equal(saveLanguageQuiz(imported).length, 1);
assert.equal(saveLanguageQuiz({ ...imported, title: 'Updated' }).length, 1);
assert.equal(loadLanguageLibrary()[0].title, 'Updated');
stores.set('language-quiz-library-v1', JSON.stringify([null, {}, imported]));
assert.equal(loadLanguageLibrary().length, 1);
quota = true;
assert.throws(() => saveLanguageQuiz(imported), /Quota/);
quota = false; stores.set('language-quiz-library-v1', '{bad');
assert.throws(() => saveLanguageQuiz(imported));
assert.equal(stores.get('language-quiz-library-v1'), '{bad', 'Unreadable storage must not be overwritten');

const phraseConfig = { title: 'One useful phrase', phrase: 'Where is the station?', sourceLanguage: 'en' as const, context: 'A traveller politely asking for directions.' };
const phrasePrompt = generatePhrasePrompt(phraseConfig);
assert.match(phrasePrompt, /24 language flashcards/);
assert.match(phrasePrompt, /ro: Romanian; Standard Romanian/);
assert.match(phrasePrompt, /tr: Turkish; Standard Turkish/);
assert.match(phrasePrompt, /full-phrase|ENTIRE translated phrase/);
assert.match(phrasePrompt, /czechPronunciation/);
assert.match(phrasePrompt, /á, é, í, ó, ú\/ů, ý, š, č, ž, ň, ť, ď, ř, ch and dž/);
assert.match(phrasePrompt, /Czech j sounds like English y/);
const phraseJSON = {
  schema: 'phrase-flashcards/v1', title: phraseConfig.title, sourcePhrase: phraseConfig.phrase, sourceLanguage: phraseConfig.sourceLanguage, context: phraseConfig.context,
  cards: languages.map(([language]) => ({ language, phrase: `Phrase ${language}`, ipa: `/ipa ${language}/`, czechPronunciation: `česká výslovnost ${language}`, variety: phraseProfiles[language].variety })),
};
const phraseDeck = parsePhraseDeck('```json\n' + JSON.stringify(phraseJSON) + '\n```');
assert.equal(phraseDeck.cards.length, 24);
assert.deepEqual(phraseDeck.cards.map(card => card.language), languages.map(item => item[0]));
assert.equal(phraseDeck.reviewed, false);
assert.throws(() => parsePhraseDeck(JSON.stringify({ ...phraseJSON, cards: phraseJSON.cards.slice(1) })), /exactly 24 cards/);
assert.throws(() => parsePhraseDeck(JSON.stringify({ ...phraseJSON, cards: phraseJSON.cards.map((card, i) => i === 1 ? { ...card, language: 'en' } : card) })), /Duplicate language/);
assert.throws(() => parsePhraseDeck(JSON.stringify({ ...phraseJSON, cards: phraseJSON.cards.map((card, i) => i === 0 ? { ...card, ipa: 'English respelling' } : card) })), /complete IPA/);
assert.throws(() => parsePhraseDeck(JSON.stringify({ ...phraseJSON, cards: phraseJSON.cards.map((card, i) => i === 0 ? { ...card, czechPronunciation: '' } : card) })), /Czech pronunciation/);
assert.equal(phraseDeck.design.backgroundMode, 'language');
assert.notEqual(phraseCardTheme(phraseDeck, 'ro').background, phraseCardTheme(phraseDeck, 'tr').background);
const singleColourDeck = parsePhraseDeck(JSON.stringify({ ...phraseJSON, design: { backgroundMode: 'set', setColor: '#123456' } }));
assert.equal(phraseCardTheme(singleColourDeck, 'ro').background, '#123456');
assert.equal(phraseCardTheme(singleColourDeck, 'tr').background, '#123456');
const flagCodes = [...new Set(Object.values(phraseProfiles).flatMap(profile => profile.flags))];
for (const code of flagCodes) assert.ok(existsSync(resolve('public', flagPath(code))), `Missing bundled flag: ${code}`);
const embeddedFlags = Object.fromEntries(flagCodes.map(code => [code, 'data:image/png;base64,AAAA']));
const html = phraseDeckHTML(phraseDeck, embeddedFlags);
assert.match(html, /Print \/ Save as PDF/);
assert.match(html, /lang="ar" dir="rtl"/);
assert.match(html, /Romanian/);
assert.match(html, /Turkish/);
assert.match(html, /Česky:/);
assert.match(html, /česká výslovnost ro/);
assert.match(html, /--card-bg:/);
stores.delete('phrase-flashcard-library-v1');
assert.deepEqual(loadPhraseLibrary(), []);
assert.equal(savePhraseDeck(phraseDeck).length, 1);
assert.equal(loadPhraseLibrary()[0].cards.length, 24);
quota = true;
assert.throws(() => savePhraseDeck(phraseDeck), /Quota/);

console.log('PASS: two modes, 24 languages, IPA plus Czech pronunciation, permanent colour themes, bundled flags, printable PDF HTML, strict imports, RTL and draft storage.');
