# Concierge answer quality audit

28 October 2026, Asia/Dubai. Audit baseline: `design/media-one-motion-refinement` at **416f7ce**, explicitly fetched and confirmed current before branching to `audit/concierge-answer-quality`. No newer remote work was discarded. This is an investigation and correction plan, **not an implemented correction or live model evaluation**.

The owner accepts the current UI provisionally for continued development, not as a final design. Further visual and motion refinement is deferred. Concierge answer quality comes first, followed by M2B requests and staff handover. Preserve existing functionality, database contents, staff edits/history, authentication, permissions, eligibility rules, APIs, Codespaces fixes and the **original USD 5 total allowance and every reservation**.

## Findings in brief

There are several independent failure mechanisms. Another voice prompt alone cannot fix them:

1. The default hotel evidence nearly fills the provider request limit before conversation history is added. An ordinary follow up can fail before any paid call.
2. Retrieval is a complete dump of one selected venue, not question-aware retrieval. Other venue descriptions and policies cannot be used unless the guest changes the selector, which clears the conversation.
3. Protective text matching sometimes rejects valid wording and sometimes forces research commentary into the answer. It does not prove that all accepted claims are true.
4. The runtime identifies the assistant as a host but does not carry the guide's explicit first-person hotel perspective. Outsider wording is accepted by validation.
5. Important content is genuinely missing, disputed or approaching review expiry. That must produce specific uncertainty, not an invented answer.

These are confirmed code/data behaviours and offline reproductions. Without the owner's full failing transcripts or paid generation, this audit cannot assign each previously observed answer to one exact mechanism or report a live failure rate.

## What was inspected and measured

Read repository/context instructions and current progress, canonical voice/service/review guides, current implementation handoff, knowledge import guidance and the proposed [M2B plan](M2B_REQUESTS_HANDOVER_PLAN.md). Traced the real request path:

`DemoConcierge.send → POST /api/concierge → answer → answerEvidence → eligible_knowledge + offer RLS → makePrompt → one model request → groundedAnswer/validateReply → fresh eligibility/revision check → guest presentation`.

Relevant sources: [client](../src/app/concierge/demo-concierge.tsx), [API](../src/app/api/concierge/route.ts), [service](../src/modules/concierge/service.ts), [evidence loading](../src/modules/knowledge/data.ts), [prompt/contract](../src/modules/concierge/answer-core.ts), [validation](../src/modules/concierge/validation.ts), [context](../src/modules/concierge/context.ts), [runtime voice](../src/modules/concierge/voice.ts), [database projection](../supabase/migrations/202610260004_private_source_titles.sql).

The local database date was **28 October 2026 in Asia/Dubai**. Read-only calls used the same anonymous-key, server-guard eligibility RPC and offer selection as runtime. No staff save, import, migration, reservation, trial enablement or provider request occurred.

| Scope | Eligible provisional records | Eligible M1 offers |
| --- | ---: | ---: |
| Media One Hotel | 43 | 1 fictional test offer |
| Ciao Bella | 7 | 0 |
| Qwerty | 7 | 0 |
| garden on 8 | 12 | 0 |
| Coco Lounge | 10 | 0 |
| M12go | 3 | 0 |

All **82 candidate keys** match the selected import pack; all current knowledge rows are `provisional/prototype`. The 13 review-only records were not imported. The conflict register was not supplied to the model. Prototype mode off returned zero hotel knowledge rows; anonymous raw knowledge reads and an invalid server guard were denied. Current offer RLS requires published, demo-labelled, in-date rows for anonymous reads. Real source-derived offer descriptions are in knowledge records, distinct from the fictional M1 offer table.

Six before/after fingerprints remained unchanged: knowledge, original offer business fields, staff access, complete budget configuration, all concierge attempt rows and imported source originals. This is local preservation evidence, not a reading of the owner's separate Codespace balance. [Sanitised deterministic evidence](CONCIERGE_AUDIT_EVIDENCE.json).

## Cause analysis

### A. Retrieval and request size: confirmed workflow blockers

`answerEvidence(venue)` accepts no question/history and fetches every eligible record for exactly that slug. `makePrompt` supplies every returned question, answer, required text, label and date. There is no query ranking, topic selection or cross-venue resolver. This is model selection from a single-venue dump, not semantic search across the property.

Measured with current local records, real UUIDs and current M1 business wording:

- “What time is check out?” with hotel evidence: **23,725 bytes** of the **24,000-byte** provider-body ceiling, leaving 275 bytes for changes/history.
- One normal preceding checkout exchange plus “Can I leave at 15:00 instead?”: **`context_too_large`**, before reservation/provider access. This is far below the nominal six-message/4,000-character history limit.
- Combining all six scopes naively: **41,744 bytes**. Removing the venue filter or increasing the limit is not a safe fix. The spending bound and source/venue boundaries must remain intact.

