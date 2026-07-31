import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initHero } from "./hero";
import { initPortfolio } from "./portfolio";
import { initServices } from "./services";
import { initPhilosophy } from "./philosophy";
import { initCta } from "./cta";

// Registrar el plugin de ScrollTrigger globalmente
gsap.registerPlugin(ScrollTrigger);

export function initAnimations() {
  initHero();
  initPortfolio();
  initServices();
  initPhilosophy();
  initCta();
}
