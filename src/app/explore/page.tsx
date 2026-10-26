import type { Metadata } from "next";
import Link from "next/link";
import { VenueCard } from "@/components/venue-card";
import { places } from "@/modules/discovery";
import { Icon } from "@/components/icon";
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Explore" };
export default function Explore() {
  return (
    <div className="page-wrap explore-page">
      <header className="page-heading">
        <p>One hotel. Plenty of possibilities.</p>
        <h1>Where to next?</h1>
      </header>
      <div className="discovery-tabs">
        <a href="#dining" className="active">
          Eat & drink
        </a>
        <Link href="/hotel">
          The hotel <Icon name="arrow" />
        </Link>
      </div>
      <section id="dining" aria-label="Dining venues" className="venue-grid">
        {places.map((p, i) => (
          <VenueCard place={p} featured={i === 2} key={p.slug} />
        ))}
      </section>
      <Link className="concierge-strip" href="/concierge">
        <Icon name="chat" />
        <span>
          Need a hand choosing?<small>Ask our AI concierge.</small>
        </span>
        <Icon name="arrow" />
      </Link>
    </div>
  );
}
