const fs = require('fs');
const path = require('path');

const quizzesDir = path.join(__dirname, '..', '..', 'quizzes');
const dirs = fs.readdirSync(quizzesDir).filter(d => fs.statSync(path.join(quizzesDir, d)).isDirectory());

console.log(`Auditing ${dirs.length} quiz packages...`);

let totalMCQs = 0;
let totalNumbers = 0;
let flaggedIssues = [];

dirs.forEach(dirName => {
  const datasetPath = path.join(quizzesDir, dirName, 'dataset.json');
  if (!fs.existsSync(datasetPath)) {
    flaggedIssues.push({ dir: dirName, issue: 'Missing dataset.json' });
    return;
  }

  let data;
  try {
    data = JSON.parse(fs.readFileSync(datasetPath, 'utf8'));
  } catch (err) {
    flaggedIssues.push({ dir: dirName, issue: `JSON parse error: ${err.message}` });
    return;
  }

  if (!data.questions || !Array.isArray(data.questions)) {
    flaggedIssues.push({ dir: dirName, issue: 'Missing questions array' });
    return;
  }

  data.questions.forEach((q, idx) => {
    const qNum = idx + 1;
    if (q.type === 'mcq') {
      totalMCQs++;
      // Check options count
      if (!q.options || ![2, 3].includes(q.options.length)) {
        flaggedIssues.push({ dir: dirName, qNum, issue: `Options count is ${q.options ? q.options.length : 0}` });
      } else {
        // Check for empty or duplicate options
        const optsLower = q.options.map(o => String(o).trim().toLowerCase());
        if (new Set(optsLower).size !== q.options.length) {
          flaggedIssues.push({ dir: dirName, qNum, issue: `Duplicate options: ${JSON.stringify(q.options)}` });
        }
        // Check for brackets in options
        q.options.forEach((opt, oIdx) => {
          if (/[()[\]{}]/.test(opt)) {
            flaggedIssues.push({ dir: dirName, qNum, issue: `Bracket in option ${oIdx}: "${opt}"` });
          }
        });
      }

      // Check valid correctIndex
      if (!Number.isInteger(q.correctIndex) || q.correctIndex < 0 || q.correctIndex >= (q.options?.length || 0)) {
        flaggedIssues.push({ dir: dirName, qNum, issue: `Invalid correctIndex: ${q.correctIndex}` });
      }

      // Check explanation exists
      if (!q.explanation || q.explanation.trim().length === 0) {
        flaggedIssues.push({ dir: dirName, qNum, issue: 'Missing explanation' });
      }
    } else if (q.type === 'number') {
      totalNumbers++;
      if (typeof q.target !== 'number' || isNaN(q.target)) {
        flaggedIssues.push({ dir: dirName, qNum, issue: `Invalid target: ${q.target}` });
      }
      if (!q.explanation || q.explanation.trim().length === 0) {
        flaggedIssues.push({ dir: dirName, qNum, issue: 'Missing explanation' });
      }
    } else {
      flaggedIssues.push({ dir: dirName, qNum, issue: `Unknown question type: ${q.type}` });
    }
  });
});

console.log(`Audit complete: Total MCQs: ${totalMCQs}, Total Number Questions: ${totalNumbers}`);
console.log(`Flagged structural issues: ${flaggedIssues.length}`);
if (flaggedIssues.length > 0) {
  console.log(flaggedIssues.slice(0, 20));
}
