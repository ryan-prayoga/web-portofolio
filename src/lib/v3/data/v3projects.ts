export interface V3Project {
  name: string;
  slug: string;
  tags: string[];
  stack: string[];
  year: string;
  category: string;
  url?: string;
  source?: string;
  thumbnail?: string;
}

export const v3projects: V3Project[] = [
  {
    name: 'CineTix',
    slug: 'cinematix',
    tags: ['Realtime', 'PWA', '3D Seat-POV'],
    stack: ['Next.js', 'Express', 'Socket.IO', 'PostgreSQL', 'Prisma'],
    year: '2026',
    category: 'Realtime Product',
    url: 'https://cinema.ryanprayoga.dev',
    source: 'https://github.com/ryan-prayoga/cinema-tix',
    thumbnail: '/v3/projects/cinematix.png',
  },
  {
    name: 'PILDUN',
    slug: 'pildun',
    tags: ['World Cup 2026', 'Realtime', 'Prediction'],
    stack: ['SvelteKit', 'PostgreSQL', 'PM2', 'Caddy'],
    year: '2026',
    category: 'Realtime Product',
    url: 'https://pildun.ryanprayoga.dev',
    source: 'https://github.com/ryan-prayoga/pildun',
    thumbnail: '/v3/projects/pildun.png',
  },
  {
    name: 'Koruptor Rank',
    slug: 'koruptorrank',
    tags: ['Civic Tech', 'Data', 'Ranking'],
    stack: ['SvelteKit', 'PostgreSQL'],
    year: '2026',
    category: 'Civic Tech',
    url: 'https://koruptor-rank.ryanprayoga.dev',
    source: 'https://github.com/ryan-prayoga/koruptor-rank',
    thumbnail: '/v3/projects/koruptorrank.png',
  },
  {
    name: 'Pantau Anggaran',
    slug: 'pantauanggaran',
    tags: ['Civic Tech', 'AI', 'Dashboard'],
    stack: ['SvelteKit', 'Go', 'PostgreSQL', 'PostGIS'],
    year: '2026',
    category: 'Civic Tech',
    url: 'https://pantauanggaran.ryanprayoga.dev',
    source: 'https://github.com/ryan-prayoga/pantau-anggaran',
    thumbnail: '/v3/projects/pantauanggaran.png',
  },
  {
    name: 'JEDUG',
    slug: 'jedug',
    tags: ['Civic Tech', 'Map', 'Moderation'],
    stack: ['Go Fiber', 'SvelteKit', 'PostgreSQL', 'PostGIS', 'MapLibre'],
    year: '2026',
    category: 'Civic Tech',
    url: 'https://jedug.id',
    source: 'https://github.com/ryan-prayoga/jedug_v2',
    thumbnail: '/v3/projects/jedug.png',
  },
  {
    name: 'Brunogen',
    slug: 'brunogen',
    tags: ['CLI', 'OpenAPI', 'npm'],
    stack: ['TypeScript', 'OpenAPI', 'AST Parsing', 'Vitest'],
    year: '2026',
    category: 'Developer Tooling',
    url: 'https://www.npmjs.com/package/brunogen',
    source: 'https://github.com/ryan-prayoga/brunogen',
  },
  {
    name: 'MessHub',
    slug: 'messhub',
    tags: ['Realtime', 'Operations', 'PWA'],
    stack: ['Go', 'SvelteKit', 'WebSocket', 'PostgreSQL'],
    year: '2026',
    category: 'Realtime Product',
    url: 'https://messhub.ryanprayoga.dev',
    source: 'https://github.com/ryan-prayoga/messhub',
    thumbnail: '/v3/projects/messhub.png',
  },
];
