import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { ArrowRight, ArrowLeft, Check, Globe, Home, MapPin, Compass, Calendar, Clock, Search, ShieldCheck, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VisaResult from "@/components/VisaResult";
import { COUNTRIES, flag, TRAVEL_PURPOSES, assessVisa } from "@/lib/visaRules";
import { COUNTRIES_DATA } from "@/lib/worldCountries";

const STEPS = [
  { id: "nationality", title: "Where are you travelling from?", subtitle: "Select your nationality", icon: Globe },
  { id: "residence", title: "Where do you currently live?", subtitle: "Your country of residence", icon: Home },
  { id: "destination", title: "Where are you travelling to?", subtitle: "Select your destination", icon: MapPin },
  { id: "purpose", title: "Why are you travelling?", subtitle: "Select your travel purpose", icon: Compass },
  { id: "duration", title: "How long do you plan to stay?", subtitle: "Estimated duration", icon: Clock },
  { id: "dates", title: "When do you plan to travel?", subtitle: "Approximate travel date", icon: Calendar },
];

const DURATIONS = [
  { id: "short", label: "Up to 30 days", desc: "Short stay" },
  { id: "medium", label: "1–3 months", desc: "Medium stay" },
  { id: "long", label: "3–6 months", desc: "Extended stay" },
  { id: "extended", label: "More than 6 months", desc: "Long stay" },
];

function CountryPicker({ value, onChange, placeholder }) {
  const [query, setQuery] = useState("");
  const filtered = COUNTRIES_DATA.filter((c) => c.name.toLowerCase().includes(query.toLowerCase())).slice(0, 80);
  return (
    <div>
      <div className="relative mb-4">
        <Search className="w-5 h-5 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-4 py-3.5 rounded-full bg-muted text-foreground text-sm outline-none border border-transparent focus:border-gold focus:bg-white transition"
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[340px] overflow-y-auto no-scrollbar pr-1">
        {filtered.map((c) => (
          <button
            key={c.iso2}
            onClick={() => onChange(c.name)}
            className={`flex items-center gap-2.5 px-3.5 py-3 rounded-2xl border text-left text-sm font-500 transition ${value === c.name ? "border-gold bg-gold/10 text-navy" : "border-border bg-white hover:border-navy/30 hover:bg-muted"}`}
          >
            <img src={`https://flagcdn.com/w40/${c.iso2.toLowerCase()}.png`} alt={c.name} className="w-7 h-7 rounded-full object-cover shrink-0" />
            <span className="truncate">{c.name}</span>
          </button>
        ))}
        {filtered.length === 0 && <p className="col-span-full text-center text-muted-foreground text-sm py-6">No country found.</p>}
      </div>
      <p className="text-xs text-muted-foreground mt-3 text-center">{COUNTRIES_DATA.length} countries available worldwide</p>
    </div>
  );
}

export default function SmartVisaChecker() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ nationality: "", residence: "", destination: "", purpose: "", duration: "", travelDate: "" });
  const [result, setResult] = useState(null);
  const [dbRules, setDbRules] = useState([]);

  useEffect(() => {
    base44.entities.VisaRule.list().then(setDbRules).catch(() => {});
  }, []);

  const set = (k, v) => setData((d) => ({ ...d, [k]: v }));
  const canProceed = () => {
    const s = STEPS[step].id;
    return !!data[s];
  };

  function next() {
    if (step < STEPS.length - 1) setStep(step + 1);
    else {
      const assessment = assessVisa(data, dbRules);
      setResult(assessment);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function back() {
    if (step > 0) setStep(step - 1);
  }

  function restart() {
    setResult(null);
    setStep(0);
    setData({ nationality: "", residence: "", destination: "", purpose: "", duration: "", travelDate: "" });
  }

  if (result) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <VisaResult assessment={result} onRestart={restart} onStart={() => navigate("/visa-application", { state: { origin: result.nationality, residence: result.residence, destination: result.destination, purpose: result.purpose } })} />
        <Footer />
      </div>
    );
  }

  const current = STEPS[step];
  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Hero header — compact, preserves brand */}
      <section className="bg-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, #E5231B 0, transparent 40%)" }} />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 lg:py-14 relative text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green/15 border border-green/30 text-green text-xs font-600 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Smart Visa Checker
          </span>
          <h1 className="font-display font-700 text-white mt-4" style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}>
            Your Journey. <span className="text-green">Simplified.</span>
          </h1>
          <p className="text-white/70 text-sm mt-2 max-w-lg mx-auto">Get a personalized visa pathway in 6 quick steps — verified requirements, transparent fees.</p>
        </div>
      </section>

      {/* Wizard */}
      <section className="max-w-2xl mx-auto px-4 sm:px-6 py-8 lg:py-12 w-full flex-1">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-600 uppercase tracking-wider text-muted-foreground">Step {step + 1} of {STEPS.length}</span>
            <span className="text-xs font-600 text-navy">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div className="h-full rounded-full bg-gold transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
          {/* Step dots */}
          <div className="flex items-center justify-center gap-1.5 mt-4">
            {STEPS.map((s, i) => (
              <button key={s.id} onClick={() => i < step && setStep(i)} className={`w-2.5 h-2.5 rounded-full transition ${i === step ? "bg-gold scale-125" : i < step ? "bg-navy" : "bg-border"}`} />
            ))}
          </div>
        </div>

        {/* Step content */}
        <div className="bg-white rounded-3xl border border-border p-6 sm:p-8 shadow-sm animate-fade-up">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-full bg-navy flex items-center justify-center">
              <current.icon className="w-5 h-5 text-green" />
            </div>
            <div>
              <h2 className="font-display font-700 text-navy text-lg leading-tight">{current.title}</h2>
              <p className="text-muted-foreground text-sm">{current.subtitle}</p>
            </div>
          </div>

          {step === 0 && <CountryPicker value={data.nationality} onChange={(v) => set("nationality", v)} placeholder="Search your nationality..." />}
          {step === 1 && <CountryPicker value={data.residence} onChange={(v) => set("residence", v)} placeholder="Search your country of residence..." />}
          {step === 2 && <CountryPicker value={data.destination} onChange={(v) => set("destination", v)} placeholder="Search your destination..." />}
          {step === 3 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {TRAVEL_PURPOSES.map((p) => (
                <button key={p.id} onClick={() => set("purpose", p.id)} className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition ${data.purpose === p.id ? "border-gold bg-gold/10" : "border-border hover:border-navy/30 hover:bg-muted"}`}>
                  <span className="text-2xl">{p.icon}</span>
                  <span className="text-sm font-600 text-navy text-center leading-tight">{p.label}</span>
                </button>
              ))}
            </div>
          )}
          {step === 4 && (
            <div className="space-y-2.5">
              {DURATIONS.map((d) => (
                <button key={d.id} onClick={() => set("duration", d.id)} className={`w-full flex items-center justify-between p-4 rounded-2xl border transition ${data.duration === d.id ? "border-gold bg-gold/10" : "border-border hover:border-navy/30 hover:bg-muted"}`}>
                  <div className="text-left">
                    <p className="font-600 text-navy text-sm">{d.label}</p>
                    <p className="text-muted-foreground text-xs">{d.desc}</p>
                  </div>
                  {data.duration === d.id && <Check className="w-5 h-5 text-gold" />}
                </button>
              ))}
            </div>
          )}
          {step === 5 && (
            <div>
              <input type="date" value={data.travelDate} onChange={(e) => set("travelDate", e.target.value)} className="w-full px-4 py-3.5 rounded-2xl border border-border bg-white text-foreground text-sm outline-none focus:border-gold" />
              <p className="text-muted-foreground text-xs mt-3 flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-green" /> An approximate date is fine — you can update it later.</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          <button onClick={back} disabled={step === 0} className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-600 text-navy border border-border hover:bg-muted transition disabled:opacity-40 disabled:cursor-not-allowed">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <button onClick={next} disabled={!canProceed()} className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-gold hover:bg-gold-hover transition disabled:opacity-40 disabled:cursor-not-allowed gold-glow">
            {step === STEPS.length - 1 ? "Check Requirements" : "Continue"} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}