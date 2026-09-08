import fs from 'fs';
import path from 'path';
import { validateQuizDataset } from '../../src/lib/validator';

const assignedQuizIds = [
  'ancient-china-dynasties-60',
  'feudal-japan-samurai-60',
  'ancient-americas-maya-inca-aztec-60',
  'medieval-europe-knights-castles-60',
  'american-revolution-founding-60',
  'american-civil-war-60',
  'cold-war-space-race-espionage-60',
  'age-of-discovery-explorers-60',
  'industrial-revolution-steam-steel-60',
  'napoleonic-wars-empire-60'
];

console.log('===============================================================');
console.log('DETAILED VERIFICATION FOR 10 ASSIGNED QUIZZES');
console.log('===============================================================\n');

let allPassed = true;

for (let i = 0; i < assignedQuizIds.length; i++) {
  const quizId = assignedQuizIds[i];
  const filePath = path.join(process.cwd(), 'quizzes', quizId, 'dataset.json');

  console.log(`[${i + 1}/10] Checking ${quizId}...`);
  if (!fs.existsSync(filePath)) {
    console.error(`  ❌ FILE NOT FOUND: ${filePath}`);
    allPassed = false;
    continue;
  }

  const raw = fs.readFileSync(filePath, 'utf8');
  let data: any;
  try {
    data = JSON.parse(raw);
  } catch (err: any) {
    console.error(`  ❌ JSON PARSE ERROR: ${err.message}`);
    allPassed = false;
    continue;
  }

  // Schema checks
  if (data.id !== quizId) {
    console.error(`  ❌ ID MISMATCH: expected ${quizId}, got ${data.id}`);
    allPassed = false;
  }
  if (!data.theme || !data.title || !data.description || !data.category) {
    console.error(`  ❌ MISSING TOP-LEVEL METADATA`);
    allPassed = false;
  }
  if (!Array.isArray(data.questions) || data.questions.length !== 60) {
    console.error(`  ❌ QUESTIONS COUNT: ${data.questions?.length} (expected 60)`);
    allPassed = false;
  }

  // Validator report
  const report = validateQuizDataset(data.questions, 10);
  if (!report.isValid) {
    console.error(`  ❌ VALIDATOR FAILED:`, report.errors);
    allPassed = false;
  } else {
    console.log(`  ✅ 15/15 Rules Passed`);
    console.log(`     - Theme: "${data.theme}"`);
    console.log(`     - Category: "${data.category}"`);
    console.log(`     - Structure: ${report.mcqCount} MCQs + ${report.numberCount} Number Estimates in 10 cycles`);
    console.log(`     - Answer Distribution: A=${report.positionBalance.A}, B=${report.positionBalance.B}, C=${report.positionBalance.C}`);
    console.log(`     - Bracket Violations: ${report.bracketViolations.length}`);
    console.log(`     - Arithmetic Violations: ${report.arithmeticViolations.length}`);
  }

  // Check every question for non-empty explanation and clean options
  data.questions.forEach((q: any, qIdx: number) => {
    if (!q.explanation || q.explanation.trim().length < 10) {
      console.error(`  ❌ Q#${qIdx + 1} has poor explanation: "${q.explanation}"`);
      allPassed = false;
    }
    if (q.type === 'mcq') {
      if (![2, 3].includes(q.options.length)) {
        console.error(`  ❌ Q#${qIdx + 1} options length is ${q.options.length}`);
        allPassed = false;
      }
      for (const opt of q.options) {
        if (/[()[\]{}]/.test(opt)) {
          console.error(`  ❌ Q#${qIdx + 1} bracket in option: "${opt}"`);
          allPassed = false;
        }
      }
    } else if (q.type === 'number') {
      if (typeof q.target !== 'number' || isNaN(q.target)) {
        console.error(`  ❌ Q#${qIdx + 1} invalid target: ${q.target}`);
        allPassed = false;
      }
      if (!q.metricUnit) {
        console.error(`  ❌ Q#${qIdx + 1} missing metricUnit`);
        allPassed = false;
      }
    }
  });

  console.log('');
}

if (allPassed) {
  console.log('🎉 ALL 10 ASSIGNED QUIZZES FULLY VERIFIED AND PASSING 100% OF CHECKS!');
} else {
  console.error('⚠️ SOME CHECKS FAILED. PLEASE REVIEW LOGS ABOVE.');
  process.exit(1);
}
