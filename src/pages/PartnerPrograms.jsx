import React from "react";
import { Link } from "react-router-dom";
import { Handshake, Building2, Globe, Percent, ArrowRight, CheckCircle2, Users, Briefcase, Plane } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Image } from "@/components/ui/image";

const PROGRAMS = [
  {
    icon: Briefcase,
    title: "Travel Agency Partnership",
    desc: "For travel agencies looking to offer visa services to their clients without building an in-house visa department.",
    benefits: ["Commission on every referred visa application", "White-label document checklists", "Dedicated partner portal access", "Priority processing for your clients", "Marketing materials and co-branding"],
    img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80",
  },
  {
    icon: Building2,
    title: "Corporate Partnership",
    desc: "For companies with employees who need regular visa, work permit, or residency services.",
    benefits: ["Volume-based pricing tiers", "Dedicated account manager", "Employee bulk processing", "Monthly invoicing and reporting", "Priority express processing"],
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
  },
  {
    icon: Globe,
    title: "Referral Affiliate Program",
    desc: "For influencers, bloggers, and content creators in the travel and immigration space.",
    benefits: ["Up to 15% commission per referral", "Custom tracking links", "Real-time dashboard", "Monthly payouts", "Promotional assets provided"],
    img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
  },
];

const STEPS = [
  { num: "1", title: "Apply", text: "Submit your partnership application through our contact form." },
  { num: "2", title: "Review", text: "Our team reviews your application within 48 hours." },
  { num: "3", title: "Onboard", text: "Sign the partnership agreement and get portal access." },
  { num: "4", title: "Earn", text: "Start referring clients and earning commission immediately." },
];

export default function PartnerPrograms() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <section className="relative bg-navy py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80" alt="Partnership" fittingType="fill" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green/15 border border-green/30 text-green text-xs font-700 uppercase tracking-wider mb-5">
            <Handshake className="w-3.5 h-3.5" /> Partnership Programs
          </span>
          <h1 className="font-display font-700 text-white" style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)" }}>Grow Your Business With Trek Visa</h1>
          <p className="text-white/60 mt-4 max-w-2xl mx-auto">Partner with the leading visa and immigration platform. Earn commission, access premium tools, and deliver exceptional service to your clients.</p>
          <Link to="/contact" className="mt-7 inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-white bg-green hover:bg-green-hover transition">
            Become a Partner <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14 flex-1 w-full">
        <div className="space-y-8">
          {PROGRAMS.map((p, i) => (
            <div key={i} className={`grid lg:grid-cols-2 gap-8 items-center bg-white rounded-2xl border border-border overflow-hidden ${i % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}>
              <div className={`p-8 lg:p-10 ${i % 2 === 1 ? "lg:col-start-2" : ""}`}>
                <div className="w-12 h-12 rounded-full bg-green/10 flex items-center justify-center mb-5"><p.icon className="w-6 h-6 text-green" /></div>
                <h2 className="font-display font-700 text-navy text-xl">{p.title}</h2>
                <p className="text-muted-foreground text-sm mt-3">{p.desc}</p>
                <ul className="mt-5 space-y-2.5">
                  {p.benefits.map((b, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm text-navy">
                      <CheckCircle2 className="w-4 h-4 text-green shrink-0 mt-0.5" /> {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`relative aspect-[16/10] ${i % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                <Image src={p.img} alt={p.title} fittingType="fill" className="absolute inset-0 w-full h-full object-cover" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-navy py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-display font-700 text-white text-2xl">How to Get Started</h2>
            <p className="text-white/60 text-sm mt-3">Four simple steps to start earning with Trek Visa.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((s) => (
              <div key={s.num} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                <div className="w-10 h-10 rounded-full bg-green text-white font-700 flex items-center justify-center mx-auto mb-4">{s.num}</div>
                <h3 className="font-600 text-white text-sm">{s.title}</h3>
                <p className="text-white/50 text-xs mt-2">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}