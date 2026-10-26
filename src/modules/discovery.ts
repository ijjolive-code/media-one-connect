// Presentation identities/crops come from design-handoff/asset-inventory.json.
// Descriptions, times, prices and policies come from eligible managed knowledge.
export const places = [
  {
    slug: "ciao-bella",
    name: "Ciao Bella",
    photo: "ciao-bella-interior",
    gallery: "ciao-bella-night",
    profile: "K049",
    tone: "Italian",
    position: "50% 50%",
  },
  {
    slug: "qwerty",
    name: "Qwerty",
    photo: "qwerty-day",
    gallery: "qwerty-night",
    profile: "K056",
    tone: "Restaurant & bar",
    position: "50% 50%",
  },
  {
    slug: "garden-on-8",
    name: "garden on 8",
    photo: "garden-lifestyle",
    gallery: "garden-terrace-day",
    profile: "K067",
    tone: "Rooftop",
    position: "50% 42%",
  },
  {
    slug: "coco-lounge",
    name: "Coco Lounge",
    photo: "coco-terrace-day",
    gallery: "coco-poolside-day",
    profile: "K079",
    tone: "Poolside",
    position: "50% 50%",
  },
  {
    slug: "m12go",
    name: "M12go",
    photo: null,
    gallery: null,
    profile: "K091",
    tone: "Discover",
    position: "50% 50%",
  },
] as const;
export type Place = (typeof places)[number];
