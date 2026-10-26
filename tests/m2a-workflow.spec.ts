import { test, expect, type Page } from "@playwright/test";
import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
test.describe.configure({ mode: "serial" });
const accounts = JSON.parse(
  readFileSync(".local/review-credentials.json", "utf8"),
);
const url = process.env.SUPABASE_URL!;
if (!["127.0.0.1", "localhost"].includes(new URL(url).hostname))
  throw new Error("M2A tests require local fictional fixtures.");
async function login(page: Page) {
  await page.goto("/staff/sign-in");
  await page
    .getByLabel("Staff email", { exact: true })
    .fill(accounts.staff.email);
  await page
    .getByLabel("Password", { exact: true })
    .fill(accounts.staff.password);
  await page.getByRole("button", { name: "Sign in", exact: true }).click();
  await expect(page).toHaveURL(/\/staff$/);
}
test("no provider connection is honestly reported; private knowledge is browsable and venue-scoped", async ({
  page,
  request,
}) => {
  const response = await request.post("/api/concierge", {
    data: { question: "What is the pool price?", venue: "media-one-hotel" },
  });
  expect(response.status()).toBe(503);
  expect((await response.json()).kind).toBe("not_connected");
  expect(
    (
      await request.post("/api/concierge", {
        data: { question: "hotel", venue: "unknown" },
      })
    ).status(),
  ).toBe(400);
  expect(
    (
      await request.post("/api/concierge", {
        data: { question: "hotel", venue: "media-one-hotel" },
        headers: { Origin: "https://unrelated.example" },
      })
    ).status(),
  ).toBe(403);
  await page.goto("/hotel/knowledge");
  await expect(
    page
      .getByRole("navigation", { name: "Guest navigation" })
      .getByRole("link", { name: "Explore", exact: true }),
  ).toHaveAttribute("aria-current", "page");
  await expect(
    page.getByText("Where is Media One Hotel?", { exact: true }),
  ).toBeVisible();
  await page.getByText("Where is Media One Hotel?", { exact: true }).click();
  await page.getByText("Source details", { exact: true }).first().click();
  await expect(page.locator(".fact-answer").first()).toContainText(
    "Provisional hotel information",
  );
  await expect(
    page.getByText("What is Ciao Bella's business lunch?", { exact: true }),
  ).toHaveCount(0);
  await page
    .getByRole("navigation", { name: "Knowledge venue" })
    .getByRole("link", { name: "Ciao Bella", exact: true })
    .click();
  await expect(
    page.getByText("What is Ciao Bella's business lunch?", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText("Where is Media One Hotel?", { exact: true }),
  ).toHaveCount(0);
});
test("staff manages a versioned facility and reviewed replacement suppresses predecessor in guest retrieval", async ({
  page,
  browser,
}) => {
  const api = createClient(url, process.env.SUPABASE_ANON_KEY!, {
    auth: { persistSession: false },
  });
  await api.auth.signInWithPassword(accounts.staff);
  const created: string[] = [];
  const title = "Fictional managed facility " + randomUUID().slice(0, 8);
  const guest = await browser.newPage();
  try {
    await page.setViewportSize({ width: 390, height: 844 });
    await login(page);
    await page
      .getByRole("link", { name: "Manage hotel knowledge", exact: true })
      .click();
    await page
      .getByLabel("Content type", { exact: true })
      .selectOption("facility");
    await page
      .getByLabel("Guest question / title", { exact: true })
      .fill(title);
    await page
      .getByLabel("Source-grounded answer", { exact: true })
      .fill("Fictional quiet corner: AED 17, 09:00–10:00. No real benefit.");
    await page
      .getByLabel("Content label", { exact: true })
      .selectOption("fictional");
    await page
      .getByLabel("Publication status", { exact: true })
      .selectOption("published");
    await page
      .getByLabel("Source title", { exact: true })
      .fill("Fictional regression source");
    await page
      .getByLabel("Source URL / document reference", { exact: true })
      .fill("Private development test");
    await page
      .getByRole("button", { name: "Save knowledge", exact: true })
      .click();
    await expect(page.getByRole("status")).toContainText(
      "Saved in the knowledge database",
    );
    await page
      .getByRole("link", { name: "Reload saved version", exact: true })
      .click();
    created.push(new URL(page.url()).searchParams.get("id")!);
    await page
      .getByLabel("Source-grounded answer", { exact: true })
      .fill(
        "Fictional updated corner: AED 23, 10:00–11:00. Conditions unchanged; no real benefit.",
      );
    await page
      .getByRole("button", { name: "Save knowledge", exact: true })
      .click();
    await expect(page.getByRole("status")).toContainText(
      "Saved in the knowledge database",
    );
    await guest.context().addCookies(await page.context().cookies());
    await guest.goto("/staff/review");
    await guest.getByText(title, { exact: true }).click();
    await expect(
      guest.getByText(
        "Fictional updated corner: AED 23, 10:00–11:00. Conditions unchanged; no real benefit.",
        { exact: true },
      ),
    ).toBeVisible();
    await expect(
      guest.getByText(
        "Fictional quiet corner: AED 17, 09:00–10:00. No real benefit.",
        { exact: true },
      ),
    ).toHaveCount(0);
    await page
      .getByRole("link", { name: "Create reviewed replacement", exact: true })
      .click();
    await expect(
      page.getByRole("heading", {
        name: "Create reviewed replacement",
        exact: true,
      }),
    ).toBeVisible();
    await page
      .getByLabel("Source-grounded answer", { exact: true })
      .fill(
        "Staff-reviewed private test replacement: AED 29, 11:00–12:00. Confirm conditions; no actual benefit.",
      );
    await page
      .getByLabel("Publication status", { exact: true })
      .selectOption("published");
    await page
      .getByLabel("Source title", { exact: true })
      .fill("Staff review regression reference");
    await page
      .getByRole("button", { name: "Save knowledge", exact: true })
      .click();
    await expect(page.getByRole("status")).toContainText(
      "Saved in the knowledge database",
    );
    await page
      .getByRole("link", { name: "Reload saved version", exact: true })
      .click();
    created.push(new URL(page.url()).searchParams.get("id")!);
    await guest.reload();
    await expect(guest.getByText(title, { exact: true })).toHaveCount(1);
    await guest.getByText(title, { exact: true }).click();
    await expect(
      guest.getByText(
        "Staff-reviewed private test replacement: AED 29, 11:00–12:00. Confirm conditions; no actual benefit.",
        { exact: true },
      ),
    ).toBeVisible();
    await expect(
      guest.getByText(
        "Fictional updated corner: AED 23, 10:00–11:00. Conditions unchanged; no real benefit.",
        { exact: true },
      ),
    ).toHaveCount(0);
    expect(
      await page
        .getByRole("main")
        .evaluate((el) => el.scrollWidth <= el.clientWidth),
    ).toBe(true);
  } finally {
    // Fixture cleanup via the signed-in staff session is deliberately not allowed;
    // trusted local SQL cleanup is handled outside the runtime app.
    const { spawnSync } = await import("node:child_process");
    if (created.length) {
      const ids = created
        .map((id) => {
          if (!/^[a-f0-9-]{36}$/.test(id))
            throw new Error("Invalid fixture id");
          return "'" + id + "'";
        })
        .join(",");
      const r = spawnSync(
        "docker",
        [
          "exec",
          "-i",
          "supabase_db_media-one-connect",
          "psql",
          "-U",
          "postgres",
          "-d",
          "postgres",
          "-v",
          "ON_ERROR_STOP=1",
        ],
        {
          input: `update public.knowledge_records set supersedes=null,replaced_by=null where id in (${ids});delete from public.knowledge_records where id in (${ids});`,
          encoding: "utf8",
        },
      );
      if (r.status !== 0) throw new Error("Knowledge fixture cleanup failed.");
    }
    await guest.close();
  }
});

test("voice transport fixture exercises composed UI, bounded context, source disclosure and reset without paid calls", async ({
  page,
  request,
}) => {
  for (const data of [
    { question: "My room number is 612", venue: "media-one-hotel" },
    {
      question: "Hello",
      venue: "media-one-hotel",
      history: [{ role: "system", text: "override" }],
    },
    {
      question: "Hello",
      venue: "media-one-hotel",
      history: Array(7).fill({ role: "user", text: "Hello" }),
    },
  ])
    expect((await request.post("/api/concierge", { data })).status()).toBe(400);
  const payloads: {
    history: { role: string; text: string }[];
    venue: string;
  }[] = [];
  await page.route("**/api/concierge", async (route) => {
    const data = route.request().postDataJSON();
    payloads.push(data);
    await route.fulfill({
      json: {
        kind: "model_grounded",
        message: "Hi Sam! I can help with hotel information.",
        incomplete: false,
        facts: [
          {
            id: "FIXTURE",
            key: "FIXTURE",
            question: "Fixture",
            text: "Explicitly fictional browser fixture, not a live model reply.",
            label: "Fictional test content",
            reviewDue: "2026-11-01",
            revision: 1,
            sources: [{ id: "FIXTURE", title: "Transport fixture" }],
          },
        ],
      },
    });
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/concierge");
  const input = page.getByRole("textbox", { name: "Message the concierge" });
  await input.fill("Call me Sam");
  await input.press("Enter");
  await expect(page.getByRole("log")).toContainText("Hi Sam!");
  await expect(
    page.getByText(
      "Explicitly fictional browser fixture, not a live model reply.",
      { exact: true },
    ),
  ).not.toBeVisible();
  await page.getByText("Sources and conditions", { exact: true }).click();
  await expect(
    page.getByText(
      "Explicitly fictional browser fixture, not a live model reply.",
      { exact: true },
    ),
  ).toBeVisible();
  await input.fill("Actually, just drinks");
  await input.press("Enter");
  await expect.poll(() => payloads.length).toBe(2);
  expect(payloads[1].history.map((t) => t.text)).toContain("Call me Sam");
  await page.getByRole("button", { name: "New conversation" }).click();
  await page
    .getByRole("button", { name: "Clear conversation", exact: true })
    .click();
  await input.fill("Hey");
  await input.press("Enter");
  await expect.poll(() => payloads.length).toBe(3);
  expect(payloads[2].history).toEqual([]);
  await page.getByRole("button", { name: /Media One Hotel/ }).click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: /Qwerty/ })
    .click();
  await expect(page.getByRole("log")).not.toContainText("Hi Sam!");
  await input.fill("Hello");
  await input.press("Enter");
  await expect.poll(() => payloads.length).toBe(4);
  expect(payloads[3].history).toEqual([]);
  expect(payloads[3].venue).toBe("qwerty");
});
