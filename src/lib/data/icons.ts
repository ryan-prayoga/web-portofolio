/**
 * Registry ikon garis (stroke) inline — zero runtime dependency, sejalan
 * dengan `dependencies: {}` di package.json.
 *
 * Aturan bentuk:
 * - Semua path digambar di kanvas 24x24, tanpa `fill`, tebal garis diatur
 *   komponen lewat `stroke-width` agar konsisten dengan estetika sketsa.
 * - Tidak memakai emoji: emoji dirender berbeda tiap OS, tidak mewarisi
 *   warna teks, dan tidak bisa diatur ketebalan garisnya.
 */
export const iconPaths = {
  check: ['M20 6 9 17l-5-5'],
  close: ['M18 6 6 18', 'M6 6l12 12'],
  plus: ['M12 5v14', 'M5 12h14'],
  info: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M12 11.5v5', 'M12 7.75h.01'],
  star: ['m12 3 2.7 5.6 6.1.9-4.4 4.3 1.1 6.1-5.5-2.9-5.5 2.9 1.1-6.1L3.2 9.5l6.1-.9L12 3Z'],
  clock: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M12 7v5.3l3.2 2'],
  arrowDown: ['M12 5v14', 'm19 12-7 7-7-7'],
  arrowUp: ['M12 19V5', 'm5 12 7-7 7 7'],
  arrowLeft: ['M19 12H5', 'M12 19l-7-7 7-7'],
  arrowRight: ['M5 12h14', 'M12 5l7 7-7 7'],
  arrowUpRight: ['M7 17 17 7', 'M8.5 7H17v8.5'],
  message: [
    'M20.5 11.5a8.2 8.2 0 0 1-8.5 8.3 8.9 8.9 0 0 1-4-.95L3.5 20l1.15-4.4a8.2 8.2 0 0 1-.65-3.1 8.2 8.2 0 0 1 8.5-8.3 8.2 8.2 0 0 1 8 7.3Z',
    'M9 11.5h.01',
    'M12.5 11.5h.01',
    'M16 11.5h.01',
  ],
  mail: ['M4 5.5h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1Z', 'm3.6 6.7 8.4 5.8 8.4-5.8'],
  gallery: [
    'M8.5 3h11.5a1 1 0 0 1 1 1v11.5a1 1 0 0 1-1 1H8.5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z',
    'M4 7.5V20a1 1 0 0 0 1 1h12.5',
    'M12.4 8.4a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0Z',
    'm8 14.5 3.3-3.2 2.6 2.5 2.4-2.3L21 15',
  ],
  bolt: ['m13.5 2-9 12h6.2l-1.2 8 9-12h-6.2l1.2-8Z'],
  mapPin: [
    'M20 10.2c0 5.5-8 11.8-8 11.8s-8-6.3-8-11.8a8 8 0 0 1 16 0Z',
    'M14.4 10a2.4 2.4 0 1 1-4.8 0 2.4 2.4 0 0 1 4.8 0Z',
  ],
  globe: [
    'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z',
    'M3.4 9.2h17.2',
    'M3.4 14.8h17.2',
    'M12 3c2.6 3 3.9 6.1 3.9 9s-1.3 6-3.9 9',
    'M12 3c-2.6 3-3.9 6.1-3.9 9s1.3 6 3.9 9',
  ],
  phone: ['M7 2.5h10a1 1 0 0 1 1 1v17a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-17a1 1 0 0 1 1-1Z', 'M10.4 18.4h3.2'],
  pulse: ['M2.5 12.5H7l2.8-7.5 4.2 14 2.6-6.5h4.9'],
} as const;

export type IconName = keyof typeof iconPaths;

export const iconNames = Object.keys(iconPaths) as readonly IconName[];
