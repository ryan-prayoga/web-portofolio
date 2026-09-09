<script lang="ts">
  import Icon from '$lib/components/Icon.svelte';
  import { localeStore } from '$lib/stores/locale.svelte';
  import { freelanceCopy } from '$lib/data/freelanceCopy';
  import { FREELANCE_CONFIG, getWhatsAppUrl } from '$lib/data/freelanceData';
  import { drawCard, drawButton, drawBadge } from '$lib/actions/drawably';

  const t = $derived(freelanceCopy[localeStore.value]);
  const locale = $derived(localeStore.value);

  const finalWaMessage = $derived(
    locale === 'id'
      ? 'Halo Ryan, saya siap untuk membuat website portofolio profesional. Boleh konsultasi jadwal & paketnya?'
      : 'Hi Ryan, I am ready to build a professional portfolio website. Can we discuss the schedule and packages?',
  );
</script>

<section id="contact" class="mx-auto max-w-5xl px-6 py-16 sm:py-24 border-t border-rule">
  <div
    use:drawCard={{ resketchOnHover: true }}
    class="bg-accent-soft/25 p-8 sm:p-14 text-center border-2 border-accent/40 relative overflow-hidden"
  >
    <div class="inline-block">
      <span
        use:drawBadge={{ variant: 'outline', resketchOnHover: true }}
        class="cursor-default px-3 py-1 font-mono text-xs tracking-wider uppercase text-accent"
      >
        // {t.cta.badge}
      </span>
    </div>

    <h2
      class="mt-6 font-display text-3xl sm:text-5xl font-bold tracking-tight text-ink max-w-2xl mx-auto leading-tight"
    >
      {t.cta.heading}
    </h2>

    <p class="mt-4 text-sm sm:text-base text-muted max-w-xl mx-auto leading-relaxed">
      {t.cta.subheading}
    </p>

    <div class="mt-8 flex flex-wrap items-center justify-center gap-4">
      <a
        href={getWhatsAppUrl(finalWaMessage)}
        target="_blank"
        rel="noopener noreferrer"
        use:drawButton={{ variant: 'solid', resketchOnHover: true }}
        class="bg-accent text-paper inline-flex items-center gap-2 px-8 py-3.5 font-mono text-xs font-bold tracking-wide uppercase shadow-sm transition-all hover:opacity-90"
      >
        <Icon name="message" size={16} />
        {t.cta.whatsappButton}
      </a>

      <a
        href="mailto:{FREELANCE_CONFIG.email}?subject=Inquiry%20Pembuatan%20Web%20Bisnis"
        use:drawButton={{ variant: 'outline', resketchOnHover: true }}
        class="border-rule hover:border-accent hover:text-accent inline-flex items-center gap-2 border px-6 py-3.5 font-mono text-xs font-semibold tracking-wide uppercase transition-colors"
      >
        <Icon name="mail" size={16} />
        {t.cta.emailButton}
      </a>
    </div>

    <div
      class="mt-12 pt-8 border-t border-rule/60 flex flex-wrap justify-center items-center gap-6 font-mono text-xs text-muted"
    >
      <span class="flex items-center gap-1.5">
        <Icon name="mapPin" size={14} class="text-accent" />
        Tangerang, Indonesia (WIB · UTC+7)
      </span>
      <span class="hidden sm:inline" aria-hidden="true">·</span>
      <a
        href={FREELANCE_CONFIG.mainPortfolioUrl}
        target="_blank"
        rel="noopener noreferrer"
        class="text-accent hover:underline flex items-center gap-1 font-medium"
      >
        {t.cta.mainSiteLink}
        <Icon name="arrowUpRight" size={13} />
      </a>
    </div>
  </div>
</section>
