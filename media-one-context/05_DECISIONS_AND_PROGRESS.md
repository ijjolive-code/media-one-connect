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
| M0 runnable foundation | Implemented; cloud checks passed | Source commit `d8e9de71c9b2f9debb788d57fe2f9de632514efa`, branch `m0/media-one-foundation`. Five responsive routes, fictional shared content, scripted concierge and read-only staff shell. Owner preview launch remains unverified; see M0 evidence below. |
| M1–M6 | Planned; not implemented | Acceptance gates and estimates in document 06. No product features, live connectors or deployed app exist. |
| A01–A32 | M0 subset checked; full product suite NOT RUN | A01 navigation/layout subset passed Chromium desktop/mobile automation. This does not establish real-device signoff, live answers, authentication or any later integration; full acceptance cases remain unexecuted. |
| Capacity/calendar | Confirmed owner input; feasibility provisional | Ijlal confirmed 5 January 2027 and at least 14 hours/week. Ten full weeks from the assumed 26 October start give 140 owner hours at that minimum, followed by 4 January rehearsal. Engineering/review effort remains a separate estimate. |
| Pilot venue | Confirmed: Media One Hotel | Selected by Ijlal. Start with clearly labelled fictional hotel data until actual content and benefit terms are approved. |
| Production actions | Not performed / not authorised by this task | No deployment, main-number use, supplier contact, real guest data or review publishing. |

Decisions recorded for continuation:

- D01 — Preserve all original context; add root guidance and a separate inspected plan. This task establishes context, not product functionality.
- D02 — Recommend a single shared application/backend; do not build separate web and WhatsApp bots. Use replaceable provider adapters and database-enforced permissions.
- D03 — Begin with fictional data and M0, then incrementally add persistence/auth and complete workflows. Do not request speculative credentials or treat simulations as live integrations.
- D04 — Keep the expanded pilot as a target pending delivery evidence and access; owner availability is confirmed at at least 14 hours/week. Reduce conditional work first and discuss any core-scope change explicitly.
- D05 — Keep this document as the single current implementation-status record. No Excel tracker is present. A future supplied tracker must be reconciled before adopting it.

Next task: inspect M0 through the private preview guide, then begin M1 content persistence and staff roles when requested. Establish a tested local or controlled development database/auth route and approved content ownership first. No real staff controls or guest data may be added to the open demo shell.

Planning-task verification: `git diff --check` passed; relative Markdown links in the changed/new documents resolve; unchanged original context files were compared byte-for-byte with HEAD. README and this record were extended, not replaced. New files are root AGENTS.md and document 06. No application tests were executed because no implementation exists. Changes are local and uncommitted.


### Confirmed planning inputs — 25 October 2026

- D06 — Ijlal confirmed the presentation date as **5 January 2027**, availability as **at least 14 hours/week**, and the first pilot as **Media One Hotel**. Source: direct replies in this task. These supersede the original unconfirmed calendar, eight-hour assumption and open venue question.
- D07 — Plan ten full weeks from an assumed 26 October start, followed by 4 January rehearsal. Aim for core feature completion by 20 December; reserve 21 December–4 January for testing, fixes and presentation preparation. No core scope is removed. Conditional integrations/languages are deferred by default pending core progress and access.
- Document 06 now contains the governing dated schedule; document 02 retains the historical 12-week allocation. The 140-hour minimum owner budget includes learning, content, decisions and testing; it is not interchangeable with the 136–230-hour engineering/review estimate. Re-estimate after M0/M1 by 15 November.
- Sponsor, staff owner, technical reviewer, approved content, benefit terms and test-number access remain open. Do not ask the answered date, capacity or venue questions again. Next task remains the local M0 foundation; product acceptance tests remain NOT RUN.


## M0 implementation evidence — 25 October 2026

Owner: Codex, at Ijlal's request to proceed with M0. Build reference: `d8e9de71c9b2f9debb788d57fe2f9de632514efa`. Planning checkpoint: `e5e5163`. All M0 functionality is fictional-data demonstration scope.

| Capability/check | Actual result | Evidence / limits |
| --- | --- | --- |
| Guest homepage and hotel information | Working | `/` and `/hotel`; fictional-policy labels, original concept illustration and shared fixture in `src/modules/content/hotel.ts` |
| Platform navigation | Working | Five routes and active states; future requests, WhatsApp, membership, booking and review modules explicitly marked planned/unavailable |
| Concierge | Working scripted demonstration only | Four prewritten question/reply examples, reset and transient page state. No free-text model, persistence, staff contact or booking action |
| Staff dashboard | Read-only shell | Explicitly unauthenticated and accessible to preview users. No private records, login, editing, live counts or operational controls |
| Dependency setup | Passed | Exact dependency pins, lockfile and `npm ci --no-fund` validated on Node 24.19.0 / npm 11.9.0; cache moved to `/tmp` to respect writable paths. TLS/integrity checks retained. ESLint 9 is pinned for Next's plugin peer compatibility. |
| Build/lint/types | Passed | `npm run build`, `npm run lint` (zero warnings) and `npm run typecheck` (`next typegen` then `tsc --noEmit`) |
| Browser checks | 10 passed; 0 failed/skipped | `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e` against production build. Five scenarios in desktop 1440×1000 and mobile 390×844 Chromium, plus layout sweeps at 320px. Verified navigation, fictional labels, scripted replies/reset/reload, staff limitations, planned modules, keyboard skip link and 404 recovery. |
| HTTP readiness | Passed | Production homepage HTTP 200, expected rendered content and noindex header. Test runner started/stopped its own server; a separate internal port 3101 instance was used for readiness/screenshots. |
| Visual inspection | Performed in cloud | Desktop/mobile homepage, concierge and staff screenshots inspected; missing arrow glyphs replaced with SVGs. Captures saved in `docs/screenshots/`. Physical device, Safari/Firefox and owner usability review not run. |
| GitHub handoff | Pushed | Dedicated branch `m0/media-one-foundation` created and pushed successfully. `main` was not merged or updated by this task. |
| Private preview | Prepared; not launched | `.devcontainer/devcontainer.json` and `docs/PRIVATE_PREVIEW.md` provide browser-only Codespaces steps with Private port 3000. Requires owner GitHub Codespaces access/quota and launch; account, image pull and URL authentication are not verified here. No user-accessible Codex localhost URL, public site or tunnel was created. |
| Reusable cloud configuration | Draft saved | `install_script` now runs locked install/build; `start_skill` records app startup, readiness, checks and preview limitations. Save confirmed by configuration tool; review/save then publish in environment settings is still the owner's action. No publication claimed. |
| Early access preparation | Checklist recorded | `docs/ACCESS_CHECKLIST.md`; missing owners, content, database/model and separate test-number route are explicit. No credentials requested or provider contact made. |

A01 has partial M0 evidence only; A02–A32 are not claimed passed. Full hotel facts, real AI, permissions, concurrent redemption and live-channel tests await their implementation gates. M0 owner inspection is pending; M1–M6 remain planned. No paid accounts, production deployment, main-number use, supplier contact, real guest data or public review actions occurred. Documentation/evidence changes after the source commit do not change the tested application.
