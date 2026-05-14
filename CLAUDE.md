# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # dev server (add -- --host to expose on LAN for iPhone testing)
npm run build      # tsc + vite build → dist/
npm run preview    # serve dist/ locally
```

No test suite — this is a single-use personal SPA with no test infrastructure.

## What this is

A mobile-first interactive love letter storybook: a cinematic SPA the recipient reads on an iPhone. No backend, no auth, no analytics. Everything is static.

## Content editing

**`src/content.ts` is the only file that needs editing for content changes.** It exports:

- `recipientName` — shown on the cover
- `pages: PageContent[]` — each page has `media` (image or video), `text` (supports `\n`), and optional `effect: 'petals' | 'sparkles' | 'none'`
- `finalQuestion` — typed letter-by-letter on the final screen
- `finalCue` — appears after the question (e.g. "Levanta la mirada.")

Media files go in `public/media/`. Images: 1080×1920 JPEG ≤400 KB. Videos: MP4 H.264 ≤3 MB, 3–6 s loop. If a video fails to load, `MediaDisplay` falls back to a `.jpg` with the same basename.

## Architecture

### Phase state machine (`App.tsx`)

```
loading → cover → book → final
```

`App.tsx` owns the phase state and the `currentPage` / `direction` integers. Navigation is gated by a 520ms `busy` lock to prevent animation overlap.

### Two AnimatePresence instances (critical)

`App.tsx` uses **two separate `AnimatePresence` instances** — this is intentional and must not be collapsed into one:

1. **z-20, `mode="wait"`** — loading / cover / final — fade transitions between phases
2. **z-10, `mode="sync"`** — book pages — page-turn transitions run simultaneously (enter + exit overlap)

`BookPage` must be a **direct `motion.*` child** of its `AnimatePresence`. Any wrapper component around it must NOT introduce a `motion.div` — it breaks AnimatePresence's exit detection. `BookStage.tsx` exists but is unused; `BookPage` is rendered directly.

### Page-turn animation

`BookPage` uses Framer Motion `variants` with a `custom` prop (the `direction` integer ±1). The same `custom` value must be set on both `<AnimatePresence custom={direction}>` AND `<motion.div custom={direction}>` — AnimatePresence propagates `custom` to the *exit* variant; the component's own `custom` prop drives the *initial* variant.

Swipe detection uses `onPanEnd` (not `drag`) — this avoids the spring-back animation fighting the exit transition.

### Safari iOS constraints

- `Cover.tsx` flap animation uses `WebkitPerspective`, `WebkitTransformStyle`, `WebkitBackfaceVisibility` alongside standard properties. These must be kept.
- Videos require `autoPlay muted loop playsInline` — all four attributes.
- `navigator.vibrate` is silently unsupported on iOS; the `haptic()` util guards with `'vibrate' in navigator`.
- Layout uses `100dvh` and `env(safe-area-inset-*)` for notch-aware sizing.

### Visual design constants

Palette (not in Tailwind config as variables — used inline):
- `#0a0a0a` / `#141414` / `#1a1a1a` — backgrounds
- `#f5f1e8` — cream text
- `#c9a961` — gold (accents, microcopy, decorative lines)
- `#8b2c4e` — rose (all interactive elements: buttons, progress dots, page-crease shadow)
- `#7a1f2b` — burgundy (wax seal on the cover only)

The `.breathe` CSS class (defined in `index.css`) gives interactive buttons a slow scale pulse. The `.ken-burns` class triggers the image zoom animation — it re-triggers on each page mount because each `BookPage` is unmounted/remounted by AnimatePresence.

### Effects

`PetalEffect` and `SparkleEffect` render on a Canvas 2D overlay (`position: fixed`, `z-index: 20`, `pointer-events: none`). They use `requestAnimationFrame` loops and clean up on unmount. The canvas is sized to `window.innerWidth/Height` at mount — they don't handle resize.

## Deploy

Deploy target is **Azure Static Web Apps Free tier**. Config: `staticwebapp.config.json` (SPA fallback, long-cache headers for `/media/*` and `/assets/*`). CI: `.github/workflows/azure-static-web-apps.yml` requires the `AZURE_STATIC_WEB_APPS_API_TOKEN` repository secret. Build output is `dist/`.
