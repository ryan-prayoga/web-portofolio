// Client-only module — impor dinamis dari onMount layout.
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './gsap';

export function createLenis() {
  const lenis = new Lenis({ lerp: 0.1 });

  lenis.on('scroll', ScrollTrigger.update);
  const tick = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  let active = true;

  return {
    lenis,
    destroy() {
      if (!active) return;
      active = false;
      gsap.ticker.remove(tick);
      lenis.destroy();
    },
  };
}
