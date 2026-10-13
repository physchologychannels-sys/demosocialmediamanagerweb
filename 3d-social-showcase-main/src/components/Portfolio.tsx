import { lazy, Suspense, useState, type FormEvent, Component, type ReactNode } from "react";
import { ArrowUpRight, ArrowRight, ArrowDown, Instagram, Linkedin, Heart, MessageCircle, Sparkles, Menu, Target, Camera, Users, ChartNoAxesCombined, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { submitDemoInquiry } from "@/lib/demo-inquiry";
import portrait from "@/assets/alex-portrait.jpg";
import skincare from "@/assets/campaign-skincare.jpg";
import matcha from "@/assets/campaign-matcha.jpg";
import fashion from "@/assets/campaign-fashion.jpg";

const SocialScene = lazy(() => import("./SocialScene"));
const campaigns = [
  { name: "Bloom Skincare", category: "Brand storytelling · Instagram", image: skincare, metric: "+148%", result: "engagement", description: "A fresh perspective on everyday skincare.", goal: "Give a fictional skincare launch a distinctive voice and build a community around intentional self-care.", approach: "A visual refresh, ingredient-led carousel stories, and a four-week content calendar paired with conversational community replies.", outcome: "Illustrative result: 148% more engagement compared with the previous sample campaign period.", deliverables: "Content strategy / Art direction / Carousel design" },
  { name: "The Matcha Club", category: "Community building · Instagram & TikTok", image: matcha, metric: "32K", result: "organic reach", description: "Turning a daily ritual into a shared experience.", goal: "Introduce a fictional neighborhood cafe to a wider audience through authentic, shareable moments.", approach: "Behind-the-scenes short videos, a recurring matcha ritual series, and creator-style content built around the cafe's community.", outcome: "Illustrative result: 32,000 accounts reached organically during a sample month.", deliverables: "Short-form video / Community strategy / Content calendar" },
  { name: "Studio Form", category: "Campaign creative · Social launch", image: fashion, metric: "+86%", result: "profile visits", description: "An independent label. A confident new chapter.", goal: "Develop a social-first launch story for a fictional contemporary fashion collection.", approach: "An editorial campaign translated into reels, story sequences, and a cohesive grid, with a clear journey from discovery to profile visit.", outcome: "Illustrative result: 86% more profile visits during a sample launch period.", deliverables: "Campaign concept / Social design / Performance reporting" },
];

const services = [
  { name: "Social media strategy", description: "A clear direction, the right platforms, and a plan that connects your brand with your people.", icon: Target },
  { name: "Content that connects", description: "Scroll-stopping visuals, short-form video, and captions that sound like you—not everyone else.", icon: Camera },
  { name: "Community management", description: "Real conversations, thoughtful responses, and a community that feels seen and heard.", icon: Users },
  { name: "Insights & reporting", description: "Meaningful numbers, clear takeaways, and smarter decisions for what comes next.", icon: ChartNoAxesCombined },
];
const navItems = [{ label: "Work", id: "work" }, { label: "Services", id: "services" }, { label: "About", id: "about" }];

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[] | undefined>>({});
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const result = submitDemoInquiry(Object.fromEntries(data));
    if (!result.success) { setErrors(result.errors); return; }
    setErrors({}); setSubmitted(true);
  }
  if (submitted) return <div role="status" className="flex flex-col items-start justify-center gap-5 py-8"><CheckCircle2 size={40} className="text-primary" /><h3 className="font-display text-3xl">Thanks for saying hello!</h3><p className="text-sm leading-7 text-hero-muted">Your demo inquiry is complete. This is a sample portfolio, so no message was sent or saved.</p><Button variant="hero" onClick={() => setSubmitted(false)}>Try another inquiry <ArrowRight /></Button></div>;
  return <form className="contact-form" onSubmit={handleSubmit} noValidate>
    <div className="form-pair">
      <div><label htmlFor="name">Your name</label><input id="name" name="name" autoComplete="name" placeholder="Alex, Jamie, you…" aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />{errors.name && <p id="name-error" className="mt-2 text-xs text-primary">{errors.name[0]}</p>}</div>
      <div><label htmlFor="email">Email address</label><input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />{errors.email && <p id="email-error" className="mt-2 text-xs text-primary">{errors.email[0]}</p>}</div>
    </div>
    <label htmlFor="message">What are you dreaming up?</label><textarea id="message" name="message" placeholder="Tell me a little about your brand and what you have in mind…" aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} />{errors.message && <p id="message-error" className="mt-2 text-xs text-primary">{errors.message[0]}</p>}
    <div className="form-footer"><Button variant="hero" type="submit">Send inquiry <ArrowUpRight /></Button><span className="form-note">Demo only. No message is sent.</span></div>
  </form>;
}

