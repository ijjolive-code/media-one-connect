"use client";
import { useActionState } from "react";
import { saveOffer } from "./actions";
import type { Offer, OfferFormState } from "@/modules/offers/types";
export function OfferEditor({ offer }: { offer: Offer }) {
  const [state, action, pending] = useActionState<OfferFormState, FormData>(
    saveOffer,
    {},
  );
  return (
    <form action={action} className="staff-form offer-editor">
      <input
        type="hidden"
        name="revision"
        value={state.revision ?? offer.revision}
      />
      <div className="editor-heading">
        <div>
          <span className="eyebrow">MEDIA ONE HOTEL</span>
          <h2>Edit the demo offer</h2>
        </div>
        <span className="status-tag">
          Revision {state.revision ?? offer.revision}
        </span>
      </div>
      <label htmlFor="offer-title">Offer title</label>
      <input
        id="offer-title"
        name="title"
        defaultValue={offer.title}
        required
        minLength={3}
        maxLength={100}
      />
      <label htmlFor="offer-description">Description</label>
      <textarea
        id="offer-description"
        name="description"
        defaultValue={offer.description}
        required
        minLength={10}
        maxLength={1000}
        rows={4}
      />
      <label htmlFor="offer-terms">Sample conditions</label>
      <textarea
        id="offer-terms"
        name="terms"
        defaultValue={offer.terms}
        required
        minLength={5}
        maxLength={2000}
        rows={3}
      />
      <fieldset className="date-fields">
        <legend>Guest display dates · Asia/Dubai</legend>
        <div>
          <label htmlFor="offer-start">Start date</label>
          <input
            id="offer-start"
            name="starts_on"
            type="date"
            defaultValue={offer.starts_on}
            required
          />
        </div>
        <div>
          <label htmlFor="offer-end">End date</label>
          <input
            id="offer-end"
            name="ends_on"
            type="date"
            defaultValue={offer.ends_on}
            required
          />
        </div>
      </fieldset>
      <label className="checkbox-label">
        <input
          type="checkbox"
          name="is_published"
          defaultChecked={offer.is_published}
        />
        <span>
          Display in the guest demo
          <small>
            Visible only within its display dates. This does not approve a real
            hotel promotion.
          </small>
        </span>
      </label>
      {state.error && (
        <p role="alert" className="form-error">
          {state.error}
        </p>
      )}
      {state.success && (
        <p role="status" className="form-success">
          {state.success}
        </p>
      )}
      <div className="editor-save">
        <button className="button primary" type="submit" disabled={pending}>
          {pending ? "Saving…" : "Save demo offer"}
        </button>
        <span>Saved changes persist in the development database.</span>
      </div>
    </form>
  );
}
