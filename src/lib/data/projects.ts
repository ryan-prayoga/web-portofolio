type ProjectCatalogEntry = {
  readonly name: string;
  readonly slug: string;
  readonly featured: boolean;
  readonly tags: readonly string[];
  readonly stack: readonly string[];
  readonly year: string;
  readonly category: string;
  readonly destination:
    | { readonly kind: 'site'; readonly href: string }
    | { readonly kind: 'package'; readonly href: string }
    | { readonly kind: 'source'; readonly href: string };
  readonly thumbnail?: string;
};

/**
 * Katalog terkurasi hasil survey seluruh repo (Jul 2026):
 * 3 featured (case study penuh) + 4 grid. Kurasi > kuantitas —
 * hanya project dengan bukti (live / published / test+CI) yang tampil.
 */
export const projects = [
  {
    name: 'Pantau Anggaran',
    slug: 'pantauanggaran',
    featured: true,
    tags: ['Civic Tech', 'PostGIS', 'ML Clustering'],
    stack: ['Go', 'SvelteKit', 'PostgreSQL', 'PostGIS', 'Python', 'Redis'],
    year: '2026',
    category: 'Data Engineering',
    destination: { kind: 'site', href: 'https://pantauanggaran.ryanprayoga.dev' },
    thumbnail: '/v3/projects/pantauanggaran.webp',
  },
  {
    name: 'Putra Selamat Makmur',
    slug: 'putraselamatmakmur',
    featured: true,
    tags: ['Client Work', 'SEO', 'Company Profile'],
    stack: ['SvelteKit', 'Tailwind', 'Go', 'Caddy'],
    year: '2026',
    category: 'Client Delivery',
    destination: { kind: 'site', href: 'https://putraselamatmakmur.com' },
    thumbnail: '/v3/projects/putraselamatmakmur.webp',
  },
  {
    name: 'Brunogen',
    slug: 'brunogen',
    featured: true,
    tags: ['CLI', 'OpenAPI', 'npm', 'MCP'],
    stack: ['TypeScript', 'AST Parsing', 'OpenAPI', 'Vitest'],
    year: '2026',
    category: 'Developer Tooling',
    destination: { kind: 'package', href: 'https://www.npmjs.com/package/brunogen' },
  },
  {
    name: 'CineTix',
    slug: 'cinematix',
    featured: false,
    tags: ['Realtime', 'PWA', '3D Seat-POV'],
    stack: ['Next.js', 'Express', 'Socket.IO', 'PostgreSQL', 'Prisma'],
    year: '2026',
    category: 'Realtime Product',
    destination: { kind: 'site', href: 'https://cinema.ryanprayoga.dev' },
    thumbnail: '/v3/projects/cinematix.webp',
  },
  {
    name: 'JEDUG',
    slug: 'jedug',
    featured: false,
    tags: ['Civic Tech', 'SSE', 'Web Push'],
    stack: ['Go Fiber', 'SvelteKit', 'PostgreSQL', 'PostGIS', 'MapLibre'],
    year: '2026',
    category: 'Civic Tech',
    destination: { kind: 'site', href: 'https://jedug.id' },
    thumbnail: '/v3/projects/jedug.webp',
  },
  {
    name: 'OpenRowDB',
    slug: 'openrowdb',
    featured: false,
    tags: ['macOS', 'Native', 'Open Source'],
    stack: ['Swift', 'SwiftUI', 'PostgreSQL', 'MySQL'],
    year: '2026',
    category: 'Developer Tooling',
    destination: { kind: 'source', href: 'https://github.com/ryan-prayoga/openrowdb' },
    thumbnail: '/v3/projects/openrowdb.webp',
  },
  {
    name: 'Komik Reader',
    slug: 'komikreader',
    featured: false,
    tags: ['PWA', 'Self-Hosted', 'CI/CD'],
    stack: ['SvelteKit', 'SQLite', 'Playwright', 'Docker'],
    year: '2026',
    category: 'Media Product',
    destination: { kind: 'source', href: 'https://github.com/ryan-prayoga/komik-reader' },
    thumbnail: '/v3/projects/komikreader.webp',
  },
] as const satisfies readonly ProjectCatalogEntry[];

export type ProjectSlug = (typeof projects)[number]['slug'];
export type Project = ProjectCatalogEntry & { readonly slug: ProjectSlug };
export const portfolioProjects: readonly Project[] = projects;

export type FeaturedSlug = Extract<(typeof projects)[number], { featured: true }>['slug'];
export const featuredProjects = projects.filter((project) => project.featured);
