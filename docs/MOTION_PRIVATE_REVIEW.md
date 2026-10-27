# Private visual and motion review

Branch: **`design/media-one-motion-refinement`**, based on the latest fetched redesign at `3abd362`. The complete application, supplied assets and installed Taste Skill are retained. No main merge or public deployment. [Screenshots and recordings](screenshots/motion-refinement/README.md), [verification](MOTION_VERIFICATION.md), [implemented system](../DESIGN.md).

## Update your existing Codespace

Use the **same working Codespace** with its existing Supabase volumes, credentials, staff edits and original USD 5 total reservation ledger. This refinement requires **no new account, API key, database setup, migrations, dependency installation or container rebuild**. Do not reset/reseed the database, rerun setup/import, delete volumes or create another allowance.

1. Open your existing Codespace. Stop the running application with **Ctrl+C in its own terminal**. Leave Supabase/Docker running.
2. Open a terminal in the repository. Its usual Codespaces path is `/workspaces/media-one-connect`. Check for local edits:

   ```sh
   git status --short
   ```

   Preserve any listed local edits before switching branches. Do not use reset, clean, forced checkout or delete private files. The following commands assume a clean working tree.
3. Fetch the dedicated review branch explicitly:

   ```sh
   git fetch origin refs/heads/design/media-one-motion-refinement:refs/remotes/origin/design/media-one-motion-refinement
   ```

   First time opening this branch in your Codespace:

   ```sh
   git switch --track origin/design/media-one-motion-refinement
   ```

   If that local branch already exists, use instead:

   ```sh
   git switch design/media-one-motion-refinement
   git merge --ff-only origin/design/media-one-motion-refinement
   ```

4. Build and start a visual preview with paid calls disabled for this process:

   ```sh
   npm run build
   CONCIERGE_AI_ENABLED=false npm run start
   ```

   This does not edit your saved credentials/configuration or refund/reset/increase the ledger. If `node_modules` was removed independently, run `npm ci` before building; package dependencies are unchanged.
5. In **Ports**, set **3000 → Port Visibility → Private**, then select **Open in Browser**. If absent, choose **Forward a Port**, enter `3000`, keep it Private and open it. Do not forward database ports 54321/54322 or make the app public. Use the actual GitHub-authenticated forwarded URL, normally `https://<your-codespace>-3000.app.github.dev`. A server running inside Codex is not your preview URL.
6. Open that same URL on your iPhone, signed into the GitHub account allowed to access the Codespace. Keep the Codespace running. Resolve an access denial through the correct account/Private-port settings rather than switching to Public.

No phone app installation or service worker is required. To resume your pre-existing AI connection later, stop this visual-only process and use your previous normal startup command. Any intentional paid question must remain within the **remaining original USD 5 total allowance**. This visual task makes no paid calls and does not establish the balance in your separate Codespace. Concierge quality and the earlier voice review remain separate workstreams.

## What to review

- **Home header:** 56px plus any top safe area on phones, compared with 67px previously. Original proportional logo and 44px controls remain. The header is consistently compact, with no scroll threshold or collapse/expand flicker. Safari/browser chrome is not part of this measurement.
- **Featured venues:** leave Home untouched and watch Coco Lounge change to garden on 8 after about six seconds, then Ciao Bella and Qwerty. The entire picture/caption/link changes through a 600ms fade. A maximum 1.03 photo zoom stays inside the fixed frame. Controls and text do not zoom. Pause/play, four direct selectors and horizontal swiping work. There is only one active venue link.
- **Find your spot:** scroll until the rail is substantially visible. It becomes the sole autoplay owner, advances one card after about seven seconds, then settles at a native card boundary. The next card remains partially visible. It stops at the end; Play there explicitly returns to the start. Arrows, keyboard and normal horizontal swipes remain available.
- **Coordination:** only the substantially visible eligible section moves automatically. The showcase wins equal visibility. Leaving the viewport, hovering on desktop, hiding the tab or opening a modal temporarily pauses movement. Returning starts a fresh full interval. Touching, swiping, focusing or manually navigating a carousel stops that carousel until its own Play control is used. Ordinary tab navigation preserves those manual stops and selected positions.
- **Venue continuity:** tap a venue picture. Supporting browsers carry the exact selected photograph into its detail header. Slow/unsupported/reduced-motion navigation falls back cleanly. Direct links retain their default photograph; browser Back restores useful scroll position. Keyboard activation focuses the detail heading when the enhanced transition is used.
- **Supporting motion:** bottom-tab selection moves between destinations, buttons give brief pressed feedback, and sheets have a soft flat backdrop with a short entrance/exit. Native closing restores focus immediately. Home's entrance plays once per browser tab session, including across reloads, without hiding or disabling controls. No other sections continuously float or pulse.
- **Concierge:** pending dots only appear during a real pending request, and completed text appears together. No simulated streaming. Drafts remain in memory across ordinary tabs. A reader browsing older messages is not pulled downward by a new reply; New reply offers an explicit jump. The composer remains reachable when the viewport shrinks for a keyboard.

