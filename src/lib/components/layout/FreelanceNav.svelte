<script lang="ts">
  import Icon from '$lib/components/Icon.svelte';
  import { localeStore, type Locale } from '$lib/stores/locale.svelte';
  import { freelanceCopy } from '$lib/data/freelanceCopy';
  import { FREELANCE_CONFIG, getWhatsAppUrl } from '$lib/data/freelanceData';
  import { drawButton, drawBadge } from '$lib/actions/drawably';
  import ThemeToggle from '$lib/components/ThemeToggle.svelte';

  const t = $derived(freelanceCopy[localeStore.value]);
  const locale = $derived(localeStore.value);

  const navItems = $derived([
    { label: t.nav.services, href: '#services' },
    { label: t.nav.whyUs, href: '#why-us' },
    { label: t.nav.packages, href: '#packages' },
    { label: t.nav.process, href: '#process' },
    { label: t.nav.revisions, href: '#revisions' },
    { label: t.nav.showcase, href: '#showcase' },
    { label: t.nav.faq, href: '#faq' },
  ]);

  let scrolled = $state(false);
  let menuOpen = $state(false);
  let toggleEl: HTMLButtonElement | undefined = $state();
  let menuEl: HTMLDivElement | undefined = $state();
  let closeFocus: 'toggle' | 'brand' | 'none' = 'toggle';

  const toggleId = 'freelance-mobile-menu-toggle';
  const menuId = 'freelance-mobile-menu-dialog';

  $effect(() => {
    const onScroll = () => (scrolled = window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  });

  $effect(() => {
    if (!menuOpen || !toggleEl || !menuEl) return;

    const toggle = toggleEl;
    const menu = menuEl;
    const background = document.getElementById('page-background');
    const navControls = document.querySelectorAll<HTMLElement>(
      '.freelance-nav > :not(.nav-actions), .nav-actions > :not(.menu-btn)',
    );
    const desktop = window.matchMedia('(min-width: 1120px)');
    const menuLinks = [...menu.querySelectorAll<HTMLAnchorElement>('a[href]')];

    background?.setAttribute('inert', '');
    navControls.forEach((control) => control.setAttribute('inert', ''));
    document.body.style.overflow = 'hidden';
    menuLinks[0]?.focus();

    const closeForBreakpoint = (event: MediaQueryListEvent) => {
      if (event.matches) {
        closeFocus = 'brand';
        menuOpen = false;
      }
    };

    const onKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeFocus = 'toggle';
        menuOpen = false;
        return;
      }

      if (event.key !== 'Tab') return;

      const focusable = [
        ...menu.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled])',
        ),
      ].filter((el) => el.offsetParent !== null);

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    desktop.addEventListener('change', closeForBreakpoint);
    window.addEventListener('keydown', onKeydown);

    return () => {
      desktop.removeEventListener('change', closeForBreakpoint);
      window.removeEventListener('keydown', onKeydown);
      background?.removeAttribute('inert');
      navControls.forEach((control) => control.removeAttribute('inert'));
      document.body.style.overflow = '';

      if (closeFocus === 'toggle') {
        toggle.focus();
      } else if (closeFocus === 'brand') {
        const brand = document.querySelector<HTMLAnchorElement>('.freelance-nav .brand');
        brand?.focus();
      }
    };
  });

  function setLocale(value: Locale) {
    localeStore.set(value);
  }

  function goTo(id: string) {
    return (event: Event) => {
      event.preventDefault();
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
      closeFocus = 'toggle';
      menuOpen = false;
    };
  }

  const defaultWaMessage = $derived(
    locale === 'id'
      ? 'Halo Ryan, saya ingin konsultasi pembuatan web portofolio profesional.'
      : 'Hi Ryan, I would like to consult about building a custom web portfolio.',
  );
</script>

<nav
  class="freelance-nav bg-paper/90 fixed inset-x-0 top-0 z-60 flex items-center justify-between gap-4 border-b px-6 py-3 backdrop-blur transition-colors {scrolled
    ? 'border-rule'
    : 'border-transparent'}"
