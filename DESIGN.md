# Media One Connect: implemented frontend design system

Updated 27 October 2026. Canonical interface specification, including visual/motion refinement on `design/media-one-motion-refinement` from redesign checkpoint `3abd362`. This replaces historical M0 styling descriptions; those remain available in Git. Implementation is ready for owner review, **not owner-approved design or production approval**.

## Direction and authority

A social hotel companion built around the actual places inside Media One. A compact greeting and immediate Concierge action lead into real venue photography; condensed display lettering gives the interface its character without pushing useful actions below the phone viewport. Charcoal anchors the shell, pink identifies the main action, and cool neutral surfaces keep reading comfortable. Desktop uses the same application with a sidebar and deliberate split compositions.

Read the supplied [brand reference](BRAND_REFERENCE_README.md), [font notes](design-handoff/FONT_NOTES.md) and [asset inventory](design-handoff/asset-inventory.json). The manual is **Version 1.02**, supplied provisionally. Ijlal confirmed its colours still apply provisionally; newer approval, public rights and asset currentness remain unconfirmed. The complete frontend instruction supersedes the older three-concept selection task in the handoff documents.

Applied skill: [`.agents/skills/design-taste-frontend/SKILL.md`](.agents/skills/design-taste-frontend/SKILL.md), **tasteskill v2**, including its complete app-screen guidance. The original 39 skill files and `skills-lock.json` remain tracked unchanged. Installer: `skills@1.7.4`; source `Leonxlnx/taste-skill`; locked content hash `6ac8ba6089dcbc303744a507a4587113c5d845ca2f658b3ce2b0b5eab108fb0d`. App direction: **Editorial greeting**, seed **215653166**, no redraw. Explicit Media One typography, colours, photographic composition and mobile bottom navigation take precedence over generic workspace defaults. No dashboard metrics were invented.

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

## Tokens and typography

| Role | CSS token | Value / use |
| --- | --- | --- |
| Brand primary | `--charcoal` | `#3C474F`, header, strong surfaces |
| Brand primary | `--pink` | `#D92745`, primary actions and selected indicators |
| Brand accent | `--teal` | `#31657E`, secondary links and keyboard focus |
| Brand accent | `--light-blue` | `#74CCD5`, restrained detail on charcoal |
| UI neutrals | `--canvas`, `--surface` | `#F5F6F7`, white |
| Reading | `--ink`, `--muted` | `#28343C`, `#59656D` |
| UI boundaries | `--line` | `#DCE1E4` |
| Derived tints | `--pink-tint`, `--blue-tint` | `#FCECEF`, `#EAF4F6` |

Neutrals and tints are implementation choices, not new official brand colours. White on pink is approximately 4.85:1; white on charcoal 9.52:1. Selected tinted labels use charcoal, with shape/icon/`aria-current` as well as colour. These checks do not certify complete accessibility.

**Chartwell Bars Regular** (`ChartwellBarsWebW01-Regular`) supplies short h1/h2 and venue display names. **Geomanist Regular** supplies body, controls and navigation. Exact copies of the supplied binaries live in `src/fonts/` and load locally through `next/font/local`. Both declarations are **400, normal**, with `font-synthesis: none`. CSS custom properties are not variable-font declarations. No synthetic bold/italic or invented weights. Browser tests check actual loaded faces and weights, not just declared CSS.

Body and form inputs are 16px. Secondary reading is 13–15px; navigation/quiet status 12px or above at the required widths. Home display is 40px on phones and 46px desktop, a single compact line in this condensed face. General phone page headings are 36px; chat h1 is 28px. Use size, placement, family and surface contrast for hierarchy. Normal prose is left aligned and concise. Preserve `garden on 8` exactly, without an added article or CSS uppercase. Ordinary guest prose avoids dash punctuation; functional names, URLs, identifiers and protected source values remain intact.

## Original logo and photography

The supplied reverse logo is unchanged: **2424×1062 RGBA**, with original transparent padding. Alpha bounds x361–2063, y351–713. It sits on charcoal at 180px canvas width on desktop (about 126px visible artwork), and 150px on phones (about 105px visible artwork), above the conservative 95px example minimum. The phone header is 56px plus its top safe area, with a 44px logo link target and natural transparent padding. Natural proportions and padded clear space remain. No crop, filter, recolour or redraw. Link target is at least 44px.

All **27 photographs**, both fonts and **five visual references** remain available in the private source handoff. Actual photographs and reference compositions were visually inspected. Only **12 uncropped WebP derivatives**, maximum long side 1400px, quality 84, total **1,805,534 bytes**, are installed in `public/media/`. Source identities, SHA256 and derivative dimensions are in [the application image manifest](docs/frontend-image-manifest.json). Original assets remain unchanged. Next Image reserves geometry and negotiates smaller responsive images; above-fold priorities are limited to the logo and main photo. Offscreen images are lazy. Failed images retain their reserved geometry with a readable fallback.

