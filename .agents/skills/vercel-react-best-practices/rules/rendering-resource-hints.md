---
title: Use React DOM Resource Hints
impact: HIGH
impactDescription: can reduce connection and fetch latency for known critical resources
tags: rendering, preload, preconnect, prefetch, resource-hints
---

## Use React DOM Resource Hints

React DOM provides APIs to hint the browser about resources it will need. During server rendering, call them while rendering a component so React can include the hints in the response.

- **`prefetchDNS(href)`**: Resolve DNS for a domain you expect to connect to
- **`preconnect(href)`**: Establish connection (DNS + TCP + TLS) to a server
- **`preload(href, options)`**: Fetch a resource (stylesheet, font, script, image) you'll use soon
- **`preloadModule(href)`**: Fetch an ES module you'll use soon
- **`preinit(href, options)`**: Fetch and evaluate a stylesheet or script
- **`preinitModule(href)`**: Fetch and evaluate an ES module

**Example (preconnect to third-party APIs):**

```tsx
import { preconnect, prefetchDNS } from 'react-dom'

export default function App() {
  prefetchDNS('https://analytics.example.com')
  preconnect('https://api.example.com')

  return <main>{/* content */}</main>
}
```

**Example (preload critical fonts and styles):**

```tsx
import { preload, preinit } from 'react-dom'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Preload font file
  preload('/fonts/inter.woff2', { as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' })

  // Fetch and apply critical stylesheet immediately
  preinit('/styles/critical.css', { as: 'style' })

  return (
    <html>
      <body>{children}</body>
    </html>
  )
}
```

**Example (let React Router prefetch route modules and data):**

```tsx
import { Link } from 'react-router'

function Navigation() {
  return (
    <nav>
      <Link to="/dashboard" prefetch="intent">
        Dashboard
      </Link>
    </nav>
  )
}
```

**When to use each:**

| API | Use case |
|-----|----------|
| `prefetchDNS` | Third-party domains you'll connect to later |
| `preconnect` | APIs or CDNs you'll fetch from immediately |
| `preload` | Critical resources needed for current page |
| `preloadModule` | ESM modules outside React Router's route prefetching |
| `preinit` | Stylesheets/scripts that must execute early |
| `preinitModule` | ES modules that must execute early |

Prefer `<Link prefetch="intent">` for route navigation because React Router coordinates both module and loader-data prefetching.

Add hints only for resources that are likely to be used. Unnecessary preloads and preconnects consume bandwidth, connections, and browser scheduling capacity.

Reference: [React DOM Resource Preloading APIs](https://react.dev/reference/react-dom#resource-preloading-apis), [https://reactrouter.com/api/components/Link#prefetch](https://reactrouter.com/api/components/Link#prefetch)
