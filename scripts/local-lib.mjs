import { spawn, spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { mkdirSync, writeFileSync, chmodSync, readFileSync } from "node:fs";
export const cliEnv = {
  ...process.env,
  SUPABASE_HOME:
    process.env.SUPABASE_HOME || join(tmpdir(), "media-one-supabase"),
  SUPABASE_TELEMETRY_DISABLED: "1",
  SUPABASE_INTERNAL_IMAGE_REGISTRY:
    process.env.SUPABASE_INTERNAL_IMAGE_REGISTRY || "ghcr.io",
  SUPABASE_USE_SLIM_IMAGES: "true",
};
// Do not inject an egress proxy into local service containers: BusyBox health
// probes otherwise send 127.0.0.1 requests to that proxy. Docker daemon image
// pulls retain the daemon's own network/trust configuration.
for (const name of [
  "HTTP_PROXY",
  "HTTPS_PROXY",
  "ALL_PROXY",
  "http_proxy",
  "https_proxy",
  "all_proxy",
])
  delete cliEnv[name];
export function cli(args) {
  const result = spawnSync(
    process.execPath,
    ["node_modules/supabase/dist/supabase.js", ...args],
    { env: cliEnv, encoding: "utf8", maxBuffer: 20 * 1024 * 1024 },
  );
  if (result.status !== 0) {
    mkdirSync(".local", { recursive: true, mode: 0o700 });
    writeFileSync(
      ".local/supabase-command.log",
      (result.stdout || "") + (result.stderr || ""),
      { mode: 0o600 },
    );
    throw new Error(
      "Supabase command failed. Inspect .local/supabase-command.log privately; do not paste credentials from logs into chat.",
    );
  }
  return result.stdout;
}
export function localStatus() {
  const status = JSON.parse(cli(["status", "--output", "json"]));
  if (
    !status.API_URL ||
    !["127.0.0.1", "localhost"].includes(new URL(status.API_URL).hostname)
  )
    throw new Error("Local setup refuses non-loopback Supabase targets.");
  return status;
}
export function sql(statement) {
  const result = spawnSync(
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
      "-At",
    ],
    { input: statement, encoding: "utf8" },
  );
  if (result.status !== 0)
    throw new Error(
      "Local database SQL failed. No credential values have been printed.",
    );
  return result.stdout.trim();
}
export function privateWrite(path, text) {
  writeFileSync(path, text, { mode: 0o600 });
  chmodSync(path, 0o600);
}

export async function startLocal() {
  const args = [
    "start",
    "-x",
    "realtime,storage-api,imgproxy,mailpit,postgres-meta,studio,edge-runtime,logflare,vector,supavisor",
  ];
  if (!process.env.CODEX_ENVIRONMENT_ID) {
    cli(args);
    return;
  }
  // Cloud Docker injects a proxy even into container-local BusyBox health probes.
  // Install a loopback-only routing helper, retaining the real native health check.
  let output = "";
  const child = spawn(
    process.execPath,
    ["node_modules/supabase/dist/supabase.js", ...args],
    { env: cliEnv, stdio: ["ignore", "pipe", "pipe"] },
  );
  child.stdout.on("data", (chunk) => {
    output += chunk;
  });
  child.stderr.on("data", (chunk) => {
    output += chunk;
  });
  const patched = new Set();
  const timer = setInterval(() => {
    const inspect = spawnSync(
      "docker",
      ["inspect", "supabase_auth_media-one-connect", "--format", "{{.Id}}"],
      { encoding: "utf8" },
    );
    const id = inspect.stdout?.trim();
    if (inspect.status !== 0 || !id || patched.has(id)) return;
    const helper = readFileSync("scripts/cloud-auth-health.sh", "utf8");
    const result = spawnSync(
      "docker",
      [
        "exec",
        "-u",
        "0",
        "-i",
        "supabase_auth_media-one-connect",
        "/bin/sh",
        "-c",
        "/usr/bin/busybox cat > /usr/local/bin/wget; /usr/bin/busybox chmod 755 /usr/local/bin/wget",
      ],
      { input: helper, encoding: "utf8" },
    );
    if (result.status === 0) patched.add(id);
  }, 1000);
  const status = await new Promise((resolve, reject) => {
    child.on("exit", resolve);
    child.on("error", reject);
  });
  clearInterval(timer);
  if (status !== 0) {
    privateWrite(".local/supabase-command.log", output);
    throw new Error(
      "Local stack failed required health checks. Inspect the private setup log.",
    );
  }
  const native = spawnSync(
    "docker",
    [
      "inspect",
      "supabase_auth_media-one-connect",
      "--format",
      "{{.State.Health.Status}}",
    ],
    { encoding: "utf8" },
  );
  if (native.status !== 0 || native.stdout.trim() !== "healthy")
    throw new Error("Auth native Docker health is not ready.");
}
