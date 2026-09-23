import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Search, ArrowRight, Clock, FileText, ShieldCheck, AlertTriangle, Plane, CheckCircle2, Info, Globe } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { COUNTRIES, flagUrl } from "@/lib/visaData";
import { COUNTRIES_DATA } from "@/lib/worldCountries";
import { getVisaStatus, getProcessingInfo, getGovernmentFee, getDocumentChecklist, TRAVEL_PURPOSES } from "@/lib/visaRules";
import { Image } from "@/components/ui/image";

const COUNTRY_IMAGES = {
  "France": "https://images.unsplash.com/photo-1502602898656-3ad9225621bf?w=800&q=80",
  "Germany": "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80",
  "Italy": "https://images.unsplash.com/photo-1552604660-7e22c65ba25e?w=800&q=80",
  "Spain": "https://images.unsplash.com/photo-1543785724-8426e5f29f36?w=800&q=80",
  "United Kingdom": "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80",
  "United States": "https://images.unsplash.com/photo-1485871982321-0681cc3c18f6?w=800&q=80",
  "Canada": "https://images.unsplash.com/photo-1503614472-8c93d4e92d76?w=800&q=80",
  "Japan": "https://images.unsplash.com/photo-1493976040374-85c4023658fb?w=800&q=80",
  "Australia": "https://images.unsplash.com/photo-1506973035872-a4ec9c8b15f5?w=800&q=80",
  "UAE": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
  "Turkey": "https://images.unsplash.com/photo-1524231757912-21f4fe3a720f?w=800&q=80",
  "Thailand": "https://images.unsplash.com/photo-1508009703815-7f3d6f3d8b3e?w=800&q=80",
  "Singapore": "https://images.unsplash.com/photo-1525625233326-690e8ad5b96e?w=800&q=80",
  "China": "https://images.unsplash.com/photo-1508804185872-7aea8dc44f1f?w=800&q=80",
  "India": "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80",
  "Brazil": "https://images.unsplash.com/photo-1483729558449-99ef85a4bea3?w=800&q=80",
  "Egypt": "https://images.unsplash.com/photo-1539650116574-7533b3b3a3b3?w=800&q=80",
  "Morocco": "https://images.unsplash.com/photo-1539020140153-e479b8c5c5e5?w=800&q=80",
  "Switzerland": "https://images.unsplash.com/photo-1530122037265-a5f1f91f3b3b?w=800&q=80",
  "Netherlands": "https://images.unsplash.com/photo-1534351590666-13e3e96c5017?w=800&q=80",
  "Greece": "https://images.unsplash.com/photo-1533105079780-92b1da4f4e53?w=800&q=80",
  "Portugal": "https://images.unsplash.com/photo-1555881400-74a7d2c6e8f5?w=800&q=80",
  "South Korea": "https://images.unsplash.com/photo-1538485399081-7c8ed7134b3b?w=800&q=80",
  "Mexico": "https://images.unsplash.com/photo-1518105779142-d975f22f1b5f?w=800&q=80",
  "Saudi Arabia": "https://images.unsplash.com/photo-1565009444-e9f5b60e9b3b?w=800&q=80",
  "South Africa": "https://images.unsplash.com/photo-1577176827619-6c5b5b3b3b3b?w=800&q=80",
  "Russia": "https://images.unsplash.com/photo-1547448415-e9f5b60e9b3b?w=800&q=80",
};

const TIPS = [
  { icon: ShieldCheck, title: "Apply Early", text: "Submit your application at least 4–6 weeks before your travel date to avoid delays." },
  { icon: FileText, title: "Complete Documentation", text: "Incomplete documents are the #1 reason for visa refusals. Use our checklist tool." },
  { icon: AlertTriangle, title: "Be Honest", text: "Never provide false information. Misrepresentation can lead to permanent bans." },
  { icon: Plane, title: "Show Ties", text: "Embassies want proof you'll return home — show employment, property, or family ties." },
];

