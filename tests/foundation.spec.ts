import { test, expect } from "@playwright/test";

test("guest navigation, fictional content and future modules are usable", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Welcome to your stay.",
  );
  await expect(
    page.getByText("Demo information · No live services or bookings"),
  ).toBeVisible();
  await page.getByRole("link", { name: /Hotel information/ }).click();
  await expect(page).toHaveURL(/\/hotel$/);
  await expect(
    page.getByText("Fictional demonstration data", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "From 3:00 pm" }),
  ).toBeVisible();
  await page
    .getByRole("navigation", { name: "Guest navigation" })
    .getByRole("link", { name: "Explore", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Planned modules." }),
  ).toBeVisible();
  await expect(
    page.getByText("Not connected in this demo", { exact: true }),
  ).toHaveCount(5);
  await expect(
    page
      .getByRole("navigation", { name: "Guest navigation" })
      .getByRole("link", { name: "Explore", exact: true }),
  ).toHaveAttribute("aria-current", "page");
  await expect(
    page.getByRole("button", { name: /book|redeem|submit request/i }),
  ).toHaveCount(0);
  expect(errors).toEqual([]);
});

test("scripted concierge replies honestly, resets and does not persist on reload", async ({
  page,
}) => {
  await page.goto("/concierge");
  await expect(
    page.getByText("Scripted demo · Not live AI", { exact: true }),
  ).toBeVisible();
  const log = page.getByRole("log");
  const reset = page.getByRole("button", { name: "Reset demo" });
  await expect(reset).toBeDisabled();
  await page
    .locator("summary")
    .filter({ hasText: "Try a sample question" })
    .click();
  await page.getByRole("button", { name: "What time is check-in?" }).click();
  await expect(log).toContainText("check-in is from 3:00 pm");
  await expect(log).toContainText("not Media One Hotel's confirmed policy");
  await page.getByRole("button", { name: "Can you book a room?" }).click();
  await expect(log).toContainText(
    "I have not checked availability, held a room or made a reservation",
  );
  await page.getByRole("button", { name: "Can I speak to the team?" }).click();
  await expect(log).toContainText("No message has been sent to staff");
  await reset.click();
  await expect(log).not.toContainText("YOUR DEMO MESSAGE");
  await expect(reset).toBeDisabled();
  await page.getByRole("button", { name: "What can I explore?" }).click();
  await expect(log).toContainText(
    "Current facilities and opening hours have not been verified",
  );
  await page.reload();
  await expect(log).not.toContainText("YOUR DEMO MESSAGE");
});

test("staff workspace requires sign-in and exposes no anonymous editor", async ({
  page,
}) => {
  await page.goto("/staff");
  await expect(page).toHaveURL(/\/staff\/sign-in$/);
  await expect(
    page.getByRole("heading", { name: "Staff sign-in" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Save demo offer" }),
  ).toHaveCount(0);
  await expect(
    page.getByRole("navigation", { name: "Guest navigation" }),
  ).toHaveCount(0);
  await page.getByRole("link", { name: "Return to guest app" }).click();
  await expect(page).toHaveURL(/\/profile$/);
});

test("all routes fit the viewport and expose a main heading", async ({
  page,
}, testInfo) => {
  for (const route of [
    "/",
    "/hotel",
    "/concierge",
    "/staff",
    "/explore",
    "/my-stay",
    "/profile",
  ]) {
    await page.goto(route);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expect(page.getByRole("main")).toBeVisible();
    const fits = await page.evaluate(
      () =>
        document.documentElement.scrollWidth <= window.innerWidth &&
        document.querySelector("main")!.scrollWidth <=
          document.querySelector("main")!.clientWidth,
    );
    expect(fits, `${route} must not overflow horizontally`).toBe(true);
    if (route === "/")
      await page.screenshot({
        path: testInfo.outputPath("homepage.png"),
        fullPage: true,
      });
  }
  await page.setViewportSize({ width: 320, height: 740 });
  for (const route of [
    "/",
    "/hotel",
    "/concierge",
    "/staff",
    "/explore",
    "/my-stay",
    "/profile",
  ]) {
    await page.goto(route);
    expect(
      await page.evaluate(
        () =>
          document.documentElement.scrollWidth <= window.innerWidth &&
          document.querySelector("main")!.scrollWidth <=
            document.querySelector("main")!.clientWidth,
      ),
      `${route} at 320px`,
    ).toBe(true);
  }
});

test("keyboard skip link works and unknown routes give a recovery link", async ({
  page,
}) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("main")).toBeFocused();
  const response = await page.goto("/not-a-page");
  expect(response?.status()).toBe(404);
  await page.getByRole("link", { name: "Back to Home" }).click();
  await expect(page).toHaveURL("/");
});

