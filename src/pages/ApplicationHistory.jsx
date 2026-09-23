import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { History, Search, FileText, Download, Globe, Award, Clock, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { base44 } from "@/api/base44Client";
import { flag } from "@/lib/visaData";
import { useCurrency } from "@/lib/CurrencyContext";
import { formatPrice } from "@/lib/currencies";

const STATUS_STYLE = {
  submitted: { label: "Submitted", bg: "bg-blue-100", color: "text-blue-700" },
  processing: { label: "Processing", bg: "bg-amber-100", color: "text-amber-700" },
  review: { label: "Under Review", bg: "bg-purple-100", color: "text-purple-700" },
  issued: { label: "Issued", bg: "bg-green-100", color: "text-green-700" },
  approved: { label: "Approved", bg: "bg-green-100", color: "text-green-700" },
  rejected: { label: "Rejected", bg: "bg-red-100", color: "text-red-700" },
};

export default function ApplicationHistory() {
  const { currency } = useCurrency();
  const [visaApps, setVisaApps] = useState([]);
  const [natApps, setNatApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    (async () => {
      try {
        const me = await base44.auth.me();
        const [v, n] = await Promise.all([
          base44.entities.VisaApplication.filter({ created_by_id: me.id }, "-created_date", 100).catch(() => []),
          base44.entities.NationalityApplication.filter({ created_by_id: me.id }, "-created_date", 100).catch(() => []),
        ]);
        setVisaApps(v);
        setNatApps(n);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const all = useMemo(() => {
    const visa = visaApps.map((a) => ({ ...a, _type: "visa", _label: `Visa — ${a.destination_country}`, _dest: a.destination_country, _price: a.total_price_usd }));
    const nat = natApps.map((a) => ({ ...a, _type: "nationality", _label: `Nationality — ${a.program_tier}`, _dest: null, _price: a.total_price_usd }));
    return [...visa, ...nat].sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
  }, [visaApps, natApps]);

  const filtered = all.filter((a) => {
    const matchFilter = filter === "all" || a.status === filter || (filter === "visa" && a._type === "visa") || (filter === "nationality" && a._type === "nationality");
    const matchQuery = !query || a._label.toLowerCase().includes(query.toLowerCase()) || a.id.toLowerCase().includes(query.toLowerCase());
    return matchFilter && matchQuery;
  });

  const counts = {
    total: all.length,
    issued: all.filter((a) => a.status === "issued" || a.status === "approved").length,
    pending: all.filter((a) => ["submitted", "processing", "review"].includes(a.status)).length,
    rejected: all.filter((a) => a.status === "rejected").length,
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <section className="bg-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, #E5231B 0, transparent 40%)" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 lg:py-20 relative">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green/15 border border-green/30 text-green text-xs font-600 uppercase tracking-wider">
            <History className="w-3.5 h-3.5" /> Application History
          </span>
          <h1 className="font-display font-700 text-white mt-5" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>Your Application Archive</h1>
          <p className="text-white/70 text-[0.938rem] mt-3 max-w-2xl">View all past and current visa and nationality applications, their statuses, and download submitted documents.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 w-full flex-1">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon={FileText} label="Total Applications" value={counts.total} />
          <StatCard icon={CheckCircle2} label="Approved / Issued" value={counts.issued} color="text-green" />
          <StatCard icon={Loader2} label="In Progress" value={counts.pending} color="text-amber-500" />
          <StatCard icon={XCircle} label="Rejected" value={counts.rejected} color="text-red-500" />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-5 h-5 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by destination or reference..." className="w-full pl-12 pr-4 py-3 rounded-full border border-border bg-white text-sm outline-none focus:border-gold" />
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {["all", "visa", "nationality", "submitted", "processing", "issued", "rejected"].map((f) => (
              <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-full text-sm font-600 whitespace-nowrap capitalize ${filter === f ? "bg-navy text-white" : "bg-muted text-muted-foreground hover:bg-border"}`}>{f}</button>
            ))}
          </div>
        </div>

        {/* List */}
        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-muted-foreground" /></div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 rounded-2xl border-2 border-dashed border-border">
            <History className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No applications found.</p>
            <Link to="/visa-application" className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-green hover:bg-green-hover">Start a new application</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((a) => (
              <div key={a.id} className="bg-white rounded-2xl border border-border p-5 hover:shadow-md transition">
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="w-12 h-12 rounded-full bg-navy flex items-center justify-center shrink-0">
                    {a._type === "visa" ? <Globe className="w-6 h-6 text-green" /> : <Award className="w-6 h-6 text-green" />}
                  </div>
                  <div className="flex-1 min-w-[180px]">
                    <p className="font-600 text-navy text-sm flex items-center gap-2">
                      {a._type === "visa" && <span className="text-lg">{flag(a._dest)}</span>} {a._label}
                    </p>
                    <p className="text-xs text-muted-foreground font-mono mt-0.5">Ref: {a.id.slice(0, 12)}…</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">{new Date(a.created_date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</p>
                    {a._price != null && <p className="font-600 text-navy text-sm">{formatPrice(a._price, currency)}</p>}
                  </div>
                  <span className={`px-3 py-1.5 rounded-full text-xs font-700 ${STATUS_STYLE[a.status]?.bg || "bg-muted"} ${STATUS_STYLE[a.status]?.color || "text-muted-foreground"}`}>
                    {STATUS_STYLE[a.status]?.label || a.status}
                  </span>
                  {a.documents?.length > 0 && (
                    <a href={a.documents[0]?.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-600 text-navy border border-border hover:bg-muted transition">
                      <Download className="w-4 h-4" /> {a.documents.length} doc{a.documents.length > 1 ? "s" : ""}
                    </a>
                  )}
                  <Link to="/dashboard" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-600 text-white bg-navy hover:bg-navy-soft transition">View</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color = "text-navy" }) {
  return (
    <div className="bg-white rounded-2xl border border-border p-5">
      <Icon className={`w-6 h-6 ${color} mb-2`} />
      <p className="font-display font-700 text-2xl text-navy">{value}</p>
      <p className="text-xs text-muted-foreground uppercase tracking-wider mt-0.5">{label}</p>
    </div>
  );
}