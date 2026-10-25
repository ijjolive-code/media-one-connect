# Media One Connect — provisional brand and mobile interface system

Updated 25 October 2026. Read this before UI changes. The brand source is the supplied **Media One Design Manual Version 1.02**, as described in [BRAND_REFERENCE_README.md](BRAND_REFERENCE_README.md), with 20 unchanged original pages in [the excerpt](brand-reference/Media_One_Design_Manual_Excerpt.pdf). The pack was added in commit `00163ad`; its reported Drive modified date is 1 March 2022, not an approval date. Ijlal confirmed the same colours still apply provisionally. Newer approval, public-use rights and asset currentness remain unverified. This document supersedes the earlier missing-asset assumptions in `docs/DESIGN_SYSTEM.md`; that file points here for the current system.

## Source page map

Page numbers below are printed original page numbers, not the excerpt PDF's 1–20 sequence. All supplied pages were read as extracted text and visually inspected as rendered pages.

| Original pages | Guidance used                                                                                                                                                                    |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 11             | Short, conversational, confident voice; no forced coolness, complicated wording or overhyped claims                                                                              |
| 12             | “Media One Hotel” for guest-facing hotel communication; Title Case                                                                                                               |
| 14–16          | Provided master/single/reverse artwork, original proportions; white reverse logo may sit on a clearly contrasting background                                                     |
| 17             | English logo clearance at least X, where X is the height of the logo's M                                                                                                         |
| 19             | Prose gives online minimum 65px; examples show 95px. Conservatively keep the visible artwork above 95px rather than relying on the padded image canvas width                     |
| 21             | No logo redraw, recolouring, filters, outlines, shadows, rotation or distortion                                                                                                  |
| 23             | Use explicit **Web** hex entries, not the separately printed, differing RGB values; charcoal and deep pink dominate, teal/blue accents used sparingly                            |
| 26–28          | Chartwell Bars English headings/subheadings; Geomanist body; GE Modern Arabic headings and Shilia Arabic body; print hierarchy adapted for app readability                       |
| 29             | Verdana/Microsoft Sans Serif fallback guidance is for office/email documents, not proof of an approved app font                                                                  |
| 31             | Media graphic device contains imagery/texture, not plain colour; not recreated or approximated for this app                                                                      |
| 63–68          | Authentic, natural photography. Lobby guidance on p65 avoids added filters/effects and preserves natural light/colour/texture; do not replace supplied imagery with cliché stock |

## Colour tokens

| Role    | Token                        | Value                | Use                                                                                       |
| ------- | ---------------------------- | -------------------- | ----------------------------------------------------------------------------------------- |
| Primary | `--charcoal`                 | `#3C474F`            | App header, main text and conversation identity                                           |
| Primary | `--pink`                     | `#D92745`            | Concierge/send actions, selected navigation, restrained message tints                     |
| Accent  | `--teal`                     | `#31657E`            | Focus ring and occasional secondary links                                                 |
| Accent  | `--light-blue`               | `#74CCD5`            | Optional small decorative accents with charcoal text; never essential light text on white |
| Neutral | `--canvas`, `--surface`      | `#F5F6F7`, `#FFFFFF` | UI surfaces; implementation choices, not additional official brand colours                |
| Neutral | `--muted`, `--line`          | `#59656D`, `#DCE1E4` | Secondary text and dividers                                                               |
| Derived | `--pink-tint`, `--blue-tint` | `#FCECEF`, `#EAF4F6` | Low-emphasis UI surfaces, not extra official brand colours                                |

Checked normal-text contrast: white/pink 4.85:1; white/charcoal 9.52:1; muted/canvas 5.53:1; teal/blue tint 5.70:1. Pink on pink tint is only 4.25:1: use charcoal text with pink icon/indicator for selected tinted labels. A colour is never the sole signal for status or selection. These pair checks do not certify the whole app as accessible.

## Typography and voice

Official intended roles: **Chartwell Bars** for English headings/subheadings and **Geomanist** for body text. The manual's rendered Chartwell sample is condensed lettering; do not infer a downloadable font variant from the name alone. No font binaries or accompanying web licences are supplied. Do not fetch similarly named substitutes, declare nonexistent `@font-face` sources, rename Apple `._` metadata as fonts, or claim official type is installed. Before future installation, inspect internal family/style names and compare rendered samples with p26–28.

Current app uses an explicitly temporary Arial/Helvetica/system sans-serif stack, identified in Profile and preview notes. It is a readable development fallback, not the manual's official type or an assertion that p29 approves app use. Official Arabic type and fluent language review remain outstanding; no Arabic interface is claimed.

App sizes: body/composer 16px with 1.5–1.65 line height; secondary text 14px; nav/badges at least 12px. Phone h1 28px (conversation 24px), section h2 20px, card labels 16px. Desktop h1 32px. Left-align UI/body copy. Do not mechanically apply p28's 11pt print body, 600 headline tracking, tight 4/5 leading or centred/justified blocks to chat or controls. Copy stays concise and practical; humour is optional, never forced.

## Actual logo treatment

The supplied `media-one-logo.png` is **2424×1062 RGBA**, with white opaque artwork and transparent padding. Visible alpha bounds are x361–2063, y351–713. Preserve the entire canvas and original bytes; no cropping, recolouring, CSS filters, shadows or recreation. On the charcoal app header the white artwork has strong contrast. Do not place this white asset on a white surface.

