export interface ThemeColors {
  bg: string;
  'bg-alt': string;
  text: string;
  'text-muted': string;
  accent: string;
  'accent-hover': string;
  border: string;
  link: string;
  'link-hover': string;
  'selection-bg': string;
  'selection-text': string;
  'scrollbar-track': string;
  'scrollbar-thumb': string;
  'scrollbar-thumb-hover': string;
  'loader-bg': string;
  'card-bg': string;
  'card-border': string;
  'timeline-dot': string;
  'timeline-tail': string;
}

export interface ThemeFonts {
  heading: string;
  body: string;
  nav: string;
  accent: string;
}

export interface ThemeFontWeights {
  'heading-primary': number;
  'heading-secondary': number;
}

export interface ThemeExtra {
  'body-opacity': number;
  'texture-opacity': number;
  'ornament-display': string;
}

export interface Theme {
  id: string;
  label: string;
  description: string;
  colors: ThemeColors;
  fonts: ThemeFonts;
  fontWeights: ThemeFontWeights;
  extra: ThemeExtra;
  googleFonts: string[];
}

export interface ThemeContextValue {
  themeId: string;
  theme: Theme;
  setTheme: (id: string) => void;
  themes: Theme[];
}
