import React from "react";
import { Link } from "react-router-dom";
import { Crown, Zap, FileCheck, Scale, Clock, Users, ShieldCheck, ArrowRight, Star, Phone } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Image } from "@/components/ui/image";
import { formatPrice } from "@/lib/currencies";
import { useCurrency } from "@/lib/CurrencyContext";

const VIP_TIERS = [
  {
    name: "Expedited Processing",
    price: 500,
    icon: Zap,
    img: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=600&q=80",
    features: ["24-48h processing guarantee", "Priority embassy appointment booking", "Express document review", "Dedicated case manager", "Real-time SMS updates"],
  },
  {
    name: "Document Review Pro",
    price: 350,
    icon: FileCheck,
    img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80",
    features: ["Expert document audit", "Application pre-screening", "Error correction & optimization", "Embassy-specific formatting", "Compliance guarantee"],
  },
  {
    name: "Legal Support",
    price: 800,
    icon: Scale,
    img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80",
    features: ["Immigration lawyer consultation", "Legal document preparation", "Appeal representation", "Complex case strategy", "Unlimited legal advice (30 days)"],
  },
];

const CONCIERGE = [
  { icon: Crown, title: "Private Embassy Appointments", text: "We secure exclusive appointment slots outside public booking — no waiting weeks for availability." },
  { icon: Users, title: "Dedicated VIP Team", text: "A personal team of 3 specialists (advisor, lawyer, and case manager) handles every aspect of your case." },
  { icon: ShieldCheck, title: "Rejection Insurance", text: "If your application is rejected due to our error, we re-apply free of charge — including all embassy fees." },
  { icon: Clock, title: "24/7 Priority Support", text: "Direct WhatsApp line to your case manager. Average response time under 15 minutes, any time of day." },
];

export default function VIPServices() {
  const { currency } = useCurrency();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <section className="bg-navy relative overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1517760444937-f6397edcbb0e?w=1200&q=80" alt="VIP" fittingType="fill" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/80 to-navy" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 lg:py-20 relative text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green/15 border border-green/30 text-green text-xs font-600 uppercase tracking-wider">
            <Crown className="w-3.5 h-3.5" /> VIP Services
          </span>
          <h1 className="font-display font-700 text-white mt-5" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>Premium Concierge Services</h1>
          <p className="text-white/70 text-[0.938rem] mt-3 max-w-xl mx-auto">Expedited processing, expert document review, and personalized legal support for high-tier applicants.</p>
        </div>
      </section>

      {/* VIP Tiers */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14 lg:py-20 w-full">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-green text-xs font-600 uppercase tracking-wider">Premium Add-Ons</span>
          <h2 className="font-display font-700 text-navy mt-2" style={{ fontSize: "1.875rem" }}>VIP Service Packages</h2>
          <p className="text-muted-foreground text-[0.938rem] mt-3">Enhance your application with our premium service tiers.</p>
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          {VIP_TIERS.map((t) => (
            <div key={t.name} className="bg-white rounded-2xl border-2 border-border flex flex-col overflow-hidden hover:shadow-xl transition">
              <div className="relative h-36 overflow-hidden">
                <Image src={t.img} alt={t.name} fittingType="fill" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent" />
                <div className="absolute top-3 left-3 w-11 h-11 rounded-full bg-green flex items-center justify-center"><t.icon className="w-5 h-5 text-white" /></div>
                <h3 className="absolute bottom-3 left-5 font-display font-700 text-white text-xl">{t.name}</h3>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <p className="font-display font-700 text-navy text-2xl">{formatPrice(t.price, currency)}</p>
                <ul className="mt-5 space-y-2.5 flex-1">
                  {t.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-foreground"><Star className="w-4 h-4 text-green shrink-0 mt-0.5 fill-green" /> {f}</li>
                  ))}
                </ul>
                <Link to="/consultation" className="mt-6 w-full py-3 rounded-full text-sm font-semibold text-center text-white bg-green hover:bg-green-hover transition inline-flex items-center justify-center gap-2">
                  Book Consultation <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Concierge features */}
      <section className="bg-navy relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 lg:py-20 relative">
          <div className="text-center mb-10">
            <span className="text-green text-xs font-600 uppercase tracking-wider">The VIP Experience</span>
            <h2 className="font-display font-700 text-white mt-2" style={{ fontSize: "1.875rem" }}>What You Get as a VIP Client</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {CONCIERGE.map((c, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-green/40 transition">
                <div className="w-11 h-11 rounded-full bg-green flex items-center justify-center mb-4"><c.icon className="w-5 h-5 text-white" /></div>
                <h3 className="font-display font-600 text-white text-sm">{c.title}</h3>
                <p className="text-white/50 text-xs mt-2">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center">
        <h2 className="font-display font-700 text-navy" style={{ fontSize: "1.875rem" }}>Experience the VIP Difference</h2>
        <p className="text-muted-foreground text-[0.938rem] mt-3">Speak with a senior advisor about your VIP service options.</p>
        <div className="flex flex-wrap justify-center gap-3 mt-7">
          <Link to="/consultation" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-white bg-green hover:bg-green-hover transition">
            <Phone className="w-4 h-4" /> Book VIP Consultation
          </Link>
          <Link to="/nationality-application" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-navy border border-border hover:bg-muted transition">
            Explore Nationality Programs
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}