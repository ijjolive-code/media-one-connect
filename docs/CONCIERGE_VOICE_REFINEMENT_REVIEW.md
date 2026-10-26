# M2A voice refinement review

26 October 2026. Guide **0.1** → runtime **media-one-voice-0.2**. Model remains `gpt-4.1-mini-2025-04-14`.

## What changed

All four documents from `origin/docs/concierge-voice-guide` at `f8190cbf72031d6893b8a528075e61d70a46b599` are incorporated unchanged. Root instructions and the dated progress entry were merged selectively. The full guide/examples are not factual hotel evidence and are not sent with every question. A concise trusted server instruction maps the guide into runtime behaviour.

The response contract now includes composed plain text, an intent, supporting current evidence IDs and an incomplete flag. A greeting/thanks/clarification need not quote hotel facts. The model still makes one bounded call per turn, not a selection call followed by a generation call. Missing provider access, invalid output or failed validation never becomes a fake successful reply.

The web conversation sends at most six recent user/assistant messages and 4,000 characters. It stores no conversation/profile in the database. These are untrusted context for preferences/references, never factual authority. Every turn fetches current eligible venue facts and offers; selected revisions/eligibility are rechecked before delivery. Reset, reload and venue change clear conversation context. No contact form or automatic name demand was added. A guest-supplied fictional preferred name/correction can be used as conversational context; this is not verified identity or persistent personalisation.

Guest replies appear first, with a brief provisional/fictional qualification. Sources, original text and review details remain available under **Sources and conditions**. A fictional offer must also say fictional in the composed reply, not merely in a hidden citation. The interface still states that it cannot submit requests, contact staff or book.

## Validation and deliberate limits

- Reject unknown/out-of-scope support IDs, unsupported numeric values or links, ordinary dash punctuation, raw Markdown/HTML, identifiable false action/identity claims and requests for contact/stay/security details.
- Preserve qualifying source sentences verbatim after mechanical dash treatment. Monetary records and M1 offers require their whole protected text, including terms and dates. This intentionally limits conversational rewriting for financial/conditional material. Ordinary factual text can be composed; source prices, times and dates stay in their original numeric form, rather than unverified conversions/calculations.
- Exact URLs, emails, ISO identifiers/dates, supplied capitalised names such as Wi-Fi and signed currency values retain their protected strings. Ordinary word joiners become spaces and time/date ranges use “to”. Factual truth takes precedence over a style preference. Source disclosures retain original text separately.
- Input rejects obvious contact/room/payment/security details before a provider call. Prior turns containing detected details are omitted from model context. This is **conservative pattern filtering, not complete personal-data detection or a claim of safe real-guest use**. Use fictional details only. No profile/marketing/identity linkage exists.
- These deterministic checks go beyond citations and model confidence, but **do not prove semantic correctness, empathy, venue relevance or brand quality**. A model can make an unsupported non-numeric claim or misapply a sourced fact that a lexical guard misses. Strict guards can also reject a valid paraphrase. Rejection produces a clear failure; no additional paid retry is automatic. Whole-exchange human review remains required before broader use.
- Actual request submission, operational contact verification/registry, staff queue, proactive handover and purposeful contact collection are **planned M2B**, described in [the implementation plan](M2B_REQUESTS_HANDOVER_PLAN.md). Provisional contact facts are not automatically verified departmental routes. No unreviewed emergency procedure or numbers were added.

## Budget and live status

The database allowance/reservations, enablement flags, fixed model, 600-output-token limit, 24,000-byte total provider body and USD 0.12 reservation are unchanged. The history and concise voice instruction fit inside that same request bound. Oversize contexts fail **before reservation/provider call**. The conservative 26,000 input-token + 600 output-token ceiling remains USD 0.1136 at the previously required rate ceilings, below the reserved USD 0.12. No budget increase, refund, reset, extra call, model switch or retry was introduced.

