---
title: Deduplicate Global Event Listeners
impact: LOW
impactDescription: single listener for N components
tags: client, react, event-listeners, subscription, useEffectEvent
---

## Deduplicate Global Event Listeners

Use a small module-level subscription registry when many component instances need the same global browser event. Keep one DOM listener, subscribe components through a typed function, and remove the DOM listener when the last subscriber leaves.

**Incorrect (N instances = N listeners):**

```tsx
function useKeyboardShortcut(key: string, callback: () => void) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === key) {
        callback()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [key, callback])
}
```

When using the `useKeyboardShortcut` hook multiple times, each instance will register a new listener.

**Correct (N instances share one listener):**

```tsx
import { useEffect, useEffectEvent } from 'react'

type ShortcutListener = (event: KeyboardEvent) => void

const shortcutListeners = new Map<string, Set<ShortcutListener>>()

function handleGlobalKeyDown(event: KeyboardEvent) {
  if (!event.metaKey && !event.ctrlKey) {
    return
  }

  const listeners = shortcutListeners.get(event.key)
  if (!listeners) {
    return
  }

  for (const listener of [...listeners]) {
    listener(event)
  }
}

function subscribeShortcut(key: string, listener: ShortcutListener) {
  const listeners = shortcutListeners.get(key) ?? new Set<ShortcutListener>()

  if (shortcutListeners.size === 0) {
    window.addEventListener('keydown', handleGlobalKeyDown)
  }

  listeners.add(listener)
  shortcutListeners.set(key, listeners)

  return () => {
    listeners.delete(listener)
    if (listeners.size === 0) {
      shortcutListeners.delete(key)
    }
    if (shortcutListeners.size === 0) {
      window.removeEventListener('keydown', handleGlobalKeyDown)
    }
  }
}

function useKeyboardShortcut(key: string, callback: () => void) {
  const onShortcut = useEffectEvent(callback)

  useEffect(() => {
    return subscribeShortcut(key, () => onShortcut())
  }, [key])
}

function Profile() {
  useKeyboardShortcut('p', openProfile)
  useKeyboardShortcut('k', () => { /* ... */ })
}
```

Keep the direct per-component listener when only one component needs the event; the registry is worthwhile only for a genuinely shared subscription.

Reference: [https://react.dev/reference/react/useEffectEvent](https://react.dev/reference/react/useEffectEvent)
