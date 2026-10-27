"use client";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
  type PointerEvent,
} from "react";
import { flushSync } from "react-dom";
import { getImageProps } from "next/image";
import Link from "next/link";
import { useCarousel, useMotion, type CarouselId } from "./motion-provider";
import { Photo } from "./photo";
import { VenueLink } from "./venue-link";
import { Icon } from "./icon";
const featured = [
  {
    slug: "coco-lounge",
    name: "Coco Lounge",
    photo: "coco-pool-night",
    caption: "A different view.",
    alt: "Coco Lounge pool and terrace in the evening",
    position: "50% 50%",
  },
  {
    slug: "garden-on-8",
    name: "garden on 8",
    photo: "garden-lifestyle",
    caption: "Find your people.",
    alt: "Guests together on the terrace at garden on 8",
    position: "50% 42%",
  },
  {
    slug: "ciao-bella",
    name: "Ciao Bella",
    photo: "ciao-bella-interior",
    caption: "Pull up a chair.",
    alt: "Tables and bar inside Ciao Bella",
    position: "50% 50%",
  },
  {
    slug: "qwerty",
    name: "Qwerty",
    photo: "qwerty-day",
    caption: "Make yourself comfortable.",
    alt: "Qwerty restaurant seating and bar in daylight",
    position: "50% 50%",
  },
] as const;
const showcaseSizes = "(max-width: 700px) 100vw, 65vw";
export function HomeEntrance({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const motion = useMotion();
  const { markHomeSeen } = motion;
  useEffect(() => {
    let seen = markHomeSeen();
    try {
      seen = seen || sessionStorage.getItem("media-one:home-entered") === "1";
      sessionStorage.setItem("media-one:home-entered", "1");
    } catch {
      // The root provider retains the seen flag when sessionStorage is unavailable.
    }
    if (root.current) root.current.dataset.entered = "true";
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const selectors = [
      ".home-greeting",
      ".home-assist",
      ".home-feature",
      ".quick-links",
    ];
    const animations = selectors.flatMap((s, i) => {
      const el = root.current?.querySelector(s);
      return el?.animate
        ? [
            el.animate(
              [
                { opacity: 0.88, transform: "translateY(8px)" },
                { opacity: 1, transform: "translateY(0)" },
              ],
              {
                duration: 420,
                delay: i * 45,
                easing: "cubic-bezier(.22,1,.36,1)",
              },
            ),
          ]
        : [];
    });
    return () => animations.forEach((a) => a.cancel());
  }, [markHomeSeen]);
  return (
    <div
      ref={root}
      className="page-wrap home-page"
      data-motion-owner={motion.owner ?? "none"}
    >
      {children}
    </div>
  );
}
function rememberPlaybackIntent(target: EventTarget) {
  const control = (target as Element).closest<HTMLButtonElement>(
    "[data-playback-control]",
  );
  if (control)
    control.dataset.pointerIntent =
      control.getAttribute("aria-pressed") === "true" ? "pause" : "play";
}
function PlaybackControl({
  id,
  ended = false,
  onRestart,
}: {
  id: CarouselId;
  ended?: boolean;
  onRestart?: () => void;
}) {
  const motion = useMotion();
  const intention = useRef<"play" | "pause" | null>(null);
  const paused = motion.stopped[id] || ended;
  const name = id === "showcase" ? "featured venues" : "venue cards";
  return (
    <button
      className="playback-control"
      data-playback-control
      aria-label={
        motion.reduced
          ? "Automatic motion disabled by your settings"
          : `${paused ? "Play" : "Pause"} ${name}`
      }
      aria-pressed={!paused && !motion.reduced}
      disabled={motion.reduced}
      title={motion.reduced ? "Reduced motion is enabled" : undefined}
      onPointerDown={(event) => {
        intention.current =
          (event.currentTarget.dataset.pointerIntent as "play" | "pause") ||
          (paused ? "play" : "pause");
      }}
      onKeyDown={() => {
        intention.current = null;
      }}
      onClick={(event) => {
        delete event.currentTarget.dataset.pointerIntent;
        const action = intention.current ?? (paused ? "play" : "pause");
        intention.current = null;
        if (action === "play") {
          if (ended) onRestart?.();
          motion.play(id);
        } else motion.stop(id);
      }}
    >
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="currentColor"
        aria-hidden="true"
      >
        {paused || motion.reduced ? (
          <path d="M8 5v14l11-7z" />
        ) : (
          <path d="M7 5h3v14H7zm7 0h3v14h-3z" />
        )}
      </svg>
    </button>
  );
}
export function FeaturedShowcase() {
  const root = useRef<HTMLElement>(null),
    slide = useRef<HTMLAnchorElement>(null),
    animations = useRef<Animation[]>([]),
    sequence = useRef(0),
    mode = useRef<"auto" | "manual" | null>(null),
    warmed = useRef(new Map<string, Promise<unknown>>());
  const motion = useMotion();
  const index = motion.indices.showcase;
  const venue = featured[index];
  const warm = useCallback((name: string) => {
    let ready = warmed.current.get(name);
    if (!ready) {
      const { props } = getImageProps({
        src: `/media/${name}.webp`,
        alt: "",
        fill: true,
        sizes: showcaseSizes,
      });
      const image = new window.Image();
      image.sizes = props.sizes || "";
      image.srcset = props.srcSet || "";
      image.src = props.src;
      ready = image.decode().catch(() => {});
      warmed.current.set(name, ready);
    }
    return ready;
  }, []);
  const cancel = useCallback(() => {
    sequence.current++;
    animations.current.forEach((a) => a.cancel());
    animations.current = [];
    mode.current = null;
  }, []);
  const show = useCallback(
    async (next: number, manual = false) => {
      cancel();
      if (next === index) return;
      const ticket = sequence.current;
      mode.current = manual ? "manual" : "auto";
      await warm(featured[next].photo);
      if (ticket !== sequence.current || !slide.current) return;
      const element = slide.current;
      const instant = motion.reduced || !element.animate;
      if (!instant) {
        const out = element.animate([{ opacity: 1 }, { opacity: 0 }], {
          duration: 300,
          easing: "ease",
          fill: "forwards",
        });
        animations.current = [out];
        try {
          await out.finished;
        } catch {
          return;
        }
        if (ticket !== sequence.current) return;
      }
      flushSync(() => motion.setIndex("showcase", next));
      animations.current.forEach((a) => a.cancel());
      animations.current = [];
      if (!instant) {
        const enter = element.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: 300,
          easing: "ease",
        });
        animations.current = [enter];
        try {
          await enter.finished;
        } catch {
          return;
        }
      }
      mode.current = null;
    },
    [cancel, index, motion, warm],
  );
  const carousel = useCarousel(
    "showcase",
    root,
    () => void show((index + 1) % featured.length),
  );
  useEffect(() => {
    if (carousel.playing)
      void warm(featured[(index + 1) % featured.length].photo);
    else if (mode.current === "auto") cancel();
    if (carousel.reduced || !carousel.visible) cancel();
  }, [
    carousel.playing,
    carousel.reduced,
    carousel.visible,
    index,
    warm,
    cancel,
  ]);
  useEffect(() => cancel, [cancel]);
  const stop = () => {
    cancel();
    carousel.stop();
  };
  const start = useRef<{ x: number; y: number; id: number } | null>(null),
    swiped = useRef(false);
  function pointerDown(e: PointerEvent<HTMLElement>) {
    rememberPlaybackIntent(e.target);
    stop();
    swiped.current = false;
    start.current = { x: e.clientX, y: e.clientY, id: e.pointerId };
  }
  function pointerUp(e: PointerEvent<HTMLElement>) {
    const p = start.current;
    start.current = null;
    if (!p || p.id !== e.pointerId) return;
    const x = e.clientX - p.x,
      y = e.clientY - p.y;
    if (Math.abs(x) > 44 && Math.abs(x) > Math.abs(y) * 1.4) {
      swiped.current = true;
      requestAnimationFrame(() => {
        swiped.current = false;
      });
      void show(
        (index + (x < 0 ? 1 : featured.length - 1)) % featured.length,
        true,
      );
    }
  }
  return (
    <section
      ref={root}
      className="home-feature featured-showcase"
      aria-label="Featured venues"
      aria-roledescription="carousel"
      data-playing={carousel.playing}
      data-slide={index}
      data-cycle={carousel.cycle}
      onKeyDown={(event) => {
        if (
          (event.key === "ArrowRight" || event.key === "ArrowLeft") &&
          !event.altKey &&
          !event.ctrlKey &&
          !event.metaKey
        ) {
          event.preventDefault();
          stop();
          void show(
            (index + (event.key === "ArrowRight" ? 1 : featured.length - 1)) %
              featured.length,
            true,
          );
        }
      }}
      onDragStart={(event) => event.preventDefault()}
      onPointerDownCapture={pointerDown}
      onPointerUpCapture={pointerUp}
      onPointerCancel={() => {
        start.current = null;
      }}
      onFocusCapture={stop}
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") {
          if (mode.current === "auto") cancel();
          motion.hover("showcase", true);
        }
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") motion.hover("showcase", false);
      }}
      onClickCapture={(e) => {
        if (swiped.current) {
          e.preventDefault();
          e.stopPropagation();
          swiped.current = false;
        }
      }}
    >
      <VenueLink
        ref={slide}
        slug={venue.slug}
        className="showcase-slide"
        aria-label={`Discover ${venue.name}`}
      >
        <span className="feature-photo">
          <Photo
            key={venue.photo}
            name={venue.photo}
            alt={venue.alt}
            priority={index === 0}
            sizes={showcaseSizes}
            position={venue.position}
          />
        </span>
        <span className="feature-caption">
          <span>
            <span className="showcase-caption">{venue.caption}</span>
            <h2>{venue.name}</h2>
          </span>
          <span className="round-link" aria-hidden="true">
            <Icon name="arrow" />
          </span>
        </span>
      </VenueLink>
      <div className="showcase-controls">
        <div
          className="slide-selectors"
          role="group"
          aria-label="Choose a featured venue"
        >
          {featured.map((p, i) => (
            <button
              key={p.slug}
              aria-label={`Show ${p.name}`}
              aria-current={index === i ? "true" : undefined}
              onClick={() => void show(i, true)}
            >
              <span
                aria-hidden="true"
                className={i === index ? "is-current" : ""}
              >
                <i
                  key={`${index}-${carousel.cycle}-${carousel.playing}`}
                  style={{
                    animationPlayState: carousel.playing ? "running" : "paused",
                  }}
                />
              </span>
            </button>
          ))}
        </div>
        <span
          className="slide-position"
          aria-live={carousel.paused ? "polite" : "off"}
        >
          {index + 1} of {featured.length}
        </span>
        <PlaybackControl id="showcase" />
      </div>
    </section>
  );
}
export function VenueRail({ children }: { children: ReactNode[] }) {
  const root = useRef<HTMLElement>(null),
    track = useRef<HTMLDivElement>(null);
  const motion = useMotion();
  const scrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null),
    sizes = useRef({ max: 0 });
  const [atEnd, setAtEnd] = useRailEnd(track);
  const [initialIndex] = useState(motion.indices.venues);
  useLayoutEffect(() => {
    const el = track.current;
    if (!el) return;
    const first = el.children[0] as HTMLElement | undefined;
    const target = el.children[initialIndex] as HTMLElement | undefined;
    if (first && target) el.scrollLeft = target.offsetLeft - first.offsetLeft;
  }, [initialIndex]);
  const move = useCallback(
    (direction: number, manual = false) => {
      const el = track.current;
      if (!el) return;
      const cards = Array.from(el.children) as HTMLElement[];
      const max = el.scrollWidth - el.clientWidth;
      const current = el.scrollLeft;
      const positions = cards.map((c) =>
        Math.min(max, c.offsetLeft - cards[0].offsetLeft),
      );
      const next =
        direction > 0
          ? positions.find((x) => x > current + 4)
          : positions.filter((x) => x < current - 4).at(-1);
      if (next === undefined) return;
      el.scrollTo({
        left: next,
        behavior: motion.reduced ? "instant" : "smooth",
      });
      if (manual) motion.stop("venues");
    },
    [motion],
  );
  const carousel = useCarousel("venues", root, () => move(1), !atEnd);
  useEffect(
    () => () => {
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
    },
    [],
  );
  const stop = () => {
    carousel.stop();
    const el = track.current;
    if (el) el.scrollTo({ left: el.scrollLeft, behavior: "instant" });
  };
  return (
    <section
      ref={root}
      className="discovery-section venue-rail"
      aria-roledescription="carousel"
      aria-label="Find your spot"
      data-playing={carousel.playing}
      data-ended={atEnd}
      onPointerDownCapture={(event) => {
        rememberPlaybackIntent(event.target);
        stop();
      }}
      onTouchStartCapture={stop}
      onFocusCapture={stop}
      onWheelCapture={stop}
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") motion.hover("venues", true);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") motion.hover("venues", false);
      }}
    >
      <div className="section-heading">
        <h2>Find your spot.</h2>
        <Link className="text-link" href="/explore">
          Explore all <Icon name="arrow" />
        </Link>
      </div>
      <div
        ref={track}
        className="home-venues"
        tabIndex={0}
        aria-label="Venue cards"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
            e.preventDefault();
            stop();
            move(e.key === "ArrowRight" ? 1 : -1, true);
          }
        }}
        onScroll={() => {
          const el = track.current;
          if (!el) return;
          if (scrollTimer.current) clearTimeout(scrollTimer.current);
          scrollTimer.current = setTimeout(() => {
            sizes.current.max = el.scrollWidth - el.clientWidth;
            setAtEnd(el.scrollLeft >= sizes.current.max - 3);
            const first = el.firstElementChild as HTMLElement | null;
            const step = first
              ? first.getBoundingClientRect().width +
                parseFloat(getComputedStyle(el).gap)
              : 1;
            motion.setIndex("venues", Math.round(el.scrollLeft / step));
          }, 100);
        }}
      >
        {children}
      </div>
      <div className="rail-controls">
        <p>Good places. Your pace.</p>
        <div>
          <button
            className="rail-arrow"
            aria-label="Previous venue card"
            disabled={motion.indices.venues === 0}
            onClick={() => move(-1, true)}
          >
            ←
          </button>
          <button
            className="rail-arrow"
            aria-label="Next venue card"
            disabled={atEnd}
            onClick={() => move(1, true)}
          >
            →
          </button>
          <PlaybackControl
            id="venues"
            ended={atEnd}
            onRestart={() => {
              track.current?.scrollTo({ left: 0, behavior: "instant" });
              setAtEnd(false);
              motion.setIndex("venues", 0);
            }}
          />
        </div>
      </div>
    </section>
  );
}
// Measure the real native rail, including orientation changes; no duplicated carousel clones.
function useRailEnd(track: React.RefObject<HTMLDivElement | null>) {
  const [atEnd, setAtEnd] = useState(false);
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const check = () =>
      setAtEnd(
        el.scrollWidth - el.clientWidth <= 3 ||
          el.scrollLeft >= el.scrollWidth - el.clientWidth - 3,
      );
    const observer = new ResizeObserver(check);
    observer.observe(el);
    return () => observer.disconnect();
  }, [track]);
  return [atEnd, setAtEnd] as const;
}
