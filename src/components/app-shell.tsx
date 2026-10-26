"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Navigation } from "./navigation";
import { Icon } from "./icon";
import { Sheet } from "./sheet";
import { DemoConcierge } from "@/app/concierge/demo-concierge";
export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const shell = useRef<HTMLDivElement>(null),
    main = useRef<HTMLElement>(null);
  const positions = useRef(new Map<string, number>());
  const cancelRestore = useRef<() => void>(() => {});
  const previous = useRef(pathname);
  const restoring = useRef(false);
  const [menu, setMenu] = useState(false);
  const staff = pathname.startsWith("/staff"),
    chat = pathname === "/concierge";
  useEffect(() => {
    const viewport = window.visualViewport;
    let base = window.innerHeight;
    const resize = () => {
      const height = viewport?.height ?? window.innerHeight;
      const input = document.activeElement?.matches("input,textarea,select");
      if (!input) base = window.innerHeight;
      if (shell.current) {
        shell.current.style.height = `${height}px`;
        shell.current.style.top = `${viewport?.offsetTop ?? 0}px`;
        shell.current.dataset.keyboard = String(
          !!input && (base - height > 120 || height < 540),
        );
      }
    };
    resize();
    viewport?.addEventListener("resize", resize);
    viewport?.addEventListener("scroll", resize);
    window.addEventListener("resize", resize);
    document.addEventListener("focusin", resize);
    document.addEventListener("focusout", resize);
    return () => {
      viewport?.removeEventListener("resize", resize);
      viewport?.removeEventListener("scroll", resize);
      window.removeEventListener("resize", resize);
      document.removeEventListener("focusin", resize);
      document.removeEventListener("focusout", resize);
    };
  }, []);
  useLayoutEffect(() => {
    if (previous.current === pathname) return;
    previous.current = pathname;
    restoring.current = true;
    const desired = positions.current.get(pathname) ?? 0;
    let frame = 0,
      settled = 0;
    const deadline = performance.now() + 2000;
    const restore = () => {
      const el = main.current;
      if (!el) return;
      const target = window.location.hash
        ? document.getElementById(
            decodeURIComponent(window.location.hash.slice(1)),
          )
        : null;
      if (target) {
        target.scrollIntoView();
        restoring.current = false;
        return;
      }
      if (el.scrollHeight - el.clientHeight >= desired - 2) {
        el.scrollTop = desired;
        settled++;
      } else settled = 0;
      if (settled < 3 && performance.now() < deadline)
        frame = requestAnimationFrame(restore);
      else restoring.current = false;
    };
    frame = requestAnimationFrame(restore);
    const cancel = () => {
      cancelAnimationFrame(frame);
      restoring.current = false;
    };
    cancelRestore.current = cancel;
    const el = main.current;
    el?.addEventListener("wheel", cancel, { passive: true });
    el?.addEventListener("touchstart", cancel, { passive: true });
    return () => {
      cancel();
      el?.removeEventListener("wheel", cancel);
      el?.removeEventListener("touchstart", cancel);
    };
  }, [pathname]);
  return (
    <div
      ref={shell}
      onPointerDownCapture={() => cancelRestore.current()}
      onKeyDownCapture={() => cancelRestore.current()}
      onClickCapture={() => {
        if (main.current)
          positions.current.set(pathname, main.current.scrollTop);
      }}
      className={`app-shell ${staff ? "staff-shell" : ""} ${chat ? "chat-shell" : ""}`}
    >
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="app-header">
        <Link
          className="brand-logo"
          href={staff ? "/staff" : "/"}
          aria-label={staff ? "Staff workspace" : "Media One Connect home"}
        >
          <Image
            src="/brand/media-one-logo.png"
            alt="Media One Hotel"
            width={2424}
            height={1062}
            sizes="180px"
            priority
          />
        </Link>
        {staff ? (
          <div className="staff-header-tools">
            <span>Team workspace</span>
            <Link href="/" className="header-return">
              Guest app <Icon name="arrow" />
            </Link>
          </div>
        ) : (
          <div className="header-tools">
            <span className="preview-indicator">Private preview</span>
            <button
              className="header-menu"
              aria-label="Your visit and hotel information"
              onClick={() => setMenu(true)}
            >
              <Icon name="staff" />
            </button>
          </div>
        )}
      </header>
      <div className="app-workspace">
        {!staff && <Navigation />}
        <main
          ref={main}
          id="main"
          tabIndex={-1}
          className={`app-content ${chat ? "is-conversation" : ""}`}
          onScroll={() => {
            if (!restoring.current && main.current)
              positions.current.set(pathname, main.current.scrollTop);
          }}
        >
          {!chat && children}
          <div className="concierge-mount" hidden={!chat}>
            <DemoConcierge active={chat} />
          </div>
        </main>
      </div>
      <Sheet open={menu} onClose={() => setMenu(false)} title="Your visit">
        <div className="utility-menu">
          {[
            {
              href: "/hotel",
              title: "Hotel guide",
              detail: "Getting here and useful information",
            },
            {
              href: "/hotel/knowledge",
              title: "Good to know",
              detail: "Answers to your hotel questions",
            },
            {
              href: "/my-stay",
              title: "Stay help",
              detail: "Booking and stay information",
            },
            {
              href: "/profile",
              title: "About your visit",
              detail: "Exploring without an account",
            },
          ].map((l) => (
            <Link href={l.href} key={l.href} onClick={() => setMenu(false)}>
              <span>
                {l.title}
                <small>{l.detail}</small>
              </span>
              <Icon name="arrow" />
            </Link>
          ))}
          <Link
            className="staff-menu-link"
            href="/staff"
            onClick={() => setMenu(false)}
          >
            For the hotel team <Icon name="arrow" />
          </Link>
        </div>
      </Sheet>
    </div>
  );
}
