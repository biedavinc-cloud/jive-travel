import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Coins, CheckCircle2, ArrowRight, Globe } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCurrency } from "@/lib/CurrencyContext";
import { CURRENCIES } from "@/lib/currencies";

export default function CurrencySettings() {
  const { currency, setCurrency } = useCurrency();
  const [saved, setSaved] = useState(false);

  function handleSelect(code) {
    setCurrency(code);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <section className="bg-navy py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green/15 border border-green/30 text-green text-xs font-700 uppercase tracking-wider mb-5">
            <Coins className="w-3.5 h-3.5" /> Currency Preferences
          </span>
          <h1 className="font-display font-700 text-white" style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)" }}>Currency Settings</h1>
          <p className="text-white/60 mt-4 max-w-2xl mx-auto">Choose your default currency for all prices displayed across the platform. Prices update instantly everywhere.</p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12 flex-1 w-full">
        {saved && (
          <div className="mb-6 flex items-center gap-2 px-5 py-3 rounded-full bg-green/10 border border-green/20 text-green text-sm font-600 animate-fade-in">
            <CheckCircle2 className="w-4 h-4" /> Currency preference saved!
          </div>
        )}

        <div className="bg-white rounded-2xl border border-border p-6 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-green/10 flex items-center justify-center"><Globe className="w-5 h-5 text-green" /></div>
            <div>
              <h2 className="font-display font-600 text-navy">Current Currency</h2>
              <p className="text-muted-foreground text-sm">Your selected currency is applied to all prices on the site.</p>
            </div>
          </div>
          <div className="mt-4 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-green text-white font-700">
            {CURRENCIES[currency]?.symbol} {currency} — {CURRENCIES[currency]?.name}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {Object.entries(CURRENCIES).map(([code, c]) => (
            <button
              key={code}
              onClick={() => handleSelect(code)}
              className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition text-left ${currency === code ? "border-green bg-green/5" : "border-border bg-white hover:border-green/40"}`}
            >
              <span className="text-2xl font-display font-700 text-navy w-8 text-center">{c.symbol}</span>
              <div className="flex-1">
                <p className="font-600 text-navy text-sm">{code}</p>
                <p className="text-muted-foreground text-xs">{c.name}</p>
              </div>
              {currency === code && <CheckCircle2 className="w-5 h-5 text-green shrink-0" />}
            </button>
          ))}
        </div>

        <div className="mt-8 bg-muted rounded-2xl p-6">
          <h3 className="font-600 text-navy text-sm mb-2">How Currency Conversion Works</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">All base prices are set in USD and converted to your selected currency using real-time exchange rates. The conversion is applied automatically across the entire platform — visa fees, nationality programs, insurance, and add-ons.</p>
          <p className="text-muted-foreground text-xs mt-3">Note: Exchange rates are updated periodically. Final payment amounts may vary slightly at checkout due to rate fluctuations and payment processor fees.</p>
        </div>

        <div className="mt-8 text-center">
          <Link to="/visa-application" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-green hover:bg-green-hover transition">
            Browse Visa Prices <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}