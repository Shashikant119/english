# Complete CSS Tutorial

Learn CSS from selectors and the box model to responsive layouts, animations, architecture, accessibility, and performance.

[Review the Complete HTML Tutorial first](html-complete.md)

## 1. Add CSS to a page

External stylesheets are reusable and cacheable.

```html
<link rel="stylesheet" href="styles.css">
```

```css
/* styles.css */
body {
  color: #172036;
  font-family: system-ui, sans-serif;
}
```

The cascade decides which declaration wins using origin, importance, specificity, scope, and source order. Prefer simple selectors over `!important`.

## 2. Selectors

```css
/* Element, class, ID, and attribute */
p { line-height: 1.7; }
.card { border: 1px solid #ddd; }
#main-title { letter-spacing: -0.03em; }
input[type="email"] { inline-size: 100%; }

/* Relationships */
.card p { color: #475467; }
.card > h2 { margin-block-start: 0; }
.label + input { margin-block-start: 6px; }
.item ~ .item { border-block-start: 1px solid #ddd; }

/* State and generated content */
a:hover { color: #1d4ed8; }
button:focus-visible { outline: 3px solid #93c5fd; }
.card::before { content: ""; }
```

Specificity generally follows inline styles, IDs, classes/attributes/pseudo-classes, then elements. Keep specificity low with classes and `:where()`.

```css
:where(.site-nav) a { color: inherit; }
```

## 3. The box model

Every element has content, padding, border, and margin.

```css
*, *::before, *::after {
  box-sizing: border-box;
}

.card {
  width: 320px;
  padding: 24px;
  border: 1px solid #e4e7ec;
  margin: 16px;
}
```

With `border-box`, the declared width includes padding and border. Prefer logical properties such as `margin-inline` when supporting different writing directions.

## 4. Values, units, and custom properties

| Unit | Best use |
|---|---|
| `rem` | font sizes, spacing, accessible scaling |
| `em` | size relative to the current component |
| `%` | size relative to the containing block |
| `vw`, `vh` | viewport-relative sizing, used carefully |
| `ch` | readable text width |
| `px` | borders and precise small details |

```css
:root {
  --color-brand: #3157d5;
  --color-text: #172036;
  --space-3: .75rem;
  --space-6: 1.5rem;
  --radius: .75rem;
}

.button {
  background: var(--color-brand);
  border-radius: var(--radius);
  padding: var(--space-3) var(--space-6);
}
```

Use `min()`, `max()`, and `clamp()` for fluid values.

```css
h1 { font-size: clamp(2.25rem, 6vw, 4.5rem); }
.container { width: min(100% - 2rem, 70rem); }
```

## 5. Typography

```css
body {
  font-family: Inter, system-ui, sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  text-rendering: optimizeLegibility;
}

.prose {
  max-inline-size: 68ch;
}
```

Do not disable browser zoom. Ensure text has sufficient contrast and avoid justified body copy on narrow screens.

## 6. Display, overflow, and positioning

```css
.hidden { display: none; }
.inline-badge { display: inline-flex; }
.scroll-region { overflow-x: auto; }

.header {
  position: sticky;
  top: 0;
  z-index: 10;
}

.modal {
  position: fixed;
  inset: 0;
}
```

Absolute positioning uses the nearest positioned ancestor. Use positioning for overlays, not for normal page layout.

## 7. Flexbox

Flexbox is best for one-dimensional rows or columns.

```css
.toolbar {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: space-between;
}

.toolbar__search {
  flex: 1 1 280px;
}
```

Main axis uses `justify-content`; cross axis uses `align-items`. Prefer `gap` over margins between children.

## 8. CSS Grid

Grid is best for two-dimensional layouts.

```css
.product-grid {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr));
}

.dashboard {
  display: grid;
  gap: 24px;
  grid-template-areas:
    "sidebar header"
    "sidebar main";
  grid-template-columns: 240px minmax(0, 1fr);
}
```

Use `minmax(0, 1fr)` when long content causes grid overflow.

## 9. Responsive design

Start with the small-screen layout and add complexity when space is available.

```css
.page {
  padding-inline: 16px;
}

@media (min-width: 48rem) {
  .page { padding-inline: 32px; }
  .layout { grid-template-columns: 2fr 1fr; }
}

@media (min-width: 75rem) {
  .page { margin-inline: auto; max-width: 72rem; }
}
```

