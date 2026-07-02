// Client-only module — SELALU impor lewat `await import('$lib/motion/gsap')`
// dari onMount/action supaya tidak masuk graph SSR (halaman di-prerender).
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

export { gsap, ScrollTrigger, SplitText };
