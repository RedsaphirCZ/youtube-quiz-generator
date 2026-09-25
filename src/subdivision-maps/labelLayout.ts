import { geoContains, geoPath } from 'd3-geo';
import type { GeoProjection } from 'd3-geo';
import type { Feature, Geometry } from 'geojson';
import type { DivisionProperties } from './subdivisionMap';

type Region = Feature<Geometry, DivisionProperties>;
type Box = { left: number; top: number; right: number; bottom: number };
type Segment = { x1: number; y1: number; x2: number; y2: number; left: number; top: number; right: number; bottom: number };
export type LabelPlacement = { id: string; kind: 'inside' | 'callout'; box: Box };
const fixed = (value: number) => value.toFixed(1);
const xml = (value: string) => value.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' }[character]!));
const collides = (a: Box, b: Box) => a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;

function wrapped(name: string, maxCharacters: number) {
  const words = name.split(' ');
  const lines: string[] = [];
  let line = '';
  for (const word of words) {
    if (line && (line + ' ' + word).length > maxCharacters) { lines.push(line); line = word; }
    else line += (line ? ' ' : '') + word;
  }
  if (line) lines.push(line);
  return lines;
}

function projectedEdges(region: Region, projection: GeoProjection) {
  const polygons = region.geometry.type === 'Polygon' ? [region.geometry.coordinates] : region.geometry.type === 'MultiPolygon' ? region.geometry.coordinates : [];
  const edges: Segment[] = [];
  for (const polygon of polygons) for (const ring of polygon) {
    for (let index = 1; index < ring.length; index++) {
      const a = projection(ring[index - 1] as [number, number]);
      const b = projection(ring[index] as [number, number]);
      if (!a || !b) continue;
      edges.push({ x1: a[0], y1: a[1], x2: b[0], y2: b[1], left: Math.min(a[0], b[0]), top: Math.min(a[1], b[1]), right: Math.max(a[0], b[0]), bottom: Math.max(a[1], b[1]) });
    }
  }
  return edges;
}

function edgeHitsBox(edge: Segment, box: Box) {
  if (edge.right < box.left || edge.left > box.right || edge.bottom < box.top || edge.top > box.bottom) return false;
  const dx = edge.x2 - edge.x1, dy = edge.y2 - edge.y1;
  const p = [-dx, dx, -dy, dy], q = [edge.x1 - box.left, box.right - edge.x1, edge.y1 - box.top, box.bottom - edge.y1];
  let enter = 0, exit = 1;
  for (let index = 0; index < 4; index++) {
    if (p[index] === 0) { if (q[index] < 0) return false; continue; }
    const ratio = q[index] / p[index];
    if (p[index] < 0) enter = Math.max(enter, ratio);
    else exit = Math.min(exit, ratio);
    if (enter > exit) return false;
  }
  return true;
}

function insideRegion(region: Region, projection: GeoProjection, box: Box, edges: Segment[]) {
  for (const [fx, fy] of [[.03, .03], [.97, .03], [.5, .5], [.03, .97], [.97, .97]]) {
    const point = projection.invert?.([box.left + (box.right - box.left) * fx, box.top + (box.bottom - box.top) * fy]);
    if (!point || !geoContains(region, point)) return false;
  }
  return !edges.some(edge => edgeHitsBox(edge, box));
}

function renderInside(name: string, cx: number, cy: number, lines: string[], size: number, id: string) {
  const lineHeight = size * 1.17;
  const text = lines.map((line, index) => `<tspan x="${fixed(cx)}" y="${fixed(cy + (index - (lines.length - 1) / 2) * lineHeight)}">${xml(line)}</tspan>`).join('');
  return `<text data-label-id="${xml(id)}" data-label-kind="inside" text-anchor="middle" dominant-baseline="middle" font-family="Georgia, 'Times New Roman', serif" font-size="${size}" fill="#111111" stroke="#ffffff" stroke-width="2.4" stroke-linejoin="round" paint-order="stroke">${text}</text>`;
}

