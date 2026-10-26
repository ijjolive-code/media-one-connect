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
| Architecture and delivery plan | Recorded; recommendation | Document 06 recommends one Next.js/TypeScript app, shared server modules and Supabase data/auth. Implementation follows this recommendation; local Supabase is now verified, external production accounts are not assumed. |
| Tool availability | Verified | Node 24.19.0 and npm 11.9.0 rechecked during this task. Earlier onboarding verified Python, Git integrity and GitHub reads; those are environment checks, not product acceptance results. |
| Official documentation review | Verified with access limitation | Official Next.js installation, Supabase server-side auth and RLS sources retrieved through raw.githubusercontent.com. Direct docs sites returned proxy 403; no TLS or trust checks disabled. Recheck stable versions at implementation. |
| M0 runnable foundation | Implemented; cloud checks passed | Current branded source `abdd19c66b9f044df00e6b1dab0164599a8785fe`, branch `design/brand-reference-pass`. Original M0 and app-first evidence are historical below; real logo/photo are now supplied and used provisionally. M0/brand-pass evidence is historical; M1 and M2A extensions are recorded below. |
| M1 selected workflow | Verified locally and owner-reviewed in Codespaces | Latest baseline `398d6c4` on `feature/m1-staff-offers`, including scoped sign-in origin fix. Owner confirmed staff edit → guest reload and unauthorised denial; regression checks pass under M2A. |
| M2A knowledge/answers | Implemented/offline tested; owner observed limited earlier live selection; new composed voice awaits live review | Branch `feature/m2a-knowledge-concierge`: 82 candidates, managed/versioned facts and current offers preserved. Guide 0.1/runtime voice 0.2 adds composed replies and bounded context. Secure binding present in Codex, no new paid calls; use existing Codespaces ledger for review. |
| M2B–M6 | Planned; not implemented | Requests/handover, WhatsApp, loyalty and live booking remain outside M2A. |
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

Current next action: follow docs/CONCIERGE_VOICE_REFINEMENT_REVIEW.md to pull/build/restart the existing private Codespace, preserve its working key/configuration and reservations, and run the small live composed-voice/staff-change review within its remaining USD 5 total allowance. M1 owner review passed; limited earlier live M2A selection is owner-observed. M2B has a plan only; queues, handover and purposeful contact capture remain unimplemented.

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


## Branded-branch Codespaces recovery fix — 25 October 2026

Ijlal reported recovery mode on `design/brand-reference-pass`, with `npm: command not found` after rebuilding. Inspection found this branch still used `mcr.microsoft.com/devcontainers/javascript-node:1-24-bookworm`; the earlier M0-branch fix had not reached this branch.

- Corrected the image to `mcr.microsoft.com/devcontainers/javascript-node:24-bookworm` in commit `7d875598fa8d1a7bc36a55f03eab53a82837b613`.
- Verification: official Microsoft registry manifest requests returned 404 for the old tag and 200 for the replacement, digest `sha256:16eb68aa0d17eedaaf2566b180854fe4e506478e35aadf790fb02aa089024f13`. Updated JSON parses successfully. No application source/dependencies changed; app tests were not rerun for this configuration/documentation repair.
- Updated `docs/PRIVATE_PREVIEW.md` with pull/rebuild/version/start instructions and creation-log fallback. The owner's Codespace is not accessible here, so successful image pull, container setup, npm install and private preview remain unverified.
- Next action: owner pulls this branch in the recovery terminal, runs **Codespaces: Rebuild Container**, verifies Node/npm in a new terminal and starts the private preview. If recovery recurs, inspect the creation log before further changes.


## M1 persistent offers and authenticated staff — 25 October 2026

Source/build reference: `a244a475c622d611c031cb0b8998a8dad9b88bc6`, branch `feature/m1-staff-offers`. Started from the latest remote `design/brand-reference-pass` at `3c4774e47783eb0681ef0ed7959004dc2ecf91e3`, including the corrected devcontainer and recovery notes. Owner approved the branded preview as a starting point and requested this one M1 workflow.

