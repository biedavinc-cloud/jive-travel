import React from "react";
import { Link } from "react-router-dom";
import { FileText, PenLine, FolderCheck, Plane, ShieldCheck, Clock, ArrowRight, CheckCircle2, Star, Award, CreditCard } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Image } from "@/components/ui/image";

const STEPS = [
  { num: 1, icon: ShieldCheck, title: "Eligibility Check", text: "Start with our free Smart Visa Checker to instantly determine your visa requirements based on your nationality and destination.", time: "2 min", img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b67?w=600&q=80" },
  { num: 2, icon: FileText, title: "Create Your Account", text: "Register and verify your identity. Your personal dashboard gives you full visibility into every application.", time: "3 min", img: "https://images.unsplash.com/photo-1521792497436-c7955d2bde4e?w=600&q=80" },
  { num: 3, icon: PenLine, title: "Complete Your Application", text: "Fill out our smart progressive form. Our system auto-fills repetitive fields and guides you through each section.", time: "15 min", img: "https://images.unsplash.com/photo-1554224155-6726b0c6f1c3?w=600&q=80" },
  { num: 4, icon: FolderCheck, title: "Upload Documents", text: "Submit your documents through our secure portal. Each file is AI-checked and expert-validated before submission.", time: "10 min", img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80" },
  { num: 5, icon: CreditCard, title: "Secure Checkout", text: "Pay your visa fees through our encrypted checkout. Transparent pricing with no hidden costs.", time: "3 min", img: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=600&q=80" },
  { num: 6, icon: Plane, title: "Document Delivery", text: "Track your application in real-time. Receive your approved visa by email and courier — ready for your trip.", time: "Varies", img: "https://images.unsplash.com/photo-1436491865332-7a61d1096ec5?w=600&q=80" },
];

const FEATURES = [
  { icon: Clock, title: "Real-Time Tracking", text: "Monitor every stage of your application from submission to delivery." },
  { icon: ShieldCheck, title: "Bank-Grade Security", text: "Your data is encrypted with 256-bit SSL and stored in compliance with GDPR." },
  { icon: Star, title: "Expert Review", text: "Every document is manually reviewed by our visa specialists before submission." },
  { icon: Award, title: "94% Success Rate", text: "Our meticulous process ensures the highest approval rates in the industry." },
];

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <section className="bg-navy relative overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1488646953014-85cb44e25135?w=1200&q=80" alt="How it works" fittingType="fill" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/80 to-navy" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 lg:py-20 relative text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green/15 border border-green/30 text-green text-xs font-600 uppercase tracking-wider">
            <Plane className="w-3.5 h-3.5" /> How It Works
          </span>
          <h1 className="font-display font-700 text-white mt-5" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>Your Application Journey</h1>
          <p className="text-white/70 text-[0.938rem] mt-3 max-w-xl mx-auto">From initial eligibility check to final document delivery — here's exactly how Trek Visa gets your visa approved.</p>
        </div>
      </section>

      {/* Steps */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-14 lg:py-20 w-full">
        <div className="space-y-8">
          {STEPS.map((s, i) => (
            <div key={s.num} className="flex flex-col sm:flex-row gap-6">
              {/* Image */}
              <div className="relative w-full sm:w-48 h-32 sm:h-36 rounded-2xl overflow-hidden shrink-0">
                <Image src={s.img} alt={s.title} fittingType="fill" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                <span className="absolute top-3 left-3 w-9 h-9 rounded-full bg-green text-white font-700 flex items-center justify-center text-sm">{s.num}</span>
              </div>
              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <s.icon className="w-5 h-5 text-green" />
                  <h3 className="font-display font-700 text-navy text-lg">{s.title}</h3>
                  <span className="ml-auto px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-600">{s.time}</span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-muted border-y border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 lg:py-20">
          <div className="text-center mb-10">
            <span className="text-green text-xs font-600 uppercase tracking-wider">Why Trek Visa</span>
            <h2 className="font-display font-700 text-navy mt-2" style={{ fontSize: "1.875rem" }}>Built for Success</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map((f, i) => (
              <div key={i} className="bg-white rounded-2xl border border-border p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-green/10 flex items-center justify-center mx-auto mb-4"><f.icon className="w-6 h-6 text-green" /></div>
                <h3 className="font-600 text-navy text-sm">{f.title}</h3>
                <p className="text-muted-foreground text-xs mt-2">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center">
        <h2 className="font-display font-700 text-navy" style={{ fontSize: "1.875rem" }}>Ready to begin?</h2>
        <p className="text-muted-foreground text-[0.938rem] mt-3">Start with our free eligibility check — it only takes 2 minutes.</p>
        <div className="flex flex-wrap justify-center gap-3 mt-7">
          <Link to="/smart-checker" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-white bg-green hover:bg-green-hover transition">
            Check Eligibility <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/visa-application" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-navy border border-border hover:bg-muted transition">
            Start Application
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}