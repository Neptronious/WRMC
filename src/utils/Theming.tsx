import * as React from 'react';

// Source of truth for sync Theming.tsx files.
// Synced by scripts/build-portable.mjs to:
// - sync/make/projects/living-design/src/app/utils/Theming.tsx
// - sync/builder/projects/living-design/client/utils/Theming.tsx
// - sync/skill/projects/living-design/src/utils/Theming.tsx
const STORAGE_KEY = 'ld-kit-theme';
const THEME_CHANGE_EVENT = 'ld-kit-theme-change';

export const THEME_NAMES = [
  'Walmart',
  "Sam's Club",
  'Walmart B2B',
  'Bodega',
  'Cashi MX',
  'Data Ventures',
  'Sparky',
  'Walmart Legacy',
  'Walmart+',
  "Member's Mark",
] as const;

export type ThemeName = (typeof THEME_NAMES)[number];
export const DEFAULT_THEME: ThemeName = 'Walmart';

/* ── Theme Presets ─────────────────────────────────────────────── */

export interface ThemePreset {
  description: string;
  primaryColor: string;
  overrides: Record<string, string>;
}

export const THEME_PRESETS: Record<string, ThemePreset> = {
  'Walmart': {
    description: 'Default Walmart theme',
    primaryColor: '#FFC107',
    overrides: {
      '--ld-semantic-color-action-fill-primary': '#FFC107',
      '--ld-semantic-color-action-fill-primary-hovered': '#E6AD07',
      '--ld-semantic-color-action-fill-primary-focused': '#E6AD07',
      '--ld-semantic-color-action-fill-primary-pressed': '#CC9A07',
      '--ld-semantic-color-action-text-on-fill-primary': '#2e2f32',
      '--ld-semantic-color-action-border-secondary': '#2e2f32',
      '--ld-semantic-color-action-text-on-fill-secondary': '#2e2f32',
      '--ld-semantic-color-action-fill-secondary-focused': '#FFF7BF',
      '--ld-semantic-color-action-fill-secondary-hovered': '#FFF7BF',
      '--ld-semantic-color-action-fill-secondary-pressed': '#FFE680',
      '--ld-semantic-color-text-brand': '#996900',
      '--ld-semantic-color-border-brand': '#FFC107',
      '--ld-semantic-color-border-activated': '#FFC107',
      '--ld-semantic-color-fill-brand': '#FFC107',
      '--ld-semantic-color-fill-brand-subtle': '#FFF7BF',
    },
  },
  "Sam's Club": {
    description: 'Member warehouse club with Gibson font family',
    primaryColor: '#0062ad',
    overrides: {
      '--ld-primitive-font-family-sans': "Gibson, 'Everyday Sans UI', -apple-system, Roboto, sans-serif",
      '--ld-primitive-color-blue-100': '#0086ed',
      '--ld-primitive-color-blue-110': '#007bd9',
      '--ld-primitive-color-blue-120': '#006ec4',
      '--ld-primitive-color-blue-130': '#0062ad',
      '--ld-primitive-color-blue-140': '#005294',
      '--ld-primitive-color-blue-150': '#00427b',
      '--ld-semantic-color-action-fill-primary': '#0062ad',
      '--ld-semantic-color-action-fill-primary-hovered': '#006ec4',
      '--ld-semantic-color-action-fill-primary-focused': '#006ec4',
      '--ld-semantic-color-action-fill-primary-pressed': '#00427b',
      '--ld-semantic-color-action-fill-primary-disabled': '#eaf1f5',
      '--ld-semantic-color-action-border-secondary': '#0062ad',
      '--ld-semantic-color-action-text-on-fill-secondary': '#0062ad',
      '--ld-semantic-color-action-fill-secondary-focused': '#d8f2ff',
      '--ld-semantic-color-action-fill-secondary-hovered': '#d8f2ff',
      '--ld-semantic-color-action-fill-secondary-pressed': '#9adbff',
      '--ld-semantic-color-action-text-on-fill-tertiary': '#0062ad',
      '--ld-semantic-color-action-fill-tertiary-focused': '#d8f2ff',
      '--ld-semantic-color-action-fill-tertiary-hovered': '#d8f2ff',
      '--ld-semantic-color-text-brand': '#0062ad',
      '--ld-semantic-color-border-brand': '#0062ad',
      '--ld-semantic-color-border-activated': '#0062ad',
      '--ld-semantic-color-top-nav-fill': '#0062ad',
      '--ld-semantic-color-text': '#151f29',
      '--ld-semantic-color-background-subtle': '#f5f9fc',
    },
  },
  'Walmart B2B': {
    description: 'Business platform with navy brand identity',
    primaryColor: '#002e99',
    overrides: {
      '--ld-semantic-color-action-fill-primary': '#002e99',
      '--ld-semantic-color-action-fill-primary-hovered': '#002185',
      '--ld-semantic-color-action-fill-primary-focused': '#002185',
      '--ld-semantic-color-action-fill-primary-pressed': '#001270',
      '--ld-semantic-color-action-focus-outline': '#002e99',
      '--ld-semantic-color-text-brand': '#002e99',
      '--ld-semantic-color-text-link': '#002e99',
      '--ld-semantic-color-text-activated': '#001e60',
      '--ld-semantic-color-border-activated': '#001e60',
      '--ld-semantic-color-border-brand-bold': '#001e60',
      '--ld-semantic-color-border-accent-blue': '#002e99',
      '--ld-semantic-color-top-nav-fill': '#002e99',
      '--ld-semantic-color-fill-brand': '#002e99',
      '--ld-semantic-color-fill-brand-bold': '#001e60',
      '--ld-semantic-color-fill-activated': '#001e60',
      '--ld-semantic-color-icon-brand': '#002e99',
      '--ld-semantic-color-icon-activated': '#001e60',
    },
  },
  'Bodega': {
    description: 'Walmart Mexico retail with green brand and Bogle font',
    primaryColor: '#2c981d',
    overrides: {
      '--ld-primitive-font-family-sans': "Bogle, 'Everyday Sans UI', -apple-system, Roboto, sans-serif",
      '--ld-semantic-color-action-fill-primary': '#2c981d',
      '--ld-semantic-color-action-fill-primary-focused': '#248f17',
      '--ld-semantic-color-action-fill-primary-hovered': '#248f17',
      '--ld-semantic-color-action-fill-primary-pressed': '#16750e',
      '--ld-semantic-color-text-brand': '#2c981d',
      '--ld-semantic-color-border-brand': '#2c981d',
      '--ld-semantic-color-border-activated': '#2c981d',
      '--ld-semantic-color-top-nav-fill': '#2c981d',
      '--ld-semantic-color-action-focus-outline': '#2a8703',
      '--ld-semantic-color-fill-brand': '#2a8703',
      '--ld-semantic-color-fill-brand-subtle': '#eaf3e6',
      '--ld-semantic-color-fill-brand-bold': '#113601',
      '--ld-semantic-color-text-brand-bold': '#113601',
      '--ld-semantic-color-border-brand-bold': '#113601',
      '--ld-semantic-color-page-nav-indicator-activated': '#2a8703',
      '--ld-semantic-color-page-nav-fill-activated': '#f4f9f2',
      '--ld-semantic-color-surface-brand': '#eaf3e6',
    },
  },
  'Cashi MX': {
    description: 'Mexico financial services with purple brand',
    primaryColor: '#6212b2',
    overrides: {
      '--ld-semantic-color-action-fill-primary': '#6212b2',
      '--ld-semantic-color-action-fill-primary-focused': '#500f92',
      '--ld-semantic-color-action-fill-primary-hovered': '#500f92',
      '--ld-semantic-color-action-fill-primary-pressed': '#400c75',
      '--ld-semantic-color-text-brand': '#6212b2',
      '--ld-semantic-color-border-brand': '#6212b2',
      '--ld-semantic-color-border-activated': '#6212b2',
      '--ld-semantic-color-top-nav-fill': '#6212b2',
      '--ld-semantic-color-action-focus-outline': '#6212b2',
      '--ld-semantic-color-fill-brand': '#6212b2',
      '--ld-semantic-color-fill-brand-bold': '#1d0659',
      '--ld-semantic-color-fill-brand-subtle': '#f7f2fc',
      '--ld-semantic-color-page-nav-indicator-activated': '#6212b2',
      '--ld-semantic-color-page-nav-fill-activated': '#f7f2fc',
    },
  },
  'Data Ventures': {
    description: 'Partner analytics platform with purple brand',
    primaryColor: '#6245b7',
    overrides: {
      '--ld-semantic-color-action-fill-primary': '#6245b7',
      '--ld-semantic-color-action-fill-primary-focused': '#553aa8',
      '--ld-semantic-color-action-fill-primary-hovered': '#553aa8',
      '--ld-semantic-color-action-fill-primary-pressed': '#3c228a',
      '--ld-semantic-color-text-brand': '#6245b7',
      '--ld-semantic-color-border-brand': '#6245b7',
      '--ld-semantic-color-border-activated': '#6245b7',
      '--ld-semantic-color-top-nav-fill': '#6245b7',
      '--ld-semantic-color-action-focus-outline': '#6245b7',
      '--ld-semantic-color-fill-brand': '#6245b7',
      '--ld-semantic-color-fill-brand-bold': '#1c0859',
      '--ld-semantic-color-fill-brand-subtle': '#ebe8f3',
      '--ld-semantic-color-fill-activated': '#6245b7',
      '--ld-semantic-color-switch-fill-activated': '#6245b7',
      '--ld-semantic-color-page-nav-indicator-activated': '#6245b7',
      '--ld-semantic-color-page-nav-fill-activated': '#f5f3f9',
      '--ld-semantic-color-surface-brand': '#efebf2',
    },
  },
  'Sparky': {
    description: 'Internal tools platform with dark navy and cyan accents',
    primaryColor: '#001e60',
    overrides: {
      '--ld-semantic-color-action-fill-primary': '#001e60',
      '--ld-semantic-color-action-fill-primary-focused': '#080042',
      '--ld-semantic-color-action-fill-primary-hovered': '#080042',
      '--ld-semantic-color-action-fill-primary-pressed': '#0e002e',
      '--ld-semantic-color-text-brand': '#0053e2',
      '--ld-semantic-color-border-brand': '#001e60',
      '--ld-semantic-color-border-activated': '#001e60',
      '--ld-semantic-color-top-nav-fill': '#001e60',
      '--ld-semantic-color-action-focus-outline': '#001e60',
      '--ld-semantic-color-fill-brand': '#001e60',
      '--ld-semantic-color-fill-brand-bold': '#0e002e',
      '--ld-semantic-color-fill-brand-subtle': '#e7f6fe',
      '--ld-semantic-color-background-subtle': '#e7f6fe',
      '--ld-semantic-color-page-nav-indicator-activated': '#001e60',
      '--ld-semantic-color-page-nav-fill-activated': '#f0faff',
      '--ld-semantic-color-surface-brand': '#c9ebfd',
    },
  },
  'Walmart Legacy': {
    description: 'Classic Walmart brand with Bogle font',
    primaryColor: '#0071dc',
    overrides: {
      '--ld-primitive-font-family-sans': "Bogle, 'Everyday Sans UI', -apple-system, Roboto, sans-serif",
      '--ld-semantic-color-action-fill-primary': '#0071dc',
      '--ld-semantic-color-action-fill-primary-focused': '#0065c7',
      '--ld-semantic-color-action-fill-primary-hovered': '#0065c7',
      '--ld-semantic-color-action-fill-primary-pressed': '#004fab',
      '--ld-semantic-color-text-brand': '#0071dc',
      '--ld-semantic-color-border-brand': '#0071dc',
      '--ld-semantic-color-border-activated': '#0071dc',
      '--ld-semantic-color-top-nav-fill': '#0071dc',
      '--ld-semantic-color-action-focus-outline': '#0071dc',
      '--ld-semantic-color-fill-brand': '#0071dc',
      '--ld-semantic-color-fill-brand-bold': '#003991',
      '--ld-semantic-color-fill-brand-subtle': '#e0edfc',
      '--ld-semantic-color-page-nav-indicator-activated': '#0071dc',
      '--ld-semantic-color-page-nav-fill-activated': '#f0f7ff',
    },
  },
  'Walmart+': {
    description: 'Walmart+ membership with yellow accent warnings',
    primaryColor: '#0053e2',
    overrides: {
      '--ld-semantic-color-border-warning': '#cca700',
      '--ld-semantic-color-border-warning-bold': '#663800',
      '--ld-semantic-color-text-warning': '#996900',
      '--ld-semantic-color-text-warning-bold': '#663800',
      '--ld-semantic-color-fill-warning': '#fff200',
      '--ld-semantic-color-fill-warning-subtle': '#fffee6',
      '--ld-semantic-color-notice-fill-warning': '#fff200',
    },
  },
  "Member's Mark": {
    description: "Sam's Club private label with beige navigation",
    primaryColor: '#283645',
    overrides: {
      '--ld-primitive-font-family-sans': "Gibson, 'Everyday Sans UI', -apple-system, Roboto, sans-serif",
      '--ld-primitive-color-blue-100': '#0086ed',
      '--ld-primitive-color-blue-130': '#0062ad',
      '--ld-semantic-color-action-fill-primary': '#0062ad',
      '--ld-semantic-color-action-fill-primary-hovered': '#006ec4',
      '--ld-semantic-color-action-fill-primary-focused': '#006ec4',
      '--ld-semantic-color-action-fill-primary-pressed': '#00427b',
      '--ld-semantic-color-text-brand': '#0062ad',
      '--ld-semantic-color-border-brand': '#0062ad',
      '--ld-semantic-color-border-activated': '#0062ad',
      '--ld-semantic-color-text': '#151f29',
      '--ld-semantic-color-action-border-secondary': '#283645',
      '--ld-semantic-color-top-nav-fill': '#fcf6f0',
      '--ld-semantic-color-top-nav-text-on-fill': '#151f29',
      '--ld-semantic-color-surface-brand': '#fffcf4',
      '--ld-semantic-color-action-focus-outline': '#0062ad',
      '--ld-semantic-color-fill-brand': '#0062ad',
      '--ld-semantic-color-fill-brand-subtle': '#f0f7ff',
      '--ld-semantic-color-page-nav-indicator-activated': '#283645',
      '--ld-semantic-color-page-nav-fill-activated': '#f0f7ff',
    },
  },
};

