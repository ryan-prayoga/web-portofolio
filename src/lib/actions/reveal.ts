// Lightweight scroll-reveal: adds `.in` when the node enters the viewport.
// No animation library — CSS handles the transition. Respects reduced motion.
export interface RevealOptions {
  threshold?: number;
}

export function reveal(node: HTMLElement, options: RevealOptions = {}) {
  if (typeof IntersectionObserver === "undefined") {
    node.classList.add("in");
    return;
  }

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    node.classList.add("in");
    return;
  }

  node.classList.add("reveal");
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      }
    },
    { threshold: options.threshold ?? 0.12, rootMargin: "0px 0px -8% 0px" },
  );

  io.observe(node);

  return {
    destroy() {
      io.disconnect();
    },
  };
}
