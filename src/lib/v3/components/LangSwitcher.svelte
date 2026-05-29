<script lang="ts">
  import { locale, cycleLocale } from '../i18n';
  import type { Locale } from '../translations';

  const labels: Record<Locale, string> = { id: 'ID', en: 'EN', fr: 'FR' };

  function toggle() {
    locale.update((l) => cycleLocale(l));
  }
</script>

<button
  onclick={toggle}
  class="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-secondary transition hover:border-border-light hover:text-primary"
  aria-label="Switch language"
>
  <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
  {$locale ? labels[$locale] : 'ID'}
</button>
