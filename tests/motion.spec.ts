import { test, expect, type Page } from "@playwright/test";
const showcase = (page: Page) =>
  page.getByRole("region", { name: "Featured venues" });
const rail = (page: Page) =>
  page.getByRole("region", { name: "Find your spot" });
async function home(page: Page) {
  await page.goto("/");
  await page.mouse.move(2, 2);
  await expect(showcase(page)).toHaveAttribute("data-playing", "true");
}
async function play(page: Page, name: string) {
  await page.getByRole("button", { name, exact: true }).click();
  await page.mouse.move(2, 2);
}

test("real six second showcase advances atomically, keeps its dimensions and exposes only one venue link", async ({
  page,
}) => {
  await home(page);
  const box = await showcase(page).boundingBox();
  await expect(showcase(page)).toHaveAttribute("data-slide", "0");
  await expect(showcase(page).getByRole("link")).toHaveCount(1);
  await expect(showcase(page)).toHaveAttribute("data-slide", "1", {
    timeout: 8500,
  });
  await expect(showcase(page).getByRole("link")).toHaveAttribute(
    "href",
    "/explore/garden-on-8",
  );
  await expect(showcase(page).getByRole("heading")).toHaveText("garden on 8");
  expect((await showcase(page).boundingBox())!.height).toBeCloseTo(
    box!.height,
    0,
  );
  expect(await page.locator('[data-playing="true"]').count()).toBe(1);
  await play(page, "Pause featured venues");
  await expect(showcase(page)).toHaveAttribute("data-playing", "false");
  const index = await showcase(page).getAttribute("data-slide");
  await page.waitForTimeout(6600);
  expect(await showcase(page).getAttribute("data-slide")).toBe(index);
});

test("manual selection, keyboard focus and pointer contact stop autoplay until explicit play", async ({
  page,
}) => {
  await home(page);
  await page
    .getByRole("button", { name: "Show Ciao Bella", exact: true })
    .click();
  await expect(showcase(page)).toHaveAttribute("data-slide", "2");
  await expect(showcase(page)).toHaveAttribute("data-playing", "false");
  await expect(showcase(page).getByRole("link")).toHaveAttribute(
    "href",
    "/explore/ciao-bella",
  );
  await showcase(page).getByRole("link").focus();
  await expect(showcase(page).getByRole("link")).toBeFocused();
  await expect(
    showcase(page).getByRole("button", { name: "Play featured venues" }),
  ).toBeVisible();
  await play(page, "Play featured venues");
  await expect(showcase(page)).toHaveAttribute("data-playing", "true");
  await page.getByRole("button", { name: "Show Qwerty", exact: true }).focus();
  await expect(showcase(page)).toHaveAttribute("data-playing", "false");
  await page.keyboard.press("Enter");
  await expect(showcase(page)).toHaveAttribute("data-slide", "3");
});

test("desktop hover is a temporary pause and leaving does not override an interaction stop", async ({
  page,
}) => {
  await home(page);
  await showcase(page).hover();
  await expect(showcase(page)).toHaveAttribute("data-playing", "false");
  await page.mouse.move(2, 2);
  await expect(showcase(page)).toHaveAttribute("data-playing", "true");
  await showcase(page).getByRole("link").focus();
  await page.mouse.move(2, 2);
  await expect(showcase(page)).toHaveAttribute("data-playing", "false");
});

test("the substantially visible rail owns autoplay, settles at a real boundary and stops at the end", async ({
  page,
}) => {
  await home(page);
  await page.locator("main").evaluate((el) => (el.scrollTop = el.scrollHeight));
  await page.mouse.move(2, 2);
  await expect(rail(page)).toHaveAttribute("data-playing", "true");
  await expect(showcase(page)).toHaveAttribute("data-playing", "false");
  const track = page.locator(".home-venues");
  await expect
    .poll(() => track.evaluate((el) => el.scrollLeft), { timeout: 9000 })
    .toBeGreaterThan(20);
  await page.waitForTimeout(700);
  const geometry = await track.evaluate((el) => {
    const cards = [...el.children] as HTMLElement[];
    return {
      left: el.scrollLeft,
      points: cards.map((c) =>
        Math.min(
          el.scrollWidth - el.clientWidth,
          c.offsetLeft - cards[0].offsetLeft,
        ),
      ),
    };
  });
  expect(
    Math.min(...geometry.points.map((p) => Math.abs(p - geometry.left))),
  ).toBeLessThan(4);
  await track.focus();
  await expect(rail(page)).toHaveAttribute("data-playing", "false");
  await page.keyboard.press("End");
  await track.evaluate((el) => (el.scrollLeft = el.scrollWidth));
  await expect(rail(page)).toHaveAttribute("data-ended", "true");
  await expect(
    page.getByRole("button", { name: "Next venue card", exact: true }),
  ).toBeDisabled();
  await play(page, "Play venue cards");
  await expect
    .poll(() => track.evaluate((el) => el.scrollLeft))
    .toBeLessThan(3);
  await expect(rail(page)).toHaveAttribute("data-playing", "true");
});

