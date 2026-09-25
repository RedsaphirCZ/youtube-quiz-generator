import { geoArea } from 'd3-geo';

export function normalizeWinding(geometry) {
  const inverted = polygon => geoArea({ type: 'Polygon', coordinates: polygon }) > 2 * Math.PI;
  if (geometry.type === 'Polygon') return inverted(geometry.coordinates)
    ? { type: 'Polygon', coordinates: geometry.coordinates.map(ring => ring.toReversed()) }
    : geometry;
  const coordinates = geometry.coordinates.map(polygon => inverted(polygon) ? polygon.map(ring => ring.toReversed()) : polygon);
  return coordinates.some((polygon, index) => polygon !== geometry.coordinates[index]) ? { type: 'MultiPolygon', coordinates } : geometry;
}
