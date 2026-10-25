import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icon";
export const metadata: Metadata = { title: "Profile" };
export default function Profile() {
  return (
    <div className="page-wrap inner-page">
      <span className="eyebrow">YOUR OWN LITTLE CORNER</span>
      <h1>Profile</h1>
      <p className="page-intro">
        You’re exploring as a demo guest. No account, identity or membership is
        connected.
      </p>
      <section className="placeholder-card" id="membership">
        <Icon name="member" />
        <span className="status-tag">Planned · Not connected</span>
        <h2>Membership & benefits</h2>
        <p>
          Verified membership and controlled benefits are planned. No
          registration, digital ID or redeemable benefit is available yet.
        </p>
      </section>
      <section className="profile-section">
        <h2>About this demonstration</h2>
        <p>
          Hotel times and experiences are fictional. Concierge replies are
          scripted and conversations clear on reload. No bookings, requests or
          staff messages are sent.
        </p>
        <h3>Temporary brand substitutions</h3>
        <p>
          The hotel name is a plain text label, not an official logo. Typography
          uses a temporary system font. No official logo, licensed fonts,
          photography or newer approved brand guide has been supplied.
        </p>
      </section>
      <section className="staff-utility">
        <span className="eyebrow">FOR THE HOTEL TEAM</span>
        <Link className="utility-link" href="/staff">
          Staff workspace demo <Icon name="arrow" />
        </Link>
        <p>Separate read-only shell · No staff authentication</p>
      </section>
    </div>
  );
}
