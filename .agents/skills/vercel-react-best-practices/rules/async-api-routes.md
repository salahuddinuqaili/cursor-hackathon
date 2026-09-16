---
title: Prevent Waterfall Chains in Request Handlers
impact: CRITICAL
impactDescription: removes avoidable sequential latency
tags: server, request-handlers, hono-example, waterfalls, parallelization
---

## Prevent Waterfall Chains in Request Handlers

In any request handler, start safe independent operations before awaiting them, then await each result only when its dependencies are available. This repository uses Hono, so the example uses a Hono route.

**Incorrect (config waits for auth, data waits for both):**

```typescript
app.get('/api/dashboard', async (c) => {
  const session = await authenticateRequest(c.req.raw)
  const config = await fetchConfig()
  const data = await fetchData(session.user.id)
  return c.json({ data, config }, 200)
})
```

**Correct (auth and config start immediately):**

```typescript
app.get('/api/dashboard', async (c) => {
  const sessionPromise = authenticateRequest(c.req.raw)
  const configPromise = fetchConfig()
  const session = await sessionPromise

  if (!session) {
    return c.json({ error: { code: 'UNAUTHORIZED', message: 'Sign in required' } }, 401)
  }

  const [config, data] = await Promise.all([
    configPromise,
    fetchData(session.user.id),
  ])
  return c.json({ data, config }, 200)
})
```

Do not move authentication or authorization after protected work. Start operations early only when they are safe to run before the request is authorized.

Reference: [MDN `Promise.all()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)
