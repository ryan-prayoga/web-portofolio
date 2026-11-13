<script lang="ts">
  import Icon from '$lib/components/Icon.svelte';
  import { localeStore } from '$lib/stores/locale.svelte';
  import { freelanceCopy } from '$lib/data/freelanceCopy';
  import { roughCircle } from 'drawably';
  import { drawBadge } from '$lib/actions/drawably';
  import SketchRule from '$lib/components/ui/SketchRule.svelte';

  const t = $derived(freelanceCopy[localeStore.value]);
  const loopPath = (index: number) => roughCircle(20, 20, 17, { seed: 151 + index * 11, roughness: 0.45 });
</script>

<section id="services" class="relative mx-auto max-w-5xl px-6 py-16 sm:py-24">
  <SketchRule seed={184} class="text-ink/40 absolute inset-x-6 -top-1" />
  <div class="inline-block">
    <span
      use:drawBadge={{ variant: 'outline', resketchOnHover: true }}
      class="cursor-default px-3 py-1 font-display text-sm text-accent"
    >
      // {t.services.badge}
    </span>
  </div>

  <h2 class="mt-4 font-display text-2xl sm:text-4xl font-semibold tracking-tight text-balance">
    {t.services.heading}
  </h2>
  <p class="mt-3 text-muted max-w-2xl text-sm sm:text-base leading-relaxed">
    {t.services.subheading}
  </p>

  <!-- Daftar catatan, bukan grid kartu seragam: ikon dilingkari pena, tanpa bingkai. -->
  <ul class="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
    {#each t.services.items as item, index (item.title)}
      <li>
        <div class="text-accent flex items-center gap-2.5">
          <span class="relative inline-flex size-10 shrink-0 items-center justify-center">
            <svg
              class="absolute inset-0 h-full w-full overflow-visible"
              viewBox="0 0 40 40"
              fill="none"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d={loopPath(index)}
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <Icon name={item.icon} size={18} class="relative" />
          </span>
          <span class="font-display text-base font-semibold">{item.tag}</span>
        </div>
        <h3 class="mt-3 font-display text-lg font-semibold text-ink tracking-tight">
          {item.title}
        </h3>
        <p class="mt-2 text-sm sm:text-base leading-relaxed text-muted">
          {item.description}
        </p>
      </li>
    {/each}
  </ul>
</section>