export function Portfolio() {
  const [campaignIndex, setCampaignIndex] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const campaign = campaignIndex === null ? null : campaigns[campaignIndex];
  return <>
    <header className="site-header"><div className="site-container header-inner">
      <a href="#top" className="wordmark" aria-label="Alex Morgan home">alex<span>.</span></a>
      <nav aria-label="Main navigation" className="desktop-nav">{navItems.map(item => <a key={item.id} href={`#${item.id}`}>{item.label}</a>)}<Button asChild variant="nav" className="nav-cta"><a href="#contact">Let’s talk <ArrowUpRight size={15} /></a></Button></nav>
      <Button className="mobile-menu-trigger" variant="nav" size="icon" aria-label="Open navigation" onClick={() => setMenuOpen(true)}><Menu /></Button>
    </div></header>
    <main id="top">
      <section className="hero-section" aria-labelledby="intro-title"><div className="site-container">
        <div className="hero-main">
          <div className="hero-copy"><div className="availability"><span className="availability-dot" />Open to good ideas & great collaborations</div>
            <h1 id="intro-title">Alex Morgan<span className="text-primary">.</span></h1>
            <p className="hero-role">Social media manager<br />& your brand’s next chapter.</p>
            <p className="hero-description">A little strategy. A lot of creativity.<br />I turn brands into conversations people<br className="hidden lg:block" /> actually want to be part of.</p>
            <div className="hero-actions"><Button asChild variant="hero"><a href="#work">View my work <ArrowUpRight /></a></Button><Button asChild variant="heroLink"><a href="#contact">Let’s talk <ArrowRight /></a></Button></div>
          </div>
          <div className={`portrait-stage ${sceneReady ? "scene-ready" : ""}`}>
            <div className="portrait-outline" /><div className="portrait-frame"><img src={portrait} alt="Alex Morgan, a fictional social media manager" width={1024} height={1280} fetchPriority="high" /></div>
            <div className="static-fallback" aria-hidden="true"><Heart className="static-heart" size={70} fill="currentColor" /><MessageCircle className="static-message" size={80} fill="currentColor" /></div>
            <div className="social-scene"><SceneBoundary><Suspense fallback={null}><SocialScene onReady={() => setSceneReady(true)} /></Suspense></SceneBoundary></div>
            <div className="portrait-caption"><Sparkles size={16} /><span>Strategic mind. Creative soul.</span></div>
          </div>
        </div>
        <div className="hero-bottom"><div className="platforms"><span className="platform"><Instagram size={14} />Instagram</span><span className="platform"><svg width="13" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M15 2h3c.4 2.5 1.8 4 4 4.5v3a9 9 0 0 1-4-1v8a6.5 6.5 0 1 1-6.5-6.5H13v3h-1.5a3.5 3.5 0 1 0 3.5 3.5z" /></svg>TikTok</span><span className="platform"><Linkedin size={14} />LinkedIn</span></div><span className="demo-label">Independent creative · Demo portfolio</span><a href="#work" aria-label="Scroll to selected work" className="hidden items-center gap-3 md:flex">A little scroll, a lot to discover <ArrowDown size={14} /></a></div>
      </div></section>
      <div className="skills-band"><div className="site-container skills-inner"><span>Strategy with intention</span><Sparkles size={20} /><span>Content with personality</span><Sparkles size={20} /><span>Community over numbers</span><Sparkles size={20} /><span>Creativity, always</span></div></div>
      <section id="work" className="section"><div className="site-container"><div className="section-heading"><div><p className="eyebrow">A peek at the possibilities</p><h2>Good stories. <span className="text-muted-foreground">Great social.</span></h2></div><p className="section-intro">A few concept projects where thoughtful strategy meets a fresh creative perspective.</p></div>
        <div className="work-grid">{campaigns.map((item, index) => <article key={item.name} className="work-item"><div className="work-image"><img src={item.image} alt={`${item.name} sample campaign photography`} width={1024} height={1024} loading="lazy" /><span className="work-number">CONCEPT 0{index + 1}</span></div><div className="work-details"><div><h3>{item.name}</h3><p className="work-category">{item.category}</p></div><Button variant="outline" size="icon" className="rounded-full" aria-label={`View ${item.name} campaign`} title={`View ${item.name} campaign`} onClick={() => setCampaignIndex(index)}><ArrowUpRight /></Button></div><p className="result"><strong>{item.metric}</strong> {item.result} <span className="text-[10px]">· Sample result</span></p></article>)}</div><p className="sample-note">All projects are fictional concepts. Results are illustrative, not verified client outcomes.</p>
      </div></section>
      <section id="services" className="section services-section"><div className="site-container services-layout"><div className="services-copy"><p className="eyebrow">What I bring to the table</p><h2>Your brand.<br />A little louder.<br /><span className="text-muted-foreground">A lot more you.</span></h2><p>From the first big idea to the smallest caption, I help brands show up with purpose—and a personality.</p><Button asChild variant="default" className="rounded-full px-6 h-11 shadow-none"><a href="#contact">Let’s make something good <ArrowUpRight /></a></Button></div><div>{services.map((service,index) => <div className="service-row" key={service.name}><span className="service-index">0{index + 1}</span><div><h3>{service.name}</h3><p>{service.description}</p></div><service.icon size={22} /></div>)}</div></div></section>
      <section id="about" className="section"><div className="site-container about-layout"><img src={portrait} width={1024} height={1280} loading="lazy" className="about-image" alt="Demo portrait of Alex Morgan" /><div className="about-copy"><p className="eyebrow">The person behind the posts</p><h2>Equal parts<br />creative & curious.</h2><p>Hi, I’m Alex. A social media manager with a soft spot for good storytelling, thoughtful design, and brands that have something to say.</p><p>I believe the best social media doesn’t just fill a feed. It starts a conversation, builds a connection, and makes someone feel something.</p><p className="text-xs">A fictional creative, brought to life for this demo portfolio.</p><span className="about-signature">Alex Morgan ↗</span></div></div></section>
      <section id="contact" className="section contact-section"><div className="site-container contact-layout"><div className="contact-copy"><p className="eyebrow">Something good starts here</p><h2>Let’s give your<br />brand a <span className="text-primary">voice.</span></h2><p>A fresh idea, a new launch, or a social presence that needs a little love. I’d love to hear what you’re imagining.</p></div><ContactForm /></div></section>
    </main>
    <footer className="site-footer"><div className="site-container footer-inner"><a href="#top" className="footer-name">Alex Morgan<span className="text-primary">.</span></a><span>© 2026 Alex Morgan · Fictional demo portfolio</span><a href="#top" className="flex items-center gap-2">Back to top <ArrowUpRight size={13} /></a></div></footer>
    <Dialog open={campaignIndex !== null} onOpenChange={open => { if (!open) setCampaignIndex(null); }}><DialogContent className="max-w-2xl max-h-[88vh] overflow-y-auto p-6 sm:p-8">{campaign && <><DialogHeader><DialogTitle className="font-display text-3xl">{campaign.name}</DialogTitle><DialogDescription>{campaign.description}</DialogDescription></DialogHeader><img src={campaign.image} alt={`${campaign.name} concept`} width={1024} height={1024} className="aspect-[2/1] w-full rounded-md object-cover" /><span className="text-xs text-muted-foreground">Fictional concept · {campaign.deliverables}</span><div className="space-y-5">{[{ title:"The goal", text:campaign.goal },{title:"The approach",text:campaign.approach},{title:"Sample outcome",text:campaign.outcome}].map(block => <div key={block.title}><h3 className="font-display text-lg">{block.title}</h3><p className="mt-1 text-sm leading-6 text-muted-foreground">{block.text}</p></div>)}</div><Button asChild onClick={() => setCampaignIndex(null)} className="mt-2"><a href="#contact">Imagine this for your brand <ArrowUpRight /></a></Button></>}</DialogContent></Dialog>
    <Sheet open={menuOpen} onOpenChange={setMenuOpen}><SheetContent className="bg-hero text-hero-foreground border-secondary"><SheetHeader><SheetTitle className="font-display text-hero-foreground text-2xl">Alex Morgan<span className="text-primary">.</span></SheetTitle></SheetHeader><nav aria-label="Mobile navigation" className="flex flex-col gap-7 px-6 py-10 text-2xl font-display">{[...navItems,{label:"Let’s talk",id:"contact"}].map(item => <a key={item.id} href={`#${item.id}`} onClick={() => setMenuOpen(false)} className="flex items-center justify-between">{item.label}<ArrowUpRight size={22} /></a>)}</nav><p className="px-6 text-xs text-hero-muted">Independent creative · Demo portfolio</p></SheetContent></Sheet>
  </>;
}