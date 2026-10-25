import { spawnSync } from "node:child_process";
import { cliEnv } from "./local-lib.mjs";
const result = spawnSync(
  process.execPath,
  ["node_modules/supabase/dist/supabase.js", ...process.argv.slice(2)],
  { env: cliEnv, stdio: "inherit" },
);
process.exit(result.status ?? 1);
