# CRA → Next.js App Router

Migration plan for priyanshitaneja.com. Written before any migration code, to be
reviewed and approved first.

## Why

Create React App was deprecated by the React team in February 2025 and has no active
maintainers. The current build still works on Node 24 — `react-scripts` 5.0.1 ships
webpack ≥5.64, which avoids the OpenSSL hash bug that breaks older CRA on modern Node —
so this is a latent risk rather than a live break.

The pressing problem is different: the site is client-rendered with no prerendering, so
the document served to crawlers and link-preview bots is an empty shell. Before this
work started, the string "priyanshi" appeared exactly once in the entire built
document — inside `<title>`.

Two of the three original problems are already fixed on CRA, ahead of this migration:

| | Status |
|---|---|
| Boilerplate metadata, no OG tags, no sitemap | Fixed — commit `c2c3de3` |
| `/products` placeholder in production | Fixed — commit `f52ea74` |
| Social links with no accessible name | Fixed — commit `0cefd66` |
| 2s render block on the loader timeline | Fixed — commit `f338adf` |
| **Empty document for crawlers** | **This migration** |
| **No per-route metadata** | **This migration** |

## Scope

Plumbing only. No copy, project description, date, employer name or metric changes.
Visual design is preserved, including the poetcore theme and the theme toggle.

Out of scope, tracked separately: case studies, the poetcore aesthetic work, nav
redesign, illustration.

---

## 1. Routing: react-router → App Router

`src/App.js` and `BrowserRouter` disappear. Routes become directories.

| Today | After | Notes |
|---|---|---|
| `/` → `Homepage` | `app/page.tsx` | |
| `/about` → `Homepage` | — | 308 → `/`. Duplicate content today: two URLs, one component. |
| `/work` → `Work` | `app/work/page.tsx` | |
| `/projects` → `Projects` | `app/projects/page.tsx` | |
| `/contact` → `Contact` | `app/contact/page.tsx` | |
| `*` → `Error404` | `app/not-found.tsx` | Serves a real HTTP 404, which the SPA catch-all never did |
| `/products` | — | Already deleted |

The `/about` redirect lives in `next.config.ts` `redirects()` with `permanent: true`
(308), not in `vercel.json` — it stays host-agnostic. The Header's "About" link
repoints to `/`.

Three cleanups fall out of deleting `App.js`: the stale `exact` prop (a v6 no-op), and
`<Routes className="routes">` — `Routes` does not accept `className`, so the `.routes`
height rules in `index.css` have never applied to anything.

**Output mode:** default Vercel output, **not** `output: 'export'`. Static export
silently ignores `redirects()`, which would drop the `/about` fix, and it breaks the 404
status semantics of `not-found.tsx`. Every route is still prerendered at build time —
verified by every route showing `○ (Static)` in the build output.

## 2. The GSAP loader

It survives, non-blocking, as decided. It already reached its final form on CRA in
`f338adf`; the migration only moves it.

- Lives in `app/layout.tsx`, not in a page, so it plays once per hard load rather than
  replaying on every client-side navigation.
- `'use client'`, since it needs `useEffect` and GSAP.
- **It renders in the static HTML deliberately.** The alternative — mounting it only
  after hydration — produces a worse artifact: content paints, then an opaque panel
  slams over it 200–600ms later and fades. That is a strobe, not a loader.
- No hydration mismatch: initial state is identical on server and client. Nothing about
  what renders may be derived from `window`, `matchMedia`, or `typeof window` — all
  three produce a different server tree and force React to throw away the prerendered
  HTML.
- Accessibility preserved: `role="status"`, the `.sr-only` text, and the
  `prefers-reduced-motion` early exit. Reduced motion is handled in **CSS**, so the DOM
  is byte-identical either way and there is nothing to mismatch on; the `matchMedia`
  check in the effect only skips building the timeline.
- GSAP stays a static import. A dynamic `import()` adds a round trip that would race the
  3s CSS failsafe.

## 3. antd: replaced

Three live usages (a fourth, `SpinnerLoader`, is dead code being deleted):

