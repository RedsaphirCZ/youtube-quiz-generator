import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { curatedQuizzes } from '../../src/data/curatedQuizzes';
import { getQuizPDFBuffer } from '../../src/lib/pdfExporter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PDF_DIR = path.join(__dirname, '..', '..', 'exports', 'pdf');

if (fs.existsSync(PDF_DIR)) {
  fs.rmSync(PDF_DIR, { recursive: true, force: true });
}
fs.mkdirSync(PDF_DIR, { recursive: true });

console.log('Exporting printable duplex front-back Poker Card PDFs for all curated quizzes...');

let exportedCount = 0;

for (let i = 0; i < curatedQuizzes.length; i++) {
  const quiz = curatedQuizzes[i];
  const themeSlug = (quiz.theme || quiz.title || 'quiz')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  const pdfBuffer = getQuizPDFBuffer(quiz);
  const filePath = path.join(PDF_DIR, `${themeSlug}-poker-cards-duplex.pdf`);
  fs.writeFileSync(filePath, pdfBuffer);
  exportedCount++;
  console.log(`[${exportedCount}/${curatedQuizzes.length}] Exported PDF: ${themeSlug}-poker-cards-duplex.pdf (60 Questions, Duplex Ready)`);
}

console.log(`Successfully exported ${exportedCount} printable duplex PDFs into ${PDF_DIR}`);
