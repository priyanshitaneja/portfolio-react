import { describe, it, expect, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';

import MainLoader from './index';

/* jsdom has no matchMedia, and the component branches on it before doing
   anything else, so the stub is a precondition rather than a convenience. */
function stubReducedMotion(reduce: boolean) {
  vi.stubGlobal(
    'matchMedia',
    vi.fn().mockReturnValue({
      matches: reduce,
      media: '(prefers-reduced-motion: reduce)',
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })
  );
}

describe('MainLoader', () => {
  it('renders nothing at all under prefers-reduced-motion', () => {
    /* CSS already sets display:none; dropping the node keeps an animated
       decoration out of the tree entirely rather than merely invisible. */
    stubReducedMotion(true);
    const { container } = render(<MainLoader />);
    expect(container.firstChild).toBeNull();
  });

  it('announces itself while visible', () => {
    stubReducedMotion(false);
    render(<MainLoader />);

    const status = screen.getByRole('status', { name: 'Loading portfolio' });
    expect(status).toBeDefined();
    expect(screen.getByText('Loading...')).toBeDefined();
  });

  it('unmounts when its own fade finishes', () => {
    stubReducedMotion(false);
    const { container } = render(<MainLoader />);
    const overlay = container.querySelector('.main-loader');
    expect(overlay).not.toBeNull();

    act(() => {
      const ev = new Event('animationend', { bubbles: true }) as AnimationEvent;
      Object.defineProperty(ev, 'animationName', { value: 'loaderFade' });
      overlay!.dispatchEvent(ev);
    });

    expect(container.querySelector('.main-loader')).toBeNull();
  });

  it('ignores a tile finishing its own fade-in', () => {
    /* animationend bubbles: the five tiles each end `sqfadein` on the way past,
       and treating any of them as "done" would cut the loader short. */
    stubReducedMotion(false);
    const { container } = render(<MainLoader />);
    const overlay = container.querySelector('.main-loader');

    act(() => {
      const ev = new Event('animationend', { bubbles: true }) as AnimationEvent;
      Object.defineProperty(ev, 'animationName', { value: 'sqfadein' });
      container.querySelector('.cl-sq')!.dispatchEvent(ev);
    });

    expect(container.querySelector('.main-loader')).not.toBeNull();
    expect(overlay).not.toBeNull();
  });
});