| Component | Today | After |
|---|---|---|
| Work page | `Timeline` | `<ol>` + CSS |
| Work page | `Collapse` | `<details>` / `<summary>` |
| ProjectCard | `Card` | `<article>` |
| ProjectCard | `@ant-design/icons` | Inlined SVG |

Roughly 65 kB gzip across two lazy chunks. Native `<details>` gives keyboard and screen
reader support with no JavaScript, which antd's div-based widgets do not.

Visual target is close, not pixel-identical — antd's exact paddings, easing curves and
ripple will differ slightly. That was an explicit trade.

`ProjectCard`'s action buttons become real `<a href target rel>` instead of `onClick` +
`window.open`. This matters beyond correctness: it keeps `/work` and `/projects` at
**zero page JavaScript**, which is the single largest bundle win available here. Making
`ProjectCard` a client component for a click handler would give that away.

## 4. Fonts: self-hosted via `next/font`

Six families, three third-party origins, currently all render-blocking or runtime-injected.

`next/font` generates hashed family names, so they cannot be written into a static CSS
file. Two layers solve this:

1. `app/fonts.ts` declares each family and exposes it as a CSS variable.
2. `theme-variables.css` maps *roles* (`--font-body`, `--font-nav`, …) onto those variables.

**No component stylesheet changes.** All nine `var(--font-*)` consumers keep working
verbatim. `next/font` owns what a family is; the theme file owns which role uses it;
components consume roles.

| Family | Used by | Loading |
|---|---|---|
| EB Garamond | poetcore body + nav | eager, preloaded |
| Cinzel | poetcore homepage `h2` | eager, preloaded |
| Pinyon Script | poetcore headings — renders only on 404 | `preload: false` |
| Bodoni Moda | `--font-accent` | `preload: false` |
| Poppins | dark-minimal only | `preload: false` |
| Montserrat | dark-minimal only | `preload: false` |

`preload: false` suppresses the preload link but still ships `@font-face`. Browsers only
fetch a font file when a rendered element matches it, so these cost nothing until they
are actually used, then load instantly from our own origin. Today Poppins and Montserrat
are downloaded from `fonts.gstatic.com` on **every** first paint and never rendered,
because dark-minimal is not the default theme.

Two facts worth recording, since neither is visible from `themes.js`:

- **Bodoni Moda has no consumer.** `--font-accent` is defined in both theme blocks and
  read by zero stylesheets. It is kept because the poetcore work will give it one.
- **Pinyon Script renders only on the 404 page.** `Designation` sets `--font-heading` on
  its `h1, h2` group rule, then overrides both two lines later. The site's signature
  calligraphic face currently appears on exactly one route.

**EB Garamond must load its italic face.** `poetcore.css` sets `font-style: italic`
globally, so italic is the actual rendering path for the whole site. If only the roman
face is loaded, the browser fakes italic by shearing the glyphs — EB Garamond's true
italic is a completely different letterform design, and nothing errors when this goes
wrong.

## 5. Sass and global CSS

Sass stays. Component stylesheets keep their current `import './index.scss'` pattern
untouched — App Router permits global stylesheet imports from any component, so the
Pages Router restriction that would have forced a rewrite does not apply.

**No CSS Modules.** `poetcore.css` reaches into component internals through six global
class selectors (`.project_card`, `.nav_link`, `.cl-sq--fa i`, `.app-content-enter`).
Hashing those class names breaks every one of them *silently*. Every class in this repo
is already unique, so modules would prevent collisions that do not exist.

`globals.css` is imported once, in `app/layout.tsx`, and stays plain CSS rather than
`.scss` so its `@import`s remain build-time CSS imports rather than deprecated Sass ones.
Parent-layout CSS is always emitted before child-segment CSS, so cascade-sensitive rules
belong there — and the component layer already relies on specificity rather than source
order, which is an invariant worth preserving.

### The universal selector

`src/index.css` sets `background-color` and `color` on `*`. It is replaced with explicit
`html` / `body` rules.

This is not cosmetic. `* { color: … }` *declares* colour on every element including
every `<path>`, and a declaration at zero specificity still beats an inherited value. The
moment `<i class="fa-...">` becomes `<svg fill="currentColor">`, MainLoader's five brand
colours and SkillsList's muted grey all collapse to `--color-text`.

