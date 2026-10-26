import Link from "next/link";
import { PageHeading } from "@/components/page-heading";
import { Photo } from "@/components/photo";
import { Icon } from "@/components/icon";
export default function MyStay() {
  return (
    <div className="page-wrap utility-page">
      <PageHeading
        title="Here for a stay?"
        back="/profile"
        backLabel="Your visit"
      />
      <div className="utility-layout">
        <Photo
          className="utility-photo"
          name="chill-out-bedroom"
          alt="The bedroom of a Chill Out Suite at Media One Hotel"
        />
        <section className="utility-copy">
          <h2>Let’s point you in the right direction.</h2>
          <p id="bookings">
            Your booking is managed with the hotel. This app can’t retrieve or
            change a reservation.
          </p>
          <p id="requests">
            For something you need during your stay, contact the hotel directly.
            Requests can’t be sent from this app yet.
          </p>
          <Link className="button primary" href="/hotel/knowledge">
            Find hotel contact details <Icon name="arrow" />
          </Link>
          <Link className="text-link" href="/concierge">
            Ask a hotel question <Icon name="arrow" />
          </Link>
        </section>
      </div>
    </div>
  );
}
