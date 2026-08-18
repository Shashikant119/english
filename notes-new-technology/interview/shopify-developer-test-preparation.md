# Shopify Developer Test Preparation Notes

> Use these notes before the test for learning and practice. The test explicitly forbids notes, internet, and AI assistance during the assessment, so practise writing every example from memory.

## 1. Test strategy (105 minutes)

| Section | Time | Questions | Practical target |
|---|---:|---:|---|
| A: MCQ and one-liners | 10 min | 10 | Answer known questions first; maximum 1 minute each |
| B: Debug and refactor | 30 min | 5 | Identify the bug, fix it, and explain why |
| C: Live coding | 45 min | 4 | Build the smallest correct solution, then test edge cases |
| D: Shopify architecture | 15 min | 5 | State the decision, reason, trade-off, and implementation |

Recommended time reserve: finish each section 1–2 minutes early so you can check syntax, variable names, braces, semicolons, and edge cases.

### Before writing code

1. Read the complete requirement once.
2. Identify input, output, constraints, and edge cases.
3. Write the simplest working version.
4. Run it with normal, empty, and invalid input.
5. Refactor only after it works.

### How to answer follow-up questions

Use this four-part format:

1. “The requirement is…”
2. “I chose this approach because…”
3. “Its complexity/trade-off is…”
4. “For production, I would additionally…”

Never claim that code is perfect. Mention one realistic improvement such as validation, accessibility, caching, tests, or error handling.

---

## 2. Section A: rapid knowledge revision

### PHP one-liners

- `==` compares values after type conversion; `===` compares value and type.
- `isset($x)` is false when a variable is missing or `null`.
- `empty($x)` is true for values such as `''`, `0`, `'0'`, `false`, `null`, and `[]`.
- `include` emits a warning if a file is missing; `require` produces a fatal error.
- `include_once` and `require_once` prevent duplicate loading.
- `$_GET` reads query-string data; `$_POST` reads submitted POST form data.
- Never trust request data. Validate it and escape output.
- `htmlspecialchars($value, ENT_QUOTES, 'UTF-8')` safely escapes HTML output.
- Prepared statements protect SQL values from injection.
- `password_hash()` stores a password securely; `password_verify()` checks it.
- `array_map()` transforms each item; `array_filter()` selects items; `array_reduce()` combines items.
- `??` is the null-coalescing operator: `$name = $_POST['name'] ?? '';`.
- A class describes objects; an object is an instance of a class.
- `public`, `protected`, and `private` control member visibility.
- An interface defines a contract; a trait reuses implementation across classes.

### JavaScript one-liners

- `let` is block-scoped and reassignable; `const` is block-scoped and cannot be reassigned; avoid `var` in modern code.
- `===` avoids implicit type coercion.
- `null` is an intentional empty value; `undefined` usually means no value was assigned.
- A closure is a function that retains access to its outer lexical scope.
- Event bubbling travels from the target toward ancestors.
- Event delegation attaches one listener to a parent and handles matching descendants.
- `preventDefault()` stops the browser’s default action; `stopPropagation()` stops event propagation.
- A Promise represents a future result: pending, fulfilled, or rejected.
- `async` functions return Promises; `await` pauses that function until a Promise settles.
- `map()` returns transformed items; `filter()` returns matching items; `find()` returns the first match.
- `forEach()` does not return a transformed array.
- Debounce waits until calls stop; throttle limits calls to a fixed rate.
- `localStorage` persists across browser sessions; `sessionStorage` lasts for a tab session.
- `JSON.stringify()` converts a value to JSON text; `JSON.parse()` converts JSON text to a value.
- Optional chaining: `customer?.address?.city`.
- Nullish fallback: `quantity ?? 1` only falls back for `null` or `undefined`.

### HTML/CSS one-liners

- Semantic HTML improves accessibility, maintainability, and SEO.
- Use a `<button>` for an action and an `<a>` for navigation.
- Every meaningful image needs descriptive `alt`; decorative images use `alt=""`.
- A label should be connected to an input using `for` and `id`.
- CSS specificity order is broadly: inline, ID, class/attribute/pseudo-class, element.
- `box-sizing: border-box` includes padding and border in declared width/height.
- `position: absolute` uses the nearest positioned ancestor.
- Flexbox is mainly one-dimensional; Grid is designed for two-dimensional layouts.
- `rem` relates to root font size; `em` relates to the relevant element font size.
- Mobile-first CSS uses base mobile styles and `min-width` media queries.
- `display: none` removes an element from layout and the accessibility tree.
- `visibility: hidden` keeps its layout space but hides it.
- `opacity: 0` is visually hidden but may still receive pointer/focus events.

