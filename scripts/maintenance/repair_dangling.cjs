const fs = require('fs');
const path = require('path');

const quizzesDir = path.join(__dirname, '..', '..', 'quizzes');

const fixes = [
  { pack: 'african-geography-safari-60', q: 40, optIdx: 1, val: 'Fish River Canyon' },
  { pack: 'african-geography-safari-60', q: 41, optIdx: 0, val: 'Fish River Canyon' },
  { pack: 'age-of-discovery-explorers-60', q: 35, optIdx: 1, val: 'A complete defeat by European navies' },
  { pack: 'age-of-discovery-explorers-60', q: 35, optIdx: 2, val: 'Confucian opposition and northern border defense' },
  { pack: 'american-civil-war-60', q: 51, optIdx: 1, val: 'Imprisonment of Confederate officers' },
  { pack: 'ancient-americas-maya-inca-aztec-60', q: 37, optIdx: 0, val: 'Eagle and Jaguar warriors' },
  { pack: 'ancient-americas-maya-inca-aztec-60', q: 37, optIdx: 1, val: 'Cougar and Falcon knights' },
  { pack: 'ancient-americas-maya-inca-aztec-60', q: 37, optIdx: 2, val: 'Serpent and Wolf veterans' },
  { pack: 'chile-geography-heritage-60', q: 26, optIdx: 0, val: 'Andes mountains, Atacama desert, and Pacific Ocean barriers' },
  { pack: 'morocco-geography-heritage-60', q: 8, optIdx: 0, val: 'Drâa River' },
  { pack: 'morocco-geography-heritage-60', q: 58, optIdx: 0, val: 'Only African country on both Atlantic and Mediterranean' },
  { pack: 'philosophy-great-thinkers-60', q: 51, optIdx: 0, val: 'Master and slave morality' },
  { pack: 'thailand-geography-heritage-60', q: 55, optIdx: 0, val: 'Only Southeast Asian nation never colonized by European powers' },
  { pack: 'world-languages-linguistics-60', q: 44, optIdx: 0, val: 'Khoisan and Niger-Congo families' },
  { pack: 'china-geography-heritage-60', q: 16, optIdx: 1, val: "Xi'an" }
];

fixes.forEach(f => {
  const p = path.join(quizzesDir, f.pack, 'dataset.json');
  if (fs.existsSync(p)) {
    const data = JSON.parse(fs.readFileSync(p, 'utf8'));
    const q = data.questions[f.q - 1];
    if (q && q.type === 'mcq') {
      q.options[f.optIdx] = f.val;
      fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf8');
      console.log(`Updated ${f.pack} Q#${f.q} option [${f.optIdx}] -> "${f.val}"`);
    }
  }
});
