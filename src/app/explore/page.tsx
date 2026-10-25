import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icon";
export const metadata: Metadata = { title: "Explore" };
const modules = [
  { title: "Guest requests", detail: "A shared request queue, assignment and truthful progress updates.", milestone: "M2" },
  { title: "WhatsApp & handover", detail: "A separate test number, conversation context and explicit staff ownership.", milestone: "M3" },
  { title: "Membership & benefits", detail: "Verified membership and one controlled, audited test benefit.", milestone: "M4" },
  { title: "Booking journeys", detail: "Approved room and dining links, with clear booking handoff.", milestone: "M5" },
  { title: "Feedback & reviews", detail: "Direct public review routes and optional private feedback.", milestone: "M5" },
];
export default function Explore() {
  return <div className="page-wrap inner-page"><span className="eyebrow">AROUND THE HOTEL</span><h1>Explore your hotel</h1><p className="page-intro">Find the fictional hotel guide and see what’s planned for dining, bookings and the rest of your stay.</p><div className="working-panel"><span className="status-tag">Working in M0</span><h2>Start with the hotel guide.</h2><div className="button-row"><Link className="text-link" href="/hotel">Fictional hotel information <Icon name="arrow" /></Link><Link className="text-link" href="/concierge">Scripted concierge demo <Icon name="arrow" /></Link></div></div><section className="section-block"><div className="section-heading"><h2>Planned modules.</h2><span className="small-label">PLACEHOLDERS · NOT AVAILABLE</span></div><div className="module-grid">{modules.map(module => <article className="module-card" key={module.title}><div className="space-top"><Icon name="grid" /><span className="status-tag">Planned · {module.milestone}</span></div><h3>{module.title}</h3><p>{module.detail}</p><span className="planned-label">Not connected in this demo</span></article>)}</div></section></div>;
}
