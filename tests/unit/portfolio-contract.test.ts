import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { caseStudies } from '../../src/lib/data/caseStudies';
import { portfolioContractErrors, type PortfolioContractInput } from '../../src/lib/data/portfolioContract';
import { profile } from '../../src/lib/data/profile';
import { projectCopy } from '../../src/lib/data/projectCopy';
import { projects } from '../../src/lib/data/projects';
import { locales, uiCopy } from '../../src/lib/data/uiCopy';

const assetDirectory = resolve(process.cwd(), 'static/v3/projects');
const assets = new Set(readdirSync(assetDirectory).map((file) => `/v3/projects/${file}`));
const source = (path: string): string => readFileSync(resolve(process.cwd(), path), 'utf8');

function productionInput(): PortfolioContractInput {
  return {
    projects,
    copy: projectCopy,
    caseStudies: Object.fromEntries(
      Object.entries(caseStudies).map(([locale, entries]) => [locale, Object.keys(entries)]),
    ),
    featuredCount: 3,
    assets,
    teamSize: profile.teamSize,
    renderedTeamSizes: [
      Number(uiCopy.en.ticker.match(/\d+(?= ENGINEERS LED)/)?.[0]),
      Number(uiCopy.id.ticker.match(/\d+(?= ENGINEER DIPIMPIN)/)?.[0]),
      profile.teamSize,
    ],
  };
}

describe('portfolio content contract', () => {
  it('keeps Locale defined only in uiCopy and imported by the store', () => {
    // Given
    const localeDeclarations = readdirSync(resolve(process.cwd(), 'src/lib'), { recursive: true })
      .filter((entry) => typeof entry === 'string' && /\.(?:ts|svelte\.ts)$/.test(entry))
      .map((entry) => source(`src/lib/${entry}`))
      .filter((contents) => /(?:type|interface)\s+Locale\b/.test(contents));

    // When
    const storeSource = source('src/lib/stores/locale.svelte.ts');

    // Then
    expect(localeDeclarations).toHaveLength(1);
    expect(storeSource).toContain("import type { Locale } from '$lib/data/uiCopy';");
  });

  it('keeps project destinations exhaustive without a Work fallback', () => {
    // Given
    const projectSource = source('src/lib/data/projects.ts');
    const workSource = source('src/lib/components/sections/Work.svelte');

    // When
    const hasRequiredDestination = /readonly destination:/.test(projectSource);
    const hasSiteDestination = /\{ readonly kind: 'site'; readonly href: string \}/.test(projectSource);
    const hasSourceDestination = /\{ readonly kind: 'source'; readonly href: string \}/.test(projectSource);

    // Then
    expect([hasRequiredDestination, hasSiteDestination, hasSourceDestination]).toEqual([true, true, true]);
    expect(workSource).toContain('project.destination.href');
    expect(workSource).not.toMatch(/project\.url\s*\?\?|project\.source\s*\?\?|\?\?\s*["']#["']/);
  });

  it('keeps focused thresholds at 80 lines/functions/statements and 75 branches', () => {
    // Given
    const configSource = source('vitest.config.ts');

    // When
    const threshold = configSource.match(/\{ statements: (\d+), branches: (\d+), functions: (\d+), lines: (\d+) \}/);

    // Then
    expect(threshold?.slice(1)).toEqual(['80', '75', '80', '80']);
  });

  it('passes for seven curated projects, three featured, and two exact locales', () => {
    // Given
    const input = productionInput();

    // When
    const errors = portfolioContractErrors(input);

    // Then
    expect(projects).toHaveLength(7);
    expect(projects.filter((project) => project.featured)).toHaveLength(3);
    expect(locales).toEqual(['en', 'id']);
    expect(errors).toEqual([]);
  });

  it.each([
    {
      name: 'missing copy key',
      mutate: (input: PortfolioContractInput): PortfolioContractInput => ({
        ...input,
        copy: { ...input.copy, en: Object.fromEntries(Object.entries(input.copy.en).slice(1)) },
      }),
      message: 'en copy missing slugs: pantauanggaran',
    },
    {
      name: 'extra copy key',
      mutate: (input: PortfolioContractInput): PortfolioContractInput => ({
        ...input,
        copy: { ...input.copy, id: { ...input.copy.id, invented: {} } },
      }),
      message: 'id copy has extra slugs: invented',
    },
    {
      name: 'duplicate slug',
      mutate: (input: PortfolioContractInput): PortfolioContractInput => ({
        ...input,
        projects: [
          ...input.projects,
          input.projects[0] ?? {
            slug: 'cinematix',
            featured: false,
            destination: { kind: 'site', href: 'https://example.com' },
          },
        ],
      }),
      message: 'duplicate project slug: pantauanggaran',
    },
    {
      name: 'invalid destination',
      mutate: (input: PortfolioContractInput): PortfolioContractInput => ({
        ...input,
        projects: [{ slug: 'broken', featured: false, destination: { kind: 'site', href: 'http://example.com' } }],
        copy: { en: { broken: {} }, id: { broken: {} } },
      }),
      message: 'invalid destination for broken',
    },
    {
      name: 'invalid source',
      mutate: (input: PortfolioContractInput): PortfolioContractInput => ({
        ...input,
        projects: [
          { slug: 'broken', featured: false, destination: { kind: 'source', href: 'https://gitlab.com/owner/repo' } },
        ],
        copy: { en: { broken: {} }, id: { broken: {} } },
      }),
      message: 'invalid source for broken',
    },
    {
      name: 'featured-count drift',
      mutate: (input: PortfolioContractInput): PortfolioContractInput => ({
        ...input,
        projects: input.projects.map((project) =>
          project.slug === 'brunogen' ? { ...project, featured: false } : project,
        ),
      }),
      message: 'expected exactly 3 featured projects; found 2',
    },
    {
      name: 'missing case study',
      mutate: (input: PortfolioContractInput): PortfolioContractInput => ({
        ...input,
        caseStudies: {
          ...input.caseStudies,
          en: (input.caseStudies.en ?? []).filter((slug) => slug !== 'brunogen'),
        },
      }),
      message: 'en case studies missing featured slugs: brunogen',
    },
    {
      name: 'case study for non-featured project',
      mutate: (input: PortfolioContractInput): PortfolioContractInput => ({
        ...input,
        caseStudies: {
          ...input.caseStudies,
          id: [...(input.caseStudies.id ?? []), 'cinematix'],
        },
      }),
      message: 'id case studies cover non-featured slugs: cinematix',
    },
    {
      name: 'missing image variant',
      mutate: (input: PortfolioContractInput): PortfolioContractInput => ({
        ...input,
        assets: new Set([...input.assets].filter((asset) => asset !== '/v3/projects/cinematix-sm.avif')),
      }),
      message: 'missing thumbnail variant for cinematix: /v3/projects/cinematix-sm.avif',
    },
    {
      name: 'team-size drift',
      mutate: (input: PortfolioContractInput): PortfolioContractInput => ({ ...input, renderedTeamSizes: [5] }),
      message: 'team size drift: expected 4; found 5',
    },
  ])('rejects $name with a specific message', ({ mutate, message }) => {
    // Given
    const input = mutate(productionInput());

    // When
    const errors = portfolioContractErrors(input);

    // Then
    expect(errors).toContain(message);
  });
});
