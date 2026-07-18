# STARADA

![STARADA preview](public/Starada-preview.png)

Ultra-luxury hypercar and supercar rentals in Morocco. White-glove delivery, private concierge, and a curated fleet of extraordinary machines.

**Live demo:** [https://starada.vivro.dev/](https://starada.vivro.dev/)

**Developed by:** [vivro.dev](https://vivro.dev)

## Stack

- [Next.js](https://nextjs.org) (App Router)
- React 19 + TypeScript
- Tailwind CSS v4 + [shadcn/ui](https://ui.shadcn.com)
- GSAP (`@gsap/react`, ScrollTrigger)
- Zod + React Hook Form

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Optional: set the public site URL for SEO/OG images:

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Scripts

| Command         | Description             |
| --------------- | ----------------------- |
| `npm run dev`   | Start local development |
| `npm run build` | Production build        |
| `npm run start` | Serve production build  |
| `npm run lint`  | Run ESLint              |

## Project structure

```
app/                  # Routes, layout, icons, API
  api/og/             # Dynamic Open Graph image route
  contact/            # Inquiry page
  experience/         # Brand / ritual story
  fleet/              # Full fleet carousel
components/           # UI and page sections
lib/
  fleet-data.ts       # Vehicle catalogue
  site-config.ts      # Brand, contact, geo, OG copy
  seo.ts              # Metadata + JSON-LD helpers
  og.tsx              # OG image renderer
  gsap.ts             # GSAP registration helpers
```

## Key routes

| Path          | Purpose                         |
| ------------- | ------------------------------- |
| `/`           | Home — hero, fleet preview, CTA |
| `/fleet`      | Full fleet showcase             |
| `/experience` | Brand story and values          |
| `/contact`    | Concierge inquiry form          |
| `/api/og`     | Dynamic social share images     |

## Site config

Brand name, contact details, geo, keywords, and per-page Open Graph copy live in `lib/site-config.ts`. SEO helpers in `lib/seo.ts` build metadata and JSON-LD from that config.

## Deploy

Deploy on [Vercel](https://vercel.com). Set `NEXT_PUBLIC_SITE_URL` to your production domain so canonical URLs and OG images resolve correctly.
