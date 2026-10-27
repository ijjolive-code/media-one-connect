# Motion refinement review artifacts

Actual cloud-browser captures for `design/media-one-motion-refinement`, based on redesign `3abd362`. No phone frame, fake status bar, generated hotel imagery or public deployment. [Exact private preview and iPhone checklist](../../MOTION_PRIVATE_REVIEW.md), [verification](../../MOTION_VERIFICATION.md), [design system](../../../DESIGN.md).

## Interaction recordings

| Recording | Duration / viewport | What it shows |
| --- | --- | --- |
| [Phone interactions](phone-interactions.mp4) | About 25 seconds, 430×932 | Six-second venue change, pause/manual selection, vertical scrolling, seven-second rail advancement, venue detail/Back, repeated sheets, tab selection and retained chat draft |
| [Desktop interactions](desktop-interactions.mp4) | About 26 seconds, 1440×1000 | The same implemented experience adapted to the wider app layout |
| [Chat fixture](chat-fixture.mp4) | About 6 seconds, 430×932 | Actual pending feedback, whole-message arrival, source disclosure and venue selection, using an **explicitly fictional intercepted transport response** |

These silent H.264 MP4 files preserve actual capture timing, without speeding up the interactions. Open/download them from this private repository or your Codespaces Explorer if the chat file viewer does not play video. [Recording metadata](recording-report.json) contains actual durations/dimensions. The main walkthroughs never submit a model question. The separate chat clip is **not a live AI answer** and is not substituted into the real application. All recordings report zero paid provider calls.

The camera is Chromium at browser viewport sizes, not a real iPhone. Native keyboard/OS backgrounding/VoiceOver still need phone review. Film frames were sampled to inspect progression, stable captions/controls, crops and route continuity; a screenshot alone is not claimed as motion verification.

## Representative screenshots

| Screen | Capture |
| --- | --- |
| Home | [375px](home-375.png), [430px](home-430.png), [1440px](home-1440.png) |
| garden on 8 selection | [375px](chromium-showcase-garden-on-8-375.png) |
| Ciao Bella selection | [430px](chromium-showcase-Ciao-Bella-430.png) |
| Qwerty selection | [1440px](chromium-showcase-Qwerty-1440.png) |
| Linux WebKit Home | [430px](webkit-home-430.png) |
| Linux WebKit native rail | [1440px](webkit-rail-1440.png) |
| Selected-photo detail | [430px](detail-430.png) |
| Native utility sheet | [430px](sheet-430.png) |
| Retained draft | [430px](draft-return-430.png) |
| Pending transport fixture | [430px](typing-fixture-430.png) |
| Complete fictional reply/source fixture | [430px](reply-fixture-430.png) |

Both fonts are the actual supplied regular files, not synthetic weights. The [engine/font report](engine-font-report.json) records both loaded faces and no overflow/page errors for the Home/venue/rail sweeps in Chromium and Linux WebKit. [Cycle timing](cycle-timing.json) records the actual complete automatic sequence with each displayed name and href. Source information and imagery remain provisional private-prototype material.

## Every route at the required widths

[Matrix data](route-matrix.json): 17 guest/sign-in/authenticated staff route states at each width, 51 combinations. Fold captures and relevant long-page ends were inspected locally; contact sheets and selected full-resolution captures are retained here. Staff screens show existing fictional test data, never typed credentials. Historical revision counters may differ from a later reload because real tests append audit revisions while restoring original business values.

- 375×812: [1](sheet-375-1.jpg), [2](sheet-375-2.jpg), [3](sheet-375-3.jpg).
- 430×932: [1](sheet-430-1.jpg), [2](sheet-430-2.jpg), [3](sheet-430-3.jpg).
- 1440×1000: [1](sheet-1440-1.jpg), [2](sheet-1440-2.jpg), [3](sheet-1440-3.jpg), [4](sheet-1440-4.jpg), [5](sheet-1440-5.jpg).

Reproduce normal walkthrough captures on a locally running private app with `node scripts/capture-motion-review.mjs` after installing Playwright's browser/video tooling. The script accepts `MEDIA_ONE_REVIEW_URL`, `MEDIA_ONE_REVIEW_OUTPUT` and `MEDIA_ONE_CHROMIUM_PATH`; it refuses non-loopback destinations and intercepts concierge transport for its labelled fixture. This tooling is not required to open the normal Codespaces preview.
