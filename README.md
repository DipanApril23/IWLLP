# Innerwork Advisors LLP — Next.js Rebuild

Rebuild of https://innerworkadvisorsllp.com in Next.js (App Router), migrating
from the original Create React App project at
https://github.com/arpanghosh2416/iwallp

## Stack

- Next.js 16 (App Router, TypeScript)
- Tailwind CSS v4
- lucide-react (icons)
- clsx + tailwind-merge (`cn()` helper)

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Project structure

```
src/
  app/                 Routes (App Router)
    layout.tsx          Root layout — Header/Footer/metadata
    page.tsx             Home
    about/page.tsx        About
    services/page.tsx      Services listing
    services/[slug]/page.tsx  Service detail (data-driven)
    contact/page.tsx        Contact page
    contact/ContactForm.tsx  Client-side form (not wired to a backend yet)
    globals.css          Tailwind + global styles
  components/
    layout/              Header, Footer, Container
    home/                 Homepage sections (Hero, ServicesOverview, ...)
    ui/                   Small reusable primitives (Button, SectionHeading)
  data/                 Content as data (site.ts, nav.ts, services.ts)
  lib/                  Utilities (cn helper)
  types/                Shared TS types
public/
  images/               Static assets (empty — add exported images here)
```

## Migration checklist

- [ ] Replace placeholder copy in `src/data/site.ts` and `src/data/services.ts`
      with the real content from the live site / old repo.
- [ ] Export and add real images/logo into `public/images`, reference them
      with `next/image`.
- [ ] Wire `ContactForm` to a real backend (API route, Resend/Formspree, or CRM).
- [ ] Add a mobile nav menu in `Header.tsx`.
- [ ] Bring over any additional pages/sections from the old site (testimonials,
      blog/case studies, team bios) as new components + routes.
- [ ] Add real Open Graph image and favicon.
- [ ] Set `NEXT_PUBLIC_SITE_URL` / env vars per `.env.example` as needed.

## Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — lint
