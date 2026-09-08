import { QuizDataset } from '../types';

export const chatGptBrokenFixture: QuizDataset = {
  id: 'chatgpt-fixture-broken',
  theme: 'Synthetic validator test data (With Violations)',
  title: 'Quiz Factory Structural Test (Violations Demo)',
  description: 'ChatGPT synthetic fixture containing 3 intentional rule violations (brackets in options, MCQ arithmetic, number word problem).',
  difficulty: 'moderate',
  createdAt: '2026-08-17T00:00:00Z',
  questions: [
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 1?',
      options: [
        'Alpha choice',
        'Wrong option [extra]',
        'Gamma choice'
      ],
      correctIndex: 0,
      explanation: 'Synthetic MCQ fixture 1; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'What is 18 x 24?',
      options: [
        'Alpha choice',
        'Beta choice',
        'Gamma choice'
      ],
      correctIndex: 0,
      explanation: 'Synthetic MCQ fixture 2; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 3?',
      options: [
        'Alpha choice',
        'Beta choice',
        'Gamma choice'
      ],
      correctIndex: 0,
      explanation: 'Synthetic MCQ fixture 3; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 4?',
      options: [
        'Alpha choice',
        'Beta choice',
        'Gamma choice'
      ],
      correctIndex: 0,
      explanation: 'Synthetic MCQ fixture 4; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 5?',
      options: [
        'Alpha choice',
        'Beta choice',
        'Gamma choice'
      ],
      correctIndex: 0,
      explanation: 'Synthetic MCQ fixture 5; this is not real quiz content.'
    },
    {
      type: 'number',
      question: 'If 10 people each carry 2 boxes, how many boxes are there?',
      target: 101,
      metricUnit: 'units',
      imperialDisplay: '',
      explanation: 'Synthetic number fixture 1; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 6?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 0,
      explanation: 'Synthetic MCQ fixture 6; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 7?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 0,
      explanation: 'Synthetic MCQ fixture 7; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 8?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 0,
      explanation: 'Synthetic MCQ fixture 8; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 9?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 0,
      explanation: 'Synthetic MCQ fixture 9; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 10?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 0,
      explanation: 'Synthetic MCQ fixture 10; this is not real quiz content.'
    },
    {
      type: 'number',
      question: 'Synthetic number item 2?',
      target: 102,
      metricUnit: 'units',
      imperialDisplay: '',
      explanation: 'Synthetic number fixture 2; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 11?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 0,
      explanation: 'Synthetic MCQ fixture 11; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 12?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 0,
      explanation: 'Synthetic MCQ fixture 12; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 13?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 0,
      explanation: 'Synthetic MCQ fixture 13; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 14?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 0,
      explanation: 'Synthetic MCQ fixture 14; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 15?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 0,
      explanation: 'Synthetic MCQ fixture 15; this is not real quiz content.'
    },
    {
      type: 'number',
      question: 'Synthetic number item 3?',
      target: 103,
      metricUnit: 'units',
      imperialDisplay: '',
      explanation: 'Synthetic number fixture 3; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 16?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 0,
      explanation: 'Synthetic MCQ fixture 16; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 17?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 0,
      explanation: 'Synthetic MCQ fixture 17; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 18?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 1,
      explanation: 'Synthetic MCQ fixture 18; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 19?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 1,
      explanation: 'Synthetic MCQ fixture 19; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 20?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 1,
      explanation: 'Synthetic MCQ fixture 20; this is not real quiz content.'
    },
    {
      type: 'number',
      question: 'Synthetic number item 4?',
      target: 104,
      metricUnit: 'units',
      imperialDisplay: '',
      explanation: 'Synthetic number fixture 4; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 21?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 1,
      explanation: 'Synthetic MCQ fixture 21; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 22?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 1,
      explanation: 'Synthetic MCQ fixture 22; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 23?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 1,
      explanation: 'Synthetic MCQ fixture 23; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 24?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 1,
      explanation: 'Synthetic MCQ fixture 24; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 25?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 1,
      explanation: 'Synthetic MCQ fixture 25; this is not real quiz content.'
    },
    {
      type: 'number',
      question: 'Synthetic number item 5?',
      target: 105,
      metricUnit: 'units',
      imperialDisplay: '',
      explanation: 'Synthetic number fixture 5; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 26?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 1,
      explanation: 'Synthetic MCQ fixture 26; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 27?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 1,
      explanation: 'Synthetic MCQ fixture 27; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 28?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 1,
      explanation: 'Synthetic MCQ fixture 28; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 29?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 1,
      explanation: 'Synthetic MCQ fixture 29; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 30?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 1,
      explanation: 'Synthetic MCQ fixture 30; this is not real quiz content.'
    },
    {
      type: 'number',
      question: 'Synthetic number item 6?',
      target: 106,
      metricUnit: 'units',
      imperialDisplay: '',
      explanation: 'Synthetic number fixture 6; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 31?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 1,
      explanation: 'Synthetic MCQ fixture 31; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 32?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 1,
      explanation: 'Synthetic MCQ fixture 32; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 33?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 1,
      explanation: 'Synthetic MCQ fixture 33; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 34?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 1,
      explanation: 'Synthetic MCQ fixture 34; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 35?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 2,
      explanation: 'Synthetic MCQ fixture 35; this is not real quiz content.'
    },
    {
      type: 'number',
      question: 'Synthetic number item 7?',
      target: 107,
      metricUnit: 'units',
      imperialDisplay: '',
      explanation: 'Synthetic number fixture 7; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 36?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 2,
      explanation: 'Synthetic MCQ fixture 36; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 37?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 2,
      explanation: 'Synthetic MCQ fixture 37; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 38?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 2,
      explanation: 'Synthetic MCQ fixture 38; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 39?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 2,
      explanation: 'Synthetic MCQ fixture 39; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 40?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 2,
      explanation: 'Synthetic MCQ fixture 40; this is not real quiz content.'
    },
    {
      type: 'number',
      question: 'Synthetic number item 8?',
      target: 108,
      metricUnit: 'units',
      imperialDisplay: '',
      explanation: 'Synthetic number fixture 8; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 41?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 2,
      explanation: 'Synthetic MCQ fixture 41; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 42?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 2,
      explanation: 'Synthetic MCQ fixture 42; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 43?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 2,
      explanation: 'Synthetic MCQ fixture 43; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 44?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 2,
      explanation: 'Synthetic MCQ fixture 44; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 45?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 2,
      explanation: 'Synthetic MCQ fixture 45; this is not real quiz content.'
    },
    {
      type: 'number',
      question: 'Synthetic number item 9?',
      target: 109,
      metricUnit: 'units',
      imperialDisplay: '',
      explanation: 'Synthetic number fixture 9; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 46?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 2,
      explanation: 'Synthetic MCQ fixture 46; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 47?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 2,
      explanation: 'Synthetic MCQ fixture 47; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 48?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 2,
      explanation: 'Synthetic MCQ fixture 48; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 49?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 2,
      explanation: 'Synthetic MCQ fixture 49; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 50?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 2,
      explanation: 'Synthetic MCQ fixture 50; this is not real quiz content.'
    },
    {
      type: 'number',
      question: 'Synthetic number item 10?',
      target: 110,
      metricUnit: 'units',
      imperialDisplay: '',
      explanation: 'Synthetic number fixture 10; this is not real quiz content.'
    }
  ]
};

