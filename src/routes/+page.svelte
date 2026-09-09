<script lang="ts">
  import { socials } from '$lib/data/socials';
  import { profile } from '$lib/data/profile';
  import Identity from '$lib/components/sections/Identity.svelte';
  import Experience from '$lib/components/sections/Experience.svelte';
  import Work from '$lib/components/sections/Work.svelte';
  import Skills from '$lib/components/sections/Skills.svelte';
  import Education from '$lib/components/sections/Education.svelte';
  import Contact from '$lib/components/sections/Contact.svelte';

  const SITE_URL = 'https://ryanprayoga.dev';
  const PAGE_URL = SITE_URL;
  const OG_IMAGE = `${SITE_URL}/og-image.jpg`;
  const TITLE = 'Ryan Prayoga — Fullstack Developer & Sub Team Lead';
  const DESCRIPTION =
    'Fullstack Developer & Sub Team Lead — 4+ years shipping production web, mobile, and tooling systems for enterprise, government, and self-built products. Laravel, SvelteKit, Go, PostgreSQL.';

  const email = socials.find((s) => s.name === 'Email');
  const github = socials.find((s) => s.name === 'GitHub');
  const linkedin = socials.find((s) => s.name === 'LinkedIn');

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    url: SITE_URL,
    // Person.image = foto orangnya (rich result), bukan screenshot situs
    image: `${SITE_URL}/photo/ryan-700.jpg`,
    jobTitle: 'Fullstack Developer & Sub Team Lead',
    worksFor: { '@type': 'Organization', name: profile.company },
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Universitas Pasundan' },
    address: { '@type': 'PostalAddress', addressLocality: 'Tangerang', addressCountry: 'ID' },
    sameAs: [github?.url, linkedin?.url].filter(Boolean),
    email: email?.label,
    knowsAbout: [
      'Fullstack Development',
      'Go',
      'Rust',
      'SvelteKit',
      'Laravel',
      'PostgreSQL',
      'Flutter',
      'AI Agents',
      'Systems Programming',
      'DevOps',
      'Technical Leadership',
    ],
  };
</script>

<svelte:head>
  <title>{TITLE}</title>
  <meta name="description" content={DESCRIPTION} />
  <meta name="author" content="Ryan Prayoga" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href={PAGE_URL} />
  <meta property="og:type" content="profile" />
  <meta property="og:site_name" content="Ryan Prayoga" />
  <meta property="og:title" content={TITLE} />
  <meta property="og:description" content={DESCRIPTION} />
  <meta property="og:url" content={PAGE_URL} />
  <meta property="og:image" content={OG_IMAGE} />
  <meta property="og:image:type" content="image/jpeg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content={TITLE} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={TITLE} />
  <meta name="twitter:description" content={DESCRIPTION} />
  <meta name="twitter:image" content={OG_IMAGE} />
  {@html `<script type="application/ld+json">${JSON.stringify(personJsonLd)}</` + `script>`}
</svelte:head>

<main id="top">
  <Identity />
  <Experience />
  <Work />
  <Skills />
  <Education />
  <Contact />
</main>
