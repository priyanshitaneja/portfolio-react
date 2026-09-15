import {
  EB_Garamond,
  Cinzel,
  Pinyon_Script,
  Bodoni_Moda,
  Poppins,
  Montserrat,
} from 'next/font/google';

/*
 * next/font generates hashed family names, so they cannot be written into a
 * static stylesheet. Each family is exposed as a CSS variable here, and
 * theme-variables.css maps *roles* (--font-body, --font-nav, ...) onto these.
 * That indirection is why no component stylesheet had to change.
 *
 * Every .variable class must land on <html>, including the preload: false
 * ones. Custom properties resolve on the element where they are declared, and
 * --font-body is declared on html[data-theme=...]. If a family's variable were
 * only defined further down the tree the lookup would fail, and an unresolved
 * var() makes the whole font-family declaration invalid at computed-value time
 * — it does not fall back to the next family in the stack, it silently
 * inherits. preload controls network cost, not variable scope.
 */

/* ── poetcore, the default theme: eager ── */

/*
 * italic is not optional. poetcore.css sets `font-style: italic` globally, so
 * italic is the actual rendering path for the entire site. Without it the
 * browser synthesises italic by shearing the roman glyphs, and EB Garamond's
 * true italic is a completely different letterform design. Nothing errors when
 * this is wrong, which is exactly why it is called out here.
 */
export const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-eb-garamond',
});

export const cinzel = Cinzel({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cinzel',
});

/* ── poetcore, but rarely rendered: no preload ── */

// Only consumer is the 404 heading. Not worth a preload on every route.
export const pinyonScript = Pinyon_Script({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  preload: false,
  variable: '--font-pinyon',
});

// --font-accent currently has no consumer in any stylesheet. Kept because the
// poetcore work will give it one; costs nothing until something renders in it.
export const bodoniModa = Bodoni_Moda({
  subsets: ['latin'],
  display: 'swap',
  preload: false,
  variable: '--font-bodoni',
});

/* ── dark-minimal, not the default theme: no preload ── */

/*
 * preload: false suppresses the <link rel="preload"> but still ships the
 * @font-face rules. Browsers only fetch a font file when a rendered element
 * matches it, so under poetcore these cost a few hundred bytes of CSS and no
 * network. The instant the toggle flips, they load from our own origin.
 *
 * Previously both were fetched from fonts.gstatic.com on every single first
 * paint and never rendered, because dark-minimal is not the default.
 */

// Poppins is served as static weights only — omitting `weight` fails the build.
// Weights match what index.html requested, to keep dark-minimal rendering
// identical. (themes.ts asks for a 200 that was never fetched and is currently
// synthesised; correcting that is a visual change, so it is left alone here.)
export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700'],
  display: 'swap',
  preload: false,
  variable: '--font-poppins',
});

export const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  preload: false,
  variable: '--font-montserrat',
});

export const fontVariables = [
  ebGaramond.variable,
  cinzel.variable,
  pinyonScript.variable,
  bodoniModa.variable,
  poppins.variable,
  montserrat.variable,
].join(' ');
