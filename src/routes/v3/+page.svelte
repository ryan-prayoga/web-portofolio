<script lang="ts">
  import Hero from '$lib/v3/components/Hero.svelte';
  import About from '$lib/v3/components/About.svelte';
  import ProjectShowcase from '$lib/v3/components/ProjectShowcase.svelte';
  import Skills from '$lib/v3/components/Skills.svelte';
  import Contact from '$lib/v3/components/Contact.svelte';
  import LangSwitcher from '$lib/v3/components/LangSwitcher.svelte';
  import { t, locale } from '$lib/v3/i18n';
  import { scrollReveal } from '$lib/v3/actions/scrollReveal';

  let scrolled = $state(false);
  let mobileMenuOpen = $state(false);

  $effect(() => {
    const onScroll = () => {
      scrolled = window.scrollY > 50;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  });

  function scrollTo(id: string) {
    return (e: Event) => {
      e.preventDefault();
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };
  }
</script>

<svelte:head>
  <title>Ryan Prayoga — Portfolio v3</title>
  <meta
    name="description"
    content="Full-Stack Engineer portfolio — enterprise systems, civic-tech, developer tooling."
  />
</svelte:head>

<!-- Floating Nav -->
<nav
  class="fixed top-0 right-0 left-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300 {scrolled
    ? 'border-b border-border bg-[#07090d]/80 backdrop-blur-md'
    : ''}"
>
  <a href="#hero" onclick={scrollTo('hero')} class="font-heading text-sm font-bold tracking-wide text-primary">
    RP
  </a>

  <div class="hidden items-center gap-6 md:flex">
    {#each (['about', 'projects', 'skills', 'contact'] as const) as section (section)}
      <a
        href="#{section}"
        onclick={scrollTo(section)}
        class="text-xs tracking-wide text-muted uppercase transition hover:text-primary"
      >
        {$t.nav[section]}
      </a>
    {/each}
  </div>

  <div class="flex items-center gap-3">
    <LangSwitcher />
    <!-- Hamburger: mobile only -->
    <button
      class="flex h-8 w-8 items-center justify-center rounded-md border border-border md:hidden"
      onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
      aria-label="Toggle menu"
      aria-expanded={mobileMenuOpen}
    >
      <svg class="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        {#if mobileMenuOpen}
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        {:else}
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        {/if}
      </svg>
    </button>
  </div>
</nav>

<!-- Mobile Menu Overlay -->
{#if mobileMenuOpen}
  <div
    class="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-[#07090d]/95 backdrop-blur-md md:hidden"
  >
    {#each (['about', 'projects', 'skills', 'contact'] as const) as section (section)}
      <a
        href="#{section}"
        onclick={(e) => { scrollTo(section)(e); mobileMenuOpen = false; }}
        class="py-3 text-lg font-medium tracking-wide text-primary uppercase transition hover:text-accent-cyan"
      >
        {$t.nav[section]}
      </a>
    {/each}
  </div>
{/if}

<!-- Sections -->
<main>
  <Hero />
  <About />
  <ProjectShowcase />
  <Skills />
  <Contact />

  <!-- Footer -->
  <footer class="border-t border-border px-6 py-8 text-center" use:scrollReveal>
    <p class="text-xs text-muted">
      © {new Date().getFullYear()} Ryan Prayoga · Built with SvelteKit + Three.js + GSAP
    </p>
  </footer>
</main>
