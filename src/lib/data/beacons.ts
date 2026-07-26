import type { ProjectSlug } from './projects';

export type Beacon =
  | {
      readonly kind: 'hq';
      readonly hq: true;
      readonly slug: 'hq';
      readonly label: string;
      readonly city: string;
      readonly lonlat: readonly [number, number];
    }
  | {
      readonly kind: 'project';
      readonly hq: false;
      readonly slug: ProjectSlug;
      readonly label: string;
      readonly city: string;
      readonly lonlat: readonly [number, number];
    };

/**
 * Setiap sistem yang di-ship jadi satu titik cahaya di peta.
 * Kota dipilih untuk sebaran visual di seluruh nusantara —
 * beacon adalah metafora "sistem menyala", bukan lokasi deploy literal.
 */
export const beacons = [
  { kind: 'hq', hq: true, slug: 'hq', label: 'Ryan Prayoga — HQ', city: 'Tangerang', lonlat: [106.63, -6.17] },
  { kind: 'project', hq: false, slug: 'cinematix', label: 'CineTix', city: 'Jakarta', lonlat: [106.85, -6.21] },
  { kind: 'project', hq: false, slug: 'pildun', label: 'PILDUN', city: 'Surabaya', lonlat: [112.75, -7.25] },
  { kind: 'project', hq: false, slug: 'koruptorrank', label: 'Koruptor Rank', city: 'Medan', lonlat: [98.67, 3.59] },
  {
    kind: 'project',
    hq: false,
    slug: 'pantauanggaran',
    label: 'Pantau Anggaran',
    city: 'Makassar',
    lonlat: [119.43, -5.14],
  },
  { kind: 'project', hq: false, slug: 'jedug', label: 'JEDUG', city: 'Bandung', lonlat: [107.61, -6.91] },
  { kind: 'project', hq: false, slug: 'brunogen', label: 'Brunogen', city: 'Yogyakarta', lonlat: [110.37, -7.8] },
  { kind: 'project', hq: false, slug: 'messhub', label: 'MessHub', city: 'Balikpapan', lonlat: [116.83, -1.24] },
  {
    kind: 'project',
    hq: false,
    slug: 'komikreader',
    label: 'Komik Reader',
    city: 'Palembang',
    lonlat: [104.75, -2.99],
  },
  { kind: 'project', hq: false, slug: 'openrowdb', label: 'OpenRowDB', city: 'Denpasar', lonlat: [115.22, -8.65] },
] as const satisfies readonly Beacon[];

export const projectBeacons = {
  cinematix: beacons[1],
  pildun: beacons[2],
  koruptorrank: beacons[3],
  pantauanggaran: beacons[4],
  jedug: beacons[5],
  brunogen: beacons[6],
  messhub: beacons[7],
  komikreader: beacons[8],
  openrowdb: beacons[9],
} satisfies Record<ProjectSlug, Extract<Beacon, { readonly kind: 'project' }>>;
