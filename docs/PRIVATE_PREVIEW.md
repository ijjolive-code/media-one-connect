# Current private preview — M2A knowledge and concierge

Use [the M2A private review guide](M2A_PRIVATE_REVIEW.md) for exact branch/setup steps, private sign-in, the USD 5 total trial, secure API key configuration and separate live verification checklist.

Current branch: **`feature/m2a-knowledge-concierge`**, from the latest M1 baseline `398d6c4`. The corrected `javascript-node:24-bookworm` devcontainer, Docker feature, Codespaces sign-in fix and existing data are preserved. No rebuild is needed if your reviewed M1 container already works.

After switching the existing Codespace to this branch:

```sh
npm ci
npm run setup:local
npm run build && npm run start
```

Open **Ports → 3000 → Private → Open in Browser**. Codex localhost is not a user preview URL. Do not forward 54321/54322. Existing private test accounts remain in ignored `.local/review-credentials.json`; never paste their values into chat or Git. Preserve the Codespace/database volumes to retain your edits and trial ledger.

Knowledge management and guest source browsing work without a model. Owner-observed earlier location/check-in/out replies establish limited live selection. The new composed voice is **not yet live-verified**; a secure key binding is now present in Codex but no paid call was made in this refinement. The guide explains secure `CONCIERGE_OPENAI_KEY` setup, rate confirmation and explicit enablement. Do not use a second database/environment as a second USD 5 allowance. The UI clearly reports missing connection/provider errors; it does not fake AI replies.

[Current screenshots](screenshots/m2a/README.md) show phone and desktop states. Older M1/brand/M0 guides are historical. Source material and branding remain provisional; fictional content has separate labels. Requests, handover, WhatsApp, loyalty and live bookings remain outside M2A.

Latest: [voice refinement review](CONCIERGE_VOICE_REFINEMENT_REVIEW.md) gives the exact pull/build/restart steps for the existing Codespace and a three-attempt live checklist within its remaining allowance. No database import/reset, container rebuild, new key or trial re-enablement is needed when your existing M2A connection already works. [M2B plan](M2B_REQUESTS_HANDOVER_PLAN.md) remains proposed.
