# Innerwork Advisors LLP — Next.js Rebuild

Rebuild of https://innerworkadvisorsllp.com in Next.js (App Router), migrating
from the original Create React App project at
https://github.com/arpanghosh2416/iwallp

Live: https://iwllp.vercel.app

## Stack

- Next.js 16 (App Router, TypeScript)
- Tailwind CSS v4
- next/font (Montserrat for headings, Inter for body — self-hosted at build time)
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
  app/                      Routes (App Router)
    layout.tsx               Root layout — fonts, Header/Footer, metadata
    page.tsx                 Home
    about/page.tsx           About
    services/page.tsx        Services listing
    services/[slug]/page.tsx Service detail (data-driven)
    contact/page.tsx         Contact
    contact/ContactForm.tsx  Client form (not wired to a backend yet)
  components/
    layout/                  Header, Footer, Container
    home/                    Home sections (Hero, MissionVisionValues, WhatWeDo, Team,
                             Certificates, ContactBand…)
                             Pillars renders inside Team, not as its own section
    ui/                      Primitives (Button, SectionHeading, Icon)
  data/
    content/*.json           Editable copy — every string on the site
    config/*.json            Developer settings (image host, timings)
    *.ts                     Thin typed loaders over those two folders
    index.ts                 Barrel — components import from "@/data"
  lib/                       Helpers (cn, interpolate, parseEmphasis)
  styles/
    globals.css              Entry point; imports only
    theme.css                Design tokens Tailwind turns into utilities
    base.css                 Element defaults + custom properties
    animations.css           Shared @keyframes
    components/*.css         One file per component that needs real CSS
public/                      No images — see below
```

### Three rules the codebase follows

**1. No copy in components.** Every user-facing string — headings, body copy,
button labels, even the carousel's accessibility labels — lives in
`src/data/content/*.json`. Components read it through the `@/data` barrel and
never import a JSON file directly, so the shape of the content is decided in
one place.

Copy can carry `{token}` placeholders (`"Call {phone}…"`, `"© {year} {name}…"`)
filled by `interpolate()`, and `**bold**` markers parsed by `parseEmphasis()`
— so an editor never hand-writes markup or segment arrays.

**2. No inline CSS.** No `style={{…}}` and no arbitrary-value Tailwind
brackets. Layout and spacing stay as utilities next to the markup; anything
needing real CSS (fluid `clamp()` type, gradients, keyframes, hover
choreography) lives in `src/styles/components/`.

**3. Content vs config.** `content/` is what an editor changes — copy, image
filenames, alt text. `config/` is deployment and behaviour — the image host,
autoplay intervals, swipe thresholds. Mixing the two is how a content file
becomes a config file nobody wants to touch.

### Images

Nothing is bundled: every image is served from the host in
`src/data/config/images.json`, and the content JSON stores only a bare
filename. `next/image` optimises them, so the remote host is allow-listed in
`next.config.ts`. Moving to a different host or CDN is one line.

There are two base URLs because there are two directories on the account:

| Key | Directory | Holds |
|---|---|---|
| `baseUrl` | `images/` | Photographs uploaded for this rebuild — hero slides, panels, section backgrounds |
| `mediaBaseUrl` | `static/media/` | Assets the original Create React App build left behind, such as the team group photo |

## Editing content

| Change | File |
|---|---|
| Company name, phone, email, address | `data/content/site.json` |
| Nav links, header button | `data/content/nav.json` |
| Hero heading, slide images, CTAs | `data/content/hero.json` |
| Mission / Vision / Values panels | `data/content/mission-vision-values.json` |
| "What We Do" band and its cards | `data/content/what-we-do.json` |
| "Our Team" band, photo and caption | `data/content/team.json` |
| "The Pillars" member cards | `data/content/pillars.json` |
| Certificates and their details | `data/content/certificates.json` |
| "Your Trusted Partner" contact band | `data/content/contact-band.json` |
| Why-choose-us points, closing CTA | `data/content/home.json` |
| Service list and detail pages | `data/content/services.json` |
| About / Contact page copy, form fields | `data/content/about.json`, `contact.json` |
| Footer column titles, copyright | `data/content/footer.json` |
| Image host | `data/config/images.json` |
| Carousel timings | `data/config/hero.json`, `what-we-do.json`, `pillars.json`, `certificates.json` |
| How much of the certificate wall shows before "show all" (grid only - below 40rem it is a swipeable track) | `data/config/certificates.json` |
| Enquiry form URL and ids | `data/config/contact-band.json` |

## Still to do

- [ ] Replace the demo copy in `what-we-do.json` (cards 3–5) with real service copy.
- [ ] Point the hero's "Book a Consultation" CTA at a real booking page.
- [ ] Wire `ContactForm` to a backend (API route, Resend/Formspree, or CRM).
- [ ] Add a mobile nav menu — below `md` the header shows only the logo.
- [ ] Fill the hero's reserved `chatbotSlot` with the chatbot wizard.
- [ ] Bring over remaining pages/sections (NRI, Careers, testimonials).
- [ ] Complete three Pillars bios. The live site truncates Asish Mittal,
      Susanta Dhar and Samrat Dutta mid-sentence ("…multi-sector…",
      "…anti-te…", "…investigat…"), so `pillars.json` carries only the part
      that was readable, cut at the last complete clause rather than guessed at.
- [ ] Decide what "Know More" should do. The original puts that button on every
      Pillars card; it is left out here because there is nothing behind it yet —
      the bios are one or two sentences. Supply longer profiles and it can open
      a dialog, or become `/team/[slug]` pages built the way `/services/[slug]`
      already is.
- [ ] The enquiry form's frame is sized by the widget host's own resizer
      (`form_embed.js`, iframe-resizer underneath). That iframe must never be
      given `loading="lazy"`: the resizer hides the frame while it initialises,
      a hidden frame never reaches the viewport, and a lazy one then never
      requests its source at all - the form simply does not appear. The CSS
      floors in `styles/components/contact-band.css` are only the fallback for
      a blocked script, and they stop applying once the resizer stamps
      `data-iframe-resizer-initialized="true"` on the frame.
- [ ] The closing `CtaSection` ("Need a discreet consultation? -> Contact us")
      now sits below a working contact form, and `WhyChooseUs` sits between
      them. Worth deciding whether the contact band should be the last section
      instead.
- [ ] Verify two certificate reference numbers in `certificates.json`, read off
      the scans: APDI `CM-APDI/417` and ISO `902385/2026/R`. The CAPSI and
      WBRERA numbers were not legible enough to transcribe, so their
      `reference` fields are empty and the dialog omits the row.
- [ ] Deepak Kumar Dutta has a portrait on the host
      (`images/members/Mr-Deepak-Kumar-Dutta-500x500.webp`) but does not appear
      in the live carousel and has no bio, so he is not in `pillars.json`.
- [ ] Add a real Open Graph image.

## Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — lint
