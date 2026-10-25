# media-one-connect
media one connect

This repository contains the Media One Connect project handoff, implementation plan and runnable M0 demonstration for the Media One Hotel pilot.

- Start with [the original handoff](media-one-context/00_START_HERE.md).
- Read [the architecture and implementation plan](media-one-context/06_ARCHITECTURE_AND_IMPLEMENTATION_PLAN.md) for the recommended approach and milestone acceptance gates.
- Check [current decisions and progress](media-one-context/05_DECISIONS_AND_PROGRESS.md) for actual status and the next task.
- Follow [repository working instructions](AGENTS.md) during development.

## M0 application — implemented

M0 adds a responsive Next.js/TypeScript foundation for the **Media One Hotel** pilot, using fictional data only.

| Route | Working now | Deliberately unavailable |
| --- | --- | --- |
| `/` | Guest homepage and navigation | Live hotel services |
| `/hotel` | Fictional hotel information | Confirmed hotel facts, availability, booking |
| `/concierge` | Four scripted question/reply examples and reset | Free-text AI, saved conversations, staff contact |
| `/staff` | Read-only dashboard shell | Authentication, private records, editing or operational actions |
| `/explore` | Explanation of M0 and five planned modules | Requests, WhatsApp, membership, booking and review workflows |

**Using Codex web? Start with [the private preview guide](docs/PRIVATE_PREVIEW.md).** A server inside Codex does not supply a browser-accessible preview by itself. A Codespaces configuration is prepared; owner account access and launch are still required. No public site was deployed.

### Development and checks

Use Node 24 (`.nvmrc`) and npm. Dependencies are pinned in `package-lock.json`; no environment variables or external accounts are required for M0. The npm cache is placed under `/tmp` for cloud filesystem compatibility. TLS and package integrity verification remain enabled.

```sh
npm ci
npm run dev
```

For the production build and browser tests:

```sh
npm run lint
npm run build
npm run typecheck
npx playwright install chromium
npm run test:e2e
```

If Chromium is already provided by your environment, use `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e` instead of downloading another browser. The tests start and stop their own production server on port 3100. Do not have another process on that port. The normal preview uses port 3000. Browser/system dependencies may need installation on a new machine; `npx playwright install --with-deps chromium` is Playwright's supported Linux setup where system-package installation is permitted.

`src/modules/content/hotel.ts` is the shared fictional content fixture. `src/modules/concierge/demo.ts` contains scripted replies derived from it. Pages use small shared components; future server-side application services and provider adapters remain planned. There is no backend persistence, model connection or secret handling in M0. Do not enter real guest information into this prototype.

Branding and the architectural illustration are original concept treatments, not approved hotel branding or photography. The staff route is intentionally accessible with explicit demo labelling; access controls must be implemented before real staff data or actions are added.

### Inspect without starting a preview

Screenshots from the verified M0 build: [desktop homepage](docs/screenshots/desktop-home.png), [phone homepage](docs/screenshots/mobile-home.png), [concierge demonstration](docs/screenshots/concierge.png), and [staff shell](docs/screenshots/staff.png). These are static captures, not live preview links.

Access preparation for later slices is tracked in [the access checklist](docs/ACCESS_CHECKLIST.md). Current implementation and test evidence remain in [document 05](media-one-context/05_DECISIONS_AND_PROGRESS.md).
