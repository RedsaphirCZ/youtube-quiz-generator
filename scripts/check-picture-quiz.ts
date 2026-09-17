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

const commonImageShapes = [
  { image: 'images/logo.png' },
  { image: { url: '//cdn.example.com/logo.png' } },
  { image: { image_url: 'https://example.com/logo.png' } },
  { imageSrc: './images/logo.png' },
];
for (const imageFields of commonImageShapes) {
  const variant = parsePictureQuizResponse(JSON.stringify({
    title: 'Alias test',
    questions: [{
      type: 'picture_mcq', question: 'Which logo is this?', ...imageFields,
      imageAlt: 'A logo without visible words', options: ['Alpha', 'Beta'],
      correctIndex: 0, explanation: 'This mark belongs to Alpha.',
    }],
  }));
  assert.ok(variant.questions[0].image.src);
}

const markdownImage = parsePictureQuizResponse(JSON.stringify({
  title: 'Markdown image',
  questions: [{
    type: 'picture_mcq', question: 'Which place is this?',
    image: '![A mountain](https://example.com/mountain.jpg)', imageAlt: 'A mountain',
    options: ['Alps', 'Andes'], correctIndex: 0, explanation: 'This view is in the Alps.',
  }],
}));
assert.equal(markdownImage.questions[0].image.src, 'https://example.com/mountain.jpg');

const commonsFilePage = parsePictureQuizResponse(JSON.stringify({
  title: 'Commons image',
  questions: [{
    type: 'picture_mcq', question: 'Which image is shown?',
    image: {
      url: 'https://commons.wikimedia.org/wiki/File:Example.jpg',
      alt: 'A sample photograph',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Example.jpg',
    },
    options: ['Example', 'Other'], correctIndex: 0, explanation: 'This is the example image.',
  }],
}));
assert.equal(commonsFilePage.questions[0].image.src, 'https://commons.wikimedia.org/wiki/Special:FilePath/Example.jpg');
assert.equal(commonsFilePage.questions[0].image.sourceUrl, 'https://commons.wikimedia.org/wiki/File:Example.jpg');

const commonsSourceOnly = parsePictureQuizResponse(JSON.stringify({
  title: 'Commons source-only image',
  questions: [{
    type: 'picture_mcq', question: 'Which image is shown?',
    image: {
      alt: 'A sample photograph',
      source_url: 'https://commons.wikimedia.org/wiki/File:Example.jpg',
    },
    options: ['Example', 'Other'], correctIndex: 0, explanation: 'This is the example image.',
  }],
}));
assert.equal(commonsSourceOnly.questions[0].image.src, 'https://commons.wikimedia.org/wiki/Special:FilePath/Example.jpg');

const suppliedEmojiCodes = [
  '1f480', '1f525', '1f914', '1f62d', '1f4af', '1f64f', '1f440', '1f97a', '1f4aa', '1f44c',
  '1f643', '1f92f', '1f60e', '1f644', '1f973', '1f923', '1f60c', '1f926', '1f937', '1f92b',
  '1f92e', '1f920', '1f974', '1f975', '1f976', '1f917', '1f929', '1f621', '1f910', '1f631',
  '1f494', '1f389', '1f4a9', '1f47b', '1f624', '1f634', '1f609', '1f618', '1f911', '1f928',
];
const suppliedEmojiPack = parsePictureQuizResponse(JSON.stringify({
  schema: 'picture-quiz/v1', title: 'Emojis', category: 'custom',
  questions: suppliedEmojiCodes.map((code, index) => ({
    type: 'picture_mcq', question: `Emoji question ${index + 1}`,
    image: {
      src: `https://commons.wikimedia.org/wiki/Special:FilePath/Twemoji_${code}.svg`,
      alt: `Emoji ${code}`,
      credit: 'Twitter, CC BY 4.0',
      sourceUrl: `https://commons.wikimedia.org/wiki/File:Twemoji_${code}.svg`,
    },
    options: ['Meaning A', 'Meaning B'], correctIndex: index % 2,
    explanation: `Explanation ${index + 1}.`,
  })),
}));
assert.equal(suppliedEmojiPack.questions.length, 40);
assert.ok(suppliedEmojiPack.questions.every((question, index) =>
  question.image.src === `https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/${suppliedEmojiCodes[index]}.svg`
));

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

assert.throws(() => parsePictureQuizResponse(JSON.stringify({
  title: 'Unsafe image',
  questions: [{ type: 'picture_mcq', question: 'Unsafe?', image: 'javascript:alert(1)', imageAlt: 'Unsafe', options: ['A', 'B'], correctIndex: 0, explanation: 'Unsafe.' }],
})), /unsupported image source/);

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
