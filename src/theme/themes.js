export const THEME_STORAGE_KEY = 'portfolio-theme';
export const DEFAULT_THEME = 'dark-minimal';

const themes = {
  'dark-minimal': {
    id: 'dark-minimal',
    label: 'Dark Minimal',
    description: 'Clean and modern dark theme',
    colors: {
      bg: '#000000',
      'bg-alt': '#0A0A0A',
      text: '#F8EDE3',
      'text-muted': '#ddd0c3',
      accent: '#875c3e',
      'accent-hover': '#a06d4a',
      border: '#454545',
      link: '#F8EDE3',
      'link-hover': '#875c3e',
      'selection-bg': '#875c3e',
      'selection-text': '#F8EDE3',
      'scrollbar-track': '#000000',
      'scrollbar-thumb': '#454545',
      'scrollbar-thumb-hover': '#875c3e',
      'loader-bg': '#0F0F0F',
      'card-bg': '#000000',
      'card-border': '#454545',
      'timeline-dot': '#875c3e',
      'timeline-tail': '#F8EDE3',
    },
    fonts: {
      heading: "'Poppins', sans-serif",
      body: "'Montserrat', sans-serif",
      nav: "'Montserrat', sans-serif",
      accent: "'Poppins', sans-serif",
    },
    fontWeights: {
      'heading-primary': 100,
      'heading-secondary': 200,
    },
    extra: {
      'body-opacity': 1,
      'texture-opacity': 0,
      'ornament-display': 'none',
    },
    googleFonts: [],
  },

  poetcore: {
    id: 'poetcore',
    label: 'Poetcore',
    description: 'Aged parchment & old books',
    colors: {
      bg: '#E3DADB',
      'bg-alt': '#D9D0D1',
      text: '#2B1D0E',
      'text-muted': '#7A6A5E',
      accent: '#8B4513',
      'accent-hover': '#A0522D',
      border: '#BFB3A5',
      link: '#6B3A2A',
      'link-hover': '#8B4513',
      'selection-bg': '#C9A87C',
      'selection-text': '#2B1D0E',
      'scrollbar-track': '#D9D0D1',
      'scrollbar-thumb': '#BFB3A5',
      'scrollbar-thumb-hover': '#8B4513',
      'loader-bg': '#E3DADB',
      'card-bg': '#D9D0D1',
      'card-border': '#BFB3A5',
      'timeline-dot': '#8B4513',
      'timeline-tail': '#BFB3A5',
    },
    fonts: {
      heading: "'Pinyon Script', cursive",
      body: "'EB Garamond', serif",
      nav: "'EB Garamond', serif",
      accent: "'Bodoni Moda', serif",
    },
    fontWeights: {
      'heading-primary': 400,
      'heading-secondary': 400,
    },
    extra: {
      'body-opacity': 0.8,
      'texture-opacity': 0.04,
      'ornament-display': 'block',
    },
    googleFonts: [
      'EB+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500',
      'Pinyon+Script',
      'Bodoni+Moda:wght@400;700',
      'Cinzel:wght@400;500;600;700',
    ],
  },
};

export function getTheme(id) {
  return themes[id] || themes[DEFAULT_THEME];
}

export function getThemeIds() {
  return Object.keys(themes);
}

export default themes;
