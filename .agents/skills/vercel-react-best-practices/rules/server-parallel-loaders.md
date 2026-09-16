---
title: Parallelize Independent React Router Loader Work
impact: CRITICAL
impactDescription: removes avoidable sequential waits inside loaders
tags: server, react-router, loader, parallel-fetching, promises
---

## Parallelize Independent React Router Loader Work

Sequential awaits inside one loader create a waterfall regardless of how the router schedules other routes. Start independent repository or service calls together and await them with `Promise.all()`.

**Incorrect (summary waits for profile):**

```tsx
export async function loader({ request }: Route.LoaderArgs) {
  const profile = await loadProfile(request)
  const summary = await loadTrainingSummary(request)
  return { profile, summary }
}
```

**Correct (both operations start immediately):**

```tsx
export async function loader({ request }: Route.LoaderArgs) {
  const [profile, summary] = await Promise.all([
    loadProfile(request),
    loadTrainingSummary(request),
  ])
  return { profile, summary }
}
```

Keep dependent operations chained in dependency order, and preserve authorization checks before starting protected work.

Reference: [React Router data loading](https://reactrouter.com/start/framework/data-loading), [MDN `Promise.all()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)
