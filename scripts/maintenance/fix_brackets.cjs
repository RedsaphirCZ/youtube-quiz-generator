const fs = require('fs');
const path = require('path');

const quizzesDir = path.join(__dirname, '..', '..', 'quizzes');
const dirs = fs.readdirSync(quizzesDir).filter(d => fs.statSync(path.join(quizzesDir, d)).isDirectory());

const bracketClean = {
  "O(N)": "Linear Time O-N",
  "O(N log N)": "Log-Linear Time O-N-log-N",
  "Peka (Under the Bell)": "Peka",
  "Dyrehavsbakken (Bakken)": "Dyrehavsbakken",
  "Danish Pastry (Wienerbrød)": "Danish Pastry",
  "Avanto (Ice Swimming)": "Avanto",
  "The Monastery (Ad Deir)": "The Monastery",
  "The Maasai Jumping Dance (Adumu)": "The Maasai Jumping Dance",
  "Cuban Trogon (Tocororo)": "Cuban Trogon",
  "The Cravat (Necktie)": "The Cravat"
};

dirs.forEach(d => {
  const p = path.join(quizzesDir, d, 'dataset.json');
  if (!fs.existsSync(p)) return;
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));

  data.questions.forEach(q => {
    if (q.type === 'mcq') {
      q.options = q.options.map(opt => {
        if (bracketClean[opt]) return bracketClean[opt];
        // Strip any remaining brackets in options
        if (/[()[\]{}]/.test(opt)) {
          return opt.replace(/[()[\]{}]/g, '').trim();
        }
        return opt;
      });
    }
  });

  fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf8');
});

console.log('Fixed all bracket violations in options.');
