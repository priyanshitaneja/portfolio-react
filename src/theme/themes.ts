/*
 * Theme identity only.
 *
 * This module used to carry full colour, font, fontWeight and `extra` maps for
 * both themes — a duplicate of theme-variables.css that nothing read. The CSS
 * custom properties are the single source of truth for what a theme looks
 * like; this file just names the themes and fixes their order.
 */

export type ThemeId = 'poetcore' | 'dark-minimal';

export const DEFAULT_THEME: ThemeId = 'poetcore';

/* Order determines the toggle's cycle. */
const THEME_IDS: readonly ThemeId[] = ['poetcore', 'dark-minimal'];

export function getThemeIds(): readonly ThemeId[] {
  return THEME_IDS;
}

export function isThemeId(id: string): id is ThemeId {
  return (THEME_IDS as readonly string[]).includes(id);
}
