export const PILOT_VENUE_ID = "11111111-1111-4111-8111-111111111111";
export const DEMO_OFFER_ID = "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";
export type Offer = {
  id: string;
  venue_id: string;
  title: string;
  description: string;
  terms: string;
  starts_on: string;
  ends_on: string;
  is_published: boolean;
  is_demo: boolean;
  revision: number;
  updated_at: string;
  updated_by: string | null;
};
export type OfferFormState = {
  error?: string;
  success?: string;
  revision?: number;
};
export function offerDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Dubai",
  }).format(new Date(`${date}T12:00:00+04:00`));
}
