# Corevia Systems Pvt Ltd Website

A modern, premium static company website built with **React + Vite + Tailwind CSS** for **Corevia Systems Pvt Ltd**.

## Tech Stack

- React 18
- Vite 5
- Tailwind CSS 3
- Lucide React Icons

## Features

- Fully responsive landing page (mobile + desktop)
- Hero, About, Services, Tech Stack, Projects, Testimonials, Contact, Footer sections
- SEO-ready metadata + dynamic meta updates in app
- `robots.txt` and `sitemap.xml`
- GA4 integration + event tracking hooks
- Dark mode toggle with localStorage persistence
- Functional contact form with Formspree support and mailto fallback
- Floating WhatsApp CTA

## Environment Variables

Create a `.env` file in the project root:

```bash
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id
```

- `VITE_GA_MEASUREMENT_ID` is required for production analytics.
- `VITE_FORMSPREE_ENDPOINT` is optional; if omitted, the form uses mailto fallback.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Build for production

```bash
npm run build
npm run preview
```

## Deploy on Vercel

1. Push this project to GitHub.
2. Import the repo in [vercel.com](https://vercel.com).
3. Framework preset: **Vite**.
4. Build command: `npm run build`
5. Output directory: `dist`
6. Add env vars from above in Vercel Project Settings → Environment Variables.
7. Click deploy.

Domain can then be connected to `coreviasystems.io` in Vercel project settings.
