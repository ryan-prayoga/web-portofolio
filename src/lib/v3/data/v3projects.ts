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
    name: 'Pantau Anggaran',
    slug: 'pantauanggaran',
    tags: ['Civic Tech', 'AI', 'Dashboard'],
    stack: ['SvelteKit', 'Go', 'PostgreSQL', 'AI/ML'],
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
    name: 'Korban MBG',
    slug: 'korbanmbg',
    tags: ['Civic Tech', 'Data', 'Analytics'],
    stack: ['Nuxt', 'Go Fiber', 'PostgreSQL'],
    year: '2026',
    category: 'Civic Tech',
    url: 'https://korbanmbg.ryanprayoga.dev',
    source: 'https://github.com/ryan-prayoga/korbanmbg',
    thumbnail: '/v3/projects/korbanmbg.png',
  },
  {
    name: 'Billiard Aim Assistant',
    slug: 'billiard',
    tags: ['Computer Vision', 'Canvas', 'Tool'],
    stack: ['SvelteKit', 'Canvas API', 'Computer Vision'],
    year: '2026',
    category: 'Developer Tooling',
    url: 'https://billiard.ryanprayoga.dev',
    source: 'https://github.com/ryan-prayoga/billiard-aim-assistant',
    thumbnail: '/v3/projects/billiard.png',
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
    name: 'Gas CLI',
    slug: 'gascli',
    tags: ['CLI', 'DevOps', 'PM2'],
    stack: ['Bash', 'PM2', 'SQLite', 'Go', 'Node'],
    year: '2026',
    category: 'Developer Tooling',
    source: 'https://github.com/ryan-prayoga/gas-cli',
  },
];
