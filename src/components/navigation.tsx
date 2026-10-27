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
  const activeIndex = links.findIndex(
    (link) =>
      path === link.href ||
      (link.href === "/explore" &&
        (path.startsWith("/explore/") || path.startsWith("/hotel"))),
  );
  return (
    <nav className="guest-navigation" aria-label="Guest navigation">
      <span className="nav-motion-track" aria-hidden="true">
        <span
          style={{
            transform: `translateX(${Math.max(0, activeIndex) * 100}%)`,
            opacity: activeIndex < 0 ? 0 : 1,
          }}
        />
      </span>
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
