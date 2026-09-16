---
title: React 19 API Changes
impact: MEDIUM
impactDescription: cleaner component definitions and context usage
tags: react19, refs, context, hooks
---

## React 19 API Changes

> **⚠️ React 19+ only.** Skip this if you're on React 18 or earlier.

In React 19, `ref` is now a regular prop (no `forwardRef` wrapper needed), and `use()` replaces `useContext()`.

**Incorrect (forwardRef in React 19):**

```tsx
import { Input } from '@base-ui/react/input'
import { forwardRef } from 'react'

const ComposerInput = forwardRef<HTMLInputElement, Input.Props>((props, ref) => {
  return <Input ref={ref} {...props} />
})
```

**Correct (ref as a regular prop):**

```tsx
import { Input } from '@base-ui/react/input'
import type { Ref } from 'react'

function ComposerInput({
  ref,
  ...props
}: Input.Props & { ref?: Ref<HTMLInputElement> }) {
  return <Input ref={ref} {...props} />
}
```

**Incorrect (useContext in React 19):**

```tsx
const value = useContext(MyContext)
```

**Correct (use instead of useContext):**

```tsx
const value = use(MyContext)
```

`use()` can also be called conditionally, unlike `useContext()`.

Reference: [React 19: `ref` as a prop](https://react.dev/blog/2024/12/05/react-19#ref-as-a-prop), [React `use`](https://react.dev/reference/react/use), [Base UI TypeScript](https://base-ui.com/react/handbook/typescript)
