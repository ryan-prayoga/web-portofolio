<script lang="ts">
  import { localeStore } from '$lib/stores/locale.svelte';
  import { uiCopy } from '$lib/data/uiCopy';
  import { projects } from '$lib/data/projects';
  import { projectCopy } from '$lib/data/projectCopy';
  import { beacons } from '$lib/data/beacons';
  import { reveal } from '$lib/actions/reveal';
  import { scrollStack } from '$lib/motion/scrollStack';

  const t = $derived(uiCopy[localeStore.value]);
  const projectDescriptions = $derived(projectCopy[localeStore.value]);

  function cityOf(slug: string) {
    return beacons.find((b) => b.slug === slug)?.city ?? 'Nusantara';
  }
</script>

<section id="work" class="section">
  <div class="sec-head" use:reveal>
    <p class="mono idx">SYS/01 — {t.workKicker}</p>
    <h2>{t.workHeading}</h2>
    <p class="lead">{t.workIntro}</p>
  </div>

  <div class="stack" use:scrollStack>
    {#each projects as project, i (project.slug)}
      {@const desc = projectDescriptions[project.slug]}
      {@const base = project.thumbnail?.replace('.webp', '')}
      <article class="stack-card">
        <a
          class="card"
          href={project.url ?? project.source ?? '#'}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div class="card-info">
            <p class="mono meta">
              BCN-0{i + 1}
              <i class="dot" aria-hidden="true"></i>
              {cityOf(project.slug)}
              <span class="year">{project.year}</span>
            </p>
            <h3 class="name">{project.name}</h3>
            <p class="desc">{desc?.summary ?? project.category}</p>
            <ul class="tags">
              {#each project.stack as tech (tech)}
                <li>{tech}</li>
              {/each}
            </ul>
            <span class="open mono">{t.open} <span class="arrow" aria-hidden="true">↗</span></span>
          </div>
          {#if base}
            <picture class="card-thumb">
              <source
                type="image/avif"
                srcset="{base}-sm.avif 700w, {base}.avif 1100w"
                sizes="(max-width: 900px) 92vw, 48vw"
              />
              <img
                src={project.thumbnail}
                srcset="{base}-sm.webp 700w, {base}.webp 1100w"
                sizes="(max-width: 900px) 92vw, 48vw"
                alt="{project.name} preview"
                width="1100"
                height="688"
                loading="lazy"
                decoding="async"
              />
            </picture>
          {:else}
            <div class="card-thumb terminal mono" aria-hidden="true">
              <span class="prompt">$</span> npx brunogen generate<br />
              <span class="out">✓ openapi.yaml → bruno collection</span><br />
              <span class="out">✓ 42 endpoints · laravel + express + go</span><br />
              <span class="cursor">▌</span>
            </div>
          {/if}
        </a>
      </article>
    {/each}
    <div class="stack-end" aria-hidden="true"></div>
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

  /* ── STACKED CARDS ── */
  .stack {
    max-width: 72rem;
    margin: 0 auto;
    padding-bottom: 24vh; /* ruang supaya kartu terakhir sempat settle */
  }
  .stack-end {
    width: 100%;
    height: 1px;
  }
  .stack-card {
    border-radius: 22px;
  }
  .card {
    display: grid;
    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
    min-height: clamp(380px, 56vh, 520px);
    border-radius: 22px;
    overflow: hidden;
    background: linear-gradient(
      145deg,
      color-mix(in srgb, var(--color-navy) 92%, var(--color-ember) 8%) 0%,
      var(--color-navy) 34%,
      color-mix(in srgb, var(--color-night) 65%, var(--color-navy) 35%) 100%
    );
    border: 1px solid var(--color-slate);
    box-shadow:
      inset 0 1px 0 color-mix(in srgb, var(--color-bone) 7%, transparent),
      0 30px 70px -30px rgba(0, 0, 0, 0.85);
    text-decoration: none;
    color: var(--color-bone);
  }
  .card-info {
    display: flex;
    flex-direction: column;
    padding: clamp(1.4rem, 3vw, 2.6rem);
    min-width: 0;
  }
  .meta {
    color: var(--color-greige);
    margin: 0 0 auto;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .meta .year {
    margin-left: auto;
  }
  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--color-ember);
    box-shadow: 0 0 8px color-mix(in srgb, var(--color-ember) 70%, transparent);
  }
  .name {
    margin: 1.2rem 0 0;
    font-family: var(--font-display);
    font-size: clamp(2rem, 4.4vw, 3.4rem);
    font-weight: 700;
    line-height: 0.95;
    letter-spacing: -0.03em;
  }
  .desc {
    margin: 0.9rem 0 0;
    color: var(--color-greige);
    font-size: clamp(0.95rem, 1.2vw, 1.05rem);
    line-height: 1.55;
    max-width: 40ch;
  }
  .tags {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin: 1.4rem 0 0;
    padding: 0;
  }
  .tags li {
    font-family: var(--font-mono);
    font-size: 0.66rem;
    text-transform: uppercase;
    letter-spacing: 0.02em;
    padding: 0.3rem 0.55rem;
    border: 1px solid color-mix(in srgb, var(--color-slate) 80%, transparent);
    border-radius: 999px;
    color: var(--color-greige);
  }
  .open {
    margin-top: auto;
    padding-top: 1.4rem;
    color: var(--color-ember);
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
  }
  .open .arrow {
    transition: transform 0.2s;
  }
  .card:hover .open .arrow {
    transform: translate(3px, -3px);
  }
  .card-thumb {
    position: relative;
    min-height: 240px;
    overflow: hidden;
  }
  .card-thumb img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top left;
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .card:hover .card-thumb img {
    transform: scale(1.04);
  }
  .card-thumb::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      color-mix(in srgb, var(--color-navy) 45%, transparent),
      transparent 30%
    );
    pointer-events: none;
  }
  .card-thumb.terminal {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: clamp(1.4rem, 3vw, 2.4rem);
    background: var(--color-night);
    color: var(--color-greige);
    font-size: 0.82rem;
    line-height: 2;
    text-transform: none;
    letter-spacing: 0.02em;
  }
  .card-thumb.terminal::after {
    display: none;
  }
  .terminal .prompt {
    color: var(--color-ember);
  }
  .terminal .out {
    color: color-mix(in srgb, var(--color-greige) 75%, transparent);
  }
  .terminal .cursor {
    color: var(--color-ember);
    animation: blink 1.1s step-end infinite;
  }
  @keyframes blink {
    50% {
      opacity: 0;
    }
  }

  @media (max-width: 900px) {
    .card {
      grid-template-columns: 1fr;
      grid-template-rows: auto minmax(200px, 34vh);
      min-height: 0;
    }
    .card-info {
      order: 2;
    }
    .card-thumb {
      order: 1;
    }
    .meta {
      margin-bottom: 0;
    }
    .open {
      padding-top: 1.2rem;
    }
    .stack {
      padding-bottom: 16vh;
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
    .stack-card + .stack-card {
      margin-top: 2rem;
    }
    .card-thumb img,
    .open .arrow {
      transition: none;
    }
    .terminal .cursor {
      animation: none;
    }
  }
</style>