### Shopify and Liquid one-liners

- Liquid is Shopify’s server-rendered templating language, not browser JavaScript.
- `{{ ... }}` outputs a value; `{% ... %}` performs logic; `{% comment %}` adds a Liquid comment.
- Use `{%-` and `-%}` carefully to trim surrounding whitespace.
- Objects provide data (`product`, `collection`, `cart`); tags perform logic; filters transform output.
- A section is a merchant-configurable theme component with a `{% schema %}` block.
- A snippet is reusable markup rendered with `{% render 'name' %}`.
- A block is repeatable content inside a section.
- JSON templates define which sections appear on a page and their order/settings.
- Theme settings belong in `config/settings_schema.json`; saved values are in `settings_data.json`.
- `product.selected_or_first_available_variant` is the safe initial variant.
- Use `routes.*_url` instead of hardcoded Shopify routes when available.
- Use `image_url` to generate an image URL and `image_tag` to output responsive image markup.
- `render` has isolated scope; explicitly pass required variables.
- Avoid expensive nested Liquid loops over large collections.
- Liquid executes on Shopify’s server; DOM code executes later in the customer’s browser.
- Ajax Cart API changes the storefront cart but does not replace secure server-side validation.

---

## 3. Section B: debugging and refactoring

### A repeatable debugging process

1. Reproduce the bug with the smallest input.
2. Read the error message and locate the first relevant stack frame.
3. Inspect actual values and types, not assumptions.
4. Trace data from input to failing output.
5. Change one cause at a time.
6. Re-run the original case and at least one edge case.
7. Explain root cause separately from the fix.

### PHP debugging examples

#### Bug: assignment instead of comparison

```php
// Wrong
if ($status = 'active') {
    echo 'Active';
}

// Correct
if ($status === 'active') {
    echo 'Active';
}
```

Explanation: `=` assigns `'active'`, which is truthy. `===` performs strict comparison.

#### Bug: unsafe HTML output

```php
<?php
$name = $_POST['name'] ?? '';
$safeName = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
?>

<p>Hello, <?= $safeName ?></p>
```

#### Bug: SQL injection

```php
$statement = $pdo->prepare(
    'SELECT id, name FROM customers WHERE email = :email'
);

$statement->execute([
    'email' => $email,
]);

$customer = $statement->fetch(PDO::FETCH_ASSOC);
```

Do not interpolate user input directly into SQL.

#### Refactor: guard clause

```php
function calculateDiscount(float $total, bool $isMember): float
{
    if ($total <= 0) {
        return 0.0;
    }

    if (!$isMember) {
        return $total;
    }

    return $total * 0.9;
}
```

Guard clauses reduce nesting and make invalid/exception cases clear.

### JavaScript debugging examples

#### Bug: DOM element may not exist

```js
const button = document.querySelector('[data-add-to-cart]');

if (button) {
  button.addEventListener('click', handleAddToCart);
}
```

#### Bug: string addition instead of numeric addition

```js
const price = Number(input.value);
const total = price + 100;

if (!Number.isFinite(price)) {
  console.error('Invalid price');
}
```

#### Bug: `this` inside an arrow callback

```js
button.addEventListener('click', function () {
  this.classList.toggle('active');
});
```

Arrow functions do not create their own `this`.

#### Efficient event delegation

```js
document.querySelector('[data-cart-items]')?.addEventListener('click', (event) => {
  const removeButton = event.target.closest('[data-remove-item]');

  if (!removeButton) return;

  removeItem(removeButton.dataset.line);
});
```

This works for dynamically inserted items and avoids one listener per button.

#### Safe fetch handling

```js
async function getProduct(handle) {
  const response = await fetch(`/products/${encodeURIComponent(handle)}.js`);

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json();
}
```

### Liquid debugging examples

#### Wrong scope assumption

```liquid
{% render 'price', product: product, show_compare: true %}
```

Inside the snippet, use the explicitly passed `product` and `show_compare` variables.

#### Blank-safe output

```liquid
{% if product.metafields.custom.subtitle != blank %}
  <p>{{ product.metafields.custom.subtitle | escape }}</p>
{% endif %}
```

#### Correct image rendering

```liquid
{% if product.featured_image %}
  {{ product.featured_image
    | image_url: width: 900
    | image_tag:
      loading: 'lazy',
      widths: '360, 540, 720, 900',
      sizes: '(min-width: 768px) 50vw, 100vw',
      alt: product.featured_image.alt
  }}
{% endif %}
```

