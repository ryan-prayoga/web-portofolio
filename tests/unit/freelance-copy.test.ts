import { describe, expect, it } from 'vitest';
import { freelanceCopy } from '../../src/lib/data/freelanceCopy';
import {
  pricingPackages,
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

  it('provides verified business showcases for services, travel, rental, and enterprise', () => {
    expect(businessShowcases.length).toBeGreaterThanOrEqual(4);
    for (const item of businessShowcases) {
      expect(item.name.length).toBeGreaterThan(0);
      expect(item.href).toMatch(/^https:\/\//);
      for (const locale of locales) {
        expect(item.category[locale].length).toBeGreaterThan(0);
        expect(item.description[locale].length).toBeGreaterThan(0);
      }
    }
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

  it('generates valid WhatsApp URLs with encoded messages', () => {
    const text = 'Halo Ryan, saya mau konsultasi website bisnis!';
    const url = getWhatsAppUrl(text);
    expect(url).toBe(`https://wa.me/${FREELANCE_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`);
    expect(new URL(url).protocol).toBe('https:');
  });
});
