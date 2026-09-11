<script lang="ts">
  import Icon from '$lib/components/Icon.svelte';
  import { localeStore } from '$lib/stores/locale.svelte';
  import { freelanceCopy } from '$lib/data/freelanceCopy';
  import { pricingPackages, getWhatsAppUrl } from '$lib/data/freelanceData';
  import { drawCard, drawButton, drawBadge } from '$lib/actions/drawably';

  const t = $derived(freelanceCopy[localeStore.value]);
  const locale = $derived(localeStore.value);

  const customInquiryWa = $derived(
    locale === 'id'
      ? 'Halo Ryan, saya punya request kustom untuk pembuatan web portofolio. Boleh diskusi?'
      : 'Hi Ryan, I have a custom inquiry for portfolio development. Can we discuss?',
  );
</script>

<section id="packages" class="mx-auto max-w-5xl px-6 py-16 sm:py-24 border-t border-rule">
  <div class="inline-block">
    <span
      use:drawBadge={{ variant: 'outline', resketchOnHover: true }}
      class="cursor-default px-3 py-1 font-sans text-xs font-semibold tracking-wide uppercase text-accent"
    >
      // {t.packages.badge}
    </span>
  </div>

  <h2 class="mt-4 font-display text-2xl sm:text-4xl font-semibold tracking-tight text-balance">
    {t.packages.heading}
  </h2>
  <p class="mt-3 text-muted max-w-2xl text-sm sm:text-base leading-relaxed">
    {t.packages.subheading}
  </p>

  <div class="mt-12 grid gap-8 lg:grid-cols-3 items-stretch">
    {#each pricingPackages as pkg (pkg.id)}
      <div
        use:drawCard={{ resketchOnHover: true }}
        class="bg-paper relative flex flex-col justify-between p-6 transition-all hover:-translate-y-1 sm:p-8 {pkg.popular
          ? 'drawably-accent bg-accent-soft/10 shadow-md'
          : ''}"
      >
        <div>
          {#if pkg.popular}
            <div class="mb-4">
              <span
                class="bg-accent text-paper inline-flex items-center gap-1.5 px-2.5 py-1 font-sans text-[11px] font-bold tracking-wide uppercase"
              >
                <Icon name="star" size={12} strokeWidth={2} />
                {t.packages.popularBadge}
              </span>
            </div>
          {/if}

          <span class="font-sans text-xs uppercase tracking-wide text-muted block font-medium">
            {pkg.tag[locale]}
          </span>
          <h3 class="mt-2 font-display text-xl sm:text-2xl font-bold text-ink tracking-tight">
            {pkg.name[locale]}
          </h3>

          <div class="mt-5 flex items-baseline gap-2">
            <span class="font-display text-3xl sm:text-4xl font-extrabold text-accent">
              {pkg.priceIdr}
            </span>
            <span class="font-sans text-xs text-muted">
              / {locale === 'id' ? 'proyek' : 'project'}
            </span>
          </div>
          <p class="mt-1 font-sans text-xs text-muted uppercase tracking-wide font-medium">
            {t.packages.oneTimePayment}
          </p>

          <p class="mt-4 text-xs sm:text-sm text-muted leading-relaxed">
            {pkg.description[locale]}
          </p>

          <div class="mt-4 pt-4 border-t border-rule font-sans text-xs text-muted flex items-center justify-between">
            <span class="flex items-center gap-1.5">
              <Icon name="clock" size={13} />
              {t.packages.deliveryLabel}:
            </span>
            <span class="font-semibold text-ink">{pkg.duration[locale]}</span>
          </div>

          <div class="mt-6">
            <span class="font-sans text-xs font-semibold uppercase tracking-wide text-ink block mb-3">
              {t.packages.featuresLabel}:
            </span>
            <ul class="flex flex-col gap-2.5 text-xs sm:text-sm text-ink/90">
              {#each pkg.features[locale] as feature, idx (idx)}
                <li class="flex items-start gap-2">
                  <Icon name="check" size={14} strokeWidth={2.25} class="text-accent mt-0.5 shrink-0" />
                  <span>{feature}</span>
                </li>
              {/each}
            </ul>
          </div>
        </div>

        <div class="mt-8 pt-6 border-t border-rule">
          <a
            href={getWhatsAppUrl(pkg.ctaMessage[locale])}
            target="_blank"
            rel="noopener noreferrer"
            use:drawButton={{ variant: pkg.popular ? 'solid' : 'outline', resketchOnHover: true }}
            class="flex w-full items-center justify-center gap-2 py-3 font-sans text-xs font-semibold tracking-wide uppercase transition-all {pkg.popular
              ? 'bg-accent text-paper hover:opacity-90'
              : 'hover:text-accent'}"
          >
            <Icon name="message" size={15} />
            {t.packages.ctaButton}
          </a>
        </div>
      </div>
    {/each}
  </div>

  <div class="mt-10 p-6 bg-paper/60 border border-dashed border-rule rounded-none text-center max-w-2xl mx-auto">
    <p class="text-muted flex items-center justify-center gap-2 font-sans text-xs">
      <Icon name="info" size={14} class="text-accent shrink-0" />
      {t.packages.customInquiryNote}
    </p>
    <a
      href={getWhatsAppUrl(customInquiryWa)}
      target="_blank"
      rel="noopener noreferrer"
      class="text-accent mt-2 inline-flex items-center gap-1 font-sans text-xs font-semibold tracking-wide uppercase hover:underline"
    >
      {t.packages.customInquiryCta}
      <Icon name="arrowUpRight" size={13} />
    </a>
  </div>
</section>
