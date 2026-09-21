<script lang="ts">
  import { localeStore } from '$lib/stores/locale.svelte';
  import { uiCopy } from '$lib/data/uiCopy';
  import { profile } from '$lib/data/profile';
  import { reveal } from '$lib/actions/reveal';
  import { drawCard } from '$lib/actions/drawably';
  import HandDrawnUnderline from '$lib/components/ui/HandDrawnUnderline.svelte';

  const t = $derived(uiCopy[localeStore.value]);
  const entries = [profile.education.university, profile.education.smk];
</script>

<section id="education" class="mx-auto max-w-5xl px-6 py-14" aria-labelledby="education-heading">
  <div use:reveal>
    <div class="inline-block relative">
      <h2 id="education-heading" class="text-2xl font-semibold tracking-tight sm:text-3xl">
        {t.education.heading}
      </h2>
      <HandDrawnUnderline class="w-full mt-1" />
    </div>
  </div>

  <div class="mt-8 grid gap-4 sm:grid-cols-2">
    {#each entries as entry (entry.school)}
      <div
        class="group cursor-pointer p-6 transition-transform duration-[var(--duration-fast)] ease-[var(--ease-smooth-out)] hover:-translate-y-0.5"
        use:reveal
        use:drawCard={{ resketchOnHover: true }}
      >
        <span class="text-accent font-display text-sm font-semibold uppercase">{entry.note}</span>
        <h3 class="mt-2 font-semibold tracking-tight text-lg">{entry.program}</h3>
        <p class="text-muted mt-1 font-display text-sm sm:text-base">{entry.school}</p>
      </div>
    {/each}

    <div
      class="group cursor-pointer p-6 transition-transform duration-[var(--duration-fast)] ease-[var(--ease-smooth-out)] hover:-translate-y-0.5 sm:col-span-2"
      use:reveal
      use:drawCard={{ resketchOnHover: true }}
    >
      <p class="text-accent font-display text-sm font-semibold tracking-wider uppercase">{t.education.languages}</p>
      <p class="text-muted mt-2 text-sm">
        {profile.languages.map((language) => `${language.name} (${language.level})`).join(' · ')}
      </p>
    </div>
  </div>
</section>
