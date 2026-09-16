---
title: Authenticate and Authorize Mutations
impact: CRITICAL
impactDescription: prevents unauthorized access to server mutations
tags: server, hono, authentication, authorization, validation, zod
---

## Authenticate and Authorize Mutations

**Impact: CRITICAL (prevents unauthorized access to server mutations)**

Treat every mutation endpoint as a public entry point. Authenticate at the server boundary, validate route params and request bodies, then authorize the specific resource inside the handler. Never rely on a client-side route guard or hidden UI control for server authorization. The examples use Hono route middleware because that is this repository's server framework.

**Incorrect (no authentication check):**

```typescript
const userRoutes = new Hono().delete('/:userId', async (c) => {
  const userId = c.req.param('userId')
  await userRepository.delete(userId)
  return c.json({ success: true }, 200)
})
```

**Correct (route-scoped authentication and resource authorization):**

```typescript
import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { createMiddleware } from 'hono/factory'
import * as z from 'zod'

type Session = {
  user: { id: string; role: 'admin' | 'member' }
}

const requireSession = createMiddleware<{
  Variables: { session: Session }
}>(async (c, next) => {
  const session = await authenticateRequest(c.req.raw)
  if (!session) {
    return c.json(
      { error: { code: 'UNAUTHORIZED', message: 'Sign in required' } },
      401,
    )
  }

  c.set('session', session)
  await next()
})

const userIdSchema = z.object({ userId: z.string().uuid() })

const userRoutes = new Hono().delete(
  '/:userId',
  requireSession,
  zValidator('param', userIdSchema),
  async (c) => {
    const session = c.var.session
    const { userId } = c.req.valid('param')

    if (session.user.role !== 'admin' && session.user.id !== userId) {
      return c.json(
        { error: { code: 'FORBIDDEN', message: 'Insufficient permission' } },
        403,
      )
    }

    await userRepository.delete(userId)
    return c.json({ success: true }, 200)
  },
)
```

**Correct (validate update data and derive identity from the session):**

```typescript
const updateProfileSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.email(),
})

const profileRoutes = new Hono().patch(
  '/',
  requireSession,
  zValidator('json', updateProfileSchema),
  async (c) => {
    const session = c.var.session
    const input = c.req.valid('json')

    const profile = await userRepository.update(session.user.id, input)
    return c.json({ data: profile }, 200)
  },
)
```

Prefer deriving the current user's ID from the authenticated session instead of accepting it in the body. When an endpoint intentionally targets another user, authorize that target explicitly.

Reference: [https://hono.dev/docs/guides/middleware](https://hono.dev/docs/guides/middleware), [https://hono.dev/docs/guides/validation](https://hono.dev/docs/guides/validation)
