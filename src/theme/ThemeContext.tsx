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

/*
 * The runtime Google Fonts <link> injection that used to live here is gone.
 * Every family is self-hosted through next/font and its CSS variable is always
 * defined on <html>, so switching theme only re-resolves --font-* and the
 * browser fetches the new faces from our own origin on demand.
 */

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeId] = useState<ThemeId>(DEFAULT_THEME);

  const theme = getTheme(themeId);

  const setTheme = useCallback((id: string) => {
    const newTheme = getTheme(id);
    setThemeId(newTheme.id);
    applyThemeToDOM(newTheme.id);
  }, []);

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
