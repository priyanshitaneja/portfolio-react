import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import SocialIcon from './index';

/*
 * Icon-only links have no text content, so aria-label is the entire accessible
 * name — an axe link-name violation if it ever goes missing. The target/rel
 * pairing matters just as much: the component used to ship target="_random",
 * which made all three links fight over one named window, with no rel.
 */

const icon = <svg aria-hidden="true" focusable="false" />;

describe('SocialIcon', () => {
  it('names the link from the label and says where it opens', () => {
    render(<SocialIcon icon={icon} url="https://github.com/x" label="GitHub" />);
    const link = screen.getByRole('link', { name: 'GitHub (opens in a new tab)' });
    expect(link.getAttribute('target')).toBe('_blank');
    expect(link.getAttribute('rel')).toBe('noopener noreferrer');
  });

  it('does not open a mailto: in a new tab, and drops the suffix with it', () => {
    /* A mail client is not a browsing context, so the promise the suffix makes
       would be false. */
    render(<SocialIcon icon={icon} url="mailto:a@b.com" label="Email" />);
    const link = screen.getByRole('link', { name: 'Email' });
    expect(link.getAttribute('target')).toBeNull();
    expect(link.getAttribute('rel')).toBeNull();
  });

  it('honours newTab={false} for an http link', () => {
    render(<SocialIcon icon={icon} url="https://example.com" label="Site" newTab={false} />);
    const link = screen.getByRole('link', { name: 'Site' });
    expect(link.getAttribute('target')).toBeNull();
  });

  it('leaves the icon out of the accessible name', () => {
    render(<SocialIcon icon={icon} url="mailto:a@b.com" label="Email" />);
    /* getByRole matches on the computed name, so an aria-hidden icon that
       leaked into it would break this query rather than merely widen it. */
    expect(screen.getByRole('link', { name: 'Email' })).toBeDefined();
  });
});
