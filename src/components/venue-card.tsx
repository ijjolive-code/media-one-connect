import { VenueLink } from "./venue-link";
import { Photo } from "./photo";
import { Icon } from "./icon";
import { guestSourceText } from "@/modules/concierge/validation";
import { guestKnowledge } from "@/modules/guest-knowledge";
import type { Place } from "@/modules/discovery";
export async function VenueCard({
  place,
  featured = false,
}: {
  place: Place;
  featured?: boolean;
}) {
  let profile;
  try {
    profile = (await guestKnowledge(place.slug)).find(
      (f) => f.key === place.profile,
    );
  } catch {}
  const description =
    profile &&
    !/\b(?:AED|USD|GBP|EUR|subject|conditions?|availability|charges?|free|complimentary)\b|[$%£€]/i.test(
      profile.text,
    )
      ? profile.text
      : null;
  return (
    <VenueLink
      className={`venue-card ${featured ? "venue-featured" : ""}`}
      slug={place.slug}
    >
      {place.photo ? (
        <Photo
          name={place.photo}
          alt={
            place.name === "garden on 8"
              ? "Guests enjoying the terrace at garden on 8"
              : `Seating and atmosphere at ${place.name}`
          }
          position={place.position}
          sizes="(max-width: 700px) 48vw, (max-width: 1100px) 40vw, 28vw"
        />
      ) : (
        <span className="venue-type-art" aria-hidden="true">
          M12go
        </span>
      )}
      <span className="venue-card-copy">
        <span>
          <h3>{place.name}</h3>
          {description && (
            <span className="venue-description">
              {profile ? guestSourceText(description, [profile]) : description}
            </span>
          )}
        </span>
        <Icon name="arrow" />
      </span>
    </VenueLink>
  );
}
