import { geoAlbersUsa, geoMercator, geoNaturalEarth1, geoPath } from 'd3-geo';
import type { DivisionCatalogEntry, DivisionCollection, DivisionMapProject } from './subdivisionMap';
import { divisionDisplayName } from './subdivisionMap';
import { layoutMapLabels } from './labelLayout';

const escapeXml = (value: string) => value.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' }[character]!));

export function divisionMapSvg(project: DivisionMapProject, entry: DivisionCatalogEntry, collection: DivisionCollection) {
  const large = entry.iso3 === 'USA' || entry.iso3 === 'CHE';
  const width = large ? 2200 : 1600;
  const height = large ? 1300 : 920;
  const plotTop = large ? 70 : 55;
  const plotBottom = height - (large ? 68 : 58);
  const projection = entry.iso3 === 'USA' ? geoAlbersUsa() : entry.iso3 === 'RUS' || entry.iso3 === 'FJI' ? geoNaturalEarth1() : geoMercator();
  projection.fitExtent(large ? [[230, 80], [1970, 1200]] : [[190, 75], [1410, 830]], collection);
  const path = geoPath(projection);
  const provinces = collection.features.map(feature => {
    const d = path(feature);
    return d ? `<path d="${d}" fill="#ffffff" stroke="#111111" stroke-width="1.8" stroke-linejoin="round"/>` : '';
  }).join('');
  const labels = project.showNames ? layoutMapLabels(
    collection.features, projection, path, collection.features.length > 45, false,
    { width, top: plotTop, bottom: plotBottom },
    feature => divisionDisplayName(feature, entry.iso3, project.labelOverrides),
  ).svg : '';
  const license = entry.sourceLicense.match(/\(([^)]+)\)$/)?.[1] || entry.sourceLicense;
  const credit = `geoBoundaries gbOpen ADM1 · ${entry.source} · ${license}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" style="display:block;width:100%;height:auto" role="img" aria-label="${escapeXml(project.title || entry.country)}">
<rect width="${width}" height="${height}" fill="#ffffff"/>
<g>${provinces}</g><g>${labels}</g>
<text x="${width - 32}" y="${height - 19}" text-anchor="end" font-family="Arial, sans-serif" font-size="11" fill="#666666">${escapeXml(credit)}</text>
</svg>`;
}
