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
assert.match(html, /id="randomRecognized"[^>]*checked/);
assert.match(html, /class="random-group" type="checkbox" value="nato"/);
assert.match(html, /class="random-group" type="checkbox" value="eu"/);
assert.match(html, /id="useAllCountries"/);
assert.doesNotMatch(html, /value="disputed"/);
assert.match(html, /class="random-content" type="checkbox" value="capitals"/);
assert.match(html, /option value="mixed">Keep generated mix/);
assert.match(app, /function drawCapitalTile/);
assert.match(app, /frontModes: countries\.map\(takeFrontMode\)/);
assert.match(app, /if \(id === "deckView" && state\.cards\.length\) void nextFrame\(\)\.then\(renderPreviewSilhouettes\)/);
assert.match(app, /maximum \$\{pool\.length\} unique clues/);
assert.match(app, /if \(!allowRepeats && totalItems > pool\.length\)/);
assert.match(styles, /grid-template-rows: minmax\(0, 1fr\) minmax\(20px, 15%\)/);
assert.doesNotMatch(app, /https?:\/\//);
assert.match(styles, /@media \(max-width: 560px\)/);
assert.equal(data.schema, 'quiet-atlas/v1');
assert.equal(data.countries.length, 195);

const iso2 = new Set(data.countries.map((country: { iso2: string }) => country.iso2));
const readIsoSet = (name: string) => {
  const match = app.match(new RegExp(`const ${name} = new Set\\((\\[[^;]+\\])\\);`));
  assert.ok(match, `${name} must be declared as a literal set`);
  return JSON.parse(match[1]) as string[];
};
const nato = readIsoSet('NATO_ISO');
const eu = readIsoSet('EU_ISO');
assert.equal(new Set(nato).size, 32);
assert.equal(new Set(eu).size, 27);
for (const member of [...nato, ...eu]) assert.ok(iso2.has(member), `Missing bundled assets for ${member}`);

for (const country of data.countries) {
  assert.match(country.iso2, /^[a-z]{2}$/);
  assert.equal(country.flag, `../picture-assets/flags/${country.iso2}.png`);
  assert.equal(country.silhouette, `../picture-assets/silhouettes/${country.iso2}.png`);
  assert.ok(fs.existsSync(path.resolve('public', country.flag.replace(/^\.\.\//, ''))));
  assert.ok(fs.existsSync(path.resolve('public', country.silhouette.replace(/^\.\.\//, ''))));
  assert.equal(typeof country.capital, 'string');
}

console.log('PASS: mixed clues, visible silhouettes, unique selection limits, NATO/EU coverage, 195 capitals, and 390 shared assets.');