The original padding is retained as clear space. Approximate M height in source artwork is 261px; canvas margins are at least 349px, exceeding 1X. At normal phone width render the whole canvas 180px wide (visible artwork about 126px); desktop 208px (about 146px); compact-height screens 144px (about 101px visible). All exceed the conservative 95px visible minimum from p19's examples. Use intrinsic image proportions and `height:auto`. Keep badges and text outside the image canvas. The logo is a labelled home link with a 44px+ target. Staff uses separate text and return navigation.

## Photography and assets

`public/brand/media-one-lobby.jpg` is the supplied real 1730×974 lobby image, **not fictional**. Keep original bytes as the source, normal aspect ratio, natural colour and no generative edits, filters or overlaid logo/text. Present a compact, full-frame thumbnail beside hotel information; it must not become a large promotional hero. Next.js responsive image optimisation serves smaller negotiated web formats; verify an actual optimiser response and decoded image. The guest hotel information remains sample data even though the image is real. Warnings refer to demo information/services, not to the photograph as fictional.

The original reference pack remains unchanged under `Media_One_Brand_Reference_Pack/`. Its contents are also placed at the requested root paths: notes/task at root, PDF under `brand-reference/`, runtime images only under `public/brand/`. Do not put the manual or private source notes in `public/`. Source links and provenance remain in the reference README. Inclusion permits this requested private development review; it does not establish public-use rights or latest approval.

Remaining: actual licensed Chartwell Bars/Geomanist webfont files and matched internal names; Arabic type if selected; additional approved room/venue photographs and currentness/rights confirmation; latest brand-owner review. The supplied reverse PNG is usable now; a vector master and alternate supplied variants would improve future use but are not blockers to this private pass.

## Mobile structure, spacing and components

Keep the working five destinations: Home `/`, Explore `/explore` (hotel `/hotel` belongs here), Concierge `/concierge`, My Stay `/my-stay`, Profile `/profile`. Phone navigation is a persistent thumb-reachable bottom bar, desktop a sidebar. Staff is separate under Profile's hotel-team utility; `/staff` has no guest tabs. Selected tabs combine icon, label, tinted shape and `aria-current`.

Home stays compact: welcome, prominent concierge entry, real lobby thumbnail/hotel guide and three links to planned bookings/requests/membership explanations. No fake guest name, room number, stay or benefit. Photo is context, not a banner. Concierge has a compact header, clearly scripted status, scrollable bubbles, sample-question disclosure, 48px local composer/send control and reset. Preserve the four M0 replies and honest fallback; no new provider/database calls.

Spacing scale 4/8/12/16/20/24/32px; screen gutters 20px (16px at narrow width); card padding 16–20px, radius 12–16px. Interactive targets at least 44×44px; composer/send 48px. Body/input 16px avoids iOS focus zoom. Focus outlines 3px teal with offset, visible on charcoal/white surfaces; safe-area padding; reduced motion respected.

The app shell follows the visual viewport (`100dvh` plus VisualViewport resize/offsets). Only main/transcript areas scroll; navigation and composer remain reachable when the keyboard reduces visible space. On short screens the logo scales proportionately but stays above the conservative minimum, nonessential copy reduces, and transcript can become shorter without clipping controls. Latest reply reanchors on resize. Automated focused-input viewport tests are simulations, not actual mobile IME verification.

## Scope and evidence

No backend functionality changes: all requests, booking, membership, WhatsApp, staff auth and real AI remain unavailable/planned. Real logo/photo do not turn sample policies or scripted replies into live services. Preserve privacy/noindex metadata and Codespaces Private port 3000; no public deployment or live hotel number. Verify build/lint/types, existing browser tests, phone widths down to 320px, desktop, image loading/optimisation, logo geometry, keyboard layout and no horizontal overflow. Save current screenshots and authoritative results in document 05. Native iOS/Android and official brand approval remain owner checks.


## M1 staff/content extension

The later M1 slice adds real local Supabase Auth, venue-scoped permissions and persistent **fictional** offers. Earlier wording above about no backend changes describes the brand pass, not the current implementation. Staff now enters through a separate sign-in and editor, with 16px labelled fields, 48px controls, readable errors, explicit save state and guest-review guidance. No fake login, live promotion or booking is implied. Guest Home/Hotel information display persisted published/in-date demo offers on reload. Broader account/member/booking/request modules remain planned.

Keep actor/revision metadata in the staff workflow and clear fictional labels in the guest view. Missing/unreachable data must not be replaced with a fixture claimed as saved. Full M1 evidence is in the authoritative progress record, and current private setup/review is in `docs/M1_PRIVATE_REVIEW.md`.


## M2A managed knowledge and free-text extension

The M0/brand-pass scripted behaviour described earlier is historical. M2A replaces it with a free-text server integration and explicit disconnected, configured/unverified, successful model-selected and failed states. Until a real provider answer succeeds, do not label the connection live. Model selection quotes source wording rather than generating facts; evidence carries source/review and provisional, staff-reviewed prototype or fictional labels. Each new question reads current eligible knowledge and M1 offers; no action confirmation is possible.

The guest five-tab shell, original logo/photo, palette and temporary system fonts remain. Concierge retains a scrollable conversation with a 48px composer, venue control and clear source/error messages at phone/desktop widths. Short layouts hide nonessential question suggestions so the venue and composer remain reachable. Staff knowledge management stays outside guest navigation, with labelled 16px fields, source and date groups, explicit publication scope, save/reload status, replacement links and version history. The guest source browser uses expandable questions and a distinct venue selector. Long source references wrap; mobile management stacks the editor and record list. None of this creates production approval, a real entitlement or a booking service.

Current review: `docs/M2A_PRIVATE_REVIEW.md`; screenshots: `docs/screenshots/m2a/`. Live provider selection and native device keyboards still need separate verification.
