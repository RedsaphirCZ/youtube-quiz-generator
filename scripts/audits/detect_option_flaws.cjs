const fs = require('fs');
const path = require('path');

const quizzesDir = path.join(__dirname, '..', '..', 'quizzes');
const dirs = fs.readdirSync(quizzesDir).filter(d => fs.statSync(path.join(quizzesDir, d)).isDirectory()).sort();

let obviousQuestions = [];

dirs.forEach(d => {
  const p = path.join(quizzesDir, d, 'dataset.json');
  if (!fs.existsSync(p)) return;
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));

  data.questions.forEach((q, idx) => {
    if (q.type === 'mcq') {
      const qNum = idx + 1;
      const opts = q.options;
      const correctIdx = q.correctIndex;
      const correctOpt = opts[correctIdx];

      const lengths = opts.map(o => o.length);
      const wordCounts = opts.map(o => o.trim().split(/\s+/).length);

      const maxLen = Math.max(...lengths);
      const minLen = Math.min(...lengths);
      const maxWords = Math.max(...wordCounts);
      const minWords = Math.min(...wordCounts);

      const correctLen = lengths[correctIdx];
      const correctWords = wordCounts[correctIdx];

      const distractorLengths = lengths.filter((_, i) => i !== correctIdx);
      const distractorWords = wordCounts.filter((_, i) => i !== correctIdx);
      const avgDistractorLen = (distractorLengths[0] + distractorLengths[1]) / 2;
      const avgDistractorWords = (distractorWords[0] + distractorWords[1]) / 2;

      let reasons = [];

      // 1. Correct option is dramatically longer than distractors (length ratio > 2.2 and difference > 15 chars)
      if (correctLen > avgDistractorLen * 2.0 && correctLen - avgDistractorLen >= 15) {
        reasons.push(`Length giveaway: Correct is ${correctLen} chars (${correctWords} words), distractors avg ${avgDistractorLen.toFixed(1)} chars (${avgDistractorWords.toFixed(1)} words)`);
      }

      // 2. Correct option is dramatically shorter than distractors
      if (correctLen < avgDistractorLen * 0.4 && avgDistractorLen - correctLen >= 15) {
        reasons.push(`Shortness giveaway: Correct is ${correctLen} chars, distractors avg ${avgDistractorLen.toFixed(1)} chars`);
      }

      // 3. Word count asymmetry (e.g. correct is 8+ words, distractors are 1-2 words)
      if (correctWords >= 6 && avgDistractorWords <= 2.5) {
        reasons.push(`Word count giveaway: Correct has ${correctWords} words, distractors have ${avgDistractorWords.toFixed(1)} words`);
      }

      // 4. Clue repetition: Words in question directly in correct answer but in NO distractors (stem clue)
      const qWords = q.question.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(w => w.length > 5);
      const correctLower = correctOpt.toLowerCase();
      const distractorLowers = distractorLengths.map((_, i) => opts[i === 0 ? (correctIdx === 0 ? 1 : 0) : (correctIdx <= 1 ? 2 : 1)].toLowerCase());

      if (reasons.length > 0) {
        obviousQuestions.push({
          pack: d,
          qNum,
          question: q.question,
          options: opts,
          correctIndex: correctIdx,
          correctOpt,
          reasons
        });
      }
    }
  });
});

console.log(`Total MCQs with obvious option design flaws: ${obviousQuestions.length}`);
console.log('\n--- Sample Flawed Questions ---');
obviousQuestions.slice(0, 15).forEach((item, i) => {
  console.log(`\n[${i + 1}] Pack: ${item.pack} (Q#${item.qNum})`);
  console.log(`Question: ${item.question}`);
  console.log(`Options:`);
  item.options.forEach((opt, oIdx) => {
    const mark = oIdx === item.correctIndex ? ' (CORRECT)' : '';
    console.log(`  [${String.fromCharCode(65 + oIdx)}] ${opt}${mark} (${opt.length} chars, ${opt.split(' ').length} words)`);
  });
  console.log(`Reason: ${item.reasons.join(' | ')}`);
});
