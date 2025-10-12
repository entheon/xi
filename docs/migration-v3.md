# Migration Guide: Xi v3.x

## Overview

Xi v3.1 is now a hybrid component library providing both fully-styled React components and composable Tailwind style primitives.

**Key Addition in v3.1.0+:** Xi's `styles.css` now includes a `@source` directive that automatically configures Tailwind v4 to scan Xi's source files. This is required for Xi's styles to work - without it, classes like `bg-violet-50/50` and `text-slate-600` won't be generated.

## Breaking Changes

### Required: Tailwind v4 Setup

Xi v3.1 requires Tailwind CSS v4. There is no `tailwind.config.js` file needed with Tailwind v4.

**Configure the Vite plugin in your `astro.config.mjs`:**

```js
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
});
```

**Update your CSS imports:**

```css
@import "tailwindcss";
@import "@ryanliu6/xi/styles.css";
```

## New Features

### Style Primitives

You can now import and use Xi's style primitives:

```tsx
import { bgColour, textStyle, buttonStyle } from "@ryanliu6/xi/styles";

function MyComponent() {
  return (
    <div className={bgColour}>
      <p className={textStyle}>Styled with Xi primitives</p>
    </div>
  );
}
```

### Available Primitives

- `textBase`, `textStyle`, `mdStyle` - Text styling
- `bgColour`, `hoverColour` - Colors
- `buttonStyle`, `linkStyle` - Interactive elements
- `flexStyle` - Layout utilities
- `shadowBorder`, `bodyBorder`, `mainBorder`, `marginalBorder` - Containers

## Migration Checklist

- [ ] Install Tailwind CSS v4: `pnpm install tailwindcss@^4 @tailwindcss/vite`
- [ ] Configure `@tailwindcss/vite` plugin in your Astro config
- [ ] Update CSS imports (Tailwind first, then Xi)
- [ ] Remove old `tailwind.config.js` if present (not needed in v4)
- [ ] Clear build cache: `rm -rf .astro node_modules/.vite && npm run dev`

## Backwards Compatibility

All existing Xi components work as before. The only requirement is upgrading to Tailwind v4 and configuring the Vite plugin.

## Example: Hybrid Usage

```tsx
import { Card, bgColour, textStyle } from "@ryanliu6/xi";
import type { Tag } from "@ryanliu6/xi";

function ProjectPage() {
  const tags: Tag[] = [{ name: "React", colour: "#61dafb" }];

  return (
    <div className={`min-h-screen p-8 ${bgColour}`}>
      <h1 className="text-4xl font-bold mb-8">My Projects</h1>
      <Card
        title="Awesome Project"
        description="Built with Xi"
        link="https://github.com/myproject"
        tags={tags}
      />
      <p className={`mt-4 ${textStyle}`}>This uses Xi's text styling with custom additions.</p>
    </div>
  );
}
```

## Troubleshooting

### Styles not applying?

1. **Verify `@tailwindcss/vite` plugin** is configured in `astro.config.mjs`
2. **Check the `@source` directive** exists in `node_modules/@ryanliu6/xi/dist/styles/main.css` (should be present in v3.1.0+)
3. **Ensure you're using Tailwind v4** (`tailwindcss@^4`)
4. **Clear all caches**: `rm -rf .astro node_modules/.vite && pnpm install`
5. **Check CSS import order** in your main CSS file (Tailwind first, then Xi)
6. **Verify Xi's source files** are present at `node_modules/@ryanliu6/xi/src/`

### How to verify styles are working:

Build your project and check the generated CSS file (e.g., `dist/_astro/*.css`). Search for Xi-specific classes:

- `bg-violet-50` (should appear if Xi styles are being scanned)
- `text-slate-600` (base text color)
- `hover:bg-rose-300` (hover effects)

If these classes are missing, the `@source` directive may not be working correctly.

### Still having issues?

Open an issue on [GitHub](https://github.com/RyanLiu6/xi/issues) with your `astro.config.mjs` configuration and a minimal reproduction.

## Additional Resources

- [Architecture and Design Documentation](./architecture.md)
- [Main README](../README.md)
