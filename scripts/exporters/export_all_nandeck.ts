import fs from 'fs';
import path from 'path';
import { curatedQuizzes } from '../../src/data/curatedQuizzes';
import { generateNanDeckCSV, generateNanDeckScript } from '../../src/lib/nandeckExporter';

const EXPORTS_DIR = path.resolve(process.cwd(), 'exports/nandeck');

if (!fs.existsSync(EXPORTS_DIR)) {
  fs.mkdirSync(EXPORTS_DIR, { recursive: true });
}

console.log('=============================================================================');
console.log('BATCH EXPORTING ' + curatedQuizzes.length + ' QUIZZES TO NANDECK POKER CARDS (3MM BLEED)');
console.log('=============================================================================\n');

let totalDecks = 0;
let totalCards = 0;

for (let i = 0; i < curatedQuizzes.length; i++) {
  const quiz = curatedQuizzes[i];
  const deckDir = path.join(EXPORTS_DIR, quiz.id);
  
  if (!fs.existsSync(deckDir)) {
    fs.mkdirSync(deckDir, { recursive: true });
  }

  const csvContent = generateNanDeckCSV(quiz);
  const csvFilename = quiz.id + '-cards.csv';
  const csvPath = path.join(deckDir, csvFilename);
  fs.writeFileSync(csvPath, csvContent, 'utf8');

  const ndeContent = generateNanDeckScript(quiz, csvFilename);
  const ndeFilename = quiz.id + '-deck.nde';
  const ndePath = path.join(deckDir, ndeFilename);
  fs.writeFileSync(ndePath, ndeContent, 'utf8');

  totalDecks++;
  totalCards += quiz.questions.length * 2;

  console.log('[' + (i + 1) + '/' + curatedQuizzes.length + '] Exported: ' + quiz.id + ' -> ' + ndeFilename + ' & ' + csvFilename + ' (120 Cards: 60 Front / 60 Back)');
}

console.log('\n=============================================================================');
console.log('SUMMARY: ' + totalDecks + ' Decks Generated (' + totalCards + ' Card Faces: ' + (totalCards / 2) + ' Fronts + ' + (totalCards / 2) + ' Backs)');
console.log('Location: ' + EXPORTS_DIR);
console.log('=============================================================================\n');
