import type { RequestHandler } from './$types';

export const prerender = true;

const SITE_URL = 'https://ryanprayoga.dev';

const routes: Array<{ path: string; changefreq: string; priority: string }> = [
  { path: '/', changefreq: 'monthly', priority: '1.0' },
];

export const GET: RequestHandler = async () => {
  const today = new Date().toISOString().split('T')[0];

  const urls = routes
    .map(
      (r) => `  <url>
    <loc>${SITE_URL}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
