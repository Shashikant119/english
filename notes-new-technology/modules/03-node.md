# Module 3 — Node.js

Node.js runs JavaScript outside the browser using V8 and event-driven I/O. It is
excellent for APIs and I/O-heavy services; CPU-heavy work should use worker
threads, queues, or specialized services.

```text
request -> event loop -> nonblocking I/O -> callback/microtask -> response
```

## Project and npm

```bash
npm init -y
npm install express
npm install --save-dev eslint vitest
```

`package.json` records metadata, scripts, dependencies, and module type. Commit
the lockfile. Use supported Node LTS and pin it with `.nvmrc` or `engines`.

```json
{"type":"module","scripts":{"dev":"node --watch src/server.js","test":"vitest run"}}
```

## Modules and core APIs

```js
import { readFile } from 'node:fs/promises';
import path from 'node:path';
const config = JSON.parse(await readFile(path.resolve('config.json'), 'utf8'));
```

Important APIs: `fs`, `path`, `url`, `http`, `events`, `stream`, `buffer`, `os`,
`crypto`, and `process`. Prefer promise APIs. Construct paths safely rather than
concatenating user input.

## HTTP server

```js
import http from 'node:http';
const server = http.createServer((request, response) => {
  response.writeHead(200, { 'content-type': 'application/json' });
  response.end(JSON.stringify({ ok: true }));
});
server.listen(3000);
```

Express builds on this primitive. Headers must be written before the body.

## Buffers, streams, and events

A Buffer stores bytes. A stream processes data in chunks and avoids loading a
large file fully into memory. Use `pipeline()` because it forwards errors and
handles cleanup. EventEmitter supports in-process events; it is not a durable job
queue and events disappear after a crash.

## Environment and process

Validate required environment variables at startup. Never commit `.env`. Handle
`SIGTERM`: stop accepting traffic, finish active requests, close database
connections, then exit. Log structured records with correlation IDs.

## REST and authentication foundations

Separate transport, business logic, and data access. Hash passwords with a slow
password-hashing algorithm, compare safely, limit login attempts, and verify JWT
signature, issuer, audience, and expiry. Do not put secrets in JWT payloads.

## Errors, performance, and security

- Never block the event loop with synchronous filesystem or huge computation.
- Prevent unhandled promise rejections; centralize operational error handling.
- Apply body-size limits, validation, timeouts, rate limits, and dependency audits.
- Avoid command execution with user input and prevent path traversal.
- Profile CPU/memory; watch event-loop delay and leaked listeners.

## Interview, practice, assignment

Explain event loop phases, ESM vs CommonJS, streams/backpressure, Buffer, process,
and why Node scales I/O. Build a streamed file-processing CLI and a REST service
with configuration validation, graceful shutdown, logs, tests, and health checks.

