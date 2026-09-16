---
title: Hoist Immutable Static I/O to Module Level
impact: HIGH
impactDescription: avoids repeated file I/O per request
tags: server, node, hono-example, io, performance, static-data
---

## Hoist Immutable Static I/O to Module Level

When a server module owns immutable configuration or templates, load and validate that data during module initialization instead of repeating the same I/O in every request. Keep request-specific, mutable, large, or secret data out of this pattern. This repository's example uses Hono on Node.js.

**Incorrect (reads immutable config on every request):**

```typescript
import { readFile } from 'node:fs/promises'

app.get('/api/configuration', async (c) => {
  const text = await readFile(
    new URL('./configuration.json', import.meta.url),
    'utf8',
  )
  const configuration = configurationSchema.parse(JSON.parse(text))
  return c.json({ data: configuration }, 200)
})
```

**Correct (load and validate immutable I/O during module initialization):**

```typescript
import { readFile } from 'node:fs/promises'
import { Hono } from 'hono'

const configurationText = await readFile(
  new URL('./configuration.json', import.meta.url),
  'utf8',
)
const configuration = configurationSchema.parse(JSON.parse(configurationText))

const app = new Hono().get('/api/configuration', (c) => {
  return c.json({ data: configuration }, 200)
})
```

Use this pattern for:

- Configuration files that do not change at runtime
- Static email or export templates
- Small static data shared by every request

Do not use it for:

- Data that varies by request or user
- Files that may change during runtime
- Large files that should not remain resident in memory
- Sensitive values that should not be retained longer than necessary

Top-level initialization failure prevents the module from loading instead of leaving the application with invalid configuration. If a transient failure should be retried without restarting, use an explicit retrying loader at the infrastructure boundary instead.

Reference: [Node.js top-level `await`](https://nodejs.org/api/esm.html#top-level-await), [Node.js `fs/promises`](https://nodejs.org/api/fs.html#promises-api)
