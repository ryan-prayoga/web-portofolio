<script lang="ts">
  import { onMount } from 'svelte';
  import { getResolvedTheme, toggleTheme } from '$lib/theme';
  import { drawButton } from '$lib/actions/drawably';

  let isDark = $state(false);

  onMount(() => {
    isDark = getResolvedTheme() === 'dark';
  });

  function handleToggle() {
    toggleTheme();
    isDark = getResolvedTheme() === 'dark';
  }
</script>

<button
  type="button"
  use:drawButton={{ resketchOnHover: true }}
  onclick={handleToggle}
  aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
  title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
  class="relative inline-flex h-8 w-8 cursor-pointer items-center justify-center text-muted hover:text-accent transition-colors active:scale-95"
>
  {#if isDark}
    <!-- Sun icon -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.75"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="h-4 w-4"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  {:else}
    <!-- Moon icon -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.75"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  {/if}
</button>
