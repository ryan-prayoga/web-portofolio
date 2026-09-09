<script lang="ts">
  import { localeStore } from '$lib/stores/locale.svelte';
  import { uiCopy } from '$lib/data/uiCopy';
  import { profile } from '$lib/data/profile';
  import { projects } from '$lib/data/projects';
  import { socials } from '$lib/data/socials';
  import { drawCard, drawButton, drawBadge } from '$lib/actions/drawably';

  const t = $derived(uiCopy[localeStore.value]);
  const locale = $derived(localeStore.value);
  const email = socials.find((s) => s.name === 'Email');
  const github = socials.find((s) => s.name === 'GitHub');
  const linkedin = socials.find((s) => s.name === 'LinkedIn');

  const facts = $derived([
    { value: profile.experienceYears, label: t.facts.years, note: 'Enterprise & SaaS' },
    { value: String(profile.teamSize), label: t.facts.led, note: 'Scrum & Code Review' },
    { value: String(projects.length), label: t.facts.shipped, note: 'Rust, Go, Svelte, Swift' },
    { value: 'Tangerang, ID', label: t.facts.based, note: 'WIB · UTC+7' },
  ]);
</script>

<header class="mx-auto max-w-5xl px-6 pt-28 pb-14 sm:pt-36">
  <div class="grid items-start gap-10 sm:grid-cols-[1fr_auto]">
    <div>
      <div class="inline-block">
        <span
          use:drawBadge={{ variant: 'outline', resketchOnHover: true }}
          class="cursor-pointer px-3 py-1 font-mono text-xs tracking-wider uppercase"
        >
          <span class="text-accent mr-1 font-bold" aria-hidden="true">[✓]</span>
          {t.status}
        </span>
      </div>

      <h1 class="mt-5 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
        {profile.name}<span class="text-accent">.</span>
      </h1>
      <p class="mt-2.5 text-lg font-medium text-accent sm:text-xl">{profile.role}</p>
      <p class="mt-5 max-w-prose leading-relaxed text-muted">{t.hero.positioning}</p>

      <div class="no-print mt-8 flex flex-wrap items-center gap-4">
        <a
          href={locale === 'id' ? '/cv/cv-id.pdf' : '/cv/cv-en.pdf'}
          download
          use:drawButton={{ variant: 'solid', resketchOnHover: true }}
          class="bg-accent text-paper inline-flex items-center gap-2 px-5 py-2.5 font-mono text-xs tracking-wide uppercase transition-opacity hover:opacity-90"
        >
          {t.hero.downloadCv} <span aria-hidden="true">↓</span>
        </a>
        <a
          href={email?.url}
          use:drawButton={{ variant: 'outline', resketchOnHover: true }}
          class="border-rule hover:border-accent hover:text-accent inline-flex items-center gap-2 border px-5 py-2.5 font-mono text-xs tracking-wide uppercase transition-colors"
        >
          {t.hero.contact}
        </a>
        <a
          href={github?.url}
          target="_blank"
          rel="noopener noreferrer"
          class="text-muted hover:text-accent font-mono text-xs uppercase underline-offset-4 hover:underline"
        >
          GitHub <span aria-hidden="true">↗</span>
        </a>
        <a
          href={linkedin?.url}
          target="_blank"
          rel="noopener noreferrer"
          class="text-muted hover:text-accent font-mono text-xs uppercase underline-offset-4 hover:underline"
        >
          LinkedIn <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>

    <div
      use:drawCard={{ resketchOnHover: true }}
      class="order-first w-36 shrink-0 cursor-pointer overflow-hidden p-2 sm:order-none sm:w-44"
      title="Hover to re-sketch"
    >
      <picture class="block overflow-hidden">
        <source type="image/avif" srcset="/photo/ryan-480.avif" />
        <source type="image/webp" srcset="/photo/ryan-480.webp" />
        <img
          src="/photo/ryan-480.jpg"
          alt={t.hero.photoAlt}
          width="480"
          height="600"
          class="block h-auto w-full grayscale contrast-105 transition-all hover:grayscale-0"
          fetchpriority="high"
        />
      </picture>
    </div>
  </div>

  <div class="mt-14">
    <div class="mb-3 flex items-center justify-between">
      <span class="text-muted font-mono text-[0.65rem] tracking-wider uppercase">Key Production Proofs</span>
      <span class="text-muted/60 hidden font-mono text-[0.65rem] sm:inline">hover card to re-sketch ✎</span>
    </div>
    <dl class="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {#each facts as fact (fact.label)}
        <div
          use:drawCard={{ resketchOnHover: true }}
          class="group cursor-pointer p-4 transition-transform hover:-translate-y-0.5"
          title="Hover to re-sketch frame"
        >
          <dt class="text-muted font-mono text-[0.65rem] tracking-wider uppercase">{fact.label}</dt>
          <dd class="text-accent mt-1 text-2xl font-bold tracking-tight sm:text-3xl font-display">{fact.value}</dd>
          <p class="text-muted/75 mt-1 text-xs">{fact.note}</p>
        </div>
      {/each}
    </dl>
  </div>
</header>
