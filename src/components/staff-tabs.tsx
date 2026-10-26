"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export function StaffTabs() {
  const path = usePathname();
  return (
    <nav className="staff-tabs" aria-label="Staff workspace">
      {[
        { href: "/staff", title: "Offers" },
        { href: "/staff/knowledge", title: "Manage hotel knowledge" },
        { href: "/staff/review", title: "Private test view" },
      ].map((l) => (
        <Link
          key={l.href}
          href={l.href}
          aria-current={path === l.href ? "page" : undefined}
        >
          {l.title}
        </Link>
      ))}
    </nav>
  );
}
