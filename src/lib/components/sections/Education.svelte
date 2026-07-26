<script lang="ts">
  import { localeStore } from '$lib/stores/locale.svelte';
  import { uiCopy } from '$lib/data/uiCopy';
  import { profile } from '$lib/data/profile';
  import { reveal } from '$lib/actions/reveal';

  const t = $derived(uiCopy[localeStore.value]);
  const entries = [profile.education.university, profile.education.smk];
</script>

<section id="education" class="mx-auto max-w-5xl px-6 py-14" aria-labelledby="education-heading">
  <div use:reveal>
    <p class="text-accent font-mono text-xs tracking-wider uppercase">{t.education.label}</p>
    <h2 id="education-heading" class="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
      {t.education.heading}
    </h2>
  </div>

  <div class="border-rule mt-8 border-t">
    {#each entries as entry (entry.school)}
      <div class="border-rule grid gap-1 border-b py-5 sm:grid-cols-[minmax(0,14rem)_1fr] sm:gap-10" use:reveal>
        <p class="font-mono text-xs text-nowrap">{entry.note}</p>
        <div>
          <h3 class="font-semibold tracking-tight">{entry.program}</h3>
          <p class="text-muted mt-0.5 text-sm">{entry.school}</p>
        </div>
      </div>
    {/each}
    <div class="border-rule grid gap-1 border-b py-5 sm:grid-cols-[minmax(0,14rem)_1fr] sm:gap-10" use:reveal>
      <p class="text-muted font-mono text-xs tracking-wider uppercase">{t.education.languages}</p>
      <p class="text-muted text-sm">
        {profile.languages.map((language) => `${language.name} — ${language.level}`).join(' · ')}
      </p>
    </div>
  </div>
</section>
