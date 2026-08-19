'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import './index.css';

/**
 * MainLoader — Grid-shuffle spinner with tech icons.
 *
 * Five tech-logo badges (React, JS, TS, Claude, CSS) cycle through
 * a grid-shuffle pattern via CSS keyframes. GSAP handles the
 * overall fade-in/fade-out.
 *
 * This is a decorative overlay, not a gate: page content renders underneath it
 * on the first frame. It is pointer-events: none so it never intercepts
 * interaction with the content it covers, and index.css carries a 3s failsafe
 * fade in case this component's JS never runs.
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
  const spinnerRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // CSS has already hidden it; this just drops the node.
      setDone(true);
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(spinnerRef.current, { opacity: 0, scale: 0.92 });

      const tl = gsap.timeline({
        onComplete: () => setDone(true),
      });

      /* Fade in the spinner */
      tl.to(
        spinnerRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.2,
          ease: 'power2.out',
        },
        0
      );

      /* Fade out (total ≈ 1.15s) */
      tl.to(
        loaderRef.current,
        {
          opacity: 0,
          duration: 0.25,
          ease: 'power2.inOut',
        },
        0.9
      );
    }, loaderRef);

    return () => ctx.revert();
  }, []);

  if (done) return null;

  return (
    <div
      ref={loaderRef}
      className="main-loader"
      role="status"
      aria-label="Loading portfolio"
    >
      <div ref={spinnerRef} className="cl-spinner">
        {/* React */}
        <div className="cl-sq cl-sq--1 cl-sq--fa">
          <i className="fa-brands fa-react" style={{ color: 'rgb(94, 212, 244)' }} aria-hidden="true" />
        </div>

        {/* JavaScript */}
        <div className="cl-sq cl-sq--2 cl-sq--fa">
          <i className="fa-brands fa-js" style={{ color: 'rgb(247, 209, 58)' }} aria-hidden="true" />
        </div>

        {/* Code */}
        <div className="cl-sq cl-sq--3 cl-sq--fa">
          <i className="fa-solid fa-code" style={{ color: 'rgb(59, 174, 130)' }} aria-hidden="true" />
        </div>

        {/* Claude */}
        <div className="cl-sq cl-sq--4 cl-sq--fa">
          <i className="fa-brands fa-claude" style={{ color: 'rgb(208, 115, 83)' }} aria-hidden="true" />
        </div>

        {/* CSS3 */}
        <div className="cl-sq cl-sq--5 cl-sq--fa">
          <i className="fa-brands fa-css3-alt" style={{ color: 'rgb(102, 50, 153)' }} aria-hidden="true" />
        </div>
      </div>

      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default MainLoader;
