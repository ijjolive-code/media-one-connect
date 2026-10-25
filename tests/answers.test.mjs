import test from "node:test";
import assert from "node:assert/strict";
import {
  makePrompt,
  groundedAnswer,
  selectOpenAIEvidence,
  MODEL,
} from "../src/modules/concierge/answer-core.ts";
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
test("grounded output preserves source prices, dates and conditions verbatim", () => {
  const r = groundedAnswer({ evidence_ids: ["a"], incomplete: false }, facts);
  assert.equal(r.facts[0].text, facts[0].text);
  assert.equal(r.facts[0].label, facts[0].label);
});
test("unknown evidence identifiers are rejected, not converted into invented answers", () =>
  assert.throws(
    () =>
      groundedAnswer({ evidence_ids: ["held-K031"], incomplete: false }, facts),
    /unknown_evidence/,
  ));
test("missing evidence produces an incomplete result without factual invention", () =>
  assert.deepEqual(
    groundedAnswer({ evidence_ids: [], incomplete: true }, facts),
    { facts: [], incomplete: true },
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
