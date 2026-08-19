'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react';
import { DEFAULT_THEME, isThemeId, type ThemeId } from './themes';

type ThemeContextValue = {
  themeId: ThemeId;
  setTheme: (id: string) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

/*
 * The runtime Google Fonts <link> injection that used to live here is gone.
 * Every family is self-hosted through next/font and its CSS variable is always
 * defined on <html>, so switching theme only re-resolves --font-* and the
 * browser fetches the new faces from our own origin on demand.
 */

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeId] = useState<ThemeId>(DEFAULT_THEME);

  const setTheme = useCallback((id: string) => {
    const next = isThemeId(id) ? id : DEFAULT_THEME;
    setThemeId(next);
    document.documentElement.setAttribute('data-theme', next);
  }, []);

  /*
   * Enable transitions after first paint, so a cold load doesn't animate from
   * the default palette. This is a data attribute rather than a class because
   * <html>'s className belongs to React — it carries the next/font variables —
   * and a stray classList.add would be clobbered on re-render.
   */
  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.documentElement.dataset.themeTransitions = 'on';
      });
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ themeId, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
}
