<script lang="ts">
  import { onMount } from 'svelte';

  let { seconds = false }: { seconds?: boolean } = $props();

  let time = $state('--:--');

  onMount(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Jakarta',
      hour: '2-digit',
      minute: '2-digit',
      ...(seconds ? { second: '2-digit' } : {}),
    });
    const tick = () => (time = fmt.format(new Date()));
    tick();
    const id = setInterval(tick, seconds ? 1000 : 10_000);
    return () => clearInterval(id);
  });
</script>

<span class="clock">{time} WIB</span>

<style>
  .clock {
    font-family: var(--font-mono);
    font-variant-numeric: tabular-nums;
  }
</style>
