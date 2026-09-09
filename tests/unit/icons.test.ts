import { describe, expect, it } from 'vitest';
import { iconNames, iconPaths, type IconName } from '../../src/lib/data/icons';
import { freelanceCopy } from '../../src/lib/data/freelanceCopy';
import { businessShowcases, faqItems, pricingPackages } from '../../src/lib/data/freelanceData';
import { locales } from '../../src/lib/data/uiCopy';

const collectStrings = (value: unknown, found: string[] = []): string[] => {
  if (typeof value === 'string') found.push(value);
  else if (Array.isArray(value)) value.forEach((entry) => collectStrings(entry, found));
  else if (value && typeof value === 'object') Object.values(value).forEach((entry) => collectStrings(entry, found));
  return found;
};

describe('inline icon registry', () => {
  it('exposes every icon as at least one drawable path', () => {
    expect(iconNames.length).toBeGreaterThan(0);
    for (const name of iconNames) {
      const paths = iconPaths[name];
      expect(paths.length, `${name} has no path`).toBeGreaterThan(0);
      for (const d of paths) {
        // Path harus mulai dari perintah move-to, kalau tidak SVG diam-diam
        // merender kosong tanpa error.
        expect(d.trimStart().startsWith('M') || d.trimStart().startsWith('m'), `${name}: ${d}`).toBe(true);
      }
    }
  });

  it('starts every absolute path inside the 24x24 canvas the component renders', () => {
    for (const name of iconNames) {
      for (const d of iconPaths[name]) {
        // Hanya move-to absolut yang bisa divalidasi langsung; angka setelah
        // perintah relatif (m/a/c) adalah delta, bukan koordinat kanvas.
        if (!d.startsWith('M')) continue;
        const [x, y] = (
          d
            .slice(1)
            .trim()
            .match(/-?\d+(\.\d+)?/g) ?? []
        )
          .slice(0, 2)
          .map(Number);
        for (const coordinate of [x, y]) {
          expect(coordinate, `${name} starts outside the canvas: ${d}`).toBeGreaterThanOrEqual(0);
          expect(coordinate, `${name} starts outside the canvas: ${d}`).toBeLessThanOrEqual(24);
        }
      }
    }
  });

  it('assigns a registered icon to every service card in both locales', () => {
    for (const locale of locales) {
      const items = freelanceCopy[locale].services.items;
      expect(items.length).toBeGreaterThan(0);
      for (const item of items) {
        expect(iconNames).toContain(item.icon as IconName);
        // Tag tinggal label teks — kurung siku digantikan ikon SVG.
        expect(item.tag).not.toMatch(/[[\]]/);
      }
    }
  });

  it('assigns the same icon to a service card regardless of locale', () => {
    const idIcons = freelanceCopy.id.services.items.map((item) => item.icon);
    const enIcons = freelanceCopy.en.services.items.map((item) => item.icon);
    expect(idIcons).toEqual(enIcons);
  });
});

describe('freelance copy stays free of emoji', () => {
  // Emoji dirender berbeda tiap OS, tidak mewarisi warna teks, dan tidak
  // punya ketebalan garis — semua ikon halaman ini wajib SVG inline.
  const pictographs = /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}]/u;
  const arrows = /[\u{2190}-\u{21FF}]/u;
  const variationSelector = /\u{FE0F}/u;
  const isDecorativeGlyph = (text: string) =>
    pictographs.test(text) || arrows.test(text) || variationSelector.test(text);

  it('has no emoji or arrow glyphs in copy, packages, FAQ, or showcase data', () => {
    const strings = [
      ...collectStrings(freelanceCopy),
      ...collectStrings(pricingPackages),
      ...collectStrings(faqItems),
      ...collectStrings(businessShowcases),
    ];

    const offenders = strings.filter(isDecorativeGlyph);
    expect(offenders, `emoji/arrow glyphs found: ${offenders.join(' | ')}`).toEqual([]);
  });
});
