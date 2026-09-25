import { readFile, writeFile } from 'node:fs/promises';

const naturalEarthUrl = 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_admin_1_states_provinces.geojson';
const cldrUrl = 'https://raw.githubusercontent.com/unicode-org/cldr/main/common/subdivisions/en.xml';
const catalog = JSON.parse(await readFile('public/subdivision-maps/catalog.json', 'utf8'));
const textFile = async (file, url) => {
  try { return await readFile(file, 'utf8'); }
  catch {
    const response = await fetch(url, { signal: AbortSignal.timeout(120000) });
    if (!response.ok) throw new Error(`${url}: HTTP ${response.status}`);
    return response.text();
  }
};
const ne = JSON.parse(await textFile('tmp/ne-admin1.geojson', naturalEarthUrl));
const cldrXml = await textFile('tmp/cldr-subdivisions-en.xml', cldrUrl);
const clean = value => String(value || '').normalize('NFKD').replace(/\p{Diacritic}/gu, '').toLowerCase().replace(/[^a-z0-9]/g, '');
const repairEncoding = value => /Ã|Â/.test(value) ? Buffer.from(value, 'latin1').toString('utf8') : value;
const decode = value => value.replace(/&#(\d+);/g, (_, number) => String.fromCodePoint(Number(number))).replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/[¹²³]$/g, '');
const cldr = new Map([...cldrXml.matchAll(/<subdivision type="([^"]+)"[^>]*>([^<]+)<\/subdivision>/g)].map(match => [match[1], decode(match[2])]));
const neByCode = new Map();
const neByName = new Map();
for (const feature of ne.features) {
  const props = feature.properties;
  if (props.iso_3166_2 && props.name_en) neByCode.set(props.iso_3166_2.toUpperCase(), props.name_en);
  if (props.adm0_a3 && props.name && props.name_en) neByName.set(`${props.adm0_a3}:${clean(props.name)}`, props.name_en);
}

// First-level labels where the cross-source names or codes differ or the common English exonym matters.
const overrides = {
  CZE: {
    'Hlavní město Praha': 'Prague', 'Středočeský kraj': 'Central Bohemian Region',
    'Jihočeský kraj': 'South Bohemian Region', 'Plzeňský kraj': 'Plzeň Region',
    'Karlovarský kraj': 'Karlovy Vary Region', 'Ústecký kraj': 'Ústí nad Labem Region',
    'Liberecký kraj': 'Liberec Region', 'Královéhradecký kraj': 'Hradec Králové Region',
    'Pardubický kraj': 'Pardubice Region', 'Kraj Vysočina': 'Vysočina Region',
    'Jihomoravský kraj': 'South Moravian Region', 'Olomoucký kraj': 'Olomouc Region',
    'Moravskoslezský kraj': 'Moravian-Silesian Region', 'Zlínský kraj': 'Zlín Region',
  },
  CHE: {
    'Genève': 'Geneva', 'Graubünden': 'Grisons', 'Luzern': 'Lucerne',
    'St. Gallen': 'St. Gallen', 'Zürich': 'Zurich',
  },
  FRA: {
    'Bretagne': 'Brittany', 'Normandie': 'Normandy', 'Corse': 'Corsica',
    'Bourgogne-Franche-Comté': 'Burgundy-Franche-Comté', 'Nouvelle-Aquitaine': 'New Aquitaine',
    'Occitanie': 'Occitania',
  },
  BEL: { 'Brussels Hoofdstedelijk': 'Brussels-Capital Region', 'Vlaams Gewest': 'Flemish Region', 'Wallonne Gewest': 'Walloon Region' },
  ITA: { 'Nord-Ovest': 'Northwest Italy', 'Nord-Est': 'Northeast Italy', 'Centro': 'Central Italy', 'Sud': 'South Italy', 'Isole': 'Islands of Italy' },
  SYC: {
    'Outer Isla': 'Outer Islands', 'Baie Saint': 'Baie Sainte Anne', 'La Digue a': 'La Digue and Inner Islands',
    'Anse Aux P': 'Anse aux Pins', 'Anse Boile': 'Anse Boileau', 'Anse Etoil': 'Anse Etoile',
    'Anse Royal': 'Anse Royale', 'Baie Lazar': 'Baie Lazare', 'Beau Vallo': 'Beau Vallon',
    'La RiviÃ¨re': 'La Rivière Anglaise', 'Les Mamell': 'Les Mamelles', 'Mont Buxto': 'Mont Buxton',
    'Mont Fleur': 'Mont Fleuri', 'Pointe La': 'Pointe Larue', 'Roche CaÃ¯m': 'Roche Caiman',
    'Saint Loui': 'Saint Louis',
  },
  CHL: {
    'Región de Antofagasta': 'Antofagasta Region', 'Región de Arica y Parinacota': 'Arica and Parinacota Region',
    'Región de Atacama': 'Atacama Region', 'Región de Aysén del Gral.Ibañez del Campo': 'Aysén Region',
    'Región de Coquimbo': 'Coquimbo Region', 'Región de La Araucanía': 'Araucanía Region',
    'Región de Los Lagos': 'Los Lagos Region', 'Región de Los Ríos': 'Los Ríos Region',
    'Región de Magallanes y Antártica Chilena': 'Magallanes and Chilean Antarctic Region',
    'Región de Ñuble': 'Ñuble Region', 'Región de Tarapacá': 'Tarapacá Region',
    'Región de Valparaíso': 'Valparaíso Region', 'Región del Bío-Bío': 'Biobío Region',
    "Región del Libertador Bernardo O'Higgins": "O'Higgins Region", 'Región del Maule': 'Maule Region',
    'Región Metropolitana de Santiago': 'Santiago Metropolitan Region',
  },
};

let next = 0;
const failures = [];
const counts = { override: 0, naturalEarth: 0, cldr: 0, source: 0 };
async function worker() {
  while (next < catalog.countries.length) {
    const entry = catalog.countries[next++];
    try {
      const response = await fetch(entry.geometryUrl, { signal: AbortSignal.timeout(90000) });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const source = await response.json();
      const sourceById = new Map(source.features.map(feature => [String(feature.properties.shapeID || feature.properties.shapeISO || feature.properties.shapeName), feature.properties]));
      const path = `public/subdivision-maps/data/${entry.iso3}.json`;
      const collection = JSON.parse(await readFile(path, 'utf8'));
      for (const feature of collection.features) {
        const properties = feature.properties;
        const sourceProperties = sourceById.get(properties.id);
        const iso = typeof sourceProperties?.shapeISO === 'string' ? sourceProperties.shapeISO.toUpperCase() : '';
        const repairedName = repairEncoding(properties.name);
        const englishFromNe = neByCode.get(iso) || neByName.get(`${entry.iso3}:${clean(repairedName)}`);
        const englishFromCldr = iso ? cldr.get(iso.toLowerCase().replace('-', '')) : undefined;
        const manual = overrides[entry.iso3]?.[properties.name] || overrides[entry.iso3]?.[repairedName]
          || (entry.iso3 === 'SLV' && repairedName.startsWith('Departamento de ') ? `${repairedName.slice(16)} Department` : undefined);
        const nameSource = manual ? 'override' : englishFromNe ? 'naturalEarth' : englishFromCldr ? 'cldr' : 'source';
        properties.nameEn = manual || englishFromNe || englishFromCldr || repairedName;
        properties.nameSource = nameSource;
        if (iso) properties.iso = iso;
        counts[nameSource] += 1;
      }
      await writeFile(path, JSON.stringify(collection));
    } catch (error) { failures.push(`${entry.iso3}: ${error.message}`); }
  }
}
await Promise.all(Array.from({ length: 5 }, () => worker()));
console.log(`Name sources: ${JSON.stringify(counts)}; failures: ${failures.length}`);
if (failures.length) console.log(failures.join('\n'));
