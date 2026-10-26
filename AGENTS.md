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

- Before UI changes read root `DESIGN.md`, `BRAND_REFERENCE_README.md` and `CODEX_NEXT_TASK.md`. `docs/DESIGN_SYSTEM.md` points to the current canonical system. Use the supplied V1.02 manual provisionally; newer approved guidance takes precedence. Use the provided logo/photograph unchanged with documented clearance and natural aspect ratio. Regular Chartwell Bars and Geomanist webfonts are now supplied under `design-handoff/assets/fonts/`; read `design-handoff/FONT_NOTES.md` for actual names, weight 400 and licence limits. They are installed with next/font/local at weight 400 and verified in the rendered guest app. Do not invent weights/assets or infer public licence scope.
- Guest primary navigation is Home, Explore and Concierge. My Stay and Profile remain utility routes; do not restore empty tabs just to fill the bar. Keep staff access separate. Keep one discreet private-preview indicator, meaningful unavailable states and explicit labels in protected fictional test views. Test viewport/keyboard accessibility without claiming simulated layouts prove physical-device behaviour.

- The full 27 October frontend redesign instruction supersedes the older three-Home-concept selection task in `design-handoff/CODEX_START_HERE.md`. The implementation is one integrated direction on `design/media-one-app-redesign`; source assets and the installed project-local Taste Skill/lockfile remain in Git. Explicit owner/Media One requirements take precedence over skill defaults. Read `docs/FRONTEND_PRIVATE_REVIEW.md` for current preview and verification. Fictional M1 offers are visible only in the authorised `/staff/review` presentation, while their original backend/testing permissions remain unchanged. Normal guest presentation filters fictional knowledge; no factual approval is inferred from a visual design.

## Concierge language and service behaviour

- Before changing concierge instructions, generation or guest response copy, read `CONCIERGE_VOICE.md`. It is the canonical working voice specification; explicit owner preferences are distinct from example wording awaiting review.
- Read `docs/CONCIERGE_SERVICE_BEHAVIOUR.md` for proactive escalation, concrete contact routes and gradual guest data collection. Optional preferred names must not block assistance; contact details need an implemented purpose. A service contact is not marketing opt in or verified identity.
- Use `docs/CONCIERGE_VOICE_REVIEW.md` to assess whole conversations and `docs/CONCIERGE_VOICE_IMPLEMENTATION.md` for the implementation handoff. Do not insert these documents or example replies into factual hotel retrieval or treat them as production facts.
- Preserve the confirmed no dash punctuation rule in ordinary guest prose while keeping exact factual URLs, names and identifiers intact. Keep a concise versioned runtime instruction derived from the guide rather than sending the entire guide with every question.
- Current M2A information only behaviour is not the final service design. Future handover and contact capture need real capability checks, backend submission evidence, staff ownership and bot pause/resume. Never claim those actions exist because the guide describes them.

## Product architecture

- Use one shared backend for web, WhatsApp and future native clients. Reuse content, identity, permissions, loyalty and action rules. Channel-specific presentation can differ.
- Prefer a simple modular application over premature microservices. Codex is the development tool; the deployed guest-facing model, hosting and WhatsApp connection are separate services.
- M1 uses local Supabase Postgres/Auth for persistent fictional offers and authenticated staff access. Read `docs/M1_PRIVATE_REVIEW.md` and the progress record before setup. Runtime uses unprivileged key plus verified user session and venue-scoped RLS; never give the app a service/secret key. Local provisioning and tests refuse remote targets. Preserve `.env.local`, ignored credentials and database volumes; never print or commit their values or run a blind database reset. Other integrations remain proposed and unverified.
- M2A adds managed knowledge and a server-side free-text model integration. Read `docs/M2A_PRIVATE_REVIEW.md`; do not assume a configured model is live-verified. Import only `media-one-context/provisional-knowledge/prototype-candidates.json` (82 candidates), never the full research/conflict/held files into guest retrieval. Preserve private source originals, venue scope, review expiry, version/replacement links and staff edits. Production approval remains absent.
- The owner authorised one USD 5 total model trial across environments. Keep credentials server-only and private. Never reset/refund/increase the persistent reservation ledger, auto-switch models or enable calls without secure key/rate setup. Further budget requires owner approval. Automated tests must keep paid calls disabled; report fixture tests separately from live calls.
- Keep provider calls behind explicit server-side interfaces. Label test fixtures explicitly. Missing live model access must produce an honest disconnected/error state; do not silently substitute scripted replies. Never invent API endpoints, credentials, contracts, real-time availability or successful actions.

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
