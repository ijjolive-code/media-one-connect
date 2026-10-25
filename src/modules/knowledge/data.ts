import "server-only";
import { guestClient } from "@/lib/supabase/server";
import { type Evidence } from "@/modules/concierge/answer-core";
import { provenanceLabel } from "./types";
export async function eligibleKnowledge(venue: string): Promise<Evidence[]> {
  const client = guestClient(),
    guard = process.env.CONCIERGE_GUARD_TOKEN;
  if (!client || !guard) throw new Error("knowledge_unavailable");
  const result = await client.rpc("eligible_knowledge", {
    p_venue: venue,
    p_prototype: process.env.CONCIERGE_PRIVATE_PROTOTYPE === "true",
    p_guard: guard,
  });
  if (result.error) throw new Error("knowledge_unavailable");
  return result.data.map(
    (r: {
      id: string;
      record_key: string;
      question: string;
      answer: string;
      provenance: string;
      review_due: string;
      valid_from: string | null;
      valid_to: string | null;
      revision: number;
      source_refs: Evidence["sources"];
    }) => ({
      id: r.id,
      key: r.record_key,
      question: r.question,
      text: r.answer,
      label: provenanceLabel(r.provenance),
      reviewDue: r.review_due,
      validFrom: r.valid_from,
      validTo: r.valid_to,
      revision: r.revision,
      sources: r.source_refs,
    }),
  );
}
export async function answerEvidence(venue: string): Promise<Evidence[]> {
  const knowledge = await eligibleKnowledge(venue);
  const client = guestClient()!;
  const { data: target, error } = await client
    .from("venues")
    .select("id")
    .eq("slug", venue)
    .single();
  if (error) throw new Error("knowledge_unavailable");
  const offers = await client
    .from("offers")
    .select("*")
    .eq("venue_id", target.id);
  if (offers.error) throw new Error("knowledge_unavailable");
  return [
    ...knowledge,
    ...offers.data.map((o) => ({
      id: "offer-" + o.id,
      key: "FICTIONAL-OFFER",
      question: o.title,
      text: `${o.title}\n${o.description}\nConditions: ${o.terms}\nInclusive display dates (Asia/Dubai): ${o.starts_on} to ${o.ends_on}. Fictional test offer only; not a real promotion or booking.`,
      label: "Fictional test offer — not a real promotion",
      reviewDue: null,
      validFrom: o.starts_on,
      validTo: o.ends_on,
      revision: o.revision,
      sources: [
        { id: "STAFF-OFFER", title: "Persistent fictional offer database" },
      ],
    })),
  ];
}
