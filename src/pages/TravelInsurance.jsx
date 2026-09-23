import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Shield, Heart, Plane, Briefcase, CheckCircle2, ArrowRight, Star, Globe } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Image } from "@/components/ui/image";
import { useCurrency } from "@/lib/CurrencyContext";
import { formatPrice } from "@/lib/currencies";

const PLANS = [
  {
    icon: Globe,
    name: "Essential Coverage",
    price: 29,
    desc: "Basic travel and health insurance for short trips.",
    features: ["Emergency medical coverage up to $50,000", "Trip cancellation protection", "Lost baggage compensation", "24/7 emergency assistance", "Schengen-compliant coverage"],
    popular: false,
  },
  {
    icon: Shield,
    name: "Premium Protection",
    price: 59,
    desc: "Comprehensive coverage for most travelers.",
    features: ["Emergency medical coverage up to $250,000", "Trip cancellation & interruption", "Lost baggage & travel delay", "Adventure sports coverage", "Pre-existing conditions waiver", "24/7 multilingual support"],
    popular: true,
  },
  {
    icon: Briefcase,
    name: "Business Travel",
    price: 99,
    desc: "Tailored for frequent business travelers.",
    features: ["Emergency medical coverage up to $500,000", "Multi-trip annual coverage", "Business equipment protection", "Emergency evacuation included", "Concierge travel services", "Priority claims processing"],
    popular: false,
  },
];

export default function TravelInsurance() {
  const { currency } = useCurrency();
  const [selected, setSelected] = useState(1);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <section className="relative bg-navy py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image src="https://images.unsplash.com/photo-1436491865332-7a61d1096bd0?w=1600&q=80" alt="Travel Insurance" fittingType="fill" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green/15 border border-green/30 text-green text-xs font-700 uppercase tracking-wider mb-5">
            <Shield className="w-3.5 h-3.5" /> Travel Insurance
          </span>
          <h1 className="font-display font-700 text-white" style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)" }}>Travel With Confidence</h1>
          <p className="text-white/60 mt-4 max-w-2xl mx-auto">Comprehensive health and travel insurance plans designed for international travelers. Mandatory coverage for Schengen and many other destinations.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14 flex-1 w-full">
        <div className="grid md:grid-cols-3 gap-6">
          {PLANS.map((p, i) => (
            <div key={i} className={`bg-white rounded-2xl border-2 p-7 relative transition ${selected === i ? "border-green shadow-lg" : "border-border hover:border-green/40"}`}>
              {p.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-green text-white text-xs font-700 uppercase tracking-wider">Most Popular</span>
              )}
              <div className="w-12 h-12 rounded-full bg-green/10 flex items-center justify-center mb-4"><p.icon className="w-6 h-6 text-green" /></div>
              <h3 className="font-display font-700 text-navy">{p.name}</h3>
              <p className="text-muted-foreground text-sm mt-1">{p.desc}</p>
              <p className="font-display font-700 text-navy text-3xl mt-4">{formatPrice(p.price, currency)}<span className="text-muted-foreground text-sm font-400">/trip</span></p>
              <ul className="mt-5 space-y-2.5">
                {p.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-sm text-navy">
                    <CheckCircle2 className="w-4 h-4 text-green shrink-0 mt-0.5" /> {f}
                  </li>
                ))}
              </ul>
              <button onClick={() => setSelected(i)} className={`mt-6 w-full px-5 py-3 rounded-full text-sm font-semibold transition ${selected === i ? "bg-green text-white" : "bg-muted text-navy hover:bg-border"}`}>
                {selected === i ? "Selected" : "Select Plan"}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {[
            { icon: Heart, title: "Health Coverage", text: "Emergency medical expenses, hospitalization, and medical evacuation covered worldwide." },
            { icon: Plane, title: "Trip Protection", text: "Cancellation, interruption, and delay coverage to protect your travel investment." },
            { icon: Star, title: "24/7 Assistance", text: "Round-the-clock multilingual emergency support wherever you are in the world." },
          ].map((f, i) => (
            <div key={i} className="bg-muted rounded-2xl p-6">
              <div className="w-11 h-11 rounded-full bg-green/10 flex items-center justify-center mb-4"><f.icon className="w-5 h-5 text-green" /></div>
              <h3 className="font-600 text-navy text-sm">{f.title}</h3>
              <p className="text-muted-foreground text-xs mt-2">{f.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center bg-navy rounded-2xl p-8">
          <p className="text-white font-600 text-lg">Ready to add insurance to your trip?</p>
          <p className="text-white/60 text-sm mt-2">Insurance can be added during the visa application checkout process.</p>
          <Link to="/visa-application" className="mt-5 inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-green hover:bg-green-hover transition">
            Start Application <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}