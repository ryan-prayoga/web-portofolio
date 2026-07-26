<script lang="ts">
  import { localeStore } from '$lib/stores/locale.svelte';
  import { uiCopy } from '$lib/data/uiCopy';
  import { portfolioProjects } from '$lib/data/projects';
  import { projectCopy } from '$lib/data/projectCopy';
  import { reveal } from '$lib/actions/reveal';

  const t = $derived(uiCopy[localeStore.value]);
  const copy = $derived(projectCopy[localeStore.value]);
  const featured = portfolioProjects.filter((project) => project.featured);
  const others = portfolioProjects.filter((project) => !project.featured);
</script>

<section id="work" class="mx-auto max-w-5xl px-6 py-14" aria-labelledby="work-heading">
  <div use:reveal>
    <p class="text-accent font-mono text-xs tracking-wider uppercase">{t.work.label}</p>
    <h2 id="work-heading" class="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{t.work.heading}</h2>
    <p class="text-muted mt-3 max-w-prose leading-relaxed">{t.work.intro}</p>
  </div>

  <div class="mt-10 grid gap-8">
    {#each featured as project (project.slug)}
      {@const base = project.thumbnail?.replace('.webp', '')}
      <article class="border-rule grid overflow-hidden border md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]" use:reveal>
        <div class="flex min-w-0 flex-col p-6 sm:p-8">
          <p class="text-muted font-mono text-[0.65rem] tracking-wider uppercase">
            {project.slug === 'putraselamatmakmur' ? t.work.clientTag : project.category}
            <span class="text-rule mx-1" aria-hidden="true">/</span>
            {project.year}
          </p>
          <h3 class="mt-3 text-xl font-semibold tracking-tight sm:text-2xl">
            <a href="/work/{project.slug}" class="hover:text-accent transition-colors">{project.name}</a>
          </h3>
          <p class="text-muted mt-3 max-w-prose text-sm leading-relaxed">{copy[project.slug].summary}</p>
          <ul class="mt-4 flex flex-wrap gap-x-3 gap-y-1">
            {#each project.stack as tech (tech)}
              <li class="text-muted font-mono text-[0.65rem] uppercase">{tech}</li>
            {/each}
          </ul>
          <div class="mt-auto flex flex-wrap items-center gap-4 pt-6">
            <a
              href="/work/{project.slug}"
              class="text-accent font-mono text-xs tracking-wide uppercase underline-offset-4 hover:underline"
            >
              {t.work.caseStudy} <span aria-hidden="true">→</span>
            </a>
            <a
              href={project.destination.href}
              target="_blank"
              rel="noopener noreferrer"
              class="text-muted hover:text-accent font-mono text-xs uppercase underline-offset-4 hover:underline"
            >
              {project.destination.kind === 'site'
                ? t.work.visit
                : project.destination.kind === 'package'
                  ? t.work.npm
                  : t.work.source} <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        {#if base}
          <a
            href="/work/{project.slug}"
            class="border-rule relative block min-h-52 border-t md:border-t-0 md:border-l"
            aria-hidden="true"
            tabindex="-1"
          >
            <picture>
              <source
                type="image/avif"
                srcset="{base}-sm.avif 700w, {base}.avif 1100w"
                sizes="(max-width: 768px) 92vw, 44vw"
              />
              <img
                src={project.thumbnail}
                srcset="{base}-sm.webp 700w, {base}.webp 1100w"
                sizes="(max-width: 768px) 92vw, 44vw"
                alt=""
                width="1100"
                height="688"
                loading="lazy"
                decoding="async"
                class="absolute inset-0 h-full w-full object-cover object-top-left"
              />
            </picture>
          </a>
        {:else}
          <div
            class="border-rule text-muted flex min-h-52 flex-col justify-center border-t p-8 font-mono text-sm leading-7 md:border-t-0 md:border-l"
            aria-hidden="true"
          >
            <span><span class="text-accent">$</span> npx brunogen generate</span>
            <span>✓ openapi.yaml → bruno collection</span>
            <span>✓ laravel + express + go adapters</span>
            <span>✓ mcp server ready</span>
          </div>
        {/if}
      </article>
    {/each}
  </div>

  <p class="text-muted mt-14 font-mono text-xs tracking-wider uppercase" use:reveal>{t.work.moreLabel}</p>
  <div class="border-rule mt-4 grid border-t sm:grid-cols-2" use:reveal>
    {#each others as project (project.slug)}
      <a
        href={project.destination.href}
        target="_blank"
        rel="noopener noreferrer"
        class="group border-rule flex min-w-0 flex-col border-b p-5 transition-colors sm:odd:border-r"
      >
        <p class="text-muted font-mono text-[0.65rem] tracking-wider uppercase">{project.category} / {project.year}</p>
        <h3 class="group-hover:text-accent mt-2 font-semibold tracking-tight transition-colors">
          {project.name}
          <span class="text-muted group-hover:text-accent ml-1 text-sm" aria-hidden="true">↗</span>
          <span class="sr-only">
            ({project.destination.kind === 'source' ? t.work.source : t.work.visit})
          </span>
        </h3>
        <p class="text-muted mt-2 text-sm leading-relaxed">{copy[project.slug].summary}</p>
        <ul class="mt-3 flex flex-wrap gap-x-3 gap-y-1">
          {#each project.stack as tech (tech)}
            <li class="text-muted font-mono text-[0.6rem] uppercase">{tech}</li>
          {/each}
        </ul>
      </a>
    {/each}
  </div>
</section>
