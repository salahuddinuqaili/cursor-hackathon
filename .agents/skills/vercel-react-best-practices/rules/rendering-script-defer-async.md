---
title: Use defer or async on Script Tags
impact: HIGH
impactDescription: prevents parser blocking for eligible external scripts
tags: rendering, script, defer, async, performance
---

## Use defer or async on Script Tags

Classic external scripts in the document head block HTML parsing while they download and execute unless they use `defer` or `async`. This can delay rendering.

- **`defer`**: Downloads in parallel, executes after HTML parsing completes, maintains execution order
- **`async`**: Downloads in parallel, executes when ready, may interrupt parsing during execution, and has no guaranteed order

Use `defer` for scripts that depend on DOM or other scripts. Use `async` for independent scripts like analytics.

**Incorrect (classic scripts block HTML parsing):**

```tsx
export default function Document() {
  return (
    <html>
      <head>
        <script src="https://example.com/analytics.js" />
        <script src="/scripts/utils.js" />
      </head>
      <body>{/* content */}</body>
    </html>
  )
}
```

**Correct (parallel downloads with intentional execution ordering):**

```tsx
export default function Document() {
  return (
    <html>
      <head>
        {/* Independent script - use async */}
        <script src="https://example.com/analytics.js" async />
        {/* DOM-dependent script - use defer */}
        <script src="/scripts/utils.js" defer />
      </head>
      <body>{/* content */}</body>
    </html>
  )
}
```

Prefer module imports for application code so Vite can analyze and bundle dependencies. Reserve raw script tags for external or standalone scripts, and pair `async` or `defer` with the script's ordering requirements.

Reference: [MDN - Script element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#defer)
