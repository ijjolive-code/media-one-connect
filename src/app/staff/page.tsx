import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { staffAccess } from "@/modules/offers/data";
import { DEMO_OFFER_ID, type Offer } from "@/modules/offers/types";
import { signOut } from "./actions";
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
          <span className="eyebrow">AUTHORISED TEST STAFF</span>
          <h1>Hotel offers</h1>
          <p>One useful update. A guest experience that stays in sync.</p>
        </div>
        <form action={signOut}>
          <button className="reset-button" type="submit">
            Sign out
          </button>
        </form>
      </header>
      <div className="notice">
        <strong>Fictional content · Persistent test database</strong>
        <p>
          This editor changes the guest demonstration. No real offer, booking or
          benefit is created.
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
          <h2>Check the guest view</h2>
          <p>
            After saving, open the guest app and reload it. Published offers
            appear only during their Dubai display dates.
          </p>
          <Link className="text-link" href="/hotel">
            View guest hotel information
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
