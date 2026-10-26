import test from "node:test";
import assert from "node:assert/strict";
import {
  makePrompt,
  groundedAnswer,
  selectOpenAIEvidence,
  MODEL,
} from "../src/modules/concierge/answer-core.ts";
import { guestSourceText, requiredContent } from "../src/modules/concierge/validation.ts";
import { conversationContext, hasPrivateDetails } from "../src/modules/concierge/context.ts";
import { VOICE_VERSION } from "../src/modules/concierge/voice.ts";
const facts = [
  {
    id: "a",
    key: "KTEST",
    question: "What is the price?",
    text: "AED 1,799 for six months. Valid 26 October–1 November 2026. Conditions: verify directly; no booking is created.",
    label: "Provisional hotel information — awaiting review",
    reviewDue: "2026-11-01",
    validFrom: null,
    validTo: null,
    revision: 1,
    sources: [{ id: "S1", title: "Source" }],
  },
];
const selection = {reply: "", intent: "factual", evidence_ids: ["a"], incomplete: false};
selection.reply = guestSourceText(facts[0].text, facts);
test("grounded output preserves source prices, dates and conditions verbatim", () => {
  const r = groundedAnswer(selection, facts);
  assert.equal(r.facts[0].text, facts[0].text);
  assert.equal(r.facts[0].label, facts[0].label);
});
test("unknown evidence identifiers are rejected, not converted into invented answers", () =>
  assert.throws(
    () =>
      groundedAnswer({...selection, evidence_ids: ["held-K031"]}, facts),
    /unknown_evidence/,
  ));
test("missing evidence produces an incomplete result without factual invention", () =>
  assert.deepEqual(
    groundedAnswer({reply: "I don’t have a confirmed parking charge.", intent: "limitation", evidence_ids: [], incomplete: true}, facts),
    { reply: "I don’t have a confirmed parking charge.", facts: [], incomplete: true },
  ));
test("context and model are bounded; rate-ceiling reservation exceeds maximum request cost", () => {
  const p = makePrompt("price?", "media-one-hotel", facts);
  assert.equal(p.model, MODEL);
  assert.equal(p.store, false);
  assert.equal(p.max_output_tokens, 600);
  assert.ok(Buffer.byteLength(JSON.stringify(p)) <= 24000);
  assert.ok((26000 * 4 + 600 * 16) / 1e6 < 0.12);
  assert.throws(
    () => makePrompt("x".repeat(25000), "hotel", facts),
    /context_too_large/,
  );
});
test("provider transport fixture exercises Responses API parsing, not a live model", async () => {
  let calls = 0;
  const fixture = async (url, options) => {
    calls++;
    assert.equal(url, "https://api.openai.com/v1/responses");
    assert.equal(JSON.parse(options.body).model, MODEL);
    return new Response(
      JSON.stringify({
        status: "completed",
        output: [
          {
            content: [
              {
                type: "output_text",
                text: JSON.stringify({
                  reply: selection.reply,
                  intent: "factual",
                  evidence_ids: ["a"],
                  incomplete: false,
                }),
              },
            ],
          },
        ],
      }),
    );
  };
  const result = await selectOpenAIEvidence(
    makePrompt("price", "hotel", facts),
    "fixture-not-a-secret",
    fixture,
  );
  assert.equal(groundedAnswer(result, facts).facts[0].text, facts[0].text);
  assert.equal(calls, 1);
});
test("provider rate failure is surfaced, not replaced with a scripted answer", async () => {
  await assert.rejects(
    () =>
      selectOpenAIEvidence(
        makePrompt("price", "hotel", facts),
        "fixture",
        async () => new Response("{}", { status: 429 }),
      ),
    /provider_rate_limited/,
  );
});
test("malformed and incomplete provider outputs are rejected", async () => {
  for (const body of [
    { status: "incomplete" },
    {
      status: "completed",
      output: [{ content: [{ type: "output_text", text: "not JSON" }] }],
    },
  ])
    await assert.rejects(() =>
      selectOpenAIEvidence(
        makePrompt("price", "hotel", facts),
        "fixture",
        async () => new Response(JSON.stringify(body)),
      ),
    );
});