>
  <div class="flex items-center gap-3">
    <a
      href="#top"
      class="brand font-display text-xl font-bold tracking-tight whitespace-nowrap"
      onclick={goTo('top')}
      aria-label="Ryan Prayoga Freelance"
    >
      Ryan Prayoga<span class="text-accent">.</span>
    </a>
    <span
      use:drawBadge={{ variant: 'outline', resketchOnHover: true }}
      class="hidden cursor-default font-sans text-[0.65rem] font-semibold tracking-wider uppercase sm:inline-block px-1.5 py-0.5 text-accent"
    >
      Freelance
    </span>
  </div>

  <div class="desktop-links hidden gap-5 min-[1120px]:flex">
    {#each navItems as item (item.href)}
      <a
        href={item.href}
        onclick={goTo(item.href.slice(1))}
        class="text-muted hover:text-accent font-sans text-xs font-semibold tracking-wide uppercase transition-colors"
      >
        {item.label}
      </a>
    {/each}
  </div>

  <div class="nav-actions flex items-center gap-2 sm:gap-3">
    <a
      href={FREELANCE_CONFIG.mainPortfolioUrl}
      class="text-muted hover:text-accent hidden font-sans text-xs font-semibold tracking-wide uppercase transition-colors sm:inline-flex items-center gap-1"
      title="Lihat Portofolio Developer Utama"
    >
      {t.nav.personalPortfolio}
      <Icon name="arrowUpRight" size={12} />
    </a>

    <a
      href={getWhatsAppUrl(defaultWaMessage)}
      target="_blank"
      rel="noopener noreferrer"
      use:drawButton={{ variant: 'solid', resketchOnHover: true }}
      class="bg-accent text-paper hidden items-center gap-1.5 px-3 py-1 font-sans text-xs font-semibold uppercase transition-opacity min-[720px]:inline-flex hover:opacity-90"
    >
      <Icon name="message" size={13} />
      {t.nav.ctaConsultation}
    </a>

    <ThemeToggle />

    <button
      type="button"
      use:drawButton={{ variant: 'outline', resketchOnHover: true }}
      onclick={() => setLocale(locale === 'en' ? 'id' : 'en')}
      aria-label={locale === 'en' ? 'Ganti ke Bahasa Indonesia' : 'Switch to English'}
      title={locale === 'en' ? 'Ganti ke Bahasa Indonesia' : 'Switch to English'}
      class="lang-btn inline-flex min-h-[36px] cursor-pointer items-center justify-center !px-2.5 !py-1 font-sans text-xs font-semibold uppercase transition-colors active:scale-95"
    >
      <span class={locale === 'en' ? 'font-bold text-accent' : 'text-muted'}>EN</span>
      <span class="text-rule mx-1 select-none" aria-hidden="true">/</span>
      <span class={locale === 'id' ? 'font-bold text-accent' : 'text-muted'}>ID</span>
    </button>

    <button
      id={toggleId}
      bind:this={toggleEl}
      use:drawButton={{ variant: 'outline', resketchOnHover: true }}
      class="menu-btn min-[1120px]:!hidden inline-flex min-h-[36px] cursor-pointer items-center justify-center !px-3 !py-1 font-sans text-xs font-semibold uppercase transition-colors active:scale-95"
      type="button"
      onclick={() => {
        closeFocus = 'toggle';
        menuOpen = !menuOpen;
      }}
      aria-label="Toggle navigation menu"
      aria-expanded={menuOpen}
      aria-controls={menuId}
    >
      {menuOpen ? 'Close' : 'Menu'}
    </button>
  </div>
</nav>

{#if menuOpen}
  <div
    id={menuId}
    bind:this={menuEl}
    class="bg-paper/98 fixed inset-0 z-55 flex flex-col justify-between px-6 pt-24 pb-8 backdrop-blur-md"
    role="dialog"
    aria-modal="true"
    aria-label="Freelance navigation menu"
  >
    <div class="flex flex-col gap-6">
      <span class="text-muted font-sans text-xs font-semibold tracking-wider uppercase">// Navigasi Freelance</span>
      {#each navItems as item (item.href)}
        <a
          href={item.href}
          onclick={goTo(item.href.slice(1))}
          class="font-display hover:text-accent text-2xl font-medium tracking-tight transition-colors"
        >
          {item.label}
        </a>
      {/each}
      <a
        href={FREELANCE_CONFIG.mainPortfolioUrl}
        class="text-accent border-rule flex items-center gap-1.5 border-t pt-2 font-sans text-sm font-semibold tracking-wide uppercase transition-colors"
      >
        {t.nav.personalPortfolio}
        <Icon name="arrowUpRight" size={14} />
      </a>
    </div>

    <div class="flex flex-col gap-3 pt-6 border-t border-rule">
      <a
        href={getWhatsAppUrl(defaultWaMessage)}
        target="_blank"
        rel="noopener noreferrer"
        use:drawButton={{ variant: 'solid', resketchOnHover: true }}
        class="bg-accent text-paper flex items-center justify-center gap-2 py-3 font-sans text-xs font-semibold tracking-wide uppercase"
      >
        <Icon name="message" size={15} />
        {t.nav.ctaConsultation}
      </a>
      <p class="text-muted font-sans text-xs text-center font-medium">Ryan Prayoga · Jasa Web Portofolio</p>
    </div>
  </div>
{/if}
