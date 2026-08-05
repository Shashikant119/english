# Module 4 — Express.js

Express is a minimal HTTP framework for routing and middleware.

```text
request -> security -> parser -> auth -> validation -> controller
                                               |          |
                                               +-> error <-+
```

## Application structure

```text
src/
├── app.js
├── server.js
├── config/
├── middleware/
├── modules/users/{route,controller,service,model,validation}.js
└── shared/errors.js
```

Routes map URLs, controllers translate HTTP, services hold business rules, and
models/data repositories access persistence. This resembles Laravel routes,
controllers, services, middleware, and Eloquent models.

## Routing and CRUD

```js
router.get('/', listProducts);
router.get('/:id', validateId, getProduct);
router.post('/', requireAuth, requireRole('admin'), validate(createSchema), createProduct);
router.patch('/:id', requireAuth, validate(updateSchema), updateProduct);
router.delete('/:id', requireAuth, requireRole('admin'), deleteProduct);
```

Use nouns in URLs and HTTP verbs for actions. Return `201` with a location for
creation, `204` for successful no-body deletion, `400` malformed request, `401`
missing/invalid identity, `403` insufficient permission, `404` missing resource,
`409` conflict, `422` semantic validation, `429` rate limit, and `500` unexpected error.

## Middleware and errors

```js
app.use(express.json({ limit: '100kb' }));
app.use('/api/products', productRouter);
app.use((req, res) => res.status(404).json({ error: { code: 'NOT_FOUND' } }));
app.use((error, req, res, next) => {
  req.log.error({ error }, 'Request failed');
  res.status(error.status ?? 500).json({
    error: { code: error.code ?? 'INTERNAL_ERROR', message: error.expose ? error.message : 'Unexpected error' },
  });
});
```

Never return stack traces in production. Ensure async errors reach error middleware
(Express 5 does this for rejected handlers).

## Authentication, cookies, sessions

JWT is stateless signed data; a session stores server-side state referenced by a
cookie. Cookies containing session/refresh identifiers should normally be
HttpOnly, Secure, scoped, and SameSite-aware. Add CSRF protection when cookies
authenticate state-changing cross-site requests.

## Uploads with Multer

Validate MIME type, magic bytes, extension, size, and count. Generate server-side
names, store outside executable/public paths or use object storage, and scan risky
files. Do not trust `originalname` or browser MIME type.

## Security checklist

TLS, Helmet, exact CORS allowlist, schema validation, sanitization by output
context, rate limits, safe Mongo queries, parameterized SQL where relevant,
authorization on every resource, audit logs, secret rotation, dependency scans,
and request/body timeouts.

## Testing and assignment

Use unit tests for services and integration tests with Supertest for status,
headers, body, auth, validation, and error cases. Build an MVC task API with JWT,
roles, pagination, uploads, OpenAPI documentation, tests, and centralized errors.

