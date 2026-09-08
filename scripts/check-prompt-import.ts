import { strict as assert } from 'node:assert';

import { generateQuizCreationPrompt, generateQuizResearchPromptMarkdown, parseFlexibleQuizResponse, parseGeneratedQuizResponse, QuizPromptConfig } from '../src/lib/quizPrompt';
import { validateQuizDataset } from '../src/lib/validator';
import type { Question } from '../src/types';

const config: QuizPromptConfig = {
  theme: 'Ocean Life',
  cycles: 4,
  difficulty: 'moderate',
  answerChoiceCount: 2,
};

const questions: Question[] = [];
for (let cycle = 0; cycle < 4; cycle++) {
  for (let index = 0; index < 4; index++) {
    questions.push({
      type: 'mcq',
      question: `Which ocean fact is correct for cycle ${cycle + 1}, item ${index + 1}?`,
      options: [`Correct fact ${cycle}-${index}`, `Plausible distractor ${cycle}-${index}`],
      correctIndex: (index + cycle) % 2 as 0 | 1,
      explanation: 'This is a concise factual explanation.',
    });
  }
  questions.push({
    type: 'number',
    question: `What is the factual ocean estimate for cycle ${cycle + 1}?`,
    target: 100 + cycle,
    metricUnit: 'meters',
    explanation: 'This is a concise factual estimate explanation.',
  });
}

const prompt = generateQuizCreationPrompt(config);
assert.match(prompt, /Exactly 20 questions/);
assert.match(prompt, /exactly 2 distinct, plausible options/);
assert.match(prompt, /Return ONLY one valid JSON object/);

const response = `\`\`\`json\n${JSON.stringify({
  id: 'ocean-life',
  theme: config.theme,
  title: 'Ocean Life Quiz',
  description: 'A calm ocean quiz.',
  questions,
})}\n\`\`\``;

const imported = parseGeneratedQuizResponse(response, config);
const validation = validateQuizDataset(imported.questions, config.cycles);
assert.equal(imported.answerChoiceCount, 2);
assert.equal(imported.validated, false);
assert.equal(validation.isValid, true, validation.errors.join('; '));

const flexibleImport = parseFlexibleQuizResponse(`# Quiz response\n\n${response}\n\nReady to import.`);
assert.equal(flexibleImport.cycles, 4);
assert.equal(flexibleImport.answerChoiceCount, 2);
assert.equal(flexibleImport.quiz.questions.length, 20);
assert.equal(flexibleImport.quiz.validated, false);

const researchPrompt = generateQuizResearchPromptMarkdown({
  topic: 'Cozy Autumn Trivia',
  questionCount: 25,
  difficulty: 'easy-medium',
  answerChoiceCount: 3,
  includeNumberGuesses: false,
  numberGuessCount: 3,
  currentInformation: false,
  language: 'Simple natural English',
  specialInstructions: 'Keep the tone warm and calm.',
});
assert.match(researchPrompt, /Exact length: 25 questions/);
assert.match(researchPrompt, /Multiple-choice questions: Exactly 25/);
assert.match(researchPrompt, /Research the topic before constructing the quiz/);
assert.match(researchPrompt, /Return only one valid JSON object/);

const twentyFiveQuestions = [
  ...questions,
  ...Array.from({ length: 5 }, (_, index): Question => ({
    type: 'mcq',
    question: `Which extra autumn fact is correct ${index + 1}?`,
    options: [`Correct extra ${index}`, `Distractor extra ${index}`],
    correctIndex: index % 2 as 0 | 1,
    explanation: 'This is a concise factual explanation.',
  })),
];
const flexibleTwentyFive = parseFlexibleQuizResponse(JSON.stringify({ title: 'Autumn Quiz', questions: twentyFiveQuestions }));
assert.equal(flexibleTwentyFive.cycles, undefined);
const flexibleValidation = validateQuizDataset(flexibleTwentyFive.quiz.questions, { questionCount: 25, flexible: true });
assert.equal(flexibleValidation.isValid, true, flexibleValidation.errors.join('; '));

const twentyAllMcq = Array.from({ length: 20 }, (_, index): Question => ({
  type: 'mcq',
  question: `Which all-MCQ fact is correct ${index + 1}?`,
  options: [`Correct ${index}`, `Distractor ${index}`],
  correctIndex: index % 2 as 0 | 1,
  explanation: 'This is a concise factual explanation.',
}));
const flexibleTwenty = parseFlexibleQuizResponse(JSON.stringify({ title: 'All MCQ Quiz', questions: twentyAllMcq }));
assert.equal(flexibleTwenty.cycles, undefined);
assert.equal(validateQuizDataset(flexibleTwenty.quiz.questions, { questionCount: 20, flexible: true }).isValid, true);

const wrongChoices = JSON.stringify({
  title: 'Wrong choice count',
  questions: [{
    type: 'mcq',
    question: 'A question?',
    options: ['A', 'B', 'C'],
    correctIndex: 0,
    explanation: 'Explanation.',
  }],
});
assert.throws(() => parseGeneratedQuizResponse(wrongChoices, config), /exactly 2 answer choices/);

console.log('PASS: AI prompt generation and pasted JSON draft import contract.');
