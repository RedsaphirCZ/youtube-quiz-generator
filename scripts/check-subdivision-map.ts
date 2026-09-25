import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { geoArea, geoContains, geoMercator, geoPath } from 'd3-geo';
import { divisionMapSvg, newDivisionMap, parseDivisionProject, validateDivisionCollection } from '../src/subdivision-maps/subdivisionMap';
import type { DivisionCatalogEntry } from '../src/subdivision-maps/subdivisionMap';
import { layoutMapLabels } from '../src/subdivision-maps/labelLayout';

const catalog = JSON.parse(readFileSync('public/subdivision-maps/catalog.json', 'utf8')) as { countries: DivisionCatalogEntry[]; unavailable: { iso3: string }[] };
assert.ok(catalog.countries.length >= 190);
assert.ok(catalog.unavailable.some(item => item.iso3 === 'VAT'));
for (const [iso3, count, word] of [['USA', 50, 'States'], ['CHE', 26, 'Canton'], ['CZE', 14, 'regions']] as const) {
  const entry = catalog.countries.find(item => item.iso3 === iso3);
  assert.ok(entry, `${iso3} missing from catalog`);
  assert.equal(entry.count, count);
  assert.equal(entry.divisionType, word);
  const collection = validateDivisionCollection(JSON.parse(readFileSync(`public/subdivision-maps/data/${iso3}.json`, 'utf8')));
  assert.equal(collection.features.length, count);
  assert.equal(new Set(collection.features.map(item => item.properties.id)).size, count);
  assert.ok(collection.features.every(item => geoArea(item) < 2 * Math.PI), `${iso3} has an inverted polygon`);
  const project = newDivisionMap(iso3, entry.country);
  const svg = divisionMapSvg(project, entry, collection);
  assert.match(svg, /<svg/);
  assert.match(svg, /ATLAS OF ADMINISTRATIVE REGIONS/);
  assert.match(svg, /ENGLISH NAMES/);
  assert.match(svg, /geoBoundaries gbOpen ADM1/);
  assert.doesNotMatch(svg, /NaN|Infinity/);
  assert.ok(collection.features.every(item => item.properties.nameEn && item.properties.nameSource));
  assert.equal((svg.match(/<tspan /g) || []).length >= count, true, `${iso3} should label every region`);
  const blank = divisionMapSvg({ ...project, showNames: false }, entry, collection);
  assert.match(blank, /BLANK MAP/);
  assert.doesNotMatch(blank, /<tspan /);
  assert.doesNotMatch(blank, /<title>/);
  if (iso3 === 'CZE') {
    assert.ok(svg.includes('Central Bohemian') && svg.includes('South Moravian'));
    const projection = geoMercator().fitExtent([[96, 195], [1504, 790]], collection);
    const layout = layoutMapLabels(collection.features, projection, geoPath(projection), false, false);
    assert.equal(layout.placements.length, count);
    const prague = collection.features.find(item => item.properties.nameEn === 'Prague')!;
    const central = collection.features.find(item => item.properties.nameEn === 'Central Bohemian Region')!;
    const centralBox = layout.placements.find(item => item.id === central.properties.id)!.box;
    for (let x = centralBox.left + 2; x < centralBox.right; x += 4) for (let y = centralBox.top + 2; y < centralBox.bottom; y += 4) {
      assert.equal(geoContains(prague, projection.invert!([x, y])!), false, 'Central Bohemian label crosses Prague');
    }
  }
  if (iso3 === 'CHE') assert.ok(svg.includes('Geneva') && svg.includes('Zurich'));
  const imported = parseDivisionProject('```json\n' + JSON.stringify(project) + '\n```', catalog.countries);
  assert.equal(imported.country, iso3);
  assert.notEqual(imported.id, project.id);
}
for (const entry of catalog.countries) {
  const collection = validateDivisionCollection(JSON.parse(readFileSync(`public/subdivision-maps/data/${entry.iso3}.json`, 'utf8')));
  assert.equal(collection.features.length, entry.count, `${entry.iso3} count mismatch`);
  assert.ok(collection.features.every(item => typeof item.properties.nameEn === 'string' && item.properties.nameEn.length > 0), `${entry.iso3} needs English labels`);
  assert.ok(collection.features.every(item => geoArea(item) < 2 * Math.PI), `${entry.iso3} has an inverted polygon`);
}
console.log(`PASS: ${catalog.countries.length} offline countries, 50 US states, 26 Swiss cantons, 14 Czech regions, labels, SVG and project import.`);
