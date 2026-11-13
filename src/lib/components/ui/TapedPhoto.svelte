<script lang="ts">
  import type { Snippet } from 'svelte';

  /**
   * Cetakan foto yang ditempel selotip ke halaman buku sketsa: sedikit
   * miring, lurus saat kartu induk (`.group`) disorot. Isi gambar dipasok
   * pemanggil supaya `<picture>`/tautan tetap dikontrol di tempatnya.
   */
  type Props = {
    children: Snippet;
    caption?: string;
    /** Kemiringan dalam derajat; selang-seling tanda antar foto. */
    tilt?: number;
    /** Caption hanya hiasan (judul sudah ada di dekatnya). */
    decorativeCaption?: boolean;
    class?: string;
  };

  let { children, caption, tilt = -1.2, decorativeCaption = false, class: className = '' }: Props = $props();
</script>

<figure class="taped {className}" style="--tilt: {tilt}deg">
  <div class="print">
    <span class="tape tape--a" aria-hidden="true"></span>
    <span class="tape tape--b" aria-hidden="true"></span>
    {@render children()}
  </div>
  {#if caption}
    <figcaption class="text-muted mt-3 font-hand text-sm" aria-hidden={decorativeCaption ? 'true' : undefined}>
      {caption}
    </figcaption>
  {/if}
</figure>

<style>
  .taped {
    --tape: color-mix(in srgb, var(--color-accent) 24%, var(--color-paper));
  }

  .print {
    position: relative;
    padding: 6px;
    background: var(--color-print);
    border: 1px solid color-mix(in srgb, var(--color-ink) 14%, transparent);
    border-radius: 2px;
    box-shadow:
      0 1px 2px rgb(0 0 0 / 0.06),
      0 10px 18px -12px rgb(0 0 0 / 0.28);
    rotate: var(--tilt);
    transition: rotate var(--duration-medium) var(--ease-smooth-out);
  }

  :global(.group:hover) .print,
  :global(.group:focus-within) .print {
    rotate: 0deg;
  }

  .tape {
    position: absolute;
    z-index: 1;
    top: -11px;
    width: 4.25rem;
    height: 1.25rem;
    background: var(--tape);
    opacity: 0.88;
    clip-path: polygon(0 0, 100% 0, 97% 25%, 100% 50%, 97% 75%, 100% 100%, 0 100%, 3% 75%, 0 50%, 3% 25%);
  }

  .tape--a {
    left: 9%;
    rotate: -5deg;
  }

  .tape--b {
    right: 8%;
    rotate: 4deg;
  }

  @media (prefers-reduced-motion: reduce) {
    .print {
      transition: none;
    }
  }

  @media print {
    .print {
      rotate: 0deg;
      box-shadow: none;
    }

    .tape {
      display: none;
    }
  }
</style>
