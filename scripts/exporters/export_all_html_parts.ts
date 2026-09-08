import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { curatedQuizzes } from '../../src/data/curatedQuizzes';
import { splitQuizIntoVideoParts } from '../../src/lib/htmlExporter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PARTS_DIR = path.join(__dirname, '..', '..', 'exports', 'html', 'parts');

if (fs.existsSync(PARTS_DIR)) {
  fs.rmSync(PARTS_DIR, { recursive: true, force: true });
}
fs.mkdirSync(PARTS_DIR, { recursive: true });

console.log(`Exporting 3-part (20 questions each) video kits for ${curatedQuizzes.length} curated quizzes...`);

let exportedCount = 0;

for (const quiz of curatedQuizzes) {
  const parts = splitQuizIntoVideoParts(quiz, 3);
  for (const part of parts) {
    const filePath = path.join(PARTS_DIR, part.filename);
    fs.writeFileSync(filePath, part.htmlContent, 'utf-8');
    exportedCount++;
  }
}

console.log(`Successfully exported ${exportedCount} HTML parts (${curatedQuizzes.length} quizzes x 3 parts = ${exportedCount} files) into ${PARTS_DIR}`);
