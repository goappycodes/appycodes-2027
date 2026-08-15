# Appycodes 2027 — rebranded website

A fresh Next.js build of the Appycodes marketing site, on the **"Alloy"** design
system: a dark-gradient hero, a graphite→green accent gradient, a repeating
notch motif, a blueprint-grid texture, and an animated particle hero.

## Stack

- **Next.js 16** (App Router, Turbopack), React 19, TypeScript
- Plain CSS design system in `app/globals.css` (no Tailwind) — one set of
  design tokens, five contrast-derived gradient variants, one notch motif
- `next/font` (Archivo) — the "Statement" display face used throughout
- Client-side canvas particle network in `components/hero-particles.tsx`

## Pages

- `/` — homepage (dark hero, outcomes, client logos, showcase, proof, services,
  testimonials, process, founders/discovery-call, writing, CTA)
- `/case-studies/` — index
- `/case-studies/ontick/`, `/case-studies/bloc/`, `/case-studies/yippee-malta/`
  — full case studies, content ported from the existing site
- `/contact/`

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## Design system notes

- **Palette (Alloy):** page `#FFFFFF`, slab `#0E100F`, accent `#5ECD04`,
  gradient `#0E100F → #5ECD04`.
- **Gradient law:** the gradient *fills objects and text*, never washes a page.
  Five variants (`--grad`, `--grad-fill`, `--grad-display`, `--grad-text-light`,
  `--grad-text-dark`) are each derived to clear a 4.5:1 (or 3:1 for large text)
  contrast floor on their own ground, so gradient text never disappears.
- **Motif:** the *notch* — a chamfer on the top-right of every bounded object —
  plus a faint blueprint grid on light sections and a dot-grid on dark slabs.

## Content provenance

Case-study copy and screenshots are ported from the previous Appycodes site.
Recognition badges (Clutch, PeoplePerHour, Google, Glassdoor, AWS, Payoneer)
and client testimonials are the real assets from that build.
