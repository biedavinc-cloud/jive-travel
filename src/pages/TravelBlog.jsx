import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PenSquare, ArrowRight, Calendar, Clock, Search, BookOpen } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Image } from "@/components/ui/image";

const POSTS = [
  { title: "10 Essential Tips for a Smooth Schengen Visa Application", category: "Visa Tips", date: "Sep 18, 2026", readTime: "7 min", img: "https://images.unsplash.com/photo-1499856871958-e5b07fbb0bbf?w=800&q=80", excerpt: "Planning a trip to Europe? These expert tips will help you navigate the Schengen visa process with confidence and avoid common pitfalls." },
  { title: "Understanding US Visa Categories: B1, B2, F1, H1B Explained", category: "Visa Tips", date: "Sep 12, 2026", readTime: "8 min", img: "https://images.unsplash.com/photo-1485871982321-0681cc319771?w=800&q=80", excerpt: "A comprehensive guide to the most common US visa categories, their requirements, and which one is right for your situation." },
  { title: "The Rise of Digital Nomad Visas: Where Can You Work From?", category: "Mobility Trends", date: "Sep 6, 2026", readTime: "6 min", img: "https://images.unsplash.com/photo-1436491865332-7a61d1096bd0?w=800&q=80", excerpt: "More countries are introducing digital nomad visas. Here's a roundup of the best destinations for remote workers in 2026." },
  { title: "How to Prepare for Your US Visa Interview: A Complete Guide", category: "Visa Tips", date: "Aug 30, 2026", readTime: "5 min", img: "https://images.unsplash.com/photo-1523050854058-8df90fd10d53?w=800&q=80", excerpt: "The US visa interview can be nerve-wracking. Our step-by-step guide helps you prepare and increases your chances of approval." },
  { title: "Golden Visas Explained: Investment Pathways to Residency", category: "Mobility Trends", date: "Aug 22, 2026", readTime: "9 min", img: "https://images.unsplash.com/photo-1543465077-db45d34b88ac?w=800&q=80", excerpt: "Golden visa programs offer residency through investment. We break down the top programs, costs, and benefits." },
  { title: "Travel Insurance for Schengen: What You Need to Know", category: "Travel Tips", date: "Aug 15, 2026", readTime: "4 min", img: "https://images.unsplash.com/photo-1436491865332-7a61d1096bd0?w=800&q=80", excerpt: "Schengen visa applications require travel insurance with specific minimum coverage. Here's what to look for in a policy." },
  { title: "Top 10 Countries with the Easiest Visa Processes in 2026", category: "Travel Tips", date: "Aug 8, 2026", readTime: "6 min", img: "https://images.unsplash.com/photo-1485871982321-0681cc319771?w=800&q=80", excerpt: "Looking for hassle-free travel? These countries offer the most straightforward visa processes for tourists and business travelers." },
  { title: "Passport Validity Rules: The 6-Month Rule Explained", category: "Visa Tips", date: "Jul 30, 2026", readTime: "3 min", img: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&q=80", excerpt: "Many countries require your passport to be valid for 6 months beyond your travel date. Here's why and how to check." },
  { title: "Post-Pandemic Travel: How Visa Processing Has Changed", category: "Mobility Trends", date: "Jul 22, 2026", readTime: "7 min", img: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80", excerpt: "The pandemic reshaped international travel. Here's how visa processing has evolved and what to expect going forward." },
];

const CATEGORIES = ["All", "Visa Tips", "Travel Tips", "Mobility Trends"];

export default function TravelBlog() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = POSTS.filter((p) => {
    const matchCat = category === "All" || p.category === category;
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <section className="bg-navy py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green/15 border border-green/30 text-green text-xs font-700 uppercase tracking-wider mb-5">
            <BookOpen className="w-3.5 h-3.5" /> Travel Blog
          </span>
          <h1 className="font-display font-700 text-white" style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)" }}>Travel Blog & Insights</h1>
          <p className="text-white/60 mt-4 max-w-2xl mx-auto">Expert articles on international travel, visa tips, and global mobility trends to help you navigate your journey.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 flex-1 w-full">
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

        {featured && !search && category === "All" && (
          <Link to="/travel-blog" className="group block mb-8 bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg transition grid md:grid-cols-2 gap-0">
            <div className="relative aspect-[16/10] md:aspect-auto">
              <Image src={featured.img} alt={featured.title} fittingType="fill" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-green text-white text-xs font-700">Featured</span>
            </div>
            <div className="p-7 lg:p-9 flex flex-col justify-center">
              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                <span className="px-2.5 py-1 rounded-full bg-green/10 text-green font-600">{featured.category}</span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {featured.date}</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {featured.readTime}</span>
              </div>
              <h2 className="font-display font-700 text-navy text-xl lg:text-2xl leading-snug group-hover:text-green transition">{featured.title}</h2>
              <p className="text-muted-foreground text-sm mt-3">{featured.excerpt}</p>
              <span className="inline-flex items-center gap-1 text-green text-sm font-600 mt-4 group-hover:gap-2 transition-all">Read article <ArrowRight className="w-4 h-4" /></span>
            </div>
          </Link>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(search || category !== "All" ? filtered : rest).map((p, i) => (
            <article key={i} className="bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg transition group cursor-pointer">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image src={p.img} alt={p.title} fittingType="fill" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-green/90 text-white text-xs font-700">{p.category}</span>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {p.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {p.readTime}</span>
                </div>
                <h2 className="font-display font-600 text-navy text-base leading-snug group-hover:text-green transition">{p.title}</h2>
                <p className="text-muted-foreground text-sm mt-2 line-clamp-2">{p.excerpt}</p>
                <span className="inline-flex items-center gap-1 text-green text-xs font-600 mt-4 group-hover:gap-2 transition-all">Read more <ArrowRight className="w-3.5 h-3.5" /></span>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 rounded-2xl border-2 border-dashed border-border">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No articles found matching your search.</p>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}