**So removing `*` and inlining the icons must land in the same commit.** This is the one
place the one-concern-per-commit rule cannot hold, and the commit message will say so.

Removing it also lets six `!important` overrides in `MainLoader/index.css` and a block in
`ProjectCard/index.scss` be deleted, and it unblocks surface hierarchy later —
`--color-bg-alt` currently has zero consumers because `*` paints everything the same.

## 6. Icons

The FontAwesome CDN stylesheet is replaced with inlined SVGs. Measured cost today:

| | Size |
|---|---|
| `all.min.css` (render-blocking) | 75.7 kB (21.0 kB gzip) |
| `fa-brands-400.woff2` | 107 kB |
| `fa-solid-900.woff2` | 112 kB |
| **Total** | **~240 kB**, none of it in the build output |

22 icons in use — 17 brands, 5 solid — across `SkillsList`, `MainLoader`, `ThemeToggle`
and `Error404`. All 22 verified present in the free 7.2.0 manifest, so nothing is broken
today; this is purely weight.

Two traps:

- `fa-2xl` and `fa-bounce` are **utility classes, not icons**. They need CSS
  reimplementation. FontAwesome ships a `prefers-reduced-motion` guard for `fa-bounce`
  that would be silently lost by hand-rolling it.
- `SkillsList/index.scss` has 19 `i:nth-child(N)` rules driving a staggered entrance.
  Switching `<i>` to `<svg>` breaks every one of them with no error. The type selector
  changes and the icons must stay direct siblings in the same order.

## 7. Metadata

Per-route via the Metadata API, with `metadataBase` and a title template in the root
layout. Canonical origin is `https://www.priyanshitaneja.com` — the apex 307-redirects
to `www`, verified against the live site.

| Route | Title | Description |
|---|---|---|
| `/` | Priyanshi Taneja — AI Frontend Engineer | AI Frontend Engineer building React and TypeScript interfaces for fintech and e-commerce, with a focus on web performance and accessibility. |
| `/work` | Work Experience | Frontend engineering roles since 2020 — Oriserve, Anatta and Novo — spanning conversational AI, e-commerce performance work and fintech product development. |
| `/projects` | Projects | Selected frontend projects: AI tools, e-commerce builds and interface experiments in React, TypeScript and JavaScript. |
| `/contact` | Contact | Get in touch with Priyanshi Taneja — LinkedIn, GitHub and email. |
| 404 | 404 — Page Not Found | `robots: noindex` |

`app/sitemap.ts` and `app/robots.ts` replace the static files. The sitemap lists the four
real routes — not `/about`, which redirects, and not `/products`, which is gone.

`not-found.tsx` takes a static `metadata` export; async `generateMetadata` is not
supported there.

## 8. Theme

Today an inline script sets `data-theme="poetcore"` before paint, because CRA's
`index.html` is a fixed template and React does not own `<html>`.

In App Router we own `<html>`, so the attribute is server-rendered straight into the
prerendered HTML. No script, no flash, no hydration mismatch, and it works with
JavaScript disabled.

**A latent bug gets fixed here.** `theme-variables.css` currently keys its base block as
`html, html[data-theme="dark-minimal"]`, so a bare `<html>` *is* dark-minimal. If that
inline script had ever failed, the site would have rendered black with no fonts. The base
block is re-keyed to poetcore, and `--font-heading-alt` gets defined in both theme blocks
rather than relying on a fallback that resolves by accident.

`theme-transitions-enabled` moves from a class to a `data-` attribute, because `<html>`'s
`className` now belongs to React — it carries the `next/font` variables.

Theme **persistence** is deliberately a separate commit after the migration. It is about
ten lines, and it is the point at which a pre-paint inline script becomes genuinely
load-bearing: the prerendered HTML is theme-agnostic, and only the browser knows the
stored value. That script will be a raw inline `<script>`, not `next/script
beforeInteractive` — only the former has a spec-level guarantee of running before paint,
and `beforeInteractive` behaves differently in `next dev` than in production, which makes
"I verified no flash locally" meaningless.

## 9. TypeScript

Full conversion, `strict: true`. The surface is small and the conversion is clean: no
complex generics, and the only real prop shapes are `ProjectCard` and `SocialIcon`.