The selected venue defaults to the hotel. Hotel record K048 names the five outlets but contains no cuisine/atmosphere profiles. Italian restaurant evidence K049, rooftop sports bar K067 and poolside profile K079 are absent from that prompt. Asking “Where can we have Italian food?” cannot itself load K049. Conversely, a Coco-selected chat lacks hotel policy K028 and general contact K002. Typed corrections such as “Actually Qwerty” do not change server retrieval. Choosing another venue explicitly resets context. The prompt's selected-venue-only rule reinforces this limit.

The UI's “Help me choose a restaurant” suggestion therefore exceeds what the default evidence reliably supports. Existing tests proving exclusion of unrelated venues remain valuable; a future multi-venue query must deliberately select eligible property scopes and preserve each fact's identity, never indiscriminately expose staff/private/held records.

The response contract also permits at most four supporting IDs. A request comparing all five dining venues needs an explicit bounded plan for supporting every included profile; do not silently omit citations or claim that adding more records alone solves discovery.

### B. Missing content and freshness: real gaps, not tone defects

Each venue has a concise eligible identity record: K049, K056, K067, K079 and K091. Poor descriptions are not explained by total absence of venue knowledge, but those profiles are brief. Quietness, current crowding, atmosphere at a particular time, live tables, today's M12go dishes and dish/allergen guarantees are not established. Do not infer them from photographs or marketing personality.

There is no confirmed universal parking charge or pool operating schedule in eligible knowledge. Qwerty's missing full hours/direct contact must not be reconstructed from held records. The pack discovered menu PDF links but did not validate their dishes/prices/allergens, and the current 82-record projection does not provide a complete venue menu-link set. Missing links need reviewed content work, not wholesale ingestion of research metadata or the held queue.

**27 records reach their review deadline on 1 November 2026; 55 on 24 November.** SQL requires `review_due > Dubai today`, so the first group becomes ineligible at the start of 1 November unless legitimately reviewed/replaced. This includes many schedules/prices/offers. Do not extend dates merely to keep the demonstration populated. Assign a content owner to review the affected facts and publish sourced replacements with history intact. No deadline was changed here.

### C. Factual validation: both false rejections and safety gaps

Constructed model-output probes were passed directly to the actual `groundedAnswer` function. They are **not generated answers**:

| Probe | Current result | Meaning |
| --- | --- | --- |
| K009: “Check out is at 12:00, Dubai time.” | `missing_condition` | The relevant rate qualification must survive; the current mechanism demands its source sentence verbatim rather than allowing equivalent wording. |
| K009: keep 12:00 and say “Arrangements can differ with your booked rate.” | `missing_condition` | An equivalent qualification still fails the exact-sentence check. |
| K010: reference the guest's requested 15:00, retain its required qualification, do not approve availability | `unsupported_value` | A guest constraint is mistaken for a hotel factual assertion because 15:00 is not in the source. |
| K002 phone with identical digits but no source spacing | `unsupported_value` | Numeric token segmentation rejects a usable contact form. |
| Correct location with a decorative dash | `voice_punctuation` | Violates the owner's style rule, but is then classified like a provider outage. |
| “Ciao Bella has a Michelin star and a quiet terrace.” citing K049 | Accepted | Unsupported nonnumeric descriptions can pass. This claim is deliberately false/unverified test output and must never become hotel content. |
| “Reception has your message and a colleague is coming.” citing K002 | Accepted | An unsupported completed-contact/service claim bypasses the lexical action guard. This is a release-critical safety gap, not evidence of a real action. |
| “I have contacted reception.” | `unsupported_action` | Some clear action claims are correctly blocked; the coverage is incomplete. |

Current checking compares numbers/currencies/calendar words/links against the concatenation of selected source text, without proving relationships such as which venue, unit or package owns a value. It is not a semantic proof. Unknown IDs and selected revisions are checked correctly, but a valid citation does not validate every word in a reply. The case-sensitive schedule-word list and regex format rules also have coverage limits.

The requirement for at least one evidence ID depends on the model's own `intent === factual` label. A social/clarification label is not independent proof that a reply contains no factual or action claim. Include mislabelled outputs in the correction tests.

Whole records are protected whenever they contain monetary/offer language; other qualifying sentences are also required. In this snapshot **23 of 83 evidence entries require their entire text**. K053, for example, requires “Published listings describe …” in the main reply. K080 can force the internal dispute sentence when quoting opening information. Long or multiple protected records also compete with the **600 output-token/1,800 reply-character** bounds. Those are plausible additional failure paths, not a measured live truncation rate.

