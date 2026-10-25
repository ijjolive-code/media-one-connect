import type { Metadata } from "next";
import { DemoConcierge } from "./demo-concierge";
export const metadata: Metadata = { title: "Demo concierge" };
export default function ConciergePage() {
  return (
    <div className="conversation-page">
      <DemoConcierge />
    </div>
  );
}
