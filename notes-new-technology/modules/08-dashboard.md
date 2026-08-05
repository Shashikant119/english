# Module 8 — Dashboards and Analytics

A dashboard converts trustworthy events into decisions. Define each metric,
timezone, currency, filter, and comparison period before drawing charts.

```text
operational DB -> aggregation/read model -> cached API -> React charts
```

## Features

- KPI cards with current value, comparison, and definition.
- Time series, categorical bars, composition charts, and tables.
- Search, validated filters, URL-synchronized state, sorting, and cursor pagination.
- Role/permission gates enforced in API and reflected in UI.
- CSV export as an asynchronous job for large datasets.

Avoid misleading truncated axes, 3D charts, excessive colors, and inaccessible
color-only meaning. Provide a table/text alternative and keyboard support.

## Performance and security

Aggregate in MongoDB, precompute expensive metrics, cache by user/tenant/filter,
invalidate deliberately, limit date ranges and export sizes, and prevent spreadsheet
formula injection in CSV. Apply tenant filters server-side before aggregation.

## Assignment

Build an admin dashboard with revenue/orders/users, date comparison, chart and
table views, filters, pagination, permission-aware navigation, queued export,
loading/error/empty states, and tests for metric correctness.

