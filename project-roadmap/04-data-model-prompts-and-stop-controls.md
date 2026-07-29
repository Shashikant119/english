# Data Model, Prompts, and Stop Controls

## 1. Core database tables

### users

```text
id
email
password_hash or auth_provider_id
role
created_at
updated_at
```

### shops

```text
id
shop_domain
shopify_shop_id
encrypted_access_token
granted_scopes
api_version
timezone
status
installed_at
uninstalled_at
```

### agent_configs

```text
id
shop_id
agent_type
status: draft | running | paused | stopped | failed
schedule
timezone
settings_json
last_started_at
last_paused_at
last_stopped_at
updated_by
```

### webhook_events

```text
id
shop_id
shopify_webhook_id (unique)
topic
triggered_at
payload_json
status
attempt_count
processed_at
error_message
```

### report_runs

```text
id
shop_id
report_type
period_start
period_end
idempotency_key (unique)
metrics_json
summary_text
status
created_at
sent_at
```

### whatsapp_recipients

```text
id
shop_id
phone_e164
display_name
opt_in_status
opt_in_source
opt_in_at
active
```

### whatsapp_messages

```text
id
report_run_id
recipient_id
meta_message_id
template_name
status
attempt_count
error_code
sent_at
delivered_at
read_at
```

### search_runs

```text
id
user_id
original_prompt
structured_query_json
status
target_count
request_budget
requests_used
started_at
paused_at
stopped_at
completed_at
```

### leads

```text
id
search_run_id
google_place_id
business_name
category
address
city
country
website_url
normalized_domain
maps_url
business_status
shopify_status
shopify_confidence
detection_evidence_json
review_status
notes
discovered_at
website_checked_at
```

### audit_logs

```text
id
actor_type
actor_id
action
resource_type
resource_id
metadata_json
created_at
```


## 2. Agent-status check

Every scheduled or queued job starts with:

```text
1. Load agent status from the database.
2. If status is not “running,” exit without external API calls.
3. Check the global kill switch.
4. Check the account’s daily budget.
5. Acquire a job lock.
6. Perform one bounded unit of work.
7. Save progress.
8. Release the lock.
```

Never create one infinite function that runs forever.


## 3. Stop-control design

### Pause

Database update:

```text
status = paused
```

Worker behavior:

- Current small operation can finish.
- No new external request starts.
- Progress remains saved.
- Resume continues from the checkpoint.

### Stop

Database update:

```text
status = stopped
stopped_at = current time
```

Worker behavior:

- No new external request starts.
- Safe queued jobs are cancelled.
- Current non-cancellable network request can finish.
- Result is ignored if it arrives after stop.
- Audit log is written.

### Emergency stop

Global configuration:

```text
OUTBOUND_ACTIONS_ENABLED=false
```

It should immediately block:

- WhatsApp sends
- Google Places requests
- Website verification requests

Shopify webhook endpoints may continue acknowledging valid events to avoid
repeated delivery storms, but they should not trigger outbound work.


## 4. Shopify report prompt

The model receives verified metrics, not raw unrestricted store data.

System instruction:

```text
You summarize verified Shopify business metrics.
Do not calculate or modify numeric values.
Do not invent causes for changes.
Clearly distinguish facts from suggestions.
Keep the WhatsApp report concise.
If a metric is missing, say it is unavailable.
```

Input:

```json
{
  "date": "2026-07-28",
  "timezone": "Asia/Kolkata",
  "currency": "INR",
  "orders": 42,
  "gross_sales": 184500,
  "discounts": 12400,
  "refunds": 4200,
  "net_sales": 167900,
  "average_order_value": 3998,
  "comparison": {
    "period": "previous_day",
    "net_sales_change_percent": 8.4
  },
  "top_products": [],
  "inventory_alerts": []
}
```

Required output:

```text
Heading
Key metrics
Comparison
Top products
Inventory alerts
One short factual observation
```


## 5. Lead-search prompt parser

System instruction:

```text
Convert the user’s business-research request into structured search filters.
Do not invent a location, category, target count, or contact requirement.
If a required field is missing, return it in missing_fields.
Use only supported business-search filters.
Do not generate outreach messages.
```

User prompt:

```text
Find saree and ethnic-wear shops in Jaipur with a website.
I need 50 businesses that appear to use Shopify.
```

Expected structured output:

```json
{
  "categories": ["saree store", "ethnic wear store"],
  "locations": ["Jaipur, Rajasthan, India"],
  "target_count": 50,
  "must_have_website": true,
  "shopify_filter": "confirmed_or_likely",
  "run_mode": "one_time",
  "missing_fields": []
}
```


## 6. Shopify detection scoring example

Example internal scoring:

```text
cdn.shopify.com asset: +30
/cdn/shop/ asset: +30
Shopify.theme object: +25
myshopify.com reference: +20
Shopify-specific storefront endpoint: +15
Only generic “shopify” text: +2
```

Example classification:

```text
80–100: Confirmed
55–79: Likely
20–54: Possible
0–19: Not detected
Fetch failed: Unknown
```

The exact weights must be tested against a labeled website set. Do not present
the score as certainty without stored evidence.


## 7. API and job limits

Per search run:

```text
Maximum query variations: 10
Maximum Places requests: configurable
Maximum website checks: configurable
Maximum result count: configurable
Maximum runtime: configurable
```

Per website:

```text
Maximum redirects: 3
Connection timeout: 5 seconds
Overall timeout: 10 seconds
Maximum HTML size: 2 MB
Concurrent requests per domain: 1
```

Values should be configurable and reviewed before production.


## 8. Minimum environment variables

```text
DATABASE_URL
REDIS_URL
APP_BASE_URL
ENCRYPTION_KEY
SESSION_SECRET

SHOPIFY_CLIENT_ID
SHOPIFY_CLIENT_SECRET
SHOPIFY_API_VERSION

WHATSAPP_ACCESS_TOKEN
WHATSAPP_PHONE_NUMBER_ID
WHATSAPP_BUSINESS_ACCOUNT_ID
WHATSAPP_VERIFY_TOKEN

GOOGLE_MAPS_API_KEY

OUTBOUND_ACTIONS_ENABLED
```

Never commit the real values.


## 9. First implementation task list

Build only this vertical slice first:

1. User connects one Shopify development store.
2. App reads yesterday’s orders.
3. App calculates total orders and net sales.
4. Dashboard displays the report.
5. Owner clicks “Send test report.”
6. Official WhatsApp API sends it to one opted-in test number.
7. Delivery status appears in the dashboard.
8. Owner can pause and stop reports.

After this works end to end, add more metrics and automation.

