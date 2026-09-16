---
title: Keep React Router Hydration Deterministic
impact: LOW-MEDIUM
impactDescription: prevents hydration warnings and discarded server markup
tags: rendering, hydration, ssr, react-router
---

## Keep React Router Hydration Deterministic

React Router server rendering requires the initial client render to match the server output. Pass deterministic loader data into the route component, use React's `useId()` for generated IDs, and delay browser-only values until after hydration.

**Incorrect (the server and client can render different values):**

```tsx
function Timestamp() {
  return <span>{new Date().toLocaleString()}</span>
}
```

**Correct (render a stable server value):**

```tsx
import type { Route } from './+types/activity'

export function loader() {
  return { renderedAt: new Date().toISOString() }
}

export default function Activity({ loaderData }: Route.ComponentProps) {
  return <time dateTime={loaderData.renderedAt}>{loaderData.renderedAt}</time>
}
```

Use `suppressHydrationWarning` only for a single text or attribute whose mismatch is intentional and unavoidable. It is an escape hatch, applies only one level deep, and must not conceal structural differences or a value that can be made deterministic.

Reference: [https://react.dev/reference/react-dom/client/hydrateRoot](https://react.dev/reference/react-dom/client/hydrateRoot), [https://reactrouter.com/start/framework/data-loading](https://reactrouter.com/start/framework/data-loading)
