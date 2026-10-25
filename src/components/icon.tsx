import type { CSSProperties } from "react";
const paths = {
  stay: "M3 20V8m18 12V8M3 17h18M3 12h18v5M5 12V8h6v4m2 0V8h6v4",
  request: "M5 3h14v18H5V3Zm4 5h6m-6 4h6m-6 4h4",
  member: "M3 5h18v14H3V5Zm4 5h3m-3 4h7m3-4h1",
  arrow: "M5 12h14m-6-6 6 6-6 6",
  home: "m3 10 9-7 9 7v10H3V10Zm6 10v-7h6v7",
  hotel: "M5 21V3h14v18M3 21h18M9 7h1m4 0h1M9 11h1m4 0h1M10 21v-5h4v5",
  chat: "M21 11a9 9 0 0 1-9 9H4l-2 2v-9a9 9 0 1 1 19-2ZM7 10h10M7 14h6",
  compass: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM16 8l-3 5-5 3 3-5 5-3Z",
  staff: "M20 21v-3a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v3M16 6a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z",
  spark: "m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z",
  clock: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM12 7v5l3 2",
  grid: "M3 3h7v7H3V3Zm11 0h7v7h-7V3ZM3 14h7v7H3v-7Zm11 0h7v7h-7v-7Z",
};
export function Icon({ name, style }: { name: keyof typeof paths; style?: CSSProperties }) {
  return <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={style}><path d={paths[name]} /></svg>;
}
