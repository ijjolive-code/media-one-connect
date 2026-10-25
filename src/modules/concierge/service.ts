import "server-only";
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
export async function answer(question: string, venue: string, session: string) {
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
    const prompt = makePrompt(question, venue, evidence);
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
        message: result.facts.length
          ? "Published source wording is quoted below to preserve exact prices, dates and conditions."
          : "I cannot verify that from the eligible published information. Please clarify or check with the hotel.",
        notice: result.incomplete
          ? "Some requested details are not confirmed by the available sources. No action, calculation or booking was completed."
          : "Information only. No request, reservation or other action was created.",
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
            : "The AI provider or eligible knowledge is unavailable, timed out or returned unsupported output. No answer was substituted and no action was taken.",
      },
    };
  }
}
