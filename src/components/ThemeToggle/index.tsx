'use client';

import { useTheme } from '../../theme/ThemeContext';
import { getThemeIds } from '../../theme/themes';
import Icon from '../Icon';
import { iconPalette } from '../Icon/icons';
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
      className="theme-toggle glass"
      onClick={() => setTheme(nextId)}
      aria-label={`Switch to ${nextLabel} theme`}
      title={`Switch to ${nextLabel} theme`}
    >
      <Icon icon={iconPalette} />
    </button>
  );
};

export default ThemeToggle;