### D. Instructions and source wording

The full guide permits “we” for hotel information and excludes habitual “the FAQ says” wording. Runtime voice 0.2 says “host” but does not explicitly translate that viewpoint into “our restaurant/menu”. A constructed “Their menu …” reply passes validation. Prompt reinforcement is appropriate **after** relevant evidence and validation are fixed, not instead of them.

At least 44 eligible records contain research/editorial cues such as “published”, “listing”, “FAQ”, “retrieved”, “prototype” or “disputed”. They are understandable provenance notes, but mingle guest facts, limitations and collection commentary. Verbatim protection can make the model obey preservation and violate the natural-voice guidance simultaneously. Keep genuine qualifications, such as unknown price/eligibility and conditional access, while separating operational facts from internal explanation through versioned reviewed content. Never silently strip a material condition or rewrite original sources in place.

### E. Conversation context

The browser stores ten recent exchanges and sends at most **six messages**, normally three completed pairs, capped at 4,000 characters. Only `model_grounded` replies contribute to history. Failed turns, fictional-offer-withheld turns and their guest questions are omitted. Backward character truncation can retain an assistant message without its original question. A turn containing detected private details is replaced in full, losing any useful preference in the same turn. The current input is blocked if private-detail patterns match.

Ordinary tab navigation preserves memory; reload/reset and explicit venue changes clear it deliberately. There is no persistent profile or server conversation memory. Most importantly, the request-size failure can stop follow ups even when the browser sent context correctly. A memory prompt cannot restore turns that were never sent, and prior assistant prose must remain untrusted rather than become factual authority.

### F. Presentation and diagnostics

The current client already replaces most technical API errors with concise guest messages. Do not misdiagnose those raw API strings as always visible in the current UI. Generated `model_grounded.message`, however, is displayed as supplied, and required source commentary can enter it. Source disclosure still shows record/source IDs and review deadlines to guests.

The service merges provider errors, malformed output, factual rejection and voice-format rejection into `provider_error`; no persistent structured reason distinguishes them. Reservation outcomes record success/failed, not a full quality trace or actual token cost. This makes recurring failures hard to diagnose. A known fact failure must not be hidden by a friendly fabricated fallback.

A reply citing the fictional M1 offer is withheld **whole** in normal guest chat. This correctly avoids presenting it as genuine, but the model still receives the fixture and may select it, losing otherwise useful supported parts. The fixture should remain available to its explicitly labelled private test workflow, without contaminating normal guest answer retrieval. No offer or permission was changed in this audit.

## Prioritised correction plan: proposed, not implemented

| Order | Correction | Exit evidence before proceeding |
| --- | --- | --- |
| **P0.1** | Add privacy-safe stage/rejection diagnostics and deterministic regression cases for the reproductions. Distinguish evidence/context, provider, schema, validation and presentation outcomes. Store no raw guest text, contacts, secrets or new conversation history by default. | Can identify the failing stage and reason without another paid attempt or exposing staff diagnostics to guests. |
| **P0.2** | Make guest answers action-free by construction until an independently authorised action result exists. Reject unsupported completion/notification/handover wording beyond the current small regex list; keep adversarial and whole-exchange review. | Both explicit and paraphrased false action examples fail. No refusal can accidentally claim a completed action. M2B is still absent. |
| **P0.3** | Implement bounded, question-aware evidence selection. Resolve explicit venue names, follow-up references and property-wide discovery within the existing allowlist. Preserve venue/topic/revision/provenance with every fact. Keep full-record review/expiry/replacement gates and recheck the chosen scopes at delivery. | Default hotel chat can find Ciao Bella or compare requested eligible venues without selector changes. Hotel questions from an outlet chat work when explicitly asked. Negative scope/permission tests continue to deny unrelated/private content. |
| **P0.4** | Budget evidence, instructions, current question and paired history together below the existing 24 KB ceiling; select relevant facts rather than dump all 82. Isolate fictional fixtures from normal guest generation. Stay with one bounded call, fixed model/output bound and original ledger. | Current hotel checkout plus several follow ups fit; fixture offers persist in private review but never displace genuine guest answers. Check byte limits with realistic long staff edits, not only tiny synthetic facts. |
| **P1.1** | Review/version content into concise guest facts plus explicit material conditions, provenance and uncertainty. Review the 27 near-expiry records before 1 November. Enrich venue profiles/menu routes only from authorised reviewed evidence. | Sources, history, dates and all critical conditions preserved; no held claims imported and no automatic review extensions. |
| **P1.2** | Replace coarse text matching with field/claim-aware critical validation that binds value, unit, venue, schedule and conditions. Recognise guest-stated constraints separately without promoting them to availability. Permit natural equivalent wording while keeping complete offer qualifications. | Correct current facts and requested 15:00 are handled truthfully; swapped prices/scopes, omitted conditions, changed links and false actions fail. Non-numeric unsupported claims remain a human-review gate rather than an asserted solved problem. |
| **P1.3** | Send coherent paired recent context, retaining relevant unresolved guest intent without treating error text or previous answers as facts. Clarify only genuinely ambiguous references. Keep reset/reload/privacy boundaries explicit. | Cuisine/quiet preferences, venue corrections and current staff replacements survive ordinary follow ups. No persistence of personal conversations is introduced. |
| **P1.4** | Refine the concise runtime voice only after the above: hotel perspective, direct useful descriptions, precise uncertainty and no internal publishing language. Correct task-blocking link/error usability without another visual pass. | Evaluate complete conversations in the companion cases; truthful limitations and conditions take priority over stylistic brevity. |
| **P2 gate** | Run a small separately budgeted live sample, record actual redacted exchanges and owner scorecard results. Then begin the existing M2B.1 slice. | Offline gates pass first; no critical fact/action failures. Owner voice judgments are recorded, not inferred from fixture success. |

