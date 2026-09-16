---
title: Dynamic Imports for Heavy Components
impact: CRITICAL
impactDescription: directly affects TTI and LCP
tags: bundle, dynamic-import, code-splitting, react, vite, react-router
---

## Dynamic Imports for Heavy Components

React Router framework mode automatically code-splits route modules. For heavy non-route components that are not needed on the initial render, use `lazy()` with a literal dynamic import and a focused Suspense fallback.

**Incorrect (the optional editor remains in the eager module graph):**

```tsx
import { MonacoEditor } from './monaco-editor'

function CodePanel({ code }: { code: string }) {
  return <MonacoEditor value={code} />
}
```

**Correct (Monaco loads on demand):**

```tsx
import { lazy, Suspense } from 'react'

const MonacoEditor = lazy(
  () =>
    import('./monaco-editor').then(({ MonacoEditor }) => ({
      default: MonacoEditor,
    })),
)

function CodePanel({ code }: { code: string }) {
  return (
    <Suspense fallback={<EditorSkeleton />}>
      <MonacoEditor value={code} />
    </Suspense>
  )
}
```

Do not wrap every component in `lazy()`. Keep above-the-fold UI eager, rely on React Router's route splitting for route modules, and split only measured heavy, optional surfaces.

Reference: [https://react.dev/reference/react/lazy](https://react.dev/reference/react/lazy), [https://reactrouter.com/explanation/code-splitting](https://reactrouter.com/explanation/code-splitting)
