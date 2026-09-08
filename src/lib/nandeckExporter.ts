import { QuizDataset, Question } from '../types';

export interface NanDeckCardRow {
  CARD_ID: number;           // 1 to 120 (1-60 Front, 61-120 Back)
  CARD_NUM: number;          // 1 to 60
  IS_BACK: number;           // 0 for Front, 1 for Back
  CARD_SIDE: string;         // "FRONT" or "BACK"
  QUESTION_NUM: number;      // 1 to 60
  PART_NUM: number;          // 1, 2, or 3
  PACK: string;              // Pack / Theme title
  CYCLE_NUM: number;         // 1 to 10
  TYPE: 'mcq' | 'number';
  IS_MCQ: number;            // 1 if MCQ, 0 if Number
  IS_NUMBER: number;         // 1 if Number, 0 if MCQ
  THEME: string;
  CATEGORY: string;
  QUESTION_TEXT: string;
  
  // MCQ Options
  OPTION_A: string;
  OPTION_B: string;
  OPTION_C: string;
  CORRECT_INDEX: number;     // 0, 1, or 2 (or -1 for number)
  CORRECT_LETTER: string;    // "A", "B", "C" or "ESTIMATE"
  CORRECT_ANSWER: string;    // The text of the correct choice or target value
  
  // Highlighting Flags (for Back)
  IS_A_CORRECT: number;      // 1 if A is correct and IS_BACK=1, else 0
  IS_B_CORRECT: number;      // 1 if B is correct and IS_BACK=1, else 0
  IS_C_CORRECT: number;      // 1 if C is correct and IS_BACK=1, else 0
  
  // Style colors for options (Hex with #)
  BG_A: string;
  BORDER_A: string;
  FONT_COLOR_A: string;
  PREFIX_A: string;
  
  BG_B: string;
  BORDER_B: string;
  FONT_COLOR_B: string;
  PREFIX_B: string;
  
  BG_C: string;
  BORDER_C: string;
  FONT_COLOR_C: string;
  PREFIX_C: string;
  
  // Number Questions
  TARGET_VAL: number | string;
  METRIC_UNIT: string;
  IMPERIAL_DISPLAY: string;
  TARGET_DISPLAY: string;
  
  // Explanation & Headers
  EXPLANATION: string;
  HEADER_TITLE: string;
  HEADER_SUBTITLE: string;
  HEADER_BG: string;
  HEADER_BORDER: string;
  HEADER_TEXT_COLOR: string;
}

/**
 * Escapes a string field for clean CSV export according to RFC 4180.
 */
