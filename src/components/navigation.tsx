"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "./icon";

const links = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/explore", label: "Explore", icon: "compass" },
  { href: "/concierge", label: "Concierge", icon: "chat" },
  { href: "/my-stay", label: "My Stay", icon: "stay" },
  { href: "/profile", label: "Profile", icon: "staff" },
] as const;
export function Navigation() {
  const pathname = usePathname();
  return (
    <nav className="guest-navigation" aria-label="Guest navigation">
      <span className="nav-heading">YOUR GUEST SPACE</span>
      {links.map((link) => {
        const active =
          pathname === link.href ||
          (link.href === "/explore" && pathname === "/hotel");
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
          >
            <span className="nav-icon">
              <Icon name={link.icon} />
            </span>
            <span>{link.label}</span>
          </Link>
        );
      })}
      <div className="nav-footnote">
        Media One Hotel pilot
        <br />
        Demonstration only
      </div>
    </nav>
  );
}
