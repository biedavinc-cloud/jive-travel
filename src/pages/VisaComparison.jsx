import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { GitCompare, Plus, X, ArrowRight, Clock, DollarSign, FileText, Globe } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { COUNTRIES, getBaseVisaPrice, applyCommission } from "@/lib/visaData";
import { getVisaStatus, getProcessingInfo, getGovernmentFee, getDocumentChecklist } from "@/lib/visaRules";
import { formatPrice } from "@/lib/currencies";
import { useCurrency } from "@/lib/CurrencyContext";
import CountryFlag from "@/components/CountryFlag";
import { COUNTRIES_DATA } from "@/lib/worldCountries";

const COUNTRY_LOOKUP = Object.fromEntries(COUNTRIES_DATA.map((c) => [c.name, c.iso2]));

export default function VisaComparison() {
  const navigate = useNavigate();
  const { currency } = useCurrency();
  const [nationality, setNationality] = useState("France");
  const [selected, setSelected] = useState(["United States", "United Kingdom", "Canada"]);
  const [picker, setPicker] = useState("");

  const comparisons = useMemo(() => {
    return selected.map((dest) => {
      const status = getVisaStatus(nationality, dest);
      const processing = getProcessingInfo(dest, status);
      const govFee = getGovernmentFee(dest);
      const serviceFee = applyCommission(getBaseVisaPrice(dest, "tourism"));
      const checklist = getDocumentChecklist(dest, "tourism", status);
      return { dest, status, processing, govFee, serviceFee, checklist, total: serviceFee + govFee };
    });
  }, [nationality, selected]);

  function addCountry(c) {
    if (c && !selected.includes(c)) setSelected([...selected, c]);
    setPicker("");
  }

  function removeCountry(c) {
    setSelected(selected.filter((s) => s !== c));
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <section className="bg-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, #E5231B 0, transparent 40%)" }} />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 lg:py-20 relative text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green/15 border border-green/30 text-green text-xs font-600 uppercase tracking-wider">
            <GitCompare className="w-3.5 h-3.5" /> Visa Comparison
          </span>
          <h1 className="font-display font-700 text-white mt-5" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>Compare Destinations Side-by-Side</h1>
          <p className="text-white/70 text-[0.938rem] mt-3 max-w-xl mx-auto">Select multiple countries to compare visa requirements, processing times, and costs at a glance.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16 w-full flex-1">
        {/* Nationality + add country */}
        <div className="bg-white rounded-2xl border border-border p-5 sm:p-6 mb-8 flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="text-xs font-600 uppercase tracking-wider text-muted-foreground">Your Nationality</label>
            <select value={nationality} onChange={(e) => setNationality(e.target.value)} className="w-full mt-1.5 px-4 py-2.5 rounded-full border border-border bg-white text-sm outline-none focus:border-gold">
              {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="text-xs font-600 uppercase tracking-wider text-muted-foreground">Add Destination</label>
            <div className="mt-1.5 flex gap-2">
              <select value={picker} onChange={(e) => setPicker(e.target.value)} className="flex-1 px-4 py-2.5 rounded-full border border-border bg-white text-sm outline-none focus:border-gold">
                <option value="">Select a country…</option>
                {COUNTRIES.filter((c) => !selected.includes(c)).map((c) => <option key={c}>{c}</option>)}
              </select>
              <button onClick={() => addCountry(picker)} disabled={!picker} className="inline-flex items-center gap-1 px-4 py-2.5 rounded-full text-sm font-600 text-white bg-green hover:bg-green-hover disabled:opacity-40">
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>
          </div>
        </div>

        {selected.length === 0 ? (
          <div className="text-center py-20 rounded-2xl border-2 border-dashed border-border">
            <Globe className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Add destinations above to start comparing.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <div className="flex gap-5 min-w-max pb-4">
              {comparisons.map((c) => (
                <div key={c.dest} className="w-[300px] bg-white rounded-2xl border border-border overflow-hidden flex flex-col">
                  {/* Header */}
                  <div className="relative h-28 bg-navy flex items-center justify-center overflow-hidden">
                    {COUNTRY_LOOKUP[c.dest] && (
                      <img src={`https://flagcdn.com/${COUNTRY_LOOKUP[c.dest].toLowerCase()}.svg`} alt="" className="absolute inset-0 w-full h-full object-cover opacity-25" />
                    )}
                    <div className="relative text-center z-10">
                      <div className="flex justify-center mb-1.5">
                        <CountryFlag iso2={COUNTRY_LOOKUP[c.dest]} name={c.dest} size={56} className="ring-2 ring-white/40 shadow-lg" />
                      </div>
                      <p className="font-display font-700 text-white text-sm">{c.dest}</p>
                    </div>
                    <button onClick={() => removeCountry(c.dest)} className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white z-20">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-5 space-y-4 flex-1">
                    {/* Visa status */}
                    <div>
                      <p className="text-xs font-600 uppercase tracking-wider text-muted-foreground mb-1.5">Visa Status</p>
                      <span className={`inline-flex px-3 py-1.5 rounded-full text-xs font-700 ${c.status.bg} ${c.status.color} ${c.status.border} border`}>{c.status.label}</span>
                    </div>

                    {/* Processing */}
                    <div>
                      <p className="text-xs font-600 uppercase tracking-wider text-muted-foreground mb-1.5 flex items-center gap-1"><Clock className="w-3 h-3" /> Processing Time</p>
                      <p className="text-sm font-600 text-navy">{c.processing.standard}</p>
                      {c.processing.express !== "—" && <p className="text-xs text-muted-foreground">Express: {c.processing.express}</p>}
                    </div>

                    {/* Fees */}
                    <div>
                      <p className="text-xs font-600 uppercase tracking-wider text-muted-foreground mb-1.5 flex items-center gap-1"><DollarSign className="w-3 h-3" /> Fees</p>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between"><span className="text-muted-foreground">Gov. fee</span><span className="font-600 text-navy">{formatPrice(c.govFee, currency)}</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Service fee</span><span className="font-600 text-navy">{formatPrice(c.serviceFee, currency)}</span></div>
                        <div className="flex justify-between pt-1 border-t border-border"><span className="font-600 text-navy">Total</span><span className="font-700 text-green">{formatPrice(c.total, currency)}</span></div>
                      </div>
                    </div>

                    {/* Documents */}
                    <div>
                      <p className="text-xs font-600 uppercase tracking-wider text-muted-foreground mb-1.5 flex items-center gap-1"><FileText className="w-3 h-3" /> Documents Required</p>
                      <p className="text-sm font-600 text-navy">{c.checklist.required.length} required · {c.checklist.conditional.length} conditional</p>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <button onClick={() => navigate("/visa-application", { state: { origin: nationality, destination: c.dest } })} className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-full text-sm font-semibold text-white bg-green hover:bg-green-hover transition">
                      Apply <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}