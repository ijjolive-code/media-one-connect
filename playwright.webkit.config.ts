import { defineConfig } from "@playwright/test";
import base from "./playwright.config";
export default defineConfig({
  ...base,
  projects: [375, 430, 1440].map((width) => ({
    name: `webkit-${width}`,
    testMatch: ["**/foundation.spec.ts", "**/motion.spec.ts"],
    use: {
      browserName: "webkit" as const,
      viewport: {
        width,
        height: width === 375 ? 812 : width === 430 ? 932 : 1000,
      },
      isMobile: width < 700,
      hasTouch: width < 700,
      launchOptions: process.env.MEDIA_ONE_WEBKIT_EXECUTABLE_PATH
        ? { executablePath: process.env.MEDIA_ONE_WEBKIT_EXECUTABLE_PATH }
        : {},
    },
  })),
});
