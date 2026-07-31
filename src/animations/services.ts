import gsap from "gsap";

export function initServices() {
  const section = document.querySelector('[data-animate="services-section"]');
  if (!section) return;

  // 1. Revelado del Título de la Sección
  gsap.from('[data-animate="services-title"]', {
    y: 35,
    opacity: 0,
    duration: 1.2,
    ease: "power1.out",
    scrollTrigger: {
      trigger: '[data-animate="services-title"]',
      start: "top 85%",
      once: true,
    },
  });

  // 2. Revelado individual y fluido de cada tarjeta de servicios
  const cards = gsap.utils.toArray<HTMLElement>(
    '[data-animate="service-card"]',
  );

  cards.forEach((card) => {
    gsap.from(card, {
      y: 45,
      opacity: 0,
      duration: 1.1,
      ease: "power1.out",
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        once: true,
      },
    });
  });
}
