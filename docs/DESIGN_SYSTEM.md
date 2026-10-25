# Media One Connect guest interface system

Status: provisional interface specification, established before restyling on 25 October 2026. Scope: guest home and concierge first, with shared navigation/components for the remaining M0 screens. This is not a new official hotel brand manual.

## Authority and missing assets

The source available for this task is Ijlal's supplied excerpt of the older brand guidance: charcoal `#3C474F`, deep pink `#D92745`, teal `#31657E`, light blue `#74CCD5`. No manual attachment, newer approved guide, official logo, font files or licensed photography is present in the workspace. Newer approved guidance takes precedence when supplied. An asynchronous question asks whether it changes the palette/typefaces; progress does not depend on an unanswered preference.

| Asset               | Current evidence                                      | Explicit temporary treatment                                                                                                         | Needed to finalise                                                |
| ------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| Logo                | No approved vector/raster artwork supplied            | Plain text “Media One Hotel”; remove the invented M0 m1 mark. Label text-only identity in the shell. No tracing or redraw.           | Approved SVG/PNG variants, clear space and small-size rules       |
| Typefaces           | No official names, webfont files or licences supplied | System sans-serif stack; label temporary typography in Profile and this document                                                     | Approved family/weights, licensed web files and language coverage |
| Photography         | No approved/rights-cleared photos supplied            | No hotel imagery or imitation brand photography; use functional icons and content cards. Remove the decorative M0 hero illustration. | Approved crops, usage rights and descriptive alt text             |
| Current brand guide | Only the quoted historical colours                    | Palette treated as provisional; no invented brand rules described as official                                                        | Newest approved manual/version and owner confirmation             |

The UI's layout, spacing, icons and semantic tokens below are implementation choices for review, not claims about official Media One identity.

## Guest structure

Five persistent guest destinations, in this order:

| Tab       | Route                                         | Purpose and current scope                                                                                                                                                                                   |
| --------- | --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Home      | `/`                                           | Compact welcome, immediate concierge entry, hotel details and useful journey links                                                                                                                          |
| Explore   | `/explore`, with `/hotel` in the same section | Hotel information and future dining/booking/review discovery; existing M0 module explanations remain available                                                                                              |
| Concierge | `/concierge`                                  | Conversation-first scripted demo; four preserved sample replies and reset. Local text composer demonstrates keyboard layout, not a model/backend connection. Unknown text gets an honest scripted fallback. |
| My Stay   | `/my-stay`                                    | Planned bookings/requests explanation. No invented room number, reservation, guest identity or request status                                                                                               |
| Profile   | `/profile`                                    | Planned membership/account explanation and demo/asset information; no pretend sign-in or member card                                                                                                        |

Staff access sits in a separate “For the hotel team” utility area in Profile, not in the five guest tabs. `/staff` uses a distinct staff-demo header and return-to-guest link, without guest bottom tabs. Desktop exposes the same guest structure as a compact sidebar; it does not become a promotional website.

Home journey links navigate to the corresponding planned area. They explain missing functionality rather than pretending to submit a request, book a room or join a scheme. Status language is “Demo”, “Fictional sample”, “Planned” or “Not connected”; never “confirmed” or “sent” without a real action.

## Visual tokens

| Token               | Value/use                                                                                                     |
| ------------------- | ------------------------------------------------------------------------------------------------------------- |
| Charcoal            | `#3C474F`: main text, headings, navigation                                                                    |
| Deep pink           | `#D92745`: primary concierge/send actions and selected tab emphasis; pair with a shape/label for active state |
| Teal                | `#31657E`: secondary information, links and focus ring                                                        |
| Light blue          | `#74CCD5`: decorative/accent surfaces with charcoal text, not small light text on white                       |
| Surface / canvas    | `#FFFFFF` / `#F5F6F7`: neutral implementation choices                                                         |
| Muted text / border | `#59656D` / `#DCE1E4`: neutral implementation choices                                                         |
| Tinted pink / blue  | `#FCECEF` / `#EAF4F6`: derived interface tints, not additional official brand colours                         |

Verify normal text combinations meet WCAG AA 4.5:1, large text 3:1; do not use light blue on white for essential text. Colour is accompanied by text, icon and active indicator. White on deep pink measures 4.85:1; charcoal on white 9.52:1; muted text on canvas 5.53:1; teal on the blue tint 5.70:1. Pink text on pink tint measures only 4.25:1, so selected tinted navigation and demo badges use charcoal text with pink icon/indicator emphasis. Use semantic CSS variables so newer approved guidance can replace tokens centrally.

Typography: temporary system sans-serif, body/input 16px, secondary 14px, badges/nav labels at least 12px; 1.5 body line height. Phone h1 28px, h2 20px, card title 16–18px. Desktop h1 up to 32px. No promotional display-scale headline. App content width is constrained for reading, with the conversation column narrower than a marketing page.

Spacing scale: 4, 8, 12, 16, 20, 24, 32px. Screen gutters 20px (16px on very narrow screens). Cards use 16–20px padding and 12–16px radii, 1px borders and restrained shadows. Minimum interactive target 44×44px; primary actions/composer controls 48px. Focus rings remain visible with 3px teal outline and offset. Respect reduced-motion preferences.

## Navigation, conversation and keyboard behaviour

The app occupies the visible viewport; only the content area scrolls. The five-item bottom bar is outside that scrolling area, has labelled icons, an active pill plus `aria-current`, and bottom safe-area padding. Each tab has at least a 44px touch area at 320px width. Desktop uses the same destinations in a sidebar. Every page reserves room for persistent navigation; no content sits beneath it.

The conversation screen has a compact title/status and reset action, a scrollable live transcript, sample-question controls and a labelled local composer. Sample questions are grouped in a collapsed “Sample questions” disclosure to keep the conversation usable on short viewports; controls remain accessible without opening a keyboard. New replies scroll the transcript to the latest message. Reset and reload clear the local history. No persistence, provider request, personal identity or booking/handover is added.

Use `100dvh` plus VisualViewport resize/offset updates so the app shell, composer and bottom bar fit above an on-screen keyboard where the browser exposes visual viewport geometry. Include `viewport-fit=cover` and `interactive-widget=resizes-content` as progressive enhancements. The composer input is 16px to avoid iOS focus zoom. Tiny/landscape viewports can scroll the content rather than overlap actions. Do not hide the guest navigation solely because an input is focused.

Automation will resize the visible viewport with a focused composer to simulate keyboard space loss and check tab/composer bounds. This does not establish real iOS/Android IME behaviour; include actual-phone keyboard checks in owner review. No artificial keyboard image is presented as a device test.

## Verification and review scope

Preserve all four M0 scripted answers, reset/reload behaviour, fictional labels, future-module explanations, read-only staff shell and 404 recovery. Test routes and active states at desktop/phone/320px widths; touch sizes, keyboard navigation, focused-composer reduced-height layouts, transcript scrolling and no horizontal overflow. Capture guest home and concierge at phone and desktop widths. Update the private Codespaces guide with the review branch and exact restart steps. No redesign result implies a live backend, real staff session, hotel policy approval or official brand approval.