A secure API key binding is now present in this Codex runtime; its value was never read into chat or Git. The official [model documentation](https://developers.openai.com/api/docs/models/gpt-4.1-mini) was reachable during this task and lists input/output token pricing below the existing ceilings and the pinned snapshot (marked deprecated). Model availability/account authorisation was not established by that page; no silent model replacement is allowed. The main pricing page returned 403.

The owner-observed Codespaces location and check-in/out replies establish limited earlier live selection only. This new voice contract has **no recorded live generated conversations yet**. The remaining owner Codespaces reservations cannot be inspected from this cloud database; do not enable this second ledger to obtain another allowance. **No paid calls were made in this refinement.** Reported token usage and estimated actual provider cost are not yet persisted by the application; USD 0.12 reservations are not actual invoice measurements.

## Offline evidence and review gaps

Run `npm run test:answers`, `npm run test:knowledge` and the normal build/lint/type/browser checks. Fixtures are explicitly transport/contract/UI examples, not a working scripted reply path. Representative fixture inputs/outputs exercised by tests include:

| Input/purpose | Fixture response inspected | Evidence type |
| --- | --- | --- |
| Greeting | “Hi! What can I help you with?” | Injected model-output fixture, not live generation |
| Thanks | “You’re welcome!” | Injected model-output fixture |
| Missing parking price | “I don’t have a confirmed parking charge.” | Injected model-output fixture |
| Context/name UI | “Hi Sam! I can help with hotel information.” | Browser transport fixture; verifies context/reset/disclosure only |
| Unsupported request/action | “I’ve sent your request.” | Rejected fixture |
| Invented amount/omitted conditions | Changed price or shortened conditional offer | Rejected fixture |

These do not establish human scorecard results for V01–V26/S01–S14. Relevant offline coverage exercises structure, numeric/condition preservation, source IDs, provider errors, no-dash exceptions, context bounds, reset, venue clearing, and unnecessary contact capture. Empathy, naturalness, semantic correctness, all multilingual cases and operational M2B states remain unverified or future work. The authoritative progress record gives the actual final test counts.

## Exact private Codespaces update

Use the **existing reviewed Codespace and database**, not a newly created ledger. Stop only the app terminal with Ctrl+C. Preserve local edits if `git status --short` is not empty. On the active M2A branch:

```sh
git pull --ff-only origin feature/m2a-knowledge-concierge
npm run build && npm run start
```

If on another branch, use the branch-switch steps in [M2A private review](M2A_PRIVATE_REVIEW.md) first. This refinement changes no dependency, migration or container: no Docker rebuild, database import/reset, credential change or trial re-enablement is needed if M2A already works. Preserve existing secure key/flags and all reservations. Open **Ports → 3000 → Private → Open in Browser**, then reload `/concierge`. Keep 54321/54322 unforwarded.

### Small owner live check, at most three paid attempts

Before sending, run `npm run concierge:trial -- --status` **in that same Codespace**. Proceed only if at least USD 0.36 remains within the original total authorisation. Keep it private, use fictional details, stop on the first failure and do not retry repeatedly. If the API connection is disabled, follow the existing secure enable/rate steps; do not reset the allowance. No extra approval is needed within the existing total, but more funding requires Ijlal's approval.

1. Staff: create a clearly fictional uniquely named facility with a source, current publication/review dates and a closing time of 20:00. Ask about it naturally, optionally supplying a fictional preferred name. Inspect the generated reply and disclosed source, fictional label, no decorative dashes and no invented benefit. Save the actual redacted exchange and guide/runtime version for review.
2. Staff: change that facility to 21:00 and save. Ask “What time does it close now?” in the same conversation. It should use the current record, not its earlier generated answer. Confirm exact conditions and no stale time. Holding it or publishing a replacement can be checked through source browsing offline before a later paid review.
3. Say that your fictional room is noisy and you cannot sleep. Inspect calm acknowledgement, no joke/upsell/name/contact collection, no claim that anyone was notified and only a supported specific general contact, if it cites one. Do not enter a real room number or sensitive details.

Afterwards inspect status and actual provider usage privately. Restore/hold the fictional facility as desired. These three attempts do not complete every M2A acceptance case; record observed failures and score the complete exchange using the voice review guide before choosing further tests within the remaining total. Do not present fixture wording as the requested actual generated conversations.
