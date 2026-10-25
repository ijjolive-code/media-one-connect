# Integrations, access and Touchpoint replacement

Initial state: no credentials, integration entitlement or successful live connection is established by this handoff. Verify the repository before updating that state. Never infer access merely because the hotel uses a product.

## Access register

| System | What to establish | Useful first scope | Fallback |
| --- | --- | --- | --- |
| WhatsApp / possible Message Box | Exact product, contract/account owner, send API, inbound events, external bot support, inbox/takeover and test-number options | Dedicated test number with receive/reply and reliable handover | Working web channel while onboarding continues |
| SynXis | Authorised shopping API, credentials, property/rate IDs, channel eligibility, sandbox, fees, occupancy/child rules and handoff capability | Search room options and send guest to existing booking engine | Existing booking links; clearly labelled fictional availability in demonstrations |
| OPERA | Exact product/version, supported interface, authorised data/actions, cost and identity verification | Only a justified permitted read after core works | No PMS connection; verified test records |
| SevenRooms | Contract/API entitlement, permitted read/write operations, sandbox, events and fees | Booking links first; then one useful authorised operation | Links or explicit test records |
| Google | Business profile ownership and permitted review/reply/engagement access | Review links, then ingestion or controlled reply workflow if approved | Explicitly labelled sample data and manual authorised exports |
| Tripadvisor | Account ownership and authorised review/reply integration route | Prove actual review coverage and reply publishing capability | Record the gap; no full replacement claim |
| Booking.com | Account/connectivity route, review scope, reply capabilities and restrictions | Prove permitted review ingestion and available actions | Record the gap; no full replacement claim |
| Touchpoint | Actual features, contract costs/notice, exports, historic data, card/URL ownership and transition support | Document parity and migration requirements | Keep current operations until accepted replacement exists |
| App infrastructure | Approved accounts, billing, hosting, database region, retention, backup, repository and reviewer | Fictional-data development, then invited pilot | No real guest data until authorised |

Use official current documentation after the exact product/access route is known. Do not invent generic hotel API endpoints. Store secrets using the platform's secure configuration. Distinguish read, write, sandbox and production permissions.

## Connector contract

Each connector should have a documented purpose, inputs/validation, authorisation, output shape, timeout, retry/idempotency handling, error states, rate-limit behaviour, provenance/search timestamp and test fixture. Include a mock adapter where needed. The interface must expose whether results are simulated, stale, incomplete or live. A failed action must not be reported as successful.

For room shopping, preserve dates, occupancy, child ages when required, currency, total/nights/fee treatment, rate conditions and cancellation terms. A search is not a held room or confirmed booking. Recheck changing data at the appropriate booking stage. Store confirmation only from a reliable authorised result.

For messages and staff actions, authenticate events and users, persist external IDs and avoid duplicate business effects. Staff takeover must have one authoritative ownership state. Do not run competing automatic reply publishers against the same conversation or review during a controlled cutover.

## Required Touchpoint parity

The supplier description is the starting inventory; confirm actual contracted behaviour. Status for every row below is UNVERIFIED until evidence is recorded.

| Capability | Replacement evidence required |
| --- | --- |
| NFC/QR entry by venue and staff | Correct routing, managed destinations, card lifecycle and accurate attribution labels |
| Review collection | Fast accessible public review journey and optional feedback; no registration/sentiment gate |
| Google reviews | Authorised complete required coverage, pagination, updates, deduplication and fresh sync |
| Tripadvisor reviews | Proven authorised coverage; sample feed alone is insufficient |
| Booking.com reviews | Proven permitted coverage and correct source fields |
| Unified inbox/reporting | Preserve source ID, venue, rating, text, timestamps, language and reply status |
| Venue voice and named signatory | Configurable approved identity/style per venue; correct signature in outputs |
| Automated versus approved replies | Venue-specific modes, approval roles, pause controls and exception handling |
| Google/Tripadvisor publishing | Authorised posting, confirmation, retries, edits where supported and error visibility |
| History and review metrics | Validated imports and comparable definitions for volume, rating, response coverage and response time |
| Staff attribution | Document whether attributed event is entry, click, feedback or verified published review; no unsupported identity matching |
| Google engagement reporting | Prove available monthly search/Maps views, directions, calls, website/menu actions and bookings with source/definition limits |
| Ownership and migration | Data exports, URL/card control, credentials, history, backups and transition checks |
| Ongoing service | Content/reply owners, staffing, incident handling, real cost and tested recovery |

The original email reported a September 2025 soft go-live and January 2026 contract start. These are supplier-provided context, not independently verified baseline dates. Establish the actual comparison windows before analysing results; do not mix hotel and venue populations or imply causality from before/after metrics alone.

## Retirement gate

Full retirement is a long-term goal. It requires management acceptance of required parity, demonstrated added value, reliable operations, authorised data migration, contractual handling and a controlled cutover/rollback. If a required review source or publishing route is unavailable, document the blocker plainly. Additional app features do not erase missing replacement capabilities.

No supplier cancellation or production review publishing is authorised by this context pack.
