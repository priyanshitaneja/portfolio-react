import { EB_Garamond, Instrument_Serif } from 'next/font/google';

/*
 * next/font generates hashed family names, so they cannot be written into a
 * static stylesheet. Each family is exposed as a CSS variable here, and
 * globals.css maps *roles* (--font-display, --font-text) onto these. That
 * indirection is why swapping five families out below required touching only
 * the role declarations, not the components.
 *
 * Every .variable class must land on <html>, including the preload: false
 * ones. Custom properties resolve on the element where they are declared, and
 * the roles are declared on :root. If a family's variable were only defined
 * further down the tree the lookup would fail, and an unresolved var() makes
 * the whole font-family declaration invalid at computed-value time — it does
 * not fall back to the next family in the stack, it silently inherits.
 * preload controls network cost, not variable scope.
 */

/* ── Text: EB Garamond ── */

/*
 * Roman is the whole site now that the global `font-style: italic` is gone, so
 * it is the only text face worth a preload.
 */
export const garamond = EB_Garamond({
  subsets: ['latin'],
  style: ['normal'],
  display: 'swap',
  variable: '--font-garamond',
});

/*
 * The same family, declared a second time, purely so preload: false can apply
 * to the italic alone.
 *
 * preload in next/font/google is per *call*, not per style: declaring
 * style: ['normal', 'italic'] in one call preloads both files. That is where
 * 44 kB of the old 115 kB preload went — fetching a true italic on every route
 * to render <em> on pages that had none, because the site set font-style:
 * italic globally and every glyph took the italic path.
 *
 * The @font-face rules still ship, a few hundred bytes of CSS. The file is
 * only fetched when something actually renders italic.
 */
export const garamondItalic = EB_Garamond({
  subsets: ['latin'],
  style: ['italic'],
  display: 'swap',
  preload: false,
  variable: '--font-garamond-italic',
});

/* ── Display: Instrument Serif ── */

/*
 * Replaces Pinyon Script (--font-heading) and Cinzel (--font-heading-alt).
 * A high-contrast editorial display face at 14.7 kB latin, against 25 kB for
 * Cinzel alone; Playfair Display was 37 kB and Fraunces 65 kB for the same
 * job. It is unusable below roughly 24px, which is a feature here — it makes
 * the display/text split structural rather than a matter of discipline.
 */
export const instrument = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-instrument',
});

export const instrumentItalic = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['italic'],
  display: 'swap',
  preload: false,
  variable: '--font-instrument-italic',
});

/*
 * Dropped: Cinzel (inscriptional caps, reads as luxury spa rather than
 * editorial), Pinyon Script (a script face whose only consumer was the 404
 * heading), Bodoni Moda (--font-accent, which never had a consumer), and
 * Poppins and Montserrat, which existed only for the dark-minimal theme that
 * no longer exists. That also takes roughly 900 kB of non-preloaded woff2 out
 * of the deploy artifact.
 */
export const fontVariables = [
  garamond.variable,
  garamondItalic.variable,
  instrument.variable,
  instrumentItalic.variable,
].join(' ');
