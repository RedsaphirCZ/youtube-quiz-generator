const fs = require('fs');
const path = require('path');

const quizzesDir = path.join(__dirname, '..', '..', 'quizzes');
const dirs = fs.readdirSync(quizzesDir).filter(d => fs.statSync(path.join(quizzesDir, d)).isDirectory()).sort();

let doubleNameCandidates = [];

dirs.forEach(d => {
  const p = path.join(quizzesDir, d, 'dataset.json');
  if (!fs.existsSync(p)) return;
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));

  data.questions.forEach((q, idx) => {
    const qNum = idx + 1;
    if (q.type === 'mcq') {
      q.options.forEach((opt, oIdx) => {
        // Pattern: Contains two capital words followed by non-standard English name, e.g. "Mount Fuji Fuji-san", "Rio de Janeiro Cidade Maravilhosa"
        // Let's check for words like:
        const words = opt.split(' ');
        if (words.length >= 2) {
          // If option has duplicate base words
          for (let i = 0; i < words.length - 1; i++) {
            if (words[i].length > 3 && words[i+1].toLowerCase().startsWith(words[i].toLowerCase())) {
              doubleNameCandidates.push({ pack: d, qNum, opt, isCorrect: oIdx === q.correctIndex });
            }
          }
        }
      });
    }
  });
});

console.log(`Found ${doubleNameCandidates.length} candidate double-named options in other packs:`);
console.log(JSON.stringify(doubleNameCandidates, null, 2));
