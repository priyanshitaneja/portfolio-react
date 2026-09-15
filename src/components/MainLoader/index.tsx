'use client';

import { useRef, useEffect, useState } from 'react';

import Icon, { type IconData } from '../Icon';
import { iconReact, iconJs, iconCode, iconClaude, iconCss3Alt } from '../Icon/icons';
import './index.css';

/* Brand colours are per-icon and inline, as before. Now that they are real
 * <svg fill="currentColor"> elements rather than icon-font glyphs, `color`
 * still drives them. */
const BADGES: { key: string; icon: IconData; color: string }[] = [
  { key: 'react', icon: iconReact, color: 'rgb(94, 212, 244)' },
  { key: 'js', icon: iconJs, color: 'rgb(247, 209, 58)' },
  { key: 'code', icon: iconCode, color: 'rgb(59, 174, 130)' },
  { key: 'claude', icon: iconClaude, color: 'rgb(208, 115, 83)' },
  { key: 'css3', icon: iconCss3Alt, color: 'rgb(102, 50, 153)' },
];

/**
 * MainLoader — Grid-shuffle spinner with tech icons.
 *
 * Five tech-logo badges (React, JS, TS, Claude, CSS) cycle through
 * a grid-shuffle pattern via CSS keyframes, and the overall fade-in/fade-out
 * is CSS too. This used to be a GSAP timeline; GSAP was this component's only
 * consumer in the whole app, and because the component is a static import in
 * the root layout it put ~36 kB gzip on the critical path of every route to
 * run a 0.2s fade in and a 0.25s fade out.
 *
 * This is a decorative overlay, not a gate: page content renders underneath it
 * on the first frame. It is pointer-events: none so it never intercepts
 * interaction with the content it covers, and the fade-out living in CSS means
 * it clears itself even if this component's JS never runs — which is what the
 * old 3s failsafe was for.
 *
 * It renders in the static HTML deliberately. Mounting it only after hydration
 * would keep it out of the prerendered document, but the visible result is
 * worse: content paints, then an opaque panel slams over it a few hundred
 * milliseconds later. That is a strobe, not a loader.
 *
 * Nothing here derives what to render from `window`, `matchMedia` or
 * `typeof window` — that would produce a different tree on the server than on
 * the first client render and force React to discard the prerendered HTML.
 * Initial state is identical on both sides; reduced motion is handled in CSS.
 */
const MainLoader = () => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  /*
   * All this does now is drop the node once the CSS fade has finished. The
   * animation is not driven from here — if this effect never runs, the overlay
   * still fades and still stops intercepting nothing (pointer-events: none);
   * it just stays in the DOM, invisible.
   */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // CSS has already hidden it; this just drops the node.
      setDone(true);
      return;
    }

    const el = loaderRef.current;
    if (!el) return;

    const handleAnimationEnd = (event: AnimationEvent) => {
      /* animationend bubbles, and the five tiles each end their own
         `sqfadein` on the way past — only the overlay's own fade means done. */
      if (event.animationName === 'loaderFade') setDone(true);
    };

    el.addEventListener('animationend', handleAnimationEnd);
    return () => el.removeEventListener('animationend', handleAnimationEnd);
  }, []);

  if (done) return null;

  return (
    <div
      ref={loaderRef}
      className="main-loader"
      role="status"
      aria-label="Loading portfolio"
    >
      <div className="cl-spinner">
        {BADGES.map(({ key, icon, color }, i) => (
          <div key={key} className={`cl-sq cl-sq--${i + 1} cl-sq--fa`}>
            <Icon icon={icon} style={{ color }} />
          </div>
        ))}
      </div>

      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default MainLoader;
