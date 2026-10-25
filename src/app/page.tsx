import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/components/icon";

const journeys = [
  {
    href: "/my-stay#bookings",
    title: "Bookings",
    detail: "Room & dining journeys",
    icon: "stay",
  },
  {
    href: "/my-stay#requests",
    title: "Requests",
    detail: "Help during your stay",
    icon: "request",
  },
  {
    href: "/profile#membership",
    title: "Membership",
    detail: "Your future benefits",
    icon: "member",
  },
] as const;
export default function Home() {
  return (
    <div className="page-wrap guest-home">
      <header className="welcome">
        <span className="eyebrow">YOUR GUEST SPACE</span>
        <h1>Welcome to your stay.</h1>
        <p>A first look at your Media One Hotel companion.</p>
      </header>
      <Link className="concierge-entry" href="/concierge">
        <span className="concierge-entry-icon">
          <Icon name="chat" />
        </span>
        <span>
          <span className="entry-tag">SCRIPTED DEMO</span>
          <strong>How can we help?</strong>
          <span>Open your concierge conversation</span>
        </span>
        <Icon name="arrow" />
      </Link>
      <section className="home-section" aria-labelledby="essentials-title">
        <div className="section-heading">
          <h2 id="essentials-title">Hotel essentials</h2>
          <Link className="inline-link" href="/hotel">
            View all <Icon name="arrow" />
          </Link>
        </div>
        <Link className="hotel-summary" href="/hotel">
          <span className="hotel-photo">
            <Image
              src="/brand/media-one-lobby.jpg"
              alt="Seating and ring pendant lights in the Media One Hotel lobby"
              width={1730}
              height={974}
              sizes="(max-width: 360px) 96px, (max-width: 900px) 128px, 176px"
            />
          </span>
          <span>
            <strong>Hotel information</strong>
            <span>Your hotel guide</span>
            <span className="sample-label">
              Sample details · Real lobby photo
            </span>
          </span>
          <Icon name="arrow" />
        </Link>
      </section>
      <section className="home-section" aria-labelledby="journeys-title">
        <div className="section-heading">
          <h2 id="journeys-title">During your stay</h2>
          <span className="small-label">Planned journeys</span>
        </div>
        <div className="journey-grid">
          {journeys.map((journey) => (
            <Link
              className="journey-card"
              href={journey.href}
              key={journey.title}
            >
              <Icon name={journey.icon} />
              <strong>{journey.title}</strong>
              <span>{journey.detail}</span>
              <span className="status-tag">Planned</span>
            </Link>
          ))}
        </div>
      </section>
      <p className="home-footnote">
        This is a demonstration. Bookings, requests and membership are not
        connected.
      </p>
    </div>
  );
}
