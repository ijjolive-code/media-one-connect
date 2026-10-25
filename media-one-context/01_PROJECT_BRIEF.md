# Media One Connect: full project brief

Version 1.0 | 25 October 2026 | Product lead: Ijlal Zeeshan | Timezone: Asia/Dubai

## 1. Owner and business setting

Ijlal works in marketing at Media One Hotel Dubai and is developing a 12-week HIPO project alongside his normal role. He is a non-coder who intends to build with AI assistance and learn the necessary workflow. Codex is now open in another window. The repository, operating system, installed tools and any work already created must be inspected rather than assumed.

The platform serves both hotel guests and local F&B customers. Initial venue records should cover Media One Hotel, Garden on 8, Ciao Bella, Qwerty and Coco Lounge, with the ability to add venues. This is an initial set, not a verified inventory of every current outlet. Branding and current venue information must come from approved hotel material.

The working name is Media One Connect. It is not an approved public product name.

## 2. Why the project exists

Media One currently uses an external service called Touchpoint Ratings. From the supplier description supplied by Ijlal, it offers venue/staff NFC and QR review collection, Google/Tripadvisor/Booking.com review aggregation, and management replies to Google and Tripadvisor in each venue's voice under a named signatory. Sending is automatic at some locations and approval-based at others. It also reports review performance, staff attribution and monthly Google engagement metrics.

Ijlal recognises the service's impact. His long-term goal is to replace it entirely with a hotel-owned platform that also creates substantial guest and operational value. A basic replica, generic dashboard or extra analysis is insufficient. The incumbent has management backing; replacement must be supported by a credible working system, demonstrated business value, complete required coverage and an operating plan.

Supplier claims and before/after results in the original email have not been independently validated. They are potential baseline evidence to obtain, not proof of causality, current metrics or a forecast for this project.

## 3. Long-term product vision

Create one connected guest-services platform, initially accessible through WhatsApp and a mobile-friendly web app, with a staff backend. Extend later to native mobile clients if justified. Reviews are one connected workstream within the guest experience rather than a separate disconnected utility.

The desired modules are:

| Module | Intended functionality |
| --- | --- |
| Guest concierge | Answer hotel and venue questions, explain approved offers, recommend relevant options, clarify uncertainty and hand over to staff |
| Hotel and F&B discovery | Maintain venue pages, opening information, menus, offers, contact details, directions and booking links |
| Room shopping and booking journeys | Collect dates and occupancy, retrieve authorised live options where access exists, explain conditions and guide guests into the approved booking engine |
| Dining journeys | Venue discovery and booking links first; authorised SevenRooms availability or reservation functions later |
| Requests and service recovery | Capture requests/feedback, assign ownership, show staff status and communicate truthful progress |
| Membership and loyalty | Optional verified membership, digital member ID/QR, approved benefits, eligibility checks, controlled redemption and history |
| Reviews and reputation | Contextual collection, direct public review routes, authorised aggregation, venue-voice replies, approvals, publishing and reporting |
| Guest data and measurement | Consent-aware profiles and event history; distinguish enquiries, clicks, requests, redemptions, confirmed bookings and verified reviews |
| Staff operations | Conversation inbox or integrated handover, request queues, content management, benefit validation, review approvals and reports |

These are roadmap capabilities. They are not all promised for the first 12 weeks.

## 4. Channel strategy and approval boundary

WhatsApp is the primary conversational channel. The website/app should reuse the same assistant and business services rather than create a second knowledge base or bot.

Ijlal cannot use the actual hotel WhatsApp number before the HIPO presentation and approval. Develop with a separate project/test number and invited testers. Establish the test route without assuming access to the hotel's current provider or production Meta assets. A real WhatsApp connection is a pilot goal; if onboarding is blocked, continue the working web channel and label the WhatsApp blocker explicitly.

The first app should be a responsive web application with a PWA path. Native App Store/Play Store delivery is a later decision. A future native client should reuse backend services; reusing the backend does not automatically convert every web screen to native code.

## 5. Known systems and unresolved access

- OPERA is the PMS; exact product/version and interface entitlement are unknown.
- SynXis is the room booking engine; API entitlement, rates, sandbox and contract details are unknown.
- SevenRooms is used for F&B; permitted API operations and commercial access are unknown.
- Ijlal believes WhatsApp may use a product called Message Box; product identity, account ownership and capabilities are unconfirmed.
- Touchpoint is the current reputation supplier; inspect actual account features, export options, costs and contractual terms when authorised.

These names do not establish available integrations. See the integration register for the required questions and fallbacks.

## 6. Working scope for the 12-week HIPO release

Build a functioning integrated pilot, not just screen mockups. The latest requested scope is broader than the original chatbot-only plan. Codex must estimate effort after examining the project and help Ijlal confirm capacity before presenting the entire scope as committed.

### Core target

