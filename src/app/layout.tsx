import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Media One Connect · Demonstration", template: "%s · Media One Connect demo" },
  description: "M0 fictional-data demonstration for the Media One Hotel pilot. No live guest services.",
  robots: { index: false, follow: false },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>
    <a className="skip-link" href="#main">Skip to content</a>
    <div className="demo-banner"><span className="demo-dot" /> M0 DEMONSTRATION <span className="banner-detail">Fictional hotel data · No live services or bookings</span></div>
    <Navigation />
    <main id="main" tabIndex={-1}>{children}</main>
    <footer><div><strong>media one connect</strong><p>A first look at a more connected stay.</p></div><div className="footer-note">Concept branding · Fictional content<br />Media One Hotel pilot · <Link href="/explore">What works in this demo</Link></div></footer>
  </body></html>;
}
