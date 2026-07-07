# `BaseLayout.astro` — Guía SEO · Fase 2

> **Plantilla lista para copiar y pegar.**  
> Cada bloque incluye comentarios que responden: ¿Qué hace? · ¿Por qué existe? · ¿Cuándo modificarlo?

## 1 · Frontmatter — Imports

```astro
---
/*
  ¿QUÉ HACE?   Importa los estilos globales y la imagen Open Graph por defecto.
  ¿POR QUÉ?    Astro procesa estas rutas en build-time; la imagen queda hasheada
               y optimizada automáticamente.
  ¿MODIFICAR?  → SÍ: si cambias la ruta de main.css o la imagen OG por defecto.
               → NO: no importes aquí imágenes específicas de una sola landing;
                     pásalas como prop `ogImage` desde la landing.
*/
import "../styles/main.css";
import openGraphImage from "../assets/images/seo/open-graph.webp";


```

---

## 2 · Interface de Props SEO

```astro
---

/*
  ¿QUÉ HACE?   Expone todos los campos SEO como props con tipos seguros.
               Cada landing puede sobrescribir solo lo que necesite.
  ¿POR QUÉ?    Un único punto de control para los defaults del sitio.
               Si el proyecto cambia de nombre o descripción global,
               se edita aquí y se propaga a todas las páginas.
  ¿MODIFICAR?  → SÍ: para agregar un nuevo campo SEO global (ej. `noindex`).
               → NO: para personalizar el SEO de una landing puntual;
                     pásalo como prop desde esa landing.
*/
interface Props {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "product";
  siteName?: string;
  lang?: string;
  country?: string;
  robots?: string;
  author?: string;
  keywords?: string;
  themeColor?: string;
  customSchema?: object | object[];  /*acepta un schema o un array de schemas*/
}
```

---

## 3 · Destructuring de props con valores por defecto

```astro
/*
  ¿QUÉ HACE?   Extrae cada prop con su valor por defecto.
               Si la landing no pasa la prop, se usa el default aquí definido.
  ¿POR QUÉ?    Garantiza que ninguna página quede sin título, descripción
               ni política de indexación.
  ¿MODIFICAR?  → SÍ: para cambiar los defaults globales del sitio
                     (title, description, siteName, themeColor).
               → NO: para valores específicos de una landing;
                     pásalos como prop desde esa página.
*/
const {
  title = "Nombre de la pagina",
  description = "descripcion de la pagina.",
  canonical = Astro.url.href,
  ogImage = openGraphImage.src,
  ogType = "website",
  siteName = "nombre",
  lang = "es",
  country = "CO",
  robots = "index, follow",
  author = siteName,
  keywords,
  themeColor = "#0a0a0a",
  customSchema,
} = Astro.props;
```

---

## 4 · URL absoluta para Open Graph

````astro
/*
  ¿QUÉ HACE?   Convierte el path relativo de la imagen OG en URL absoluta.
  ¿POR QUÉ?    WhatsApp, Facebook y los rastreadores IA rechazan paths
               relativos; necesitan la URL completa para renderizar la preview.
  ¿MODIFICAR?  → NO. Si cambia el dominio, actualiza `site:` en astro.config.mjs.
               La lógica `Astro.site ?? Astro.url.origin` es el fallback seguro.
*/
```astro
---
const absoluteOgImage = new URL(ogImage, Astro.site ?? Astro.url.origin).href;
````

---

## 5 · Locale Open Graph

````astro
/*
  ¿QUÉ HACE?   Genera el string "es_CO" requerido por og:locale.
  ¿POR QUÉ?    Facebook lo usa para decidir el idioma de la preview del enlace
               al compartir en grupos o mensajes.
  ¿MODIFICAR?  → NO la lógica. Pasa `lang` y `country` distintos como props
               desde la landing si necesitas otro locale (ej. "en_US").
*/
```astro
---
const ogLocale = `${lang}_${country.toUpperCase()}`;
````

---

## 6 · Schema.org fallback (JSON-LD)

