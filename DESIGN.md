---
version: alpha
name: Hardframe Interface System
description: A compact interface language built from charcoal page frames, paper and deep-gray surfaces, vivid flat annotations, tinted content bands, heavy sans-serif headings, serif reading text, square controls, thin rules, and hard-edged depth.

colors:
  primary: "#25241f"
  on-primary: "#f8f5ed"
  canvas: "#f1eee5"
  surface: "#f8f5ed"
  ink: "#25241f"
  muted-ink: "#47443e"
  frame-ink: "#302f2a"
  callout: "#f44250"
  on-callout: "#1c1b18"
  annotation: "#fcc20f"
  on-annotation: "#1c1b18"
  stripe: "#6a26a4"
  link: "#0000ee"
  tint-olive: "#8e8a25"
  tint-sage: "#b3bd95"
  tint-salmon: "#d77a7a"
  tint-peach: "#e6915d"
  tint-lime: "#c0d4a7"
  tint-sky: "#9ab6c8"
  tint-steel: "#a5b8c0"
  tint-periwinkle: "#8c9ae0"
  dark-canvas: "#1b1c19"
  dark-surface: "#242520"
  dark-surface-raised: "#2e2f2a"
  dark-ink: "#dedbd2"
  dark-frame-ink: "#9f9a90"
  dark-muted: "#a6a196"

typography:
  display:
    fontFamily: Arial Black, Arial, Helvetica, sans-serif
    fontSize: 36px
    fontWeight: 900
    lineHeight: 1
    letterSpacing: 0
  heading-1:
    fontFamily: Arial Black, Arial, Helvetica, sans-serif
    fontSize: 24px
    fontWeight: 900
    lineHeight: 1.05
    letterSpacing: 0
  heading-2:
    fontFamily: Helvetica, Arial, sans-serif
    fontSize: 16px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0
  heading-3:
    fontFamily: Helvetica, Arial, sans-serif
    fontSize: 14px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0
  body:
    fontFamily: Times New Roman, Times, serif
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0
  body-sm:
    fontFamily: Times New Roman, Times, serif
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0
  caption:
    fontFamily: Times New Roman, Times, serif
    fontSize: 11px
    fontWeight: 400
    lineHeight: 1.35
    letterSpacing: 0
  button:
    fontFamily: Helvetica, Arial, sans-serif
    fontSize: 12px
    fontWeight: 700
    lineHeight: 1
    letterSpacing: 0
  link:
    fontFamily: Times New Roman, Times, serif
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0
  ui-label:
    fontFamily: Helvetica, Arial, sans-serif
    fontSize: 12px
    fontWeight: 700
    lineHeight: 1
    letterSpacing: 0

rounded:
  none: 0px
  full: 9999px

spacing:
  xxs: 2px
  xs: 4px
  s: 6px
  sm: 8px
  m: 10px
  md: 12px
  lg: 16px
  xl: 20px
  xxl: 24px
  section-sm: 32px
  section: 40px
  section-lg: 48px
  touch: 44px

