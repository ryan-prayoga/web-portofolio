<script lang="ts">
  import { t } from '../i18n';
  import { scrollReveal } from '../actions/scrollReveal';
  import { techJourney } from '$lib/data/techJourney';

  const categoryMap: Record<string, keyof typeof $t.skills.categories> = {
    backend: 'backend',
    frontend: 'frontend',
    mobile: 'mobile',
    workflow: 'workflow',
  };

  function groupByCategory(items: typeof techJourney) {
    const groups: Record<string, typeof techJourney> = {};
    for (const item of items) {
      (groups[item.category] ??= []).push(item);
    }
    return groups;
  }

  let grouped = $derived(groupByCategory(techJourney));
</script>

<section id="skills" class="mx-auto max-w-5xl px-6 py-24 md:py-32">
  <h2
    class="mb-4 text-center font-heading text-3xl font-bold tracking-tight text-primary md:text-4xl"
    use:scrollReveal
  >
    {$t.skills.heading}
  </h2>
  <p class="mb-16 text-center text-secondary" use:scrollReveal={{ delay: 0.1 }}>
    {$t.skills.subtitle}
  </p>

  <div class="grid gap-8 md:grid-cols-2">
    {#each Object.entries(grouped) as [cat, items], gi (cat)}
      <div
        class="rounded-xl border border-border bg-surface p-6"
        use:scrollReveal={{ delay: gi * 0.1 }}
      >
        <h3 class="mb-5 text-xs font-semibold tracking-widest text-accent-cyan uppercase">
          {$t.skills.categories[categoryMap[cat] ?? cat] ?? cat}
        </h3>
        <div class="space-y-3">
          {#each items as step, si}
            <div class="flex items-baseline gap-3">
              <span
                class="inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                style:background-color="var(--color-accent-{step.color})"
              ></span>
              <span class="text-sm font-medium text-primary">{step.tech}</span>
              <span class="ml-auto text-xs text-muted">{step.period}</span>
            </div>
            <p class="pl-4 text-xs leading-relaxed text-secondary">{step.description}</p>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</section>