````astro
/*
  ¿QUÉ HACE?   Define el schema JSON-LD mínimo del sitio. Si la landing pasa
               `customSchema`, lo usa en su lugar.
  ¿POR QUÉ?    Ninguna página debe quedar sin datos estructurados.
               Google los usa para rich results; los agentes IA para
               entender el contexto del negocio.
  ¿MODIFICAR?  → SÍ: cambia el `@type` si el tipo global de entidad cambia
                     (ej. "Organization", "LocalBusiness").
               → NO: schemas de landings específicas van en `customSchema`.
*/
```astro
---
const defaultSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: siteName,
  description,
  url: canonical,
  image: absoluteOgImage,
};

// Normaliza siempre a array para soportar múltiples schemas por página
const schemasToInject = customSchema
  ? Array.isArray(customSchema)
    ? customSchema
    : [customSchema]
  : [defaultSchema];
---

````

---

## 7 · `<html>` y `<head>` — Base

```astro
<!doctype html>
<html lang={lang}>
  <head>
    <!--
      ¿QUÉ HACE?   Declara charset UTF-8 y viewport responsivo.
      ¿POR QUÉ?    Sin charset aparecen caracteres corruptos. Sin viewport
                   Google marca la página como no-mobile-friendly.
      ¿MODIFICAR?  → NO. Son estándares inamovibles.
    -->
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
```

---

## 8 · SEO Core — Meta tags principales

```astro
    <!--
      ¿QUÉ HACE?   Le dice a Google el título, descripción, política de
                   indexación y autoría de la página.
      ¿POR QUÉ?    Sin estos tags Google genera snippets automáticos que no
                   representan bien el contenido del negocio.
      ¿MODIFICAR?  → NO la estructura. Personaliza valores desde props
                   en cada landing.
    -->
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="robots" content={robots} />
    <meta name="author" content={author} />
    {keywords && <meta name="keywords" content={keywords} />}
```

---

## 9 · URL Canónica

```astro
    <!--
      ¿QUÉ HACE?   Declara la URL "oficial" de la página ante los motores
                   de búsqueda.
      ¿POR QUÉ?    Evita penalizaciones por contenido duplicado causado por
                   parámetros UTM, trailing slash o variantes de URL.
      ¿MODIFICAR?  → NO. Solo sobrescribe con la prop `canonical` desde la
                   landing si la URL canónica difiere de la actual.
    -->
    <link rel="canonical" href={canonical} />
```

---

## 10 · Favicons

```astro
    <!--
      ¿QUÉ HACE?   Define los íconos del sitio para navegadores, iOS y PWA.
      ¿POR QUÉ?    Sin favicon el navegador dispara una petición 404 en cada
                   carga, contaminando los logs y afectando la percepción
                   de calidad.
      ¿MODIFICAR?  → SÍ: reemplaza los archivos en /public/ si cambia el
                   branding. Los nombres de archivo deben mantenerse iguales.
                   → NO: no cambies las rutas sin actualizar /public/.
    -->
    <link rel="icon" href="/favicon.ico" sizes="any" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <meta name="theme-color" content={themeColor} />
```

---

## 11 · Open Graph

```astro
    <!--
      ¿QUÉ HACE?   Controla la vista previa del enlace al compartir en
                   WhatsApp, Facebook, LinkedIn y Slack.
      ¿POR QUÉ?    Sin OG el enlace muestra solo la URL cruda; con OG muestra
                   imagen, título y descripción formateados.
      ¿MODIFICAR?  → NO la estructura. Pasa `ogImage` y `ogType` desde
                   la landing para personalizar la preview.
    -->
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={absoluteOgImage} />
    <meta property="og:image:alt" content={title} />
    <meta property="og:type" content={ogType} />
    <meta property="og:site_name" content={siteName} />
    <meta property="og:url" content={canonical} />
    <meta property="og:locale" content={ogLocale} />
```

---

## 12 · Twitter Card

```astro
    <!--
      ¿QUÉ HACE?   Define la vista previa del enlace en X (Twitter).
      ¿POR QUÉ?    X ignora Open Graph y lee sus propios meta tags;
                   sin estos, X muestra solo la URL sin imagen.
      ¿MODIFICAR?  → NO. Si el proyecto tiene cuenta de X, añade aquí:
                   <meta name="twitter:site" content="@tuhandle" />
    -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={absoluteOgImage} />
    <meta name="twitter:image:alt" content={title} />
```

---

## 13 · Fuentes (Google Fonts con preconnect)

```astro
    <!--
      ¿QUÉ HACE?   Carga Inter y Playfair Display con preconnect y preload
                   para minimizar el tiempo de bloqueo de render.
      ¿POR QUÉ?    Reduce el CLS (Cumulative Layout Shift) causado por el
                   salto visual al cargar la fuente, métrica que Google
                   penaliza en Core Web Vitals.
      ¿MODIFICAR?  → SÍ: si cambias la tipografía, actualiza la URL y main.css.
                   → NO: no inviertas el orden preconnect → preload → stylesheet.
                         Ese orden es crítico para el rendimiento.
    -->
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
```

---

## 14 · Schema.org — Inyección JSON-LD

```astro
    <!--
      ¿QUÉ HACE?   Inyecta los datos estructurados que Google y los agentes IA
                   usan para entender el negocio: tipo, nombre, URL, imagen.
      ¿POR QUÉ?    Sin JSON-LD Google no genera rich results y los LLMs no
                   entienden el contexto del negocio al indexar la página.
      ¿MODIFICAR?  → SÍ: cambia `defaultSchema` si el @type global cambia.
                   → NO: schemas de landings específicas van en `customSchema`.

      USO DESDE UNA LANDING:
      <BaseLayout
        customSchema={{
          "@context": "https://schema.org",
          "@type": "Apartment",
          name: "Torre A"
        }}
      >
        <BaseLayout customSchema={mySchema}>
    -->

    <script
      type="application/ld+json"
      set:html={JSON.stringify(
        schemasToInject.length === 1 ? schemasToInject[0] : schemasToInject,
      )}
    />
