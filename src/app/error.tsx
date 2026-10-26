"use client";
import Link from "next/link";
export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="page-wrap error-screen">
      <h1>Something didn’t load.</h1>
      <p>
        Please try again. You can also return Home and explore another part of
        the hotel.
      </p>
      <div className="button-row">
        <button className="button primary" onClick={reset}>
          Try again
        </button>
        <Link href="/" className="button">
          Home
        </Link>
      </div>
    </div>
  );
}
