# M1 private review: staff edit → persistent guest offer

Branch: `feature/m1-staff-offers`. Base: the latest `design/brand-reference-pass`, including corrected container image commit `7d87559` and recovery notes through `3c4774e`. The working image remains `mcr.microsoft.com/devcontainers/javascript-node:24-bookworm`; M1 adds the official Docker-in-Docker feature for local Supabase.

## What works

One fictional Media One Hotel offer is stored in real local Supabase Postgres. A test staff user signs in through Supabase Auth and edits its title, description, conditions, inclusive Dubai display dates and guest visibility. Saves are persistent and versioned; the guest Home and Hotel information pages fetch current published, in-date records on reload. Staff access is assigned per venue in the database. Anonymous, signed-in non-staff and other-venue users cannot edit it.

The UI uses the existing branded mobile shell and private guest navigation. Staff has a separate sign-in/editor. No AI, WhatsApp, loyalty, reservations or real promotional entitlement was added. Concierge remains the existing scripted demonstration.

## Manual steps — only actions requiring your Codespace/account

No hosted Supabase account, API key entry, SQL execution or password entry in chat is required for this review. Setup automation provisions the local development stack and random test passwords. I cannot rebuild or open your private Codespace from this task.

1. In your existing Codespace, stop your app server with **Ctrl+C in its own terminal**. Run `git status --short`; preserve any local edits before switching. Do not reset them. Alternatively create a new Codespace from the M1 branch on GitHub.
2. For a clean existing checkout, paste:

   ```sh
   git fetch origin feature/m1-staff-offers:refs/remotes/origin/feature/m1-staff-offers
   git switch --track origin/feature/m1-staff-offers
   ```

   If the local branch already exists, use `git switch feature/m1-staff-offers`, then `git pull --ff-only origin feature/m1-staff-offers`. Do not force a failed switch/pull.

3. Press **Cmd/Ctrl+Shift+P → Codespaces: Rebuild Container**. This picks up Docker support while preserving the corrected Node image. After rebuild, use a **new terminal**. If recovery mode returns, open **Codespaces: View Creation Log**, identify the first image/feature error, and retain local work; do not install Node into the recovery shell as a workaround.
4. Check the tools, then run setup:

   ```sh
   node --version
   npm --version
   docker version --format '{{.Server.Version}}'
   npm ci
   npm run setup:local
   ```

   The first local stack download can take several minutes. Wait for **Local database ready; migrations applied and test users provisioned.** It does not reset existing offers. A failed setup is not a working database; use the troubleshooting section below.

5. In the browser editor press **Cmd/Ctrl+P**, type `.local/review-credentials.json`, and open it. Use the `staff` email/password for the authorised account, `unauthorised` for a signed-in user without staff access, and `otherVenue` for a different venue. These randomly generated passwords are private to your local stack. **Do not paste them into chat, screenshots or Git.** The file is ignored and restricted to the local user. Do not edit account IDs or role mappings manually.
6. Start the app:

   ```sh
   npm run build && npm run start
   ```

7. Open **Ports → 3000**, confirm **Port Visibility → Private**, then choose **Open in Browser**. Use GitHub's generated forwarded HTTPS address, not a Codex-cloud localhost address. Do not forward database/API ports 54321 or 54322; the browser communicates with Next.js, which accesses Supabase internally. The setup script sets secure app cookies when running in Codespaces.

If Codespaces is unavailable, the remaining manual prerequisite is Codespaces access/quota or an equivalent Docker-enabled private development machine. No paid resource or hosted Supabase project has been created by this task.

## Short workflow checklist

- [ ] Guest: open Hotel information and find **Demo offers**. The content must say fictional/test only.
- [ ] Profile → **For the hotel team → Staff offer workspace** opens the sign-in page. Sign in using the private `staff` entry. The editor shows **Authorised test staff**.
- [ ] Change the fictional title, description and sample conditions. Keep dates covering today in Asia/Dubai and **Display in the guest demo** checked. Press **Save demo offer**. Wait for the database success message.
- [ ] Open the guest hotel page in another tab/window and **reload**. The updated text must appear. For a separate anonymous app session, use a private browser window: GitHub may still require your owning account for access to the private port, but do not sign into the app as staff there.
- [ ] Reload the staff page: the saved fields remain. Optionally stop/restart the app terminal and inspect again; the data is not stored in the browser or Next.js process.
- [ ] Sign out, then open `/staff` directly: it must return to sign-in. Sign in with `unauthorised`: it must show **Access not granted**, without an editor.
- [ ] Optional visibility check: uncheck display or choose an expired date, save and reload the guest page; the offer disappears. Staff can still edit and restore it. No booking or redemption is possible.

Two tabs editing one revision cannot silently overwrite each other. The later stale save gets an explicit reload message. A network/permission failure says the offer was not saved; it never falls back to a fake success.

## Automated verification

Run only against this local fictional development stack; tests refuse a remote API URL. Keep the app's test port 3100 free:

```sh
npm run lint
npm run build
npm run typecheck
npm run test:permissions
npx playwright install chromium
npm run test:e2e
```

In the prepared Codex machine use `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e` instead of downloading a browser. On a new Linux machine Playwright may require its documented `--with-deps` browser installation.

