<script lang="ts">
  import { t } from '$lib/v3/i18n';
  import { v3projects } from '$lib/v3/data/v3projects';
  import { reveal } from '$lib/v4/actions/reveal';

  let hovered = $state<number | null>(null);
  let mx = $state(0);
  let my = $state(0);
  let coarse = $state(false);

  $effect(() => {
    coarse = window.matchMedia('(pointer: coarse)').matches;
  });

  function onMove(e: MouseEvent) {
    mx = e.clientX;
    my = e.clientY;
  }
</script>

<svelte:window onmousemove={onMove} />

<section id="projects" class="border-t border-[var(--color-rule)] py-24 md:py-36">
  <div class="mx-auto max-w-[1400px] px-5 md:px-10">
    <div
      class="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
      use:reveal={{ selector: '[data-r]', stagger: 0.1 }}
    >
      <div>
        <p data-r class="v4-mono mb-4 text-[0.7rem] tracking-[0.22em] text-[var(--color-clay)] uppercase">
          (02) &mdash; {$t.projects.heading}
        </p>
        <h2 data-r class="v4-display text-[clamp(2.6rem,6vw,5rem)] leading-[0.95] text-[var(--color-ink)]">
          Selected<br /><span class="italic">work</span>
        </h2>
      </div>
      <p data-r class="max-w-[34ch] text-sm leading-relaxed text-[var(--color-ink-faint)]">
        {$t.projects.subtitle}
      </p>
    </div>

    <div class="border-t border-[var(--color-ink)]" use:reveal={{ selector: '[data-row]', stagger: 0.07, y: 18 }}>
      {#each v3projects as proj, i (proj.slug)}
        {@const desc = $t.projects.descriptions[proj.slug]}
        {@const target = proj.url ?? proj.source ?? '#'}
        <a
          data-row
          href={target}
          target="_blank"
          rel="noopener noreferrer"
          class="group relative block border-b border-[var(--color-rule)] py-7 transition-colors hover:bg-[var(--color-paper-raised)]"
          onmouseenter={() => (hovered = i)}
          onmouseleave={() => (hovered = null)}
        >
          <div class="grid grid-cols-12 items-baseline gap-3 px-1 md:px-4">
            <span class="v4-mono col-span-2 text-xs text-[var(--color-ink-faint)] md:col-span-1">
              0{i + 1}
            </span>

            <div class="col-span-10 md:col-span-5">
              <h3
                class="v4-display text-3xl leading-none text-[var(--color-ink)] transition-transform duration-500 ease-out md:text-5xl md:group-hover:translate-x-3"
              >
                {proj.name}
              </h3>
            </div>

            <div class="col-span-12 mt-3 md:col-span-4 md:mt-0">
              <p class="max-w-[40ch] text-sm leading-relaxed text-[var(--color-ink-soft)]">
                {desc?.summary ?? ''}
              </p>
            </div>

            <div class="col-span-12 mt-3 flex items-center justify-between md:col-span-2 md:mt-0 md:justify-end md:gap-4">
              <span class="v4-mono text-[0.65rem] tracking-[0.12em] text-[var(--color-ink-faint)] uppercase">
                {proj.category}
              </span>
              <span
                class="text-xl text-[var(--color-clay)] transition-transform duration-500 ease-out group-hover:translate-x-1 group-hover:-translate-y-1"
              >
                &#8599;
              </span>
            </div>
          </div>

          <div class="mt-4 flex flex-wrap gap-2 px-1 md:px-4 md:pl-[calc(8.333%+1rem)]">
            {#each proj.stack.slice(0, 5) as tech (tech)}
              <span class="v4-mono border border-[var(--color-rule-strong)] px-2.5 py-1 text-[0.65rem] tracking-wide text-[var(--color-ink-soft)]">
                {tech}
              </span>
            {/each}
          </div>
        </a>
      {/each}
    </div>
  </div>
</section>

{#if !coarse && hovered !== null && v3projects[hovered]?.thumbnail}
  <div
    class="pointer-events-none fixed z-30 hidden h-56 w-80 -translate-x-1/2 -translate-y-1/2 overflow-hidden border border-[var(--color-rule-strong)] shadow-2xl md:block"
    style:left="{mx}px"
    style:top="{my}px"
  >
    <img
      src={v3projects[hovered].thumbnail}
      alt="{v3projects[hovered].name} preview"
      class="h-full w-full object-cover"
    />
  </div>
{/if}
