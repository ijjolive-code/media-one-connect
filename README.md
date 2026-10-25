# media-one-connect
media one connect

This repository contains the Media One Connect project handoff, implementation plan and runnable M0 demonstration for the Media One Hotel pilot.

- Start with [the original handoff](media-one-context/00_START_HERE.md).
- Read [the architecture and implementation plan](media-one-context/06_ARCHITECTURE_AND_IMPLEMENTATION_PLAN.md) for the recommended approach and milestone acceptance gates.
- Check [current decisions and progress](media-one-context/05_DECISIONS_AND_PROGRESS.md) for actual status and the next task.
- Follow [repository working instructions](AGENTS.md) during development.

## M0 application — app-first redesign

M0 now has an app-first guest interface on the Next.js/TypeScript foundation for the **Media One Hotel** pilot, using fictional data only.

| Route | Working now | Deliberately unavailable |
| --- | --- | --- |
| `/` | Compact guest home, hotel guide and planned-journey links | Live hotel services |
| `/hotel` | Fictional hotel information | Confirmed hotel facts, availability, booking |
| `/concierge` | Conversation layout, four scripted replies, local-only text composer/fallback and reset | Free-text AI, saved conversations, staff contact |
| `/staff` | Read-only dashboard shell | Authentication, private records, editing or operational actions |
| `/explore` | Hotel guide entry and five planned-module explanations | Live discovery/booking/review workflows |
| `/my-stay` | Clear placeholders for bookings and requests | Reservations, request creation and real stay records |
| `/profile` | Membership placeholder, demo/asset notes and separate staff access | Sign-in, member identity and benefits |

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

The current [design system](DESIGN.md) records source pages from the supplied V1.02 manual, the original white reverse logo and real lobby photograph. These assets are used provisionally for private review, with temporary system typography because official fonts/licences are still missing. No logo is redrawn or recoloured; no public approval is claimed. The staff route is intentionally accessible with explicit demo labelling; access controls must be implemented before real staff data or actions are added.

### Inspect without starting a preview

Historical screenshots from the original M0 build: [desktop homepage](docs/screenshots/desktop-home.png), [phone homepage](docs/screenshots/mobile-home.png), [concierge demonstration](docs/screenshots/concierge.png), and [staff shell](docs/screenshots/staff.png). These are static captures, not live preview links.

Access preparation for later slices is tracked in [the access checklist](docs/ACCESS_CHECKLIST.md). Current implementation and test evidence remain in [document 05](media-one-context/05_DECISIONS_AND_PROGRESS.md).


## Review the app-first direction

Use branch `design/brand-reference-pass`. [Current phone/desktop screenshots](docs/screenshots/brand-pass/README.md) and [updated private-preview steps](docs/PRIVATE_PREVIEW.md) cover this redesign. Guest navigation is Home, Explore, Concierge, My Stay and Profile; on phones it stays at the bottom, and desktop uses a sidebar. Staff access is a separate utility in Profile.

[Design system and asset register](DESIGN.md): the actual manual excerpt, supplied reverse logo and real lobby photograph are now included. The manual is provisional, not newly approved. Chartwell Bars/Geomanist font files and licences are still missing; the system fallback is labelled in Profile. Source notes and task instructions are at the repository root; the PDF stays outside `public/`.

Keyboard handling uses the visible viewport to keep the conversation and tabs available. Automated checks simulate smaller viewport space while the input is focused; real iOS/Android keyboard behaviour still needs the owner review in the preview checklist. No database, live AI, authentication or business action was added by the redesign.

The original uploaded reference pack is preserved under `Media_One_Brand_Reference_Pack/`; its contents are also installed at the root paths requested by the pack. [Brand reference provenance](BRAND_REFERENCE_README.md) records the Drive source/date caveats. Runtime images are in `public/brand/`, served responsively through Next.js image optimisation. Real imagery does not make the demo hotel details current or connect any live services.
