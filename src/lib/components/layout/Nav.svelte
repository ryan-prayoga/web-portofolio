<script lang="ts">
  import { localeStore, type Locale } from '$lib/stores/locale.svelte';
  import { uiCopy } from '$lib/data/uiCopy';

  const t = $derived(uiCopy[localeStore.value]);
  const locale = $derived(localeStore.value);

  const navItems = $derived([
    { label: t.nav.work, href: '#work' },
    { label: t.nav.about, href: '#about' },
    { label: t.nav.stack, href: '#stack' },
    { label: t.nav.contact, href: '#contact' },
  ]);

  let scrolled = $state(false);
  let menuOpen = $state(false);

  $effect(() => {
    const onScroll = () => (scrolled = window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  });

  function setLocale(value: Locale) {
    localeStore.set(value);
  }

  function goTo(id: string) {
    return (event: Event) => {
      event.preventDefault();
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      menuOpen = false;
    };
  }
</script>

<nav class:scrolled class="nav">
  <a href="#top" class="brand" onclick={goTo('top')} aria-label="Ryan Prayoga, home">
    RP<span class="coords">— 6.17°S 106.63°E</span>
  </a>

  <div class="desktop-links" aria-label="Section navigation">
    {#each navItems as item (item.href)}
      <a href={item.href} onclick={goTo(item.href.slice(1))}>{item.label}</a>
    {/each}
  </div>

  <div class="nav-actions">
    <span class="status mono"><i></i>{t.available}</span>
    <div class="lang" role="group" aria-label="Language">
      <button type="button" class:active={locale === 'en'} aria-pressed={locale === 'en'} onclick={() => setLocale('en')}>EN</button>
      <span aria-hidden="true">/</span>
      <button type="button" class:active={locale === 'id'} aria-pressed={locale === 'id'} onclick={() => setLocale('id')}>ID</button>
    </div>
    <a class="nav-cv" href={locale === 'id' ? '/cv/cv-id.pdf' : '/cv/cv-en.pdf'} download>CV ↗</a>
    <button class="menu-btn" type="button" onclick={() => (menuOpen = !menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}>
      {menuOpen ? 'Close' : 'Menu'}
    </button>
  </div>
</nav>

{#if menuOpen}
  <div class="mobile-menu">
    {#each navItems as item, i (item.href)}
      <a href={item.href} onclick={goTo(item.href.slice(1))}>
        <span>0{i + 1}</span>{item.label}
      </a>
    {/each}
    <a class="mm-cv" href={locale === 'id' ? '/cv/cv-id.pdf' : '/cv/cv-en.pdf'} download>
      <span>→</span>{t.downloadCv}
    </a>
  </div>
{/if}

<style>
  .mono {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
  .nav {
    position: fixed;
    inset: 0 0 auto;
    z-index: 60;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.85rem clamp(1.25rem, 5vw, 4rem);
    border-bottom: 1px solid transparent;
    transition: background-color 0.25s, border-color 0.25s;
  }
  .nav.scrolled {
    background: color-mix(in srgb, var(--color-night) 82%, transparent);
    backdrop-filter: blur(10px);
    border-bottom-color: color-mix(in srgb, var(--color-slate) 55%, transparent);
  }
  .brand {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 1.05rem;
    letter-spacing: -0.02em;
    color: var(--color-bone);
    text-decoration: none;
    display: inline-flex;
    align-items: baseline;
    gap: 0.5rem;
  }
  .brand .coords {
    font-family: var(--font-mono);
    font-size: 0.62rem;
    font-weight: 400;
    letter-spacing: 0.05em;
    color: var(--color-greige);
  }
  .desktop-links {
    display: flex;
    gap: 1.6rem;
  }
  .desktop-links a {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--color-greige);
    text-decoration: none;
    transition: color 0.18s;
  }
  .desktop-links a:hover,
  .desktop-links a:focus-visible {
    color: var(--color-ember);
  }
  .nav-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .status {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--color-bone);
  }
  .status i {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--color-ember);
    animation: ember-pulse 2.4s ease-out infinite;
  }
  .lang {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-family: var(--font-mono);
    font-size: 0.72rem;
  }
  .lang span {
    color: var(--color-slate);
  }
  .lang button {
    border: 0;
    background: none;
    padding: 0;
    cursor: pointer;
    color: var(--color-greige);
    font: inherit;
    transition: color 0.18s;
  }
  .lang button.active {
    color: var(--color-bone);
    font-weight: 600;
  }
  .lang button:hover {
    color: var(--color-ember);
  }
  .nav-cv {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--color-bone);
    text-decoration: none;
    border-bottom: 1px solid var(--color-bone);
    padding-bottom: 1px;
  }
  .nav-cv:hover {
    color: var(--color-ember);
    border-color: var(--color-ember);
  }
  .menu-btn {
    display: none;
    border: 1px solid var(--color-slate);
    background: none;
    font-family: var(--font-mono);
    font-size: 0.7rem;
    text-transform: uppercase;
    padding: 0.45rem 0.7rem;
    cursor: pointer;
    color: var(--color-bone);
  }
  .mobile-menu {
    position: fixed;
    inset: 0;
    z-index: 55;
    display: grid;
    align-content: center;
    padding: 5rem clamp(1.25rem, 5vw, 4rem) 2rem;
    background: var(--color-night);
  }
  .mobile-menu a {
    display: flex;
    align-items: baseline;
    gap: 1rem;
    padding: 1.1rem 0;
    border-top: 1px solid color-mix(in srgb, var(--color-slate) 55%, transparent);
    font-family: var(--font-display);
    font-size: clamp(2rem, 9vw, 3rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    color: var(--color-bone);
    text-decoration: none;
  }
  .mobile-menu a:last-child {
    border-bottom: 1px solid color-mix(in srgb, var(--color-slate) 55%, transparent);
  }
  .mobile-menu span {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--color-ember);
  }
  .mobile-menu .mm-cv {
    color: var(--color-ember);
  }
  @media (max-width: 900px) {
    .status {
      display: none;
    }
  }
  @media (max-width: 760px) {
    .desktop-links,
    .nav-cv {
      display: none;
    }
    .menu-btn {
      display: inline-flex;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .status i {
      animation: none;
    }
  }
</style>
