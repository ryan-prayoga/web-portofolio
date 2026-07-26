export type ContractProject = {
  readonly slug: string;
  readonly destination:
    { readonly kind: 'site'; readonly href: string } | { readonly kind: 'source'; readonly href: string };
  readonly thumbnail?: string;
};

export type ContractBeacon = { readonly kind: 'hq' | 'project'; readonly slug: string };

export type PortfolioContractInput = {
  readonly projects: readonly ContractProject[];
  readonly copy: Readonly<Record<string, Readonly<Record<string, unknown>>>>;
  readonly beacons: readonly ContractBeacon[];
  readonly assets: ReadonlySet<string>;
  readonly teamSize: number;
  readonly renderedTeamSizes: readonly number[];
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

  const hqCount = input.beacons.filter((beacon) => beacon.kind === 'hq').length;
  if (hqCount !== 1) errors.push(`expected exactly one HQ beacon; found ${hqCount}`);
  for (const slug of slugs) {
    const count = input.beacons.filter((beacon) => beacon.kind === 'project' && beacon.slug === slug).length;
    if (count !== 1) errors.push(`expected exactly one project beacon for ${slug}; found ${count}`);
  }

  for (const project of input.projects) {
    if (!isHttpsUrl(project.destination.href)) errors.push(`invalid destination for ${project.slug}`);
    if (
      project.destination.kind === 'source' &&
      !/^https:\/\/github\.com\/[^/]+\/[^/]+\/?$/.test(project.destination.href)
    ) {
      errors.push(`invalid source for ${project.slug}`);
    }
    if (project.thumbnail) {
      const base = project.thumbnail.replace(/\.webp$/, '');
      for (const variant of [`${base}.webp`, `${base}.avif`, `${base}-sm.webp`, `${base}-sm.avif`]) {
        if (!input.assets.has(variant)) errors.push(`missing thumbnail variant for ${project.slug}: ${variant}`);
      }
    }
  }

  for (const rendered of input.renderedTeamSizes) {
    if (rendered !== input.teamSize) errors.push(`team size drift: expected ${input.teamSize}; found ${rendered}`);
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
