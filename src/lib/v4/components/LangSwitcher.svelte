<script lang="ts">
  import { locale, cycleLocale } from '$lib/v3/i18n';
  import type { Locale } from '$lib/v3/translations';

  const labels: Record<Locale, string> = { id: 'ID', en: 'EN', fr: 'FR' };

  function toggle() {
    locale.update((l) => cycleLocale(l));
  }
</script>

<button
  onclick={toggle}
  class="v4-mono inline-flex min-h-[2.5rem] items-center gap-2 border border-[var(--color-rule-strong)] px-3 py-1.5 text-[0.7rem] tracking-[0.15em] text-[var(--color-ink-soft)] transition-colors hover:border-[var(--color-ink)] hover:text-[var(--color-ink)] active:translate-y-[1px]"
  aria-label="Switch language"
>
  <span class="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-clay)]"></span>
  {$locale ? labels[$locale] : 'ID'}
</button>
