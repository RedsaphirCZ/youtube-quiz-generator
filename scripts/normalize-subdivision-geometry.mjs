import { readFile, writeFile } from 'node:fs/promises';
import { normalizeWinding } from './subdivision-geometry-utils.mjs';

const catalog = JSON.parse(await readFile('public/subdivision-maps/catalog.json', 'utf8'));
let corrected = 0;
for (const entry of catalog.countries) {
  const file = `public/subdivision-maps/data/${entry.iso3}.json`;
  const collection = JSON.parse(await readFile(file, 'utf8'));
  for (const feature of collection.features) {
    const normalized = normalizeWinding(feature.geometry);
    if (normalized !== feature.geometry) corrected += 1;
    feature.geometry = normalized;
  }
  await writeFile(file, JSON.stringify(collection));
}
console.log(`Corrected winding for ${corrected} division polygons.`);
