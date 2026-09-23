import React, { useState, useEffect } from "react";
import { FileText, Download, Trash2, Folder, FileCheck, Search } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FileDrop from "@/components/FileDrop";
import { base44 } from "@/api/base44Client";

const CATEGORIES = [
  { id: "passport", label: "Passports", icon: FileText },
  { id: "visa", label: "Visas", icon: FileCheck },
  { id: "financial", label: "Financial", icon: FileText },
  { id: "personal", label: "Personal", icon: Folder },
  { id: "other", label: "Other", icon: Folder },
];

export default function MyDocuments() {
  const [docs, setDocs] = useState([]);
  const [myDocs, setMyDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("passport");
  const [search, setSearch] = useState("");
  const [uploadCat, setUploadCat] = useState("passport");

  useEffect(() => {
    async function load() {
      try {
        const user = await base44.auth.me();
        const apps = await base44.entities.VisaApplication.filter({ created_by_id: user.id });
        const allDocs = [];
        apps.forEach((app) => {
          (app.documents || []).forEach((d) => allDocs.push({ ...d, app: app.destination_country, date: app.updated_date }));
        });
        setDocs(allDocs);
        if (user.my_documents) setMyDocs(user.my_documents);
      } catch (e) {
        setDocs([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function handleUpload(uploaded) {
    const tagged = uploaded.map((d) => ({ ...d, category: uploadCat }));
    const updated = [...myDocs.filter((d) => d.category !== uploadCat), ...tagged];
    setMyDocs(updated);
    try { await base44.auth.updateMe({ my_documents: updated }); } catch (e) { console.error(e); }
  }

  async function handleDelete(doc) {
    const updated = myDocs.filter((d) => d.url !== doc.url);
    setMyDocs(updated);
    try { await base44.auth.updateMe({ my_documents: updated }); } catch (e) { console.error(e); }
  }

  const allDocs = [...docs, ...myDocs];
  const filtered = allDocs.filter((d) => {
    if (d.category && d.category !== category) return false;
    if (search && !d.name?.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <section className="bg-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, #E5231B 0, transparent 40%)" }} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 lg:py-20 relative text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green/15 border border-green/30 text-green text-xs font-600 uppercase tracking-wider">
            <Folder className="w-3.5 h-3.5" /> My Documents
          </span>
          <h1 className="font-display font-700 text-white mt-5" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>Document Management</h1>
          <p className="text-white/70 text-[0.938rem] mt-3 max-w-xl mx-auto">Upload, organize, and download your essential travel identification and visa paperwork.</p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 w-full flex-1">
        {/* Upload zone */}
        <div className="bg-white rounded-2xl border border-border p-5 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <label className="text-xs font-600 uppercase tracking-wider text-muted-foreground">Upload to:</label>
            <select value={uploadCat} onChange={(e) => setUploadCat(e.target.value)}
              className="px-3 py-1.5 rounded-full border border-border bg-white text-sm outline-none focus:border-green">
              {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
            </select>
          </div>
          <FileDrop label={CATEGORIES.find((c) => c.id === uploadCat)?.label} value={myDocs.filter((d) => d.category === uploadCat)} onChange={handleUpload} />
        </div>

        {/* Category tabs */}
        <div className="flex items-center gap-2 mb-5 overflow-x-auto no-scrollbar pb-1">
          {CATEGORIES.map((c) => (
            <button key={c.id} onClick={() => setCategory(c.id)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-600 border-2 transition whitespace-nowrap ${category === c.id ? "border-green bg-green/10 text-green" : "border-border text-muted-foreground"}`}>
              <c.icon className="w-4 h-4" /> {c.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative mb-5">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search documents..."
            className="w-full pl-11 pr-4 py-2.5 rounded-full border border-border bg-white text-sm outline-none focus:border-green" />
        </div>

        {/* Documents */}
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => <div key={i} className="h-16 rounded-xl bg-muted animate-pulse" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 rounded-2xl border-2 border-dashed border-border">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No documents in this category yet.</p>
            <p className="text-xs text-muted-foreground mt-1">Upload your documents above to get started.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((d, i) => (
              <div key={i} className="bg-white rounded-xl border border-border p-4 flex items-center gap-3 hover:shadow-sm transition">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-600 text-navy text-sm truncate">{d.name}</p>
                  <p className="text-xs text-muted-foreground">{d.app ? `From ${d.app} application` : d.category ? `Uploaded by you` : "Uploaded document"}</p>
                </div>
                <a href={d.url} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-green hover:bg-green/10 transition">
                  <Download className="w-4 h-4" />
                </a>
                {d.category && (
                  <button onClick={() => handleDelete(d)} className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-red-500 hover:bg-red-50 transition">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}