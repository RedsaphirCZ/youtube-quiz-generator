import { geoAlbersUsa, geoMercator, geoNaturalEarth1, geoPath } from 'd3-geo';
import type { DivisionCatalogEntry, DivisionCollection, DivisionMapProject } from './subdivisionMap';
import { divisionTypeLabel } from './subdivisionMap';
import { layoutMapLabels } from './labelLayout';

const escapeXml = (value: string) => value.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' }[character]!));
export function divisionMapSvg(project: DivisionMapProject, entry: DivisionCatalogEntry, collection: DivisionCollection) {
  const largeAtlas = entry.iso3 === 'USA' || entry.iso3 === 'CHE';
  const width = largeAtlas ? 2200 : 1600, height = largeAtlas ? 1300 : 920;
  const center = width / 2, right = width - 80;
  const plotTop = largeAtlas ? 255 : 205, plotBottom = largeAtlas ? 1175 : 816;
  const projection = entry.iso3 === 'USA' ? geoAlbersUsa() : entry.iso3 === 'RUS' || entry.iso3 === 'FJI' ? geoNaturalEarth1() : geoMercator();
  projection.fitExtent(largeAtlas ? [[96, 255], [2104, 1170]] : [[96, 195], [1504, 790]], collection);
  const path = geoPath(projection);
  const provinces = collection.features.map(feature => {
    const d = path(feature);
    if (!d) return '';
    return `<path d="${d}" fill="#dfcfab" stroke="#715d41" stroke-width="1.65" stroke-linejoin="round">${project.showNames ? `<title>${escapeXml(feature.properties.nameEn || feature.properties.name)}</title>` : ''}</path>`;
  }).join('');
  const labels = project.showNames ? layoutMapLabels(collection.features, projection, path, collection.features.length > 45, false, { width, top: plotTop, bottom: plotBottom }).svg : '';
  const title = escapeXml(project.title || entry.country);
  const descriptor = `${collection.features.length} ${divisionTypeLabel(entry).toUpperCase()} · ${project.showNames ? 'ENGLISH NAMES' : 'BLANK MAP'}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" style="display:block;width:100%;height:auto" role="img" aria-label="${title}">
<defs>
  <pattern id="paper" width="26" height="26" patternUnits="userSpaceOnUse"><path d="M0 13h26M13 0v26" fill="none" stroke="#fff8eb" stroke-width=".4" opacity=".36"/><circle cx="4" cy="5" r=".55" fill="#9c8668" opacity=".3"/></pattern>
  <pattern id="hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(42)"><path d="M0 0v8" stroke="#b9a787" stroke-width=".35" opacity=".2"/></pattern>
</defs>
<rect width="${width}" height="${height}" fill="#eee3ca"/><rect width="${width}" height="${height}" fill="url(#paper)"/>
<rect x="24" y="24" width="${width - 48}" height="${height - 48}" fill="none" stroke="#6f5b3e" stroke-width="2"/><rect x="34" y="34" width="${width - 68}" height="${height - 68}" fill="none" stroke="#a58c67" stroke-width="1"/>
<path d="M58 58h92m-92 0v92M${width - 58} 58h-92m92 0v92M58 ${height - 58}h92m-92 0v-92M${width - 58} ${height - 58}h-92m92 0v-92" fill="none" stroke="#a18a66" stroke-width="1.2"/>
<text x="${center}" y="88" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="15" letter-spacing="5" fill="#705d40">ATLAS OF ADMINISTRATIVE REGIONS</text>
<text x="${center}" y="145" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="48" font-weight="700" fill="#2e291f">${title}</text>
<path d="M${center - 515} 165h405m220 0h405" stroke="#8c7350" stroke-width="1.4"/><path d="M${center} 155l12 10-12 10-12-10z" fill="#8c7350"/>
<text x="${center}" y="188" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="14" letter-spacing="2.5" fill="#735d42">${escapeXml(descriptor)}</text>
<g opacity=".65"><path d="M75 ${height / 2}h40m-20-20v40M${width - 115} ${height / 2}h40m-20-20v40" stroke="#a18a66" stroke-width="1"/><circle cx="95" cy="${height / 2}" r="15" fill="none" stroke="#a18a66" stroke-width=".6"/><circle cx="${width - 95}" cy="${height / 2}" r="15" fill="none" stroke="#a18a66" stroke-width=".6"/></g>
<g>${provinces}</g><g>${labels}</g>
<path d="M72 ${height - 89}h${width - 144}" stroke="#8c7350" stroke-width="1"/>
<text x="80" y="${height - 63}" font-family="Georgia, 'Times New Roman', serif" font-size="13" font-style="italic" fill="#665640">First-level administrative divisions · ${escapeXml(entry.country)}</text>
<text x="${right}" y="${height - 63}" text-anchor="end" font-family="Georgia, 'Times New Roman', serif" font-size="12" fill="#665640">Boundary data: geoBoundaries gbOpen ADM1 · ${escapeXml(entry.sourceLicense)} · ${escapeXml(entry.year || 'year unspecified')}</text>
</svg>`;
}
