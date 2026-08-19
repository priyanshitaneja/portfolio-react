'use client';

import { useTheme } from '../../theme/ThemeContext';
import { getThemeIds } from '../../theme/themes';
import './index.scss';

const ThemeToggle = () => {
  const { themeId, setTheme } = useTheme();
  const ids = getThemeIds();

  const currentIndex = ids.indexOf(themeId);
  const nextIndex = (currentIndex + 1) % ids.length;
  const nextId = ids[nextIndex];
  const nextLabel = nextId.replace('-', ' ');

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={() => setTheme(nextId)}
      aria-label={`Switch to ${nextLabel} theme`}
      title={`Switch to ${nextLabel} theme`}
    >
      <i className="fa-solid fa-palette" aria-hidden="true" />
    </button>
  );
};

export default ThemeToggle;
