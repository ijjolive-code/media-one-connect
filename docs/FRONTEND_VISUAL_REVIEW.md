# Frontend implementation and verification

27 October 2026. Dedicated branch `design/media-one-app-redesign`; baseline `e80d0aa`. This records checks performed in the Codex cloud workspace, not physical-device or owner design approval. [Current private review instructions](FRONTEND_PRIVATE_REVIEW.md).

## Scope and assets

Read the current repository/context/brand instructions, all five design-handoff Markdown files, inventory, actual font metadata/samples, source photo contact sheets and all five reference compositions. The user superseded the older three-concept task. Used the installed [Taste Skill](../.agents/skills/design-taste-frontend/SKILL.md), **tasteskill v2**, complete app-screen guidance and screenshot critique. Its original 39 files and source lock are tracked unchanged. App direction **Editorial greeting**, seed **215653166**, no redraw. Media One's actual regular fonts, palette, photography and bottom navigation override generic dashboard defaults.

- **27/27 photographs:** exact supplied SHA256 and dimensions, fully decoded. Original source files unchanged.
- **2/2 fonts:** exact installed copies, real 400-only Chartwell Bars/Geomanist; browser-loaded faces verified, synthesis disabled.
- **5/5 visual references:** decoded and visually inspected; none installed as public application imagery.
- **12 derivatives:** uncropped WebP, max long side 1400px, quality 84, 1,805,534 bytes total; [source/output manifest](frontend-image-manifest.json).
- Original logo preserved; rendered natural ratio checked in the browser. Private handoff/reference paths return 404 from the app.

## Render matrix

Captured and visually inspected **17 route states × 3 widths = 51 combinations** at **375×812**, **430×932** and **1440×1000** in headless Chromium. Included long-page end captures for content and form controls. Final route scan found **zero main horizontal overflows, zero failed visible images and zero page JavaScript errors**. Reading every screenshot is a visual review, not a complete automated accessibility certification.

| Route / state | 375 | 430 | 1440 |
| --- | --- | --- | --- |
| Home `/` | Inspected | Inspected | Inspected |
| Explore `/explore` | Inspected | Inspected | Inspected |
| Hotel `/hotel` | Inspected | Inspected | Inspected |
| Knowledge `/hotel/knowledge` | Inspected | Inspected | Inspected |
| Ciao Bella detail | Inspected | Inspected | Inspected |
| Qwerty detail | Inspected | Inspected | Inspected |
| garden on 8 detail | Inspected | Inspected | Inspected |
| Coco Lounge detail | Inspected | Inspected | Inspected |
| M12go detail | Inspected | Inspected | Inspected |
| Concierge `/concierge` | Inspected | Inspected | Inspected |
| My Stay `/my-stay` | Inspected | Inspected | Inspected |
| Profile `/profile` | Inspected | Inspected | Inspected |
| 404 recovery | Inspected | Inspected | Inspected |
| Empty staff sign-in | Inspected | Inspected | Inspected |
| Authorised offers `/staff` | Inspected | Inspected | Inspected |
| Authorised knowledge `/staff/knowledge` | Inspected | Inspected | Inspected |
| Protected test view `/staff/review` | Inspected | Inspected | Inspected |

Additional visual states: utility sheet, search no-match, expanded cancellation/source wording, real disabled-provider error, explicitly fictional transport pending/reply, simulated keyboard height 440px, existing knowledge editing/history and unauthorised denial. Additional state capture report covers **29** combinations; edit loading was captured separately from the loaded editor. Fixtures are confined to browser transport interception, never the runtime application. No live reply or native keyboard is depicted as verified.

## Look, fix, inspect

**Baseline:** repeated bordered development cards and notices lead the phone screen; five navigation destinations include unavailable journeys; photography and supplied fonts do not carry the experience. Skill inspection: **0 FAIL, 3 WARN**, including tiny labels, colour share and unused desktop canvas.

**Round 1:** real venues, condensed regular type and the immediate Concierge action establish the subject; Home uses a compact image/action/shortcut stack on phones and an 8/4 composition on desktop. Biggest visible defects:

1. `staff-375` and `staff-knowledge-375`: native fieldset minimum width pushes dates/forms outside the canvas. Fixed intrinsic minimum widths and narrow grid children.
2. `explore-375`: the portrait garden feature consumes its text column. Fixed its explicit image width and minimum sizes; the name and arrow remain visible.
3. `staff-knowledge-375`: a long guidance paragraph and record list push editing too far down. Made guidance and the phone record picker native disclosures; retained the practical open desktop list.

