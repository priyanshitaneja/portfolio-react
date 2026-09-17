import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import Header from './index';

describe('Header', () => {
  it('exposes the nav as a named landmark', () => {
    render(<Header />);
    /* The <header>/<nav> pair is what satisfies axe's `region` rule; a plain
       <ul> put every link outside a landmark. */
    expect(screen.getByRole('navigation', { name: 'Sections' })).toBeDefined();
    expect(screen.getByRole('banner')).toBeDefined();
  });

  it('links to in-page sections, not routes', () => {
    render(<Header />);
    const hrefs = screen
      .getAllByRole('link')
      .map((a) => a.getAttribute('href'));
    /* Every target is a fragment. A route href here would 404 on the
       single-page document, and would do it silently. */
    expect(hrefs.every((h) => h?.startsWith('#'))).toBe(true);
    expect(hrefs).toContain('#work');
    expect(hrefs).toContain('#lab');
    expect(hrefs).toContain('#contact');
  });

  it('marks nothing as the current page', () => {
    /* There is one page, so no link can be "current". aria-current on an
       in-page anchor would be a lie. */
    render(<Header />);
    expect(
      screen.getAllByRole('link').filter((a) => a.hasAttribute('aria-current'))
    ).toHaveLength(0);
  });
});
