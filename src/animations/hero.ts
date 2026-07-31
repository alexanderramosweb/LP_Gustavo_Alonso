import gsap from "gsap";

export function initHero() {
  const heroSection = document.querySelector('[data-animate="hero-section"]');
  if (!heroSection) return;

  const tl = gsap.timeline({
    defaults: { ease: "power3.out" },
  });

  tl
    // 1. Imagen de fondo
    .from('[data-animate="hero-img"]', {
      scale: 1.12,
      duration: 1.8,
      ease: "power2.out",
    })
    // 2. Overlay
    .from(
      '[data-animate="hero-overlay"]',
      {
        opacity: 0,
        duration: 1,
      },
      "-=1.5",
    )
    // 3. Cascada de textos (Título -> Subtítulo -> CTA)
    .from(
      [
        '[data-animate="hero-title"]',
        '[data-animate="hero-subtitle"]',
        '[data-animate="hero-cta"]',
      ],
      {
        y: 35,
        opacity: 0,
        duration: 1,
        stagger: 0.18,
      },
      "-=1",
    );
}
