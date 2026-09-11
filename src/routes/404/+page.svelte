<script lang="ts">
  import { localeStore } from '$lib/stores/locale.svelte';
  import Icon from '$lib/components/Icon.svelte';

  const copy = $derived(
    localeStore.value === 'id'
      ? { heading: 'Halaman tidak ditemukan.', body: 'Alamat ini tidak ada atau sudah pindah.', back: 'Ke beranda' }
      : { heading: 'Page not found.', body: 'This address does not exist or has moved.', back: 'Back home' },
  );
</script>

<svelte:head>
  <title>404 — Ryan Prayoga</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<main class="mx-auto flex max-w-5xl flex-col items-start px-6 pt-40 pb-24">
  <p class="text-accent font-mono text-xs tracking-wider uppercase">404</p>
  <h1 class="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{copy.heading}</h1>
  <p class="text-muted mt-3">{copy.body}</p>
  <a
    href="/"
    class="border-rule hover:border-accent hover:text-accent mt-8 inline-flex items-center gap-1.5 border px-4 py-2 font-mono text-xs tracking-wide uppercase transition-colors"
  >
    <Icon name="arrowLeft" size={13} />
    {copy.back}
  </a>
</main>
