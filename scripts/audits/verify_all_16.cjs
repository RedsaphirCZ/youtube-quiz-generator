const fs = require('fs');
const path = require('path');

const targetQuizzes = [
  // World Geography, Capitals & Landscapes (8)
  { id: 'world-capitals-megacities-60', title: 'World Capitals, Megacities & Urban Geography', category: 'Geography, Capitals & Landscapes' },
  { id: 'mountains-peaks-alpinism-60', title: 'Mountains & Peaks: The Himalayas, Andes & Alpinism', category: 'Geography, Capitals & Landscapes' },
  { id: 'rivers-lakes-waterways-60', title: 'Great Rivers, Majestic Waterfalls & Inland Seas', category: 'Geography, Capitals & Landscapes' },
  { id: 'deserts-arid-lands-60', title: 'World Deserts: Sahara, Atacama, Gobi & Arid Wonders', category: 'Geography, Capitals & Landscapes' },
  { id: 'islands-archipelagos-atolls-60', title: 'Isolated Islands, Archipelagos & Coral Atolls', category: 'Geography, Capitals & Landscapes' },
  { id: 'european-geography-heritage-60', title: 'European Geography, Borders, Flags & Landscapes', category: 'Geography, Capitals & Landscapes' },
  { id: 'asian-geography-landmarks-60', title: 'Asian Geography: Rivers, Steppes & Natural Wonders', category: 'Geography, Capitals & Landscapes' },
  { id: 'african-geography-safari-60', title: 'African Geography: Rift Valley, Sahara & Diverse Biomes', category: 'Geography, Capitals & Landscapes' },

  // Tech, Inventions & Engineering (8)
  { id: 'computer-science-history-code-60', title: 'Computer Science History: Pioneers, Silicon & Algorithms', category: 'Tech, Inventions & Engineering' },
  { id: 'aviation-flight-aircraft-60', title: 'Aviation History: Legendary Planes, Supersonic Jets & Aces', category: 'Tech, Inventions & Engineering' },
  { id: 'megastructures-modern-engineering-60', title: 'Megastructures: Skyscrapers, Mega-Bridges & Canals', category: 'Tech, Inventions & Engineering' },
  { id: 'automotive-cars-motorsport-60', title: 'Automotive Heritage: Classic Engines, Supercars & F1', category: 'Tech, Inventions & Engineering' },
  { id: 'naval-ships-maritime-history-60', title: 'Historic Ships, Submarines & Naval Engineering', category: 'Tech, Inventions & Engineering' },
  { id: 'artificial-intelligence-robotics-60', title: 'AI & Robotics: Neural Networks, Humanoids & Automation', category: 'Tech, Inventions & Engineering' },
  { id: 'inventions-that-changed-the-world-60', title: 'Revolutionary Inventions That Transformed Humanity', category: 'Tech, Inventions & Engineering' },
  { id: 'spacecraft-rockets-missions-60', title: 'Spacecraft & Rocket Engineering: Apollo to Artemis', category: 'Tech, Inventions & Engineering' },
];

const catalog = JSON.parse(fs.readFileSync('quizzes/catalog.json', 'utf8'));
const catalogMap = new Map(catalog.map(c => [c.id, c]));

console.log('================================================================');
console.log(`VERIFYING ALL ${targetQuizzes.length} ASSIGNED QUIZ DATASETS (15/15 STRICT RULES)`);
console.log('================================================================\n');

let allPassed = true;
let totalQuestionsChecked = 0;
let totalMCQsChecked = 0;
let totalNumsChecked = 0;

