# Design rules

The contract for this site's visual layer. Read it before changing anything
under `src/styles`, and update it when a rule changes.

Two things make this worth keeping. CI asserts Lighthouse **accessibility =
1.0** and **SEO = 1.0** on every route, so several of the rules below are build
gates rather than preferences. And most of them were learned by breaking
something — those are marked **Trap**, with what actually went wrong.

---

## Direction

White ground, near-black ink, one red. Square corners, rules instead of boxes,
no shadows. Nothing else carries colour, which is what makes the red mean
something when it appears.

**It is a document, not a landing page.** One page, read top to bottom. This is
the rule most likely to erode, because every instinct for "improving" a
homepage pushes back toward marketing. The banned patterns, each of which was
built once and removed:

| Don't | Because |
|---|---|
| A display-size statement above the fold | That is a hero. Headings are reading-size; `h1` is `--step-3`. |
| A row of large figures with rules over them | That is a stats band. Figures go inline, against the thing they measure. |
| A filled primary button beside a ghost secondary | That is a CTA pair. Links are links. |
| An uppercase eyebrow over each section | That is section-labelling from a brochure. A heading and a rule is enough. |
| Short punchy one-metric sentences | That is feature-benefit copy. Write the sentence the work deserves. |

Restraint is the whole idea. If a change needs a second accent, a gradient, a
shadow or a rounded corner to work, the change is wrong.

### Structure

One route: `/`. `/work`, `/lab`, `/contact`, `/projects` and `/about` all 308
to it, and the nav is in-page fragments. Case study pages are the only
additional routes planned.

The `h1` is the name. Sections (`Work`, `Lab`, `Education`, `Contact`) are
`h2`. Company names and lab entries are `h3` — `Timeline` takes the level as a
prop, because the correct level depends on what is above the component, not on
the component.

---

## Colour — `src/styles/tokens/color.css`

Computed with the WCAG 2.x relative-luminance formula against all four grounds.

| | `--paper` | `--paper-raised` | `--paper-sunken` | `--paper-deep` |
|---|---|---|---|---|
| `--ink` `#0A0A0A` | 19.80 | 18.14 | 16.57 | 14.95 |
| `--ink-body` `#2B2B2B` | 14.16 | 12.97 | 11.85 | 10.69 |
| `--ink-muted` `#595959` | 7.00 | 6.42 | 5.86 | 5.29 |
| `--clay` `#D62828` | 5.01 | 4.59 | **4.19 ✗** | **3.78 ✗** |
| `--clay-deep` `#B31E1E` | 6.73 | 6.16 | 5.63 | 5.08 |
| `--clay-press` `#8F1717` | 9.12 | 8.35 | 7.63 | 6.88 |

**Rules**

1. Components consume **roles** (`--fg`, `--link`, `--focus-ring`), never the
   palette directly. The palette is an implementation detail of the roles.
2. **`--clay` is a fill and ornament colour only** — rules, dots, underlines,
   button backgrounds, markers. Any red *text* uses `--clay-deep`, on any
   ground.
3. Hover **raises** contrast, never lowers it. `--link-hover` is darker than
   `--link`, not lighter.
4. `--rule` is 1.99:1 and decorative. A border that carries meaning on its own
   needs 3:1, so it uses an ink.
