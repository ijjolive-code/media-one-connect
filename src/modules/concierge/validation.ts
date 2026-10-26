import type { Evidence } from "./answer-core.ts";
// Preserve exact factual strings while removing dash punctuation from source prose.
export function protectedStrings(evidence: Evidence[]) {
  return [...new Set(evidence.flatMap(e => [
    ...(e.text.match(/https?:\/\/[^\s<>]+|[\w.+-]+@[\w.-]+\.[a-z]{2,}/gi) || []).map(x => x.replace(/[.,;)]$/, "")),
    ...(e.text.match(/\b\d{4}-\d{2}-\d{2}\b/g) || []),
    ...(e.text.match(/\b[A-Z][a-zA-Z]*[-\u2010\u2011][A-Z][a-zA-Z]*\b/g) || []),
    ...(e.text.match(/(?:AED|USD|[$£€])\s*-\d+(?:[.,]\d+)*/g) || []),
    e.key,
  ]))];
}
export function guestSourceText(text: string, evidence: Evidence[]) {
  const protectedValues = protectedStrings(evidence);
  const values: string[] = [];
  let out = text;
  for (const value of protectedValues) {
    if (!value) continue;
    out = out.replaceAll(value, () => { values.push(value); return `\u0000${values.length - 1}\u0000`; });
  }
  out = out.replace(/\s*[\u2014\u2015]\s*/g, ". ").replace(/\s*[\u2012\u2013]\s*/g, " to ").replace(/[-\u2010\u2011\u2212]/g, " ");
  return out.replace(/\u0000(\d+)\u0000/g, (_, i) => values[Number(i)]);
}
export function requiredContent(e: Evidence) {
  // Monetary/offer context is protected in full, including days, validity and conditions.
  if (/\b(?:AED|USD|per person|minimum spend|complimentary|free of charge)\b|[%$£€]/i.test(e.text) || e.id.startsWith("offer-"))
    return [guestSourceText(e.text, [e])];
  // Conservative clause preservation: no model claim that a qualifier was retained is trusted.
  return (e.text.match(/[^.!?\n]+(?:[.!?]|$)/g) || [])
    .map(s => s.trim()).filter(s => /\b(?:subject|depend|depends|availability|charge|charges|conditions?|must|required|requires|may|cannot|can't|not confirmed|not verified|rate.specific|only|excluding|except|guarantee|confirm directly|verify directly)\b/i.test(s))
    .map(s => guestSourceText(s, [e]));
}
function stripProtected(reply: string, facts: Evidence[]) {
  for (const token of protectedStrings(facts)) reply = reply.replaceAll(token, " ");
  return reply;
}
function numbers(text: string) {
  return text.match(/\d[\d,:.]*/g)?.map(n => n.replace(/[,.:]+$/, "")) || [];
}
function money(text: string) {
  return [...text.matchAll(/\b(AED|USD)\s*(-?\d[\d,.]*)|([$£€])\s*(-?\d[\d,.]*)|(-?\d[\d,.]*)\s*(dirhams|dollars|euros|pounds)\b/gi)].map(m => {
    const unit = (m[1] || m[3] || m[6]).toLowerCase();
    const code = ({aed: "aed", dirhams: "aed", usd: "usd", dollars: "usd", "$": "usd", euros: "eur", "€": "eur", pounds: "gbp", "£": "gbp"} as Record<string, string>)[unit];
    return code + ":" + (m[2] || m[4] || m[5]).replaceAll(",", "").replace(/[.]$/, "");
  });
}
export function validateReply(reply: string, facts: Evidence[]) {
  if (!reply.trim() || reply.length > 1800) throw new Error("invalid_reply");
  if (/[-\u2010-\u2015\u2212]/.test(stripProtected(reply, facts))) throw new Error("voice_punctuation");
  if (/\*\*|^\s*#{1,6}\s|<\/?[a-z][^>]*>/im.test(reply)) throw new Error("voice_format");
  const source = facts.map(f => f.text).join("\n");
  const prices = new Set(money(source));
  if (money(reply).some(p => !prices.has(p))) throw new Error("unsupported_price");
  if (/\b(?:one|two|three|four|five|six|seven|eight|nine|ten|twenty|hundred|thousand)\s+(?:hundred\s+|thousand\s+)?(?:dirhams|dollars|euros|pounds)\b/i.test(reply)) throw new Error("unsupported_price_words");
  const calendarWords = reply.match(/\b(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|January|February|March|April|June|July|August|September|October|November|December)\b/g) || [];
  if (calendarWords.some(w => !source.includes(w))) throw new Error("unsupported_schedule");
  const available = new Set(numbers(source));
  if (numbers(reply).some(n => !available.has(n))) throw new Error("unsupported_value");
  const links = reply.match(/https?:\/\/[^\s<>]+|[\w.+-]+@[\w.-]+\.[a-z]{2,}/gi) || [];
  if (links.some(link => !source.includes(link.replace(/[.,;)]$/, "")))) throw new Error("unsupported_contact");
  for (const fact of facts) {
    if (requiredContent(fact).some(s => !reply.toLowerCase().includes(s.toLowerCase()))) throw new Error("missing_condition");
    if (/fictional/i.test(fact.label) && !/\bfictional\b/i.test(reply)) throw new Error("missing_fictional_label");
  }
  // Deny positive action/availability/entitlement claims. This is a conservative guard, not a semantic proof.
  const ordinary = reply.replace(/\b(?:I|we)\s+(?:cannot|can't|can’t|do not|don't|don’t|won't|won’t)\s+(?:\w+\s+){0,2}(?:send|contact|notify|book|arrange|confirm|reserve|guarantee|connect)\b/gi, "");
  if (/\b(?:I|we)(?:['’](?:ve|ll)| have| will| can)\s+(?:\w+\s+){0,2}(?:sent|send|contacted|contact|notified|notify|booked|book|arrange|arranged|confirmed|confirm|reserve|reserved|guarantee|connect|connected)\b|\b(?:request|booking|reservation|handover)\s+(?:is|was|has been)\s+(?:sent|submitted|queued|confirmed|accepted|completed)|\b(?:someone is on the way|all sorted|you['’]re booked|you are booked|guaranteed|will call you|will contact you|has been notified)\b/i.test(ordinary)) throw new Error("unsupported_action");
  if (/\b(?:email|phone|number|room|password|card|booking reference)\b/i.test(reply) && /\b(?:give|tell|share|provide|enter|what(?:['’]s| is)|which)\b/i.test(reply) && /(?:your|you)\b/i.test(reply)) throw new Error("unnecessary_collection");
  for (const sentence of reply.split(/[.!?]/)) {
    if (/\b(?:free|complimentary|refund|upgrade|waived)\b/i.test(sentence) && !/\b(?:free|complimentary|refund|upgrade|waived)\b/i.test(source) && !/\b(?:cannot|can't|can’t|not|no|don't|don’t)\b/i.test(sentence)) throw new Error("unsupported_benefit");
  }
  if (/\b(?:would you like me to|shall I|let me)\s+(?:send|contact|notify|book|arrange|confirm|reserve|connect)\b/i.test(reply)) throw new Error("unsupported_action");
  if (/\bI(?:['’]m| am) (?:a )?(?:human|real person|receptionist)\b/i.test(reply)) throw new Error("unsupported_identity");
}
