const fs = require('fs');
const path = require('path');

const quizzesDir = path.join(__dirname, '..', '..', 'quizzes');
const quizDirs = fs.readdirSync(quizzesDir).filter(f => {
  const p = path.join(quizzesDir, f);
  return fs.statSync(p).isDirectory() && fs.existsSync(path.join(p, 'dataset.json'));
}).sort();

const fullCatalog = [];
const allDatasets = [];

for (const dir of quizDirs) {
  const datasetPath = path.join(quizzesDir, dir, 'dataset.json');
  const data = JSON.parse(fs.readFileSync(datasetPath, 'utf8'));
  const mcqs = data.questions.filter(q => q.type === 'mcq');
  const nums = data.questions.filter(q => q.type === 'number');

  fullCatalog.push({
    id: data.id || dir,
    theme: data.theme || data.title || dir,
    title: data.title || data.theme || dir,
    description: data.description || '',
    category: data.category || 'General Knowledge',
    difficulty: data.difficulty || 'moderate',
    questionCount: data.questions.length,
    mcqCount: mcqs.length,
    numberCount: nums.length,
    folderPath: 'quizzes/' + (data.id || dir)
  });

  allDatasets.push(data);
}

// Write catalog.json
const catalogPath = path.join(quizzesDir, 'catalog.json');
fs.writeFileSync(catalogPath, JSON.stringify(fullCatalog, null, 2), 'utf8');
console.log(`✅ Updated quizzes/catalog.json with ${fullCatalog.length} catalog items.`);

// Write src/data/curatedQuizzes.ts
const tsPath = path.join(__dirname, '..', '..', 'src', 'data', 'curatedQuizzes.ts');
const tsContent = `import { QuizDataset } from '../types';

export const curatedQuizzes: QuizDataset[] = ${JSON.stringify(allDatasets, null, 2)};
`;
fs.writeFileSync(tsPath, tsContent, 'utf8');
console.log(`✅ Updated src/data/curatedQuizzes.ts with ${allDatasets.length} full quiz datasets.`);
