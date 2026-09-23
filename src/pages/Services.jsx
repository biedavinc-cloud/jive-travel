import React from "react";
import { Link } from "react-router-dom";
import { Plane, Globe, ShieldCheck, FileText, Users, Briefcase, GraduationCap, ArrowRight, CheckCircle2, Star, Clock, Award } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Image } from "@/components/ui/image";
import RotatingImage from "@/components/RotatingImage";
import { useCurrency } from "@/lib/CurrencyContext";
import { formatPrice } from "@/lib/currencies";
import { getBaseVisaPrice, applyCommission } from "@/lib/visaData";
import { NATIONALITY_TIERS } from "@/lib/nationalityData";

const VISA_TYPES = [
  { icon: Plane, title: "Tourist Visa", desc: "Short-stay visas for tourism and leisure travel worldwide.", from: "tourism", imgs: [
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80",
    "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80",
    "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&q=80",
    "https://images.unsplash.com/photo-1503551782900-8f6b3b3c3c3c?w=600&q=80",
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80",
  ] },
  { icon: Briefcase, title: "Business Visa", desc: "Attend meetings, conferences, and explore business opportunities abroad.", from: "business", imgs: [
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b67?w=600&q=80",
    "https://images.unsplash.com/photo-1521792497436-c7955d2bde4e?w=600&q=80",
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&q=80",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&q=80",
  ] },
  { icon: GraduationCap, title: "Student Visa", desc: "Study at accredited institutions in your destination country.", from: "study", imgs: [
    "https://images.unsplash.com/photo-1523050854058-8df90fd10d53?w=600&q=80",
    "https://images.unsplash.com/photo-1541339907193-ea8a67f6a5b2?w=600&q=80",
    "https://images.unsplash.com/photo-1503676263425-1b08b3c6c8df?w=600&q=80",
    "https://images.unsplash.com/photo-1524174254263-5f52b916b0b4?w=600&q=80",
    "https://images.unsplash.com/photo-1517486808906-6ca8b3f041de?w=600&q=80",
  ] },
  { icon: Users, title: "Work Visa", desc: "Live and work legally with employer-sponsored or skilled visas.", from: "work", imgs: [
    "https://images.unsplash.com/photo-1521792497436-c7955d2bde4e?w=600&q=80",
    "https://images.unsplash.com/photo-1495020689067-9588540c9881?w=600&q=80",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b67?w=600&q=80",
    "https://images.unsplash.com/photo-1542744173-8e7e5e15c3b3?w=600&q=80",
    "https://images.unsplash.com/photo-1556761175-4b46a572b547?w=600&q=80",
  ] },
];

const ACCOMPANIMENT = [
  { icon: FileText, title: "Document Management", desc: "We collect, verify, and organize all your supporting documents — AI-checked and expert-validated." },
  { icon: ShieldCheck, title: "Compliant Dossier Guarantee", desc: "Every file is manually reviewed by an expert before submission. If anything is missing, we fix it before you pay embassy fees." },
  { icon: Users, title: "Dedicated Advisor", desc: "A personal case manager guides you from first enquiry to visa stamp — available via WhatsApp, email, and in-app chat." },
  { icon: Clock, title: "Priority Processing", desc: "Express (48h) and Urgent (24h) options available for time-sensitive applications." },
];