function escapeCSV(field: any): string {
  if (field === null || field === undefined) return '""';
  const str = String(field).trim();
  return '"' + str.replace(/"/g, '""') + '"';
}

/**
 * Generates structured 120-row card datasets (60 Fronts + 60 Backs) for a 60-question quiz.
 */
export function generateNanDeckCardRows(quiz: QuizDataset): NanDeckCardRow[] {
  const rows: NanDeckCardRow[] = [];
  const questions = quiz.questions || [];
  const theme = quiz.theme || quiz.title || 'Quiz Deck';
  const category = quiz.category || 'General Knowledge';

  // Pass 1: 60 Front Cards (CARD_ID: 1..60, IS_BACK: 0)
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const qNum = i + 1;
    const partNum = Math.floor(i / 20) + 1;
    const cycleNum = Math.floor(i / 6) + 1;
    const isMCQ = q.type === 'mcq';
    const isNumber = q.type === 'number';

    let optA = '';
    let optB = '';
    let optC = '';
    let correctIdx = -1;
    let correctLetter = '';
    let correctAnswer = '';

    if (isMCQ && Array.isArray(q.options)) {
      optA = q.options[0] || '';
      optB = q.options[1] || '';
      optC = q.options[2] || '';
      correctIdx = q.correctIndex ?? 0;
      correctLetter = ['A', 'B', 'C'][correctIdx] || 'A';
      correctAnswer = q.options[correctIdx] || '';
    } else if (isNumber) {
      correctLetter = 'ESTIMATE';
      correctAnswer = `${q.target} ${q.metricUnit || ''}`.trim();
    }

    rows.push({
      CARD_ID: qNum,
      CARD_NUM: qNum,
      IS_BACK: 0,
      CARD_SIDE: 'FRONT',
      QUESTION_NUM: (i % 20) + 1,
      PART_NUM: partNum,
      PACK: theme,
      CYCLE_NUM: cycleNum,
      TYPE: q.type,
      IS_MCQ: isMCQ ? 1 : 0,
      IS_NUMBER: isNumber ? 1 : 0,
      THEME: theme,
      CATEGORY: category,
      QUESTION_TEXT: q.question,

      OPTION_A: optA,
      OPTION_B: optB,
      OPTION_C: optC,
      CORRECT_INDEX: correctIdx,
      CORRECT_LETTER: correctLetter,
      CORRECT_ANSWER: correctAnswer,

      IS_A_CORRECT: 0,
      IS_B_CORRECT: 0,
      IS_C_CORRECT: 0,

      BG_A: '#FFFFFF',
      BORDER_A: '#B0A698',
      FONT_COLOR_A: '#000000',
      PREFIX_A: 'A: ',

      BG_B: '#FFFFFF',
      BORDER_B: '#B0A698',
      FONT_COLOR_B: '#000000',
      PREFIX_B: 'B: ',

      BG_C: '#FFFFFF',
      BORDER_C: '#B0A698',
      FONT_COLOR_C: '#000000',
      PREFIX_C: 'C: ',

      TARGET_VAL: isNumber ? (q.target ?? '') : '',
      METRIC_UNIT: isNumber ? (q.metricUnit || '') : '',
      IMPERIAL_DISPLAY: isNumber ? (q.imperialDisplay || '') : '',
      TARGET_DISPLAY: isNumber ? `ESTIMATE IN: ${(q.metricUnit || 'UNITS').toUpperCase()}` : '',

      EXPLANATION: '',
      HEADER_TITLE: `QUESTION ${(i % 20) + 1}`,
      HEADER_SUBTITLE: `PART ${partNum}/${Math.ceil(questions.length / 20)}`,
      HEADER_BG: '#8B1E1E',
      HEADER_BORDER: '#8B1E1E',
      HEADER_TEXT_COLOR: '#FFFFFF',
    });
  }

  // Pass 2: 60 Back Cards (CARD_ID: 61..120, IS_BACK: 1)
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const qNum = i + 1;
    const cardId = questions.length + qNum;
    const partNum = Math.floor(i / 20) + 1;
    const cycleNum = Math.floor(i / 6) + 1;
    const isMCQ = q.type === 'mcq';
    const isNumber = q.type === 'number';

    let optA = '';
    let optB = '';
    let optC = '';
    let correctIdx = -1;
    let correctLetter = '';
    let correctAnswer = '';

    if (isMCQ && Array.isArray(q.options)) {
      optA = q.options[0] || '';
      optB = q.options[1] || '';
      optC = q.options[2] || '';
      correctIdx = q.correctIndex ?? 0;
      correctLetter = ['A', 'B', 'C'][correctIdx] || 'A';
      correctAnswer = q.options[correctIdx] || '';
    } else if (isNumber) {
      correctLetter = 'TARGET';
      correctAnswer = `${q.target} ${q.metricUnit || ''}`.trim();
    }

    const isACorrect = isMCQ && correctIdx === 0 ? 1 : 0;
    const isBCorrect = isMCQ && correctIdx === 1 ? 1 : 0;
    const isCCorrect = isMCQ && correctIdx === 2 ? 1 : 0;

    rows.push({
      CARD_ID: cardId,
      CARD_NUM: qNum,
      IS_BACK: 1,
      CARD_SIDE: 'BACK',
      QUESTION_NUM: (i % 20) + 1,
      PART_NUM: partNum,
      PACK: theme,
      CYCLE_NUM: cycleNum,
      TYPE: q.type,
      IS_MCQ: isMCQ ? 1 : 0,
      IS_NUMBER: isNumber ? 1 : 0,
      THEME: theme,
      CATEGORY: category,
      QUESTION_TEXT: q.question,

      OPTION_A: optA,
      OPTION_B: optB,
      OPTION_C: optC,
      CORRECT_INDEX: correctIdx,
      CORRECT_LETTER: correctLetter,
      CORRECT_ANSWER: correctAnswer,

      IS_A_CORRECT: isACorrect,
      IS_B_CORRECT: isBCorrect,
      IS_C_CORRECT: isCCorrect,

      BG_A: isACorrect ? '#E8F5E9' : '#FAF8F5',
      BORDER_A: isACorrect ? '#2E7D32' : '#E2D9CC',
      FONT_COLOR_A: isACorrect ? '#1B5E20' : '#8C8278',
      PREFIX_A: isACorrect ? '✔ [A] ' : '[A] ',

      BG_B: isBCorrect ? '#E8F5E9' : '#FAF8F5',
      BORDER_B: isBCorrect ? '#2E7D32' : '#E2D9CC',
      FONT_COLOR_B: isBCorrect ? '#1B5E20' : '#8C8278',
      PREFIX_B: isBCorrect ? '✔ [B] ' : '[B] ',

      BG_C: isCCorrect ? '#E8F5E9' : '#FAF8F5',
      BORDER_C: isCCorrect ? '#2E7D32' : '#E2D9CC',
      FONT_COLOR_C: isCCorrect ? '#1B5E20' : '#8C8278',
      PREFIX_C: isCCorrect ? '✔ [C] ' : '[C] ',

      TARGET_VAL: isNumber ? (q.target ?? '') : '',
      METRIC_UNIT: isNumber ? (q.metricUnit || '') : '',
      IMPERIAL_DISPLAY: isNumber ? (q.imperialDisplay || '') : '',
      TARGET_DISPLAY: isNumber
        ? `TARGET: ${q.target} ${(q.metricUnit || '').toUpperCase()}${q.imperialDisplay ? '   ' + q.imperialDisplay : ''}`
        : '',

      EXPLANATION: q.explanation ? q.explanation.trim() : '',
      HEADER_TITLE: `QUESTION ${(i % 20) + 1} ANSWER`,
      HEADER_SUBTITLE: `PART ${partNum}/${Math.ceil(questions.length / 20)}`,
      HEADER_BG: '#1B5E20',
      HEADER_BORDER: '#1B5E20',
      HEADER_TEXT_COLOR: '#FFFFFF',
    });
  }

  return rows;
}