test("five guest destinations persist, highlight hotel under Explore and separate staff access", async ({
  page,
}) => {
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Guest navigation" });
  await expect(nav.getByRole("link")).toHaveText([
    "Home",
    "Explore",
    "Concierge",
    "My Stay",
    "Profile",
  ]);
  await expect(nav.getByRole("link", { name: /staff/i })).toHaveCount(0);
  for (const link of await nav.getByRole("link").all()) {
    const box = await link.boundingBox();
    expect(box!.width).toBeGreaterThanOrEqual(44);
    expect(box!.height).toBeGreaterThanOrEqual(44);
  }
  await page.getByRole("link", { name: /Bookings Room/ }).click();
  await expect(page).toHaveURL(/\/my-stay#bookings$/);
  await expect(
    page.getByText("No reservation has been retrieved or created.", {
      exact: false,
    }),
  ).toBeVisible();
  await nav.getByRole("link", { name: "Home", exact: true }).click();
  await page.getByRole("link", { name: /Requests Help/ }).click();
  await expect(page).toHaveURL(/\/my-stay#requests$/);
  await expect(
    page.getByRole("heading", { name: "Your requests", exact: true }),
  ).toBeVisible();
  await nav.getByRole("link", { name: "Home", exact: true }).click();
  await page.getByRole("link", { name: /Membership Your future/ }).click();
  await expect(page).toHaveURL(/\/profile#membership$/);
  await nav.getByRole("link", { name: "Home", exact: true }).click();
  await page.getByRole("link", { name: /Hotel information/ }).click();
  await expect(
    nav.getByRole("link", { name: "Explore", exact: true }),
  ).toHaveAttribute("aria-current", "page");
  await nav.getByRole("link", { name: "My Stay", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Your requests", exact: true }),
  ).toBeVisible();
  await expect(
    nav.getByRole("link", { name: "My Stay", exact: true }),
  ).toHaveAttribute("aria-current", "page");
  await nav.getByRole("link", { name: "Profile", exact: true }).click();
  await page
    .getByRole("link", { name: "Staff offer workspace", exact: true })
    .click();
  await expect(nav).toHaveCount(0);
  await page.getByRole("link", { name: "Return to guest app" }).click();
  await expect(
    nav.getByRole("link", { name: "Profile", exact: true }),
  ).toHaveAttribute("aria-current", "page");
});

test("local composer is honest, scrolls to the reply and remains above navigation in reduced viewport", async ({
  page,
}) => {
  await page.goto("/concierge");
  const input = page.getByRole("textbox", {
    name: "Message the demonstration concierge",
  });
  const send = page.getByRole("button", { name: "Send demo message" });
  const posts: string[] = [];
  page.on("request", (request) => {
    if (request.method() === "POST") posts.push(request.url());
  });
  await expect(send).toBeDisabled();
  await input.fill("Please book my room now");
  await send.click();
  await expect(page.getByRole("log")).toContainText(
    "No staff message, request or booking was created",
  );
  await input.fill("What time is check-in?");
  await input.press("Enter");
  await expect(page.getByRole("log")).toContainText("check-in is from 3:00 pm");
  expect(posts).toEqual([]);
  // Geometry simulation, not a claim of a real Android/iOS keyboard test.
  for (const viewport of [
    { width: 390, height: 460 },
    { width: 320, height: 460 },
    { width: 844, height: 390 },
  ]) {
    await page.setViewportSize(viewport);
    await input.focus();
    await expect(input).toBeFocused();
    const nav = page.getByRole("navigation", { name: "Guest navigation" });
    await expect
      .poll(async () =>
        Math.round((await page.locator(".app-shell").boundingBox())!.height),
      )
      .toBe(viewport.height);
    await expect
      .poll(async () =>
        page
          .getByRole("log")
          .evaluate((el) => el.scrollHeight - el.scrollTop - el.clientHeight),
      )
      .toBeLessThanOrEqual(2);
    const composerBox = await input.boundingBox();
    const navBox = await nav.boundingBox();
    expect(composerBox!.height).toBeGreaterThanOrEqual(44);
    expect(composerBox!.y).toBeGreaterThanOrEqual(0);
    expect(composerBox!.y + composerBox!.height).toBeLessThanOrEqual(
      viewport.height,
    );
    expect(navBox!.y + navBox!.height).toBeLessThanOrEqual(viewport.height + 1);
    expect(composerBox!.y + composerBox!.height).toBeLessThanOrEqual(navBox!.y);
    for (const link of await nav.getByRole("link").all()) {
      const box = await link.boundingBox();
      expect(box!.y).toBeGreaterThanOrEqual(0);
      expect(box!.y + box!.height).toBeLessThanOrEqual(viewport.height + 1);
    }
    await input.fill("A test message");
    await input.press("Enter");
    expect(
      await page
        .getByRole("log")
        .evaluate((el) => el.scrollHeight - el.scrollTop - el.clientHeight),
    ).toBeLessThanOrEqual(2);
    await nav.getByRole("link", { name: "Home", exact: true }).click();
    await expect(
      page.getByRole("heading", { name: "Welcome to your stay." }),
    ).toBeVisible();
    await nav.getByRole("link", { name: "Concierge", exact: true }).click();
  }
});

test("supplied brand artwork stays proportional and imagery is optimised without serving the manual", async ({
  page,
  request,
}) => {
  await page.goto("/");
  const logo = page.getByRole("img", { name: "Media One Hotel", exact: true });
  const photo = page.getByRole("img", {
    name: "Seating and ring pendant lights in the Media One Hotel lobby",
  });
  for (const image of [logo, photo]) {
    await expect(image).toBeVisible();
    await expect
      .poll(async () =>
        image.evaluate(
          (el) =>
            (el as HTMLImageElement).complete &&
            (el as HTMLImageElement).naturalWidth > 0,
        ),
      )
      .toBe(true);
  }
  for (const viewport of [
    { width: 390, height: 844 },
    { width: 320, height: 460 },
    { width: 1440, height: 1000 },
  ]) {
    await page.setViewportSize(viewport);
    const box = await logo.boundingBox();
    expect(box!.width / box!.height).toBeCloseTo(2424 / 1062, 1);
    // Visible source artwork is 1702px wide inside the untouched 2424px canvas.
    expect((box!.width * 1702) / 2424).toBeGreaterThanOrEqual(95);
    expect(await logo.evaluate((el) => getComputedStyle(el).filter)).toBe(
      "none",
    );
  }
  const photoBox = await photo.boundingBox();
  expect(photoBox!.width / photoBox!.height).toBeCloseTo(1730 / 974, 1);
  const optimised = await request.get(
    "/_next/image?url=%2Fbrand%2Fmedia-one-lobby.jpg&w=384&q=75",
    { headers: { Accept: "image/webp" } },
  );
  expect(optimised.status()).toBe(200);
  expect(optimised.headers()["content-type"]).toContain("image/webp");
  expect((await optimised.body()).length).toBeLessThan(2001221);
  expect(
    (
      await request.get("/brand-reference/Media_One_Design_Manual_Excerpt.pdf")
    ).status(),
  ).toBe(404);
  await page.goto("/profile");
  await expect(
    page.getByText("Chartwell Bars and Geomanist", { exact: false }),
  ).toBeVisible();
  await expect(
    page.getByText("not been supplied or installed", { exact: false }),
  ).toBeVisible();
});
