const fs = require('fs');
const path = require('path');

const targetPacks = [
  'colombia-geography-heritage-60',
  'argentina-geography-heritage-60',
  'chile-geography-heritage-60',
  'brazil-geography-heritage-60',
  'peru-geography-heritage-60',
  'mexico-geography-heritage-60',
  'portugal-geography-heritage-60',
  'spain-geography-heritage-60',
  'austria-geography-heritage-60',
  'switzerland-geography-heritage-60',
  'germany-geography-heritage-60',
  'norway-geography-heritage-60',
  'sweden-geography-heritage-60',
  'thailand-geography-heritage-60',
  'south-korea-geography-heritage-60',
  'vietnam-geography-heritage-60',
  'indonesia-geography-heritage-60',
  'morocco-geography-heritage-60',
  'mammals-world-wildlife-60',
  'ocean-deep-sea-60',
  'plant-kingdom-botany-trees-60'
];

targetPacks.forEach(packName => {
  const p = path.join(__dirname, '..', '..', 'quizzes', packName, 'dataset.json');
  if (!fs.existsSync(p)) return;
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));

  console.log(`\n========================================`);
  console.log(`PACK: ${packName}`);
  console.log(`========================================`);

  data.questions.forEach((q, idx) => {
    if (q.type === 'mcq') {
      const qNum = idx + 1;
      const opts = q.options;
      const cIdx = q.correctIndex;
      const cLen = opts[cIdx].length;
      const distLens = opts.filter((_, i) => i !== cIdx).map(o => o.length);
      const avgDist = (distLens[0] + distLens[1]) / 2;

      // Check for dual names or major length asymmetry
      const hasDual = opts.some(o => /\b(del |de |la |el |von |du |di |da |al-|el-)/i.test(o) && /\b(River|Lake|Mount|Mountain|Valley|Cave|Strait|Current|Bay|Peninsula|Ruins|Bridge|Castle|Cathedral|Palace|Church|Tower|Canal|Forest|Island|Islands|Park|Monument|National|Falls)\b/i.test(o));
      const hasLenBias = cLen > avgDist * 1.8 && (cLen - avgDist >= 12);

      if (hasDual || hasLenBias) {
        console.log(`\n[Q#${qNum}] ${q.question}`);
        opts.forEach((opt, oIdx) => {
          const mark = oIdx === cIdx ? ' (CORRECT)' : '';
          console.log(`  [${String.fromCharCode(65 + oIdx)}] ${opt}${mark}`);
        });
      }
    }
  });
});
