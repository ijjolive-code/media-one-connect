import { readFileSync } from "node:fs";
import { sql, privateWrite } from "./local-lib.mjs";
process.loadEnvFile(".env.local");
const guard = process.env.CONCIERGE_GUARD_TOKEN;
if (!guard || !/^[a-f0-9]{64}$/.test(guard))
  throw new Error("Run local knowledge setup first.");
const stats = sql(
  "select budget_cents||','||reserved_cents from private.concierge_config where id=true;",
)
  .split(",")
  .map(Number);
if (process.argv.includes("--status")) {
  console.log(
    `Total trial allowance: USD ${(stats[0] / 100).toFixed(2)}. Conservatively reserved: USD ${(stats[1] / 100).toFixed(2)}. No automatic reset.`,
  );
  process.exit(0);
}
const enable = process.argv.includes("--enable");
const disable = process.argv.includes("--disable");
if (!enable && !disable)
  throw new Error(
    "Use --status, --disable, or --enable --confirm-rate-ceilings.",
  );
if (enable) {
  if (!process.env.CONCIERGE_OPENAI_KEY)
    throw new Error(
      "Configure CONCIERGE_OPENAI_KEY privately first. Never put it in chat or Git.",
    );
  if (!process.argv.includes("--confirm-rate-ceilings"))
    throw new Error(
      "First confirm the fixed model current standard rates do not exceed USD 4/million input and USD 16/million output.",
    );
  if (stats[0] !== 500 || stats[1] + 12 > stats[0])
    throw new Error(
      "USD 5 total trial budget is unavailable or exhausted. No reset or increase is allowed without owner approval.",
    );
}
sql(
  `update private.concierge_config set enabled=${enable ? "true" : "false"} where id=true;`,
);
let env = readFileSync(".env.local", "utf8")
  .split("\n")
  .filter((l) => !/^CONCIERGE_(AI_ENABLED|RATE_CEILINGS_CONFIRMED)=/.test(l))
  .join("\n");
privateWrite(
  ".env.local",
  env.trimEnd() +
    `\nCONCIERGE_AI_ENABLED=${enable}\nCONCIERGE_RATE_CEILINGS_CONFIRMED=${enable}\n`,
);
console.log(
  enable
    ? "Trial enabled within the existing USD 5 total allowance. Rebuild/restart Next.js. No provider call was made by this command."
    : "Trial disabled. Existing reservations remain spent; budget was not reset.",
);
