import { describe, expect, it } from 'vitest';
import { defaultLocaleFor, isFreelanceUrl } from '../../src/lib/utils/routeLocale';

const url = (href: string) => new URL(href);

describe('route locale', () => {
  it('treats the freelance subdomain and /freelance path as the freelance page', () => {
    expect(isFreelanceUrl(url('https://freelance.ryanprayoga.dev/'))).toBe(true);
    expect(isFreelanceUrl(url('http://freelance.localhost:5173/'))).toBe(true);
    expect(isFreelanceUrl(url('https://ryanprayoga.dev/freelance'))).toBe(true);
  });

  it('keeps portfolio and case study routes out of the freelance layout', () => {
    expect(isFreelanceUrl(url('https://ryanprayoga.dev/'))).toBe(false);
    expect(isFreelanceUrl(url('https://ryanprayoga.dev/work/kasbadminton'))).toBe(false);
  });

  it('defaults freelance to Indonesian and the portfolio to English', () => {
    expect(defaultLocaleFor(url('https://freelance.ryanprayoga.dev/'))).toBe('id');
    expect(defaultLocaleFor(url('http://sveltekit-prerender/freelance'))).toBe('id');
    expect(defaultLocaleFor(url('https://ryanprayoga.dev/'))).toBe('en');
    expect(defaultLocaleFor(url('https://ryanprayoga.dev/404'))).toBe('en');
  });
});
