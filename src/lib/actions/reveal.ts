export interface RevealOptions {
  y?: number;
  delay?: number;
  duration?: number;
  start?: string;
  stagger?: number;
  selector?: string;
}

export function reveal(node: HTMLElement, options: RevealOptions = {}) {
  const {
    y = 24,
    delay = 0,
    duration = 0.9,
    start = "top 88%",
    stagger = 0.08,
    selector,
  } = options;

  let ctx: { revert: () => void } | undefined;
  let cancelled = false;

  async function init() {
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const targets = selector
      ? Array.from(node.querySelectorAll<HTMLElement>(selector))
      : [node];

    if (reduced) {
      targets.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      return;
    }

    const { gsap } = await import("gsap");
    const { ScrollTrigger } = await import("gsap/ScrollTrigger");
    gsap.registerPlugin(ScrollTrigger);
    if (cancelled) return;

    ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration,
          delay,
          ease: "power3.out",
          stagger: targets.length > 1 ? stagger : 0,
          scrollTrigger: {
            trigger: node,
            start,
            toggleActions: "play none none none",
          },
        },
      );
    });
  }

  init();

  return {
    destroy() {
      cancelled = true;
      ctx?.revert();
    },
  };
}
