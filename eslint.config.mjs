import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTypescript,
  // Installed third-party skills have their own tooling; app React rules do not apply.
  globalIgnores([".agents/skills/**", ".next/**", "playwright-report/**", "test-results/**", "next-env.d.ts"]),
]);
