"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "./icon";
const links = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/explore", label: "Explore", icon: "compass" },
  { href: "/concierge", label: "Concierge", icon: "chat" },
] as const;
export function Navigation() {
  const path = usePathname();
  return (
    <nav className="guest-navigation" aria-label="Guest navigation">
      {links.map((link) => {
        const active =
          path === link.href ||
          (link.href === "/explore" &&
            (path.startsWith("/explore/") || path.startsWith("/hotel")));
        return (
          <Link
            href={link.href}
            key={link.href}
            aria-current={active ? "page" : undefined}
          >
            <Icon name={link.icon} />
            <span>{link.label}</span>
            {active && <span className="nav-selected" aria-hidden="true" />}
          </Link>
        );
      })}
      <div className="nav-utility">
        <span>Media One Hotel</span>
        <Link href="/profile">
          Your visit <Icon name="arrow" />
        </Link>
      </div>
    </nav>
  );
}
