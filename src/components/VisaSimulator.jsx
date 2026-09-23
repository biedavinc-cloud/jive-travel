import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Minus, Plus, ArrowRight, Globe2, MapPin } from "lucide-react";
import { COUNTRIES, VISA_TYPES, URGENCY_OPTIONS, computeVisaTotal, flag } from "@/lib/visaData";
import { formatPrice } from "@/lib/currencies";
import { useCurrency } from "@/lib/CurrencyContext";
import { useLanguage } from "@/lib/LanguageContext";

export default function VisaSimulator() {
  const navigate = useNavigate();
  const { currency } = useCurrency();
  const { lang, t } = useLanguage();
  const [origin, setOrigin] = useState("France");
  const [destination, setDestination] = useState("United States");
  const [visaType, setVisaType] = useState("tourism");
  const [urgency, setUrgency] = useState("standard");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const { total } = useMemo(
    () => computeVisaTotal({ destination, visaType, urgencyId: urgency, adults, children, withInsurance: false }),
    [destination, visaType, urgency, adults, children]
  );

  const lbl = (obj) => (lang === "fr" ? obj.label_fr : obj.label_en);

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-7 border border-border">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-10 h-10 rounded-xl bg-navy flex items-center justify-center">
          <Globe2 className="w-5 h-5 text-gold" />
        </div>
        <div>
          <h3 className="font-display font-600 text-navy text-lg leading-tight">{lang === "fr" ? "Simulateur de Visa" : "Visa Quote"}</h3>
          <p className="text-xs text-muted-foreground">{lang === "fr" ? "Tarif instantané, toutes taxes comprises" : "Instant price, all taxes included"}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-[0.75rem] font-600 uppercase tracking-wider text-muted-foreground">{t("visa.origin")}</label>
          <div className="relative mt-1">
            <MapPin className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <select value={origin} onChange={(e) => setOrigin(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-input bg-white text-sm font-medium focus:ring-2 ring-gold outline-none">
              {COUNTRIES.map((c) => <option key={c} value={c}>{flag(c)} {c}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="text-[0.75rem] font-600 uppercase tracking-wider text-muted-foreground">{t("visa.destination")}</label>
          <div className="relative mt-1">
            <MapPin className="w-4 h-4 text-gold absolute left-3 top-1/2 -translate-y-1/2" />
            <select value={destination} onChange={(e) => setDestination(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-input bg-white text-sm font-medium focus:ring-2 ring-gold outline-none">
              {COUNTRIES.map((c) => <option key={c} value={c}>{flag(c)} {c}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="text-[0.75rem] font-600 uppercase tracking-wider text-muted-foreground">{t("visa.reason")}</label>
          <div className="flex flex-wrap gap-2 mt-1.5">
            {VISA_TYPES.map((v) => (
              <button key={v.id} onClick={() => setVisaType(v.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-600 transition ${visaType === v.id ? "bg-navy text-white" : "bg-muted text-muted-foreground hover:bg-border"}`}>
                {lbl(v)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-[0.75rem] font-600 uppercase tracking-wider text-muted-foreground">{t("visa.urgency")}</label>
          <div className="flex flex-wrap gap-2 mt-1.5">
            {URGENCY_OPTIONS.map((u) => (
              <button key={u.id} onClick={() => setUrgency(u.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-600 transition ${urgency === u.id ? "bg-gold text-white" : "bg-muted text-muted-foreground hover:bg-border"}`}>
                {lbl(u)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Counter label={t("visa.adults")} value={adults} setValue={setAdults} min={1} />
          <Counter label={t("visa.children")} value={children} setValue={setChildren} min={0} />
        </div>

        <div className="pt-3 border-t border-border">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-[0.75rem] font-600 uppercase tracking-wider text-muted-foreground">{lang === "fr" ? "Total estimé" : "Estimated total"}</p>
              <p className="font-display font-700 text-3xl text-navy mt-0.5">{formatPrice(total, currency)}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{adults + children} {lang === "fr" ? "voyageur(s)" : "traveler(s)"} · {currency}</p>
            </div>
            <button
              onClick={() => navigate("/visa-application", { state: { origin, destination, visaType, adults, children, urgency } })}
              className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full bg-gold text-white font-semibold text-sm hover:bg-gold-hover transition gold-glow-hover"
            >
              {t("cta.start")} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Counter({ label, value, setValue, min }) {
  return (
    <div>
      <label className="text-[0.75rem] font-600 uppercase tracking-wider text-muted-foreground">{label}</label>
      <div className="flex items-center justify-between mt-1.5 border border-input rounded-full px-2 py-1.5">
        <button onClick={() => setValue(Math.max(min, value - 1))} className="w-7 h-7 rounded-full bg-muted hover:bg-border flex items-center justify-center"><Minus className="w-3.5 h-3.5" /></button>
        <span className="font-semibold text-navy">{value}</span>
        <button onClick={() => setValue(value + 1)} className="w-7 h-7 rounded-full bg-muted hover:bg-border flex items-center justify-center"><Plus className="w-3.5 h-3.5" /></button>
      </div>
    </div>
  );
}