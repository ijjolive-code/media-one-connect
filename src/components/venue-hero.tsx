"use client";
import { Photo } from "./photo";
import { useMotion } from "./motion-provider";
import type { Place } from "@/modules/discovery";
export function VenueHero({ place }: { place: Place }) {
  const { selectedPhoto } = useMotion();
  const allowed = [
    place.photo,
    place.gallery,
    ...(place.slug === "coco-lounge" ? ["coco-pool-night"] : []),
  ];
  const selected =
    selectedPhoto?.slug === place.slug && allowed.includes(selectedPhoto.name)
      ? selectedPhoto.name
      : null;
  const name = selected || place.gallery;
  if (!name) return <div className="venue-type-art detail-photo">M12go</div>;
  return (
    <Photo
      className="detail-photo"
      name={name}
      alt={`Seating and atmosphere at ${place.name}`}
      position={name === place.photo ? place.position : "50% 50%"}
      priority
      transitionName="venue-photo"
      venueHero={place.slug}
    />
  );
}
