# Atlas — Design & Engineering Agency Site

The marketing site and case-study portfolio for **Atlas**, a design & engineering agency. Light-industrial visual system — dot-matrix display type, mono spec labels, safety-orange signal color — built around an AI-native product pipeline.

## Highlights

- **Industrial brand system** — Handjet dot-matrix display type, JetBrains Mono labels, safety-orange (`#ff5c00`) signal color on a bone background
- **Live 3D face mesh hero** — MediaPipe canonical face model assembling from a neural network, tracking the visitor's cursor
- **Cinematic motion** — Framer Motion reveals, magnetic buttons, scroll-driven sections, Lenis smooth scroll
- **Fully responsive** — mobile, tablet, and desktop layouts
- **Deep case studies** — Alpha Arena (fintech) and BitWise (crypto)

## Tech Stack

React 19 · Vite 8 · Framer Motion 12 · React Router 7 · Lenis · Lucide

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Deployed via Vercel (`vercel.json` handles SPA rewrites for case-study routes).
