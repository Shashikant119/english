# Module 1 — JavaScript (ES2023+)

## 1. Introduction

### Definition

JavaScript is a high-level programming language used in browsers, servers,
desktop applications, mobile applications, and automation tools.

### Why it exists

HTML describes content and CSS controls presentation. JavaScript adds behavior:
form validation, API calls, interactive screens, and application logic. Node.js
allows the same language to run outside the browser.

### How it works

```text
source code -> JavaScript engine -> parse -> compile/JIT -> execute
                                      |
                              call stack + heap
```

JavaScript is single-threaded at the language level. The host environment
(browser or Node.js) performs timers, network operations, and file operations.
Completed callbacks return through the event loop.

```text
Call Stack <--- Event Loop <--- Task queues <--- Browser/Node APIs
```

### First program

```js
const learner = 'Asha';
console.log(`Welcome, ${learner}!`);
```

`const` creates a binding, the string is its value, and `console.log` writes a
message to the developer console.

### PHP comparison

```php
$learner = 'Asha';
echo "Welcome, {$learner}!";
```

Unlike PHP in a traditional request, browser JavaScript can keep running after
the initial page response and react to user events.

### Common mistakes

- Running browser-only APIs such as `document` in Node.js.
- Assuming JavaScript and Java are related because their names are similar.
- Ignoring errors displayed in the browser developer console.

### Best practices

- Use strict linting and automated formatting.
- Prefer modern modules and `const` by default.
- Learn the language before depending heavily on frameworks.

### Interview questions

1. Where can JavaScript run?
2. What role does a JavaScript engine play?
3. Is JavaScript single-threaded? Explain the host environment's role.

### Practice and assignment

Print your name, current learning goal, and the result of `7 * 8`. Then create an
HTML page that loads an external JavaScript module.

## 2. Variables and scope

### Definition and purpose

A variable gives a value a meaningful name. JavaScript provides `const`, `let`,
and legacy `var` declarations.

```js
const taxRate = 0.18; // binding cannot be reassigned
let quantity = 1;     // binding can be reassigned
quantity += 1;
```

Prefer `const`. Use `let` only when reassignment expresses real state change.
Avoid `var` because function scope and hoisting make mistakes easier.

### Scope diagram

```text
Global scope
└── function scope
    └── block scope: if / for / { }
```

```js
const currency = 'INR';

function calculateTotal(price, quantity) {
  const subtotal = price * quantity;

  if (subtotal > 1_000) {
    const discount = subtotal * 0.1;
    return subtotal - discount;
  }

  return subtotal;
}
```

`subtotal` exists only inside the function. `discount` exists only inside the
`if` block. Numeric separators such as `1_000` improve readability.

### Hoisting and temporal dead zone

Declarations are processed before execution, but `let` and `const` cannot be
accessed before their declaration line. This period is the temporal dead zone.

```js
// console.log(status); // ReferenceError
const status = 'ready';
```

Function declarations are callable before their source line, though declaring
before use is often easier to read.

### Real project example

```js
const FREE_SHIPPING_MINIMUM = 499;

function getShippingCharge(cartTotal) {
  if (cartTotal >= FREE_SHIPPING_MINIMUM) return 0;
  return 49;
}
```

### Common errors and debugging

- `Assignment to constant variable`: reassignment was attempted; use a new value
  or choose `let` if mutation is intentional.
- `ReferenceError`: inspect spelling and scope in the debugger.
- Accidental global variables: use modules and strict lint rules.

### Interview questions

1. Compare `var`, `let`, and `const`.
2. What is lexical scope?
3. What is the temporal dead zone?
4. Does `const` make an object immutable?

### Practice and assignment

Write `calculateInvoice(subtotal, taxRate)` without global mutable state. Create
two nested blocks and predict which variables are accessible on every line.

## 3. Data types

### Primitive and reference values

```text
Primitives: string, number, bigint, boolean, undefined, symbol, null
Objects:    object, array, function, date, map, set, and more
```

