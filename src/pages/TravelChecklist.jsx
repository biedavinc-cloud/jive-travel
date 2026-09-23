import React, { useState, useMemo } from "react";
import { CheckCircle2, Circle, Plane, FileText, CreditCard, ShieldCheck, Briefcase, Heart, ArrowRight, RotateCcw } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CountryFlag from "@/components/CountryFlag";
import { COUNTRIES_DATA } from "@/lib/worldCountries";
import { Link } from "react-router-dom";

const VISA_TYPES = [
  { id: "tourism", label: "Tourism" },
  { id: "business", label: "Business" },
  { id: "study", label: "Study" },
  { id: "work", label: "Work" },
];

function buildChecklist(destination, visaType) {
  const base = [
    { id: "passport", icon: FileText, label: "Valid passport (6+ months validity)", category: "Documents" },
    { id: "photo", icon: FileText, label: "Recent passport-size photos (2x)", category: "Documents" },
    { id: "form", icon: FileText, label: "Completed visa application form", category: "Documents" },
    { id: "bank", icon: CreditCard, label: "Bank statements (last 3 months)", category: "Financial" },
    { id: "payslips", icon: CreditCard, label: "Payslips (last 3 months)", category: "Financial" },
    { id: "insurance", icon: ShieldCheck, label: "Travel insurance certificate", category: "Travel" },
    { id: "flights", icon: Plane, label: "Round-trip flight itinerary", category: "Travel" },
    { id: "hotel", icon: Plane, label: "Hotel reservation / accommodation proof", category: "Travel" },
  ];
  if (visaType === "business") {
    base.push({ id: "invite", icon: Briefcase, label: "Business invitation letter", category: "Documents" });
    base.push({ id: "company", icon: Briefcase, label: "Company registration certificate", category: "Documents" });
  }
  if (visaType === "study") {
    base.push({ id: "acceptance", icon: FileText, label: "University acceptance letter", category: "Documents" });
    base.push({ id: "transcripts", icon: FileText, label: "Academic transcripts", category: "Documents" });
  }
  if (visaType === "work") {
    base.push({ id: "contract", icon: Briefcase, label: "Employment contract / offer letter", category: "Documents" });
    base.push({ id: "sponsor", icon: Briefcase, label: "Employer sponsorship letter", category: "Documents" });
  }
  base.push({ id: "marriage", icon: Heart, label: "Marriage certificate (if applicable)", category: "Personal" });
  base.push({ id: "medical", icon: ShieldCheck, label: "Medical exam report (if required)", category: "Personal" });
  return base;
}

export default function TravelChecklist() {
  const [destination, setDestination] = useState("");
  const [visaType, setVisaType] = useState("tourism");
  const [checked, setChecked] = useState({});
  const [showResults, setShowResults] = useState(false);

  const checklist = useMemo(() => destination ? buildChecklist(destination, visaType) : [], [destination, visaType]);
  const categories = useMemo(() => [...new Set(checklist.map((c) => c.category))], [checklist]);
  const progress = checklist.length ? Math.round((Object.values(checked).filter(Boolean).length / checklist.length) * 100) : 0;

  function generate() {
    if (!destination) return;
    setChecked({});
    setShowResults(true);
  }

  function reset() {
    setShowResults(false);
    setDestination("");
    setChecked({});
  }

  const selectedCountry = COUNTRIES_DATA.find((c) => c.name === destination);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <section className="bg-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, #E5231B 0, transparent 40%)" }} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 lg:py-20 relative text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green/15 border border-green/30 text-green text-xs font-600 uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5" /> Travel Checklist
          </span>
          <h1 className="font-display font-700 text-white mt-5" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>Personalized Travel Checklist</h1>
          <p className="text-white/70 text-[0.938rem] mt-3 max-w-xl mx-auto">Generate a custom task list based on your destination and visa type.</p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12 w-full flex-1">
        {!showResults ? (
          <div className="bg-white rounded-2xl border border-border p-6 sm:p-8">
            <div className="space-y-5">
              <div>
                <label className="text-xs font-600 uppercase tracking-wider text-muted-foreground">Destination Country</label>
                <select value={destination} onChange={(e) => setDestination(e.target.value)} className="w-full mt-1.5 px-4 py-3 rounded-full border border-border bg-white text-sm outline-none focus:border-green">
                  <option value="">Select a country…</option>
                  {COUNTRIES_DATA.map((c) => <option key={c.iso2} value={c.name}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-600 uppercase tracking-wider text-muted-foreground">Visa Type</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-1.5">
                  {VISA_TYPES.map((v) => (
                    <button key={v.id} onClick={() => setVisaType(v.id)}
                      className={`px-4 py-2.5 rounded-full text-sm font-600 border-2 transition ${visaType === v.id ? "border-green bg-green/10 text-green" : "border-border text-muted-foreground hover:border-green/50"}`}>
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={generate} disabled={!destination}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-green text-white font-semibold hover:bg-green-hover transition disabled:opacity-40">
                Generate Checklist <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="bg-white rounded-2xl border border-border p-5 mb-6 flex items-center gap-4">
              {selectedCountry && <CountryFlag iso2={selectedCountry.iso2} name={selectedCountry.name} size={48} />}
              <div className="flex-1">
                <p className="font-display font-700 text-navy text-lg">{destination}</p>
                <p className="text-muted-foreground text-sm capitalize">{visaType} visa · {checklist.length} tasks</p>
              </div>
              <button onClick={reset} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-sm text-muted-foreground hover:text-navy border border-border hover:bg-muted transition">
                <RotateCcw className="w-4 h-4" /> Reset
              </button>
            </div>

            {/* Progress */}
            <div className="bg-white rounded-2xl border border-border p-5 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-600 text-navy">Progress</span>
                <span className="text-sm font-700 text-green">{progress}%</span>
              </div>
              <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-green rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>
            </div>

            {/* Checklist by category */}
            {categories.map((cat) => (
              <div key={cat} className="mb-6">
                <h3 className="text-xs font-600 uppercase tracking-wider text-muted-foreground mb-3">{cat}</h3>
                <div className="bg-white rounded-2xl border border-border divide-y divide-border overflow-hidden">
                  {checklist.filter((c) => c.category === cat).map((item) => (
                    <button key={item.id} onClick={() => setChecked({ ...checked, [item.id]: !checked[item.id] })}
                      className="w-full px-5 py-3.5 flex items-center gap-3 hover:bg-muted/30 transition text-left">
                      {checked[item.id] ? <CheckCircle2 className="w-5 h-5 text-green shrink-0" /> : <Circle className="w-5 h-5 text-muted-foreground shrink-0" />}
                      <item.icon className="w-4 h-4 text-muted-foreground shrink-0" />
                      <span className={`text-sm ${checked[item.id] ? "text-muted-foreground line-through" : "text-navy font-500"}`}>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <div className="mt-8 text-center">
              <Link to="/visa-application" state={{ destination }}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-white bg-green hover:bg-green-hover transition">
                Start Your Application <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}