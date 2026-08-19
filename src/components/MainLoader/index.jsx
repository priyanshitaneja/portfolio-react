import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import PropTypes from 'prop-types';
import './index.css';

/**
 * MainLoader — Grid-shuffle spinner with tech icons.
 *
 * Five tech-logo badges (React, JS, TS, Claude, CSS) cycle through
 * a grid-shuffle pattern via CSS keyframes. GSAP handles the
 * overall fade-in/fade-out and fires onComplete.
 *
 * This is a decorative overlay, not a gate: App renders page content
 * underneath it on the first frame. It is pointer-events: none so it never
 * intercepts interaction with the content it covers, and index.css carries a
 * 3s failsafe fade in case this component's JS never runs.
 */
const MainLoader = ({ onComplete }) => {
  const loaderRef = useRef(null);
  const spinnerRef = useRef(null);

  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onCompleteRef.current?.();
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(spinnerRef.current, { opacity: 0, scale: 0.92 });

      const tl = gsap.timeline({
        onComplete: () => onCompleteRef.current?.(),
      });

      /* Fade in the spinner */
      tl.to(spinnerRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.2,
        ease: 'power2.out',
      }, 0);

      /* Fade out (total ≈ 1.15s) */
      tl.to(loaderRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: 'power2.inOut',
      }, 0.9);
    }, loaderRef);

    return () => ctx.revert();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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

MainLoader.propTypes = {
  onComplete: PropTypes.func,
};

export default MainLoader;