Do not lazy-load the primary above-the-fold product image; use eager/high priority for the LCP image.

### What good refactoring means

- Preserve behaviour before changing structure.
- Use descriptive names.
- Remove duplication, not useful clarity.
- Separate data fetching, business logic, and DOM rendering.
- Prefer small functions with one responsibility.
- Handle failure and empty states.
- Do not add a framework for a small problem.

---

## 4. Section C: live coding patterns

### Task 1: accessible modal

```html
<button type="button" data-modal-open>Open details</button>

<div class="modal" data-modal hidden>
  <div class="modal__dialog" role="dialog" aria-modal="true" aria-labelledby="modal-title">
    <h2 id="modal-title">Product details</h2>
    <button type="button" data-modal-close aria-label="Close dialog">×</button>
    <p>Modal content</p>
  </div>
</div>
```

```css
.modal {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  padding: 1rem;
  background: rgb(0 0 0 / 55%);
}

.modal[hidden] {
  display: none;
}

.modal__dialog {
  width: min(32rem, 100%);
  padding: 1.5rem;
  background: #fff;
}
```

```js
const modal = document.querySelector('[data-modal]');
const openButton = document.querySelector('[data-modal-open]');
const closeButton = document.querySelector('[data-modal-close]');

function openModal() {
  modal.hidden = false;
  closeButton.focus();
}

function closeModal() {
  modal.hidden = true;
  openButton.focus();
}

openButton?.addEventListener('click', openModal);
closeButton?.addEventListener('click', closeModal);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !modal.hidden) closeModal();
});
```

Follow-up improvement: focus trapping and restoring focus are important for a production modal.

### Task 2: tabs with event delegation

```html
<div class="tabs" data-tabs>
  <div role="tablist" aria-label="Product information">
    <button role="tab" aria-selected="true" data-tab="details">Details</button>
    <button role="tab" aria-selected="false" data-tab="shipping">Shipping</button>
  </div>

  <section data-panel="details">Product details</section>
  <section data-panel="shipping" hidden>Shipping information</section>
</div>
```

```js
document.querySelector('[data-tabs]')?.addEventListener('click', (event) => {
  const tab = event.target.closest('[data-tab]');
  if (!tab) return;

  const tabs = event.currentTarget;
  const selectedId = tab.dataset.tab;

  tabs.querySelectorAll('[data-tab]').forEach((item) => {
    item.setAttribute('aria-selected', String(item === tab));
  });

  tabs.querySelectorAll('[data-panel]').forEach((panel) => {
    panel.hidden = panel.dataset.panel !== selectedId;
  });
});
```

### Task 3: array aggregation

```js
const items = [
  { title: 'Saree', price: 1200, quantity: 2 },
  { title: 'Dupatta', price: 500, quantity: 1 },
];

const total = items.reduce((sum, item) => {
  return sum + item.price * item.quantity;
}, 0);

console.log(total); // 2900
```

Complexity: `O(n)` time and `O(1)` additional space.

### Task 4: PHP validation endpoint

```php
<?php
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);

if ($email === false || $email === null) {
    http_response_code(422);
    echo json_encode(['error' => 'A valid email is required']);
    exit;
}

echo json_encode([
    'success' => true,
    'email' => $email,
]);
```

Know the difference between validation (is this acceptable?) and sanitisation (transforming/removing characters).

### Task 5: Shopify Ajax cart

```js
async function addVariantToCart(variantId, quantity = 1) {
  const response = await fetch(`${window.Shopify.routes.root}cart/add.js`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      items: [{ id: variantId, quantity }],
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.description || 'Unable to add item');
  }

  return result;
}
```

Button handling:

```js
document.addEventListener('click', async (event) => {
  const button = event.target.closest('[data-add-variant]');
  if (!button) return;

  button.disabled = true;

  try {
    await addVariantToCart(Number(button.dataset.variantId));
    document.dispatchEvent(new CustomEvent('cart:updated'));
  } catch (error) {
    console.error(error);
  } finally {
    button.disabled = false;
  }
});
```

Explain why one delegated listener supports both desktop and mobile markup without duplicated `onclick` attributes.

### Task 6: responsive product grid

```css
.product-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
}

@media (min-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1.5rem;
  }
}

.product-card img {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 3 / 4;
  object-fit: cover;
}
```

### Common live-coding checks

- Does it work when the queried element is absent?
- Are buttons disabled during async work?
- Is loading state cleared in `finally`?
- Does the code handle non-200 responses?
- Is user-generated output escaped?
- Can keyboard users operate it?
- Does it work after dynamic HTML is inserted?
- Are listeners registered only once?
- Are mobile and desktop handled by shared logic?

