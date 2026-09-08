const fs = require('fs');
const path = require('path');

const quizzesDir = path.join(__dirname, '..', '..', 'quizzes');
const dirs = fs.readdirSync(quizzesDir).filter(f => fs.statSync(path.join(quizzesDir, f)).isDirectory());

console.log(`Found ${dirs.length} quiz directories in quizzes/:`);
dirs.forEach(d => {
  const datasetPath = path.join(quizzesDir, d, 'dataset.json');
  if (fs.existsSync(datasetPath)) {
    try {
      const data = JSON.parse(fs.readFileSync(datasetPath, 'utf8'));
      console.log(`- ${d}: ${data.questions ? data.questions.length : 0} questions, Title: "${data.title}"`);
    } catch (e) {
      console.log(`- ${d}: ERROR parsing dataset.json (${e.message})`);
    }
  } else {
    console.log(`- ${d}: NO dataset.json`);
  }
});