components:
  page-frame:
    backgroundColor: "{colors.frame-ink}"
    textColor: "{colors.canvas}"
    rounded: "{rounded.none}"
    padding: "{spacing.sm}"
  top-banner:
    backgroundColor: "{colors.frame-ink}"
    textColor: "{colors.canvas}"
    typography: "{typography.heading-2}"
    rounded: "{rounded.none}"
    padding: "{spacing.md} {spacing.lg}"
  section-eyebrow:
    backgroundColor: "{colors.tint-sage}"
    textColor: "{colors.ink}"
    typography: "{typography.display}"
    rounded: "{rounded.none}"
    padding: "{spacing.xxl} {spacing.lg}"
  section-eyebrow-olive:
    backgroundColor: "{colors.tint-olive}"
    textColor: "{colors.ink}"
    typography: "{typography.display}"
    rounded: "{rounded.none}"
    padding: "{spacing.xxl} {spacing.lg}"
  ribbon-panel-title:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.heading-3}"
    rounded: "{rounded.none}"
    padding: "{spacing.s} {spacing.md}"
  ribbon-panel-body:
    backgroundColor: "{colors.tint-sky}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "{spacing.md} {spacing.lg}"
  ribbon-panel-body-salmon:
    backgroundColor: "{colors.tint-salmon}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "{spacing.md} {spacing.lg}"
  ribbon-panel-body-peach:
    backgroundColor: "{colors.tint-peach}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "{spacing.md} {spacing.lg}"
  ribbon-panel-body-lime:
    backgroundColor: "{colors.tint-lime}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "{spacing.md} {spacing.lg}"
  ribbon-panel-body-steel:
    backgroundColor: "{colors.tint-steel}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "{spacing.md} {spacing.lg}"
  ribbon-panel-body-periwinkle:
    backgroundColor: "{colors.tint-periwinkle}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "{spacing.md} {spacing.lg}"
  selected-marker:
    backgroundColor: "{colors.stripe}"
    rounded: "{rounded.none}"
    width: "{spacing.xs}"
  callout:
    backgroundColor: "{colors.callout}"
    textColor: "{colors.on-callout}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "{spacing.lg}"
  sticker:
    backgroundColor: "{colors.annotation}"
    textColor: "{colors.on-annotation}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "{spacing.xs} {spacing.sm}"
  seal:
    backgroundColor: "{colors.callout}"
    textColor: "{colors.on-callout}"
    typography: "{typography.ui-label}"
    rounded: "{rounded.full}"
    padding: "{spacing.md}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "{spacing.md} {spacing.lg}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "{spacing.md} {spacing.lg}"
  text-input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "{spacing.sm} {spacing.md}"
  link:
    textColor: "{colors.link}"
    typography: "{typography.link}"
  icon-navigation:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.ui-label}"
    rounded: "{rounded.none}"
    padding: "{spacing.sm}"
  data-table-cell:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.none}"
    padding: "{spacing.s} {spacing.sm}"
  dialog:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "{spacing.xxl}"
  page-frame-dark:
    backgroundColor: "{colors.dark-canvas}"
    textColor: "{colors.dark-ink}"
    rounded: "{rounded.none}"
    padding: "{spacing.sm}"
  panel-dark:
    backgroundColor: "{colors.dark-surface}"
    textColor: "{colors.dark-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "{spacing.lg}"
  dialog-dark:
    backgroundColor: "{colors.dark-surface-raised}"
    textColor: "{colors.dark-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "{spacing.xxl}"
  muted-copy-dark:
    backgroundColor: "{colors.dark-canvas}"
    textColor: "{colors.dark-muted}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.none}"
  empty-state:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "{spacing.section}"
  footer:
    backgroundColor: "{colors.frame-ink}"
    textColor: "{colors.canvas}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.none}"
    padding: "{spacing.xxl} {spacing.lg}"
---

# Hardframe Interface System

## Design intent

Build a crisp, compact interface that feels assembled from ink, paper, labels, and
screen-native color. The page is a paper or deep-gray field held inside a literal
frame. Information is divided by rules and flat color blocks, never by soft floating
cards.

The system should feel direct:

- Use paired paper and ink neutrals for structure.
- Use color to label, group, warn, or annotate.
- Use heavy sans-serif type for hierarchy and serif type for reading.
- Keep controls square, bordered, and visibly interactive.
- Prefer flat surfaces. Use one hard shadow only when overlap must be unmistakable.

## Non-negotiable visual rules

1. Every full-page composition has a visible frame.
2. Borders and dividers are solid, straight, and one pixel unless a component recipe
   explicitly calls for the page frame.
3. Cards, fields, buttons, menus, tooltips, and dialogs use `0px` radius.
4. Only seals and truly circular icon marks use `9999px`.
5. Red is a scarce high-emphasis callout, limited to one dominant block per view.
6. Yellow is an annotation color for short labels, counts, and markers.
7. Blue is reserved for underlined inline links on light surfaces.
8. Tints group sibling content; they do not encode success, warning, or error by
   themselves.
9. Gradients, blur, glass effects, and soft shadows are out of system.
10. Interaction must not depend on hover.

## Color system

### Structural colors

| Role | Light | Dark | Use |
|---|---:|---:|---|
| Canvas | `{colors.canvas}` | `{colors.dark-canvas}` | Page background |
| Surface | `{colors.surface}` | `{colors.dark-surface}` | Panels and controls |
| Raised surface | `{colors.surface}` | `{colors.dark-surface-raised}` | Menus and dialogs |
| Ink | `{colors.ink}` | `{colors.dark-ink}` | Primary text |
| Frame ink | `{colors.frame-ink}` | `{colors.dark-frame-ink}` | Rules and frames |
| Muted text | `{colors.muted-ink}` | `{colors.dark-muted}` | Supporting copy |
| Primary action | `{colors.primary}` | `{colors.primary}` | Filled action |
| Inline link | `{colors.link}` | `{colors.dark-ink}` | Always underlined |

Treat the modes as paired roles, not literal inversions: paper and ink in light mode
map to deep gray and soft ink in dark mode while accent identity stays fixed. Use
`--frame-ink` for structural rules; `--border` is only a quiet separator. Keep link
underlines visible when blue is replaced by soft ink.

### Accent colors

