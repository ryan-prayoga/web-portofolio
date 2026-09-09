<script lang="ts">
  import Icon from '$lib/components/Icon.svelte';
  import { localeStore } from '$lib/stores/locale.svelte';
  import { freelanceCopy } from '$lib/data/freelanceCopy';
  import { drawCard, drawBadge } from '$lib/actions/drawably';

  const t = $derived(freelanceCopy[localeStore.value]);
</script>

<section id="why-us" class="mx-auto max-w-5xl px-6 py-16 sm:py-24 border-t border-rule">
  <div class="inline-block">
    <span
      use:drawBadge={{ variant: 'outline', resketchOnHover: true }}
      class="cursor-default px-3 py-1 font-mono text-xs tracking-wider uppercase text-accent"
    >
      // {t.comparison.badge}
    </span>
  </div>

  <h2 class="mt-4 font-display text-2xl sm:text-4xl font-semibold tracking-tight text-balance">
    {t.comparison.heading}
  </h2>
  <p class="mt-3 text-muted max-w-2xl text-sm sm:text-base leading-relaxed">
    {t.comparison.subheading}
  </p>

  <div class="mt-12 grid gap-8 md:grid-cols-2">
    <!-- Generic Builders Card -->
    <div use:drawCard={{ resketchOnHover: true }} class="bg-paper/40 p-6 opacity-90 sm:p-8">
      <div class="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted font-semibold">
        <Icon name="close" size={15} strokeWidth={2.25} class="text-rose-500" />
        <h3>{t.comparison.genericTitle}</h3>
      </div>

      <ul class="mt-6 flex flex-col gap-4 text-xs sm:text-sm text-muted">
        {#each t.comparison.genericPoints as point, idx (idx)}
          <li class="flex items-start gap-2.5">
            <Icon name="close" size={14} class="text-rose-500/80 mt-0.5 shrink-0" />
            <span>{point}</span>
          </li>
        {/each}
      </ul>
    </div>

    <!-- Handcrafted Bespoke Card -->
    <div
      use:drawCard={{ resketchOnHover: true }}
      class="bg-accent-soft/30 drawably-accent relative overflow-hidden p-6 shadow-sm sm:p-8"
    >
      <div class="flex items-center justify-between gap-2">
        <div class="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent font-semibold">
          <Icon name="check" size={15} strokeWidth={2.25} class="text-accent" />
          <h3>{t.comparison.customTitle}</h3>
        </div>
        <span class="bg-accent text-paper font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 font-bold">
          Recommended
        </span>
      </div>

      <ul class="mt-6 flex flex-col gap-4 text-xs sm:text-sm text-ink font-medium">
        {#each t.comparison.customPoints as point, idx (idx)}
          <li class="flex items-start gap-2.5">
            <Icon name="check" size={14} strokeWidth={2.25} class="text-accent mt-0.5 shrink-0" />
            <span>{point}</span>
          </li>
        {/each}
      </ul>
    </div>
  </div>
</section>
