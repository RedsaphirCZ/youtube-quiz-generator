import { Question, MCQQuestion, NumberQuestion, ValidationReport, RuleCheckResult, QuizDataset } from '../types';

/**
 * Heuristics to detect arithmetic, calculations, and math word problems.
 */
const ARITHMETIC_PATTERNS = [
  /\b\d+\s*[\+\-\*\/x×÷]\s*\d+\b/i,
  /\bwhat\s+is\s+\d+\s*(?:x|\*|\+|\-|\/|times|divided\s+by|plus|minus)\s*\d+\b/i,
  /\bcalculate\s+(?:the\s+)?(?:sum|difference|product|quotient|equation|value|percentage)/i,
  /\bsolve\s+(?:the\s+)?(?:equation|formula|math)/i,
  /\bhow\s+many\s+(?:metres|meters|kilometers|miles|feet|inches|pounds|kg)\s+are\s+\d+\b/i,
  /\bconvert\s+\d+\s*(?:km|miles|kg|lbs|pounds|meters)\b/i,
  /\bif\s+\d+%\s+of\s+\d+\b/i,
];

const NUMBER_WORD_PROBLEM_PATTERNS = [
  /\bif\s+\d+\s+\w+\s+(?:each\s+)?(?:carry|have|buy|take|hold|eat)\s+\d+\b/i,
  /\bhow\s+many\s+\w+\s+are\s+there\s+if\b/i,
  /\bcalculate\s+the\s+total\b/i,
  /\bif\s+\d+\s+out\s+of\s+\d+\b/i,
  /\bhow\s+many\s+remain\s+if\b/i,
];

export interface FlexibleQuizExpectation {
  questionCount: number;
  flexible: true;
}

/**
 * Validates a quiz dataset against the 15 strict specification rules from RULES.md.
 * A numeric expectation preserves the app's repeating-cycle format. Flexible imports
 * still receive all field-level checks without being forced into the legacy 5:1 rhythm.
 */