export const chatGptRepairedFixture: QuizDataset = {
  id: 'chatgpt-fixture-repaired',
  theme: 'Synthetic validator test data (Repaired & Passed)',
  title: 'Quiz Factory Structural Test (Repaired)',
  description: 'ChatGPT synthetic fixture with all bracket, arithmetic, and word-problem violations corrected to pass 100% of the 15 specification rules.',
  difficulty: 'moderate',
  createdAt: '2026-08-17T00:00:00Z',
  questions: [
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 1?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 0,
      explanation: 'Synthetic MCQ fixture 1; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 2?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 0,
      explanation: 'Synthetic MCQ fixture 2; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 3?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 0,
      explanation: 'Synthetic MCQ fixture 3; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 4?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 0,
      explanation: 'Synthetic MCQ fixture 4; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 5?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 0,
      explanation: 'Synthetic MCQ fixture 5; this is not real quiz content.'
    },
    {
      type: 'number',
      question: 'Synthetic number item 1?',
      target: 101,
      metricUnit: 'units',
      imperialDisplay: '',
      explanation: 'Synthetic number fixture 1; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 6?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 0,
      explanation: 'Synthetic MCQ fixture 6; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 7?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 0,
      explanation: 'Synthetic MCQ fixture 7; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 8?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 0,
      explanation: 'Synthetic MCQ fixture 8; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 9?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 0,
      explanation: 'Synthetic MCQ fixture 9; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 10?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 0,
      explanation: 'Synthetic MCQ fixture 10; this is not real quiz content.'
    },
    {
      type: 'number',
      question: 'Synthetic number item 2?',
      target: 102,
      metricUnit: 'units',
      imperialDisplay: '',
      explanation: 'Synthetic number fixture 2; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 11?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 0,
      explanation: 'Synthetic MCQ fixture 11; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 12?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 0,
      explanation: 'Synthetic MCQ fixture 12; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 13?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 0,
      explanation: 'Synthetic MCQ fixture 13; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 14?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 0,
      explanation: 'Synthetic MCQ fixture 14; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 15?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 0,
      explanation: 'Synthetic MCQ fixture 15; this is not real quiz content.'
    },
    {
      type: 'number',
      question: 'Synthetic number item 3?',
      target: 103,
      metricUnit: 'units',
      imperialDisplay: '',
      explanation: 'Synthetic number fixture 3; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 16?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 0,
      explanation: 'Synthetic MCQ fixture 16; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 17?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 0,
      explanation: 'Synthetic MCQ fixture 17; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 18?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 1,
      explanation: 'Synthetic MCQ fixture 18; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 19?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 1,
      explanation: 'Synthetic MCQ fixture 19; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 20?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 1,
      explanation: 'Synthetic MCQ fixture 20; this is not real quiz content.'
    },
    {
      type: 'number',
      question: 'Synthetic number item 4?',
      target: 104,
      metricUnit: 'units',
      imperialDisplay: '',
      explanation: 'Synthetic number fixture 4; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 21?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 1,
      explanation: 'Synthetic MCQ fixture 21; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 22?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 1,
      explanation: 'Synthetic MCQ fixture 22; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 23?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 1,
      explanation: 'Synthetic MCQ fixture 23; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 24?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 1,
      explanation: 'Synthetic MCQ fixture 24; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 25?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 1,
      explanation: 'Synthetic MCQ fixture 25; this is not real quiz content.'
    },
    {
      type: 'number',
      question: 'Synthetic number item 5?',
      target: 105,
      metricUnit: 'units',
      imperialDisplay: '',
      explanation: 'Synthetic number fixture 5; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 26?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 1,
      explanation: 'Synthetic MCQ fixture 26; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 27?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 1,
      explanation: 'Synthetic MCQ fixture 27; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 28?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 1,
      explanation: 'Synthetic MCQ fixture 28; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 29?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 1,
      explanation: 'Synthetic MCQ fixture 29; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 30?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 1,
      explanation: 'Synthetic MCQ fixture 30; this is not real quiz content.'
    },
    {
      type: 'number',
      question: 'Synthetic number item 6?',
      target: 106,
      metricUnit: 'units',
      imperialDisplay: '',
      explanation: 'Synthetic number fixture 6; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 31?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 1,
      explanation: 'Synthetic MCQ fixture 31; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 32?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 1,
      explanation: 'Synthetic MCQ fixture 32; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 33?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 1,
      explanation: 'Synthetic MCQ fixture 33; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 34?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 1,
      explanation: 'Synthetic MCQ fixture 34; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 35?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 2,
      explanation: 'Synthetic MCQ fixture 35; this is not real quiz content.'
    },
    {
      type: 'number',
      question: 'Synthetic number item 7?',
      target: 107,
      metricUnit: 'units',
      imperialDisplay: '',
      explanation: 'Synthetic number fixture 7; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 36?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 2,
      explanation: 'Synthetic MCQ fixture 36; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 37?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 2,
      explanation: 'Synthetic MCQ fixture 37; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 38?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 2,
      explanation: 'Synthetic MCQ fixture 38; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 39?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 2,
      explanation: 'Synthetic MCQ fixture 39; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 40?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 2,
      explanation: 'Synthetic MCQ fixture 40; this is not real quiz content.'
    },
    {
      type: 'number',
      question: 'Synthetic number item 8?',
      target: 108,
      metricUnit: 'units',
      imperialDisplay: '',
      explanation: 'Synthetic number fixture 8; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 41?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 2,
      explanation: 'Synthetic MCQ fixture 41; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 42?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 2,
      explanation: 'Synthetic MCQ fixture 42; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 43?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 2,
      explanation: 'Synthetic MCQ fixture 43; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 44?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 2,
      explanation: 'Synthetic MCQ fixture 44; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 45?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 2,
      explanation: 'Synthetic MCQ fixture 45; this is not real quiz content.'
    },
    {
      type: 'number',
      question: 'Synthetic number item 9?',
      target: 109,
      metricUnit: 'units',
      imperialDisplay: '',
      explanation: 'Synthetic number fixture 9; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 46?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 2,
      explanation: 'Synthetic MCQ fixture 46; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 47?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 2,
      explanation: 'Synthetic MCQ fixture 47; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 48?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 2,
      explanation: 'Synthetic MCQ fixture 48; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 49?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 2,
      explanation: 'Synthetic MCQ fixture 49; this is not real quiz content.'
    },
    {
      type: 'mcq',
      question: 'Synthetic MCQ item 50?',
      options: ['Alpha choice', 'Beta choice', 'Gamma choice'],
      correctIndex: 2,
      explanation: 'Synthetic MCQ fixture 50; this is not real quiz content.'
    },
    {
      type: 'number',
      question: 'Synthetic number item 10?',
      target: 110,
      metricUnit: 'units',
      imperialDisplay: '',
      explanation: 'Synthetic number fixture 10; this is not real quiz content.'
    }
  ]
};
