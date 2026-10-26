# M2A private review: managed knowledge and free-text concierge

Branch: `feature/m2a-knowledge-concierge`, based on the latest M1 branch at `398d6c4`. M1 passed Ijlal's manual Codespaces review. The corrected Node devcontainer, Docker feature and Codespaces sign-in origin fix are retained.

## Current voice refinement

The guide branch is incorporated. Read [voice refinement review and exact update steps](CONCIERGE_VOICE_REFINEMENT_REVIEW.md) for guide v0.1/runtime `media-one-voice-0.2`. It adds composed replies, bounded context and protected factual checks. The original selection-only description below is superseded where indicated. Owner screenshots establish limited earlier live location/check-in/out selection; the new voice contract is not live-verified. A secure key binding is now present in Codex, but no paid call was made in this refinement and the remaining Codespaces allowance was not inspected. Continue using the existing private Codespace/ledger, never a second allowance.

[Proposed M2B plan](M2B_REQUESTS_HANDOVER_PLAN.md) covers requests, ownership, proactive handover and purpose-limited contact; none is implemented by these guides.

## Implemented here

- Real local Supabase persistence, staff authentication, venue permissions, FAQs/facilities/policies, sources, publication scope, Dubai validity/review dates and saved version history.
- Additive import of **only 82 candidate records**, across six venues, from `origin/content/provisional-knowledge-2026-10-25` at `844eb0c292789d1ceaaac563cbbdfd00a02b92f7`. Original source metadata and import snapshots are retained privately. The 13 held records and conflict register are reference files only, never imported into guest retrieval.
- A free-text Responses API integration using fixed model `gpt-4.1-mini-2025-04-14`, called only on the server. The model composes a guest reply using eligible evidence. Protected monetary content and policy qualifications must remain intact; deterministic checks reject known unsupported values/actions and style violations, but do not prove semantic correctness. At most six recent messages/4,000 characters are untrusted context, never factual evidence. Every turn fetches current eligible facts. It does not calculate prices, infer conditions or execute actions.
- Current published/in-date M1 offers are included from the existing database and remain explicitly fictional. The old M0 hotel sample fields are not AI evidence. Provisional sourced facts have their own label and private-prototype scope. Reviewed publication means reviewed for this prototype, not production approval.
- Atomic replacement suppression, stale-edit detection, eligibility recheck before returning an answer, private credentials, persistent trial allowance and honest provider/error states.

**Live review status:** owner-observed location/check-in/out replies establish limited earlier connectivity. The composed voice revision remains unverified with a live model. Offline parsing/validation/UI fixtures are not actual generated conversations. No paid call was made here; Codespaces usage/reservations must be checked in that existing environment. The secure key requirement is already satisfied in this Codex runtime but trial flags remain disabled here.

## Manual setup: private Codespaces review

Only these actions require your own Codespace/account. Do not delete your existing Codespace, `.env.local`, `.local` or database volumes: that would discard development data. Setup never runs `db reset` or overwrites existing offers/knowledge edits. A new Codespace creates a new development database; it does not restore your existing edits automatically.

1. Stop your app in its terminal with **Ctrl+C**. Run `git status --short`; preserve local changes before switching. For a clean checkout:

   ```sh
   git fetch origin feature/m2a-knowledge-concierge:refs/remotes/origin/feature/m2a-knowledge-concierge
   git switch --track origin/feature/m2a-knowledge-concierge
   ```

   If that local branch already exists, use `git switch feature/m2a-knowledge-concierge`, then `git pull --ff-only origin feature/m2a-knowledge-concierge`. Do not force a failed switch/pull. M1's working container configuration is unchanged; another rebuild is unnecessary if your M1 Docker-enabled container already works. A new Codespace must use the corrected `javascript-node:24-bookworm` container and Docker feature.

2. In the Codespaces terminal:

   ```sh
   npm ci
   npm run setup:local
   npm run concierge:trial -- --status
   npm run build && npm run start
   ```

   Wait for database readiness **and** the 82-candidate import/preserve message. This applies additive migrations and imports missing records; repeated setup preserves edits, replacements and consumed budget. The existing three test accounts remain in ignored `.local/review-credentials.json`; open that file only in your private editor. Do not paste credentials into chat or screenshots.

3. Open **Ports → 3000 → Port Visibility: Private → Open in Browser**. Use GitHub's generated HTTPS address, not localhost from this Codex task. Keep Supabase ports 54321/54322 unforwarded. There is no public tunnel or deployment. Both sourced knowledge and model access are authorised only for this private prototype.

