import type { Locale } from './uiCopy';

export interface SkillGroup {
  readonly key: 'primary' | 'backend-data' | 'ai-llm' | 'devops' | 'practices';
  readonly title: string;
  readonly items: readonly string[];
}

/**
 * Matrix skill — mengikuti struktur SKILLS di CV ATS.
 * "Primary" = dipakai harian bertahun-tahun; sisanya jujur sesuai porsi.
 */
export const skills: Record<Locale, readonly SkillGroup[]> = {
  en: [
    {
      key: 'primary',
      title: 'Primary',
      items: ['Laravel', 'Nuxt.js', 'Svelte / SvelteKit', 'Flutter', 'TypeScript', 'PHP'],
    },
    {
      key: 'backend-data',
      title: 'Backend & Data',
      items: ['Go', 'PostgreSQL (incl. PostGIS)', 'Redis', 'Docker', 'WebSocket', 'gRPC', 'GraphQL'],
    },
    {
      key: 'ai-llm',
      title: 'AI / LLM',
      items: [
        'AI-powered developer tooling (brunogen)',
        'Agent orchestration pipelines',
        'MCP server integration',
        'Multi-model setups & LLM routing',
      ],
    },
    {
      key: 'devops',
      title: 'DevOps & Infrastructure',
      items: ['PM2', 'Nginx', 'Caddy', 'GitHub Actions', 'GitLab CI', 'Linux (Ubuntu)', 'VPS hardening', 'WireGuard'],
    },
    {
      key: 'practices',
      title: 'Tools & Practices',
      items: ['Agile/Scrum', 'Code review & mentoring', 'Swagger/OpenAPI', 'Bruno/Postman', 'Figma', 'Jira'],
    },
  ],
  id: [
    {
      key: 'primary',
      title: 'Utama',
      items: ['Laravel', 'Nuxt.js', 'Svelte / SvelteKit', 'Flutter', 'TypeScript', 'PHP'],
    },
    {
      key: 'backend-data',
      title: 'Backend & Data',
      items: ['Go', 'PostgreSQL (termasuk PostGIS)', 'Redis', 'Docker', 'WebSocket', 'gRPC', 'GraphQL'],
    },
    {
      key: 'ai-llm',
      title: 'AI / LLM',
      items: [
        'Developer tooling ber-AI (brunogen)',
        'Pipeline orkestrasi agent',
        'Integrasi MCP server',
        'Setup multi-model & LLM routing',
      ],
    },
    {
      key: 'devops',
      title: 'DevOps & Infrastruktur',
      items: ['PM2', 'Nginx', 'Caddy', 'GitHub Actions', 'GitLab CI', 'Linux (Ubuntu)', 'VPS hardening', 'WireGuard'],
    },
    {
      key: 'practices',
      title: 'Tools & Praktik',
      items: ['Agile/Scrum', 'Code review & mentoring', 'Swagger/OpenAPI', 'Bruno/Postman', 'Figma', 'Jira'],
    },
  ],
};
