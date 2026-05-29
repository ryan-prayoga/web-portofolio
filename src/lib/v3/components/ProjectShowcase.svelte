<script lang="ts">
  import { onMount } from 'svelte';
  import { t } from '../i18n';
  import { v3projects } from '../data/v3projects';
  import { scrollReveal } from '../actions/scrollReveal';

  let sectionEl: HTMLElement;

  onMount(async () => {
    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    const cards = sectionEl.querySelectorAll<HTMLElement>('[data-project-card]');
    cards.forEach((card) => {
      const img = card.querySelector<HTMLElement>('[data-thumb]');
      if (!img) return;

      gsap.fromTo(
        img,
        { y: 60, scale: 0.95 },
        {
          y: -60,
          scale: 1,
          ease: 'none',
          scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true },
        }
      );
    });
  });

  $effect(() => {
    return () => {
      if (typeof window !== 'undefined') {
        import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
          ScrollTrigger.getAll().forEach((st) => st.kill());
        });
      }
    };
  });
</script>

<section id="projects" class="px-6 py-24 md:py-32" bind:this={sectionEl}>
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
        class="grid items-center gap-8 md:grid-cols-2 md:gap-16"
        use:scrollReveal={{ delay: 0.1, y: 50 }}
      >
        <!-- Thumbnail / Fallback -->
        <div class={`relative ${isEven ? '' : 'md:order-2'}`}>
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

        <!-- Text Content -->
        <div class={isEven ? '' : 'md:order-1'}>
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
