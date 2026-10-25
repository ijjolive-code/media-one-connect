import { test, expect } from "@playwright/test";

test("guest navigation, fictional content and future modules are usable", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("A little less ordinary");
  await expect(page.getByText("Fictional hotel data · No live services or bookings")).toBeVisible();
  await page.getByRole("link", { name: "Explore the hotel", exact: true }).click();
  await expect(page).toHaveURL(/\/hotel$/);
  await expect(page.getByText("Fictional demonstration data", { exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "From 3:00 pm" })).toBeVisible();
  await page.getByRole("navigation").getByRole("link", { name: "Coming next" }).click();
  await expect(page.getByRole("heading", { name: "Planned modules." })).toBeVisible();
  await expect(page.getByText("Not connected in this demo", { exact: true })).toHaveCount(5);
  await expect(page.getByRole("link", { name: "Coming next", exact: true })).toHaveAttribute("aria-current", "page");
  await expect(page.getByRole("button", { name: /book|redeem|submit request/i })).toHaveCount(0);
  expect(errors).toEqual([]);
});

test("scripted concierge replies honestly, resets and does not persist on reload", async ({ page }) => {
  await page.goto("/concierge");
  await expect(page.getByText("Scripted demo · Not live AI", { exact: true })).toBeVisible();
  const log = page.getByRole("log");
  const reset = page.getByRole("button", { name: "Reset demo" });
  await expect(reset).toBeDisabled();
  await page.getByRole("button", { name: "What time is check-in?" }).click();
  await expect(log).toContainText("check-in is from 3:00 pm");
  await expect(log).toContainText("not Media One Hotel's confirmed policy");
  await page.getByRole("button", { name: "Can you book a room?" }).click();
  await expect(log).toContainText("I have not checked availability, held a room or made a reservation");
  await page.getByRole("button", { name: "Can I speak to the team?" }).click();
  await expect(log).toContainText("No message has been sent to staff");
  await reset.click();
  await expect(log).not.toContainText("YOUR SAMPLE QUESTION");
  await expect(reset).toBeDisabled();
  await page.getByRole("button", { name: "What can I explore?" }).click();
  await expect(log).toContainText("Current facilities and opening hours have not been verified");
  await page.reload();
  await expect(log).not.toContainText("YOUR SAMPLE QUESTION");
});

test("staff shell is explicitly unauthenticated with no operational controls", async ({ page }) => {
  await page.goto("/staff");
  await expect(page.getByRole("heading", { name: "A place for the team." })).toBeVisible();
  await expect(page.getByText("No staff authentication or private records yet", { exact: true })).toBeVisible();
  await expect(page.getByLabel("Service connection status").getByText("Not connected")).toHaveCount(3);
  await expect(page.locator("input, textarea, form, button")).toHaveCount(0);
  await page.getByRole("link", { name: "See the guest demo" }).click();
  await expect(page).toHaveURL(/\/concierge$/);
});

test("all routes fit the viewport and expose a main heading", async ({ page }, testInfo) => {
  for (const route of ["/", "/hotel", "/concierge", "/staff", "/explore"]) {
    await page.goto(route);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expect(page.getByRole("main")).toBeVisible();
    const fits = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
    expect(fits, `${route} must not overflow horizontally`).toBe(true);
    if (route === "/") await page.screenshot({ path: testInfo.outputPath("homepage.png"), fullPage: true });
  }
  await page.setViewportSize({ width: 320, height: 740 });
  for (const route of ["/", "/hotel", "/concierge", "/staff", "/explore"]) {
    await page.goto(route);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `${route} at 320px`).toBe(true);
  }
});

test("keyboard skip link works and unknown routes give a recovery link", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("main")).toBeFocused();
  const response = await page.goto("/not-a-page");
  expect(response?.status()).toBe(404);
  await page.getByRole("link", { name: "Back to Discover" }).click();
  await expect(page).toHaveURL("/");
});
