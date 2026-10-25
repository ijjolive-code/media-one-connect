# Architecture and implementation plan

Prepared 25 October 2026 for Ijlal. This is a recommendation and execution plan, not an implemented application or a commitment to the full scope. Read alongside the original brief. Current task status lives in [05_DECISIONS_AND_PROGRESS.md](05_DECISIONS_AND_PROGRESS.md).

## Inspection and reconciliation

The inspected baseline is commit `d8a589db9c0b59092c7f009bcf27e1089b722041` on `main`, in `/workspace/media-one-connect`. The checkout initially contained README.md and seven context Markdown files, with no local changes. There is no application code, package manifest, lockfile, database schema, CI workflow, test runner or root AGENTS.md. Root working instructions are added by this planning task, preserving the original template and handoff.

Cloud onboarding previously verified GitHub read access and repository integrity. This task reconfirmed Node.js 24.19.0 and npm 11.9.0. That establishes available development tools, not working product features. No production account ownership, runtime model access, Supabase project, hosting or hotel integration has been verified. No Word plan, Excel tracker, supplier email, brand pack or approved venue data is present.

Use the expanded guest-platform brief as the product direction. The older chatbot plan and suggested dates/hours are historical assumptions. GitHub is an actual accessible checkout; Supabase and the framework remain proposed technology choices. The original acceptance scenarios are requirements, all still NOT RUN.

## Vision and the pilot boundary

The long-term vision is a hotel-owned platform for hotel guests and local F&B customers, joining venue discovery, concierge, room and dining journeys, service requests, optional membership, benefits, reputation management and staff operations. Web, WhatsApp and later native clients share content, identity, permissions and business rules. Touchpoint replacement eventually needs the full parity, migration and operating evidence in document 03; a working concierge does not establish that parity.

The 12-week target is a working guest web app and authenticated staff portal, with editable approved content, shared concierge on web and a separate WhatsApp test number, reliable staff handover, requests and status, booking/review links, and simple verified membership with a single test benefit and audited redemption. Include access controls, evidence, usage costs and a rehearsed demonstration. Start with English and fictional data; the initial venue list is Media One Hotel, Garden on 8, Ciao Bella, Qwerty and Coco Lounge, subject to source validation.

Conditional scope is one useful authorised live connector, Arabic/Russian verification with fluent reviewers, and authorised review ingestion/replies. Main-number cutover, native apps, payments, deep PMS writes, spend-linked points, broad campaigns, full reputation parity and supplier retirement are later stages. Public branding remains provisional.

## Recommended architecture

Use one Next.js application with TypeScript and the App Router, hosted initially only in the development environment. Guest screens and staff screens use the same server-side modules. Use npm with a committed lockfile and a supported Node LTS runtime; the currently available Node 24 is the proposed baseline. Confirm stable package versions and pin them at implementation time. Use Supabase Postgres, Auth and Storage when a suitable development project or tested local instance is available. Keep schema migrations in Git.

Proposed layout, to create during implementation:

```text
src/app/                 guest routes, staff routes, server endpoints/webhooks
src/modules/             content, conversations, requests, membership, reputation
src/integrations/        model, WhatsApp, room/dining and review adapters
src/lib/                 auth, validation, database access, audit and configuration
supabase/migrations/     versioned schema, constraints, policies and functions
tests/                   domain, database permissions/concurrency and browser tests
```

Web requests and authenticated WhatsApp webhooks call the same application services. Those services validate inputs and caller permissions, read approved facts and persist business results. A replaceable model adapter helps phrase answers and propose structured actions. Backend rules authorise and execute actions; the model cannot approve discounts, select permissions or invent confirmations. Codex assists development and is never the live guest-response service. A deployed model API needs its own account, runtime configuration and cost controls.

Supabase manages persistent data and identity. Staff roles and venue access belong in protected database records; users cannot self-assign roles. Enforce server checks and row-level security, and test anonymous, guest, staff and cross-venue cases directly against the database. Privileged database credentials stay server-side and never replace caller authorisation. Separate membership consent from marketing consent. Add private storage only when needed, with policies and retention decisions.

