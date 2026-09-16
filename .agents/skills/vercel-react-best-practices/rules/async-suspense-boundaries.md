---
title: Strategic Suspense Boundaries
impact: HIGH
impactDescription: faster initial paint
tags: async, suspense, streaming, layout-shift
---

## Strategic Suspense Boundaries

In React Router framework mode, await critical loader data and return non-critical promises without awaiting them. Render those promises inside focused Suspense boundaries so the route shell can stream first.

**Incorrect (wrapper blocked by data fetching):**

```tsx
import type { Route } from './+types/dashboard'

export async function loader(): Promise<{ data: Data }> {
  const data = await fetchData()
  return { data }
}
```

The route waits for all data even though only one section needs it.

**Correct (the route shell can stream before non-critical data resolves):**

```tsx
import { Suspense, use } from 'react'
import type { Route } from './+types/dashboard'

export async function loader() {
  const criticalData = await fetchCriticalData()
  const nonCriticalData = fetchNonCriticalData()

  return { criticalData, nonCriticalData }
}

export default function Dashboard({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <DashboardHeader data={loaderData.criticalData} />
      <Suspense fallback={<DashboardDetailsSkeleton />}>
        <DashboardDetails dataPromise={loaderData.nonCriticalData} />
      </Suspense>
    </div>
  )
}

function DashboardDetails({ dataPromise }: { dataPromise: Promise<Data> }) {
  const data = use(dataPromise)
  return <div>{data.content}</div>
}
```

The route shell and critical header can stream before the non-critical promise settles. Only the details section suspends.

**Correct (share one loader promise across consumers):**

```tsx
function DashboardBody({ dataPromise }: { dataPromise: Promise<Data> }) {
  return (
    <Suspense fallback={<DashboardDetailsSkeleton />}>
      <DataDisplay dataPromise={dataPromise} />
      <DataSummary dataPromise={dataPromise} />
    </Suspense>
  )
}

function DataDisplay({ dataPromise }: { dataPromise: Promise<Data> }) {
  const data = use(dataPromise) // Unwraps the promise
  return <div>{data.content}</div>
}

function DataSummary({ dataPromise }: { dataPromise: Promise<Data> }) {
  const data = use(dataPromise) // Reuses the same promise
  return <div>{data.summary}</div>
}
```

Both components share the same promise, so only one fetch occurs. The surrounding layout can render while both components wait together.

Provide a route `ErrorBoundary` for rejected loader promises; Suspense handles the pending state, not errors.

**When NOT to use this pattern:**

- Critical data needed for layout decisions (affects positioning)
- Content that must be present in the initial response
- Small, fast queries where suspense overhead isn't worth it
- When you want to avoid layout shift (loading → content jump)

**Trade-off:** Faster initial paint vs potential layout shift. Choose based on your UX priorities.

Reference: [https://reactrouter.com/how-to/suspense](https://reactrouter.com/how-to/suspense)
