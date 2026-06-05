<script lang="ts">
  import Hero from '$lib/v3/components/Hero.svelte';
  import About from '$lib/v3/components/About.svelte';
  import ProjectShowcase from '$lib/v3/components/ProjectShowcase.svelte';
  import Skills from '$lib/v3/components/Skills.svelte';
  import Contact from '$lib/v3/components/Contact.svelte';
  import LangSwitcher from '$lib/v3/components/LangSwitcher.svelte';
  import { t, locale } from '$lib/v3/i18n';
  import { scrollReveal } from '$lib/v3/actions/scrollReveal';
  import { onMount } from 'svelte';
  import type { HeroScene } from '$lib/v3/three/HeroScene';

  let scrolled = $state(false);
  let mobileMenuOpen = $state(false);
  let canvasEl: HTMLCanvasElement;
  let scene: HeroScene | undefined;

  const SITE_URL = 'https://ryanprayoga.dev';
  const PAGE_URL = `${SITE_URL}/v3`;
  const OG_IMAGE = `${SITE_URL}/v3/og-image.png`;

  const ogLocaleMap: Record<string, string> = {
    id: 'id_ID',
    en: 'en_US',
    fr: 'fr_FR',
  };

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Ryan Prayoga',
    url: SITE_URL,
    image: OG_IMAGE,
    jobTitle: 'Full-Stack Engineer',
    worksFor: {
      '@type': 'Organization',
      name: 'PT Traspac Makmur Sejahtera',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Tangerang',
      addressCountry: 'ID',
    },
    sameAs: [
      'https://github.com/ryan-prayoga',
      'https://www.linkedin.com/in/ryanprayogaaa',
    ],
    email: 'developer@ryanprayoga.dev',
    knowsAbout: [
      'Full-Stack Development',
      'SvelteKit',
      'Go',
      'Laravel',
      'PostgreSQL',
      'Three.js',
      'DevOps',
    ],
  };

  $effect(() => {
    document.documentElement.lang = $locale;
  });

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

  onMount(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    let cleanup = () => {};
    (async () => {
      const { HeroScene } = await import('$lib/v3/three/HeroScene');
      scene = new HeroScene();
      scene.init(canvasEl);

      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const tween = gsap.to(
        { progress: 0 },
        {
          progress: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
          onUpdate: function (this: { progress: number }) {
            scene?.updateProgress(this.progress);
          },
        }
      );

      cleanup = () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        scene?.dispose();
        scene = undefined;
      };
    })();

    return () => cleanup();
  });
</script>

<svelte:head>
  <title>Ryan Prayoga — Full-Stack Engineer & Team Lead</title>
  <meta
    name="description"
    content={$t.about.paragraphs[0]}
  />
  <meta name="author" content="Ryan Prayoga" />
  <meta name="keywords" content="Ryan Prayoga, Full-Stack Engineer, Team Lead, SvelteKit, Go, Laravel, PostgreSQL, Three.js, Civic Tech, Developer Tooling, Indonesia, Tangerang" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href={PAGE_URL} />

  <meta property="og:type" content="profile" />
  <meta property="og:site_name" content="Ryan Prayoga" />
  <meta property="og:title" content="Ryan Prayoga — Full-Stack Engineer & Team Lead" />
  <meta property="og:description" content={$t.about.paragraphs[0]} />
  <meta property="og:url" content={PAGE_URL} />
  <meta property="og:image" content={OG_IMAGE} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:locale" content={ogLocaleMap[$locale] ?? 'id_ID'} />
  {#each Object.entries(ogLocaleMap) as [loc, ogLoc]}
    {#if loc !== $locale}
      <meta property="og:locale:alternate" content={ogLoc} />
    {/if}
  {/each}
  <meta property="profile:first_name" content="Ryan" />
  <meta property="profile:last_name" content="Prayoga" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Ryan Prayoga — Full-Stack Engineer & Team Lead" />
  <meta name="twitter:description" content={$t.about.paragraphs[0]} />
  <meta name="twitter:image" content={OG_IMAGE} />

  {@html `<script type="application/ld+json">${JSON.stringify(personJsonLd)}</` + `script>`}
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
      class="flex h-11 w-11 items-center justify-center rounded-md border border-border md:hidden"
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

<!-- Persistent particle backdrop: fixed sibling of <main>, z-0 (NOT negative).
     A negative z-index here gets painted behind the root/body background on
     scroll repaint, which is what made the canvas vanish. Sitting at z-0 with
     its own opaque base, with <main> lifted to z-10, keeps it stable. -->
<div class="hero-backdrop pointer-events-none fixed inset-0 z-0" aria-hidden="true">
  <div class="hero-halo absolute inset-0"></div>
  <canvas bind:this={canvasEl} class="absolute inset-0 h-full w-full"></canvas>
</div>

<!-- Sections -->
<main class="relative z-10">
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

<style>
  /* Backdrop carries its own base color so it never depends on body bg.
     Body is made transparent on /v3 so nothing paints over the backdrop. */
  :global(body) {
    background-color: transparent;
  }
  .hero-backdrop {
    background-color: #07090d;
  }
  /* Soft radial halo behind the particle field: cyan core, indigo mid, pink
     edge. Sits under the canvas for an atmospheric glow. */
  .hero-halo {
    background:
      radial-gradient(
        ellipse 60% 55% at 50% 45%,
        rgba(34, 211, 238, 0.18) 0%,
        rgba(99, 102, 241, 0.12) 35%,
        rgba(236, 72, 153, 0.06) 60%,
        transparent 80%
      );
    filter: blur(40px);
  }
</style>
