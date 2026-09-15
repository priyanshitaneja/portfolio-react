import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';

import { ThemeProvider, useTheme, THEME_STORAGE_KEY } from './ThemeContext';
import { DEFAULT_THEME } from './themes';

/*
 * The provider's contract is narrow but load-bearing: it must never read
 * localStorage during render (that would desync the prerendered tree from the
 * first client render), and it must never trust what it reads back, since
 * localStorage is user-writable.
 */

function Probe() {
  const { themeId, setTheme } = useTheme();
  return (
    <>
      <span data-testid="theme">{themeId}</span>
      <button onClick={() => setTheme('dark-minimal')}>dark</button>
      <button onClick={() => setTheme('not-a-theme')}>bogus</button>
    </>
  );
}

const renderProvider = () =>
  render(
    <ThemeProvider>
      <Probe />
    </ThemeProvider>
  );

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('adopts a valid stored theme on mount', () => {
    /* Applied by an effect rather than during render — reading storage in
       render would desync the prerendered tree from the first client render.
       render() flushes effects, so the adopted value is visible by now. */
    localStorage.setItem(THEME_STORAGE_KEY, 'dark-minimal');
    renderProvider();
    expect(screen.getByTestId('theme').textContent).toBe('dark-minimal');
  });

  it('ignores a stored value that is not a known theme', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'chartreuse');
    renderProvider();
    expect(screen.getByTestId('theme').textContent).toBe(DEFAULT_THEME);
  });

  it('persists a chosen theme and mirrors it onto <html>', () => {
    renderProvider();
    act(() => screen.getByText('dark').click());

    expect(screen.getByTestId('theme').textContent).toBe('dark-minimal');
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark-minimal');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark-minimal');
  });

  it('falls back to the default when asked for an unknown theme', () => {
    renderProvider();
    act(() => screen.getByText('bogus').click());

    expect(screen.getByTestId('theme').textContent).toBe(DEFAULT_THEME);
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe(DEFAULT_THEME);
  });

  it('still switches theme when localStorage throws', () => {
    /* Private mode, or a full quota. The toggle must keep working for the
       visit even though the choice cannot be remembered. */
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceededError');
    });

    renderProvider();
    expect(() => act(() => screen.getByText('dark').click())).not.toThrow();
    expect(screen.getByTestId('theme').textContent).toBe('dark-minimal');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark-minimal');
  });

  it('throws if useTheme is used outside a provider', () => {
    const quiet = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<Probe />)).toThrow(/within a ThemeProvider/);
    quiet.mockRestore();
  });
});