/* ── Font theme mapping ───────────────────────────────────────── */

const GIBSON_THEMES: readonly string[] = ["Sam's Club", "Member's Mark"];
const BOGLE_THEMES: readonly string[] = ['Bodega', 'Walmart Legacy'];

/* ── Module-level state ───────────────────────────────────────── */

let _appliedOverrides: string[] = [];
let _baseStylesInjected = false;

/* ── Helpers ───────────────────────────────────────────────────── */

function isThemeName(name: string, allowedThemes: readonly ThemeName[]): name is ThemeName {
  return (allowedThemes as readonly string[]).includes(name);
}

function resolveDefaultTheme(
  defaultTheme: ThemeName,
  allowedThemes: readonly ThemeName[],
): ThemeName {
  if (allowedThemes.length === 0) return defaultTheme;
  if (isThemeName(defaultTheme, allowedThemes)) return defaultTheme;
  return allowedThemes[0];
}

function resolveInitialTheme(
  defaultTheme: ThemeName,
  allowedThemes: readonly ThemeName[],
): ThemeName {
  const safeDefaultTheme = resolveDefaultTheme(defaultTheme, allowedThemes);
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && isThemeName(stored, allowedThemes)) return stored;
  } catch {
    // localStorage may be unavailable; keep default theme.
  }
  return safeDefaultTheme;
}

