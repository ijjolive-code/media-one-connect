import { redirect } from "next/navigation";
import Link from "next/link";
import { staffAccess } from "@/modules/offers/data";
import { GuestOffers } from "@/components/guest-offers";
import { StaffTabs } from "@/components/staff-tabs";
import { FactList } from "@/components/fact-list";
import { eligibleKnowledge } from "@/modules/knowledge/data";
import { signOut } from "../actions";
export const dynamic = "force-dynamic";
export default async function Review() {
  const access = await staffAccess();
  if (access.kind === "anonymous" || access.kind === "unconfigured")
    redirect("/staff/sign-in");
  if (access.kind !== "authorised")
    return (
      <div className="page-wrap staff-page">
        <h1>Access not granted</h1>
        <p>This test view requires authorised hotel staff access.</p>
        <form action={signOut}>
          <button className="button">Sign out</button>
        </form>
      </div>
    );
  let facts;
  try {
    facts = await eligibleKnowledge("media-one-hotel");
  } catch {}
  return (
    <div className="page-wrap staff-page">
      <header className="staff-page-header">
        <div>
          <h1>Private test view</h1>
          <p>Media One Hotel · Authorised reviewers only</p>
        </div>
        <Link className="text-link" href="/">
          Guest app
        </Link>
      </header>
      <StaffTabs />
      <p className="test-review-label">
        Fictional offers are displayed here for persistence and publication
        testing. They are excluded from normal guest Home and Hotel pages.
        Reload after saving in another staff tab.
      </p>
      <GuestOffers />
      <section className="review-knowledge">
        <div className="section-heading">
          <h2>Published knowledge</h2>
          <Link href="/staff/knowledge" className="text-link">
            Edit knowledge
          </Link>
        </div>
        {facts ? (
          <FactList facts={facts} review />
        ) : (
          <p>Published knowledge is unavailable.</p>
        )}
      </section>
    </div>
  );
}