Primitives behave like immutable values. Objects are accessed through references.

```js
const productName = 'Gold Ring';
const price = 12_500;
const inStock = true;
const selectedSize = null;
let coupon; // undefined
const orderNumber = 9_007_199_254_740_993n;

const product = { productName, price };
const tags = ['jewellery', 'gift'];
```

`null` usually means intentionally empty. `undefined` usually means missing or
not assigned. `typeof null` returns `'object'` because of a historical language
bug; use `value === null` to test it.

### Copy behavior

```js
let first = 10;
let second = first;
second = 20; // first remains 10

const original = { quantity: 1 };
const alias = original;
alias.quantity = 2; // original.quantity is also 2
```

Create a shallow object copy with `{ ...original }`. Nested objects still share
references. Use `structuredClone` when a supported deep clone is appropriate.

### Type checking and conversion

```js
Array.isArray([]);          // true
Number('42');               // 42
Number.isNaN(Number('x'));  // true
String(42);                 // '42'
Boolean('');                // false
```

Avoid relying on surprising coercion. Prefer `===` and explicit conversion.

### Interview questions

1. List JavaScript primitive types.
2. Compare `null` and `undefined`.
3. Why does changing an object alias affect the original?
4. Compare `==` and `===`.

### Assignment

Build `normalizeProduct(input)` that converts price and quantity to numbers,
trims the name, validates an array of tags, and throws on invalid input.

## 4. Operators, conditions, and loops

### Operators

```js
const subtotal = 500;
const shipping = subtotal >= 499 ? 0 : 49;
const displayName = user.nickname ?? user.fullName;
const city = user.address?.city;
```

- `?:` selects one of two expressions.
- `??` uses the right side only for `null` or `undefined`.
- `?.` safely stops a property chain when a value is nullish.
- `&&` and `||` work with truthy/falsy values, not only booleans.

### Conditions

```js
function getOrderStatusLabel(status) {
  switch (status) {
    case 'paid':
      return 'Payment received';
    case 'shipped':
      return 'On the way';
    case 'delivered':
      return 'Delivered';
    default:
      return 'Status unavailable';
  }
}
```

Validate allowed states at boundaries. A `default` case prevents an undefined
display value when a backend adds a new status.

### Loops

```js
const items = [
  { price: 100, quantity: 2 },
  { price: 50, quantity: 3 },
];

let total = 0;
for (const item of items) {
  total += item.price * item.quantity;
}
```

Use `for...of` for iterable values. Use `for...in` cautiously for enumerable
object keys. Array methods are often clearer for transformations.

### Mistakes and performance

- Do not use assignment (`=`) where comparison (`===`) was intended.
- Do not use `forEach` when you need to `await` sequential work.
- Avoid nested loops over large datasets when a `Map` can provide fast lookup.
- Never trust conditions as server-side authorization; enforce access on the API.

### Assignment

Create a shipping calculator supporting standard, express, free-shipping, and
invalid-destination cases. Add at least eight test cases.

## 5. Functions

Functions package reusable behavior. Parameters are inputs; `return` provides an
output.

```js
function add(a, b) {
  return a + b;
}

const multiply = (a, b) => a * b;
```

Arrow functions do not create their own `this`, `arguments`, or `prototype`.
Do not mechanically replace methods that require dynamic `this`.

### Default, rest, and spread

```js
function calculateAverage(...scores) {
  if (scores.length === 0) return 0;
  return scores.reduce((sum, score) => sum + score, 0) / scores.length;
}

const marks = [70, 80, 90];
calculateAverage(...marks);
```

Rest collects values. Spread expands a value. They use the same `...` syntax in
different positions.

### Pure functions

```js
function addItem(cart, item) {
  return { ...cart, items: [...cart.items, item] };
}
```

A pure function returns the same output for the same inputs and does not mutate
external state. Pure logic is easier to test and reuse.

