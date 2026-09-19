export const mapRegions = ['World', 'Europe', 'Asia', 'Africa', 'North America', 'South America', 'Oceania'] as const;
export type MapRegion = typeof mapRegions[number];

export interface MapCountry {
  iso2: string;
  ccn3: string;
  name: string;
  continent: Exclude<MapRegion, 'World'>;
}

export interface MapHighlight {
  country: string;
  color: string;
  label: string;
}

export interface MapProject {
  schema: 'map-highlight/v1';
  id: string;
  title: string;
  region: MapRegion;
  backgroundColor: string;
  landColor: string;
  borderColor: string;
  showLabels: boolean;
  highlights: MapHighlight[];
  createdAt: string;
}

export const highlightPalette = [
  '#e63946', '#f4a261', '#e9c46a', '#2a9d8f', '#3a86ff', '#8338ec',
  '#d45087', '#118ab2', '#6a994e', '#ef476f', '#06d6a0', '#ff7f11',
  '#7209b7', '#00a6fb', '#c1121f', '#588157', '#ff006e', '#577590',
];
export const colorForCountry = (iso2: string) => {
  const hash = [...iso2.toLowerCase()].reduce((total, character) => total * 31 + character.charCodeAt(0), 7);
  return highlightPalette[Math.abs(hash) % highlightPalette.length];
};

const generatedColor = (index: number) => {
  const hue = (index * 137.508) % 360;
  const saturation = index % 2 ? 72 : 64;
  const lightness = index % 3 === 0 ? 43 : 52;
  const chroma = (1 - Math.abs(2 * lightness / 100 - 1)) * saturation / 100;
  const segment = hue / 60;
  const secondary = chroma * (1 - Math.abs(segment % 2 - 1));
  const [red, green, blue] = segment < 1 ? [chroma, secondary, 0] : segment < 2 ? [secondary, chroma, 0] : segment < 3 ? [0, chroma, secondary] : segment < 4 ? [0, secondary, chroma] : segment < 5 ? [secondary, 0, chroma] : [chroma, 0, secondary];
  const match = lightness / 100 - chroma / 2;
  return `#${[red, green, blue].map(channel => Math.round((channel + match) * 255).toString(16).padStart(2, '0')).join('')}`;
};

export const nextHighlightColor = (highlights: MapHighlight[]) => {
  const used = new Set(highlights.map(item => item.color.toLowerCase()));
  const paletteChoice = highlightPalette.find(color => !used.has(color));
  if (paletteChoice) return paletteChoice;
  for (let index = 0; index < 360; index += 1) {
    const candidate = generatedColor(index);
    if (!used.has(candidate)) return candidate;
  }
  return '#172033';
};

export const defaultMapProject = (): MapProject => ({
  schema: 'map-highlight/v1', id: `map-${crypto.randomUUID()}`, title: 'Europe country map', region: 'Europe',
  backgroundColor: '#eaf4f7', landColor: '#d8ddd8', borderColor: '#ffffff', showLabels: true,
  highlights: [
    { country: 'cz', color: highlightPalette[0], label: 'Czechia' },
    { country: 'fr', color: highlightPalette[1], label: 'France' },
    { country: 'it', color: highlightPalette[2], label: 'Italy' },
  ], createdAt: new Date().toISOString(),
});

