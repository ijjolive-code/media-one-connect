import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icon";
export const metadata: Metadata = { title: "My Stay" };
export default function MyStay() {
  return (
    <div className="page-wrap inner-page">
      <span className="eyebrow">YOUR STAY, IN ONE PLACE</span>
      <h1>My Stay</h1>
      <p className="page-intro">
        A home for your future bookings and requests. No stay or guest account
        is connected to this demonstration.
      </p>
      <section className="placeholder-card" id="bookings">
        <Icon name="stay" />
        <span className="status-tag">Planned · Not connected</span>
        <h2>Your bookings</h2>
        <p>
          Room and dining journeys will live here. No reservation has been
          retrieved or created. There is no live availability in this demo.
        </p>
      </section>
      <section className="placeholder-card" id="requests">
        <Icon name="request" />
        <span className="status-tag">Planned · Not connected</span>
        <h2>Your requests</h2>
        <p>
          Request creation and staff progress updates are planned. This screen
          cannot send a request or contact hotel staff.
        </p>
      </section>
      <Link className="button primary" href="/concierge">
        Try the concierge demo <Icon name="arrow" />
      </Link>
    </div>
  );
}
