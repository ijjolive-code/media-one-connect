import type { Metadata } from "next";
import { DemoConcierge } from "./demo-concierge";
import { providerState } from "@/modules/concierge/service";
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Concierge" };
export default function ConciergePage() {
  return (
    <div className="conversation-page">
      <DemoConcierge configuration={providerState()} />
    </div>
  );
}
