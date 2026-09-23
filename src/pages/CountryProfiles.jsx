import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Globe, Search, ArrowRight, Clock, DollarSign, FileText, Info, Plane, Building, Utensils, Languages } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { COUNTRIES_DATA } from "@/lib/worldCountries";
import { COUNTRIES, getBaseVisaPrice, applyCommission, flagUrl } from "@/lib/visaData";
import { getVisaStatus, getProcessingInfo, getGovernmentFee, getDocumentChecklist } from "@/lib/visaRules";
import { formatPrice } from "@/lib/currencies";
import { useCurrency } from "@/lib/CurrencyContext";
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
  "South Africa": "https://images.unsplash.com/photo-1577176827619-6c5b5b3b3b3b?w=800&q=80",
  "Switzerland": "https://images.unsplash.com/photo-1530122037265-a5f1f91f3b3b?w=800&q=80",
  "Netherlands": "https://images.unsplash.com/photo-1534351590666-13e3e96c5017?w=800&q=80",
  "Greece": "https://images.unsplash.com/photo-1533105079780-92b1da4f4e53?w=800&q=80",
  "Portugal": "https://images.unsplash.com/photo-1555881400-74a7d2c6e8f5?w=800&q=80",
  "South Korea": "https://images.unsplash.com/photo-1538485399081-7c8ed7134b3b?w=800&q=80",
  "Mexico": "https://images.unsplash.com/photo-1518105779142-d975f22f1b5f?w=800&q=80",
  "Russia": "https://images.unsplash.com/photo-1547448415-e9f5b60e9b3b?w=800&q=80",
  "Saudi Arabia": "https://images.unsplash.com/photo-1565009444-e7d0835c5f1f?w=800&q=80",
};

const COUNTRY_INFO = {
  "France": { currency: "EUR", language: "French", capital: "Paris", bestTime: "Apr–Jun, Sep–Oct", tip: "Greetings are important — always say 'Bonjour' before asking anything." },
  "Germany": { currency: "EUR", language: "German", capital: "Berlin", bestTime: "May–Sep", tip: "Punctuality is expected. Carry cash — many places don't accept cards." },
  "Italy": { currency: "EUR", language: "Italian", capital: "Rome", bestTime: "Apr–Jun, Sep–Oct", tip: "Dress modestly when visiting churches. No cappuccino after 11 AM." },
  "Spain": { currency: "EUR", language: "Spanish", capital: "Madrid", bestTime: "Mar–May, Sep–Nov", tip: "Dinner is late (9–10 PM). Siesta still observed in smaller towns." },
  "United Kingdom": { currency: "GBP", language: "English", capital: "London", bestTime: "May–Sep", tip: "Stand on the right on escalators. Always queue politely." },
  "United States": { currency: "USD", language: "English", capital: "Washington D.C.", bestTime: "Varies by region", tip: "Tipping 15–20% is expected at restaurants. Sales tax is added at checkout." },
  "Canada": { currency: "CAD", language: "English / French", capital: "Ottawa", bestTime: "Jun–Sep", tip: "eTA required for visa-exempt nationals. Carry warm layers even in summer." },
  "Japan": { currency: "JPY", language: "Japanese", capital: "Tokyo", bestTime: "Mar–May, Oct–Nov", tip: "Bowing is customary. Remove shoes indoors. No tipping." },
  "Australia": { currency: "AUD", language: "English", capital: "Canberra", bestTime: "Sep–Nov, Mar–May", tip: "Sun protection is essential. Drive on the left." },
  "UAE": { currency: "AED", language: "Arabic / English", capital: "Abu Dhabi", bestTime: "Nov–Mar", tip: "Dress conservatively in public. Friday is a holy day." },
  "Turkey": { currency: "TRY", language: "Turkish", capital: "Ankara", bestTime: "Apr–Jun, Sep–Oct", tip: "Bargaining is common in bazaars. Remove shoes when entering mosques." },
  "Thailand": { currency: "THB", language: "Thai", capital: "Bangkok", bestTime: "Nov–Feb", tip: "Respect the King and Royal Family. Don't point with your feet." },
  "Singapore": { currency: "SGD", language: "English / Malay / Tamil", capital: "Singapore", bestTime: "Feb–Apr", tip: "Chewing gum is banned. Fines for littering are strict." },
  "China": { currency: "CNY", language: "Mandarin", capital: "Beijing", bestTime: "Apr–May, Sep–Oct", tip: "VPN recommended for internet access. WeChat is essential for payments." },
  "India": { currency: "INR", language: "Hindi / English", capital: "New Delhi", bestTime: "Oct–Mar", tip: "Drink bottled water. Dress modestly at religious sites." },
  "Brazil": { currency: "BRL", language: "Portuguese", capital: "Brasília", bestTime: "May–Oct", tip: "Carry small bills. Avoid displaying expensive items in cities." },
  "Egypt": { currency: "EGP", language: "Arabic", capital: "Cairo", bestTime: "Oct–Apr", tip: "Bargain in markets. Stay hydrated — carry bottled water." },
  "Morocco": { currency: "MAD", language: "Arabic / French", capital: "Rabat", bestTime: "Mar–May, Sep–Nov", tip: "Dress modestly. Accept mint tea when offered — it's a sign of hospitality." },
  "South Africa": { currency: "ZAR", language: "11 official languages", capital: "Pretoria", bestTime: "May–Sep", tip: "Be aware of safety in cities. Drive on the left." },
  "Switzerland": { currency: "CHF", language: "German / French / Italian", capital: "Bern", bestTime: "Jun–Sep", tip: "Trains are punctual. Swiss Travel Pass offers great value." },
  "Netherlands": { currency: "EUR", language: "Dutch", capital: "Amsterdam", bestTime: "Apr–Sep", tip: "Cyclists have priority. Always check bike lanes before crossing." },
  "Greece": { currency: "EUR", language: "Greek", capital: "Athens", bestTime: "Apr–Jun, Sep–Oct", tip: " Greeks eat late. Always say 'Yiasou' as a greeting." },
  "Portugal": { currency: "EUR", language: "Portuguese", capital: "Lisbon", bestTime: "Mar–May, Sep–Oct", tip: "One of Europe's safest countries. Tipping 5–10% is appreciated." },
  "South Korea": { currency: "KRW", language: "Korean", capital: "Seoul", bestTime: "Apr–Jun, Sep–Nov", tip: "Remove shoes indoors. Two-handed giving/receiving shows respect." },
  "Mexico": { currency: "MXN", language: "Spanish", capital: "Mexico City", bestTime: "Oct–Apr", tip: "Drink bottled water. Tipping 10–15% at restaurants." },
  "Russia": { currency: "RUB", language: "Russian", capital: "Moscow", bestTime: "May–Sep", tip: "Carry your passport at all times. Visa registration is mandatory." },
  "Saudi Arabia": { currency: "SAR", language: "Arabic", capital: "Riyadh", bestTime: "Nov–Feb", tip: "e-Visa available for 49 countries. Dress conservatively." },
};

