const fs = require('fs');
const path = require('path');

const quizzesDir = path.join(__dirname, '..', '..', 'quizzes');
const dirs = fs.readdirSync(quizzesDir).filter(d => fs.statSync(path.join(quizzesDir, d)).isDirectory()).sort();

let problematicOptions = [];

dirs.forEach(d => {
  const p = path.join(quizzesDir, d, 'dataset.json');
  if (!fs.existsSync(p)) return;
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));

  data.questions.forEach((q, idx) => {
    if (q.type === 'mcq') {
      const qNum = idx + 1;
      q.options.forEach((opt, oIdx) => {
        // Check for dangling prepositions/conjunctions or very short fragments
        if (/\b(and|or|by|of|the|all|in|to|with|for|at|on|a|an)$/i.test(opt.trim())) {
          problematicOptions.push({ pack: d, qNum, optIdx: oIdx, opt });
        }
        if (opt.trim().length < 3) {
          problematicOptions.push({ pack: d, qNum, optIdx: oIdx, opt, reason: 'Too short' });
        }
      });
    }
  });
});

console.log(`Found ${problematicOptions.length} dangling options:`);
console.log(JSON.stringify(problematicOptions, null, 2));
