import Link from "next/link";
import { notFound } from "next/navigation";
import { guestSourceText } from "@/modules/concierge/validation";
import { places } from "@/modules/discovery";
import { guestKnowledge } from "@/modules/guest-knowledge";
import { Photo } from "@/components/photo";
import { VenueHero } from "@/components/venue-hero";
import { PageHeading, EmptyState } from "@/components/page-heading";
import { FactList } from "@/components/fact-list";
import { Icon } from "@/components/icon";
export const dynamic = "force-dynamic";
export default async function Venue({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const place = places.find((p) => p.slug === slug);
  if (!place) notFound();
  let facts;
  try {
    facts = await guestKnowledge(slug);
  } catch {}
  const profile = facts?.find((f) => f.key === place.profile);
  const rest = facts?.filter((f) => f.id !== profile?.id);
  return (
    <div className="page-wrap detail-page">
      <PageHeading title={place.name} />
      <div className="venue-detail-layout">
        <section className="venue-story">
          <VenueHero place={place} />
          <div className="venue-intro">
            {profile ? (
              <p>{guestSourceText(profile.text, [profile])}</p>
            ) : (
              <p>Explore the latest information for {place.name}.</p>
            )}
          </div>
          {place.photo && (
            <Photo
              className="secondary-photo"
              name={place.photo}
              position={place.position}
              alt={
                place.name === "garden on 8"
                  ? "Social atmosphere at garden on 8"
                  : "A closer look at " + place.name
              }
            />
          )}
        </section>
        <section className="venue-information">
          <h2>Before you go.</h2>
          <p className="section-description">
            Details are provisional. Check with the venue before making plans.
          </p>
          {!facts ? (
            <EmptyState
              title="Details aren’t available right now."
              href={`/hotel/knowledge?venue=${slug}`}
              action="Try the venue guide"
            >
              You can try the guide again or ask Concierge.
            </EmptyState>
          ) : !facts.length ? (
            <EmptyState title="More details are on their way.">
              Ask about this venue or explore another spot.
            </EmptyState>
          ) : (
            <FactList facts={rest || []} />
          )}
          <Link className="button primary" href={`/concierge?venue=${slug}`}>
            Ask about {place.name}
            <Icon name="arrow" />
          </Link>
          <p className="action-note">
            Reservations are completed with the venue. This app can’t book a
            table.
          </p>
        </section>
      </div>
    </div>
  );
}
