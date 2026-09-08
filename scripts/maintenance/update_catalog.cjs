const fs = require('fs');
const path = require('path');

const catalogPath = path.join(__dirname, '..', '..', 'quizzes', 'catalog.json');
const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
const catalogMap = new Map(catalog.map(c => [c.id, c]));

const quizzesDir = path.join(__dirname, '..', '..', 'quizzes');
const dirs = fs.readdirSync(quizzesDir).filter(d => {
  const dsPath = path.join(quizzesDir, d, 'dataset.json');
  return fs.existsSync(dsPath);
}).sort();

const updatedCatalog = [];

for (const dir of dirs) {
  const dataPath = path.join(quizzesDir, dir, 'dataset.json');
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const mcqCount = data.questions.filter(q => q.type === 'mcq').length;
  const numberCount = data.questions.filter(q => q.type === 'number').length;
  
  if (catalogMap.has(dir)) {
    const existing = catalogMap.get(dir);
    updatedCatalog.push({
      ...existing,
      theme: data.theme || existing.theme,
      title: data.title || existing.title,
      description: data.description || existing.description,
      category: data.category || existing.category || 'General Knowledge',
      questionCount: data.questions.length,
      mcqCount: mcqCount,
      numberCount: numberCount,
      folderPath: 'quizzes/' + dir
    });
  } else {
    updatedCatalog.push({
      id: data.id || dir,
      theme: data.theme || dir,
      title: data.title || data.theme || dir,
      description: data.description || '',
      category: data.category || 'Sports, Records & General Knowledge',
      difficulty: data.difficulty || 'moderate',
      questionCount: data.questions.length,
      mcqCount: mcqCount,
      numberCount: numberCount,
      folderPath: 'quizzes/' + dir
    });
  }
}

fs.writeFileSync(catalogPath, JSON.stringify(updatedCatalog, null, 2), 'utf8');
console.log('Updated catalog.json successfully. Total entries:', updatedCatalog.length);