This is one M2A correction workstream, not authority to build new M2B functionality during this audit. [Evaluation conversations](CONCIERGE_AUDIT_CONVERSATIONS.md) define the next acceptance set. [Deferred usability backlog](DEFERRED_UI_BACKLOG.md) separates functional obstructions from postponed polish.

## Current capability versus M2B

**Today:** one server-side generated information reply per accepted turn when the private connection is enabled; bounded ephemeral context; current single-venue knowledge and offers; deterministic factual/style checks; managed knowledge edits/history/replacements; persistent staff offers and authenticated authorisation. Source-derived booking/contact strings can be provided, but no reservation is made. Some plain-text links are not actionable anchors yet.

**Not today:** request submission, a guest request reference/status, staff queue, assignment, messages to reception, callback collection, notifications, human takeover, real booking/inventory, emergency workflow or persistent guest identity. A normal model answer is never evidence that staff were contacted.

**M2B plan remains proposed:** first one fictional housekeeping request with session-bound guest status and authorised queue; then ownership/staff replies and transactional human takeover/bot pause/explicit resume; then proactive routing and purposeful minimum contact collection. Notification delivery is separate from queue submission. Room references are not identity. Exact operational contacts/coverage/emergency routing and privacy/retention need reviewed ownership. Keep [M2B's existing gates](M2B_REQUESTS_HANDOVER_PLAN.md) rather than implementing a reassuring message with no backend evidence.

## Proposed live testing and maximum cost: not run

This audit made **zero paid calls**. No new key/setup or trial enablement is required for this investigation. Do not send questions from the visual-only Codespace process expecting AI; that process intentionally uses `CONCIERGE_AI_ENABLED=false`.

After offline corrections, a proposed first supervised sample is **at most eight provider attempts, maximum USD 0.96 reserved**, only if that much remains in the **original** owner Codespace ledger. Count turns, not scenarios: hotel/follow up (2), restaurant/follow up (2), current offer/condition follow up (2), missing fact (1), complaint (1). Use one call per turn; stop on the first material failure and do not spend the unused allocation retrying. Test provider failures, expiry and staff-replacement mechanics offline first.

Before any later live run, check `npm run concierge:trial -- --status` privately in the same working Codespace, verify the pinned model remains available and current rates fit the existing conservative ceilings, and preserve all prior reservations. Existing bounds reserve USD 0.12 per attempt; the prior ceiling calculation is USD 0.1136 per request, not a current invoice measurement. No allowance reset, refund, automatic increase, alternate ledger, model switch or paid retry. Actual provider usage must be inspected separately. If less than USD 0.96 remains, reduce the explicitly planned attempt count to what remains; do not top up. Any increased total needs owner approval. **This proposal does not initiate live testing at this audit stage.**

## Checks actually performed

- Read-only local database/anonymous Data API eligibility inventory and denial checks above; no writes.
- Deterministic prompt-size and constructed-output probes using the real pure functions. Findings include deliberately accepted bad outputs; these are reported defects, not a passing quality score.
- Existing answer/voice contract suite: **14 passed, 0 failed/skipped**, with provider transport fixtures only and paid calls disabled. Those tests do not establish real answer quality.
- Six preservation fingerprints unchanged before/after; documentation links, whitespace and credential hygiene checked before commit.

No full browser, build, database-mutation or live generation suite was rerun for this documentation-only audit. The historical UI/regression evidence remains at 416f7ce. No application, model instruction, dependency, database policy or visual asset changed.
