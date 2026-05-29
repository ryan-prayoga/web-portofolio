<script lang="ts">
  import { t } from '../i18n';
  import { v3projects } from '../data/v3projects';
  import { scrollReveal } from '../actions/scrollReveal';

  // Pin-style showcase: image column uses CSS position:sticky (md+) while the
  // text column scrolls past. No GSAP parallax here — a transform on any
  // ancestor of a sticky element breaks sticky, so we keep this transform-free.
</script>

<section id="projects" class="px-6 py-24 md:py-32">
  <div class="mx-auto max-w-5xl">
    <h2
      class="mb-4 text-center font-heading text-3xl font-bold tracking-tight text-primary md:text-4xl"
      use:scrollReveal
    >
      {$t.projects.heading}
    </h2>
    <p class="mb-20 text-center text-secondary" use:scrollReveal={{ delay: 0.1 }}>
      {$t.projects.subtitle}
    </p>
  </div>

  <div class="mx-auto max-w-6xl space-y-32">
    {#each v3projects as proj, i (proj.slug)}
      {@const desc = $t.projects.descriptions[proj.slug]}
      {@const isEven = i % 2 === 0}
      <article
        data-project-card
        class="grid gap-8 md:grid-cols-2 md:gap-16"
      >
        <!-- Thumbnail / Fallback — grid cell is stretched to full article height,
             inner sticky div is only image-height → sticky has travel room -->
        <div class={`relative ${isEven ? '' : 'md:order-2'}`}>
          <div class="md:sticky md:top-24">
          {#if proj.thumbnail}
            <div data-thumb class="overflow-hidden rounded-xl border border-border bg-surface">
              <img
                src={proj.thumbnail}
                alt="{proj.name} screenshot"
                class="h-auto w-full object-cover"
                loading="lazy"
              />
            </div>
          {:else}
            <div
              data-thumb
              class="flex aspect-video items-center justify-center rounded-xl border border-border bg-surface"
            >
              <span class="font-heading text-4xl font-bold text-muted/40">{proj.name}</span>
            </div>
          {/if}
          </div>
        </div>

        <!-- Text Content -->
        <div class={`${isEven ? '' : 'md:order-1'} min-h-0 md:min-h-[70vh] md:flex md:flex-col md:justify-center`} use:scrollReveal={{ delay: 0.1, y: 40 }}>
          <p class="mb-4 font-mono text-xs tracking-widest text-muted/60">
            {String(i + 1).padStart(2, '0')} / {String(v3projects.length).padStart(2, '0')}
          </p>
          <p class="mb-2 text-xs font-semibold tracking-widest text-accent-cyan uppercase">
            {proj.category} · {proj.year}
          </p>
          <h3 class="mb-4 font-heading text-2xl font-bold text-primary md:text-3xl">
            {proj.name}
          </h3>
          {#if desc}
            <p class="mb-4 text-secondary leading-relaxed">{desc.summary}</p>
            <p class="mb-6 text-sm leading-relaxed text-muted">{desc.focus}</p>
          {/if}

          <div class="mb-6 flex flex-wrap gap-2">
            {#each proj.stack as tech}
              <span
                class="rounded-full border border-border bg-surface-secondary px-3 py-1 text-xs text-secondary"
              >
                {tech}
              </span>
            {/each}
          </div>

          <div class="flex gap-3">
            {#if proj.url}
              <a
                href={proj.url}
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 rounded-lg border border-accent-cyan/40 bg-accent-cyan/10 px-4 py-2 text-sm font-medium text-accent-cyan transition hover:bg-accent-cyan/20"
              >
                {$t.projects.live} ↗
              </a>
            {/if}
            {#if proj.source}
              <a
                href={proj.source}
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-secondary transition hover:border-border-light hover:text-primary"
              >
                {$t.projects.source} ↗
              </a>
            {/if}
          </div>
        </div>
      </article>
    {/each}
  </div>
</section>