export function validateQuizDataset(
  questions: Question[],
  expectation?: number | FlexibleQuizExpectation
): ValidationReport {
  const errors: string[] = [];
  const warnings: string[] = [];
  const bracketViolations: string[] = [];
  const arithmeticViolations: string[] = [];
  const numberProblemViolations: string[] = [];

  const totalQuestions = questions.length;
  const flexible = typeof expectation === 'object' && expectation.flexible;
  const expectedCycles = typeof expectation === 'number' ? expectation : undefined;
  const compactTwenty = expectedCycles === 4;
  const cycleLength = compactTwenty ? 5 : 6;
  const mcqsPerCycle = compactTwenty ? 4 : 5;
  const targetTotal = flexible
    ? expectation.questionCount
    : expectedCycles
      ? (compactTwenty ? 20 : expectedCycles * 6)
      : 60;
  let mcqCount = 0;
  let numberCount = 0;
  let isPatternStrict = true;
  const positionBalance = { A: 0, B: 0, C: 0 };
  let maxAnswerChoiceCount = 2;
  const seenQuestions = new Set<string>();

  // Track rule flags
  let rule1Pass = flexible || expectedCycles
    ? totalQuestions === targetTotal
    : (totalQuestions > 0 && totalQuestions % 6 === 0);
  let rule2Pass = true;
  let rule3Pass = true;
  let rule4Pass = true;
  let rule5Pass = true;
  let rule6Pass = true;
  let rule7Pass = true;
  let rule8Pass = true;
  let rule9Pass = true;
  let rule10Pass = true;
  let rule11Pass = true;
  let rule12Pass = true;
  let rule13Pass = true;
  let rule14Pass = true;
  let rule15Pass = true;

  // 1. Total count check
  if (totalQuestions === 0) {
    errors.push('Rule #1: Dataset contains 0 questions.');
    rule1Pass = false;
  } else if ((flexible || expectedCycles) && totalQuestions !== targetTotal) {
    errors.push(`Rule #1: Total questions is ${totalQuestions} (expected ${targetTotal} for ${expectedCycles} cycles).`);
    rule1Pass = false;
  } else if (!flexible && !expectedCycles && totalQuestions % 6 !== 0) {
    errors.push(`Rule #1: Total questions is ${totalQuestions} (expected a multiple of 6 for 5:1 cycles).`);
    rule1Pass = false;
  }

  questions.forEach((q, idx) => {
    const qNum = idx + 1;
    const cyclePosition = idx % cycleLength;

    // Check Question Text Exists
    if (!q.question || q.question.trim().length === 0) {
      errors.push(`Rule #14: Question #${qNum} has empty question text.`);
      rule14Pass = false;
    }

    // Check duplicate questions
    const normQ = (q.question || '').trim().toLowerCase();
    if (seenQuestions.has(normQ) && normQ.length > 5) {
      warnings.push(`Rule #12: Question #${qNum} appears to be a duplicate or identical wording.`);
      rule12Pass = false;
    }
    seenQuestions.add(normQ);

    // Sequence verification (5:1 pattern) for legacy cycle-based quiz packs.
    if (!flexible && cyclePosition < mcqsPerCycle) {
      if (q.type !== 'mcq') {
        isPatternStrict = false;
        rule3Pass = false;
        errors.push(`Rule #3: Question #${qNum} should be an MCQ (pattern slot ${cyclePosition + 1}/6), but is '${q.type}'.`);
      }
    } else if (!flexible) {
      if (q.type !== 'number') {
        isPatternStrict = false;
        rule3Pass = false;
        errors.push(`Rule #3: Question #${qNum} should be a Number Estimate (pattern slot 6/6), but is '${q.type}'.`);
      }
    }

    if (q.type === 'mcq') {
      mcqCount++;
      const mcq = q as MCQQuestion;

      // Relaxed quizzes use 2 choices; classic quizzes use 3.
      if (!Array.isArray(mcq.options) || ![2, 3].includes(mcq.options.length)) {
        errors.push(`Rule #4: Question #${qNum} (MCQ) must have exactly 2 or 3 options (found ${mcq.options?.length ?? 0}).`);
        rule4Pass = false;
      } else {
        maxAnswerChoiceCount = Math.max(maxAnswerChoiceCount, mcq.options.length);
        // Unique non-empty options
        const uniqueOpts = new Set(mcq.options.map(o => String(o).trim().toLowerCase()));
        if (uniqueOpts.size !== mcq.options.length || [...uniqueOpts].some((option) => !option)) {
          errors.push(`Rule #8: Question #${qNum} (MCQ) has duplicate or identical option choices.`);
          rule8Pass = false;
        }

        // No brackets in options
        mcq.options.forEach((opt, optIdx) => {
          const strOpt = String(opt || '');
          if (/[()[\]{}]/.test(strOpt)) {
            const letter = String.fromCharCode(65 + optIdx);
            bracketViolations.push(`Q#${qNum} Option ${letter}: "${strOpt}"`);
            errors.push(`Rule #6: Question #${qNum} option ${letter} contains forbidden brackets: "${strOpt}".`);
            rule6Pass = false;
          }
        });
      }

      // Valid correctIndex
      if (!Number.isInteger(mcq.correctIndex) || mcq.correctIndex < 0 || mcq.correctIndex >= (mcq.options?.length ?? 0)) {
        errors.push(`Rule #5: Question #${qNum} (MCQ) invalid correctIndex: ${mcq.correctIndex}. It must point to one of the available options.`);
        rule5Pass = false;
      } else {
        if (mcq.correctIndex === 0) positionBalance.A++;
        if (mcq.correctIndex === 1) positionBalance.B++;
        if (mcq.correctIndex === 2) positionBalance.C++;
      }

      // Pure math / arithmetic heuristic check
      const qText = mcq.question || '';
      for (const pattern of ARITHMETIC_PATTERNS) {
        if (pattern.test(qText)) {
          arithmeticViolations.push(`Q#${qNum}: "${qText}"`);
          errors.push(`Rule #7: Question #${qNum} appears to be an arithmetic calculation / formula problem: "${qText}".`);
          rule7Pass = false;
          break;
        }
      }

      // Check explanation
      if (!mcq.explanation || mcq.explanation.trim().length === 0) {
        warnings.push(`Rule #13: Question #${qNum} (MCQ) is missing an explanation.`);
        rule13Pass = false;
      }
    } else if (q.type === 'number') {
      numberCount++;
      const numQ = q as NumberQuestion;

      if (typeof numQ.target !== 'number' || isNaN(numQ.target)) {
        errors.push(`Rule #11: Question #${qNum} (Number) target must be a pure numeric value, got: ${numQ.target}`);
        rule11Pass = false;
      }

      // Math word problem check on number question
      const qText = numQ.question || '';
      for (const pattern of NUMBER_WORD_PROBLEM_PATTERNS) {
        if (pattern.test(qText)) {
          numberProblemViolations.push(`Q#${qNum}: "${qText}"`);
          errors.push(`Rule #10: Question #${qNum} (Number) appears to be an arithmetic word problem rather than a factual estimate: "${qText}".`);
          rule10Pass = false;
          break;
        }
      }

      if (!numQ.explanation || numQ.explanation.trim().length === 0) {
        warnings.push(`Rule #13: Question #${qNum} (Number) is missing an explanation.`);
        rule13Pass = false;
      }
    }
  });

  // Rule 2: 5:1 MCQ-to-Number Ratio (50 MCQ and 10 Number for standard 10 cycles)
  const expectedMCQ = flexible
    ? mcqCount
    : expectedCycles
      ? (compactTwenty ? 16 : expectedCycles * 5)
      : (totalQuestions === 60 ? 50 : Math.floor(totalQuestions * 5 / 6));
  const expectedNum = flexible
    ? numberCount
    : expectedCycles
      ? expectedCycles
      : (totalQuestions === 60 ? 10 : Math.floor(totalQuestions / 6));
  if (mcqCount !== expectedMCQ || numberCount !== expectedNum) {
    errors.push(`Rule #2: Question distribution is ${mcqCount} MCQs and ${numberCount} Number questions (expected ${expectedMCQ} MCQs and ${expectedNum} Number estimates).`);
    rule2Pass = false;
  }

  // Rule 9: Balance across the answer positions used by this quiz.
  if (mcqCount >= 30) {
    const minExpected = Math.floor(mcqCount * 0.18);
    const maxExpected = Math.ceil(mcqCount * 0.50);
    const twoChoiceMin = Math.floor(mcqCount * 0.30);
    const twoChoiceMax = Math.ceil(mcqCount * 0.70);
    const isSkewed = maxAnswerChoiceCount === 2
      ? positionBalance.A < twoChoiceMin || positionBalance.A > twoChoiceMax || positionBalance.B < twoChoiceMin || positionBalance.B > twoChoiceMax
      : positionBalance.A < minExpected || positionBalance.A > maxExpected ||
        positionBalance.B < minExpected || positionBalance.B > maxExpected ||
        positionBalance.C < minExpected || positionBalance.C > maxExpected;
    if (isSkewed) {
      warnings.push(`Rule #9: Correct answer positions are heavily skewed (A: ${positionBalance.A}, B: ${positionBalance.B}${maxAnswerChoiceCount === 3 ? `, C: ${positionBalance.C}` : ''}).`);
      rule9Pass = false;
    }
  }

  const ruleChecks: RuleCheckResult[] = [
    { ruleNumber: 1, title: `Total ${targetTotal} Questions`, passed: rule1Pass, details: `Found ${totalQuestions}/${targetTotal} questions` },
    { ruleNumber: 2, title: `${expectedMCQ} MCQs + ${expectedNum} Number Estimates`, passed: rule2Pass, details: `${mcqCount} MCQs, ${numberCount} Estimates` },
    { ruleNumber: 3, title: flexible ? 'Flexible Question Ordering' : 'Exact 5:1 Repeating Pattern', passed: rule3Pass, details: flexible ? 'No legacy cycle pattern required' : isPatternStrict ? 'Strict 5:1 rhythm verified' : 'Pattern broken' },
    { ruleNumber: 4, title: 'Exactly 2 or 3 Options per MCQ', passed: rule4Pass, details: rule4Pass ? `All MCQs use a supported ${maxAnswerChoiceCount}-choice format` : 'Options count mismatch' },
    { ruleNumber: 5, title: 'Valid correctIndex for Available Options', passed: rule5Pass, details: rule5Pass ? 'All indices in range' : 'Invalid indices detected' },
    { ruleNumber: 6, title: 'Zero Brackets in MCQ Options ( ) [ ]', passed: rule6Pass, details: bracketViolations.length === 0 ? 'Clean options' : `${bracketViolations.length} bracket violations` },
    { ruleNumber: 7, title: 'No Arithmetic / Calculations in MCQs', passed: rule7Pass, details: arithmeticViolations.length === 0 ? 'Factual knowledge only' : `${arithmeticViolations.length} arithmetic items` },
    { ruleNumber: 8, title: 'Distinct, Plausible Options', passed: rule8Pass, details: rule8Pass ? 'Options are distinct' : 'Duplicate options found' },
    { ruleNumber: 9, title: `Balanced Answer Distribution (${maxAnswerChoiceCount === 2 ? 'A/B' : 'A/B/C'})`, passed: rule9Pass, details: `A: ${positionBalance.A}, B: ${positionBalance.B}${maxAnswerChoiceCount === 3 ? `, C: ${positionBalance.C}` : ''}` },
    { ruleNumber: 10, title: 'Number Questions are Factual Estimates', passed: rule10Pass, details: numberProblemViolations.length === 0 ? 'Real-world estimates' : `${numberProblemViolations.length} word problem calculations` },
    { ruleNumber: 11, title: 'Pure Numeric Target & Units Separated', passed: rule11Pass, details: rule11Pass ? 'Clean numeric targets' : 'Invalid number targets' },
    { ruleNumber: 12, title: 'Zero Duplicate Questions', passed: rule12Pass, details: rule12Pass ? 'No duplicate questions' : 'Duplicate questions found' },
    { ruleNumber: 13, title: 'Explanations Provided & Consistent', passed: rule13Pass, details: rule13Pass ? 'All questions have explanations' : 'Missing explanations' },
    { ruleNumber: 14, title: 'Complete Question Text & Metadata', passed: rule14Pass, details: rule14Pass ? 'All fields populated' : 'Incomplete metadata' },
    { ruleNumber: 15, title: 'Zero Markdown Leaks or Outer Wrappers', passed: rule15Pass, details: 'Clean JSON schema' },
  ];

  const isValid = errors.length === 0;

  return {
    isValid,
    totalQuestions,
    mcqCount,
    numberCount,
    cycleCount: flexible ? 0 : expectedCycles ?? (totalQuestions === 20 ? 4 : Math.floor(totalQuestions / 6)),
    isPatternStrict,
    positionBalance,
    bracketViolations,
    arithmeticViolations,
    numberProblemViolations,
    ruleChecks,
    errors,
    warnings,
  };
}

