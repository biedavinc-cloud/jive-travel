import React, { useState, useMemo } from "react";
import { Search, MapPin, Clock, DollarSign, Shield, AlertTriangle, Info, Plane, Globe } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CountryFlag from "@/components/CountryFlag";
import { COUNTRIES_DATA } from "@/lib/worldCountries";
import { getVisaStatus, getProcessingInfo } from "@/lib/visaRules";
import { Image } from "@/components/ui/image";
import { Link } from "react-router-dom";

const INSIGHTS = {
  "United States": {
    img: "https://images.unsplash.com/photo-1485871982321-0681cc3c18f6?w=800&q=80",
    currency: "USD",
    timezone: "UTC-5 to UTC-10",
    language: "English",
    entry: "Valid passport + US visa or ESTA (visa waiver countries). Biometrics required at port of entry.",
    laws: "Tipping 15-20% expected. Drinking age 21. Cannabis legal in some states but illegal federally.",
    advice: "Arrive at airport 3 hours before international flights. Carry your visa documents at all times.",
    health: "No specific vaccinations required. Travel insurance strongly recommended (high medical costs).",
  },
  "United Kingdom": {
    img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80",
    currency: "GBP",
    timezone: "UTC+0 / UTC+1",
    language: "English",
    entry: "Valid passport + UK visa or ETA. No Schengen visa required for UK.",
    laws: "Drinking age 18. Smoking banned in enclosed public spaces. Drive on the left.",
    advice: "Weather unpredictable — pack layers. Oyster card recommended for London transport.",
    health: "No vaccinations required. EHIC covers EU citizens for emergency care.",
  },
  "France": {
    img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
    currency: "EUR",
    timezone: "UTC+1 / UTC+2",
    language: "French",
    entry: "Schengen visa or 90-day visa-free for eligible nationalities. Passport valid 3+ months.",
    laws: "Drinking age 18. Keep receipts for purchases. French language required in official settings.",
    advice: "Shops may close at lunch in smaller towns. Metro is the best way to get around Paris.",
    health: "EHIC valid. Pharmacies marked with green cross. Emergency number 112.",
  },
  "Germany": {
    img: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80",
    currency: "EUR",
    timezone: "UTC+1 / UTC+2",
    language: "German",
    entry: "Schengen visa or 90-day visa-free. Biometric passport required for visa-free entry.",
    laws: "Jaywalking fined. Sunday shopping restricted. Recycling strictly enforced.",
    advice: "Carry cash — some places don't accept cards. Public transport is punctual and efficient.",
    health: "EHIC valid. Tap water safe to drink. High healthcare standard.",
  },
  "UAE": {
    img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
    currency: "AED",
    timezone: "UTC+4",
    language: "Arabic / English",
    entry: "Visa on arrival for many nationalities (30-90 days). E-visa available for others.",
    laws: "No alcohol in public spaces. Modest dress in public. No public displays of affection. Drug laws very strict.",
    advice: "AC everywhere. Friday is the holy day. Avoid eating/drinking in public during Ramadan daylight.",
    health: "No vaccinations required. Private healthcare excellent but expensive — insurance essential.",
  },
  "Japan": {
    img: "https://images.unsplash.com/photo-1540959733332-eab4ffabeeaf?w=800&q=80",
    currency: "JPY",
    timezone: "UTC+9",
    language: "Japanese",
    entry: "Visa-free for up to 90 days for many nationalities. Visit Japan Web for fast-track entry.",
    laws: "No tipping. Smoking restricted to designated areas. Carry your residence card at all times.",
    advice: "Cash is king — carry yen. IC card for trains. Bows are standard greetings.",
    health: "Excellent healthcare. No special vaccinations. Pharmacy signs show a green cross.",
  },
  "default": {
    img: "https://images.unsplash.com/photo-1488646953014-85cb44e25135?w=800&q=80",
    currency: "Local",
    timezone: "Varies",
    language: "Varies",
    entry: "Check visa requirements for your nationality. Valid passport with 6+ months validity required.",
    laws: "Research local laws before traveling. Respect local customs and traditions.",
    advice: "Register with your embassy. Keep digital and physical copies of all documents.",
    health: "Check CDC/WHO for recommended vaccinations. Travel insurance strongly recommended.",
  },
};

