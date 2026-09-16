---
title: Prefer HTTP Caching Over Process-Local Caches
impact: HIGH
impactDescription: reuses safe responses without hidden process state
tags: server, hono, http-cache, etag, cache-control
---

## Prefer HTTP Caching Over Process-Local Caches

Avoid ad hoc module-level caches for application data. They are process-local, disappear on restart, diverge across replicas, and can serve stale or cross-user data when keys are incomplete. For safe public GET responses, prefer explicit HTTP validators and cache directives.

**Incorrect (hidden process-local state):**

```typescript
const exerciseCache = new Map<string, Exercise>()

export async function getExercise(id: string) {
  const cached = exerciseCache.get(id)
  if (cached) return cached

  const exercise = await exerciseRepository.get(id)
  exerciseCache.set(id, exercise)
  return exercise
}
```

**Correct (Hono ETag and explicit cache policy):**

```typescript
import { Hono } from 'hono'
import { etag } from 'hono/etag'

const exerciseRoutes = new Hono()
  .use('*', etag())
  .get('/:exerciseId', async (c) => {
    const exercise = await exerciseRepository.get(c.req.param('exerciseId'))

    if (!exercise) {
      return c.json(
        { error: { code: 'NOT_FOUND', message: 'Exercise not found' } },
        404,
      )
    }

    c.header('Cache-Control', 'public, max-age=60, stale-while-revalidate=300')
    return c.json({ data: exercise }, 200)
  })
```

For authenticated or user-specific responses, use `private` when a browser cache may store the response and `no-store` when it must not be stored. Never mark such responses `public` unless the complete cache key, authorization boundary, and invalidation behavior are deliberately designed. Use TanStack Query for client-side reuse; keep durable data in SQLite or another shared source of truth.

Reference: [Hono ETag middleware](https://hono.dev/docs/middleware/builtin/etag), [HTTP caching](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Caching)
