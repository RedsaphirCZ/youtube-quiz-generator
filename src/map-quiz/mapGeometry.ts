import { geoMercator, geoNaturalEarth1, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import world from 'world-atlas/countries-50m.json';
import type { Feature, FeatureCollection, Geometry } from 'geojson';
import type { MapCountry, MapProject } from './mapStudio';

export interface MapShape { iso2: string; name: string; d: string; centroid: [number, number] }
const atlas = feature(world as never, (world as typeof world).objects.countries as never) as unknown as FeatureCollection<Geometry, { name?: string }>;
const regionalProjection = (region: MapProject['region'], width: number, height: number, collection: FeatureCollection) => {
  if (region === 'World') return geoNaturalEarth1().fitExtent([[35, 35], [width - 35, height - 35]], collection);
  const presets = {
    Europe: { center: [15, 54] as [number, number], scale: 680 },
    Asia: { center: [90, 35] as [number, number], scale: 285 },
    Africa: { center: [20, 2] as [number, number], scale: 390 },
    'North America': { center: [-100, 38] as [number, number], scale: 310 },
    'South America': { center: [-60, -20] as [number, number], scale: 400 },
    Oceania: { center: [145, -22] as [number, number], scale: 320 },
  } as const;
  const preset = presets[region];
  return geoMercator().center(preset.center).scale(preset.scale * width / 1200).translate([width / 2, height / 2]).clipExtent([[10, 10], [width - 10, height - 10]]);
};

export function buildMapShapes(countries: MapCountry[], project: Pick<MapProject, 'region'>, width = 1200, height = 760): MapShape[] {
  const byNumber = new Map(countries.filter(country => project.region === 'World' || country.continent === project.region).map(country => [Number(country.ccn3), country]));
  const matched = atlas.features.flatMap(item => {
    const country = byNumber.get(Number(item.id));
    return country ? [{ item, country }] : [];
  });
  if (!matched.length) return [];
  const collection: FeatureCollection = { type: 'FeatureCollection', features: matched.map(match => match.item as Feature) };
  const projection = regionalProjection(project.region, width, height, collection);
  const path = geoPath(projection);
  return matched.flatMap(({ item, country }) => {
    const d = path(item);
    if (!d) return [];
    return [{ iso2: country.iso2, name: country.name, d, centroid: path.centroid(item) as [number, number] }];
  });
}

const escapeXml = (value: string) => value.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' }[character]!));
export function mapProjectSvg(project: MapProject, countries: MapCountry[], width = 1200, height = 760) {
  const highlights = new Map(project.highlights.map(item => [item.country, item]));
  const shapes = buildMapShapes(countries, project, width, height);
  const paths = shapes.map(shape => `<path d="${shape.d}" fill="${highlights.get(shape.iso2)?.color || project.landColor}" stroke="${project.borderColor}" stroke-width="1.5"><title>${escapeXml(shape.name)}</title></path>`).join('');
  const labels = project.showLabels ? shapes.flatMap(shape => {
    const item = highlights.get(shape.iso2);
    if (!item) return [];
    return [`<g><circle cx="${shape.centroid[0]}" cy="${shape.centroid[1]}" r="4" fill="#172033"/><text x="${shape.centroid[0]}" y="${shape.centroid[1] - 10}" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" font-weight="700" fill="#172033" stroke="#ffffff" stroke-width="4" paint-order="stroke">${escapeXml(item.label)}</text></g>`];
  }).join('') : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="${escapeXml(project.title)}"><rect width="100%" height="100%" fill="${project.backgroundColor}"/><g>${paths}</g>${labels}</svg>`;
}
