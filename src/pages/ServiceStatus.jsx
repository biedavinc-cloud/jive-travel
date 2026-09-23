import React, { useState, useEffect } from "react";
import { Activity, Clock, CheckCircle2, AlertCircle, Globe, RefreshCw } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CountryFlag from "@/components/CountryFlag";

const REGIONS = [
  { region: "Schengen", iso2: "EU", avg: "3-5 days", status: "operational", load: "normal" },
  { region: "North America", iso2: "US", avg: "7-14 days", status: "operational", load: "high" },
  { region: "United Kingdom", iso2: "GB", avg: "1-3 days", status: "operational", load: "normal" },
  { region: "Middle East", iso2: "AE", avg: "2-4 days", status: "operational", load: "normal" },
  { region: "Asia Pacific", iso2: "JP", avg: "4-7 days", status: "operational", load: "moderate" },
  { region: "Africa", iso2: "ZA", avg: "5-10 days", status: "degraded", load: "high" },
  { region: "South America", iso2: "BR", avg: "5-7 days", status: "operational", load: "normal" },
];

const UPDATES = [
  { date: "2026-09-23", type: "info", title: "Schengen processing accelerated", text: "Average processing time reduced to 3 days for standard applications." },
  { date: "2026-09-20", type: "warning", title: "Africa region delays", text: "Embassy closures in select African countries may add 2-3 days to processing." },
  { date: "2026-09-15", type: "success", title: "New express channel for UK visas", text: "24-hour express processing now available for all UK visa categories." },
  { date: "2026-09-10", type: "info", title: "System maintenance completed", text: "All systems fully operational after scheduled maintenance window." },
];

const STATUS_STYLES = {
  operational: { color: "text-green", bg: "bg-green/10", border: "border-green/30", label: "Operational", icon: CheckCircle2 },
  degraded: { color: "text-amber-500", bg: "bg-amber-50", border: "border-amber-200", label: "Degraded", icon: AlertCircle },
  outage: { color: "text-red-500", bg: "bg-red-50", border: "border-red-200", label: "Outage", icon: AlertCircle },
};

export default function ServiceStatus() {
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setLastUpdate(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  const allOperational = REGIONS.every((r) => r.status === "operational");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <section className="bg-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, #E5231B 0, transparent 40%)" }} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 lg:py-20 relative text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green/15 border border-green/30 text-green text-xs font-600 uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5" /> Service Status
          </span>
          <h1 className="font-display font-700 text-white mt-5" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>System Status & Processing Times</h1>
          <p className="text-white/70 text-[0.938rem] mt-3 max-w-xl mx-auto">Real-time visibility into our processing performance across all regions.</p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 lg:py-16 w-full flex-1">
        {/* Overall status banner */}
        <div className={`rounded-2xl border-2 p-6 mb-8 flex items-center gap-4 ${allOperational ? "bg-green/5 border-green/30" : "bg-amber-50 border-amber-200"}`}>
          <div className={`w-14 h-14 rounded-full flex items-center justify-center ${allOperational ? "bg-green" : "bg-amber-500"}`}>
            <CheckCircle2 className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1">
            <p className="font-display font-700 text-navy text-lg">{allOperational ? "All Systems Operational" : "Partial Degradation"}</p>
            <p className="text-muted-foreground text-sm">Last updated: {lastUpdate.toLocaleTimeString()} · Auto-refreshes every minute</p>
          </div>
          <RefreshCw className="w-5 h-5 text-muted-foreground animate-spin" style={{ animationDuration: "3s" }} />
        </div>

        {/* Region table */}
        <div className="bg-white rounded-2xl border border-border overflow-hidden mb-10">
          <div className="px-6 py-4 border-b border-border flex items-center gap-2">
            <Globe className="w-5 h-5 text-green" />
            <h2 className="font-display font-600 text-navy">Processing Times by Region</h2>
          </div>
          <div className="divide-y divide-border">
            {REGIONS.map((r) => {
              const s = STATUS_STYLES[r.status];
              return (
                <div key={r.region} className="px-6 py-4 flex items-center gap-4 hover:bg-muted/30 transition">
                  <CountryFlag iso2={r.iso2} name={r.region} size={40} />
                  <div className="flex-1 min-w-0">
                    <p className="font-600 text-navy text-sm">{r.region}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" /> Avg: {r.avg}</p>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-700 border ${s.bg} ${s.border} ${s.color}`}>
                    <s.icon className="w-3.5 h-3.5" /> {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Updates feed */}
        <h2 className="font-display font-700 text-navy text-xl mb-5">Recent Updates</h2>
        <div className="space-y-3">
          {UPDATES.map((u, i) => (
            <div key={i} className="bg-white rounded-xl border border-border p-5 flex gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${u.type === "success" ? "bg-green/10" : u.type === "warning" ? "bg-amber-50" : "bg-muted"}`}>
                {u.type === "success" ? <CheckCircle2 className="w-5 h-5 text-green" /> : <AlertCircle className={`w-5 h-5 ${u.type === "warning" ? "text-amber-500" : "text-muted-foreground"}`} />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-600 text-navy text-sm">{u.title}</p>
                  <span className="text-xs text-muted-foreground">· {u.date}</span>
                </div>
                <p className="text-muted-foreground text-sm">{u.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}