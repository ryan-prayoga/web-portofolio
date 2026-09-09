import type { Reroute } from '@sveltejs/kit';

/**
 * Universal SvelteKit reroute hook.
 *
 * Mendeteksi jika pengguna mengakses domain freelance (baik di produksi freelance.ryanprayoga.dev
 * ataupun testing lokal freelance.localhost), lalu mengarahkan rute root '/' ke '/freelance'
 * sehingga hidrasi client-side router langsung cocok dengan konten static prerender freelance.html.
 */
export const reroute: Reroute = ({ url }) => {
  const isFreelanceHost = url.hostname === 'freelance.ryanprayoga.dev' || url.hostname.startsWith('freelance.');

  if (isFreelanceHost) {
    if (url.pathname === '/') {
      return '/freelance';
    }
  }
};
