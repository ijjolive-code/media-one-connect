import type { Metadata } from "next";
import { DemoConcierge } from "./demo-concierge";
export const metadata: Metadata = { title: "Demo concierge" };
export default function ConciergePage() {
  return <div className="page-wrap inner-page"><span className="eyebrow">A LITTLE HELP ALONG THE WAY</span><h1>Hello, curious traveller.</h1><p className="page-intro">Take a first look at a connected concierge experience. Choose one of the sample questions to try it.</p><DemoConcierge /></div>;
}
