# media-one-connect

media one connect

This repository contains the Media One Connect project handoff, implementation plan and runnable M0 demonstration for the Media One Hotel pilot.

- Start with [the original handoff](media-one-context/00_START_HERE.md).
- Read [the architecture and implementation plan](media-one-context/06_ARCHITECTURE_AND_IMPLEMENTATION_PLAN.md) for the recommended approach and milestone acceptance gates.
- Check [current decisions and progress](media-one-context/05_DECISIONS_AND_PROGRESS.md) for actual status and the next task.
- Follow [repository working instructions](AGENTS.md) during development.

## M1 — persistent fictional offers and authenticated staff

One complete development workflow now works: an authorised test staff user signs in, edits a fictional Media One Hotel offer, saves it in Supabase Postgres and sees it in the guest app after reload. Row-level policies independently deny anonymous, non-staff and cross-venue writes. The branded guest interface and scripted concierge are preserved.

**Start with [the M1 private review guide](docs/M1_PRIVATE_REVIEW.md).** Manual Codespaces actions are listed separately there. Use branch `feature/m1-staff-offers`; no hosted Supabase account is required for the verified local workflow.

| Route                              | Current behaviour                                                                             |
| ---------------------------------- | --------------------------------------------------------------------------------------------- |
| `/`, `/hotel`                      | Branded guest screens plus current published, in-date fictional offers from the database      |
| `/staff/sign-in`                   | Supabase email/password sign-in for privately provisioned test users                          |
| `/staff`                           | Authorised venue-scoped offer editor; anonymous users redirected and non-staff denied editing |
| `/concierge`                       | Existing scripted/local-only demonstration; no live AI                                        |
| `/explore`, `/my-stay`, `/profile` | Existing navigation/planned areas; staff access remains separate in Profile                   |

### Local development

Requires Node 24, npm and a working Docker daemon. The corrected `javascript-node:24-bookworm` devcontainer image is retained, with Docker support added for M1. Initial image downloads can take several minutes. Runtime database settings and random test credentials are generated privately, never committed:

```sh
npm ci
npm run setup:local
npm run dev
```

Setup uses the pinned Supabase CLI, official GHCR images and supported slim Postgres images, applies migrations and inserts only missing fictional fixtures. It preserves edited offer fields and does not reset the database. Test sign-in details are in ignored `.local/review-credentials.json`; open that file only inside your private editor. `.env.local` contains server-only URL/unprivileged key, never an app admin key. HTTPS Codespaces review sets secure cookies automatically.

For verification:

```sh
npm run lint
npm run build
npm run typecheck
npm run test:permissions
npx playwright install chromium
npm run test:e2e
```

Prepared Codex uses `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e`. Browser tests manage their own production server on port 3100. M1 workflow tests require the local stack and ignored test identities; they run serially and restore original offer fields. The database suite also checks persistence across a real Postgres restart. Credential-bearing traces are disabled. Never share raw setup/status logs containing keys.

### Review artifacts and boundaries

- [Eight M1 screenshots](docs/screenshots/m1/README.md) show sign-in, the editor, save confirmation, guest reload and non-staff denial.
- [Current design system](DESIGN.md), [brand provenance](BRAND_REFERENCE_README.md) and [authoritative progress](media-one-context/05_DECISIONS_AND_PROGRESS.md) remain the sources for continuation.
- `supabase/migrations/` contains RLS, column grants and actor/revision auditing; `scripts/setup-local.mjs` performs trusted local provisioning. Runtime code uses only anon key plus verified user sessions, not service_role.
- Persistence is in the local development database volume, not browser memory. Reloads and service/database restarts preserve it; deleting a Codespace/volume does not. A hosted database/backup/production deployment is not claimed.
- Only the existing fictional offer can be edited. AI, WhatsApp, membership, real booking and promotion entitlements remain outside this task. No public deployment or live number was connected.
- The brand reference is still provisional, with labelled temporary system typography. Official font files/licences remain outstanding. Earlier M0/app-first/brand screenshot sets are historical.