/**
 * Generates the complete, standardized CSV string with RFC 4180 quoting.
 */
export function generateNanDeckCSV(quiz: QuizDataset): string {
  const rows = generateNanDeckCardRows(quiz);
  if (rows.length === 0) return '';

  const headers: (keyof NanDeckCardRow)[] = [
    'CARD_ID',
    'CARD_NUM',
    'IS_BACK',
    'CARD_SIDE',
    'QUESTION_NUM',
    'PART_NUM',
    'PACK',
    'CYCLE_NUM',
    'TYPE',
    'IS_MCQ',
    'IS_NUMBER',
    'THEME',
    'CATEGORY',
    'QUESTION_TEXT',
    'OPTION_A',
    'OPTION_B',
    'OPTION_C',
    'CORRECT_INDEX',
    'CORRECT_LETTER',
    'CORRECT_ANSWER',
    'IS_A_CORRECT',
    'IS_B_CORRECT',
    'IS_C_CORRECT',
    'BG_A',
    'BORDER_A',
    'FONT_COLOR_A',
    'PREFIX_A',
    'BG_B',
    'BORDER_B',
    'FONT_COLOR_B',
    'PREFIX_B',
    'BG_C',
    'BORDER_C',
    'FONT_COLOR_C',
    'PREFIX_C',
    'TARGET_VAL',
    'METRIC_UNIT',
    'IMPERIAL_DISPLAY',
    'TARGET_DISPLAY',
    'EXPLANATION',
    'HEADER_TITLE',
    'HEADER_SUBTITLE',
    'HEADER_BG',
    'HEADER_BORDER',
    'HEADER_TEXT_COLOR'
  ];

  const lines: string[] = [];
  lines.push(headers.join(','));

  for (const row of rows) {
    const values = headers.map((key) => escapeCSV(row[key]));
    lines.push(values.join(','));
  }

  return lines.join('\r\n');
}