test("offscreen and hidden visibility pause with a fresh interval rather than catching up", async ({
  page,
}) => {
  await home(page);
  await page.clock.install();
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", {
      configurable: true,
      get: () => true,
    });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect(showcase(page)).toHaveAttribute("data-playing", "false");
  await page.clock.fastForward(25000);
  await expect(showcase(page)).toHaveAttribute("data-slide", "0");
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", {
      configurable: true,
      get: () => false,
    });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect(showcase(page)).toHaveAttribute("data-playing", "true");
  await page.clock.runFor(500);
  await expect(showcase(page)).toHaveAttribute("data-slide", "0");
  await page.locator("main").evaluate((el) => (el.scrollTop = el.scrollHeight));
  await expect(showcase(page)).toHaveAttribute("data-playing", "false");
  await page.clock.runFor(800);
  await page.locator("main").evaluate((el) => (el.scrollTop = 0));
  await expect(showcase(page)).toHaveAttribute("data-playing", "true");
  await page.clock.runFor(500);
  await expect(showcase(page)).toHaveAttribute("data-slide", "0");
});

test("reduced motion disables autoplay and zoom while all direct venue navigation remains available", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(showcase(page)).toHaveAttribute("data-playing", "false");
  await expect(
    showcase(page).getByRole("button", {
      name: "Automatic motion disabled by your settings",
    }),
  ).toBeDisabled();
  expect(
    await showcase(page)
      .locator("img")
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
  await page
    .getByRole("button", { name: "Show garden on 8", exact: true })
    .click();
  await expect(showcase(page)).toHaveAttribute("data-slide", "1");
  await showcase(page).getByRole("link").click();
  await expect(page).toHaveURL(/\/explore\/garden-on-8$/);
  await expect(page.locator('[data-venue-hero="garden-on-8"]')).toHaveAttribute(
    "data-photo-name",
    "garden-lifestyle",
  );
  await page.goBack();
  await expect(showcase(page)).toHaveAttribute("data-playing", "false");
});

test("Home entrance runs once per tab session, manual state survives navigation and no conversations are stored", async ({
  page,
}) => {
  await home(page);
  expect(
    await page.evaluate(() => sessionStorage.getItem("media-one:home-entered")),
  ).toBe("1");
  await page
    .getByRole("button", { name: "Show Ciao Bella", exact: true })
    .click();
  await expect(showcase(page)).toHaveAttribute("data-slide", "2");
  await page
    .getByRole("navigation", { name: "Guest navigation" })
    .getByRole("link", { name: "Explore", exact: true })
    .click();
  await expect(page).toHaveURL(/explore$/);
  await page
    .getByRole("navigation", { name: "Guest navigation" })
    .getByRole("link", { name: "Home", exact: true })
    .click();
  await expect(showcase(page)).toHaveAttribute("data-slide", "2");
  await expect(showcase(page)).toHaveAttribute("data-playing", "false");
  expect(
    await page
      .locator(".home-greeting")
      .evaluate((el) => el.getAnimations().length),
  ).toBe(0);
  expect(
    await page.evaluate(() => ({
      local: localStorage.length,
      session: Object.keys(sessionStorage),
    })),
  ).toEqual({ local: 0, session: ["media-one:home-entered"] });
});

test("venue photograph travels progressively, direct links and back work and unsupported browsers fall back", async ({
  page,
}) => {
  await home(page);
  const supported = await page.evaluate(() => {
    const native = document.startViewTransition?.bind(document);
    if (!native) return false;
    document.documentElement.dataset.venueTransition = "waiting";
    document.startViewTransition = (
      ...args: Parameters<typeof document.startViewTransition>
    ) => {
      const transition = native(...args);
      transition.ready.then(
        () => {
          document.documentElement.dataset.venueTransition = "ready";
        },
        () => {
          document.documentElement.dataset.venueTransition = "skipped";
        },
      );
      return transition;
    };
    return true;
  });
  await showcase(page).getByRole("link").click();
  await expect(page).toHaveURL(/\/explore\/coco-lounge$/);
  await expect(page.locator('[data-venue-hero="coco-lounge"]')).toHaveAttribute(
    "data-photo-name",
    "coco-pool-night",
  );
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Coco Lounge",
  );
  if (supported)
    await expect(page.locator("html")).toHaveAttribute(
      "data-venue-transition",
      "ready",
    );
  await page.goBack();
  await expect(
    page.getByRole("heading", { name: "Your kind of place." }),
  ).toBeVisible();
  await page.evaluate(() =>
    Object.defineProperty(document, "startViewTransition", {
      configurable: true,
      value: undefined,
    }),
  );
  await page.getByRole("button", { name: "Show Qwerty", exact: true }).click();
  await expect(showcase(page)).toHaveAttribute("data-slide", "3");
  await showcase(page).getByRole("link").click();
  await expect(page).toHaveURL(/\/explore\/qwerty$/);
  await expect(page.locator('[data-venue-hero="qwerty"]')).toHaveAttribute(
    "data-photo-name",
    "qwerty-day",
  );

  await page.goto("/explore/ciao-bella");
  await expect(page.locator('[data-venue-hero="ciao-bella"]')).toHaveAttribute(
    "data-photo-name",
    "ciao-bella-night",
  );
});

test("repeated native sheet open and dismiss preserves focus and resumes only eligible motion", async ({
  page,
}) => {
  await home(page);
  const trigger = page.getByRole("button", {
    name: "Your visit and hotel information",
  });
  const dialog = page.getByRole("dialog");
  for (let i = 0; i < 4; i++) {
    await trigger.click();
    await expect(dialog).toBeVisible();
    await expect(showcase(page)).toHaveAttribute("data-playing", "false");
    await page.keyboard.press("Tab");
    expect(
      await page.evaluate(() => !!document.activeElement?.closest("dialog")),
    ).toBe(true);
    if (i % 2)
      await dialog.getByRole("button", { name: "Close panel" }).click();
    else await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
    await expect(trigger).toBeFocused();
  }
  await page.mouse.move(2, 2);
  await expect(showcase(page)).toHaveAttribute("data-playing", "true");
});
