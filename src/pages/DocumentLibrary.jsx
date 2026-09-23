import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FileText, Search, Download, FileCheck, Mail, Plane, ShieldCheck, FileSignature, BookOpen, Users, Briefcase, GraduationCap, Heart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CATEGORIES = [
  { id: "all", label: "All Templates" },
  { id: "checklist", label: "Checklists" },
  { id: "letters", label: "Invitation Letters" },
  { id: "forms", label: "Application Forms" },
  { id: "financial", label: "Financial Proof" },
  { id: "travel", label: "Travel Documents" },
];

const TEMPLATES = [
  { id: 1, category: "checklist", title: "Schengen Visa Document Checklist", desc: "Complete checklist of all documents needed for a Schengen short-stay visa application.", icon: FileCheck, type: "PDF", size: "245 KB" },
  { id: 2, category: "checklist", title: "US B1/B2 Visa Checklist", desc: "Step-by-step document checklist for US business/tourist visa applications.", icon: FileCheck, type: "PDF", size: "180 KB" },
  { id: 3, category: "checklist", title: "UK Standard Visitor Checklist", desc: "All required documents for a UK Standard Visitor Visa application.", icon: FileCheck, type: "PDF", size: "210 KB" },
  { id: 4, category: "letters", title: "Business Invitation Letter Template", desc: "Professional template for a business invitation letter from a host company.", icon: Mail, type: "DOCX", size: "32 KB" },
  { id: 5, category: "letters", title: "Family Invitation Letter Template", desc: "Template for a family member invitation letter with sponsorship declaration.", icon: Mail, type: "DOCX", size: "28 KB" },
  { id: 6, category: "letters", title: "Employer No-Objection Letter", desc: "Template for an employer letter confirming employment and approved leave.", icon: Briefcase, type: "DOCX", size: "35 KB" },
  { id: 7, category: "forms", title: "Schengen Visa Application Form (Sample)", desc: "Filled sample of the Schengen visa application form for reference.", icon: FileText, type: "PDF", size: "420 KB" },
  { id: 8, category: "forms", title: "US DS-160 Form Guide", desc: "Step-by-step guide to filling out the US DS-160 online application form.", icon: FileText, type: "PDF", size: "380 KB" },
  { id: 9, category: "financial", title: "Bank Statement Cover Letter", desc: "Template letter explaining your financial situation and source of funds.", icon: ShieldCheck, type: "DOCX", size: "25 KB" },
  { id: 10, category: "financial", title: "Sponsorship Declaration Template", desc: "Legal sponsorship declaration for when a third party funds your trip.", icon: Users, type: "DOCX", size: "30 KB" },
  { id: 11, category: "travel", title: "Flight Itinerary Template", desc: "Template for presenting your flight reservation to the embassy.", icon: Plane, type: "PDF", size: "150 KB" },
  { id: 12, category: "travel", title: "Hotel Reservation Letter", desc: "Template letter confirming your hotel booking for the visa application.", icon: FileSignature, type: "DOCX", size: "22 KB" },
  { id: 13, category: "travel", title: "Travel Insurance Declaration", desc: "Declaration template for travel medical insurance coverage.", icon: ShieldCheck, type: "PDF", size: "190 KB" },
  { id: 14, category: "checklist", title: "Student Visa Document Checklist", desc: "Complete checklist for student visa applications worldwide.", icon: GraduationCap, type: "PDF", size: "260 KB" },
  { id: 15, category: "checklist", title: "Work Visa Document Checklist", desc: "All documents needed for employer-sponsored work visa applications.", icon: Briefcase, type: "PDF", size: "240 KB" },
  { id: 16, category: "letters", title: "Medical Treatment Invitation Letter", desc: "Template for a hospital/clinic invitation letter for medical visas.", icon: Heart, type: "DOCX", size: "27 KB" },
];

export default function DocumentLibrary() {
  const [active, setActive] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = TEMPLATES.filter((t) => {
    const matchCat = active === "all" || t.category === active;
    const matchQuery = !query || t.title.toLowerCase().includes(query.toLowerCase()) || t.desc.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQuery;
  });

  function download(t) {
    const content = `TREK VISA — ${t.title}\n\n${t.desc}\n\nThis is a template document. Please customize it with your specific information before submitting.\n\n--- TEMPLATE CONTENT ---\n\n[Your Full Name]\n[Your Address]\n[City, Country]\n[Date]\n\n[Embassy/Consulate Name]\n[Address]\n\nSubject: ${t.title}\n\nDear Sir/Madam,\n\n[Insert your content here — this template is a starting point. Please adapt it to your specific situation and ensure all information is accurate.]\n\nYours faithfully,\n\n[Your Signature]\n[Your Printed Name]`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${t.title.replace(/\s+/g, "-").toLowerCase()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <section className="bg-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, #E5231B 0, transparent 40%)" }} />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 lg:py-20 relative text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green/15 border border-green/30 text-green text-xs font-600 uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" /> Document Library
          </span>
          <h1 className="font-display font-700 text-white mt-5" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>Downloadable Templates & Resources</h1>
          <p className="text-white/70 text-[0.938rem] mt-3 max-w-xl mx-auto">Access ready-to-use templates for invitation letters, checklists, and common visa application documents.</p>

          <div className="mt-7 relative max-w-xl mx-auto">
            <Search className="w-5 h-5 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search templates..." className="w-full pl-12 pr-4 py-3.5 rounded-full bg-white text-foreground text-sm outline-none border-0" />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 w-full flex-1">
        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-8">
          {CATEGORIES.map((c) => (
            <button key={c.id} onClick={() => setActive(c.id)} className={`px-5 py-2 rounded-full text-sm font-600 whitespace-nowrap ${active === c.id ? "bg-navy text-white" : "bg-muted text-muted-foreground hover:bg-border"}`}>{c.label}</button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((t) => (
            <div key={t.id} className="bg-white rounded-2xl border border-border p-5 hover:shadow-lg transition flex flex-col">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-11 h-11 rounded-full bg-green/10 flex items-center justify-center shrink-0"><t.icon className="w-5 h-5 text-green" /></div>
                <div className="flex-1">
                  <h3 className="font-600 text-navy text-sm leading-tight">{t.title}</h3>
                  <span className="text-xs text-muted-foreground mt-1 inline-block">{t.type} · {t.size}</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground flex-1">{t.desc}</p>
              <button onClick={() => download(t)} className="mt-4 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-600 text-white bg-green hover:bg-green-hover transition">
                <Download className="w-4 h-4" /> Download
              </button>
            </div>
          ))}
        </div>

        {filtered.length === 0 && <p className="text-center text-muted-foreground py-20">No templates found.</p>}

        {/* CTA */}
        <div className="mt-12 bg-navy rounded-2xl p-8 text-center">
          <FileText className="w-10 h-10 text-green mx-auto mb-3" />
          <h3 className="font-display font-600 text-white text-lg">Need a custom document?</h3>
          <p className="text-white/60 text-sm mt-2 max-w-md mx-auto">Our experts can help prepare personalized documents tailored to your specific application.</p>
          <Link to="/contact" className="mt-5 inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-green hover:bg-green-hover transition">Contact us</Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}