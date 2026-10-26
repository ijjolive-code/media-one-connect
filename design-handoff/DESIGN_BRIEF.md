# Media One Connect: guest UI design brief
27 October 2026 • Proposed direction for owner review

## Purpose
Build a recognisably Media One guest experience: bold, social, contemporary and polished. Serve both staying guests and local dining visitors. The existing backend is a foundation to preserve. The frontend needs a new composition rather than a recolour of the current development dashboard.

## First design decision
Build three Home compositions using the SAME representative content and images, then choose one before extending to Explore, garden on 8 detail and Concierge.
A: Bold editorial. Strong photographic opening, condensed display type, restrained charcoal/pink, asymmetric editorial sections on larger screens.
B: Social discovery. Compact opening, venues immediately visible, a portrait lifestyle feature and useful browse controls.
C: Calm contemporary. Light surfaces, fewer simultaneous elements, expansive photography and restrained accent colour. Keep Media One character; no beige luxury resort styling.
These are structural variations, not three colour themes. Start with one light/dark balance per concept; no automatic dual-theme scope.

## Brand foundation
Use the existing repository brand manual and original logo. Do not redraw the logo in text. Prior supplied palette: charcoal #3C474F, pink #D92745, teal #31657E, light blue #74CCD5; reconcile against source brand pages before implementation. This pack contains new photography and fonts, not a replacement brand manual.
Use Chartwell Bars for short expressive headings and Geomanist for reading/UI. Only weight 400 is supplied. Keep authentic venue names, especially garden on 8. Never force uppercase through CSS on venue names.

## Home content and hierarchy
Compact logo/header; concise greeting without invented guest name. A distinctive photo feature, then useful routes to dining, hotel information and Concierge. A venue discovery section with real images and short factual descriptors. Do not imply that the user has a stay, membership or booking. Keep the main useful action within the first phone viewport. Avoid a full-screen marketing splash that hides functionality.
Use no invented promotions or live-status chips. Do not show 'open now', current event dates, ratings or prices without current eligible data. If offers are fictional, exclude them from the normal guest composition while retaining them in the testing workflow.

## Navigation and scope
Home, Explore and Concierge can be meaningful now. My Stay and Profile should only appear in normal navigation when useful functionality exists. Future navigation can be demonstrated separately with explicit reviewer context, without fake reservations or memberships.
Mobile navigation must be reachable, labelled and respect safe areas. Desktop needs an intentional wider composition rather than a phone stretched across the browser. Staff workspace remains separate and retains its permissions.

## Visual composition
Use a small number of stronger visual sections, not equal cards around every paragraph. Establish contrast between display headings, reading copy and utility text. Use whitespace with purpose. Images should describe actual places and experiences, with captions/copy below whenever overlays impair legibility. Keep original colour character. No AI replacement architecture, generated guests, distortion or heavy grading.
Prioritise rooms-lifestyle-teal, coco-pool-night and garden-lifestyle for exploration. Use primary venue images identified in asset-inventory.json. Room discovery must name the suite category accurately. office-tower-lobby is not hotel reception. P7 images show atmosphere, not current events.

## Guest-facing language
Remove M0/M1/M2 labels, implementation explanations, font notes, API/budget information and repeated demo banners. Keep a discreet Private preview indicator and a reviewer area. Explain unavailable actions at the relevant moment. Never turn a disabled action into a fake successful reservation. Keep fictional information labelled if it is intentionally displayed in a test view.
No hyphen or dash punctuation in ordinary guest prose; preserve functional strings where required. Use concise useful wording. Concierge voice quality is a separate correction track and must not be claimed fixed by visual redesign.

## Interactions
Use restrained pressed feedback, quick panel transitions and message appearance. Starting motion range 160–240ms, subject to testing. Respect reduced motion. Avoid continuously moving decoration, scroll hijacking, mandatory autoplay and long entrance sequences. Bottom sheets must handle focus, dismissal and scroll correctly. Ensure visible focus, meaningful labels and comfortable targets around 44px or greater.
Chat needs stable scrolling, a composer visible above the keyboard, usable back navigation and states for pending/error/long replies. No hardcoded technical checking messages. Do not describe a failed model call as a successful reply.

## Implementation boundaries
Preserve database contents, auth, RLS, APIs, existing staff edits, Codespaces fixes and the USD5 trial ledger. Design concept previews use local illustrative content and do not make paid model calls. Keep them separate from normal routes and public deployment. Current knowledge must retain publication and expiry rules when later integrated.
The original 27 assets are supplied unchanged with clean filenames and SHA256 hashes. Create responsive derivatives only during implementation, preserving originals. Prefer existing project image optimisation; do not install a whole animation/component stack for one effect. Load only the initial hero eagerly; lazy-load offscreen galleries. Reserve image dimensions to prevent jumps.

## Reference interpretation
reference-6049: hospitality discovery, image hierarchy and compact bottom navigation. Do not copy its prices, hotel inventory or beige/gold identity.
reference-6050: expressive typography and composition. Avoid decorative cropping that makes images hard to interpret.
reference-6051: image-led layered panels and restrained controls. Do not copy beauty booking/payment content.
reference-6052: contrast and immersive imagery; low-resolution reference, not an exact pixel target.
reference-6053: energetic accent use and consistent component family. Translate through Media One colours, not a neon CRM dashboard.
References are research inputs, not assets for public guest pages.