for (let i = 0; i < targetQuizzes.length; i++) {
  const meta = targetQuizzes[i];
  const filePath = path.join('quizzes', meta.id, 'dataset.json');
  
  if (!fs.existsSync(filePath)) {
    console.error(`❌ [${i + 1}/${targetQuizzes.length}] ${meta.id}: File missing!`);
    allPassed = false;
    continue;
  }

  const raw = fs.readFileSync(filePath, 'utf8');
  let data;
  try {
    data = JSON.parse(raw);
  } catch (e) {
    console.error(`❌ [${i + 1}/${targetQuizzes.length}] ${meta.id}: Invalid JSON!`, e.message);
    allPassed = false;
    continue;
  }

  const errors = [];
  const qs = data.questions || [];
  totalQuestionsChecked += qs.length;

  if (qs.length !== 60) errors.push(`Expected 60 questions, found ${qs.length}`);

  const mcqs = qs.filter(q => q.type === 'mcq');
  const nums = qs.filter(q => q.type === 'number');
  totalMCQsChecked += mcqs.length;
  totalNumsChecked += nums.length;

  if (mcqs.length !== 50) errors.push(`Expected 50 MCQs, found ${mcqs.length}`);
  if (nums.length !== 10) errors.push(`Expected 10 Numbers, found ${nums.length}`);

  // Rhythm check: 5 MCQ then 1 Num repeated 10 times
  for (let c = 0; c < 10; c++) {
    for (let m = 0; m < 5; m++) {
      const idx = c * 6 + m;
      if (qs[idx] && qs[idx].type !== 'mcq') {
        errors.push(`Q#${idx + 1} should be MCQ but is ${qs[idx].type}`);
      }
    }
    const numIdx = c * 6 + 5;
    if (qs[numIdx] && qs[numIdx].type !== 'number') {
      errors.push(`Q#${numIdx + 1} should be Number but is ${qs[numIdx].type}`);
    }
  }

  // Check MCQs
  const dist = { 0: 0, 1: 0, 2: 0 };
  mcqs.forEach((q, idx) => {
    if (!q.options || ![2, 3].includes(q.options.length)) {
      errors.push(`MCQ #${idx + 1} options length is not 2 or 3`);
    } else {
      if (new Set(q.options).size !== q.options.length) errors.push(`MCQ #${idx + 1} options are not distinct`);
      q.options.forEach(opt => {
        if (/[()[\]{}]/.test(opt)) errors.push(`MCQ #${idx + 1} option contains brackets: "${opt}"`);
      });
    }

    if (!Number.isInteger(q.correctIndex) || q.correctIndex < 0 || q.correctIndex >= (q.options?.length || 0)) {
      errors.push(`MCQ #${idx + 1} invalid correctIndex: ${q.correctIndex}`);
    } else {
      dist[q.correctIndex]++;
    }

    if (/\b\d+\s*[\+\-\*\/x×÷]\s*\d+\b/i.test(q.question)) {
      errors.push(`MCQ #${idx + 1} question matches arithmetic pattern: "${q.question}"`);
    }

    if (!q.explanation || q.explanation.trim().length === 0) {
      errors.push(`MCQ #${idx + 1} explanation is missing`);
    }
  });

  // Check Number questions
  nums.forEach((q, idx) => {
    if (typeof q.target !== 'number' || isNaN(q.target)) {
      errors.push(`Num #${idx + 1} target is not a valid number: ${q.target}`);
    }
    if (!q.metricUnit || q.metricUnit.trim().length === 0) {
      errors.push(`Num #${idx + 1} metricUnit is missing`);
    }
    if (!q.explanation || q.explanation.trim().length === 0) {
      errors.push(`Num #${idx + 1} explanation is missing`);
    }
  });

  // Catalog presence
  const catItem = catalogMap.get(meta.id);
  if (!catItem) {
    errors.push('Quiz missing from catalog.json');
  } else if (catItem.category !== meta.category) {
    errors.push(`Catalog category mismatch: found "${catItem.category}", expected "${meta.category}"`);
  }

  if (errors.length > 0) {
    console.error(`❌ [${i + 1}/${targetQuizzes.length}] ${meta.id} FAILED (${errors.length} errors):`);
    errors.forEach(e => console.error(`   - ${e}`));
    allPassed = false;
  } else {
    console.log(`✅ [${i + 1}/${targetQuizzes.length}] ${meta.id}`);
    console.log(`   - Theme: "${data.theme}" | Category: "${data.category}"`);
    console.log(`   - 60 Questions: 50 MCQ / 10 Number | Rhythm: 10 × (5 MCQ + 1 Num)`);
    console.log(`   - Option Balance: A: ${dist[0]}, B: ${dist[1]}, C: ${dist[2]} | Brackets: 0 | Explanations: 60/60`);
  }
}

console.log('\n================================================================');
console.log(`TOTAL QUESTIONS VERIFIED: ${totalQuestionsChecked} (${totalMCQsChecked} MCQs, ${totalNumsChecked} Numbers)`);
console.log(`FINAL RESULT: ${allPassed ? '🎉 ALL 16 QUIZZES 100% VALIDATED AND PASSING' : '❌ SOME QUIZZES FAILED'}`);
console.log('================================================================\n');

if (!allPassed) process.exit(1);
