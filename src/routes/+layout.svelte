<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { localeStore } from '$lib/stores/locale.svelte';
  import Nav from '$lib/components/layout/Nav.svelte';
  import Footer from '$lib/components/layout/Footer.svelte';

  let { children } = $props();
  let appMounted = $state(true);

  onMount(() => {
    localeStore.init();

    const enableTestTeardown = new URLSearchParams(window.location.search).has('test-teardown');
    const teardownApp = () => (appMounted = false);
    if (enableTestTeardown) window.addEventListener('portfolio:test-teardown', teardownApp, { once: true });

    return () => {
      if (enableTestTeardown) window.removeEventListener('portfolio:test-teardown', teardownApp);
    };
  });
</script>

{#if appMounted}
  <Nav />
  <div id="page-background">
    {@render children()}
    <Footer />
  </div>
{/if}
