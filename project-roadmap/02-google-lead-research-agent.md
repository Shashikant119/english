# Agent 2 — Google Business Lead Research and Shopify Detection

## 1. Agent goal

The second agent accepts a research prompt such as:

```text
Find women’s ethnic-wear stores in Jaipur that have a public website.
Check whether their website appears to use Shopify.
Create a list of 50 unique businesses.
```

It should create a reviewable business list, not automatically send unsolicited
messages.

## 2. Important compliance decision

Do not scrape Google Search result pages.

Recommended discovery sources:

- Google Places API (New) Text Search
- Google Places API Place Details
- Licensed business-data providers
- User-provided domains
- Public directories whose terms permit automated access

Google’s Custom Search JSON API is closed to new customers and existing customers
have a published transition timeline. Do not make it the main dependency for a
new project.

## 3. Prompt input

Convert the user’s free-text prompt into structured fields:

```json
{
  "business_category": "women's ethnic wear",
  "locations": ["Jaipur"],
  "country": "IN",
  "target_count": 50,
  "must_have_website": true,
  "shopify_only": true,
  "minimum_rating": 0,
  "maximum_requests": 100,
  "run_mode": "one_time"
}
```

Before running, show the interpreted query to the user for confirmation.

## 4. Discovery pipeline

### Stage A — Query planning

Generate controlled query variations:

- women’s ethnic-wear store in Jaipur
- saree store in Jaipur
- traditional clothing store in Jaipur
- boutique in Jaipur

Limit:

- Number of variations
- Locations per run
- Pages per variation
- Maximum API cost

### Stage B — Google Places Text Search

Request only necessary fields through a field mask:

- Place ID
- Display name
- Formatted address
- Business status
- Website URI
- Google Maps URI
- Primary type
- Phone number only if permitted and genuinely needed

Field masks matter because Places API billing depends partly on requested fields.

### Stage C — Deduplication

Primary deduplication key:

- Google Place ID

Secondary keys:

- Normalized domain
- Normalized phone number
- Business name + postal code

### Stage D — Public website verification

For each website:

1. Validate the URL.
2. Block private and local network addresses.
3. Follow a small number of redirects.
4. Use a clear user agent.
5. Apply per-domain rate limits.
6. Respect robots rules and website terms.
7. Download only the minimum public HTML needed.
8. Set strict response-size and timeout limits.
9. Never execute unknown website scripts on the server.

### Stage E — Shopify detection

Public technical signals can include:

- `cdn.shopify.com`
- `/cdn/shop/`
- `Shopify.theme`
- Shopify storefront JavaScript variables
- Shopify-specific asset paths
- A `myshopify.com` canonical or related domain
- Multiple consistent Shopify storefront signals

Do not classify a website as Shopify from one weak signal.

Suggested confidence:

- Confirmed: several strong signals
- Likely: one strong plus supporting signal
- Possible: only weak signals
- Not detected: no reliable signal
- Unknown: website could not be checked

Store the evidence used for the classification.

## 5. Lead record fields

```text
Business name
Google Place ID
Category
Address
City
Country
Website
Normalized domain
Google Maps URL
Business status
Shopify status
Shopify confidence
Detection evidence
Source
Date discovered
Date website checked
Human review status
Notes
```

Avoid collecting private personal data. Prefer public business contact details.

## 6. Human review workflow

Every discovered lead should have one of these states:

- New
- Needs review
- Approved
- Rejected
- Duplicate
- Website unavailable

Human reviewer checks:

- Is this the correct business?
- Is the website active?
- Is the Shopify classification supported by evidence?
- Is the public contact information appropriate for business use?
- Is outreach lawful and compliant for the relevant region?

Do not automatically contact every discovered business.

## 7. Search controls

Dashboard form:

- Prompt
- Business category
- Location
- Target lead count
- Shopify-only toggle
- Minimum rating
- Maximum API budget
- Maximum website checks
- One-time or scheduled run

Agent controls:

- Start search
- Pause search
- Resume search
- Stop search
- Export approved leads
- Delete a search run

Every worker checks the search-run status before the next external request.

## 8. Example output

```text
Search: Saree stores in Jaipur
Status: Completed
Businesses discovered: 47
Unique websites: 39
Confirmed Shopify: 16
Likely Shopify: 7
Not detected: 12
Website unavailable: 4

Lead:
Business: Example Sarees
Website: https://example.com
Shopify status: Confirmed
Confidence: 96
Evidence:
- /cdn/shop/ assets
- cdn.shopify.com
- Shopify storefront object
Review: Pending
```

## 9. What the AI should and should not do

AI can:

- Interpret the research prompt.
- Generate controlled search variations.
- Summarize a lead’s public business description.
- Explain Shopify-detection evidence.
- Rank leads using transparent criteria.

AI should not:

- Invent missing contact details.
- Claim Shopify detection without evidence.
- Bypass blocks, CAPTCHAs, or access controls.
- Scrape Google result pages.
- Send outreach without approval.
- Continue after the run or global stop flag is active.

## 10. Security for website checks

The website verifier creates SSRF risk.

Required protections:

- Allow only HTTP and HTTPS
- Resolve DNS and reject private/reserved IP ranges
- Re-check redirect destinations
- Limit redirects
- Limit response size
- Limit content types
- Short connection/read timeout
- Isolated worker/container
- No access to internal metadata endpoints
- No browser password storage
- No form submission
- No file downloads

## 11. Cost controls

- Maximum Places requests per run
- Maximum website checks per run
- Maximum leads per run
- Daily account-level budget
- Per-user quota
- Cached Place Details
- Cached Shopify detection with expiry
- Stop when target count is reached
- Stop when budget is reached

## 12. Agent 2 completion checklist

- [ ] Prompt converted into structured filters
- [ ] User confirms interpreted search
- [ ] Places API query works
- [ ] Field mask requests only required data
- [ ] Place-ID deduplication works
- [ ] Domain normalization works
- [ ] Website verifier blocks private IPs
- [ ] Timeouts and response-size limits work
- [ ] Shopify evidence detector has tests
- [ ] Confidence calculation is explainable
- [ ] Human review queue works
- [ ] CSV export works
- [ ] Pause/resume/stop works
- [ ] API cost limit stops the run
- [ ] No automatic outreach is enabled