const object = (value: unknown): value is Record<string, unknown> => !!value && typeof value === 'object' && !Array.isArray(value);
const text = (value: unknown, label: string, limit = 160) => {
  if (typeof value !== 'string' || !value.trim() || value.trim().length > limit) throw new Error(`${label} needs 1–${limit} characters.`);
  return value.trim();
};
const color = (value: unknown, label: string) => {
  if (typeof value !== 'string' || !/^#[0-9a-f]{6}$/i.test(value)) throw new Error(`${label} must be a six-digit hex colour.`);
  return value.toLowerCase();
};

export function parseMapProject(raw: string, countries: MapCountry[], preserveIdentity = false): MapProject {
  if (raw.length > 2 * 1024 * 1024) throw new Error('Use a JSON file smaller than 2 MB.');
  const parsed: unknown = JSON.parse(raw.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, ''));
  if (!object(parsed) || parsed.schema !== 'map-highlight/v1') throw new Error('Use map-highlight/v1 JSON from Map Quiz Studio.');
  if (!mapRegions.includes(parsed.region as MapRegion)) throw new Error('Choose World or one supported continent.');
  if (!Array.isArray(parsed.highlights) || parsed.highlights.length < 1 || parsed.highlights.length > 80) throw new Error('Include 1–80 highlighted countries.');
  const region = parsed.region as MapRegion;
  const available = new Map(countries.filter(country => region === 'World' || country.continent === region).map(country => [country.iso2, country]));
  const seen = new Set<string>();
  const highlights = parsed.highlights.map((item, index): MapHighlight => {
    if (!object(item)) throw new Error(`Highlight ${index + 1} must be an object.`);
    const iso2 = text(item.country, `Highlight ${index + 1} country`, 2).toLowerCase();
    const country = available.get(iso2);
    if (!country) throw new Error(`${iso2.toUpperCase()} is not available in ${region}.`);
    if (seen.has(iso2)) throw new Error(`Duplicate highlighted country: ${country.name}.`);
    seen.add(iso2);
    return { country: iso2, color: color(item.color, `${country.name} colour`), label: typeof item.label === 'string' && item.label.trim() ? item.label.trim().slice(0, 80) : country.name };
  });
  return {
    schema: 'map-highlight/v1', id: preserveIdentity ? text(parsed.id, 'ID') : `map-${crypto.randomUUID()}`,
    title: text(parsed.title, 'Map title'), region,
    backgroundColor: color(parsed.backgroundColor, 'Background colour'), landColor: color(parsed.landColor, 'Land colour'), borderColor: color(parsed.borderColor, 'Border colour'),
    showLabels: parsed.showLabels !== false, highlights,
    createdAt: preserveIdentity ? text(parsed.createdAt, 'Creation date') : new Date().toISOString(),
  };
}

export function generateMapPrompt(topic: string, title: string, region: MapRegion, countries: MapCountry[], maximum: number) {
  const cleanTopic = text(topic, 'Map topic', 500);
  const cleanTitle = text(title, 'Map title', 160);
  if (!Number.isInteger(maximum) || maximum < 1 || maximum > 30) throw new Error('Choose 1–30 highlighted countries.');
  const available = countries.filter(country => region === 'World' || country.continent === region);
  return `# Researched country-highlight map — ${cleanTitle}

Research this topic: ${cleanTopic}
Map region: ${region}
Map title: ${JSON.stringify(cleanTitle)} (preserve exactly)
Choose no more than ${maximum} countries from the allowed list below. Include only countries clearly supported by the topic, and verify every inclusion. If the evidence is ambiguous, omit the country.

Allowed countries (use the two-letter code exactly):
${available.map(country => `- ${country.iso2}: ${country.name}`).join('\n')}

Return ONLY valid JSON, without Markdown or commentary. Use schema map-highlight/v1.
- Give every highlighted country a visually distinct six-digit hex colour.
- label should be the country name unless a short, useful data label is requested by the topic.
- Do not add countries outside ${region} or duplicate a country.
- This is a research draft; the app will validate structure and map coverage, but the human must review the factual selection.

${JSON.stringify({ schema: 'map-highlight/v1', title: cleanTitle, region, backgroundColor: '#eaf4f7', landColor: '#d8ddd8', borderColor: '#ffffff', showLabels: true, highlights: [{ country: available[0]?.iso2 || 'cz', color: '#e63946', label: available[0]?.name || 'Czechia' }] }, null, 2)}
`;
}

const storageKey = 'map-highlight-library-v1';
export function loadMapLibrary(countries: MapCountry[]): MapProject[] {
  const stored: unknown = JSON.parse(localStorage.getItem(storageKey) || '[]');
  if (!Array.isArray(stored)) throw new Error('Saved map projects could not be read.');
  return stored.flatMap(item => { try { return [parseMapProject(JSON.stringify(item), countries, true)]; } catch { return []; } });
}
export function saveMapProject(project: MapProject, countries: MapCountry[]): MapProject[] {
  const checked = parseMapProject(JSON.stringify(project), countries, true);
  const updated = [checked, ...loadMapLibrary(countries).filter(item => item.id !== checked.id)];
  localStorage.setItem(storageKey, JSON.stringify(updated));
  return updated;
}
