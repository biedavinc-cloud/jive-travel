import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, HelpCircle, MessageCircle, Search } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const WHATSAPP_URL = "https://wa.me/35315550194?text=Hi%2C%20I%20have%20a%20question%20about%20my%20visa";

const CATEGORIES = [
  { id: "general", label: "General" },
  { id: "documents", label: "Documents" },
  { id: "timeline", label: "Processing Times" },
  { id: "payment", label: "Payment & Fees" },
  { id: "insurance", label: "Insurance" },
];

const FAQS = [
  // General
  { cat: "general", q: "What services does Trek Visa offer?", a: "We provide visa application assistance for 130+ countries, second nationality and residency programs, travel insurance, and full document management — all handled by dedicated experts." },
  { cat: "general", q: "Is Trek Visa a government agency?", a: "No. We are a private, CRO-registered service provider (CRO No. 123456.78) based in Dublin, Ireland. Our fees cover professional assistance; official embassy fees are charged separately." },
  { cat: "general", q: "How do I start my application?", a: "Simply use our visa simulator on the homepage, complete the eligibility test, or contact us on WhatsApp. A dedicated advisor will guide you through every step." },
  { cat: "general", q: "Can you guarantee my visa will be approved?", a: "While no agency can guarantee approval, our 94.2% success rate reflects our thorough preparation. Each dossier is expert-verified before submission to maximize your chances." },

  // Documents
  { cat: "documents", q: "What documents do I need for a visa application?", a: "Typically: a valid passport (6+ months validity), ID-standard photo, proof of funds, travel itinerary, and hotel/flight bookings. Requirements vary by country and visa type — your advisor will provide a personalized checklist." },
  { cat: "documents", q: "How do I upload my documents?", a: "You can upload documents directly through our secure platform during the application process, or anytime via the Document Vault in your client area." },
  { cat: "documents", q: "My passport expires soon — can I still apply?", a: "Most countries require at least 6 months validity beyond your planned return date. We recommend renewing your passport before starting the application." },
  { cat: "documents", q: "Do you check documents before submission?", a: "Yes. Every document is verified by both our AI system and a human expert before official submission. If anything is missing, we contact you before proceeding." },

  // Timeline
  { cat: "timeline", q: "How long does visa processing take?", a: "Processing times vary by destination and urgency: Standard (5-10 days), Express 48h, or Urgent 24h. Schengen visas can be obtained in as little as 3 days with our express service." },
  { cat: "timeline", q: "Can I track my application status?", a: "Yes. Your client dashboard provides real-time tracking through a 5-stage timeline — from submission to visa issuance — with multi-channel notifications (Email, SMS, WhatsApp)." },
  { cat: "timeline", q: "What if I need my visa urgently?", a: "We offer Express (48h) and Urgent (24h) processing options with surcharges. Select the urgency level during your application or ask your advisor." },

  // Payment
  { cat: "payment", q: "What payment methods do you accept?", a: "We accept all major credit/debit cards and Mobile Money. Payment is processed securely at checkout after your application is finalized." },
  { cat: "payment", q: "Are embassy fees included in your pricing?", a: "Our service fees cover professional assistance. Official embassy fees are separate and clearly listed in your quote. There are no hidden charges." },
  { cat: "payment", q: "Do you offer refunds if my visa is rejected?", a: "Our service agreement includes transparent refund conditions. Since we ensure compliant dossiers, rejections are rare — but terms are clearly stated in your contract." },

  // Insurance
  { cat: "insurance", q: "Is travel insurance mandatory?", a: "For Schengen visas, travel insurance with minimum €30,000 medical coverage is mandatory. For other destinations it's optional but strongly recommended." },
  { cat: "insurance", q: "What does your travel insurance cover?", a: "Our plans cover medical emergencies, trip cancellation, lost luggage, and repatriation. You can choose from multiple coverage levels on our Insurance page." },
];

export default function FAQ() {
  const [active, setActive] = useState("general");
  const [open, setOpen] = useState(null);
  const [query, setQuery] = useState("");

  const filtered = FAQS.filter((f) => {
    const matchCat = f.cat === active;
    const matchQuery = !query || f.q.toLowerCase().includes(query.toLowerCase()) || f.a.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQuery;
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Hero */}
      <section className="bg-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, #E5231B 0, transparent 40%)" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 lg:py-20 relative text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green/15 border border-green/30 text-green text-xs font-600 uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" /> Help Center
          </span>
          <h1 className="font-display font-700 text-white mt-5" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>Frequently Asked Questions</h1>
          <p className="text-white/70 text-[0.938rem] mt-3 max-w-2xl mx-auto">Find quick answers to the most common questions about documents, timelines, and fees.</p>

          <div className="mt-7 relative max-w-xl mx-auto">
            <Search className="w-5 h-5 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search questions..." className="w-full pl-12 pr-4 py-3.5 rounded-full bg-white text-foreground text-sm outline-none border-0" />
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 flex-1 w-full">
        {/* Category pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar mb-8">
          {CATEGORIES.map((c) => (
            <button key={c.id} onClick={() => { setActive(c.id); setOpen(null); }} className={`px-5 py-2 rounded-full text-sm font-600 whitespace-nowrap transition ${active === c.id ? "bg-navy text-white" : "bg-muted text-muted-foreground hover:bg-border"}`}>{c.label}</button>
          ))}
        </div>

        {/* FAQ list */}
        <div className="space-y-3">
          {filtered.map((f, i) => (
            <div key={i} className="bg-white rounded-2xl border border-border overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between gap-4 p-5 text-left">
                <span className="font-600 text-navy text-sm sm:text-base">{f.q}</span>
                <ChevronDown className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && (
                <div className="px-5 pb-5 -mt-1">
                  <p className="text-muted-foreground text-sm leading-relaxed">{f.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No questions found matching your search.</p>
          </div>
        )}

        {/* Still have questions */}
        <div className="mt-12 bg-navy rounded-2xl p-8 text-center">
          <MessageCircle className="w-10 h-10 text-green mx-auto mb-3" />
          <h3 className="font-display font-600 text-white text-lg">Still have questions?</h3>
          <p className="text-white/60 text-sm mt-2 max-w-md mx-auto">Our team replies on WhatsApp within minutes.</p>
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-green hover:bg-green-hover transition">Chat on WhatsApp <MessageCircle className="w-4 h-4" /></a>
        </div>
      </section>

      <Footer />
    </div>
  );
}