import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { geoArea, geoContains, geoMercator, geoPath } from 'd3-geo';
import { divisionDisplayName, divisionMapSvg, newDivisionMap, parseDivisionProject, validateDivisionCollection } from '../src/subdivision-maps/subdivisionMap';
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
  assert.doesNotMatch(svg, /ATLAS OF ADMINISTRATIVE REGIONS|ENGLISH NAMES|First-level administrative divisions/);
  assert.match(svg, /geoBoundaries gbOpen ADM1/);
  assert.ok((svg.match(/#[0-9a-f]{6}/gi) || []).every(value => value[1] === value[3] && value[3] === value[5] && value[2] === value[4] && value[4] === value[6]), 'Map colours should be greyscale');
  assert.doesNotMatch(svg, /NaN|Infinity/);
  assert.ok(collection.features.every(item => item.properties.nameEn && item.properties.nameSource));
  assert.equal((svg.match(/<tspan /g) || []).length >= count, true, `${iso3} should label every region`);
  const blank = divisionMapSvg({ ...project, showNames: false }, entry, collection);
  assert.doesNotMatch(blank, /BLANK MAP/);
  assert.doesNotMatch(blank, /<tspan /);
  assert.doesNotMatch(blank, /<title>/);
  if (iso3 === 'CZE') {
    assert.equal(divisionDisplayName(collection.features.find(item => item.properties.nameEn === 'Central Bohemian Region')!, 'CZE'), 'Central Bohemia');
    assert.equal(divisionDisplayName(collection.features.find(item => item.properties.nameEn === 'South Moravian Region')!, 'CZE'), 'South Moravia');
    assert.doesNotMatch(svg, /Central Bohemian Region|South Moravian Region/);
    const projection = geoMercator().fitExtent([[190, 75], [1410, 830]], collection);
    const layout = layoutMapLabels(collection.features, projection, geoPath(projection), false, false, { width: 1600, top: 55, bottom: 862 }, feature => divisionDisplayName(feature, 'CZE'));
    assert.equal(layout.placements.length, count);
    const prague = collection.features.find(item => item.properties.nameEn === 'Prague')!;
    const central = collection.features.find(item => item.properties.nameEn === 'Central Bohemian Region')!;
    const centralBox = layout.placements.find(item => item.id === central.properties.id)!.box;
    for (let x = centralBox.left + 2; x < centralBox.right; x += 4) for (let y = centralBox.top + 2; y < centralBox.bottom; y += 4) {
      assert.equal(geoContains(prague, projection.invert!([x, y])!), false, 'Central Bohemian label crosses Prague');
    }
    const renamed = { ...project, labelOverrides: { [central.properties.id]: 'Testland' } };
    assert.match(divisionMapSvg(renamed, entry, collection), /Testland/);
    assert.equal(parseDivisionProject(JSON.stringify(renamed), catalog.countries).labelOverrides[central.properties.id], 'Testland');
  }
  if (iso3 === 'CHE') assert.ok(svg.includes('Geneva') && svg.includes('Zurich'));
  const imported = parseDivisionProject('```json\n' + JSON.stringify(project) + '\n```', catalog.countries);
  assert.equal(imported.country, iso3);
  assert.notEqual(imported.id, project.id);
  const oldProject = { ...project } as Partial<typeof project>;
  delete oldProject.labelOverrides;
  assert.deepEqual(parseDivisionProject(JSON.stringify(oldProject), catalog.countries).labelOverrides, {});
}
for (const entry of catalog.countries) {
  const collection = validateDivisionCollection(JSON.parse(readFileSync(`public/subdivision-maps/data/${entry.iso3}.json`, 'utf8')));
  assert.equal(collection.features.length, entry.count, `${entry.iso3} count mismatch`);
  assert.ok(collection.features.every(item => typeof item.properties.nameEn === 'string' && item.properties.nameEn.length > 0), `${entry.iso3} needs English labels`);
  assert.ok(collection.features.every(item => geoArea(item) < 2 * Math.PI), `${entry.iso3} has an inverted polygon`);
}
console.log(`PASS: ${catalog.countries.length} offline countries, 50 US states, 26 Swiss cantons, 14 Czech regions, labels, SVG and project import.`);
