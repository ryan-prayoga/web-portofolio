<script lang="ts">
  import { localeStore } from '$lib/stores/locale.svelte';
  import { freelanceCopy } from '$lib/data/freelanceCopy';
  import { drawCard, drawBadge } from '$lib/actions/drawably';

  const t = $derived(freelanceCopy[localeStore.value]);
</script>

<section id="services" class="mx-auto max-w-5xl px-6 py-16 sm:py-24 border-t border-rule">
  <div class="inline-block">
    <span
      use:drawBadge={{ variant: 'outline', resketchOnHover: true }}
      class="cursor-default px-3 py-1 font-mono text-xs tracking-wider uppercase text-accent"
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

  <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {#each t.services.items as item (item.title)}
      <div
        use:drawCard={{ resketchOnHover: true }}
        class="bg-paper p-6 transition-all hover:-translate-y-1 flex flex-col justify-between"
      >
        <div>
          <span class="font-mono text-xs font-semibold text-accent tracking-wider uppercase block mb-1">
            {item.tag}
          </span>
          <h3 class="mt-2 font-display text-lg font-semibold text-ink tracking-tight">
            {item.title}
          </h3>
          <p class="mt-2 text-xs sm:text-sm leading-relaxed text-muted">
            {item.description}
          </p>
        </div>
      </div>
    {/each}
  </div>
</section>
