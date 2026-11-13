import type { Locale } from '$lib/data/uiCopy';

type RouteUrl = Pick<URL, 'hostname' | 'pathname'>;

/**
 * Halaman freelance: subdomain freelance.* (produksi maupun freelance.localhost)
 * atau path /freelance di domain utama.
 */
export function isFreelanceUrl(url: RouteUrl): boolean {
  return (
    url.pathname.startsWith('/freelance') ||
    url.hostname === 'freelance.ryanprayoga.dev' ||
    url.hostname.startsWith('freelance.')
  );
}

/**
 * Bahasa bawaan per route, dipakai selama pengunjung belum memilih sendiri.
 * Freelance menyasar UMKM Indonesia, jadi HTML prerender-nya harus Bahasa
 * Indonesia supaya Google mengindeks copy yang benar. Portofolio utama tetap
 * Inggris untuk recruiter.
 */
export function defaultLocaleFor(url: RouteUrl): Locale {
  return isFreelanceUrl(url) ? 'id' : 'en';
}
