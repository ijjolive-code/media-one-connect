"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { Navigation } from "./navigation";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const shell = useRef<HTMLDivElement>(null);
  const main = useRef<HTMLElement>(null);
  const isStaff = pathname.startsWith("/staff");
  const isConversation = pathname === "/concierge";
  useEffect(() => {
    const viewport = window.visualViewport;
    const resize = () => {
      if (!shell.current) return;
      shell.current.style.height = `${viewport?.height ?? window.innerHeight}px`;
      shell.current.style.top = `${viewport?.offsetTop ?? 0}px`;
      shell.current.dataset.compact = String(
        (viewport?.height ?? window.innerHeight) < 540,
      );
    };
    resize();
    viewport?.addEventListener("resize", resize);
    viewport?.addEventListener("scroll", resize);
    window.addEventListener("resize", resize);
    return () => {
      viewport?.removeEventListener("resize", resize);
      viewport?.removeEventListener("scroll", resize);
      window.removeEventListener("resize", resize);
    };
  }, []);
  useEffect(() => {
    const target = window.location.hash
      ? document.getElementById(
          decodeURIComponent(window.location.hash.slice(1)),
        )
      : null;
    if (target) target.scrollIntoView();
    else main.current?.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div ref={shell} className={`app-shell ${isStaff ? "staff-shell" : ""}`}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="app-header">
        <Link
          href={isStaff ? "/staff" : "/"}
          className="property-label"
          aria-label={isStaff ? "Staff demo home" : "Media One Connect home"}
        >
          <strong>{isStaff ? "Staff workspace" : "Media One Hotel"}</strong>
          <span>
            {isStaff
              ? "Read-only demonstration"
              : "Text-only identity · logo pending"}
          </span>
        </Link>
        {isStaff ? (
          <Link className="utility-link" href="/profile">
            Return to guest app
          </Link>
        ) : (
          <span className="demo-badge">Demo</span>
        )}
      </header>
      <div className="demo-banner">
        Fictional hotel data · No live services or bookings
      </div>
      <div className="app-workspace">
        {!isStaff && <Navigation />}
        <main
          ref={main}
          id="main"
          tabIndex={-1}
          className={`app-content ${isConversation ? "is-conversation" : ""}`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
