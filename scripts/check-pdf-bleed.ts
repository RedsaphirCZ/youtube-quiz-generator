import fs from 'fs';
import path from 'path';
import { jsPDF } from 'jspdf';
import { curatedQuizzes } from '../src/data/curatedQuizzes';
import {
  BLEED,
  PAGE_H,
  PAGE_W,
  TRIM_H,
  TRIM_W,
  drawBackCard,
  drawFrontCard,
  getQuizPDFBuffer,
} from '../src/lib/pdfExporter';

type RectCall = {
  x: number;
  y: number;
  width: number;
  height: number;
  style?: string;
};

function approximatelyEqual(left: number, right: number): boolean {
  return Math.abs(left - right) < 0.001;
}

function capturesExpectedBleedGeometry(side: 'front' | 'back'): void {
  const quiz = curatedQuizzes[0];
  const question = quiz.questions[0];
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: [PAGE_W, PAGE_H] });
  const rectCalls: RectCall[] = [];
  const originalRect = doc.rect.bind(doc);

  doc.rect = ((x: number, y: number, width: number, height: number, style?: string) => {
    rectCalls.push({ x, y, width, height, style });
    return originalRect(x, y, width, height, style);
  }) as typeof doc.rect;

  if (side === 'front') {
    drawFrontCard(doc, question, 0, quiz.theme || quiz.title);
  } else {
    drawBackCard(doc, question, 0, quiz.theme || quiz.title);
  }

  const hasFullBleedBackground = rectCalls.some((call) =>
    approximatelyEqual(call.x, 0) &&
    approximatelyEqual(call.y, 0) &&
    approximatelyEqual(call.width, PAGE_W) &&
    approximatelyEqual(call.height, PAGE_H) &&
    call.style === 'F'
  );

  const hasPrintedTrimBorder = rectCalls.some((call) =>
    approximatelyEqual(call.x, BLEED) &&
    approximatelyEqual(call.y, BLEED) &&
    approximatelyEqual(call.width, TRIM_W) &&
    approximatelyEqual(call.height, TRIM_H) &&
    call.style === 'S'
  );

  if (!hasFullBleedBackground) {
    throw new Error(`${side} card does not paint the full bleed page.`);
  }
  if (hasPrintedTrimBorder) {
    throw new Error(`${side} card still contains a printed trim-border rectangle.`);
  }
}

capturesExpectedBleedGeometry('front');
capturesExpectedBleedGeometry('back');

const sourceQuiz = curatedQuizzes[0];
const sampleQuiz = { ...sourceQuiz, questions: sourceQuiz.questions.slice(0, 1) };
const outputDirectory = path.resolve('output', 'pdf');
const outputPath = path.join(outputDirectory, 'bleed-proof-front-back-sample.pdf');
fs.mkdirSync(outputDirectory, { recursive: true });
const pdfBuffer = getQuizPDFBuffer(sampleQuiz);
fs.writeFileSync(outputPath, pdfBuffer);

const pdfSource = pdfBuffer.toString('latin1');
const pageDictionaries = [...pdfSource.matchAll(/<</g)].map((match) => pdfSource.slice(match.index, pdfSource.indexOf('>>', match.index) + 2));
const pageBoxes = pageDictionaries.filter((dictionary) => dictionary.includes('/Type /Page') && !dictionary.includes('/Type /Pages'));
if (pageBoxes.length !== 2) {
  throw new Error(`Expected 2 card pages in the proof PDF, found ${pageBoxes.length}.`);
}

const pointsPerMillimetre = 72 / 25.4;
const expectedTrim = [BLEED, BLEED, BLEED + TRIM_W, BLEED + TRIM_H].map((value) => value * pointsPerMillimetre);
const expectedBleed = [0, 0, PAGE_W, PAGE_H].map((value) => value * pointsPerMillimetre);

const parseBox = (dictionary: string, name: 'TrimBox' | 'BleedBox'): number[] => {
  const match = dictionary.match(new RegExp(`/${name} \\[([^\\]]+)\\]`));
  if (!match) throw new Error(`PDF page is missing /${name}.`);
  return match[1].trim().split(/\s+/).map(Number);
};

const assertBox = (actual: number[], expected: number[], name: string): void => {
  if (actual.length !== 4 || actual.some((value, index) => Math.abs(value - expected[index]) > 0.01)) {
    throw new Error(`${name} is incorrect: [${actual.join(', ')}].`);
  }
};

pageBoxes.forEach((dictionary, index) => {
  assertBox(parseBox(dictionary, 'TrimBox'), expectedTrim, `Page ${index + 1} TrimBox`);
  assertBox(parseBox(dictionary, 'BleedBox'), expectedBleed, `Page ${index + 1} BleedBox`);
});

console.log(`PASS: ${TRIM_W} x ${TRIM_H} mm TrimBox plus ${BLEED} mm bleed on every side, full-page artwork, and no printed trim border.`);
console.log(`Sample: ${outputPath}`);