/* ── Base Styles ──────────────────────────────────────────────── */

function injectBaseStyles(): void {
  if (_baseStylesInjected || typeof document === 'undefined') return;
  _baseStylesInjected = true;

  const style = document.createElement('style');
  style.setAttribute('data-ld-portable', 'base-styles');
  style.textContent = [
    '*, *::before, *::after { box-sizing: border-box; }',
    'html, body, #root {',
    '  margin: 0; padding: 0;',
    "  font-family: var(--ld-primitive-font-family-sans, 'Everyday Sans UI', -apple-system, Roboto, sans-serif);",
    '  -webkit-font-smoothing: antialiased;',
    '  -moz-osx-font-smoothing: grayscale;',
    '  text-rendering: optimizeLegibility;',
    '}',
    'body { color: var(--ld-semantic-color-text, #2e2f32); }',
    'button, input, select, textarea { font-family: inherit; background-color: transparent; }',
    '',
    '/* Container max-width: 16px padding on each side */',
    '.ld-container-container { max-width: calc(100% - 32px); }',
    '',
    '/* Grid row-gap: prevent cards from stacking without vertical spacing */',
    '.ld-grid-grid { row-gap: 1rem; }',
  ].join('\n');
  document.head.appendChild(style);
}

/* ── Theme Application ────────────────────────────────────────── */

