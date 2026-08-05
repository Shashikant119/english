# Twenty MERN Projects

Every project requires README, requirements, architecture, folder tree, API
contract, validation, error states, accessibility, security notes, tests, Git
history, screenshots, and deployment URL.

## Beginner

1. Todo app — filters, local persistence, accessible forms.
2. Expense tracker — categories, totals, charts, CSV export.
3. Notes app — tags, search, autosave, Markdown preview.
4. Weather dashboard — external API, cache, unit switch, error states.
5. Student manager — basic MERN CRUD, validation, pagination.

## Intermediate

6. Auth task manager — workspaces, JWT/session, ownership, roles.
7. Blog CMS — drafts, revisions, image upload, comments, moderation.
8. Employee leave system — approvals, calendars, email notifications.
9. Inventory tracker — SKUs, movement ledger, low-stock alerts.
10. Appointment system — availability, booking conflicts, reminders.

## Advanced

11. Real-time team chat — sockets, presence, unread state, attachments.
12. Learning platform — courses, progress, quizzes, certificates.
13. Multi-vendor marketplace — sellers, catalog, orders, commissions.
14. Help-desk SaaS — tickets, SLA, automation, search, audit trail.
15. Analytics dashboard — event ingestion, aggregation, caching, exports.

## Industry level

16. E-commerce platform — payments, webhooks, inventory, returns, admin.
17. Hospital operations — appointments, records, consent, detailed auditing.
18. Logistics platform — shipments, tracking events, pricing, proof of delivery.
19. Subscription SaaS — tenants, plans, metering, invoices, lifecycle webhooks.
20. ERP core — purchasing, sales, warehouse ledger, permissions, reports.

## Standard production structure

```text
project/
├── apps/web/src/{app,features,pages,components,lib}/
├── apps/api/src/{config,middleware,modules,shared}/
├── packages/{contracts,eslint-config}/
├── tests/{integration,e2e}/
├── docs/{architecture,api,runbooks}/
├── docker-compose.yml
└── README.md
```

## Delivery stages for each project

1. Write personas, user stories, non-functional requirements, and threat model.
2. Draw data model, API flow, UI states, and deployment architecture.
3. Implement vertical slices: UI to API to database.
4. Add negative tests, permissions, logs, metrics, and seed data.
5. Review accessibility, security, performance, recovery, and documentation.

