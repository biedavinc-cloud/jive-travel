import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Shield, ShieldCheck, ShieldPlus, Heart, Plane, XCircle, CheckCircle2, ArrowRight, Star, Umbrella, Briefcase } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCurrency } from "@/lib/CurrencyContext";
import { formatPrice } from "@/lib/currencies";

const PLANS = [
  {
    id: "essential",
    name: "Essential",
    icon: Shield,
    pricePerDay: 4,
    color: "border-border",
    features: [
      "Medical emergencies up to $50,000",
      "Emergency evacuation & repatriation",
      "24/7 multilingual assistance",
      "Hospital direct billing",
    ],
    notIncluded: ["Trip cancellation", "Lost luggage", "Adventure sports"],
  },
  {
    id: "premium",
    name: "Premium",
    icon: ShieldPlus,
    pricePerDay: 8,
    color: "border-green ring-2 ring-green/30",
    popular: true,
    features: [
      "Medical emergencies up to $150,000",
      "Emergency evacuation & repatriation",
      "24/7 multilingual assistance",
      "Hospital direct billing",
      "Trip cancellation up to $5,000",
      "Lost luggage up to $2,000",
      "Flight delay compensation",
    ],
    notIncluded: ["Adventure sports coverage"],
  },
  {
    id: "vip",
    name: "VIP Complete",
    icon: ShieldCheck,
    pricePerDay: 15,
    color: "border-navy",
    features: [
      "Medical emergencies up to $500,000",
      "Emergency evacuation & repatriation",
      "24/7 multilingual assistance",
      "Hospital direct billing",
      "Trip cancellation up to $10,000",
      "Lost luggage up to $5,000",
      "Flight delay compensation",
      "Adventure & extreme sports coverage",
      "Personal liability up to $100,000",
      "Legal assistance abroad",
    ],
    notIncluded: [],
  },
];

const BENEFITS = [
  { icon: Heart, title: "Medical Coverage", text: "Comprehensive medical protection — from doctor visits to hospitalization and surgery." },
  { icon: Plane, title: "Trip Cancellation", text: "Recover non-refundable costs if your trip is cancelled due to covered reasons." },
  { icon: Umbrella, title: "Personal Liability", text: "Protection against accidental damage or injury caused to others while traveling." },
  { icon: Briefcase, title: "Lost Luggage", text: "Compensation for lost, stolen, or delayed baggage during your journey." },
];

export default function Assurance() {
  const { currency } = useCurrency();
  const [days, setDays] = useState(7);
  const [travelers, setTravelers] = useState(1);
  const [selected, setSelected] = useState("premium");

  const planCost = (perDay) => perDay * days * travelers;
  const selectedPlan = PLANS.find((p) => p.id === selected);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Hero */}
      <section className="bg-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, #E5231B 0, transparent 40%)" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 lg:py-20 relative">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green/15 border border-green/30 text-green text-xs font-600 uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5" /> Travel Protection
          </span>
          <h1 className="font-display font-700 text-white mt-5" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>Travel Insurance Plans</h1>
          <p className="text-white/70 text-[0.938rem] mt-3 max-w-2xl">Travel with peace of mind. Choose from flexible coverage options for medical emergencies, trip cancellation, and more.</p>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BENEFITS.map((b, i) => (
            <div key={i} className="text-center">
              <div className="w-14 h-14 rounded-full bg-green/10 flex items-center justify-center mx-auto mb-4"><b.icon className="w-7 h-7 text-green" /></div>
              <h3 className="font-600 text-navy text-sm">{b.title}</h3>
              <p className="text-muted-foreground text-xs mt-2">{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Calculator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 w-full">
        <div className="bg-white rounded-2xl border border-border p-6 mb-10">
          <h2 className="font-display font-600 text-navy text-lg mb-5">Estimate Your Coverage</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-600 uppercase tracking-wider text-muted-foreground">Trip Duration (days)</label>
              <div className="mt-2 flex items-center gap-3">
                <button onClick={() => setDays(Math.max(1, days - 1))} className="w-10 h-10 rounded-full bg-muted text-navy font-700 hover:bg-border">−</button>
                <input type="number" min={1} value={days} onChange={(e) => setDays(Math.max(1, +e.target.value))} className="input text-center" />
                <button onClick={() => setDays(days + 1)} className="w-10 h-10 rounded-full bg-muted text-navy font-700 hover:bg-border">+</button>
              </div>
            </div>
            <div>
              <label className="text-xs font-600 uppercase tracking-wider text-muted-foreground">Number of Travelers</label>
              <div className="mt-2 flex items-center gap-3">
                <button onClick={() => setTravelers(Math.max(1, travelers - 1))} className="w-10 h-10 rounded-full bg-muted text-navy font-700 hover:bg-border">−</button>
                <input type="number" min={1} value={travelers} onChange={(e) => setTravelers(Math.max(1, +e.target.value))} className="input text-center" />
                <button onClick={() => setTravelers(travelers + 1)} className="w-10 h-10 rounded-full bg-muted text-navy font-700 hover:bg-border">+</button>
              </div>
            </div>
          </div>
        </div>

        {/* Plans */}
        <div className="grid lg:grid-cols-3 gap-6">
          {PLANS.map((p) => (
            <div key={p.id} className={`bg-white rounded-2xl border-2 p-6 flex flex-col relative ${p.color} ${selected === p.id ? "shadow-xl" : ""}`}>
              {p.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-green text-white text-xs font-700 flex items-center gap-1"><Star className="w-3 h-3 fill-navy" /> Most Popular</span>}
              <div className="w-12 h-12 rounded-full bg-navy flex items-center justify-center mb-4"><p.icon className="w-6 h-6 text-green" /></div>
              <h3 className="font-display font-700 text-navy text-xl">{p.name}</h3>
              <p className="text-muted-foreground text-xs mt-1">{formatPrice(p.pricePerDay, currency)} / day / person</p>
              <p className="font-display font-700 text-navy text-2xl mt-4">{formatPrice(planCost(p.pricePerDay), currency)}<span className="text-sm font-500 text-muted-foreground"> / {days} days</span></p>

              <ul className="mt-5 space-y-2.5 flex-1">
                {p.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-green shrink-0 mt-0.5" /> {f}
                  </li>
                ))}
                {p.notIncluded.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <XCircle className="w-4 h-4 text-muted-foreground/40 shrink-0 mt-0.5" /> {f}
                  </li>
                ))}
              </ul>

              <button onClick={() => setSelected(p.id)} className={`mt-6 w-full py-3 rounded-full text-sm font-semibold transition ${selected === p.id ? "bg-navy text-white" : "bg-muted text-navy hover:bg-border"}`}>
                {selected === p.id ? "✓ Selected" : "Select Plan"}
              </button>
            </div>
          ))}
        </div>

        {/* Summary + CTA */}
        <div className="mt-8 bg-navy rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-white/60 text-sm">Selected: <span className="text-white font-600">{selectedPlan.name}</span> · {days} days · {travelers} traveler(s)</p>
            <p className="font-display font-700 text-white text-2xl mt-1">{formatPrice(planCost(selectedPlan.pricePerDay), currency)}</p>
          </div>
          <Link to="/visa-application" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-white bg-green hover:bg-green-hover transition">Add to application <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </section>

      <style>{`.input{width:100%;padding:0.625rem 0.75rem;border-radius:0.5rem;border:1px solid #E2E8F0;background:#fff;font-size:0.875rem;font-weight:500;outline:none}.input:focus{box-shadow:0 0 0 2px #E5231B}`}</style>
      <Footer />
    </div>
  );
}