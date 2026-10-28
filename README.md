# Bizpedia Tech — Website

Marketing website for **Bizpedia Tech Private Limited** — *Ideas to Intelligence. Intelligence to Impact.*

Built with Next.js 16 (App Router, TypeScript), Tailwind CSS 4, GSAP + ScrollTrigger, React Three Fiber + Drei, Motion for React and Lucide icons. All page copy comes from `Bizpedia_Tech_Final_Website_Content.pdf`; the visual direction follows `Bizpedia Tech Futuristic Landing Page.png` and `Bizpedia Tech Brand Identity Showcase.png` (all three are kept in the project root).

## Getting started

Requires Node.js 20.9 or newer (developed on Node 22).

```bash
npm install
cp .env.example .env.local   # then edit values
npm run dev                  # http://localhost:3000
```

> **iCloud Drive note:** this folder sits on an iCloud-synced Desktop. To stop iCloud from syncing (and locking) tens of thousands of dependency files, `node_modules` and `.next` are real folders named `node_modules.nosync` and `.next.nosync`, with symlinks under the usual names. If you reinstall, recreate them the same way, or move the project to a folder iCloud doesn't sync (e.g. `~/Developer`).

Other scripts:

| Command | What it does |
| --- | --- |
| `npm run build` | Production build (every page is pre-rendered statically except `/api/contact`) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint (Next.js core-web-vitals + TypeScript rules) |
| `npm run typecheck` | TypeScript check |

## Pages

| Route | Source |
| --- | --- |
| `/` | Homepage: 3D robot hero, About intro, pinned "From Idea to Impact" journey, services, industries, demonstrations, why us, CTA |
| `/services` | Services overview |
| `/services/[slug]` | 7 service pages (`ai-automation`, `ai-machine-learning`, `custom-software-development`, `saas-product-development`, `web-mobile-development`, `data-analytics-business-intelligence`, `ai-video-creative`) |
| `/about`, `/how-we-work`, `/industries`, `/our-work`, `/engagement-models`, `/contact`, `/faq`, `/insights` | Company pages |
| `/privacy-policy`, `/terms-of-service` | Placeholders (no-index) — see below |
| `/sitemap.xml`, `/robots.txt`, `/opengraph-image` | Generated SEO assets |

## Project structure

```
src/
  app/                 Routes, metadata, sitemap, robots, OG image, contact API route
  content/             All approved copy (site.ts, services.ts, pages.ts) — edit text here
  components/
    layout/            Header (with services menu + mobile menu), footer, logo, theme toggle
    home/              Homepage sections (Hero, ProcessJourney, ServicesBento, …)
    three/RobotScene   The interactive 3D robot + holographic globe (lazy-loaded)
    demos/             Simulated demonstrations (document, knowledge assistant, lead workflow)
    visuals/           Page-specific illustrations (service art, iso cubes, timeline, dial, …)
    forms/             Contact form
    ui/                Buttons, reveal animations, accordion, page hero, CTA band, …
  lib/                 SEO helpers and the shared contact form schema (zod)
public/brand/          Logo mark SVG
```

## Design notes

- **Themes:** dark (default) and light, toggled from the header and remembered per visitor. Colours are CSS variables in `src/app/globals.css`; sections with `tone-invert` flip to the opposite palette so both themes keep the dark/light rhythm of the reference design.
- **3D hero:** the robot is built procedurally in React Three Fiber (no external model file), so it loads fast and is fully themable. It follows the pointer, reacts to hover (head and globe), idles gently, pauses rendering when scrolled off-screen, falls back to a static glow when WebGL is unavailable, and renders a still frame when the visitor prefers reduced motion. To swap in a production GLB model later, replace the `Head`/`Body` groups in `RobotScene.tsx` with a `useGLTF` model and keep the rig, lighting and globe.
- **Motion:** GSAP ScrollTrigger drives the pinned homepage journey and the How We Work timeline; Motion handles UI transitions. Above-the-fold headings use CSS animations so content is visible before JavaScript hydrates. `prefers-reduced-motion` disables pinning and most animation.
- **Accessibility:** semantic landmarks, one H1 per page, skip link, keyboard-operable menus/accordions/tabs, labelled form fields with announced errors, visible focus styles.

## Functionality that needs external services or verified details

1. **Contact form delivery** (`src/app/api/contact/route.ts`). The form validates on the client and server, but enquiries must be delivered somewhere. Set **one** of:
   - `CONTACT_WEBHOOK_URL` — the enquiry is POSTed as JSON to your webhook (Zapier, Make, n8n, a CRM, …), or
   - `RESEND_API_KEY` + `CONTACT_TO_EMAIL` (and optionally `CONTACT_FROM_EMAIL` on a verified domain) — sent by email via [Resend](https://resend.com).

   With neither set, the form shows a clear "not connected yet" message and **does not** claim the enquiry was sent. For local development only, `CONTACT_DELIVERY=log` prints enquiries to the server console and shows the success state (this is what `.env.local` is set to). The built-in rate limiter is in-memory; on serverless or multi-instance hosting, add a shared limiter (e.g. Upstash) or a CAPTCHA if spam becomes an issue.
2. **Contact details.** The content document leaves the email, phone and office location as placeholders. Add verified values in `src/content/site.ts` (`site.contact`) and they will appear on the Contact page.
3. **Privacy Policy and Terms of Service.** Deliberately not written — the content document says not to publish invented legal text. Both pages are placeholders marked `noindex`. Replace them with reviewed documents that reflect the actual form, cookies, analytics and providers.
4. **Site URL.** Set `NEXT_PUBLIC_SITE_URL` to the production domain so canonical URLs, the sitemap, Open Graph tags and structured data are correct.
5. **Insights.** The page lists the approved categories and an "articles on the way" state. Publish articles only once they are written.
6. **Demonstrations** on `/our-work` and the homepage run entirely in the browser with sample data and are labelled as simulated. They are not connected to any AI service.
7. **Before launch,** per the content document: confirm each listed service is offered, keep demonstrations labelled as such, and add no unverified statistics, clients or testimonials.

## Content that is UI wording rather than from the content document

A few short labels were needed for the interface and are not in the approved copy: navigation/aria labels, form option lists (timeline choices), validation and status messages, the "Simulated · sample data" badges, sample data inside the demos, the Insights empty state, the legal placeholder sentence, the 404 page, and small decorative labels in illustrations (e.g. "Your goals / Your people / Your processes" on the homepage, taken from the About copy). Review these alongside the rest of the copy.
