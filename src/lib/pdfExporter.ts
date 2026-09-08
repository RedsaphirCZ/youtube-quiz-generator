import { jsPDF } from 'jspdf';
import { QuizDataset, Question } from '../types';

export interface PDFExportOptions {
  pageSize?: [number, number];
}

export const TRIM_W = 63.5; // mm (Poker cut width: 2.5 in)
export const TRIM_H = 88.9; // mm (Poker cut height: 3.5 in)
export const BLEED = 3.0;   // mm (3mm bleed on all sides)

export const PAGE_W = TRIM_W + 2 * BLEED; // 69.5 mm
export const PAGE_H = TRIM_H + 2 * BLEED; // 94.9 mm

// Safe margins inside cut line
const SAFE_X = BLEED + 1.5; // 4.5 mm from page edge
const SAFE_W = TRIM_W - 3.0; // 60.5 mm usable width

interface TextFitResult {
  fontSize: number;
  lines: string[];
  totalHeight: number;
  lineHeight: number;
}

/**
 * Robust Font Autoscaling Engine:
 * Finds the largest font size (between minFontSize and maxFontSize in 0.5pt steps)
 * where the wrapped text fits within maxWidth and maxHeight.
 */
export function fitTextToBox(
  doc: jsPDF,
  text: string,
  maxWidth: number,
  maxHeight: number,
  options: {
    minFontSize?: number;
    maxFontSize?: number;
    fontStyle?: 'bold' | 'normal' | 'italic';
    lineHeightFactor?: number;
    allowMultiLine?: boolean;
  } = {}
): TextFitResult {
  const {
    minFontSize = 6,
    maxFontSize = 16,
    fontStyle = 'bold',
    lineHeightFactor = 0.38,
    allowMultiLine = true,
  } = options;

  doc.setFont('helvetica', fontStyle);

  for (let size = maxFontSize; size >= minFontSize; size -= 0.5) {
    doc.setFontSize(size);
    const lineH = size * lineHeightFactor;

    if (!allowMultiLine) {
      const textW = doc.getTextWidth(text);
      if (textW <= maxWidth && lineH <= maxHeight) {
        return {
          fontSize: size,
          lines: [text],
          totalHeight: lineH,
          lineHeight: lineH,
        };
      }
    } else {
      const lines = doc.splitTextToSize(text, maxWidth);
      const totalH = lines.length * lineH;

      if (totalH <= maxHeight) {
        return {
          fontSize: size,
          lines,
          totalHeight: totalH,
          lineHeight: lineH,
        };
      }
    }
  }

  // Fallback to minFontSize
  doc.setFontSize(minFontSize);
  const fallbackLines = allowMultiLine ? doc.splitTextToSize(text, maxWidth) : [text];
  const fallbackLineH = minFontSize * lineHeightFactor;
  return {
    fontSize: minFontSize,
    lines: fallbackLines,
    totalHeight: fallbackLines.length * fallbackLineH,
    lineHeight: fallbackLineH,
  };
}

/**
 * Draws a single sharp-cornered Front card face on a 69.5 x 94.9 mm page with 3mm bleed.
 * Uses font autoscaling for optimal readability on camera.
 */
