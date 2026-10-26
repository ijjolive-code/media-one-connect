import Link from "next/link";
import { PageHeading } from "@/components/page-heading";
import { Icon } from "@/components/icon";
export default function Profile() {
  return (
    <div className="page-wrap profile-page">
      <PageHeading
        title="You’re welcome here."
        back="/"
        backLabel="Home"
        description="Staying the night or stopping by. Make it your visit."
      />
      <section className="visit-panel">
        <h2>Explore at your own pace.</h2>
        <p>
          You don’t need an account to explore our venues or ask Concierge.
          Guest accounts and memberships aren’t available here yet.
        </p>
        <Link className="button primary" href="/explore">
          Find your spot <Icon name="arrow" />
        </Link>
      </section>
      <div className="utility-menu">
        <Link href="/my-stay">
          <span>
            Help with a stay<small>Booking and hotel information</small>
          </span>
          <Icon name="arrow" />
        </Link>
        <Link href="/hotel/knowledge">
          <span>
            Good to know<small>Useful answers for your visit</small>
          </span>
          <Icon name="arrow" />
        </Link>
        <Link href="/staff">
          <span>
            For the hotel team<small>Separate staff sign in</small>
          </span>
          <Icon name="arrow" />
        </Link>
      </div>
    </div>
  );
}
