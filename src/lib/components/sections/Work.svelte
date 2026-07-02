<script lang="ts">
  import { onMount } from 'svelte';
  import { localeStore } from '$lib/stores/locale.svelte';
  import { uiCopy } from '$lib/data/uiCopy';
  import { projects } from '$lib/data/projects';
  import { projectCopy } from '$lib/data/projectCopy';
  import { beacons } from '$lib/data/beacons';
  import { reveal } from '$lib/actions/reveal';

  const t = $derived(uiCopy[localeStore.value]);
  const projectDescriptions = $derived(projectCopy[localeStore.value]);

  const imgSizes = '(max-width: 760px) 90vw, 40vw';
  let hoveredProject = $state(0);
  const previewProject = $derived(projects[hoveredProject] ?? projects[0]);
  const previewBase = $derived(previewProject?.thumbnail?.replace('.webp', ''));
  const previewCity = $derived(
    beacons.find((b) => b.slug === previewProject?.slug)?.city ?? 'Nusantara'
  );

  let listEl: HTMLElement | undefined = $state();

  onMount(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!listEl) return;

    let mm: { revert: () => void } | undefined;
    let cancelled = false;
    (async () => {
      const { gsap, ScrollTrigger } = await import('$lib/motion/gsap');
      if (cancelled || !listEl) return;
      mm = gsap.matchMedia();
      (mm as ReturnType<typeof gsap.matchMedia>).add(
        '(prefers-reduced-motion: no-preference)',
        () => {
          const rows = gsap.utils.toArray<HTMLElement>(listEl!.querySelectorAll('li'));
          gsap.set(rows, { autoAlpha: 0, y: 44 });
          ScrollTrigger.batch(rows, {
            start: 'top 90%',
            once: true,
            onEnter: (batch) =>
              gsap.to(batch, {
                autoAlpha: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                stagger: 0.09,
              }),
          });
        }
      );
    })();

    return () => {
      cancelled = true;
      mm?.revert();
    };
  });
</script>

