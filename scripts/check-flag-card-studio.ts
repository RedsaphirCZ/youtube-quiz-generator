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
assert.match(html, /id="randomAllContinents"/);
assert.match(html, /class="random-content" type="checkbox" value="capitals"/);
assert.match(html, /option value="mixed">Keep generated mix/);
assert.match(app, /function drawCapitalTile/);
assert.match(app, /frontModes: countries\.map\(takeFrontMode\)/);
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
  assert.equal(typeof country.capital, 'string');
}

console.log('PASS: Flag Card Studio route, mixed clue controls, continent checkboxes, 195 capitals, and 390 shared local assets.');
