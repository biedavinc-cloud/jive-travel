import React, { useState, useMemo } from "react";
import { Calculator, Plus, X, Trash2, ArrowRight, DollarSign } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CountryFlag from "@/components/CountryFlag";
import { COUNTRIES_DATA } from "@/lib/worldCountries";
import { getBaseVisaPrice, applyCommission } from "@/lib/visaData";
import { formatPrice } from "@/lib/currencies";
import { useCurrency } from "@/lib/CurrencyContext";
import { Link } from "react-router-dom";

const URGENCY_OPTIONS = [
  { id: "standard", label: "Standard", multiplier: 1 },
  { id: "express", label: "Express (+40%)", multiplier: 1.4 },
  { id: "urgent", label: "Urgent (+70%)", multiplier: 1.7 },
];

export default function TravelCalculator() {
  const { currency } = useCurrency();
  const [stops, setStops] = useState([
    { country: "", adults: 1, children: 0, urgency: "standard" },
  ]);

  function addStop() {
    setStops([...stops, { country: "", adults: 1, children: 0, urgency: "standard" }]);
  }
  function removeStop(i) {
    setStops(stops.filter((_, idx) => idx !== i));
  }
  function updateStop(i, field, value) {
    setStops(stops.map((s, idx) => idx === i ? { ...s, [field]: value } : s));
  }

  const totals = useMemo(() => {
    return stops.map((s) => {
      if (!s.country) return { subtotal: 0, adultFee: 0, childFee: 0 };
      const base = getBaseVisaPrice(s.country, "tourism") || 80;
      const adultFee = applyCommission(base) * URGENCY_OPTIONS.find((u) => u.id === s.urgency).multiplier;
      const childFee = applyCommission(base * 0.5) * URGENCY_OPTIONS.find((u) => u.id === s.urgency).multiplier;
      return { subtotal: adultFee * s.adults + childFee * s.children, adultFee, childFee };
    });
  }, [stops]);

  const grandTotal = totals.reduce((sum, t) => sum + t.subtotal, 0);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <section className="bg-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, #E5231B 0, transparent 40%)" }} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 lg:py-20 relative text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green/15 border border-green/30 text-green text-xs font-600 uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" /> Travel Calculator
          </span>
          <h1 className="font-display font-700 text-white mt-5" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>Multi-Country Visa Cost Calculator</h1>
          <p className="text-white/70 text-[0.938rem] mt-3 max-w-xl mx-auto">Plan complex itineraries with multiple destinations and calculate total visa costs instantly.</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 w-full flex-1">
        {/* Stops */}
        <div className="space-y-4 mb-6">
          {stops.map((stop, i) => {
            const country = COUNTRIES_DATA.find((c) => c.name === stop.country);
            return (
              <div key={i} className="bg-white rounded-2xl border border-border p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-navy text-green font-700 flex items-center justify-center text-sm">{i + 1}</span>
                    {country && <CountryFlag iso2={country.iso2} name={country.name} size={32} />}
                    <span className="font-600 text-navy text-sm">{stop.country || "Select destination"}</span>
                  </div>
                  {stops.length > 1 && (
                    <button onClick={() => removeStop(i)} className="w-8 h-8 rounded-full text-muted-foreground hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="grid sm:grid-cols-4 gap-3">
                  <div className="sm:col-span-2">
                    <label className="text-xs font-600 uppercase tracking-wider text-muted-foreground">Country</label>
                    <select value={stop.country} onChange={(e) => updateStop(i, "country", e.target.value)}
                      className="w-full mt-1.5 px-3 py-2.5 rounded-full border border-border bg-white text-sm outline-none focus:border-green">
                      <option value="">Select…</option>
                      {COUNTRIES_DATA.map((c) => <option key={c.iso2} value={c.name}>{c.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-600 uppercase tracking-wider text-muted-foreground">Adults</label>
                    <input type="number" min="0" value={stop.adults} onChange={(e) => updateStop(i, "adults", parseInt(e.target.value) || 0)}
                      className="w-full mt-1.5 px-3 py-2.5 rounded-full border border-border bg-white text-sm outline-none focus:border-green" />
                  </div>
                  <div>
                    <label className="text-xs font-600 uppercase tracking-wider text-muted-foreground">Children</label>
                    <input type="number" min="0" value={stop.children} onChange={(e) => updateStop(i, "children", parseInt(e.target.value) || 0)}
                      className="w-full mt-1.5 px-3 py-2.5 rounded-full border border-border bg-white text-sm outline-none focus:border-green" />
                  </div>
                </div>
                <div className="mt-3">
                  <label className="text-xs font-600 uppercase tracking-wider text-muted-foreground">Processing Speed</label>
                  <div className="grid grid-cols-3 gap-2 mt-1.5">
                    {URGENCY_OPTIONS.map((u) => (
                      <button key={u.id} onClick={() => updateStop(i, "urgency", u.id)}
                        className={`px-3 py-2 rounded-full text-xs font-600 border-2 transition ${stop.urgency === u.id ? "border-green bg-green/10 text-green" : "border-border text-muted-foreground"}`}>
                        {u.label}
                      </button>
                    ))}
                  </div>
                </div>
                {stop.country && (
                  <div className="mt-3 pt-3 border-t border-border flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal for this stop</span>
                    <span className="font-700 text-green">{formatPrice(totals[i].subtotal, currency)}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <button onClick={addStop} className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full border-2 border-dashed border-border text-muted-foreground hover:border-green hover:text-green transition mb-8">
          <Plus className="w-4 h-4" /> Add Another Destination
        </button>

        {/* Grand total */}
        <div className="bg-navy rounded-2xl p-6 sm:p-8 text-center">
          <p className="text-white/60 text-sm uppercase tracking-wider mb-2">Total Estimated Visa Cost</p>
          <p className="font-display font-700 text-green text-4xl sm:text-5xl">{formatPrice(grandTotal, currency)}</p>
          <p className="text-white/50 text-xs mt-3">{stops.filter((s) => s.country).length} destination(s) · {stops.reduce((s, st) => s + st.adults + st.children, 0)} traveler(s)</p>
          <Link to="/visa-application" state={{ destination: stops.find((s) => s.country)?.country }}
            className="mt-6 inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-navy bg-green hover:bg-green-hover transition">
            Start Applications <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}