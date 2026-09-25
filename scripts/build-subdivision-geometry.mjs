import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { normalizeWinding } from './subdivision-geometry-utils.mjs';

const catalogPath = 'public/subdivision-maps/catalog.json';
const catalog = JSON.parse(await readFile(catalogPath, 'utf8'));
const outputDir = 'public/subdivision-maps/data';
await mkdir(outputDir, { recursive: true });
const excludedUsAreas = new Set(['Puerto Rico', 'District of Columbia', 'American Samoa', 'United States Virgin Islands', 'Guam', 'Commonwealth of the Northern Mariana Islands']);
const failed = [];
let next = 0;
let totalBytes = 0;

function roundedCoordinates(value) {
  return typeof value[0] === 'number'
    ? value.map(number => Math.round(number * 10000) / 10000)
    : value.map(roundedCoordinates);
}

async function worker() {
  while (next < catalog.countries.length) {
    const entry = catalog.countries[next++];
    try {
      const response = await fetch(entry.geometryUrl, { signal: AbortSignal.timeout(90000) });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const original = await response.json();
      if (original.type !== 'FeatureCollection' || !Array.isArray(original.features)) throw new Error('Invalid GeoJSON');
      const features = original.features
        .filter(feature => feature.geometry && feature.properties?.shapeName && (entry.iso3 !== 'USA' || !excludedUsAreas.has(feature.properties.shapeName)))
        .map(feature => ({
          type: 'Feature',
          properties: { id: String(feature.properties.shapeID || feature.properties.shapeISO || feature.properties.shapeName), name: feature.properties.shapeName },
          geometry: normalizeWinding({ type: feature.geometry.type, coordinates: roundedCoordinates(feature.geometry.coordinates) }),
        }));
      if (features.length < 2) throw new Error(`Only ${features.length} named divisions`);
      const content = JSON.stringify({ type: 'FeatureCollection', features });
      await writeFile(`${outputDir}/${entry.iso3}.json`, content);
      entry.count = features.length;
      totalBytes += Buffer.byteLength(content);
    } catch (error) {
      failed.push({ iso3: entry.iso3, country: entry.country, reason: error.message });
    }
  }
}

await Promise.all(Array.from({ length: 5 }, () => worker()));
catalog.countries = catalog.countries.filter(entry => !failed.some(item => item.iso3 === entry.iso3));
catalog.unavailable.push(...failed);
await writeFile(catalogPath, JSON.stringify(catalog, null, 2) + '\n');
console.log(`Bundled ${catalog.countries.length} countries, ${Math.round(totalBytes / 1024 / 1024)} MiB; ${failed.length} geometry failures.`);
console.log(failed.map(item => `${item.iso3}: ${item.reason}`).join('\n'));
