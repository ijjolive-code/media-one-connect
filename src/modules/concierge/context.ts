export type ConversationTurn = { role: "user" | "assistant"; text: string };
export const MAX_HISTORY_TURNS = 6;
export const MAX_HISTORY_CHARS = 4000;
// Conservative prototype boundary, not comprehensive PII detection or identity verification.
export function hasPrivateDetails(text: string) {
  const candidate = text.replace(/\b\d{4}-\d{2}-\d{2}\b/g, date => {
    const parsed = new Date(date);
    return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === date ? "[date]" : date;
  });
  return /[\w.+-]+@[\w.-]+\.[a-z]{2,}|(?:\+?\d[\s().-]*){8,}|\b(?:password|one[ -]time (?:code|password)|card number|security code|booking reference|room (?:number|no\.?))\b|\bsk-[a-z0-9_-]{12,}/i.test(candidate);
}
export function conversationContext(input: unknown): ConversationTurn[] {
  if (input === undefined) return [];
  if (!Array.isArray(input) || input.length > MAX_HISTORY_TURNS)
    throw new Error("invalid_context");
  let length = 0;
  return input.map((item) => {
    if (!item || !["user", "assistant"].includes(item.role) || typeof item.text !== "string" || item.text.length > 1800)
      throw new Error("invalid_context");
    length += item.text.length;
    if (length > MAX_HISTORY_CHARS) throw new Error("invalid_context");
    return { role: item.role, text: hasPrivateDetails(item.text) ? "[Private detail omitted]" : item.text };
  });
}