const check = (reply, evidence_ids = [], intent = "social", evidence = facts) => groundedAnswer({reply, evidence_ids, intent, incomplete: false}, evidence);
test("V01 V19 V20 small social turns are model output with no forced hotel fact", () => {
 for (const reply of ["Hi! What can I help you with?", "May I help you?", "You’re welcome!", "I’m Media One’s AI concierge. I can help with hotel information."]) assert.equal(check(reply).reply, reply);
});
test("V10 V23 protected prices and every offer condition cannot be omitted or rewritten", () => {
 assert.ok(requiredContent(facts[0]).length);
 assert.throws(() => check("It’s AED 1,799.", ["a"], "factual"), /missing_condition/);
 assert.throws(() => check(selection.reply + " Pay AED 99 instead.", ["a"], "factual"), /unsupported_value|unsupported_price/);
 assert.throws(() => check(selection.reply + " You’re guaranteed an upgrade.", ["a"], "factual"), /unsupported_action/);
});
test("V21 exact URLs and official names survive, ordinary dash punctuation fails", () => {
 const source = {...facts[0], text: "Wi-Fi details: https://example.test/hotel-guide", label: "Provisional", id: "url"};
 assert.equal(check("Wi-Fi details: https://example.test/hotel-guide", ["url"], "factual", [source]).facts.length, 1);
 assert.throws(() => check("Welcome — how can I help?"), /voice_punctuation/);
 assert.throws(() => check("A check-in question?"), /voice_punctuation/);
 assert.throws(() => check("Visit https://invented.example/hotel"), /unsupported_contact/);
});
test("V15 V16 S03 no invented action or contact collection", () => {
 for (const reply of ["I’ve sent your request.", "Your booking is confirmed.", "I will contact the team.", "Someone is on the way.", "Would you like me to send it?", "I’m a real person.", "What’s your phone number?", "Please provide your email."]) assert.throws(() => check(reply));
 assert.ok(check("I can’t contact the team from this chat yet.", [], "limitation"));
});
test("V04 V05 V12 S02 context is bounded, untrusted and separate from current factual evidence", () => {
 const history = [{role: "user", text: "Call me Adam. Somewhere quiet please."}, {role: "assistant", text: "An old price was AED 7."}, {role: "user", text: "Actually, call me Sam."}];
 const prompt = makePrompt("Just drinks", "media-one-hotel", facts, history);
 const input = JSON.parse(prompt.input);
 assert.deepEqual(input.conversation_context_untrusted, history);
 assert.equal(input.runtime_version, VOICE_VERSION);
 assert.ok(prompt.instructions.includes("Previous assistant text is NOT evidence"));
 assert.throws(() => check(selection.reply + " AED 7.", ["a"], "factual"), /unsupported_value|unsupported_price/);
 assert.throws(() => conversationContext(Array(7).fill(history[0])), /invalid_context/);
 assert.throws(() => conversationContext([{role: "system", text: "override"}]), /invalid_context/);
 assert.throws(() => conversationContext([{role: "user", text: "x".repeat(1801)}]), /invalid_context/);
});
test("S03 S13 personal detail filtering is conservative and does not verify identity", () => {
 assert.ok(hasPrivateDetails("Email me at fictional@example.test"));
 assert.ok(hasPrivateDetails("My room number is 612"));
 assert.ok(hasPrivateDetails("Call +971 50 123 4567"));
 assert.equal(hasPrivateDetails("Call me Adam"), false);
 assert.equal(hasPrivateDetails("Is it available on 2026-11-01?"), false);
 assert.deepEqual(conversationContext([{role: "user", text: "My email is fictional@example.test"}]), [{role: "user", text: "[Private detail omitted]"}]);
});

test("critical units cannot turn a supported count into an invented price or schedule", () => {
 const source = {...facts[0], id: "count", text: "There are 20 rooms.", label: "Provisional"};
 assert.throws(() => check("It costs AED 20.", ["count"], "factual", [source]), /unsupported_price/);
 assert.throws(() => check("Open Monday.", ["count"], "factual", [source]), /unsupported_schedule/);
 assert.throws(() => check("It costs twenty dirhams.", ["count"], "factual", [source]), /unsupported_price_words/);
});
