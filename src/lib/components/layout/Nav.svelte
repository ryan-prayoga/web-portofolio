<script lang="ts">
  import { page } from '$app/state';
  import { localeStore, type Locale } from '$lib/stores/locale.svelte';
  import { uiCopy } from '$lib/data/uiCopy';
  import { drawButton } from '$lib/actions/drawably';
  import ThemeToggle from '$lib/components/ThemeToggle.svelte';
  import Icon from '$lib/components/Icon.svelte';

  const t = $derived(uiCopy[localeStore.value]);
  const locale = $derived(localeStore.value);
  const onHome = $derived(page.url.pathname === '/');

  const navItems = $derived([
    { label: t.nav.experience, href: '#experience' },
    { label: t.nav.work, href: '#work' },
    { label: t.nav.skills, href: '#skills' },
    { label: t.nav.contact, href: '#contact' },
  ]);

  let scrolled = $state(false);
  let menuOpen = $state(false);
  let toggleEl: HTMLButtonElement | undefined = $state();
  let menuEl: HTMLDivElement | undefined = $state();
  let closeFocus: 'toggle' | 'brand' | 'none' = 'toggle';

  const toggleId = 'mobile-menu-toggle';
  const menuId = 'mobile-menu-dialog';

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
    const brand = document.querySelector<HTMLAnchorElement>('.nav .brand');
    const navControls = document.querySelectorAll<HTMLElement>(
      '.nav > :not(.nav-actions), .nav-actions > :not(.menu-btn)',
    );
    const previousBodyStyle = document.body.getAttribute('style');
    // 640px = Tailwind `sm` — harus sama dengan kelas sm:hidden pada
    // tombol toggle, kalau tidak ada rentang lebar tanpa kontrol tutup.
    const desktop = window.matchMedia('(min-width: 640px)');
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
    const prepareForTeardown = () => {
      closeFocus = 'none';
    };
    const containKeyboard = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        menuOpen = false;
        return;
      }
      if (event.key !== 'Tab') return;

      const focusable: HTMLElement[] = [toggle, ...menuLinks];
      const currentIndex = focusable.indexOf(document.activeElement as HTMLElement);
      const nextIndex = event.shiftKey
        ? (currentIndex - 1 + focusable.length) % focusable.length
        : (currentIndex + 1) % focusable.length;
      event.preventDefault();
      focusable[nextIndex]?.focus();
    };

    desktop.addEventListener('change', closeForBreakpoint);
    window.addEventListener('portfolio:test-teardown', prepareForTeardown, { capture: true });
    document.addEventListener('keydown', containKeyboard);

    return () => {
      desktop.removeEventListener('change', closeForBreakpoint);
      window.removeEventListener('portfolio:test-teardown', prepareForTeardown, { capture: true });
      document.removeEventListener('keydown', containKeyboard);
      background?.removeAttribute('inert');
      navControls.forEach((control) => control.removeAttribute('inert'));
      if (previousBodyStyle === null) document.body.removeAttribute('style');
      else document.body.setAttribute('style', previousBodyStyle);
      if (closeFocus === 'brand') brand?.focus();
      if (closeFocus === 'toggle') toggle.focus();
      closeFocus = 'toggle';
    };
  });

  function setLocale(value: Locale) {
    localeStore.set(value);
  }

  function goTo(id: string) {
    return (event: Event) => {
      if (!onHome) {
        // Navigasi normal ke /#id dari halaman lain — tapi menu tetap
        // WAJIB ditutup, kalau tidak overlay + inert nyangkut di atas
        // halaman tujuan.
        closeFocus = 'none';
        menuOpen = false;
        return;
      }
      event.preventDefault();
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
      closeFocus = 'toggle';
      menuOpen = false;
    };
  }
</script>

<nav
  class="nav bg-paper/85 fixed inset-x-0 top-0 z-60 flex items-center justify-between gap-4 border-b px-6 py-3 backdrop-blur transition-colors {scrolled
    ? 'border-rule'
    : 'border-transparent'}"
