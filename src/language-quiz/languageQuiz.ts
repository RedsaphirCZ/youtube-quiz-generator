export const languages = [
  ['en', 'English', 'High'], ['ja', 'Japanese', 'High'], ['de', 'German', 'High'],
  ['ar', 'Arabic', 'High'], ['nl', 'Dutch', 'High'], ['no', 'Norwegian', 'High'],
  ['el', 'Greek', 'Medium'], ['fi', 'Finnish', 'Medium'], ['sv', 'Swedish', 'Medium'],
  ['ko', 'Korean', 'Medium'], ['da', 'Danish', 'Medium'], ['pl', 'Polish', 'Medium'],
  ['hr', 'Croatian', 'Medium'], ['es', 'Spanish', 'Medium'], ['fr', 'French', 'Medium'],
  ['it', 'Italian', 'Medium'], ['pt', 'Portuguese', 'Medium'], ['hu', 'Hungarian', 'Medium'],
  ['he', 'Hebrew', 'Medium'], ['cs', 'Czech', 'Low'], ['sk', 'Slovak', 'Low'], ['sl', 'Slovenian', 'Low'],
] as const;
export type LanguageCode = typeof languages[number][0];
export const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const;
export const questionTypes = {
  vocabulary_mcq: 'Vocabulary', translation_mcq: 'Translation',
  grammar_mcq: 'Grammar', phrase_mcq: 'Everyday phrases',
} as const;
export type LanguageQuestionType = keyof typeof questionTypes;
export interface LanguageQuestion {
  type: LanguageQuestionType;
  question: string;
  text: string;
  transliteration?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}
export interface LanguageQuiz {
  schema: 'language-quiz/v1'; id: string; title: string;
  targetLanguage: LanguageCode; instructionLanguage: LanguageCode;
  variety: string; level: typeof levels[number]; questions: LanguageQuestion[];
  createdAt: string; reviewed: false;
}
export interface LanguagePromptConfig {
  title: string; topic: string; targetLanguage: LanguageCode; instructionLanguage: LanguageCode;
  variety: string; level: typeof levels[number]; questionCount: number; answerChoiceCount: 2 | 3;
  focus: LanguageQuestionType | 'mixed'; transliteration: boolean; instructions: string;
}
export const languageName = (code: LanguageCode) => languages.find(item => item[0] === code)![1];
export const languageDirection = (code: LanguageCode) => code === 'ar' || code === 'he' ? 'rtl' : 'ltr';
const object = (value: unknown): value is Record<string, unknown> => !!value && typeof value === 'object' && !Array.isArray(value);
const text = (value: unknown, field: string): string => {
  if (typeof value !== 'string' || !value.trim()) throw new Error(`${field} needs non-empty text.`);
  return value.trim();
};
const language = (value: unknown, field: string): LanguageCode => {
  if (!languages.some(item => item[0] === value)) throw new Error(`${field} must use a supported language code.`);
  return value as LanguageCode;
};

/** All imported packs are drafts, even when a file claims to be reviewed. */
export function parseLanguageQuiz(raw: string, preserveIdentity = false): LanguageQuiz {
  const cleaned = raw.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
  const parsed: unknown = JSON.parse(cleaned);
  if (!object(parsed) || parsed.schema !== 'language-quiz/v1') throw new Error('Use the language-quiz/v1 format from the Language Quiz prompt.');
  const targetLanguage = language(parsed.targetLanguage, 'Target language');
  const instructionLanguage = language(parsed.instructionLanguage, 'Instruction language');
  if (!levels.includes(parsed.level as typeof levels[number])) throw new Error('Level must be A1, A2, B1, B2, C1 or C2.');
  if (!Array.isArray(parsed.questions) || parsed.questions.length < 1 || parsed.questions.length > 100) throw new Error('Include 1–100 questions.');
  const questions = parsed.questions.map((value: unknown, index): LanguageQuestion => {
    const label = `Question ${index + 1}`;
    if (!object(value) || typeof value.type !== 'string' || !Object.hasOwn(questionTypes, value.type)) throw new Error(`${label} has an unsupported type.`);
    if (!Array.isArray(value.options) || ![2, 3].includes(value.options.length)) throw new Error(`${label} needs 2 or 3 options.`);
    const options = value.options.map(option => text(option, `${label} option`));
    if (new Set(options.map(option => option.normalize('NFC').toLocaleLowerCase())).size !== options.length) throw new Error(`${label} has duplicate options.`);
    if (typeof value.correctIndex !== 'number' || !Number.isInteger(value.correctIndex) || value.correctIndex < 0 || value.correctIndex >= options.length) throw new Error(`${label} has an invalid correctIndex.`);
    return { type: value.type as LanguageQuestionType, question: text(value.question, label), text: text(value.text, `${label} target-language text`),
      transliteration: value.transliteration === undefined ? undefined : text(value.transliteration, `${label} transliteration`),
      options, correctIndex: value.correctIndex, explanation: text(value.explanation, `${label} explanation`) };
  });
  return { schema: 'language-quiz/v1', id: preserveIdentity ? text(parsed.id, 'ID') : `language-${crypto.randomUUID()}`,
    title: text(parsed.title, 'Quiz name'), targetLanguage, instructionLanguage,
    variety: typeof parsed.variety === 'string' ? parsed.variety.trim() : '', level: parsed.level as LanguageQuiz['level'], questions,
    createdAt: preserveIdentity ? text(parsed.createdAt, 'Creation date') : new Date().toISOString(), reviewed: false };
}