### Closures

```js
function createCounter(initialValue = 0) {
  let count = initialValue;
  return () => ++count;
}

const nextId = createCounter(100);
nextId(); // 101
nextId(); // 102
```

The returned function remembers its lexical environment. Closures power module
privacy, event handlers, and many React patterns.

### Interview questions

1. Compare declarations, expressions, and arrow functions.
2. What is a closure? Give a practical use.
3. What is a higher-order function?
4. Compare rest parameters and spread syntax.

### Assignment

Build a reusable validator factory such as `minLength(8)` that returns a function
accepting a value and returning a structured validation result.

## 6. Objects, arrays, and modern syntax

### Objects and destructuring

```js
const order = {
  id: 'ORD-101',
  customer: { name: 'Ravi', city: 'Jaipur' },
  total: 1_299,
};

const {
  id,
  customer: { name },
  coupon = null,
} = order;
```

### Array methods

| Method | Purpose | Returns new array? |
|---|---|---:|
| `map` | transform every item | Yes |
| `filter` | keep matching items | Yes |
| `find` | first matching item | No |
| `some` | any item matches | No |
| `every` | all items match | No |
| `reduce` | combine into one result | Not necessarily |
| `sort` | order items | No, mutates |
| `toSorted` | order items | Yes |

```js
const availableNames = products
  .filter((product) => product.stock > 0)
  .map((product) => product.name);

const cartTotal = items.reduce(
  (sum, item) => sum + item.price * item.quantity,
  0,
);
```

Do not use `map` only for side effects. Money should normally be stored as the
smallest currency unit (for example paise) to avoid floating-point rounding bugs.

### Classes and inheritance

```js
class User {
  constructor(name) {
    this.name = name;
  }

  describe() {
    return `User: ${this.name}`;
  }
}

class Admin extends User {
  constructor(name, permissions = []) {
    super(name);
    this.permissions = permissions;
  }
}
```

Classes are syntax over JavaScript's prototype system. Prefer composition when
inheritance creates tight coupling.

### Assignment

Given an array of orders, calculate revenue by customer, find the largest order,
and return the top three customers without mutating the input.

## 7. Modules

Modules split code into explicit, reusable units.

```js
// money.js
export function formatMoney(paise) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(paise / 100);
}

// app.js
import { formatMoney } from './money.js';
console.log(formatMoney(129_900));
```

ES modules use `import` and `export`. CommonJS uses `require` and
`module.exports`. Modern frontend projects use ESM; current Node applications can
use ESM by setting `"type": "module"` in `package.json`.

Do not expose secrets in frontend modules: browser bundles are public.

## 8. Async JavaScript

### Callbacks and promises

A callback is a function passed for later execution. A promise represents the
future success or failure of an asynchronous operation.

```js
function wait(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

await wait(200);
```

Promise states are `pending`, `fulfilled`, and `rejected`. A settled promise never
changes state again.

### Async/await and fetch

```js
async function getProduct(productId, { signal } = {}) {
  const response = await fetch(`/api/products/${encodeURIComponent(productId)}`, {
    signal,
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`Product request failed with ${response.status}`);
  }

  return response.json();
}
```

`fetch` rejects for network failures, not ordinary HTTP errors such as 404 or
500, so check `response.ok`. Encode untrusted path values. Abort obsolete
requests with `AbortController`.

### Parallel and sequential execution

```js
const [products, categories] = await Promise.all([
  fetch('/api/products').then(checkResponse),
  fetch('/api/categories').then(checkResponse),
]);
```

Use `Promise.all` for independent operations. Use sequential `await` when one
operation depends on the previous result. `Promise.all` fails fast; consider
`Promise.allSettled` when every outcome is needed.

### Event-loop ordering

```js
console.log('A');
setTimeout(() => console.log('B'), 0);
Promise.resolve().then(() => console.log('C'));
console.log('D');
// A, D, C, B
```