- `{colors.callout}`: one urgent or high-emphasis block.
- `{colors.annotation}`: short sticker labels and counters.
- `{colors.stripe}`: narrow stripes, selected markers, or chart accents.
- `{colors.tint-olive}`, `{colors.tint-sage}`, `{colors.tint-salmon}`,
  `{colors.tint-peach}`, `{colors.tint-lime}`, `{colors.tint-sky}`,
  `{colors.tint-steel}`, and `{colors.tint-periwinkle}`: finite section and series
  colors.

Use deep ink text on every tint and on yellow. Never place paragraph text over a
multicolor treatment.

## Typography

Use three explicit roles:

- `font-display`: `Arial Black`, then Arial/Helvetica/sans-serif. Use for page titles,
  section labels, and large numeric emphasis.
- `font-ui`: Helvetica, then Arial/sans-serif. Use for buttons, navigation, tabs,
  field labels, table headings, and compact headings.
- `font-body`: `Times New Roman`, then Times/serif. Use for paragraphs, descriptions,
  metadata, links, and help text.

Do not use `font-sans` as an accidental catch-all. Apply the role at the component
boundary so typography stays deterministic across browsers.

### Type scale

| Role | Size / line height | Weight | Case |
|---|---|---:|---|
| Display | `36px / 1` | 900 | Uppercase for short headings |
| Heading 1 | `24px / 1.05` | 900 | Uppercase or sentence case |
| Heading 2 | `16px / 1.2` | 700 | Sentence case |
| Heading 3 | `14px / 1.2` | 700 | Sentence case |
| Body | `14px / 1.4` | 400 | Sentence case |
| Small body | `12px / 1.4` | 400 | Sentence case |
| Caption | `11px / 1.35` | 400 | Sentence case |
| Button / UI label | `12px / 1` | 700 | Short labels |

Keep body copy in readable measures. Long text should not span the full framed
canvas.

## Spacing and layout

Use the supplied spacing scale exactly:

`2, 4, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48px`

Prefer 4px-aligned values. The 6px and 10px steps exist for dense table cells,
compact title bars, and control interiors.

### Page frame

- Center the application canvas and let it use the available width.
- Use an `8px` frame on desktop, `4px` at widths below `768px`, and `2px` below
  `480px`.
- Use `16–24px` inner gutters on larger screens and `12px` on compact screens.
- Separate major sections with a one-pixel rule and `32–48px` vertical spacing.
- Keep the header and footer visually attached to the frame.

### Grids

- Use four columns only for short, parallel items.
- Reduce four columns to two below `768px`.
- Reduce every multi-column region to one column below `480px`.
- Content order in the DOM must already match the intended mobile reading order.
- Do not force equal heights when content lengths differ substantially.

## Depth and shape

| Level | Treatment | Use |
|---|---|---|
| Flat | Surface color only | Default sections and controls |
| Ruled | `1px solid var(--frame-ink)` | Panels, fields, tables, menus |
| Hard | `2px 2px 0 var(--frame-ink)` | Dialogs or one overlapping object |
| Frame | Solid `8px`, `4px`, or `2px` field | Application boundary |

Use `shadow-hard` at most once in a local stack. Never combine it with blur,
transparency, or rounded corners.

## Component recipes

### Section eyebrow

A section eyebrow is a solid tint block with a short heavy heading. Use `24px 16px`
padding at full width. When several eyebrows form a grid, assign distinct tints from
the finite palette and keep all labels in deep ink.

### Ribbon panel

Build this as two adjacent parts:

1. A paper-surface title row with `6px 12px` padding, `font-ui`, and a one-pixel border.
2. A tinted or paper-surface body with `12px 16px` padding and `font-body`.

Do not wrap the pair in another card. Shared borders create the grouping.

### Callout, sticker, and seal

- Callout: red fill, deep ink text, frame-ink border, `16px` padding. One dominant callout
  per view.
- Sticker: yellow fill, deep ink text, frame-ink border, `4px 8px` padding. Keep the label
  brief.
- Seal: circular only when the content has a true badge-like meaning. Do not use the
  circle as a generic card shape.

### Buttons

Primary buttons are ink-filled with paper text. Secondary buttons use a paper surface
with ink text and a frame-ink border. Both are square, use `font-ui`, and use `12px 16px`
padding.

Required states:

- Default: full one-pixel border.
- Focus visible: add a two-pixel high-contrast outline outside the border.
- Active or pressed: remove the hard shadow or invert the ink/paper surface.
- Disabled: preserve the label, reduce emphasis, and block pointer and keyboard
  activation.
- Loading: keep the button width stable and expose an accessible busy state.

Use a minimum `44px × 44px` interactive area on touch layouts. The visible control
may stay compact when its hit area is enlarged without overlap.

### Links

