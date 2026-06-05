<script lang="ts">
  import { locale, t } from '$lib/v3/i18n';
  import Nav from '$lib/v4/components/Nav.svelte';
  import Hero from '$lib/v4/components/Hero.svelte';
  import About from '$lib/v4/components/About.svelte';
  import Projects from '$lib/v4/components/Projects.svelte';
  import Skills from '$lib/v4/components/Skills.svelte';
  import Contact from '$lib/v4/components/Contact.svelte';

  const SITE_URL = 'https://ryanprayoga.dev';
  const PAGE_URL = `${SITE_URL}/v4`;
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
      'DevOps',
    ],
  };

  $effect(() => {
    document.documentElement.lang = $locale;
  });
</script>

<svelte:head>
  <title>Ryan Prayoga — Full-Stack Engineer & Team Lead</title>
  <meta name="description" content={$t.about.paragraphs[0]} />
  <meta name="author" content="Ryan Prayoga" />
  <meta
    name="keywords"
    content="Ryan Prayoga, Full-Stack Engineer, Team Lead, SvelteKit, Go, Laravel, PostgreSQL, Civic Tech, Developer Tooling, Indonesia, Tangerang"
  />
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
  {#each Object.entries(ogLocaleMap) as [loc, ogLoc] (loc)}
    {#if loc !== $locale}
      <meta property="og:locale:alternate" content={ogLoc} />
    {/if}
  {/each}

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Ryan Prayoga — Full-Stack Engineer & Team Lead" />
  <meta name="twitter:description" content={$t.about.paragraphs[0]} />
  <meta name="twitter:image" content={OG_IMAGE} />

  {@html `<script type="application/ld+json">${JSON.stringify(personJsonLd)}</` + `script>`}
</svelte:head>

<div class="v4-root relative min-h-[100dvh] overflow-x-hidden">
  <div class="v4-grain pointer-events-none fixed inset-0 z-[60]" aria-hidden="true"></div>

  <Nav />

  <main>
    <Hero />
    <About />
    <Projects />
    <Skills />
    <Contact />
  </main>
</div>

<style>
  :global(body) {
    background-color: var(--color-paper);
  }
</style>
