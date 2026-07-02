// Proyeksi equirect sederhana lon/lat → koordinat world three.js.
// X = timur, Z = selatan (three: -Z ke "utara" layar saat kamera menghadap -Z).

export interface ArchipelagoData {
  bounds: [number, number, number, number]; // minLon, minLat, maxLon, maxLat
  step: number;
  count: number;
  points: number[]; // triplet [xq, yq, brightness], quantized 0..32767
}

export const WORLD_WIDTH = 22;

export function makeProjector(bounds: [number, number, number, number]) {
  const [minLon, minLat, maxLon, maxLat] = bounds;
  const k = WORLD_WIDTH / (maxLon - minLon);
  const midLon = (minLon + maxLon) / 2;
  const midLat = (minLat + maxLat) / 2;
  return {
    k,
    lonLatToWorld(lon: number, lat: number): [number, number, number] {
      return [(lon - midLon) * k, 0, (midLat - lat) * k];
    },
    quantizedToWorld(xq: number, yq: number): [number, number, number] {
      const lon = minLon + (xq / 32767) * (maxLon - minLon);
      const lat = minLat + (yq / 32767) * (maxLat - minLat);
      return [(lon - midLon) * k, 0, (midLat - lat) * k];
    },
  };
}
