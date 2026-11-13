<script lang="ts">
  import { localeStore } from '$lib/stores/locale.svelte';
  import { uiCopy } from '$lib/data/uiCopy';
  import { profile } from '$lib/data/profile';
  import { projects } from '$lib/data/projects';
  import { socials } from '$lib/data/socials';
  import { drawCard, drawButton } from '$lib/actions/drawably';
  import SketchRevealAvatar from '$lib/components/sections/SketchRevealAvatar.svelte';
  import SketchRule from '$lib/components/ui/SketchRule.svelte';
  import Icon from '$lib/components/Icon.svelte';

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
          class="bg-accent text-paper inline-flex items-center gap-2 px-5 py-2 font-display text-base tracking-wide uppercase transition-opacity hover:opacity-90"
        >
          {t.hero.downloadCv}
          <Icon name="arrowDown" size={13} />
        </a>
        <a
          href={email?.url}
          use:drawButton={{ variant: 'outline', resketchOnHover: true }}
          class="hover:text-accent inline-flex items-center gap-2 px-5 py-2 font-display text-base tracking-wide uppercase transition-colors active:scale-95"
        >
          {t.hero.contact}
        </a>
        <a
          href={github?.url}
          target="_blank"
          rel="noopener noreferrer"
          use:drawButton={{ variant: 'outline', resketchOnHover: true }}
          class="text-ink hover:text-accent inline-flex items-center gap-1.5 px-4 py-2 font-display text-base tracking-wide uppercase transition-colors active:scale-95"
        >
          GitHub <Icon name="arrowUpRight" size={13} />
        </a>
        <a
          href={linkedin?.url}
          target="_blank"
          rel="noopener noreferrer"
          use:drawButton={{ variant: 'outline', resketchOnHover: true }}
          class="text-ink hover:text-accent inline-flex items-center gap-1.5 px-4 py-2 font-display text-base tracking-wide uppercase transition-colors active:scale-95"
        >
          LinkedIn <Icon name="arrowUpRight" size={13} />
        </a>
      </div>
    </div>

    <SketchRevealAvatar class="order-first sm:order-none" />
  </div>

  <div class="mt-14">
    <div class="mb-3 flex items-center justify-between">
      <span class="text-muted font-display text-xs font-semibold tracking-wider uppercase">{t.hero.proofsLabel}</span>
      <span class="text-muted/60 hidden font-display text-xs sm:inline">{t.hero.resketchHint}</span>
    </div>
    <!-- Title block ala gambar teknik: satu bingkai, sekat digambar tangan -->
    <div use:drawCard={{ resketchOnHover: true }} class="title-block p-1 sm:p-2" title={t.hero.resketchTitle}>
      <dl class="grid grid-cols-2 sm:grid-cols-4">
        {#each facts as fact, index (fact.label)}
          <div class="relative min-w-0 px-3 py-4 sm:px-5">
            {#if index > 0}
              <SketchRule
                orientation="vertical"
                seed={11 + index}
                class="text-ink/70 absolute inset-y-2 -left-1 {index === 2 ? 'hidden sm:block' : ''}"
              />
            {/if}
            {#if index >= 2}
              <SketchRule seed={31 + index} class="text-ink/70 absolute inset-x-2 -top-1 sm:hidden" />
            {/if}
            <dt class="text-muted min-h-8 font-mono text-[0.6875rem] leading-4 tracking-[0.04em] uppercase sm:min-h-0">
              {fact.label}
            </dt>
            <dd class="mt-1.5">
              <span
                class="text-accent block font-display font-bold tracking-tight {fact.value.length > 6
                  ? 'text-lg leading-8 sm:text-xl sm:leading-9'
                  : 'text-2xl leading-8 sm:text-3xl sm:leading-9'}"
              >
                {fact.value}
              </span>
              <span class="text-muted mt-0.5 block font-display text-sm">{fact.note}</span>
            </dd>
          </div>
        {/each}
      </dl>
    </div>
  </div>
</header>
