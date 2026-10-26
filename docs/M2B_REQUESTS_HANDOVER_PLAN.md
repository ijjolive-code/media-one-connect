# M2B requests, proactive handover and purposeful contact

26 October 2026. **Proposed implementation plan, not deployed capability.** Derived from [service behaviour v0.1](CONCIERGE_SERVICE_BEHAVIOUR.md), [voice v0.1](../CONCIERGE_VOICE.md) and scenarios S01–S14. The current prototype answers questions only. This plan creates no queue, contact profile, team notification, callback or handover.

## First complete slice

Implement one fictional Media One Hotel housekeeping enquiry, from guest submission to a visible authorised staff queue, ownership, status and guest status reload. Then add human takeover on that same thread. Keep department notifications outside the first slice; a committed database queue entry is evidence of submission, not evidence that a team has been notified or read it. Use fictional names/room references only during private review.

Use the existing modular Next.js application and shared Supabase backend. Web and a future authorised WhatsApp adapter must use the same capability, validation, request and ownership services. No hotel system, live booking, main number, marketing or loyalty integration belongs to this slice.

## Capability registry before promises

Add staff-controlled, versioned venue/journey configuration. Require an authorised owner to review each operational route before enabling it. A missing or unhealthy capability stays unavailable.

| Configuration | Required meaning |
| --- | --- |
| Venue, intent, owning team, escalation team | Exact scope and authorised assignment targets |
| Allowed capabilities | Answer, link, submit, status or human conversation, enabled individually |
| Contact route | Exact destination, route type, label, source, review deadline and reviewer; a general number remains labelled general |
| Availability | Confirmed hours/timezone, current tool health, actual staff coverage and after-hours fallback |
| Required fields | Server-validated per journey, with purpose and verification requirements |
| Status promises | Wording supported by real events, never an invented response time |
| Failure/urgent routing | Verified fallback; emergency procedure reviewed separately by hotel operations |

The current 82 provisional knowledge records are information, not automatically a verified operational registry. Do not promote a phone number or booking URL into an enabled route merely by extracting it from model prose. Quarantined links remain quarantined. If only a reviewed general route is available, show its exact call/link action and say which team to request. An external booking link collects its own booking information; do not collect an extra email/phone before redirecting.

## Data and access design

All schema below is proposed. Apply future additive migrations; preserve the existing offers, knowledge, Auth permissions, credentials, history and trial ledger.

| Record | Minimum fields and restrictions |
| --- | --- |
| Conversation | Venue/channel, guest session ownership, bot/human mode, revision, active staff owner and transition timestamps |
| Request | Opaque ID/reference, venue/journey, validated details, state, idempotency key, originating conversation, creation/update timestamps and revision |
| Assignment | Team, staff owner, accepted time and authorised reassignment history |
| Events | Immutable actor/type/time/revision, state transition and minimal factual summary; no credential or complete contact dumps |
| Service contact | Value, specific purpose, guest-supplied/channel source, confirmation time, correction history and verification status; visible only to assigned authorised staff |
| Preferred name | Optional self-reported personalisation, distinct from a legal/booking identity |
| Route configuration | Versioned operational capability/contact data and reviewed availability/fallback |

Guest possession of a request UUID alone must not permit reading/updating it. Bind web requests to a server-issued opaque session credential in an HttpOnly cookie; store its hash, scope guest reads narrowly and rate-limit submissions. Staff reads/updates require current venue/team authorisation independently in the database. No anonymous raw table writes, staff self-assigned roles, model-authorised actions or cross-venue access. Use explicit server/database operations for transitions and compare the loaded revision. A typed room number never proves stay ownership or permits access to private stay/payment/booking data.

Model output may propose an intent or field, but the server validates the enabled journey, every field, transmission scope and authority. The model cannot choose arbitrary recipients, database tables or tool endpoints. Operational actions require a separate typed interface from answer generation. A generated summary must remain factual and include only necessary guest-supplied details and verified source/tool results; staff can inspect the original relevant exchange where authorised.

## Submission, ownership and handover