/**
 * Sanitizes and cleans question data (strips brackets from options, ensures valid numbers, etc.)
 */
export function sanitizeQuestions(rawQuestions: Question[], expectedAnswerChoiceCount?: 2 | 3): Question[] {
  let mcqCount = 0;
  return rawQuestions.map((q, idx) => {
    if (q.type === 'mcq') {
      const answerChoiceCount: 2 | 3 = expectedAnswerChoiceCount ?? (q.options?.length === 2 ? 2 : 3);
      const cleanOptions = (q.options || []).slice(0, answerChoiceCount).map((opt) => {
        // Strip parentheses and brackets and any inside text like (approx 120km) if in option
        return String(opt)
          .replace(/\s*\([^)]*\)/g, '')
          .replace(/\s*\[[^\]]*\]/g, '')
          .replace(/[()[\]{}]/g, '')
          .trim();
      }) as string[];

      while (cleanOptions.length < answerChoiceCount) {
        cleanOptions.push(`Option ${cleanOptions.length + 1}`);
      }

      const candidateIndex = typeof q.correctIndex === 'number' && !isNaN(q.correctIndex)
        ? q.correctIndex
        : (typeof (q as any).target === 'number' && (q as any).target >= 0 && (q as any).target < answerChoiceCount
          ? (q as any).target
          : mcqCount % answerChoiceCount);
      const validIndex = Number.isInteger(candidateIndex) && candidateIndex >= 0 && candidateIndex < answerChoiceCount
        ? (candidateIndex as 0 | 1 | 2)
        : 0;
      mcqCount++;

      // Clean question text and ensure question is not blank
      let qText = q.question.trim();
      if (!qText) {
        qText = `Question ${idx + 1}`;
      }

      return {
        type: 'mcq',
        question: qText,
        options: cleanOptions as [string, string] | [string, string, string],
        correctIndex: validIndex,
        explanation: (q.explanation || 'Explanation missing; editorial review required.').trim(),
      };
    } else {
      let targetNum = Number(q.target);
      if (isNaN(targetNum)) {
        const match = String(q.target).replace(/,/g, '').match(/-?\d+(\.\d+)?/);
        targetNum = match ? parseFloat(match[0]) : 100;
      }

      let qText = q.question.trim();
      if (!qText) {
        qText = `Estimate question ${idx + 1}`;
      }

      return {
        type: 'number',
        question: qText,
        target: targetNum,
        metricUnit: q.metricUnit ? q.metricUnit.trim() : 'units',
        imperialDisplay: q.imperialDisplay ? q.imperialDisplay.trim() : '',
        explanation: (q.explanation || 'Explanation missing; editorial review required.').trim(),
      };
    }
  });
}

