import gsap from "gsap";

export function initCta() {
  const section = document.querySelector('[data-animate="cta-section"]');
  if (!section) return;

  // 1. Revelado progresivo en cascada del texto y el botón
  gsap.from(
    [
      '[data-animate="cta-title"]',
      '[data-animate="cta-description"]',
      '[data-animate="cta-button"]',
    ],
    {
      y: 40,
      opacity: 0,
      duration: 1.1,
      stagger: 0.16,
      ease: "power1.out",
      scrollTrigger: {
        trigger: '[data-animate="cta-section"]',
        start: "top 80%",
        once: true,
      },
    },
  );

  // 2. Animación ambiental/suave para los círculos decorativos de fondo
  gsap.from('[data-animate="cta-circle"]', {
    scale: 0.8,
    opacity: 0,
    duration: 1.5,
    stagger: 0.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: '[data-animate="cta-section"]',
      start: "top 80%",
      once: true,
    },
  });
}
