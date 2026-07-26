<script lang="ts">
  import { localeStore } from '$lib/stores/locale.svelte';
  import { uiCopy } from '$lib/data/uiCopy';
  import { profile } from '$lib/data/profile';

  const t = $derived(uiCopy[localeStore.value]);

  function toTop(event: Event) {
    event.preventDefault();
    document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' });
  }
</script>

<footer
  class="border-rule text-muted mx-auto flex max-w-5xl flex-wrap justify-between gap-x-8 gap-y-2 border-t px-6 py-8 font-mono text-xs uppercase"
>
  <span>© 2026 {profile.name}</span>
  <span>{profile.location}</span>
  <span>{t.footer.note}</span>
  <a href="#top" onclick={toTop} class="no-print hover:text-accent">{t.footer.backToTop} ↑</a>
</footer>
