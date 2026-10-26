import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { randomUUID } from "node:crypto";
import { spawnSync } from "node:child_process";
import { localStatus, sql } from "./local-lib.mjs";
import { groundedAnswer, makePrompt } from "../src/modules/concierge/answer-core.ts";
const s = localStatus(),
  guard = readFileSync(".env.local", "utf8").match(
    /^CONCIERGE_GUARD_TOKEN=(.+)$/m,
  )[1];
const ac = JSON.parse(readFileSync(".local/review-credentials.json", "utf8"));
const pack = JSON.parse(
  readFileSync(
    "media-one-context/provisional-knowledge/prototype-candidates.json",
    "utf8",
  ),
);
const anon = createClient(s.API_URL, s.ANON_KEY, {
    auth: { persistSession: false },
  }),
  admin = createClient(s.API_URL, s.SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });
let passed = 0;
const check = (ok, label) => {
  if (!ok) throw new Error("FAILED: " + label);
  passed++;
  console.log("PASS: " + label);
};
async function login(role) {
  const c = createClient(s.API_URL, s.ANON_KEY, {
    auth: { persistSession: false },
  });
  const r = await c.auth.signInWithPassword(ac[role]);
  if (r.error) throw new Error("Private test account unavailable.");
  return c;
}
const staff = await login("staff"),
  viewer = await login("unauthorised");
const venue = "11111111-1111-4111-8111-111111111111";
const eligible = async (v = "media-one-hotel", prototype = true) => {
  const r = await anon.rpc("eligible_knowledge", {
    p_venue: v,
    p_prototype: prototype,
    p_guard: guard,
  });
  if (r.error) throw new Error("Eligibility RPC failed");
  return r.data;
};
const originalOffers = JSON.stringify(
  (await admin.from("offers").select("*").order("id")).data,
);
const importVersions = sql("select count(*) from private.knowledge_versions;");
const rerun = spawnSync(process.execPath, ["scripts/import-knowledge.mjs"], {
  encoding: "utf8",
});
if (rerun.status !== 0) throw new Error("Repeat import failed.");
check(
  sql("select count(*) from private.knowledge_imports;") === "82",
  "exactly 82 candidate originals retained; no review-only records imported",
);
check(
  sql("select count(*) from private.knowledge_versions;") === importVersions,
  "repeat import creates no duplicate/version overwrite",
);
check(
  JSON.stringify((await admin.from("offers").select("*").order("id")).data) ===
    originalOffers,
  "M1 offer edits and revisions unchanged by knowledge import",
);
const hotel = await eligible();
const expected = pack.records
  .filter((r) => r.venue_key === "media-one-hotel")
  .map((r) => r.id);
check(
  hotel.every((r) => expected.includes(r.record_key)),
  "selected-venue retrieval excludes unrelated outlets and held identifiers",
);
check(
  !(await eligible("media-one-hotel", false)).some((r) =>
    r.record_key.startsWith("K"),
  ),
  "provisional import is absent outside explicit prototype mode",
);
check(
  hotel.every(
    (r) =>
      !("notes" in r) && !("conflict_ids" in r) && !("original_record" in r),
  ),
  "retrieval payload excludes internal research/conflict fields",
);
for (const v of new Set(pack.records.map((r) => r.venue_key))) {
  const records = await eligible(v);
  const context = records.map((r) => ({ id: r.id, question: r.question, text: r.answer, label: r.provenance, reviewDue: r.review_due, validFrom: r.valid_from, validTo: r.valid_to }));
  if (v === "media-one-hotel") {
    const { data: offers } = await anon.from("offers").select("*").eq("venue_id", venue);
    context.push(...offers.map((o) => ({ id: "offer-" + o.id, question: o.title, text: `${o.title}\n${o.description}\nConditions: ${o.terms}\nInclusive display dates (Asia/Dubai): ${o.starts_on} to ${o.ends_on}. Fictional test offer only; not a real promotion or booking.`, label: "Fictional test offer — not a real promotion", reviewDue: null, validFrom: o.starts_on, validTo: o.ends_on })));
  }
  makePrompt("What can you tell me about this venue?", v, context);
}
check(true, "all six current venue contexts, including published M1 offers, fit the provider request bound");
const direct = await anon.from("knowledge_records").select("*");
check(!!direct.error, "anonymous direct raw knowledge access denied");
const noGuard = await anon.rpc("eligible_knowledge", {
  p_venue: "media-one-hotel",
  p_prototype: true,
  p_guard: null,
});
check(!!noGuard.error, "missing retrieval guard rejected");
const now = new Date(),
  today = new Intl.DateTimeFormat("en-CA", {timeZone: "Asia/Dubai", year: "numeric", month: "2-digit", day: "2-digit"}).format(now),
  due = new Date(now.getTime() + 7 * 86400000).toISOString().slice(0, 10);
