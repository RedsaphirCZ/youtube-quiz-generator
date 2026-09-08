const fs = require('fs');
const path = require('path');

const quizzesDir = path.join(__dirname, '..', '..', 'quizzes');
const dirs = fs.readdirSync(quizzesDir).filter(d => fs.statSync(path.join(quizzesDir, d)).isDirectory());

console.log(`Inspecting ${dirs.length} quiz packages in detail...`);

let totalPacks = dirs.length;
let packsWithIssues = 0;
let issueDetails = [];

dirs.forEach(d => {
  const p = path.join(quizzesDir, d, 'dataset.json');
  if (!fs.existsSync(p)) return;
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));

  let packIssues = [];

  data.questions.forEach((q, idx) => {
    const qNum = idx + 1;
    if (q.type === 'mcq') {
      // 1. Check for double/concatenated names
      q.options.forEach((opt, oIdx) => {
        // e.g. 'Word Word LocalWord LocalWord'
        const parts = opt.split(' ');
        if (parts.length >= 2) {
          // Check for repeated words or known alias concatenation
          if (parts[0].toLowerCase() === parts[1].toLowerCase() && parts[0].length > 2) {
            packIssues.push({ qNum, type: 'repeated_word', opt });
          }
        }
        // Missing apostrophes
        if (/\bO [A-Z]/.test(opt) || /\bHa penny\b/i.test(opt) || /\bO Connell\b/i.test(opt) || /\bHell Gate\b/i.test(opt) || /\bSt\.? James Gate\b/i.test(opt)) {
          packIssues.push({ qNum, type: 'missing_apostrophe', opt });
        }
      });

      // 2. Check if explanation mentions correct answer or contradicts
      const correctOpt = q.options[q.correctIndex];
      if (!correctOpt) {
        packIssues.push({ qNum, type: 'missing_correct_opt' });
      }
    } else if (q.type === 'number') {
      // Check if target is NaN
      if (typeof q.target !== 'number' || isNaN(q.target)) {
        packIssues.push({ qNum, type: 'invalid_number_target', target: q.target });
      }
    }
  });

  if (packIssues.length > 0) {
    packsWithIssues++;
    issueDetails.push({ pack: d, issuesCount: packIssues.length, sample: packIssues.slice(0, 5) });
  }
});

console.log(`Packs with potential issues: ${packsWithIssues} / ${totalPacks}`);
console.log(JSON.stringify(issueDetails.slice(0, 20), null, 2));
