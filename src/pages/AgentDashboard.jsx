import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Lock, Loader2, FileText, Clock, CheckCircle2, XCircle, AlertTriangle, Users, Globe, Award, TrendingUp, Eye, X, Download, BarChart3, DollarSign } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Legend } from "recharts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { base44 } from "@/api/base44Client";
import { flag } from "@/lib/visaData";

const ADMIN_EMAILS = ["webdxb1@gmail.com", "vincentnogue2@gmail.com"];

const STATUS_FLOW = ["submitted", "processing", "review", "issued", "rejected"];

const STATUS_STYLE = {
  submitted: { label: "Submitted", bg: "bg-blue-100", color: "text-blue-700", icon: FileText },
  processing: { label: "Processing", bg: "bg-amber-100", color: "text-amber-700", icon: Clock },
  review: { label: "Under Review", bg: "bg-purple-100", color: "text-purple-700", icon: Eye },
  issued: { label: "Issued", bg: "bg-green-100", color: "text-green-700", icon: CheckCircle2 },
  approved: { label: "Approved", bg: "bg-green-100", color: "text-green-700", icon: CheckCircle2 },
  rejected: { label: "Rejected", bg: "bg-red-100", color: "text-red-700", icon: XCircle },
};

export default function AgentDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [visaApps, setVisaApps] = useState([]);
  const [natApps, setNatApps] = useState([]);
  const [filter, setFilter] = useState("pending");
  const [selected, setSelected] = useState(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    base44.auth.me().then((u) => { setUser(u); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const isAdmin = user && ADMIN_EMAILS.includes(user.email?.toLowerCase());

  useEffect(() => {
    if (isAdmin) loadApps();
  }, [isAdmin]);

  async function loadApps() {
    const [v, n] = await Promise.all([
      base44.entities.VisaApplication.filter({}, "-created_date", 200).catch(() => []),
      base44.entities.NationalityApplication.filter({}, "-created_date", 200).catch(() => []),
    ]);
    setVisaApps(v);
    setNatApps(n);
  }

  const allApps = useMemo(() => {
    const visa = visaApps.map((a) => ({ ...a, _type: "visa", _label: `Visa — ${a.destination_country}`, _dest: a.destination_country }));
    const nat = natApps.map((a) => ({ ...a, _type: "nationality", _label: `Nationality — ${a.program_tier}`, _dest: null }));
    return [...visa, ...nat].sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
  }, [visaApps, natApps]);

  const filtered = allApps.filter((a) => {
    if (filter === "all") return true;
    if (filter === "pending") return ["submitted", "processing", "review"].includes(a.status);
    return a.status === filter;
  });

  const stats = {
    total: allApps.length,
    pending: allApps.filter((a) => ["submitted", "processing", "review"].includes(a.status)).length,
    issued: allApps.filter((a) => a.status === "issued" || a.status === "approved").length,
    rejected: allApps.filter((a) => a.status === "rejected").length,
  };

  // Chart data: applications by destination country
  const countryData = useMemo(() => {
    const counts = {};
    allApps.forEach((a) => {
      const dest = a._dest || (a._type === "nationality" ? "Nationality" : "Unknown");
      counts[dest] = (counts[dest] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([country, count]) => ({ country, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }, [allApps]);

  // Chart data: monthly revenue (based on total_price_usd of paid/issued apps)
  const revenueData = useMemo(() => {
    const months = {};
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = d.toLocaleDateString("en", { month: "short", year: "2-digit" });
      months[key] = { month: key, visa: 0, nationality: 0 };
    }
    allApps.forEach((a) => {
      if (a.status === "issued" || a.status === "approved" || a.status === "review") {
        const d = new Date(a.created_date);
        const key = d.toLocaleDateString("en", { month: "short", year: "2-digit" });
        if (months[key]) {
          const rev = a.total_price_usd || 0;
          if (a._type === "visa") months[key].visa += rev;
          else months[key].nationality += rev;
        }
      }
    });
    return Object.values(months);
  }, [allApps]);

  const totalRevenue = revenueData.reduce((sum, m) => sum + m.visa + m.nationality, 0);

  async function updateStatus(app, newStatus) {
    setUpdating(true);
    try {
      if (app._type === "visa") {
        await base44.entities.VisaApplication.update(app.id, { status: newStatus });
      } else {
        await base44.entities.NationalityApplication.update(app.id, { status: newStatus });
      }
      await loadApps();
      setSelected({ ...app, status: newStatus });
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="text-center max-w-sm">
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4"><Lock className="w-7 h-7 text-red-500" /></div>
            <h1 className="font-display font-700 text-navy text-xl">Access Restricted</h1>
            <p className="text-muted-foreground text-sm mt-2">This dashboard is restricted to authorized agents only.</p>
            <p className="text-xs text-muted-foreground mt-3">If you believe you should have access, please contact the administrator.</p>
            <Link to="/" className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-600 text-navy border border-border hover:bg-muted">Back to home</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 w-full flex-1">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green/10 border border-green/20 text-green text-xs font-700 uppercase tracking-wider"><ShieldCheck className="w-3.5 h-3.5" /> Agent Dashboard</span>
            <h1 className="font-display font-700 text-navy text-2xl mt-3">Application Management</h1>
            <p className="text-muted-foreground text-sm mt-1">Review applications, update statuses, and verify documents.</p>
          </div>
          <Link to="/admin/visa-rules" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-600 text-navy border border-border hover:bg-muted transition">
            <ShieldCheck className="w-4 h-4" /> Visa Rules Engine
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon={FileText} label="Total" value={stats.total} />
          <StatCard icon={Clock} label="Pending" value={stats.pending} color="text-amber-500" />
          <StatCard icon={CheckCircle2} label="Issued / Approved" value={stats.issued} color="text-green" />
          <StatCard icon={XCircle} label="Rejected" value={stats.rejected} color="text-red-500" />
        </div>

        {/* Charts — request volume by country & monthly revenue */}
        <div className="grid lg:grid-cols-2 gap-5 mb-8">
          <div className="bg-white rounded-2xl border border-border p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full bg-green/10 flex items-center justify-center"><BarChart3 className="w-5 h-5 text-green" /></div>
              <div>
                <h3 className="font-display font-600 text-navy text-sm">Applications by Country</h3>
                <p className="text-xs text-muted-foreground">Top 10 destinations by request volume</p>
              </div>
            </div>
            {countryData.length === 0 ? (
              <div className="h-64 flex items-center justify-center text-muted-foreground text-sm">No data yet</div>
            ) : (
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={countryData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="country" tick={{ fontSize: 10, fill: "#666" }} angle={-35} textAnchor="end" height={70} interval={0} />
                  <YAxis tick={{ fontSize: 11, fill: "#666" }} allowDecimals={false} />
                  <Tooltip contentStyle={{ borderRadius: "0.75rem", border: "1px solid #ddd", fontSize: "12px" }} />
                  <Bar dataKey="count" fill="#E5231B" radius={[6, 6, 0, 0]} name="Applications" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-green/10 flex items-center justify-center"><DollarSign className="w-5 h-5 text-green" /></div>
                <div>
                  <h3 className="font-display font-600 text-navy text-sm">Monthly Revenue</h3>
                  <p className="text-xs text-muted-foreground">Last 6 months · Visa vs Nationality</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-display font-700 text-navy text-lg">${totalRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                <p className="text-xs text-muted-foreground">Total</p>
              </div>
            </div>
            {revenueData.every((m) => m.visa === 0 && m.nationality === 0) ? (
              <div className="h-64 flex items-center justify-center text-muted-foreground text-sm">No revenue data yet</div>
            ) : (
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={revenueData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="visaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#E5231B" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#E5231B" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="natGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#111111" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#111111" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#666" }} />
                  <YAxis tick={{ fontSize: 11, fill: "#666" }} tickFormatter={(v) => `$${v >= 1000 ? (v / 1000).toFixed(0) + "k" : v}`} />
                  <Tooltip contentStyle={{ borderRadius: "0.75rem", border: "1px solid #ddd", fontSize: "12px" }} formatter={(v) => `$${v.toLocaleString()}`} />
                  <Legend wrapperStyle={{ fontSize: "12px" }} />
                  <Area type="monotone" dataKey="visa" stroke="#E5231B" fill="url(#visaGrad)" strokeWidth={2} name="Visa Revenue" />
                  <Area type="monotone" dataKey="nationality" stroke="#111111" fill="url(#natGrad)" strokeWidth={2} name="Nationality Revenue" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-6">
          {["pending", "submitted", "processing", "review", "issued", "rejected", "all"].map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-5 py-2 rounded-full text-sm font-600 whitespace-nowrap capitalize ${filter === f ? "bg-navy text-white" : "bg-muted text-muted-foreground hover:bg-border"}`}>{f}</button>
          ))}
        </div>

        {/* Application table */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 rounded-2xl border-2 border-dashed border-border">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No applications in this category.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-border overflow-hidden overflow-x-auto">
            <table className="w-full text-sm min-w-[700px]">
              <thead className="bg-muted text-muted-foreground text-xs uppercase tracking-wider">
                <tr>
                  <th className="text-left px-5 py-3 font-600">Applicant</th>
                  <th className="text-left px-5 py-3 font-600">Type</th>
                  <th className="text-left px-5 py-3 font-600">Destination</th>
                  <th className="text-left px-5 py-3 font-600">Date</th>
                  <th className="text-center px-5 py-3 font-600">Status</th>
                  <th className="text-center px-5 py-3 font-600">Docs</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((a) => {
                  const st = STATUS_STYLE[a.status] || STATUS_STYLE.submitted;
                  return (
                    <tr key={a.id} className="border-t border-border hover:bg-muted/50 cursor-pointer" onClick={() => setSelected(a)}>
                      <td className="px-5 py-4">
                        <p className="font-600 text-navy">{a.contact_name || a.applicant?.first_name || "—"}</p>
                        <p className="text-xs text-muted-foreground">{a.contact_email || a.applicant?.email || ""}</p>
                      </td>
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted text-xs font-600">
                          {a._type === "visa" ? <Globe className="w-3 h-3" /> : <Award className="w-3 h-3" />} {a._type}
                        </span>
                      </td>
                      <td className="px-5 py-4 font-600 text-navy">{a._dest ? <span className="flex items-center gap-1.5">{flag(a._dest)} {a._dest}</span> : a.program_tier}</td>
                      <td className="px-5 py-4 text-muted-foreground text-xs">{new Date(a.created_date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</td>
                      <td className="px-5 py-4 text-center"><span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-700 ${st.bg} ${st.color}`}><st.icon className="w-3 h-3" /> {st.label}</span></td>
                      <td className="px-5 py-4 text-center text-muted-foreground">{a.documents?.length || 0}</td>
                      <td className="px-5 py-4 text-right"><Eye className="w-4 h-4 text-muted-foreground" /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Detail drawer */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-navy/60 backdrop-blur-sm p-0 sm:p-4" onClick={() => setSelected(null)}>
          <div className="bg-white w-full sm:max-w-2xl sm:rounded-3xl rounded-t-3xl shadow-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-border sticky top-0 bg-white z-10">
              <h2 className="font-display font-700 text-navy text-lg">Application Details</h2>
              <button onClick={() => setSelected(null)} className="p-2 rounded-full hover:bg-muted"><X className="w-5 h-5" /></button>
            </div>

            <div className="p-6 space-y-5">
              {/* Applicant info */}
              <div className="grid sm:grid-cols-2 gap-4">
                <InfoBlock label="Applicant" value={selected.contact_name || selected.applicant?.first_name || "—"} />
                <InfoBlock label="Email" value={selected.contact_email || selected.applicant?.email || "—"} />
                <InfoBlock label="Phone" value={selected.contact_phone || selected.applicant?.phone || "—"} />
                <InfoBlock label="Reference" value={selected.id} mono />
                {selected._type === "visa" && (
                  <>
                    <InfoBlock label="Destination" value={`${flag(selected.destination_country)} ${selected.destination_country}`} />
                    <InfoBlock label="Visa Type" value={selected.visa_type} />
                    <InfoBlock label="Travel Purpose" value={selected.travel_purpose} />
                    <InfoBlock label="Urgency" value={selected.urgency} />
                    <InfoBlock label="Adults" value={selected.adults} />
                    <InfoBlock label="Children" value={selected.children} />
                    <InfoBlock label="Departure" value={selected.departure_date ? new Date(selected.departure_date).toLocaleDateString("en-GB") : "—"} />
                    <InfoBlock label="Return" value={selected.return_date ? new Date(selected.return_date).toLocaleDateString("en-GB") : "—"} />
                  </>
                )}
                {selected._type === "nationality" && (
                  <InfoBlock label="Program Tier" value={selected.program_tier} />
                )}
              </div>

              {/* Travelers */}
              {selected.travelers?.length > 0 && (
                <div>
                  <p className="text-xs font-600 uppercase tracking-wider text-muted-foreground mb-2">Travelers ({selected.travelers.length})</p>
                  <div className="space-y-2">
                    {selected.travelers.map((t, i) => (
                      <div key={i} className="p-3 rounded-xl bg-muted text-sm">
                        <p className="font-600 text-navy">{t.first_name} {t.last_name}</p>
                        <p className="text-xs text-muted-foreground">Born: {t.birth_date ? new Date(t.birth_date).toLocaleDateString("en-GB") : "—"} · Passport: {t.passport_number || "—"}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Documents */}
              {selected.documents?.length > 0 && (
                <div>
                  <p className="text-xs font-600 uppercase tracking-wider text-muted-foreground mb-2">Documents ({selected.documents.length})</p>
                  <div className="space-y-2">
                    {selected.documents.map((d, i) => (
                      <a key={i} href={d.url} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 rounded-xl bg-muted hover:bg-border transition">
                        <FileText className="w-5 h-5 text-green shrink-0" />
                        <span className="text-sm font-600 text-navy flex-1 truncate">{d.name || d.type}</span>
                        <Download className="w-4 h-4 text-muted-foreground" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Status update */}
              <div className="pt-4 border-t border-border">
                <p className="text-xs font-600 uppercase tracking-wider text-muted-foreground mb-3">Update Status</p>
                <div className="flex flex-wrap gap-2">
                  {STATUS_FLOW.map((s) => {
                    const st = STATUS_STYLE[s];
                    return (
                      <button key={s} onClick={() => updateStatus(selected, s)} disabled={updating || selected.status === s} className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-600 transition ${selected.status === s ? `${st.bg} ${st.color} ring-2 ring-current` : "bg-muted text-muted-foreground hover:bg-border"} disabled:opacity-50`}>
                        <st.icon className="w-3.5 h-3.5" /> {st.label}
                      </button>
                    );
                  })}
                </div>
                {updating && <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1.5"><Loader2 className="w-3.5 h-3.5 animate-spin" /> Updating...</p>}
              </div>
            </div>
          </div>
        </div>
      )}

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

function InfoBlock({ label, value, mono }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground uppercase tracking-wider">{label}</p>
      <p className={`font-600 text-navy text-sm mt-0.5 ${mono ? "font-mono text-xs" : ""}`}>{value}</p>
    </div>
  );
}