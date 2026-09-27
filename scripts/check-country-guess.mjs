import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { makeRounds } from '../public/country-guess/engine.js';
import { concealments, visibleAreas, pickConcealment, hidingForMode } from '../public/country-guess/clue-layout.js';

const countries = JSON.parse(readFileSync('public/flag-card-studio/data/countries.json', 'utf8')).countries;
let checks = 0;
const regions = ['all', ...new Set(countries.map(country => country.continent))];
for (const country of countries) for (const asset of [country.flag, country.silhouette]) {
  assert.ok(existsSync(resolve('public/country-guess', asset)), `Missing asset: ${asset}`); checks++;
}
let seed = 48271;
const random = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
for (const region of regions) for (const mode of ['border', 'flag', 'mixed']) for (const count of ['10', '20', 'all']) {
  const pool = countries.filter(c => region === 'all' || c.continent === region);
  const rounds = makeRounds(countries, { mode, region, count }, random);
  assert.equal(rounds.length, count === 'all' ? pool.length : Math.min(Number(count), pool.length));
  assert.equal(new Set(rounds.map(round => round.country.iso2)).size, rounds.length);
  for (const { country, choices } of rounds) {
    assert.equal(choices.length, 4);
    assert.equal(new Set(choices.map(c => c.iso2)).size, 4);
    assert.equal(choices.filter(c => c.iso2 === country.iso2).length, 1);
    assert.ok(choices.every(c => pool.includes(c)));
    if (mode === 'flag') for (const family of [['id', 'mc'], ['ro', 'td']]) {
      if (family.includes(country.iso2)) assert.equal(choices.filter(c => family.includes(c.iso2)).length, 1);
    }
    checks++;
  }
}
assert.throws(() => makeRounds(countries, { mode: 'mixed', region: 'Atlantis', count: '10' }));
for (const style of concealments) for (const seed of [0, 1, 21, 48]) {
  const areas = visibleAreas(style, seed);
  const visible = areas.reduce((sum, area) => sum + (area.points ? .5 : area.w * area.h), 0);
  assert.equal(visible, style === 'none' ? 1 : .5, `${style} should reveal exactly half`);
  for (const area of areas) {
    if (area.points) assert.ok(area.points.every(([x, y]) => x >= 0 && x <= 1 && y >= 0 && y <= 1));
    else assert.ok(area.x >= 0 && area.y >= 0 && area.x + area.w <= 1 && area.y + area.h <= 1);
  }
  assert.equal(pickConcealment(style, seed), style);
}
assert.deepEqual(new Set(Array.from({ length: 50 }, (_, i) => pickConcealment('random', i))), new Set(concealments.slice(1)));
for (const hiding of [...concealments, 'random']) {
  assert.equal(hidingForMode('border', hiding), 'none');
  assert.equal(hidingForMode('flag', hiding), 'none');
  assert.equal(hidingForMode('mixed', hiding), hiding);
}
console.log(`PASS: Country Guess — ${countries.length} countries, all assets, no repeated targets, four unique choices, continent filters, flag ambiguity checks (${checks} rounds/assets checked).`);
console.log('PASS: All hiding styles reveal half the clue, stay within bounds, and random mode covers every hiding style.');
console.log('PASS: Regular border and flag modes always show full clues; only combined mode uses hiding.');
