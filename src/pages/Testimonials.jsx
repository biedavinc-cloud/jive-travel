import React from "react";
import { Link } from "react-router-dom";
import { Star, Quote, ArrowRight, ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CountryFlag from "@/components/CountryFlag";
import { Image } from "@/components/ui/image";

const TESTIMONIALS = [
  { iso2: "AE", name: "Ahmed Al-Rashid", country: "UAE → Schengen", visa: "Schengen Business Visa", rating: 5, img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80", text: "Trek Visa handled my Schengen business visa with incredible professionalism. From document preparation to embassy submission, everything was seamless. I received my visa in just 4 days." },
  { iso2: "PH", name: "Maria Santos", country: "Philippines → USA", visa: "US B1/B2 Visa", rating: 5, img: "https://images.unsplash.com/photo-1485871982321-0681cc319771?w=400&q=80", text: "After two refusals with other agencies, Trek Visa guided me through the entire US visa process. Their document review caught issues I never knew about. Approved on the first try!" },
  { iso2: "NG", name: "James Okonkwo", country: "Nigeria → UK", visa: "UK Standard Visitor", rating: 5, img: "https://images.unsplash.com/photo-1513635262778-9c6b2b3d3b3b?w=400&q=80", text: "The team was responsive, transparent, and genuinely caring. They kept me updated at every stage and made the UK visa process stress-free. Highly recommended." },
  { iso2: "IN", name: "Priya Sharma", country: "India → Canada", visa: "Canada Tourist Visa", rating: 5, img: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=400&q=80", text: "Excellent service from start to finish. The smart checker tool helped me understand exactly what I needed, and the team handled everything else. Got my Canadian visa smoothly." },
  { iso2: "BR", name: "Carlos Ferreira", country: "Brazil → Australia", visa: "Australia Visitor Visa", rating: 5, img: "https://images.unsplash.com/photo-1506973035872-a4ec0b3558f0?w=400&q=80", text: "Professional, efficient, and reliable. Trek Visa made my Australian visa application effortless. The document checklist was spot-on and the support was exceptional." },
  { iso2: "ZA", name: "Thandi Mthembu", country: "South Africa → Schengen", visa: "Schengen Tourist Visa", rating: 5, img: "https://images.unsplash.com/photo-1540959733332-eab4ffabeeaf?w=400&q=80", text: "I was nervous about the Schengen process but Trek Visa made it simple. They explained every step, prepared all my documents, and I got my visa without any issues." },
  { iso2: "TR", name: "Mehmet Yilmaz", country: "Turkey → USA", visa: "US Student Visa (F1)", rating: 5, img: "https://images.unsplash.com/photo-1485871982321-0681cc319771?w=400&q=80", text: "As a student, I needed my F1 visa quickly. Trek Visa's express service was worth every penny. They prepared me for the interview and I was approved on the spot." },
  { iso2: "EG", name: "Omar Hassan", country: "Egypt → UK", visa: "UK Work Visa", rating: 5, img: "https://images.unsplash.com/photo-1513635262778-9c6b2b3d3b3b?w=400&q=80", text: "The work visa process was complex but Trek Visa's expertise made it manageable. They handled all the paperwork and I started my new job in London on time." },
  { iso2: "KE", name: "Grace Wanjiku", country: "Kenya → Schengen", visa: "Schengen Business Visa", rating: 5, img: "https://images.unsplash.com/photo-1499856871958-e5b07fbb0bbf?w=400&q=80", text: "Outstanding service! The team went above and beyond to ensure my business visa was approved quickly. Their knowledge of Schengen requirements is unmatched." },
];

const STATS = [
  { value: "30,000+", label: "Visas Issued" },
  { value: "130+", label: "Countries Served" },
  { value: "94%", label: "Approval Rate" },
  { value: "4.7/5", label: "Average Rating" },
];

export default function Testimonials() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <section className="bg-navy py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green/15 border border-green/30 text-green text-xs font-700 uppercase tracking-wider mb-5">
            <Star className="w-3.5 h-3.5 fill-green" /> Client Stories
          </span>
          <h1 className="font-display font-700 text-white" style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)" }}>What Our Clients Say</h1>
          <p className="text-white/60 mt-4 max-w-2xl mx-auto">Real stories from travelers who trusted Trek Visa with their visa and immigration journeys.</p>
        </div>
      </section>

      <section className="bg-navy-soft border-b border-navy-border">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="font-display font-700 text-green text-3xl md:text-4xl">{s.value}</p>
              <p className="text-white/50 text-xs md:text-sm mt-2 uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14 flex-1 w-full">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((tm, i) => (
            <div key={i} className="bg-white rounded-2xl border border-border p-6 hover:shadow-lg transition flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(tm.rating)].map((_, j) => <Star key={j} className="w-4 h-4 fill-green text-green" />)}
                </div>
                <Quote className="w-8 h-8 text-green/20" />
              </div>
              <p className="text-foreground text-sm leading-relaxed flex-1">"{tm.text}"</p>
              <div className="flex items-center gap-3 pt-5 mt-4 border-t border-border">
                <CountryFlag iso2={tm.iso2} name={tm.name} size={44} />
                <div>
                  <p className="font-600 text-navy text-sm">{tm.name}</p>
                  <p className="text-muted-foreground text-xs">{tm.country}</p>
                  <p className="text-green text-xs font-600 mt-0.5">{tm.visa}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center bg-muted rounded-2xl p-8">
          <div className="flex items-center justify-center gap-1 mb-3">
            {[...Array(5)].map((_, j) => <Star key={j} className="w-5 h-5 fill-green text-green" />)}
          </div>
          <p className="text-navy font-600 text-lg">Rated 4.7/5 by thousands of happy travelers</p>
          <a href="https://www.trustpilot.com/review/trektravel.com" target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-navy border border-border hover:bg-white transition">
            <ExternalLink className="w-4 h-4" /> Read all reviews on Trustpilot
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}