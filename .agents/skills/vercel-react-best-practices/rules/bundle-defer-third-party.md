---
title: Defer Non-Critical Third-Party Libraries
impact: MEDIUM
impactDescription: loads after hydration
tags: bundle, third-party, analytics, defer
---

## Defer Non-Critical Third-Party Libraries

Analytics and other non-critical browser integrations should not inflate or execute in the initial route bundle. Load them from an effect after hydration when the integration does not need to capture the first paint.

**Incorrect (blocks initial bundle):**

```tsx
import { startAnalytics } from './analytics'

function AnalyticsLoader() {
  useEffect(() => startAnalytics(), [])
  return null
}
```

**Correct (loads after hydration):**

```tsx
import { useEffect } from 'react'

function AnalyticsLoader() {
  useEffect(() => {
    let cancelled = false
    let dispose: (() => void) | undefined

    void import('./analytics')
      .then(({ startAnalytics }) => {
        if (!cancelled) {
          dispose = startAnalytics()
        }
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          reportIntegrationLoadError(error)
        }
      })

    return () => {
      cancelled = true
      dispose?.()
    }
  }, [])

  return null
}
```

Keep error reporting that must capture bootstrap failures in the initial path. Measure before deferring any integration with correctness requirements.

Reference: [https://vite.dev/guide/features.html#dynamic-import](https://vite.dev/guide/features.html#dynamic-import)
