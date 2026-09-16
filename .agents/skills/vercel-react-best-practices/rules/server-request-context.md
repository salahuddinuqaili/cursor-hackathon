---
title: Deduplicate Request-Scoped Work
impact: MEDIUM
impactDescription: deduplicates within request
tags: server, hono, context, middleware, deduplication
---

## Deduplicate Request-Scoped Work

Create services at the request boundary and share them only within that request. In Hono, middleware can expose these services through typed context variables. Memoize promises inside the request object when several downstream functions may request the same authentication or database result.

**Incorrect (repeats authentication work):**

```typescript
app.get('/api/dashboard', async (c) => {
  const navigationSession = await authenticateRequest(c.req.raw)
  const permissionSession = await authenticateRequest(c.req.raw)
  return c.json({ navigationSession, permissionSession }, 200)
})
```

**Correct (one request-scoped promise shared by all consumers):**

```typescript
import { Hono } from 'hono'
import { createMiddleware } from 'hono/factory'

type RequestServices = {
  getSession: () => Promise<Session | null>
}

function createRequestServices(request: Request): RequestServices {
  let sessionPromise: Promise<Session | null> | undefined

  return {
    getSession() {
      sessionPromise ??= authenticateRequest(request)
      return sessionPromise
    },
  }
}

const requestServices = createMiddleware<{
  Variables: { services: RequestServices }
}>(async (c, next) => {
  c.set('services', createRequestServices(c.req.raw))
  await next()
})

const app = new Hono()
  .use(requestServices)
  .get('/api/dashboard', async (c) => {
    const navigationSessionPromise = c.var.services.getSession()
    const permissionSessionPromise = c.var.services.getSession()
    const [navigationSession, permissionSession] = await Promise.all([
      navigationSessionPromise,
      permissionSessionPromise,
    ])

    return c.json({ navigationSession, permissionSession }, 200)
  })
```

Hono context variables live only for the current request. Do not place user-specific promises in module scope, and do not turn request memoization into a cross-request cache.

Reference: [https://hono.dev/docs/api/context#set-get](https://hono.dev/docs/api/context#set-get), [https://hono.dev/docs/guides/middleware](https://hono.dev/docs/guides/middleware)
