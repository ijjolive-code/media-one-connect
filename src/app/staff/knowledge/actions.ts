"use server";
import { staffAccess } from "@/modules/offers/data";
import { PILOT_VENUE_ID } from "@/modules/offers/types";
import { revalidatePath } from "next/cache";
export type KnowledgeState = { error?: string; success?: string; id?: string };
export async function saveKnowledge(
  _old: KnowledgeState,
  form: FormData,
): Promise<KnowledgeState> {
  const access = await staffAccess();
  if (access.kind !== "authorised")
    return {
      error: "Your verified staff session or venue permission is unavailable.",
    };
  const value = (name: string) => String(form.get(name) ?? "").trim();
  const id = value("id"),
    replacement = value("supersedes");
  const question = value("question"),
    answer = value("answer"),
    title = value("source_title"),
    source = value("source_ref");
  const reviewed = value("reviewed_on"),
    due = value("review_due"),
    from = value("valid_from"),
    to = value("valid_to");
  const validDate = (s: string) =>
    /^\d{4}-\d{2}-\d{2}$/.test(s) &&
    !Number.isNaN(Date.parse(s)) &&
    new Date(s).toISOString().slice(0, 10) === s;
  if (
    question.length < 3 ||
    question.length > 240 ||
    answer.length < 3 ||
    answer.length > 2400 ||
    title.length < 3 ||
    title.length > 200 ||
    source.length < 3 ||
    source.length > 800
  )
    return {
      error:
        "Provide a question, answer and source. Use up to 240, 2,400, 200 and 800 characters respectively.",
    };
  if (
    !validDate(reviewed) ||
    !validDate(due) ||
    due < reviewed ||
    (from && !validDate(from)) ||
    (to && !validDate(to)) ||
    (from && to && from > to)
  )
    return {
      error:
        "Check the review and validity dates. The end cannot precede the start.",
    };
  let record = null;
  if (id) {
    const r = await access.client
      .from("knowledge_records")
      .select("*")
      .eq("id", id)
      .eq("venue_id", PILOT_VENUE_ID)
      .single();
    if (r.error) return { error: "Record unavailable or outside your venue." };
    record = r.data;
  }
  let predecessor = null;
  if (replacement) {
    const r = await access.client
      .from("knowledge_records")
      .select("*")
      .eq("id", replacement)
      .eq("venue_id", PILOT_VENUE_ID)
      .single();
    if (r.error)
      return {
        error: "Replacement source is unavailable or outside your venue.",
      };
    predecessor = r.data;
  }
  const provenance =
    record?.provenance === "provisional" ? "provisional" : value("provenance");
  const status = value("status");
  if (
    !["faq", "facility", "policy"].includes(value("kind")) ||
    !["staff_reviewed", "fictional", "provisional"].includes(provenance) ||
    !["draft", "prototype", "published", "held", "archived"].includes(status)
  )
    return { error: "Choose valid content type and publication settings." };
  if (
    (provenance === "provisional" && status === "published") ||
    (provenance !== "provisional" && status === "prototype")
  )
    return {
      error:
        "Use a new reviewed replacement to publish a provisional fact. Provisional source material has its own prototype scope.",
    };
  const refs =
    record?.provenance === "provisional"
      ? record.source_refs
      : [
          {
            id: "STAFF",
            title,
            url: source,
            type: "staff_reference",
            retrieved_at: reviewed,
          },
        ];
  const r = await access.client.rpc("save_knowledge", {
    p_record: {
      id: id || null,
      venue_id: PILOT_VENUE_ID,
      topic_key: predecessor?.topic_key || record?.topic_key || null,
      kind: value("kind"),
      question,
      answer,
      provenance,
      status,
      source_refs: refs,
      reviewed_on: reviewed,
      review_due: due,
      valid_from: from || null,
      valid_to: to || null,
      supersedes: replacement || record?.supersedes || null,
    },
    p_expected_revision: Number(value("revision")),
  });
  if (r.error)
    return {
      error: r.error.message.includes("Record changed")
        ? "This record changed. Reload before saving."
        : r.error.message.includes("Replacement") ||
            r.error.message.includes("Predecessor")
          ? "The replacement must match its venue/topic, be current and not conflict with an existing replacement."
          : r.error.message.includes("review window")
            ? "Keep the imported review interval: seven days for time-sensitive content, otherwise 30 days."
            : "Knowledge was not saved. Check source, dates, publication scope and permissions.",
    };
  revalidatePath("/hotel/knowledge");
  revalidatePath("/staff/knowledge");
  return {
    success:
      "Saved in the knowledge database. Subsequent questions use the current eligible version.",
    id: r.data,
  };
}