export function applyTheme(theme: ThemeName): void {
  const root = document.documentElement;

  // Set theme data attribute
  root.setAttribute('data-genld-theme', theme);

  // Remove previously applied CSS variable overrides
  for (const prop of _appliedOverrides) {
    root.style.removeProperty(prop);
  }

  // Apply preset CSS variable overrides (includes font-family for branded themes)
  const preset = THEME_PRESETS[theme];
  const newProps: string[] = [];
  if (preset) {
    for (const [key, val] of Object.entries(preset.overrides)) {
      root.style.setProperty(key, val);
      newProps.push(key);
    }
  }
  _appliedOverrides = newProps;

  // Persist
  try { localStorage.setItem(STORAGE_KEY, theme); } catch {}

  // Dispatch change event
  window.dispatchEvent(new CustomEvent(THEME_CHANGE_EVENT, { detail: { theme } }));
}

/* ── Global API ───────────────────────────────────────────────── */

declare global {
  interface Window {
    ldKit?: {
      setTheme: (name: string) => void;
      getTheme: () => string;
      getThemeNames: () => string[];
      THEME_PRESETS: Record<string, ThemePreset>;
      THEME_NAMES?: readonly ThemeName[];
    };
  }
}

function installThemeApi(
  initialTheme: ThemeName,
  allowedThemes: readonly ThemeName[],
): void {
  let activeTheme = initialTheme;

  window.ldKit = {
    setTheme(name: string) {
      if (!isThemeName(name, allowedThemes)) return;
      activeTheme = name;
      applyTheme(name);
    },
    getTheme() {
      return activeTheme;
    },
    getThemeNames() {
      return [...allowedThemes];
    },
    THEME_PRESETS,
    THEME_NAMES: allowedThemes,
  };
}