Start with venues, approved content versions, offers and staff roles. Add conversations/messages, ownership, requests/status events and audit events at M2; verified guest identities, consent, memberships, entitlements and redemptions at M4. Add external review records only when an authorised connector needs them. Store timestamps in UTC and interpret guest-facing dates in Asia/Dubai. Offers need source, owner, venue, approval, validity and conditions.

Persist incoming provider event IDs with uniqueness constraints. When staff take over, persist ownership and stop automated replies; check ownership again before sending queued replies. Resume requires an explicit authorised staff action. Add a database-backed outbound queue when WhatsApp delivery/retries require it, with bounded retries, visible failures and no claim of guaranteed exactly-once network delivery. Redemption runs in one database transaction, with eligibility, expiry and one-use constraints checked atomically and an audit row committed with the result. A QR supports controlled lookup; it grants no redemption permission.

Record booking-link clicks, service requests, confirmed reservations, review-link clicks and verified published reviews as separate event types. Missing facts, failed writes and unavailable providers get truthful errors or handover. Public review routes remain open without membership or sentiment screening. Use deterministic offer/date checks around model responses.

### Why this approach

One application reduces deployment and maintenance work and makes shared rules easier to keep consistent. It also couples releases, so maintain module boundaries and test critical journeys. Next.js supports guest/staff pages and server endpoints together; separate frontend/backend services would add coordination without a demonstrated need today. Supabase reduces custom login/database infrastructure, but policies, migrations, backup and recovery still need explicit engineering. Standard Postgres data and adapter interfaces reduce switching cost, but do not eliminate provider dependence.

A responsive web app avoids app-store work for the pilot. Add installability after the web journey works; do not cache sensitive staff data for offline use by default. A hosted development database is easier to operate but needs an approved account, region and network access. Local Supabase can avoid a hosted account during development but adds Docker and resource requirements; verify those before selecting that route. Hosting selection is deferred until deployment is requested and ownership, region, budget and webhook needs are known. Do not create paid accounts now.

### Documentation and version checks

