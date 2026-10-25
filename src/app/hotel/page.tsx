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
          The times and experiences below are invented for testing. They are not
          confirmed hotel policies, facilities, offers or availability.
        </p>
      </div>
      <section className="section-block">
        <div className="section-heading">
          <h2>The little details.</h2>
          <span className="status-tag">Sample content</span>
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
            Rooms, dining and places to unwind are fictional examples in this
            pilot. Real menus, contact details, directions and booking links
            will be added once approved.
          </p>
          <p>No reservations or guest requests can be made here yet.</p>
          <Link href="/concierge" className="text-link">
            Try a sample hotel question <Icon name="arrow" />
          </Link>
        </div>
      </section>
    </div>
  );
}
