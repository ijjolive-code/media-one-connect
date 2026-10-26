import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { staffAccess } from "@/modules/offers/data";
import { DEMO_OFFER_ID, type Offer } from "@/modules/offers/types";
import { signOut } from "./actions";
import { StaffTabs } from "@/components/staff-tabs";
import { OfferEditor } from "./offer-editor";
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Staff offers" };
export default async function Staff() {
  const access = await staffAccess();
  if (access.kind === "anonymous" || access.kind === "unconfigured")
    redirect("/staff/sign-in");
  if (access.kind !== "authorised")
    return (
      <div className="page-wrap staff-page">
        <h1>
          {access.kind === "forbidden"
            ? "Access not granted"
            : "Workspace unavailable"}
        </h1>
        <p>
          {access.kind === "forbidden"
            ? "You are signed in, but you do not have permission to manage Media One Hotel offers."
            : "Your staff access could not be verified. No offer editor is available."}
        </p>
        <form action={signOut}>
          <button className="button" type="submit">
            Sign out
          </button>
        </form>
      </div>
    );
  const { data, error } = await access.client
    .from("offers")
    .select("*")
    .eq("id", DEMO_OFFER_ID)
    .single();
  return (
    <div className="page-wrap staff-page">
      <header className="staff-page-header">
        <div>
          <span className="eyebrow">Media One Hotel</span>
          <h1>Hotel offers</h1>
          <p>Edit content and control its publication.</p>
        </div>
        <form action={signOut}>
          <button className="reset-button" type="submit">
            Sign out
          </button>
        </form>
      </header>
      <StaffTabs />
      <div className="notice">
        <strong>Fictional content · Persistent test database</strong>
        <p>
          This offer is fictional. Published changes can be inspected in the
          protected private test view.
        </p>
      </div>
      <div className="staff-editor-layout">
        <section>
          {error || !data ? (
            <div className="notice">
              <strong>Offer unavailable</strong>
              <p>
                The offer could not be loaded. No editing controls are shown.
                Check the development setup and access.
              </p>
            </div>
          ) : (
            <OfferEditor offer={data as Offer} />
          )}
        </section>
        <aside className="editor-guide">
          <h2>Review the published result</h2>
          <p>
            After saving, open the private test view and reload. Offers appear
            there only during their Dubai display dates.
          </p>
          <Link className="text-link" href="/staff/review">
            Open private test view
          </Link>
          <p className="form-hint">
            An existing editor tab can become out of date. Reload if another
            staff session saved a newer revision.
          </p>
          <h3>Access stays separate</h3>
          <p>
            Staff access is assigned to this hotel in the database. There is no
            self-service staff signup.
          </p>
        </aside>
      </div>
    </div>
  );
}
