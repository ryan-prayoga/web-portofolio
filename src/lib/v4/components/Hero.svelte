<script lang="ts">
  import { t } from '$lib/v3/i18n';
  import { profile } from '$lib/data/profile';
  import { reveal } from '$lib/v4/actions/reveal';

  const year = new Date().getFullYear();
</script>

<header
  id="top"
  class="relative mx-auto flex min-h-[100dvh] max-w-[1400px] flex-col justify-between px-5 pt-28 pb-12 md:px-10 md:pt-36"
>
  <div class="grid gap-10 md:grid-cols-12 md:gap-6" use:reveal={{ selector: '[data-r]', stagger: 0.12 }}>
    <div class="md:col-span-8">
      <p
        data-r
        class="v4-mono mb-6 flex items-center gap-3 text-[0.7rem] tracking-[0.22em] text-[var(--color-ink-faint)] uppercase"
      >
        <span class="inline-block h-px w-10 bg-[var(--color-clay)]"></span>
        {profile.location}
      </p>

      <h1 data-r class="v4-display text-[clamp(3.2rem,11vw,9.5rem)] leading-[0.92] text-[var(--color-ink)]">
        Full-Stack
        <br />
        <span class="italic text-[var(--color-clay)]">Engineer</span>
        <span class="text-[var(--color-ink)]">&</span>
        <br />
        Team Lead
      </h1>
    </div>

    <div class="flex flex-col justify-end md:col-span-4">
      <p data-r class="mb-8 max-w-[42ch] text-base leading-relaxed text-[var(--color-ink-soft)]">
        {$t.about.paragraphs[0]}
      </p>
      <div data-r class="flex flex-wrap items-center gap-4">
        <a
          href="#projects"
          class="group inline-flex items-center gap-3 bg-[var(--color-ink)] px-6 py-3.5 text-sm font-medium text-[var(--color-paper-raised)] transition-transform hover:-translate-y-0.5 active:translate-y-0"
        >
          {$t.hero.cta}
          <span class="transition-transform group-hover:translate-x-1">&rarr;</span>
        </a>
        <span class="v4-mono inline-flex items-center gap-2 text-xs tracking-[0.12em] text-[var(--color-ink-soft)] uppercase">
          <span class="relative flex h-2 w-2">
            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-clay)] opacity-60"></span>
            <span class="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-clay)]"></span>
          </span>
          {$t.hero.openToWork}
        </span>
      </div>
    </div>
  </div>

  <div
    class="mt-12 grid grid-cols-2 gap-px border-t border-[var(--color-rule)] bg-[var(--color-rule)] md:grid-cols-4"
    use:reveal={{ selector: '[data-stat]', stagger: 0.1 }}
  >
    {#each [
      { k: profile.experience, v: 'Experience' },
      { k: String(profile.teamSize), v: 'Engineers led' },
      { k: '11+', v: 'Systems shipped' },
      { k: year.toString(), v: 'Still building' },
    ] as stat (stat.v)}
      <div data-stat class="bg-[var(--color-paper)] px-1 pt-5">
        <p class="v4-display text-3xl text-[var(--color-ink)] md:text-4xl">{stat.k}</p>
        <p class="v4-mono mt-1 text-[0.65rem] tracking-[0.14em] text-[var(--color-ink-faint)] uppercase">
          {stat.v}
        </p>
      </div>
    {/each}
  </div>
</header>
