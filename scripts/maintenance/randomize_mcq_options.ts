import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { curatedQuizzes } from '../../src/data/curatedQuizzes';
import { validateQuizDataset } from '../../src/lib/validator';
import { Question, MCQQuestion } from '../../src/types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function generateRandomizedBalancedAnswers(count: number, seedStr: string): (0 | 1 | 2)[] {
  const pool: (0 | 1 | 2)[] = [];
  const baseCount = Math.floor(count / 3);
  const rem = count % 3;
  for (let i = 0; i < baseCount + (rem > 0 ? 1 : 0); i++) pool.push(0);
  for (let i = 0; i < baseCount + (rem > 1 ? 1 : 0); i++) pool.push(1);
  for (let i = 0; i < baseCount; i++) pool.push(2);

  let seed = 0;
  for (let i = 0; i < seedStr.length; i++) {
    seed = (seed * 31 + seedStr.charCodeAt(i)) >>> 0;
  }
  function random() {
    seed = (seed + 0x6D2B79F5) >>> 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  for (let i = 2; i < pool.length; i++) {
    if (pool[i] === pool[i - 1] && pool[i] === pool[i - 2]) {
      for (let k = i + 1; k < pool.length; k++) {
        if (pool[k] !== pool[i]) {
          [pool[i], pool[k]] = [pool[k], pool[i]];
          break;
        }
      }
    }
  }

  return pool;
}

console.log('Randomizing MCQ option order for all curated quizzes...');

let randomizedCount = 0;

for (const quiz of curatedQuizzes) {
  const mcqQuestions = quiz.questions.filter((q): q is MCQQuestion => q.type === 'mcq');
  const targetSlots = generateRandomizedBalancedAnswers(mcqQuestions.length, quiz.id || quiz.title);

  let mcqIdx = 0;
  for (let i = 0; i < quiz.questions.length; i++) {
    const q = quiz.questions[i];
    if (q.type === 'mcq') {
      const oldCorrectIdx = q.correctIndex;
      const correctText = q.options[oldCorrectIdx];
      const newCorrectIdx = targetSlots[mcqIdx];
      mcqIdx++;

      if (oldCorrectIdx !== newCorrectIdx) {
        const newOptions = [...q.options] as [string, string, string];
        const temp = newOptions[newCorrectIdx];
        newOptions[newCorrectIdx] = correctText;
        newOptions[oldCorrectIdx] = temp;
        q.options = newOptions;
        q.correctIndex = newCorrectIdx;
      }
    }
  }

  const report = validateQuizDataset(quiz.questions);
  if (!report.isValid) {
    console.error('Validation error after randomization on quiz:', quiz.title, report.errors);
  }
  randomizedCount++;
}

console.log('Successfully randomized ' + randomizedCount + ' quizzes.');

// Write back to curatedQuizzes.ts
const targetFilePath = path.join(__dirname, '..', '..', 'src', 'data', 'curatedQuizzes.ts');
const fileHeader = 'import { QuizDataset } from \'../types\';\n\nexport const curatedQuizzes: QuizDataset[] = ';
const fileContent = fileHeader + JSON.stringify(curatedQuizzes, null, 2) + ';\n';

fs.writeFileSync(targetFilePath, fileContent, 'utf-8');
console.log('Saved randomized datasets to ' + targetFilePath);
