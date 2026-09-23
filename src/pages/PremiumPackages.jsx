import React from "react";
import { Link } from "react-router-dom";
import { Crown, Diamond, Star, CheckCircle2, ArrowRight, Plane, Shield, Zap } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Image } from "@/components/ui/image";
import { useCurrency } from "@/lib/CurrencyContext";
import { formatPrice } from "@/lib/currencies";

const PACKAGES = [
  {
    icon: Star,
    tier: "Standard",
    name: "Essential Mobility",
    price: 4999,
    desc: "Comprehensive nationality application support for individuals seeking a second passport.",
    features: ["Initial eligibility assessment", "Document preparation & review", "Embassy submission coordination", "Regular status updates", "Email & chat support", "Standard processing priority"],
    img: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=800&q=80",
    popular: false,
  },
  {
    icon: Crown,
    tier: "Premium",
    name: "Premium Mobility",
    price: 14999,
    desc: "Enhanced service with dedicated support and expedited processing for discerning clients.",
    features: ["Everything in Essential", "Dedicated case officer", "Expedited processing priority", "Document translation included", "Embassy interview preparation", "Phone, email & WhatsApp support", "Quarterly progress reviews"],
    img: "https://images.unsplash.com/photo-1543465077-db45d34b88ac?w=800&q=80",
    popular: true,
  },
  {
    icon: Diamond,
    tier: "VIP",
    name: "VIP Concierge",
    price: 49999,
    desc: "White-glove, end-to-end concierge service for high-net-worth individuals and families.",
    features: ["Everything in Premium", "Personal mobility strategist", "Top-priority embassy通道", "Private jet & luxury travel coordination", "Family office liaison", "Tax & legal network introductions", "24/7 dedicated hotline", "Guaranteed processing timeline"],
    img: "https://images.unsplash.com/photo-1542435503-956c469947f6?w=800&q=80",
    popular: false,
  },
];

const COMPARISON = [
  { feature: "Eligibility Assessment", standard: true, premium: true, vip: true },
  { feature: "Document Preparation", standard: true, premium: true, vip: true },
  { feature: "Dedicated Case Officer", standard: false, premium: true, vip: true },
  { feature: "Expedited Processing", standard: false, premium: true, vip: true },
  { feature: "Document Translation", standard: false, premium: true, vip: true },
  { feature: "Interview Preparation", standard: false, premium: true, vip: true },
  { feature: "Private Travel Coordination", standard: false, premium: false, vip: true },
  { feature: "Family Office Liaison", standard: false, premium: false, vip: true },
  { feature: "24/7 Dedicated Hotline", standard: false, premium: false, vip: true },
  { feature: "Tax & Legal Network", standard: false, premium: false, vip: true },
];

export default function PremiumPackages() {
  const { currency } = useCurrency();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <section className="relative bg-navy py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <Image src="https://images.unsplash.com/photo-1543465077-db45d34b88ac?w=1600&q=80" alt="Premium" fittingType="fill" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green/15 border border-green/30 text-green text-xs font-700 uppercase tracking-wider mb-5">
            <Diamond className="w-3.5 h-3.5" /> Premium Packages
          </span>
          <h1 className="font-display font-700 text-white" style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)" }}>Elite Mobility Programs</h1>
          <p className="text-white/60 mt-4 max-w-2xl mx-auto">Discover our high-end nationality and mobility packages, crafted for individuals who demand the very best in international access and personal service.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14 flex-1 w-full">
        <div className="grid md:grid-cols-3 gap-6">
          {PACKAGES.map((p, i) => (
            <div key={i} className={`bg-white rounded-2xl border-2 p-7 relative transition flex flex-col ${p.popular ? "border-green shadow-lg lg:scale-105" : "border-border hover:border-green/40"}`}>
              {p.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-green text-white text-xs font-700 uppercase tracking-wider whitespace-nowrap">Most Popular</span>
              )}
              <div className="w-12 h-12 rounded-full bg-green/10 flex items-center justify-center mb-4"><p.icon className="w-6 h-6 text-green" /></div>
              <span className="text-green text-xs font-700 uppercase tracking-wider">{p.tier}</span>
              <h3 className="font-display font-700 text-navy text-lg mt-1">{p.name}</h3>
              <p className="text-muted-foreground text-sm mt-2">{p.desc}</p>
              <p className="font-display font-700 text-navy text-3xl mt-4">{formatPrice(p.price, currency)}</p>
              <ul className="mt-5 space-y-2.5 flex-1">
                {p.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-sm text-navy">
                    <CheckCircle2 className="w-4 h-4 text-green shrink-0 mt-0.5" /> {f}
                  </li>
                ))}
              </ul>
              <Link to="/nationality-application" className={`mt-6 w-full text-center px-5 py-3 rounded-full text-sm font-semibold transition ${p.popular ? "bg-green text-white hover:bg-green-hover" : "bg-muted text-navy hover:bg-border"}`}>
                Choose {p.tier}
              </Link>
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <div className="mt-14 bg-white rounded-2xl border border-border overflow-hidden overflow-x-auto">
          <div className="p-6 border-b border-border">
            <h2 className="font-display font-700 text-navy text-lg">Full Comparison</h2>
            <p className="text-muted-foreground text-sm mt-1">Compare all features across our three premium tiers.</p>
          </div>
          <table className="w-full text-sm min-w-[600px]">
            <thead className="bg-muted">
              <tr>
                <th className="text-left px-5 py-3 font-600 text-muted-foreground">Feature</th>
                <th className="text-center px-5 py-3 font-600 text-navy">Essential</th>
                <th className="text-center px-5 py-3 font-600 text-green">Premium</th>
                <th className="text-center px-5 py-3 font-600 text-navy">VIP</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((c, i) => (
                <tr key={i} className="border-t border-border">
                  <td className="px-5 py-3.5 font-500 text-navy">{c.feature}</td>
                  <td className="px-5 py-3.5 text-center">{c.standard ? <CheckCircle2 className="w-5 h-5 text-green mx-auto" /> : <span className="text-muted-foreground/40">—</span>}</td>
                  <td className="px-5 py-3.5 text-center">{c.premium ? <CheckCircle2 className="w-5 h-5 text-green mx-auto" /> : <span className="text-muted-foreground/40">—</span>}</td>
                  <td className="px-5 py-3.5 text-center">{c.vip ? <CheckCircle2 className="w-5 h-5 text-green mx-auto" /> : <span className="text-muted-foreground/40">—</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {[
            { icon: Zap, title: "Fast-Track Processing", text: "Priority lanes at embassies and consulates for faster turnaround." },
            { icon: Shield, title: "Confidential & Secure", text: "Bank-grade encryption and strict confidentiality protocols." },
            { icon: Plane, title: "Global Mobility", text: "Access to 130+ countries with our international network." },
          ].map((f, i) => (
            <div key={i} className="bg-muted rounded-2xl p-6">
              <div className="w-11 h-11 rounded-full bg-green/10 flex items-center justify-center mb-4"><f.icon className="w-5 h-5 text-green" /></div>
              <h3 className="font-600 text-navy text-sm">{f.title}</h3>
              <p className="text-muted-foreground text-xs mt-2">{f.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center bg-navy rounded-2xl p-8">
          <p className="text-white font-600 text-lg">Ready to elevate your mobility?</p>
          <p className="text-white/60 text-sm mt-2">Book a private consultation with our mobility experts.</p>
          <Link to="/consultation" className="mt-5 inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-green hover:bg-green-hover transition">
            Book Consultation <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}