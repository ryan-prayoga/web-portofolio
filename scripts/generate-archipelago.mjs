#!/usr/bin/env node
/**
 * One-off generator: Indonesia point cloud for the hero 3D scene.
 *
 * Input : Natural Earth 1:50m admin_0 countries GeoJSON (pass path as argv[2])
 * Output: static/data/archipelago.json
 *         { bounds: [minLon, minLat, maxLon, maxLat], step: number,
 *           points: [x0, y0, b0, x1, y1, b1, ...] }  // Int16 quantized 0..32767
 *         x,y normalized to bounds; b = brightness 0..255 (coastline brighter).
 *
 * Run manually (never in CI):
 *   node scripts/generate-archipelago.mjs /path/to/ne_50m_admin_0_countries.geojson
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const src = process.argv[2];
if (!src) {
  console.error('Usage: node scripts/generate-archipelago.mjs <ne_50m_admin_0_countries.geojson>');
  process.exit(1);
}

const world = JSON.parse(readFileSync(src, 'utf8'));
const idn = world.features.find(
  (f) =>
    f.properties?.iso_a3 === 'IDN' ||
    f.properties?.ISO_A3 === 'IDN' ||
    f.properties?.adm0_a3 === 'IDN' ||
    f.properties?.name === 'Indonesia' ||
    f.properties?.NAME === 'Indonesia'
);
if (!idn) {
  console.error('Indonesia feature not found in input GeoJSON');
  process.exit(1);
}

// Normalize to array of polygons; each polygon = [outerRing, ...holes]
const polygons =
  idn.geometry.type === 'MultiPolygon' ? idn.geometry.coordinates : [idn.geometry.coordinates];

function pointInRing([px, py], ring) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    if (yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

function pointInPolygon(pt, polygon) {
  if (!pointInRing(pt, polygon[0])) return false;
  for (let h = 1; h < polygon.length; h++) if (pointInRing(pt, polygon[h])) return false;
  return true;
}

// Bounding box of Indonesia
let minLon = Infinity, minLat = Infinity, maxLon = -Infinity, maxLat = -Infinity;
for (const poly of polygons)
  for (const ring of poly)
    for (const [lon, lat] of ring) {
      if (lon < minLon) minLon = lon;
      if (lon > maxLon) maxLon = lon;
      if (lat < minLat) minLat = lat;
      if (lat > maxLat) maxLat = lat;
    }

const STEP = 0.18; // degrees ≈ 20 km
const pts = [];
// Deterministic pseudo-random jitter so dots don't read as a rigid grid
let seed = 42;
const rand = () => ((seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff);

for (let lat = minLat; lat <= maxLat; lat += STEP) {
  for (let lon = minLon; lon <= maxLon; lon += STEP) {
    const jLon = lon + (rand() - 0.5) * STEP * 0.8;
    const jLat = lat + (rand() - 0.5) * STEP * 0.8;
    const inside = polygons.some((p) => pointInPolygon([jLon, jLat], p));
    if (!inside) continue;
    // Coastline check: any 4-neighbor at STEP outside → brighter edge dot
    const edge = [
      [jLon + STEP, jLat], [jLon - STEP, jLat],
      [jLon, jLat + STEP], [jLon, jLat - STEP],
    ].some((n) => !polygons.some((p) => pointInPolygon(n, p)));
    const brightness = edge ? 200 + Math.floor(rand() * 55) : 90 + Math.floor(rand() * 90);
    pts.push([jLon, jLat, brightness]);
  }
}

// Quantize to Int16 range 0..32767 within bounds
const Q = 32767;
const flat = [];
for (const [lon, lat, b] of pts) {
  flat.push(
    Math.round(((lon - minLon) / (maxLon - minLon)) * Q),
    Math.round(((lat - minLat) / (maxLat - minLat)) * Q),
    b
  );
}

const out = {
  bounds: [minLon, minLat, maxLon, maxLat].map((n) => +n.toFixed(4)),
  step: STEP,
  count: pts.length,
  points: flat,
};

const dest = join(__dirname, '..', 'static', 'data', 'archipelago.json');
mkdirSync(dirname(dest), { recursive: true });
writeFileSync(dest, JSON.stringify(out));
console.log(`✓ ${pts.length} points → ${dest} (${(JSON.stringify(out).length / 1024).toFixed(1)} KB)`);
