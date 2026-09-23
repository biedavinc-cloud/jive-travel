import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Clock, AlertTriangle, CheckCircle2, ArrowRight, Search, FileText, Plane, ShieldCheck } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Image } from "@/components/ui/image";

const CATEGORIES = [
  { id: "all", label: "All Guides" },
  { id: "procedures", label: "Procedures" },
  { id: "mistakes", label: "Common Mistakes" },
  { id: "tips", label: "Expert Tips" },
  { id: "interview", label: "Interview Prep" },
];

const ARTICLES = [
  {
    id: 1,
    category: "procedures",
    title: "Step-by-Step Schengen Visa Application Process",
    excerpt: "A complete walkthrough of the Schengen visa application — from gathering documents to attending your appointment.",
    readTime: "8 min read",
    img: "https://images.unsplash.com/photo-1499856871958-e5b07fbb0bbf?w=800&q=80",
    icon: FileText,
  },
  {
    id: 2,
    category: "mistakes",
    title: "10 Mistakes That Get Visa Applications Rejected",
    excerpt: "Avoid the most common pitfalls that lead to visa refusals — from incomplete forms to insufficient proof of funds.",
    readTime: "6 min read",
    img: "https://images.unsplash.com/photo-1526374965328-7f61d4c18-5f2?w=800&q=80",
    icon: AlertTriangle,
  },
  {
    id: 3,
    category: "tips",
    title: "How to Build a Strong Proof of Funds Document",
    excerpt: "Embassies want to see financial stability. Learn exactly what documents strengthen your application.",
    readTime: "5 min read",
    img: "https://images.unsplash.com/photo-1554224155-6726b0c6f1c3?w=800&q=80",
    icon: ShieldCheck,
  },
  {
    id: 4,
    category: "interview",
    title: "US Visa Interview: What to Expect and How to Prepare",
    excerpt: "The US visa interview can be nerve-wracking. Here's what questions to expect and how to answer with confidence.",
    readTime: "7 min read",
    img: "https://images.unsplash.com/photo-1485871982321-0681cc319771?w=800&q=80",
    icon: Plane,
  },
  {
    id: 5,
    category: "procedures",
    title: "UK Visa Application: A Complete Timeline",
    excerpt: "Understand every stage of the UK visa process, from online application to biometrics and decision.",
    readTime: "6 min read",
    img: "https://images.unsplash.com/photo-1513635262778-9c6b2b3d3b3b?w=800&q=80",
    icon: FileText,
  },
  {
    id: 6,
    category: "tips",
    title: "Passport Validity: The 6-Month Rule Explained",
    excerpt: "Many countries require 6 months validity beyond your return date. Here's how to check and avoid issues.",
    readTime: "4 min read",
    img: "https://images.unsplash.com/photo-1473496129752-1c2c3f4e4e4e?w=800&q=80",
    icon: ShieldCheck,
  },
  {
    id: 7,
    category: "mistakes",
    title: "Why Incomplete Hotel Bookings Lead to Refusals",
    excerpt: "Your hotel reservation must match your travel dates exactly. Learn the common booking mistakes to avoid.",
    readTime: "5 min read",
    img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    icon: AlertTriangle,
  },
  {
    id: 8,
    category: "interview",
    title: "Schengen Visa Interview: Top Questions and Answers",
    excerpt: "Prepare for your Schengen interview with our curated list of the most frequently asked questions.",
    readTime: "7 min read",
    img: "https://images.unsplash.com/photo-1521792497436-c7955d2bde4e?w=800&q=80",
    icon: Plane,
  },
  {
    id: 9,
    category: "tips",
    title: "Business Visa vs Tourist Visa: Which One to Choose",
    excerpt: "Choosing the wrong visa type is a leading cause of rejection. Here's how to pick the right category.",
    readTime: "5 min read",
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b67?w=800&q=80",
    icon: BookOpen,
  },
];

export default function GuideVisa() {
  const [active, setActive] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = ARTICLES.filter((a) => {
    const matchCat = active === "all" || a.category === active;
    const matchQuery = !query || a.title.toLowerCase().includes(query.toLowerCase()) || a.excerpt.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQuery;
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Hero */}
      <section className="bg-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, #E5231B 0, transparent 40%)" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 lg:py-20 relative">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green/15 border border-green/30 text-green text-xs font-600 uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" /> Knowledge Center
          </span>
          <h1 className="font-display font-700 text-white mt-5" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>Visa Guide & Expert Articles</h1>
          <p className="text-white/70 text-[0.938rem] mt-3 max-w-2xl">Procedures, common mistakes to avoid, and expert tips to maximize your chances of approval.</p>

          {/* Search */}
          <div className="mt-7 relative max-w-xl">
            <Search className="w-5 h-5 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search articles..." className="w-full pl-12 pr-4 py-3.5 rounded-full bg-white text-foreground text-sm outline-none border-0" />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-b border-border bg-white sticky top-[4.5rem] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {CATEGORIES.map((c) => (
            <button key={c.id} onClick={() => setActive(c.id)} className={`px-5 py-2 rounded-full text-sm font-600 whitespace-nowrap transition ${active === c.id ? "bg-navy text-white" : "bg-muted text-muted-foreground hover:bg-border"}`}>{c.label}</button>
          ))}
        </div>
      </section>

      {/* Articles grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16 flex-1 w-full">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((a) => (
            <article key={a.id} className="group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-xl transition flex flex-col">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image src={a.img} alt={a.title} fittingType="fill" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center"><a.icon className="w-5 h-5 text-navy" /></div>
                <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/90 text-navy text-xs font-600 flex items-center gap-1"><Clock className="w-3 h-3" /> {a.readTime}</span>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <span className="text-green text-xs font-600 uppercase tracking-wider">{CATEGORIES.find((c) => c.id === a.category)?.label}</span>
                <h3 className="font-display font-600 text-navy mt-2 leading-tight">{a.title}</h3>
                <p className="text-muted-foreground text-sm mt-2 flex-1">{a.excerpt}</p>
                <button className="mt-4 inline-flex items-center gap-1 text-navy font-600 text-sm group-hover:gap-2 transition-all">Read article <ArrowRight className="w-4 h-4" /></button>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No articles found matching your search.</p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 bg-navy rounded-2xl p-8 text-center">
          <CheckCircle2 className="w-10 h-10 text-green mx-auto mb-3" />
          <h3 className="font-display font-600 text-white text-lg">Need personalized guidance?</h3>
          <p className="text-white/60 text-sm mt-2 max-w-md mx-auto">Our experts review your case and guide you through every step of the process.</p>
          <Link to="/visa-application" className="mt-5 inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-green hover:bg-green-hover transition">Start your application <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}