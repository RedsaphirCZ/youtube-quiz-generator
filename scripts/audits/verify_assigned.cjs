const fs = require('fs');
const path = require('path');

const assigned = [
  'classical-music-great-composers-60',
  'rock-music-pop-legends-60',
  'world-literature-masterpieces-60',
  'world-mythology-legends-60',
  'architecture-wonders-styles-60',
  'world-languages-linguistics-60',
  'philosophy-great-thinkers-60',
  'culinary-arts-world-cuisines-60',
  'theater-opera-performing-arts-60',
  'world-religions-sacred-traditions-60',
  'olympic-games-records-history-60',
  'world-football-soccer-legends-60',
  'chess-grandmasters-strategy-60',
  'extreme-sports-adventures-60',
  'video-games-gaming-history-60',
  'world-records-human-extremes-60'
];

const catalog = JSON.parse(fs.readFileSync('quizzes/catalog.json', 'utf8'));
const catalogIds = new Set(catalog.map(c => c.id));

console.log('=== VERIFYING 16 ASSIGNED QUIZZES ===');
let allGood = true;

for (const id of assigned) {
  const p = path.join('quizzes', id, 'dataset.json');
  if (!fs.existsSync(p)) {
    console.error('MISSING FILE:', p);
    allGood = false;
    continue;
  }
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));
  const qs = data.questions;
  const mcqs = qs.filter(q => q.type === 'mcq');
  const nums = qs.filter(q => q.type === 'number');
  
  const dist = { 0: 0, 1: 0, 2: 0 };
  mcqs.forEach(m => dist[m.correctIndex]++);
  
  let bracketsFound = 0;
  mcqs.forEach(m => {
    m.options.forEach(opt => {
      if (/[()[\]{}]/.test(opt)) bracketsFound++;
    });
  });
  
  let nonNumericTarget = 0;
  nums.forEach(n => {
    if (typeof n.target !== 'number' || isNaN(n.target)) nonNumericTarget++;
  });

  const inCatalog = catalogIds.has(id);

  console.log(id + ': Total=' + qs.length + ' (MCQ=' + mcqs.length + ', Num=' + nums.length + ') | A=' + dist[0] + ', B=' + dist[1] + ', C=' + dist[2] + ' | Brackets=' + bracketsFound + ' | NonNumTargets=' + nonNumericTarget + ' | InCatalog=' + inCatalog + ' | Cat: ' + data.category);
  
  if (qs.length !== 60 || mcqs.length !== 50 || nums.length !== 10 || dist[0] !== 17 || dist[1] !== 17 || dist[2] !== 16 || bracketsFound !== 0 || nonNumericTarget !== 0 || !inCatalog) {
    allGood = false;
  }
}

console.log('\n>>> ALL 16 ASSIGNED QUIZZES 100% PERFECT: ' + allGood + ' <<<');
