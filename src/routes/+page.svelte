<script lang="ts">
  import Navbar from '$lib/components/Navbar.svelte';
  import HeroSection from '$lib/components/HeroSection.svelte';
  import AboutSection from '$lib/components/AboutSection.svelte';
  import StatsSection from '$lib/components/StatsSection.svelte';
  import TechJourneySection from '$lib/components/TechJourneySection.svelte';
  import ProjectsSection from '$lib/components/ProjectsSection.svelte';
  import LeadershipSection from '$lib/components/LeadershipSection.svelte';
  import OperationsSection from '$lib/components/OperationsSection.svelte';
  import AiMindsetSection from '$lib/components/AiMindsetSection.svelte';
  import LearningSection from '$lib/components/LearningSection.svelte';
  import ContactSection from '$lib/components/ContactSection.svelte';
  import Footer from '$lib/components/Footer.svelte';
</script>

<Navbar />

<main>
  <HeroSection />
  <AboutSection />
  <StatsSection />
  <TechJourneySection />
  <ProjectsSection />
  <LeadershipSection />
  <OperationsSection />
  <AiMindsetSection />
  <LearningSection />
  <ContactSection />
</main>

<Footer />
