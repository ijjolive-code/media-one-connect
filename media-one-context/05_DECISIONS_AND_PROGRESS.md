# Decisions, unknowns and progress

Initial handoff: 25 October 2026. This file describes conversation decisions, not an audit of the new Codex window. Inspect the actual project and preserve any work already done.

## Established direction

| Item | State |
| --- | --- |
| Business goal | Hotel-owned guest/staff platform; eventual complete Touchpoint replacement with substantial added value |
| Development route | Try Codex directly; Lovable is optional, not a dependency; Claude Code is an alternative rather than a required second subscription |
| Channel strategy | WhatsApp first conversationally, plus a guest web app and staff backend using shared services |
| Main hotel WhatsApp | Unavailable for this project until presentation and subsequent approval |
| First app format | Proposed responsive web app/PWA; native clients later if justified |
| Membership | Include simple membership/benefits in proposed pilot; detailed rules require approval and capacity validation |
| Core data/backend | Supabase and GitHub proposed; actual accounts, framework and hosting not yet verified |
| Existing hotel systems | OPERA, SynXis, SevenRooms; possible Message Box is unconfirmed |
| Review differentiation | Stronger capture/experience integration required; precise differentiator still unvalidated |
| Delivery | 12-week HIPO pilot; exact calendar, protected hours and expanded-scope estimate unconfirmed |

## Questions to resolve in order

1. What already exists in the project and which computer/environment is being used?
2. What are the actual HIPO presentation date and protected weekly hours?
3. Which sponsor, pilot venue, staff owner and technical reviewer can participate?
4. Which test WhatsApp route is available, and what is Message Box exactly?
5. What approved content, brand assets, benefit rules and booking URLs can be used?
6. Which hotel/review integrations have authorised access and test environments?
7. What budget and account ownership arrangements apply to the prototype and later operation?

Questions 2-7 need not block repo inspection, architecture or fictional-data foundations. Ask focused questions when their answers affect the next step.

## Implementation state at handoff

- Codex has been opened by Ijlal.
- Repository contents, app setup, credentials and integrations: NOT INSPECTED here.
- Functionality and tests: NOT VERIFIED here.
- Production publication, main-number connection and Touchpoint retirement: NOT AUTHORISED by this handoff.
- First task: read context, inspect existing work, preserve applicable instructions, recommend architecture and produce an executable milestone plan.

## Record changes below

Use date, decision, reason, owner, scope impact and evidence. Record status as planned / in progress / implemented-unverified / verified / blocked as appropriate. Include actual build/test evidence before calling a feature complete. If a separate tracker is adopted, choose it as the authoritative task-status record and link it here.

| Date | Decision/change | Reason and scope impact | Evidence/owner |
| --- | --- | --- | --- |
| 25 Oct 2026 | Context handoff prepared | Incorporates guest app, basic loyalty and direct Codex development after earlier narrower plan | Planning conversation; Ijlal to review |

No implementation progress has been inferred from the existence of these documents.

## Repository assessment and planning task — 25 October 2026

This section is the authoritative current task-status record. The earlier sections preserve the original handoff state. Architecture and execution detail: [06_ARCHITECTURE_AND_IMPLEMENTATION_PLAN.md](06_ARCHITECTURE_AND_IMPLEMENTATION_PLAN.md).

| Item | Current state | Evidence / next action |
| --- | --- | --- |
| Repository inspection | Verified | Baseline `d8a589db9c0b59092c7f009bcf27e1089b722041`; eight tracked Markdown files, clean starting checkout; no app, dependencies, schema, CI or tests. All seven context files read starting with 00_START_HERE.md. |
| Persistent working instructions | Implemented | Root `AGENTS.md` adapted from the supplied template; original handoff preserved. Applies to future repository work. |
| Architecture and delivery plan | Recorded; recommendation | Document 06 recommends one Next.js/TypeScript app, shared server modules and Supabase data/auth. Nothing installed and no external account assumed. |
| Tool availability | Verified | Node 24.19.0 and npm 11.9.0 rechecked during this task. Earlier onboarding verified Python, Git integrity and GitHub reads; those are environment checks, not product acceptance results. |
| Official documentation review | Verified with access limitation | Official Next.js installation, Supabase server-side auth and RLS sources retrieved through raw.githubusercontent.com. Direct docs sites returned proxy 403; no TLS or trust checks disabled. Recheck stable versions at implementation. |
| M0 runnable foundation | Planned | Next implementation task: minimal fictional-data web app, pinned dependencies, documented startup and actual build/browser checks. |
| M1–M6 | Planned; not implemented | Acceptance gates and estimates in document 06. No product features, live connectors or deployed app exist. |
| A01–A32 | NOT RUN | No app/test runner exists. Document validation must not be reported as product testing. |
| Capacity/calendar | Confirmed owner input; feasibility provisional | Ijlal confirmed 5 January 2027 and at least 14 hours/week. Ten full weeks from the assumed 26 October start give 140 owner hours at that minimum, followed by 4 January rehearsal. Engineering/review effort remains a separate estimate. |
| Pilot venue | Confirmed: Media One Hotel | Selected by Ijlal. Start with clearly labelled fictional hotel data until actual content and benefit terms are approved. |
| Production actions | Not performed / not authorised by this task | No deployment, main-number use, supplier contact, real guest data or review publishing. |

Decisions recorded for continuation:

- D01 — Preserve all original context; add root guidance and a separate inspected plan. This task establishes context, not product functionality.
- D02 — Recommend a single shared application/backend; do not build separate web and WhatsApp bots. Use replaceable provider adapters and database-enforced permissions.
- D03 — Begin with fictional data and M0, then incrementally add persistence/auth and complete workflows. Do not request speculative credentials or treat simulations as live integrations.
- D04 — Keep the expanded pilot as a target pending delivery evidence and access; owner availability is confirmed at at least 14 hours/week. Reduce conditional work first and discuss any core-scope change explicitly.
- D05 — Keep this document as the single current implementation-status record. No Excel tracker is present. A future supplied tracker must be reconciled before adopting it.

Next task: implement M0 as specified in document 06 when implementation is requested. No unanswered planning preference prevents that local foundation. External accounts and access become prerequisites only for the relevant live capabilities.

Planning-task verification: `git diff --check` passed; relative Markdown links in the changed/new documents resolve; unchanged original context files were compared byte-for-byte with HEAD. README and this record were extended, not replaced. New files are root AGENTS.md and document 06. No application tests were executed because no implementation exists. Changes are local and uncommitted.


### Confirmed planning inputs — 25 October 2026

- D06 — Ijlal confirmed the presentation date as **5 January 2027**, availability as **at least 14 hours/week**, and the first pilot as **Media One Hotel**. Source: direct replies in this task. These supersede the original unconfirmed calendar, eight-hour assumption and open venue question.
- D07 — Plan ten full weeks from an assumed 26 October start, followed by 4 January rehearsal. Aim for core feature completion by 20 December; reserve 21 December–4 January for testing, fixes and presentation preparation. No core scope is removed. Conditional integrations/languages are deferred by default pending core progress and access.
- Document 06 now contains the governing dated schedule; document 02 retains the historical 12-week allocation. The 140-hour minimum owner budget includes learning, content, decisions and testing; it is not interchangeable with the 136–230-hour engineering/review estimate. Re-estimate after M0/M1 by 15 November.
- Sponsor, staff owner, technical reviewer, approved content, benefit terms and test-number access remain open. Do not ask the answered date, capacity or venue questions again. Next task remains the local M0 foundation; product acceptance tests remain NOT RUN.