export function layoutMapLabels(features: Region[], projection: GeoProjection, path: ReturnType<typeof geoPath>, crowded: boolean, swissMargins: boolean, canvas = { width: 1600, top: 205, bottom: 816 }, labelFor: (region: Region) => string = region => region.properties.nameEn || region.properties.name) {
  const labels: string[] = [];
  const placements: LabelPlacement[] = [];
  const occupied: Box[] = [];
  const callouts: Region[] = [];
  const mapLeft = Math.min(...features.map(region => path.bounds(region)[0][0]));
  const mapRight = Math.max(...features.map(region => path.bounds(region)[1][0]));
  const ordered = [...features].sort((a, b) => path.area(b) - path.area(a));
  for (const region of ordered) {
    const bounds = path.bounds(region);
    const regionWidth = bounds[1][0] - bounds[0][0];
    if ((swissMargins && path.area(region) < 9000 && regionWidth < 145) || (path.area(region) < 3000 && regionWidth < 80)) { callouts.push(region); continue; }
    const name = labelFor(region);
    const edges = projectedEdges(region, projection);
    const centroid = path.centroid(region);
    const midpoint = [(bounds[0][0] + bounds[1][0]) / 2, (bounds[0][1] + bounds[1][1]) / 2];
    const [cx, cy] = centroid.every(Number.isFinite) ? centroid : midpoint;
    const choice: { best: { score: number; x: number; y: number; lines: string[]; size: number; box: Box } | null } = { best: null };
    for (const size of (crowded ? [16, 14, 12] : [20, 18, 16, 14])) {
      for (const length of (crowded ? [18, 14, 10] : [21, 16, 11])) {
        const lines = wrapped(name, length);
        if (lines.length > 3) continue;
        const width = Math.max(...lines.map(line => line.length)) * size * .64 + 14;
        const height = lines.length * size * 1.17 + 12;
        if (width > regionWidth || height > bounds[1][1] - bounds[0][1]) continue;
        const points: [number, number][] = [[cx, cy], [midpoint[0], midpoint[1]]];
        for (let row = 1; row <= 5; row++) for (let column = 1; column <= 7; column++) {
          points.push([bounds[0][0] + (bounds[1][0] - bounds[0][0]) * column / 8, bounds[0][1] + (bounds[1][1] - bounds[0][1]) * row / 6]);
        }
        for (const [x, y] of points) {
          if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
          const box = { left: x - width / 2, top: y - height / 2, right: x + width / 2, bottom: y + height / 2 };
          if (box.left < 82 || box.right > canvas.width - 82 || box.top < canvas.top || box.bottom > canvas.bottom) continue;
          if (occupied.some(other => collides(box, other))) continue;
          if (!insideRegion(region, projection, box, edges)) continue;
          const score = (crowded ? 16 - size : 20 - size) * 130 + (lines.length - 1) * 13 + Math.hypot(x - cx, y - cy) * .35;
          if (!choice.best || score < choice.best.score) choice.best = { score, x, y, lines, size, box };
        }
      }
      if (choice.best) break;
    }
    const best = choice.best;
    if (best) {
      occupied.push(best.box);
      placements.push({ id: region.properties.id, kind: 'inside', box: best.box });
      labels.push(renderInside(name, best.x, best.y, best.lines, best.size, region.properties.id));
    } else callouts.push(region);
  }

  const leftCount = callouts.filter(region => path.centroid(region)[0] < canvas.width / 2).length;
  for (const side of ['left', 'right'] as const) {
    const sideRegions = callouts.filter(region => side === 'left' ? path.centroid(region)[0] < canvas.width / 2 : path.centroid(region)[0] >= canvas.width / 2).sort((a, b) => path.centroid(a)[1] - path.centroid(b)[1]);
    const railTop = canvas.top + 35, railBottom = canvas.bottom - 35;
    const gap = Math.min(46, (railBottom - railTop) / Math.max(1, sideRegions.length - 1));
    const positions: number[] = [];
    for (const region of sideRegions) {
      const desired = Math.max(railTop, Math.min(railBottom, path.centroid(region)[1]));
      positions.push(Math.max(desired, (positions.at(-1) || railTop - gap) + gap));
    }
    const overflow = Math.max(0, (positions.at(-1) || 0) - railBottom);
    sideRegions.forEach((region, index) => {
      const [x, y] = path.centroid(region);
      if (!Number.isFinite(x) || !Number.isFinite(y)) return;
      const labelY = positions[index] - overflow;
      const number = side === 'left' ? index + 1 : leftCount + index + 1;
      const nameLines = wrapped(labelFor(region), 17);
      const labelX = side === 'left' ? mapLeft - 20 : mapRight + 20;
      const anchor = side === 'left' ? 'end' : 'start';
      const rows = nameLines.map((line, row) => `<tspan x="${labelX}" y="${fixed(labelY + (row - (nameLines.length - 1) / 2) * 18 + 5)}">${row === 0 ? String(number).padStart(2, '0') + ' · ' : ''}${xml(line)}</tspan>`).join('');
      labels.push(`<circle cx="${fixed(x)}" cy="${fixed(y)}" r="11.5" fill="#ffffff" stroke="#111111" stroke-width="1"/><text x="${fixed(x)}" y="${fixed(y + 4)}" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="11" fill="#111111">${number}</text><text data-label-id="${xml(region.properties.id)}" data-label-kind="callout" text-anchor="${anchor}" font-family="Georgia, 'Times New Roman', serif" font-size="15" fill="#111111">${rows}</text>`);
      placements.push({ id: region.properties.id, kind: 'callout', box: { left: side === 'left' ? 0 : labelX, top: labelY - nameLines.length * 10, right: side === 'left' ? labelX : canvas.width, bottom: labelY + nameLines.length * 10 } });
    });
  }
  return { svg: labels.join(''), placements };
}