export default function VisaKnowledgeBase() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);

  const countries = useMemo(() => {
    return COUNTRIES_DATA.filter((c) => COUNTRIES.includes(c.name)).filter((c) => !query || c.name.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  function selectCountry(c) {
    const status = getVisaStatus("France", c.name);
    const processing = getProcessingInfo(c.name, status);
    const govFee = getGovernmentFee(c.name);
    const checklist = getDocumentChecklist(c.name, "tourism", status);
    setSelected({ name: c.name, iso2: c.iso2, status, processing, govFee, checklist });
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <section className="bg-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, #E5231B 0, transparent 40%)" }} />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 lg:py-20 relative text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green/15 border border-green/30 text-green text-xs font-600 uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" /> Knowledge Base
          </span>
          <h1 className="font-display font-700 text-white mt-5" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>Visa Requirements & Travel Tips</h1>
          <p className="text-white/70 text-[0.938rem] mt-3 max-w-xl mx-auto">Browse visa requirements and expert travel advice for any country in the world.</p>

          <div className="mt-7 relative max-w-xl mx-auto">
            <Search className="w-5 h-5 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search a country..." className="w-full pl-12 pr-4 py-3.5 rounded-full bg-white text-foreground text-sm outline-none border-0" />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 w-full flex-1">
        {/* Expert tips */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {TIPS.map((tip, i) => (
            <div key={i} className="bg-white rounded-2xl border border-border p-5">
              <div className="w-10 h-10 rounded-full bg-green/10 flex items-center justify-center mb-3"><tip.icon className="w-5 h-5 text-green" /></div>
              <h3 className="font-600 text-navy text-sm">{tip.title}</h3>
              <p className="text-xs text-muted-foreground mt-1.5">{tip.text}</p>
            </div>
          ))}
        </div>

        <h2 className="font-display font-700 text-navy text-xl mb-5 flex items-center gap-2"><Globe className="w-5 h-5 text-green" /> Browse by Country</h2>

        {/* Country grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {countries.slice(0, 60).map((c) => (
            <button key={c.iso2} onClick={() => selectCountry(c)} className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-border bg-white hover:border-green hover:shadow-md transition group">
              <img src={`https://flagcdn.com/w80/${c.iso2.toLowerCase()}.png`} alt={c.name} className="w-12 h-12 rounded-full object-cover border-2 border-border group-hover:border-green transition" />
              <span className="text-sm font-600 text-navy text-center leading-tight">{c.name}</span>
            </button>
          ))}
        </div>
        {countries.length > 60 && <p className="text-center text-muted-foreground text-sm mt-4">Showing 60 of {countries.length} countries. Use the search above to find more.</p>}
      </section>

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-navy/60 backdrop-blur-sm p-0 sm:p-4" onClick={() => setSelected(null)}>
          <div className="bg-white w-full sm:max-w-2xl sm:rounded-3xl rounded-t-3xl shadow-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="relative h-40">
              <Image src={COUNTRY_IMAGES[selected.name] || `https://flagcdn.com/1200x720/${selected.iso2.toLowerCase()}.jpg`} alt={selected.name} fittingType="fill" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
              <button onClick={() => setSelected(null)} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white"><ArrowRight className="w-5 h-5 rotate-180" /></button>
              <div className="absolute bottom-4 left-5 flex items-center gap-3">
                <img src={`https://flagcdn.com/w80/${selected.iso2.toLowerCase()}.png`} alt="" className="w-12 h-12 rounded-full border-2 border-white shadow-lg" />
                <h2 className="font-display font-700 text-white text-2xl">{selected.name}</h2>
              </div>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <p className="text-xs font-600 uppercase tracking-wider text-muted-foreground mb-2">Visa Status (French national)</p>
                <span className={`inline-flex px-4 py-2 rounded-full text-sm font-700 ${selected.status.bg} ${selected.status.color} border ${selected.status.border}`}>{selected.status.label}</span>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-muted">
                  <Clock className="w-5 h-5 text-green mb-2" />
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Processing Time</p>
                  <p className="font-600 text-navy text-sm mt-0.5">{selected.processing.standard}</p>
                </div>
                <div className="p-4 rounded-2xl bg-muted">
                  <FileText className="w-5 h-5 text-green mb-2" />
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Government Fee</p>
                  <p className="font-600 text-navy text-sm mt-0.5">${selected.govFee}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-600 uppercase tracking-wider text-muted-foreground mb-3">Required Documents</p>
                <div className="space-y-2">
                  {selected.checklist.required.slice(0, 6).map((doc, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-muted/50">
                      <CheckCircle2 className="w-4 h-4 text-green shrink-0 mt-0.5" />
                      <div>
                        <p className="font-600 text-navy text-sm">{doc.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{doc.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-green/5 border border-green/20 flex items-start gap-3">
                <Info className="w-5 h-5 text-green shrink-0 mt-0.5" />
                <p className="text-sm text-navy">Visa requirements vary by nationality. Use our <button onClick={() => navigate("/smart-checker")} className="font-700 text-green underline">Smart Visa Checker</button> for a personalized assessment.</p>
              </div>

              <button onClick={() => navigate("/visa-application", { state: { destination: selected.name } })} className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-white bg-green hover:bg-green-hover transition">
                <Plane className="w-4 h-4" /> Apply for {selected.name} Visa
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}