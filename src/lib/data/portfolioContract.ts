export type ContractProject = {
  readonly slug: string;
  readonly featured: boolean;
  readonly destination:
    | { readonly kind: 'site'; readonly href: string }
    | { readonly kind: 'package'; readonly href: string }
    | { readonly kind: 'source'; readonly href: string };
  readonly thumbnail?: string;
};

export type PortfolioContractInput = {
  readonly projects: readonly ContractProject[];
  readonly copy: Readonly<Record<string, Readonly<Record<string, unknown>>>>;
  /** locale -> daftar slug case study yang tersedia */
  readonly caseStudies: Readonly<Record<string, readonly string[]>>;
  readonly featuredCount: number;
  readonly assets: ReadonlySet<string>;
};

export function portfolioContractErrors(input: PortfolioContractInput): readonly string[] {
  const errors: string[] = [];
  const slugs = input.projects.map((project) => project.slug);
  const duplicates = slugs.filter((slug, index) => slugs.indexOf(slug) !== index);
  if (duplicates.length > 0) errors.push(`duplicate project slug: ${duplicates.join(', ')}`);

  for (const [locale, copy] of Object.entries(input.copy)) {
    const missing = slugs.filter((slug) => !(slug in copy));
    const extra = Object.keys(copy).filter((slug) => !slugs.includes(slug));
    if (missing.length > 0) errors.push(`${locale} copy missing slugs: ${missing.join(', ')}`);
    if (extra.length > 0) errors.push(`${locale} copy has extra slugs: ${extra.join(', ')}`);
  }

  const featured = input.projects.filter((project) => project.featured).map((project) => project.slug);
  if (featured.length !== input.featuredCount) {
    errors.push(`expected exactly ${input.featuredCount} featured projects; found ${featured.length}`);
  }
  for (const [locale, available] of Object.entries(input.caseStudies)) {
    const missing = featured.filter((slug) => !available.includes(slug));
    const extra = available.filter((slug) => !featured.includes(slug));
    if (missing.length > 0) errors.push(`${locale} case studies missing featured slugs: ${missing.join(', ')}`);
    if (extra.length > 0) errors.push(`${locale} case studies cover non-featured slugs: ${extra.join(', ')}`);
  }

  for (const project of input.projects) {
    if (!isHttpsUrl(project.destination.href)) errors.push(`invalid destination for ${project.slug}`);
    if (
      project.destination.kind === 'source' &&
      !/^https:\/\/github\.com\/[^/]+\/[^/]+\/?$/.test(project.destination.href)
    ) {
      errors.push(`invalid source for ${project.slug}`);
    }
    if (
      project.destination.kind === 'package' &&
      !/^https:\/\/www\.npmjs\.com\/package\/[^/]+\/?$/.test(project.destination.href)
    ) {
      errors.push(`invalid package for ${project.slug}`);
    }
    if (project.thumbnail) {
      const base = project.thumbnail.replace(/\.webp$/, '');
      for (const variant of [`${base}.webp`, `${base}.avif`, `${base}-sm.webp`, `${base}-sm.avif`]) {
        if (!input.assets.has(variant)) errors.push(`missing thumbnail variant for ${project.slug}: ${variant}`);
      }
    }
  }

  return errors;
}

function isHttpsUrl(value: string): boolean {
  try {
    return new URL(value).protocol === 'https:';
  } catch (error) {
    if (error instanceof TypeError) return false;
    throw error;
  }
}
