const fs = require('fs');
const path = require('path');

function cleanText(str) {
  return String(str || '')
    .replace(/[()[\]{}]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function createMCQ(question, correctText, wrong1, wrong2, explanation, mcqIndex) {
  const cleanCorrect = cleanText(correctText);
  const cleanW1 = cleanText(wrong1);
  const cleanW2 = cleanText(wrong2);

  const targetSlot = mcqIndex % 3; // 0, 1, 2
  const options = [];
  if (targetSlot === 0) {
    options.push(cleanCorrect, cleanW1, cleanW2);
  } else if (targetSlot === 1) {
    options.push(cleanW1, cleanCorrect, cleanW2);
  } else {
    options.push(cleanW1, cleanW2, cleanCorrect);
  }

  return {
    type: 'mcq',
    question: question.trim(),
    options: options,
    correctIndex: targetSlot,
    explanation: explanation.trim()
  };
}

function createNumber(question, target, metricUnit, imperialDisplay, explanation) {
  return {
    type: 'number',
    question: question.trim(),
    target: Number(target),
    metricUnit: metricUnit.trim(),
    imperialDisplay: imperialDisplay ? imperialDisplay.trim() : `${target} ${metricUnit.trim()}`,
    explanation: explanation.trim()
  };
}

function buildQuiz(metadata, cycles) {
  if (cycles.length !== 10) {
    throw new Error(`Quiz ${metadata.id} has ${cycles.length} cycles, expected 10!`);
  }

  const questions = [];
  let mcqCount = 0;

  cycles.forEach((cycle, cIdx) => {
    if (!cycle.mcqs || cycle.mcqs.length !== 5) {
      throw new Error(`Quiz ${metadata.id} cycle ${cIdx + 1} has ${cycle.mcqs ? cycle.mcqs.length : 0} MCQs, expected 5!`);
    }
    if (!cycle.number) {
      throw new Error(`Quiz ${metadata.id} cycle ${cIdx + 1} is missing a Number Estimate!`);
    }

    cycle.mcqs.forEach(m => {
      questions.push(createMCQ(m.q, m.correct, m.w1, m.w2, m.exp, mcqCount));
      mcqCount++;
    });

    questions.push(createNumber(cycle.number.q, cycle.number.target, cycle.number.unit, cycle.number.imperial, cycle.number.exp));
  });

  const dataset = {
    id: metadata.id,
    theme: metadata.theme,
    title: metadata.title || metadata.theme,
    description: metadata.description,
    category: metadata.category,
    difficulty: metadata.difficulty || 'moderate',
    createdAt: metadata.createdAt || '2026-08-27T00:00:00Z',
    questions: questions
  };

  const targetDir = path.join(__dirname, '..', '..', 'quizzes', metadata.id);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const targetFile = path.join(targetDir, 'dataset.json');
  fs.writeFileSync(targetFile, JSON.stringify(dataset, null, 2), 'utf8');
  console.log(`Saved ${metadata.id} (${questions.length} questions: ${mcqCount} MCQ, ${questions.length - mcqCount} Number) -> ${targetFile}`);

  return dataset;
}

module.exports = {
  createMCQ,
  createNumber,
  buildQuiz,
  cleanText
};
