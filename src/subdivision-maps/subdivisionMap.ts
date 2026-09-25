import type { FeatureCollection, Geometry } from 'geojson';

export interface DivisionCatalogEntry {
  iso2: string;
  iso3: string;
  country: string;
  divisionType: string;
  count: number;
  year: string;
  source: string;
  sourceLicense: string;
  geometryUrl: string;
}
export interface DivisionProperties { id: string; name: string; nameEn?: string; nameSource?: 'override' | 'naturalEarth' | 'cldr' | 'source'; iso?: string }
export type DivisionCollection = FeatureCollection<Geometry, DivisionProperties>;
export const divisionTypeLabel = (entry: DivisionCatalogEntry) => entry.iso3 === 'USA' ? 'states' : entry.iso3 === 'CHE' ? 'cantons' : entry.iso3 === 'CZE' ? 'kraje' : entry.divisionType;
export interface DivisionMapProject {
  schema: 'subdivision-map/v1';
  id: string;
  title: string;
  country: string;
  showNames: boolean;
  waterColor: string;
  landColor: string;
  borderColor: string;
  highlightColor: string;
  highlighted: string[];
  labelOverrides: Record<string, string>;
  createdAt: string;
}

export function newDivisionMap(country: string, name: string): DivisionMapProject {
  return {
    schema: 'subdivision-map/v1', id: `division-${crypto.randomUUID()}`, title: name, country,
    showNames: true, waterColor: '#ffffff', landColor: '#ffffff', borderColor: '#171717', highlightColor: '#171717',
    highlighted: [], labelOverrides: {}, createdAt: new Date().toISOString(),
  };
}

const color = (value: unknown) => typeof value === 'string' && /^#[0-9a-f]{6}$/i.test(value);
export function parseDivisionProject(raw: string, entries: DivisionCatalogEntry[], preserveId = false): DivisionMapProject {
  if (raw.length > 1024 * 1024) throw new Error('Project JSON is too large.');
  const data: unknown = JSON.parse(raw.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, ''));
  if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('Expected a subdivision map project.');
  const project = data as Record<string, unknown>;
  if (project.schema !== 'subdivision-map/v1') throw new Error('Use subdivision-map/v1 JSON.');
  const entry = entries.find(item => item.iso3 === project.country);
  if (!entry) throw new Error('The selected country has no bundled first-level boundaries.');
  if (typeof project.title !== 'string' || !project.title.trim() || project.title.length > 120) throw new Error('Enter a map title of 1–120 characters.');
  for (const key of ['waterColor', 'landColor', 'borderColor', 'highlightColor'] as const) if (!color(project[key])) throw new Error(`${key} must be a six-digit hex colour.`);
  if (!Array.isArray(project.highlighted) || project.highlighted.some(id => typeof id !== 'string')) throw new Error('Highlighted divisions must be a list of IDs.');
  if (new Set(project.highlighted).size !== project.highlighted.length) throw new Error('A division is highlighted more than once.');
  const rawOverrides = project.labelOverrides ?? {};
  if (!rawOverrides || typeof rawOverrides !== 'object' || Array.isArray(rawOverrides)) throw new Error('Name edits must be an object of division IDs and labels.');
  const labelOverrides: Record<string, string> = {};
  for (const [id, value] of Object.entries(rawOverrides)) {
    if (!id || id.length > 100 || typeof value !== 'string' || !value.trim() || value.length > 80) throw new Error('Each edited name must be 1–80 characters.');
    labelOverrides[id] = value.trim();
  }
  return {
    schema: 'subdivision-map/v1', id: preserveId && typeof project.id === 'string' ? project.id : `division-${crypto.randomUUID()}`,
    title: project.title.trim(), country: entry.iso3, showNames: project.showNames !== false,
    waterColor: project.waterColor as string, landColor: project.landColor as string, borderColor: project.borderColor as string,
    highlightColor: project.highlightColor as string, highlighted: project.highlighted, labelOverrides,
    createdAt: preserveId && typeof project.createdAt === 'string' ? project.createdAt : new Date().toISOString(),
  };
}

const czechShortNames: Record<string, string> = {
  'Central Bohemian Region': 'Central Bohemia',
  'South Bohemian Region': 'South Bohemia',
  'South Moravian Region': 'South Moravia',
  'Moravian-Silesian Region': 'Moravian-Silesia',
};

export function divisionDisplayName(feature: DivisionCollection['features'][number], country: string, overrides: Record<string, string> = {}) {
  const fullName = feature.properties.nameEn || feature.properties.name;
  if (overrides[feature.properties.id]) return overrides[feature.properties.id];
  if (country === 'CZE') return czechShortNames[fullName] || fullName;
  return fullName;
}

export function validateDivisionCollection(value: unknown): DivisionCollection {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Invalid subdivision geometry.');
  const collection = value as DivisionCollection;
  if (collection.type !== 'FeatureCollection' || !Array.isArray(collection.features) || collection.features.length < 2) throw new Error('This country has no usable division polygons.');
  for (const item of collection.features) {
    if (!item.properties || typeof item.properties.id !== 'string' || typeof item.properties.name !== 'string' || !item.properties.name || !item.geometry || !['Polygon', 'MultiPolygon'].includes(item.geometry.type)) throw new Error('A division is missing its name or shape.');
  }
  return collection;
}

const xml = (value: string) => value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' }[char]!));
const slug = (value: string) => value.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'division-map';
export const divisionMapFilename = slug;

export { divisionMapSvg } from './atlasSvg';
