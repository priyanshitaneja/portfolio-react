import { useTheme } from '../../theme/ThemeContext';
import { getThemeIds } from '../../theme/themes';
import './index.scss';

const ThemeToggle = () => {
  const { themeId, setTheme } = useTheme();
  const ids = getThemeIds();

  const currentIndex = ids.indexOf(themeId);
  const nextIndex = (currentIndex + 1) % ids.length;
  const nextId = ids[nextIndex];

  return (
    <button
      className="theme-toggle"
      onClick={() => setTheme(nextId)}
      aria-label={`Switch to ${nextId.replace('-', ' ')} theme`}
      title={`Switch to ${nextId.replace('-', ' ')} theme`}
    >
      <i className="fa-solid fa-palette" />
    </button>
  );
};

export default ThemeToggle;
