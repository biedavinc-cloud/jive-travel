import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Newspaper, ArrowRight, Calendar, Clock, Search, Tag } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Image } from "@/components/ui/image";

const ARTICLES = [
  { title: "Schengen Visa Rules Updated for 2026: What Travelers Need to Know", category: "Policy Update", date: "Sep 15, 2026", readTime: "5 min", img: "https://images.unsplash.com/photo-1499856871958-e5b07fbb0bbf?w=800&q=80", excerpt: "The European Commission has announced updated Schengen visa regulations affecting application procedures, processing times, and documentation requirements for 2026." },
  { title: "UK Introduces New Electronic Travel Authorization (ETA)", category: "Policy Update", date: "Sep 10, 2026", readTime: "4 min", img: "https://images.unsplash.com/photo-1513635262778-9c6b2b3d3b3b?w=800&q=80", excerpt: "The UK's new ETA system is now live for additional nationalities. Here's what changes for travelers and how to prepare." },
  { title: "US Visa Interview Waivers Expanded for Renewal Applicants", category: "Immigration News", date: "Sep 5, 2026", readTime: "3 min", img: "https://images.unsplash.com/photo-1485871982321-0681cc319771?w=800&q=80", excerpt: "The US State Department has expanded interview waiver eligibility for certain visa renewal applicants, potentially saving weeks of processing time." },
  { title: "Canada Increases Immigration Targets for 2026", category: "Immigration News", date: "Aug 28, 2026", readTime: "6 min", img: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800&q=80", excerpt: "Canada has announced increased immigration targets, opening new pathways for skilled workers, students, and family sponsorship programs." },
  { title: "Australia Launches New Visa Pathway for Tech Workers", category: "Immigration News", date: "Aug 20, 2026", readTime: "5 min", img: "https://images.unsplash.com/photo-1506973035872-a4ec0b3558f0?w=800&q=80", excerpt: "Australia's new tech-specific visa stream aims to attract skilled technology professionals with fast-tracked processing and extended validity." },
  { title: "Dubai Launches 5-Year Multi-Entry Tourist Visa", category: "Policy Update", date: "Aug 12, 2026", readTime: "3 min", img: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&q=80", excerpt: "The UAE has introduced a 5-year multi-entry tourist visa, allowing travelers to visit Dubai multiple times without reapplying." },
  { title: "Schengen Visa Fees Increased: New Pricing Structure", category: "Policy Update", date: "Aug 5, 2026", readTime: "4 min", img: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80", excerpt: "Schengen visa fees have been revised with a new pricing structure. Here's a breakdown of the changes and who is affected." },
  { title: "Japan Eases E-Visa Process for Additional Countries", category: "Immigration News", date: "Jul 28, 2026", readTime: "3 min", img: "https://images.unsplash.com/photo-1540959733332-eab4ffabeeaf?w=800&q=80", excerpt: "Japan has expanded its e-visa program to include more nationalities, simplifying the tourist visa application process." },
  { title: "Post-Pandemic Travel Trends: Visa Processing Times Normalize", category: "Industry Insights", date: "Jul 20, 2026", readTime: "5 min", img: "https://images.unsplash.com/photo-1436491865332-7a61d1096bd0?w=800&q=80", excerpt: "Visa processing times across major destinations are finally returning to pre-pandemic levels. Here's the current landscape." },
];

const CATEGORIES = ["All", "Policy Update", "Immigration News", "Industry Insights"];

export default function News() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = ARTICLES.filter((a) => {
    const matchCat = category === "All" || a.category === category;
    const matchSearch = !search || a.title.toLowerCase().includes(search.toLowerCase()) || a.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <section className="bg-navy py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green/15 border border-green/30 text-green text-xs font-700 uppercase tracking-wider mb-5">
            <Newspaper className="w-3.5 h-3.5" /> News & Updates
          </span>
          <h1 className="font-display font-700 text-white" style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)" }}>Travel & Immigration News</h1>
          <p className="text-white/60 mt-4 max-w-2xl mx-auto">Stay informed about the latest visa policy changes, immigration updates, and travel trends from around the world.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 flex-1 w-full">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search articles..." className="w-full pl-11 pr-4 py-3 rounded-full border border-border bg-white text-sm focus:outline-none focus:border-green" />
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {CATEGORIES.map((c) => (
              <button key={c} onClick={() => setCategory(c)} className={`px-5 py-3 rounded-full text-sm font-600 whitespace-nowrap transition ${category === c ? "bg-navy text-white" : "bg-muted text-muted-foreground hover:bg-border"}`}>{c}</button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 rounded-2xl border-2 border-dashed border-border">
            <Newspaper className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No articles found matching your search.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((a, i) => (
              <article key={i} className="bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg transition group cursor-pointer">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={a.img} alt={a.title} fittingType="fill" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-green/90 text-white text-xs font-700">{a.category}</span>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {a.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {a.readTime}</span>
                  </div>
                  <h2 className="font-display font-600 text-navy text-base leading-snug group-hover:text-green transition">{a.title}</h2>
                  <p className="text-muted-foreground text-sm mt-2 line-clamp-2">{a.excerpt}</p>
                  <span className="inline-flex items-center gap-1 text-green text-xs font-600 mt-4 group-hover:gap-2 transition-all">Read more <ArrowRight className="w-3.5 h-3.5" /></span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}