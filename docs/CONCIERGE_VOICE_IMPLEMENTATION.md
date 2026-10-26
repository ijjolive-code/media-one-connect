# Implementing the Concierge Voice Guide

Working handoff | 26 October 2026
Canonical voice specification: ../CONCIERGE_VOICE.md
Review cases: CONCIERGE_VOICE_REVIEW.md
Service and data design: CONCIERGE_SERVICE_BEHAVIOUR.md

## Starting point

Fetch the documentation branch docs/concierge-voice-guide. Incorporate the guide and companion review files into the current implementation branch without overwriting newer code, staff edits, database state or progress entries.

The documentation branch began from feature/m2a-knowledge-concierge. It does not implement new answer generation or change application behaviour.

When incorporating AGENTS.md and the progress record, merge their new guidance and dated entry selectively. Do not replace newer versions of those files wholesale.

## Existing limitation

At the inspected M2A version, src/modules/concierge/answer-core.ts returns evidence IDs and an incomplete flag. src/modules/concierge/service.ts displays database wording verbatim. Each question is independent.

The owner has observed successful location and check in/check out replies in Codespaces, with screenshots. The visible tone is mechanical. This is limited live selection evidence, not verification of natural generation, full staff change testing or the complete M2A gate.

Changing only UI introductions or a brand adjective in the evidence selector cannot produce composed conversational answers.

## Required implementation

1. Read the canonical guide and brand references. Implement concise versioned server side voice instructions shared across channels. Keep the full guide out of per request factual context.
2. Extend the response contract to support a composed guest reply with supporting eligible evidence and appropriate qualification. Validate critical factual values, conditions, venue scope and action claims. Citations and model self reported confidence alone are not validation.
3. Allow simple greetings, thanks and clarification to be handled naturally without forcing a hotel fact or pretending a scripted response is a model reply. Keep missing provider access and provider failure truthful.
4. Support bounded conversation context without treating prior generated text as evidence. Fetch current eligible records on every factual turn. Keep reset, venue changes and personal information handling explicit.
5. Recheck supporting record revision and eligibility before returning the answer. Do not revive replaced records, omit fictional offer labels or imply provisional data is production approved.
6. Simplify guest response presentation and keep source details available. Read the UI specific brand instructions before changes. Keep technical metadata in staff/debug views and a clear private prototype notice in the guest interface.
7. Test no dash punctuation in ordinary generated prose while preserving exact protected URLs, names and identifiers. Channel adapters should render the same content appropriately for web and future WhatsApp.
8. Preserve the total USD 5 allowance and all existing reservations. Prefer one bounded provider call per turn; do not silently add calls, retries or model switches. Recalculate bounds if generated output or conversation context increases. Record reported token usage and estimated actual cost separately where implemented.
9. Run the relevant offline regression checks, then provide a small explicit live owner checklist within the remaining allowance. Report proposed, fixture tested and live verified capabilities separately.

Do not claim that simple lexical checks guarantee semantic correctness or that a cheerful response is automatically on brand. Use the full exchange review.

## Preserve

Keep the corrected devcontainer, Codespaces sign in fix, local database volumes, M1 permissions and saved offers, M2A knowledge history/replacement rules, source scope and expiry, private credentials and current branding.

The owner additionally requested proactive handling of sensitive issues and blocked requests, real handover or exact next steps, and gradual name/contact collection. Implement optional fictional preferred name use or verified link routing in M2A only where feasible within its boundary. Plan actual queues, contact driven service requests and staff takeover as M2B. Do not silently expand the voice refinement into all operational workflows.

No public launch, hotel WhatsApp number, real operational requests, staff messages, live bookings, loyalty or reputation publishing is authorised by this documentation task. Service design examples describe conditional future behaviour, not deployed actions.

## Review outcome

Provide representative actual generated conversations, guide/runtime versions, verification results, remaining limitations and precise private Codespaces update steps.

Specific example sentences and emoji defaults remain owner review proposals. Do not present them as approved scripts or train the model to reuse them indiscriminately.

