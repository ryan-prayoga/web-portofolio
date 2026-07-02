<script lang="ts">
  import { socials } from '$lib/data/socials';
  import { profile } from '$lib/data/profile';
  import Hero from '$lib/components/hero/Hero.svelte';
  import Work from '$lib/components/sections/Work.svelte';
  import About from '$lib/components/sections/About.svelte';
  import Stack from '$lib/components/sections/Stack.svelte';
  import Contact from '$lib/components/sections/Contact.svelte';

  const SITE_URL = 'https://ryanprayoga.dev';
  const PAGE_URL = SITE_URL;
  const OG_IMAGE = `${SITE_URL}/og-image.png`;

  const email = socials.find((s) => s.name === 'Email');
  const github = socials.find((s) => s.name === 'GitHub');
  const linkedin = socials.find((s) => s.name === 'LinkedIn');

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    url: SITE_URL,
    image: OG_IMAGE,
    jobTitle: 'Full-Stack Engineer',
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Universitas Pasundan' },
    address: { '@type': 'PostalAddress', addressLocality: 'Tangerang', addressCountry: 'ID' },
    sameAs: [github?.url, linkedin?.url].filter(Boolean),
    email: email?.label,
    knowsAbout: ['Full-Stack Development', 'SvelteKit', 'Go', 'Laravel', 'PostgreSQL', 'DevOps', 'Technical Leadership'],
  };
</script>

<svelte:head>
  <title>Ryan Prayoga — Full-Stack Engineer & Team Lead</title>
  <meta name="description" content="Portfolio Ryan Prayoga: Full-Stack Engineer dan Team Lead — enterprise systems, civic-tech, developer tooling, deployment workflow, S1 Informatika Universitas Pasundan." />
  <meta name="author" content="Ryan Prayoga" />
  <meta name="keywords" content="Ryan Prayoga, Full-Stack Engineer, Team Lead, SvelteKit, Go, Laravel, PostgreSQL, Universitas Pasundan, Indonesia" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href={PAGE_URL} />
  <meta property="og:type" content="profile" />
  <meta property="og:site_name" content="Ryan Prayoga" />
  <meta property="og:title" content="Ryan Prayoga — Full-Stack Engineer & Team Lead" />
  <meta property="og:description" content="Selected work, stack, and delivery method — full-stack engineer & team lead based in Tangerang, Indonesia." />
  <meta property="og:url" content={PAGE_URL} />
  <meta property="og:image" content={OG_IMAGE} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Ryan Prayoga — Full-Stack Engineer & Team Lead" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Ryan Prayoga — Full-Stack Engineer & Team Lead" />
  <meta name="twitter:description" content="Full-Stack Engineer & Team Lead — enterprise systems, civic-tech, developer tooling, deployment workflows." />
  <meta name="twitter:image" content={OG_IMAGE} />
  {@html `<script type="application/ld+json">${JSON.stringify(personJsonLd)}</` + `script>`}
</svelte:head>

<main id="top">
  <Hero />
  <Work />
  <About />
  <Stack />
  <Contact />
</main>
