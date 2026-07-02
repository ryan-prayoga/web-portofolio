<script lang="ts">
  let { items }: { items: string[] } = $props();
</script>

<div class="marquee" aria-hidden="true">
  <div class="track">
    {#each [0, 1] as copy (copy)}
      <span class="seq">
        {#each items as item (item + copy)}
          <span class="item">{item}</span>
          <span class="sep">·</span>
        {/each}
      </span>
    {/each}
  </div>
</div>

<style>
  .marquee {
    overflow: hidden;
    border-top: 1px solid color-mix(in srgb, var(--color-slate) 55%, transparent);
    border-bottom: 1px solid color-mix(in srgb, var(--color-slate) 55%, transparent);
    padding: 0.85rem 0;
    mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
  }
  .track {
    display: flex;
    width: max-content;
    animation: marquee 36s linear infinite;
    will-change: transform;
  }
  .marquee:hover .track {
    animation-play-state: paused;
  }
  .seq {
    display: flex;
    align-items: center;
  }
  .item {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-greige);
    white-space: nowrap;
  }
  .sep {
    color: var(--color-ember);
    margin: 0 1.4rem;
  }
  @media (prefers-reduced-motion: reduce) {
    .track {
      animation: none;
    }
  }
</style>
