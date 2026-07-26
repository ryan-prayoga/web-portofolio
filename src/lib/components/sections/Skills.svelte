<script lang="ts">
  import { localeStore } from '$lib/stores/locale.svelte';
  import { uiCopy } from '$lib/data/uiCopy';
  import { skills } from '$lib/data/skills';
  import { reveal } from '$lib/actions/reveal';

  const t = $derived(uiCopy[localeStore.value]);
  const groups = $derived(skills[localeStore.value]);
</script>

<section id="skills" class="mx-auto max-w-5xl px-6 py-14" aria-labelledby="skills-heading">
  <div use:reveal>
    <p class="text-accent font-mono text-xs tracking-wider uppercase">{t.skills.label}</p>
    <h2 id="skills-heading" class="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{t.skills.heading}</h2>
  </div>

  <dl class="border-rule mt-8 border-t">
    {#each groups as group (group.key)}
      <div class="border-rule grid gap-2 border-b py-5 sm:grid-cols-[minmax(0,14rem)_1fr] sm:gap-10" use:reveal>
        <dt class="font-mono text-xs tracking-wider uppercase">{group.title}</dt>
        <dd class="text-muted text-sm leading-relaxed">{group.items.join(' · ')}</dd>
      </div>
    {/each}
  </dl>
</section>
