# 🚀 Guía Completa: Deploy + SEO para Proyectos Astro

Una ruta paso a paso desde el desarrollo local hasta la indexación en Google.

---

## 📋 Tabla de Contenidos

1. [Preparación SEO Técnica](#preparación-seo-técnica)
2. [Validación Pre-Build](#validación-pre-build)
3. [Build Local](#build-local)
4. [Preview Local](#preview-local)
5. [GitHub Setup](#github-setup)
6. [Deploy en Vercel](#deploy-en-vercel)
7. [Ajustes Post-Deploy](#ajustes-post-deploy)
8. [Validación SEO Real](#validación-seo-real)
9. [Lighthouse Audit](#lighthouse-audit)
10. [Google Search Console](#google-search-console)
11. [Compra y Configuración de Dominio](#compra-y-configuración-de-dominio)
12. [Checklist Final](#checklist-final)

---

## ⚙️ Variables de Configuración

> Reemplaza estas variables con los datos de tu proyecto:

```txt
PROJECT_NAME = tu-proyecto
VERCEL_URL = https://tu-proyecto.vercel.app
DOMAIN = tudominio.com
GITHUB_REPO = tu-usuario/tu-proyecto
```

---

# FASE 1: Preparación SEO Técnica

> **Momento:** Antes de hacer `npm run build`

### 1.1 Crear Imágenes SEO

Crea estas imágenes en `src/assets/images/seo/`:

```txt
src/assets/images/seo/
├─ open-graph.webp       (1200x630px, <100KB)
└─ twitter-card.webp     (1200x675px, <100KB)
```

**Tips:**

- Formato WebP para mejor compresión
- Dimensiones exactas según red social
- Texto grande y legible
- Logo visible

### 1.2 Crear Favicons

Coloca estos archivos en `public/`:

```txt
public/
├─ favicon.ico            (32x32)
├─ favicon.svg            (escalable)
├─ apple-touch-icon.png   (180x180)
└─ site.webmanifest       (opcional, para PWA)
```

**Generador recomendado:** [favicon-generator.org](https://www.favicon-generator.org/)

### 1.3 Crear robots.txt

Archivo: `public/robots.txt`

```txt
User-agent: *
Allow: /

```

### 1.4 Instalar Sitemap

```bash
npm install @astrojs/sitemap
```

### 1.5 Configurar astro.config.mjs

```javascript
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://example.com",

  integrations: [sitemap()],

  output: "static",
});
```

---

# FASE 2: Validación Pre-Build

> **Momento:** Antes de hacer `npm run build`

### Checklist Funcional

```bash
npm run dev
```

Verifica en el navegador:

- [ ] Todas las imágenes cargan correctamente
- [ ] Favicon aparece en la pestaña
- [ ] Formularios funcionan
- [ ] Links internos y externos funcionan
- [ ] Scroll y animaciones son suaves
- [ ] Responsive funciona en móvil
- [ ] No hay 404 en la consola

### Checklist de Consola

```bash
npm run dev
```

Abre DevTools (F12) y verifica:

```txt
✅ 0 errores en console
✅ 0 advertencias importantes
✅ Status 200 en requests
✅ Lighthouse >= 80
```

---

# FASE 3: Build Local

> **Momento:** Generar versión de producción

```bash
npm run build
```

### Resultado Esperado

```txt
✅ Build Complete
✅ Carpeta dist/ creada
✅ Sin errores fatales
```

### Si hay errores:

1. Lee el mensaje de error
2. Corrige en tu código
3. Vuelve a ejecutar `npm run build`
4. Repite hasta que no haya errores

---

# FASE 4: Preview Local

> **Momento:** Simular servidor de producción antes de subir

```bash
npm run preview
```

### Checklist de Preview

- [ ] Landing carga sin errores
- [ ] Formulario envía datos
- [ ] Sitemap abre: `http://localhost:3000/sitemap-index.xml`
- [ ] Robots abre: `http://localhost:3000/robots.txt`
- [ ] Performance es buena (sin red throttling)

---

# FASE 5: GitHub Setup

> **Momento:** Antes de deploy en Vercel

### Verificar .gitignore

Asegúrate que `public/.gitignore` (o raíz) incluya:

```gitignore
# Dependencias
node_modules/
package-lock.json
yarn.lock

# Build
dist/
.astro/

# IDE
.vscode/
.idea/
*.swp

# Secretos
.env
.env.local
.env.*.local

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*
```

### Commit y Push

```bash
# Verificar qué cambios hay
git status

# Agregar todos los cambios
git add .

# Commit con mensaje descriptivo
git commit -m "feat: Landing lista para producción - SEO configurado"

# Push a main
git push origin main
```

---

# FASE 6: Deploy en Vercel

### Paso 1: Conectar Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Inicia sesión con GitHub
3. Click en "New Project"
4. Selecciona tu repositorio `PROJECT_NAME`
5. Vercel detecta automáticamente Astro

### Paso 2: Verificar Preset

Deberías ver:

```txt
Framework Preset: Astro ✓
Build Command: npm run build
Output Directory: dist
```

> Si no está correcto, edítalo manualmente.

### Paso 3: Configurar Variables de Entorno (si es necesario)

Si tienes `.env`:

```txt
Settings → Environment Variables → Add
```

### Paso 4: Deploy

Click en botón **"Deploy"**

### Paso 5: Esperar

⏳ Vercel está compilando y subiendo:

```txt
⏳ 2-3 minutos típicamente
```

### Paso 6: URL Pública

Cuando termine:

```txt
✅ Preview Ready
https://PROJECT_NAME.vercel.app
```

**Nota:** Vercel te asigna automáticamente una URL `.vercel.app`

---

# FASE 7: Ajustes Post-Deploy

> **Momento:** Después de que Vercel haya desplegado

### 7.1 Actualizar robots.txt

Archivo: `public/robots.txt`

```txt
User-agent: *
Allow: /

Sitemap: https://PROJECT_NAME.vercel.app/sitemap-index.xml
```

### 7.2 Actualizar astro.config.mjs

Reemplaza:

```javascript
// ANTES:
site: "https://example.com";

// AHORA:
site: "https://PROJECT_NAME.vercel.app";
```

Archivo completo actualizado:

```javascript
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://PROJECT_NAME.vercel.app",

  integrations: [sitemap()],
}),

```

### 7.3 Nuevo Build

```bash
npm run build
```

### 7.4 Commit de Cambios

```bash
git add .
git commit -m "config: Actualiza URL producción a Vercel"
git push origin main
```

**Vercel despliega automáticamente** cuando hace push a main.

⏳ Espera 2-3 minutos más.

---

# FASE 8: Validación SEO Real

> **Momento:** Con URL pública en vivo

### 8.1 Verificar Sitemap

Abre en navegador:

```
https://PROJECT_NAME.vercel.app/sitemap-index.xml
```

Deberías ver XML con todas tus rutas. Ejemplo:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://PROJECT_NAME.vercel.app/sitemap-0.xml</loc>
  </sitemap>
</sitemapindex>
```

### 8.2 Verificar Robots.txt

Abre en navegador:

```
https://PROJECT_NAME.vercel.app/robots.txt
```

Deberías ver:

```txt
User-agent: *
Allow: /

Sitemap: https://PROJECT_NAME.vercel.app/sitemap-index.xml
```

### 8.3 Validar Open Graph

Usa estas herramientas con tu URL:

**Facebook:**

- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/sharing/)

**LinkedIn:**

- [LinkedIn Post Inspector](https://www.linkedin.com/feed/)

**General:**

- [OG Image Preview](https://www.opengraphcheck.com/)

Verificar que vea:

- Título correcto
- Descripción correcta
- Imagen OG cargando
- URL canonicalizada

---

# FASE 9: Lighthouse Audit

> **Momento:** Después que Vercel esté en vivo

### Ejecutar Audit

1. Abre tu sitio en Chrome
2. Presiona **F12** (DevTools)
3. Click en pestaña **Lighthouse**
4. Click en **Analyze page load**

### Objetivos

```txt
Performance     ≥ 90 ⚡
Accessibility   ≥ 90 ♿
SEO             ≥ 90 🔍
Best Practices  ≥ 90 ✅
```

### Si algo es bajo

**Performance bajo:**

- Optimiza imágenes (WebP)
- Lazy load
- Elimina CSS no usado
- Minifica JavaScript

**Accessibility bajo:**

- Añade alt text a imágenes
- Contraste de colores
- Labels en formularios
- Navegación con teclado

**SEO bajo:**

- Verifica meta tags
- Asegura mobile-friendly
- Robots.txt correcto
- Sitemap válido

---

# FASE 10: Google Search Console

> **Momento:** Después de Lighthouse validado

### 10.1 Acceder

Ve a:

```
https://search.google.com/search-console
```

Inicia sesión con Google.

### 10.2 Agregar Propiedad

1. Click en **"Agregar propiedad"**
2. Selecciona **URL prefix**
3. Ingresa: `https://PROJECT_NAME.vercel.app`
4. Click en **Continuar**

### 10.3 Verificar Propiedad

Google te pedirá verificación. Elige uno:

**Opción A: HTML tag (más fácil)**

1. Copia el meta tag que te da
2. Pégalo en `<head>` de tu BaseLayout
3. Deploy (`git push`)
4. Vuelve y click "Verificar"

**Opción B: Archivo HTML**

1. Descarga el archivo
2. Colócalo en `public/`
3. Deploy (`git push`)
4. Click "Verificar"

### 10.4 Enviar Sitemap

1. En Search Console, ve a **Sitemaps**
2. Ingresa:

```
https://PROJECT_NAME.vercel.app/sitemap-index.xml
```

3. Click **Enviar**

Deberías ver:

```txt
✅ Enviado
⏳ Procesando...
```

---

# FASE 11: Compra de Dominio

> **Momento:** Cuando estés listo para dominio real

### Proveedores Recomendados

| Proveedor      | Fortaleza              | Precio |
| -------------- | ---------------------- | ------ |
| **Namecheap**  | Buena UI, WHOIS gratis | $$     |
| **Cloudflare** | Rendimiento + DNS      | $      |
| **GoDaddy**    | Amplio catálogo        | $$     |
| **Porkbun**    | Precios bajos          | $      |

### Buscar Dominio

1. Ve a tu proveedor favorito
2. Busca: `DOMAIN.com`
3. Verifica disponibilidad
4. Agrega al carrito
5. Paga

---

# FASE 12: Conectar Dominio a Vercel

### 12.1 En Vercel

1. Ve a tu proyecto en Vercel
2. Settings → **Domains**
3. Click **Add Domain**
4. Ingresa: `DOMAIN.com`

### 12.2 Obtener Registros DNS

Vercel te mostrará registros como:

```txt
Type    Name           Content
A       DOMAIN.com     76.76.19.165
CNAME   www            cname.vercel-dns.com.
```

**Cópialos**, los necesitarás.

---

# FASE 13: Configurar DNS

> **Momento:** En tu proveedor de dominio

### Acceder a Panel DNS

**Namecheap:**

1. Dashboard → Tu dominio
2. Advanced DNS

**Cloudflare:**

1. Dashboard → Tu dominio
2. DNS

**GoDaddy:**

1. Mi cuenta → Mis productos
2. DNS

### Añadir Registros

Sigue exactamente los registros que Vercel te dio.

Típicamente:

```txt
A Record para DOMAIN.com
CNAME para www.DOMAIN.com
```

### Esperar Propagación

```txt
⏳ 5 minutos - 24 horas
```

Verifica con:

```bash
# En terminal (Mac/Linux)
nslookup DOMAIN.com

# O en terminal (Windows)
nslookup DOMAIN.com
```

Deberías ver la IP de Vercel.

---

# FASE 14: Actualizar astro.config.mjs

> **Momento:** Cuando DNS esté propagado

Cambia:

```javascript
// ANTES:
site: "https://PROJECT_NAME.vercel.app";

// AHORA:
site: "https://DOMAIN.com";
```

Archivo completo:

```javascript
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://DOMAIN.com",

  integrations: [
    sitemap({
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
});
```

### Commit y Deploy

```bash
npm run build

git add .
git commit -m "config: Dominio definitivo a DOMAIN.com"
git push origin main
```

⏳ Vercel despliega automáticamente.

---

# FASE 15: Reindexación en Google

> **Momento:** Después que el dominio esté activo

### 15.1 Actualizar Search Console

Si aún tienes la versión `.vercel.app`:

1. Ve a Search Console
2. Click en **"Agregar propiedad"** (nueva)
3. Ingresa: `https://DOMAIN.com`
4. Repite verificación

### 15.2 Enviar Sitemap Nuevo

1. En Search Console (dominio real)
2. Sitemaps → **Agregar sitemap**
3. Ingresa:

```
https://DOMAIN.com/sitemap-index.xml
```

4. Click **Enviar**

### 15.3 Cambio de Dirección (URL Redirect)

En Search Console versión antigua (`.vercel.app`):

1. Settings → **Change of Address**
2. Ingresa: `https://DOMAIN.com`

Esto ayuda a Google a entender la migración.

---

# CHECKLIST FINAL ✅

Cuando todo esté listo:

```txt
DESARROLLO
☑ Landing completada
☑ Responsive funcionando
☑ Animaciones suaves
☑ Formulario validado

PRE-DEPLOY
☑ SEO técnico configurado
☑ Imágenes optimizadas
☑ Favicons listos
☑ robots.txt creado
☑ Sitemap integrado
☑ BaseLayout con meta tags
☑ Lighthouse ≥ 90 en todo
☑ GitHub sincronizado

DEPLOY
☑ Build local exitoso
☑ Preview local validado
☑ Deploy en Vercel exitoso
☑ URL pública accesible

POST-DEPLOY
☑ robots.txt actualizado
☑ astro.config.mjs corregido
☑ Google Search Console configurado
☑ Sitemap enviado

DOMINIO
☑ Dominio comprado
☑ DNS configurado
☑ Propagación completada
☑ astro.config.mjs con dominio real
☑ New Search Console entry

FINAL
☑ Sitemap reindexado
☑ Change of address enviado
☑ URL canónica correcta
☑ Open Graph validado
☑ Proyecto ONLINE
```

---

## 🎯 Resumen de Comandos

Comandos que usarás frecuentemente:

```bash
# Desarrollo
npm run dev

# Preparar
npm run build
npm run preview

# Git
git add .
git commit -m "mensaje"
git push origin main

# Verificar
npm run build && npm run preview
```

---

## 📚 Recursos Útiles

**SEO y Validación:**

- [Google Search Console](https://search.google.com/search-console)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/sharing/)

**Documentación:**

- [Astro Docs](https://docs.astro.build)
- [Vercel Docs](https://vercel.com/docs)
- [Astro Sitemap Integration](https://docs.astro.build/en/guides/integrations-guide/sitemap/)

**Optimización:**

- [Web.dev](https://web.dev)
- [PageSpeed Insights](https://pagespeed.web.dev)
- [GTmetrix](https://gtmetrix.com)

---

## ⚡ Pro Tips

**Antes de deploy:**

- Prueba en incógnito (sin cache)
- Verifica en móvil real
- Valida formularios

**Después de deploy:**

- Monitorea Search Console semanalmente
- Verifica Core Web Vitals
- Actualiza contenido regularmente

**Para el futuro:**

- Mantén analytics activo
- Monitora ranking de keywords
- Haz audits mensuales
- Actualiza dependencias

---

## 🆘 Troubleshooting Rápido

| Problema                 | Solución                                            |
| ------------------------ | --------------------------------------------------- |
| Sitemap no aparece       | Verifica `astro.config.mjs` tiene `site` correcto   |
| Vercel muestra 404       | Output Directory debe ser `dist`                    |
| Meta tags no ven cambios | Limpia cache del navegador (Ctrl+Shift+Del)         |
| DNS no resuelve          | Espera más tiempo o verifica registros en proveedor |
| Lighthouse bajo          | Optimiza imágenes, lazy load, minifica CSS/JS       |
| Search Console no indexa | Verifica robots.txt permite crawl                   |

---

## 📝 Notas Finales

> Esta guía está diseñada para ser **reutilizable**. Cada vez que hagas un nuevo proyecto Astro:
>
> 1. Reemplaza `PROJECT_NAME`, `DOMAIN`, etc.
> 2. Sigue las fases en orden
> 3. Usa los checklists
> 4. Referencia cuando tengas dudas

**Tiempo total típico:** 30-60 minutos (desde dev listo hasta indexación iniciada)

---

Hecho con ❤️ para devs que quieren lancements sin drama.
