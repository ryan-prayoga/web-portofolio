<script lang="ts">
  import { localeStore } from '$lib/stores/locale.svelte';
  import { FREELANCE_CONFIG } from '$lib/data/freelanceData';
  import FreelanceHero from '$lib/components/sections/freelance/FreelanceHero.svelte';
  import FreelanceComparison from '$lib/components/sections/freelance/FreelanceComparison.svelte';
  import FreelanceServices from '$lib/components/sections/freelance/FreelanceServices.svelte';
  import FreelancePricing from '$lib/components/sections/freelance/FreelancePricing.svelte';
  import FreelanceProcess from '$lib/components/sections/freelance/FreelanceProcess.svelte';
  import FreelanceShowcase from '$lib/components/sections/freelance/FreelanceShowcase.svelte';
  import FreelanceFaq from '$lib/components/sections/freelance/FreelanceFaq.svelte';
  import FreelanceContact from '$lib/components/sections/freelance/FreelanceContact.svelte';

  const locale = $derived(localeStore.value);

  const SITE_URL = 'https://freelance.ryanprayoga.dev';
  const OG_IMAGE = 'https://ryanprayoga.dev/og-image.png';

  const TITLE = $derived(
    locale === 'id'
      ? 'Jasa Pembuatan Web Portofolio Standout & Kinerja Tinggi — Ryan Prayoga'
      : 'Custom High-Performance Web Portfolio Development — Ryan Prayoga',
  );

  const DESCRIPTION = $derived(
    locale === 'id'
      ? 'Jasa pembuatan website portofolio kustom untuk software engineer, desainer, dan profesional. Performa skor 100, dwibahasa, desain unik tanpa template, dan bebas biaya hosting selamanya.'
      : 'Bespoke high-performance web portfolio development for engineers, designers, and tech leaders. Lighthouse 100, bilingual, custom design, and zero recurring hosting fees.',
  );

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Ryan Prayoga — Jasa Pembuatan Web Portofolio',
    url: SITE_URL,
    image: 'https://ryanprayoga.dev/photo/ryan-700.jpg',
    priceRange: 'Rp 699.000 - Rp 2.999.000+',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Tangerang',
      addressCountry: 'ID',
    },
    founder: {
      '@type': 'Person',
      name: 'Ryan Prayoga',
      jobTitle: 'Fullstack Developer & Sub Team Lead',
      url: 'https://ryanprayoga.dev',
      sameAs: [FREELANCE_CONFIG.github, FREELANCE_CONFIG.linkedin],
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Paket Pembuatan Web Portofolio',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Starter Portfolio',
            description: 'Portofolio satu halaman responsif untuk fresh graduate & junior developer.',
          },
          price: '699000',
          priceCurrency: 'IDR',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Standout Pro Portfolio',
            description: 'Portofolio multi-section dwibahasa dengan studi kasus mendalam dan performa 100.',
          },
          price: '1499000',
          priceCurrency: 'IDR',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Bespoke Executive Portfolio',
            description: 'Website portofolio kustom penuh dari nol dengan integrasi blog/CMS dan email bisnis.',
          },
          price: '2999000',
          priceCurrency: 'IDR',
        },
      ],
    },
  };
</script>

<svelte:head>
  <title>{TITLE}</title>
  <meta name="description" content={DESCRIPTION} />
  <meta name="author" content="Ryan Prayoga" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href={SITE_URL} />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Ryan Prayoga Freelance" />
  <meta property="og:title" content={TITLE} />
  <meta property="og:description" content={DESCRIPTION} />
  <meta property="og:url" content={SITE_URL} />
  <meta property="og:image" content={OG_IMAGE} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content={TITLE} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={TITLE} />
  <meta name="twitter:description" content={DESCRIPTION} />
  <meta name="twitter:image" content={OG_IMAGE} />
  {@html `<script type="application/ld+json">${JSON.stringify(serviceJsonLd)}</` + `script>`}
</svelte:head>

<main id="top">
  <FreelanceHero />
  <FreelanceComparison />
  <FreelanceServices />
  <FreelancePricing />
  <FreelanceProcess />
  <FreelanceShowcase />
  <FreelanceFaq />
  <FreelanceContact />
</main>