Synchronous code runs first, promise microtasks run next, then timer tasks.

### Interview questions

1. Explain the event loop, call stack, task queue, and microtask queue.
2. Compare `Promise.all`, `allSettled`, `race`, and `any`.
3. Why does `fetch` require an explicit HTTP status check?
4. What happens if an awaited promise rejects?

### Assignment

Build an API client with timeout cancellation, JSON parsing, normalized errors,
and one retry for retryable server errors. Never retry validation errors.

## 9. DOM, events, storage, and cookies

### DOM and events

```html
<button id="add-button" type="button">Add item</button>
<p id="message" aria-live="polite"></p>
```

```js
const button = document.querySelector('#add-button');
const message = document.querySelector('#message');

button.addEventListener('click', () => {
  message.textContent = 'Item added';
});
```

Use `textContent` for plain text. Inserting untrusted HTML with `innerHTML` can
create cross-site scripting (XSS).

### Event delegation

```js
document.querySelector('#product-list').addEventListener('click', (event) => {
  const button = event.target.closest('[data-product-id]');
  if (!button) return;
  console.log(button.dataset.productId);
});
```

One parent listener supports current and future child elements.

### Browser storage comparison

| Storage | Lifetime | Sent with HTTP? | Good for |
|---|---|---:|---|
| `localStorage` | until cleared | No | non-sensitive preferences |
| `sessionStorage` | tab session | No | temporary tab state |
| Cookie | configured expiry | Yes, by scope | secure server sessions |
| IndexedDB | until cleared | No | larger structured offline data |

Never store sensitive long-lived tokens in JavaScript-readable storage when a
secure HttpOnly cookie architecture is available. Use `Secure`, `HttpOnly`, and
appropriate `SameSite` cookie attributes on the server.

### Assignment

Create an accessible to-do interface using event delegation. Persist non-sensitive
tasks in local storage, validate parsed data, and handle corrupted storage safely.

## 10. Error handling

```js
class ValidationError extends Error {
  constructor(message, fields = {}) {
    super(message);
    this.name = 'ValidationError';
    this.fields = fields;
  }
}

function parseQuantity(value) {
  const quantity = Number(value);
  if (!Number.isInteger(quantity) || quantity < 1) {
    throw new ValidationError('Quantity must be a positive integer', {
      quantity: 'Invalid quantity',
    });
  }
  return quantity;
}
```

Catch an error only when you can recover, add useful context, or translate it at
an application boundary. Do not silently swallow errors.

```js
try {
  const quantity = parseQuantity(input.value);
  await updateCart(quantity);
} catch (error) {
  console.error('Cart update failed', error);
  showError(error instanceof ValidationError ? error.message : 'Please retry.');
} finally {
  submitButton.disabled = false;
}
```

Production messages should help users without leaking stack traces, database
details, tokens, or personal data.

## Mini projects

### Beginner: Expense calculator

Requirements:

- Add, edit, and delete income/expense entries.
- Validate amount, category, and date.
- Calculate totals with `reduce`.
- Filter by category and persist locally.
- Render safely without injecting user HTML.

```text
expense-calculator/
├── index.html
├── css/styles.css
└── js/
    ├── app.js
    ├── storage.js
    ├── calculations.js
    └── validation.js
```

### Intermediate: Product browser

Requirements:

- Load products from an API.
- Support loading, empty, success, and error states.
- Search with debounce and cancel outdated requests.
- Filter and sort without mutating source data.
- Use semantic HTML and keyboard-accessible controls.

## Module assignment

Build both projects, add unit tests for pure calculation functions, document setup
in a README, and deploy the static applications. Explain three security choices
and three performance choices in your submission.

## Module summary

JavaScript values and scope form the base of every MERN application. Functions
organize behavior, arrays and objects model application data, modules organize
files, promises handle asynchronous work, and browser APIs connect logic to the
page. Continue only after you can build the mini projects without copying code.