Official sources checked on 25 October 2026: the [Next.js installation source](https://github.com/vercel/next.js/blob/canary/docs/01-app/01-getting-started/01-installation.mdx) lists Node >=20.9 and TypeScript >=5.1, and directs linting to the ESLint CLI; the available Node clears that minimum. The [Supabase RLS source](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/database/postgres/row-level-security.mdx) confirms database policies and that privileged secret/service-role access bypasses RLS and must stay server-side. These moving branches inform the recommendation, not a pinned release compatibility claim. Direct documentation-site requests were blocked by the network proxy; official source files were retrieved instead. Recheck stable framework/auth integration instructions before installing; no scaffold or dependency installation was performed here.

The [official Supabase server-side auth source](https://github.com/supabase/supabase/blob/master/apps/docs/content/guides/auth/server-side.mdx) was also retrieved. It recommends cookie-based server-side sessions and identifies `@supabase/ssr` as beta with possible breaking API changes. Validate the selected stable application/auth combination before pinning it; do not copy an unverified older integration recipe.

## What can work now and what needs access

| Area | Work possible without external access | Requirement before live behaviour |
| --- | --- | --- |
| Web foundation | Local app, fictional venue pages, build and browser checks | Approved brand/content before presenting hotel facts as current |
| Data and staff access | Schema/policy design and role-test fixtures | Tested local Supabase or controlled development project; secure configuration; region/retention choice |
| Concierge | Deterministic fictional answers and adapter tests, visibly simulated | Approved content, chosen model API, account/budget and successful runtime call |
| WhatsApp | Shared handler, signed-event fixtures, replay/handover tests | Separate test number, exact provider, send/receive access, webhook verification and reachable HTTPS endpoint |
| Membership | Fictional entitlements, local test identities, atomic-redemption tests with database | Contact verification delivery, approved/test benefit rules and staff owner; real member use separately authorised |
| Room/dining links | Link UI and click tracking with labelled fixtures | Approved destination URLs; confirmed bookings require reliable provider confirmation |
| SynXis / SevenRooms / OPERA | Explicit adapter interfaces and fictional fixtures | Product/version, permitted operations, sandbox/entitlement, credentials, identifiers and actual response verification; OPERA deferred |
| Reviews | Direct-link flow, private-feedback requests and fixture reports | Approved review URLs; API ownership/entitlement for Google, Tripadvisor and Booking.com ingestion or publishing separately |
| Touchpoint | Parity checklist and comparative test design | Authorised account evidence, exports, contracts, costs and transition approvals; no supplier contact now |
| Invited pilot | Fictional demonstration and runbook drafts | Sponsor, staff coverage, technical review, authorised data, hosting/budget, backup/restore and invitation authority |

Message Box identity remains unconfirmed; no provider endpoint or contract is assumed. Keep live and simulated modes visibly distinct and never silently fall back to fake availability. Required destinations and credential names should be derived from the selected providers, checked against existing bindings and entered through secure environment settings. No secret values belong in the repository or chat.

## Execution checklist and acceptance gates

### Confirmed deadline and revised calendar

Ijlal confirmed on 25 October 2026: presentation **5 January 2027**, availability **at least 14 hours/week**, first pilot **Media One Hotel**. Use Asia/Dubai for dates; presentation time is unspecified. The original 12-week scope ambition exceeds the confirmed remaining calendar.

Assuming a 26 October start, there are ten full weeks through 3 January, then 4 January for rehearsal. Budget at the stated minimum: 140 owner hours over those ten weeks. Owner time includes learning, content preparation, decisions and testing; it is separate from engineering/review estimates and other staff contributions. Additional hours and uninterrupted holiday availability are not assumed.

| Dates | Delivery target | Evidence/checkpoint |
| --- | --- | --- |
| 26 October–1 November | M0; begin database/model/test-number access checklist | Runnable fictional hotel slice, build/browser evidence; identify staff owner and reviewer |
| 2–15 November | M1 content, persistence and roles; review-journey discovery | Authorised offer edit, denied guest/cross-venue writes; re-estimate delivery after M0/M1 |
| 16–29 November | M2 concierge, requests and handover; M3 test WhatsApp | Grounded answers, persistent request, takeover/resume and actual test message/reply; expose access blockers |
| 30 November–13 December | M4 membership and one test benefit | Contact verification, permissions and one atomic redemption under concurrency |
| 14–20 December | M5 review/booking links; complete core integration | Ungated review routes, truthful attribution and complete demo journey; freeze core feature scope |
| 21 December–3 January | M6 regression, authorised invited trials, recovery checks, fixes and presentation | Actual results, costs, gaps and no unresolved critical defects for release |
| 4 January | Final rehearsal and backup demonstration | Rehearse live/simulated/blocked status; avoid new features |
| 5 January 2027 | HIPO presentation | Demonstrate verified journeys and state remaining limitations |

This dated schedule supersedes document 02's original allocation. No core capability is dropped. Conditional connectors, extra languages and reputation automation are deferred by default; add them only with demonstrated capacity, access and core progress. Re-estimate by 15 November, surface threatened core milestones promptly and protect the final testing/rehearsal period. The estimate remains provisional; confirmed owner time alone does not establish that the expanded pilot fits.

Media One Hotel is the first end-to-end pilot. Keep venue-aware records for the wider outlet roadmap without expanding the first pilot to every outlet. Current hotel facts, branding, guest data and real benefit terms still need the approvals in the brief; venue selection does not supply them.

Estimates below are provisional focused engineering/review hours using AI assistance, including slice-level testing. They are planning judgements without an existing codebase velocity baseline; they exclude provider waiting time and Ijlal's content/approval work. Milestones may overlap only where dependencies permit. Current completion status is recorded only in document 05.

| Gate | Target window | Estimate | Dependencies and demonstrable acceptance |
| --- | --- | --- | --- |
| M0: runnable foundation | Week 1 | 8–16 h | Next task. Pin toolchain, create minimal web app with fictional data and reproducible commands. Build, type check, lint and actual browser navigation pass; Ijlal can observe a small change. No simulated login presented as secure staff access. |
| M1: content and roles | Weeks 2–3 | 18–30 h | Tested database/auth route and schema. Authorised staff change one approved offer; guest view and subsequent lookup reflect it. Anonymous/cross-venue writes fail. Cover A01, A04–05, A15 and relevant A17 cases. |
| M2: concierge, requests and handover | Weeks 4–5 | 24–40 h | M1 and model adapter; runtime model access needed for live AI evidence. Grounded answers handle missing facts, prices and Dubai dates. One persistent request reaches a staff queue; takeover blocks bot replies and explicit resume works. Cover A02–03, A07, A09–14, A17. |
| M3: WhatsApp test channel | Access work Week 1; delivery Weeks 4–5 | 14–26 h | M2 shared services, provider/test number and HTTPS webhook. Actual test message/reply, valid signature handling, replay prevention and takeover pass A08–12. Fixture-only tests do not complete this gate. |
| M4: membership and one benefit | Weeks 6–7 | 20–34 h | Database/auth, verified contact route and explicit test-benefit rules. Verify contact, show member ID, reject other-user access and modified QR attempts. Two concurrent redemption attempts yield one persisted redemption with audit. Cover A16, A18–23. |
| M5: reviews and booking handoff | Week 8 | 10–18 h | Approved URLs and attribution definitions. Direct review route works for every pilot venue regardless of feedback, no membership gate; click events are distinct from published reviews/bookings. Cover A24–27. |
| Conditional live connector/languages | Deferred by default; reassess after core gates | +16–36 h | Select one useful authorised integration and preserve provenance/failure states. A28–31 only for selected capability; A06 needs fluent reviewers. Unselected cases remain unrun/deferred, not passed. |
| M6: hardening and demonstration | Weeks 9–10 and 4 January rehearsal | 22–36 h | Core gates and staff/reviewer availability. Critical regression, failure paths, access review, backup/restore rehearsal (A32), measured costs and rehearsed demo. Aim for 10–15 invited testers/50 scenarios after authorisation; report actual sample. |

Core estimate: the seven core milestone rows total 116–200 hours. Add a provisional 20–30 hours for integration rework across milestones, giving 136–230 engineering/review hours, excluding this initial planning task and conditional features. The earlier eight Ijlal hours/week would provide 96 owner hours, not 96 automatically interchangeable engineering hours. Owner input, technical review, staff tests and provider lead time need a separate allocation. The full expanded pilot cannot yet be promised by 5 January; use the confirmed calendar above and re-estimate against actual progress. Re-estimate after M0/M1 using actual delivery evidence.

If capacity is short, defer conditional connectors, extra languages and reputation automation first. Keep web/WhatsApp shared concierge, staff ownership, reliable requests and safety checks intact. Propose any reduction to core membership or other core scope explicitly to Ijlal; do not silently drop it. If WhatsApp access remains unavailable, continue web development while marking the WhatsApp pilot gate blocked. A web demonstration alone does not fulfil the WhatsApp target.

Record each executed acceptance case with date, exact build, environment, tester, expected/actual result and evidence as document 04 specifies. Targeted unit tests cover domain rules; database tests cover actual RLS and redemption concurrency; browser tests cover guest/staff journeys; provider contract tests use fixtures plus a separately identified real test. Release requires no unresolved critical defects and human review of the answer set. The proposed 90% accuracy target and 50-scenario sample are not measured results or approved guarantees.

Review differentiation discovery starts during M0: compare the existing direct review route with a service-linked feedback/recovery journey using fictional scenarios and invited feedback when authorised. Test guest effort and usefulness while keeping the same public review opportunity. Record whether the idea helps; do not claim an uplift in advance.

## Open decisions and next task

Presentation date, capacity and pilot venue are now confirmed: 5 January 2027, at least 14 hours/week and Media One Hotel. The dated schedule above supersedes the historical 26 October–15 January calendar. Keep using clearly labelled fictional hotel data until approved material is available. These answered questions must not be repeated.

Before live pilot preparation, identify sponsor, staff/content owner, technical reviewer, account owner, spending limit and authorised test-number route. Before membership implementation, settle verification channel, one benefit's terms, reversals and retention. Before external connectors, confirm entitlements and scope from document 03. Before deployment, select hosting/database region and test recovery. Resolve the review differentiation hypothesis through discovery rather than promising a dashboard as the differentiator.

**Next implementation task:** create M0 only: a pinned Next.js/TypeScript foundation, fictional venue navigation, clear demo labelling, minimal shared service interfaces, reproducible local commands and meaningful build/browser evidence. Begin an access checklist for a separate WhatsApp test route without contacting providers or creating accounts. Reinspect current official stable setup instructions before installing. Record actual checks and revise the effort estimate after the slice. Do not attempt all modules at once.

This task ends with the plan and root instructions. It creates no feature, connects no production service, and changes no original product requirements.