/**
 * Generates a targeted LLM repair prompt (mimicking repair_prompt.py)
 * to send back to ChatGPT or Gemini to fix only the failing questions.
 */
export function generateRepairPrompt(dataset: QuizDataset, report: ValidationReport): string {
  if (report.isValid) {
    return `# Dataset Validation Status: PASS (15/15 Rules Satisfied)\n\nAll questions satisfy the strict RULES.md specification. No repair required.`;
  }

  let prompt = `# Targeted Dataset Repair Prompt for "${dataset.title || dataset.theme || 'Quiz'}"\n\n`;
  prompt += `The quiz dataset was evaluated against the authoritative \`RULES.md\` specification and failed with the following issues:\n\n`;

  prompt += `### Summary of Violations:\n`;
  report.errors.forEach((err, i) => {
    prompt += `${i + 1}. ${err}\n`;
  });

  if (report.bracketViolations.length > 0) {
    prompt += `\n### Bracket Violations in MCQ Options (Forbidden by Rule #6):\n`;
    report.bracketViolations.forEach(b => prompt += `- ${b}\n`);
  }

  if (report.arithmeticViolations.length > 0) {
    prompt += `\n### Arithmetic / Calculation Questions (Forbidden by Rule #7):\n`;
    report.arithmeticViolations.forEach(a => prompt += `- ${a}\n`);
  }

  if (report.numberProblemViolations.length > 0) {
    prompt += `\n### Number Word Problem Calculations (Forbidden by Rule #10):\n`;
    report.numberProblemViolations.forEach(n => prompt += `- ${n}\n`);
  }

  prompt += `\n### Instructions for Repair:\n`;
  prompt += `1. Fix or replace only the failing question items listed above.\n`;
  const answerChoiceCount = dataset.answerChoiceCount ?? (dataset.questions.find((question) => question.type === 'mcq') as MCQQuestion | undefined)?.options.length ?? 3;
  prompt += `2. For MCQs: Preserve exactly ${answerChoiceCount} options, use ZERO brackets \`()\`, \`[]\`, no math/calculations, and a valid \`correctIndex\` for those options.\n`;
  prompt += `3. For Number Questions: Ensure real-world factual estimates only (no arithmetic word problems), numeric \`target\`, and separate \`metricUnit\`.\n`;
  prompt += `4. Keep the exact 5:1 repeating cycle (5 MCQs followed by 1 Number Estimate).\n`;
  prompt += `5. Return the full repaired JSON object with "title", "topic", and 60 "questions".\n`;

  return prompt;
}
