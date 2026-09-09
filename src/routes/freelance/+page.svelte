<script lang="ts">
  import { localeStore } from '$lib/stores/locale.svelte';
  import { FREELANCE_CONFIG, pricingPackages } from '$lib/data/freelanceData';
  import FreelanceHero from '$lib/components/sections/freelance/FreelanceHero.svelte';
  import FreelanceComparison from '$lib/components/sections/freelance/FreelanceComparison.svelte';
  import FreelanceServices from '$lib/components/sections/freelance/FreelanceServices.svelte';
  import FreelancePricing from '$lib/components/sections/freelance/FreelancePricing.svelte';
  import FreelanceRevisions from '$lib/components/sections/freelance/FreelanceRevisions.svelte';
  import FreelanceProcess from '$lib/components/sections/freelance/FreelanceProcess.svelte';
  import FreelanceShowcase from '$lib/components/sections/freelance/FreelanceShowcase.svelte';
  import FreelanceFaq from '$lib/components/sections/freelance/FreelanceFaq.svelte';
  import FreelanceContact from '$lib/components/sections/freelance/FreelanceContact.svelte';

  const locale = $derived(localeStore.value);

  const SITE_URL = 'https://freelance.ryanprayoga.dev';
  const OG_IMAGE = 'https://ryanprayoga.dev/og-image.jpg';

  const TITLE = $derived(
    locale === 'id'
      ? 'Jasa Pembuatan Web Portofolio & Profil Bisnis — Ryan Prayoga'
      : 'Professional Business Portfolio & Website Development — Ryan Prayoga',
  );

  const DESCRIPTION = $derived(
    locale === 'id'
      ? 'Jasa pembuatan website portofolio dan profil bisnis profesional untuk usaha jasa, rental, travel, resto, dan UMKM. Tampilan kredibel, terhubung ke WhatsApp, dan bebas biaya hosting bulanan.'
      : 'Custom business website and portfolio development for services, rentals, travel, dining, and local enterprises. High conversion, direct WhatsApp order, and zero monthly fees.',
  );

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Ryan Prayoga — Jasa Pembuatan Web Portofolio & Profil Bisnis',
    url: SITE_URL,
    image: 'https://ryanprayoga.dev/photo/ryan-700.jpg',
    priceRange: `${pricingPackages[0].priceIdr} - ${pricingPackages[pricingPackages.length - 1].priceIdr}`,
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
      name: 'Paket Pembuatan Website Bisnis & Portofolio',
      // Diturunkan dari pricingPackages supaya harga di rich result Google
      // tidak pernah berbeda dengan harga yang dilihat pengunjung.
      itemListElement: pricingPackages.map((pkg) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: pkg.name.id,
          description: pkg.description.id,
        },
        price: pkg.priceValue,
        priceCurrency: 'IDR',
      })),
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
  <meta property="og:image:type" content="image/jpeg" />
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
  <FreelanceRevisions />
  <FreelanceProcess />
  <FreelanceShowcase />
  <FreelanceFaq />
  <FreelanceContact />
</main>
