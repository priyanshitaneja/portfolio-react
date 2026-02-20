import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { getTheme, getThemeIds, DEFAULT_THEME } from './themes';

const ThemeContext = createContext(null);

function applyThemeToDOM(themeId) {
  document.documentElement.setAttribute('data-theme', themeId);
}

function loadGoogleFonts(theme) {
  if (!theme.googleFonts || theme.googleFonts.length === 0) {
    // Remove any previously injected theme font links
    document.querySelectorAll('link[data-theme-fonts]').forEach((el) => el.remove());
    return;
  }

  const href = `https://fonts.googleapis.com/css2?${theme.googleFonts
    .map((f) => `family=${f}`)
    .join('&')}&display=swap`;

  // Don't inject if an identical link already exists
  const existing = document.querySelector('link[data-theme-fonts]');
  if (existing && existing.href === href) return;

  // Remove stale theme font links before adding new one
  document.querySelectorAll('link[data-theme-fonts]').forEach((el) => el.remove());

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  link.setAttribute('data-theme-fonts', 'true');
  document.head.appendChild(link);
}

export function ThemeProvider({ children }) {
  const [themeId, setThemeId] = useState(DEFAULT_THEME);

  const theme = getTheme(themeId);

  const setTheme = useCallback((id) => {
    const newTheme = getTheme(id);
    setThemeId(newTheme.id);
    applyThemeToDOM(newTheme.id);
    loadGoogleFonts(newTheme);
  }, []);

  // Apply theme on mount
  useEffect(() => {
    applyThemeToDOM(themeId);
    loadGoogleFonts(getTheme(themeId));
  }, [themeId]);

  // Enable transitions after first paint
  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.documentElement.classList.add('theme-transitions-enabled');
      });
    });
  }, []);

  const value = {
    themeId,
    theme,
    setTheme,
    themes: getThemeIds().map(getTheme),
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
}
