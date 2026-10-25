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
| M0 runnable foundation | Implemented; cloud checks passed | Current branded source `abdd19c66b9f044df00e6b1dab0164599a8785fe`, branch `design/brand-reference-pass`. Original M0 and app-first evidence are historical below; real logo/photo are now supplied and used provisionally. Backend scope remains M0 demonstration only. |
| M1–M6 | Planned; not implemented | Acceptance gates and estimates in document 06. M0 is implemented; no M1–M6 backend capabilities or live connectors are established. |
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

Next task: review the branded home/concierge on branch `design/brand-reference-pass` through the updated private preview guide; verify actual-phone keyboard behaviour and seek licensed official webfonts when available. The logo, photograph and provisional manual have now been supplied; do not ask for those same assets again. Begin M1 content persistence/staff roles when requested. Establish a tested local or controlled development database/auth route and approved content ownership first. No real staff controls or guest data may be added to the open demo shell.

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


## App-first guest redesign evidence — 25 October 2026

Source/build reference: `6af02e54fd7718fbfd41227eb94b0d5e0a18b9e3`, branch `design/app-first-guest`. Baseline: `cdd9649` (clean checkout). Ijlal reports the original M0 application runs and requested this guest-interface redesign. No milestone beyond M0 has been implemented by changing the UI.

| Area | Result | Evidence / limitations |
| --- | --- | --- |
| Design system first | Documented before restyling | `docs/DESIGN_SYSTEM.md` specifies source precedence, palette/tokens, temporary type, touch sizes, guest structure, viewport handling and missing assets. Available brand source is the user's quoted older guide; no manual file or newer approved guide was present. An optional question about newer guidance remains unanswered; the palette is provisional. |
| Missing assets | Explicit | No approved logo, font files/licences or photography present. Removed the invented m1 mark and promotional hero illustration. Header uses labelled plain text, Profile explains temporary system typography; no official artwork is invented. |
| Guest home | Implemented | Compact welcome, prominent scripted-concierge entry, hotel guide and three planned journey links. Sample arrival/departure times remain on Hotel information, rather than repeated as home promotional content. |
| Navigation | Implemented | Home, Explore, Concierge, My Stay, Profile. Persistent phone bottom bar, desktop sidebar, labelled icons and `aria-current`; hotel page belongs under Explore. Staff utility is separate under Profile; staff shell has no guest tabs. |
| Planned areas | Navigation shells only | `/my-stay` explains bookings/requests; `/profile` explains membership. Links work but no booking/request/member record, sign-in or action is connected. |
| Concierge | M0 scripted behaviour preserved | All four original replies, reset and reload-clear behaviour retained. Added local-only text entry to demonstrate conversation/keyboard layout; exact sample questions get existing scripted answers, all others get an explicit no-AI/no-action fallback. No provider call, persistence or backend was added. |
| Keyboard/viewport handling | Implemented and simulated | Visible viewport sizing/offsets, dynamic viewport fallback, safe-area padding, internal transcript scrolling and 16px composer text. Latest reply stays visible after resize. Automated checks focus input at 390×460, 320×460 and 844×390, verify composer and all tabs fit, and navigate away while focused. This is not a native iOS/Android keyboard test. |
| Verification | Passed | `npm run lint` (zero warnings), `npm run build`, `npm run typecheck`. Final browser run: 14 passed, 0 failed/skipped, desktop/mobile Chromium against production build. Covers seven routes, active states, 44px+ navigation targets, actual home journey links, scripted/local input/reset/reload behaviour, no message POST, transcript anchoring, staff separation, 404 and keyboard skip link. |
| Contrast | Checked for core pairs | White/pink 4.85:1; charcoal/white 9.52:1; muted/canvas 5.53:1; teal/blue tint 5.70:1. Pink text on pink tint was below 4.5:1; selected tinted labels/badges now use charcoal while icons/indicators retain pink. This is not a full accessibility certification. |
| Screenshot review | Six captures saved and inspected | `docs/screenshots/app-first/README.md`: phone/desktop Home and Concierge, phone conversation start, and reduced-height focused composer. Original M0 screenshots remain historical. Screenshots are static artifacts, not preview URLs or physical-device evidence. |
| Private review | Instructions updated; launch not performed here | `docs/PRIVATE_PREVIEW.md` now targets the pushed redesign branch and covers both new and existing Codespaces, safe branch switching, rebuild/restart and Private port 3000. No public site/tunnel or paid resource created. Redesigned preview authentication, owner usability and real-phone keyboard checks remain pending. |
| Reusable startup | Draft saved | Updated `start_skill` to describe the app-first routes and current homepage readiness text. Install script/dependencies unchanged. Configuration save confirmed; owner review/save and environment publication remain separate. |

Decisions for continuation:

