import { featuredProjects } from '$lib/data/projects';
import type { RequestHandler } from './$types';

export const prerender = true;

const SITE_URL = 'https://ryanprayoga.dev';

const routes: Array<{ path: string; changefreq: string; priority: string }> = [
  { path: '/', changefreq: 'monthly', priority: '1.0' },
  { path: '/freelance', changefreq: 'weekly', priority: '0.9' },
  ...featuredProjects.map((project) => ({
    path: `/work/${project.slug}`,
    changefreq: 'monthly',
    priority: '0.8',
  })),
];

export const GET: RequestHandler = async () => {
  // Tanpa <lastmod>: stamp tanggal build untuk semua URL = sinyal
  // freshness palsu yang justru bikin Google mengabaikannya.
  const urls = routes
    .map(
      (r) => `  <url>
    <loc>${SITE_URL}${r.path}</loc>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`,
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