<section id="work" class="section">
  <div class="sec-head" use:reveal>
    <p class="mono idx">SYS/01 — {t.workKicker}</p>
    <h2>{t.workHeading}</h2>
    <p class="lead">{t.workIntro}</p>
  </div>

  <div class="work">
    <ol class="work-list" bind:this={listEl}>
      {#each projects as project, i (project.slug)}
        {@const desc = projectDescriptions[project.slug]}
        {@const base = project.thumbnail?.replace('.webp', '')}
        <li>
          <a
            class="row"
            href={project.url ?? project.source ?? '#'}
            target="_blank"
            rel="noopener noreferrer"
            onmouseenter={() => (hoveredProject = i)}
            onfocus={() => (hoveredProject = i)}
          >
            <span class="r-idx mono">BCN-0{i + 1}<i class="dot" aria-hidden="true"></i></span>
            {#if base}
              <picture class="row-thumb" aria-hidden="true">
                <source type="image/avif" srcset="{base}-sm.avif 700w, {base}.avif 1100w" sizes="(max-width: 1080px) 92vw, 40vw" />
                <img src={project.thumbnail} srcset="{base}-sm.webp 700w, {base}.webp 1100w" sizes="(max-width: 1080px) 92vw, 40vw" alt="{project.name} preview" width="1100" height="688" loading="lazy" decoding="async" />
              </picture>
            {:else}
              <span class="row-thumb fallback" aria-hidden="true">{project.name}</span>
            {/if}
            <span class="r-main">
              <span class="r-name">{project.name}</span>
              <span class="r-desc">{desc?.summary ?? project.category}</span>
            </span>
            <span class="r-stack mono">{project.stack.slice(0, 3).join(' · ')}</span>
            <span class="r-arrow" aria-hidden="true">↗</span>
          </a>
        </li>
      {/each}
    </ol>

    <aside class="work-preview" aria-hidden="true">
      <div class="wp-inner">
        {#if previewBase}
          <picture>
            <source type="image/avif" srcset="{previewBase}-sm.avif 700w, {previewBase}.avif 1100w" sizes={imgSizes} />
            <img src={previewProject.thumbnail} srcset="{previewBase}-sm.webp 700w, {previewBase}.webp 1100w" sizes={imgSizes} alt="" width="1100" height="688" loading="lazy" decoding="async" />
          </picture>
        {:else}
          <div class="wp-fallback">{previewProject?.name}</div>
        {/if}
        <div class="wp-meta mono">
          <span><i class="dot" aria-hidden="true"></i>{previewCity}</span>
          <span>{previewProject?.category}</span>
          <span>{previewProject?.year}</span>
        </div>
      </div>
    </aside>
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
  .lead {
    color: var(--color-greige);
    font-size: clamp(1rem, 1.5vw, 1.2rem);
    line-height: 1.55;
    max-width: 38ch;
  }
  .sec-head {
    display: grid;
    grid-template-columns: minmax(0, 0.4fr) minmax(0, 0.6fr);
    gap: clamp(1rem, 3vw, 3rem);
    align-items: end;
    margin-bottom: clamp(2.5rem, 6vw, 4.5rem);
  }
  .sec-head .idx {
    color: var(--color-ember);
    grid-column: 1;
  }
  .sec-head h2 {
    grid-column: 1;
    margin: 0.8rem 0 0;
    font-family: var(--font-display);
    font-size: clamp(1.9rem, 4.5vw, 3.6rem);
    font-weight: 600;
    line-height: 1;
    letter-spacing: -0.03em;
    max-width: 16ch;
    color: var(--color-bone);
  }
  .sec-head .lead {
    grid-column: 2;
    align-self: end;
  }
  .dot {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--color-ember);
    margin-left: 0.45rem;
    vertical-align: middle;
    box-shadow: 0 0 8px color-mix(in srgb, var(--color-ember) 70%, transparent);
  }
  .wp-meta .dot {
    margin: 0 0.45rem 0 0;
  }

  .work {
    display: grid;
    grid-template-columns: minmax(0, 1.55fr) minmax(0, 0.95fr);
    gap: clamp(1.5rem, 4vw, 3.5rem);
    align-items: start;
  }
  .work-list {
    list-style: none;
    margin: 0;
    padding: 0;
    border-top: 1px solid var(--color-bone);
  }
  .work-list .row {
    display: grid;
    grid-template-columns: 5.5rem minmax(0, 1fr) auto 1.5rem;
    gap: 1rem;
    align-items: baseline;
    padding: 1.5rem 0;
    border-bottom: 1px solid color-mix(in srgb, var(--color-slate) 55%, transparent);
    text-decoration: none;
    color: var(--color-bone);
    transition: padding-left 0.22s ease, background-color 0.22s;
  }
  .work-list .row:hover {
    padding-left: 0.9rem;
    background: color-mix(in srgb, var(--color-navy) 60%, transparent);
  }
  .r-idx {
    color: var(--color-greige);
    transition: color 0.18s;
    white-space: nowrap;
  }
  .work-list .row:hover .r-idx {
    color: var(--color-ember);
  }
  .r-name {
    display: block;
    font-family: var(--font-display);
    font-size: clamp(1.5rem, 3vw, 2.3rem);
    font-weight: 600;
    line-height: 1;
    letter-spacing: -0.025em;
  }
  .r-desc {
    display: block;
    margin-top: 0.5rem;
    color: var(--color-greige);
    font-size: 0.92rem;
    line-height: 1.45;
    max-width: 46ch;
  }
  .r-stack {
    color: var(--color-greige);
    text-align: right;
    white-space: nowrap;
  }
  .r-arrow {
    justify-self: end;
    color: var(--color-ember);
    font-size: 1.1rem;
    opacity: 0;
    transform: translate(-4px, 4px);
    transition: opacity 0.2s, transform 0.2s;
  }
  .work-list .row:hover .r-arrow,
  .work-list .row:focus-visible .r-arrow {
    opacity: 1;
    transform: translate(0, 0);
  }
  /* per-row thumbnail — desktop pakai sticky preview */
  .row-thumb {
    display: none;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    border: 1px solid color-mix(in srgb, var(--color-slate) 55%, transparent);
    background: var(--color-navy);
  }
  .row-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .row-thumb.fallback {
    place-items: center;
    color: var(--color-greige);
    font-weight: 600;
    font-size: 1.3rem;
  }

  .work-preview {
    position: sticky;
    top: 6rem;
  }
  .wp-inner {
    border: 1px solid color-mix(in srgb, var(--color-slate) 70%, transparent);
    background: var(--color-navy);
  }
  .work-preview picture,
  .wp-fallback {
    display: block;
    aspect-ratio: 16 / 10;
    overflow: hidden;
  }
  .work-preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .wp-fallback {
    display: grid;
    place-items: center;
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--color-greige);
  }
  .wp-meta {
    display: flex;
    justify-content: space-between;
    gap: 0.6rem;
    padding: 0.7rem 0.9rem;
    border-top: 1px solid color-mix(in srgb, var(--color-slate) 55%, transparent);
    color: var(--color-greige);
  }

  @media (max-width: 1080px) {
    .work {
      grid-template-columns: 1fr;
    }
    .work-preview {
      display: none;
    }
    .work-list .row {
      grid-template-columns: 1fr auto;
      grid-template-areas:
        'idx arrow'
        'thumb thumb'
        'main main'
        'stack stack';
      gap: 0.5rem 1rem;
      align-items: center;
      padding: 1.6rem 0;
    }
    .work-list .row:hover {
      padding-left: 0;
      background: transparent;
    }
    .r-idx {
      grid-area: idx;
    }
    .r-arrow {
      grid-area: arrow;
      display: block;
      opacity: 1;
      transform: none;
    }
    .row-thumb {
      grid-area: thumb;
      display: block;
      margin: 0.4rem 0 0.3rem;
    }
    .row-thumb.fallback {
      display: grid;
    }
    .r-main {
      grid-area: main;
    }
    .r-stack {
      grid-area: stack;
      text-align: left;
      white-space: normal;
      margin-top: 0.2rem;
    }
  }
  @media (max-width: 760px) {
    .sec-head {
      grid-template-columns: 1fr;
    }
    .sec-head h2,
    .sec-head .lead {
      grid-column: 1;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .work-list .row,
    .r-arrow {
      transition: none;
    }
  }
</style>
