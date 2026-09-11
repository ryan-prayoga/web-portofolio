<script lang="ts">
  import Icon from '$lib/components/Icon.svelte';
  import { localeStore } from '$lib/stores/locale.svelte';
  import { freelanceCopy } from '$lib/data/freelanceCopy';
  import { businessShowcases, FREELANCE_CONFIG } from '$lib/data/freelanceData';
  import { drawCard, drawBadge } from '$lib/actions/drawably';

  const t = $derived(freelanceCopy[localeStore.value]);
  const locale = $derived(localeStore.value);
</script>

<section id="showcase" class="mx-auto max-w-5xl px-6 py-16 sm:py-24 border-t border-rule">
  <div class="inline-block">
    <span
      use:drawBadge={{ variant: 'outline', resketchOnHover: true }}
      class="cursor-default px-3 py-1 font-display text-sm tracking-wide uppercase text-accent"
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

  <!-- Business Showcases Grid -->
  <div class="mt-12 grid gap-6 sm:grid-cols-2">
    {#each businessShowcases as work (work.slug)}
      <div
        use:drawCard={{ resketchOnHover: true }}
        class="bg-paper flex flex-col justify-between p-6 transition-all hover:-translate-y-1 sm:p-8"
      >
        <div>
          <div class="flex items-center justify-between gap-2 mb-3">
            <span class="font-display text-sm uppercase tracking-wide text-accent font-semibold">
              {work.category[locale]}
            </span>
            <span class="font-display text-xs font-medium text-muted bg-rule/30 px-2 py-0.5">
              {work.metrics}
            </span>
          </div>

          <h3 class="font-display text-xl font-bold text-ink tracking-tight">
            {work.name}
          </h3>

          <p class="mt-3 text-xs sm:text-sm text-muted leading-relaxed">
            {work.description[locale]}
          </p>

          <div class="mt-4 flex flex-wrap gap-1.5">
            {#each work.tags[locale] as tag, idx (idx)}
              <span class="font-display text-xs font-medium uppercase tracking-wide bg-rule/30 px-2 py-0.5 text-muted">
                {tag}
              </span>
            {/each}
          </div>
        </div>

        <div class="mt-6 pt-4 border-t border-rule flex items-center justify-between font-display text-sm">
          <span class="text-muted flex items-center gap-1.5">
            <Icon name="pulse" size={14} class="text-accent" />
            {locale === 'id' ? 'Sistem Live' : 'Live System'}
          </span>
          <a
            href={work.href}
            target="_blank"
            rel="noopener noreferrer"
            class="text-accent hover:underline flex items-center gap-1 font-semibold"
          >
            {t.showcase.liveDemo}
            <Icon name="arrowUpRight" size={13} />
          </a>
        </div>
      </div>
    {/each}
  </div>

  <div class="mt-12 text-center p-6 bg-paper/60 border border-dashed border-rule max-w-2xl mx-auto">
    <p class="font-display text-xs sm:text-sm text-muted">
      {t.showcase.exploreNote}
    </p>
    <a
      href="{FREELANCE_CONFIG.mainPortfolioUrl}#work"
      target="_blank"
      rel="noopener noreferrer"
      class="text-accent mt-2 inline-flex items-center gap-1 font-display text-sm font-semibold tracking-wide uppercase hover:underline"
    >
      {t.showcase.exploreCta}
      <Icon name="arrowUpRight" size={13} />
    </a>
  </div>
</section>
