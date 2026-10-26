import "server-only";
import { eligibleKnowledge } from "./knowledge/data";
// Presentation boundary only. Retrieval, publication and database permissions stay unchanged.
export async function guestKnowledge(venue: string) {
  return (await eligibleKnowledge(venue)).filter(
    (f) => !/fictional/i.test(f.label),
  );
}
