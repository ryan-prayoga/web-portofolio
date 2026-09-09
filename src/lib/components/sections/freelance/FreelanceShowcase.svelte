<script lang="ts">
  import { localeStore } from '$lib/stores/locale.svelte';
  import { freelanceCopy } from '$lib/data/freelanceCopy';
  import { projects } from '$lib/data/projects';
  import { FREELANCE_CONFIG } from '$lib/data/freelanceData';
  import { drawCard, drawBadge, drawButton } from '$lib/actions/drawably';

  const t = $derived(freelanceCopy[localeStore.value]);

  // Tampilkan 4 proyek featured unggulan sebagai bukti pengerjaan teknis
  const featuredWorks = projects.filter((p) => p.featured);
</script>

<section id="showcase" class="mx-auto max-w-5xl px-6 py-16 sm:py-24 border-t border-rule">
  <div class="inline-block">
    <span
      use:drawBadge={{ variant: 'outline', resketchOnHover: true }}
      class="cursor-default px-3 py-1 font-mono text-xs tracking-wider uppercase text-accent"
    >
      // {t.showcase.badge}
    </span>
  </div>

  <h2 class="mt-4 font-display text-2xl sm:text-4xl font-semibold tracking-tight text-balance">
    {t.showcase.heading}
  </h2>
  <p class="mt-3 text-muted max-w-2xl text-sm sm:text-base leading-relaxed">
    {t.showcase.subheading}
  </p>

  <!-- Special Showcase: Ryan's Own Portfolio Proof -->
  <div
    use:drawCard={{ resketchOnHover: true }}
    class="mt-12 bg-accent-soft/20 p-6 sm:p-8 border border-accent/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
  >
    <div>
      <div class="flex items-center gap-2">
        <span class="bg-accent text-paper font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 font-bold">
          Live Reference
        </span>
        <span class="font-mono text-xs text-muted">Lighthouse 100/100 · SvelteKit 2</span>
      </div>
      <h3 class="mt-2 font-display text-xl sm:text-2xl font-bold text-ink">
        ryanprayoga.dev (Personal Developer Portfolio)
      </h3>
      <p class="mt-1 text-xs sm:text-sm text-muted max-w-xl">
        Portofolio utama Ryan Prayoga: zero-runtime dependency, fully static, dual language (EN/ID), dark/light mode
        view transition, dan estetika sketchbook interaktif.
      </p>
    </div>
    <a
      href={FREELANCE_CONFIG.mainPortfolioUrl}
      target="_blank"
      rel="noopener noreferrer"
      use:drawButton={{ variant: 'solid', resketchOnHover: true }}
      class="bg-accent text-paper whitespace-nowrap px-5 py-2.5 font-mono text-xs uppercase font-medium"
    >
      {t.showcase.liveDemo} ↗
    </a>
  </div>

  <!-- Featured Works Grid -->
  <div class="mt-8 grid gap-6 sm:grid-cols-2">
    {#each featuredWorks as work (work.slug)}
      <div
        use:drawCard={{ resketchOnHover: true }}
        class="bg-paper p-6 flex flex-col justify-between transition-all hover:-translate-y-1"
      >
        <div>
          {#if work.thumbnail}
            <div class="aspect-video w-full overflow-hidden bg-rule/30 mb-4 border border-rule">
              <img
                src={work.thumbnail}
                alt={work.name}
                loading="lazy"
                class="h-full w-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-300"
              />
            </div>
          {/if}

          <div class="flex flex-wrap gap-1.5 mb-2">
            {#each work.tags as tag, idx (idx)}
              <span class="font-mono text-[10px] uppercase tracking-wider bg-rule/30 px-1.5 py-0.5 text-muted">
                {tag}
              </span>
            {/each}
          </div>

          <h3 class="font-display text-lg font-bold text-ink tracking-tight">
            {work.name}
          </h3>

          <p class="mt-1 font-mono text-xs text-accent">
            {work.stack.join(' · ')}
          </p>
        </div>

        <div class="mt-6 pt-4 border-t border-rule flex items-center justify-between font-mono text-xs">
          <span class="text-muted">{work.category}</span>
          <a
            href={work.destination.href}
            target="_blank"
            rel="noopener noreferrer"
            class="text-accent hover:underline flex items-center gap-1 font-semibold"
          >
            {work.destination.kind === 'source' ? t.showcase.sourceCode : t.showcase.liveDemo} ↗
          </a>
        </div>
      </div>
    {/each}
  </div>

  <div class="mt-10 text-center">
    <p class="font-mono text-xs text-muted">
      {t.showcase.exploreNote}
    </p>
    <a
      href="{FREELANCE_CONFIG.mainPortfolioUrl}#work"
      target="_blank"
      rel="noopener noreferrer"
      class="mt-2 inline-block font-mono text-xs font-semibold text-accent hover:underline uppercase tracking-wide"
    >
      Jelajahi Portofolio & Case Study Lengkap di ryanprayoga.dev ↗
    </a>
  </div>
</section>