/**
 * Generates the complete, clean, error-free .nde nanDECK script for standard Poker Cards (63.5 x 88.9 mm).
 * Configured with DUPLEX=1-60,61-120 so front and back cards back each other up perfectly.
 * Shows ONLY Pack, Part, Question #, and Content with giant, high-contrast typography.
 */
export function generateNanDeckScript(quiz: QuizDataset, csvFilename = 'cards.csv'): string {
  return `; =============================================================================
; nanDECK SCRIPT: POKER SIZE (63.5 x 88.9 mm / 2.5 x 3.5 in)
; Pack: ${quiz.title || quiz.theme}
; Total Cards: 120 (1-60 Front / 61-120 Back)
; Essential Display Only: Pack, Part, Question #, and Content (Big Text)
; =============================================================================

UNIT = MM
PAGE = 210, 297, PORTRAIT, HV
CARDSIZE = 63.5, 88.9
MARGINS = 9.75, 15.2, 9.75, 15.2
GAP = 0, 0
BORDER = NONE

; Duplex Configuration: Pairs Fronts (1-60) with Backs (61-120) for double-sided printing
DUPLEX = 1-60, 61-120

; Link to card data spreadsheet
LINK = "${csvFilename}"

; -----------------------------------------------------------------------------
; 1. FRONT CARDS (1-60): Question & Options
; -----------------------------------------------------------------------------
; Card Border & Background
RECTANGLE = 1-60, 0, 0, 63.5, 88.9, #8B1E1E, #FFFFFF, 0.8

; Header: Pack • Part • Question #
ROUNDRECT = 1-60, 2.5, 2.5, 58.5, 7.5, #8B1E1E, #8B1E1E, 1.5, 1.5, 0.4
HTMLTEXT = 1-60, "<p align=center><font size=3.5 color=#FFFFFF><b>[PACK] • PART [PART_NUM] • Q[QUESTION_NUM]</b></font></p>", 2.5, 3.5, 58.5, 6.0, #00000000

; Question Text (Huge, Clean)
ROUNDRECT = 1-60, 2.5, 12.0, 58.5, 30.0, #D0C6B8, #FAF8F5, 1.5, 1.5, 0.4
HTMLTEXT = 1-60, "<font size=5 color=#000000><b>[QUESTION_TEXT]</b></font>", 4.0, 13.5, 55.5, 27.0, #00000000

; MCQ Options (Big Text)
IF = [IS_MCQ], =, 1
  ROUNDRECT = 1-60, 2.5, 44.0, 58.5, 13.0, #B0A698, #FFFFFF, 1.5, 1.5, 0.6
  HTMLTEXT = 1-60, "<font size=5 color=#000000><b>A:</b> [OPTION_A]</font>", 4.5, 46.5, 54.5, 9.5, #00000000

  ROUNDRECT = 1-60, 2.5, 58.5, 58.5, 13.0, #B0A698, #FFFFFF, 1.5, 1.5, 0.6
  HTMLTEXT = 1-60, "<font size=5 color=#000000><b>B:</b> [OPTION_B]</font>", 4.5, 61.0, 54.5, 9.5, #00000000

  ROUNDRECT = 1-60, 2.5, 73.0, 58.5, 13.0, #B0A698, #FFFFFF, 1.5, 1.5, 0.6
  HTMLTEXT = 1-60, "<font size=5 color=#000000><b>C:</b> [OPTION_C]</font>", 4.5, 75.5, 54.5, 9.5, #00000000
ENDIF

; Number Estimate Challenge (Front)
IF = [IS_NUMBER], =, 1
  ROUNDRECT = 1-60, 2.5, 44.0, 58.5, 42.0, #185A9D, #EEF6FC, 1.5, 1.5, 0.8
  HTMLTEXT = 1-60, "<p align=center><br><font size=5.5 color=#0D47A1><b>NUMERICAL ESTIMATE</b></font><br><br><br><font size=5 color=#1565C0><b>UNIT: [METRIC_UNIT]</b></font></p>", 4.0, 46.0, 55.5, 38.0, #00000000
ENDIF


; -----------------------------------------------------------------------------
; 2. BACK CARDS (61-120): Answer & Explanation
; -----------------------------------------------------------------------------
; Card Border & Background
RECTANGLE = 61-120, 0, 0, 63.5, 88.9, #1B5E20, #FFFFFF, 0.8

; Header: Pack • Part • Question # (Answer)
ROUNDRECT = 61-120, 2.5, 2.5, 58.5, 7.5, #1B5E20, #1B5E20, 1.5, 1.5, 0.4
HTMLTEXT = 61-120, "<p align=center><font size=3.5 color=#FFFFFF><b>[PACK] • PART [PART_NUM] • Q[QUESTION_NUM] (ANSWER)</b></font></p>", 2.5, 3.5, 58.5, 6.0, #00000000

; Question Summary
ROUNDRECT = 61-120, 2.5, 12.0, 58.5, 18.0, #D0C6B8, #FAF8F5, 1.5, 1.5, 0.4
HTMLTEXT = 61-120, "<font size=4 color=#333333><b>[QUESTION_TEXT]</b></font>", 4.0, 13.5, 55.5, 15.0, #00000000

; Giant Correct Answer Box (MCQ)
IF = [IS_MCQ], =, 1
  ROUNDRECT = 61-120, 2.5, 32.0, 58.5, 22.0, #2E7D32, #E8F5E9, 1.5, 1.5, 0.8
  HTMLTEXT = 61-120, "<p align=center><font size=3.5 color=#1B5E20><b>CORRECT ANSWER:</b></font><br><br><font size=6 color=#1B5E20><b>[CORRECT_LETTER]: [CORRECT_ANSWER]</b></font></p>", 4.0, 34.0, 55.5, 18.0, #00000000

  ; Fact Box
  ROUNDRECT = 61-120, 2.5, 56.0, 58.5, 30.0, #C59B27, #FFFDE7, 1.5, 1.5, 0.4
  HTMLTEXT = 61-120, "<font size=3.5 color=#7C5C0A><b>FACT:</b></font><br><br><font size=3.5 color=#222222>[EXPLANATION]</font>", 4.5, 58.0, 54.5, 26.0, #00000000
ENDIF

; Giant Target Value (Number Question)
IF = [IS_NUMBER], =, 1
  ROUNDRECT = 61-120, 2.5, 32.0, 58.5, 22.0, #2E7D32, #E8F5E9, 1.5, 1.5, 0.8
  HTMLTEXT = 61-120, "<p align=center><font size=3.5 color=#1B5E20><b>CORRECT TARGET:</b></font><br><br><font size=6 color=#1B5E20><b>[TARGET_VAL] [METRIC_UNIT]</b></font><br><font size=3 color=#2E7D32>[IMPERIAL_DISPLAY]</font></p>", 4.0, 34.0, 55.5, 18.0, #00000000

  ; Fact Box
  ROUNDRECT = 61-120, 2.5, 56.0, 58.5, 30.0, #C59B27, #FFFDE7, 1.5, 1.5, 0.4
  HTMLTEXT = 61-120, "<font size=3.5 color=#7C5C0A><b>FACT:</b></font><br><br><font size=3.5 color=#222222>[EXPLANATION]</font>", 4.5, 58.0, 54.5, 26.0, #00000000
ENDIF
`;
}
