"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, type ComponentProps } from "react";
import { useMotion } from "./motion-provider";
// A progressive same-document transition. Routing, direct URLs and Back stay native Next navigation.
export function VenueLink({
  slug,
  children,
  onClick,
  ...props
}: Omit<ComponentProps<typeof Link>, "href"> & { slug: string }) {
  const router = useRouter();
  const motion = useMotion();
  const cleanup = useRef<() => void>(() => {});
  return (
    <Link
      {...props}
      href={`/explore/${slug}`}
      onClick={(event) => {
        onClick?.(event);
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        )
          return;
        const photo =
          event.currentTarget.querySelector<HTMLElement>("[data-photo-name]");
        const name = photo?.dataset.photoName;
        if (name) motion.selectPhoto(slug, name);
        if (!photo || motion.reduced || !document.startViewTransition) return;
        event.preventDefault();
        cleanup.current();
        photo.style.viewTransitionName = "venue-photo";
        let observer: MutationObserver | undefined;
        let timeout: ReturnType<typeof setTimeout> | undefined;
        let resolveUpdate: (() => void) | undefined;
        let cancelled = false;
        let removeLoad = () => {};
        const keyboard = event.detail === 0;
        const finish = () => {
          observer?.disconnect();
          if (timeout) clearTimeout(timeout);
          removeLoad();
          const done = resolveUpdate;
          resolveUpdate = undefined;
          done?.();
        };
        const transition = document.startViewTransition(
          () =>
            new Promise<void>((resolve) => {
              resolveUpdate = resolve;
              const scan = () => {
                const hero = document.querySelector<HTMLElement>(
                  `[data-venue-hero="${slug}"]`,
                );
                if (!hero || !hero.getBoundingClientRect().width) return;
                const image = hero.querySelector("img");
                if (image && !image.complete) return;
                finish();
                if (keyboard) {
                  const heading =
                    document.querySelector<HTMLElement>("main h1");
                  if (heading) {
                    heading.tabIndex = -1;
                    heading.focus({ preventScroll: true });
                  }
                }
              };
              observer = new MutationObserver(scan);
              observer.observe(document.querySelector("main")!, {
                childList: true,
                subtree: true,
                attributes: true,
              });
              document.addEventListener("load", scan, true);
              removeLoad = () =>
                document.removeEventListener("load", scan, true);
              timeout = setTimeout(() => {
                transition.skipTransition();
                finish();
              }, 1000);
              router.push(`/explore/${slug}`, { scroll: false });
              scan();
            }),
        );
        transition.ready.catch(() => {});
        // A bounded transition never leaves a frozen snapshot or a named source behind.
        cleanup.current = () => {
          if (cancelled) return;
          cancelled = true;
          transition.skipTransition();
          finish();
          photo.style.viewTransitionName = "";
        };
        transition.finished
          .catch(() => {})
          .finally(() => {
            finish();
            photo.style.viewTransitionName = "";
          });
      }}
    >
      {children}
    </Link>
  );
}