export default function Services() {
  const { currency } = useCurrency();
  const fromPrice = (dest, type) => formatPrice(applyCommission(getBaseVisaPrice(dest, type)), currency);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Hero */}
      <section className="bg-navy relative overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1521792497436-c7955d2bde4e?w=1200&q=80" alt="Services" fittingType="fill" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/80 to-navy" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 lg:py-20 relative">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green/15 border border-green/30 text-green text-xs font-600 uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" /> Our Services
          </span>
          <h1 className="font-display font-700 text-white mt-5" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>Visas, Nationalities & Personalized Support</h1>
          <p className="text-white/70 text-[0.938rem] mt-3 max-w-2xl">From tourist visas to second nationalities — discover the full range of services we offer to make your international mobility seamless.</p>
        </div>
      </section>

      {/* Visa types */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-green text-xs font-600 uppercase tracking-wider">Visa Categories</span>
          <h2 className="font-display font-700 text-navy mt-2" style={{ fontSize: "1.875rem" }}>Types of Visas We Handle</h2>
          <p className="text-muted-foreground text-[0.938rem] mt-3">All visa categories for 130+ destinations, managed end-to-end by our expert team.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VISA_TYPES.map((v, i) => (
            <div key={i} className="bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg transition group">
              <div className="relative h-40 overflow-hidden">
                <RotatingImage images={v.imgs} alt={v.title} className="absolute inset-0 w-full h-full group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent" />
                <div className="absolute top-3 left-3 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center"><v.icon className="w-5 h-5 text-navy" /></div>
                <h3 className="absolute bottom-3 left-4 font-display font-700 text-white text-lg">{v.title}</h3>
                {v.imgs.length > 1 && (
                  <div className="absolute bottom-3 right-3 flex gap-1">
                    {v.imgs.map((_, di) => (
                      <span key={di} className="w-1.5 h-1.5 rounded-full bg-white/50" />
                    ))}
                  </div>
                )}
              </div>
              <div className="p-5">
                <p className="text-muted-foreground text-sm">{v.desc}</p>
                <p className="text-green text-sm font-700 mt-3">from {fromPrice("United States", v.from)}</p>
                <Link to="/visa-application" className="mt-3 inline-flex items-center gap-1 text-navy font-600 text-sm hover:gap-2 transition-all">Apply now <ArrowRight className="w-4 h-4" /></Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Nationality programs */}
      <section className="bg-white border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 lg:py-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-green text-xs font-600 uppercase tracking-wider">Second Nationality & Residency</span>
            <h2 className="font-display font-700 text-navy mt-2" style={{ fontSize: "1.875rem" }}>Nationality & Residency Programs</h2>
            <p className="text-muted-foreground text-[0.938rem] mt-3">Secure a second passport or residency through investment, ancestry, or specialized programs.</p>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            {NATIONALITY_TIERS.map((t) => (
              <div key={t.id} className={`bg-white rounded-2xl border-2 flex flex-col relative overflow-hidden ${t.highlight ? "border-green ring-2 ring-green/30 shadow-lg" : "border-border"}`}>
                {t.highlight && <span className="absolute top-3 right-3 z-10 px-3 py-1 rounded-full bg-green text-white text-xs font-700 flex items-center gap-1"><Star className="w-3 h-3 fill-white" /> Popular</span>}
                <div className="relative h-40 overflow-hidden">
                  <RotatingImage images={t.imgs} alt={t.name} className="absolute inset-0 w-full h-full" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                  <h3 className="absolute bottom-3 left-5 font-display font-700 text-white text-xl">{t.name}</h3>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-muted-foreground text-xs mt-1 mb-3">{t.description}</p>
                  <p className="font-display font-700 text-navy text-2xl">{formatPrice(t.price_usd, currency)}</p>
                  <p className="text-xs text-muted-foreground mt-1">Agency service fee · Government fees separate</p>
                  <ul className="mt-5 space-y-2.5 flex-1">
                    {t.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-foreground"><CheckCircle2 className="w-4 h-4 text-green shrink-0 mt-0.5" /> {f}</li>
                    ))}
                  </ul>
                  <Link to="/nationality-application" state={{ tier: t.id }} className="mt-6 w-full py-3 rounded-full text-sm font-semibold text-center text-white bg-green hover:bg-green-hover transition">Get Started</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Personalized support */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14 lg:py-20">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-green text-xs font-600 uppercase tracking-wider">Personalized Support</span>
          <h2 className="font-display font-700 text-navy mt-2" style={{ fontSize: "1.875rem" }}>End-to-End Accompaniment</h2>
          <p className="text-muted-foreground text-[0.938rem] mt-3">We don't just file paperwork — we guide you through every step of your journey.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ACCOMPANIMENT.map((a, i) => (
            <div key={i} className="bg-white rounded-2xl border border-border p-6 hover:shadow-lg transition">
              <div className="w-12 h-12 rounded-full bg-green/10 flex items-center justify-center mb-4"><a.icon className="w-6 h-6 text-green" /></div>
              <h3 className="font-600 text-navy text-sm">{a.title}</h3>
              <p className="text-muted-foreground text-xs mt-2">{a.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-14 text-center">
        <h2 className="font-display font-700 text-navy" style={{ fontSize: "1.875rem" }}>Ready to get started?</h2>
        <p className="text-muted-foreground text-[0.938rem] mt-3">Take our free eligibility test or start your application today.</p>
        <div className="flex flex-wrap justify-center gap-3 mt-7">
          <Link to="/visa-application" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-white bg-green hover:bg-green-hover transition">Start application <ArrowRight className="w-4 h-4" /></Link>
          <Link to="/eligibility-test" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-navy border border-border hover:bg-muted transition"><ShieldCheck className="w-4 h-4" /> Eligibility test</Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}