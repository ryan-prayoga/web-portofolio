<script lang="ts">
  import Icon from '$lib/components/Icon.svelte';
  import { localeStore } from '$lib/stores/locale.svelte';
  import { freelanceCopy } from '$lib/data/freelanceCopy';
  import { getWhatsAppUrl, revisionPacks } from '$lib/data/freelanceData';
  import { drawCard, drawButton, drawBadge } from '$lib/actions/drawably';

  const t = $derived(freelanceCopy[localeStore.value]);
  const locale = $derived(localeStore.value);
</script>

<section id="revisions" class="border-rule mx-auto max-w-5xl border-t px-6 py-16 sm:py-24">
  <div class="inline-block">
    <span
      use:drawBadge={{ variant: 'outline', resketchOnHover: true }}
      class="text-accent cursor-default px-3 py-1 font-mono text-xs tracking-wider uppercase"
    >
      // {t.revisions.badge}
    </span>
  </div>

  <h2 class="font-display mt-4 text-2xl font-semibold tracking-tight text-balance sm:text-4xl">
    {t.revisions.heading}
  </h2>
  <p class="text-muted mt-3 max-w-2xl text-sm leading-relaxed sm:text-base">
    {t.revisions.subheading}
  </p>

  <div class="mt-12 grid gap-6 md:grid-cols-2">
    <!-- Minor: gratis -->
    <div use:drawCard={{ resketchOnHover: true }} class="bg-paper p-6 sm:p-8">
      <div class="flex items-center justify-between gap-3">
        <h3 class="font-display text-ink text-lg font-bold tracking-tight">
          {t.revisions.minorTitle}
        </h3>
        <span class="text-accent flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase">
          <Icon name="check" size={13} strokeWidth={2.25} />
          {t.revisions.minorNote}
        </span>
      </div>

      <ul class="text-muted mt-5 flex flex-col gap-3 text-xs sm:text-sm">
        {#each t.revisions.minorItems as item, idx (idx)}
          <li class="flex items-start gap-2.5">
            <Icon name="check" size={14} strokeWidth={2.25} class="text-accent mt-0.5 shrink-0" />
            <span>{item}</span>
          </li>
        {/each}
      </ul>
    </div>

    <!-- Major: berbayar -->
    <div use:drawCard={{ resketchOnHover: true }} class="bg-paper/40 p-6 sm:p-8">
      <div class="flex items-center justify-between gap-3">
        <h3 class="font-display text-ink text-lg font-bold tracking-tight">
          {t.revisions.majorTitle}
        </h3>
        <span class="text-muted flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase">
          <Icon name="info" size={13} />
          {t.revisions.majorNote}
        </span>
      </div>

      <ul class="text-muted mt-5 flex flex-col gap-3 text-xs sm:text-sm">
        {#each t.revisions.majorItems as item, idx (idx)}
          <li class="flex items-start gap-2.5">
            <Icon name="plus" size={14} class="text-muted mt-0.5 shrink-0" />
            <span>{item}</span>
          </li>
        {/each}
      </ul>
    </div>
  </div>

  <!-- Paket request major -->
  <span class="text-ink mt-12 block font-mono text-xs font-semibold tracking-wider uppercase">
    {t.revisions.packsTitle}
  </span>

  <div class="mt-4 grid gap-6 sm:grid-cols-3">
    {#each revisionPacks as pack (pack.id)}
      <div use:drawCard={{ resketchOnHover: true }} class="bg-paper flex flex-col justify-between p-6">
        <div>
          <span class="text-muted font-mono text-[11px] tracking-wider uppercase">
            {pack.requests}
            {t.revisions.requestsLabel}
          </span>
          <p class="font-display text-accent mt-2 text-2xl font-extrabold tracking-tight">
            {pack.priceIdr}
          </p>
          <p class="text-muted mt-1 font-mono text-[11px]">
            {pack.perRequestIdr}
            {t.revisions.perRequestLabel}
          </p>
          <p class="text-muted mt-4 text-xs leading-relaxed">
            {pack.note[locale]}
          </p>
        </div>

        <a
          href={getWhatsAppUrl(pack.ctaMessage[locale])}
          target="_blank"
          rel="noopener noreferrer"
          use:drawButton={{ variant: 'outline', resketchOnHover: true }}
          class="hover:text-accent mt-6 flex items-center justify-center gap-2 py-2.5 font-mono text-xs font-semibold tracking-wide uppercase transition-colors"
        >
          <Icon name="message" size={14} />
          {t.revisions.packCta}
        </a>
      </div>
    {/each}
  </div>

  <p class="text-muted mt-6 flex items-start justify-center gap-2 text-center font-mono text-xs">
    <Icon name="clock" size={14} class="text-accent mt-0.5 shrink-0" />
    {t.revisions.validity}
  </p>
</section>