Inline links are blue and underlined on light surfaces. In dark mode they use soft
ink and remain underlined. Never remove the underline as the only non-color cue.
Navigation items may use ink/paper text, but active state requires a rule, inverse
fill, or stripe.

### Form controls

Inputs, text areas, selects, combobox triggers, checkboxes, and menus are square and
use a one-pixel rule.

- Labels appear above fields in `font-ui`.
- Help and error text occupy a stable row below the field.
- Focus visible uses a two-pixel high-contrast outline.
- Invalid state uses text plus an icon or message; color alone is insufficient.
- Disabled and read-only states must remain distinguishable.
- Native autofill must not make text unreadable.

### Data tables

Use semantic table elements. Header cells use `font-ui`; body cells use
`font-body`. Separate rows and columns with one-pixel rules. On narrow screens,
allow horizontal scrolling or convert each row to a labeled record without changing
the DOM order.

### Dialogs and popovers

Use a paper or raised dark surface, one-pixel rule, square corners, and optional hard
shadow. Preserve focus trapping, return focus to the trigger, support Escape, and
label the surface through its title. The backdrop may darken the page, but must not
blur it.

### Empty and loading states

Keep the same border and spacing as the content they replace. State the condition in
a compact heading, provide one next action when useful, and do not invent a
decorative card style for an empty region.

## React, Tailwind, shadcn, and Base UI contract

### React

- Components own semantics and composition; tokens own appearance.
- Keep variants finite: `tone`, `state`, `density`, and `inverted`.
- Render native elements whenever they provide the required behavior.
- Do not branch the DOM for visual breakpoints.

### Tailwind

- Consume semantic variables such as `bg-primary`, `text-primary-foreground`,
  `border-frame-ink`, `bg-callout`, `bg-annotation`, and `text-link`.
- Use the named type utilities: `text-display`, `text-heading-1`,
  `text-heading-2`, `text-heading-3`, `text-body`, `text-body-sm`,
  `text-caption`, and `text-ui`.
- Use Tailwind's numeric utilities for the core spacing scale. Reserve named
  spacing for semantic roles, for example `py-section`, `gap-section-sm`,
  `py-section-lg`, and `min-h-touch`. Use `compact:` from `480px` and `md:` from
  `768px`.
- Add `rounded-none` explicitly to every shadcn or headless surface.
- Apply `font-display`, `font-ui`, or `font-body` explicitly.
- Use `shadow-hard` only for the hard depth level.
- Keep arbitrary values out of component files when a token exists.

### shadcn

- Treat generated components as behavioral starting points.
- Replace default radii with `rounded-none` at the component variant layer.
- Replace soft shadows with `shadow-none` or `shadow-hard`.
- Keep data attributes and accessibility wiring intact.
- Map destructive semantics independently; the red callout token is visual
  emphasis, not a universal error token.

### Base UI

- Style triggers, positions, backdrops, and popups separately.
- Use exposed state attributes for focus, pressed, selected, open, and disabled
  variants.
- Keep collision handling, keyboard navigation, focus management, and dismissal
  behavior provided by the primitive.
- Portals must inherit the same color and type tokens as the framed application.

## Responsive and input behavior

- Desktop: full frame, complete navigation, parallel grids where content supports
  comparison.
- Below `768px`: reduce the frame, collapse four columns to two, and stack split
  compositions.
- Below `480px`: use a two-pixel frame, one-column content, `12px` gutters, and
  `44px` minimum targets.
- Never hide essential actions behind hover.
- Do not use horizontal page scrolling. Tables and code regions may scroll inside
  their own bordered container.
- Images use explicit width and height, stay inside their panel, and preserve aspect
  ratio with `object-fit`.

## Accessibility and browser behavior

- Use semantic HTML before adding ARIA.
- Maintain a visible `:focus-visible` treatment for every interactive element.
- Pair color with text, shape, underline, or iconography.
- Respect `prefers-reduced-motion`; no information may depend on animation.
- Keep DOM order, visual order, focus order, and reading order aligned.
- Test keyboard operation and zoom before treating a component as complete.
- Use standard CSS borders, grid, flexbox, and custom properties. Do not rely on
  engine-specific styling for essential structure.
- Check Chrome, Safari, and Firefox at desktop and narrow widths.

## Composition checklist

Before shipping a view, verify:

- A visible frame contains the composition.
- The page has one dominant title and no more than one red callout.
- Color blocks carry labels or grouping, not decoration alone.
- Panels are flat, square, and rule-separated.
- Primary and secondary actions use ink/paper polarity.
- Inline links remain underlined.
- Every state is visible with keyboard input.
- Touch targets reach `44px × 44px` on compact layouts.
- Layouts reduce to one readable column without reordered content.
- No gradient, blur, glass effect, soft shadow, or accidental radius remains.
