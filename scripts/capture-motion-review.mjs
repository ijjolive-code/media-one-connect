// Private, local-only visual review. Concierge transport is intercepted in the explicitly labelled fixture recording.
import { chromium } from "@playwright/test";
import { mkdirSync, writeFileSync, renameSync } from "node:fs";
const base = process.env.MEDIA_ONE_REVIEW_URL || "http://127.0.0.1:3107";
if (!["127.0.0.1", "localhost"].includes(new URL(base).hostname))
  throw Error("Review capture requires a local private prototype.");
const output = process.env.MEDIA_ONE_REVIEW_OUTPUT || ".local/motion-review";
mkdirSync(output, { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.MEDIA_ONE_CHROMIUM_PATH || "/usr/bin/chromium",
});
const report = [];
try {
  for (const width of [430, 1440]) {
    const viewport = { width, height: width === 430 ? 932 : 1000 };
    const context = await browser.newContext({
      viewport,
      isMobile: width < 700,
      hasTouch: width < 700,
      recordVideo: { dir: output + "/raw", size: viewport },
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    // Guard the entire normal app walkthrough against accidentally making a paid provider call.
    await page.route("**/api/concierge", (route) => route.abort());
    await page.goto(base, { waitUntil: "networkidle" });
    await page.mouse.move(2, 2);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(700);
    await page.screenshot({ path: `${output}/home-${width}.png` });
    const showcase = page.getByRole("region", { name: "Featured venues" });
    await showcase.waitFor();
    await page.waitForTimeout(6300);
    await page.screenshot({
      path: `${output}/showcase-automatic-${width}.png`,
    });
    const action = async (locator) => {
      if (width < 700) await locator.tap();
      else await locator.click();
    };
    await action(
      page.getByRole("button", { name: "Pause featured venues", exact: true }),
    );
    await page.waitForTimeout(350);
    await action(
      page.getByRole("button", { name: "Show Ciao Bella", exact: true }),
    );
    await page.waitForTimeout(750);
    await page.screenshot({ path: `${output}/showcase-manual-${width}.png` });
    const gutterX = (await page.locator("main").boundingBox()).x + 8;
    // A real wheel event on the main gutter, with no carousel gesture interception.
    await page.mouse.move(gutterX, viewport.height * 0.6);
    await page.mouse.wheel(0, 1200);
    await page.mouse.move(2, 2);
    await page.waitForTimeout(500);
    const rail = page.getByRole("region", { name: "Find your spot" });
    await rail.waitFor();
    await page.waitForTimeout(7600);
    await page.screenshot({ path: `${output}/rail-automatic-${width}.png` });
    await action(rail.getByRole("link", { name: /Qwerty/ }));
    await page.waitForURL("**/explore/qwerty");
    await page.waitForTimeout(900);
    await page.screenshot({ path: `${output}/detail-${width}.png` });
    await page.goBack();
    await page.waitForTimeout(700);
    await page.mouse.move(gutterX, viewport.height * 0.4);
    await page.mouse.wheel(0, -2000);
    await page.waitForTimeout(400);
    await action(
      page.getByRole("button", { name: "Your visit and hotel information" }),
    );
    await page.waitForTimeout(380);
    await page.screenshot({ path: `${output}/sheet-${width}.png` });
    await page.keyboard.press("Escape");
    await page.waitForTimeout(300);
    await action(
      page.getByRole("button", { name: "Your visit and hotel information" }),
    );
    await page.waitForTimeout(330);
    await action(
      page.getByRole("dialog").getByRole("button", { name: "Close panel" }),
    );
    await page.waitForTimeout(300);
    const nav = page.getByRole("navigation", { name: "Guest navigation" });
    await action(nav.getByRole("link", { name: "Explore", exact: true }));
    await page.waitForTimeout(500);
    await action(nav.getByRole("link", { name: "Concierge", exact: true }));
    await page.waitForTimeout(500);
    await page
      .getByRole("textbox", { name: "Message the concierge" })
      .fill("Where can I eat?");
    await action(nav.getByRole("link", { name: "Home", exact: true }));
    await page.waitForTimeout(400);
    await action(nav.getByRole("link", { name: "Concierge", exact: true }));
    await page.waitForTimeout(600);
    await page.screenshot({ path: `${output}/draft-return-${width}.png` });
    const video = page.video();
    await context.close();
    const path = await video.path();
    renameSync(path, `${output}/walkthrough-${width}.webm`);
    report.push({
      viewport,
      errors,
      recording: `walkthrough-${width}.webm`,
      providerCalls: 0,
    });
  }
  const viewport = { width: 430, height: 932 };
  const context = await browser.newContext({
    viewport,
    isMobile: true,
    hasTouch: true,
    recordVideo: { dir: output + "/raw", size: viewport },
  });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.route("**/api/concierge", async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 2200));
    await route.fulfill({
      json: {
        kind: "model_grounded",
        message:
          "Fictional review reply. No live model was called. Browse Explore to see the hotel venues.",
        facts: [
          {
            id: "VISUAL-FIXTURE",
            key: "VISUAL-FIXTURE",
            question: "Visual fixture",
            text: "Explicitly fictional source for motion review only.",
            label: "Fictional test content",
            reviewDue: null,
            sources: [],
          },
        ],
        incomplete: false,
      },
    });
  });
  await page.goto(base + "/concierge", { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page
    .getByRole("textbox", { name: "Message the concierge" })
    .fill("Show a visual review reply");
  await page.getByRole("button", { name: "Send concierge question" }).tap();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: output + "/typing-fixture-430.png" });
  await page
    .getByRole("log")
    .getByText(/Fictional review reply/)
    .waitFor();
  await page.waitForTimeout(700);
  await page.getByText("Sources and conditions", { exact: true }).tap();
  await page.waitForTimeout(500);
  await page.screenshot({ path: output + "/reply-fixture-430.png" });
  await page.getByRole("button", { name: /Media One Hotel/ }).tap();
  await page.waitForTimeout(400);
  await page
    .getByRole("dialog")
    .getByRole("button", { name: /Qwerty/ })
    .tap();
  await page.waitForTimeout(500);
  const video = page.video();
  await context.close();
  renameSync(await video.path(), output + "/chat-fixture-430.webm");
  report.push({
    viewport,
    errors,
    recording: "chat-fixture-430.webm",
    providerCalls: 0,
    fixture: true,
  });
  writeFileSync(
    output + "/recording-report.json",
    JSON.stringify(report, null, 2) + "\n",
  );
  console.log(JSON.stringify(report));
} finally {
  await browser.close();
}
