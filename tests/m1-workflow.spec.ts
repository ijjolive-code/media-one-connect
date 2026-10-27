import { test, expect, type Page } from "@playwright/test";
import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";
test.describe.configure({ mode: "serial" });
const accounts = JSON.parse(
  readFileSync(".local/review-credentials.json", "utf8"),
) as Record<string, { email: string; password: string }>;
const url = process.env.SUPABASE_URL!;
if (!url || !["127.0.0.1", "localhost"].includes(new URL(url).hostname))
  throw new Error("M1 browser tests require the local fictional-data stack.");
const key = process.env.SUPABASE_ANON_KEY!;
const offerId = "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";
async function login(page: Page, role: string) {
  await page.goto("/staff/sign-in");
  await page
    .getByRole("textbox", { name: "Staff email" })
    .fill(accounts[role].email);
  await page
    .getByLabel("Password", { exact: true })
    .fill(accounts[role].password);
  await page.getByRole("button", { name: "Sign in", exact: true }).click();
  await expect(page).toHaveURL(/\/staff$/);
}

test("non-staff sign-in grants no editor and logout clears the browser session", async ({
  page,
}) => {
  await login(page, "unauthorised");
  await expect(
    page.getByRole("heading", { name: "Access not granted" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Save demo offer" }),
  ).toHaveCount(0);
  await page.goto("/staff/review");
  await expect(
    page.getByRole("heading", { name: "Access not granted" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Sign out" }).click();
  await expect(page).toHaveURL(/\/staff\/sign-in$/);
  await page.goto("/staff");
  await expect(page).toHaveURL(/\/staff\/sign-in$/);
});

for (const viewport of [
  { width: 1440, height: 1000 },
  { width: 375, height: 812 },
  { width: 430, height: 932 },
]) {
  test(`authorised staff edit persists in the protected test view and stays out of normal guest presentation at ${viewport.width}px`, async ({
    page,
    browser,
  }) => {
    await page.setViewportSize(viewport);
    const api = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const session = await api.auth.signInWithPassword(accounts.staff);
    if (session.error) throw new Error("Local test staff login failed.");
    const original = (
      await api.from("offers").select("*").eq("id", offerId).single()
    ).data;
    if (!original) throw new Error("Local seeded offer not readable.");
    const guest = await browser.newContext({ viewport });
    const guestPage = await guest.newPage();
    const reviewer = await page.context().newPage();
    const title = `Fictional staff-edited offer ${viewport.width}px`;
    try {
      await login(page, "staff");
      await expect(
        page.getByRole("heading", { name: "Hotel offers", exact: true }),
      ).toBeVisible();
      const form = page.locator(".offer-editor");
      await form.getByLabel("Offer title", { exact: true }).fill(title);
      await form
        .getByLabel("Description", { exact: true })
        .fill(
          "A fictional offer edited by authorised test staff and saved in the persistent development database.",
        );
      await form
        .getByLabel("Sample conditions", { exact: true })
        .fill("Demonstration only. No real discount, benefit or reservation.");
      const today = new Date();
      const start = new Date(today.getTime() - 86400000)
        .toISOString()
        .slice(0, 10);
      const end = new Date(today.getTime() + 7 * 86400000)
        .toISOString()
        .slice(0, 10);
      await form.getByLabel("Start date", { exact: true }).fill(start);
      await form.getByLabel("End date", { exact: true }).fill(end);
      await form.getByRole("checkbox").check();
      await page
        .getByRole("button", { name: "Save demo offer", exact: true })
        .click();
      await expect(page.getByRole("status")).toContainText(
        "Saved to the demo database",
      );
      await guestPage.goto("/hotel");
      await expect(
        guestPage.getByRole("heading", { name: title, exact: true }),
      ).toHaveCount(0);
      await guestPage.goto("/");
      await expect(
        guestPage.getByRole("heading", { name: title, exact: true }),
      ).toHaveCount(0);
      await guestPage.goto("/staff/review");
      await expect(guestPage).toHaveURL(/staff\/sign-in$/);
      await reviewer.goto("/staff/review");
      await expect(
        reviewer.getByRole("heading", { name: title, exact: true }),
      ).toBeVisible();
      await reviewer.reload();
      await expect(
        reviewer.getByRole("heading", { name: title, exact: true }),
      ).toBeVisible();
      await expect(
        reviewer
          .getByRole("main")
          .getByText("Fictional content", { exact: true }),
      ).toBeVisible();
      const fresh = (
        await api.from("offers").select("*").eq("id", offerId).single()
      ).data;
      expect(fresh.title).toBe(title);
      expect(fresh.revision).toBeGreaterThan(original.revision);
      await page.reload();
      await expect(page.getByLabel("Offer title", { exact: true })).toHaveValue(
        title,
      );
      await expect(
        page.getByRole("navigation", { name: "Guest navigation" }),
      ).toHaveCount(0);
      expect(
        await page
          .getByRole("main")
          .evaluate((el) => el.scrollWidth <= el.clientWidth),
      ).toBe(true);
      // A second page keeps its old revision. A later save may not silently overwrite it.
      const stale = await page.context().newPage();
      await stale.goto("/staff");
      await page
        .getByLabel("Offer title", { exact: true })
        .fill(title + " newer");
      await page
        .getByRole("button", { name: "Save demo offer", exact: true })
        .click();
      await expect(page.getByRole("status")).toContainText(
        "Saved to the demo database",
      );
      await stale
        .getByLabel("Offer title", { exact: true })
        .fill(title + " stale");
      await stale
        .getByRole("button", { name: "Save demo offer", exact: true })
        .click();
      await expect(stale.locator(".form-error[role=alert]")).toContainText(
        "This offer changed",
      );
      await stale.close();
      await page.getByRole("button", { name: "Sign out", exact: true }).click();
      await expect(page).toHaveURL(/\/staff\/sign-in$/);
      await page.goto("/staff");
      await expect(page).toHaveURL(/\/staff\/sign-in$/);
    } finally {
      const restored = await api
        .from("offers")
        .update({
          title: original.title,
          description: original.description,
          terms: original.terms,
          starts_on: original.starts_on,
          ends_on: original.ends_on,
          is_published: original.is_published,
        })
        .eq("id", offerId);
      if (restored.error)
        throw new Error("M1 browser fixture restoration failed.");
      await reviewer.close();
      await guest.close();
    }
  });
}
