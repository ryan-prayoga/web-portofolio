<script lang="ts">
  import '../app.css';
  let { children } = $props();
</script>

<svelte:head>
  <title>Ryan Prayoga - Full-Stack Engineer</title>
  <meta
    name="description"
    content="Portfolio Ryan Prayoga, Full-Stack Engineer dan Team Leader yang membangun enterprise systems, developer tooling, civic-tech, Android sync, dan deployment workflow."
  />
</svelte:head>

{@render children()}
