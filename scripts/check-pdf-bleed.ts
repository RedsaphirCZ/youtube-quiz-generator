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
fs.writeFileSync(outputPath, getQuizPDFBuffer(sampleQuiz));

console.log(`PASS: full ${PAGE_W} x ${PAGE_H} mm artwork with ${BLEED} mm bleed and no printed trim border.`);
console.log(`Sample: ${outputPath}`);
