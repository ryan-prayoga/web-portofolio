<script lang="ts">
  import { localeStore } from '$lib/stores/locale.svelte';
  import { uiCopy } from '$lib/data/uiCopy';
  import { skills } from '$lib/data/skills';
  import { reveal } from '$lib/actions/reveal';
  import { drawCard, drawBadge } from '$lib/actions/drawably';

  const t = $derived(uiCopy[localeStore.value]);
  const groups = $derived(skills[localeStore.value]);
</script>

<section id="skills" class="mx-auto max-w-5xl px-6 py-14" aria-labelledby="skills-heading">
  <div use:reveal>
    <span
      use:drawBadge={{ variant: 'outline' }}
      class="px-2.5 py-0.5 font-sans text-xs font-semibold tracking-wide uppercase"
    >
      {t.skills.label}
    </span>
    <h2 id="skills-heading" class="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">{t.skills.heading}</h2>
  </div>

  <div class="mt-8 grid gap-5 sm:grid-cols-2">
    {#each groups as group, index (group.key)}
      <div
        class="group cursor-pointer p-6 transition-transform hover:-translate-y-0.5 sm:p-7 {index === 0
          ? 'sm:col-span-2'
          : ''}"
        use:reveal
        use:drawCard={{ resketchOnHover: true }}
      >
        <div class="flex items-center justify-between">
          <dt class="font-sans text-xs font-semibold tracking-wide uppercase text-accent">
            {group.title}
          </dt>
          <span class="text-muted/60 font-sans text-xs">0{index + 1}</span>
        </div>
        <dd class="mt-4 flex flex-wrap gap-2">
          {#each group.items as item (item)}
            <span
              use:drawBadge={{ variant: 'outline' }}
              class="px-2.5 py-0.5 font-sans text-xs font-medium text-muted hover:text-ink transition-colors"
            >
              {item}
            </span>
          {/each}
        </dd>
      </div>
    {/each}
  </div>
</section>
