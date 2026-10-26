import Link from "next/link";
import { redirect } from "next/navigation";
import { staffAccess } from "@/modules/offers/data";
import { PILOT_VENUE_ID } from "@/modules/offers/types";
import {
  type KnowledgeRecord,
  provenanceLabel,
} from "@/modules/knowledge/types";
import { StaffTabs } from "@/components/staff-tabs";
import { KnowledgePicker } from "./picker";
import { KnowledgeEditor } from "./editor";
import { signOut } from "../actions";
export const dynamic = "force-dynamic";
export default async function KnowledgePage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string; replace?: string }>;
}) {
  const access = await staffAccess();
  if (access.kind === "anonymous" || access.kind === "unconfigured")
    redirect("/staff/sign-in");
  if (access.kind !== "authorised")
    return (
      <div className="page-wrap">
        <h1>Access not granted</h1>
        <p>Hotel knowledge management requires verified venue access.</p>
        <form action={signOut}>
          <button className="button">Sign out</button>
        </form>
      </div>
    );
  const result = await access.client
    .from("knowledge_records")
    .select("*")
    .eq("venue_id", PILOT_VENUE_ID)
    .order("record_key");
  if (result.error)
    return (
      <div className="page-wrap">
        <h1>Knowledge unavailable</h1>
        <p>Apply the M2A migration/import without resetting the database.</p>
      </div>
    );
  const records = result.data as KnowledgeRecord[];
  const params = await searchParams;
  const record = records.find((r) => r.id === params.id) || null;
  const replacement = records.find((r) => r.id === params.replace) || null;
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Dubai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
  const history = record
    ? await access.client.rpc("knowledge_history", { p_id: record.id })
    : null;
  return (
    <div className="page-wrap staff-page">
      <div className="staff-page-header">
        <div>
          <span className="eyebrow">Media One Hotel</span>
          <h1>Hotel knowledge</h1>
          <p>FAQs, facilities and policies · Media One Hotel</p>
        </div>
        <Link className="text-link" href="/staff">
          Offer workspace
        </Link>
      </div>
      <StaffTabs />
      <details className="staff-notes">
        <summary>Source and publication guidance</summary>
        <p>
          82 provisional candidate records were imported across six venues. You
          manage the records for your assigned hotel. Held research and
          conflicts stay outside guest retrieval. Review deadlines are enforced.
          Publication here is for private review and is not production approval.
        </p>
      </details>
      <div className="knowledge-management">
        <KnowledgePicker>
          <aside className="knowledge-list">
            <Link className="button primary" href="/staff/knowledge">
              New hotel knowledge
            </Link>
            {records.map((r) => (
              <Link
                href={"/staff/knowledge?id=" + r.id}
                key={r.id}
                aria-current={record?.id === r.id ? "page" : undefined}
              >
                <strong>
                  {r.record_key} · {r.question}
                </strong>
                <span>
                  {r.status}
                  {r.replaced_by ? " · Replaced" : ""} · Review before{" "}
                  {r.review_due}
                </span>
              </Link>
            ))}
          </aside>
        </KnowledgePicker>
        <section>
          <KnowledgeEditor
            key={
              record
                ? "edit:" + record.id
                : replacement
                  ? "replace:" + replacement.id
                  : "new"
            }
            record={record}
            replacement={replacement}
            today={today}
          />
          {record && (
            <div className="knowledge-history">
              <h2>Source & version history</h2>
              <p>
                {provenanceLabel(record.provenance)} · Revision{" "}
                {record.revision}
              </p>
              <p>
                Collected: {record.collected_on || "Staff-authored"} · Topic{" "}
                {record.topic_key}
              </p>
              {record.supersedes && (
                <p>
                  Replaces record {record.supersedes}; original source and
                  earlier versions are retained.
                </p>
              )}
              {record.replaced_by ? (
                <p>
                  This predecessor is permanently suppressed by replacement{" "}
                  {record.replaced_by}.
                </p>
              ) : (
                <Link
                  className="button"
                  href={"/staff/knowledge?replace=" + record.id}
                >
                  Create reviewed replacement
                </Link>
              )}
              <details>
                <summary>All source references</summary>
                <ul>
                  {record.source_refs.map((s, i) => (
                    <li key={i}>
                      {s.id} · {s.title}
                      <br />
                      {s.url}
                    </li>
                  ))}
                </ul>
              </details>
              <details>
                <summary>Saved versions</summary>
                {history?.data?.map(
                  (v: {
                    revision: number;
                    changed_at: string;
                    snapshot: KnowledgeRecord;
                  }) => (
                    <article key={v.revision}>
                      <strong>
                        Revision {v.revision} · {v.changed_at}
                      </strong>
                      <p>
                        {v.snapshot.status} · {v.snapshot.answer}
                      </p>
                      <small>Review before {v.snapshot.review_due}</small>
                    </article>
                  ),
                )}
              </details>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
