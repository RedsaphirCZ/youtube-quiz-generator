const fs = require('fs');
const path = require('path');

const quizzesDir = path.join(__dirname, '..', '..', 'quizzes');
const dirs = fs.readdirSync(quizzesDir).filter(d => fs.statSync(path.join(quizzesDir, d)).isDirectory()).sort();

let flawSummaryByPack = {};

dirs.forEach(d => {
  const p = path.join(quizzesDir, d, 'dataset.json');
  if (!fs.existsSync(p)) return;
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));

  let packFlaws = [];

  data.questions.forEach((q, idx) => {
    if (q.type === 'mcq') {
      const qNum = idx + 1;
      const opts = q.options;
      const correctIdx = q.correctIndex;
      const correctOpt = opts[correctIdx];

      const lengths = opts.map(o => o.length);
      const wordCounts = opts.map(o => o.trim().split(/\s+/).length);

      const correctLen = lengths[correctIdx];
      const correctWords = wordCounts[correctIdx];

      const distractorLengths = lengths.filter((_, i) => i !== correctIdx);
      const distractorWords = wordCounts.filter((_, i) => i !== correctIdx);
      const avgDistractorLen = (distractorLengths[0] + distractorLengths[1]) / 2;
      const avgDistractorWords = (distractorWords[0] + distractorWords[1]) / 2;

      // Check if correct answer is 1.8x longer than average distractor and >= 12 chars difference
      if (correctLen > avgDistractorLen * 1.8 && (correctLen - avgDistractorLen >= 12)) {
        packFlaws.push({ qNum, type: 'length_bias', correct: correctOpt, distractors: opts.filter((_, i) => i !== correctIdx) });
      }
      // Check for dual names (e.g. English + Spanish/French/German/etc)
      opts.forEach((opt, oIdx) => {
        // Words like "Falls Cataratas", "Cave Cueva", "Valley Valle", "Strait Estrecho", "Current Falkland", "Lake Lago"
        if (/\b(Falls|River|Lake|Mount|Mountain|Valley|Cave|Strait|Current|Bay|Peninsula|Ruins|Bridge|Castle|Cathedral|Palace|Church|Tower|Canal|Forest|Island|Islands|Park|Monument|National)\s+[A-ZÀ-ÿ][a-zÀ-ÿ]+\s+[A-ZÀ-ÿ][a-zÀ-ÿ]+/i.test(opt)) {
          // If not standard English (like "Great Barrier Reef", "New York City", etc.)
          if (opt.includes('del ') || opt.includes('de ') || opt.includes('la ') || opt.includes('el ') || opt.includes('von ') || opt.includes('du ') || opt.includes('di ') || opt.includes('da ')) {
            // Check if there is also an English prefix
            if (/\b(Falls|River|Lake|Mount|Mountain|Valley|Cave|Strait|Current|Bay|Peninsula|Ruins|Bridge|Castle|Cathedral|Palace|Church|Tower|Canal|Forest|Island|Islands|Park|Monument|National)\b/i.test(opt)) {
              packFlaws.push({ qNum, type: 'bilingual_concat', opt });
            }
          }
        }
      });
    }
  });

  if (packFlaws.length > 0) {
    flawSummaryByPack[d] = packFlaws;
  }
});

console.log(`Found issues in ${Object.keys(flawSummaryByPack).length} packs.`);
Object.keys(flawSummaryByPack).forEach(pack => {
  console.log(`- ${pack}: ${flawSummaryByPack[pack].length} flawed questions`);
});
