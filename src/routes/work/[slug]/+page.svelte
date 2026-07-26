<script lang="ts">
  import { localeStore } from '$lib/stores/locale.svelte';
  import { uiCopy } from '$lib/data/uiCopy';
  import { caseStudies } from '$lib/data/caseStudies';
  import { projectCopy } from '$lib/data/projectCopy';
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
  {#if data.project.thumbnail}
    <meta property="og:image" content="{SITE_URL}{data.project.thumbnail}" />
  {/if}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={copy.summary} />
</svelte:head>

<main class="mx-auto max-w-3xl px-6 pt-28 pb-20">
  <a href="/#work" class="text-muted hover:text-accent font-mono text-xs tracking-wide uppercase">
    ← {t.caseStudy.back}
  </a>

  <header class="mt-8">
    <p class="text-muted font-mono text-[0.65rem] tracking-wider uppercase">
      {slug === 'putraselamatmakmur' ? t.work.clientTag : data.project.category}
      <span class="text-rule mx-1" aria-hidden="true">/</span>
      {data.project.year}
    </p>
    <h1 class="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{data.project.name}</h1>
    <p class="text-muted mt-4 max-w-prose leading-relaxed">{copy.summary}</p>

    <div class="no-print mt-5 flex flex-wrap items-center gap-4">
      <a
        href={data.project.destination.href}
        target="_blank"
        rel="noopener noreferrer"
        class="text-accent font-mono text-xs tracking-wide uppercase underline-offset-4 hover:underline"
      >
        {data.project.destination.kind === 'site' ? t.caseStudy.visit : t.caseStudy.source} ↗
      </a>
      <span class="text-muted font-mono text-[0.65rem] uppercase">
        {t.caseStudy.stack}: {data.project.stack.join(' · ')}
      </span>
    </div>
  </header>

  {#if base}
    <picture class="border-rule mt-8 block overflow-hidden border">
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
        class="block h-auto w-full"
        fetchpriority="high"
      />
    </picture>
  {/if}

  <section class="border-rule mt-10 border-t pt-8" aria-label={t.caseStudy.problem}>
    <h2 class="text-accent font-mono text-xs tracking-wider uppercase">{t.caseStudy.problem}</h2>
    <p class="mt-3 max-w-prose leading-relaxed">{study.problem}</p>
  </section>

  <section class="border-rule mt-10 border-t pt-8" aria-label={t.caseStudy.role}>
    <h2 class="text-accent font-mono text-xs tracking-wider uppercase">{t.caseStudy.role}</h2>
    <p class="mt-3 max-w-prose leading-relaxed">{study.role}</p>
  </section>

  <section class="border-rule mt-10 border-t pt-8" aria-label={t.caseStudy.decisions}>
    <h2 class="text-accent font-mono text-xs tracking-wider uppercase">{t.caseStudy.decisions}</h2>
    <div class="mt-4 space-y-6">
      {#each study.decisions as decision (decision.title)}
        <div>
          <h3 class="font-semibold tracking-tight">{decision.title}</h3>
          <p class="text-muted mt-1.5 max-w-prose text-sm leading-relaxed">{decision.body}</p>
        </div>
      {/each}
    </div>
  </section>

  <section class="border-rule mt-10 border-t pt-8" aria-label={t.caseStudy.results}>
    <h2 class="text-accent font-mono text-xs tracking-wider uppercase">{t.caseStudy.results}</h2>
    <ul class="mt-4 space-y-2">
      {#each study.results as result (result)}
        <li class="flex max-w-prose gap-3 leading-relaxed">
          <span class="text-accent select-none" aria-hidden="true">—</span>
          {result}
        </li>
      {/each}
    </ul>
  </section>
</main>
