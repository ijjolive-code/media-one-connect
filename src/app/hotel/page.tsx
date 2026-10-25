import { GuestOffers } from "@/components/guest-offers";
export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import Link from "next/link";
import { hotel } from "@/modules/content/hotel";
import { Icon } from "@/components/icon";
export const metadata: Metadata = { title: "Hotel information" };
export default function Hotel() {
  return (
    <div className="page-wrap inner-page">
      <span className="eyebrow">GET TO KNOW YOUR STAY</span>
      <h1>
        Media One Hotel.
        <br />
        <span className="muted">Your first look.</span>
      </h1>
      <p className="page-intro">{hotel.summary}</p>
      <div className="notice">
        <strong>Fictional demonstration data</strong>
        <p>
          The M0 sample cards below are invented for layout testing. They are not
          confirmed hotel policies, facilities, offers or availability.
        </p>
      </div>
      <div className="working-panel">
        <h2>Published hotel knowledge</h2>
        <p>
          Browse eligible source-backed information, labelled provisional or
          staff-reviewed for this private prototype.
        </p>
        <Link className="button primary" href="/hotel/knowledge">
          Browse hotel knowledge
        </Link>
      </div>
      <section className="section-block">
        <div className="section-heading">
          <h2>The little details.</h2>
          <span className="status-tag">M0 fictional samples</span>
        </div>
        <div className="facts-grid">
          {hotel.facts.map((fact) => (
            <article className="fact-card" key={fact.label}>
              <Icon name={fact.label === "Local time" ? "clock" : "hotel"} />
              <span className="eyebrow">{fact.label}</span>
              <h3>{fact.value}</h3>
              <p>{fact.note}</p>
            </article>
          ))}
        </div>
      </section>
      <GuestOffers />
      <section className="info-panel">
        <div>
          <span className="eyebrow">GOOD TO KNOW</span>
          <h2>Explore first. Connect later.</h2>
        </div>
        <div>
          <p>
            The layout samples on this page remain fictional. Use Published hotel
            knowledge for separately labelled provisional source information.
            Live availability and booking services are not connected.
          </p>
          <p>No reservations or guest requests can be made here yet.</p>
          <Link href="/concierge" className="text-link">
            Ask the concierge <Icon name="arrow" />
          </Link>
        </div>
      </section>
    </div>
  );
}
