<script lang="ts">
  import { t } from '$lib/v3/i18n';
  import { techJourney, type TechStep } from '$lib/data/techJourney';
  import { reveal } from '$lib/v4/actions/reveal';

  const order: TechStep['category'][] = ['backend', 'frontend', 'mobile', 'workflow'];

  function groupByCategory(items: TechStep[]) {
    const groups: Record<string, TechStep[]> = {};
    for (const item of items) (groups[item.category] ??= []).push(item);
    return order
      .filter((cat) => groups[cat])
      .map((cat) => ({ cat, items: groups[cat] }));
  }

  const grouped = groupByCategory(techJourney);
  const marqueeItems = [...techJourney, ...techJourney];
</script>

<section id="skills" class="border-t border-[var(--color-rule)] bg-[var(--color-paper-sunken)]">
  <div class="v4-marquee-wrap overflow-hidden border-b border-[var(--color-rule)] py-5">
    <div class="v4-marquee-track flex w-max gap-8 whitespace-nowrap">
      {#each marqueeItems as step, i (i)}
        <span class="v4-display flex items-center gap-8 text-2xl text-[var(--color-ink-faint)] md:text-3xl">
          {step.tech}
          <span class="text-[var(--color-clay)]">&bull;</span>
        </span>
      {/each}
    </div>
  </div>

  <div class="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
    <div class="grid gap-12 md:grid-cols-12">
      <div class="md:col-span-4">
        <div class="md:sticky md:top-28" use:reveal={{ selector: '[data-r]', stagger: 0.1 }}>
          <p data-r class="v4-mono mb-5 text-[0.7rem] tracking-[0.22em] text-[var(--color-clay)] uppercase">
            (03) &mdash; {$t.skills.heading}
          </p>
          <h2 data-r class="v4-display text-[clamp(2.4rem,5vw,4rem)] leading-[1] text-[var(--color-ink)]">
            How I<br /><span class="italic">build</span>
          </h2>
          <p data-r class="mt-4 max-w-[32ch] text-sm leading-relaxed text-[var(--color-ink-faint)]">
            {$t.skills.subtitle}
          </p>
        </div>
      </div>

      <div class="md:col-span-8">
        {#each grouped as group, gi (group.cat)}
          <div class="mb-12 last:mb-0" use:reveal={{ selector: '[data-row]', stagger: 0.08, y: 18 }}>
            <div class="mb-4 flex items-baseline justify-between border-b border-[var(--color-ink)] pb-3">
              <h3 class="v4-mono text-xs tracking-[0.2em] text-[var(--color-ink)] uppercase">
                {$t.skills.categories[group.cat] ?? group.cat}
              </h3>
              <span class="v4-mono text-xs text-[var(--color-ink-faint)]">0{gi + 1}</span>
            </div>

            {#each group.items as step (step.tech)}
              <div
                data-row
                class="group grid grid-cols-12 items-baseline gap-3 border-b border-[var(--color-rule)] py-4"
              >
                <div class="col-span-12 flex items-baseline gap-3 md:col-span-4">
                  <span class="h-1.5 w-1.5 shrink-0 translate-y-[-2px] rounded-full bg-[var(--color-clay)]"></span>
                  <span class="text-lg font-medium text-[var(--color-ink)]">{step.tech}</span>
                </div>
                <p class="col-span-12 text-sm leading-relaxed text-[var(--color-ink-soft)] md:col-span-6">
                  {step.description}
                </p>
                <span class="v4-mono col-span-12 text-[0.65rem] tracking-[0.12em] text-[var(--color-ink-faint)] uppercase md:col-span-2 md:text-right">
                  {step.period}
                </span>
              </div>
            {/each}
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>
