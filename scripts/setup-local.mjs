import { createClient } from "@supabase/supabase-js";
import { randomBytes } from "node:crypto";
import { readFileSync, existsSync, mkdirSync } from "node:fs";
import {
  cli,
  localStatus,
  privateWrite,
  sql,
  startLocal,
} from "./local-lib.mjs";

mkdirSync(".local", { recursive: true, mode: 0o700 });
console.log(
  "Starting local Supabase development services. This can take several minutes on the first run.",
);
await startLocal();
cli(["migration", "up", "--local"]);
// Only the fictional seed with ON CONFLICT DO NOTHING; never reset an existing database.
sql(readFileSync("supabase/seed.sql", "utf8"));
const status = localStatus();
// The cloud Docker proxy can misroute container-local wget health checks.
// Never rely on the CLI flag for readiness: verify the actual Auth API and Data API.
let ready = false;
for (let i = 0; i < 60; i++) {
  try {
    const response = await fetch(status.API_URL + "/auth/v1/health", {
      headers: { apikey: status.ANON_KEY },
    });
    const dataResponse = await fetch(
      status.API_URL + "/rest/v1/venues?select=id",
      {
        headers: {
          apikey: status.ANON_KEY,
          Authorization: "Bearer " + status.ANON_KEY,
        },
      },
    );
    if (response.status === 200 && dataResponse.status === 200) {
      ready = true;
      break;
    }
  } catch {}
  await new Promise((resolve) => setTimeout(resolve, 500));
}
if (!ready)
  throw new Error(
    "Required Auth/Data API readiness failed; setup is incomplete.",
  );

const admin = createClient(status.API_URL, status.SERVICE_ROLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});
const file = ".local/review-credentials.json";
let accounts = existsSync(file) ? JSON.parse(readFileSync(file, "utf8")) : {};
for (const [role, email] of Object.entries({
  staff: "staff@m1.example.test",
  unauthorised: "viewer@m1.example.test",
  otherVenue: "other-venue@m1.example.test",
})) {
  if (!accounts[role]) {
    const password = randomBytes(24).toString("base64url");
    const { data, error } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });
    if (error)
      throw new Error(
        "Could not provision a local test identity. Check the existing local identities privately; no password was printed.",
      );
    accounts[role] = { email, password, id: data.user.id };
    privateWrite(file, JSON.stringify(accounts, null, 2) + "\n");
  }
  const { error } = await admin.auth.admin.getUserById(accounts[role].id);
  if (error)
    throw new Error(
      "Saved test identities do not match this local database. Preserve your database and diagnose before recreating accounts.",
    );
}
const { error } = await admin.from("staff_venue_access").upsert([
  {
    user_id: accounts.staff.id,
    venue_id: "11111111-1111-4111-8111-111111111111",
  },
  {
    user_id: accounts.otherVenue.id,
    venue_id: "22222222-2222-4222-8222-222222222222",
  },
]);
if (error) throw new Error("Local venue access could not be assigned.");
const runtime = `SUPABASE_URL=${status.API_URL}\nSUPABASE_ANON_KEY=${status.ANON_KEY}\nAPP_COOKIE_SECURE=${process.env.CODESPACES === "true" ? "true" : "false"}\n`;
if (existsSync(".env.local")) {
  const existing = readFileSync(".env.local", "utf8");
  if (!existing.includes(`SUPABASE_URL=${status.API_URL}`))
    throw new Error(
      "Existing .env.local points elsewhere or lacks the local binding; it was preserved. Configure it privately before proceeding.",
    );
  // Preserve unrelated settings while refreshing only known local bindings.
  const lines = existing
    .split("\n")
    .filter((line) => !/^SUPABASE_(URL|ANON_KEY)=/.test(line));
  privateWrite(
    ".env.local",
    `SUPABASE_URL=${status.API_URL}\nSUPABASE_ANON_KEY=${status.ANON_KEY}\n${lines.join("\n")}`,
  );
} else privateWrite(".env.local", runtime);
console.log(
  "Local database ready; migrations applied and test users provisioned.",
);
console.log(
  "Sign-in details are in .local/review-credentials.json (ignored, mode 600). Read them only inside your private editor; never paste them into chat or commit them.",
);
console.log(
  "Runtime .env.local contains only the loopback URL and unprivileged app key, not an admin key. Existing offer edits were preserved.",
);
