import Link from "next/link";
import {
  HomeEntrance,
  FeaturedShowcase,
  VenueRail,
} from "@/components/home-motion";
import { VenueCard } from "@/components/venue-card";
import { Icon } from "@/components/icon";
import { places } from "@/modules/discovery";
export const dynamic = "force-dynamic";
export default function Home() {
  return (
    <HomeEntrance>
      <header className="home-greeting">
        <div>
          <p>Make yourself at home.</p>
          <h1>Your kind of place.</h1>
        </div>
        <Link
          className="round-link"
          href="/hotel"
          aria-label="Hotel information"
        >
          <Icon name="hotel" />
        </Link>
      </header>
      <div className="home-layout">
        <FeaturedShowcase />
        <section className="home-assist">
          <span className="assist-symbol">
            <Icon name="chat" />
          </span>
          <div>
            <h2>Ask Concierge</h2>
            <p>Hotel questions. Dining ideas. Your next move.</p>
          </div>
          <Link className="button primary" href="/concierge">
            Ask Concierge <Icon name="arrow" />
          </Link>
        </section>
        <section className="quick-links" aria-label="Guest shortcuts">
          <Link href="/explore">
            <Icon name="compass" />
            <span>Eat & drink</span>
            <Icon name="arrow" />
          </Link>
          <Link href="/hotel">
            <Icon name="hotel" />
            <span>Hotel guide</span>
            <Icon name="arrow" />
          </Link>
          <Link href="/hotel/knowledge">
            <Icon name="request" />
            <span>Good to know</span>
            <Icon name="arrow" />
          </Link>
        </section>
      </div>
      <VenueRail>
        {[places[2], places[0], places[1], places[3]].map((p) => (
          <VenueCard key={p.slug} place={p} />
        ))}
      </VenueRail>
    </HomeEntrance>
  );
}
