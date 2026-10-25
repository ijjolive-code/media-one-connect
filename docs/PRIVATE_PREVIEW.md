# Review the branded mobile guest interface privately

The app running inside a Codex cloud task is not automatically reachable from your browser. A localhost address printed in this chat or task terminal belongs to the cloud machine, not your computer. No live preview URL has been issued by this Codex session: no port-sharing or private-hosting tool is available here.

## Browser-only method: your own GitHub Codespace

Prepared branch: `design/brand-reference-pass` in `ijjolive-code/media-one-connect`. This method does not require installing tools on your computer or publishing a website. It requires GitHub access to the branch, Codespaces enabled for your account/repository, and available Codespaces quota or billing. No paid resource is created by this task. The container configuration is included, but a new Codespaces launch has not been verified from this environment.

1. Sign in to GitHub with the account that can access this repository. Open the [redesign branch](https://github.com/ijjolive-code/media-one-connect/tree/design/brand-reference-pass). The final task report confirms the branch push. This is a source-code branch, not a deployed website.
2. On that branch, select the green **Code** button, then **Codespaces**, then **Create codespace on design/brand-reference-pass**. If GitHub asks about billing or Codespaces is disabled, stop there; account quota/access must be resolved before this preview method can work. You can still inspect the screenshots in this branch without Codespaces.
3. Wait for the browser editor and terminal to load. The included `.devcontainer/devcontainer.json` selects Node 24, installs locked dependencies with `npm ci`, and requests port 3000 forwarding. Wait for dependency installation to finish. If it failed, open **Terminal → New Terminal**, run `npm ci` and read the error before continuing.
4. In the terminal, paste:

   ```sh
   npm run build && npm run start
   ```

   Wait until the server says it is ready. Leave that terminal running. These are the production build/start commands tested in Codex; no database, model key or other secret is needed for M0.
5. Open the **Ports** tab in the bottom panel, next to Terminal. If port **3000** is missing, click **Add Port**, enter `3000`, and press Enter. Right-click that port and confirm **Port Visibility → Private**. Keep it private; do not select Public or organization-wide visibility.
6. On the port 3000 row, click the globe / **Open in Browser** action. Use the forwarded HTTPS address GitHub supplies, which normally ends in `.app.github.dev`. This generated address is your preview URL. Sign in to GitHub if prompted. Do not manually invent a URL or use the Codex task's localhost address.
7. Review Home and Concierge first, then use the five guest destinations. Staff demo is separate under Profile → For the hotel team. The private port protects access to the preview through GitHub; it does not turn the staff shell into an authenticated staff portal. The app itself deliberately has no sign-in or real records in M0.
8. When finished, stop the Codespace from GitHub's Codespaces page to stop compute usage. Restart it and rerun `npm run start` to inspect again; rebuild first after code changes. A closed preview tab does not stop the Codespace.

For a phone inspection, open the same forwarded URL on your phone while signed in to the owning GitHub account. A private URL is not a shareable invitation for arbitrary testers. Invited multi-user testing needs a separately configured protected deployment or an explicitly authorised sharing approach later.

If **Codespaces** is unavailable, the missing setup is GitHub Codespaces access/quota, or a chosen hosting account with access-protected preview deployments. This task does not expose a public tunnel or deploy publicly as a substitute. A hosting choice is unnecessary for building the next local slice.

Official reference checked during M0: [GitHub — Forwarding ports in your codespace](https://docs.github.com/en/codespaces/developing-in-a-codespace/forwarding-ports-in-your-codespace). Its official repository source confirms browser access through forwarded ports and the visibility controls. The prepared container uses a Node 24/bookworm variant listed by the official devcontainers image manifest. Actual Codespaces account access, image pull, launch and private URL authentication remain to be verified by the owner.

## Update an existing M0 Codespace

Use this if you already inspected the first M0 build. Stop your app server with **Ctrl+C in its own terminal**. In the repository terminal run `git status --short`. If it lists local edits, preserve them before switching; do not reset or overwrite them just to get the preview working.

For a clean checkout, run:

```sh
git fetch origin
git switch --track origin/design/brand-reference-pass
npm ci
npm run build && npm run start
```

If the redesign branch already exists locally, use `git switch design/brand-reference-pass` and `git pull --ff-only` in place of the `git switch --track` line. A failed switch/pull needs diagnosis; do not force it. Confirm port 3000 is still **Private** and reopen its browser link. Reload the preview tab. The first screen should show the supplied white Media One Hotel logo on charcoal, “Welcome to your stay.”, pink concierge access, the real lobby thumbnail and Home / Explore / Concierge / My Stay / Profile navigation. If it still shows the old layout, confirm `git branch --show-current` reports `design/brand-reference-pass` and that the old server stopped before the new build/start.

## Short inspection checklist

- [ ] On a phone, Home shows a concise welcome, immediate concierge access, hotel information and three planned journey cards. No room, request or membership is claimed to be connected.
- [ ] Use all five bottom tabs and check the selected label/icon. Scroll Home/Explore: the bar should stay available. Hotel information belongs under Explore.
- [ ] In Concierge, open **Try a sample question** and try all four examples. Reset/reload should clear history. A different typed message must say the demo cannot perform actions; it must not claim to book or contact staff.
- [ ] On a real phone, tap the composer to open the keyboard. Check the composer and all five navigation tabs remain reachable; send a sample message, scroll the transcript and dismiss the keyboard. Repeat in landscape. This native keyboard check is still pending; automated reduced-height tests are not physical-device evidence.
- [ ] Go to Profile → **For the hotel team → Staff workspace demo**. Staff access is separate from guest navigation; it remains read-only and unauthenticated. Return to the guest app through its explicit link.
- [ ] Review the actual logo on charcoal and the real lobby thumbnail. Check that the photo is not labelled fictional. System typography remains temporary: Chartwell Bars/Geomanist files and licences are still needed. The supplied older manual remains provisional; newer approval and public-use rights have not been verified.

See [the screenshot review sheet](screenshots/brand-pass/README.md) for phone/desktop captures and a clearly labelled reduced-height simulation. Earlier M0 and app-first images elsewhere in `docs/screenshots/` are historical, not the current branded pass. The supplied PDF and source notes remain outside `public/`. Do not expose the preview publicly merely because real logo/photo assets are now present.

## Local-computer alternative

Only if you choose to run it on your own computer: install Node 24, clone/switch to this branch, then run `npm ci` and `npm run dev` in the checkout. In that case, the localhost address printed in your own computer's terminal is accessible from that computer. This is separate from the browser-only Codespaces method above.

## Recovery mode: npm command not found

If Codespaces reports recovery mode and `npm: command not found`, diagnose the container creation failure before running app commands. The branded branch previously retained the invalid image tag `javascript-node:1-24-bookworm`; it was corrected on 25 October 2026 to `mcr.microsoft.com/devcontainers/javascript-node:24-bookworm`. The old tag returned HTTP 404 and the replacement manifest HTTP 200 at verification. Registry availability is not proof that a Codespace completed startup.

In the existing recovery terminal, while on `design/brand-reference-pass`:

1. Run `git status --short`; preserve any reported local edits.
2. Run `git pull --ff-only origin design/brand-reference-pass`. If this fails, stop and share the error rather than forcing or resetting.
3. Use Cmd/Ctrl+Shift+P → **Codespaces: Rebuild Container**. A Full Rebuild is not required for this fix.
4. After successful rebuild, open a new terminal and run `node --version` and `npm --version`.
5. Run `npm ci`, then `npm run build && npm run start`. Wait for readiness, then reopen **Private** port 3000.

If recovery mode returns, open **Codespaces: View Creation Log** and share the first error and surrounding lines. Do not install Node manually into the recovery container as a substitute for fixing the configuration. Actual recovery and private preview must be confirmed in the owner's Codespace.
