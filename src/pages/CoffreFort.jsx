import React, { useEffect, useState } from "react";
import { Shield, FileCheck, Download, Trash2, Upload, FileText, Search, Filter, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { base44 } from "@/api/base44Client";
import FileDrop from "@/components/FileDrop";

export default function CoffreFort() {
  const [visas, setVisas] = useState([]);
  const [nationalities, setNationalities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");

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

  const allDocs = [
    ...visas.flatMap((v) => (v.documents || []).map((d) => ({ ...d, app: `Visa — ${v.destination_country}`, date: v.created_date }))),
    ...nationalities.flatMap((n) => (n.documents || []).map((d) => ({ ...d, app: "Nationality Program", date: n.created_date }))),
  ];

  const filtered = allDocs.filter((d) => {
    const matchQuery = !query || d.name?.toLowerCase().includes(query.toLowerCase()) || d.type?.toLowerCase().includes(query.toLowerCase());
    const matchFilter = filter === "all" || d.type === filter;
    return matchQuery && matchFilter;
  });

  const docTypes = [...new Set(allDocs.map((d) => d.type).filter(Boolean))];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 w-full flex-1">
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-green" />
          <h1 className="font-display font-700 text-navy text-2xl">Document Vault</h1>
        </div>
        <p className="text-muted-foreground text-sm mt-1">Download or replace your scanned supporting documents securely.</p>

        {/* Upload zone */}
        <div className="mt-6 bg-white rounded-2xl border border-border p-6">
          <div className="flex items-center gap-2 mb-4">
            <Upload className="w-5 h-5 text-green" />
            <h2 className="font-display font-600 text-navy">Upload New Document</h2>
          </div>
          <FileDrop label="Upload document" value={[]} onChange={() => {}} />
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl border border-border p-5 text-center">
            <FileCheck className="w-6 h-6 text-green mx-auto mb-2" />
            <p className="font-display font-700 text-navy text-2xl">{allDocs.length}</p>
            <p className="text-muted-foreground text-xs mt-1">Total Documents</p>
          </div>
          <div className="bg-white rounded-2xl border border-border p-5 text-center">
            <FileText className="w-6 h-6 text-navy mx-auto mb-2" />
            <p className="font-display font-700 text-navy text-2xl">{docTypes.length}</p>
            <p className="text-muted-foreground text-xs mt-1">Document Types</p>
          </div>
          <div className="bg-white rounded-2xl border border-border p-5 text-center">
            <Shield className="w-6 h-6 text-navy mx-auto mb-2" />
            <p className="font-display font-700 text-navy text-2xl">256-bit</p>
            <p className="text-muted-foreground text-xs mt-1">Encryption</p>
          </div>
        </div>

        {/* Search + filter */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search documents..." className="w-full pl-10 pr-4 py-2.5 rounded-full border border-input bg-white text-sm outline-none focus:ring-2 ring-green" />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <button onClick={() => setFilter("all")} className={`px-4 py-2 rounded-full text-sm font-600 whitespace-nowrap ${filter === "all" ? "bg-navy text-white" : "bg-muted text-muted-foreground hover:bg-border"}`}>All</button>
            {docTypes.map((t) => (
              <button key={t} onClick={() => setFilter(t)} className={`px-4 py-2 rounded-full text-sm font-600 whitespace-nowrap ${filter === t ? "bg-navy text-white" : "bg-muted text-muted-foreground hover:bg-border"}`}>{t}</button>
            ))}
          </div>
        </div>

        {/* Documents list */}
        <div className="mt-6 space-y-3">
          {loading ? (
            <div className="text-center py-20 text-muted-foreground">Loading documents...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-border">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No documents uploaded yet.</p>
            </div>
          ) : (
            filtered.map((doc, i) => (
              <div key={i} className="bg-white rounded-2xl border border-border p-4 flex items-center gap-4 hover:shadow-md transition">
                <div className="w-11 h-11 rounded-full bg-green/10 flex items-center justify-center shrink-0"><FileCheck className="w-5 h-5 text-green" /></div>
                <div className="flex-1 min-w-0">
                  <p className="font-600 text-navy text-sm truncate">{doc.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-muted-foreground">{doc.type}</span>
                    <span className="text-muted-foreground/30">·</span>
                    <span className="text-xs text-muted-foreground">{doc.app}</span>
                  </div>
                </div>
                <span className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground"><Clock className="w-3 h-3" /> {new Date(doc.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                {doc.url && <a href={doc.url} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-navy text-green flex items-center justify-center hover:bg-navy-soft transition"><Download className="w-4 h-4" /></a>}
                <button className="w-9 h-9 rounded-full bg-muted text-muted-foreground flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}