# Open the M0 application privately from Codex web

The app running inside a Codex cloud task is not automatically reachable from your browser. A localhost address printed in this chat or task terminal belongs to the cloud machine, not your computer. No live preview URL has been issued by this Codex session: no port-sharing or private-hosting tool is available here.

## Browser-only method: your own GitHub Codespace

Prepared branch: `m0/media-one-foundation` in `ijjolive-code/media-one-connect`. This method does not require installing tools on your computer or publishing a website. It requires GitHub access to the branch, Codespaces enabled for your account/repository, and available Codespaces quota or billing. No paid resource is created by this task. The container configuration is included, but a new Codespaces launch has not been verified from this environment.

1. Sign in to GitHub with the account that can access this repository. Open the [M0 branch](https://github.com/ijjolive-code/media-one-connect/tree/m0/media-one-foundation). The branch must be pushed before this link works; the task's final report confirms whether that succeeded.
2. On that branch, select the green **Code** button, then **Codespaces**, then **Create codespace on m0/media-one-foundation**. If GitHub asks about billing or Codespaces is disabled, stop there; account quota/access must be resolved before this preview method can work. You can still inspect the screenshots in this branch without Codespaces.
3. Wait for the browser editor and terminal to load. The included `.devcontainer/devcontainer.json` selects Node 24, installs locked dependencies with `npm ci`, and requests port 3000 forwarding. Wait for dependency installation to finish. If it failed, open **Terminal → New Terminal**, run `npm ci` and read the error before continuing.
4. In the terminal, paste:

   ```sh
   npm run build && npm run start
   ```

   Wait until the server says it is ready. Leave that terminal running. These are the production build/start commands tested in Codex; no database, model key or other secret is needed for M0.
5. Open the **Ports** tab in the bottom panel, next to Terminal. If port **3000** is missing, click **Add Port**, enter `3000`, and press Enter. Right-click that port and confirm **Port Visibility → Private**. Keep it private; do not select Public or organization-wide visibility.
6. On the port 3000 row, click the globe / **Open in Browser** action. Use the forwarded HTTPS address GitHub supplies, which normally ends in `.app.github.dev`. This generated address is your preview URL. Sign in to GitHub if prompted. Do not manually invent a URL or use the Codex task's localhost address.
7. Test the guest homepage and navigation, then Demo concierge and Staff demo. The private port protects access to the preview through GitHub; it does not turn the staff shell into an authenticated staff portal. The app itself deliberately has no sign-in or real records in M0.
8. When finished, stop the Codespace from GitHub's Codespaces page to stop compute usage. Restart it and rerun `npm run start` to inspect again; rebuild first after code changes. A closed preview tab does not stop the Codespace.

For a phone inspection, open the same forwarded URL on your phone while signed in to the owning GitHub account. A private URL is not a shareable invitation for arbitrary testers. Invited multi-user testing needs a separately configured protected deployment or an explicitly authorised sharing approach later.

If **Codespaces** is unavailable, the missing setup is GitHub Codespaces access/quota, or a chosen hosting account with access-protected preview deployments. This task does not expose a public tunnel or deploy publicly as a substitute. A hosting choice is unnecessary for building the next local slice.

Official reference checked during M0: [GitHub — Forwarding ports in your codespace](https://docs.github.com/en/codespaces/developing-in-a-codespace/forwarding-ports-in-your-codespace). Its official repository source confirms browser access through forwarded ports and the visibility controls. The prepared container uses a Node 24/bookworm variant listed by the official devcontainers image manifest. Actual Codespaces account access, image pull, launch and private URL authentication remain to be verified by the owner.

## Short inspection checklist

- [ ] Open Discover at desktop and phone widths; see the fictional-data banner and no horizontal scrolling.
- [ ] Open Hotel information; confirm all arrival/departure information is labelled fictional.
- [ ] In Demo concierge, try all four sample questions. Confirm booking/staff replies say no action was taken. Reset the demo, then reload; history should clear.
- [ ] Open Staff demo; confirm it is a read-only shell, has no working login or staff actions, and shows no real records or invented live statistics.
- [ ] Open Coming next; confirm the five future modules are clearly planned and unavailable.

## Local-computer alternative

Only if you choose to run it on your own computer: install Node 24, clone/switch to this branch, then run `npm ci` and `npm run dev` in the checkout. In that case, the localhost address printed in your own computer's terminal is accessible from that computer. This is separate from the browser-only Codespaces method above.
