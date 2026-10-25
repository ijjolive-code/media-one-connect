import Link from "next/link";
export default function NotFound() {
  return <div className="page-wrap inner-page"><span className="eyebrow">A SMALL DETOUR</span><h1>This page isn’t here.</h1><p className="page-intro">Let’s take you back to the demonstration.</p><Link className="button dark" href="/">Back to Home</Link></div>;
}