export function generateLanguagePrompt(config: LanguagePromptConfig): string {
  const title = text(config.title, 'Quiz name');
  const topic = text(config.topic, 'Topic');
  if (!Number.isInteger(config.questionCount) || config.questionCount < 1 || config.questionCount > 100) throw new Error('Choose 1–100 whole questions.');
  const types = config.focus === 'mixed' ? Object.keys(questionTypes) : [config.focus];
  return `# Language quiz research prompt — ${title}

Create a language-learning quiz with exactly ${config.questionCount} questions.
Quiz title: ${JSON.stringify(title)} (preserve exactly).
Target language: ${languageName(config.targetLanguage)} (${config.targetLanguage}).
Instruction and explanation language: ${languageName(config.instructionLanguage)} (${config.instructionLanguage}).
Language variety: ${config.variety.trim() || 'Use a consistent standard variety and name it in variety; Arabic: Modern Standard Arabic; Norwegian: Bokmål; Portuguese: European Portuguese; English: British English unless specified.'}
CEFR target: ${config.level}. Use this as an approximate teaching level, not an official certification.
Topic: ${topic}
Question types: ${types.join(', ')}. ${config.focus === 'mixed' ? 'Include a balanced mix of all four types.' : ''}
Exactly ${config.answerChoiceCount} distinct options per question. correctIndex is zero-based.

## Teaching and quality requirements
- Each item must have exactly one defensible answer. Check meaning, spelling, inflection, register and natural usage; replace ambiguous items.
- question is the task instruction in ${languageName(config.instructionLanguage)}. text is the word, phrase or sentence being tested in ${languageName(config.targetLanguage)}, using its native script. For grammar items use ___ for the missing form.
- vocabulary_mcq and translation_mcq ask for meaning in the instruction language; grammar_mcq options are target-language forms; phrase_mcq tests the appropriate phrase or response for an explicit situation.
- Explanations must teach why the answer is right in the instruction language and explain any necessary context. Do not invent etymologies or universal grammar rules.
- Preserve diacritics, punctuation and native scripts. Arabic and Hebrew must use logical Unicode order, never reversed strings. State relevant dialect or register distinctions explicitly.
- ${config.transliteration ? 'Include transliteration for non-Latin-script target text using one consistent, named convention in the explanation when needed. It must not disclose the answer.' : 'Omit transliteration; use native script only.'}
- Keep prompts and choices concise for quiz playback. Balance correct answer positions and avoid duplicate questions, answer clues and trick questions.
- The output is an unreviewed draft for human language review. Do not claim it is certified or reviewed.
Additional instructions: ${config.instructions.trim() || 'None.'}

## Output
Return ONLY valid JSON, without Markdown or commentary. Use schema language-quiz/v1.
Use this structure, replacing placeholders with real content; include exactly ${config.questionCount} questions:
${JSON.stringify({ schema: 'language-quiz/v1', title, targetLanguage: config.targetLanguage, instructionLanguage: config.instructionLanguage,
    variety: config.variety.trim() || 'Name the standard variety used', level: config.level,
    questions: [{ type: types[0], question: 'Task instruction', text: 'Target-language text', ...(config.transliteration ? { transliteration: 'Only when appropriate for the target script' } : {}),
      options: Array.from({ length: config.answerChoiceCount }, (_, i) => `Option ${i + 1}`), correctIndex: 0, explanation: 'Short teaching explanation' }] }, null, 2)}
`;
}

const storageKey = 'language-quiz-library-v1';
export function loadLanguageLibrary(): LanguageQuiz[] {
  const stored: unknown = JSON.parse(localStorage.getItem(storageKey) || '[]');
  if (!Array.isArray(stored)) throw new Error('Language library data could not be read.');
  return stored.flatMap(item => { try { return [parseLanguageQuiz(JSON.stringify(item), true)]; } catch { return []; } });
}
export function saveLanguageQuiz(quiz: LanguageQuiz): LanguageQuiz[] {
  const checked = parseLanguageQuiz(JSON.stringify(quiz), true);
  const updated = [checked, ...loadLanguageLibrary().filter(item => item.id !== checked.id)];
  localStorage.setItem(storageKey, JSON.stringify(updated));
  return updated;
}
export const languageDemo: LanguageQuiz = {
  schema: 'language-quiz/v1', id: 'language-demo-japanese', title: 'Japanese first words', targetLanguage: 'ja', instructionLanguage: 'en',
  variety: 'Standard Japanese', level: 'A1', createdAt: '2026-09-18T00:00:00.000Z', reviewed: false,
  questions: [
    { type: 'vocabulary_mcq', question: 'What does this word mean?', text: '猫', transliteration: 'neko', options: ['Cat', 'Dog', 'Bird'], correctIndex: 0, explanation: '猫 (neko) means cat.' },
    { type: 'translation_mcq', question: 'Choose the meaning of this greeting.', text: 'おはようございます', transliteration: 'ohayō gozaimasu', options: ['Good night', 'Good morning', 'Thank you'], correctIndex: 1, explanation: 'おはようございます is a polite morning greeting.' },
    { type: 'grammar_mcq', question: 'Complete the polite sentence meaning “This is a book.”', text: 'これは本___。', options: ['を', 'に', 'です'], correctIndex: 2, explanation: 'です completes the polite statement これは本です: “This is a book.”' },
  ],
};
