import { describe, expect, it } from 'vitest';
import { freelanceCopy } from '../../src/lib/data/freelanceCopy';
import {
  pricingPackages,
  revisionPacks,
  faqItems,
  businessShowcases,
  getWhatsAppUrl,
  FREELANCE_CONFIG,
} from '../../src/lib/data/freelanceData';
import { locales } from '../../src/lib/data/uiCopy';

describe('freelance copy & data contract', () => {
  it('covers all locales with identical top-level keys', () => {
    expect(locales).toEqual(['en', 'id']);
    const idKeys = Object.keys(freelanceCopy.id).sort();
    const enKeys = Object.keys(freelanceCopy.en).sort();
    expect(idKeys).toEqual(enKeys);
  });

  it('has consistent nav and hero copy across locales', () => {
    for (const locale of locales) {
      const copy = freelanceCopy[locale];
      expect(copy.nav.services.length).toBeGreaterThan(0);
      expect(copy.nav.packages.length).toBeGreaterThan(0);
      expect(copy.hero.title.length).toBeGreaterThan(0);
      expect(copy.hero.metrics).toHaveLength(4);
    }
  });

  const toNumber = (priceIdr: string) => Number(priceIdr.replace(/[^0-9]/g, ''));

  it('provides three valid pricing packages priced in Rupiah without foreign currency', () => {
    expect(pricingPackages).toHaveLength(3);
    for (const pkg of pricingPackages) {
      expect(pkg.id).toBeTruthy();
      expect(pkg.priceIdr).toMatch(/^Rp\s/);
      for (const locale of locales) {
        expect(pkg.name[locale].length).toBeGreaterThan(0);
        expect(pkg.description[locale].length).toBeGreaterThan(0);
        expect(pkg.features[locale].length).toBeGreaterThanOrEqual(6);
        expect(pkg.ctaMessage[locale].length).toBeGreaterThan(0);
      }
    }
  });

  it('only showcases business systems that are verified live in production', () => {
    // Kontrak: halaman jualan hanya boleh memajang sistem yang benar-benar
    // jalan dan bisa diklik calon klien. Tambah entri baru hanya setelah
    // URL-nya terverifikasi hidup.
    expect(businessShowcases.map((item) => item.slug)).toEqual(['kasbadminton', 'putraselamatmakmur']);
    for (const item of businessShowcases) {
      expect(item.name.length).toBeGreaterThan(0);
      expect(item.href).toMatch(/^https:\/\//);
      for (const locale of locales) {
        expect(item.category[locale].length).toBeGreaterThan(0);
        expect(item.description[locale].length).toBeGreaterThan(0);
      }
    }
  });

  it('opens at a price that clears the domain and hosting it gives away', () => {
    // Setiap paket menanggung domain (.co.id paling mahal, ~Rp 280.000) dan
    // hosting tahun pertama. Paket termurah harus tetap menyisakan margin
    // yang jelas di atas biaya itu, kalau tidak penjualan justru merugi.
    const firstYearCost = 280_000 + 150_000;
    const cheapest = Math.min(...pricingPackages.map((pkg) => toNumber(pkg.priceIdr)));

    expect(cheapest).toBeGreaterThan(firstYearCost * 2);
  });

  it('keeps the schema.org price value in sync with the price shown to visitors', () => {
    // Harga di rich result Google yang berbeda dari harga di halaman adalah
    // pelanggaran structured data sekaligus sumber sengketa dengan klien.
    for (const pkg of pricingPackages) {
      expect(Number(pkg.priceValue)).toBe(toNumber(pkg.priceIdr));
    }
  });

  it('orders the packages from cheapest to most expensive', () => {
    const prices = pricingPackages.map((pkg) => toNumber(pkg.priceIdr));
    expect([...prices].sort((a, b) => a - b)).toEqual(prices);
  });

  it('includes a free first-year domain in every package', () => {
    for (const pkg of pricingPackages) {
      const starterOffersDomain = pkg.features.id.some((feature) => /domain/i.test(feature));
      const inheritsFromCheaperTier = pkg.features.id.some((feature) => /Semua fitur/i.test(feature));
      expect(starterOffersDomain || inheritsFromCheaperTier).toBe(true);
    }
  });

  it('sells major requests in packs that get cheaper per request as they grow', () => {
    expect(revisionPacks.length).toBeGreaterThanOrEqual(3);

    const perRequest = revisionPacks.map((pack) => toNumber(pack.perRequestIdr));
    expect([...perRequest].sort((a, b) => b - a)).toEqual(perRequest);

    for (const pack of revisionPacks) {
      expect(pack.requests).toMatch(/^\d+ - \d+$/);
      expect(pack.priceIdr).toMatch(/^Rp\s/);

      // Harga per request harus benar-benar turun dari harga paket dibagi
      // jumlah maksimum request, bukan angka pemanis yang dikarang.
      const [min, max] = pack.requests.split(' - ').map(Number);
      expect(min).toBeLessThan(max);
      const honestPerRequest = toNumber(pack.priceIdr) / max;
      expect(Math.abs(honestPerRequest - toNumber(pack.perRequestIdr))).toBeLessThanOrEqual(1_000);

      for (const locale of locales) {
        expect(pack.note[locale].length).toBeGreaterThan(0);
        expect(pack.ctaMessage[locale].length).toBeGreaterThan(0);
      }
    }
  });

  it('explains the minor versus major boundary in the FAQ', () => {
    const answers = faqItems.flatMap((item) => [item.answer.id.toLowerCase(), item.answer.en.toLowerCase()]);
    const joined = answers.join(' ');

    expect(joined).toContain('minor');
    expect(joined).toContain('major');
    // Harga paket request harus tertulis di FAQ, bukan hanya di kartu harga.
    expect(joined).toContain('400.000');
    expect(joined).toContain('400,000');
  });

  it('provides bilingual FAQ items', () => {
    expect(faqItems.length).toBeGreaterThanOrEqual(4);
    for (const item of faqItems) {
      for (const locale of locales) {
        expect(item.question[locale].endsWith('?')).toBe(true);
        expect(item.answer[locale].length).toBeGreaterThan(20);
      }
    }
  });

  it('points every CTA at a real Indonesian WhatsApp number, never a placeholder', () => {
    const number = FREELANCE_CONFIG.whatsappNumber;
    // Format internasional tanpa '+', 62 + 9-13 digit.
    expect(number).toMatch(/^62[1-9]\d{8,12}$/);
    // Placeholder klasik yang pernah lolos ke produksi dan mematikan
    // seluruh funnel penjualan halaman freelance.
    expect(number).not.toBe('6281234567890');
    expect(/^62(\d)\1+$/.test(number)).toBe(false);
  });

  it('keeps every copy key in sync between locales, including nested sections', () => {
    const shape = (value: unknown): unknown => {
      if (Array.isArray(value)) return value.map(shape);
      if (value && typeof value === 'object') {
        return Object.fromEntries(
          Object.entries(value as Record<string, unknown>)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([key, nested]) => [key, shape(nested)]),
        );
      }
      return typeof value;
    };
    expect(shape(freelanceCopy.id)).toEqual(shape(freelanceCopy.en));
  });

  it('generates valid WhatsApp URLs with encoded messages', () => {
    const text = 'Halo Ryan, saya mau konsultasi website bisnis!';
    const url = getWhatsAppUrl(text);
    expect(url).toBe(`https://wa.me/${FREELANCE_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`);
    expect(new URL(url).protocol).toBe('https:');
  });
});