/* ── Font Injection ───────────────────────────────────────────── */

export interface ThemingOptions {
  injectGibsonSans?: () => void;
  injectBogleSans?: () => void;
}

function injectFontForTheme(theme: string, options: ThemingOptions): void {
  if (GIBSON_THEMES.includes(theme) && options.injectGibsonSans) {
    options.injectGibsonSans();
  } else if (BOGLE_THEMES.includes(theme) && options.injectBogleSans) {
    options.injectBogleSans();
  }
}

/* ── React Hook ───────────────────────────────────────────────── */

// Theme contract for agents:
// - Set the theme in App.tsx by changing the name in useInitializeTheming().
// - Pass a single-element array as allowedThemes to lock to one brand.
//   e.g. useInitializeTheming("Sam's Club", ["Sam's Club"] as const, ...)
// - Do NOT pass THEME_NAMES as allowedThemes — localStorage can override the default.
// - Runtime switching: window.ldKit.setTheme("<Theme Name>")
export function useInitializeTheming(
  defaultTheme: ThemeName = DEFAULT_THEME,
  allowedThemes: readonly ThemeName[] = THEME_NAMES,
  options?: ThemingOptions,
): void {
  React.useEffect(() => {
    // Inject base document styles (box-sizing, body font, resets)
    injectBaseStyles();

    // Set up font injection listener BEFORE applying theme so the
    // initial applyTheme dispatch triggers font injection.
    let cleanup: (() => void) | undefined;
    if (options) {
      const handler = (e: Event) => {
        const theme = (e as CustomEvent).detail?.theme;
        if (theme) injectFontForTheme(theme, options);
      };
      window.addEventListener(THEME_CHANGE_EVENT, handler);
      cleanup = () => window.removeEventListener(THEME_CHANGE_EVENT, handler);
    }

    const initialTheme = resolveInitialTheme(defaultTheme, allowedThemes);
    applyTheme(initialTheme);
    installThemeApi(initialTheme, allowedThemes);

    return cleanup;
  }, [allowedThemes, defaultTheme]);
}
