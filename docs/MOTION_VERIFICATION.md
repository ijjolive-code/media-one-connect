# Visual and motion verification

27 October 2026. Branch `design/media-one-motion-refinement`, from latest fetched `design/media-one-app-redesign` at `3abd362`. This is an implemented refinement proposed for owner review, not owner-approved design or production readiness. [Private review and presentation walkthrough](MOTION_PRIVATE_REVIEW.md).

## Scope and design review

Read root instructions, current design/progress/brand references and installed `.agents/skills/design-taste-frontend/SKILL.md` (**tasteskill v2**), its app-screen guidance and motion recipes. Retained **Editorial greeting, seed 215653166**, with no redraw. Explicit owner requirements for controlled autoplay and one Home entrance supersede the skill's generic static app-screen defaults. The original 39 skill files/source lock remain tracked unchanged.

Inspected the running baseline at 375×812, 430×932 and 1440×1000 before editing. Actual header measured **67px** on phones; after refinement **56px**, plus real device top safe area. Desktop remains 72px. Logo canvas is 150px on phones, about 105px visible artwork, with original proportions and sufficient charcoal clearance. No device status bar or Safari toolbar is simulated.

**Round one:** stable card dimensions and correct venue identity; controls fit, but their added row reduced the phone's useful first-screen area. Tightened the Concierge shortcut and hotel shortcut padding while keeping 44px controls. Direct selectors were enlarged to 44px and inactive markers given stronger neutral contrast. Corrected a pointer/focus race so a Pause tap cannot turn itself back into Play before activation.

**Round two:** real timing and gestures passed in Chromium; native sheet exit initially retained modality for the visual animation and interfered with a rapid next chat action. Replaced that exit with native immediate close/focus return plus progressive discrete CSS transitions. Source/offer review assertions now target the actual main view rather than hidden server-stream buffers. Initial motion environment updates use a concurrent React update so streaming can hydrate normally.

**Round three:** WebKit exposed different resize/scroll-event ordering in the transcript. The app now compares the actual scroll position with its last anchor, allowing native clamping, before following. It also captures that position before marking an incoming reply unread. This preserves earlier reading, makes New reply reliable and keeps the latest followed reply visible on keyboard-space reduction. A repeated nine-case WebKit run covered this fix before the final complete suites.

The final composition remains recognisably Media One through real venue imagery, original logo, regular Chartwell/Geomanist, charcoal and deep pink. Captions and controls are stationary; ambient movement is confined to the featured photo. There are no new invented offers, identities, balances, availability claims or operational actions. A dedicated M12go photograph remains unavailable; no asset was invented to fill that gap.

## Executed checks

- **Production build, ESLint with zero warnings, and TypeScript:** passed on the final application code.
- **Chromium production browser suite: 73 passed, 0 failed/skipped**, across 375×812, 430×932 and 1440×1000, including real touch input and the existing staff/database workflows. After isolating each direct-route sweep in a fresh page to avoid teardown of idle Next prefetches, those three route cases also passed again.
- **Linux WebKit production guest/motion suite: 63 passed, 0 failed/skipped**, at the same three widths. The earlier focused nine-case scroll/unread repetition also passed.
- **Answer/voice contracts: 14 passed. Managed knowledge/database/retrieval: 25 passed. Database/Auth/Data API permissions and actual database-restart persistence: 21 passed.** No live provider calls.
- **Six private preservation fingerprints: unchanged**, covering knowledge, original offer business fields, staff access, complete budget configuration, all concierge attempt-ledger rows and imported source originals.
- **Delivery hygiene:** relative Markdown links resolve, `git diff --check` passes, and exact private credential scanning found no match in candidate files or client JavaScript. Private values were not printed. A final explicit origin fetch still identifies the redesign baseline as `3abd362`; no newer baseline work was discarded.

The Chromium production suite includes the existing real local Supabase staff offer save/reload/stale-revision/unauthorised cases and managed knowledge/version/replacement workflows. All provider-dependent UI responses are explicit transport fixtures; real tests force paid calls off. WebKit guest/interaction cases run at the same three widths. Chromium DevTools touch input is tested separately, not skipped or misreported as native Safari input.

