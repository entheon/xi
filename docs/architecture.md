# Xi Architecture and Design

## Why Hybrid Library Pattern?

Xi v3.1 implements a hybrid pattern to provide flexibility without sacrificing ease of use. Traditional component libraries force you to use pre-built components exactly as designed. Xi allows you to:

1. Use pre-built components for rapid development
2. Access style primitives for custom components
3. Mix both approaches as needed

This pattern is recommended by Tailwind CSS documentation for component libraries that integrate with Tailwind's JIT compiler.

## How It Works with Tailwind v4

### Source Code Distribution

Xi publishes both compiled code and source files:

- `/dist` - Compiled JavaScript and TypeScript definitions (runtime)
- `/src` - Original TypeScript/TSX source files (for Tailwind scanning)

### Tailwind v4 Scanning Process

Tailwind v4 uses a CSS-first configuration approach. The `@tailwindcss/vite` plugin scans files to discover class names.

**How Xi integrates with Tailwind v4:**

1. **Consumer imports Xi's CSS**: `@import "@ryanliu6/xi/styles.css";`
2. **Xi's CSS contains `@source` directive**: `@source "../**/*.{js,ts,jsx,tsx,astro}";`
3. **Tailwind scans Xi's source files**: The path is relative to `main.css`, pointing to Xi's `/src` directory
4. **CSS is generated**: All classes used in Xi's components (like `bg-violet-50/50`, `dark:bg-slate-900`, `hover:bg-rose-300/30`) are included in the final bundle

**Why the `@source` directive is critical:**

Without it, Tailwind only scans the consumer's project files, not Xi's source files in `node_modules`. This means Xi-specific classes would never be generated, and components would appear unstyled.

**Path resolution:**

```
Location: node_modules/@ryanliu6/xi/dist/styles/main.css
@source "../**/*"  →  Resolves to: node_modules/@ryanliu6/xi/src/**/*
```

This path is relative to where `main.css` lives, ensuring it works correctly regardless of how the package is installed (npm, pnpm, yarn, or local `file:` link).

### Why This Works

Traditional approaches have limitations:

- **Pre-compiled CSS**: Large bundle, no customization
- **CSS-in-JS**: Runtime overhead, performance cost
- **Complex build pipelines**: Poor developer experience

Source distribution with Tailwind v4's automatic scanning provides:

- Zero runtime overhead (CSS generated at build time)
- Small bundles (only used classes included)
- Full customization (Tailwind's JIT compiler)
- Simple integration (no manual configuration needed)

## Integration with React

### Component Export

Xi components are standard React components:

```tsx
// Compiled from /dist
import { Card, BorderedButton } from "@ryanliu6/xi";

function App() {
  return (
    <>
      <BorderedButton>Click me</BorderedButton>
      <Card title="Project" description="..." link="#" tags={[]} />
    </>
  );
}
```

### Style Primitive Export

Style primitives are exported as type-safe strings:

```tsx
// From /dist/styles
import { bgColour, textStyle } from "@ryanliu6/xi/styles";

function CustomComponent() {
  return (
    <div className={bgColour}>
      <p className={textStyle}>Custom content</p>
    </div>
  );
}
```

### Implementation

Style primitives are defined using `classnames`:

```typescript
// src/styles/index.ts
import classNames from "classnames";

export const bgColour = classNames("bg-violet-50/50 dark:bg-slate-900");
export const textStyle = classNames("text-sm font-roboto text-slate-600 dark:text-zinc-300");
export const buttonStyle = classNames("flex rounded-lg p-2 transition hover:bg-rose-300/30");
```

These compile to simple string exports that are:

- Type-safe (TypeScript knows they're strings)
- Tree-shakeable (unused primitives removed)
- Combinable (work with any Tailwind classes)
- Framework-agnostic (just strings)

## Architecture Overview

### Package Structure

```
@ryanliu6/xi/
├── dist/                  # Compiled code
│   ├── components/        # React components
│   ├── styles/
│   │   ├── index.js       # Style primitive exports
│   │   └── main.css       # Theme configuration
│   └── index.js           # Main entry
│
├── src/                   # Source code (published for Tailwind)
│   ├── components/        # Component source
│   ├── styles/
│   │   ├── index.ts       # Style primitive definitions
│   │   └── main.css       # Theme CSS
│   └── index.ts
│
└── package.json
```

### Export Configuration

```json
{
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./styles": {
      "import": "./dist/styles/index.js",
      "types": "./dist/styles/index.d.ts"
    },
    "./styles.css": "./dist/styles/main.css"
  },
  "files": ["dist", "src"]
}
```

### Usage Patterns

**Pattern 1: Components Only**

```tsx
import { Card } from "@ryanliu6/xi";
<Card {...props} />;
```

**Pattern 2: Style Primitives Only**

```tsx
import { bgColour, textStyle } from "@ryanliu6/xi/styles";
<div className={bgColour}>
  <p className={textStyle}>Content</p>
</div>;
```

**Pattern 3: Hybrid**

```tsx
import { Card, bgColour, textStyle } from "@ryanliu6/xi";
<div className={bgColour}>
  <h1 className={textStyle}>Projects</h1>
  <Card {...props} />
</div>;
```

## Design Decisions

### Why Publish Source Code?

Tailwind v4's `@tailwindcss/vite` plugin scans files for class names at build time. Publishing source code allows the plugin to automatically discover classes used in Xi's components from `node_modules`.

### Why Not Pre-compile CSS?

Pre-compiled CSS would be inflexible and bloated. With Tailwind v4's automatic scanning and JIT compilation, generating CSS on-demand is fast and produces minimal output.

### Why Export Primitives?

Style primitives provide:

- Design consistency without rigid components
- Type-safe styling with TypeScript
- Easy composition with Tailwind utilities
- Foundation for building custom components

### Why Include `@source` in Xi's CSS?

The `@source` directive in Xi's `main.css` is essential for the library to work as a self-contained package.

**The Library-Owned Configuration Pattern:**

Instead of requiring consumers to configure their build tools to scan Xi's source files, Xi declares its own scanning requirements in its CSS. This provides several benefits:

1. **Zero Consumer Configuration**: Users just import the CSS - no build config needed
2. **Path Portability**: The relative path works regardless of package manager (npm, pnpm, yarn) or installation method (published, linked)
3. **Single Source of Truth**: Xi controls its own scanning configuration
4. **Better DX**: One less thing that can go wrong during setup

**Why not in the consumer's config?**

If consumers had to add `@source "node_modules/@ryanliu6/xi/src/**/*"` in their own CSS:

- Breaks with different package managers (pnpm uses `.pnpm/` directory)
- Fails with local development (`file:` dependencies)
- Requires documentation and setup steps users might miss
- Every consumer needs to maintain this configuration

**The CSS-First Advantage:**

Tailwind v4's CSS-first approach allows libraries to be self-describing. When you `@import` Xi's CSS, you're also importing its Tailwind configuration (source paths, custom variants, theme values). This is a fundamental shift from Tailwind v3's JS configuration approach.

### Compatibility

This pattern works with:

- Astro (primary target)
- Next.js
- Vite
- Any framework supporting Tailwind v4

## Benefits

### For Users

- Flexibility: choose components, primitives, or both
- Type safety: full TypeScript support
- Performance: only used styles included (tree-shaking)
- Consistency: unified design language

### For Maintainers

- Single source of truth for styles
- Backward compatible (components unchanged)
- Clear separation: components vs. primitives
- Standard React patterns (no magic)

## Comparison: Before vs. After

### Before v3.1 (Component Library Only)

```tsx
import { Card } from "@ryanliu6/xi";

// Only one way to use Xi
<div className="bg-violet-50 dark:bg-slate-900">
  <Card {...props} />
</div>;
```

### After v3.1 (Hybrid Library)

```tsx
import { Card, bgColour, textStyle } from "@ryanliu6/xi";

// Three usage patterns
<div className={bgColour}>
  {" "}
  {/* Primitive */}
  <h1 className={textStyle}>Projects</h1> {/* Primitive */}
  <Card {...props} /> {/* Component */}
</div>;
```

## Technical Requirements

### Consumer Setup

**Required: Vite plugin configuration**

```js
// astro.config.mjs
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
});
```

**Required: CSS import order**

```css
@import "tailwindcss";
@import "@ryanliu6/xi/styles.css";
```

### Dependencies

- React 18.3+
- Tailwind CSS 4+
- @headlessui/react 2+
- @heroicons/react 2+

## Future Considerations

Potential enhancements:

- Additional granular style primitives
- Theme customization API
- Dynamic class composition utilities
- Tailwind preset for Xi's theme configuration