Home rotates through Coco Lounge at night, garden on 8, Ciao Bella and Qwerty using the supplied images. Venue discovery uses the inventory's Ciao Bella, Qwerty, garden on 8 and Coco Lounge identities and detail images. Hotel information uses the exterior and explicitly lifestyle photography. My Stay accurately describes the Chill Out Suite bedroom. No office tower lobby is shown as hotel reception, no suite is described as a standard room, and no historical event photograph establishes a current event. The supplied old lobby file remains preserved but is not used in the new composition. References, manuals, source JSON and unnecessary original photographs are outside public application assets.

**Missing/remaining:** no dedicated M12go photograph was supplied; its text treatment is ordinary UI, not an invented official logo. Additional genuine font weights, Arabic fonts/localisation, vector master/alternate logo variants and confirmation of public distribution rights remain separate needs. Current regular fonts and original reverse PNG work in this private prototype.

## Navigation and composition

Phone header is a steady 56px plus safe area, reduced from 67px, with the original logo, one discreet **Private preview** indicator and an accessible utility button. Primary bottom tabs are **Home, Explore, Concierge**. My Stay and Profile remain supported routes in the utility sheet; staff sign-in is a separate hotel-team link. No fabricated reservation, membership or room identity. Desktop has a 200px sidebar and a content canvas capped at 1170px with even gutters. No phone frame, marketing footer, fake status bar or hamburger-only primary navigation.

| Screen | Question / implemented composition |
| --- | --- |
| Home | Where should I go next? Compact greeting, immediate Concierge action, controlled four-venue photographic showcase, three shortcuts and a native venue rail |
| Explore | Which venue suits my visit? Five identities, two-column mobile discovery with a garden on 8 feature; intentional three-plus-two desktop grid |
| Venue details | What should I know before going? Back link, real photography, current eligible profile and expandable facts, correctly scoped Concierge entry |
| Hotel | What do I need during my visit? Exterior/lifestyle split, current essentials, guide and stay help |
| Knowledge | Where is the current answer? Venue selection, remembered per-venue search and expandable source-backed facts |
| Concierge | What would I like to ask? Dedicated transcript, readable replies, source disclosures, in-place errors and keyboard-aware composer |
| My Stay | How can I get help with a stay? Honest unavailable booking/request actions and links to hotel information |
| Profile | Can I use this without an account? Welcome for staying guests and dining visitors, useful guide/staff utilities |
| Staff sign-in | How do I enter my workspace? Branded, labelled real authentication form |
| Staff offers | What can I edit and publish for testing? Existing editor, dates/revision/save feedback and protected review link |
| Staff knowledge | Which fact needs an update? Record picker, labelled editor, sources/dates/status, replacements and history |
| Private test view | Did the fictional publication persist? Authorised offer preview plus exact published knowledge for regression review |

Source facts and venue descriptors come from eligible published knowledge. Prices, conditions and date facts are not hardcoded into presentation. A single provisional notice sits beside factual content; sources can be expanded. Financial or conditional profile text is not used as a clamped card teaser. Expired, held, draft, replaced and unrelated-venue records remain excluded by existing backend rules.

Fictional offers are absent from normal Home/Hotel/discovery. Normal knowledge browsing filters fictional labels as a presentation boundary. A concierge result whose evidence contains a fictional offer is withheld in full and shown as unavailable offer details, with a useful alternative; it is never rewritten as a genuine promotion. The underlying API, database grants and model retrieval are unchanged. The authorised `/staff/review` uses the existing guest-eligible offer reader and exact source wording, with explicit fictional labels. This is presentation separation, not a new database secrecy guarantee.

## Components, interaction and state

Shared components: AppShell, Navigation, PageHeading, Photo, VenueCard, FactList, KnowledgeBrowser, Sheet, StaffTabs and the existing real editors. Standard space steps: 4/8/12/16/20/24/32px; phone gutters 20px, desktop 40px. Images/surfaces use 16px radius, controls 10px, main action buttons rounded. Reading groups are lists and open space, not a bordered card for every paragraph. Staff forms retain efficient panels and native controls, with intrinsic-width fixes for narrow date fields.

Primary controls are at least 44px, normally 48px. Visible 3px focus, skip link, accessible names and selected states remain. Native modal dialogs provide focus containment, Escape, a close button, backdrop dismissal, scrolling and focus return. Source panels use native details/summary. Sheets open in 260ms and close visually in 180ms where discrete CSS transitions are supported, while native closing returns focus immediately. Unsupported closing is immediate. Replies settle in 200ms, pending dots move only while waiting, and press feedback takes 140ms. Reduced motion removes travel and autoplay. Ambient movement belongs to the controlled photographic showcase, not every icon or section. No scroll hijacking or simulated reply streaming.

The shell follows VisualViewport with safe-area spacing. During chat keyboard reduction, header and tabs give way to the transcript/composer; normal navigation returns when the keyboard closes. Composer uses 16px input, bounded multiline height, Enter send and Shift+Enter newline, respecting IME composition. Transcript only follows messages when already near its bottom. Reading earlier messages stays stable; a new-reply control offers a deliberate jump.

