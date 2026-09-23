import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HelpCircle, ChevronDown, ArrowRight, Search } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const FAQS = [
  { q: "What documents do I need for a visa application?", a: "Required documents vary by destination and visa type, but typically include: a valid passport (6+ months validity), completed application form, passport-size photos, proof of accommodation, travel itinerary, financial proof (bank statements), and travel insurance. Our Smart Checker tool provides a personalized checklist based on your specific situation." },
  { q: "How long does visa processing take?", a: "Processing times vary by destination and visa type. Schengen visas typically take 10-15 calendar days, US visas 2-8 weeks, UK visas 3-4 weeks, and Canadian visas 2-4 weeks. Express processing is available for many destinations, reducing times significantly. Check our Service Status page for current processing times." },
  { q: "What is the difference between express and standard processing?", a: "Standard processing follows the embassy's normal timeline. Express processing prioritizes your application, often reducing wait times by 50-70%. Urgent processing is the fastest option for emergency travel. Express and urgent options carry additional fees." },
  { q: "Can Trek Visa guarantee my visa will be approved?", a: "No agency can guarantee visa approval — the final decision always rests with the relevant embassy or consulate. However, our 94% approval rate reflects our thorough document review and preparation. We ensure your application is complete, accurate, and presented in the best possible way." },
  { q: "What happens if my visa is refused?", a: "If your visa is refused, we provide a complimentary consultation to analyze the refusal reasons and assess re-application options. Government fees are non-refundable. Our service fees for refused applications are non-refundable as the processing work has been completed, but we offer discounted rates for re-applications." },
  { q: "Do I need to attend an embassy interview?", a: "Some destinations require an in-person interview (e.g., US, UK), while others do not (e.g., Schengen for many nationalities). If an interview is required, we prepare you with coaching and guidance on what to expect. We also help schedule your appointment." },
  { q: "Can I apply for a visa for my entire family?", a: "Yes! Our application form allows you to add multiple travelers. Each family member needs their own application, but we coordinate the entire group to ensure documents are aligned and submitted together where possible. Children (ages 6-12) receive a 50% discount on visa fees." },
  { q: "What payment methods do you accept?", a: "We accept all major credit/debit cards and mobile money payments (depending on your region). Payment is processed securely at the checkout stage. You can choose your preferred currency from our currency selector." },
  { q: "Is my personal data secure?", a: "Absolutely. We use industry-standard encryption to protect your data. Your information is accessible only to authorized personnel involved in your application. We never sell or share your data with third parties. See our Terms of Service for full details." },
  { q: "Can I track my application status?", a: "Yes. Once your application is submitted, you'll receive a reference number. Use our Track Application page or Quick Tracker to check real-time status updates. You'll also receive notifications at each stage of the process." },
  { q: "What is the Smart Visa Checker?", a: "Our Smart Visa Checker is a free tool that analyzes your travel details (nationality, destination, purpose, duration) and provides a personalized visa requirements assessment. It tells you whether you need a visa, what type, estimated costs, and processing times." },
  { q: "Do you offer nationality and residency services?", a: "Yes. In addition to visas, we offer nationality and residency application services for various countries. Our Premium Packages page details our high-end mobility programs. We also provide expert consultations for complex cases." },
];

export default function VisaFAQ() {
  const [open, setOpen] = useState(0);
  const [search, setSearch] = useState("");

  const filtered = FAQS.filter((f) => !search || f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <section className="bg-navy py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green/15 border border-green/30 text-green text-xs font-700 uppercase tracking-wider mb-5">
            <HelpCircle className="w-3.5 h-3.5" /> FAQ
          </span>
          <h1 className="font-display font-700 text-white" style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)" }}>Visa FAQ</h1>
          <p className="text-white/60 mt-4 max-w-2xl mx-auto">Find quick answers to the most common questions about visa processing, requirements, and our services.</p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12 flex-1 w-full">
        <div className="relative mb-8">
          <Search className="w-4 h-4 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search questions..." className="w-full pl-11 pr-4 py-3 rounded-full border border-border bg-white text-sm focus:outline-none focus:border-green" />
        </div>

        <div className="space-y-3">
          {filtered.map((f, i) => (
            <div key={i} className="bg-white rounded-2xl border border-border overflow-hidden">
              <button onClick={() => setOpen(open === i ? -1 : i)} className="w-full flex items-center justify-between gap-4 p-5 text-left">
                <span className="font-600 text-navy text-sm">{f.q}</span>
                <ChevronDown className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && (
                <div className="px-5 pb-5">
                  <p className="text-muted-foreground text-sm leading-relaxed">{f.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No questions match your search. Try different keywords.</p>
          </div>
        )}

        <div className="mt-10 text-center bg-muted rounded-2xl p-8">
          <p className="text-navy font-600 text-lg">Still have questions?</p>
          <p className="text-muted-foreground text-sm mt-2">Our support team is ready to help with any visa-related queries.</p>
          <Link to="/contact" className="mt-5 inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-green hover:bg-green-hover transition">
            Contact Support <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}