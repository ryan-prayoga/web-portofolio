<script lang="ts">
  import Icon from '$lib/components/Icon.svelte';
  import { localeStore } from '$lib/stores/locale.svelte';
  import { freelanceCopy } from '$lib/data/freelanceCopy';
  import { getWhatsAppUrl } from '$lib/data/freelanceData';
  import { drawCard, drawButton, drawBadge } from '$lib/actions/drawably';

  const t = $derived(freelanceCopy[localeStore.value]);
  const locale = $derived(localeStore.value);

  const heroWaMessage = $derived(
    locale === 'id'
      ? 'Halo Ryan, saya ingin konsultasi pembuatan web portofolio kustom. Boleh tahu langkah awalnya?'
      : "Hi Ryan, I'd like to discuss building a custom web portfolio. How do we get started?",
  );
</script>

<section class="mx-auto max-w-5xl px-6 pt-28 pb-16 sm:pt-36 sm:pb-24">
  <div class="max-w-3xl">
    <div class="inline-block">
      <span
        use:drawBadge={{ variant: 'outline', resketchOnHover: true }}
        class="cursor-pointer px-3.5 py-1 font-display text-sm tracking-wide uppercase inline-flex items-center gap-1.5"
      >
        <Icon name="check" size={14} strokeWidth={2.25} class="text-accent" />
        {t.hero.status}
      </span>
    </div>

    <h1 class="mt-6 text-3xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl leading-[1.15]">
      {t.hero.title}<span
        class="text-accent underline decoration-accent/40 decoration-wavy underline-offset-8 font-display"
        >{t.hero.titleHighlight}</span
      >.
    </h1>

    <p class="mt-6 text-base sm:text-lg leading-relaxed text-muted max-w-2xl">
      {t.hero.subtitle}
    </p>

    <div class="mt-8 flex flex-wrap items-center gap-4">
      <a
        href={getWhatsAppUrl(heroWaMessage)}
        target="_blank"
        rel="noopener noreferrer"
        use:drawButton={{ variant: 'solid', resketchOnHover: true }}
        class="bg-accent text-paper inline-flex items-center gap-2 px-6 py-2.5 font-display text-base tracking-wide uppercase transition-opacity hover:opacity-90"
      >
        <Icon name="message" size={15} />
        {t.hero.ctaWhatsapp}
      </a>

      <a
        href="#packages"
        use:drawButton={{ variant: 'outline', resketchOnHover: true }}
        class="hover:text-accent inline-flex items-center gap-2 px-6 py-2.5 font-display text-base tracking-wide uppercase transition-colors"
      >
        {t.hero.ctaPackages}
        <Icon name="arrowDown" size={14} />
      </a>
    </div>
  </div>

  <!-- Proof Metrics Grid -->
  <div class="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
    {#each t.hero.metrics as metric, idx (idx)}
      <div use:drawCard={{ resketchOnHover: true }} class="bg-paper p-5 transition-transform hover:-translate-y-0.5">
        <p class="font-display text-2xl sm:text-3xl font-bold text-accent tracking-tight">
          {metric.value}
        </p>
        <p class="mt-1 font-display text-xs sm:text-sm tracking-wider uppercase text-ink">
          {metric.label}
        </p>
        <p class="mt-1 font-display text-xs text-muted">
          {metric.note}
        </p>
      </div>
    {/each}
  </div>
</section>
