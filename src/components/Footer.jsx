import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, Globe, MessageCircle, MapPin, ChevronDown } from "lucide-react";
import CurrencySelector from "@/components/CurrencySelector";
import { useLanguage } from "@/lib/LanguageContext";

const WHATSAPP_URL = "https://wa.me/35315550194?text=Hi%2C%20I%20would%20like%20to%20enquire%20about%20your%20visa%20services";

const LOGO_URL = "https://media.base44.com/images/public/6ab259a12c209e348271e50c/1791d7cc5_travel.png";

const FOOTER_GROUPS = [
  {
    title: "Services",
    links: [
      { label: "All Services", to: "/services" },
      { label: "Visa Applications", to: "/visa-application" },
      { label: "Nationality", to: "/nationality-application" },
      { label: "Travel Insurance", to: "/travel-insurance" },
      { label: "Premium Packages", to: "/premium-packages" },
      { label: "VIP Services", to: "/vip-services" },
      { label: "Expert Consultation", to: "/consultation" },
    ],
  },
  {
    title: "Tools & Resources",
    links: [
      { label: "Smart Checker", to: "/smart-checker" },
      { label: "Visa Knowledge Base", to: "/visa-guide" },
      { label: "Visa Comparison", to: "/visa-comparison" },
      { label: "Country Profiles", to: "/country-profiles" },
      { label: "Country Insights", to: "/country-insights" },
      { label: "Pricing Calculator", to: "/pricing-calculator" },
      { label: "Travel Calculator", to: "/travel-calculator" },
      { label: "Embassy Directory", to: "/embassy-directory" },
      { label: "Travel Checklist", to: "/travel-checklist" },
      { label: "Service Status", to: "/service-status" },
    ],
  },
  {
    title: "My Account",
    links: [
      { label: "Dashboard", to: "/dashboard" },
      { label: "My Applications", to: "/mes-demandes" },
      { label: "Application History", to: "/application-history" },
      { label: "Payment History", to: "/payment-history" },
      { label: "Document Vault", to: "/coffre-fort" },
      { label: "My Documents", to: "/my-documents" },
      { label: "Document Library", to: "/document-library" },
      { label: "Messaging", to: "/messagerie" },
      { label: "My Profile", to: "/profil" },
      { label: "Settings", to: "/parametres" },
      { label: "Identity Verification", to: "/identity-verification" },
      { label: "Currency Settings", to: "/currency-settings" },
    ],
  },
  {
    title: "Track & Stay Informed",
    links: [
      { label: "Track Application", to: "/track-application" },
      { label: "Quick Tracker", to: "/tracker" },
      { label: "Notifications", to: "/notifications" },
      { label: "Alerts", to: "/alertes" },
      { label: "News & Updates", to: "/news" },
      { label: "Travel Blog", to: "/travel-blog" },
      { label: "Visa FAQ", to: "/visa-faq" },
      { label: "Referral Program", to: "/referrals" },
      { label: "Partner Programs", to: "/partners" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "How It Works", to: "/how-it-works" },
      { label: "Testimonials", to: "/testimonials" },
      { label: "Success Stories", to: "/success-stories" },
      { label: "Visa Guide", to: "/guide-visa" },
      { label: "FAQ", to: "/faq" },
      { label: "Contact", to: "/contact" },
      { label: "Terms of Service", to: "/terms-of-service" },
    ],
  },
];

function FooterGroup({ group }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-navy-border md:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-3 md:py-0 md:cursor-default"
      >
        <h4 className="text-white font-semibold text-sm uppercase tracking-wider">{group.title}</h4>
        <ChevronDown className={`w-4 h-4 text-white/50 md:hidden transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <ul className={`space-y-2 text-sm md:block ${open ? "block pb-3" : "hidden"}`}>
        {group.links.map((link) => (
          <li key={link.to}>
            <Link to={link.to} className="text-white/60 hover:text-green transition">{link.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const { t, lang } = useLanguage();
  return (
    <footer className="bg-navy text-white/70 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-6 gap-8">
        {/* Brand column */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 text-white mb-4">
            <img src={LOGO_URL} alt="TrekVisa" className="w-10 h-10 rounded-lg object-cover" />
            <span className="font-display font-700 text-lg">Trek<span className="text-green">Visa</span></span>
          </div>
          <p className="text-sm leading-relaxed">{t("footer.tagline")}</p>
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white bg-green hover:bg-green-hover transition">
            <MessageCircle className="w-4 h-4" /> {t("header.whatsapp")}
          </a>
        </div>

        {/* Dropdown groups */}
        {FOOTER_GROUPS.map((group) => (
          <FooterGroup key={group.title} group={group} />
        ))}
      </div>

      {/* Contact strip */}
      <div className="border-t border-navy-border">
        <div className="max-w-7xl mx-auto px-6 py-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div className="flex items-start gap-2"><MapPin className="w-4 h-4 text-green mt-0.5 shrink-0" /> 2nd Floor, 5 Grand Canal Square, Dublin 2, D02 A342, Ireland</div>
          <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-green" /> +353 1 555 0194</div>
          <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-green" /> contact@trekvisa.com</div>
          <div className="flex items-center gap-2"><Globe className="w-4 h-4 text-green" /> {lang === "fr" ? "Service international 24/7" : "24/7 international service"}</div>
        </div>
      </div>

      {/* Legal / disclaimer */}
      <div className="border-t border-navy-border">
        <div className="max-w-7xl mx-auto px-6 py-6 space-y-3">
          <p className="text-xs text-white/50 leading-relaxed max-w-4xl">{t("footer.disclaimer")}</p>
          <div className="flex flex-col sm:flex-row justify-between gap-2 text-xs text-white/50">
            <span>© 2026 TREK VISA LIMITED · CRO No. 123456.78 · Dublin, Ireland</span>
            <span className="flex items-center gap-2">
              <Link to="/terms-of-service" className="hover:text-green transition">{t("footer.legal")}</Link>
              <span className="text-white/20">·</span>
              <Link to="/terms-of-service" className="hover:text-green transition">{t("footer.privacy")}</Link>
              <span className="text-white/20">·</span>
              <Link to="/terms-of-service" className="hover:text-green transition">{t("footer.terms")}</Link>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}