- D08 — Use the supplied older Media One palette provisionally. Newer approved guidance supersedes it. Do not infer or create official brand assets.
- D09 — Keep five guest destinations consistent across phone/desktop and separate staff utilities. Planned areas explain their status instead of implying operational controls.
- D10 — The composer is a local UI demonstration, not a model integration. Do not describe redesigning Concierge/My Stay/Profile as completing M1 or later backend capabilities.
- D11 — Owner review should prioritise actual phone keyboard reachability, conversation readability, compact home actions and brand-source confirmation. Keep the protected 5 January presentation plan and at least 14 owner hours/week unchanged.

Full product acceptance cases beyond M0 remain unrun. No production data, real benefit, supplier contact, main-number connection, live booking or review action was introduced. The next backend slice still requires a tested database/auth route and content ownership; design review can proceed independently through the prepared private-preview method.


## Supplied-brand mobile pass — 25 October 2026

Source/build: `abdd19c66b9f044df00e6b1dab0164599a8785fe`, branch `design/brand-reference-pass`. User reply confirmed the same colours remain the provisional direction and supplied actual reference files. Fetched origin, found uploaded pack in `origin/main` commit `00163ad`, and merged that additive asset commit into the existing app-first checkout without resetting work. The original pack is preserved unchanged, with identical root-path copies as its README requests.

| Area | Result / evidence | Limits |
| --- | --- | --- |
| Required inputs | Read full `BRAND_REFERENCE_README.md` and `CODEX_NEXT_TASK.md`; extracted and read all 20 PDF pages; rendered/visually inspected the excerpt and actual original logo/photo | Version 1.02; reported Drive modified date 1 March 2022 is not approval. No newer approval or public-use rights confirmed. |
| Canonical design record | Root `DESIGN.md` created before this restyling, with original source page numbers, Web hex values, typography roles, logo geometry/clearance, components, mobile adaptation and remaining assets | `docs/DESIGN_SYSTEM.md` now points to the canonical file to avoid conflicting systems. |
| Actual logo | Unchanged original white transparent 2424×1062 PNG, displayed proportionately on charcoal with original padding, no filters/recolouring/redraw | Visible artwork about 126px phone, 146px desktop, 101px compact; conservatively above p19's 95px example. p17 clearance preserved within source canvas. |
| Actual photograph | Supplied 1730×974 real lobby image, compact full-frame thumbnail beside hotel information. No creative edits/filters or promotional hero | Runtime uses responsive Next.js optimisation; source original bytes preserved. Photo authenticity does not validate fictional policy/details or currentness. |
| Typography | Manual p26–28 names Chartwell Bars/Geomanist, GE Modern/Shilia. Profile identifies the temporary system fallback | No actual fonts/web licences included or installed. p29 office/email fallbacks are not treated as approval for app typography. |
| Guest interaction | Existing five tabs, staff separation, four scripted replies, local-only composer, reset/reload, planned links and viewport behaviour preserved | No backend, live AI, WhatsApp, auth, bookings, requests or member capability added. |
| Checks | Production build, zero-warning lint, type check passed. Browser run **16 passed, 0 failed/skipped** across desktop/mobile Chromium, plus narrow/short viewport sweeps | Physical iOS/Android keyboards, Safari/Firefox, owner usability and brand-owner signoff remain unrun. |
| Added asset checks | Original logo/photo load and decode; rendered aspect ratios; conservative visible logo minimum; no logo CSS filter; actual optimiser response is WebP and smaller than 2,001,221-byte JPEG source; manual route returns 404 | Source PDF/notes stay outside `public/`. This is not a general security certification. |
| Preservation | SHA-256 equality verified for root copies of both notes, PDF, PNG and JPEG against original uploaded pack | No original source file modified; no fonts fabricated. |
| Screenshots | Six fresh production captures inspected in `docs/screenshots/brand-pass/`, including mobile/desktop home/concierge and reduced-height composer | Static captures; compact composer image is explicitly a viewport simulation, not a native keyboard test. Earlier screenshot sets remain historical. |
| Handoff | Source branch pushed successfully; `docs/PRIVATE_PREVIEW.md` updated for both new and existing Codespaces and Private port 3000 | No public site, tunnel, paid resource or live hotel number connection created. Branded private preview still needs owner launch/rebuild and inspection. |
| Reusable startup | `start_skill` draft updated for actual assets, root DESIGN.md, correct review branch and image-verification scope; save confirmed | Install/dependencies unchanged. Owner review/save and development-environment publication remain separate. |

D12 — The asset-gap answer is now received: logo, real lobby photo and provisional manual are supplied. Treat prior missing-logo/photo assumptions as historical. Font binaries/licences remain missing; never infer current brand approval from file presence or metadata dates.

D13 — Use manual p23 Web values, rather than its conflicting printed RGB entries. Use p16's permitted white reverse treatment with actual supplied artwork. Adapt print sizing/tracking/alignment for readable mobile controls and chat; do not recreate the media graphic device or fetch similarly named fonts as substitutes.

Remaining for brand completion: actual licensed Chartwell Bars/Geomanist webfonts with internal names/rendered samples verified; Arabic type/review if that interface is selected; a broader authorised/current photo selection; current approval/public-use confirmation. These gaps do not block this requested private, labelled development pass. No broader functional milestone is claimed complete.
