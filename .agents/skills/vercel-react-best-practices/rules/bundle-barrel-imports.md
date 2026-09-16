---
title: Avoid Barrel File Imports
impact: CRITICAL
impactDescription: keeps module graphs narrow when packages expose subpaths
tags: bundle, imports, tree-shaking, barrel-files, performance
---

## Avoid Barrel File Imports

Prefer documented package subpath exports when a package's root entry point re-exports a large component surface. **Barrel files** are entry points that re-export many modules.

Do not deep-import undocumented internal files. Use only subpaths declared by the package, and verify the built bundle before assuming a root import is expensive; Vite can tree-shake many ESM packages successfully.

**Potentially broad (root barrel exposes the full component surface):**

```tsx
import { Button, Dialog, Input } from '@base-ui/react'
```

**Correct (documented Base UI subpath exports):**

```typescript
import { Button } from '@base-ui/react/button'
import { Dialog } from '@base-ui/react/dialog'
import { Input } from '@base-ui/react/input'
```

This keeps Base UI imports typed and aligned with its documented API surface. Apply the same rule only when another package documents stable subpath exports.

Reference: [https://base-ui.com/react/overview/quick-start](https://base-ui.com/react/overview/quick-start)
