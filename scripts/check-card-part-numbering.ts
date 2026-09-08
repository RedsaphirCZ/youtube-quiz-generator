import assert from 'node:assert/strict';
import fs from 'node:fs';
import { jsPDF } from 'jspdf';
import { curatedQuizzes } from '../src/data/curatedQuizzes';
import { drawFrontCard, drawBackCard, PAGE_W, PAGE_H } from '../src/lib/pdfExporter';
import { generateNanDeckCardRows } from '../src/lib/nandeckExporter';
const quiz = curatedQuizzes[0];
const doc = new jsPDF({unit:'mm',format:[PAGE_W,PAGE_H]});
let labels: string[] = [];
const original = doc.text.bind(doc);
doc.text = ((text: any, ...args: any[]) => { labels.push(Array.isArray(text) ? text.join(' ') : text); return (original as any)(text,...args); }) as any;
for (const index of [0,19,20,39,40]) {
 for (const draw of [drawFrontCard,drawBackCard]) {
  labels = [];
  draw(doc,quiz.questions[index],index,quiz.title);
  assert(labels.some(text => text.includes(`PART ${Math.floor(index/20)+1}`) && text.includes(`QUESTION ${index%20+1}`)));
  doc.addPage([PAGE_W,PAGE_H]);
 }
}
const rows = generateNanDeckCardRows(quiz);
assert.equal(rows[20].QUESTION_NUM,1);
assert.equal(rows[quiz.questions.length+20].QUESTION_NUM,1);
assert.equal(new Set(rows.map(row => row.CARD_ID)).size, rows.length);
const proof = new jsPDF({unit:'mm',format:[PAGE_W,PAGE_H]});
drawBackCard(proof,quiz.questions[20],20,quiz.title);
fs.writeFileSync('output/pdf/part-2-numbering-proof.pdf',Buffer.from(proof.output('arraybuffer')));
console.log('PASS: part boundaries match on both card sides and card data; card IDs remain unique.');
