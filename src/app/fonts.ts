import { Inter } from 'next/font/google';

/*
 * One family, two roles.
 *
 * next/font generates hashed family names, so they cannot be written into a
 * static stylesheet. The family is exposed as a CSS variable here and
 * tokens/type.css maps roles (--font-display, --font-text) onto it. That
 * indirection is why the entire typeface changed without touching a component.
 *
 * Inter Tight was the obvious pick for the display role — a genuinely narrower
 * cut drawn for large sizes. It cost 43.9 kB of additional preload on every
 * route, taking the total to 91.2 kB against a 75 kB budget, to do a job that
 * --tracking-display: -0.035em already does on the family that was loading
 * anyway. The hero headline is the LCP element on the homepage, so preload
 * weight here is the thing most directly in front of a first-time visitor.
 *
 * Inter is variable, so the weight axis is continuous and the 500/600/700 the
 * design uses cost nothing beyond this one file.
 */
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const fontVariables = inter.variable;
