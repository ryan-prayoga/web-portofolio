<script lang="ts">
  import { localeStore } from '$lib/stores/locale.svelte';
  import { uiCopy } from '$lib/data/uiCopy';
  import { profile } from '$lib/data/profile';
  import { projects } from '$lib/data/projects';
  import { socials } from '$lib/data/socials';
  import { drawButton } from '$lib/actions/drawably';
  import SketchRevealAvatar from '$lib/components/sections/SketchRevealAvatar.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import TitleBlock from '$lib/components/ui/TitleBlock.svelte';

  const t = $derived(uiCopy[localeStore.value]);
  const locale = $derived(localeStore.value);
  const email = socials.find((s) => s.name === 'Email');
  const github = socials.find((s) => s.name === 'GitHub');
  const linkedin = socials.find((s) => s.name === 'LinkedIn');

  const facts = $derived([
    { value: profile.experienceYears, label: t.facts.years, note: 'Enterprise & SaaS' },
    { value: profile.productionApps, label: t.facts.apps, note: 'Web, Mobile, APIs' },
    { value: String(projects.length), label: t.facts.shipped, note: 'Rust, Go, Svelte, Swift' },
    { value: 'Tangerang, ID', label: t.facts.based, note: 'WIB · UTC+7' },
  ]);
</script>

<header class="mx-auto max-w-5xl px-6 pt-28 pb-14 sm:pt-36">
  <div class="grid items-start gap-10 sm:grid-cols-[1fr_auto]">
    <div>
      <h1 class="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
        {profile.name}<span class="text-accent">.</span>
      </h1>
      <p class="mt-2 text-xl sm:text-2xl font-display font-semibold text-accent">{profile.role}</p>
      <p class="mt-5 max-w-prose leading-relaxed text-muted">{t.hero.positioning}</p>

      <div class="no-print mt-8 flex flex-wrap items-center gap-4">
        <a
          href={locale === 'id' ? '/cv/cv-id.pdf' : '/cv/cv-en.pdf'}
          download
          use:drawButton={{ variant: 'solid', resketchOnHover: true }}
          class="bg-accent text-paper inline-flex items-center gap-2 px-5 py-2 font-display text-base transition-opacity hover:opacity-90"
        >
          {t.hero.downloadCv}
          <Icon name="arrowDown" size={13} />
        </a>
        <a
          href={email?.url}
          use:drawButton={{ variant: 'outline', resketchOnHover: true }}
          class="hover:text-accent inline-flex items-center gap-2 px-5 py-2 font-display text-base transition-colors active:scale-95"
        >
          {t.hero.contact}
        </a>
        <a
          href={github?.url}
          target="_blank"
          rel="noopener noreferrer"
          use:drawButton={{ variant: 'outline', resketchOnHover: true }}
          class="text-ink hover:text-accent inline-flex items-center gap-1.5 px-4 py-2 font-display text-base transition-colors active:scale-95"
        >
          GitHub <Icon name="arrowUpRight" size={13} />
        </a>
        <a
          href={linkedin?.url}
          target="_blank"
          rel="noopener noreferrer"
          use:drawButton={{ variant: 'outline', resketchOnHover: true }}
          class="text-ink hover:text-accent inline-flex items-center gap-1.5 px-4 py-2 font-display text-base transition-colors active:scale-95"
        >
          LinkedIn <Icon name="arrowUpRight" size={13} />
        </a>
      </div>
    </div>

    <SketchRevealAvatar class="order-first sm:order-none" />
  </div>

  <div class="mt-14">
    <div class="mb-3 flex items-center justify-between">
      <span class="text-muted font-display text-sm font-semibold">{t.hero.proofsLabel}</span>
      <span class="text-muted/60 hidden font-display text-xs sm:inline">{t.hero.resketchHint}</span>
    </div>
    <TitleBlock items={facts} title={t.hero.resketchTitle} />
  </div>
</header>
