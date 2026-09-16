---
title: Return Minimal API Payloads
impact: HIGH
impactDescription: reduces data transfer size
tags: server, hono, serialization, api, typescript
---

## Return Minimal API Payloads

Every serialized response property becomes part of the public network contract and transfer payload. Return an intentional response DTO rather than serializing a database row or domain object wholesale. The example uses Hono's `c.json()`.

**Incorrect (serializes the complete record):**

```typescript
app.get('/api/users/:userId', async (c) => {
  const user = await userRepository.get(c.req.param('userId'))
  return c.json({ data: user }, 200)
})
```

**Correct (serializes only the required fields):**

```typescript
type UserSummary = {
  id: string
  displayName: string
  avatarUrl: string | null
}

app.get('/api/users/:userId', async (c) => {
  const user = await userRepository.get(c.req.param('userId'))

  if (!user) {
    return c.json(
      { error: { code: 'NOT_FOUND', message: 'User not found' } },
      404,
    )
  }

  const data: UserSummary = {
    id: user.id,
    displayName: user.displayName,
    avatarUrl: user.avatarUrl,
  }

  return c.json({ data }, 200)
})
```

Prefer selecting the response fields directly in Drizzle when possible so unused columns are not loaded. Never expose password hashes, internal flags, tokens, or audit metadata and assume the client will ignore them.

Reference: [Hono JSON responses](https://hono.dev/docs/api/context#json), [Drizzle partial select](https://orm.drizzle.team/docs/select#partial-select)
