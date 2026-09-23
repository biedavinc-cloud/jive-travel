import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FileText, Clock, CheckCircle2, AlertCircle, XCircle, Plane, Globe, ArrowRight, Filter, Search } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { base44 } from "@/api/base44Client";
import { flag } from "@/lib/visaData";
import { formatPrice } from "@/lib/currencies";
import { useCurrency } from "@/lib/CurrencyContext";

const STATUS_CONFIG = {
  submitted: { label: "Submitted", icon: Clock, color: "bg-blue-100 text-blue-700" },
  processing: { label: "Processing", icon: AlertCircle, color: "bg-amber-100 text-amber-700" },
  review: { label: "Expert Review", icon: AlertCircle, color: "bg-purple-100 text-purple-700" },
  issued: { label: "Approved", icon: CheckCircle2, color: "bg-green-100 text-green-700" },
  approved: { label: "Approved", icon: CheckCircle2, color: "bg-green-100 text-green-700" },
  rejected: { label: "Rejected", icon: XCircle, color: "bg-red-100 text-red-700" },
};

export default function MesDemandes() {
  const { currency } = useCurrency();
  const [visas, setVisas] = useState([]);
  const [nationalities, setNationalities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const me = await base44.auth.me();
        const [v, n] = await Promise.all([
          base44.entities.VisaApplication.filter({ created_by_id: me.id }, "-created_date", 50),
          base44.entities.NationalityApplication.filter({ created_by_id: me.id }, "-created_date", 50),
        ]);
        setVisas(v);
        setNationalities(n);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const allDossiers = [
    ...visas.map((v) => ({ id: v.id, type: "visa", label: `Visa — ${v.destination_country}`, destination: v.destination_country, status: v.status, date: v.created_date, amount: v.total_price_usd, currency: v.currency })),
    ...nationalities.map((n) => ({ id: n.id, type: "nationality", label: "Nationality Program", destination: null, status: n.status, date: n.created_date, amount: n.total_price_usd, currency: n.currency })),
  ];

  const filtered = allDossiers.filter((d) => {
    const matchFilter = filter === "all" || d.status === filter || (filter === "active" && ["submitted", "processing", "review"].includes(d.status));
    const matchQuery = !query || d.label.toLowerCase().includes(query.toLowerCase());
    return matchFilter && matchQuery;
  });

  const stats = {
    total: allDossiers.length,
    active: allDossiers.filter((d) => ["submitted", "processing", "review"].includes(d.status)).length,
    approved: allDossiers.filter((d) => ["issued", "approved"].includes(d.status)).length,
    rejected: allDossiers.filter((d) => d.status === "rejected").length,
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 w-full flex-1">
        <h1 className="font-display font-700 text-navy text-2xl">My Applications</h1>
        <p className="text-muted-foreground text-sm mt-1">Track all your visa and nationality applications — past and current.</p>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total" value={stats.total} icon={FileText} color="text-navy" bg="bg-navy/5" />
          <StatCard label="In Progress" value={stats.active} icon={Clock} color="text-amber-600" bg="bg-amber-50" />
          <StatCard label="Approved" value={stats.approved} icon={CheckCircle2} color="text-green-600" bg="bg-green-50" />
          <StatCard label="Rejected" value={stats.rejected} icon={XCircle} color="text-red-600" bg="bg-red-50" />
        </div>

        {/* Filters */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search applications..." className="w-full pl-10 pr-4 py-2.5 rounded-full border border-input bg-white text-sm outline-none focus:ring-2 ring-green" />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {[
              { id: "all", label: "All" },
              { id: "active", label: "In Progress" },
              { id: "issued", label: "Approved" },
              { id: "rejected", label: "Rejected" },
            ].map((f) => (
              <button key={f.id} onClick={() => setFilter(f.id)} className={`px-4 py-2 rounded-full text-sm font-600 whitespace-nowrap transition ${filter === f.id ? "bg-navy text-white" : "bg-muted text-muted-foreground hover:bg-border"}`}>{f.label}</button>
            ))}
          </div>
        </div>

        {/* List */}
        <div className="mt-6 space-y-4">
          {loading ? (
            <div className="text-center py-20 text-muted-foreground">Loading your applications...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-border">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No applications found.</p>
              <Link to="/visa-application" className="mt-4 inline-flex items-center gap-1 text-green font-600">Start a new application <ArrowRight className="w-4 h-4" /></Link>
            </div>
          ) : (
            filtered.map((d) => {
              const cfg = STATUS_CONFIG[d.status] || STATUS_CONFIG.submitted;
              return (
                <div key={d.id} className="bg-white rounded-2xl border border-border p-5 flex items-center gap-4 hover:shadow-md transition">
                  <div className="w-12 h-12 rounded-full bg-navy flex items-center justify-center shrink-0">
                    {d.type === "visa" ? <Plane className="w-6 h-6 text-green" /> : <Globe className="w-6 h-6 text-green" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-600 text-navy truncate">{d.label}</p>
                      {d.destination && <span className="text-lg">{flag(d.destination)}</span>}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{new Date(d.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</p>
                  </div>
                  <div className="text-right hidden sm:block">
                    {d.amount && <p className="font-600 text-navy text-sm">{formatPrice(d.amount, d.currency || currency)}</p>}
                    <p className="text-xs text-muted-foreground capitalize">{d.type}</p>
                  </div>
                  <span className={`px-3 py-1.5 rounded-full text-xs font-600 flex items-center gap-1.5 ${cfg.color}`}>
                    <cfg.icon className="w-3.5 h-3.5" /> {cfg.label}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

function StatCard({ label, value, icon: Icon, color, bg }) {
  return (
    <div className="bg-white rounded-2xl border border-border p-5">
      <div className={`w-10 h-10 rounded-full ${bg} flex items-center justify-center mb-3`}><Icon className={`w-5 h-5 ${color}`} /></div>
      <p className="font-display font-700 text-navy text-2xl">{value}</p>
      <p className="text-muted-foreground text-xs mt-1">{label}</p>
    </div>
  );
}