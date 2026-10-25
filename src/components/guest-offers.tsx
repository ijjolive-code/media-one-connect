import { guestOffers } from "@/modules/offers/data";
import { offerDate } from "@/modules/offers/types";

export async function GuestOffers() {
  const { offers, unavailable } = await guestOffers();
  return (
    <section
      className="home-section demo-offers"
      aria-labelledby="demo-offers-title"
    >
      <div className="section-heading">
        <h2 id="demo-offers-title">Demo offers</h2>
        <span className="status-tag">Fictional content</span>
      </div>
      {unavailable ? (
        <div className="notice">
          <strong>Demo offers are unavailable</strong>
          <p>
            The development database is not connected or could not be reached.
            No saved offer is being shown.
          </p>
        </div>
      ) : offers.length === 0 ? (
        <p className="offer-empty">
          No published demo offers are within their display dates. Check back
          after a staff update.
        </p>
      ) : (
        offers.map((offer) => (
          <article className="offer-card" key={offer.id}>
            <span className="eyebrow">MEDIA ONE HOTEL · FICTIONAL OFFER</span>
            <h3>{offer.title}</h3>
            <p>{offer.description}</p>
            <div className="offer-validity">
              Demo dates:{" "}
              <time dateTime={offer.starts_on}>
                {offerDate(offer.starts_on)}
              </time>{" "}
              – <time dateTime={offer.ends_on}>{offerDate(offer.ends_on)}</time>
              <small>Inclusive dates · Asia/Dubai</small>
            </div>
            <details>
              <summary>Sample conditions</summary>
              <p>{offer.terms}</p>
            </details>
            <p className="offer-disclaimer">
              Test content only. Not a real hotel promotion, benefit or booking.
            </p>
          </article>
        ))
      )}
    </section>
  );
}
