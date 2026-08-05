# Module 9 — E-Commerce

E-commerce is a consistency and workflow problem, not merely product CRUD.

```text
catalog -> cart -> address -> price/stock recheck -> payment -> order
                                      |                |
                                reservation       webhook
```

## Domain model

Product has variants/SKUs; category and brand organize discovery; inventory is
tracked per SKU/location; cart stores intent; order stores immutable purchase
snapshots. Wishlist, reviews, coupons, shipments, invoices, and returns have
separate lifecycles.

## Cart and pricing

The server recalculates price, tax, shipping, coupon, and availability at checkout.
Never trust totals from React. Store money as integer minor units. Define coupon
scope, validity, usage, minimums, stacking, and per-customer limits.

## Inventory and orders

Use atomic reservations with expiry. Make checkout idempotent. Represent order
states explicitly and reject illegal transitions.

```text
pending -> confirmed -> packed -> shipped -> delivered
   |          |                      |
cancelled   cancelled              returned/refunded
```

## Stripe/Razorpay

Create payment intents/orders on the server. Verify provider signatures on raw
webhook bodies, deduplicate event IDs, return quickly, and process robustly in a
queue. The browser redirect/success screen never proves payment. Reconcile
provider and internal records.

## Search, reviews, shipping, invoice

Index normalized searchable fields; use a search engine at advanced scale. Only
verified purchasers should receive verified badges. Moderate reviews. Preserve
shipping and billing snapshots. Generate immutable numbered invoice records
according to applicable tax/legal requirements.

## Admin and security

Admin supports catalog, variants, stock movements, orders, refunds, promotions,
customers, audit logs, and reports. Require strong auth, least privilege, upload
validation, rate limits, anti-bot controls, redacted logs, and no card storage.

## Assignment

Build catalog, search/filter, variant selection, cart, wishlist, coupon, address,
idempotent checkout, sandbox payment, verified webhook, inventory reservation,
orders, reviews, invoice, admin RBAC, tests, observability, and recovery runbook.

