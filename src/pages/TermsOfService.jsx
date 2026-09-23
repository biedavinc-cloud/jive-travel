import React from "react";
import { Link } from "react-router-dom";
import { FileText, ShieldCheck, RefreshCw, Lock, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SECTIONS = [
  {
    icon: FileText,
    title: "Terms of Service",
    body: [
      "By engaging Trek Visa (TREK VISA LIMITED), you agree to these terms. Trek Visa acts as an independent visa and immigration facilitator. We do not guarantee visa approval — final decisions rest solely with the relevant embassy, consulate, or government authority.",
      "Applicants must provide accurate, truthful, and complete information. Submission of false or misleading documents may result in immediate termination of services without refund, and may be reported to the relevant authorities.",
      "Trek Visa reserves the right to decline or cancel any application where fraud, misrepresentation, or ineligibility is suspected. Service fees cover processing, document review, and advisory — they are separate from government visa fees.",
      "By submitting an application, you authorize Trek Visa to act as your representative for the sole purpose of visa processing, including communication with embassies and consulates on your behalf.",
    ],
  },
  {
    icon: RefreshCw,
    title: "Refund Policy",
    body: [
      "Government visa fees are non-refundable once an application has been submitted to the relevant authority.",
      "Trek Visa service fees are refundable as follows: 100% refund if the application has not yet been submitted to our processing team; 50% refund if documents have been reviewed but not yet filed; 0% refund once the application has been filed with the embassy or consulate.",
      "If a visa is refused, Trek Visa will provide a complimentary consultation to assess re-application options. Government fees are not recoverable. Service fees for refused applications are non-refundable as the work has been completed.",
      "Express and urgent processing surcharges are non-refundable regardless of outcome.",
    ],
  },
  {
    icon: Lock,
    title: "Privacy Commitments",
    body: [
      "Trek Visa is committed to protecting your personal data. We collect only the information necessary for visa and immigration processing, in accordance with the EU General Data Protection Regulation (GDPR) and international best practices.",
      "Your data is stored using industry-standard encryption and is accessible only to authorized personnel directly involved in your application. We never sell, rent, or share your data with third parties for marketing purposes.",
      "Documents and personal information are retained for the duration of your application process and for a defined period thereafter as required by law. You may request deletion of your data at any time, subject to legal retention requirements.",
      "We use your contact information to provide application updates, service notifications, and support communications. You may opt out of non-essential communications at any time.",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Limitation of Liability",
    body: [
      "Trek Visa shall not be liable for delays or rejections caused by embassies, consulates, or government authorities. Processing times are estimates based on historical data and are not guaranteed.",
      "Our liability is limited to the service fees paid for the specific application in question. We are not liable for indirect or consequential damages, including but not limited to travel costs, accommodation, or lost opportunities.",
      "Clients are responsible for ensuring passport validity, travel insurance, and compliance with destination country requirements beyond the visa itself.",
    ],
  },
];

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <section className="bg-navy py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green/15 border border-green/30 text-green text-xs font-700 uppercase tracking-wider mb-5">
            <ShieldCheck className="w-3.5 h-3.5" /> Legal & Compliance
          </span>
          <h1 className="font-display font-700 text-white" style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)" }}>Terms of Service</h1>
          <p className="text-white/60 mt-4 max-w-2xl mx-auto">Our terms of service, refund policy, and privacy commitments for all immigration and visa services provided by Trek Visa.</p>
          <p className="text-white/40 text-xs mt-4">Last updated: September 2026</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-14 flex-1 w-full">
        <div className="space-y-12">
          {SECTIONS.map((s, i) => (
            <div key={i} className="bg-white rounded-2xl border border-border p-7 lg:p-9">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-full bg-green/10 flex items-center justify-center"><s.icon className="w-5 h-5 text-green" /></div>
                <h2 className="font-display font-700 text-navy text-xl">{s.title}</h2>
              </div>
              <div className="space-y-3">
                {s.body.map((p, j) => (
                  <p key={j} className="text-muted-foreground text-sm leading-relaxed">{p}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center bg-muted rounded-2xl p-8">
          <p className="text-navy font-600 text-lg">Questions about our policies?</p>
          <p className="text-muted-foreground text-sm mt-2">Our team is here to clarify any legal or privacy concerns.</p>
          <Link to="/contact" className="mt-5 inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-green hover:bg-green-hover transition">
            Contact Us <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}