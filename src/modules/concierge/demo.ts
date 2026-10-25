import { hotel } from "../content/hotel";

/** A scripted demonstration, not a model adapter or a live concierge. */
export const demoQuestions = [
  { id: "arrival", label: "What time is check-in?", answer: `In our fictional example, check-in is ${hotel.facts[0].value.toLowerCase()}. This is sample content, not Media One Hotel's confirmed policy.` },
  { id: "discover", label: "What can I explore?", answer: "This demo includes an imagined room, dining experience and relaxation space. Open Hotel information to explore the fictional examples. Current facilities and opening hours have not been verified." },
  { id: "booking", label: "Can you book a room?", answer: "No. Booking is not connected in this demonstration. I have not checked availability, held a room or made a reservation." },
  { id: "staff", label: "Can I speak to the team?", answer: "Staff handover is planned, but this demonstration cannot contact the hotel or create a request. No message has been sent to staff." },
] as const;
