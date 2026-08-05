# Module 7 — CRUD Systems

CRUD means Create, Read, Update, Delete. Production CRUD additionally needs
validation, permissions, search, pagination, concurrency, auditability, tests,
and consistent errors.

```text
React form -> route -> validation -> controller -> service -> model -> MongoDB
                                   <- DTO/response <-
```

## Reusable API contract

```http
GET /api/v1/students?search=asha&limit=20&cursor=...
POST /api/v1/students
GET /api/v1/students/:id
PATCH /api/v1/students/:id
DELETE /api/v1/students/:id
```

```json
{"data":[{"id":"...","name":"Asha"}],"page":{"nextCursor":"...","hasMore":true}}
```

Use idempotency keys for retried creates/payments. Use versions or ETags to avoid
lost updates. Soft deletion adds recovery but every query must respect it.

## Domain blueprints

- Student: enrollment, class, guardian, attendance, marks.
- Employee: department, manager, leave, payroll references.
- Hospital: patient, practitioner, appointment; strict privacy/audit requirements.
- Expense: account, category, transaction, budget, recurring entry.
- Blog CMS: author, post, revision, media, comment, moderation.
- Task manager: workspace, membership, task, status, label, activity.
- Inventory: SKU, warehouse, movement ledger, reservation, reorder level.

Model states and invariants before screens. Inventory should use movements and
atomic adjustments rather than trusting a client-sent final quantity.

## Assignment

Implement one domain end-to-end with OpenAPI contract, seed script, validation,
roles, cursor pagination, filters, optimistic concurrency, audit history, unit and
integration tests, accessible UI states, and deployment documentation.