| Requirement / check | Actual evidence | Limits |
| --- | --- | --- |
| Existing setup checked | No Supabase bindings/project files existed; Docker daemon available. Corrected `javascript-node:24-bookworm` image retained; official Docker-in-Docker feature added for Codespaces | No hosted account or credentials assumed; owner's new Docker-enabled rebuild not accessible here. |
| Supabase chosen and run | Real local Supabase CLI 2.122.0, Postgres 17 slim, Auth/GoTrue, PostgREST and Kong. SDK 2.118.0 / SSR 0.12.7 pinned. Native Auth/Kong/Postgres health plus actual Auth/Data API readiness verified | Local development stack, not a hosted project or production deployment. |
| Staff sign-in | Real email/password Supabase Auth with privately generated test accounts. Server verifies user; cookies HttpOnly/SameSite=Lax, Secure for HTTPS Codespaces. Staff proxy applies refresh cookies and private/no-store cache headers | Public self-signup disabled; real staff onboarding and account recovery are not part of this slice. |
| Authorised editing | One existing fictional Media One Hotel offer: title, description, conditions, inclusive Dubai display dates and guest visibility. Server guard checks venue access each save | No general content CMS, offer creation/deletion or real promotion approval claimed. |
| Database enforcement | RLS and explicit grants: public in-date/published demo reads; assigned staff updates; restricted content columns; no runtime role self-assignment, cross-venue writes, author/venue spoofing or insertion/deletion | App has no service/secret key. Trusted local provisioning/tests obtain admin access in memory only. |
| Persistence and versions | Saves stored in Postgres with trigger-stamped actor/time/revision and private old/new audit snapshots. Revision comparison prevents silent stale-tab overwrite | UI reports errors truthfully; no fixture substitutes for an unavailable or failed database. |
| Guest workflow | Home and Hotel information read current persisted offers dynamically with no-store fetches. Browser workflow edited an offer, opened a separate anonymous context, reloaded and saw updated fields; staff reload also retained values | Concierge remains scripted and does not claim to read or act on the new offer. No AI scope added. |
| Permission/API suite | **21 passed, 0 failed**, no mocks. Actual anonymous/authenticated JWT requests check role metadata spoofing, self-grants, venue isolation, column restrictions, revocation, dates/drafts, actor audit and concurrent revisions | Tests deliberately use only the local fictional stack and restore original offer fields; audit/revision counters advance. |
| Restart persistence | A real Postgres container restart retained title/revision; subsequent anonymous read and Auth password reconnection verified | Persistent within current Docker volume. New-task snapshot/volume restoration, deleted Codespaces and production backup/recovery are not claimed. |
| Browser suite | **19 passed, 0 failed/skipped** in final full run: 16 branded/mobile regressions plus 3 M1 scenarios. Authorised workflow verified at 1440×1000 and 390×844, alongside 320px/short-viewport sweeps | Actual iOS/Android keyboards, Safari/Firefox and owner usability remain pending. Credential-bearing traces disabled. |
| Build/tool checks | `npm run lint` zero warnings, `npm run build`, `npm run typecheck` passed. `npm run setup:local` rerun successfully without resetting edited content | Corrected devcontainer JSON checked; owner's image/feature rebuild still needs execution. |
| Credentials | `.env.local` and `.local/review-credentials.json` ignored and mode 600; role/password values never put in chat/Git. Scan found no generated passwords/runtime key in tracked or unignored text files | Read credentials only inside private local editor. Admin keys never placed in app env/bundle. |
| UI review | Existing logo, photo, navigation and provisional brand preserved. New labelled sign-in, offer editor, saved/error/conflict states and guest offer cards. Eight current screenshots inspected under `docs/screenshots/m1/` | All offer text is fictional, not a real benefit or booking. |
| Private handoff | Source branch pushed; `docs/M1_PRIVATE_REVIEW.md` gives exact owner steps, separate manual section, test account handling, checklist and limits. `docs/PRIVATE_PREVIEW.md` points there. Only Private app port 3000 forwarded; API/DB ports ignored for auto-forward | No public site/tunnel, hosted account, live number or real guest data created. |
| Reusable cloud configuration | Install/start scripts saved in draft for Docker, locked install, local Supabase setup, build, restart/readiness and private review. Tool confirmed save | Owner review/save/publication remains separate; a fresh published task's database restoration has not been tested. |

