import { jsPDF } from 'jspdf';
import { QuizDataset, Question } from '../types';

export type CardFormatId = 'poker' | 'tarot';

export interface CardFormat {
  id: CardFormatId;
  label: string;
  trimWidth: number;
  trimHeight: number;
  bleed: number;
}

export const CARD_FORMATS: Record<CardFormatId, CardFormat> = {
  poker: { id: 'poker', label: 'Poker', trimWidth: 63.5, trimHeight: 88.9, bleed: 3 },
  tarot: { id: 'tarot', label: 'Tarot', trimWidth: 70, trimHeight: 120, bleed: 3 },
};

// Backward-compatible Poker constants used by focused checks and card-data tools.
export const TRIM_W = CARD_FORMATS.poker.trimWidth;
export const TRIM_H = CARD_FORMATS.poker.trimHeight;
export const BLEED = CARD_FORMATS.poker.bleed;
export const PAGE_W = TRIM_W + 2 * BLEED;
export const PAGE_H = TRIM_H + 2 * BLEED;

export function getCardPageSize(format: CardFormat): [number, number] {
  return [format.trimWidth + 2 * format.bleed, format.trimHeight + 2 * format.bleed];
}

type PDFPageBox = {
  bottomLeftX: number;
  bottomLeftY: number;
  topRightX: number;
  topRightY: number;
};

/**
 * Declares the physical production boxes for the current PDF page.
 * jsPDF otherwise writes only a MediaBox, causing print software to treat the
 * bleed-sized page as the finished trim size.
 */