Reduced Motion disables all automatic advancement, zoom and travel; manual carousel controls and normal links still work. The play control explains its disabled state under that preference. No fictional promotion is reintroduced into normal guest presentation.

## Working features and limits

Existing authentication, staff edits/history, server permissions, eligible knowledge, published-offer testing and model API are retained. For staff review, use your existing private test accounts from ignored `.local/review-credentials.json`, opened only in the editor. The keys are `staff` and `unauthorised`; never share their values. Authorised offers remain at `/staff` and their clearly labelled persistence preview at `/staff/review`. Unauthorised accounts remain blocked. [Earlier frontend guide](FRONTEND_PRIVATE_REVIEW.md) gives the detailed save/reload workflow.

The recordings use actual browser interactions. The separately named chat fixture recording intercepts transport with an explicitly fictional response; it does **not** verify live AI or replace the real integration. Do not present it as a live generated answer. The visual preview's real concierge will report unavailability because paid calls are deliberately disabled.

One harmless `sessionStorage` Boolean, `media-one:home-entered`, prevents repeated entrances. It contains no guest information. Drafts, conversations, carousel positions/manual stops and the selected transition photo remain in memory; no new persistent conversation/profile storage. A full document reload resets carousel state, while the entrance stays seen for the tab session.

## Short real iPhone checklist

- [ ] Portrait/landscape: header/logo clearance, safe areas, useful first-screen content, image crops and no clipping.
- [ ] Leave each section untouched for 6–7 seconds. Scroll between them, background Safari for 20 seconds and return. Only one section advances, with no immediate catch-up.
- [ ] Tap, swipe or focus a carousel; confirm it stays stopped until Play. Try a mostly vertical gesture on the feature and rail without accidentally changing venues.
- [ ] Tap a photograph during/near a transition. The visible venue, caption and destination must agree. Test browser Back and the rail's restored position.
- [ ] Open/dismiss sheets repeatedly through close, backdrop and Escape with a keyboard. Check focus, VoiceOver and larger text.
- [ ] Enable Reduce Motion: no autoplay/zoom/travel, but selection/arrows/links still work.
- [ ] Chat: keyboard up/down, multiline text, rotation, tab navigation/draft return and reading earlier messages. Actual live replies require the separate existing allowance review; this preview does not make paid calls.

Linux WebKit coverage is useful Safari-engine evidence, not a substitute for the actual iPhone keyboard, browser toolbar, touch momentum, VoiceOver or operating-system backgrounding. Headless tab switching does not generate a real hidden tab; automated tests exercise the visibility event contract with simulated elapsed time. Background/resume on the iPhone remains manual.

## Suggested 87 second presentation walkthrough

Prepare the private guest tab and a separately signed-in staff tab beforehand. Keep credential files/password fields off screen. Use only fictional content in the staff demonstration. Check that any sourced answer chosen for the presentation is still within its managed review window.

| Elapsed time | Implemented action and explanation |
| --- | --- |
| 0–12 seconds | Open Home. Point out the compact app header and useful Concierge entry. Let the first featured venue change automatically. |
| 12–22 seconds | Pause, choose Ciao Bella manually, then use Play. Explain that the guest controls movement. |
| 22–34 seconds | Scroll to Find your spot. Let one seven-second advancement happen, then manually swipe or use the next-card control. |
| 34–45 seconds | Open a venue photograph, show the matching detail image and use browser Back to return to discovery. |
| 45–57 seconds | Open Hotel guide / Good to know. Expand a current answer and its source; explain that information is provisional and managed by staff. |
| 57–72 seconds | Open Concierge, type a draft, switch tabs and return. Identify it as AI; explain that this visual preview disables paid calls rather than faking an answer. |
| 72–87 seconds | In the prepared staff tab, save a small change to the fictional offer, reload Private test view and show persistence. Its label makes clear that it is not a genuine promotion. Restore original values afterwards if desired. |

Do not claim bookings, requests, notifications, membership, staff handover, production approval or improved AI answer quality from these interface changes.
