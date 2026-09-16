---
name: vercel-react-best-practices
description: TypeScript React performance guidelines adapted for Vite, React Router, TanStack Query, React Compiler, and this project's server boundaries. Use when writing, reviewing, or refactoring React code, route loaders, data fetching, bundle behavior, rendering, or performance-sensitive TypeScript.
license: MIT
metadata:
  author: vercel
  version: "1.0.0"
---

# Vercel React Best Practices

Performance optimization guide adapted from Vercel Engineering for this repository's TypeScript, React, React Router, Vite, Hono, TanStack Query, and React Compiler stack. Contains 69 rules across 8 categories, prioritized by impact.

## When to Apply

Reference these guidelines when:
- Writing new React components or React Router route modules
- Implementing TanStack Query, React Router loader, or full-stack data flows that support React routes
- Reviewing code for performance issues
- Refactoring existing TypeScript React code
- Optimizing bundle size or load times

## Rule Categories by Priority

| Priority | Category | Impact | Prefix |
|----------|----------|--------|--------|
| 1 | Eliminating Waterfalls | CRITICAL | `async-` |
| 2 | Bundle Size Optimization | CRITICAL | `bundle-` |
| 3 | Server-Side Performance | HIGH | `server-` |
| 4 | Client-Side Data Fetching | MEDIUM-HIGH | `client-` |
| 5 | Re-render Optimization | MEDIUM | `rerender-` |
| 6 | Rendering Performance | MEDIUM | `rendering-` |
| 7 | JavaScript Runtime Performance | LOW-MEDIUM | `js-` |
| 8 | Advanced Patterns | LOW | `advanced-` |

## Quick Reference

### 1. Eliminating Waterfalls (CRITICAL)

- `async-cheap-condition-before-await` - Check cheap sync conditions before awaiting flags or remote values
- `async-defer-await` - Move await into branches where actually used
- `async-parallel` - Use Promise.all() for independent operations
- `async-dependencies` - Represent partial dependencies with native promise chains
- `async-api-routes` - Start safe independent work early in request handlers
- `async-suspense-boundaries` - Stream non-critical React Router loader promises

### 2. Bundle Size Optimization (CRITICAL)

- `bundle-barrel-imports` - Import directly, avoid barrel files
- `bundle-analyzable-paths` - Prefer statically analyzable import and file-system paths to avoid broad bundles and traces
- `bundle-dynamic-imports` - Use React lazy and Vite dynamic imports for heavy optional components
- `bundle-defer-third-party` - Dynamically load non-critical browser integrations after hydration
- `bundle-conditional` - Load modules only when feature is activated
- `bundle-preload` - Use React Router intent prefetching for likely navigation

### 3. Server-Side Performance (HIGH)

- `server-auth-mutations` - Authenticate and authorize mutation endpoints
- `server-request-context` - Deduplicate work within a request boundary
- `server-http-caching` - Prefer explicit HTTP caching over process-local caches
- `server-minimize-route-data` - Return only the React Router loader data a route needs
- `server-hoist-static-io` - Hoist immutable static I/O to module level
- `server-no-shared-module-state` - Keep request data out of mutable module scope
- `server-minimize-api-payloads` - Return intentional response DTOs
- `server-parallel-loaders` - Parallelize independent React Router loader work
- `server-parallel-nested-fetching` - Chain nested fetches per item in Promise.all

### 4. Client-Side Data Fetching (MEDIUM-HIGH)

- `client-tanstack-query-dedup` - Share server state through typed TanStack Query options
- `client-event-listeners` - Deduplicate global event listeners
- `client-passive-event-listeners` - Use passive listeners for scroll
- `client-localstorage-schema` - Version and minimize localStorage data

### 5. Re-render Optimization (MEDIUM)

React Compiler handles routine component and value memoization. Apply the manual memoization rules below only when profiling identifies a remaining hot path or when stable identity is part of an external API contract.

- `rerender-defer-reads` - Don't subscribe to state only used in callbacks
- `rerender-memo` - Extract expensive work into memoized components
- `rerender-memo-with-default-value` - Hoist default non-primitive props
- `rerender-dependencies` - Use primitive dependencies in effects
- `rerender-derived-state` - Subscribe to derived booleans, not raw values
- `rerender-derived-state-no-effect` - Derive state during render, not effects
- `rerender-functional-setstate` - Use functional setState for stable callbacks
- `rerender-lazy-state-init` - Pass function to useState for expensive values
- `rerender-simple-expression-in-memo` - Avoid memo for simple primitives
- `rerender-split-combined-hooks` - Split hooks with independent dependencies
- `rerender-move-effect-to-event` - Put interaction logic in event handlers
- `rerender-transitions` - Use startTransition for non-urgent updates
- `rerender-use-deferred-value` - Defer expensive renders to keep input responsive
- `rerender-use-ref-transient-values` - Use refs for transient frequent values
- `rerender-no-inline-components` - Don't define components inside components

### 6. Rendering Performance (MEDIUM)

- `rendering-animate-svg-wrapper` - Animate div wrapper, not SVG element
- `rendering-content-visibility` - Use content-visibility for long lists
- `rendering-hoist-jsx` - Extract static JSX outside components
- `rendering-svg-precision` - Reduce SVG coordinate precision
- `rendering-hydration-no-flicker` - Use inline script for client-only data
- `rendering-hydration-suppress-warning` - Suppress expected mismatches
- `rendering-activity` - Use Activity component for show/hide
- `rendering-conditional-render` - Use ternary, not && for conditionals
- `rendering-usetransition-loading` - Prefer useTransition for loading state
- `rendering-resource-hints` - Use React DOM resource hints for preloading
- `rendering-script-defer-async` - Use defer or async on script tags

### 7. JavaScript Runtime Performance (LOW-MEDIUM)

TypeScript types are erased during compilation, so these rules address the JavaScript that runs in the browser or Node.js. Their examples use TypeScript to match this repository.

- `js-batch-dom-css` - Group CSS changes via classes or cssText
- `js-index-maps` - Build Map for repeated lookups
- `js-cache-property-access` - Cache object properties in loops
- `js-cache-function-results` - Cache typed function results in a Map
- `js-cache-storage` - Cache localStorage/sessionStorage reads
- `js-combine-iterations` - Combine multiple filter/map operations in measured hot paths
- `js-length-check-first` - Check array length before expensive comparison
- `js-early-exit` - Return early from functions
- `js-hoist-regexp` - Hoist RegExp creation outside loops
- `js-min-max-loop` - Use a loop for min/max instead of sorting
- `js-set-map-lookups` - Use Set/Map for repeated lookups
- `js-tosorted-immutable` - Use toSorted() for immutable collection handling
- `js-flatmap-filter` - Use flatMap to map and filter in one pass
- `js-request-idle-callback` - Defer non-critical browser work to idle time

Reference: [TypeScript Erased Types](https://www.typescriptlang.org/docs/handbook/2/basic-types.html#erased-types)

### 8. Advanced Patterns (LOW)

- `advanced-effect-event-deps` - Don't put `useEffectEvent` results in effect deps
- `advanced-event-handler-refs` - Store event handlers in refs
- `advanced-init-once` - Initialize app once per app load
- `advanced-use-latest` - useLatest for stable callback refs

## How to Use

Read individual rule files for detailed explanations and code examples:

```
rules/async-parallel.md
rules/bundle-barrel-imports.md
```

Each rule file contains:
- Brief explanation of why it matters
- Incorrect code example with explanation
- Correct code example with explanation
- Additional context and references

## Full Compiled Document

For the complete guide with all rules expanded: `AGENTS.md`
