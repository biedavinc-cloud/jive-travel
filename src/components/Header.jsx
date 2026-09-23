import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, Phone, Mail } from "lucide-react";
import CurrencySelector from "@/components/CurrencySelector";
import { useLanguage } from "@/lib/LanguageContext";

const LOGO_URL = "https://media.base44.com/images/public/6ab259a12c209e348271e50c/1791d7cc5_travel.png";

export default function Header() {
  const { lang, setLang, t } = useLanguage();
  const [open, setOpen] = useState(false);

  const NAV = [
    { label: "Smart Checker", to: "/smart-checker" },
    {
      label: "Visas",
      children: [
        { label: "Schengen Visa", to: "/visa-application", state: { destination: "Germany" } },
        { label: "USA Visa", to: "/visa-application", state: { destination: "United States" } },
        { label: "UK Visa", to: "/visa-application", state: { destination: "United Kingdom" } },
        { label: "Other Visas", to: "/visa-application" },
      ],
    },
    { label: "Nationality", to: "/nationality-application" },
    {
      label: "Tools",
      children: [
        { label: "Visa Knowledge Base", to: "/visa-guide" },
        { label: "Visa Comparison", to: "/visa-comparison" },
        { label: "Country Profiles", to: "/country-profiles" },
        { label: "Pricing Calculator", to: "/pricing-calculator" },
        { label: "Document Library", to: "/document-library" },
        { label: "Track Application", to: "/track-application" },
        { label: "Referral Program", to: "/referrals" },
      ],
    },
    {
      label: "About",
      children: [
        { label: "Visa Guide", to: "/guide-visa" },
        { label: "FAQ", to: "/faq" },
        { label: "Contact", to: "/contact" },
        { label: "How it works", to: "/#how-it-works" },
      ],
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-border">
      {/* Top bar — discreet */}
      <div className="hidden md:block bg-navy text-white/55 text-xs">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between" style={{ height: "2.25rem" }}>
          <div className="flex items-center gap-6">
            <a href="tel:+35315550194" className="flex items-center gap-1.5 hover:text-white transition">
              <Phone className="w-3 h-3" /> +353 1 555 0194
            </a>
            <a href="mailto:contact@trekvisa.com" className="flex items-center gap-1.5 hover:text-white transition">
              <Mail className="w-3 h-3" /> contact@trekvisa.com
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="hover:text-white transition">{t("header.login")}</Link>
            <span className="text-white/20">|</span>
            <Link to="/dashboard" className="hover:text-white transition">Dashboard</Link>
            <span className="text-white/20">|</span>
            <div className="flex items-center gap-1.5">
              <button onClick={() => setLang("fr")} className={`hover:text-white transition ${lang === "fr" ? "text-white font-600" : ""}`}>FR</button>
              <span className="text-white/20">/</span>
              <button onClick={() => setLang("en")} className={`hover:text-white transition ${lang === "en" ? "text-white font-600" : ""}`}>EN</button>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between" style={{ height: "4.75rem" }}>
        <Link to="/" className="flex items-center gap-2.5">
          <img src={LOGO_URL} alt="TrekVisa" className="w-10 h-10 rounded-lg object-cover" />
          <div className="leading-none">
            <span className="font-display font-700 text-xl tracking-tight text-navy block">Trek<span className="text-green">Visa</span></span>
            <span className="text-[0.6rem] text-muted-foreground uppercase tracking-[0.2em]">Visa Services</span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-9 text-sm font-500">
          {NAV.map((item) => <NavItem key={item.label} item={item} />)}
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/smart-checker" className="hidden sm:inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-green hover:bg-green-hover transition shadow-sm">
            Get Started
          </Link>
          <button onClick={() => setOpen(!open)} className="lg:hidden text-navy p-2">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-white border-t border-border px-6 py-5 space-y-1">
          {NAV.map((item) => item.children ? (
            <div key={item.label} className="py-1">
              <p className="text-muted-foreground text-xs uppercase tracking-wider px-2 py-1.5">{item.label}</p>
              {item.children.map((c) => (
                <Link key={c.label} to={c.to} state={c.state} onClick={() => setOpen(false)} className="block text-navy py-2.5 px-2 hover:text-green">{c.label}</Link>
              ))}
            </div>
          ) : (
            <Link key={item.label} to={item.to} onClick={() => setOpen(false)} className="block text-navy py-2.5 px-2 hover:text-green font-500">{item.label}</Link>
          ))}
          <div className="flex items-center gap-2 pt-4 mt-3 border-t border-border">
            <button onClick={() => setLang("fr")} className={`px-3 py-1.5 rounded-full text-xs font-600 ${lang === "fr" ? "bg-navy text-white" : "bg-muted text-muted-foreground"}`}>FR</button>
            <button onClick={() => setLang("en")} className={`px-3 py-1.5 rounded-full text-xs font-600 ${lang === "en" ? "bg-navy text-white" : "bg-muted text-muted-foreground"}`}>EN</button>
            <CurrencySelector />
          </div>
          <Link to="/smart-checker" onClick={() => setOpen(false)} className="mt-3 flex items-center justify-center px-5 py-3 rounded-full text-sm font-semibold text-white bg-green">
            Get Started
          </Link>
          <Link to="/login" onClick={() => setOpen(false)} className="block text-center text-navy py-2 hover:text-green text-sm">{t("header.login")}</Link>
        </div>
      )}
    </header>
  );
}

function NavItem({ item }) {
  const [open, setOpen] = useState(false);
  if (item.children) {
    return (
      <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
        <button className="flex items-center gap-1 text-navy hover:text-green transition py-2">
          {item.label} <ChevronDown className="w-3.5 h-3.5 opacity-50" />
        </button>
        {open && (
          <div className="absolute left-0 top-full pt-2 z-50">
            <div className="bg-white rounded-xl shadow-xl border border-border overflow-hidden min-w-[200px]">
              {item.children.map((c) => (
                <Link key={c.label} to={c.to} state={c.state}
                  className="block px-4 py-3 text-sm text-navy hover:bg-muted hover:text-green transition">{c.label}</Link>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
  return <Link to={item.to} className="text-navy hover:text-green transition py-2">{item.label}</Link>;
}