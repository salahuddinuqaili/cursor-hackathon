---
title: Lift State into Provider Components
impact: HIGH
impactDescription: enables state sharing outside component boundaries
tags: composition, state, context, providers
---

## Lift State into Provider Components

Move state management into dedicated provider components. This allows sibling
components outside the main UI to access and modify state without prop drilling
or awkward refs.

**Incorrect (state trapped inside component):**

```tsx
import { Dialog } from '@base-ui/react/dialog'

function ForwardMessageComposer() {
  const [state, setState] = useState(initialState)
  const forwardMessage = useForwardMessage()

  return (
    <Composer.Frame>
      <Composer.Input />
      <Composer.Footer />
    </Composer.Frame>
  )
}

// Problem: How does this button access composer state?
function ForwardMessageDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger>Forward message</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Popup>
          <Dialog.Title>Forward message</Dialog.Title>
          <ForwardMessageComposer />
          <MessagePreview /> {/* Needs composer state */}
          <ForwardButton /> {/* Needs to call submit */}
          <Dialog.Close>Cancel</Dialog.Close>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
```

**Incorrect (useEffect to sync state up):**

```tsx
import { Dialog } from '@base-ui/react/dialog'

function ForwardMessageDialog() {
  const [input, setInput] = useState('')
  return (
    <Dialog.Root>
      <Dialog.Trigger>Forward message</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Popup>
          <Dialog.Title>Forward message</Dialog.Title>
          <ForwardMessageComposer onInputChange={setInput} />
          <MessagePreview input={input} />
          <Dialog.Close>Cancel</Dialog.Close>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

function ForwardMessageComposer({
  onInputChange,
}: {
  onInputChange: (input: string) => void
}) {
  const [state, setState] = useState(initialState)
  useEffect(() => {
    onInputChange(state.input) // Sync on every change 😬
  }, [state.input, onInputChange])
}
```

**Incorrect (reading state from ref on submit):**

```tsx
import { Button } from '@base-ui/react/button'
import { Dialog } from '@base-ui/react/dialog'

function ForwardMessageDialog() {
  const stateRef = useRef(null)
  return (
    <Dialog.Root>
      <Dialog.Trigger>Forward message</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Popup>
          <Dialog.Title>Forward message</Dialog.Title>
          <ForwardMessageComposer stateRef={stateRef} />
          <Button onClick={() => submit(stateRef.current)}>Forward</Button>
          <Dialog.Close>Cancel</Dialog.Close>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
```

**Correct (state lifted to provider):**

```tsx
import { Button } from '@base-ui/react/button'
import { Dialog } from '@base-ui/react/dialog'

function ForwardMessageProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState(initialState)
  const forwardMessage = useForwardMessage()
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <Composer.Provider
      state={state}
      actions={{ update: setState, submit: forwardMessage }}
      meta={{ inputRef }}
    >
      {children}
    </Composer.Provider>
  )
}

function ForwardMessageDialog() {
  return (
    <ForwardMessageProvider>
      <Dialog.Root>
        <Dialog.Trigger>Forward message</Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Backdrop />
          <Dialog.Viewport>
            <Dialog.Popup>
              <Dialog.Title>Forward message</Dialog.Title>
              <ForwardMessageComposer />
              <MessagePreview />
              <div>
                <Dialog.Close>Cancel</Dialog.Close>
                <ForwardButton />
              </div>
            </Dialog.Popup>
          </Dialog.Viewport>
        </Dialog.Portal>
      </Dialog.Root>
    </ForwardMessageProvider>
  )
}

function ForwardButton() {
  const { actions } = use(Composer.Context)
  return <Button onClick={actions.submit}>Forward</Button>
}
```

The ForwardButton lives outside the Composer.Frame but still has access to the
submit action because it's within the provider. Even though it's a one-off
component, it can still access the composer's state and actions from outside the
UI itself.

**Key insight:** Components that need shared state don't have to be visually
nested inside each other—they just need to be within the same provider.

Reference: [Sharing State Between Components](https://react.dev/learn/sharing-state-between-components), [Passing Data Deeply with Context](https://react.dev/learn/passing-data-deeply-with-context), [Base UI Dialog](https://base-ui.com/react/components/dialog)
