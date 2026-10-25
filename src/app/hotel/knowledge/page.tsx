import Link from "next/link";
import { eligibleKnowledge } from "@/modules/knowledge/data";
import { venues } from "@/modules/knowledge/types";
export const dynamic = "force-dynamic";
export default async function PublishedKnowledge({
  searchParams,
}: {
  searchParams: Promise<{ venue?: string }>;
}) {
  const requested = (await searchParams).venue;
  const venue = venues.find((v) => v.slug === requested) || venues[0];
  let records;
  try {
    records = await eligibleKnowledge(venue.slug);
  } catch {}
  return (
    <div className="page-wrap inner-page">
      <span className="eyebrow">PUBLISHED PRIVATE-PROTOTYPE KNOWLEDGE</span>
      <h1>{venue.name}</h1>
      <p className="page-intro">
        Sourced information is provisional until reviewed. Fictional test
        content is labelled separately. No live availability or action is
        confirmed here.
      </p>
      <nav className="venue-links" aria-label="Knowledge venue">
        {venues.map((v) => (
          <Link
            key={v.slug}
            href={"/hotel/knowledge?venue=" + v.slug}
            aria-current={v.slug === venue.slug ? "page" : undefined}
          >
            {v.name}
          </Link>
        ))}
      </nav>
      {!records ? (
        <div className="notice">
          <strong>Knowledge unavailable</strong>
          <p>The eligible knowledge database could not be reached.</p>
        </div>
      ) : records.length === 0 ? (
        <p>
          No eligible published facts are within their validity and review
          windows for this venue.
        </p>
      ) : (
        records.map((r) => (
          <details className="published-fact" key={r.id}>
            <summary>{r.question}</summary>
            <span className="status-tag">{r.label}</span>
            <p>{r.text}</p>
            <small>
              Review before {r.reviewDue} · Sources{" "}
              {r.sources.map((s) => s.id).join(", ")}
            </small>
          </details>
        ))
      )}
    </div>
  );
}