---

## 5. Section D: Shopify architecture and scenarios

### Theme architecture map

```text
layout/theme.liquid
  ├── templates/*.json
  │     └── sections/*.liquid
  │           ├── blocks
  │           └── snippets/*.liquid
  ├── assets/*.css and *.js
  ├── config/settings_schema.json
  ├── config/settings_data.json
  └── locales/*.json
```

### Scenario: configurable homepage component

Good answer:

1. Create an Online Store 2.0 section.
2. Put heading/layout options in section settings.
3. Use repeatable blocks for merchant-managed items.
4. Add a preset so the merchant can add it in the editor.
5. Use responsive images and semantic markup.
6. Load JavaScript only when interaction requires it.

### Scenario: reusable UI across sections

Use a snippet when markup/logic is reused and does not need independent merchant placement. Pass all dependencies explicitly:

```liquid
{% render 'product-card',
  product: product,
  show_vendor: section.settings.show_vendor
%}
```

Use a section when the merchant should add, remove, reorder, or configure the whole component.

### Scenario: product-specific custom content

- Use a metafield for one structured value.
- Use a metaobject for reusable structured records with multiple fields.
- Use dynamic sources in the theme editor where possible.
- Do not hardcode per-product content into theme files.

Example:

```liquid
{% assign care_guide = product.metafields.custom.care_guide.value %}

{% if care_guide != blank %}
  <h2>{{ care_guide.title | escape }}</h2>
  {{ care_guide.instructions | metafield_tag }}
{% endif %}
```

### Scenario: variant selection

Flow:

1. Read selected option values.
2. Find the matching variant.
3. Update variant ID in the product form.
4. Update price, compare-at price, inventory message, media, and URL.
5. Disable Add to Cart when unavailable.
6. Preserve progressive enhancement: the form should still submit normally when possible.

Never use product ID for `/cart/add`; the cart needs a merchandise variant ID.

### Scenario: cart drawer updates

- Submit to Shopify’s Ajax Cart API.
- Request or fetch updated section HTML.
- Replace only affected sections.
- Re-bind through custom elements or use delegation to avoid duplicate listeners.
- Announce cart changes with an `aria-live` region.
- Handle validation errors and sold-out inventory.

### Scenario: theme performance is slow

Investigate in this order:

1. Large above-the-fold images and LCP.
2. Too many third-party/app scripts.
3. Render-blocking CSS and JavaScript.
4. Unused libraries loaded on every template.
5. Excessive DOM size and nested sections.
6. Layout shift caused by images without dimensions.
7. Expensive Liquid loops or repeated requests.

Improvements:

- Correctly size and compress images.
- Provide `width`, `height`, `srcset`, and `sizes`.
- Eager-load only the LCP image; lazy-load below-the-fold media.
- Use `defer` for non-critical classic scripts.
- Load feature assets only on templates/sections that need them.
- Prefer one delegated listener over many listeners.
- Use `IntersectionObserver` for visibility/lazy behaviour rather than continuous scroll handlers.
- Remove duplicate apps and duplicate libraries.

### Scenario: app block versus custom theme code

Prefer an app block/app embed when functionality belongs to an app, must survive theme updates, or requires merchant enable/disable controls. Use theme code for presentation tightly coupled to the theme. Avoid installing multiple tools that provide the same feature.

### Scenario: security

- Liquid output should be escaped in HTML/attribute contexts.
- Never expose Admin API secrets in theme JavaScript.
- Store secrets on a secure server/app backend.
- Verify Shopify webhooks using HMAC on the server.
- Validate all server input.
- Use prepared SQL statements.
- Do not trust price or discount values sent by the browser.

### Scenario: accessibility

- Semantic controls and headings.
- Keyboard access and visible focus.
- Accurate labels and alternative text.
- `aria-expanded` for toggles.
- `aria-live` for async cart feedback.
- Focus management for drawers/modals.
- Sufficient contrast.
- Respect `prefers-reduced-motion`.

---

## 6. Liquid essentials to write from memory

### Assignment and condition

```liquid
{% assign current_variant = product.selected_or_first_available_variant %}

{% if current_variant.available %}
  <button type="submit">Add to cart</button>
{% else %}
  <button type="button" disabled>Sold out</button>
{% endif %}
```

### Loop with empty fallback

```liquid
{% for product in collection.products limit: 8 %}
  {% render 'product-card', product: product %}
{% else %}
  <p>No products found.</p>
{% endfor %}
```

### Capture

