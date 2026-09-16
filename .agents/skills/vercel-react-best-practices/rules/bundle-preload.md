---
title: Preload Based on User Intent
impact: MEDIUM
impactDescription: reduces perceived latency
tags: bundle, preload, user-intent, hover
---

## Preload Based on User Intent

Prefetch route modules and data when user intent makes the next navigation likely. In React Router, prefer the built-in `Link` prefetch behavior so module and loader-data prefetching stay coordinated.

**Example (preload on hover/focus):**

```tsx
import { Link } from 'react-router'

function DashboardLink() {
  return (
    <Link to="/dashboard" prefetch="intent">
      Dashboard
    </Link>
  )
}
```

**Example (preload an optional non-route module on intent):**

```tsx
function EditorButton({ onClick }: { onClick: () => void }) {
  const preload = () => {
    void import('./monaco-editor').catch((error: unknown) => {
      reportIntegrationLoadError(error)
    })
  }

  return (
    <button onMouseEnter={preload} onFocus={preload} onClick={onClick}>
      Open editor
    </button>
  )
}
```

Prefetch only likely next actions. Over-prefetching wastes bandwidth and competes with critical resources.
Calling `import()` also evaluates the module, so use this for side-effect-free modules or modules whose initialization is safe on intent.

Reference: [https://reactrouter.com/api/components/Link#prefetch](https://reactrouter.com/api/components/Link#prefetch)
