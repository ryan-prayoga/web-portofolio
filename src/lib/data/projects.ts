type ProjectCatalogEntry = {
  readonly name: string;
  readonly slug: string;
  readonly tags: readonly string[];
  readonly stack: readonly string[];
  readonly year: string;
  readonly category: string;
  readonly destination:
    { readonly kind: 'site'; readonly href: string } | { readonly kind: 'source'; readonly href: string };
  readonly thumbnail?: string;
};

export const projects = [
  {
    name: 'CineTix',
    slug: 'cinematix',
    tags: ['Realtime', 'PWA', '3D Seat-POV'],
    stack: ['Next.js', 'Express', 'Socket.IO', 'PostgreSQL', 'Prisma'],
    year: '2026',
    category: 'Realtime Product',
    destination: { kind: 'site', href: 'https://cinema.ryanprayoga.dev' },
    thumbnail: '/v3/projects/cinematix.webp',
  },
  {
    name: 'PILDUN',
    slug: 'pildun',
    tags: ['World Cup 2026', 'Realtime', 'Prediction'],
    stack: ['SvelteKit', 'PostgreSQL', 'PM2', 'Caddy'],
    year: '2026',
    category: 'Realtime Product',
    destination: { kind: 'site', href: 'https://pildun.ryanprayoga.dev' },
    thumbnail: '/v3/projects/pildun.webp',
  },
  {
    name: 'Koruptor Rank',
    slug: 'koruptorrank',
    tags: ['Civic Tech', 'Data', 'Ranking'],
    stack: ['SvelteKit', 'PostgreSQL'],
    year: '2026',
    category: 'Civic Tech',
    destination: { kind: 'site', href: 'https://koruptor-rank.ryanprayoga.dev' },
    thumbnail: '/v3/projects/koruptorrank.webp',
  },
  {
    name: 'Pantau Anggaran',
    slug: 'pantauanggaran',
    tags: ['Civic Tech', 'AI', 'Dashboard'],
    stack: ['SvelteKit', 'Go', 'PostgreSQL', 'PostGIS'],
    year: '2026',
    category: 'Civic Tech',
    destination: { kind: 'site', href: 'https://pantauanggaran.ryanprayoga.dev' },
    thumbnail: '/v3/projects/pantauanggaran.webp',
  },
  {
    name: 'JEDUG',
    slug: 'jedug',
    tags: ['Civic Tech', 'Map', 'Moderation'],
    stack: ['Go Fiber', 'SvelteKit', 'PostgreSQL', 'PostGIS', 'MapLibre'],
    year: '2026',
    category: 'Civic Tech',
    destination: { kind: 'site', href: 'https://jedug.id' },
    thumbnail: '/v3/projects/jedug.webp',
  },
  {
    name: 'Brunogen',
    slug: 'brunogen',
    tags: ['CLI', 'OpenAPI', 'npm'],
    stack: ['TypeScript', 'OpenAPI', 'AST Parsing', 'Vitest'],
    year: '2026',
    category: 'Developer Tooling',
    destination: { kind: 'site', href: 'https://www.npmjs.com/package/brunogen' },
  },
  {
    name: 'MessHub',
    slug: 'messhub',
    tags: ['Realtime', 'Operations', 'PWA'],
    stack: ['Go', 'SvelteKit', 'WebSocket', 'PostgreSQL'],
    year: '2026',
    category: 'Realtime Product',
    destination: { kind: 'site', href: 'https://messhub.ryanprayoga.dev' },
    thumbnail: '/v3/projects/messhub.webp',
  },
  {
    name: 'Komik Reader',
    slug: 'komikreader',
    tags: ['Media', 'Self-Hosted', 'Reader'],
    stack: ['SvelteKit', 'Suwayomi', 'Keiyoushi'],
    year: '2026',
    category: 'Media Product',
    destination: { kind: 'source', href: 'https://github.com/ryan-prayoga/komik-reader' },
    thumbnail: '/v3/projects/komikreader.webp',
  },
  {
    name: 'OpenRowDB',
    slug: 'openrowdb',
    tags: ['macOS', 'Native', 'Open Source'],
    stack: ['Swift', 'SwiftUI', 'PostgreSQL', 'MySQL'],
    year: '2026',
    category: 'Developer Tooling',
    destination: { kind: 'source', href: 'https://github.com/ryan-prayoga/openrowdb' },
    thumbnail: '/v3/projects/openrowdb.webp',
  },
] as const satisfies readonly ProjectCatalogEntry[];

export type ProjectSlug = (typeof projects)[number]['slug'];
export type Project = ProjectCatalogEntry & { readonly slug: ProjectSlug };
export const portfolioProjects: readonly Project[] = projects;
