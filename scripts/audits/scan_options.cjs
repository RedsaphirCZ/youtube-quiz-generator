const fs = require('fs');
const path = require('path');

const quizzesDir = path.join(__dirname, '..', '..', 'quizzes');
const dirs = fs.readdirSync(quizzesDir).filter(d => fs.statSync(path.join(quizzesDir, d)).isDirectory()).sort();

let report = [];

dirs.forEach(d => {
  const p = path.join(quizzesDir, d, 'dataset.json');
  if (!fs.existsSync(p)) return;
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));

  data.questions.forEach((q, idx) => {
    const qNum = idx + 1;
    if (q.type === 'mcq') {
      q.options.forEach((opt, oIdx) => {
        let isFlagged = false;
        let reason = '';

        // Check for double names / concatenated aliases:
        // Examples: "Havana La Habana", "Dublin Baile Átha Cliath", "Newgrange Dún Fhgail"
        // Words after common entities
        const patterns = [
          /\b([A-Z][a-z]+)\s+\1\b/i, // Repeated words like "Grossglockner Grossglockner"
          /\b([A-Z][a-z]+)\s+([A-Z][a-z]+)\s+([A-Z][a-z]+)\s+\2/i, // "Santiago Santiago de Chile"
          /\b(Havana|Dublin|Kraków|Warsaw|Prague|Copenhagen|Madrid|Paris|Lisbon|Athens|Rome|Cairo|Bogotá|Lima|Santiago|Helsinki|Vienna|Zagreb|Manila|Seoul|Tokyo)\s+[A-Z][a-z]+/i,
          /\b(River|Lake|Mount|Mountain|Valley|Castle|Palace|Cathedral|Church|Bridge|Fortress|Tower|Canal|Park|Square|Island|Islands)\s+[A-ZÀ-ÿ][a-zÀ-ÿ]+\s+[A-ZÀ-ÿ][a-zÀ-ÿ]+/i,
        ];

        // Specific checks
        if (/\bO [A-Z]/.test(opt) || /\bHa penny\b/i.test(opt) || /\bHell Gate\b/i.test(opt) || /\bSt\.? James Gate\b/i.test(opt)) {
          isFlagged = true;
          reason = 'Missing apostrophe';
        } else if (opt.includes('  ')) {
          isFlagged = true;
          reason = 'Double spaces';
        }

        if (isFlagged) {
          report.push({ pack: d, qNum, optIdx: oIdx, opt, reason });
        }
      });
    }
  });
});

console.log(`Flagged items: ${report.length}`);
console.log(JSON.stringify(report, null, 2));
