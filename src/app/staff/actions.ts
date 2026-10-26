"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { staffClient } from "@/lib/supabase/server";
import { staffAccess } from "@/modules/offers/data";
import {
  DEMO_OFFER_ID,
  PILOT_VENUE_ID,
  type OfferFormState,
} from "@/modules/offers/types";

export async function signIn(
  _previous: { error?: string },
  form: FormData,
): Promise<{ error?: string }> {
  const email = String(form.get("email") ?? "").trim();
  const password = String(form.get("password") ?? "");
  if (
    !email ||
    email.length > 254 ||
    password.length < 1 ||
    password.length > 256
  )
    return { error: "Enter your test staff email and password." };
  const client = await staffClient();
  if (!client)
    return {
      error:
        "The development database is not configured. Follow the private M1 setup guide.",
    };
  const { error } = await client.auth.signInWithPassword({ email, password });
  if (error)
    return { error: "Sign-in failed. Check your details or try again later." };
  redirect("/staff");
}
export async function signOut() {
  const client = await staffClient();
  if (client) await client.auth.signOut();
  redirect("/staff/sign-in");
}
export async function saveOffer(
  _previous: OfferFormState,
  form: FormData,
): Promise<OfferFormState> {
  const access = await staffAccess();
  if (access.kind !== "authorised")
    return {
      error:
        "Your session is unavailable or you do not have permission to edit this hotel's demo offer. Sign in again.",
    };
  const title = String(form.get("title") ?? "").trim();
  const description = String(form.get("description") ?? "").trim();
  const terms = String(form.get("terms") ?? "").trim();
  const starts_on = String(form.get("starts_on") ?? "");
  const ends_on = String(form.get("ends_on") ?? "");
  const revision = Number(form.get("revision"));
  const validDate = (s: string) =>
    /^\d{4}-\d{2}-\d{2}$/.test(s) &&
    !Number.isNaN(Date.parse(s)) &&
    new Date(s).toISOString().slice(0, 10) === s;
  if (
    title.length < 3 ||
    title.length > 100 ||
    description.length < 10 ||
    description.length > 1000 ||
    terms.length < 5 ||
    terms.length > 2000
  )
    return {
      error:
        "Use a title of 3–100 characters, description of 10–1,000 and conditions of 5–2,000.",
    };
  if (
    !validDate(starts_on) ||
    !validDate(ends_on) ||
    starts_on > ends_on ||
    !Number.isSafeInteger(revision) ||
    revision < 1
  )
    return {
      error:
        "Check the display dates and reload if this editor is out of date. The end date must be on or after the start date.",
    };
  const { data, error } = await access.client
    .from("offers")
    .update({
      title,
      description,
      terms,
      starts_on,
      ends_on,
      is_published: form.get("is_published") === "on",
    })
    .eq("id", DEMO_OFFER_ID)
    .eq("venue_id", PILOT_VENUE_ID)
    .eq("revision", revision)
    .select("revision")
    .maybeSingle();
  if (error)
    return {
      error:
        "The offer was not saved. Check your access and connection, then try again.",
    };
  if (!data)
    return {
      error:
        "This offer changed or your permission was removed. Reload before editing again; your changes were not saved.",
    };
  revalidatePath("/");
  revalidatePath("/hotel");
  revalidatePath("/staff");
  revalidatePath("/staff/review");
  return {
    success:
      "Saved to the demo database. Reload the private test view to inspect the updated offer.",
    revision: data.revision,
  };
}