| State | Evidence and guest promise |
| --- | --- |
| Offered | An enabled route was presented; nothing submitted |
| Details needed | Only required fields for the enabled journey are missing |
| Submitting | Transaction in progress; no success claim |
| Queued | Server committed one request/event; report its reference and queued status |
| Assigned | Authorised team/staff accepted ownership in a recorded transition |
| Human active | Staff takeover committed; automatic concierge replies are paused |
| Resolved/closed | Authorised staff recorded an outcome; no invented resolution |
| Failed/unavailable | No successful submission evidence; retain entered non-sensitive details where appropriate and show the verified fallback |

Use one transactional idempotency key per intended submission, scoped to session/venue/journey. Repeated clicks and replayed events must return the existing result, not create duplicate requests. A guest correction is a versioned update, not a second ticket. Recheck authority and expected state during assignment and takeover. If later notification delivery is added, use a durable outbox and delivery state separate from request submission.

The assistant can proactively offer the available route for an explicit human request, a complaint requiring intervention/authority, blocked availability or system access, material uncertainty, repeated misunderstanding or tool failure. The proposed two-unsuccessful-attempt threshold needs owner/operations review. Explicit human requests and sensitive/urgent issues do not wait for that count. Existing explicit authorisation to submit should not trigger repetitive permission questions; confirm unresolved material fields or transmission scope only.

Human active mode must be checked **before model usage reservation and again before delivering a delayed model reply**. Takeover and reply delivery must use consistent conversation revisions/transactions so an in-flight response cannot appear after takeover. Do not auto-resume when a page reloads or a timeout fires. Proposed resume: an authorised owner explicitly selects Resume concierge, the transition is audited and the guest is told who is responding. A queued request alone is not human takeover. Closed/resolved requests do not silently resume a separate human conversation.

## Purposeful collection

- Help first. An optional preferred name can be invited once at a relaxed moment; ignoring it never blocks the task. A correction replaces the self-reported name without establishing identity. Skip optional collection for complaints or urgency.
- The first in-app enquiry normally needs no phone/email if its session-bound status/thread can handle the response. Collect a room reference only where the reviewed journey needs it, explaining the purpose and applying any required guest verification before acting.
- Enable a callback journey only once a real team can receive it. Then request **one** useful contact channel, explain that it is for that enquiry, validate format, allow correction and record confirmation. Format checks do not prove ownership.
- A future authorised WhatsApp sender number may already supply a channel route; do not request it again unless an alternative/confirmation is needed. Never merge identities because names match. Cross-channel linking requires its own verified process.
- Service contact, preferred name, verified identity, membership and marketing permission remain separate. No automatic marketing enrolment or retention period is inferred. Contact values and sensitive details should not routinely enter model prompts, analytics or debug logs.
- Do not collect passwords, one-time codes or payment card/security data. Use an approved secure authentication/payment route where a later authorised workflow requires it.

Before real guest use, hotel owners must agree the privacy notice, staff access, retention, correction/deletion procedure, security review and operational ownership. These are readiness decisions, not policies invented by the application.

## Delivery and gates

1. **M2B.1:** registry + one fictional request + session-bound guest status + authorised staff queue. Verify denial, idempotency, stored submission and reload/restart persistence before calling it working.
2. **M2B.2:** ownership/acknowledgement, minimal escalation summary, staff replies, human mode and explicit resume. Verify races, revocation, replay and no bot delivery during takeover.
3. **M2B.3:** proactive offer/routing and minimum field collection using reviewed capabilities. Add fictional callback/contact correction only if the callback journey itself works. Verify failure/after-hours routes without invented promises.
4. **Owner operational review:** general/department contacts, staffing/after-hours process, sensitive escalation, emergency routing, verification needs, privacy/retention and wording. These unresolved items prevent real operational use; they need not block fictional private implementation.

Acceptance cases: guest/non-staff/other-venue denials; duplicate submission and stale update races; one owner; actual queued versus assigned status; failed submission without success wording; original context available to staff; takeover pauses an in-flight model answer; explicit resume/reload behaviour; ignored/corrected name; purpose-limited contact; no duplicate WhatsApp phone request (future adapter); no marketing assumption; room reference is not identity; and missing urgent routing recorded as a readiness gap. Map evidence to S01–S14; V26 becomes applicable only when a real request state exists. These tests are **planned, not passed**.

M2A's single **USD 5 total** allowance and existing reservations remain authoritative. M2B submission/status/takeover logic must work without extra model calls. Any future summary/classification call must use the same remaining allowance, be bounded and visible, with no retries or model switches by default. Increasing funding or resetting the ledger requires Ijlal's approval.
