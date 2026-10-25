import { createClient } from "@supabase/supabase-js";
import { readFileSync, writeFileSync } from "node:fs";
import { randomUUID } from "node:crypto";
import { spawnSync } from "node:child_process";
import { localStatus, sql } from "./local-lib.mjs";
const status = localStatus();
const accounts = JSON.parse(
  readFileSync(".local/review-credentials.json", "utf8"),
);
const make = (key = status.ANON_KEY) =>
  createClient(status.API_URL, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
const admin = make(status.SERVICE_ROLE_KEY);
const anon = make();
const offerId = "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";
const otherId = "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb";
const venue = "11111111-1111-4111-8111-111111111111";
let passes = 0;
function check(ok, label) {
  if (!ok) throw new Error("FAILED: " + label);
  passes++;
  console.log("PASS: " + label);
}
async function signed(role) {
  const c = make();
  const { error } = await c.auth.signInWithPassword({
    email: accounts[role].email,
    password: accounts[role].password,
  });
  if (error)
    throw new Error(
      "Test identity sign-in failed; credentials were not printed.",
    );
  return c;
}
async function read(c, id = offerId) {
  return c.from("offers").select("*").eq("id", id).maybeSingle();
}
const staff = await signed("staff"),
  viewer = await signed("unauthorised"),
  other = await signed("otherVenue");
const original = (await read(admin)).data;
if (!original) throw new Error("Fictional seed offer missing.");
const fixtureIds = [];
try {
  const signup = await anon.auth.signUp({
    email: "blocked-" + randomUUID() + "@m1.example.test",
    password: randomUUID() + randomUUID(),
  });
  if (signup.data.user) await admin.auth.admin.deleteUser(signup.data.user.id);
  check(
    !!signup.error && signup.error.code === "signup_disabled",
    "public self-signup is disabled while test email/password sign-in works",
  );
  check(
    !!(await read(anon)).data,
    "anonymous guest can read published in-date fictional offer",
  );
  const before = original.title;
  const anonymousWrite = await anon
    .from("offers")
    .update({ title: "Anonymous write must fail" })
    .eq("id", offerId)
    .select();
  check(
    !!anonymousWrite.error && (await read(admin)).data.title === before,
    "anonymous direct Data API update denied and stored record unchanged",
  );
  await viewer.auth.updateUser({ data: { role: "admin", venue_id: venue } });
  const viewerWrite = await viewer
    .from("offers")
    .update({ title: "Unauthorised write must fail" })
    .eq("id", offerId)
    .select();
  check(
    (!!viewerWrite.error || !viewerWrite.data?.length) &&
      (await read(admin)).data.title === before,
    "signed-in non-staff and self-claimed metadata role cannot modify offer",
  );
  const promote = await viewer
    .from("staff_venue_access")
    .insert({ user_id: accounts.unauthorised.id, venue_id: venue });
  check(
    !!promote.error,
    "authenticated user cannot grant themself venue access",
  );
  const otherWrite = await other
    .from("offers")
    .update({ title: "Cross-venue write must fail" })
    .eq("id", offerId)
    .select();
  check(
    (!!otherWrite.error || !otherWrite.data?.length) &&
      (await read(admin)).data.title === before,
    "staff from another venue cannot modify pilot offer",
  );
  check(
    !(await read(staff, otherId)).data,
    "pilot staff cannot read another venue private draft",
  );
  const targetOther = await staff
    .from("offers")
    .update({ title: "Wrong venue" })
    .eq("id", otherId)
    .select();
  check(
    !!targetOther.error || !targetOther.data?.length,
    "pilot staff cannot update another venue draft",
  );
  const spoof = await staff
    .from("offers")
    .update({
      venue_id: "22222222-2222-4222-8222-222222222222",
      updated_by: accounts.unauthorised.id,
    })
    .eq("id", offerId)
    .select();
  check(!!spoof.error, "column privileges deny venue and authorship spoofing");
  const invalid = await staff
    .from("offers")
    .update({ starts_on: "2027-02-01", ends_on: "2027-01-01" })
    .eq("id", offerId);
  check(!!invalid.error, "database rejects inverted offer dates");
  await admin
    .from("staff_venue_access")
    .delete()
    .eq("user_id", accounts.staff.id)
    .eq("venue_id", venue);
  const revoked = await staff
    .from("offers")
    .update({ title: "Revoked permission must fail" })
    .eq("id", offerId)
    .select();
  check(
    (!!revoked.error || !revoked.data?.length) &&
      (await read(admin)).data.title === before,
    "revoking venue permission blocks an existing signed-in session immediately",
  );
  const granted = await admin
    .from("staff_venue_access")
    .insert({ user_id: accounts.staff.id, venue_id: venue });
  if (granted.error)
    throw new Error("Staff fixture access could not be restored.");
  const tokenTitle = "Fictional persistence check " + randomUUID().slice(0, 8);
  const saved = await staff
    .from("offers")
    .update({ title: tokenTitle })
    .eq("id", offerId)
    .eq("revision", original.revision)
    .select()
    .single();
  check(
    !saved.error &&
      saved.data.revision === original.revision + 1 &&
      saved.data.updated_by === accounts.staff.id,
    "authorised staff save commits a stamped revision",
  );
  check(
    (await read(anon)).data.title === tokenTitle,
    "fresh anonymous Data API read observes committed staff edit",
  );
  const audit = sql(
    `select count(*) from private.offer_revisions where offer_id='${offerId}' and actor_id='${accounts.staff.id}' and revision=${saved.data.revision};`,
  );
  check(
    audit === "1",
    "database audit records authenticated actor and saved revision",
  );
  const results = await Promise.all(
    ["A", "B"].map((v) =>
      staff
        .from("offers")
        .update({ title: "Fictional concurrent save " + v })
        .eq("id", offerId)
        .eq("revision", saved.data.revision)
        .select(),
    ),
  );
  check(
    results.filter((r) => r.data?.length === 1).length === 1,
    "two saves from one revision produce exactly one successful write",
  );
  for (const fixture of [
    {
      title: "Expired fictional offer",
      starts_on: "2020-01-01",
      ends_on: "2020-01-02",
      is_published: true,
    },
    {
      title: "Future fictional offer",
      starts_on: "2098-01-01",
      ends_on: "2098-01-02",
      is_published: true,
    },
    {
      title: "Unpublished fictional offer",
      starts_on: "2020-01-01",
      ends_on: "2098-01-02",
      is_published: false,
    },
  ]) {
    const id = randomUUID();
    fixtureIds.push(id);
    const created = await admin.from("offers").insert({
      id,
      venue_id: venue,
      description: "Fictional visibility test fixture only.",
      terms: "Test data only. No real entitlement.",
      ...fixture,
    });
    if (created.error)
      throw new Error("Could not create local visibility fixture.");
    check(
      !(await read(anon, id)).data && !!(await read(staff, id)).data,
      fixture.title + " is hidden from public but visible to authorised staff",
    );
  }
  const insert = await staff.from("offers").insert({
    venue_id: venue,
    title: "Unapproved insert",
    description: "This request should never create a row.",
    terms: "Test data",
    starts_on: "2020-01-01",
    ends_on: "2098-01-01",
  });
  const removal = await staff.from("offers").delete().eq("id", offerId);
  check(
    !!insert.error && !!removal.error,
    "runtime staff has no offer insertion/deletion privileges",
  );
  const persistent = (await read(anon)).data;
  const restart = spawnSync(
    "docker",
    ["restart", "supabase_db_media-one-connect"],
    { encoding: "utf8" },
  );
  if (restart.status !== 0) throw new Error("Local database restart failed.");
  let recovered;
  for (let i = 0; i < 90; i++) {
    const r = await read(anon);
    if (!r.error && r.data) {
      recovered = r.data;
      break;
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  check(
    !!recovered &&
      recovered.title === persistent.title &&
      recovered.revision === persistent.revision,
    "offer survives an actual Postgres container restart and a new read",
  );
  let authRecovered = false;
  for (let i = 0; i < 20; i++) {
    const probe = make();
    const result = await probe.auth.signInWithPassword({
      email: accounts.staff.email,
      password: accounts.staff.password,
    });
    if (!result.error) {
      authRecovered = true;
      break;
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  check(authRecovered, "Auth reconnects after the actual database restart");
  writeFileSync(
    ".local/permission-results.json",
    JSON.stringify(
      {
        passed: passes,
        failed: 0,
        checkedAt: new Date().toISOString(),
        postgresRestartVerified: true,
      },
      null,
      2,
    ),
    { mode: 0o600 },
  );
  console.log(`${passes} database/Auth/Data API checks passed; no mocks used.`);
} finally {
  await admin
    .from("staff_venue_access")
    .upsert({ user_id: accounts.staff.id, venue_id: venue });
  for (const id of fixtureIds) await admin.from("offers").delete().eq("id", id);
  const { error } = await admin
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
  if (error)
    throw new Error(
      "Test fixture restoration failed; inspect the local demo offer before review.",
    );
}
