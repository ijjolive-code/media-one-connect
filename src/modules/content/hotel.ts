/** Fictional fixtures, shared by guest views and the scripted demo. No live hotel records. */
export const hotel = {
  id: "media-one-hotel",
  name: "Media One Hotel",
  contentStatus: "Fictional demonstration data",
  welcome: "A little less ordinary. A little more you.",
  summary: "A fictional city stay built around slow mornings, good conversations and a place to make your own. Explore this sample hotel experience before the real details arrive.",
  facts: [
    { label: "Arrival", value: "From 3:00 pm", note: "Fictional check-in time" },
    { label: "Departure", value: "By 12:00 noon", note: "Fictional check-out time" },
    { label: "Connection", value: "Sample guest Wi-Fi", note: "No network or password provided" },
    { label: "Local time", value: "Asia/Dubai", note: "Timezone used by the pilot" },
  ],
  spaces: [
    { title: "Space to settle in", category: "STAY", description: "An imagined city room, a quiet corner and a slower start. Room types and availability are not connected.", tone: "rose" },
    { title: "Meet over a good meal", category: "TASTE", description: "A sample dining experience for the prototype. Menus, opening hours and reservations are not available.", tone: "sage" },
    { title: "Find your off switch", category: "UNWIND", description: "A fictional place to take a break between plans. Facilities and access conditions are unverified.", tone: "lavender" },
  ],
} as const;
