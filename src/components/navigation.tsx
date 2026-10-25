"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "./icon";

const links = [
  { href: "/", label: "Discover", icon: "home" },
  { href: "/hotel", label: "Hotel information", icon: "hotel" },
  { href: "/concierge", label: "Demo concierge", icon: "chat" },
  { href: "/explore", label: "Coming next", icon: "compass" },
] as const;
export function Navigation() {
  const pathname = usePathname();
  return <header className="site-header">
    <div className="header-inner">
      <Link href="/" className="brand" aria-label="Media One Connect home"><span className="brand-mark">m<span>1</span></span><span>media one<span className="brand-sub">CONNECT · PILOT</span></span></Link>
      <nav aria-label="Main navigation">{links.map(link => <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined}><Icon name={link.icon} /><span>{link.label}</span></Link>)}</nav>
      <Link href="/staff" className={`staff-link ${pathname === "/staff" ? "selected" : ""}`} aria-current={pathname === "/staff" ? "page" : undefined}><Icon name="staff" /><span>Staff demo</span></Link>
    </div>
  </header>;
}