export default function CountryInsights() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return COUNTRIES_DATA.slice(0, 12);
    const q = query.toLowerCase();
    return COUNTRIES_DATA.filter((c) => c.name.toLowerCase().includes(q));
  }, [query]);

  const [selected, setSelected] = useState(null);

  const insight = selected ? (INSIGHTS[selected.name] || INSIGHTS.default) : null;
  const visaStatus = selected ? getVisaStatus("France", selected.name) : null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <section className="bg-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, #E5231B 0, transparent 40%)" }} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 lg:py-20 relative text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green/15 border border-green/30 text-green text-xs font-600 uppercase tracking-wider">
            <Globe className="w-3.5 h-3.5" /> Country Insights
          </span>
          <h1 className="font-display font-700 text-white mt-5" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>Destination Insights & Advice</h1>
          <p className="text-white/70 text-[0.938rem] mt-3 max-w-xl mx-auto">Travel advice, local laws, and entry requirements for every destination.</p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 w-full flex-1">
        {!selected ? (
          <>
            {/* Search */}
            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search a destination..."
                className="w-full pl-12 pr-4 py-3.5 rounded-full border border-border bg-white text-sm outline-none focus:border-green" />
            </div>

            {/* Country grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.map((c) => (
                <button key={c.iso2} onClick={() => setSelected(c)}
                  className="bg-white rounded-2xl border border-border p-4 flex items-center gap-3 hover:shadow-lg hover:border-green/40 transition text-left">
                  <CountryFlag iso2={c.iso2} name={c.name} size={48} />
                  <div className="flex-1 min-w-0">
                    <p className="font-600 text-navy text-sm truncate">{c.name}</p>
                    <p className="text-xs text-muted-foreground">View insights →</p>
                  </div>
                </button>
              ))}
            </div>
          </>
        ) : (
          <div>
            {/* Back */}
            <button onClick={() => setSelected(null)} className="mb-6 text-sm text-green font-600 hover:underline">← Back to all countries</button>

            {/* Header */}
            <div className="relative h-48 rounded-2xl overflow-hidden mb-6">
              <Image src={insight.img} alt={selected.name} fittingType="fill" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent" />
              <div className="absolute bottom-5 left-5 flex items-center gap-3">
                <CountryFlag iso2={selected.iso2} name={selected.name} size={56} className="ring-2 ring-white/40" />
                <h2 className="font-display font-700 text-white text-2xl">{selected.name}</h2>
              </div>
            </div>

            {/* Quick facts */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {[
                { icon: DollarSign, label: "Currency", value: insight.currency },
                { icon: Clock, label: "Timezone", value: insight.timezone },
                { icon: Globe, label: "Language", value: insight.language },
                { icon: Shield, label: "Visa", value: visaStatus?.label || "Check required" },
              ].map((f) => (
                <div key={f.label} className="bg-white rounded-xl border border-border p-4">
                  <f.icon className="w-5 h-5 text-green mb-2" />
                  <p className="text-xs text-muted-foreground">{f.label}</p>
                  <p className="font-600 text-navy text-sm">{f.value}</p>
                </div>
              ))}
            </div>

            {/* Detailed sections */}
            <div className="space-y-4">
              {[
                { icon: Plane, title: "Entry Requirements", text: insight.entry },
                { icon: AlertTriangle, title: "Local Laws & Customs", text: insight.laws },
                { icon: Info, title: "Travel Advice", text: insight.advice },
                { icon: Shield, title: "Health & Safety", text: insight.health },
              ].map((s) => (
                <div key={s.title} className="bg-white rounded-2xl border border-border p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-9 h-9 rounded-full bg-green/10 flex items-center justify-center"><s.icon className="w-4.5 h-4.5 text-green" /></div>
                    <h3 className="font-600 text-navy">{s.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm pl-11">{s.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link to="/visa-application" state={{ destination: selected.name }}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-white bg-green hover:bg-green-hover transition">
                Apply for {selected.name} Visa
              </Link>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}