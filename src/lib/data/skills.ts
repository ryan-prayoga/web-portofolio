import type { Locale } from './uiCopy';

export interface SkillGroup {
  readonly key: 'primary' | 'backend-data' | 'ai-llm' | 'devops' | 'practices';
  readonly title: string;
  readonly items: readonly string[];
}

/**
 * Matrix skill — mengikuti struktur SKILLS di CV ATS.
 * Jujur, terverifikasi, dan mencerminkan kapabilitas riil.
 */
export const skills: Record<Locale, readonly SkillGroup[]> = {
  en: [
    {
      key: 'primary',
      title: 'Primary Daily Drivers',
      items: ['Go', 'TypeScript / JavaScript', 'Svelte / SvelteKit', 'Laravel / PHP', 'Flutter', 'Tailwind CSS'],
    },
    {
      key: 'backend-data',
      title: 'Systems, Backend & Data',
      items: [
        'Rust (Tauri v2)',
        'Swift (SwiftUI macOS)',
        'PostgreSQL (incl. PostGIS)',
        'Redis',
        'Docker',
        'SSE / WebSocket',
        'gRPC',
      ],
    },
    {
      key: 'ai-llm',
      title: 'AI Agents & Tooling',
      items: [
        'AI agent design engines (native-design)',
        'Agent orchestration pipelines',
        'MCP server integration',
        'Deterministic AST code analysis',
      ],
    },
    {
      key: 'devops',
      title: 'DevOps & Infrastructure',
      items: [
        'Caddy',
        'Nginx',
        'PM2',
        'GitHub Actions CI/CD',
        'GitLab CI',
        'Linux (Ubuntu/Debian)',
        'VPS hardening',
        'WireGuard',
      ],
    },
    {
      key: 'practices',
      title: 'Engineering Practices',
      items: [
        'Agile / Scrum sprint planning',
        'Code review & mentoring',
        'Idempotent schema migrations',
        'Zero-downtime static delivery',
        'Figma',
        'Jira',
      ],
    },
  ],
  id: [
    {
      key: 'primary',
      title: 'Teknologi Utama',
      items: ['Go', 'TypeScript / JavaScript', 'Svelte / SvelteKit', 'Laravel / PHP', 'Flutter', 'Tailwind CSS'],
    },
    {
      key: 'backend-data',
      title: 'Sistem, Backend & Data',
      items: [
        'Rust (Tauri v2)',
        'Swift (SwiftUI macOS)',
        'PostgreSQL (termasuk PostGIS)',
        'Redis',
        'Docker',
        'SSE / WebSocket',
        'gRPC',
      ],
    },
    {
      key: 'ai-llm',
      title: 'AI Agents & Tooling',
      items: [
        'Engine desain coding agent (native-design)',
        'Pipeline orkestrasi agent',
        'Integrasi MCP server',
        'Analisis AST kode deterministik',
      ],
    },
    {
      key: 'devops',
      title: 'DevOps & Infrastruktur',
      items: [
        'Caddy',
        'Nginx',
        'PM2',
        'GitHub Actions CI/CD',
        'GitLab CI',
        'Linux (Ubuntu/Debian)',
        'Pengamanan VPS',
        'WireGuard',
      ],
    },
    {
      key: 'practices',
      title: 'Praktik Engineering',
      items: [
        'Perencanaan sprint Agile / Scrum',
        'Code review & mentoring tim',
        'Migrasi skema idempoten',
        'Rilis statis zero-downtime',
        'Figma',
        'Jira',
      ],
    },
  ],
};