Actual results in this task: **21 database/Auth/Data API checks passed** and **19 browser tests passed**, with no skipped tests. The database tests send real anonymous/user-JWT requests, verify unchanged records after denied writes, metadata/role escalation denial, venue restrictions, column grants, revocation, date/publication rules, actor/revision audit, concurrent stale writes and persistence after an actual Postgres container restart plus Auth reconnection. Browser tests use real password sign-in, save, a separate anonymous context, reload, stale-tab rejection and sign-out at phone and desktop widths. Credential-bearing browser traces are disabled; generated files/logs remain ignored.

Tests restore original fictional offer fields after inspection, but revision/audit counters legitimately advance. Setup can be rerun without overwriting edits; it applies pending migrations and only inserts missing initial fixtures. It does not run `db reset`.

## Runtime and permission design

- `SUPABASE_URL`, `SUPABASE_ANON_KEY` and `APP_COOKIE_SECURE` are server-only settings in ignored `.env.local`. Setup writes only loopback URL and unprivileged key; the application rejects privileged service/secret keys in that binding.
- Verified Auth user sessions live in HttpOnly, SameSite=Lax cookies. HTTPS review uses Secure cookies. Server-side Auth verification and venue lookup run before editing; the database independently enforces row policies.
- Public guests can read only published demo offers within inclusive Asia/Dubai dates. Protected offers and staff role assignment are not exposed as writable guest data. No self-service signup or role assignment exists.
- Staff can update only selected offer content columns for assigned venues. They cannot move records to another venue, spoof authorship/revisions, grant roles, create or delete offers. This slice intentionally edits one seeded offer.
- Database triggers stamp actor/time/revision and write a private audit snapshot. Each update compares the loaded revision. Server and database validate dates/content lengths.
- The admin key is used only by the local provisioning/verification scripts in memory, obtained through local CLI status. It is never passed to the app, public bundle, documentation or Git. Runtime requests use anon + authenticated user JWT only.
- Guest reads use no cache and dynamic rendering; staff routes/session refresh use private/no-store responses. There is no substitute fixture shown as a saved offer if the database is unavailable.

This is development persistence in Docker volumes within the current machine/Codespace, not a separately managed hosted database or production backup plan. Reloads and service/database restarts preserve it; deleting the Codespace/volumes removes that development database. Restoration into a new published cloud task is not claimed. Real staff/guest data and public deployment remain outside this task.

## Troubleshooting and environment-specific work

- **Sign-in shows “This page couldn’t load” / digest 2308781827:** if the app terminal reports `x-forwarded-host` as the Codespaces domain but `origin` as `localhost:3000`, Next.js rejects the Server Action before authentication. The 25 October fix in `next.config.ts` adds only the exact `localhost:3000` origin when `CODESPACES=true`. Outside Codespaces the extra allowance is absent; no wildcard or disabled CSRF check is used. Stop the app with Ctrl+C, run `git pull --ff-only origin feature/m1-staff-offers`, then `npm run build && npm run start`. Reload the sign-in page before retrying. No container rebuild, dependency reinstall, database reset or password change is required. Verify sign-in, save and sign-out through Private port 3000; this proxy-specific fix still needs confirmation in the owner's Codespace.

- **Docker unavailable:** finish the rebuild and inspect its creation log. The corrected Node image was retained; Docker support is added through `ghcr.io/devcontainers/features/docker-in-docker:2`.
- **First image pull blocked/too large:** the pinned CLI wrapper selects Supabase's official GHCR mirror and supported slim Postgres images. This resolved the Codex registry restriction and vfs image-storage limit without disabling TLS/checksums.
- **Cloud Auth health probe uses proxy:** Codex Docker injects an egress proxy into containers; BusyBox's health probe sent its own loopback URL through it. `setup:local` installs a loopback-health-only routing wrapper in that owned Auth container, then requires native Docker health and actual Auth/Data API responses. External proxy routing/trust remains intact. No ignore-health-check flag is used in saved setup. Normal Codespaces does not need that Codex-specific helper.
- **Setup/database unavailable:** setup logs are under ignored `.local/`; inspect them privately and redact any credentials before sharing errors. Do not paste `supabase status` output. Check `docker ps` and rerun `npm run setup:local` after fixing the diagnosed prerequisite.
- **Credential IDs do not match:** setup preserves the existing database and credential file and stops rather than resetting them. This can follow deleting volumes while retaining `.local/`. Recover the intended volume/data before reinitialising; do not delete files as a blind retry.
- **Existing hosted settings:** setup refuses to replace a `.env.local` bound elsewhere. Keep those settings secure; the local script does not migrate or write a hosted project.
- **Old preview:** confirm the branch, stop the old server, rebuild and restart. Do not run two app servers on port 3000.

Screenshots: [M1 review sheet](screenshots/m1/README.md). They contain fictional offer content and no sign-in credentials. Native iOS/Android keyboards, Safari/Firefox and the owner's new Docker-enabled Codespaces rebuild still require review.

Implementation references checked during this task: Supabase's official [server-side client/cookie guidance](https://supabase.com/docs/guides/auth/server-side/creating-a-client) and [Postgres row-level security guide](https://supabase.com/docs/guides/database/postgres/row-level-security), retrieved through their official repository sources. SDK/SSR/CLI versions are pinned in `package-lock.json`; the implementation verifies users on the server and applies current cookie refresh cache headers.
