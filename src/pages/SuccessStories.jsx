import React from "react";
import { Link } from "react-router-dom";
import { Star, Quote, ArrowRight, Trophy, Clock, MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CountryFlag from "@/components/CountryFlag";
import { Image } from "@/components/ui/image";

const STORIES = [
  {
    iso2: "AE",
    name: "The Al-Rashid Family",
    route: "UAE → Schengen",
    title: "Family Schengen Visa Approved in 5 Days",
    summary: "A family of five needed Schengen visas for a European vacation. With complex documentation requirements across multiple family members, they turned to Trek Visa.",
    outcome: "All 5 visas approved",
    duration: "5 days",
    img: "https://images.unsplash.com/photo-1499856871958-e5b07fbb0bbf?w=800&q=80",
    text: "Trek Visa coordinated the entire family's application, ensuring each member's documents were perfectly aligned. The express service delivered all five visas in under a week.",
  },
  {
    iso2: "US",
    name: "Sarah Mitchell",
    route: "USA → UK",
    title: "UK Work Visa Secured for Tech Executive",
    summary: "A senior tech executive needed a UK Skilled Worker visa for a career move to London. The timeline was tight with a start date approaching.",
    outcome: "Visa approved, started on time",
    duration: "3 weeks",
    img: "https://images.unsplash.com/photo-1513635262778-9c6b2b3d3b3b?w=800&q=80",
    text: "Our team expedited the process, coordinated with the UK employer for sponsorship documentation, and secured the visa well before the start date.",
  },
  {
    iso2: "IN",
    name: "Rajesh Kumar",
    route: "India → Canada",
    title: "Canadian PR Through Express Entry",
    summary: "An IT professional sought permanent residency in Canada through the Express Entry system but was unsure about the points calculation and documentation.",
    outcome: "PR approved, now living in Toronto",
    duration: "6 months",
    img: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800&q=80",
    text: "We optimized his profile, guided him through the IELTS preparation, and managed the entire PR application. He received his COPR in 6 months.",
  },
  {
    iso2: "NG",
    name: "Chioma Okafor",
    route: "Nigeria → USA",
    title: "US Student Visa (F1) After Prior Refusal",
    summary: "After a previous F1 visa refusal, a student was hesitant to reapply. She needed expert guidance to address the issues that led to her initial denial.",
    outcome: "F1 visa approved on second attempt",
    duration: "2 weeks",
    img: "https://images.unsplash.com/photo-1523050854058-8df90fd10d53?w=800&q=80",
    text: "Our team analyzed the refusal, prepared her with interview coaching, and strengthened her documentation. She was approved on her second attempt.",
  },
  {
    iso2: "BR",
    name: "Ana Costa",
    route: "Brazil → Australia",
    title: "Australia Skilled Independent Visa (189)",
    summary: "A software engineer from São Paulo wanted to migrate to Australia permanently but found the points system overwhelming.",
    outcome: "Visa 189 granted",
    duration: "10 months",
    img: "https://images.unsplash.com/photo-1506973035872-a4ec0b3558f0?w=800&q=80",
    text: "We assessed her skills, guided her through the English testing, and submitted a flawless application. She now lives and works in Sydney.",
  },
  {
    iso2: "EG",
    name: "Mohamed Sayed",
    route: "Egypt → Germany",
    title: "German Blue Card for Engineer",
    summary: "A mechanical engineer received a job offer from a German automotive company but needed help navigating the EU Blue Card process.",
    outcome: "Blue Card approved, relocated to Munich",
    duration: "4 weeks",
    img: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80",
    text: "We coordinated with the German employer, prepared all required documents, and secured the Blue Card in record time. He started his new life in Munich.",
  },
];

export default function SuccessStories() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <section className="bg-navy py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green/15 border border-green/30 text-green text-xs font-700 uppercase tracking-wider mb-5">
            <Trophy className="w-3.5 h-3.5" /> Success Stories
          </span>
          <h1 className="font-display font-700 text-white" style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)" }}>Real Journeys, Real Results</h1>
          <p className="text-white/60 mt-4 max-w-2xl mx-auto">Discover how Trek Visa has helped clients achieve their international mobility goals — from tourist visas to permanent residency.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14 flex-1 w-full">
        <div className="space-y-8">
          {STORIES.map((s, i) => (
            <div key={i} className="bg-white rounded-2xl border border-border overflow-hidden grid lg:grid-cols-5 gap-0">
              <div className="lg:col-span-2 relative aspect-[16/10] lg:aspect-auto">
                <Image src={s.img} alt={s.title} fittingType="fill" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute top-4 left-4">
                  <CountryFlag iso2={s.iso2} name={s.name} size={48} className="ring-2 ring-white/40" />
                </div>
              </div>
              <div className="lg:col-span-3 p-7 lg:p-9">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <MapPin className="w-3.5 h-3.5" /> {s.route}
                </div>
                <h2 className="font-display font-700 text-navy text-lg">{s.title}</h2>
                <p className="text-muted-foreground text-sm mt-2">{s.summary}</p>
                <p className="text-foreground text-sm mt-3 leading-relaxed italic">"{s.text}"</p>
                <div className="flex flex-wrap items-center gap-4 mt-5 pt-5 border-t border-border">
                  <div className="flex items-center gap-2">
                    <CountryFlag iso2={s.iso2} name={s.name} size={36} />
                    <div>
                      <p className="font-600 text-navy text-sm">{s.name}</p>
                      <p className="text-muted-foreground text-xs">{s.route}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 ml-auto">
                    <div className="text-center">
                      <p className="text-green font-700 text-sm font-display">{s.outcome}</p>
                      <p className="text-muted-foreground text-xs">Outcome</p>
                    </div>
                    <div className="text-center">
                      <p className="text-navy font-700 text-sm font-display flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {s.duration}</p>
                      <p className="text-muted-foreground text-xs">Processing Time</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center bg-muted rounded-2xl p-8">
          <p className="text-navy font-600 text-lg">Ready to write your success story?</p>
          <p className="text-muted-foreground text-sm mt-2">Let our experts guide you through your visa or immigration journey.</p>
          <Link to="/smart-checker" className="mt-5 inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-green hover:bg-green-hover transition">
            Start Your Application <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}