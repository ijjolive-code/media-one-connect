export type KnowledgeRecord = {
  id: string;
  record_key: string;
  venue_id: string;
  topic_key: string;
  kind: "faq" | "facility" | "policy";
  question: string;
  answer: string;
  provenance: "provisional" | "staff_reviewed" | "fictional";
  status: "draft" | "prototype" | "published" | "held" | "archived";
  source_refs: { id: string; title: string; url?: string; type?: string }[];
  collected_on: string | null;
  reviewed_on: string;
  review_due: string;
  valid_from: string | null;
  valid_to: string | null;
  supersedes: string | null;
  replaced_by: string | null;
  revision: number;
  updated_at: string;
};
export const venues = [
  { slug: "media-one-hotel", name: "Media One Hotel" },
  { slug: "ciao-bella", name: "Ciao Bella" },
  { slug: "qwerty", name: "Qwerty" },
  { slug: "garden-on-8", name: "garden on 8" },
  { slug: "coco-lounge", name: "Coco Lounge" },
  { slug: "m12go", name: "M12go" },
] as const;
export const provenanceLabel = (p: string) =>
  p === "provisional"
    ? "Provisional hotel information — awaiting review"
    : p === "staff_reviewed"
      ? "Staff-reviewed · private prototype"
      : "Fictional test content";
