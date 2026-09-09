<script lang="ts">
  import Icon from '$lib/components/Icon.svelte';
  import { localeStore } from '$lib/stores/locale.svelte';
  import { freelanceCopy } from '$lib/data/freelanceCopy';
  import { FREELANCE_CONFIG, getWhatsAppUrl } from '$lib/data/freelanceData';
  import { profile } from '$lib/data/profile';

  const t = $derived(freelanceCopy[localeStore.value]);
  const locale = $derived(localeStore.value);

  function toTop(event: Event) {
    event.preventDefault();
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  }

  const defaultWaMessage = $derived(
    locale === 'id'
      ? 'Halo Ryan, saya ingin konsultasi pembuatan web portofolio profesional.'
      : 'Hi Ryan, I would like to consult about building a custom web portfolio.',
  );
</script>

<footer class="border-rule text-muted mx-auto max-w-5xl border-t px-6 py-12 font-mono text-xs">
  <div class="grid gap-8 sm:grid-cols-2 md:grid-cols-[2fr_1fr_1fr] pb-8 border-b border-rule">
    <div>
      <a href="#top" onclick={toTop} class="font-display text-lg font-semibold text-ink tracking-tight">
        Ryan Prayoga<span class="text-accent">.</span>
      </a>
      <p class="mt-2 max-w-sm text-xs leading-relaxed text-muted">
        {t.footer.description}
      </p>
    </div>

    <div>
      <span class="font-mono text-xs font-semibold text-ink uppercase tracking-wider block mb-3">
        {t.footer.linksHeading}
      </span>
      <ul class="flex flex-col gap-2">
        <li><a href="#services" class="hover:text-accent transition-colors">{t.nav.services}</a></li>
        <li><a href="#why-us" class="hover:text-accent transition-colors">{t.nav.whyUs}</a></li>
        <li><a href="#packages" class="hover:text-accent transition-colors">{t.nav.packages}</a></li>
        <li><a href="#process" class="hover:text-accent transition-colors">{t.nav.process}</a></li>
        <li><a href="#faq" class="hover:text-accent transition-colors">{t.nav.faq}</a></li>
      </ul>
    </div>

    <div>
      <span class="font-mono text-xs font-semibold text-ink uppercase tracking-wider block mb-3">
        {t.footer.contactHeading}
      </span>
      <ul class="flex flex-col gap-2">
        <li>
          <a
            href={getWhatsAppUrl(defaultWaMessage)}
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-accent flex items-center gap-1.5 transition-colors"
          >
            <Icon name="message" size={13} class="text-accent shrink-0" />
            WhatsApp ({FREELANCE_CONFIG.whatsappNumber})
          </a>
        </li>
        <li>
          <a
            href="mailto:{FREELANCE_CONFIG.email}"
            class="hover:text-accent flex items-center gap-1.5 transition-colors"
          >
            <Icon name="mail" size={13} class="text-accent shrink-0" />
            Email ({FREELANCE_CONFIG.email})
          </a>
        </li>
        <li>
          <a
            href={FREELANCE_CONFIG.mainPortfolioUrl}
            target="_blank"
            rel="noopener noreferrer"
            class="text-accent hover:underline flex items-center gap-1"
          >
            ryanprayoga.dev
            <Icon name="arrowUpRight" size={13} />
          </a>
        </li>
      </ul>
    </div>
  </div>

  <div class="pt-6 flex flex-wrap justify-between items-center gap-4 uppercase text-[11px]">
    <span>© 2026 {profile.name}. {t.footer.rights}</span>
    <span class="flex items-center gap-1.5">
      <Icon name="mapPin" size={13} class="text-accent" />
      {profile.location}
    </span>
    <a href="#top" onclick={toTop} class="no-print hover:text-accent flex items-center gap-1.5 transition-colors">
      <Icon name="arrowUp" size={13} />
      {t.footer.backToTop}
    </a>
  </div>
</footer>
