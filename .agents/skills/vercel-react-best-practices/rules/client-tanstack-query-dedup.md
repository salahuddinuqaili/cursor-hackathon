---
title: Use TanStack Query for Shared Server State
impact: MEDIUM-HIGH
impactDescription: shared caching and request deduplication
tags: client, tanstack-query, deduplication, data-fetching, typescript
---

## Use TanStack Query for Shared Server State

TanStack Query shares cached server state by query key, coordinates concurrent consumers, and provides explicit stale-time and invalidation controls. Define reusable typed query options so every consumer uses the same key and fetch function.

**Incorrect (no deduplication, each instance fetches):**

```tsx
function UserList() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    fetch('/api/users')
      .then((response) => response.json())
      .then(setUsers)
  }, [])
}
```

**Correct (multiple instances share one request):**

```tsx
import { queryOptions, useQuery } from '@tanstack/react-query'
import * as z from 'zod'

const userSchema = z.object({
  id: z.string(),
  name: z.string(),
})

type User = z.infer<typeof userSchema>

const usersQuery = queryOptions({
  queryKey: ['users'],
  queryFn: async (): Promise<User[]> => {
    const response = await fetch('/api/users')
    if (!response.ok) {
      throw new Error(`Users request failed: ${response.status}`)
    }
    return z.array(userSchema).parse(await response.json())
  },
  staleTime: 60_000,
})

function UserList() {
  const { data: users = [] } = useQuery(usersQuery)
}
```

Multiple mounted `UserList` instances observe the same query instead of maintaining independent effect state.

**For long-lived configuration:**

```tsx
const configurationQuery = queryOptions({
  queryKey: ['configuration'],
  queryFn: fetchConfiguration,
  staleTime: Number.POSITIVE_INFINITY,
})

function StaticContent() {
  const { data } = useQuery(configurationQuery)
}
```

**For mutations:**

```tsx
import { useMutation, useQueryClient } from '@tanstack/react-query'

function UpdateButton() {
  const queryClient = useQueryClient()
  const updateMutation = useMutation({
    mutationFn: () => updateCurrentUser(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
  })

  return (
    <button onClick={() => updateMutation.mutate()}>
      Update
    </button>
  )
}
```

Choose `staleTime` from the data's freshness requirements. Do not set infinity by default, and do not use TanStack Query for local UI state.

Reference: [https://tanstack.com/query/latest/docs/framework/react/reference/useQuery](https://tanstack.com/query/latest/docs/framework/react/reference/useQuery), [https://tanstack.com/query/latest/docs/framework/react/guides/query-options](https://tanstack.com/query/latest/docs/framework/react/guides/query-options)
