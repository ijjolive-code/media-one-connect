import Link from "next/link";
import { Icon } from "@/components/icon";
import { hotel } from "@/modules/content/hotel";

export default function Home() {
  return <div className="page-wrap">
    <div className="page-kicker"><span>YOUR STAY, CONNECTED</span><span className="small-label">MEDIA ONE HOTEL · FIRST PILOT</span></div>
    <section className="hero">
      <div className="hero-copy"><span className="eyebrow light">WELCOME TO YOUR NEXT CHAPTER</span><h1>A little less ordinary.<br />A little more <em>you.</em></h1><p>One place to explore your stay, find a little inspiration and try a different kind of welcome.</p><div className="button-row"><Link className="button lime" href="/hotel">Explore the hotel <Icon name="arrow" /></Link><Link className="text-link light-link" href="/concierge">Try the demo concierge <Icon name="arrow" style={{ transform: "rotate(-45deg)" }} /></Link></div><span className="hero-footnote">An early concept, made with fictional hotel information.</span></div>
      <div className="hero-art" aria-hidden="true"><div className="sun" /><div className="arch arch-back" /><div className="arch arch-front"><div className="window-grid" /></div><div className="art-orbit" /><div className="art-number">01<span>A NEW PERSPECTIVE</span></div><span className="art-caption">CONCEPT ILLUSTRATION · NOT HOTEL PHOTOGRAPHY</span></div>
    </section>
    <section className="quick-links" aria-label="Explore the demonstration">
      <Link href="/hotel"><span className="icon-tile"><Icon name="hotel" /></span><span><strong>Make yourself at home</strong><small>Explore fictional hotel information</small></span><Icon name="arrow" /></Link>
      <Link href="/concierge"><span className="icon-tile lilac"><Icon name="chat" /></span><span><strong>A little help, on screen</strong><small>Try a scripted concierge conversation</small></span><Icon name="arrow" /></Link>
      <Link href="/explore"><span className="icon-tile pale"><Icon name="compass" /></span><span><strong>See what’s taking shape</strong><small>Discover the planned platform modules</small></span><Icon name="arrow" /></Link>
    </section>
    <section className="section-block"><div className="section-heading"><div><span className="eyebrow">A TASTE OF THE EXPERIENCE</span><h2>Find your kind of stay.</h2></div><span className="status-tag">Fictional examples</span></div><div className="space-grid">{hotel.spaces.map((space, index) => <article className={`space-card ${space.tone}`} key={space.category}><div className="space-top"><span>{space.category}</span><span>0{index+1}</span></div><div className="space-symbol" aria-hidden="true">{["◒", "◌", "≈"][index]}</div><h3>{space.title}</h3><p>{space.description}</p><Link href="/hotel">Explore sample information <Icon name="arrow" style={{ transform: "rotate(-45deg)", width: 15, height: 15 }} /></Link></article>)}</div></section>
    <aside className="concierge-strip"><span className="strip-icon"><Icon name="spark" /></span><div><span className="eyebrow">CURIOUS? START A CONVERSATION.</span><h2>Meet your demonstration concierge.</h2><p>Choose a question. See a sample reply. No AI or hotel connection yet.</p></div><Link className="button dark" href="/concierge">Let’s try it <Icon name="arrow" /></Link></aside>
  </div>;
}
