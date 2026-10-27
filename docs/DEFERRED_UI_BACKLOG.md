# Deferred UI and usability backlog

28 October 2026. Current visual baseline: **416f7ce**, accepted by the owner **provisionally for continued development, not as a final UI approval**. Further visual redesign and animation refinement are paused. Preserve newer work, original brand assets/fonts, current navigation and motion safeguards.

This backlog records implementation findings from the concierge audit, not a fresh full browser/iPhone usability test. Historical physical-device checks remain in [the motion review guide](MOTION_PRIVATE_REVIEW.md). No visual changes or functional fixes were made in this audit.

## Functional obstructions to include with concierge corrections

These are tracked here for visibility, but are **not optional polish to defer indefinitely**. They obstruct an information/booking-link journey and belong to the prioritised [functional correction plan](CONCIERGE_ANSWER_QUALITY_AUDIT.md).

| ID | Observed in implementation | Impact and correction boundary |
| --- | --- | --- |
| UF01 | Default “Help me choose a restaurant” sends hotel-only evidence; typed venue names do not switch retrieval. | A core discovery task can fail. Fix intent/scope retrieval, not the selector's visual style. Preserve factual venue boundaries and explicit reset behaviour. |
| UF02 | Ordinary hotel follow up exceeds 24 KB; current message recommends resetting a conversation that may have only one exchange. | A core conversation is blocked and recovery is misleading. Fix evidence/context budgeting and accurate error classification. |
| UF03 | Model reply renders as a plain `<p>` with no link conversion; sources also render plain text. | A booking/menu URL supplied as an answer is not an intentional accessible link. Add safe validated current-source anchors/call actions where appropriate, without pretending a click confirms a booking or contacts staff through the app. No arbitrary model HTML. |
| UF04 | Provider, generation and factual/style rejection share the same general guest failure treatment and no protected stage reason. | Guests cannot complete or recover from repeated relevant-answer failures, and reviewers cannot diagnose them. Improve protected diagnostics and useful concise recovery; do not expose internal traces. |

## Deferred presentation/usability items

| ID | Finding | Future acceptance check |
| --- | --- | --- |
| UI01 | Expanded Sources and conditions shows internal record/source IDs and review deadlines. | Keep concise guest provenance and all material conditions; move detailed diagnostics into an authorised reviewer context. Do not hide provisional/fictional status or factual uncertainty. |
| UI02 | Every incomplete reply adds “Some details couldn’t be confirmed”, even if the main reply already names the precise gap. | Avoid duplicate generic qualification while retaining the actual unavailable fact and truthful status. |
| UI03 | A rejected or withheld turn's question is absent from the next history even though the transcript still shows it. | Make visible conversation continuity and bounded paired context agree; clear/reset behaviour remains explicit. This has a functional context component in the correction plan, not merely copy polish. |
| UI04 | Sending clears the typed draft; on failure Edit message can restore it, but the recovery is an extra step. | Review an accessible retry/edit recovery without automatic paid retries or duplicate sends. Retain current pending guards and privacy boundaries. |
| UI05 | Explicit venue changes clear the conversation and draft by design. Typed venue corrections currently behave differently. | After scope resolution is fixed, review the distinction and its wording so a guest does not lose a useful thread unnecessarily. No automatic persistent chat storage. |
| UI06 | Remaining aesthetic and motion comfort review is still open. | Owner-led later polish and actual iPhone checks; no new carousel/header/animation work in the concierge correction slice. This is an open review item, not a newly measured defect. |

Content/retrieval failures, action safety, price validation and missing emergency routing are **functional or operational defects**, not deferred visual polish. Use the main audit for priorities and M2B boundaries. Do not add placeholder operational screens to conceal missing workflows.
