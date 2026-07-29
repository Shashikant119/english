# Agent 1 — Shopify Monitoring and WhatsApp Reporting

## 1. Agent responsibilities

The first agent should:

- Connect to one Shopify store.
- Receive near-real-time Shopify events.
- Store normalized order and inventory events.
- Calculate business metrics.
- Generate understandable reports.
- Send reports to WhatsApp.
- Respond to approved control commands.
- Continue on its schedule until paused or stopped.

## 2. Reports for the first version

### Daily report

- Report date and timezone
- Total orders
- Gross sales
- Discounts
- Refunds
- Net sales
- Average order value
- Units sold
- Top five products
- Low-stock products
- Out-of-stock products
- Cancelled orders
- Comparison with the previous day

### Weekly report

- Current-week sales
- Previous-week comparison
- Order growth percentage
- Best-selling products
- Slow-moving products
- Refund rate
- Inventory alerts
- Recommendations for human review

### Event alerts

- High-value order received
- Order cancelled
- Refund created
- Product became out of stock
- Inventory fell below a configured threshold
- Shopify authentication or webhook failure

## 3. Shopify connection

### Recommended approach

Create a Shopify app and use the GraphQL Admin API.

For one store, you can begin with a custom app. If the system will later support
many stores, design the authentication layer for OAuth from the beginning.

### Start with minimum read scopes

Exact scopes must be confirmed against the Shopify API version used during
implementation. A read-only first version will generally need access to:

- Orders
- Products
- Inventory
- Locations
- Shop information

Do not request write scopes until a feature genuinely needs them.

### API version

Pin a stable Shopify API version in configuration. Review and upgrade it on
Shopify’s quarterly version schedule. Do not use an unversioned endpoint.

## 4. Webhook architecture

Shopify webhooks are better than continuously polling for events.

Suggested topics:

- orders/create
- orders/updated
- orders/cancelled
- refunds/create
- products/create
- products/update
- inventory_levels/update
- app/uninstalled

Every webhook handler must:

1. Read the raw request body.
2. Verify the Shopify HMAC signature.
3. Read the unique webhook ID.
4. Reject invalid signatures.
5. Check whether the delivery was already processed.
6. Save the event quickly.
7. Return a successful HTTP response.
8. Process heavy work in a background queue.

Do not generate a WhatsApp report inside the webhook HTTP request.

## 5. Reconciliation job

Webhook delivery can occasionally be missed or processed incorrectly.

Run a reconciliation job periodically:

1. Store the last successful synchronization time.
2. Query Shopify for records updated after that time.
3. Compare them with local records.
4. Insert missing events.
5. Correct inconsistent totals.
6. Save the new synchronization checkpoint.

Suggested frequency:

- Orders: every 30–60 minutes
- Products and inventory: every 1–3 hours
- Full daily verification: once per night

## 6. WhatsApp connection

Use the official Meta WhatsApp Business Cloud API.

Required setup:

- Meta business account
- WhatsApp Business Account
- Verified sending phone number
- System-user or production access token
- WhatsApp webhook endpoint
- Approved message templates where required
- Recipient opt-in records

Do not automate messages through WhatsApp Web, browser bots, or unofficial
libraries. They are fragile and can risk account restrictions.

## 7. WhatsApp report flow

1. Scheduler creates a report job.
2. Worker checks that the agent status is `running`.
3. Worker reads normalized Shopify data.
4. Metrics service calculates totals.
5. Report service creates a deterministic report.
6. Optional AI rewrites the summary in a friendly style.
7. Validation checks numbers against source metrics.
8. WhatsApp service sends the approved message.
9. Delivery status is stored.
10. Failure is retried with backoff.

The AI should summarize numbers, not calculate the official totals. Totals should
come from deterministic code and database queries.

## 8. Example daily WhatsApp report

```text
KCPC Daily Report — 28 July 2026

Orders: 42
Gross sales: ₹1,84,500
Discounts: ₹12,400
Refunds: ₹4,200
Net sales: ₹1,67,900
Average order value: ₹3,998

Top products:
1. Product A — 12 units
2. Product B — 9 units
3. Product C — 7 units

Inventory alerts:
- Product D: 3 units left
- Product E: Out of stock

Change from yesterday: Sales increased by 8.4%.
```

## 9. Commands and controls

Dashboard controls:

- Start agent
- Pause agent
- Resume agent
- Stop agent
- Send report now
- Change report time
- Change timezone
- Change low-stock threshold
- Enable/disable individual alert types

Optional inbound WhatsApp commands:

- `STATUS`
- `REPORT TODAY`
- `PAUSE REPORTS`
- `RESUME REPORTS`
- `STOP REPORTS`

Security rules for commands:

- Accept commands only from allowlisted phone numbers.
- Normalize and verify the sender number.
- Require a confirmation for `STOP REPORTS`.
- Store an audit record for every command.
- Do not allow sensitive Shopify write actions through simple chat commands.

## 10. Stop behavior

`Pause`:

- New scheduled reports are skipped.
- Webhooks continue to be stored.
- Data synchronization continues if configured.
- Resume can continue normally.

`Stop`:

- New reports are not created.
- Lead or report workers stop taking new jobs for this agent.
- Queued safe jobs are marked cancelled.
- Webhook endpoint can keep acknowledging events without processing them.
- A final “agent stopped” audit record is saved.

`Emergency stop`:

- Global environment/configuration kill switch
- Stops all outbound WhatsApp messages immediately
- Stops all external lead-search requests
- Keeps logs available for investigation

## 11. Reliability requirements

- Idempotency key for every report
- Unique webhook-delivery constraint
- Retry with exponential backoff
- Dead-letter queue for repeated failures
- WhatsApp delivery-status tracking
- Alert after repeated job failures
- Database backups
- UTC storage with display timezone conversion
- Monthly API-token rotation procedure

## 12. Agent 1 completion checklist

- [ ] Shopify app installed
- [ ] Read-only scopes approved
- [ ] GraphQL connection test passes
- [ ] Webhook HMAC validation passes
- [ ] Duplicate webhook test passes
- [ ] Reconciliation job works
- [ ] Daily metrics match Shopify Admin
- [ ] WhatsApp test recipient opted in
- [ ] WhatsApp template approved if needed
- [ ] Test message delivered
- [ ] Scheduled report delivered
- [ ] Pause/resume works
- [ ] Stop and emergency stop work
- [ ] Failed jobs create alerts
- [ ] Secrets are outside source code

