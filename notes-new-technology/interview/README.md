# MERN Interview Preparation

Use these question patterns to generate spaced-repetition cards. A strong answer
defines the idea, explains why, gives an example, names a trade-off, and mentions
a common failure.

## JavaScript question bank

Cover types/coercion, equality, scope, hoisting, closures, `this`, prototypes,
classes, objects, arrays, immutability, modules, errors, promises, event loop,
microtasks, fetch, aborting, DOM, events, storage, security, performance, and testing.

Core questions: explain `var`/`let`/`const`; shallow/deep copy; closure; prototype
chain; arrow `this`; currying; debounce/throttle; promise combinators; async error
handling; event-loop output; memory leaks; XSS; module loading; pure functions.

## React question bank

Cover JSX, render/commit, reconciliation, keys, props/state, controlled forms,
lifting state, composition, every core hook, custom hooks, context, reducers,
routing, auth UI, effects/cleanup, stale closures, memoization, Suspense, lazy loading,
error boundaries, accessibility, testing, hydration, performance, and architecture.

## Node and Express question bank

Cover V8, event loop, libuv, streams/backpressure, buffers, modules, process,
workers, clustering, npm, HTTP, middleware order, routing, controllers/services,
validation, errors, REST, idempotency, cookies/sessions/JWT, CORS, CSRF, rate limits,
uploads, logs, graceful shutdown, testing, scaling, and queues.

## MongoDB question bank

Cover BSON, ObjectId, CRUD operators, embedding/referencing, schema design,
atomicity, transactions, indexes/ESR, explain plans, aggregation stages, population,
validation, lean queries, pagination, replication, sharding, backup, consistency,
and performance debugging.

## MERN and system design

Explain request lifecycle, API versioning, error contracts, authentication flows,
RBAC/ownership, caching, pagination, file storage, websockets, job queues,
idempotency, payments/webhooks, observability, CI/CD, horizontal scaling, CDN,
load balancer, database bottlenecks, backups, and disaster recovery.

```text
clients -> CDN/WAF -> load balancer -> stateless API replicas
                                  -> cache/queue -> workers
                                  -> MongoDB replica set
```

## Coding practice

Implement array deduplication, grouping, flattening, debounce, throttle, memoize,
deep comparison, promise pool, retry with backoff, event emitter, LRU cache,
pagination, tree traversal, validation middleware, role policy, aggregation report,
and React data hook. State complexity and test edge cases.

## HR questions

Prepare STAR stories for a difficult bug, conflict, failure, ownership, tight
deadline, performance improvement, security issue, feedback, leadership, and
learning. Quantify impact honestly. Explain why the role, what you seek next, and
ask thoughtful questions about engineering quality and expectations.

## Mock interview scorecard

Score 1–5: clarification, correctness, fundamentals, trade-offs, security,
testing, communication, code readability, complexity, and debugging. Repeat weak
areas after 1, 3, 7, 14, and 30 days.