```liquid
{% capture button_label %}
  {% if product.available %}Add to cart{% else %}Sold out{% endif %}
{% endcapture %}

<button>{{ button_label | strip }}</button>
```

### Section schema

```liquid
{% schema %}
{
  "name": "Feature cards",
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "Why shop with us"
    }
  ],
  "blocks": [
    {
      "type": "card",
      "name": "Card",
      "settings": [
        {
          "type": "text",
          "id": "title",
          "label": "Title"
        }
      ]
    }
  ],
  "max_blocks": 4,
  "presets": [
    {
      "name": "Feature cards"
    }
  ]
}
{% endschema %}
```

Remember: schema must be valid JSON—no comments, trailing commas, or Liquid inside JSON values unless supported by the surrounding implementation.

---

## 7. PHP essentials to write from memory

### Function with types

```php
function lineTotal(float $price, int $quantity): float
{
    if ($price < 0 || $quantity < 0) {
        throw new InvalidArgumentException('Values cannot be negative');
    }

    return $price * $quantity;
}
```

### Class and dependency injection

```php
final class OrderService
{
    public function __construct(
        private OrderRepository $orders
    ) {
    }

    public function find(int $id): ?Order
    {
        return $this->orders->findById($id);
    }
}
```

Dependency injection makes dependencies explicit and improves testability.

### Exception handling

```php
try {
    $order = $service->create($data);
} catch (InvalidArgumentException $error) {
    http_response_code(422);
    echo $error->getMessage();
} catch (Throwable $error) {
    http_response_code(500);
    error_log($error->getMessage());
    echo 'Something went wrong';
}
```

Do not expose internal stack traces or database details to users.

---

## 8. Common trick questions

### What does this print?

```js
console.log('5' + 2); // "52"
console.log('5' - 2); // 3
console.log(Boolean('0')); // true
console.log(Boolean(0)); // false
```

### Async order

```js
console.log('A');

Promise.resolve().then(() => console.log('B'));
setTimeout(() => console.log('C'), 0);

console.log('D');
```

Output: `A`, `D`, `B`, `C`. Promise microtasks run before timer tasks after the current call stack.

### PHP comparison

```php
var_dump(0 == '0');  // true
var_dump(0 === '0'); // false
```

### Liquid truthiness

In Liquid, only `false` and `nil` are falsy. Empty strings and zero are truthy. Use `blank`/`empty` checks when testing content.

```liquid
{% if value == blank %}
  No value
{% endif %}
```

---

## 9. Practice questions

Do these without opening the answers above.

1. Explain `==` versus `===` in PHP and JavaScript.
2. Build a character counter with a 200-character maximum.
3. Find duplicate values in a JavaScript array.
4. Group products by vendor using `reduce()`.
5. Validate a PHP contact form and return JSON errors.
6. Refactor five button listeners into event delegation.
7. Build an accessible accordion.
8. Create a Shopify section containing repeatable feature blocks.
9. Render a product image only when it exists.
10. Add a selected variant to Shopify’s cart with error handling.
11. Explain when to use a snippet, section, block, metafield, and metaobject.
12. Explain how you would reduce product-page LCP.
13. Explain why an API secret must not be placed in Liquid/JavaScript.
14. Explain how to update a cart drawer without a page reload.
15. Debug a function that adds string prices instead of numbers.

### Spoken follow-up drill

For every solution, answer aloud:

- What assumptions did I make?
- What happens with empty input?
- What can fail?
- What is the time/space complexity?
- How is it accessible?
- How would it behave after dynamic DOM updates?
- What would I test?

---

## 10. Final 24-hour revision plan

### Round 1: 45 minutes

- PHP strict comparison, validation, escaping, prepared statements.
- JavaScript scope, arrays, DOM events, Promises, fetch.
- Liquid syntax, objects, filters, sections, snippets, schema.

### Round 2: 60 minutes

- Code an accordion or tabs without copying.
- Code one PHP JSON endpoint.
- Code one Ajax Cart add function.
- Debug five intentionally broken snippets.

### Round 3: 30 minutes

- Speak Shopify architecture answers aloud.
- Practise the decision → reason → trade-off → implementation format.

### Final check

- Sleep properly; speed depends on clear recall.
- Test keyboard and development environment before starting.
- Read every question fully.
- Do not switch tabs or leave full screen.
- Do not use these notes during the test.
- Prefer clear, correct code over clever code.

## Quick confidence reminder

You do not need to remember every API. The interviewer is testing whether you can reason clearly, write safe fundamentals, debug systematically, and explain your choices. Build the smallest correct solution, test it, and communicate honestly.
