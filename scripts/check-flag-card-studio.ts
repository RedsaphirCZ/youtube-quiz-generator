import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('public', 'flag-card-studio');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const styles = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');
const data = JSON.parse(fs.readFileSync(path.join(root, 'data', 'countries.json'), 'utf8'));

assert.match(html, /href="\.\.\/"[^>]*aria-label="Return to YouTube Quiz Studio"/);
assert.match(html, /Cards and write-under worksheets/);
assert.match(app, /fetch\("data\/countries\.json"\)/);
assert.doesNotMatch(app, /https?:\/\//);
assert.match(styles, /@media \(max-width: 560px\)/);
assert.equal(data.schema, 'quiet-atlas/v1');
assert.equal(data.countries.length, 195);

for (const country of data.countries) {
  assert.match(country.iso2, /^[a-z]{2}$/);
  assert.equal(country.flag, `../picture-assets/flags/${country.iso2}.png`);
  assert.equal(country.silhouette, `../picture-assets/silhouettes/${country.iso2}.png`);
  assert.ok(fs.existsSync(path.resolve('public', country.flag.replace(/^\.\.\//, ''))));
  assert.ok(fs.existsSync(path.resolve('public', country.silhouette.replace(/^\.\.\//, ''))));
}

console.log('PASS: Flag Card Studio route, return navigation, mobile styles, 195-country data, and 390 shared local assets.');
