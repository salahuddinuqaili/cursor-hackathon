---
title: Dependency-Based Parallelization
impact: CRITICAL
impactDescription: removes avoidable waits between partially dependent operations
tags: async, parallelization, dependencies, promises, typescript
---

## Dependency-Based Parallelization

For operations with partial dependencies, create native promises as soon as their own inputs are available. Chain dependent work from the promise it needs, then await the complete graph together.

**Incorrect (profile waits for config unnecessarily):**

```typescript
const [user, config] = await Promise.all([
  fetchUser(),
  fetchConfig()
])
const profile = await fetchProfile(user.id)
```

**Correct (native promises preserve the dependency graph):**

```typescript
const userPromise = fetchUser()
const configPromise = fetchConfig()
const profilePromise = userPromise.then((user) => fetchProfile(user.id))

const [user, config, profile] = await Promise.all([
  userPromise,
  configPromise,
  profilePromise,
])
```

This keeps the dependency graph explicit, typed, and free of a project-external orchestration library. Handle failures at the boundary that owns the operation; `Promise.all()` rejects as soon as one input rejects.

Reference: [MDN `Promise.all()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)
