"use client";
import { useEffect, useRef } from "react";
export function KnowledgePicker({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const media = window.matchMedia("(min-width:701px)");
    const change = () => {
      if (ref.current) ref.current.open = media.matches;
    };
    change();
    media.addEventListener("change", change);
    return () => media.removeEventListener("change", change);
  }, []);
  return (
    <details ref={ref} className="knowledge-picker" open>
      <summary>Choose a knowledge record</summary>
      {children}
    </details>
  );
}
