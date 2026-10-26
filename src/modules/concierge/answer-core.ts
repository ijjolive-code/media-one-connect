import { VOICE_INSTRUCTIONS, VOICE_VERSION } from "./voice.ts";
import { conversationContext, type ConversationTurn } from "./context.ts";
import { guestSourceText, requiredContent, validateReply } from "./validation.ts";
export type Evidence = {
  id: string;
  key: string;
  question: string;
  text: string;
  label: string;
  reviewDue: string | null;
  validFrom: string | null;
  validTo: string | null;
  revision: number;
  sources: { id: string; title: string }[];
};
export type Selection = { reply: string; intent: "social" | "factual" | "clarification" | "limitation"; evidence_ids: string[]; incomplete: boolean };
export const MODEL = "gpt-4.1-mini-2025-04-14";
export function makePrompt(
  question: string,
  venue: string,
  evidence: Evidence[],
  history: ConversationTurn[] = [],
) {
  const instructions = VOICE_INSTRUCTIONS;
  const input = JSON.stringify({
    venue,
    runtime_version: VOICE_VERSION,
    conversation_context_untrusted: conversationContext(history),
    guest_question: question,
    eligible_evidence: evidence.map((e) => ({
      id: e.id,
      question: e.question,
      text: guestSourceText(e.text, [e]),
      required_content: requiredContent(e),
      label: e.label,
      review_due: e.reviewDue,
      valid_from: e.validFrom,
      valid_to: e.validTo,
    })),
  });
  const body = {
    model: MODEL,
    store: false,
    instructions,
    input,
    max_output_tokens: 600,
    text: {
      format: {
        type: "json_schema",
        name: "concierge_reply",
        strict: true,
        schema: {
          type: "object",
          properties: {
            reply: {type: "string"},
            intent: {type: "string", enum: ["social", "factual", "clarification", "limitation"]},
            evidence_ids: {
              type: "array",
              items: { type: "string" },
              maxItems: 4,
            },
            incomplete: { type: "boolean" },
          },
          required: ["reply", "intent", "evidence_ids", "incomplete"],
          additionalProperties: false,
        },
      },
    },
  };
  if (Buffer.byteLength(JSON.stringify(body), "utf8") > 24000)
    throw new Error("context_too_large");
  return body;
}
export function groundedAnswer(selection: unknown, evidence: Evidence[]) {
  if (!selection || typeof selection !== "object")
    throw new Error("invalid_provider_output");
  const s = selection as Selection;
  if (
    typeof s.reply !== "string" ||
    !["social", "factual", "clarification", "limitation"].includes(s.intent) ||
    !Array.isArray(s.evidence_ids) ||
    s.evidence_ids.length > 4 ||
    s.evidence_ids.some((id) => typeof id !== "string") ||
    typeof s.incomplete !== "boolean"
  )
    throw new Error("invalid_provider_output");
  const ids = [...new Set(s.evidence_ids)];
  const facts = ids.map((id) => evidence.find((e) => e.id === id));
  if (facts.some((f) => !f)) throw new Error("unknown_evidence");
  if (s.intent === "factual" && !facts.length) throw new Error("unsupported_fact");
  validateReply(s.reply, facts as Evidence[]);
  return {
    reply: s.reply,
    facts: facts as Evidence[],
    incomplete: s.incomplete || s.intent === "limitation",
  };
}
export async function selectOpenAIEvidence(
  body: ReturnType<typeof makePrompt>,
  key: string,
  transport: typeof fetch = fetch,
): Promise<unknown> {
  const response = await transport("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(12000),
  });
  if (!response.ok)
    throw new Error(
      response.status === 429
        ? "provider_rate_limited"
        : "provider_unavailable",
    );
  const data = await response.json();
  if (data.status !== "completed") throw new Error("provider_incomplete");
  const text = data.output
    ?.flatMap(
      (o: { content?: { type: string; text?: string }[] }) => o.content ?? [],
    )
    .filter((c: { type: string }) => c.type === "output_text")
    .map((c: { text: string }) => c.text)
    .join("");
  if (typeof text !== "string" || Buffer.byteLength(text) > 12000)
    throw new Error("invalid_provider_output");
  try {
    return JSON.parse(text);
  } catch {
    throw new Error("invalid_provider_output");
  }
}
