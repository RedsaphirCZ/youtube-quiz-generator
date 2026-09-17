import assert from 'node:assert/strict';
import { generatePictureQuizPrompt, parsePictureQuizResponse, pictureQuizDemo } from '../src/picture-quiz/pictureQuiz';

const imported = parsePictureQuizResponse(JSON.stringify({
  schema: 'picture-quiz/v1',
  title: 'Brand Shapes',
  category: 'brands',
  questions: [
    {
      type: 'picture_mcq',
      question: 'Which brand is shown?',
      image_url: 'https://example.com/logo.png',
      image_alt: 'A simple geometric logo',
      options: ['Alpha', 'Beta'],
      correctIndex: 1,
      explanation: 'The mark belongs to Beta.',
    },
  ],
}));

assert.equal(imported.schema, 'picture-quiz/v1');
assert.equal(imported.category, 'brands');
assert.equal(imported.questions[0].image.src, 'https://example.com/logo.png');
assert.equal(imported.questions[0].options.length, 2);

const localAsset = new Map([['shape.png', 'data:image/png;base64,AAAA']]);
const local = parsePictureQuizResponse(JSON.stringify({
  title: 'Country Shapes',
  category: 'country-shapes',
  questions: [{
    type: 'picture_mcq', question: 'Which country is this?',
    image: { src: 'images/shape.png', alt: 'An unlabeled country silhouette' },
    options: ['France', 'Spain', 'Italy'], correctIndex: 2, explanation: 'This is Italy.',
  }],
}), localAsset);
assert.equal(local.questions[0].image.src, 'data:image/png;base64,AAAA');

assert.throws(() => parsePictureQuizResponse(JSON.stringify({
  title: 'Bad pack',
  questions: [{ type: 'mcq', question: 'Wrong registry', imageUrl: 'https://example.com/a.png', imageAlt: 'Test', options: ['A', 'B'], correctIndex: 0, explanation: 'Test' }],
})), /unsupported picture type/);

const prompt = generatePictureQuizPrompt({
  title: 'Exact Visual Title', topic: 'Country silhouettes', category: 'country-shapes',
  questionCount: 12, answerChoiceCount: 3, difficulty: 'easy-medium', specialInstructions: '',
});
assert.match(prompt, /Exact Visual Title/);
assert.match(prompt, /country silhouettes or map outlines/i);
assert.match(prompt, /"type": "picture_mcq"/);
assert.equal(pictureQuizDemo.questions.length, 3);
assert.ok(pictureQuizDemo.questions.every((question) => question.image.src.startsWith('data:image/svg+xml')));

console.log('Picture quiz checks passed.');
