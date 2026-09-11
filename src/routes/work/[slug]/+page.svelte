<script lang="ts">
  import { localeStore } from '$lib/stores/locale.svelte';
  import { uiCopy } from '$lib/data/uiCopy';
  import { caseStudies } from '$lib/data/caseStudies';
  import { projectCopy } from '$lib/data/projectCopy';
  import { drawCard, drawBadge, drawButton } from '$lib/actions/drawably';
  import Icon from '$lib/components/Icon.svelte';
  import type { FeaturedSlug } from '$lib/data/projects';

  let { data } = $props();

  const SITE_URL = 'https://ryanprayoga.dev';

  const t = $derived(uiCopy[localeStore.value]);
  const slug = $derived(data.project.slug as FeaturedSlug);
  const study = $derived(caseStudies[localeStore.value][slug]);
  const copy = $derived(projectCopy[localeStore.value][slug]);
  const base = $derived(data.project.thumbnail?.replace('.webp', ''));

  const title = $derived(`${data.project.name} — Case Study · Ryan Prayoga`);
  const pageUrl = $derived(`${SITE_URL}/work/${slug}`);
  const ogImage = $derived(data.project.thumbnail ? `${SITE_URL}/og/${slug}.jpg` : `${SITE_URL}/og-image.jpg`);
  const externalLabel = $derived(
    data.project.destination.kind === 'site'
      ? t.caseStudy.visit
      : data.project.destination.kind === 'package'
        ? t.work.npm
        : t.caseStudy.source,
  );
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={copy.summary} />
  <link rel="canonical" href={pageUrl} />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="Ryan Prayoga" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={copy.summary} />
  <meta property="og:url" content={pageUrl} />
  <meta property="og:image" content={ogImage} />
  <meta property="og:image:type" content="image/jpeg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content={title} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={copy.summary} />
  <meta name="twitter:image" content={ogImage} />
</svelte:head>

<main class="mx-auto max-w-3xl px-6 pt-28 pb-20">
  <a
    href="/#work"
    class="text-muted hover:text-accent inline-flex items-center gap-1.5 font-sans text-xs font-semibold tracking-wide uppercase transition-colors"
  >
    <Icon name="arrowLeft" size={13} />
    {t.caseStudy.back}
  </a>

  <header class="mt-8">
    <div class="flex items-center gap-2">
      <span
        use:drawBadge={{ variant: 'outline' }}
        class="px-2.5 py-0.5 font-sans text-xs font-semibold tracking-wide uppercase"
      >
        {data.project.category}
      </span>
      <span class="text-rule font-sans text-xs" aria-hidden="true">/</span>
      <span class="text-muted font-sans text-xs font-medium">{data.project.year}</span>
    </div>

    <h1 class="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{data.project.name}</h1>
    <p class="text-muted mt-4 max-w-prose leading-relaxed text-base">{copy.summary}</p>

    <div class="no-print mt-6 flex flex-wrap items-center gap-4">
      <a
        href={data.project.destination.href}
        target="_blank"
        rel="noopener noreferrer"
        use:drawButton={{ variant: 'solid', resketchOnHover: true }}
        class="bg-accent text-paper inline-flex items-center gap-2 px-4 py-2 font-sans text-xs font-semibold tracking-wide uppercase transition-opacity hover:opacity-90"
      >
        {externalLabel}
        <Icon name="arrowUpRight" size={13} />
      </a>

      <div class="flex flex-wrap gap-2">
        {#each data.project.stack as tech (tech)}
          <span use:drawBadge={{ variant: 'outline' }} class="px-2.5 py-0.5 font-sans text-xs font-medium text-muted">
            {tech}
          </span>
        {/each}
      </div>
    </div>
  </header>

  {#if base}
    <div use:drawCard={{ resketchOnHover: true }} class="mt-10 overflow-hidden p-2">
      <picture class="block overflow-hidden">
        <source
          type="image/avif"
          srcset="{base}-sm.avif 700w, {base}.avif 1100w"
          sizes="(max-width: 768px) 92vw, 44rem"
        />
        <img
          src={data.project.thumbnail}
          srcset="{base}-sm.webp 700w, {base}.webp 1100w"
          sizes="(max-width: 768px) 92vw, 44rem"
          alt="{data.project.name} preview"
          width="1100"
          height="688"
          class="block h-auto w-full object-cover"
          fetchpriority="high"
        />
      </picture>
    </div>
  {/if}

  <section class="mt-12" aria-label={t.caseStudy.problem}>
    <span
      use:drawBadge={{ variant: 'outline' }}
      class="px-2.5 py-0.5 font-sans text-xs font-semibold tracking-wide uppercase"
    >
      {t.caseStudy.problem}
    </span>
    <p class="mt-4 max-w-prose leading-relaxed text-base">{study.problem}</p>
  </section>

  <section class="mt-10" aria-label={t.caseStudy.role}>
    <span
      use:drawBadge={{ variant: 'outline' }}
      class="px-2.5 py-0.5 font-sans text-xs font-semibold tracking-wide uppercase"
    >
      {t.caseStudy.role}
    </span>
    <p class="mt-4 max-w-prose leading-relaxed text-base">{study.role}</p>
  </section>

  <section class="mt-12" aria-label={t.caseStudy.decisions}>
    <span
      use:drawBadge={{ variant: 'outline' }}
      class="px-2.5 py-0.5 font-sans text-xs font-semibold tracking-wide uppercase"
    >
      {t.caseStudy.decisions}
    </span>
    <div class="mt-6 space-y-4">
      {#each study.decisions as decision (decision.title)}
        <div use:drawCard={{ resketchOnHover: true }} class="p-6">
          <h3 class="font-semibold tracking-tight text-lg">{decision.title}</h3>
          <p class="text-muted mt-2 max-w-prose text-sm leading-relaxed">{decision.body}</p>
        </div>
      {/each}
    </div>
  </section>

  <section class="mt-12" aria-label={t.caseStudy.results}>
    <span
      use:drawBadge={{ variant: 'outline' }}
      class="px-2.5 py-0.5 font-sans text-xs font-semibold tracking-wide uppercase"
    >
      {t.caseStudy.results}
    </span>
    <div use:drawCard={{ resketchOnHover: true }} class="mt-6 p-6">
      <ul class="space-y-3">
        {#each study.results as result (result)}
          <li class="flex max-w-prose gap-3 leading-relaxed text-sm">
            <span class="text-accent font-bold select-none" aria-hidden="true">✓</span>
            {result}
          </li>
        {/each}
      </ul>
    </div>
  </section>
</main>