Resolved setup diagnoses: the default registry was blocked, so the wrapper uses Supabase's official GHCR mirror. Full Postgres layers exceeded the vfs image-storage budget, so supported slim images were selected. Cloud Docker injected a proxy into BusyBox's loopback Auth health probe; a local health-URL-only wrapper now preserves native health checks and routes that probe directly, with actual Auth/Data API validation. No saved ignore-health-check flag, disabled TLS or changed checksum was used. Explicit service_role provisioning grants were needed because API auto-exposure is disabled. Email provider is enabled while global self-signup remains disabled, verified by actual requests. After database restart the suite waits for Auth reconnection before claiming readiness.

Acceptance mapping: requested M1 workflow and corresponding guest portion of A04, offer validity portion of A05, and staff/offer permission portion of A15 verified. The original A04 subsequent-concierge lookup and all broader AI/WhatsApp/member/booking cases remain outside scope/unrun. This is a completed fictional-offer development slice, not all pilot readiness or production certification.

D14 — Keep Supabase local for this independently verifiable slice; no external account setup is required now. Manual owner actions are Codespaces branch/rebuild, private test credential inspection and preview opening, all listed separately in the guide.

D15 — Assign venue editing access in a protected table, never self-editable user metadata. Public registration is disabled; trusted local setup grants only named fictional test accounts. Keep admin credentials out of application runtime.

D16 — Preserve the corrected Node image from the latest reviewed branch. Add Docker support without reverting that fix, keep API/database internal, and never reset a database as a blind setup retry. Future hosted/production use needs an explicit separately configured project/operating plan.


## Owner M1 preview and Codespaces sign-in origin fix — 25 October 2026

Owner-provided logs confirm `npm ci`, local Supabase setup and production build/start succeeded in the Docker-enabled Codespace. Sign-in then failed with `Invalid Server Actions request.`, digest `2308781827`: `x-forwarded-host` was the forwarded Codespaces host while `origin` was exactly `localhost:3000`. This is a pre-authentication origin rejection, not evidence that the supplied password is incorrect.

