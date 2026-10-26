import { test, expect } from "@playwright/test";
const routes = [
  "/",
  "/explore",
  "/hotel",
  "/hotel/knowledge",
  "/explore/ciao-bella",
  "/explore/qwerty",
  "/explore/garden-on-8",
  "/explore/coco-lounge",
  "/explore/m12go",
  "/concierge",
  "/my-stay",
  "/profile",
  "/staff/sign-in",
];
test("guest Home has useful actions, three destinations and no fictional promotion or roadmap", async ({
  page,
}) => {
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Guest navigation" });
  await expect(nav.locator(":scope > a")).toHaveText([
    "Home",
    "Explore",
    "Concierge",
  ]);
  await expect(
    page.getByRole("heading", { name: "Your kind of place." }),
  ).toBeVisible();
  await expect(
    page.locator(".home-assist").getByRole("link", { name: /Ask Concierge/ }),
  ).toBeVisible();
  await expect(page.getByText("Private preview", { exact: true })).toHaveCount(
    1,
  );
  await expect(page.locator("main")).not.toContainText(
    /Planned modules|Working in M0|Demo offers|Trial limits|Brand reference/,
  );
  await page.getByRole("link", { name: "Eat & drink", exact: true }).click();
  await expect(page).toHaveURL(/explore$/);
  await expect(
    nav.getByRole("link", { name: "Explore", exact: true }),
  ).toHaveAttribute("aria-current", "page");
});
test("all guest routes, venue details and sign in render without clipping or JavaScript errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (const route of routes) {
    await page.goto(route);
    await expect(
      page.getByRole("main").getByRole("heading", { level: 1 }),
    ).toBeVisible();
    expect(
      await page
        .locator("main")
        .evaluate((el) => el.scrollWidth <= el.clientWidth),
    ).toBe(true);
  }
  expect(errors).toEqual([]);
});
test("supplied fonts actually load at regular weight and the original logo stays proportional", async ({
  page,
}) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await expect
    .poll(() =>
      page.evaluate(() =>
        [...document.fonts].some(
          (f) =>
            /geomanist/i.test(f.family) &&
            f.status === "loaded" &&
            f.weight === "400",
        ),
      ),
    )
    .toBe(true);
  await expect
    .poll(() =>
      page.evaluate(() =>
        [...document.fonts].some(
          (f) =>
            /chartwell/i.test(f.family) &&
            f.status === "loaded" &&
            f.weight === "400",
        ),
      ),
    )
    .toBe(true);
  expect(
    await page
      .locator("body")
      .evaluate((el) => getComputedStyle(el).fontSynthesis),
  ).toBe("none");
  const image = page.getByRole("img", { name: "Media One Hotel", exact: true });
  const b = await image.boundingBox();
  expect(b!.width / b!.height).toBeCloseTo(2424 / 1062, 2);
  expect(
    (await page.request.get("/design-handoff/asset-inventory.json")).status(),
  ).toBe(404);
  expect(
    (
      await page.request.get("/design-handoff/references/reference-6049.jpg")
    ).status(),
  ).toBe(404);
});
test("unavailable AI remains a real failure with a useful alternative, without scripted answers", async ({
  page,
}) => {
  await page.goto("/concierge");
  await page
    .getByRole("textbox", { name: "Message the concierge" })
    .fill("Where is the hotel?");
  const response = page.waitForResponse((r) =>
    r.url().endsWith("/api/concierge"),
  );
  await page.getByRole("button", { name: "Send concierge question" }).click();
  expect((await response).status()).toBe(503);
  await expect(page.getByRole("log")).toContainText(
    "Concierge isn’t available right now",
  );
  await expect(page.getByRole("log")).not.toContainText(
    /NO MODEL ANSWER|No answer was substituted|check.in is from/,
  );
  await expect(
    page
      .getByRole("log")
      .getByRole("link", { name: "Hotel guide", exact: true }),
  ).toBeVisible();
});
test("conversation and draft survive tab navigation in memory; source details, venue sheet and clear work", async ({
  page,
}) => {
  const payloads: { history: unknown[]; venue: string }[] = [];
  await page.route("**/api/concierge", async (route) => {
    payloads.push(route.request().postDataJSON());
    await route.fulfill({
      json: {
        kind: "model_grounded",
        message: "A fictional browser reply. No live model was called.",
        facts: [
          {
            id: "FIXTURE",
            key: "FIXTURE",
            text: "Fictional source text for this browser test.",
            label: "Fictional test content",
            reviewDue: null,
            sources: [],
          },
        ],
        incomplete: false,
      },
    });
  });
  await page.goto("/concierge");
  const input = page.getByRole("textbox", { name: "Message the concierge" });
  await input.fill("Hello");
  await input.press("Enter");
  await expect(page.getByRole("log")).toContainText(
    "A fictional browser reply",
  );
  await input.fill("My unfinished question");
  await page
    .getByRole("navigation", { name: "Guest navigation" })
    .getByRole("link", { name: "Explore", exact: true })
    .click();
  await page
    .getByRole("navigation", { name: "Guest navigation" })
    .getByRole("link", { name: "Concierge", exact: true })
    .click();
  await expect(input).toHaveValue("My unfinished question");
  await expect(page.getByRole("log")).toContainText(
    "A fictional browser reply",
  );
  await expect(
    page.getByText("Fictional source text for this browser test.", {
      exact: true,
    }),
  ).not.toBeVisible();
  await page.getByText("Sources and conditions", { exact: true }).click();
  await expect(
    page.getByText("Fictional source text for this browser test.", {
      exact: true,
    }),
  ).toBeVisible();
  await page.getByRole("button", { name: /Media One Hotel/ }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(
    page.getByRole("button", { name: /Media One Hotel/ }),
  ).toBeFocused();
  await page.getByRole("button", { name: /Media One Hotel/ }).click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: /Qwerty/ })
    .click();
  await expect(input).toHaveValue("");
  await expect(page.getByRole("log")).not.toContainText(
    "A fictional browser reply",
  );
  await input.fill("Hi again");
  await input.press("Enter");
  await expect.poll(() => payloads.length).toBe(2);
  expect(payloads[1]).toMatchObject({ history: [], venue: "qwerty" });
  await expect(page.getByRole("log")).toContainText(
    "A fictional browser reply",
  );
  await page.getByRole("button", { name: "New conversation" }).click();
  await page
    .getByRole("button", { name: "Clear conversation", exact: true })
    .click();
  await expect(page.getByRole("log")).not.toContainText(
    "A fictional browser reply",
  );
  await page.reload();
  await expect(input).toHaveValue("");
  expect(
    await page.evaluate(() => ({
      local: localStorage.length,
      session: sessionStorage.length,
    })),
  ).toEqual({ local: 0, session: 0 });
});
test("incoming reply does not drag a reader away from earlier messages", async ({
  page,
}) => {
  let calls = 0;
  let deliver: (() => void) | undefined;
  await page.route("**/api/concierge", async (route) => {
    calls++;
    if (calls === 3)
      await new Promise<void>((resolve) => {
        deliver = resolve;
      });
    await route.fulfill({
      json: {
        kind: "model_grounded",
        message:
          calls === 3
            ? "The new fictional reply arrived."
            : "Fictional test text. ".repeat(100),
        facts: [],
        incomplete: false,
      },
    });
  });
  await page.goto("/concierge");
  const input = page.getByRole("textbox", { name: "Message the concierge" });
  for (const q of ["First question", "Another question"]) {
    await input.fill(q);
    await input.press("Enter");
    await expect(
      page.getByRole("button", { name: "Send concierge question" }),
    ).toBeDisabled();
    await expect(
      page.getByRole("status", { name: "Concierge is replying" }),
    ).not.toBeVisible();
  }
  await input.fill("A third question");
  await input.press("Enter");
  await expect.poll(() => !!deliver).toBe(true);
  const log = page.getByRole("log");
  await log.evaluate((el) => (el.scrollTop = 0));
  await page.waitForTimeout(100);
  deliver!();
  await expect(log).toContainText("The new fictional reply arrived.");
  expect(await log.evaluate((el) => el.scrollTop)).toBeLessThan(5);
  await expect(page.getByRole("button", { name: /New reply/ })).toBeVisible();
  await page.getByRole("button", { name: /New reply/ }).click();
  expect(
    await log.evaluate(
      (el) => el.scrollHeight - el.scrollTop - el.clientHeight,
    ),
  ).toBeLessThan(5);
});
test("mobile keyboard-space simulation prioritises the composer and leaves navigation reachable afterwards", async ({
  page,
}) => {
  await page.route("**/api/concierge", async (route) =>
    route.fulfill({
      json: {
        kind: "model_grounded",
        message: "Fictional keyboard test reply. ".repeat(35),
        facts: [],
        incomplete: false,
      },
    }),
  );
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/concierge");
  const input = page.getByRole("textbox", { name: "Message the concierge" });
  await input.fill("Keyboard layout fixture");
  await input.press("Enter");
  await expect(page.getByRole("log")).toContainText(
    "Fictional keyboard test reply.",
  );
  await input.focus();
  await page.setViewportSize({ width: 375, height: 440 });
  await expect(page.locator(".app-shell")).toHaveAttribute(
    "data-keyboard",
    "true",
  );
  await expect(
    page.getByRole("navigation", { name: "Guest navigation" }),
  ).not.toBeVisible();
  const b = await input.boundingBox();
  expect(b!.y).toBeGreaterThan(0);
  expect(b!.y + b!.height).toBeLessThan(440);
  await expect
    .poll(() =>
      page
        .getByRole("log")
        .evaluate((el) => el.scrollHeight - el.scrollTop - el.clientHeight),
    )
    .toBeLessThan(5);
  await input.blur();
  await page.setViewportSize({ width: 375, height: 812 });
  await expect(
    page.getByRole("navigation", { name: "Guest navigation" }),
  ).toBeVisible();
});
test("search, browser back and useful screen scroll position remain predictable", async ({
  page,
}) => {
  await page.goto("/hotel/knowledge");
  await page.getByRole("searchbox").fill("cancellation");
  await expect(
    page.getByText("What is the cancellation policy?", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText("Where is Media One Hotel?", { exact: true }),
  ).not.toBeVisible();
  await page
    .getByRole("navigation", { name: "Guest navigation" })
    .getByRole("link", { name: "Home", exact: true })
    .click();
  await expect(page).toHaveURL(/\/$/);
  await page.goBack();
  await expect(page).toHaveURL(/\/hotel\/knowledge$/);
  await expect(page.getByRole("searchbox")).toHaveValue("cancellation");
  await page.getByRole("searchbox").fill("nonsensicalquery");
  await expect(
    page.getByRole("heading", { name: "Try another question." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Clear search" }).click();
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/explore");
  await page.evaluate(() => document.fonts.ready);
  await page.getByRole("link", { name: /M12go/ }).scrollIntoViewIfNeeded();
  await page.locator("main").evaluate((el) => (el.scrollTop = el.scrollHeight));
  const top = await page.locator("main").evaluate((el) => el.scrollTop);
  await page.getByRole("link", { name: /M12go/ }).click();
  await expect(page).toHaveURL(/\/explore\/m12go$/);
  await page.goBack();
  await expect(page).toHaveURL(/\/explore$/);
  await expect
    .poll(() => page.locator("main").evaluate((el) => el.scrollTop))
    .toBeGreaterThan(top - 10);
});
test("keyboard entry, sheet focus, unavailable routes and reduced motion have real fallbacks", async ({
  page,
}) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
  await page
    .getByRole("button", { name: "Your visit and hotel information" })
    .click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await page.keyboard.press("Tab");
  expect(
    await page.evaluate(() => !!document.activeElement?.closest("dialog")),
  ).toBe(true);
  await page.keyboard.press("Escape");
  await page.goto("/does-not-exist");
  await expect(
    page.getByRole("heading", { name: "Let’s get you back." }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Back to Home" }).click();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/concierge");
  expect(
    await page
      .locator(".header-menu")
      .evaluate((el) => getComputedStyle(el).transitionDuration),
  ).toBe("0s");
});
test("a failed photograph has a useful fallback and keeps its reserved layout", async ({
  page,
}) => {
  await page.route("**/_next/image?*", async (route) => {
    if (
      new URL(route.request().url()).searchParams
        .get("url")
        ?.includes("coco-pool-night")
    )
      await route.fulfill({ status: 404, body: "Unavailable" });
    else await route.continue();
  });
  await page.goto("/");
  await expect(page.locator(".home-feature .photo-fallback")).toContainText(
    "Image unavailable",
  );
  const b = await page.locator(".home-feature .photo").boundingBox();
  expect(b!.height).toBeGreaterThan(150);
  expect(
    await page
      .locator("main")
      .evaluate((el) => el.scrollWidth <= el.clientWidth),
  ).toBe(true);
});
test("a venue detail opens the correct concierge scope and an explicit venue change clears old context", async ({
  page,
}) => {
  const payloads: { venue: string; history: unknown[] }[] = [];
  await page.route("**/api/concierge", async (route) => {
    payloads.push(route.request().postDataJSON());
    await route.fulfill({
      json: {
        kind: "model_grounded",
        message: "A fictional venue scope test reply.",
        facts: [],
        incomplete: false,
      },
    });
  });
  await page.goto("/explore/ciao-bella");
  await page
    .getByRole("link", { name: "Ask about Ciao Bella", exact: true })
    .click();
  await expect(page.getByRole("button", { name: /Ciao Bella/ })).toBeVisible();
  const input = page.getByRole("textbox", { name: "Message the concierge" });
  await input.fill("Tell me about this venue");
  await input.press("Enter");
  await expect.poll(() => payloads.length).toBe(1);
  expect(payloads[0].venue).toBe("ciao-bella");
  await expect(page.getByRole("log")).toContainText(
    "A fictional venue scope test reply.",
  );
  await page.getByRole("button", { name: /Ciao Bella/ }).click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: /Qwerty/ })
    .click();
  await input.fill("And this venue?");
  await input.press("Enter");
  await expect.poll(() => payloads.length).toBe(2);
  expect(payloads[1]).toMatchObject({ venue: "qwerty", history: [] });
});

test("fictional promotion evidence is withheld from normal concierge presentation without rewriting it as a real offer", async ({
  page,
}) => {
  await page.route("**/api/concierge", async (route) =>
    route.fulfill({
      json: {
        kind: "model_grounded",
        message: "A fictional promotion with AED 99 test credit.",
        facts: [
          {
            id: "offer-fixture",
            key: "FICTIONAL-OFFER",
            text: "Fictional offer conditions.",
            label: "Fictional test offer",
            sources: [],
          },
        ],
        incomplete: false,
      },
    }),
  );
  await page.goto("/concierge");
  await page
    .getByRole("textbox", { name: "Message the concierge" })
    .fill("Any offers?");
  await page.getByRole("button", { name: "Send concierge question" }).click();
  await expect(page.getByRole("log")).toContainText(
    "Current offer details aren’t available here",
  );
  await expect(page.getByRole("log")).not.toContainText(
    /AED 99|fictional promotion/i,
  );
  await expect(
    page
      .getByRole("log")
      .getByRole("link", { name: "Hotel guide", exact: true }),
  ).toBeVisible();
});
