# media-one-connect

media one connect

This repository contains the Media One Connect project handoff, implementation plan and runnable M0 demonstration for the Media One Hotel pilot.

- Start with [the original handoff](media-one-context/00_START_HERE.md).
- Read [the architecture and implementation plan](media-one-context/06_ARCHITECTURE_AND_IMPLEMENTATION_PLAN.md) for the recommended approach and milestone acceptance gates.
- Check [current decisions and progress](media-one-context/05_DECISIONS_AND_PROGRESS.md) for actual status and the next task.
- Follow [repository working instructions](AGENTS.md) during development.

## M2A — managed knowledge and source-grounded concierge

M1's authenticated staff offer editing remains working. M2A adds venue-scoped FAQ/facility/policy management, persistent versions and replacements, and an additive import of 82 explicitly provisional source records. Draft, held, expired, replaced and unrelated-venue content is excluded from guest retrieval.

**Start with [the M2A private review guide](docs/M2A_PRIVATE_REVIEW.md).** Use branch `feature/m2a-knowledge-concierge`. It separates manual private-preview/key setup, the USD 5 total trial controls and live checks from completed local verification. No hosted Supabase account is needed for this local workflow.

The server-side OpenAI integration accepts free text and selects eligible evidence, which is quoted exactly with source/review labels. **Live model access is not yet connected or verified:** a private API key and current rate confirmation remain required. Missing/provider-error states never substitute scripted answers. No paid calls have been made.

| Route | Current behaviour |
| --- | --- |
| `/`, `/hotel` | Branded guest screens, separately labelled fictional M0 samples and current published/in-date M1 offers |
| `/hotel/knowledge` | Eligible published/private-prototype facts, scoped to one selected venue |
| `/staff/sign-in`, `/staff` | Existing Supabase sign-in and venue-scoped offer editor |
| `/staff/knowledge` | Staff FAQ/facility/policy editor with sources, dates, status, history and reviewed replacements |
| `/concierge`, `/api/concierge` | Free-text UI and server model integration; honest disconnected state until secure setup |
| `/explore`, `/my-stay`, `/profile` | Existing navigation/planned journeys; staff access remains separate |

### Local development

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
- The USD 5 model trial has a persistent reservation ledger and no automatic reset/increase. See the review guide before enabling. Live model verification remains pending. Requests/handover, WhatsApp, membership, real booking and promotion entitlements remain outside this task. No public deployment or live number was connected.
- The brand reference is still provisional, with labelled temporary system typography. Official font files/licences remain outstanding. Earlier M0/app-first/brand screenshot sets are historical.
