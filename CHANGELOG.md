# Changelog

## 3.0.0

### Breaking Changes

- Upgraded Tailwind CSS v3 → v4 with CSS-first configuration
  - Users must process raw CSS using build tools (e.g., `@tailwindcss/vite`)
- ThemeScript.astro component for theme initialization with system preference support
  - Respects `prefers-color-scheme` when no manual selection is stored
- Updated ThemeIcon to support both manual selection and system preference

## 2.3.0

- Updated `TextLink` component to default to blue text and allow for black and underline styles.

## 2.2.0

- Swapped to using [TypeScript Template](https://github.com/entheon/typescript-template) for linting and formatting
- Defaults `textStyle` to `text-sm`

## 2.1.0

- Fixing initial release issues
