<script lang="ts">
  import { localeStore } from '$lib/stores/locale.svelte';
  import { uiCopy } from '$lib/data/uiCopy';
  import { profile } from '$lib/data/profile';
  import { projects } from '$lib/data/projects';
  import { socials } from '$lib/data/socials';

  const t = $derived(uiCopy[localeStore.value]);
  const locale = $derived(localeStore.value);
  const email = socials.find((s) => s.name === 'Email');
  const github = socials.find((s) => s.name === 'GitHub');
  const linkedin = socials.find((s) => s.name === 'LinkedIn');

  const facts = $derived([
    { value: profile.experienceYears, label: t.facts.years },
    { value: String(profile.teamSize), label: t.facts.led },
    { value: String(projects.length), label: t.facts.shipped },
    { value: 'Tangerang, ID', label: t.facts.based },
  ]);
</script>

<header class="mx-auto max-w-5xl px-6 pt-28 pb-14 sm:pt-36">
  <div class="grid items-start gap-10 sm:grid-cols-[1fr_auto]">
    <div>
      <p class="font-mono text-xs tracking-wider text-muted uppercase">
        <span class="mr-2 inline-block h-2 w-2 rounded-full bg-accent" aria-hidden="true"></span>{t.status}
      </p>
      <h1 class="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
        {profile.name}
      </h1>
      <p class="mt-2 text-lg font-medium text-accent sm:text-xl">{profile.role}</p>
      <p class="mt-5 max-w-prose leading-relaxed text-muted">{t.hero.positioning}</p>

      <div class="no-print mt-7 flex flex-wrap items-center gap-3">
        <a
          href={locale === 'id' ? '/cv/cv-id.pdf' : '/cv/cv-en.pdf'}
          download
          class="bg-accent text-paper inline-flex items-center gap-2 px-4 py-2 font-mono text-xs tracking-wide uppercase transition-opacity hover:opacity-85"
        >
          {t.hero.downloadCv} ↓
        </a>
        <a
          href={email?.url}
          class="border-rule hover:border-accent hover:text-accent inline-flex items-center gap-2 border px-4 py-2 font-mono text-xs tracking-wide uppercase transition-colors"
        >
          {t.hero.contact}
        </a>
        <a
          href={github?.url}
          target="_blank"
          rel="noopener noreferrer"
          class="text-muted hover:text-accent font-mono text-xs uppercase underline-offset-4 hover:underline"
        >
          GitHub ↗
        </a>
        <a
          href={linkedin?.url}
          target="_blank"
          rel="noopener noreferrer"
          class="text-muted hover:text-accent font-mono text-xs uppercase underline-offset-4 hover:underline"
        >
          LinkedIn ↗
        </a>
      </div>
    </div>

    <picture class="border-rule order-first w-32 shrink-0 overflow-hidden border sm:order-none sm:w-40">
      <source type="image/avif" srcset="/photo/ryan-480.avif" />
      <source type="image/webp" srcset="/photo/ryan-480.webp" />
      <img
        src="/photo/ryan-480.jpg"
        alt={t.hero.photoAlt}
        width="480"
        height="600"
        class="block h-auto w-full"
        fetchpriority="high"
      />
    </picture>
  </div>

  <dl class="border-rule mt-12 grid grid-cols-2 gap-y-6 border-t pt-6 sm:grid-cols-4">
    {#each facts as fact (fact.label)}
      <div>
        <dt class="text-muted font-mono text-[0.65rem] tracking-wider uppercase">{fact.label}</dt>
        <dd class="mt-1 text-2xl font-semibold tracking-tight">{fact.value}</dd>
      </div>
    {/each}
  </dl>
</header>
