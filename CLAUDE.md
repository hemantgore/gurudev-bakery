# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Gurudev Bakery — a Next.js 16 (App Router) website for a Maharashtra-based bakery. Features a bilingual UI (English/Marathi), a product catalog, and a contact form backed by Resend email delivery.

## Commands

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run lint         # ESLint
npm run test         # Run all tests with Vitest
npm run test:ui      # Vitest browser UI
npm run test:coverage  # Coverage report
npm run optimize-images  # Compress images via scripts/optimize-images.js
```

Run a single test file:
```bash
npx vitest run src/app/[locale]/contact/__tests__/contact.test.tsx
```

## Environment Variables

Copy `.env.local.example` to `.env.local` and fill in:
- `RESEND_API_KEY` — Resend API key for email delivery
- `CONTACT_EMAIL` — destination address for contact form submissions

## Architecture

### Routing & i18n
- All user-facing pages live under `src/app/[locale]/` — the `[locale]` segment is either `en` or `mr`
- `src/middleware.ts` intercepts all requests and redirects to the correct locale via `next-intl`
- Locale config is centralised in `src/i18n/routing.ts`; message files are in `messages/en.json` and `messages/mr.json`
- Navigation helpers (`Link`, `redirect`, `useRouter`) must be imported from `@/i18n/routing`, not from `next/navigation`, to preserve locale prefixes

### Data Layer
- Product data is a static array exported from `src/lib/products.ts` (planned CMS replacement). Each `Product` has bilingual `name`/`nameMr` and `description`/`descriptionMr` fields plus a `category` union type
- SEO structured data (JSON-LD `LocalBusiness` schema) is generated in `src/lib/structured-data.ts` and injected in the locale layout

### Contact API
- `src/app/api/contact/route.ts` — single `POST` handler; validates fields, then sends email via Resend
- No CAPTCHA middleware in the route itself; captcha logic lives in the contact page component (`src/app/[locale]/contact/page.tsx`)

### Component Organisation
- `src/components/layout/` — `Header`, `Footer` (global chrome)
- `src/components/sections/` — full-page sections (`Hero`, `FeaturedProducts`, `AboutSnippet`, `GoogleReviews`)
- `src/components/common/` — reusable pieces (`ProductCard`, `SearchBar`, `CategoryFilter`, `LanguageSwitcher`)

### Testing
- Vitest + jsdom + React Testing Library; setup file at `src/test/setup.ts`
- Tests co-located under `__tests__/` directories beside the feature they test
- `@` path alias resolves to `src/` (configured in both `tsconfig.json` and `vitest.config.ts`)

### Motion & 3D
- Reusable motion primitives live under `src/components/motion/` (RevealOnScroll, TiltCard, MagneticButton, SplitText, Marquee, ParallaxImage, BentoGrid). Compose these instead of re-implementing framer-motion patterns inline.
- The R3F hero (`src/components/3d/HeroScene.tsx`) keeps four mitigations against dev-mode WebGL context loss: explicit `gl.setClearColor(0, 0)`, a `webglcontextlost` listener that remounts via `mountKey`, a `CanvasErrorBoundary`, and a pure-CSS fallback. Preserve all four — they look unnecessary in prod but cover Turbopack HMR + Strict Mode remounts in dev.
- `SplitText` uses a small fade+rise animation, not `y: 110%` with `overflow-hidden` — that pattern clips descenders ('g', 'p', 'y') on serif fonts like Fraunces.
- All animations respect `prefers-reduced-motion` via `globals.css` + `SmoothScrollProvider`. Don't add a second guard in components.

## Gotchas

- **Fraunces** (the display serif) has no Devanagari glyphs. Marathi `/mr/*` headlines fall back to Noto Sans Devanagari already in the font stack — don't apply `font-display` to Devanagari-only strings if you want a serif feel.
- **`react-hooks/purity`** lints `Math.random()` at render-time. For deterministic-enough randomness in WebGL setup, use a seeded LCG like `buildSprinkles` in `HeroScene.tsx`.
- **Pre-existing test debt** (not regressions): `contact.test.tsx` blur-validation tests fail because `useForm` defaults to `mode: 'onSubmit'`; `route.test.ts` expects `onboarding@resend.dev` but the route sends from `noreply@gurudevbakery.com` and there's no `fetch` mock. Fixing requires `mode: 'onTouched'` on the form and a `global.fetch = vi.fn(...)` in tests — don't chase as regressions.

### Test mocking
- `contact.test.tsx` mocks `framer-motion` with a `Proxy` so any `motion.<tag>` works. Any new test touching the redesigned UI should copy that mock — a `motion.div`-only mock will render `motion.span`/`motion.button` as `undefined`.
