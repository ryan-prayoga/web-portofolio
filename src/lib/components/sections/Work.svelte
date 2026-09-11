<script lang="ts">
  import { localeStore } from '$lib/stores/locale.svelte';
  import { uiCopy } from '$lib/data/uiCopy';
  import { portfolioProjects } from '$lib/data/projects';
  import { projectCopy } from '$lib/data/projectCopy';
  import { reveal } from '$lib/actions/reveal';
  import { drawCard, drawBadge, drawButton } from '$lib/actions/drawably';
  import Icon from '$lib/components/Icon.svelte';

  const t = $derived(uiCopy[localeStore.value]);
  const copy = $derived(projectCopy[localeStore.value]);
  const featured = portfolioProjects.filter((project) => project.featured);
  const others = portfolioProjects.filter((project) => !project.featured);
</script>

<section id="work" class="mx-auto max-w-5xl px-6 py-14" aria-labelledby="work-heading">
  <div use:reveal>
    <span use:drawBadge={{ variant: 'outline' }} class="px-2.5 py-0.5 font-mono text-xs tracking-wider uppercase">
      {t.work.label}
    </span>
    <h2 id="work-heading" class="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">{t.work.heading}</h2>
    <p class="text-muted mt-2.5 max-w-prose leading-relaxed">{t.work.intro}</p>
  </div>

  <div class="mt-10 grid gap-10">
    {#each featured as project, index (project.slug)}
      {@const base = project.thumbnail?.replace('.webp', '')}
      <article
        class="group grid overflow-hidden p-3 transition-transform hover:-translate-y-0.5 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]"
        use:reveal
        use:drawCard={{ resketchOnHover: true }}
      >
        <div class="flex min-w-0 flex-col p-5 sm:p-7">
          <div class="flex items-center gap-2">
            <span class="text-accent font-mono text-xs font-bold" aria-hidden="true">0{index + 1}</span>
            <span class="text-rule" aria-hidden="true">/</span>
            <p class="text-muted font-mono text-[0.65rem] tracking-wider uppercase">
              {project.category}
              <span class="text-rule mx-1" aria-hidden="true">/</span>
              {project.year}
            </p>
          </div>

          <h3 class="mt-3 text-xl font-semibold tracking-tight sm:text-2xl">
            <a href="/work/{project.slug}" class="hover:text-accent transition-colors">
              {project.name}
            </a>
          </h3>

          <p class="text-muted mt-3 max-w-prose text-sm leading-relaxed">{copy[project.slug].summary}</p>

          <ul class="mt-4 flex flex-wrap gap-2">
            {#each project.stack as tech (tech)}
              <li
                use:drawBadge={{ variant: 'outline' }}
                class="px-2 py-0.5 font-mono text-[0.65rem] text-muted uppercase"
              >
                {tech}
              </li>
            {/each}
          </ul>

          <div class="mt-auto flex flex-wrap items-center gap-4 pt-6">
            <a
              href="/work/{project.slug}"
              use:drawButton={{ variant: 'solid', resketchOnHover: true }}
              class="bg-accent text-paper inline-flex items-center gap-2 px-4 py-1.5 font-mono text-xs tracking-wide uppercase transition-opacity hover:opacity-85"
            >
              {t.work.caseStudy}
              <Icon name="arrowRight" size={13} />
            </a>

            <a
              href={project.destination.href}
              target="_blank"
              rel="noopener noreferrer"
              class="text-muted hover:text-accent inline-flex items-center gap-1.5 font-mono text-xs uppercase underline-offset-4 hover:underline"
            >
              {project.destination.kind === 'site' ? t.work.visit : t.work.source}
              <Icon name="arrowUpRight" size={13} />
            </a>
          </div>
        </div>

        {#if base}
          <a
            href="/work/{project.slug}"
            class="relative block w-full aspect-[1100/688] overflow-hidden rounded-lg border border-rule/40 md:aspect-auto md:min-h-full"
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
                class="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </picture>
          </a>
        {/if}
      </article>
    {/each}
  </div>

  <div class="mt-16 flex items-center justify-between" use:reveal>
    <p class="text-muted font-mono text-xs tracking-wider uppercase">{t.work.moreLabel}</p>
    <span class="text-muted/60 hidden font-mono text-[0.65rem] sm:inline"
      >client delivery, desktop & civic platforms</span
    >
  </div>

  <div class="mt-4 grid gap-4 sm:grid-cols-2" use:reveal>
    {#each others as project (project.slug)}
      <a
        href={project.destination.href}
        target="_blank"
        rel="noopener noreferrer"
        use:drawCard={{ resketchOnHover: true }}
        class="group flex min-w-0 flex-col p-6 transition-transform hover:-translate-y-0.5"
      >
        <p class="text-muted font-mono text-[0.65rem] tracking-wider uppercase">{project.category} / {project.year}</p>
        <h3 class="group-hover:text-accent mt-2 font-semibold tracking-tight transition-colors">
          {project.name}
          <span class="text-muted group-hover:text-accent ml-1 inline-flex items-center text-sm" aria-hidden="true">
            <Icon name="arrowUpRight" size={13} />
          </span>
          <span class="sr-only">
            ({project.destination.kind === 'source' ? t.work.source : t.work.visit})
          </span>
        </h3>
        <p class="text-muted mt-2 text-sm leading-relaxed">{copy[project.slug].summary}</p>
        <ul class="mt-4 flex flex-wrap gap-2">
          {#each project.stack as tech (tech)}
            <li use:drawBadge={{ variant: 'outline' }} class="px-2 py-0.5 font-mono text-[0.6rem] text-muted uppercase">
              {tech}
            </li>
          {/each}
        </ul>
      </a>
    {/each}
  </div>
</section>
