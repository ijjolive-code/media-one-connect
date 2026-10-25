import { readFileSync } from "node:fs";
import { createHash, randomBytes } from "node:crypto";
import { sql, privateWrite } from "./local-lib.mjs";
const file =
  "media-one-context/provisional-knowledge/prototype-candidates.json";
const pack = JSON.parse(readFileSync(file, "utf8"));
if (
  pack.records.length !== 82 ||
  new Set(pack.records.map((r) => r.id)).size !== 82 ||
  pack.records.some(
    (r) =>
      r.allowed_use !== "private_prototype_candidate" ||
      r.production_approved !== false,
  )
)
  throw new Error(
    "Candidate whitelist validation failed. No import performed.",
  );
const env = readFileSync(".env.local", "utf8");
const existing = env.match(/^CONCIERGE_GUARD_TOKEN=(.+)$/m)?.[1];
const guard = existing || randomBytes(32).toString("hex");
const guardHash = createHash("sha256").update(guard).digest("hex");
const literal = (s) => "'" + String(s).replaceAll("'", "''") + "'";
const uuid = (s) => {
  const h = createHash("sha256")
    .update("m2a:" + s)
    .digest("hex");
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-4${h.slice(13, 16)}-8${h.slice(17, 20)}-${h.slice(20, 32)}`;
};
const venueIds = { "media-one-hotel": "11111111-1111-4111-8111-111111111111" };
const statements = ["begin;"];
for (const key of new Set(pack.records.map((r) => r.venue_key))) {
  venueIds[key] ??= uuid("venue:" + key);
  statements.push(
    `insert into public.venues(id,slug,name) values(${literal(venueIds[key])},${literal(key)},${literal(
      key === "media-one-hotel"
        ? "Media One Hotel"
        : key
            .split("-")
            .map((x) => x[0].toUpperCase() + x.slice(1))
            .join(" "),
    )}) on conflict do nothing;`,
  );
}
statements.push(
  `insert into private.concierge_config(id,guard_hash) values(true,${literal(guardHash)}) on conflict do nothing;`,
);
statements.push(
  `do $$ begin if not exists(select 1 from private.concierge_config where guard_hash=${literal(guardHash)}) then raise exception 'Existing server guard differs; configuration preserved'; end if; end $$;`,
);
const sources = new Map(pack.sources.map((s) => [s.id, s]));
for (const r of pack.records) {
  if (r.source_ids.some((id) => !sources.has(id)))
    throw new Error("Candidate source missing.");
  const refs = r.source_ids.map((id) => sources.get(id));
  const id = uuid(r.id);
  const kind = [
    "facilities",
    "amenity",
    "rooms",
    "accessibility",
    "meetings",
    "events",
  ].includes(r.category)
    ? "facility"
    : ["stay", "dietary", "price", "transport"].includes(r.category)
      ? "policy"
      : "faq";
  const nullable = (v) => (v ? literal(v) : "null");
  statements.push(
    `insert into public.knowledge_records(id,record_key,venue_id,topic_key,kind,question,answer,provenance,status,source_refs,collected_on,reviewed_on,review_due,valid_from,valid_to) values(${literal(id)},${literal(r.id)},${literal(venueIds[r.venue_key])},${literal(r.id)},${literal(kind)},${literal(r.question)},${literal(r.answer)},'provisional','prototype',${literal(JSON.stringify(refs))}::jsonb,${literal(pack.collected_on)},${literal(pack.collected_on)},${literal(r.review_after)},${nullable(r.valid_from)},${nullable(r.valid_to)}) on conflict(record_key) do nothing;`,
  );
  statements.push(
    `insert into private.knowledge_imports(record_id,original_record,pack_metadata) values(${literal(id)},${literal(JSON.stringify(r))}::jsonb,${literal(JSON.stringify({ schema_version: pack.schema_version, collected_on: pack.collected_on, timezone: pack.timezone, use_scope: pack.use_scope, production_approved: false }))}::jsonb) on conflict do nothing;`,
  );
}
statements.push("commit;");
sql(statements.join("\n"));
if (!existing)
  privateWrite(
    ".env.local",
    env.trimEnd() +
      `\nCONCIERGE_GUARD_TOKEN=${guard}\nCONCIERGE_PRIVATE_PROTOTYPE=true\nCONCIERGE_AI_ENABLED=false\n`,
  );
console.log(
  "82 whitelisted candidate records imported/preserved across six venues. Original metadata retained privately; no held records, conflict register or menu documents indexed. Existing edits, replacements and budgets were not reset.",
);
