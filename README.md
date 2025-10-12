# Project Xi

[![npm version](https://img.shields.io/npm/v/@ryanliu6/xi.svg)](https://www.npmjs.com/package/@ryanliu6/xi)
[![npm downloads](https://img.shields.io/npm/dm/@ryanliu6/xi.svg)](https://www.npmjs.com/package/@ryanliu6/xi)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Project Xi is a **hybrid component library** for Astro + Tailwind projects. It provides both:

1. **Fully-styled React Components** - Import and use complete components like `<Card />` or `<BorderedButton />`
2. **Composable Style Primitives** - Reusable Tailwind class strings like `bgColour` or `buttonStyle` for ad-hoc styling

This dual approach gives you the flexibility to use pre-built components where they fit, and compose custom styles where you need them.

> [!NOTE]
> Version 1.x.x was unpublished as it was used for playing around with npm, and I did not realize that the same version number cannot be reused even if I unpublished the entire package. Version 2.0.0 represents the first stable release.

## Quick Start

```bash
# 1. Install Xi
pnpm install @ryanliu6/xi tailwindcss@^4 @tailwindcss/vite
```

```js
// 2. Configure Astro to use Tailwind (astro.config.mjs)
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
});
```

```css
/* 3. Import Xi's styles in your CSS (src/styles/global.css) */
@import "tailwindcss";
@import "@ryanliu6/xi/styles.css";
```

```tsx
// 4. Use components and style primitives together
import { Card, bgColour, textStyle } from "@ryanliu6/xi";

function App() {
  return (
    <div className={bgColour}>
      <h1 className={textStyle}>Welcome to Xi!</h1>
      <Card title="My Project" description="Built with Xi" link="#" tags={[]} />
    </div>
  );
}
```

## Installation

You can install the package from [npm](https://www.npmjs.com/package/@ryanliu6/xi):

```bash
npm (pnpm) install @ryanliu6/xi
```

## Setup

### Tailwind v4 Configuration

This library uses Tailwind CSS v4 for styling. Xi is designed to work seamlessly with Tailwind v4's CSS-first configuration through source code distribution.

**For Astro Projects:**

1. Install Tailwind CSS v4 and the Vite plugin:

```bash
npm (pnpm) install tailwindcss@^4 @tailwindcss/vite
```

2. Configure Astro to use the Tailwind Vite plugin in `astro.config.mjs`:

```js
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
});
```

3. Create a main CSS file (e.g., `src/styles/global.css`) and import Xi's styles:

```css
@import "tailwindcss";
@import "@ryanliu6/xi/styles.css";
```

4. Import this CSS file in your Astro layout:

```astro
---
import '../styles/global.css';
---
```

> [!IMPORTANT]
> **How Xi works with Tailwind v4:** Xi publishes its source code (`/src` directory) alongside compiled code. Xi's `styles.css` includes a `@source` directive that tells Tailwind to scan Xi's source files in `node_modules` for class names. When you import `@ryanliu6/xi/styles.css`, Tailwind automatically generates CSS for all classes used in Xi's components and style primitives. No `tailwind.config.js` file is needed - everything is configured via CSS imports!

### Theme Initialization (Required for ThemeIcon)

If you're using the `ThemeIcon` component for dark mode toggling, you need to initialize the theme in your Astro layout. You can now use the provided `ThemeScript` component:

```astro
---
import ThemeScript from '@ryanliu6/xi/ThemeScript.astro';
---

<html lang="en">
  <head>
    <ThemeScript />
    <!-- ... other head content -->
  </head>
  <body>
    <!-- ... body content -->
  </body>
</html>
```

This component handles the theme initialization and prevents flash of unstyled content (FOUC) when the page loads.

## Components

### BorderedButton

A button component with consistent styling and hover effects.

```tsx
import { BorderedButton } from "@ryanliu6/xi";

<BorderedButton id="my-button">
  <p>Click me</p>
</BorderedButton>;
```

All child elements are passed through to the button.

### Card

A card component for displaying content with title, description, and tags.

```tsx
import { Card } from "@ryanliu6/xi";
import type { Tag } from "@ryanliu6/xi";

const tags: Tag[] = [
  { name: "JavaScript", colour: "#f7df1e" },
  { name: "React", colour: "#61dafb" },
];

<Card
  title="My Project"
  description="A cool project"
  link="https://github.com/myproject"
  tags={tags}
/>;
```

My current use-case is to display projects on my portfolio, for which Cards are clickable and will take the user to the project's GitHub repository or website. In my use-case, since the cards represent projects, the `tags` prop is used to display the languages used in the project. For a more generic use-case, `tags` could be used to display any other metadata, and `colour` is optional.

> [!NOTE]
> This component is designed 100% to work with Astro's Markdown content translator in mind, and thus not much testing has been done with raw tags. Please report any issues with this component to me via GitHub issues!

### IconedPopover

A popover component that can display either text or an icon as its trigger.

```tsx
import { IconedPopover } from "@ryanliu6/xi";

<IconedPopover text="Click me">
  <div>Popover content</div>
</IconedPopover>;
```

My current use-case is a dropdown menu for Mobile Navigation, hence the existence of this component.

> [!NOTE]
> Currently implemented using @headlessui/react rather than scratch-implemented. Please report any issues with this component to them, unless I'm doing something wrong in particular!

### TextLink

A styled link component.

```tsx
import { TextLink } from "@ryanliu6/xi";

<TextLink href="https://example.com" title="Visit Example">
  Click here
</TextLink>;
```

Represents a link that is styled to look like a text link, with an underline and a hover effect.

### ThemeIcon

A theme toggle component for switching between light and dark modes.

```tsx
import { ThemeIcon } from "@ryanliu6/xi";

<ThemeIcon />;
```

An all-in-one component for toggling between light and dark modes. The theme is stored in local storage and persists across page reloads.

**System Preference Support:** The component respects the system's `prefers-color-scheme` setting by default. When a user manually toggles the theme, their explicit choice is saved and takes precedence. To reset to system preference, remove the `theme` key from localStorage: `localStorage.removeItem('theme')`.

**Important:** To use this component, you must also include the `ThemeScript` component in your Astro layout's `<head>` section (see [Theme Initialization](#theme-initialization-required-for-themeicon) above). This ensures the theme is applied before the page renders, preventing any flash of unstyled content.

## Style Primitives

Xi exports composable Tailwind class strings that you can use for ad-hoc styling. This is the "primitive" side of the hybrid library - these are just strings of Tailwind classes that you can mix and match in your own components.

### Available Style Primitives

```tsx
import {
  textBase, // Base text styling with font and colors
  textStyle, // Text with size and base styles
  mdStyle, // Prose styling for markdown content
  bgColour, // Background colors for light/dark modes
  hoverColour, // Hover state colors
  buttonStyle, // Complete button styling
  linkStyle, // Link styling with transitions
  flexStyle, // Flex layout utilities
  shadowBorder, // Border with shadow and background
  bodyBorder, // Body container styling
  mainBorder, // Main content area styling
  marginalBorder, // Marginal content styling
} from "@ryanliu6/xi/styles";
```

### Using Style Primitives

You can use these style strings directly in your components:

```tsx
import { bgColour, textStyle, buttonStyle } from "@ryanliu6/xi/styles";

function MyComponent() {
  return (
    <div className={bgColour}>
      <p className={textStyle}>This uses Xi's text styling</p>
      <button className={buttonStyle}>Custom button with Xi styles</button>
    </div>
  );
}
```

### Combining with Tailwind Classes

Style primitives are just strings, so you can easily combine them with your own Tailwind classes:

```tsx
import classNames from "classnames";
import { bgColour, textStyle } from "@ryanliu6/xi/styles";

function MyCard() {
  // Combine Xi's styles with your own
  const cardClasses = classNames(bgColour, textStyle, "p-6 rounded-xl border-2 border-slate-200");

  return <div className={cardClasses}>Your content here</div>;
}
```

### Hybrid Approach: Components + Primitives

The real power comes from using both approaches together:

```tsx
import { Card, bgColour, textStyle } from "@ryanliu6/xi";
import type { Tag } from "@ryanliu6/xi";

function ProjectPage() {
  const tags: Tag[] = [
    { name: "React", colour: "#61dafb" },
    { name: "TypeScript", colour: "#3178c6" },
  ];

  return (
    // Use Xi's bgColour primitive for the container
    <div className={`min-h-screen p-8 ${bgColour}`}>
      {/* Use your own styling */}
      <h1 className="text-4xl font-bold mb-8">My Projects</h1>

      {/* Use Xi's Card component */}
      <Card
        title="Awesome Project"
        description="A project built with Xi"
        link="https://github.com/myproject"
        tags={tags}
      />

      {/* Combine Xi's textStyle with your own classes */}
      <p className={`mt-4 ${textStyle}`}>This paragraph uses Xi's text styling.</p>
    </div>
  );
}
```

## Architecture: How the Hybrid Pattern Works

Xi is designed as a **scannable component library**. Here's what makes it work:

### Source Code Distribution

Xi publishes both its compiled code (`/dist`) and source code (`/src`). This is unusual but intentional:

- **`/dist`**: Compiled JavaScript and TypeScript definitions for importing components
- **`/src`**: Original TypeScript/TSX source files for Tailwind to scan

### Tailwind v4 Scanning

The `@tailwindcss/vite` plugin automatically scans your project files and dependencies in `node_modules` (including Xi's `/src` directory). It discovers all class names used in Xi (like `bg-violet-50/50`, `dark:bg-slate-900`, etc.) and includes them in your final CSS bundle.

### Why This Approach?

1. **Full Flexibility**: Use pre-built components when they fit, compose your own when they don't
2. **Consistent Design**: Style primitives ensure visual consistency across your app
3. **Tailwind Integration**: Everything works seamlessly with Tailwind's JIT compiler
4. **Type Safety**: Full TypeScript support for both components and style strings
5. **Tree Shakeable**: Only the components and styles you use are included in your bundle

### Best Practices

- **For Rapid Development**: Use Xi's components directly
- **For Custom Designs**: Combine style primitives with your own Tailwind classes
- **For Design Systems**: Build on top of Xi's primitives to create your own component library

## Types

The package includes TypeScript types:

```tsx
import type { Tag } from "@ryanliu6/xi";
import { Themes } from "@ryanliu6/xi";
```

These are used in `Card` and `ThemeIcon` respectively. I don't forsee any use-case for `Theme`, but `Tag` can be used for any custom tags you wish for `Card`.

## Troubleshooting

### Styles Not Applying

If Xi's components or style primitives don't appear styled correctly:

1. **Verify the Vite plugin is configured**: Ensure `@tailwindcss/vite` is in your `astro.config.mjs` plugins array
2. **Check CSS import order**: Import `@import "tailwindcss"` BEFORE `@import "@ryanliu6/xi/styles.css"`
3. **Verify the `@source` directive**: Check that `node_modules/@ryanliu6/xi/dist/styles/main.css` contains `@source "../**/*.{js,ts,jsx,tsx,astro}";` (this should be present in v3.1.0+)
4. **Clear your build cache**: Try `rm -rf .astro node_modules/.vite && pnpm install` and rebuild
5. **Verify Tailwind v4**: Ensure you're using `tailwindcss@^4` not v3

> **Why the `@source` directive matters:** This directive tells Tailwind v4 to scan Xi's source files for class names. Without it, classes like `bg-violet-50/50`, `text-slate-600`, and `hover:bg-rose-300/30` won't be generated in your final CSS bundle.

### TypeScript Errors

If you're getting TypeScript errors when importing from `@ryanliu6/xi/styles`:

```tsx
// ✅ Correct
import { bgColour, textStyle } from "@ryanliu6/xi/styles";

// ❌ Wrong
import { bgColour } from "@ryanliu6/xi";
```

Components are exported from `@ryanliu6/xi`, style primitives from `@ryanliu6/xi/styles`.

### Classes Not Being Generated

If Tailwind isn't generating CSS for classes used in Xi components or style primitives:

- **Check the generated CSS**: Look at the built CSS file (e.g., `dist/_astro/*.css`) and search for Xi-specific classes like `bg-violet-50` or `text-slate-600`
- **Verify `@source` directive**: Ensure `node_modules/@ryanliu6/xi/dist/styles/main.css` contains the `@source` directive
- **Check Xi's source files**: Verify that `node_modules/@ryanliu6/xi/src/` directory exists with TypeScript/TSX files
- **Clear all caches**: Run `rm -rf .astro node_modules/.vite && pnpm install` then rebuild

If you're developing Xi locally (using `file:` dependency), remember to:

1. Rebuild Xi after making changes: `cd ../xi && pnpm build`
2. Reinstall in your project: `pnpm install`
3. Clear Vite cache: `rm -rf .astro node_modules/.vite`

### Need Help?

Open an issue on [GitHub](https://github.com/RyanLiu6/xi/issues) with:

- Your `astro.config.mjs` configuration
- Your CSS import statements
- A minimal reproduction of the issue

## Requirements

- React 18.3+
- Tailwind CSS 4+
- @headlessui/react 2+
- @heroicons/react 2+

> [!IMPORTANT]
> Version 3.0.0+ requires Tailwind CSS v4. If you're using Tailwind CSS v3, please use version 2.x of this library.
