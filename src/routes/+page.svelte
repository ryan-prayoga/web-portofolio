<script lang="ts">
  import Navbar from '$lib/components/Navbar.svelte';
  import HeroSection from '$lib/components/HeroSection.svelte';
  import ProjectsSection from '$lib/components/ProjectsSection.svelte';
  import TechJourneySection from '$lib/components/TechJourneySection.svelte';
  import ContactSection from '$lib/components/ContactSection.svelte';
  import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
  <title>Ryan Prayoga — Full-Stack Engineer & Team Lead</title>
  <meta
    name="description"
    content="Portfolio Ryan Prayoga, Full-Stack Engineer dan Team Leader yang membangun enterprise systems, developer tooling, civic-tech, Android sync, dan deployment workflow."
  />
</svelte:head>

<Navbar />

<main>
  <HeroSection />
  <ProjectsSection />
  <TechJourneySection />
  <ContactSection />
</main>

<Footer />
