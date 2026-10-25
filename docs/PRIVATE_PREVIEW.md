# Current private preview — M1 staff offers

Use [the M1 private review guide](M1_PRIVATE_REVIEW.md) for exact branch/rebuild/setup steps, private test sign-in details, the staff-to-guest checklist and separately listed manual actions.

Current branch: **`feature/m1-staff-offers`**. It starts from the latest branded branch through `3c4774e`, including the corrected `mcr.microsoft.com/devcontainers/javascript-node:24-bookworm` image. M1 adds Docker support for real local Supabase persistence; it does not revert to the invalid `1-24-bookworm` tag.

Quick commands after switching branch and rebuilding the Codespace:

```sh
npm ci
npm run setup:local
npm run build && npm run start
```

Read the generated test sign-in details only in the private editor at `.local/review-credentials.json`, never in chat or Git. Open the generated browser address for **Private port 3000**. The Codex task's localhost address is not a user preview URL. No hosted Supabase account is required for this local development workflow; only app port 3000 should be forwarded.

The old branded and M0 instructions/screenshots are historical. Current screenshots are in [the M1 review sheet](screenshots/m1/README.md). The brand remains provisional and fonts unchanged. Authenticated editing and persistent fictional offers are now implemented; AI, WhatsApp, loyalty and real bookings remain unavailable.