export function drawFrontCard(
  doc: jsPDF,
  q: Question,
  qIndex: number,
  packName: string
) {
  const partNum = Math.floor(qIndex / 20) + 1;
  const partQNum = (qIndex % 20) + 1;

  // 1. Full-bleed background. The PDF page itself includes the 3 mm bleed.
  // Do not draw a trim rectangle here: it would become a visible border on the card.
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, PAGE_W, PAGE_H, 'F');

  // 2. Top Header Banner (bleeds to the top, left, and right page edges)
  const headerH = BLEED + 11.5; // 14.5 mm total height from page top
  doc.setFillColor(139, 30, 30); // #8B1E1E
  doc.rect(0, 0, PAGE_W, headerH, 'F');

  // Line 1: Pack Title (Autoscaled)
  const packFit = fitTextToBox(doc, packName.toUpperCase(), SAFE_W - 2, 4.5, {
    minFontSize: 5.5,
    maxFontSize: 8.0,
    fontStyle: 'bold',
    allowMultiLine: false,
  });
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(packFit.fontSize);
  doc.text(packFit.lines[0], PAGE_W / 2, BLEED + 3.8, { align: 'center' });

  // Line 2: Part & Question # (x/20)
  doc.setTextColor(255, 224, 130); // Warm Gold (#FFE082)
  doc.setFontSize(8.5);
  doc.text(`PART ${partNum}  •  QUESTION ${partQNum}`, PAGE_W / 2, BLEED + 8.5, { align: 'center' });

  // 3. Question Text Box (Autoscaled to maximize surface area)
  const questionBoxY = headerH + 1.5; // ~16.0 mm
  const questionBoxH = 28.0;
  doc.setFillColor(250, 248, 245);
  doc.setDrawColor(208, 198, 184);
  doc.setLineWidth(0.3);
  doc.rect(SAFE_X, questionBoxY, SAFE_W, questionBoxH, 'FD');

  const qFit = fitTextToBox(doc, q.question, SAFE_W - 5.0, questionBoxH - 3.5, {
    minFontSize: 8.0,
    maxFontSize: 24.0,
    fontStyle: 'bold',
    lineHeightFactor: 0.40,
  });

  doc.setTextColor(15, 15, 15);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(qFit.fontSize);
  const qStartY = questionBoxY + (questionBoxH - qFit.totalHeight) / 2 + qFit.lineHeight * 0.75;
  doc.text(qFit.lines, SAFE_X + 2.5, qStartY, { lineHeightFactor: qFit.lineHeight / (qFit.fontSize * 25.4 / 72) });

  // 4. Content Area (MCQ Options or Numerical Estimate)
  if (q.type === 'mcq') {
    const optStartY = questionBoxY + questionBoxH + 1.5; // ~45.5 mm
    const optH = (PAGE_H - SAFE_X - optStartY - (q.options.length - 1) * 1.2) / q.options.length;
    const optGap = 1.2;
    const optLetters = ['A', 'B', 'C'];

    // Pre-calculate optimal font size across all available options for visual harmony
    const optFits = q.options.map(opt => 
      fitTextToBox(doc, opt, SAFE_W - 13.0, optH - 2.0, {
        minFontSize: 7.5,
        maxFontSize: 21.0,
        fontStyle: 'bold',
        lineHeightFactor: 0.40,
      })
    );
    const harmonicOptFontSize = Math.min(...optFits.map(f => f.fontSize));

    for (let o = 0; o < q.options.length; o++) {
      const optY = optStartY + o * (optH + optGap);
      const optText = q.options[o] || '';

      // Option Box
      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(176, 166, 152);
      doc.setLineWidth(0.4);
      doc.rect(SAFE_X, optY, SAFE_W, optH, 'FD');

      // Letter Badge
      doc.setTextColor(139, 30, 30);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11.5);
      doc.text(`${optLetters[o]}:`, SAFE_X + 2.8, optY + optH / 2 + 1.3);

      // Option Text with harmonic font size
      doc.setTextColor(20, 20, 20);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(harmonicOptFontSize);

      const wrappedOpt = doc.splitTextToSize(optText, SAFE_W - 13.0);
      const optLineH = harmonicOptFontSize * 0.40;
      const totalOptH = wrappedOpt.length * optLineH;
      const optTextStartY = optY + (optH - totalOptH) / 2 + optLineH * 0.75;
      doc.text(wrappedOpt, SAFE_X + 10.0, optTextStartY, { lineHeightFactor: 0.40 * 72 / 25.4 });
    }
  } else {
    // Number Estimate Content (Autoscaled)
    const estY = questionBoxY + questionBoxH + 1.5;
    const estH = 43.0;

    doc.setFillColor(238, 246, 252);
    doc.setDrawColor(24, 90, 157);
    doc.setLineWidth(0.5);
    doc.rect(SAFE_X, estY, SAFE_W, estH, 'FD');

    doc.setTextColor(13, 71, 161);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text('NUMERICAL ESTIMATE', PAGE_W / 2, estY + 12.5, { align: 'center' });

    doc.setTextColor(21, 101, 192);
    doc.setFontSize(9.5);
    doc.text('REQUIRED UNIT:', PAGE_W / 2, estY + 23.5, { align: 'center' });

    const unitText = (q.metricUnit || 'UNITS').toUpperCase();
    const unitFit = fitTextToBox(doc, unitText, SAFE_W - 8, 12, {
      minFontSize: 9.0,
      maxFontSize: 16.0,
      fontStyle: 'bold',
      allowMultiLine: false,
    });

    doc.setTextColor(13, 71, 161);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(unitFit.fontSize);
    doc.text(unitText, PAGE_W / 2, estY + 34.5, { align: 'center' });
  }
}

/**
 * Draws a single sharp-cornered Back card face (Answer Reveal) on a 69.5 x 94.9 mm page with 3mm bleed.
 * Uses font autoscaling for clean typography.
 */
