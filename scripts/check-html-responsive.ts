import fs from 'fs';
import path from 'path';

import { generateStandaloneQuizHTML, splitQuizIntoVideoParts } from '../src/lib/htmlExporter';
import { createQuizExportVariant } from '../src/lib/exportVariant';
import type { QuizDataset } from '../src/types';

const workspaceRoot = process.cwd();
const datasetPath = path.join(
  workspaceRoot,
  'quizzes',
  'dinosaurs-prehistoric-life-60',
  'dataset.json'
);
const outputDir = path.join(workspaceRoot, 'output', 'playwright');
const outputPath = path.join(outputDir, 'dinosaur-responsive-quiz.html');

const dataset = JSON.parse(fs.readFileSync(datasetPath, 'utf8')) as QuizDataset;
const html = generateStandaloneQuizHTML(dataset);
const studioHtml = generateStandaloneQuizHTML(dataset, {
  answerChoiceMode: 2,
  appearance: 'studio-dark',
});
const studioDataset = createQuizExportVariant(dataset, 2);

function requireMatch(description: string, pattern: RegExp) {
  if (!pattern.test(html)) {
    throw new Error(`Responsive HTML check failed: ${description}`);
  }
}

requireMatch('the question stage must have a fixed responsive height', /height:\s*clamp\(34rem,\s*64dvh,\s*47\.5rem\)/);
requireMatch('question overflow must stay inside the stable card', /scrollbar-gutter:\s*stable/);
requireMatch('type must adapt to both viewport width and height', /min\(3vw,\s*3\.6dvh\)/);
requireMatch('phone breakpoint is present', /@media \(max-width:\s*480px\)/);
requireMatch('mobile and tablet breakpoint is present', /@media \(max-width:\s*720px\)/);
requireMatch('tablet touch-target breakpoint is present', /@media \(max-width:\s*1024px\)/);
requireMatch('dynamic viewport sizing is present', /100dvh/);
requireMatch('safe-area padding is present', /env\(safe-area-inset-top\)/);

if (!/data-theme="studio-dark"/.test(studioHtml)) {
  throw new Error('Responsive HTML check failed: studio-black theme was not applied.');
}
if (!/body\[data-theme="studio-dark"\]/.test(studioHtml)) {
  throw new Error('Responsive HTML check failed: studio-black recording styles are missing.');
}
const nonTwoChoiceQuestion = studioDataset.questions.findIndex(
  (question) => question.type === 'mcq' && question.options.length !== 2
);
if (nonTwoChoiceQuestion >= 0) {
  throw new Error(`Responsive HTML check failed: exported MCQ ${nonTwoChoiceQuestion + 1} is not two-choice.`);
}

const twoParts = splitQuizIntoVideoParts(dataset, 2);
const threeParts = splitQuizIntoVideoParts(dataset, 3);
const fourParts = splitQuizIntoVideoParts(dataset, 4);
const wholeQuiz = splitQuizIntoVideoParts(dataset, 1);
assertPartSizes('whole quiz', wholeQuiz, [60]);
assertPartSizes('2 parts', twoParts, [30, 30]);
assertPartSizes('3 parts', threeParts, [20, 20, 20]);
assertPartSizes('4 parts', fourParts, [15, 15, 15, 15]);

const summaryIds = html.match(/id="summary-card"/g) ?? [];
if (summaryIds.length !== 1) {
  throw new Error(
    `Responsive HTML check failed: expected one summary card, found ${summaryIds.length}`
  );
}

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(outputPath, html, 'utf8');

console.log(
  `PASS: standalone HTML uses a fixed responsive question stage, selectable balanced splits, one summary card, and a two-choice studio-black recording variant.\nArtifact: ${outputPath}`
);

function assertPartSizes(description: string, parts: ReturnType<typeof splitQuizIntoVideoParts>, expected: number[]) {
  const actual = parts.map((part) => part.questionCount);
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`Responsive HTML check failed: ${description} produced ${actual.join(', ')} instead of ${expected.join(', ')}.`);
  }
}
