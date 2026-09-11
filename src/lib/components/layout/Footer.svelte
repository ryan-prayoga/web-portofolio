<script lang="ts">
  import { localeStore } from '$lib/stores/locale.svelte';
  import { uiCopy } from '$lib/data/uiCopy';
  import { profile } from '$lib/data/profile';
  import Icon from '$lib/components/Icon.svelte';

  const t = $derived(uiCopy[localeStore.value]);

  function toTop(event: Event) {
    event.preventDefault();
    // id="top" hanya ada di homepage — di halaman lain fallback ke scrollTo.
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  }
</script>

<footer
  class="border-rule text-muted mx-auto flex max-w-5xl flex-wrap justify-between gap-x-8 gap-y-2 border-t px-6 py-8 font-sans text-xs uppercase font-medium"
>
  <span>© 2026 {profile.name}</span>
  <span>{profile.location}</span>
  <a href="/freelance" class="hover:text-accent inline-flex items-center gap-1 transition-colors">
    {localeStore.value === 'id' ? 'Jasa Web Portofolio' : 'Freelance Service'}
    <Icon name="arrowUpRight" size={12} />
  </a>
  <a href="#top" onclick={toTop} class="no-print hover:text-accent inline-flex items-center gap-1">
    {t.footer.backToTop}
    <Icon name="arrowUp" size={12} />
  </a>
</footer>
