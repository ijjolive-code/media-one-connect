import { existsSync } from "node:fs";
if (existsSync(".env.local")) process.loadEnvFile(".env.local");
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  testMatch: "**/*.spec.ts",
  fullyParallel: true,
  workers: 2,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://127.0.0.1:3100",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
      ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH }
      : {},
  },
  projects: [
    {
      name: "desktop-chromium",
      testIgnore: ["**/m1-workflow.spec.ts", "**/m2a-workflow.spec.ts"],
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1440, height: 1000 },
      },
    },
    {
      name: "mobile-chromium",
      testIgnore: ["**/m1-workflow.spec.ts", "**/m2a-workflow.spec.ts"],
      use: { ...devices["Pixel 7"], viewport: { width: 375, height: 812 } },
    },
    {
      name: "mobile-wide-chromium",
      testIgnore: ["**/m1-workflow.spec.ts", "**/m2a-workflow.spec.ts"],
      use: { ...devices["Pixel 7"], viewport: { width: 430, height: 932 } },
    },
    {
      name: "m1-workflow",
      testMatch: "**/m1-workflow.spec.ts",
      use: { ...devices["Desktop Chrome"], trace: "off" },
    },
    {
      name: "m2a-workflow",
      dependencies: ["m1-workflow"],
      testMatch: "**/m2a-workflow.spec.ts",
      use: { ...devices["Desktop Chrome"], trace: "off" },
    },
  ],
  webServer: {
    command: "npm run start -- --port 3100",
    env: { CONCIERGE_AI_ENABLED: "false" },
    url: "http://127.0.0.1:3100",
    reuseExistingServer: false,
    timeout: 60_000,
  },
});
