# Private frontend review

Branch: **`design/media-one-app-redesign`**, based on `e80d0aa` from the latest fetched working M2A application. No merge into main or public deployment. This is a complete frontend implementation proposed for owner review. [Screenshots](screenshots/frontend-redesign/README.md), [implemented design system](../DESIGN.md) and [verification record](FRONTEND_VISUAL_REVIEW.md).

## Manual setup in your existing Codespace

Use the **same Codespace** in which M1/M2A already work. Keep its database volumes, `.env.local`, private credentials and existing API settings. There is no new account, key, database, migration, installation package or trial setup for this redesign. Do not rebuild the devcontainer, reset Supabase, rerun setup or import over your staff edits just to review these changes.

1. Open your existing Codespace at github.com/codespaces. In its terminal, stop the running app with **Ctrl+C in the terminal running it**. Leave Docker/Supabase running.
2. Check for local work:

   ```sh
   cd /workspaces/media-one-connect
   git status --short
   ```

   If your editor already opens the repository terminal, the `cd` is unnecessary. If Git lists local edits, preserve those edits before switching; do not use reset, clean, forced checkout or delete private files. The commands below assume a clean working tree.
3. Fetch and open the new review branch. The first time in this Codespace:

   ```sh
   git fetch origin
   git switch --track origin/design/media-one-app-redesign
   ```

   If the branch already exists locally, use instead:

   ```sh
   git fetch origin
   git switch design/media-one-app-redesign
   git pull --ff-only origin design/media-one-app-redesign
   ```

4. Build and start a **visual review with paid model calls disabled**:

   ```sh
   npm run build
   CONCIERGE_AI_ENABLED=false npm run start
   ```

   This temporary process setting does not edit your saved key, account configuration or reservation ledger. It makes Concierge show an honest unavailable response when you send a question. The redesign does not substitute scripted answers. Keep this setting for visual/phone review. Dependencies are unchanged; if `node_modules` was removed, run `npm ci` once before building.
5. In the Codespaces **Ports** panel, find **3000**. Right click its visibility and set **Private**, then choose **Open in Browser**. If it is absent, choose **Forward a Port**, enter `3000`, and keep it Private. Do not forward database ports 54321 or 54322. The GitHub-authenticated forwarded URL, normally `https://<your-codespace>-3000.app.github.dev`, is the review URL. A development server inside Codex is not an accessible preview URL for you.
6. Open that exact URL on your iPhone and sign into GitHub with the account allowed to access the Codespace. Keep the Codespace running. If GitHub access is denied, check that account and Codespaces port visibility; do not make the port public to bypass authentication.

To resume the existing AI connection later, stop this visual-review process and use your previous start command without the temporary `CONCIERGE_AI_ENABLED=false` override. Only do that for intentional model review within the **remaining original USD 5 total allowance**. Do not create another allowance, reset reservations or enable calls in a second environment. This task made no billable calls and does not establish your remaining Codespaces balance. [Earlier voice review](CONCIERGE_VOICE_REFINEMENT_REVIEW.md) remains a separate workstream.

## What to inspect

1. **Home → Explore → each venue.** Check the compact first screen, real photography and useful shortcuts. Every detail screen has a back link and a correctly scoped Concierge link. `garden on 8` stays lowercase. M12go has text rather than an invented photo or official logo.
2. **Hotel guide → Good to know.** Expand answers and source details. Search for `cancellation`, then a nonsensical string to see the empty state. Navigate away and use browser Back: search and useful scroll position should remain in memory. Reload fetches current eligible content. Expired source records may legitimately disappear at their existing review deadlines; no stale fixtures replace them.
3. **Concierge.** Enter an unfinished question, switch tabs, return and check the draft. Send a general hotel question: with this visual-review command it should fail honestly and offer the guide. Open/close the venue sheet, change venue, and clear a conversation. New questions still use the real server endpoint; no visual fixture is installed into the application.
4. **Utility button.** Check Stay help and About your visit. They are useful unavailable states, not real reservations, membership or requests. No account is needed for browsing or Concierge.
5. **Staff sign-in → offers → knowledge → private test view.** Follow the staff steps below. Staff screens have separate navigation; guest tabs do not appear there.

## Existing staff and data workflow

Open ignored `.local/review-credentials.json` **in your private Codespaces editor** for the existing `staff` and `unauthorised` test accounts. Never paste the values into chat, screenshots or Git. Use fictional test content only.

- Visit `/staff/sign-in`; sign in with the authorised staff account. Open `/staff`, note the original offer values, change its title by adding a small fictional review marker and save. Keep dates and conditions intentional. Open **Private test view** (`/staff/review`) in another tab and reload. A published, in-date fictional offer should show the saved title with a clear fictional label. Restore the original values after your check if you want them retained.
- Normal guest Home and Hotel pages no longer show fictional offers. Concierge also withholds a response supported by fictional promotion evidence and explains that current offer details are unavailable. This is a frontend presentation rule: existing offer RLS/API eligibility and testing permissions are preserved. `/staff/review` is protected by verified staff access, not merely hidden in navigation.
- In **Manage hotel knowledge**, choose an existing record to inspect its source, publication status, review/validity dates and version history. If testing edits, use an explicitly fictional record and retain its fictional label. Such records appear only in the protected knowledge review, not normal guest browsing. Use the existing M2A guide for deliberate real provisional content updates/replacements; do not publish test claims as sourced hotel facts.
- Sign out and use the `unauthorised` account. Expect **Access not granted** and no editing form. In a separate signed-out window, `/staff/review` must redirect to sign-in. Signing in alone never grants venue permissions.
- Reload the normal guide after an intentional eligible source edit: it should read current content. Draft, held, expired, archived and replaced predecessors remain excluded by existing database rules. Tests exercised these rules; the redesign does not bypass them or claim factual production approval.

## Short real iPhone checklist

- [ ] Portrait and landscape: header, useful first-screen actions, crops, bottom safe area and no horizontal clipping.
- [ ] Open the chat keyboard, type multiple lines, dismiss it and rotate. Composer stays reachable; tabs return after dismissal. Check Safari's expanding/collapsing browser chrome.
- [ ] Use tabs and browser Back. Unsent draft, conversation and guide search stay during ordinary navigation; reload clears transient conversation state.
- [ ] Scroll an existing conversation upward while a reply is pending during a separately authorised live review. A new reply must not pull you down. Visual automation checked this with an explicit transport fixture only.
- [ ] Sheets: close button, outside tap, scrolling, VoiceOver labels/focus and optional hardware-keyboard Escape/Tab. Try larger system text and Reduce Motion.
- [ ] Staff forms: readable dates, visible validation, successful save, private-view reload and unauthorised denial. Do not record password fields or private account details.

## Work performed and remaining limits

Implemented all existing guest/staff routes, five venue details, shared navigation, photo derivatives, supplied regular fonts, transient navigation/chat state and meaningful error/empty states. Preserved backend source/configuration, credentials, database business values and access/budget state. No database reset, service worker, dependency change, real guest data, paid model call or public preview was introduced.

Executed checks and screenshots are detailed in [the verification record](FRONTEND_VISUAL_REVIEW.md). Chromium viewport simulations are not native iPhone, Safari or complete assistive-technology acceptance. Brand/rights approval, a dedicated M12go photograph, Arabic typography and additional real font weights remain open. Existing concierge answer-quality/voice questions and M2B requests/handover are separate workstreams; visual approval does not resolve them.
