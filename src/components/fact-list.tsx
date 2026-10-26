import { guestSourceText } from "@/modules/concierge/validation";
import type { Evidence } from "@/modules/concierge/answer-core";
export function FactList({
  facts,
  review = false,
}: {
  facts: Evidence[];
  review?: boolean;
}) {
  return (
    <div className="fact-list">
      {facts.map((f) => (
        <details key={f.id} className="published-fact">
          <summary>
            <span className="fact-question">
              {review ? f.question : guestSourceText(f.question, [f])}
            </span>
            <span aria-hidden="true">+</span>
          </summary>
          <div className="fact-answer">
            <p>{review ? f.text : guestSourceText(f.text, [f])}</p>
            {/fictional/i.test(f.label) && (
              <p className="content-label">Fictional test content</p>
            )}
            <details className="source-disclosure">
              <summary>Source details</summary>
              <small>
                {review ? f.label : f.label.replaceAll(" — ", " · ")}
                <br />
                {f.key} · {f.sources.map((s) => s.id).join(", ")}
                <br />
                Review before {f.reviewDue}
              </small>
            </details>
          </div>
        </details>
      ))}
    </div>
  );
}
