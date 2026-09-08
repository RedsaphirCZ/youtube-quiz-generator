import fs from 'fs';
import path from 'path';
import { validateQuizDataset } from '../../src/lib/validator';
import { QuizDataset } from '../../src/types';

import { ancientChinaQuiz } from '../quizzes/ancientChina';
import { feudalJapanQuiz } from '../quizzes/feudalJapan';
import { ancientAmericasQuiz } from '../quizzes/ancientAmericas';
import { medievalEuropeQuiz } from '../quizzes/medievalEurope';
import { americanRevolutionQuiz } from '../quizzes/americanRevolution';
import { americanCivilWarQuiz } from '../quizzes/americanCivilWar';
import { coldWarQuiz } from '../quizzes/coldWar';
import { ageOfDiscoveryQuiz } from '../quizzes/ageOfDiscovery';
import { industrialRevolutionQuiz } from '../quizzes/industrialRevolution';
import { napoleonicWarsQuiz } from '../quizzes/napoleonicWars';

const newQuizzes: QuizDataset[] = [
  ancientChinaQuiz,
  feudalJapanQuiz,
  ancientAmericasQuiz,
  medievalEuropeQuiz,
  americanRevolutionQuiz,
  americanCivilWarQuiz,
  coldWarQuiz,
  ageOfDiscoveryQuiz,
  industrialRevolutionQuiz,
  napoleonicWarsQuiz
];

console.log(`\n======================================================`);
console.log(`VALIDATING AND WRITING ${newQuizzes.length} NEW QUIZ DATASETS`);
console.log(`======================================================\n`);

let totalPassed = 0;
let totalFailed = 0;

for (const quiz of newQuizzes) {
  const dir = path.join(process.cwd(), 'quizzes', quiz.id);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const report = validateQuizDataset(quiz.questions, 10);
  console.log(`▶ Validating [${quiz.id}]:`);
  console.log(`  - Theme: "${quiz.theme}"`);
  console.log(`  - Total Questions: ${report.totalQuestions} (MCQ: ${report.mcqCount}, Number: ${report.numberCount})`);
  console.log(`  - Positions: A=${report.positionBalance.A}, B=${report.positionBalance.B}, C=${report.positionBalance.C}`);
  console.log(`  - Pattern Strict: ${report.isPatternStrict}`);
  console.log(`  - Bracket Violations: ${report.bracketViolations.length}`);
  console.log(`  - Arithmetic Violations: ${report.arithmeticViolations.length}`);
  console.log(`  - Status: ${report.isValid ? '✅ PASS (15/15 Rules Satisfied)' : '❌ FAIL'}`);

  if (!report.isValid) {
    totalFailed++;
    console.error(`  Errors:`, report.errors);
    console.error(`  Bracket Violations:`, report.bracketViolations);
  } else {
    totalPassed++;
    const targetFile = path.join(dir, 'dataset.json');
    fs.writeFileSync(targetFile, JSON.stringify(quiz, null, 2), 'utf8');
    console.log(`  💾 Written successfully to: quizzes/${quiz.id}/dataset.json`);
  }
  console.log('');
}

console.log(`------------------------------------------------------`);
console.log(`SUMMARY: ${totalPassed}/${newQuizzes.length} Passed Validation`);
console.log(`------------------------------------------------------\n`);

// Update catalog.json
const catalogPath = path.join(process.cwd(), 'quizzes', 'catalog.json');
const quizDirs = fs.readdirSync(path.join(process.cwd(), 'quizzes')).filter(f => {
  const p = path.join(process.cwd(), 'quizzes', f);
  return fs.statSync(p).isDirectory() && fs.existsSync(path.join(p, 'dataset.json'));
});

const fullCatalog = quizDirs.map(dir => {
  const datasetPath = path.join(process.cwd(), 'quizzes', dir, 'dataset.json');
  const data = JSON.parse(fs.readFileSync(datasetPath, 'utf8'));
  return {
    id: data.id,
    theme: data.theme || data.title,
    title: data.title || data.theme,
    description: data.description || '',
    category: data.category || 'General Knowledge',
    difficulty: data.difficulty || 'moderate',
    questionCount: data.questions.length,
    mcqCount: data.questions.filter((q: any) => q.type === 'mcq').length,
    numberCount: data.questions.filter((q: any) => q.type === 'number').length,
    folderPath: `quizzes/${data.id}`
  };
});

fs.writeFileSync(catalogPath, JSON.stringify(fullCatalog, null, 2), 'utf8');
console.log(`✅ Updated quizzes/catalog.json with ${fullCatalog.length} catalog items.`);

// Update src/data/curatedQuizzes.ts
const allDatasets = quizDirs.map(dir => {
  const datasetPath = path.join(process.cwd(), 'quizzes', dir, 'dataset.json');
  return JSON.parse(fs.readFileSync(datasetPath, 'utf8'));
});

const curatedQuizzesTSContent = `import { QuizDataset } from '../types';

export const curatedQuizzes: QuizDataset[] = ${JSON.stringify(allDatasets, null, 2)};
`;

fs.writeFileSync(path.join(process.cwd(), 'src', 'data', 'curatedQuizzes.ts'), curatedQuizzesTSContent, 'utf8');
console.log(`✅ Updated src/data/curatedQuizzes.ts with ${allDatasets.length} full quiz datasets.`);

if (totalFailed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
