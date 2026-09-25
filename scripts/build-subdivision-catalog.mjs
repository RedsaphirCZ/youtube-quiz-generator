import { readFile, writeFile, mkdir } from 'node:fs/promises';

const countries = JSON.parse(await readFile('public/flag-card-studio/data/countries.json', 'utf8')).countries;
const entries = [];
const failures = [];
let cursor = 0;

async function worker() {
  while (cursor < countries.length) {
    const country = countries[cursor++];
    const iso3 = country.iso3.toUpperCase();
    try {
      const response = await fetch(`https://www.geoboundaries.org/api/current/gbOpen/${iso3}/ADM1/`, { signal: AbortSignal.timeout(30000) });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      if (!data.simplifiedGeometryGeoJSON || !data.admUnitCount) throw new Error('Missing geometry URL or unit count');
      entries.push({
        iso2: country.iso2,
        iso3,
        country: country.name,
        divisionType: data.boundaryCanonical || 'first-level division',
        count: Number(data.admUnitCount),
        year: data.boundaryYearRepresented || '',
        source: data.boundarySource || '',
        sourceLicense: data.boundaryLicense || '',
        geometryUrl: data.simplifiedGeometryGeoJSON,
      });
    } catch (error) {
      failures.push({ iso3, country: country.name, reason: error.message });
    }
  }
}

await Promise.all(Array.from({ length: 6 }, () => worker()));
entries.sort((a, b) => a.country.localeCompare(b.country));
await mkdir('public/subdivision-maps', { recursive: true });
await writeFile('public/subdivision-maps/catalog.json', JSON.stringify({ schema: 'subdivision-catalog/v1', source: 'geoBoundaries gbOpen ADM1', generatedAt: new Date().toISOString(), countries: entries, unavailable: failures }, null, 2) + '\n');
console.log(`Catalog: ${entries.length} countries, ${failures.length} unavailable.`);
console.log(failures.map(item => `${item.iso3}: ${item.reason}`).join('\n'));
