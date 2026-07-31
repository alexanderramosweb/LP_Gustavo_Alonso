import gsap from "gsap";

export function initPortfolio() {
  const section = document.querySelector('[data-animate="portfolio-section"]');
  if (!section) return;

  // 1. Revelado del Encabezado
  gsap.from('[data-animate="portfolio-header"]', {
    y: 35,
    opacity: 0,
    duration: 1.2,
    ease: "power1.out",
    scrollTrigger: {
      trigger: '[data-animate="portfolio-header"]',
      start: "top 85%",
      once: true,
    },
  });

  // 2. Revelado INDIVIDUAL por tarjeta al hacer Scroll
  const cards = gsap.utils.toArray<HTMLElement>(
    '[data-animate="portfolio-card"]',
  );

  cards.forEach((card) => {
    gsap.from(card, {
      y: 45, // Distancia moderada para que no sea agresivo
      opacity: 0,
      duration: 1,
      ease: "power1.out", // Entrada orgánica y ultra fluida
      scrollTrigger: {
        trigger: card, // Cada tarjeta se monitorea a sí misma
        start: "top 85%", // Se activa individualmente cuando la tarjeta llega al 85% de la pantalla
        once: true, // Se ejecuta una sola vez al bajar
      },
    });
  });
}
