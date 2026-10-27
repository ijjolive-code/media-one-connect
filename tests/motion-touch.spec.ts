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
test("native touch swipes advance the showcase and rail without stealing vertical scrolling", async ({
  page,
  context,
}) => {
  await home(page);
  const session = await context.newCDPSession(page);
  await session.send("Emulation.setTouchEmulationEnabled", { enabled: true });
  async function swipe(x: number, y: number, dx: number, dy: number) {
    await session.send("Input.dispatchTouchEvent", {
      type: "touchStart",
      touchPoints: [{ x, y }],
    });
    for (let i = 1; i <= 8; i++) {
      await session.send("Input.dispatchTouchEvent", {
        type: "touchMove",
        touchPoints: [{ x: x + (dx * i) / 8, y: y + (dy * i) / 8 }],
      });
      await page.waitForTimeout(20);
    }
    await session.send("Input.dispatchTouchEvent", {
      type: "touchEnd",
      touchPoints: [],
    });
  }
  const image = await showcase(page).locator(".photo").boundingBox();
  await swipe(
    image!.x + image!.width * 0.8,
    image!.y + image!.height * 0.5,
    -image!.width * 0.6,
    0,
  );
  await expect(showcase(page)).toHaveAttribute("data-slide", "1");
  await expect(showcase(page)).toHaveAttribute("data-playing", "false");
  const box = await showcase(page).locator(".photo").boundingBox();
  await swipe(box!.x + box!.width * 0.5, box!.y + box!.height * 0.8, 0, -160);
  await expect
    .poll(() => page.locator("main").evaluate((el) => el.scrollTop))
    .toBeGreaterThan(20);
  await page.locator("main").evaluate((el) => (el.scrollTop = el.scrollHeight));
  const t = await page.locator(".home-venues").boundingBox();
  await swipe(
    t!.x + t!.width * 0.75,
    Math.min(t!.y + 60, page.viewportSize()!.height - 110),
    -t!.width * 0.5,
    0,
  );
  await expect
    .poll(() => page.locator(".home-venues").evaluate((el) => el.scrollLeft))
    .toBeGreaterThan(30);
  await expect(rail(page)).toHaveAttribute("data-playing", "false");
  await session.detach();
});
