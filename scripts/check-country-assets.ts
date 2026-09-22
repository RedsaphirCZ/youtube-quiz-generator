import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const catalogPath = path.join(root, 'public', 'flag-card-studio', 'data', 'countries.json');
const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8')) as {
  countryCount: number;
  countries: Array<{ iso2: string; iso3: string; name: string; flag: string; silhouette: string }>;
};

const failures: string[] = [];
if (catalog.countryCount !== 195 || catalog.countries.length !== 195) failures.push(`Expected 195 countries, found ${catalog.countries.length}.`);
const seen = new Set<string>();
for (const country of catalog.countries) {
  if (seen.has(country.iso2)) failures.push(`Duplicate ISO-2 code: ${country.iso2}`);
  seen.add(country.iso2);
  for (const [kind, sourcePath] of [['flag', country.flag], ['silhouette', country.silhouette]] as const) {
    const normalized = sourcePath.replace(/^\.\.\//, '');
    const assetPath = path.join(root, 'public', normalized);
    if (!fs.existsSync(assetPath) || fs.statSync(assetPath).size === 0) failures.push(`${country.name}: missing ${kind} at ${normalized}`);
  }
}
const japan = catalog.countries.find(country => country.iso2 === 'jp');
if (!japan || japan.iso3 !== 'JPN' || japan.name !== 'Japan') failures.push('Japan is missing or has invalid identifiers.');

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log(`Country Asset Hub: ${catalog.countries.length} countries, ${catalog.countries.length * 2} image assets, all paths valid.`);
