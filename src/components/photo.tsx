"use client";
import Image from "next/image";
import { useState } from "react";
export function Photo({
  name,
  alt,
  priority = false,
  position = "50% 50%",
  sizes = "(max-width: 700px) 100vw, 50vw",
  className = "",
  transitionName,
  venueHero,
}: {
  name: string;
  alt: string;
  priority?: boolean;
  position?: string;
  sizes?: string;
  className?: string;
  transitionName?: string;
  venueHero?: string;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <span
      className={`photo ${className}`}
      data-photo-name={name}
      data-venue-hero={venueHero}
      style={{ viewTransitionName: transitionName }}
    >
      {failed ? (
        <span className="photo-fallback">
          {alt}
          <small>Image unavailable</small>
        </span>
      ) : (
        <Image
          src={name.startsWith("/") ? name : `/media/${name}.webp`}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          style={{ objectFit: "cover", objectPosition: position }}
          onError={() => setFailed(true)}
        />
      )}
    </span>
  );
}
