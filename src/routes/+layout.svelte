<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { localeStore } from '$lib/stores/locale.svelte';
  import { motionFlags } from '$lib/stores/motion.svelte';
  import Nav from '$lib/components/layout/Nav.svelte';
  import Footer from '$lib/components/layout/Footer.svelte';
  import Cursor from '$lib/components/layout/Cursor.svelte';

  let { children } = $props();
  let appMounted = $state(true);

  onMount(() => {
    localeStore.init();
    const releaseMotionFlags = motionFlags.init();

    const enableTestTeardown = new URLSearchParams(window.location.search).has('test-teardown');
    const teardownApp = () => (appMounted = false);
    if (enableTestTeardown) window.addEventListener('portfolio:test-teardown', teardownApp, { once: true });

    let destroyLenis: (() => void) | undefined;
    const stopLenis = () => {
      const destroy = destroyLenis;
      destroyLenis = undefined;
      destroy?.();
    };
    const unsubscribeMotion = motionFlags.subscribe(() => {
      if (motionFlags.reduced) stopLenis();
    });
    let cancelled = false;
    if (!motionFlags.reduced) {
      (async () => {
        // Lenis hanya di pointer halus — touch pakai scroll native
        if (motionFlags.coarse) return;
        const { createLenis } = await import('$lib/motion/lenis');
        if (cancelled || motionFlags.reduced) return;
        destroyLenis = createLenis().destroy;
      })();
    }

    return () => {
      cancelled = true;
      unsubscribeMotion();
      stopLenis();
      releaseMotionFlags();
      if (enableTestTeardown) window.removeEventListener('portfolio:test-teardown', teardownApp);
    };
  });
</script>

{#if appMounted}
  <Nav />
  <div id="page-background">
    {@render children()}
    <Footer />
    <Cursor />
  </div>
{/if}