```

---

## 15 · Slot `head` — Extensión del `<head>`

```astro
    <!--
      ¿QUÉ HACE?   Punto de extensión para inyectar tags extra en el <head>
                   desde cualquier landing hija.
      ¿POR QUÉ?    Permite añadir pixels (Meta, TikTok) o scripts de A/B
                   testing sin modificar esta plantilla base.
      ¿MODIFICAR?  → NO. Úsalo desde la landing con slot="head":
                   <Fragment slot="head">
                     <script>/* pixel meta */</script>
                   </Fragment>
    -->
    <slot name="head" />
  </head>
```

---

## 16 · `<body>` — Slot de contenido principal

```astro
  <body>
    <!--
      ¿QUÉ HACE?   Renderiza las secciones visuales de cada landing.
      ¿POR QUÉ?    Todo el HTML/CSS visual entra por aquí; el layout
                   no impone estructura visual propia.
      ¿MODIFICAR?  → NO. El contenido va en la landing hija, no aquí.
    -->
    <slot />
```

## 17 · Scripts globales diferidos

    <!--
      ¿QUÉ HACE?   Punto de carga para animaciones, scroll suavizado,
                   formularios y cualquier comportamiento interactivo global.
      ¿POR QUÉ?    Se cargan diferidos (después del HTML) para no bloquear
                   el render inicial ni afectar LCP.
      ¿MODIFICAR?  → SÍ: reemplaza el placeholder con los imports reales.
                   → NO: scripts específicos de una landing van en
                         slot="body-scripts".

      REEMPLAZA EL PLACEHOLDER con los módulos reales del proyecto:
        import("../animations").then(m => m.initAnimations());
        import("../smooth-scroll").then(m => m.initSmoothScroll());
        import("../forms/contact-form").then(m => m.initContactForm());
    -->
    ```astro
    ---
    <script>
      /* scripts globales aquí */
    </script>

    ````

## 18 · Slot `body-scripts` — Scripts por landing

```astro
    <!--
      ¿QUÉ HACE?   Scripts específicos de una landing (pixel de conversión,
                   analytics, chat en vivo, etc.).
      ¿POR QUÉ?    Mantiene los scripts globales separados de los específicos,
                   facilitando el debugging y la auditoría de privacidad.
      ¿MODIFICAR?  → NO. Inyecta desde la landing con slot="body-scripts":
                   <Fragment slot="body-scripts">
                     <script>/* gtag, fbq, etc. */</script>
                   </Fragment>
    -->
    <slot name="body-scripts" />
  </body>
</html>
```

---

## Referencia rápida — ¿Qué pasa por prop y qué va en slot?

| Necesidad                                   | Solución                                |
| ------------------------------------------- | --------------------------------------- |
| Cambiar título / descripción de una landing | Prop `title` / `description`            |
| Imagen OG distinta para una landing         | Prop `ogImage`                          |
| Schema de un apartamento o producto         | Prop `customSchema`                     |
| Pixel de Meta o TikTok                      | `slot="head"`                           |
| Google Tag Manager, fbq, chat               | `slot="body-scripts"`                   |
| Cambiar nombre global del sitio             | Default en `const { siteName = "..." }` |
| Cambiar dominio                             | `site:` en `astro.config.mjs`           |

---

## Ejemplo de uso desde una landing

```astro
---
// src/pages/torre-a.astro
import BaseLayout from "../layouts/BaseLayout.astro";

const schema = {
  "@context": "https://schema.org",
  "@type": "Apartment",
  name: "Torre A — Aura Marina",
  description: "Apartamentos de 2 y 3 habitaciones frente al mar.",
  url: "https://auramarina.co/torre-a",
};
---

<BaseLayout
  title="Torre A · Aura Marina"
  description="Apartamentos de 2 y 3 habitaciones frente al mar."
  ogType="product"
  customSchema={schema}
>
  <Fragment slot="head">
    <!-- Pixel de Meta específico para esta landing -->
    <script>/* fbq('track', 'ViewContent') */</script>
  </Fragment>

  <!-- Contenido visual de la landing -->
  <main>
    <h1>Torre A</h1>
  </main>

  <Fragment slot="body-scripts">
    <!-- Scripts de conversión específicos -->
    <script>/* gtag('event', 'page_view') */</script>
  </Fragment>
</BaseLayout>
```

```

```
