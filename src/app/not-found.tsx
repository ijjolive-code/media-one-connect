import Link from "next/link";
export default function NotFound() {
  return (
    <div className="page-wrap not-found">
      <p>A little detour.</p>
      <h1>Let’s get you back.</h1>
      <p>We couldn’t find that page.</p>
      <Link className="button primary" href="/">
        Back to Home
      </Link>
    </div>
  );
}
