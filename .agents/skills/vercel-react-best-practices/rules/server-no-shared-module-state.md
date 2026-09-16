---
title: Avoid Shared Module State for Request Data
impact: HIGH
impactDescription: prevents concurrency bugs and request data leaks
tags: server, hono, ssr, concurrency, security, context
---

## Avoid Shared Module State for Request Data

Hono handlers and React Router server renders can run concurrently in the same Node.js process. Never use mutable module-level variables for request or user data. One request can overwrite the value while another is still reading it, causing races and cross-user leaks.

Treat module scope on the server as process-wide shared memory, not request-local state.

**Incorrect (request data leaks across concurrent handlers):**

```typescript
let currentUser: User | null = null

app.get('/api/me', async (c) => {
  currentUser = await authenticateRequest(c.req.raw)
  const preferences = currentUser
    ? await userRepository.getPreferences(currentUser.id)
    : null
  return c.json({ user: currentUser, preferences }, 200)
})
```

If two requests overlap while request A awaits preferences, request B can overwrite `currentUser` before request A creates its response.

**Correct (keep request data in typed Hono context):**

```typescript
const currentUserMiddleware = createMiddleware<{
  Variables: { currentUser: User | null }
}>(async (c, next) => {
  c.set('currentUser', await authenticateRequest(c.req.raw))
  await next()
})

const app = new Hono()
  .use(currentUserMiddleware)
  .get('/api/me', (c) => c.json({ user: c.var.currentUser }, 200))
```

Safe exceptions:

- Immutable static assets or config loaded once at module scope
- Shared caches intentionally designed for cross-request reuse and keyed correctly
- Process-wide singletons that do not store request- or user-specific mutable data

For static assets and config, see [Hoist Static I/O to Module Level](./server-hoist-static-io.md).

Reference: [https://hono.dev/docs/api/context#set-get](https://hono.dev/docs/api/context#set-get)
