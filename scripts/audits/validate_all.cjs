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

function validateDataset(dataset, id) {
  const errors = [];
  const warnings = [];
  const questions = dataset.questions || [];

  if (!dataset.id) errors.push(`Missing dataset.id`);
  if (!dataset.title) errors.push(`Missing dataset.title`);
  if (!dataset.theme) errors.push(`Missing dataset.theme`);
  if (!dataset.description) errors.push(`Missing dataset.description`);
  if (questions.length !== 60) {
    errors.push(`Total questions: ${questions.length} (expected 60)`);
  }

  let mcqCount = 0;
  let numberCount = 0;
  const balance = { 0: 0, 1: 0, 2: 0 };
  const seenQuestions = new Set();

  questions.forEach((q, idx) => {
    const qNum = idx + 1;
    const cyclePos = idx % 6; // 0..4 mcq, 5 number

    if (!q.question || q.question.trim().length === 0) {
      errors.push(`Q#${qNum}: Empty question text`);
    }

    const norm = (q.question || '').trim().toLowerCase();
    if (seenQuestions.has(norm)) {
      errors.push(`Q#${qNum}: Duplicate question "${norm}"`);
    }
    seenQuestions.add(norm);

    if (cyclePos < 5) {
      if (q.type !== 'mcq') {
        errors.push(`Q#${qNum}: Expected 'mcq' at cycle slot ${cyclePos + 1}, got '${q.type}'`);
      } else {
        mcqCount++;
        if (!Array.isArray(q.options) || ![2, 3].includes(q.options.length)) {
          errors.push(`Q#${qNum}: Expected 2 or 3 options, got ${q.options ? q.options.length : 0}`);
        } else {
          const uniqueOpts = new Set(q.options.map(o => String(o).trim().toLowerCase()));
          if (uniqueOpts.size !== q.options.length) {
            errors.push(`Q#${qNum}: Duplicate option text in options: ${JSON.stringify(q.options)}`);
          }

          q.options.forEach((opt, oIdx) => {
            const str = String(opt || '');
            if (/[()[\]{}]/.test(str)) {
              errors.push(`Q#${qNum} Option ${String.fromCharCode(65 + oIdx)} contains forbidden brackets: "${str}"`);
            }
          });
        }

        if (!Number.isInteger(q.correctIndex) || q.correctIndex < 0 || q.correctIndex >= (q.options?.length || 0)) {
          errors.push(`Q#${qNum}: Invalid correctIndex: ${q.correctIndex}`);
        } else {
          balance[q.correctIndex]++;
        }

        for (const pattern of ARITHMETIC_PATTERNS) {
          if (pattern.test(q.question || '')) {
            errors.push(`Q#${qNum}: Arithmetic/calculation pattern matched in MCQ question: "${q.question}"`);
            break;
          }
        }

        if (!q.explanation || q.explanation.trim().length === 0) {
          errors.push(`Q#${qNum}: Missing explanation`);
        }
      }
    } else {
      if (q.type !== 'number') {
        errors.push(`Q#${qNum}: Expected 'number' at cycle slot 6, got '${q.type}'`);
      } else {
        numberCount++;
        if (typeof q.target !== 'number' || isNaN(q.target)) {
          errors.push(`Q#${qNum}: Invalid target number: ${q.target}`);
        }

        if (!q.metricUnit || q.metricUnit.trim().length === 0) {
          errors.push(`Q#${qNum}: Missing metricUnit for number question`);
        }

        for (const pattern of NUMBER_WORD_PROBLEM_PATTERNS) {
          if (pattern.test(q.question || '')) {
            errors.push(`Q#${qNum}: Number word problem calculation pattern matched: "${q.question}"`);
            break;
          }
        }

        if (!q.explanation || q.explanation.trim().length === 0) {
          errors.push(`Q#${qNum}: Missing explanation`);
        }
      }
    }
  });

  if (mcqCount !== 50 || numberCount !== 10) {
    errors.push(`Question breakdown: ${mcqCount} MCQ, ${numberCount} Number (expected 50 MCQ and 10 Number)`);
  }

  const minBalance = Math.floor(mcqCount * 0.18); // 9
  const maxBalance = Math.ceil(mcqCount * 0.50); // 25
  if (balance[0] < minBalance || balance[0] > maxBalance ||
      balance[1] < minBalance || balance[1] > maxBalance ||
      balance[2] < minBalance || balance[2] > maxBalance) {
    warnings.push(`Answer distribution skewed: A=${balance[0]}, B=${balance[1]}, C=${balance[2]}`);
  }

  return {
    id: id || dataset.id,
    isValid: errors.length === 0,
    errors,
    warnings,
    mcqCount,
    numberCount,
    balance: `A: ${balance[0]}, B: ${balance[1]}, C: ${balance[2]}`
  };
}

const targetIds = process.argv.slice(2);
const quizzesDir = path.join(__dirname, '..', '..', 'quizzes');
let checkDirs = targetIds.length > 0 ? targetIds : fs.readdirSync(quizzesDir).filter(f => fs.statSync(path.join(quizzesDir, f)).isDirectory());

console.log(`=== VALIDATING ${checkDirs.length} QUIZZES ===\n`);
let passCount = 0;
let failCount = 0;

checkDirs.forEach(dirName => {
  const filePath = path.join(quizzesDir, dirName, 'dataset.json');
  if (!fs.existsSync(filePath)) {
    console.log(`❌ [${dirName}] Missing dataset.json`);
    failCount++;
    return;
  }

  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const parsed = JSON.parse(raw);
    const result = validateDataset(parsed, dirName);

    if (result.isValid) {
      console.log(`✅ [${dirName}] PASS (60Q: 50 MCQ / 10 Num | Balance: ${result.balance})`);
      if (result.warnings.length > 0) {
        result.warnings.forEach(w => console.log(`   ⚠️ Warning: ${w}`));
      }
      passCount++;
    } else {
      console.log(`❌ [${dirName}] FAIL with ${result.errors.length} errors:`);
      result.errors.forEach(e => console.log(`   - ${e}`));
      failCount++;
    }
  } catch (err) {
    console.log(`❌ [${dirName}] JSON Parse / Read Error: ${err.message}`);
    failCount++;
  }
});

console.log(`\nSummary: ${passCount} PASSED, ${failCount} FAILED out of ${checkDirs.length}`);
if (failCount > 0) process.exit(1);
