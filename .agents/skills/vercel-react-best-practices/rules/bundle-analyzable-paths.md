---
title: Prefer Statically Analyzable Paths
impact: HIGH
impactDescription: avoids accidental broad bundles and file traces
tags: bundle, vite, dynamic-import, import-meta-glob
---

## Prefer Statically Analyzable Paths

Vite works best when import paths are obvious at build time. If you hide a path inside a variable or compose it too dynamically, Vite may be unable to determine the intended module set or may include more modules than expected.

Prefer explicit loader maps for a small known set and `import.meta.glob()` with a literal pattern for larger sets.

When analysis becomes too broad, the cost is real:
- Larger client bundles
- Slower builds
- More memory use

### Import Paths

**Incorrect (the bundler cannot tell what may be imported):**

```ts
const PAGE_MODULES = {
  home: './pages/home',
  settings: './pages/settings',
} as const

const pageModule = await import(PAGE_MODULES[pageName])
```

**Correct (use an explicit map of allowed modules):**

```ts
const PAGE_MODULES = {
  home: () => import('./pages/home'),
  settings: () => import('./pages/settings'),
} as const

type PageName = keyof typeof PAGE_MODULES

async function loadPage(pageName: PageName) {
  return PAGE_MODULES[pageName]()
}
```

**Correct (use a literal Vite glob for a larger set):**

```typescript
import type { ComponentType } from 'react'

const pageModules = import.meta.glob<{ default: ComponentType }>(
  './pages/*.tsx',
)
```

The `import.meta.glob()` arguments must remain literals. Do not interpolate user-controlled values into import paths; constrain selection to known keys.

Reference: [https://vite.dev/guide/features.html#glob-import](https://vite.dev/guide/features.html#glob-import)
