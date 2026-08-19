'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react';
import { getTheme, getThemeIds, DEFAULT_THEME, type Theme, type ThemeId } from './themes';

type ThemeContextValue = {
  themeId: ThemeId;
  theme: Theme;
  setTheme: (id: string) => void;
  themes: Theme[];
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyThemeToDOM(themeId: ThemeId) {
  document.documentElement.setAttribute('data-theme', themeId);
}

function loadGoogleFonts(theme: Theme) {
  if (!theme.googleFonts || theme.googleFonts.length === 0) {
    document.querySelectorAll('link[data-theme-fonts]').forEach((el) => el.remove());
    return;
  }

  const href = `https://fonts.googleapis.com/css2?${theme.googleFonts
    .map((f) => `family=${f}`)
    .join('&')}&display=swap`;

  const existing = document.querySelector<HTMLLinkElement>('link[data-theme-fonts]');
  if (existing && existing.href === href) return;

  document.querySelectorAll('link[data-theme-fonts]').forEach((el) => el.remove());

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  link.setAttribute('data-theme-fonts', 'true');
  document.head.appendChild(link);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeId] = useState<ThemeId>(DEFAULT_THEME);

  const theme = getTheme(themeId);

  const setTheme = useCallback((id: string) => {
    const newTheme = getTheme(id);
    setThemeId(newTheme.id);
    applyThemeToDOM(newTheme.id);
    loadGoogleFonts(newTheme);
  }, []);

  /*
   * data-theme is server-rendered on <html> now, so this no longer has to set
   * the initial attribute — it would only rewrite the same value. It stays
   * scoped to loading the theme's fonts.
   */
  useEffect(() => {
    loadGoogleFonts(getTheme(themeId));
  }, [themeId]);

  /*
   * Enable transitions after first paint, so a cold load doesn't animate from
   * the default palette. This is a data attribute rather than a class because
   * <html>'s className now belongs to React — it carries the next/font
   * variables — and a stray classList.add would be clobbered on re-render.
   */
  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.documentElement.dataset.themeTransitions = 'on';
      });
    });
  }, []);

  const value: ThemeContextValue = {
    themeId,
    theme,
    setTheme,
    themes: getThemeIds().map(getTheme),
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
}
