---
title: Return Minimal React Router Loader Data
impact: LOW
impactDescription: reduces SSR and navigation payloads
tags: server, react-router, loader, serialization, drizzle
---

## Return Minimal React Router Loader Data

**Impact: LOW (reduces SSR and navigation payloads)**

React Router serializes loader data for the initial document and client navigations. Select and return only the fields used by the route; do not return full database records, secrets, or duplicate derived collections.

**Incorrect (returns a complete record):**

```tsx
export async function loader({ params }: Route.LoaderArgs) {
  const user = await userRepository.get(params.userId)
  return { user }
}
```

**Correct (select the route's response shape):**

```tsx
export async function loader({ params }: Route.LoaderArgs) {
  const [profile] = await db
    .select({
      id: users.id,
      displayName: users.displayName,
      avatarUrl: users.avatarUrl,
    })
    .from(users)
    .where(eq(users.id, params.userId))
    .limit(1)

  if (!profile) {
    throw new Response('Not found', { status: 404 })
  }

  return { profile }
}
```

Pass derived data when it is expensive to compute or when returning the source data would expose fields the client does not need. Treat the loader return type as a client-visible serialized contract.

Reference: [React Router data loading](https://reactrouter.com/start/framework/data-loading), [Drizzle partial select](https://orm.drizzle.team/docs/select#partial-select)
