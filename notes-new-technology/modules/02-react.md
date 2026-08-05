# Module 2 — React.js

## Why React?

React builds interfaces from reusable components. State describes what the UI
should show; React updates the DOM when state changes.

```text
event -> state update -> render -> virtual tree comparison -> DOM commit
```

Laravel comparison: Blade renders templates per request; React normally keeps a
client application alive and re-renders components as data changes.

## Setup with Vite

```bash
npm create vite@latest shop-ui -- --template react
cd shop-ui
npm install
npm run dev
```

```text
src/
├── app/App.jsx
├── components/
├── features/products/
├── hooks/
├── lib/api.js
├── pages/
└── main.jsx
```

Keep feature logic together; do not create one enormous `components` directory.

## JSX, components, and props

JSX is syntax that becomes JavaScript element calls. Components must be pure
during rendering.

```jsx
function ProductCard({ product, onAdd }) {
  return (
    <article>
      <h2>{product.name}</h2>
      <p>{product.formattedPrice}</p>
      <button type="button" onClick={() => onAdd(product.id)}>Add</button>
    </article>
  );
}
```

Props are read-only inputs. Escape user text through JSX; never use
`dangerouslySetInnerHTML` with untrusted content.

## State, events, conditions, and lists

```jsx
const [query, setQuery] = useState('');
const visible = products.filter((p) =>
  p.name.toLowerCase().includes(query.toLowerCase()),
);

return <>{visible.length ? visible.map((p) =>
  <ProductCard key={p.id} product={p} />
) : <p>No products found.</p>}</>;
```

Use stable database IDs as keys. Never mutate state. Derive values during render
instead of storing duplicate state.

## Forms and controlled inputs

```jsx
function LoginForm({ onSubmit }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const update = ({ target }) => setForm((old) => ({
    ...old, [target.name]: target.value,
  }));
  return <form onSubmit={(e) => { e.preventDefault(); onSubmit(form); }}>
    <input name="email" type="email" value={form.email} onChange={update} required />
    <input name="password" type="password" value={form.password} onChange={update} required />
    <button>Sign in</button>
  </form>;
}
```

Validate on both client and server. Client validation improves UX; it is not a
security boundary.

## Hooks

| Hook | Use | Common mistake |
|---|---|---|
| `useState` | local state | mutating objects |
| `useEffect` | synchronize with external system | using it for derived state |
| `useRef` | DOM/reference without render | treating it as visible state |
| `useMemo` | cache expensive calculation | premature use |
| `useCallback` | stable function identity | wrapping every handler |
| `useContext` | shared dependency/state | one giant context |

```jsx
useEffect(() => {
  const controller = new AbortController();
  loadProducts({ signal: controller.signal }).then(setProducts).catch((error) => {
    if (error.name !== 'AbortError') setError(error);
  });
  return () => controller.abort();
}, []);
```

Hooks run at the top level and only in React components/custom hooks. In
development Strict Mode may run setup/cleanup twice to expose unsafe effects.

```text
mount: render -> commit -> effect
update: render -> commit -> old cleanup -> new effect
unmount: cleanup
```

## Context and reducer

Use context for broadly shared values such as authenticated user or theme. Pair a
reducer with context for predictable transitions; use server-state tooling for
remote cached data rather than copying every response into context.

## Router, API, and protected routes

```jsx
<Routes>
  <Route element={<AppLayout />}>
    <Route index element={<Home />} />
    <Route path="products/:id" element={<Product />} />
    <Route element={<RequireAuth />}>
      <Route path="account" element={<Account />} />
    </Route>
  </Route>
</Routes>
```

Client route protection is presentation only. The API must independently verify
identity and permission. Axios interceptors can attach credentials and normalize
errors, but avoid infinite refresh loops.

## Performance and deployment

- Measure before applying `memo`, `useMemo`, or `useCallback`.
- Lazy-load route bundles with `lazy` and `Suspense`.
- Virtualize very large lists and paginate APIs.
- Use responsive images and reserve dimensions to prevent layout shift.
- Build with `npm run build`; deploy `dist` to a static host and configure SPA
  fallback routes.
- Browser environment variables are public even when named “secret.”

## Errors, debugging, and best practices

- “Too many re-renders”: state was updated while rendering.
- Infinite effect: dependency changes every render; remove unnecessary effect or
  stabilize the true dependency.
- Stale value: use correct dependencies or functional state updates.
- Use React DevTools, Network panel, error boundaries, and accessible queries in tests.
- Test behavior with Vitest and React Testing Library.

## Interview and practice

1. Props vs state? Controlled vs uncontrolled input?
2. What makes a component render? Why are keys needed?
3. Effect vs event handler? `useMemo` vs `useCallback`?
4. Explain reconciliation, lifting state, context, and code splitting.
5. Build searchable products, a validated form, protected account page, and an
   abortable API hook.

## Assignment

Build a React expense manager with authentication UI, routes, CRUD forms,
pagination, loading/error/empty states, lazy routes, tests, and deployment.