export default function CountryProfiles() {
  const navigate = useNavigate();
  const { currency } = useCurrency();
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("All");
  const [selected, setSelected] = useState(null);

  const regions = ["All", "Europe", "Asia", "Africa", "North America", "South America", "Oceania", "Middle East", "Caribbean", "Central America"];

  const filtered = useMemo(() => {
    return COUNTRIES_DATA.filter((c) => {
      const matchQuery = !query || c.name.toLowerCase().includes(query.toLowerCase());
      const matchRegion = region === "All" || c.region === region;
      return matchQuery && matchRegion;
    });
  }, [query, region]);

  function selectCountry(c) {
    if (!COUNTRIES.includes(c.name)) { setSelected({ name: c.name, iso2: c.iso2, info: null, visaData: null }); return; }
    const status = getVisaStatus("France", c.name);
    const processing = getProcessingInfo(c.name, status);
    const govFee = getGovernmentFee(c.name);
    const serviceFee = applyCommission(getBaseVisaPrice(c.name, "tourism"));
    const checklist = getDocumentChecklist(c.name, "tourism", status);
    setSelected({ name: c.name, iso2: c.iso2, info: COUNTRY_INFO[c.name] || null, visaData: { status, processing, govFee, serviceFee, total: serviceFee + govFee, checklist } });
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <section className="bg-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, #E5231B 0, transparent 40%)" }} />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 lg:py-20 relative text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green/15 border border-green/30 text-green text-xs font-600 uppercase tracking-wider">
            <Globe className="w-3.5 h-3.5" /> Country Profiles
          </span>
          <h1 className="font-display font-700 text-white mt-5" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>Explore Destinations Worldwide</h1>
          <p className="text-white/70 text-[0.938rem] mt-3 max-w-xl mx-auto">Browse {COUNTRIES_DATA.length} countries to discover entry requirements, local customs, and travel advice.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 w-full flex-1">
        {/* Search + filters */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-5 h-5 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search countries..." className="w-full pl-12 pr-4 py-3 rounded-full border border-border bg-white text-sm outline-none focus:border-gold" />
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {regions.map((r) => (
              <button key={r} onClick={() => setRegion(r)} className={`px-4 py-2 rounded-full text-sm font-600 whitespace-nowrap ${region === r ? "bg-navy text-white" : "bg-muted text-muted-foreground hover:bg-border"}`}>{r}</button>
            ))}
          </div>
        </div>

        {/* Country grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {filtered.map((c) => (
            <button key={c.iso2} onClick={() => selectCountry(c)} className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-border bg-white hover:border-green hover:shadow-md transition group">
              <img src={`https://flagcdn.com/w80/${c.iso2.toLowerCase()}.png`} alt={c.name} className="w-12 h-12 rounded-full object-cover border-2 border-border group-hover:border-green transition" />
              <span className="text-sm font-600 text-navy text-center leading-tight">{c.name}</span>
              <span className="text-[0.65rem] text-muted-foreground uppercase tracking-wider">{c.region}</span>
            </button>
          ))}
        </div>

        {filtered.length === 0 && <p className="text-center text-muted-foreground py-20">No countries found.</p>}
      </section>

      {/* Detail drawer */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-navy/60 backdrop-blur-sm p-0 sm:p-4" onClick={() => setSelected(null)}>
          <div className="bg-white w-full sm:max-w-2xl sm:rounded-3xl rounded-t-3xl shadow-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="relative h-48">
              <Image src={COUNTRY_IMAGES[selected.name] || `https://flagcdn.com/1200x720/${selected.iso2.toLowerCase()}.jpg`} alt={selected.name} fittingType="fill" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
              <button onClick={() => setSelected(null)} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white"><ArrowRight className="w-5 h-5 rotate-180" /></button>
              <div className="absolute bottom-4 left-5 flex items-center gap-3">
                <img src={`https://flagcdn.com/w80/${selected.iso2.toLowerCase()}.png`} alt="" className="w-14 h-14 rounded-full border-2 border-white shadow-lg" />
                <div>
                  <h2 className="font-display font-700 text-white text-2xl">{selected.name}</h2>
                  <p className="text-white/70 text-sm">{selected.info?.capital || "Capital"} · {selected.info?.currency || ""}</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-5">
              {selected.info && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <InfoCard icon={Building} label="Capital" value={selected.info.capital} />
                  <InfoCard icon={Languages} label="Language" value={selected.info.language} />
                  <InfoCard icon={Clock} label="Best Time" value={selected.info.bestTime} />
                </div>
              )}

              {selected.visaData ? (
                <>
                  <div>
                    <p className="text-xs font-600 uppercase tracking-wider text-muted-foreground mb-2">Visa Status (French national)</p>
                    <span className={`inline-flex px-4 py-2 rounded-full text-sm font-700 ${selected.visaData.status.bg} ${selected.visaData.status.color} border ${selected.visaData.status.border}`}>{selected.visaData.status.label}</span>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="p-4 rounded-2xl bg-muted">
                      <Clock className="w-5 h-5 text-green mb-2" />
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">Processing</p>
                      <p className="font-600 text-navy text-sm mt-0.5">{selected.visaData.processing.standard}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-muted">
                      <DollarSign className="w-5 h-5 text-green mb-2" />
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">Est. Total Cost</p>
                      <p className="font-700 text-navy text-sm mt-0.5">{formatPrice(selected.visaData.total, currency)}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-600 uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1"><FileText className="w-3.5 h-3.5" /> Documents Needed</p>
                    <p className="text-sm text-navy">{selected.visaData.checklist.required.length} required · {selected.visaData.checklist.conditional.length} conditional</p>
                  </div>
                </>
              ) : (
                <div className="p-4 rounded-2xl bg-muted text-sm text-muted-foreground">Visa data not available for this destination. Use the Smart Checker for a personalized assessment.</div>
              )}

              {selected.info && (
                <div className="p-4 rounded-2xl bg-green/5 border border-green/20">
                  <div className="flex items-center gap-2 mb-1"><Info className="w-4 h-4 text-green" /><p className="text-xs font-600 uppercase tracking-wider text-green">Travel Tip</p></div>
                  <p className="text-sm text-navy">{selected.info.tip}</p>
                </div>
              )}

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

function InfoCard({ icon: Icon, label, value }) {
  return (
    <div className="p-3 rounded-2xl bg-muted">
      <Icon className="w-4 h-4 text-green mb-1.5" />
      <p className="text-xs text-muted-foreground uppercase tracking-wider">{label}</p>
      <p className="font-600 text-navy text-sm mt-0.5">{value}</p>
    </div>
  );
}