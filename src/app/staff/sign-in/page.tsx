import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { staffAccess } from "@/modules/offers/data";
import { Photo } from "@/components/photo";
import { SignInForm } from "./form";
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Staff sign-in" };
export default async function StaffSignIn() {
  const access = await staffAccess();
  if (access.kind === "authorised") redirect("/staff");
  return (
    <div className="page-wrap staff-page staff-auth-layout">
      <div className="staff-intro">
        <span className="eyebrow">For the hotel team</span>
        <h1>Staff sign-in</h1>
        <p>Your workspace for hotel knowledge, offers and publication.</p>
        <Photo name="ciao-bella-interior" alt="Ciao Bella at Media One Hotel" />
      </div>
      <div className="staff-auth-card">
        <h2>Your team workspace</h2>
        {access.kind === "unconfigured" ? (
          <div className="notice">
            <strong>Development setup required</strong>
            <p>
              No database connection is configured. Follow the M1 private review
              guide; never put passwords in chat or Git.
            </p>
          </div>
        ) : (
          <SignInForm />
        )}
      </div>
    </div>
  );
}
