import Link from "next/link";
import { Photo } from "@/components/photo";
import { VenueCard } from "@/components/venue-card";
import { Icon } from "@/components/icon";
import { places } from "@/modules/discovery";
export const dynamic = "force-dynamic";
export default function Home() {
  return (
    <div className="page-wrap home-page">
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
        <section className="home-feature">
          <Link
            href="/explore/coco-lounge"
            className="feature-photo"
            aria-label="Discover Coco Lounge"
          >
            <Photo
              name="coco-pool-night"
              alt="Coco Lounge pool and terrace in the evening"
              priority
              sizes="(max-width: 700px) 100vw, 65vw"
            />
          </Link>
          <div className="feature-caption">
            <div>
              <p>A different view.</p>
              <h2>Meet Coco Lounge.</h2>
            </div>
            <Link
              className="round-link"
              href="/explore/coco-lounge"
              aria-label="Explore Coco Lounge"
            >
              <Icon name="arrow" />
            </Link>
          </div>
        </section>
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
      <section className="discovery-section">
        <div className="section-heading">
          <h2>Find your spot.</h2>
          <Link className="text-link" href="/explore">
            Explore all <Icon name="arrow" />
          </Link>
        </div>
        <div className="home-venues">
          {[places[2], places[0], places[1], places[3]].map((p) => (
            <VenueCard key={p.slug} place={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