- A usable guest web app and authenticated staff portal.
- Approved hotel/outlet information and editable current offers.
- A shared concierge service working on web and a separate WhatsApp test number.
- Conversation context, staff handover, bot pause and after-hours behaviour.
- Guest requests or feedback with assignment and status.
- Existing room/dining booking links and truthful booking handoff.
- Venue-specific direct public review routes, optional private feedback and clearly labelled attribution.
- Basic membership: verified contact, digital member ID/QR, one tier and one approved/test benefit.
- Staff benefit validation and atomic one-time redemption with an audit trail.
- Logs, access controls, test evidence, cost tracking and a management demonstration.

### Conditional target

- One useful live integration, preferably SynXis shopping if access arrives; otherwise a justified SevenRooms operation or another authorised connector.
- Arabic and Russian conversation testing with fluent reviewers. English is the baseline; other languages require review of meaning, amounts, dates and conditions.
- Authorised Google review ingestion or reply publishing if feasible and useful within capacity.

### Later stages

Full review-channel parity and Touchpoint retirement; main-number deployment; transactional booking/payment; deep PMS access; automatic POS spend-linked points and tiers; broad personalisation/CRM journeys; proactive campaigns; wallet passes; voice workflows; native mobile apps and wider hotel operations. Retain the roadmap without representing these as completed pilot scope.

## 7. Loyalty v1

The current direction is a simple membership-and-benefits scheme, not a complex points engine. Browsing hotel information, asking general questions and reaching public review pages should remain possible without signing up.

Collect only needed information. Verify contact details and record membership and marketing choices separately. Use one member identity across approved channels through an explicit verified linking flow; do not silently merge people based on names or unverified phone inputs.

Issue a digital ID and QR that supports controlled lookup/validation. Authorised staff check an eligible benefit and redeem it once. Include validity dates, venue applicability, use limits, audit history and explicit reversal authority. Test benefits must be visibly fictional or otherwise authorised for the pilot. The model cannot invent discounts or approve exceptions.

There was a previous Media One loyalty programme and exported member data, according to earlier context. Its actual file, terms, consent and eligibility are not available in this handoff. Do not import it or promise old benefits without authorised source review.

Spend-linked rewards depend on trustworthy transaction data and reconciliation. No reliable POS feed has been established. Never award benefits in exchange for public reviews or review sentiment.

## 8. Strengthen the review experience: still a product hypothesis

Ijlal repeatedly rejected merely adding better dashboards or retaining an unchanged scan-a-card journey as the principal differentiation. The desired advantage is a context-aware guest experience connected to hotel operations and guest relationships.

Candidate directions include service-triggered feedback invitations, optional conversational feedback, staff-owned recovery workflows, consented guest recognition and follow-up across hotel/F&B touchpoints. These need discovery and comparative testing. They are ideas, not approved specifications or evidence of greater conversion.

Keep a simple direct public review route. Do not require a lengthy account flow or AI conversation to leave a review, route only happy guests publicly, manufacture review content, or infer that an NFC tap identifies a later public reviewer. Distinguish card/staff attribution of a visit or click from verified attribution of a public review.

The full review-capture differentiator remains unresolved. Codex should surface that gap rather than quietly implement the supplier's core journey and describe it as fundamentally better.

## 9. Recommended architecture direction

Codex is the development tool. The guest-facing model API, hosting, database and messaging provider are separate runtime services and costs. Do not put a developer Codex session in the live guest-response path.

The proposed starting direction is a TypeScript web application, a hotel-controlled GitHub repository and an independently controlled Supabase project for Postgres/authentication/storage and suitable backend functions. Inspect any existing project first and explain the actual framework/hosting choice. No accounts, spending or deployment have been approved by this brief.

Use one backend with clear modules rather than premature microservices. Keep provider connectors replaceable. Use a worker/queue only where retries or long-running work require it. Guest and staff interfaces may share a codebase while enforcing genuinely separate permissions.

Suggested core records: venues; approved content and source versions; offers with validity/conditions; guests and verified identifiers; consent; memberships; benefit entitlements and redemptions; conversations/messages/ownership; requests and status events; feedback; reviews and provenance; reply drafts/approvals/publication attempts; card entry points; integration events; audit events and usage costs. Select the minimum needed for each milestone rather than implementing every table at once.

Each action needs authorisation, structured input validation, truthful success/failure and retry handling. The model can request an action; the backend determines eligibility and executes it. Display Dubai dates/times and preserve complete room occupancy/rate/fee/cancellation information when live shopping is introduced.

## 10. Operating principles and success evidence

Guest content must have an owner, source/version, venue, review date and relevant validity period. Expired or conflicting information triggers clarification or assistance. Staff must be able to update offers without changing code. Website and WhatsApp should use the same approved facts.

Use fictional data first. Real guest information, production writes and live reputation publishing require appropriate access and approval. Provide a staffed handover path before invited operational testing. Keep credentials server-side and access controls enforced beyond the interface.

Measure answer accuracy, critical factual errors, successful handovers, duplicate-action prevention, request completion, membership/redemption correctness, user/staff feedback and real running costs. Count confirmed bookings only from reliable confirmations; a booking-link click is not revenue. Do not invent ROI, public-review uplift or annual savings.

The HIPO presentation should demonstrate coherent guest/staff journeys, what is truly connected, actual results, costs, limitations and the next-stage request. Complete Touchpoint retirement needs its own function-by-function acceptance, migration, support and contractual decision.
