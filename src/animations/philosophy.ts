import gsap from "gsap";

export function initPhilosophy() {
  const section = document.querySelector('[data-animate="philosophy-section"]');
  if (!section) return;

  // 1. Revelado progresivo del texto (Header, Descripción, Divisor, Stats Container)
  gsap.from(
    [
      '[data-animate="philosophy-header"]',
      '[data-animate="philosophy-text"]',
      '[data-animate="philosophy-divider"]',
      '[data-animate="philosophy-stats"]',
    ],
    {
      y: 35,
      opacity: 0,
      duration: 1.1,
      stagger: 0.15,
      ease: "power1.out",
      scrollTrigger: {
        trigger: '[data-animate="philosophy-section"]',
        start: "top 80%",
        once: true,
      },
    },
  );

  // 2. Animación Cronómetro de los números (Counters)
  const counters = document.querySelectorAll<HTMLElement>(
    '[data-animate="counter"]',
  );

  counters.forEach((counter) => {
    const targetValue = parseInt(
      counter.getAttribute("data-target") || "0",
      10,
    );
    const suffix = counter.getAttribute("data-suffix") || "";

    const counterObj = { value: 0 };

    gsap.to(counterObj, {
      value: targetValue,
      duration: 2, // Duración del conteo en segundos
      ease: "power2.out", // Hace que al final del conteo desacelere suavemente
      scrollTrigger: {
        trigger: counter,
        start: "top 85%",
        once: true,
      },
      onUpdate: () => {
        // Redondeamos el número y le agregamos el sufijo (ej: "+")
        counter.textContent = `${Math.floor(counterObj.value)}${suffix}`;
      },
    });
  });

  // 3. Revelado de la foto y el badge del autor
  gsap.from('[data-animate="philosophy-media"]', {
    y: 45,
    opacity: 0,
    duration: 1.2,
    ease: "power1.out",
    scrollTrigger: {
      trigger: '[data-animate="philosophy-media"]',
      start: "top 80%",
      once: true,
    },
  });
}
