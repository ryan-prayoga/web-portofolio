<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { localeStore } from '$lib/stores/locale.svelte';
  import { motionFlags } from '$lib/stores/motion.svelte';
  import Nav from '$lib/components/layout/Nav.svelte';
  import Footer from '$lib/components/layout/Footer.svelte';
  import Cursor from '$lib/components/layout/Cursor.svelte';

  let { children } = $props();

  onMount(() => {
    localeStore.init();
    motionFlags.init();

    if (motionFlags.reduced) return;

    let destroyLenis: (() => void) | undefined;
    let cancelled = false;
    (async () => {
      // Lenis hanya di pointer halus — touch pakai scroll native
      if (motionFlags.coarse) return;
      const { createLenis } = await import('$lib/motion/lenis');
      if (cancelled) return;
      destroyLenis = createLenis().destroy;
    })();

    return () => {
      cancelled = true;
      destroyLenis?.();
    };
  });
</script>

<Nav />
{@render children()}
<Footer />
<Cursor />
