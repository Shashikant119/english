# Step-by-Step Build Plan

## Phase 0 — Requirements and accounts

### Decisions

- One Shopify store or multiple stores?
- Which WhatsApp number receives reports?
- Daily report time and timezone?
- Which metrics matter?
- Which events need instant alerts?
- Which countries and business categories will lead research cover?
- Who reviews and approves leads?
- Monthly API budget?

### Accounts

- Shopify Partner/Dev Dashboard or custom app access
- Meta Business and WhatsApp Business setup
- Google Cloud project with Places API
- Hosting account
- PostgreSQL database
- Redis service

### Deliverable

A signed-off requirements document with no coding yet.


## Phase 1 — Project foundation

### Build

- TypeScript project
- API server
- PostgreSQL connection
- Redis and job queue
- Environment-variable validation
- Structured logging
- Health endpoints
- Database migrations
- Docker development setup

### Suggested folders

```text
apps/
  api/
  worker/
  dashboard/
packages/
  database/
  shopify/
  whatsapp/
  google-places/
  website-detector/
  reporting/
  shared/
```

### Required endpoints

```text
GET  /health
GET  /ready
POST /webhooks/shopify
POST /webhooks/whatsapp
```

### Exit criteria

- API and worker start successfully.
- Health checks pass.
- A test job runs through the queue.
- Secrets are not committed.


## Phase 2 — Shopify read-only integration

### Build

- Shopify installation/authentication
- Encrypted token storage
- GraphQL API client
- Shop-information test query
- Orders query
- Products and inventory query
- API error and rate-limit handling

### Tests

- Invalid token
- Missing scope
- API timeout
- GraphQL user errors
- Pagination
- API-version configuration

### Exit criteria

- Dashboard can show recent Shopify orders.
- Totals match a manually checked Shopify report.


## Phase 3 — Shopify webhooks

### Build

- Webhook subscriptions
- Raw-body HMAC verification
- Webhook-ID deduplication
- Fast event persistence
- Queue dispatch
- Event processors
- App-uninstalled cleanup

### Tests

- Valid signature
- Invalid signature
- Duplicate webhook
- Out-of-order webhook
- Handler retry
- Worker failure

### Exit criteria

- Test webhook is received and processed once.
- Duplicate delivery does not duplicate data.


## Phase 4 — Reporting engine

### Build

- Daily metrics query
- Weekly metrics query
- Product ranking
- Inventory-alert calculation
- Previous-period comparison
- Deterministic report object
- Text formatter
- Report audit record

### Rule

Calculate numbers in code/SQL. Use AI only to summarize already-calculated facts.

### Exit criteria

- Daily report matches Shopify Admin for several test days.
- Re-running the same report does not duplicate it.


## Phase 5 — WhatsApp integration

### Build

- WhatsApp Cloud API client
- Recipient opt-in table
- Template-message support
- Message delivery-status webhook
- Retry policy
- Test-recipient mode
- Outbound emergency stop

### Exit criteria

- Test message is delivered.
- Delivery status is saved.
- Failed message is retried safely.
- Non-opted-in number is rejected.


## Phase 6 — Scheduler and continuous operation

### Build

- Daily report schedule
- Weekly report schedule
- Event-alert jobs
- Agent status state machine
- Pause/resume/stop
- Global kill switch
- Missed-job recovery
- Reconciliation schedule

### State machine

```text
draft -> running -> paused -> running
running -> stopped
paused -> stopped
failed -> paused
```

`stopped` should require an explicit restart action.

### Exit criteria

- Agent runs for seven days in staging.
- Restarting the server does not lose schedules.
- Pause prevents new reports.
- Stop prevents all outbound messages.


## Phase 7 — Dashboard

### Pages

- Login
- Store connection
- Agent status
- Report settings
- WhatsApp recipients
- Reports history
- Webhook health
- Failed jobs
- Audit log
- Emergency stop

### Exit criteria

- Owner can manage the agent without server access.


## Phase 8 — Lead agent foundation

### Build

- Search-run form
- Prompt-to-filter parser
- Confirmation screen
- Places API client
- Query planner
- Place-ID deduplication
- Lead database
- Search budget tracker

### Exit criteria

- One prompt creates a deduplicated list of public businesses.


## Phase 9 — Website and Shopify detector

### Build

- Safe public-website fetcher
- SSRF protections
- Redirect validation
- Robots/terms policy
- HTML signal extraction
- Shopify confidence score
- Evidence storage
- Detection cache

### Exit criteria

- Test set includes known Shopify and non-Shopify stores.
- False positives are reviewed and documented.
- Every classification includes evidence.


## Phase 10 — Lead review and export

### Build

- Lead table
- Filters
- Evidence display
- Approve/reject/duplicate actions
- Notes
- CSV export
- Search-run summary

### Exit criteria

- Human can review all leads before export.
- No outreach occurs automatically.


## Phase 11 — Production hardening

### Security

- Encrypt tokens at rest
- Rotate secrets
- Restrict admin access
- CSRF protection
- Rate limiting
- Input validation
- Audit logging
- Database backup and restore test
- Dependency scanning
- Container isolation

### Reliability

- Error monitoring
- Queue health alerts
- Database monitoring
- API-cost alerts
- Dead-letter queue
- Runbooks
- Staging environment

### Exit criteria

- Security checklist complete.
- Restore test complete.
- Stop control tested in production-like staging.


## Suggested 12-week schedule

### Week 1

- Requirements
- Accounts
- Project setup

### Week 2

- Shopify authentication
- GraphQL read queries

### Week 3

- Webhooks
- Deduplication

### Week 4

- Report calculations
- Report validation

### Week 5

- WhatsApp setup
- Test messages

### Week 6

- Scheduling
- Pause/resume/stop

### Week 7

- Dashboard
- Staging test

### Week 8

- Places API
- Lead search runs

### Week 9

- Website verifier
- Shopify detector

### Week 10

- Lead review UI
- CSV export

### Week 11

- Security
- Cost limits
- Monitoring

### Week 12

- End-to-end testing
- Production deployment
- Documentation and training


## Testing checklist

### Shopify

- [ ] Orders pagination
- [ ] Refund handling
- [ ] Cancelled orders
- [ ] Multiple currencies
- [ ] Multiple locations
- [ ] Duplicate webhook
- [ ] Out-of-order webhook
- [ ] Token revoked

### WhatsApp

- [ ] Recipient opted in
- [ ] Template approved
- [ ] Message delivered
- [ ] Delivery status received
- [ ] Rate-limit handling
- [ ] Token expired
- [ ] Emergency stop

### Lead agent

- [ ] Empty query
- [ ] Ambiguous location
- [ ] Duplicate Place IDs
- [ ] Website redirects
- [ ] Private IP blocked
- [ ] Oversized response blocked
- [ ] Timeout
- [ ] Shopify false-positive test
- [ ] Budget reached
- [ ] Stop during active run

