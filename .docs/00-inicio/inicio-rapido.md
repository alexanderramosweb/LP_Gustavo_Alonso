# 🚀 Guía de Inicio Rápido: Checklist Pre-Vuelo

Cada vez que descargues este Starter Kit para iniciar una nueva landing page, sigue este checklist en orden para asegurar que tu entorno local esté limpio, desvinculado de la plantilla y con el sistema de diseño configurado antes de empezar a copiar componentes.

---

## 1. ✂️ Cortar el "Cordón Umbilical" con GitHub

Al clonar el proyecto utilizando Git, la copia local en tu computadora vendrá conectada por defecto al repositorio central de tu plantilla en GitHub. Si realizas cambios en los colores o agregas código de un cliente y ejecutas un comando de subida, correrías el riesgo de sobrescribir y "ensuciar" tu Starter Kit limpio.

Para evitar esto, debes borrar por completo la memoria de Git de esta nueva carpeta e iniciar un historial totalmente vacío e independiente. Ejecuta estos comandos en tu terminal:

```bash

rm -rf .git

git init

*Al hacer esto, tu proyecto local se convierte en un lienzo totalmente nuevo. Cuando decidas respaldarlo en la nube, simplemente crearás un repositorio nuevo en GitHub (por ejemplo, landing-cliente-x) y lo conectarás allí.*

---

## 2. 🟢 Verificar el Entorno Local (Node.js)

Astro es un framework moderno y rápido, pero para funcionar correctamente necesita que tu computadora ejecute una versión de Node.js que cumpla con sus requisitos técnicos mínimos. Antes de instalar cualquier paquete, verifica qué versión tienes activa ejecutando este comando en tu terminal:

node -v

* Requisito Mínimo: Node.js v18.14.1 o versiones superiores.
* Recomendación: Se sugiere utilizar versiones estables a largo plazo como v20 o v22 LTS.
* Tip de productividad: Si en la raíz de tu proyecto manejas un archivo .nvmrc para registrar la versión exacta de Node, simplemente ejecuta el comando "nvm use" antes de continuar.

---

## 3. 📦 Instalación Limpia y Estricta de Dependencias

Cuando trabajas con plantillas, es fundamental asegurarte de que las librerías se instalen exactamente en las mismas versiones estables en las que configuraste tu Starter Kit.

En lugar de utilizar el comando tradicional "npm install" (que podría intentar buscar y descargar versiones más recientes en internet y potencialmente romper algo), utilizaremos una instalación limpia basada estrictamente en tu archivo de bloqueo package-lock.json. Ejecuta:

npm ci

*Nota técnica: El comando "npm ci" (Clean Install) elimina automáticamente cualquier carpeta node_modules que exista previamente y descarga de forma exacta y ultrarrápida lo que guardaste en tu plantilla, garantizando que el proyecto funcione idéntico en cualquier computadora.*

---

## 4. 🎨 Setear el Sistema de Diseño (Colores y Fuentes)

Una de las mayores ventajas de este Starter Kit es que la arquitectura de carpetas, el archivo BaseLayout.astro y la página principal index.astro se mantienen completamente limpios y libres de código basura. Tu primer trabajo real con el proyecto será adaptar la identidad visual del nuevo cliente.

Debes configurar esto antes de empezar a armar la estructura de la landing page:

* Tipografías y Fuentes: Si el cliente utiliza fuentes personalizadas de Google Fonts, añade las etiquetas de enlace  dentro del espacio  en tu archivo src/layouts/BaseLayout.astro. Si usas archivos de fuentes locales, asegúrate de ubicarlos en la carpeta public/fonts/ o src/styles/fonts/ y declararlos correctamente mediante reglas @font-face en tu CSS.
* Variables Globales de Color: Dirígete a tu archivo de estilos globales principal (por ejemplo, src/styles/global.css o tu archivo de configuración de Tailwind CSS si lo utilizas) y reemplaza los códigos hexadecimales por la paleta de colores de la nueva marca dentro de tu declaración :root:

:root {
--primary: #nuevo-color-cliente;
--secondary: #nuevo-color-secundario;
--font-base: 'Nueva Fuente Cliente', sans-serif;
}

*¿Por qué hacemos esto al principio? Porque todos los bloques de construcción y componentes que tienes guardados en tu carpeta .docs están programados para consumir estas variables. Al configurarlas ahora, cada componente que copies y pegues más adelante de tus archivos Markdown adoptará de forma automática e inmediata el estilo visual del cliente.*

---

## 5. 🔍 Chequeo de Sintaxis, Tipos y Rutas

Antes de lanzar el entorno de desarrollo, es una excelente práctica pedirle a Astro que analice la salud general de la arquitectura del proyecto. Esto te asegura que no haya archivos corruptos, enlaces rotos o errores de importación silenciosos:

npx astro check

*Este comando revisará todos tus archivos .astro (y código TypeScript si lo implementas). Si la terminal te devuelve un mensaje limpio y sin errores en rojo, significa que tu estructura base goza de perfecta salud.*

---

## 6. 🚀 Encender el Servidor de Desarrollo Local

Si todos los pasos anteriores se encuentran en verde, has completado con éxito la preparación pre-vuelo. Ya puedes encender los motores del framework y levantar tu entorno local de maquetación con el siguiente comando:

npm run dev

Una vez ejecutado, la terminal te indicará la dirección local. Abre tu navegador web e ingresa a:
👉 http://localhost:4321

¡Listo! Tienes un lienzo completamente en blanco, configurado con la marca del cliente y preparado para recibir contenido.

---

## 🔄 Flujo de Trabajo Posterior: Construyendo con Legos

A partir de este momento, tu flujo de trabajo diario para armar la landing page será el siguiente:

1. Deja el servidor local corriendo en una pestaña de tu terminal (npm run dev) para ver los cambios en tiempo real.
2. Abre el archivo principal del sitio ubicado en src/pages/index.astro.
3. Navega por la carpeta .docs/ de tu proyecto y abre los archivos .md correspondientes a las secciones que necesites (por ejemplo, Hero.md, Beneficios.md, Formulario.md, Footer.md).
4. Selecciona el código del componente, cópialo y pégalo dentro de tu index.astro siguiendo el orden de la estructura de la landing.
5. Guarda el archivo y observa cómo la sección aparece en tu navegador adaptada instantáneamente con los colores globales que definiste en el paso 4.

```

```

```