It also resolves two hazards for free: `prop-types` and `SocialIcon.defaultProps`
(`defaultProps` on function components is removed in React 19, which Next 15 ships).

`src/assets/data.js` contains JSX and must be renamed `.tsx` or the compiler will not
parse it.

## 10. Analytics

GA4 `G-05E6B86LJ9` moves to `@next/third-parties/google`. Besides loading non-blocking,
this fixes something the current inline snippet gets wrong: it does not track pageviews
on client-side navigation, so every route change after the first is currently invisible.

## 11. Dead code

Unreferenced, deleted: `NameSvg/` (which also removes any need for `@svgr/webpack`, since
it uses CRA's `ReactComponent` SVGR import that Next does not support), `ComingSoon/`,
`SpinnerLoader/`, `pages/Projects/DrumKit/`, `assets/images/name.svg` (31 kB),
`assets/images/realTimeClock.png` (174 kB), plus the CRA scaffolding `App.test.js`,
`setupTests.js` and `reportWebVitals.js`. `App.test.js` is the untouched default asserting
a "learn react" link, so `npm test` fails today.

---

## Commit sequence

One concern per commit, with the single documented exception in step 6.

```
3a  scaffold Next + TypeScript + next.config
3b  port routes and components to App Router
3c  fonts via next/font + theme-variables re-key
3d  per-route metadata + sitemap.ts + robots.ts
3e  GA via @next/third-parties
3f  remove `*` + inline 22 SVG icons     ← two concerns, unavoidably
3g  remove antd
3h  delete dead code
3i  CI performance budget
4   theme persistence
```

## Verification

Run after each commit; report numbers, not assertions.

1. `curl` each route and grep for real content, not just `<title>`.
2. View-source shows a real description and complete OG tags per route.
3. Lighthouse on the production build — Performance, Accessibility, Best Practices, SEO.
4. axe on all five routes, zero critical violations.
5. Every route resolves; `/about` returns 308; unknown paths return a real 404 status.
6. Theme toggle works, no flash on load, re-tested with JavaScript disabled.
7. Bundle size before and after.
8. Build output shows `○ (Static)` for every route.

### Baseline

Measured on the CRA production build at `95b54cd`, before any of this work.

| | Raw | Gzip |
|---|---|---|
| JS (10 chunks) | 490 kB | 162 kB |
| CSS (6 files) | 22 kB | 5 kB |
| Entry chunk | 251 kB | 85 kB |
| Build dir | 6.3 MB | |

Plus ~240 kB of FontAwesome and six font families from three third-party origins, none of
it counted above.

Lighthouse, mobile preset, and page timings on the production build:

| | at `95b54cd` | after stages 0 + 2 | target after migration |
|---|---|---|---|
| Performance | 75 | 90 | ≥95 |
| Accessibility | 95 | 100 | 100 |
| Best Practices | 100 | 100 | 100 |
| SEO | 100 | 100 | 100 |
| LCP | 5.3 s | 3.0 s | — |
| Content in DOM | 2239 ms | ~270 ms | in initial HTML |

Note that Lighthouse SEO scored 100 while the meta description still read "Web site
created using create-react-app". The audit checks that a description exists, not whether
it is useful. The real SEO problem this migration fixes does not appear in that number.

## Open items

- ~~**CI budget.**~~ Done. `.github/workflows/perf.yml` runs typecheck, unit tests,
  build, a gzip bundle-size assertion, Lighthouse CI and axe on pull requests and on
  pushes to `main`. Thresholds in `scripts/check-bundle-size.mjs` are set from measured
  numbers, as proposed.
- **Vercel settings.** The project builds CRA and outputs `build/`; Next outputs `.next`.
  If the Framework Preset is pinned to Create React App rather than Auto-detect, the
  first deploy after merge fails. Preset = Next.js, Build Command and Output Directory
  cleared, Node 24.x.

  **This happened.** The preset was not changed before #18 merged, and the production
  deploy for `319614d` failed exactly as described. The previous CRA deployment keeps
  serving, so the site is up but stale — priyanshitaneja.com still returns the old
  bundle. Fixing the preset and redeploying is the outstanding action; nothing in the
  repo can do it.
