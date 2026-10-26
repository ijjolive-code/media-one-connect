import Link from "next/link";
import { guestKnowledge } from "@/modules/guest-knowledge";
import { venues } from "@/modules/knowledge/types";
import { PageHeading, EmptyState } from "@/components/page-heading";
import { KnowledgeBrowser } from "@/components/knowledge-browser";
export const dynamic = "force-dynamic";
export default async function PublishedKnowledge({
  searchParams,
}: {
  searchParams: Promise<{ venue?: string }>;
}) {
  const requested = (await searchParams).venue;
  const venue = venues.find((v) => v.slug === requested) || venues[0];
  let facts;
  try {
    facts = await guestKnowledge(venue.slug);
  } catch {}
  return (
    <div className="page-wrap knowledge-page">
      <PageHeading
        title="Good to know."
        description={venue.name}
        back={
          venue.slug === "media-one-hotel" ? "/hotel" : `/explore/${venue.slug}`
        }
        backLabel={
          venue.slug === "media-one-hotel" ? "Hotel guide" : venue.name
        }
      />
      <nav className="venue-links" aria-label="Knowledge venue">
        {venues.map((v) => (
          <Link
            key={v.slug}
            href={`/hotel/knowledge?venue=${v.slug}`}
            aria-current={v.slug === venue.slug ? "page" : undefined}
          >
            {v.name}
          </Link>
        ))}
      </nav>
      <div className="knowledge-content">
        <p className="section-description">
          Information is provisional. Source details are available with each
          answer.
        </p>
        {!facts ? (
          <EmptyState
            title="Answers are unavailable right now."
            href={`/hotel/knowledge?venue=${venue.slug}`}
            action="Try again"
          >
            Please try again or ask about another venue.
          </EmptyState>
        ) : facts.length ? (
          <KnowledgeBrowser key={venue.slug} facts={facts} scope={venue.slug} />
        ) : (
          <EmptyState title="We don’t have current details here yet.">
            Ask Concierge or explore another venue.
          </EmptyState>
        )}
      </div>
    </div>
  );
}