The tests exercise real six-second and seven-second timers, single-owner coordination, stable geometry, matching picture/name/destination, manual selection, mouse hover, focus, explicit pause/play, native touch swipes, vertical gesture coexistence, native rail boundaries/end/restart, offscreen return, route return, reduced motion, view-transition readiness/fallback, direct links, Back, repeated modal dismissal, drafts, keyboard-space layout and earlier-message reading. The complete four-venue automatic loop was also observed without a fake clock: steady transitions occurred about **5.98, 6.04 and 6.03 seconds apart**, with the correct venue and href at every change. The first observation began after page load and is not used as a full-interval measurement.

Visibility tests deliberately dispatch the document visibility event with a hidden-property fixture and advance 25 seconds of simulated elapsed time. Headless Chromium reports both real tabs visible, so these checks establish event handling/no catch-up, **not operating-system background suspension**. That remains an explicit iPhone check.

## Rendered and motion artifacts

- **51 route/width combinations:** all 17 existing guest/sign-in/authenticated staff route states at 375×812, 430×932 and 1440×1000. Captured and inspected full folds and relevant long-page ends; no horizontal main overflow, visible failed images or page JavaScript errors.
- Additional Home/all-four-venue/rail captures in **Chromium and Linux WebKit** at all three widths. Both intended regular faces loaded in both engines. All 27 supplied original photos retain their hashes/dimensions and both installed font binaries match their supplied originals.
- [Screenshots and actual interaction recordings](screenshots/motion-refinement/README.md). Silent MP4 conversion preserves the actual recording timing; no staged operating-system chrome, generated images or speed-up. Film frames were sampled for cadence, crop, stable controls and navigation continuity. This is cloud browser/frame inspection, not a real-device motion judgement.
- The separate chat fixture clip holds only its intercepted browser request pending, then delivers a clearly labelled fictional reply as a whole. It verifies UI feedback; it is not a live model answer, production fallback or simulated streaming feature.

Taste browser inspection before/after: **0 FAIL, 2 WARN** at 375, 390 and 1440. The retained warnings are photographic colour share (about 18% after) and a 40px condensed phone heading. Actual branded photography and the supplied display face are explicit owner requirements; useful actions remain within the first viewport. No failed rule was suppressed. An independent 430×932 sweep provides the required wide-phone evidence instead of the inspector's nonstandard default 430px height.

Taste source inspection: **0 FAIL, 11 WARN**. Retained findings are the functional selected-tab underline and real modal shadow, staff publication/editor labels, and preserved source/backend dash strings. They are not decorative guest ornament or newly rewritten factual evidence. No vendor rule or asset was edited to hide these findings. WebKit also exposed an early-input race in the knowledge search; it now becomes available only when its actual client handler is ready, so the first query is not lost.

## Preservation and limits

Existing API/model/validation/context, auth/data libraries, knowledge/offer modules, Supabase migrations/RLS, devcontainer/origin fix, budget code and pinned packages are unchanged from `3abd362`. The only new script captures a local private visual review; it does not provision data or call a provider. No motion library or application dependency was added.

Private before/after hashes cover original knowledge rows, offer business fields, staff venue access, complete budget configuration, **all concierge attempt-ledger rows**, and imported source originals. Tests restore original business values and remove temporary knowledge fixtures; normal audit/revision counters advance. No reset/reseed/import replacement, credential change, allowance reset/increase or paid model call. This cloud state does not establish the balance in the separate owner Codespace.

Linux WebKit is Safari-engine evidence, not an actual iPhone/Safari release. Real safe areas, Safari keyboard/browser chrome, VoiceOver, momentum/edge gestures, background/resume and perceived motion comfort still require the short iPhone checklist. No fresh live AI or answer-quality approval, staff handover, bookings, requests, notifications, membership, WhatsApp or public deployment is claimed.
