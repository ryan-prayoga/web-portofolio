export interface Beacon {
  slug: string;
  label: string;
  city: string;
  /** [longitude, latitude] */
  lonlat: [number, number];
  /** true = home base, rendered larger */
  hq?: boolean;
}

/**
 * Setiap sistem yang di-ship jadi satu titik cahaya di peta.
 * Kota dipilih untuk sebaran visual di seluruh nusantara —
 * beacon adalah metafora "sistem menyala", bukan lokasi deploy literal.
 */
export const beacons: Beacon[] = [
  { slug: 'hq', label: 'Ryan Prayoga — HQ', city: 'Tangerang', lonlat: [106.63, -6.17], hq: true },
  { slug: 'cinematix', label: 'CineTix', city: 'Jakarta', lonlat: [106.85, -6.21] },
  { slug: 'pildun', label: 'PILDUN', city: 'Surabaya', lonlat: [112.75, -7.25] },
  { slug: 'koruptorrank', label: 'Koruptor Rank', city: 'Medan', lonlat: [98.67, 3.59] },
  { slug: 'pantauanggaran', label: 'Pantau Anggaran', city: 'Makassar', lonlat: [119.43, -5.14] },
  { slug: 'jedug', label: 'JEDUG', city: 'Bandung', lonlat: [107.61, -6.91] },
  { slug: 'brunogen', label: 'Brunogen', city: 'Yogyakarta', lonlat: [110.37, -7.8] },
  { slug: 'messhub', label: 'MessHub', city: 'Balikpapan', lonlat: [116.83, -1.24] },
];
