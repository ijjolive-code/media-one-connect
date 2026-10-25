import "server-only";
import { guestClient, staffClient } from "@/lib/supabase/server";
import { PILOT_VENUE_ID, type Offer } from "./types";

export async function staffAccess() {
  const client = await staffClient();
  if (!client) return { kind: "unconfigured" as const };
  const {
    data: { user },
    error,
  } = await client.auth.getUser();
  if (error || !user) return { kind: "anonymous" as const };
  const access = await client
    .from("staff_venue_access")
    .select("venue_id")
    .eq("user_id", user.id)
    .eq("venue_id", PILOT_VENUE_ID)
    .maybeSingle();
  if (access.error) return { kind: "unavailable" as const };
  if (!access.data) return { kind: "forbidden" as const };
  return { kind: "authorised" as const, client, user };
}
export async function guestOffers(): Promise<{
  offers: Offer[];
  unavailable: boolean;
}> {
  const client = guestClient();
  if (!client) return { offers: [], unavailable: true };
  const { data, error } = await client
    .from("offers")
    .select("*")
    .eq("venue_id", PILOT_VENUE_ID)
    .order("updated_at", { ascending: false });
  return {
    offers: error ? [] : ((data as Offer[]) ?? []),
    unavailable: !!error,
  };
}
