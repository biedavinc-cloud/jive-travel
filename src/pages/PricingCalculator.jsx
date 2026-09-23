import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Calculator, ArrowRight, Plane, Users, Baby, Clock, Shield, Sparkles, Info, ChevronDown } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { COUNTRIES, VISA_TYPES, URGENCY_OPTIONS, computeVisaTotal, getBaseVisaPrice, applyCommission, flagUrl, INSURANCE_RATE_PER_DAY, COMMISSION_RATE } from "@/lib/visaData";
import { formatPrice } from "@/lib/currencies";
import { useCurrency } from "@/lib/CurrencyContext";
import { useLanguage } from "@/lib/LanguageContext";

export default function PricingCalculator() {
  const navigate = useNavigate();
  const { currency } = useCurrency();
  const { lang } = useLanguage();
  const [origin, setOrigin] = useState("France");
  const [destination, setDestination] = useState("United States");
  const [visaType, setVisaType] = useState("tourism");
  const [urgency, setUrgency] = useState("standard");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [days, setDays] = useState(7);
  const [withInsurance, setWithInsurance] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const pricing = useMemo(
    () => computeVisaTotal({ destination, visaType, urgencyId: urgency, adults, children, insuranceDays: withInsurance ? days : 0, withInsurance }),
    [destination, visaType, urgency, adults, children, days, withInsurance]
  );

  const baseFee = getBaseVisaPrice(destination, visaType);
  const childFee = baseFee * 0.5;
  const urgencyOpt = URGENCY_OPTIONS.find((u) => u.id === urgency);
  const insuranceCost = withInsurance ? INSURANCE_RATE_PER_DAY * days * (adults + children) : 0;
  const visaFeesTotal = baseFee * adults + childFee * children;
  const serviceMargin = visaFeesTotal * COMMISSION_RATE;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <section className="bg-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, #E5231B 0, transparent 40%)" }} />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 lg:py-20 relative text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green/15 border border-green/30 text-green text-xs font-600 uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" /> Pricing Calculator
          </span>
          <h1 className="font-display font-700 text-white mt-5" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>Transparent Visa Cost Estimator</h1>
          <p className="text-white/70 text-[0.938rem] mt-3 max-w-xl mx-auto">Get a clear, detailed cost breakdown before you start your application — no hidden fees.</p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 lg:py-16 w-full flex-1">
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Inputs */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-border p-6 sm:p-8 space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-600 uppercase tracking-wider text-muted-foreground">Origin (Nationality)</label>
                <select value={origin} onChange={(e) => setOrigin(e.target.value)} className="w-full mt-1.5 px-4 py-3 rounded-full border border-border bg-white text-sm outline-none focus:border-green">
                  {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-600 uppercase tracking-wider text-muted-foreground">Destination</label>
                <select value={destination} onChange={(e) => setDestination(e.target.value)} className="w-full mt-1.5 px-4 py-3 rounded-full border border-border bg-white text-sm outline-none focus:border-green">
                  {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-600 uppercase tracking-wider text-muted-foreground">Visa Type</label>
              <div className="mt-2 flex flex-wrap gap-2">
                {VISA_TYPES.map((v) => (
                  <button key={v.id} onClick={() => setVisaType(v.id)} className={`px-4 py-2 rounded-full text-sm font-600 ${visaType === v.id ? "bg-navy text-white" : "bg-muted text-muted-foreground hover:bg-border"}`}>{lang === "fr" ? v.label_fr : v.label_en}</button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-600 uppercase tracking-wider text-muted-foreground">Processing Speed</label>
              <div className="mt-2 flex flex-wrap gap-2">
                {URGENCY_OPTIONS.map((u) => (
                  <button key={u.id} onClick={() => setUrgency(u.id)} className={`px-4 py-2 rounded-full text-sm font-600 flex items-center gap-2 ${urgency === u.id ? "bg-green text-white" : "bg-muted text-muted-foreground hover:bg-border"}`}>
                    <Clock className="w-3.5 h-3.5" /> {lang === "fr" ? u.label_fr : u.label_en} · {lang === "fr" ? u.delay_fr : u.delay_en}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-600 uppercase tracking-wider text-muted-foreground flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> Adults</label>
                <div className="mt-1.5 flex items-center gap-3">
                  <button onClick={() => setAdults(Math.max(1, adults - 1))} className="w-10 h-10 rounded-full bg-muted text-navy font-700 hover:bg-border">−</button>
                  <span className="font-display font-700 text-navy text-xl w-8 text-center">{adults}</span>
                  <button onClick={() => setAdults(adults + 1)} className="w-10 h-10 rounded-full bg-muted text-navy font-700 hover:bg-border">+</button>
                </div>
              </div>
              <div>
                <label className="text-xs font-600 uppercase tracking-wider text-muted-foreground flex items-center gap-1.5"><Baby className="w-3.5 h-3.5" /> Children (6–12, 50% off)</label>
                <div className="mt-1.5 flex items-center gap-3">
                  <button onClick={() => setChildren(Math.max(0, children - 1))} className="w-10 h-10 rounded-full bg-muted text-navy font-700 hover:bg-border">−</button>
                  <span className="font-display font-700 text-navy text-xl w-8 text-center">{children}</span>
                  <button onClick={() => setChildren(children + 1)} className="w-10 h-10 rounded-full bg-muted text-navy font-700 hover:bg-border">+</button>
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-600 uppercase tracking-wider text-muted-foreground">Trip Duration (days)</label>
              <input type="range" min={1} max={90} value={days} onChange={(e) => setDays(+e.target.value)} className="w-full mt-2 accent-green" />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>1 day</span>
                <span className="font-600 text-navy">{days} days</span>
                <span>90 days</span>
              </div>
            </div>

            <button onClick={() => setWithInsurance(!withInsurance)} className={`w-full flex items-center gap-3 p-4 rounded-2xl border-2 transition ${withInsurance ? "border-green bg-green/5" : "border-border"}`}>
              <Shield className={`w-5 h-5 ${withInsurance ? "text-green" : "text-muted-foreground"}`} />
              <div className="text-left flex-1">
                <p className="font-600 text-sm text-navy">Add Travel Insurance</p>
                <p className="text-xs text-muted-foreground">{formatPrice(INSURANCE_RATE_PER_DAY, currency)}/day/person · Medical & trip cancellation · {days} days × {adults + children} travelers = {formatPrice(insuranceCost, currency)}</p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${withInsurance ? "bg-green border-green" : "border-border"}`}>
                {withInsurance && <span className="w-2.5 h-2.5 rounded-full bg-white" />}
              </div>
            </button>
          </div>

          {/* Summary */}
          <div className="lg:col-span-2">
            <div className="bg-navy rounded-2xl p-6 sticky top-24">
              <div className="flex items-center gap-3 mb-5">
                {flagUrl(destination, 64) && <img src={flagUrl(destination, 64)} alt="" className="w-12 h-8 rounded object-cover" />}
                <div>
                  <p className="text-white/50 text-xs uppercase tracking-wider">Destination</p>
                  <p className="font-display font-700 text-white">{destination}</p>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <Row label={`Base visa fee (${adults} adult${adults > 1 ? "s" : ""})`} value={formatPrice(baseFee * adults, currency)} />
                {children > 0 && <Row label={`Children (${children} × 50% off)`} value={formatPrice(childFee * children, currency)} />}
                {urgency !== "standard" && <Row label={`${lang === "fr" ? urgencyOpt.label_fr : urgencyOpt.label_en} surcharge`} value={formatPrice(urgencyOpt.surcharge, currency)} />}
                {withInsurance && <Row label={`Travel insurance (${days}d × ${adults + children}p)`} value={formatPrice(insuranceCost, currency)} />}

                {/* Detailed breakdown toggle */}
                <button onClick={() => setShowBreakdown(!showBreakdown)} className="w-full flex items-center justify-between text-xs text-white/50 hover:text-white/80 transition pt-1">
                  <span className="flex items-center gap-1"><Info className="w-3 h-3" /> Detailed breakdown</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showBreakdown ? "rotate-180" : ""}`} />
                </button>
                {showBreakdown && (
                  <div className="bg-white/5 rounded-xl p-3 space-y-2 text-xs">
                    <Row label="Government visa fee" value={formatPrice(visaFeesTotal, currency)} small />
                    <Row label="Service & processing fee" value={formatPrice(serviceMargin, currency)} small />
                    <Row label="Express surcharge" value={formatPrice(urgencyOpt.surcharge, currency)} small />
                    <Row label="Insurance (if selected)" value={formatPrice(insuranceCost, currency)} small />
                  </div>
                )}

                <div className="h-px bg-white/10 my-3" />
                <div className="flex items-center justify-between">
                  <span className="text-white font-600">Estimated Total</span>
                  <span className="font-display font-700 text-green text-2xl">{formatPrice(pricing.total, currency)}</span>
                </div>
              </div>

              <button onClick={() => navigate("/visa-application", { state: { origin, destination, visaType, urgency, adults, children } })} className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-white bg-green hover:bg-green-hover transition">
                Start Application <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-xs text-white/40 mt-3 text-center flex items-center justify-center gap-1.5"><Sparkles className="w-3 h-3" /> Final price confirmed at checkout</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Row({ label, value, small }) {
  return (
    <div className="flex items-center justify-between">
      <span className={small ? "text-white/40" : "text-white/60"}>{label}</span>
      <span className={small ? "text-white/60" : "text-white font-600"}>{value}</span>
    </div>
  );
}