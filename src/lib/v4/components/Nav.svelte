<script lang="ts">
  import { t } from '$lib/v3/i18n';
  import LangSwitcher from './LangSwitcher.svelte';

  let scrolled = $state(false);
  let menuOpen = $state(false);

  const sections = ['about', 'projects', 'skills', 'contact'] as const;

  $effect(() => {
    const onScroll = () => {
      scrolled = window.scrollY > 40;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  });

  function go(id: string) {
    return (e: Event) => {
      e.preventDefault();
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      menuOpen = false;
    };
  }
</script>

<nav
  class="fixed inset-x-0 top-0 z-50 transition-colors duration-500 {scrolled
    ? 'border-b border-[var(--color-rule)] bg-[var(--color-paper)]/85 backdrop-blur-md'
    : 'border-b border-transparent'}"
>
  <div class="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 md:px-10">
    <a
      href="#top"
      onclick={go('top')}
      class="group flex items-baseline gap-2"
    >
      <span class="v4-display text-2xl leading-none text-[var(--color-ink)]">Ryan Prayoga</span>
      <span class="v4-mono hidden text-[0.65rem] tracking-[0.2em] text-[var(--color-clay)] sm:inline">/ V4</span>
    </a>

    <div class="hidden items-center gap-9 md:flex">
      {#each sections as section (section)}
        <a
          href="#{section}"
          onclick={go(section)}
          class="v4-mono v4-link-underline pb-0.5 text-[0.7rem] tracking-[0.18em] text-[var(--color-ink-soft)] uppercase transition-colors hover:text-[var(--color-ink)]"
        >
          {$t.nav[section]}
        </a>
      {/each}
      <LangSwitcher />
    </div>

    <div class="flex items-center gap-3 md:hidden">
      <LangSwitcher />
      <button
        class="flex h-10 w-10 items-center justify-center border border-[var(--color-rule-strong)] text-[var(--color-ink)] active:translate-y-[1px]"
        onclick={() => (menuOpen = !menuOpen)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          {#if menuOpen}
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          {:else}
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 7h18M3 12h18M3 17h18" />
          {/if}
        </svg>
      </button>
    </div>
  </div>
</nav>

{#if menuOpen}
  <div class="fixed inset-0 z-40 flex flex-col justify-center gap-2 bg-[var(--color-paper)] px-8 md:hidden">
    {#each sections as section, i (section)}
      <a
        href="#{section}"
        onclick={go(section)}
        class="flex items-baseline gap-4 border-b border-[var(--color-rule)] py-5"
      >
        <span class="v4-mono text-xs text-[var(--color-clay)]">0{i + 1}</span>
        <span class="v4-display text-4xl text-[var(--color-ink)]">{$t.nav[section]}</span>
      </a>
    {/each}
  </div>
{/if}