Conversation/draft stay in mounted React memory during ordinary navigation. Recent successful context is still bounded by the original server contract. Explicit clear, a different venue, reload or closing the tab clears appropriate conversation state. Per-route scroll and per-venue guide searches also stay in memory. A single nonpersonal `sessionStorage` Boolean, `media-one:home-entered`, prevents replaying the short Home entrance during a browser tab session, including reloads. No guest content, conversation, draft, carousel state or selected photo is written there. No new localStorage, persistent conversation/profile storage, or service worker. The transcript compares its actual position with the last intentional scroll anchor before following, including WebKit resize/scroll event ordering. Native iPhone keyboard, toolbar and scroll behaviour still need real-device review.

Loading skeletons reserve reading geometry. Search has a real no-match state. Missing/unavailable facts and image failures have useful alternatives. Provider/server failures stay visible and never become scripted successful replies. AI identity is explicit once in the header; technical diagnostics, allowance and implementation detail belong in protected review/documentation.

## Capabilities and review

Working Supabase authentication, offer editing, managed knowledge, versions, permissions, publication/replacement/expiry and server AI integration are preserved. This visual work does **not** fix or verify retrieval quality, generated voice accuracy, staff handover, booking, requests, accounts, loyalty or WhatsApp. No database reset, reseed, budget change, credential change, model call or public publication was performed. The original USD 5 **total** allowance remains subject to its existing ledger across environments.

Read [the current private review guide](docs/FRONTEND_PRIVATE_REVIEW.md) and [visual verification record](docs/FRONTEND_VISUAL_REVIEW.md). Design choices above are implemented proposals for owner review; official brand/factual approval and physical-device acceptance are not inferred.


## Controlled photographic motion

This refinement retains **Editorial greeting, seed 215653166**, with no redraw, new palette, replacement assets or motion dependency. The owner's specific autoplay/entrance request takes precedence over the skill's general static app-screen defaults. Existing browser APIs, CSS and Web Animations provide the effects.

One root coordinator owns **one autoplay timeout**. Eligible sections must be at least 60% visible inside the actual app main viewport; the highest intersection ratio wins and the showcase wins ties. The other section has no advancement timer. Autoplay pauses offscreen, with a hidden document, on desktop hover or while any modal is open. Returning starts a fresh full interval, without elapsed-time catch-up. Touch, focus, swipe, wheel/manual rail navigation or direct selection permanently stops that carousel for ordinary SPA navigation until its explicit Play control is used. A full reload starts fresh carousel state.

The featured card cycles Coco Lounge, garden on 8, Ciao Bella and Qwerty at roughly **6 seconds** per settled interval, using a **600ms fade through its surface**. One active link contains the image, caption and venue name. At the fully faded midpoint React commits the complete venue change together; there is no interval in which a displayed name has another venue's destination. Interaction cancels any in-flight fade before tap activation. Only the current photo plus a just-in-time decoded next image are needed; all four full originals are not shipped to start a rotation. One cropped image scales **1.00 to 1.03**, paused with its section and removed under reduced motion. Caption geometry and controls stay stable. Four 44px selection targets, progress/count and an accessible pause/play control remain available; inactive slides have no hidden interactive links.

Find your spot is a native snapping row at all widths, with roughly 76% phone cards and three-and-a-glimpse desktop composition. It advances one measured boundary every **7 seconds**, using native smooth scroll, and stops at the real end without clones or a ticker loop. Explicit Play at the end returns to the start. Native swiping, previous/next controls and keyboard arrows work independently of autoplay. Vertical scrolling remains native.

The signature move progressively carries the selected image to a venue detail header through the native same-document View Transition API, **480ms**. A whitelisted transient photo selection gives the detail header the exact clicked image. Direct links use the original detail default. Modified clicks and ordinary URLs remain native links; unsupported/reduced/slow transitions navigate normally, with a bounded one-second enhancement fallback. No new query string, identity or server record is created. Browser Back retains the existing main-scroll restoration and rail position.

The Home entrance uses at most four short opacity/8px transform gestures, starts immediately and settles in under 600ms. A nonpersonal tab-session flag prevents replay. It does not hide controls or gate content. Bottom navigation uses one shared translating selected marker; button feedback stays small. Native sheets use flat backdrops, no full-screen blur, and preserve immediate focus restoration. Completed replies arrive as a whole; no fake streaming is added.

Current private review: [motion guide](docs/MOTION_PRIVATE_REVIEW.md). [Motion verification](docs/MOTION_VERIFICATION.md) distinguishes Chromium touch input, Linux WebKit engine checks, visibility-event fixtures and remaining real-iPhone tests. The existing backend, source eligibility, authentication, credentials and original total model allowance are preserved; visual work does not establish improved answer quality or implement actions.
