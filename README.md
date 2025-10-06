# Project Xi

[![npm version](https://img.shields.io/npm/v/@ryanliu6/xi.svg)](https://www.npmjs.com/package/@ryanliu6/xi)
[![npm downloads](https://img.shields.io/npm/dm/@ryanliu6/xi.svg)](https://www.npmjs.com/package/@ryanliu6/xi)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Project Xi is a component library for Astro + Tailwind projects. They are personalized and may not fit your use-case! Feel free to modify to your liking!

> [!NOTE]
> Version 1.x.x was unpublished as it was used for playing around with npm, and I did not realize that the same version number cannot be reused even if I unpublished the entire package. Version 2.0.0 represents the first stable release.

## Installation

You can install the package from [npm](https://www.npmjs.com/package/@ryanliu6/xi):

```bash
npm install @ryanliu6/xi
```

## Setup

### Styles

This library uses Tailwind CSS v4 for styling. Tailwind CSS v4 uses a new architecture that requires integration through your build tool.

**For Astro Projects:**

1. Install Tailwind CSS v4 and the Vite plugin:

```bash
npm install tailwindcss@^4 @tailwindcss/vite
```

2. Update your `astro.config.mjs`:

```js
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
});
```

3. Import the library's CSS in your main CSS file or layout:

```css
@import '@ryanliu6/xi/styles.css';
```

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

## Styles

You can import pre-defined styles separately:

```tsx
import {
  textStyle,
  mdStyle,
  bgColour,
  hoverColour,
  buttonStyle,
  linkStyle,
  flexStyle,
  shadowBorder,
  bodyBorder,
  mainBorder,
  marginalBorder,
} from "@ryanliu6/xi/styles";
```

## Types

The package includes TypeScript types:

```tsx
import type { Tag } from "@ryanliu6/xi";
import { Themes } from "@ryanliu6/xi";
```

These are used in `Card` and `ThemeIcon` respectively. I don't forsee any use-case for `Theme`, but `Tag` can be used for any custom tags you wish for `Card`.

## Requirements

- React 18.3+
- Tailwind CSS 4+
- @headlessui/react 2+
- @heroicons/react 2+

> [!IMPORTANT]
> Version 3.0.0+ requires Tailwind CSS v4. If you're using Tailwind CSS v3, please use version 2.x of this library.
