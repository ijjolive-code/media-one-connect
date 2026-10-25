# Media One Connect: persistent working instructions

These instructions apply throughout this repository. They were adapted from `media-one-context/AGENTS.md` on 25 October 2026 after inspecting the existing checkout; no root instructions existed. Preserve applicable instructions when updating this file.

## Read and maintain context

- Read the files under `media-one-context/`: `01_PROJECT_BRIEF.md` for product requirements, `02_BUILD_PLAN.md` for sequence, `03_INTEGRATIONS_AND_TOUCHPOINT_PARITY.md` for access dependencies, `04_ACCEPTANCE_TESTS.md` for verification, and `05_DECISIONS_AND_PROGRESS.md` for current decisions and state. Read the relevant current files before each substantive task.
- Ijlal is a non-coder. Explain what changed, what he can open and test, what passed and what remains uncertain. Give precise steps for unavoidable manual setup; do not make him interpret unexplained terminal output.
- Inspect the repository before selecting frameworks or changing code. Reuse working components. Build small complete workflows and preserve recoverable Git checkpoints.
- Make routine reversible implementation decisions and keep work moving. Ask focused questions only when missing information changes the next meaningful step. Record assumptions as assumptions.
- After a task, update implementation status, evidence, decisions and next action. Preserve a single authoritative task status record; if the Excel programme tracker is in use, cross-reference task IDs rather than maintaining conflicting completion claims.

- Read `media-one-context/06_ARCHITECTURE_AND_IMPLEMENTATION_PLAN.md` for the recommended architecture, milestone gates and next task. Use `media-one-context/05_DECISIONS_AND_PROGRESS.md` as the authoritative implementation status; planning checkboxes are not completion evidence.
- Use the existing checkout in this isolated cloud task. Do not create a Git worktree unless explicitly requested.

## Guest interface design

- Before UI changes read root `DESIGN.md`, `BRAND_REFERENCE_README.md` and `CODEX_NEXT_TASK.md`. `docs/DESIGN_SYSTEM.md` points to the current canonical system. Use the supplied V1.02 manual provisionally; newer approved guidance takes precedence. Use the provided logo/photograph unchanged with documented clearance and natural aspect ratio. Official font binaries/licences remain missing; keep the fallback explicit and do not invent assets.
- Guest navigation is Home, Explore, Concierge, My Stay and Profile. Keep staff access separate. Preserve clear demo/planned labels and test viewport/keyboard accessibility without claiming simulated layouts prove physical-device behaviour.

## Product architecture

- Use one shared backend for web, WhatsApp and future native clients. Reuse content, identity, permissions, loyalty and action rules. Channel-specific presentation can differ.
- Prefer a simple modular application over premature microservices. Codex is the development tool; the deployed guest-facing model, hosting and WhatsApp connection are separate services.
- M1 uses local Supabase Postgres/Auth for persistent fictional offers and authenticated staff access. Read `docs/M1_PRIVATE_REVIEW.md` and the progress record before setup. Runtime uses unprivileged key plus verified user session and venue-scoped RLS; never give the app a service/secret key. Local provisioning and tests refuse remote targets. Preserve `.env.local`, ignored credentials and database volumes; never print or commit their values or run a blind database reset. Other integrations remain proposed and unverified.
- Keep provider calls behind explicit server-side interfaces. Add mock adapters for unavailable services and visibly label simulated data. Never invent API endpoints, credentials, contracts, real-time availability or successful actions.

## Business correctness

- Ground answers in approved, versioned, venue-specific records. Check offer validity and preserve prices, dates and conditions across languages. Interpret guest dates in Asia/Dubai; store event timestamps consistently.
- Distinguish searches, link clicks, requests, confirmed reservations and published reviews. Do not report one as another.
- Staff takeover must pause bot responses and require an explicit resume rule. Replayed events must not produce duplicate business effects.
- Enforce staff and guest permissions on the server/database, not just in the interface. Keep credentials out of client code, commits, prompts and logs. Use fictional data until real data use is authorised.
- Loyalty redemption needs an atomic entitlement check and audit record. A public membership QR must not be an unrestricted write credential or expose private guest data.
- Keep public review routes available regardless of private feedback sentiment. No review-linked rewards, forced registration, manufactured reviews or automatic claims that a click equals a published review.

## Verification and authority

- Implement meaningful tests for permissions, concurrent redemptions, duplicate messages, handover, prices and action confirmations. Run checks appropriate to each change. Record actual results; never mark unexecuted tests passed.
- Distinguish functional prototype, live-connected feature and production-ready operation. The 12-week goal is a working demonstration and controlled invited testing.
- The main hotel WhatsApp number, public launch, production data and system writes, real rewards, review publishing, supplier messaging and Touchpoint retirement require the relevant explicit authorisation. Existing authorisation persists; do not ask repeatedly for approved actions.
- Continue independent development with safe fictional data when external access is blocked. Document the blocker and fallback.
- Do not promise supplier savings, business uplift, security or full replacement without measured evidence and appropriate review.
