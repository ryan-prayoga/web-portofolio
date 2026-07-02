<script lang="ts">
  import { localeStore } from '$lib/stores/locale.svelte';
  import { uiCopy } from '$lib/data/uiCopy';
  import { profile } from '$lib/data/profile';
  import WibClock from '$lib/components/ui/WibClock.svelte';

  const t = $derived(uiCopy[localeStore.value]);

  function toTop(event: Event) {
    event.preventDefault();
    document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' });
  }
</script>

<footer class="footer">
  <span class="mono">© 2026 Ryan Prayoga</span>
  <span class="mono">{profile.location} · -6.17, 106.63</span>
  <span class="mono clock"><WibClock seconds /></span>
  <span class="mono">{t.footerNote}</span>
  <a class="mono to-top" href="#top" onclick={toTop}>{t.backToTop} ↑</a>
</footer>

<style>
  .mono {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
  .footer {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem 2rem;
    justify-content: space-between;
    padding: 1.6rem clamp(1.25rem, 5vw, 4rem);
    border-top: 1px solid var(--color-bone);
    color: var(--color-greige);
  }
  .footer .clock {
    color: var(--color-ember);
  }
  .footer .to-top {
    color: var(--color-bone);
    text-decoration: none;
  }
  .footer .to-top:hover {
    color: var(--color-ember);
  }
</style>