export function drawBackCard(
  doc: jsPDF,
  q: Question,
  qIndex: number,
  packName: string
) {
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, PAGE_W, PAGE_H, 'F');
  doc.setFillColor(27, 94, 32);
  doc.rect(0, 0, PAGE_W, 14.5, 'F');
  const title = fitTextToBox(doc, packName.toUpperCase(), SAFE_W, 4, { minFontSize: 4, maxFontSize: 8, allowMultiLine: false });
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(title.fontSize);
  doc.text(title.lines, PAGE_W / 2, 7, { align: 'center' });
  doc.setFontSize(8.5);
  doc.text(`PART ${Math.floor(qIndex / 20) + 1}  /  QUESTION ${(qIndex % 20) + 1}  /  ANSWER`, PAGE_W / 2, 11.5, { align: 'center' });

  const drawText = (text: string, y: number, h: number, max: number, style: 'bold' | 'normal' = 'bold') => {
    const fit = fitTextToBox(doc, text, SAFE_W - 5, h, {
      minFontSize: 6, maxFontSize: max, fontStyle: style, lineHeightFactor: 0.40,
    });
    if (fit.totalHeight > h) throw new Error(`Question ${qIndex + 1}: text is too long for a readable card. Shorten it before exporting.`);
    doc.setFont('helvetica', style);
    doc.setFontSize(fit.fontSize);
    doc.text(fit.lines, SAFE_X + 2.5, y + (h - fit.totalHeight) / 2 + fit.lineHeight * 0.75,
      { lineHeightFactor: 0.40 * 72 / 25.4 });
  };
  doc.setTextColor(45, 45, 45);
  drawText(q.question, 17, 18, 16);
  if (q.type === 'mcq') {
    const optionHeight = (27 - (q.options.length - 1)) / q.options.length;
    const labels = q.options.map((option, index) => `${['A', 'B', 'C'][index]}: ${option}`);
    const fontSize = Math.min(...labels.map(label => fitTextToBox(doc, label, SAFE_W - 5, optionHeight - 2, {
      minFontSize: 6, maxFontSize: 14, lineHeightFactor: 0.40,
    }).fontSize));
    labels.forEach((label, index) => {
      const correct = index === q.correctIndex;
      const y = 37 + index * (optionHeight + 1);
      doc.setFillColor(...(correct ? [232, 245, 233] : [247, 246, 243]) as [number, number, number]);
      doc.roundedRect(SAFE_X, y, SAFE_W, optionHeight, 1, 1, 'F');
      if (correct) {
        doc.setFillColor(27, 94, 32);
        doc.rect(SAFE_X, y, 0.8, optionHeight, 'F');
      }
      doc.setTextColor(...(correct ? [27, 94, 32] : [55, 55, 55]) as [number, number, number]);
      drawText(label, y + 1, optionHeight - 2, fontSize);
    });
  } else {
    doc.setFillColor(232, 245, 233);
    doc.roundedRect(SAFE_X, 38, SAFE_W, 23, 2, 2, 'F');
    doc.setTextColor(27, 94, 32);
    const answer = `${q.target.toLocaleString('en-US')} ${q.metricUnit || ''}${q.imperialDisplay ? ` (${q.imperialDisplay})` : ''}`;
    drawText(answer, 40, 19, 26);
  }
  doc.setTextColor(100, 90, 75);
  doc.setFontSize(7);
  doc.text('THE STORY BEHIND THE ANSWER', SAFE_X + 2.5, 67);
  doc.setTextColor(30, 30, 30);
  drawText(q.explanation || 'Explanation not provided; review before publication.', 70, PAGE_H - SAFE_X - 70, 15, 'normal');
}

/**
 * Generates a 120-page Poker card PDF (69.5 x 94.9 mm per page with 3mm bleed)
 * sequenced in alternating Front - Back - Front - Back order
 * (Page 1: Q1 Front, Page 2: Q1 Back, Page 3: Q2 Front, Page 4: Q2 Back...)
 * ready for direct imposition in Montax Imposer.
 */
export function generateQuizPDF(quiz: QuizDataset): jsPDF {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: [PAGE_W, PAGE_H], // 69.5 x 94.9 mm (63.5 x 88.9 mm + 3mm bleed)
  });

  const questions = quiz.questions || [];
  const packName = quiz.theme || quiz.title || 'Quiz Pack';

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];

    // Page 2*i + 1: FRONT Card Face
    if (i > 0) {
      doc.addPage([PAGE_W, PAGE_H], 'portrait');
    }
    drawFrontCard(doc, q, i, packName);

    // Page 2*i + 2: BACK Card Face (Answer)
    doc.addPage([PAGE_W, PAGE_H], 'portrait');
    drawBackCard(doc, q, i, packName);
  }

  return doc;
}

/**
 * Downloads the generated 120-page Front-Back PDF directly in browser.
 */
export function downloadQuizPDF(quiz: QuizDataset, customFilename?: string) {
  const doc = generateQuizPDF(quiz);
  const themeSlug = (quiz.theme || quiz.title || 'quiz')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  const filename = customFilename || `${themeSlug}-cards-${quiz.questions.length * 2}pages-front-back.pdf`;
  doc.save(filename);
}

/**
 * Returns PDF Data URI string for iframe preview in browser.
 */
export function getQuizPDFDataUri(quiz: QuizDataset): string {
  const doc = generateQuizPDF(quiz);
  return doc.output('datauristring');
}

/**
 * Returns raw PDF ArrayBuffer for saving in Node.js scripts.
 */
export function getQuizPDFBuffer(quiz: QuizDataset): Buffer {
  const doc = generateQuizPDF(quiz);
  const arrayBuffer = doc.output('arraybuffer');
  return Buffer.from(arrayBuffer);
}

/** One face using exactly the same drawing functions as the full download. */
export function generateCardPreviewPDF(quiz: QuizDataset, index: number, side: 'front' | 'back'): jsPDF {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: [PAGE_W, PAGE_H] });
  const question = quiz.questions[index];
  if (!question) throw new Error('No card available to preview.');
  (side === 'front' ? drawFrontCard : drawBackCard)(doc, question, index, quiz.theme || quiz.title || 'Quiz Pack');
  return doc;
}
