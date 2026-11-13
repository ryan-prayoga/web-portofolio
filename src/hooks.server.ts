import type { Handle } from '@sveltejs/kit';
import { defaultLocaleFor } from '$lib/utils/routeLocale';

/**
 * Mengisi <html lang> saat prerender supaya cocok dengan bahasa copy yang
 * ditulis ke HTML statis (freelance = id, sisanya = en).
 */
export const handle: Handle = ({ event, resolve }) =>
  resolve(event, {
    transformPageChunk: ({ html }) => html.replace('%lang%', defaultLocaleFor(event.url)),
  });
