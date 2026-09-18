import assert from 'node:assert/strict';
import { IDBFactory, IDBDatabase } from 'fake-indexeddb';
import { loadPictureLibrary, savePictureQuiz } from '../src/picture-quiz/storage';
import { pictureQuizDemo } from '../src/picture-quiz/pictureQuiz';

const factory = new IDBFactory();
Object.defineProperty(globalThis, 'indexedDB', { configurable: true, value: factory });
let legacy = '[]';
Object.defineProperty(globalThis, 'localStorage', { value: {
  getItem: () => legacy,
  setItem: () => { throw new Error('IndexedDB tests must not save via localStorage'); },
} });
assert.deepEqual(await loadPictureLibrary(), []);
const project = { ...pictureQuizDemo, id: 'persistent-project' };
await savePictureQuiz(project);
assert.deepEqual(JSON.parse(JSON.stringify((await loadPictureLibrary())[0])), JSON.parse(JSON.stringify(project)));
await savePictureQuiz({ ...project, title: 'Updated' });
assert.equal((await loadPictureLibrary()).length, 1);
assert.equal((await loadPictureLibrary())[0].title, 'Updated');
legacy = JSON.stringify([project, { ...project, id: 'legacy-only' }]);
assert.equal((await loadPictureLibrary()).length, 2);
assert.equal((await loadPictureLibrary()).find(item => item.id === project.id)?.title, 'Updated');

const original = IDBDatabase.prototype.transaction;
IDBDatabase.prototype.transaction = function (...args: Parameters<typeof original>) {
  const transaction = original.apply(this, args);
  queueMicrotask(() => transaction.abort());
  return transaction;
};
try {
  await assert.rejects(savePictureQuiz({ ...project, title: 'Aborted write' }));
  await assert.rejects(loadPictureLibrary());
} finally { IDBDatabase.prototype.transaction = original; }
assert.equal((await loadPictureLibrary()).find(item => item.id === project.id)?.title, 'Updated');

const db = await new Promise<IDBDatabase>((resolve, reject) => {
  const request = factory.open('picture-quiz-projects', 1);
  request.onsuccess = () => resolve(request.result);
  request.onerror = () => reject(request.error);
});
await new Promise<void>((resolve, reject) => {
  const transaction = db.transaction('quizzes', 'readwrite');
  transaction.objectStore('quizzes').put({ id: 'corrupt', questions: [null] });
  transaction.oncomplete = () => resolve();
  transaction.onerror = () => reject(transaction.error);
});
db.close();
assert.equal((await loadPictureLibrary()).length, 2, 'Corrupt IndexedDB entries must be ignored');
Object.defineProperty(globalThis, 'indexedDB', { value: { open: () => { throw new Error('Database unavailable'); } } });
await assert.rejects(loadPictureLibrary(), /Database unavailable/);
await assert.rejects(savePictureQuiz(project), /Database unavailable/);
console.log('PASS: IndexedDB round-trip, updates, legacy merging, corrupt records, aborted reads/writes and unavailable storage.');
