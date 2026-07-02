<script lang="ts">
  import { localeStore } from '$lib/stores/locale.svelte';
  import { uiCopy } from '$lib/data/uiCopy';
  import { techJourney, type TechStep } from '$lib/data/techJourney';
  import { reveal } from '$lib/actions/reveal';
  import Marquee from '$lib/components/ui/Marquee.svelte';
  import { scramble } from '$lib/motion/scramble';

  const locale = $derived(localeStore.value);

  const t = $derived(uiCopy[localeStore.value]);

  const stackOrder: TechStep['category'][] = ['backend', 'frontend', 'mobile', 'workflow'];

  function groupStack(items: TechStep[], notes: Record<TechStep['category'], string>) {
    const grouped: Record<TechStep['category'], TechStep[]> = {
      backend: [],
      frontend: [],
      mobile: [],
      workflow: [],
    };
    for (const item of items) grouped[item.category].push(item);
    return stackOrder.map((category) => ({
      category,
      title: category[0].toUpperCase() + category.slice(1),
      note: notes[category],
      items: grouped[category],
    }));
  }

  const stackGroups = $derived(groupStack(techJourney, t.stackNotes));
  const workflow = ['Discover', 'Build', 'Review', 'Deploy', 'Improve'];
  const marqueeItems = techJourney.map((s) => s.tech);
</script>

<section id="stack" class="section">
  <div class="sec-head" use:reveal>
    {#key locale}
      <p class="mono idx" use:scramble>SYS/03 — {t.stackKicker}</p>
    {/key}
    <h2>{t.stackHeading}</h2>
  </div>

  <div class="stack-grid" use:reveal>
    {#each stackGroups as group (group.category)}
      <article class="stack-cell">
        <p class="mono sc-title">{group.title}</p>
        <p class="sc-note">{group.note}</p>
        <ul class="sc-tags">
          {#each group.items as item (item.tech)}
            <li>{item.tech}</li>
          {/each}
        </ul>
      </article>
    {/each}
  </div>

  <div class="marquee-wrap" use:reveal>
    <Marquee items={marqueeItems} />
  </div>

  <div class="workflow mono" use:reveal>
    <span class="wf-label">{t.method}</span>
    <span class="wf-path">
      {#each workflow as step, i (step)}
        <span class="wf-step">{step}</span>{#if i < workflow.length - 1}<span class="wf-sep" aria-hidden="true">→</span>{/if}
      {/each}
    </span>
  </div>
</section>

<style>
  .mono {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
  .section {
    padding: clamp(4rem, 10vw, 8.5rem) clamp(1.25rem, 5vw, 4rem);
    border-top: 1px solid color-mix(in srgb, var(--color-slate) 55%, transparent);
  }
  .sec-head {
    margin-bottom: clamp(2.5rem, 6vw, 4.5rem);
  }
  .sec-head .idx {
    color: var(--color-ember);
  }
  .sec-head h2 {
    margin: 0.8rem 0 0;
    font-family: var(--font-display);
    font-size: clamp(1.9rem, 4.5vw, 3.6rem);
    font-weight: 600;
    line-height: 1;
    letter-spacing: -0.03em;
    max-width: 16ch;
    color: var(--color-bone);
  }
  .stack-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    border-top: 1px solid var(--color-bone);
    border-left: 1px solid color-mix(in srgb, var(--color-slate) 55%, transparent);
  }
  .stack-cell {
    min-width: 0;
    padding: 1.4rem;
    border-right: 1px solid color-mix(in srgb, var(--color-slate) 55%, transparent);
    border-bottom: 1px solid color-mix(in srgb, var(--color-slate) 55%, transparent);
    min-height: 17rem;
    display: flex;
    flex-direction: column;
  }
  .sc-title {
    color: var(--color-ember);
    margin: 0 0 0.9rem;
  }
  .sc-note {
    margin: 0 0 1.4rem;
    color: var(--color-greige);
    font-size: 0.95rem;
    line-height: 1.5;
  }
  .sc-tags {
    list-style: none;
    margin: auto 0 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }
  .sc-tags li {
    font-family: var(--font-mono);
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 0.02em;
    padding: 0.3rem 0.5rem;
    border: 1px solid color-mix(in srgb, var(--color-slate) 70%, transparent);
    color: var(--color-greige);
  }
  .marquee-wrap {
    margin-top: 1.6rem;
  }
  .workflow {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.7rem;
    margin-top: 1.6rem;
    color: var(--color-bone);
  }
  .wf-label {
    color: var(--color-greige);
    margin-right: 0.4rem;
  }
  .wf-path {
    display: inline-flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.7rem;
  }
  .wf-sep {
    color: var(--color-ember);
  }
  @media (max-width: 1080px) {
    .stack-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .stack-cell {
      min-height: 0;
    }
  }
  @media (max-width: 760px) {
    .stack-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
