import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

/* Header is a client component that reads the current route. Stubbing the hook
   is the whole point of the unit: the mapping from pathname to active state is
   the logic, and App Router navigation is not. */
const mockPathname = vi.fn<() => string>();
vi.mock('next/navigation', () => ({ usePathname: () => mockPathname() }));

import Header from './index';
import { ThemeProvider } from '@/theme/ThemeContext';

/* Header nests ThemeToggle, which calls useTheme, so the provider is part of
   the unit whether or not the nav logic cares about it. */
const renderHeader = () =>
  render(
    <ThemeProvider>
      <Header />
    </ThemeProvider>
  );

describe('Header', () => {
  it('exposes the nav as a named landmark', () => {
    mockPathname.mockReturnValue('/');
    renderHeader();
    /* The <header>/<nav> pair is what satisfies axe's `region` rule; a plain
       <ul> put every link outside a landmark. */
    expect(screen.getByRole('navigation', { name: 'Main' })).toBeDefined();
    expect(screen.getByRole('banner')).toBeDefined();
  });

  it('marks exactly the current route with aria-current', () => {
    mockPathname.mockReturnValue('/work');
    renderHeader();

    const current = screen.getAllByRole('link').filter(
      (a) => a.getAttribute('aria-current') === 'page'
    );
    expect(current).toHaveLength(1);
    expect(current[0].getAttribute('href')).toBe('/work');
  });

  it('adds the active class only to the current route', () => {
    mockPathname.mockReturnValue('/projects');
    renderHeader();

    const active = screen.getAllByRole('link').filter((a) =>
      a.className.split(' ').includes('active')
    );
    expect(active).toHaveLength(1);
    expect(active[0].getAttribute('href')).toBe('/projects');
  });

  it('marks nothing current on a route that is not in the nav', () => {
    /* /404 and any future unlisted route: no link should claim to be current. */
    mockPathname.mockReturnValue('/nowhere');
    renderHeader();
    expect(
      screen.getAllByRole('link').filter((a) => a.hasAttribute('aria-current'))
    ).toHaveLength(0);
  });
});