4. Open `/hotel/knowledge` to inspect eligible source facts without a model. Open `/staff/sign-in`, sign in using the private `staff` entry, then choose **Manage hotel knowledge** from `/staff`. The seeded account manages only Media One Hotel; it does not gain access to all outlet records. Anonymous users redirect to sign-in; the `unauthorised` account receives **Access not granted**.

5. Without model setup, `/concierge` must state **AI not connected**. Sending free text must say no model answer was generated, with a published-knowledge link. This is the expected disconnected state, not a completed live AI review.

## Manual setup: API account and private key

OpenAI API billing is separate from Codex/ChatGPT. Ijlal authorised **USD 5 total**, with **no automatic reset/increase**; further funding or a larger app allowance requires his approval. No paid account or charge was created here.

1. Sign in at [OpenAI Platform](https://platform.openai.com/). Create a dedicated project for this private trial. Check its model access and the official [API pricing page](https://openai.com/api/pricing/). The pinned snapshot must be available and its standard text rates must be **no higher than USD 4 per million input tokens and USD 16 per million output tokens**. These are conservative code limits, not a claim about today's prices. Do not switch models or enable calls if either limit fails.
2. Configure billing with automatic recharge **off**. Use an existing approved balance, or add no more than the authorised USD 5. If the platform requires a larger payment, stop and obtain approval. Set a USD 5 project budget/alerts if available, but do not assume the provider budget is a hard spending cutoff. Do not use this project's key elsewhere or run separate API experiments against it.
3. In that project's **API keys**, create a dedicated secret key. Restrict it to the needed Responses endpoint/model where the platform offers those controls. Copy it directly into a private secret field; never into chat, a shell command, a screenshot, Git or a `NEXT_PUBLIC_` setting.
4. For **Codespaces**, open GitHub **Settings → Codespaces → Secrets → New secret**, name it **`CONCIERGE_OPENAI_KEY`**, paste its value privately and allow only this repository. Stop/restart the Codespace when prompted so a new terminal receives it. Check presence without printing its value:

   ```sh
   node -e 'console.log(process.env.CONCIERGE_OPENAI_KEY ? "API key is present" : "API key is missing")'
   ```

   If you prefer a local-only setting in the existing Codespace, open ignored `.env.local` in the private editor and add `CONCIERGE_OPENAI_KEY=` followed by the secret value there. Do not use an `echo` command containing the key. Keep the file private; setup preserves it. Environment secrets take precedence over file values, so avoid configuring two different keys.
5. For **Codex cloud instead**, the environment configuration draft already declares `CONCIERGE_OPENAI_KEY` with destination `api.openai.com`. Enter the value securely in its environment settings and apply the supported configuration/runtime update. Saving the draft alone does not supply the key, publish the environment or prove connectivity. Its proxy-backed secret is for the allowed provider destination; do not copy its placeholder into Codespaces. Codespaces needs its own private binding from step 4.
6. Only after the rate check and key configuration, stop the app and run:

   ```sh
   npm run concierge:trial -- --enable --confirm-rate-ceilings
   npm run build && npm run start
   ```

   Enabling does not itself call the provider. The page says **AI configured · not yet checked** until an actual answer succeeds. Authentication/quota/model errors remain failures; no alternate model or fake answer is substituted. Do not share full provider errors or request logs containing secrets.

## How the USD 5 allowance works

- A private Postgres row locks and reserves **USD 0.12 before every provider attempt**. Total reservations cannot exceed USD 5: at most **41 attempts, USD 4.92 reserved**. Failed calls, timeouts and interrupted answers keep their reservation. There are no retries, refunds, daily/monthly resets or automatic increases.
- The model is fixed; requests are limited to 24,000 UTF-8 bytes, output to 600 tokens, with no tools. The conservative calculation allows 26,000 input tokens including overhead: at the required rate ceilings, USD 0.104 input + USD 0.0096 output = USD 0.1136, below the USD 0.12 reservation. An oversized context fails before a provider call. Each attempt has a 12-second timeout.
- Limits also allow at most eight attempts per anonymous session per hour, two concurrent leases and 60 attempts per day. Session limits are supplementary; creating a new session cannot reset the total budget. Keep the port private: there is no public abuse-protection claim.
- `npm run concierge:trial -- --status` prints only total allowance and reservations. Reservations are deliberately an upper bound, not the provider invoice. Check actual project usage privately as well.
- To stop: `npm run concierge:trial -- --disable`, then restart the app. The database switch blocks new reservations immediately; an already authorised in-flight request may finish. Existing reservations remain charged. Revoke the dedicated API key in the platform when the trial ends.
- The allowance belongs to this development database. Do not reset/delete/clone the database or use a second Codespace to obtain another allowance. Before moving instances, reconcile the ledger and provider usage; a fresh database is not a new authorisation. The application cannot cap other uses of the same API key or provider-account charges. The USD 5 authorisation is for the whole trial across environments.

## Private review checklist

Start with the unconnected checks; complete the live section only after secure setup. Do not enter guest personal information.

- [ ] Confirm your previously edited M1 offer remains unchanged. Edit/save/reload once, then restore your desired content. Anonymous and unauthorised accounts must still be unable to edit it.
- [ ] In `/staff/knowledge`, create an explicitly **fictional** FAQ/facility/policy, with a source reference, review date today and review deadline seven days ahead. Publish for private review. Save, then choose **Reload saved version** before further edits. In another app-anonymous window, reload `/hotel/knowledge` and confirm exact wording and fictional label.
- [ ] Edit its answer, save, reload and open **Saved versions**. Both revisions should be recorded. Another already-open editor must reject a stale save rather than overwrite it.
- [ ] Draft/held/archived, future validity, review deadline reached, or expired validity must remove that record from eligible guest knowledge. Keep a short review window; a blank validity end is not permanent approval.
- [ ] Select an imported topic, such as **K009** (check-in/out). Inspect sources/history and use **Create reviewed replacement**. Wait for that heading before editing. Enter confirmed prototype wording and source, choose **Staff-reviewed**, publish with current dates, save and reload. Confirm its predecessor says **Replaced** and the guest sees only the replacement. Do not claim invented test wording is a real hotel policy. Holding/expiring the replacement must not revive the old source. Restore a suitable reviewed replacement for any topic you change.
- [ ] Choose each venue in guest knowledge/concierge. Information for unrelated venues must stay out of that venue's answers. Pool hours, parking charges and unverified allergens must not be invented. Source labels are provisional and remain visible.
- [ ] **Live connection:** send “Where is the hotel?” in your own words. Expect **AI CONCIERGE**, a composed reply, protected factual wording and a provisional qualification; open Sources and conditions for source IDs/original text. This consumes one reservation. If the connection fails, record it as a failure, inspect private account/access setup and do not repeatedly retry without a diagnosis.
- [ ] **Live staff-change verification:** create/publish a uniquely named fictional facility, ask about it, change a distinctive price/time/condition, save, then ask a fresh question. The answer must quote the new version only. Repeat once after publishing its reviewed replacement and confirm the predecessor is absent. These are separate paid attempts within the same total budget.
- [ ] **Live offers:** ask “What fictional demo offer is published?” Check exact current M1 title, dates and conditions. Change the offer and ask again; it must use the saved version. Unpublishing or expiring it must remove it from subsequent answers.
- [ ] Ask about a missing/disputed fact, a different venue, an allergy guarantee and a booking confirmation. Expect missing/limited information and no completed action. Check the trial status and provider usage after the small review; stop if behaviour is incorrect.
- [ ] Inspect phone and desktop layouts, keyboard reachability, source labels, clear errors and persistent guest navigation. Physical iOS/Android keyboards remain a manual check.

Imported deadlines are **1 November 2026 for 27 time-sensitive records**, **24 November 2026 for 55 others**, interpreted as exclusive review deadlines in Asia/Dubai. Facts disappear when their deadline arrives; review and replace them before the 5 January presentation. Old M0 sample policies remain separately fictional and are not concierge sources. Source collection dates and document modification dates do not prove current hotel approval.

## Verification and limits

Run from the checkout, with the local stack available and test port 3100 free:

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

Prepared Codex uses `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e`. Browser tests force paid calls off even if a key exists. Database tests use real Auth/Data API/RLS; budget/replacement stress fixtures roll back and do not spend/reset the owner's allowance. Tests restore original M1 offer fields, although audit/revision counters advance. Knowledge test fixtures are removed; private audit snapshots remain. Do not run mutation/restart tests during another person's review.

See the authoritative [progress record](../media-one-context/05_DECISIONS_AND_PROGRESS.md) for completed checks and [M2A screenshots](screenshots/m2a/README.md) for captures. No hosted Supabase project, public deployment, production approval, requests, staff handover, WhatsApp, loyalty or live bookings were added. Local volume persistence does not constitute a production backup plan. Live provider behaviour, actual billing and this branch in the owner's Codespace remain separately verifiable steps.
