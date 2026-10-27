"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  startTransition,
  type ReactNode,
  type RefObject,
} from "react";
import { usePathname } from "next/navigation";
export type CarouselId = "showcase" | "venues";
const motionQuery = "(prefers-reduced-motion: reduce)";
type Entry = { advance: () => void; available: boolean };
type MotionContextType = {
  owner: CarouselId | null;
  reduced: boolean;
  visible: boolean;
  stopped: Record<CarouselId, boolean>;
  indices: Record<CarouselId, number>;
  setIndex: (id: CarouselId, index: number) => void;
  stop: (id: CarouselId) => void;
  play: (id: CarouselId) => void;
  hover: (id: CarouselId, value: boolean) => void;
  register: (
    id: CarouselId,
    element: HTMLElement,
    advance: () => void,
  ) => () => void;
  availability: (id: CarouselId, value: boolean) => void;
  selectedPhoto: { slug: string; name: string } | null;
  selectPhoto: (slug: string, name: string) => void;
  cycle: number;
  markHomeSeen: () => boolean;
};
const MotionContext = createContext<MotionContextType | null>(null);
export function MotionProvider({ children }: { children: ReactNode }) {
  const path = usePathname();
  const [{ reduced, visible }, setEnvironment] = useState({
    reduced: true,
    visible: false,
  });
  const [stopped, setStopped] = useState({ showcase: false, venues: false }),
    [hovered, setHovered] = useState({ showcase: false, venues: false }),
    [scores, setScores] = useState({ showcase: 0, venues: 0 }),
    [available, setAvailable] = useState({ showcase: true, venues: true }),
    [indices, setIndices] = useState({ showcase: 0, venues: 0 }),
    [cycle, setCycle] = useState(0),
    [modal, setModal] = useState(false),
    [selectedPhoto, setSelectedPhoto] = useState<{
      slug: string;
      name: string;
    } | null>(null);
  useEffect(() => {
    const query = window.matchMedia(motionQuery);
    // A concurrent startup update lets streamed server content hydrate before context changes.
    const update = () =>
      startTransition(() => {
        setEnvironment({ reduced: query.matches, visible: !document.hidden });
        setCycle((c) => c + 1);
      });
    const frame = requestAnimationFrame(update);
    query.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    return () => {
      cancelAnimationFrame(frame);
      query.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);
  const entranceSeen = useRef(false);
  const markHomeSeen = useCallback(() => {
    const seen = entranceSeen.current;
    entranceSeen.current = true;
    return seen;
  }, []);
  const entries = useRef(new Map<CarouselId, Entry>()),
    timer = useRef<ReturnType<typeof setTimeout> | null>(null),
    timerFor = useRef<CarouselId | null>(null),
    blocked = useRef(new Set<CarouselId>());
  const clear = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    timerFor.current = null;
  }, []);
  const stop = useCallback(
    (id: CarouselId) => {
      blocked.current.add(id);
      if (timerFor.current === id) clear();
      setStopped((p) => (p[id] ? p : { ...p, [id]: true }));
    },
    [clear],
  );
  const play = useCallback((id: CarouselId) => {
    blocked.current.delete(id);
    setStopped((p) => ({ ...p, [id]: false }));
    setCycle((c) => c + 1);
  }, []);
  const hover = useCallback(
    (id: CarouselId, value: boolean) => {
      if (value && timerFor.current === id) clear();
      setHovered((p) => (p[id] === value ? p : { ...p, [id]: value }));
    },
    [clear],
  );
  const availability = useCallback((id: CarouselId, value: boolean) => {
    const e = entries.current.get(id);
    if (e) e.available = value;
    setAvailable((p) => (p[id] === value ? p : { ...p, [id]: value }));
  }, []);
  const register = useCallback(
    (id: CarouselId, element: HTMLElement, advance: () => void) => {
      entries.current.set(id, { advance, available: true });
      const observer = new IntersectionObserver(
        (changes) => {
          const ratio = changes[0]?.intersectionRatio || 0;
          setScores((p) => (p[id] === ratio ? p : { ...p, [id]: ratio }));
        },
        {
          root: document.querySelector("main"),
          threshold: [0, 0.25, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        },
      );
      observer.observe(element);
      return () => {
        observer.disconnect();
        entries.current.delete(id);
        if (timerFor.current === id) clear();
        setScores((p) => ({ ...p, [id]: 0 }));
      };
    },
    [clear],
  );
  useEffect(() => {
    const update = () => {
      clear();
      setModal(!!document.querySelector("dialog[open]"));
      setCycle((c) => c + 1);
    };
    const observer = new MutationObserver(update);
    observer.observe(document.body, {
      subtree: true,
      attributes: true,
      attributeFilter: ["open"],
    });
    return () => observer.disconnect();
  }, [clear]);
  const owner = useMemo(() => {
    if (path !== "/" || reduced || !visible || modal) return null;
    const candidates = (["showcase", "venues"] as const).filter(
      (id) =>
        scores[id] >= 0.6 && !stopped[id] && !hovered[id] && available[id],
    );
    candidates.sort(
      (a, b) => scores[b] - scores[a] || (a === "showcase" ? -1 : 1),
    );
    const first = candidates[0] ?? null;
    return first;
  }, [path, reduced, visible, modal, scores, stopped, hovered, available]);
  useEffect(() => {
    clear();
    if (owner) {
      timerFor.current = owner;
      timer.current = setTimeout(
        () => {
          if (
            window.location.pathname !== "/" ||
            document.hidden ||
            blocked.current.has(owner) ||
            window.matchMedia(motionQuery).matches ||
            document.querySelector("dialog[open]")
          )
            return;
          const entry = entries.current.get(owner);
          if (entry?.available) {
            entry.advance();
            setCycle((c) => c + 1);
          }
        },
        owner === "showcase" ? 6000 : 7000,
      );
    }
    return clear;
  }, [owner, cycle, clear, stopped, hovered]);
  const setIndex = useCallback(
    (id: CarouselId, index: number) =>
      setIndices((p) => (p[id] === index ? p : { ...p, [id]: index })),
    [],
  );
  const selectPhoto = useCallback(
    (slug: string, name: string) => setSelectedPhoto({ slug, name }),
    [],
  );
  const value = {
    owner,
    reduced,
    visible,
    stopped,
    indices,
    setIndex,
    stop,
    play,
    hover,
    register,
    availability,
    selectedPhoto,
    selectPhoto,
    cycle,
    markHomeSeen,
  };
  return (
    <MotionContext.Provider value={value}>{children}</MotionContext.Provider>
  );
}
export function useMotion() {
  const context = useContext(MotionContext);
  if (!context) throw Error("MotionProvider is required");
  return context;
}
export function useCarousel(
  id: CarouselId,
  element: RefObject<HTMLElement | null>,
  advance: () => void,
  available = true,
) {
  const motion = useMotion();
  const action = useRef(advance);
  useEffect(() => {
    action.current = advance;
  }, [advance]);
  const { register, availability } = motion;
  useEffect(() => {
    if (!element.current) return;
    return register(id, element.current, () => action.current());
  }, [register, id, element]);
  useEffect(() => {
    availability(id, available);
  }, [availability, id, available]);
  return {
    ...motion,
    playing: motion.owner === id,
    paused: motion.stopped[id],
    index: motion.indices[id],
    stop: () => motion.stop(id),
    play: () => motion.play(id),
  };
}