Container queries respond to a component's available width.

```css
.card-list { container-type: inline-size; }

@container (min-width: 36rem) {
  .card { grid-template-columns: 180px 1fr; }
}
```

## 10. Images and aspect ratios

```css
img {
  display: block;
  height: auto;
  max-width: 100%;
}

.product-image {
  aspect-ratio: 4 / 5;
  object-fit: cover;
  width: 100%;
}
```

## 11. Forms, buttons, and focus

```css
input, textarea, select, button {
  font: inherit;
}

input {
  border: 1px solid #98a2b3;
  border-radius: 8px;
  min-height: 44px;
  padding: 10px 12px;
}

input:focus-visible,
button:focus-visible,
a:focus-visible {
  outline: 3px solid #93c5fd;
  outline-offset: 3px;
}

input:invalid:not(:placeholder-shown) {
  border-color: #d92d20;
}
```

Do not remove outlines unless you replace them with an equally visible focus indicator. Keep touch targets around 44 by 44 CSS pixels.

## 12. Transforms, transitions, and animation

Animate `transform` and `opacity` when possible because they usually avoid expensive layout work.

```css
.card {
  transition: box-shadow 180ms ease, transform 180ms ease;
}

.card:hover {
  box-shadow: 0 16px 40px rgb(16 24 40 / 14%);
  transform: translateY(-3px);
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    scroll-behavior: auto !important;
    transition-duration: .01ms !important;
    animation-duration: .01ms !important;
  }
}
```

## 13. Cascade layers and architecture

```css
@layer reset, base, components, utilities;

@layer reset {
  *, *::before, *::after { box-sizing: border-box; }
}

@layer components {
  .button { /* component styles */ }
}

@layer utilities {
  .visually-hidden { /* accessible visually hidden pattern */ }
}
```

Organize styles by tokens, reset, base elements, layout, components, and utilities. Choose predictable class names and keep component styles close together.

## 14. Themes and color schemes

```css
:root {
  color-scheme: light dark;
  --page: #ffffff;
  --text: #172036;
}

@media (prefers-color-scheme: dark) {
  :root {
    --page: #0d1117;
    --text: #e6edf3;
  }
}

[data-theme="dark"] {
  --page: #0d1117;
  --text: #e6edf3;
}
```

Test contrast in every theme. Theme changes should not hide information or focus indicators.

## 15. Common layout bugs

- `width: 100vw` may include the scrollbar and create horizontal overflow.
- Flex and grid children may need `min-width: 0`.
- Large fixed widths break narrow screens.
- A high `z-index` cannot escape every stacking context.
- Margin collapse can surprise block layouts; use `gap` in flex/grid.
- `height: 100%` only works when the containing block has a definite height.
- `position: sticky` can fail because an ancestor clips overflow.

## 16. Performance checklist

- Remove unused CSS and avoid importing entire frameworks for a few utilities.
- Keep selectors simple and stylesheets cacheable.
- Avoid layout thrashing caused by JavaScript reading and writing layout repeatedly.
- Reduce large shadows, filters, and full-screen blur effects.
- Use system fonts or preload only critical font files.
- Test Core Web Vitals on realistic mobile hardware and networks.

## 17. Complete practice projects

1. Style the HTML portfolio from the previous tutorial.
2. Build a responsive pricing section using Grid.
3. Build a dashboard with sidebar, header, cards, and data table.
4. Build a product card with hover, focus, sale badge, and responsive image.
5. Add light/dark themes using custom properties.
6. Test every page at 320px, 768px, 1024px, and 1440px widths.

## 18. Common interview questions

1. Explain the cascade and specificity.
2. Compare Flexbox and Grid.
3. Explain `relative`, `absolute`, `fixed`, and `sticky` positioning.
4. What creates a stacking context?
5. Compare `px`, `em`, and `rem`.
6. What is mobile-first responsive design?
7. How do custom properties differ from preprocessor variables?
8. Which properties are safest to animate?
9. What does `box-sizing: border-box` change?
10. How do you prevent layout overflow?

## Completion checklist

- Explain the cascade and box model without notes.
- Rebuild common Flexbox and Grid layouts from memory.
- Create fluid type and spacing using `clamp()`.
- Build accessible focus, hover, error, and disabled states.
- Support mobile, desktop, reduced motion, and dark mode.
- Finish and review all practice projects.

[Return to the Tutorial Library](../README.md)
