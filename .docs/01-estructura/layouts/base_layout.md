---
/*
  ── BaseLayout.astro ·con GoogleFonts ───────────────────────────────────────

  ¿QUÉ HACE?
  Estructura base del sitio con solo lo que necesita el navegador para pintar
  la página: charset, viewport, fuentes y los dos slots de contenido.

  ¿POR QUÉ EXISTE?
  En esta fase el objetivo es que todo lo visual funcione correctamente:
  layout, componentes, animaciones, formularios. El SEO no bloquea el diseño.

  ¿CUÁNDO MODIFICARLO?
  → SÍ: cuando cambies fuentes, theme-color o añadas un nuevo script global.
  → NO: no añadas meta tags SEO aquí; eso va en la Fase 2.
*/

import "../styles/main.css";
---

<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <!-- ── Título de desarrollo ──────────────────────────────────────────────
      ¿QUÉ HACE?   Muestra un título en la pestaña del navegador durante el desarrollo.
      ¿POR QUÉ?    Solo para identificar la página mientras trabajas. Se reemplaza
                   en la Fase 2 con el título SEO real vía prop.
      ¿MODIFICAR?  → SÍ: cámbialo mientras desarrollas. → Se borra en Fase 2.
    ─────────────────────────────────────────────────────────────────────── -->
    <title>Aura Marina · Dev</title>

    <!-- ── Theme color ───────────────────────────────────────────────────────
      ¿QUÉ HACE?   Define el color de la barra del navegador en móvil.
      ¿POR QUÉ?    Es visual, no SEO. Va aquí desde el inicio.
      ¿MODIFICAR?  → SÍ: ajústalo al color base del proyecto.
    ─────────────────────────────────────────────────────────────────────── -->
    <meta name="theme-color" content="#0a0a0a" />

    <!-- ── Fuentes ───────────────────────────────────────────────────────────
      ¿QUÉ HACE?   Carga Inter y Playfair Display desde Google Fonts.
      ¿POR QUÉ?    Las fuentes son visuales; deben estar desde el primer día para
                   que el diseño se vea tal cual se aprobó.
      ¿MODIFICAR?  → SÍ: si cambia la tipografía del proyecto, actualiza la URL
                     y también styles/main.css.
    ─────────────────────────────────────────────────────────────────────── -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      rel="preload"
      as="style"
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@700&display=swap"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@700&display=swap"
      rel="stylesheet"
    />

    <!-- Slot para scripts o meta tags adicionales por página -->
    <!-- ── Slot: head ────────────────────────────────────────────────────────
      ¿QUÉ HACE?   Slot para scripts o meta tags adicionales por página
                   desde una landing específica.
      ¿POR QUÉ?    Permite añadir pixels (Meta, TikTok) o scripts de A/B testing
                   sin modificar esta plantilla.
      ¿MODIFICAR?  → NO. Úsalo desde la landing hija con slot="head".
    ─────────────────────────────────────────────────────────────────────── -->

    <slot name="head" />

  </head>

  <body>
    <!-- ── Slot: contenido visual ────────────────────────────────────────────
      ¿QUÉ HACE?   Renderiza las secciones de cada landing: hero, galería,
                   características, formulario, etc.
      ¿POR QUÉ?    Todo el HTML/CSS de la página entra por aquí.
      ¿MODIFICAR?  → NO tocar. El contenido va en la landing hija, no aquí.
    ─────────────────────────────────────────────────────────────────────── -->
    <slot />

    <!-- ── Scripts globales ──────────────────────────────────────────────────
      ¿QUÉ HACE?   Aquí van los scripts de animaciones, scroll suavizado,
                   formularios de contacto y cualquier comportamiento interactivo
                   global del sitio.
      ¿POR QUÉ?    Se cargan diferidos para no bloquear el render visual.
      ¿MODIFICAR?  → SÍ: añade los imports reales del proyecto.
                   → NO: scripts de una sola landing van en el slot "body-scripts".

      PLACEHOLDER — reemplaza con los módulos reales:
        import("../animations").then(m => m.initAnimations());
        import("../smooth-scroll").then(m => m.initSmoothScroll());
        import("../forms/contact-form").then(m => m.initContactForm());
    ─────────────────────────────────────────────────────────────────────── -->
    <script>
      /* scripts globales aquí */
    </script>

    <!-- ── Slot: body-scripts ────────────────────────────────────────────────
      ¿QUÉ HACE?   Scripts específicos de una landing (pixel, analytics, chat).
      ¿POR QUÉ?    Mantiene los scripts globales separados de los particulares.
      ¿MODIFICAR?  → NO. Inyecta desde la landing hija con slot="body-scripts".
    ─────────────────────────────────────────────────────────────────────── -->
    <slot name="body-scripts" />

  </body>
</html>
