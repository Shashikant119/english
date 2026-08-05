# Module 10 — Deployment and DevOps

Deployment moves a tested artifact through environments reproducibly.

```text
GitHub -> CI(test/build/scan) -> image/artifact -> host
                                            ┌-> React CDN
Internet -> DNS -> TLS -> NGINX/load balancer -> Node/PM2 -> MongoDB Atlas
```

## Git and CI/CD

Use small branches and reviewed commits. CI installs from the lockfile, lints,
tests, builds, scans, and deploys an immutable artifact. Protect production and
support rollback. Never print secrets.

## Docker basics

Use a small trusted base, multi-stage build, non-root user, `.dockerignore`, pinned
versions, health check, read-only filesystem where possible, and external config.
Containers are disposable; persistent data lives in managed storage/volumes.

## Platforms

- Vercel: React/static/frontend and supported serverless workloads.
- Render/Railway: convenient API deployment; verify disk/sleep/scaling behavior.
- Atlas: backups, network rules, least-privilege users, monitoring.
- AWS EC2: greater control and greater patching, firewall, backup, and ops burden.

## NGINX and PM2

NGINX terminates TLS, proxies requests, sets limits/timeouts, and serves static
assets. PM2 supervises Node processes and graceful reloads; systemd is another
valid supervisor. Do not run application processes as root.

## Domain, SSL, and environment

Configure DNS, issue/renew TLS certificates, redirect HTTP, enable secure headers,
and monitor expiry. Validate environment variables on startup. Use a secret manager,
rotate secrets, and keep dev/staging/prod isolated.

## Production checklist

Health/readiness endpoints, structured logs, metrics, tracing/correlation IDs,
alerts, backups with restore drills, migrations, rate limiting, dependency patches,
resource limits, graceful shutdown, zero-downtime strategy, incident runbook, and
tested rollback.

## Assignment

Containerize and deploy the MERN application with CI, Atlas, TLS domain, NGINX or
managed proxy, health checks, monitoring, backup/restore test, secret management,
load test, rollback instructions, and architecture diagram.

