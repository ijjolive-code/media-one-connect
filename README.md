# media-one-connect

media one connect

This repository contains the Media One Connect project handoff, implementation plan and working private prototype for the Media One Hotel pilot.

- Start with [the original handoff](media-one-context/00_START_HERE.md).
- Read [the architecture and implementation plan](media-one-context/06_ARCHITECTURE_AND_IMPLEMENTATION_PLAN.md) for the recommended approach and milestone acceptance gates.
- Check [current decisions and progress](media-one-context/05_DECISIONS_AND_PROGRESS.md) for actual status and the next task.
- Follow [repository working instructions](AGENTS.md) during development.

## Current visual and motion review

Use **`design/media-one-motion-refinement`** and [the current private review guide](docs/MOTION_PRIVATE_REVIEW.md). It preserves the working redesign/backend and adds a compact phone header, coordinated controllable venue autoplay, carried-photo detail transitions and quieter interaction feedback. [Recordings and screenshots](docs/screenshots/motion-refinement/README.md), [verification](docs/MOTION_VERIFICATION.md), and an implemented-feature presentation walkthrough are included. Keep port 3000 Private and paid calls disabled for visual review. No database reset or new key is needed.

## Current frontend review

**Use [the frontend private review guide](docs/FRONTEND_PRIVATE_REVIEW.md) and branch `design/media-one-app-redesign`.** It updates your existing Codespace without resetting data or changing API credentials. Keep port 3000 Private. Visual review disables paid calls only for that process.

The full guest/staff redesign uses the supplied original logo, regular Chartwell/Geomanist fonts and actual venue photography. Three main destinations are Home, Explore and Concierge; utility routes remain supported. [Screenshots](docs/screenshots/frontend-redesign/README.md), [design system](DESIGN.md) and [checks/visual review](docs/FRONTEND_VISUAL_REVIEW.md) record implemented choices, not owner approval. Fictional offers remain editable and persistently reviewable at authorised `/staff/review`, excluded from normal guest presentation.

## M2A — managed knowledge and source-grounded concierge

M1's authenticated staff offer editing remains working. M2A adds venue-scoped FAQ/facility/policy management, persistent versions and replacements, and an additive import of 82 explicitly provisional source records. Draft, held, expired, replaced and unrelated-venue content is excluded from guest retrieval.

The [M2A setup guide](docs/M2A_PRIVATE_REVIEW.md) describes the original backend setup on `feature/m2a-knowledge-concierge`. For the current redesign, use the frontend guide above. It separates manual private-preview/key setup, the USD 5 total trial controls and live checks from completed local verification. No hosted Supabase account is needed for this local workflow.

The server-side OpenAI integration now composes concise replies with bounded conversation context, supporting eligible evidence and protected prices/conditions. See [the voice refinement review](docs/CONCIERGE_VOICE_REFINEMENT_REVIEW.md) for its conservative validation limits and exact private update steps. Owner-observed earlier live selection is recorded; the new composed voice still needs live review in the existing Codespace/allowance. A secure key binding is present in Codex, but no paid call was made in this refinement. Missing/provider-error states never substitute scripted answers.

| Route | Current behaviour |
| --- | --- |
| `/`, `/hotel` | Photo-led guest app and source-backed hotel essentials; fictional promotions excluded |
| `/hotel/knowledge` | Eligible published/private-prototype facts, scoped to one selected venue |
| `/staff/sign-in`, `/staff` | Existing Supabase sign-in and venue-scoped offer editor |
| `/staff/knowledge` | Staff FAQ/facility/policy editor with sources, dates, status, history and reviewed replacements |
| `/concierge`, `/api/concierge` | Free-text UI and server model integration; honest disconnected state until secure setup |
| `/explore`, `/explore/[slug]` | Venue discovery and five photo/source-backed detail screens |
| `/my-stay`, `/profile` | Honest stay/account limitations with useful guide links; staff access separate |
| `/staff/review` | Authorised private test presentation for persistent fictional offers and eligible knowledge |

### First-time local development

Existing working Codespaces should follow the frontend guide, not rerun setup.

Requires Node 24, npm and a working Docker daemon. The corrected `javascript-node:24-bookworm` devcontainer image is retained, with Docker support added for M1. Initial image downloads can take several minutes. Runtime database settings and random test credentials are generated privately, never committed:

```sh
npm ci
npm run setup:local
npm run dev
```

Setup uses the pinned Supabase CLI, official GHCR images and supported slim Postgres images, applies additive migrations, inserts only missing fictional fixtures and imports only whitelisted provisional knowledge candidates. It preserves edited offer fields and does not reset the database. Test sign-in details are in ignored `.local/review-credentials.json`; open that file only inside your private editor. `.env.local` contains server-only bindings and a generated knowledge guard, never an app admin key. A model API key must be configured separately and privately. HTTPS Codespaces review sets secure cookies automatically.

For verification:

```sh
npm run lint
npm run build
npm run typecheck
npm run test:answers
npm run test:knowledge
npm run test:permissions
npx playwright install chromium
npm run test:e2e
```

Prepared Codex uses `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e`. Browser tests manage their own production server on port 3100. M1 workflow tests require the local stack and ignored test identities; they run serially and restore original offer fields. The database suite also checks persistence across a real Postgres restart. Credential-bearing traces are disabled. Never share raw setup/status logs containing keys.

### Review artifacts and boundaries

- [M2A screenshots](docs/screenshots/m2a/README.md) show managed knowledge and the honest disconnected concierge. [M1 captures](docs/screenshots/m1/README.md) remain historical workflow evidence.
- [Current design system](DESIGN.md), [brand provenance](BRAND_REFERENCE_README.md) and [authoritative progress](media-one-context/05_DECISIONS_AND_PROGRESS.md) remain the sources for continuation.
- `supabase/migrations/` contains RLS, column grants and actor/revision auditing; `scripts/setup-local.mjs` performs trusted local provisioning. Runtime code uses only anon key plus verified user sessions, not service_role.
- Persistence is in the local development database volume, not browser memory. Reloads and service/database restarts preserve it; deleting a Codespace/volume does not. A hosted database/backup/production deployment is not claimed.
- The USD 5 model trial has a persistent reservation ledger and no automatic reset/increase. See the review guide before enabling. Earlier limited live selection was owner observed; current generated voice and full live acceptance remain pending. Requests/handover, WhatsApp, membership, real booking and promotion entitlements remain outside this task. No public deployment or live number was connected.
- Brand guidance remains provisional. Both supplied regular fonts are installed and browser-verified; public licence scope, additional weights and Arabic type remain unconfirmed. Earlier M0/app-first/brand screenshot sets are historical.

Voice source: [canonical working guide](CONCIERGE_VOICE.md). [M2B requests/handover plan](docs/M2B_REQUESTS_HANDOVER_PLAN.md) is proposed only, with purpose-limited contact collection and no working operational queue yet.
