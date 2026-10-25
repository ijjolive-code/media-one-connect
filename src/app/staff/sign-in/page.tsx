import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { staffAccess } from "@/modules/offers/data";
import { SignInForm } from "./form";
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Staff sign-in" };
export default async function StaffSignIn() {
  const access = await staffAccess();
  if (access.kind === "authorised") redirect("/staff");
  return (
    <div className="page-wrap staff-page">
      <div className="staff-intro">
        <span className="eyebrow">FOR THE HOTEL TEAM</span>
        <h1>Staff sign-in</h1>
        <p>
          Manage one fictional Media One Hotel offer in a private development
          workspace.
        </p>
        <span className="status-tag">M1 · Test accounts only</span>
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
