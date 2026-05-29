export interface ScrollRevealOptions {
  y?: number;
  delay?: number;
  duration?: number;
  start?: string;
}

export function scrollReveal(
  node: HTMLElement,
  options: ScrollRevealOptions = {}
) {
  const { y = 40, delay = 0, duration = 0.8, start = 'top 85%' } = options;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let ctx: any;

  async function init() {
    if (typeof window === 'undefined') return;

    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    ctx = gsap.context(() => {
      gsap.from(node, {
        y,
        opacity: 0,
        duration,
        delay,
        ease: 'power2.out',
        scrollTrigger: { trigger: node, start, toggleActions: 'play none none none' },
      });
    });
  }

  init();

  return {
    destroy() {
      ctx?.revert();
    },
  };
};