>
  <a
    href={onHome ? '#top' : '/'}
    class="brand font-display text-xl font-bold tracking-tight whitespace-nowrap"
    onclick={goTo('top')}
    aria-label={t.a11y.home}
  >
    Ryan Prayoga<span class="text-accent">.</span>
  </a>

  <div class="desktop-links hidden gap-6 sm:flex">
    {#each navItems as item (item.href)}
      <a
        href={onHome ? item.href : `/${item.href}`}
        onclick={goTo(item.href.slice(1))}
        class="text-muted hover:text-accent font-display text-sm tracking-wide uppercase transition-colors"
      >
        {item.label}
      </a>
    {/each}
  </div>

  <div class="nav-actions flex items-center gap-2 sm:gap-2.5">
    <span class="status text-muted hidden items-center gap-2 font-display text-sm uppercase min-[900px]:inline-flex">
      <i class="bg-accent inline-block h-1.5 w-1.5 rounded-full" aria-hidden="true"></i>{t.status}
    </span>
    <ThemeToggle />
    <button
      type="button"
      use:drawButton={{ variant: 'outline', resketchOnHover: true }}
      onclick={() => setLocale(locale === 'en' ? 'id' : 'en')}
      aria-label={locale === 'en' ? 'Switch to Indonesian' : 'Switch to English'}
      title={locale === 'en' ? 'Switch to Indonesian' : 'Switch to English'}
      class="lang-btn inline-flex min-h-[36px] cursor-pointer items-center justify-center !px-2.5 !py-1 font-display text-sm uppercase transition-colors active:scale-95"
    >
      <span class={locale === 'en' ? 'font-bold text-accent' : 'text-muted'}>EN</span>
      <span class="text-rule mx-1 select-none" aria-hidden="true">/</span>
      <span class={locale === 'id' ? 'font-bold text-accent' : 'text-muted'}>ID</span>
    </button>
    <a
      href={locale === 'id' ? '/cv/cv-id.pdf' : '/cv/cv-en.pdf'}
      download
      use:drawButton={{ variant: 'outline', resketchOnHover: true }}
      class="nav-cv hidden sm:inline-flex min-h-[36px] cursor-pointer items-center justify-center !px-2.5 !py-1 font-display text-sm uppercase transition-colors text-ink hover:text-accent active:scale-95"
    >
      CV <Icon name="arrowDown" size={12} class="ml-1 inline-block" />
    </a>
    <button
      id={toggleId}
      bind:this={toggleEl}
      use:drawButton={{ variant: 'outline', resketchOnHover: true }}
      class="menu-btn sm:!hidden inline-flex min-h-[36px] cursor-pointer items-center justify-center !px-3 !py-1 font-display text-sm uppercase transition-colors active:scale-95"
      type="button"
      onclick={() => {
        closeFocus = 'toggle';
        menuOpen = !menuOpen;
      }}
      aria-label={t.a11y.toggleMenu}
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
    aria-label={t.a11y.mobileNav}
  >
    <div class="mb-2">
      <span class="text-muted font-display text-xs font-semibold tracking-widest uppercase">Navigation / Directory</span
      >
    </div>

    <div class="my-auto flex flex-col">
      {#each navItems as item, i (item.href)}
        <a
          href={onHome ? item.href : `/${item.href}`}
          onclick={goTo(item.href.slice(1))}
          class="border-rule group flex items-baseline justify-between border-t py-4 text-3xl font-display font-bold tracking-tight text-ink hover:text-accent transition-colors active:scale-[0.99]"
        >
          <div class="flex items-baseline gap-4">
            <span class="text-accent font-display text-base font-bold" aria-hidden="true">0{i + 1}</span>
            <span class="group-hover:translate-x-1.5 transition-transform duration-200">{item.label}</span>
          </div>
          <Icon
            name="arrowRight"
            size={20}
            class="text-muted/40 group-hover:text-accent group-hover:translate-x-1 transition-all"
          />
        </a>
      {/each}
      <a
        href={locale === 'id' ? '/cv/cv-id.pdf' : '/cv/cv-en.pdf'}
        download
        class="border-rule group text-accent flex items-baseline justify-between border-t border-b py-4 text-3xl font-display font-bold tracking-tight hover:opacity-85 transition-opacity active:scale-[0.99]"
      >
        <div class="flex items-baseline gap-4">
          <Icon name="arrowDown" size={18} class="text-accent" />
          <span class="group-hover:translate-x-1.5 transition-transform duration-200">{t.hero.downloadCv}</span>
        </div>
        <span class="text-accent/60 font-display text-sm tracking-wider uppercase" aria-hidden="true">[PDF]</span>
      </a>
    </div>

    <div
      class="pt-4 border-t border-rule/60 flex items-center justify-between text-muted font-display text-sm uppercase"
      aria-hidden="true"
    >
      <span>Tangerang, ID · UTC+7</span>
      <span class="text-accent font-semibold">[✓] OPEN TO WORK</span>
    </div>
  </div>
{/if}
