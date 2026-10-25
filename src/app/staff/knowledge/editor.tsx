"use client";
import { useActionState } from "react";
import type { KnowledgeRecord } from "@/modules/knowledge/types";
import { saveKnowledge } from "./actions";
export function KnowledgeEditor({
  record,
  replacement,
  today,
}: {
  record: KnowledgeRecord | null;
  replacement: KnowledgeRecord | null;
  today: string;
}) {
  const [state, action, pending] = useActionState(saveKnowledge, {});
  const item = record || replacement;
  const source = item?.source_refs[0];
  const due = new Date(new Date(today + "T12:00:00Z").getTime() + 7 * 86400000)
    .toISOString()
    .slice(0, 10);
  const provisional = record?.provenance === "provisional";
  return (
    <form action={action} className="staff-form offer-editor">
      <input type="hidden" name="id" value={record?.id || ""} />
      <input
        type="hidden"
        name="supersedes"
        value={replacement?.id || record?.supersedes || ""}
      />
      <input type="hidden" name="revision" value={record?.revision || 0} />
      <h2>
        {replacement
          ? "Create reviewed replacement"
          : record
            ? "Edit knowledge"
            : "New hotel knowledge"}
      </h2>
      <p className="form-hint">
        Media One Hotel · Reviewed publication here is for this private
        prototype, not production approval.
      </p>
      <label htmlFor="knowledge-kind">Content type</label>
      <select
        id="knowledge-kind"
        name="kind"
        defaultValue={item?.kind || "faq"}
      >
        <option value="faq">FAQ</option>
        <option value="facility">Facility</option>
        <option value="policy">Policy</option>
      </select>
      <label htmlFor="knowledge-question">Guest question / title</label>
      <input
        id="knowledge-question"
        name="question"
        required
        minLength={3}
        maxLength={240}
        defaultValue={item?.question || ""}
      />
      <label htmlFor="knowledge-answer">Source-grounded answer</label>
      <textarea
        id="knowledge-answer"
        name="answer"
        required
        minLength={3}
        maxLength={2400}
        rows={7}
        defaultValue={item?.answer || ""}
      />
      <label htmlFor="knowledge-provenance">Content label</label>
      <select
        id="knowledge-provenance"
        name="provenance"
        defaultValue={
          provisional ? "provisional" : record?.provenance || "staff_reviewed"
        }
        disabled={provisional}
      >
        <option value="staff_reviewed">
          Staff-reviewed · private prototype
        </option>
        <option value="fictional">Fictional test content</option>
        {provisional && (
          <option value="provisional">
            Provisional source — awaiting review
          </option>
        )}
      </select>
      <label htmlFor="knowledge-status">Publication status</label>
      <select
        id="knowledge-status"
        name="status"
        defaultValue={record?.status || "draft"}
      >
        <option value="draft">Draft — excluded</option>
        {provisional ? (
          <option value="prototype">Private-prototype provisional</option>
        ) : (
          <option value="published">Published for private review</option>
        )}
        <option value="held">Held — excluded</option>
        <option value="archived">Archived — excluded</option>
      </select>
      <label htmlFor="source-title">Source title</label>
      <input
        id="source-title"
        name="source_title"
        required
        maxLength={200}
        defaultValue={source?.title || ""}
        readOnly={provisional}
      />
      <label htmlFor="source-reference">Source URL / document reference</label>
      <input
        id="source-reference"
        name="source_ref"
        required
        maxLength={800}
        defaultValue={source?.url || "Staff-reviewed hotel reference"}
        readOnly={provisional}
      />
      {provisional && (
        <p className="form-hint">
          All original source references are preserved. Create a reviewed
          replacement rather than relabelling the source as approved.
        </p>
      )}
      <fieldset className="date-fields">
        <legend>Review window · Asia/Dubai</legend>
        <div>
          <label htmlFor="knowledge-reviewed">Reviewed on</label>
          <input
            id="knowledge-reviewed"
            name="reviewed_on"
            type="date"
            required
            defaultValue={record?.reviewed_on || today}
          />
        </div>
        <div>
          <label htmlFor="knowledge-due">Review before</label>
          <input
            id="knowledge-due"
            name="review_due"
            type="date"
            required
            defaultValue={record?.review_due || due}
          />
        </div>
      </fieldset>
      <fieldset className="date-fields">
        <legend>Optional source validity · Dubai inclusive dates</legend>
        <div>
          <label htmlFor="knowledge-from">Valid from</label>
          <input
            id="knowledge-from"
            name="valid_from"
            type="date"
            defaultValue={record?.valid_from || ""}
          />
        </div>
        <div>
          <label htmlFor="knowledge-to">Valid to</label>
          <input
            id="knowledge-to"
            name="valid_to"
            type="date"
            defaultValue={record?.valid_to || ""}
          />
        </div>
      </fieldset>
      <p className="form-hint">
        Blank validity dates mean unknown, not permanent. Review expiry still
        applies. Publishing a current reviewed replacement permanently
        suppresses its predecessor, which cannot silently return later.
      </p>
      {state.error && (
        <p className="form-error" role="alert">
          {state.error}
        </p>
      )}
      {state.success && (
        <p className="form-success" role="status">
          {state.success}{" "}
          <a className="text-link" href={"/staff/knowledge?id=" + state.id}>
            Reload saved version
          </a>
        </p>
      )}
      <button
        className="button primary"
        type="submit"
        disabled={pending || (!!state.id && !record)}
      >
        {pending ? "Saving…" : "Save knowledge"}
      </button>
    </form>
  );
}