const base = {
  venue_id: venue,
  kind: "faq",
  question: "Fictional M2A regression " + randomUUID(),
  answer:
    "Fictional test price AED 19. Conditions: no actual benefit or completed action.",
  provenance: "fictional",
  status: "published",
  source_refs: [{ id: "TEST", title: "Fictional regression source" }],
  reviewed_on: today,
  review_due: due,
  valid_from: null,
  valid_to: null,
};
let id;
try {
  const unauth = await anon.rpc("save_knowledge", {
    p_record: base,
    p_expected_revision: 0,
  });
  check(!!unauth.error, "anonymous knowledge mutation denied");
  const denied = await viewer.rpc("save_knowledge", {
    p_record: base,
    p_expected_revision: 0,
  });
  check(!!denied.error, "signed-in non-staff knowledge mutation denied");
  const created = await staff.rpc("save_knowledge", {
    p_record: base,
    p_expected_revision: 0,
  });
  if (created.error)
    throw new Error(
      "Authorised knowledge save failed: " + created.error.message,
    );
  id = created.data;
  let row = (
    await staff.from("knowledge_records").select("*").eq("id", id).single()
  ).data;
  check(
    !!(await eligible()).find((r) => r.id === id),
    "authorised published content becomes eligible",
  );
  const update = await staff.rpc("save_knowledge", {
    p_record: {
      ...base,
      id,
      answer:
        "Fictional staff update AED 23. Conditions remain explicit; no actual benefit.",
    },
    p_expected_revision: row.revision,
  });
  check(!update.error, "authorised staff content edit persists");
  const current = (await eligible()).find((r) => r.id === id);
  const fixtureAnswer = groundedAnswer(
    { reply: current.answer, intent: "factual", evidence_ids: [id], incomplete: false },
    [{ id, ...current, text: current.answer, label: "Fictional test" }],
  );
  check(
    fixtureAnswer.facts[0].text.includes("AED 23") &&
      !fixtureAnswer.facts[0].text.includes("AED 19"),
    "subsequent grounded-answer pipeline uses changed database wording (selection fixture, not live model)",
  );
  const nullRevision = await staff.rpc("save_knowledge", {
    p_record: { ...base, id },
    p_expected_revision: null,
  });
  check(
    !!nullRevision.error,
    "null revision cannot bypass stale-save protection",
  );
  const wrongVenue = await staff.rpc("save_knowledge", {
    p_record: { ...base, venue_id: "22222222-2222-4222-8222-222222222222" },
    p_expected_revision: 0,
  });
  check(!!wrongVenue.error, "staff cannot author unrelated venue knowledge");
  const states = [
    { status: "draft" },
    { status: "held" },
    { status: "archived" },
    {
      status: "published",
      reviewed_on: "2020-01-01",
      review_due: "2020-01-02",
    },
    { status: "published", valid_from: "2098-01-01", valid_to: "2098-02-01" },
    { status: "published", valid_from: "2020-01-01", valid_to: "2020-01-02" },
  ];
  for (const [index, state] of states.entries()) {
    row = (
      await staff.from("knowledge_records").select("*").eq("id", id).single()
    ).data;
    const result = await staff.rpc("save_knowledge", {
      p_record: { ...base, id, ...state },
      p_expected_revision: row.revision,
    });
    if (result.error) throw new Error("State fixture failed");
    check(
      !(await eligible()).some((r) => r.id === id),
      "draft/held/archive/review-expired/future/expired exclusion " + index,
    );
  }
  const history = await staff.rpc("knowledge_history", { p_id: id });
  check(
    history.data.length >= states.length + 2,
    "staff version history persists all edits",
  );
  const otherHistory = await viewer.rpc("knowledge_history", { p_id: id });
  check(
    otherHistory.data.length === 0,
    "non-staff cannot read knowledge history",
  );
} finally {
  if (id) {
    await admin.from("knowledge_records").delete().eq("id", id);
  }
}
// Transactional fixtures are rolled back: no real trial budget is consumed/reset.
const quote = (v) => "'" + String(v).replaceAll("'", "''") + "'";
const staffId = ac.staff.id;
const transactional = `begin;
select set_config('request.jwt.claim.sub',${quote(staffId)},true);
select set_config('request.jwt.claims',${quote(JSON.stringify({ sub: staffId, role: "authenticated" }))},true);
do $$ declare prior public.knowledge_records; replacement uuid; content jsonb; calls integer:=0; token uuid; begin
 select * into prior from public.knowledge_records where record_key='K009';
 content:=jsonb_build_object('venue_id',prior.venue_id,'topic_key',prior.topic_key,'kind','policy','question',prior.question,'answer','Staff-reviewed regression replacement only.','provenance','staff_reviewed','status','published','source_refs',jsonb_build_array(jsonb_build_object('id','TEST','title','Regression source')),'reviewed_on',(now() at time zone 'Asia/Dubai')::date,'review_due',(now() at time zone 'Asia/Dubai')::date+7,'supersedes',prior.id);
 replacement:=public.save_knowledge(content,0);
 if exists(select 1 from public.eligible_knowledge('media-one-hotel',true,${quote(guard)}) where id=prior.id) then raise exception 'Predecessor leaked';end if;
 if not exists(select 1 from public.eligible_knowledge('media-one-hotel',true,${quote(guard)}) where id=replacement) then raise exception 'Replacement missing';end if;
 update public.knowledge_records set status='held' where id=replacement;
 if exists(select 1 from public.eligible_knowledge('media-one-hotel',true,${quote(guard)}) where id=prior.id or id=replacement) then raise exception 'Stale predecessor revived';end if;
 -- Test budget enforcement only inside this rolled-back transaction, without any model call.
 update private.concierge_config set enabled=true,reserved_cents=0 where id=true;
 begin perform public.reserve_concierge(repeat('a',64),null);raise exception 'Null guard allowed';exception when others then if sqlerrm='Null guard allowed' then raise;end if;end;
 for i in 1..41 loop token:=public.reserve_concierge(encode(extensions.digest(i::text,'sha256'),'hex'),${quote(guard)});perform public.finish_concierge(token,'failed',${quote(guard)});end loop;
 begin perform public.reserve_concierge(repeat('b',64),${quote(guard)});raise exception 'Budget overflow allowed';exception when others then if sqlerrm='Budget overflow allowed' then raise;end if;end;
 if (select reserved_cents from private.concierge_config where id=true)<>492 then raise exception 'Reservation mismatch';end if;
 end $$;
rollback;`;
const budgetBefore = sql(
  "select row_to_json(c)::text from private.concierge_config c;",
);
sql(transactional);
check(
  sql("select row_to_json(c)::text from private.concierge_config c;") ===
    budgetBefore,
  "replacement suppression, non-revival and USD 5 quota tested transactionally; owner budget unchanged",
);
console.log(
  `${passed} M2A database/retrieval checks passed. Live provider calls: 0.`,
);
