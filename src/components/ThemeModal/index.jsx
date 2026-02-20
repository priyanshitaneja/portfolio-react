import { useEffect, useRef, useCallback } from 'react';
import { useTheme } from '../../theme/ThemeContext';
import { DEFAULT_THEME } from '../../theme/themes';
import './index.scss';

const ThemeModal = () => {
  const { isFirstVisit, themes, setTheme, dismissFirstVisit } = useTheme();
  const modalRef = useRef(null);
  const firstCardRef = useRef(null);

  const handleSelect = useCallback(
    (id) => {
      setTheme(id);
      dismissFirstVisit();
    },
    [setTheme, dismissFirstVisit]
  );

  // Focus trap + keyboard handling
  useEffect(() => {
    if (!isFirstVisit) return;

    // Auto-focus first card
    firstCardRef.current?.focus();

    // Lock body scroll
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleSelect(DEFAULT_THEME);
        return;
      }

      if (e.key !== 'Tab') return;

      const focusable = modalRef.current?.querySelectorAll('button');
      if (!focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFirstVisit, handleSelect]);

  if (!isFirstVisit) return null;

  return (
    <div
      className="theme-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Choose your theme"
      ref={modalRef}
    >
      <div className="theme-modal">
        <h2 className="theme-modal__title">Choose your vibe</h2>
        <p className="theme-modal__subtitle">You can always change this later.</p>

        <div className="theme-modal__cards">
          {themes.map((t, i) => (
            <button
              key={t.id}
              ref={i === 0 ? firstCardRef : undefined}
              className="theme-modal__card"
              onClick={() => handleSelect(t.id)}
              aria-label={`Select ${t.label} theme`}
            >
              <div className="theme-modal__swatch" aria-hidden="true">
                <span
                  className="theme-modal__swatch-bg"
                  style={{ background: t.colors.bg }}
                />
                <span
                  className="theme-modal__swatch-accent"
                  style={{ background: t.colors.accent }}
                />
                <span
                  className="theme-modal__swatch-text"
                  style={{ color: t.colors.text, background: 'transparent' }}
                >
                  Aa
                </span>
              </div>
              <span className="theme-modal__card-label">{t.label}</span>
              <span className="theme-modal__card-desc">{t.description}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeModal;
