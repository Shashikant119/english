# Shopify AI Agents — Project Roadmap

## Project goal

Build a controlled AI-agent system with two separate agents:

1. **Shopify Reporting Agent**
   - Connects securely to your Shopify store.
   - Watches orders, sales, products, inventory, cancellations, and refunds.
   - Creates scheduled and event-based reports.
   - Sends reports to your opted-in WhatsApp number.
   - Continues running until you pause or stop it.

2. **Business Lead Research Agent**
   - Accepts a business category and location from your prompt.
   - Uses approved Google APIs to discover public businesses.
   - Visits public business websites with controlled rate limits.
   - Detects whether a website appears to use Shopify.
   - Creates a deduplicated, reviewable lead list.

## Read the roadmap in this order

1. [Shopify + WhatsApp agent](01-shopify-whatsapp-agent.md)
2. [Google lead research agent](02-google-lead-research-agent.md)
3. [Build plan and checklist](03-build-plan-and-checklist.md)
4. [Data model, prompts, and stop controls](04-data-model-prompts-and-stop-controls.md)

## Recommended first version

Do not build both agents at the same time.

Start with:

1. Shopify read-only connection.
2. Daily sales report in the dashboard.
3. WhatsApp test message.
4. Scheduled daily WhatsApp report.
5. Pause/resume/stop controls.
6. Only after this is stable, build the lead research agent.

## Recommended technology

- Backend: Node.js + TypeScript
- API framework: Fastify, Express, or NestJS
- Database: PostgreSQL
- Background jobs: Redis + BullMQ
- Scheduler: BullMQ repeatable jobs or a managed scheduler
- Shopify: GraphQL Admin API + webhooks
- WhatsApp: Meta WhatsApp Business Cloud API
- Business discovery: Google Places API (New)
- Website verification: controlled HTTP fetcher
- Optional AI: an LLM for summaries and prompt interpretation
- Deployment: Docker on a VPS or a managed cloud platform
- Monitoring: structured logs, error alerts, and job health checks

## Important operating rules

- Start Shopify access as read-only.
- Never store API secrets in source code.
- Verify every Shopify webhook signature.
- Deduplicate webhook deliveries and report jobs.
- Use only opted-in WhatsApp recipients.
- Use approved WhatsApp message templates when required.
- Do not scrape Google result pages.
- Use Google Places or another licensed data provider.
- Collect only public business information.
- Respect website terms, robots rules, and rate limits.
- Require human review before sending sales outreach.
- Add daily API-cost and lead-count limits.
- Include a single-click emergency stop.

## Definition of “running until I stop it”

The agent should not be an uncontrolled infinite loop.

It should run as a supervised background service:

- A scheduler creates jobs.
- Workers process jobs with retries and limits.
- A database stores whether each agent is `running`, `paused`, or `stopped`.
- Every job checks the current status before doing work.
- A stop action prevents new jobs and cancels safe queued jobs.
- A health monitor reports failures.

This design keeps the agent persistent without making it unsafe or expensive.

## Official references

- Shopify webhooks: https://shopify.dev/docs/apps/build/webhooks
- Shopify webhook subscriptions: https://shopify.dev/docs/apps/build/webhooks/subscribe
- Shopify GraphQL Admin API: https://shopify.dev/docs/api/admin-graphql/latest
- WhatsApp Cloud API: https://developers.facebook.com/docs/whatsapp/cloud-api/
- Google Places Text Search: https://developers.google.com/maps/documentation/places/web-service/text-search