**Round 2:** all required widths now have coherent left edges and readable content; desktop discovery uses three cards then two wider cards, avoiding an orphan. Home's feature image fills its intended row. Visual empty-chat space is reserved for messages rather than extra placeholder features. One functional visual issue remained: opening the simulated keyboard could leave a pinned latest reply below the transcript. The transcript ResizeObserver now observes its viewport as well as content, preserving the bottom anchor only when the guest was already following replies. A regression assertion checks that anchor after shrinking the viewport, while the separate reading-earlier test checks no forced jump.

**Round 3:** rechecked the affected chat layouts, loaded staff record/history and final representative screens. Main actions remain reachable at both phone widths; sources and long forms wrap; no new clipping or asset issue was found. The remaining M12go text surface reflects a missing source photo, not a manufactured brand asset. Its visual richness is lower than photographed venues and remains an explicit asset gap.

App critique findings: the first screen answers where to go/ask, without invented totals or account identity; shared edges and varied photo/list proportions are deliberate; regular Chartwell is visible immediately; colours belong to brand/action/actual imagery; there are no chart or KPI sums to fabricate; missing facts use an honest unavailable state; source conditions remain full; mobile primary navigation becomes a labelled bottom bar and yields to the chat keyboard. Desktop adaptations keep the same app tasks, with no website footer/marketing sections.

## Skill measurements and exceptions

Home after: **0 FAIL, 2 WARN** at 375, 390 and 1440. These warnings are retained rather than suppressed:

- `colour-sprawl`: 17% strong colour, principally the actual Coco photography. Authentic photographic venue identity is an explicit owner requirement, overriding a generic 3% workspace data-colour rule.
- `app-title-size`: 40px phone h1. The supplied condensed Chartwell face stays on one compact line and useful actions fit in the first viewport; its narrow display role is explicitly requested.

Concierge after: **0 FAIL, 2 WARN** at the same widths:

- `app-title-size`: its approximately 29px measured condensed title is readable and compact.
- `panel-void`: desktop empty transcript contains open conversation space. It is a real fixed-height conversation viewport with a reachable composer, not an accidentally stretched statistics card. It fills naturally as replies arrive.

Source inspector: **0 FAIL**, with warnings for a functional selected underline/modal shadow, staff-only eyebrow labels and existing backend/staff dash text. There are no decorative resting card shadows. Source prose presented to guests uses the existing punctuation-preserving helper; immutable source IDs/URLs and staff source originals are retained. No blanket lint suppression or vendored inspector change was introduced. The skill's nonstandard default height for width 430 is not used as a phone acceptance viewport; the independent 430×932 matrix supplies that evidence.

## Executed checks

| Check | Result / practical coverage |
| --- | --- |
| ESLint | Passed, zero warnings |
| Production build | Passed |
| Typecheck | Passed |
| Production Playwright suite | **43 passed**, zero failed/skipped; 36 guest/layout/interaction cases across three widths, four M1 and three M2A cases |
| Answer/voice contract | **14 passed**, offline fixtures, no provider call |
| Knowledge/Auth/Data API | **25 passed**, real local database, publication/expiry/venue/replacement rules and trial rollback |
| M1 permissions/persistence | **21 passed**, real local Auth, RLS, concurrency and Postgres restart persistence |
| Data preservation fingerprints | Original knowledge rows, offer business fields, staff venue access and complete budget configuration unchanged |
| Secret scan | Exact private password/key/guard values absent from tracked/candidate files and built client JavaScript; values never printed |
| Git integrity of protected areas | Core API/model/validation/context, data/auth libraries, proxy, Supabase/RLS, scripts, devcontainer/origin fix, package files and installed skill unchanged from baseline |

The 43 browser checks exercise actual authorised offer save/reload/stale-version rejection/restoration at 1440/375/430, guest fictional exclusion, anonymous review redirect, signed-in unauthorised denial, knowledge edit/version/replacement suppression, real disabled-connection errors, guide browsing/search, source disclosure, chat drafts/history, venue scope, reader scroll position, simulated keyboard resize, keyboard focus, reduced motion, image error fallback and back navigation. Authenticated workflows use real local Supabase, not mocked auth. Provider responses in UI tests are explicit fictional transport fixtures. The real server endpoint and source/answer protections remain unchanged.

Tests restore business values and remove temporary knowledge fixtures; legitimate revisions/audit events advance. No database reset/reseed/import, credentials change or budget reset/increase occurred. No paid model call was made. State in this cloud workspace does not establish the remaining allowance in the owner's separate Codespace.

## Review still required

Native iPhone Safari keyboard/browser-chrome behaviour, rotation, VoiceOver, larger system text and physical touch comfort; owner design/brand approval; public asset rights. No dedicated M12go photo, extra actual font weights or Arabic typography is supplied. The working backend connection is preserved, but generated concierge quality, semantic accuracy, staff-change through live AI and the prior voice review are not newly verified. M2B handover, requests, notifications, booking, payments, membership and WhatsApp remain unimplemented by this task.
