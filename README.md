# gabyletter

Carta de amor interactiva — storybook digital, mobile-first, desplegable en Azure Static Web Apps.

---

## Correr en local

```bash
npm install
npm run dev
```

Abre `http://localhost:5173` en el navegador. Para prueba real en iPhone: expón con `--host` y abre en el dispositivo conectado a la misma red.

```bash
npm run dev -- --host
```

---

## Agregar o editar páginas

Todo el contenido vive en **`src/content.ts`**. Cada página tiene esta forma:

```ts
{
  id: number,
  media: {
    type: 'image' | 'video',
    src: '/media/nombre-del-archivo.jpg',  // ruta relativa a /public
    alt?: 'descripción accesible',
  },
  text: 'Texto de la página.\nSalto de línea con \\n.',
  effect?: 'petals' | 'sparkles' | 'none',  // efecto visual opcional
}
```

Para editar la portada, la pregunta final y el cue:

```ts
export const recipientName = 'Gaby';         // nombre en la portada
export const finalQuestion = '¿...?';        // se tipea letra por letra al final
export const finalCue = 'Levanta la mirada.'; // aparece después de la pregunta
```

---

## Archivos de media

Colocar en **`public/media/`**. Convenciones recomendadas:

| Tipo | Formato | Tamaño sugerido | Notas |
|------|---------|-----------------|-------|
| Imágenes | JPEG / WebP | 1080 × 1920 px, ≤ 400 KB | Orientación vertical (portrait) |
| Videos | MP4 H.264, AAC | 1080 × 1920 px, **≤ 3 MB**, 3–6 s | Deben ser cortos y en loop |

Si un video falla al cargar, la app busca automáticamente un fallback con el mismo nombre pero extensión `.jpg` (p.ej. `page-3.mp4` → `page-3.jpg`).

---

## Deploy a Azure Static Web Apps

### 1. Crear el recurso en Azure

**Desde el portal de Azure:**
Portal → Crear recurso → Static Web App → completar formulario (plan Free es suficiente para este caso de uso personal).

**O vía Azure CLI (comando listo para copiar):**

```bash
az staticwebapp create \
  --name gabyletter \
  --resource-group mi-resource-group \
  --location "East US 2" \
  --sku Free \
  --source https://github.com/tu-usuario/gabyletter-vicgital \
  --branch main \
  --app-location "/" \
  --output-location "dist" \
  --login-with-github
```

> El flag `--login-with-github` abre el flujo OAuth para conectar el repositorio. Si preferís conectarlo manualmente, omitilo y vinculalo desde el portal después.

### 2. Obtener el deployment token

En el portal de Azure → tu recurso Static Web App → **Settings → Deployment tokens** (o en Overview → Manage deployment token).

Copiá el token completo.

### 3. Agregar el secret en GitHub

Repositorio en GitHub → **Settings → Secrets and variables → Actions → New repository secret**

- **Name:** `AZURE_STATIC_WEB_APPS_API_TOKEN`
- **Value:** el token copiado en el paso anterior

### 4. Push a main

El workflow en `.github/workflows/azure-static-web-apps.yml` corre automáticamente en cada push a `main`. También crea y destruye staging environments en pull requests.

El build corre `npm run build` (output en `dist/`) y el deploy lo maneja la action oficial `Azure/static-web-apps-deploy@v1`.

> **Tier Free de Azure SWA** incluye 100 GB de ancho de banda/mes y SSL automático — más que suficiente para un sitio personal con tráfico mínimo.

### Variables de entorno (por si acaso)

Esta app no usa variables de entorno. Si en algún momento se necesitan, configurarlas en el portal de Azure: Static Web App → **Settings → Configuration → Application settings**.

---

## Stack

- **Vite 5** + **React 18** + **TypeScript 5**
- **Tailwind CSS 3** (tema oscuro forzado)
- **Framer Motion 11** (animaciones, page-turn, texto reveal)
- Canvas API nativo (efectos de pétalos y destellos)
- Sin backend, sin analytics, sin cookies
