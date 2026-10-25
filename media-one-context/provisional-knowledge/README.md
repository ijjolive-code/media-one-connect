# Media One Connect: provisional knowledge pack

Collected 25 October 2026, Asia/Dubai.

## Purpose and authority

Ijlal authorised gathering existing hotel/outlet information for temporary use while purpose-built, approved content is prepared. This pack provides 95 draft records: 82 private-prototype candidates and 13 review-only records. It also records 31 source references, 17 unresolved differences/gaps and 14 linked menu PDFs.

No live app/database content was changed by collecting this pack. No hotel approval, publication, live booking availability, private SevenRooms access or integration entitlement is implied.

## Files

- `prototype-candidates.json`: the 82 records eligible for explicitly labelled private-prototype use, with source references. Import only this file as the starting candidate set.
- `media-one-provisional-knowledge.json`: complete research dataset, including review-only records, conflict register, source coverage and menu-link index. Do not embed the entire file into guest retrieval.
- `GUEST_KNOWLEDGE.md`: readable version of the 82 candidates.
- `REVIEW_QUEUE.md`: unresolved differences. Staff/research reference only; never guest-answer context.
- `CODEX_IMPORT_TASK.md`: implementation handoff.

## Scope and coverage

Reviewed 18 official hotel pages (one room-offers page yielded only a title), four public SevenRooms experience indexes and four full experience descriptions, one WorldHotels/Best Western property listing, and four Drive documents.

The mapped current hotel navigation did not reveal a standalone published FAQ page. FAQ material came from Drive's `01 - FAQ`, modified June 2025. The main release was modified October 2026, the November release October 2026, and the new-website-copy document July 2026. Modification dates are metadata, not approval or effective dates.

Website sources cover hotel location/contact, rooms, accessible-room descriptions, facilities, meeting/event spaces, Ciao Bella, Qwerty, garden on 8, Coco Lounge and M12go. P7 Arena is an event-space record, not an additional pilot restaurant.

Public SevenRooms pages provide published offer descriptions and booking handoff links. No guest records, reservations, spend histories, private account/API data, live table availability or payment rules behind an unsubmitted booking modal were accessed.

The 14 menu PDFs were discovered through venue-page links. Their contents, current prices, ingredients and allergen keys were not parsed or validated. A menu link is not evidence that a meal is safe for an allergy.

Coverage is a bounded first collection, not an exhaustive crawl of every historical blog, PDF, event, social post or listing. Historical sports schedules and expired room deals were excluded. Search snippets were used to discover sources, not as the sole support for imported facts.

## Use in the private app

1. Treat source-derived records as **Provisional hotel information — awaiting review**. Keep existing fictional offers/fixtures separately labelled. Do not relabel the user's fictional AED 1 test offer as a real promotion.
2. Preserve record IDs, source IDs/URLs, collection date and review date. Source confidence means extraction/corroboration quality, not hotel approval.
3. Import records as drafts, or under a distinct private-prototype publication scope if implemented. Never set a general `approved` or production publication flag automatically.
4. Exclude every `review_queue_only` record and the review register from model retrieval. For partially disputed candidates, the answer already withholds the disputed component; preserve the note.
5. Do not treat `valid_from: null` or `valid_to: null` as proof of perpetual validity. Require a review before `review_after`; expired provisional information must stop being quoted as current. Prices/hours/recurring offers have a seven-day review window; other candidates a 30-day window. These are suggested review deadlines, not source-provided contractual dates.
6. Interpret all schedules in Asia/Dubai and preserve next-day closing times. No end date was invented for a recurring offer.
7. Missing information triggers an honest clarification/contact route. Never invent booking confirmation, free cancellation, a complimentary benefit, an allergy guarantee or an operational action.
8. Approved, current, venue-specific staff content must supersede imported provisional text. Retain history and `supersedes` links; do not overwrite edits when rerunning an import. Do not let stale source text return as an alternative answer after replacement.
9. Room-shopping/booking integration remains separate. Existing SynXis navigation includes 2023 dates and malformed query text; these URLs are quarantined rather than shipped. No clean booking URL was asserted as tested.
10. Do not connect or send to the hotel's published WhatsApp number; the pilot still uses a separate authorised test route.

## Priority review items

Pool hours vary within the facilities page and between sources. Guest parking is described as free in an old FAQ and AED 25/night by the affiliate. Qwerty's weekend opening, direct number and Grill & Chill package scope differ. Pet rules require separate room/terrace/day definitions. Legacy loyalty wording, old room offers and an invented existing-app reference remain in working copy and are excluded.

The source register gives actual retrieval URLs. Long SevenRooms `client_id` query strings are public attribution links, not private credentials; use the original short venue links for handoff. No booking was submitted.

## Replacement workflow

Use staff review to replace one topic at a time: confirm owner, wording, source, venue, publication scope, validity and conditions; save a new version; supersede provisional entries on that topic; verify the guest page and concierge use the new version. Keep the unresolved record out of the model until resolved.

## Repository upload authorisation — 26 October 2026

Ijlal explicitly authorised uploading this pack, including selected Drive-derived information, to ijjolive-code/media-one-connect for Codex to use. This authorises the specified repository upload and private-prototype development use; it does not approve the facts for production or public launch. No new source crawl was performed on 26 October; the collection date remains 25 October 2026.
