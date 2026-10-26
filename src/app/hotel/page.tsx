import Link from "next/link";
import type { Metadata } from "next";
import { guestKnowledge } from "@/modules/guest-knowledge";
import { Photo } from "@/components/photo";
import { PageHeading, EmptyState } from "@/components/page-heading";
import { FactList } from "@/components/fact-list";
import { Icon } from "@/components/icon";
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Hotel guide" };
export default async function Hotel() {
  let facts;
  try {
    facts = await guestKnowledge("media-one-hotel");
  } catch {}
  const keys = ["K001", "K002", "K004", "K009", "K010", "K011", "K014", "K020"];
  return (
    <div className="page-wrap hotel-page">
      <PageHeading
        title="Make yourself at home."
        back="/"
        backLabel="Home"
        description="Your guide to Media One Hotel."
      />
      <div className="hotel-layout">
        <section>
          <Photo
            className="hotel-arrival"
            name="hotel-exterior"
            alt="The exterior of Media One Hotel in Dubai Media City"
            priority
          />
          <div className="section-heading">
            <h2>The essentials.</h2>
            <Link className="text-link" href="/hotel/knowledge">
              View all <Icon name="arrow" />
            </Link>
          </div>
          <p className="section-description">
            Information is provisional. Confirm details with the hotel before
            making plans.
          </p>
          {facts ? (
            <FactList
              facts={facts.filter(
                (f) =>
                  keys.includes(f.key) ||
                  /check.in|check.out|cancellation|how can I contact the hotel/i.test(
                    f.question,
                  ),
              )}
            />
          ) : (
            <EmptyState
              title="The guide is unavailable."
              href="/hotel"
              action="Reload guide"
            >
              Please try again in a moment.
            </EmptyState>
          )}
        </section>
        <aside className="hotel-side">
          <Photo
            className="hotel-lifestyle"
            name="rooms-lifestyle-teal"
            alt="A lifestyle photograph in a Media One Hotel room"
          />
          <div className="hotel-side-copy">
            <h2>A space to call your own.</h2>
            <p>
              Get to know the hotel, explore its venues or ask us a question.
            </p>
            <Link className="button" href="/concierge">
              Ask Concierge <Icon name="arrow" />
            </Link>
          </div>
          <Link className="text-link" href="/my-stay">
            Need help with a stay? <Icon name="arrow" />
          </Link>
        </aside>
      </div>
    </div>
  );
}