- Added a Codespaces-only `experimental.serverActions.allowedOrigins: ["localhost:3000"]` in `next.config.ts`, source commit `cadbd86ec517dc4c88a14cfb1c1e377eb8eb093c`. Other environments receive no extra origin allowance. No wildcard, rewritten incoming header, disabled CSRF protection, changed credential, role policy or database reset.
- Official references: [Next.js serverActions.allowedOrigins](https://nextjs.org/docs/app/api-reference/config/next-config-js/serverActions) and [GitHub Codespaces default environment variables](https://docs.github.com/en/codespaces/developing-in-a-codespace/default-environment-variables-for-your-codespace); GitHub documents `CODESPACES=true` inside a Codespace.
- Executed Node 24 imports of the actual revised TypeScript config with `CODESPACES=true`, `false` and unset. The exact origin allowance appears only for true; existing security/noindex headers and poweredByHeader setting are preserved. These configuration checks passed.
- The full application/database/browser suites were not rerun in this separate troubleshooting environment, and a forwarded Codespaces sign-in was not accessible here. The earlier M1 suites remain historical evidence; this fix is configuration-checked, owner workflow confirmation pending.
- Updated the M1 private review guide with the exact diagnosis and pull/build/restart steps. Next: owner stops only the app, pulls this branch, rebuilds the application and restarts it, reloads sign-in, and verifies sign-in/save/sign-out. No devcontainer rebuild or database setup/reset is needed for this fix.


## Owner M1 workflow review passed — 25 October 2026

Ijlal confirmed in the private Codespaces preview that he signed in as authorised test staff, edited the fictional offer and saw the updated guest content persist after reloading the page. His attached Safari screenshot shows the changed guest offer and its fictional/test labels. A second screenshot shows the signed-in unauthorised test account receiving **Access not granted**, without an editor.

- Owner-observed result: requested M1 staff-edit → persistent guest display workflow passed, and unauthorised-account UI denial passed in desktop Safari.
- The Codespaces sign-in blocker is resolved for this observed workflow after the origin configuration fix. Manual screenshots/user observation supplement, rather than rerun or replace, the previously recorded automated database/browser tests.
- This owner review does not independently establish database-restart persistence, direct API policy enforcement, all-device compatibility or general production readiness; those claims retain their separately recorded evidence/limits.
- Preserve the latest M1 branch, including `cadbd86` and subsequent documentation, as the baseline for the next task. Keep the corrected container image and scoped origin configuration when branching.
- Next proposed implementation slice: M2A managed hotel knowledge and free-text concierge using published, venue-specific facts and current offers. Check existing runtime configuration and model access; explain any required secure account/key setup and budget before billable calls. Continue labelled fictional records until approved hotel content is supplied. Test staff content changes through subsequent concierge answers, missing facts, draft/expiry filtering and factual price/condition preservation. Requests/handover follow in M2B; no live booking, WhatsApp, loyalty or full reputation milestone is claimed here.


## Provisional knowledge collection and authorised repository handoff — 26 October 2026

On 25 October, Ijlal requested existing hotel website/FAQ, Drive and public SevenRooms/listing information for temporary use until purpose-built approved content is available. On 26 October, he explicitly authorised uploading the resulting pack, including selected Drive-derived material, to `ijjolive-code/media-one-connect` for Codex use. This resolves the earlier automatic upload-review block; it does not confer hotel factual approval or public-launch authority.

- Pack: [provisional-knowledge/README.md](provisional-knowledge/README.md), on content branch `content/provisional-knowledge-2026-10-25`. Source-data commit: `844eb0c292789d1ceaaac563cbbdfd00a02b92f7`.
- Collection date remains 25 October 2026; no new crawl claimed on 26 October.
- Contents: 95 draft records (82 private-prototype candidates and 13 review-only), 31 source references, 17 unresolved source differences/gaps and 14 linked menu PDFs. Menu contents/allergens were not parsed or validated.
- Coverage: 18 official hotel pages (one yielded only a room-offers title), four public SevenRooms indexes plus four full experience descriptions, one affiliated listing and four Drive documents. No standalone public FAQ page was found in mapped navigation; FAQ material came from the internal Drive FAQ.
- Verification: JSON parses, unique record IDs and source/conflict references validated; no held records in the 82-record candidate export. Uploaded candidate/full JSON and import handoff were read back exactly. These are data-integrity checks, not hotel-fact approval or model-answer evaluation.
- Safety/operating boundaries: content only, outside `public/`; no app/runtime code, database rows, guest records, credentials, real benefits, booking actions, live availability or WhatsApp connection changed. No application tests rerun for these reference-file additions.
- Next M2A task: incorporate these reference files into the active implementation branch without losing app work, then implement the [import handoff](provisional-knowledge/CODEX_IMPORT_TASK.md). Only candidate records may enter an explicitly labelled private-prototype scope; held claims and the review register must not be embedded into guest retrieval. Preserve fictional fixtures separately, source/review dates, replacement history, venue scope and approved-current-content precedence. Do not reset the local database.


## M2A managed knowledge and free-text concierge — 26 October 2026

Owner: Codex, at Ijlal's explicit request. Baseline: latest `feature/m1-staff-offers` at `398d6c4`; implementation branch `feature/m2a-knowledge-concierge`. Ijlal confirmed M1 sign-in, persistent offer guest reload and unauthorised denial before authorising M2A. The corrected devcontainer and scoped Codespaces origin fix are unchanged. Existing local database volumes, credentials and offer fields were preserved; no database reset was used.

### Authority and content reconciliation

- Fetched both requested origin branches and incorporated only `media-one-context/provisional-knowledge/` from content commit `844eb0c292789d1ceaaac563cbbdfd00a02b92f7`. Read its README/import task. The preceding repository handoff section was appended selectively; existing M1 implementation/review notes were not overwritten.
- Explicit owner authorisation covers the selected Drive-derived material for private prototype use, not production approval. Exactly **82 candidates** and their **28 referenced source objects** are imported across six venues: hotel 43, Ciao Bella 7, Qwerty 7, garden on 8 12, Coco Lounge 10, M12go 3. Full research/13 held records/conflict register remain repository references outside `public/`, never guest retrieval/model context.
- Imported original IDs, complete source references, collection/review/validity metadata, source notes and pack metadata survive in private original snapshots. Runtime projection includes only eligible answer fields and safe source labels; conflicting internal notes and held values are omitted. The import is idempotent and does not overwrite staff edits, replacement links or budget state.
- All imported facts are explicitly provisional/private-prototype. **27** time-sensitive records require review before **1 November 2026**, **55** before **24 November 2026**, Asia/Dubai. Review deadlines are exclusive; validity dates are inclusive. Null validity does not bypass review expiry. Fictional M1 offers and M0 sample fields remain separately labelled; M0 sample policies do not enter model evidence.

### Implemented

- Staff create/edit FAQs, facilities and policies for their authorised Media One Hotel venue, including source references, provenance, publication state, review/validity dates and revision history. Database RPCs independently verify venue membership, stamp actor/revision and reject stale/null revisions. Anonymous/non-staff and cross-venue modification are denied.
- A newly published, current staff-reviewed replacement atomically suppresses its same-topic predecessor. Source originals and version/replacement history remain. If the replacement later expires/is held, the predecessor does not revive. Imported provenance cannot be relabelled as reviewed in place. Guest source browsing is separate from old fictional samples.
- Free-text concierge UI and server Responses API integration, using fixed `gpt-4.1-mini-2025-04-14`. The model interprets each independent question and returns eligible evidence IDs, not invented factual prose. The app quotes current database wording exactly, preserving prices/dates/conditions and source/provisional/fictional labels. Current published/in-date M1 offers are included from the same database. Chosen evidence is checked again for eligibility/revision before returning.
- Missing key, disabled usage, exceeded quota, provider timeout/failure, unsupported output and changed knowledge produce honest failure/limitation states. No scripted reply substitutes for AI. No requests, reservations, staff messages, handover or other operational action is created.
- Branded mobile/desktop shell, private port guidance and separate staff navigation retained. Added readable staff source/date/status/history controls, guest venue/source browsing and conversation evidence/error states. Seven actual production-build screenshots saved in `docs/screenshots/m2a/`; no secrets, fake live answers or data edits used in captures.

### USD 5 total trial and connection status

- Ijlal explicitly authorised **USD 5 total**, no automatic reset/increase, with approval required before increasing it. No model key was present in runtime/file configuration; the cloud draft declares secure `CONCIERGE_OPENAI_KEY` for `api.openai.com`, but no value is bound. No billable call was made.
- Server key never enters client code. `store:false`, bounded 24,000-byte request, 600 output tokens, fixed model, 12-second timeout, no tools/retries. Enablement requires confirming current standard rates are within conservative USD 4/million input and USD 16/million output ceilings. Direct official model documentation retrieval returned proxy 403; no current rate quote or account access is claimed.
- A locked private database ledger reserves **12 cents per attempt before sending**, including failures, up to **41 attempts / USD 4.92**. At ceiling rates, the 26,000-token conservative input bound plus 600 output costs at most USD 0.1136 per attempt. Additional limits: eight/session/hour, two active leases, 60/day. Setup/import/enable/disable do not reset/refund the allowance. Disable blocks new reservations. The same total authorisation applies across environments; do not create fresh ledgers to get more budget.
- Live semantic selection, provider connectivity, actual billing and full live staff-change → concierge/replacement/offer review are **BLOCKED / NOT VERIFIED**, pending private key/account setup and rate confirmation. Local grounding/transport fixture tests are labelled explicitly and do not stand in for that gate. Account/key instructions and budget controls are in `docs/M2A_PRIVATE_REVIEW.md`.

### Executed verification

| Check | Result | What it establishes |
| --- | --- | --- |
| Repeated `npm run setup:local` | Passed | Healthy real local stack, additive migrations/import; no resets, original offers and unrelated private settings preserved |
| Lint, production build, generated routes and TypeScript | Passed | All current routes compile/typecheck; no lint warnings |
| Answer-core tests | **7 passed, zero failed/skipped** | Exact price/date/condition quoting, invalid-ID rejection, missing evidence, context/cost bound, Responses transport parsing and provider failure fixtures; **not live model calls** |
| Knowledge/Auth/Data API suite | **25 passed** | 82 originals only, repeat import stability, M1 edits preserved, venue/prototype/status/date filtering, no raw anon retrieval, guarded RPC, denied mutations, edited persistent answer through fixture-selected grounding, revision/history/replacement/non-revival and budget ceiling |
| M1 permission/persistence suite | **21 passed** | Real user/anonymous JWT permission denials, revocation, audit, stale concurrent save, date/publication filtering and actual Postgres restart persistence/Auth reconnection; original offer fields restored |
| Production browser suite | **21 passed, zero failed/skipped** | Desktop/mobile guest navigation/brand/keyboard-space, actual M1 sign-in/edit/save/reload/denial, disconnected free text, guest venue labels and staff create/edit/replacement → guest reload |
| Screenshot review | **7 captures inspected** | Phone 390×844 and desktop 1440×1000; original assets, knowledge/editor/history/disconnected conversation; native device keyboard remains manual |
| Live provider calls / connected AI gate | **0 / NOT VERIFIED** | No key available; trial remains disabled and reserved allowance unchanged at USD 0.00 |

The replacement browser test originally raced navigation and edited the preceding form. It now waits for the replacement heading; the complete workflow passes. This was a test timing correction, not acceptance of stale data. Test port 3100 forces paid AI off even if a key is later configured. Budget stress/replacement fixtures roll back and do not consume or reset the real trial. Knowledge fixtures are removed; private audit snapshots remain. M1 field values are restored while legitimate revisions/audit entries advance.

The cloud-environment-onboarding setup skill saved the complete install script and updated M2A startup instructions in the environment draft. The secure key requirement/domain is declared, but has no saved binding; draft saving does not apply a key, publish a snapshot or prove a restored instance. Private password/runtime key/guard values were checked absent from Git candidates and browser JavaScript; documentation links and whitespace checks pass.

Current private entry point: [M2A review guide](../docs/M2A_PRIVATE_REVIEW.md), [screenshots](../docs/screenshots/m2a/README.md). Manual actions are separately listed: switch the existing Codespace branch/run additive setup, keep port 3000 Private, securely bind the API key, check rates and enable within the USD 5 total, then complete the live checklist. No hosted Supabase account, public deployment, live number, loyalty, requests/handover or real booking work is claimed. Next gate is live M2A review, before M2B.


## Concierge voice, service behaviour and data design guide — 26 October 2026

Ijlal requested a reusable language/voice guide instead of another single prompt. He confirmed the test voice can be used for now, while future concierge behaviour should handle sensitive issues and complaints more intelligently, proactively offer a person or an exact next step for blocked requests, and collect a preferred name and later email/phone naturally when relevant to real workflows.

Owner screenshots show successful private Codespaces replies for hotel location and standard check in/check out. This is owner observed limited live connectivity/evidence selection, superseding the earlier no live connection status for those examples only. Full generated voice, staff change through live model, handover, actual billing and complete M2A acceptance are not established by those screenshots. No paid call was made by this documentation task and remaining allowance was not inspected or changed.

Documentation branch: `docs/concierge-voice-guide`, based on `feature/m2a-knowledge-concierge`. Added:

- `CONCIERGE_VOICE.md`: canonical working voice/language guide, owner confirmed preferences, situational warmth/humour, no dash punctuation in guest prose, natural formatting, appropriate certainty, context and example exchanges awaiting owner review.
- `docs/CONCIERGE_SERVICE_BEHAVIOUR.md`: specific verified contact/capability routing, proactive escalation triggers, sensitive issue handling, truthful request/handover states, staff ownership and bot pause, gradual name/contact collection and separation of personalisation, verified identity and marketing choices.
- `docs/CONCIERGE_VOICE_REVIEW.md`: 26 voice/factual/context scenarios plus 14 service/data scenarios, proposed human scorecard, fictional fixtures, offline and small supervised live review sequence. These are proposed cases, not passed tests; multilingual/future action cases remain conditional.
- `docs/CONCIERGE_VOICE_IMPLEMENTATION.md`: handoff explaining the current evidence selection/quote limitation, scoped M2A refinement, M2B operational work, preserving data/permissions/credentials and the existing USD 5 total allowance.
- Root AGENTS.md now points future concierge work to these specifications.

Validation for this documentation task: checked all four document files, internal companion paths and 40 unique scenario IDs; proposed complete concierge reply lines contain no prohibited dash punctuation; secret pattern scan found no API key, guard value or JWT material. Read back the uploaded documents and checked preserved instruction/status content. No application code, dependency, database, runtime configuration or operational integration changed. Application test suites were not rerun for documentation only work. Guide publication does not implement natural generation, profile storage, requests or handover and does not confer production brand/factual approval.

Next: the active implementation Codex should incorporate these files and selectively merge this dated entry and root instruction additions without overwriting newer app/progress work. Derive concise server side instructions, test M2A response generation and context within remaining allowance, then implement M2B request/ownership/handover and purposeful contact collection under the planned scope. Use fictional guest information during private review. Example wording, emoji defaults, routing thresholds, operational contacts, response expectations and retention decisions remain review items.


## Guide incorporation and M2A voice refinement — 26 October 2026

Fetched `origin/docs/concierge-voice-guide` at `f8190cbf72031d6893b8a528075e61d70a46b599` into active `feature/m2a-knowledge-concierge`, based on `a1509ac`. Incorporated the four guide documents byte-for-byte. Merged only the new root instruction section and dated progress entry; retained the newer implementation/evidence records and all existing application work. No full-branch checkout or wholesale instruction/progress replacement.

**Implemented, offline tested:** concise trusted runtime `media-one-voice-0.2` derived from canonical guide 0.1; composed plain-text reply/intent/support contract; social/clarification replies without forced hotel facts; up to six recent messages/4,000 characters as untrusted context; fresh factual retrieval and supporting revision/eligibility recheck; conversation reset/venue/reload clearing; source/condition disclosure rather than a technical metadata dump in the main reply. Guest-supplied fictional preferred names can be conversational context, not persistent or verified identity. No mandatory/automatic name collection, contact form or profile storage was added.

Conservative checks reject known unsupported prices/numeric values/links, omitted protected conditions, identifiable false action/identity claims, ordinary dash punctuation, raw formatting and unnecessary contact requests. Monetary records/offers retain full protected wording; policy qualifications retain protected sentences. Exact source URLs, identifiers and names remain intact. This limits free rewriting deliberately; valid paraphrases can fail validation. These checks **do not establish complete semantic correctness, tone approval, empathy or a production safety guarantee**. Live whole-exchange review remains required. Inputs conservatively filter obvious private details while allowing ISO dates; this is not complete personal-data detection. Use fictional details only.

**M2B is proposed only:** [requests/handover plan](../docs/M2B_REQUESTS_HANDOVER_PLAN.md) defines one fictional request slice, shared versioned capability/contact registry, server-validated purposeful fields, session/venue/team permissions, transactional idempotency, ownership, submission/assignment/human states, bot pause with in-flight reply protection and explicit resume. Proactive triggers, sensitive/urgent routing, after-hours contacts, staffing expectations, identity checks and retention/privacy decisions remain operating review gates. No live request, callback, team notification, contact profile, operational route registry or handover was implemented. Provisional contact facts do not automatically become verified departmental call routes.

**Preserved:** unchanged devcontainer, Codespaces sign-in fix, migrations/RLS/role configuration and budget code; no database reset/import replacement, dependency change, model switch or second provider call. State hashes verify original knowledge records, M1 business fields, venue access and the complete private budget configuration unchanged after regression tests. Legitimate test audit/revision counters advance, with original offer values restored. The USD 5 total allowance and all existing reservations remain unchanged; one 24,000-byte/600-output-token bounded call still reserves USD 0.12. Oversize context fails before reservation; no retries/refunds/reset/increase. New voice/context still fits the existing conservative 26,000-input-token ceiling.

**Connection evidence:** the imported entry preserves Ijlal's earlier Codespaces location/check-in/out screenshots as limited live selection evidence. A secure `CONCIERGE_OPENAI_KEY` binding is now present in this Codex runtime; values were not exposed. The official model page was reachable and showed the pinned snapshot and prices below the existing ceilings (snapshot marked deprecated); main pricing page returned 403. Neither page proves account/model usability. No new provider request or paid call was made. This cloud ledger cannot establish remaining Codespaces reservations; it was not enabled as a second allowance. Actual generated conversations for runtime 0.2, semantic voice quality, full live staff-change/offer/replacement gates and actual cost measurement remain **NOT VERIFIED**. Reported token usage/estimated actual invoice cost are not persisted by this refinement.

**Executed evidence:** lint, production build and typecheck passed. Answer/voice contract suite **14 passed**, real knowledge/Auth/Data API suite **25 passed**, M1 permission/restart persistence suite **21 passed**, full production browser suite **22 passed**, with no failures/skips. The added browser case is explicitly a transport fixture, not live AI; it checks composed reply/source disclosure, bounded prior-turn transmission, rejected private/invalid context, reset and venue clearing. All browser tests force paid calls off. A final context-only ISO-date filter correction was followed by answer/build/lint/type checks and the six M1/M2A workflow tests; broader layout checks had already passed. Style fixtures do not establish human scorecard ratings or all 40 proposed scenario outcomes.

Current private update and three-attempt live review (at most USD 0.36 reserved, only if that amount remains in the original Codespace allowance): [voice refinement review](../docs/CONCIERGE_VOICE_REFINEMENT_REVIEW.md). Existing working Codespaces connection requires only pull/build/restart, not a container rebuild, database setup/reset, new key or re-enablement. Stop after a failure rather than spending repeated attempts. No public deployment, live hotel number, real guest contact collection, booking, loyalty or M2B implementation is claimed.

## Frontend design skill installed — 27 October 2026

At Ijlal's explicit request, ran `npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend"`. Installer `skills@1.7.4` completed successfully. `npx skills list` confirms a project-local Codex skill at `.agents/skills/design-taste-frontend`, source `Leonxlnx/taste-skill`; `skills-lock.json` records the source and content hash. The installation is local in this checkout and not yet committed/pushed. No application redesign, dependency changes, database writes or model calls were performed. Future use must preserve the project's brand, accessibility, working functionality and source/data/budget requirements. Installation verification passed; application suites were not rerun for this tooling-only addition.

## Design assets incorporated and Taste Skill preserved — 27 October 2026

At Ijlal's request, fetched the latest active M2A branch and fast-forwarded `2ff04bb` → **`9d9299e`**, the design asset commit. Preservation fingerprints confirm the existing local Taste Skill (39 files), `skills-lock.json` and uncommitted skill-installation progress entry survived exactly. These installation files are now included in the preparation commit for Git/push, superseding the previous local-only installation status.

Read all five Markdown handoff documents, the asset inventory, ASSET_REVIEW.html and the complete 542-line Taste Skill SKILL.md (tasteskill v2). Verified **27/27 photographs** against every supplied SHA256, byte count and dimension and fully decoded them. Verified **five visual references** with Pillow/Chromium and inspected their contact view. Both actual fonts decoded: ChartwellBarsWebW01-Regular and Geomanist Regular, **weight 400, non-variable**. Chromium loaded both font faces and all 32 images; the supplied asset-review contact sheet was inspected. These are asset readiness checks, not application font installation, licence approval or a redesign verdict. Fonts are now present, superseding the prior missing-binary gap; public licence scope and additional weights remain separate questions.

Preserved the complete upstream skill and source lock hash unchanged. Syntax checks of its draw/inspect/lint entry points and CLI project-skill discovery passed. Initial app lint hit three React-hook false positives and seven unused-variable warnings in third-party skill code; a scoped `.agents/skills/**` vendor exclusion preserves the skill without applying app React rules to its standalone helpers. Application lint then passed. Details: [design handoff readiness](../docs/DESIGN_HANDOFF_READINESS.md).

The owner explicitly deferred the older three-concept task in CODEX_START_HERE.md. No design branch/concepts, route/UI restyling, font installation into the app, image derivatives, skill direction draw, database change, auth/permission change, paid model call or allowance reset occurred. Existing application/backend/configuration files were preserved. Next action is to receive the full frontend redesign instruction; supplied briefs/references are preparation material, not authority to execute the deferred task.