export function applyCardPageBoxes(doc: jsPDF, format: CardFormat = CARD_FORMATS.poker): void {
  const internal = doc.internal as typeof doc.internal & {
    getCurrentPageInfo: () => { pageContext: unknown };
  };
  const pointsPerMillimetre = internal.scaleFactor;
  const pageContext = internal.getCurrentPageInfo().pageContext as {
    bleedBox: PDFPageBox | null;
    trimBox: PDFPageBox | null;
  };

  const [pageWidth, pageHeight] = getCardPageSize(format);
  pageContext.bleedBox = {
    bottomLeftX: 0,
    bottomLeftY: 0,
    topRightX: pageWidth * pointsPerMillimetre,
    topRightY: pageHeight * pointsPerMillimetre,
  };
  pageContext.trimBox = {
    bottomLeftX: format.bleed * pointsPerMillimetre,
    bottomLeftY: format.bleed * pointsPerMillimetre,
    topRightX: (format.bleed + format.trimWidth) * pointsPerMillimetre,
    topRightY: (format.bleed + format.trimHeight) * pointsPerMillimetre,
  };
}

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
  packName: string,
  format: CardFormat = CARD_FORMATS.poker
) {
  const [pageWidth, pageHeight] = getCardPageSize(format);
  const safeX = format.bleed + 1.5;
  const safeWidth = format.trimWidth - 3;
  applyCardPageBoxes(doc, format);
  const partNum = Math.floor(qIndex / 20) + 1;
  const partQNum = (qIndex % 20) + 1;

  // 1. Full-bleed background. The PDF page itself includes the 3 mm bleed.
  // Do not draw a trim rectangle here: it would become a visible border on the card.
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // 2. Top Header Banner (bleeds to the top, left, and right page edges)
  const headerH = format.bleed + 11.5;
  doc.setFillColor(139, 30, 30); // #8B1E1E
  doc.rect(0, 0, pageWidth, headerH, 'F');

  // Line 1: Pack Title (Autoscaled)
  const packFit = fitTextToBox(doc, packName.toUpperCase(), safeWidth - 2, 4.5, {
    minFontSize: 5.5,
    maxFontSize: 8.0,
    fontStyle: 'bold',
    allowMultiLine: false,
  });
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(packFit.fontSize);
  doc.text(packFit.lines[0], pageWidth / 2, format.bleed + 3.8, { align: 'center' });

  // Line 2: Part & Question # (x/20)
  doc.setTextColor(255, 224, 130); // Warm Gold (#FFE082)
  doc.setFontSize(8.5);
  doc.text(`PART ${partNum}  •  QUESTION ${partQNum}`, pageWidth / 2, format.bleed + 8.5, { align: 'center' });

  // 3. Question Text Box (Autoscaled to maximize surface area)
  const questionBoxY = headerH + 1.5; // ~16.0 mm
  const questionBoxH = 28.0;
  doc.setFillColor(250, 248, 245);
  doc.setDrawColor(208, 198, 184);
  doc.setLineWidth(0.3);
  doc.rect(safeX, questionBoxY, safeWidth, questionBoxH, 'FD');

  const qFit = fitTextToBox(doc, q.question, safeWidth - 5.0, questionBoxH - 3.5, {
    minFontSize: 8.0,
    maxFontSize: 24.0,
    fontStyle: 'bold',
    lineHeightFactor: 0.40,
  });

  doc.setTextColor(15, 15, 15);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(qFit.fontSize);
  const qStartY = questionBoxY + (questionBoxH - qFit.totalHeight) / 2 + qFit.lineHeight * 0.75;
  doc.text(qFit.lines, safeX + 2.5, qStartY, { lineHeightFactor: qFit.lineHeight / (qFit.fontSize * 25.4 / 72) });

  // 4. Content Area (MCQ Options or Numerical Estimate)
  if (q.type === 'mcq') {
    const optStartY = questionBoxY + questionBoxH + 1.5; // ~45.5 mm
    const optH = (pageHeight - safeX - optStartY - (q.options.length - 1) * 1.2) / q.options.length;
    const optGap = 1.2;
    const optLetters = ['A', 'B', 'C'];

    // Pre-calculate optimal font size across all available options for visual harmony
    const optFits = q.options.map(opt => 
      fitTextToBox(doc, opt, safeWidth - 13.0, optH - 2.0, {
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
      doc.rect(safeX, optY, safeWidth, optH, 'FD');

      // Letter Badge
      doc.setTextColor(139, 30, 30);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11.5);
      doc.text(`${optLetters[o]}:`, safeX + 2.8, optY + optH / 2 + 1.3);

      // Option Text with harmonic font size
      doc.setTextColor(20, 20, 20);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(harmonicOptFontSize);

      const wrappedOpt = doc.splitTextToSize(optText, safeWidth - 13.0);
      const optLineH = harmonicOptFontSize * 0.40;
      const totalOptH = wrappedOpt.length * optLineH;
      const optTextStartY = optY + (optH - totalOptH) / 2 + optLineH * 0.75;
      doc.text(wrappedOpt, safeX + 10.0, optTextStartY, { lineHeightFactor: 0.40 * 72 / 25.4 });
    }
  } else {
    // Number Estimate Content (Autoscaled)
    const estY = questionBoxY + questionBoxH + 1.5;
    const estH = pageHeight - safeX - estY;

    doc.setFillColor(238, 246, 252);
    doc.setDrawColor(24, 90, 157);
    doc.setLineWidth(0.5);
    doc.rect(safeX, estY, safeWidth, estH, 'FD');

    doc.setTextColor(13, 71, 161);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text('NUMERICAL ESTIMATE', pageWidth / 2, estY + estH * 0.28, { align: 'center' });

    doc.setTextColor(21, 101, 192);
    doc.setFontSize(9.5);
    doc.text('REQUIRED UNIT:', pageWidth / 2, estY + estH * 0.54, { align: 'center' });

    const unitText = (q.metricUnit || 'UNITS').toUpperCase();
    const unitFit = fitTextToBox(doc, unitText, safeWidth - 8, 12, {
      minFontSize: 9.0,
      maxFontSize: 16.0,
      fontStyle: 'bold',
      allowMultiLine: false,
    });

    doc.setTextColor(13, 71, 161);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(unitFit.fontSize);
    doc.text(unitText, pageWidth / 2, estY + estH * 0.8, { align: 'center' });
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
  packName: string,
  format: CardFormat = CARD_FORMATS.poker
) {
  const [pageWidth, pageHeight] = getCardPageSize(format);
  const safeX = format.bleed + 1.5;
  const safeWidth = format.trimWidth - 3;
  applyCardPageBoxes(doc, format);
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');
  doc.setFillColor(27, 94, 32);
  doc.rect(0, 0, pageWidth, 14.5, 'F');
  const title = fitTextToBox(doc, packName.toUpperCase(), safeWidth, 4, { minFontSize: 4, maxFontSize: 8, allowMultiLine: false });
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(title.fontSize);
  doc.text(title.lines, pageWidth / 2, 7, { align: 'center' });
  doc.setFontSize(8.5);
  doc.text(`PART ${Math.floor(qIndex / 20) + 1}  /  QUESTION ${(qIndex % 20) + 1}  /  ANSWER`, pageWidth / 2, 11.5, { align: 'center' });

  const drawText = (text: string, y: number, h: number, max: number, style: 'bold' | 'normal' = 'bold') => {
    const fit = fitTextToBox(doc, text, safeWidth - 5, h, {
      minFontSize: 6, maxFontSize: max, fontStyle: style, lineHeightFactor: 0.40,
    });
    if (fit.totalHeight > h) throw new Error(`Question ${qIndex + 1}: text is too long for a readable card. Shorten it before exporting.`);
    doc.setFont('helvetica', style);
    doc.setFontSize(fit.fontSize);
    doc.text(fit.lines, safeX + 2.5, y + (h - fit.totalHeight) / 2 + fit.lineHeight * 0.75,
      { lineHeightFactor: 0.40 * 72 / 25.4 });
  };
  doc.setTextColor(45, 45, 45);
  drawText(q.question, 17, 18, 16);
  if (q.type === 'mcq') {
    const optionHeight = (27 - (q.options.length - 1)) / q.options.length;
    const labels = q.options.map((option, index) => `${['A', 'B', 'C'][index]}: ${option}`);
    const fontSize = Math.min(...labels.map(label => fitTextToBox(doc, label, safeWidth - 5, optionHeight - 2, {
      minFontSize: 6, maxFontSize: 14, lineHeightFactor: 0.40,
    }).fontSize));
    labels.forEach((label, index) => {
      const correct = index === q.correctIndex;
      const y = 37 + index * (optionHeight + 1);
      doc.setFillColor(...(correct ? [232, 245, 233] : [247, 246, 243]) as [number, number, number]);
      doc.roundedRect(safeX, y, safeWidth, optionHeight, 1, 1, 'F');
      if (correct) {
        doc.setFillColor(27, 94, 32);
        doc.rect(safeX, y, 0.8, optionHeight, 'F');
      }
      doc.setTextColor(...(correct ? [27, 94, 32] : [55, 55, 55]) as [number, number, number]);
      drawText(label, y + 1, optionHeight - 2, fontSize);
    });
  } else {
    doc.setFillColor(232, 245, 233);
    doc.roundedRect(safeX, 38, safeWidth, 23, 2, 2, 'F');
    doc.setTextColor(27, 94, 32);
    const answer = `${q.target.toLocaleString('en-US')} ${q.metricUnit || ''}${q.imperialDisplay ? ` (${q.imperialDisplay})` : ''}`;
    drawText(answer, 40, 19, 26);
  }
  doc.setTextColor(100, 90, 75);
  doc.setFontSize(7);
  doc.text('THE STORY BEHIND THE ANSWER', safeX + 2.5, 67);
  doc.setTextColor(30, 30, 30);
  drawText(q.explanation || 'Explanation not provided; review before publication.', 70, pageHeight - safeX - 70, 15, 'normal');
}

/**
 * Generates a 120-page Poker card PDF (69.5 x 94.9 mm per page with 3mm bleed)
 * sequenced in alternating Front - Back - Front - Back order
 * (Page 1: Q1 Front, Page 2: Q1 Back, Page 3: Q2 Front, Page 4: Q2 Back...)
 * ready for direct imposition in Montax Imposer.
 */
export function generateQuizPDF(quiz: QuizDataset, formatId: CardFormatId = 'poker'): jsPDF {
  const format = CARD_FORMATS[formatId];
  const [pageWidth, pageHeight] = getCardPageSize(format);
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: [pageWidth, pageHeight],
  });

  const questions = quiz.questions || [];
  const packName = quiz.theme || quiz.title || 'Quiz Pack';

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];

    // Page 2*i + 1: FRONT Card Face
    if (i > 0) {
      doc.addPage([pageWidth, pageHeight], 'portrait');
    }
    drawFrontCard(doc, q, i, packName, format);

    // Page 2*i + 2: BACK Card Face (Answer)
    doc.addPage([pageWidth, pageHeight], 'portrait');
    drawBackCard(doc, q, i, packName, format);
  }

  return doc;
}