5. Re-run the matrix when a value changes. There is a one-liner in
   [Verification](#verification).

> **Trap — the same contrast bug has now shipped three times.** A muted tone at
> 3.67:1 on eighteen project cards. An accent at 4.08:1 in the nav. And
> `p { opacity: 0.8 }`, which composited `--color-link` down to 4.08:1 and
> failed axe on all four routes the moment a link appeared inside a `<p>`.
> **Never fake a tone with `opacity`.** A faded colour is a colour; give it a
> token. axe factors element opacity into its foreground computation.

---

## Type — `src/styles/tokens/type.css`

One family: **Inter**, variable, `--font-inter`, filling both `--font-display`
and `--font-text`. `--font-mono` is the system stack and costs nothing.

- Fluid scale `--step--2` … `--step-7`, for a 360 → 1440px viewport. Body is
  `--step-0`, 16 → 17px.
- Headings sit three steps lower than a marketing layout would put them: `h1`
  `--step-3`, `h2` `--step-1`, `h3` `--step-0`. Hierarchy is carried by weight
  and by the rule above each section, which costs no vertical space.
- Weights: `--fw-display: 700`, `--fw-heading: 600`. A grotesk carries
  hierarchy through weight; the previous serif carried it through size alone.
- Tracking is **optical compensation, not style**: letterfit correct at 17px is
  visibly loose at 72px. `--tracking-display: -0.035em`.
- `text-wrap: balance` on headings, `text-wrap: pretty` on paragraphs.
- Measure: `--measure` 66ch for prose, `--measure-lede` 44ch, and the hero
  statement is capped at 17ch.

**Rules**

1. Never a raw `px` font size. Use a step.
2. Every `clamp()` preferred value carries a **`rem` term as well as `vw`**. A
   pure-`vw` scale does not respond to browser zoom, which fails WCAG 1.4.4.
3. `.u-figures` (tabular lining numerals) on anything meant to be compared
   down a column.
4. One uppercase role: `.u-caps`, mono, `--tracking-caps`. Nothing else is
   uppercased.

> **Trap — `preload` in `next/font/google` is per *call*, not per *style*.**
> `style: ['normal', 'italic']` in one call preloads both files. That was 44 kB
> spent on every route. Split a family across two calls to apply
> `preload: false` to one style.
>
> **Trap — a second family is expensive.** Inter Tight for the display role
> cost 43.9 kB and took preloaded fonts to 91.2 kB against a 75 kB budget, to
> do what `--tracking-display` already does. The budget is now **55 kB**, which
> forces that to be a decision.

---

## Space, radius, elevation — `src/styles/tokens/space.css`

Fluid spacing `--space-3xs` … `--space-4xl`; `--space-3xl` is the section
rhythm. `--shell-max` 72rem, `--shell-prose` 40rem.

**Rules**

1. **Radii are 0.** `--radius-pill` survives for genuinely circular things.
   Rounding a corner is a softening gesture and this direction does not soften.
2. **No shadows.** Depth comes from rule weight and surface tone. The
   `--shadow-*` tokens stay defined but unused, so reintroducing one is a
   decision rather than an invention.
3. Every page section sits on `.shell`, including the header. Nothing sets its
   own measure.

> **Trap — breakpoints cannot be custom properties.** `@media (min-width:
> var(--x))` is invalid CSS: media features are evaluated before the cascade
> runs. Breakpoints are Sass, in `src/styles/_breakpoints.scss`, used via
> `@include mq(md)`.

---

## Motion — `src/styles/base/motion.css`

Scroll reveals use CSS scroll-driven animations. Route transitions use React's
`<ViewTransition>` over the browser View Transitions API. **No animation
library** — `motion` was measured at 6.2 kB plus a 14.1 kB feature chunk to do
a job the platform now does for zero bytes.

**Rules**

1. **Never animate `opacity`.** Transform only. See the trap below.
2. **Nothing in the first viewport reveals.** The first timeline company and
   the first lab entry are explicitly excluded.
3. Author **finished-state-first**: the resting state is the element's normal
   state, and the animation lives inside
   `@supports (animation-timeline: view())`. Firefox still has these behind a
   flag; no-JS, reduced-motion and unsupported browsers must see the content,
   at rest.
4. Reduced motion uses `0.01ms`, not `0`, so `animationend` still fires and
   `both`-filled animations land on their end state.

> **Trap — animating opacity breaks two things at once.** Chrome's LCP
> algorithm discards elements at `opacity: 0`; this repo already delayed LCP
> that way with a loader that parked the `<h1>` at 0 for 350ms. And automated
> contrast checking composites opacity into the foreground colour — an element
> caught mid-fade reported 1.23:1 and took `/lab` to 0.96,
> **non-deterministically**, because it depends on where the animation sits
> when the audit samples it.
>
> **Trap — `::view-transition-*` pseudo-elements are not matched by `*`.** The
> site-wide `prefers-reduced-motion` guard does not reach them. They need their
> own rule, which is easy to miss because everything else is covered.

---

## Structure and accessibility

1. **One `<h1>` per route**, and no skipped levels. Company names on `/work`
   are `h2` because the page `h1` is "Work".
2. Every node lives in a landmark. axe runs with **no `--tags`**, so its
   best-practice rules (`region`, `landmark-one-main`) are live. Lighthouse
   will not catch these — its gatherer runs only `wcag2a`/`wcag2aa`.
3. Prefer the platform: `<details>`/`<summary>` over a JS accordion, real
   `<a>` over `onClick` + `window.open`, a `<dl>` for value/label pairs.
4. Every external link gets `rel="noopener noreferrer"` and an `aria-label`
   ending "(opens in a new tab)". `mailto:` is exempt.
5. Icons are `aria-hidden` unless they are the only content of a control. An
   icon-only list inside a named landmark announces an empty landmark.
6. Interactive targets clear **24×24 CSS px** (WCAG 2.2 `target-size`). An
   inline `<a>` is only as tall as its font metrics, so nav links carry
   vertical padding for that reason, not for looks.

---

## Content

1. **Novo is a fintech, never a bank or a neobank.** It is a business banking
   platform whose deposits are held at a partner bank. This is a compliance
   distinction, not a wording preference.
2. Numbers live in `src/content/metrics.ts` and are referenced by id. Never
   retype a figure into markup.
3. Copy lives in `src/content/`, not in components.
4. No em-dashes in body copy. No "passionate about", "leveraging",
   "seamless", "robust".
5. Tenure is written "since 2020", never as a year count that drifts.

---

## Verification

```bash
lsof -ti:3000 | xargs kill -9          # see the trap below — do this first
npm run typecheck && npm test && npm run build && node scripts/check-bundle-size.mjs
npm run start &
npx wait-on http://localhost:3000
npx @axe-core/cli@4 http://localhost:3000/ --exit
npx @lhci/cli@0.14.x autorun
```

Contrast check for a single pair:

```bash
node -e 'const h=s=>[1,3,5].map(i=>parseInt(s.slice(i,i+2),16));
const L=c=>{const s=c.map(v=>v/255).map(v=>v<=0.03928?v/12.92:((v+0.055)/1.055)**2.4);
return .2126*s[0]+.7152*s[1]+.0722*s[2]};const R=(a,b)=>{const x=L(h(a)),y=L(h(b));
return ((Math.max(x,y)+.05)/(Math.min(x,y)+.05)).toFixed(2)};
console.log(R("#B31E1E","#FFFFFF"))'
```

> **Trap — kill the old server before running Lighthouse. This has now cost
> two separate debugging rounds.** A stale `next start` holding port 3000
> serves the previous build's HTML against the new build's files. Every
> stylesheet 500s, the page renders unstyled, and an unstyled `<a>` is 18px
> tall — so you get a wall of `target-size` and contrast failures that look
> completely plausible and have nothing to do with your change.
>
> **Tell:** `errors-in-console` shows `500` on `/_next/static/chunks/*.css`.
> If you see that, stop reading the other failures; they are all phantoms.
>
> `lsof -ti:3000 | xargs kill -9` before every run.

> **Trap — a redirected URL must not stay in the audit lists.** `/work`,
> `/lab`, `/contact`, `/projects` and `/about` all 308 to `/`. Leaving any of
> them in `lighthouserc.json` or the axe list in `.github/workflows/perf.yml`
> makes Lighthouse follow the redirect, fire the `redirects` audit, and drop
> SEO below the `minScore: 1` assertion — which reads as an unrelated
> regression.

---

## Budgets — `scripts/check-bundle-size.mjs`

| | limit | current |
|---|---|---|
| Client JS (gzip) | 220 kB | 178.7 kB |
| Client CSS (gzip) | 12 kB | 6.6 kB |
| Largest chunk (gzip) | 76 kB | 69.7 kB |
| Preloaded fonts | 55 kB | 47.3 kB |

Raise a limit only in the commit that spends it, with the measured before and
after in the comment.

**Note:** ~42 kB of the client JS total is a `noModule` core-js polyfill bundle
that no module-supporting browser downloads, plus ~3.6 kB reachable only from
`_global-error`. Real modern-browser JS is roughly 141 kB. Summing the chunks
directory overstates what ships by about a quarter.
