const fs = require('fs');
const path = require('path');

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

function validateDataset(dataset, expectedCycles = 10) {
  const errors = [];
  const warnings = [];
  const bracketViolations = [];
  const arithmeticViolations = [];
  const numberProblemViolations = [];

  const questions = dataset.questions || [];
  const totalQuestions = questions.length;
  const targetTotal = expectedCycles * 6; // 60
  let mcqCount = 0;
  let numberCount = 0;
  let isPatternStrict = true;
  const positionBalance = { A: 0, B: 0, C: 0 };
  const seenQuestions = new Set();

  if (totalQuestions !== targetTotal) {
    errors.push(`Rule #1: Total questions is ${totalQuestions} (expected ${targetTotal}).`);
  }

  questions.forEach((q, idx) => {
    const qNum = idx + 1;
    const cyclePosition = idx % 6; // 0..4 = MCQ, 5 = Number

    if (!q.question || q.question.trim().length === 0) {
      errors.push(`Rule #14: Question #${qNum} has empty question text.`);
    }

    const normQ = (q.question || '').trim().toLowerCase();
    if (seenQuestions.has(normQ) && normQ.length > 5) {
      warnings.push(`Rule #12: Question #${qNum} duplicate wording.`);
    }
    seenQuestions.add(normQ);

    if (cyclePosition < 5) {
      if (q.type !== 'mcq') {
        isPatternStrict = false;
        errors.push(`Rule #3: Question #${qNum} should be MCQ, got '${q.type}'.`);
      }
    } else {
      if (q.type !== 'number') {
        isPatternStrict = false;
        errors.push(`Rule #3: Question #${qNum} should be Number, got '${q.type}'.`);
      }
    }

    if (q.type === 'mcq') {
      mcqCount++;
      if (!Array.isArray(q.options) || ![2, 3].includes(q.options.length)) {
        errors.push(`Rule #4: Question #${qNum} (MCQ) must have exactly 2 or 3 options.`);
      } else {
        const uniqueOpts = new Set(q.options.map(o => String(o).trim().toLowerCase()));
        if (uniqueOpts.size !== q.options.length) {
          errors.push(`Rule #8: Question #${qNum} (MCQ) has duplicate options.`);
        }
        q.options.forEach((opt, optIdx) => {
          const strOpt = String(opt || '');
          if (/[()[\]{}]/.test(strOpt)) {
            const letter = String.fromCharCode(65 + optIdx);
            bracketViolations.push(`Q#${qNum} Option ${letter}: "${strOpt}"`);
            errors.push(`Rule #6: Question #${qNum} option ${letter} contains brackets: "${strOpt}".`);
          }
        });
      }

      if (!Number.isInteger(q.correctIndex) || q.correctIndex < 0 || q.correctIndex >= (q.options?.length || 0)) {
        errors.push(`Rule #5: Question #${qNum} invalid correctIndex: ${q.correctIndex}.`);
      } else {
        if (q.correctIndex === 0) positionBalance.A++;
        if (q.correctIndex === 1) positionBalance.B++;
        if (q.correctIndex === 2) positionBalance.C++;
      }

      const qText = q.question || '';
      for (const pattern of ARITHMETIC_PATTERNS) {
        if (pattern.test(qText)) {
          arithmeticViolations.push(`Q#${qNum}: "${qText}"`);
          errors.push(`Rule #7: Question #${qNum} arithmetic problem: "${qText}".`);
          break;
        }
      }

      if (!q.explanation || q.explanation.trim().length === 0) {
        warnings.push(`Rule #13: Question #${qNum} (MCQ) missing explanation.`);
      }
    } else if (q.type === 'number') {
      numberCount++;
      if (typeof q.target !== 'number' || isNaN(q.target)) {
        errors.push(`Rule #11: Question #${qNum} target must be numeric, got: ${q.target}`);
      }
      const qText = q.question || '';
      for (const pattern of NUMBER_WORD_PROBLEM_PATTERNS) {
        if (pattern.test(qText)) {
          numberProblemViolations.push(`Q#${qNum}: "${qText}"`);
          errors.push(`Rule #10: Question #${qNum} word problem: "${qText}".`);
          break;
        }
      }
      if (!q.explanation || q.explanation.trim().length === 0) {
        warnings.push(`Rule #13: Question #${qNum} (Number) missing explanation.`);
      }
    }
  });

  const expectedMCQ = expectedCycles * 5;
  const expectedNum = expectedCycles * 1;
  if (mcqCount !== expectedMCQ || numberCount !== expectedNum) {
    errors.push(`Rule #2: Distribution ${mcqCount} MCQ / ${numberCount} Number (expected ${expectedMCQ}/${expectedNum}).`);
  }

  const minExpected = Math.floor(mcqCount * 0.18);
  const maxExpected = Math.ceil(mcqCount * 0.50);
  if (positionBalance.A < minExpected || positionBalance.A > maxExpected ||
      positionBalance.B < minExpected || positionBalance.B > maxExpected ||
      positionBalance.C < minExpected || positionBalance.C > maxExpected) {
    warnings.push(`Rule #9: Answer skew (A: ${positionBalance.A}, B: ${positionBalance.B}, C: ${positionBalance.C}).`);
  }

  return {
    id: dataset.id,
    isValid: errors.length === 0,
    errors,
    warnings,
    bracketViolations,
    arithmeticViolations,
    numberProblemViolations,
    positionBalance,
    totalQuestions,
    mcqCount,
    numberCount,
  };
}

module.exports = { validateDataset };

if (require.main === module) {
  const targetDir = process.argv[2];
  if (targetDir) {
    const jsonPath = targetDir.endsWith('.json') ? targetDir : path.join(targetDir, 'dataset.json');
    const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    const res = validateDataset(data, 10);
    console.log(JSON.stringify(res, null, 2));
    process.exit(res.isValid ? 0 : 1);
  }

  const dirs = fs.readdirSync('quizzes').filter(f => fs.statSync(path.join('quizzes', f)).isDirectory());
  let passCount = 0;
  let failCount = 0;
  for (const dir of dirs) {
    const jsonPath = path.join('quizzes', dir, 'dataset.json');
    if (fs.existsSync(jsonPath)) {
      const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
      const res = validateDataset(data, 10);
      if (res.isValid) {
        passCount++;
        console.log(`[PASS] ${dir} (A:${res.positionBalance.A} B:${res.positionBalance.B} C:${res.positionBalance.C})`);
      } else {
        failCount++;
        console.log(`[FAIL] ${dir}:`, res.errors);
      }
    }
  }
  console.log(`\nTotal: ${passCount} passed, ${failCount} failed out of ${dirs.length} existing folders.`);
}