/**
 * Downloads the generated 120-page Front-Back PDF directly in browser.
 */
export function downloadQuizPDF(quiz: QuizDataset, customFilename?: string, formatId: CardFormatId = 'poker') {
  const doc = generateQuizPDF(quiz, formatId);
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
export function getQuizPDFDataUri(quiz: QuizDataset, formatId: CardFormatId = 'poker'): string {
  const doc = generateQuizPDF(quiz, formatId);
  return doc.output('datauristring');
}

/**
 * Returns raw PDF ArrayBuffer for saving in Node.js scripts.
 */
export function getQuizPDFBuffer(quiz: QuizDataset, formatId: CardFormatId = 'poker'): Buffer {
  const doc = generateQuizPDF(quiz, formatId);
  const arrayBuffer = doc.output('arraybuffer');
  return Buffer.from(arrayBuffer);
}

/** One face using exactly the same drawing functions as the full download. */
export function generateCardPreviewPDF(quiz: QuizDataset, index: number, side: 'front' | 'back', formatId: CardFormatId = 'poker'): jsPDF {
  const format = CARD_FORMATS[formatId];
  const pageSize = getCardPageSize(format);
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: pageSize });
  const question = quiz.questions[index];
  if (!question) throw new Error('No card available to preview.');
  (side === 'front' ? drawFrontCard : drawBackCard)(doc, question, index, quiz.theme || quiz.title || 'Quiz Pack', format);
  return doc;
}
