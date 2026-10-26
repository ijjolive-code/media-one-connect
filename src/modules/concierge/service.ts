import "server-only";
import type { ConversationTurn } from "./context";
import { providerTransport } from "./provider-transport";
import { answerEvidence } from "@/modules/knowledge/data";
import { guestClient } from "@/lib/supabase/server";
import {
  makePrompt,
  groundedAnswer,
  selectOpenAIEvidence,
} from "./answer-core";
export function providerState() {
  if (!process.env.CONCIERGE_OPENAI_KEY) return "key_missing";
  if (
    process.env.CONCIERGE_AI_ENABLED !== "true" ||
    process.env.CONCIERGE_RATE_CEILINGS_CONFIRMED !== "true"
  )
    return "disabled";
  return "configured";
}
export async function answer(question: string, venue: string, session: string, history: ConversationTurn[] = []) {
  if (providerState() !== "configured")
    return {
      status: 503,
      body: {
        kind: "not_connected",
        message:
          "The AI connection is not enabled. No model answer was generated. You can browse published hotel knowledge instead.",
      },
    };
  const client = guestClient(),
    guard = process.env.CONCIERGE_GUARD_TOKEN;
  if (!client || !guard)
    return {
      status: 503,
      body: {
        kind: "knowledge_unavailable",
        message:
          "Hotel knowledge is unavailable. No answer or action was produced.",
      },
    };
  let attempt: string | null = null;
  try {
    const evidence = await answerEvidence(venue);
    const prompt = makePrompt(question, venue, evidence, history);
    const reserve = await client.rpc("reserve_concierge", {
      p_session: session,
      p_guard: guard,
    });
    if (reserve.error)
      return {
        status: 429,
        body: {
          kind: "usage_limited",
          message:
            "The trial budget or usage limit is reached, or the concierge is busy. No model request was sent. Ask the prototype owner to check usage.",
        },
      };
    attempt = reserve.data;
    const selection = await selectOpenAIEvidence(
      prompt,
      process.env.CONCIERGE_OPENAI_KEY!,
      providerTransport,
    );
    const result = groundedAnswer(selection, evidence);
    // Check eligibility/revision again: publication, replacements or offers may have changed in flight.
    const current = await answerEvidence(venue);
    if (
      result.facts.some(
        (f) => !current.some((c) => c.id === f.id && c.revision === f.revision),
      )
    )
      throw new Error("knowledge_changed");
    await client.rpc("finish_concierge", {
      p_id: attempt,
      p_outcome: "success",
      p_guard: guard,
    });
    attempt = null;
    return {
      status: 200,
      body: {
        kind: "model_grounded",
        facts: result.facts,
        incomplete: result.incomplete,
        message: result.reply,
      },
    };
  } catch (error) {
    if (attempt)
      await client.rpc("finish_concierge", {
        p_id: attempt,
        p_outcome: "failed",
        p_guard: guard,
      });
    const reason = error instanceof Error ? error.message : "";
    if (reason === "context_too_large") return {status: 400, body: {kind: "context_limit", message: "There is more information than I can check in one turn. Reset the conversation and ask a shorter question. No model request was sent."}};
    return {
      status: 503,
      body: {
        kind:
          reason === "knowledge_changed"
            ? "knowledge_changed"
            : "provider_error",
        message:
          reason === "knowledge_changed"
            ? "Published information changed while answering. Please ask again; no stale answer was shown."
            : "I couldn’t verify a reply just now. No answer was substituted and nothing was sent to the team. You can browse the hotel information below.",
      },
    };
  }
}
