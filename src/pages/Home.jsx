import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Clock, ArrowRight, Star, Globe, FileText, PenLine, FolderCheck, Plane, Cpu, UserCheck, Lock, FileSignature, Headset, Quote, Award } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VisaSimulator from "@/components/VisaSimulator";
import HeroSlideshow from "@/components/HeroSlideshow";
import CountUp from "@/components/CountUp";
import ScrollingBanner from "@/components/ScrollingBanner";
import { Image } from "@/components/ui/image";
import RotatingImage from "@/components/RotatingImage";
import { COUNTRIES, flag, flagUrl, getBaseVisaPrice, applyCommission } from "@/lib/visaData";
import { COUNTRIES_DATA } from "@/lib/worldCountries";
import CountryFlag from "@/components/CountryFlag";
import { useCurrency } from "@/lib/CurrencyContext";
import { formatPrice } from "@/lib/currencies";
import { useLanguage } from "@/lib/LanguageContext";

const WHATSAPP_URL = "https://wa.me/35315550194?text=Hi%2C%20I%20would%20like%20to%20enquire%20about%20your%20visa%20services";

export default function Home() {
  const { lang, t } = useLanguage();
  const { currency } = useCurrency();
  const fromPrice = (dest) => dest ? formatPrice(applyCommission(getBaseVisaPrice(dest, "tourism")), currency) : null;

  const STEPS = [
    { icon: FileText, title: t("howItWorks.step1Title"), text: t("howItWorks.step1Text") },
    { icon: PenLine, title: t("howItWorks.step2Title"), text: t("howItWorks.step2Text") },
    { icon: FolderCheck, title: t("howItWorks.step3Title"), text: t("howItWorks.step3Text") },
    { icon: Plane, title: t("howItWorks.step4Title"), text: t("howItWorks.step4Text") },
  ];

  const SERVICES = [
    { iso2: "EU", name: t("services.schengen"), meta: `${t("services.from")} 3 ${lang === "fr" ? "jours" : "days"}`, img: "https://images.unsplash.com/photo-1499856871958-e5b07fbb0bbf?w=800&q=80", to: "/visa-application", state: { destination: "Germany" }, imgs: [
      "https://images.unsplash.com/photo-1499856871958-e5b07fbb0bbf?w=800&q=80",
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
      "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=800&q=80",
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80",
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80",
    ] },
    { iso2: "US", name: t("services.usa"), meta: `${t("services.from")} 2 ${lang === "fr" ? "semaines" : "weeks"}`, img: "https://images.unsplash.com/photo-1485871982321-0681cc319771?w=800&q=80", to: "/visa-application", state: { destination: "United States" }, imgs: [
      "https://images.unsplash.com/photo-1485871982321-0681cc319771?w=800&q=80",
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80",
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80",
      "https://images.unsplash.com/photo-1485872394255-791f8f4b3b3b?w=800&q=80",
      "https://images.unsplash.com/photo-1503551782900-8f6b3b3c3c3c?w=800&q=80",
    ] },
    { iso2: "GB", name: t("services.uk"), meta: `${t("services.from")} 1 ${lang === "fr" ? "jour" : "day"}`, img: "https://images.unsplash.com/photo-1513635262778-9c6b2b3d3b3b?w=800&q=80", to: "/visa-application", state: { destination: "United Kingdom" }, imgs: [
      "https://images.unsplash.com/photo-1513635262778-9c6b2b3d3b3b?w=800&q=80",
      "https://images.unsplash.com/photo-1533920394814-363f96578104?w=800&q=80",
      "https://images.unsplash.com/photo-1516298775577-53b0d3d3d3d3?w=800&q=80",
      "https://images.unsplash.com/photo-1503551782900-8f6b3b3c3c3c?w=800&q=80",
      "https://images.unsplash.com/photo-1493946731-7812b3d3d3d3?w=800&q=80",
    ] },
    { iso2: "CA", name: t("services.canada"), meta: `${t("services.from")} 5 ${lang === "fr" ? "jours" : "days"}`, img: "https://media.base44.com/images/public/6ab259a12c209e348271e50c/3ca901731_generated_image.png", to: "/visa-application", state: { destination: "Canada" } },
    { iso2: "AU", name: t("services.australia"), meta: `${t("services.from")} 1 ${lang === "fr" ? "semaine" : "week"}`, img: "https://media.base44.com/images/public/6ab259a12c209e348271e50c/4bb5e01e2_generated_image.png", to: "/visa-application", state: { destination: "Australia" } },
    { iso2: "JP", name: t("services.japan"), meta: `${t("services.from")} 4 ${lang === "fr" ? "jours" : "days"}`, img: "https://images.unsplash.com/photo-1540959733332-eab4ffabeeaf?w=800&q=80", to: "/visa-application", state: { destination: "Japan" }, imgs: [
      "https://images.unsplash.com/photo-1540959733332-eab4ffabeeaf?w=800&q=80",
      "https://images.unsplash.com/photo-1493977324508-3f3a3d3d3d3b?w=800&q=80",
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80",
      "https://images.unsplash.com/photo-1480796927424-fd9427d6c636?w=800&q=80",
      "https://images.unsplash.com/photo-1554797589-7241f7e3b3d3?w=800&q=80",
    ] },
    { iso2: "SG", name: t("services.singapore"), meta: `${t("services.from")} 3 ${lang === "fr" ? "jours" : "days"}`, img: "https://media.base44.com/images/public/6ab259a12c209e348271e50c/624e43186_generated_image.png", to: "/visa-application", state: { destination: "Singapore" } },
    { iso2: "CN", name: t("services.china"), meta: `${t("services.from")} 4 ${lang === "fr" ? "jours" : "days"}`, img: "https://media.base44.com/images/public/6ab259a12c209e348271e50c/ccb433f87_generated_image.png", to: "/visa-application", state: { destination: "China" } },
    { iso2: "IN", name: t("services.india"), meta: `${t("services.from")} 5 ${lang === "fr" ? "jours" : "days"}`, img: "https://media.base44.com/images/public/6ab259a12c209e348271e50c/adc10be08_generated_image.png", to: "/visa-application", state: { destination: "India" } },
    { iso2: "BR", name: t("services.brazil"), meta: `${t("services.from")} 5 ${lang === "fr" ? "jours" : "days"}`, img: "https://media.base44.com/images/public/6ab259a12c209e348271e50c/7829e5873_generated_image.png", to: "/visa-application", state: { destination: "Brazil" } },
    { iso2: "TH", name: t("services.thailand"), meta: `${t("services.from")} 3 ${lang === "fr" ? "jours" : "days"}`, img: "https://media.base44.com/images/public/6ab259a12c209e348271e50c/5f775da92_generated_image.png", to: "/visa-application", state: { destination: "Thailand" } },
    { iso2: "AE", name: t("services.uae"), meta: `${t("services.from")} 3 ${lang === "fr" ? "jours" : "days"}`, img: "https://media.base44.com/images/public/6ab259a12c209e348271e50c/0b40f149c_generated_image.png", to: "/visa-application", state: { destination: "UAE" } },
    { iso2: "ZA", name: t("services.southAfrica"), meta: `${t("services.from")} 7 ${lang === "fr" ? "jours" : "days"}`, img: "https://media.base44.com/images/public/6ab259a12c209e348271e50c/d666a589d_generated_image.png", to: "/visa-application", state: { destination: "South Africa" } },
    { iso2: "TR", name: t("services.turkey"), meta: `${t("services.from")} 2 ${lang === "fr" ? "jours" : "days"}`, img: "https://media.base44.com/images/public/6ab259a12c209e348271e50c/7a8c23e91_generated_image.png", to: "/visa-application", state: { destination: "Turkey" } },
    { flag: "🏛️", name: t("services.nationality"), meta: lang === "fr" ? "Citoyenneté" : "Citizenship", img: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=800&q=80", to: "/nationality-application" },
  ];

  const EXPERTISE = [
    { icon: Cpu, title: t("tech.aiTitle"), text: t("tech.aiText") },
    { icon: UserCheck, title: t("tech.expertTitle"), text: t("tech.expertText") },
    { icon: ShieldCheck, title: t("tech.humanTitle"), text: t("tech.humanText") },
    { icon: Star, title: t("tech.fasterTitle"), text: t("tech.fasterText") },
  ];

  const TRUST = [
    { icon: Star, title: t("trust.1Title"), text: t("trust.1Text") },
    { icon: Lock, title: t("trust.2Title"), text: t("trust.2Text") },
    { icon: FileSignature, title: t("trust.3Title"), text: t("trust.3Text") },
    { icon: Headset, title: t("trust.4Title"), text: t("trust.4Text") },
  ];

  const PARTNERS = [
    { iso2: "EU", name: "Schengen" },
    { iso2: "US", name: "USA" },
    { iso2: "GB", name: "UK" },
    { iso2: "CA", name: "Canada" },
    { iso2: "AU", name: "Australia" },
    { iso2: "JP", name: "Japan" },
    { iso2: "SG", name: "Singapore" },
    { iso2: "CN", name: "China" },
    { iso2: "IN", name: "India" },
    { iso2: "BR", name: "Brazil" },
  ];

  const TESTIMONIALS = [
    { iso2: "AE", name: "Ahmed Al-Rashid", country: t("testimonials.country1"), visa: t("testimonials.visa1"), text: t("testimonials.text1") },
    { iso2: "PH", name: "Maria Santos", country: t("testimonials.country2"), visa: t("testimonials.visa2"), text: t("testimonials.text2") },
    { iso2: "NG", name: "James Okonkwo", country: t("testimonials.country3"), visa: t("testimonials.visa3"), text: t("testimonials.text3") },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* HERO with rotating travel slideshow */}
      <section className="relative overflow-hidden bg-navy min-h-[620px] flex items-center">
        <HeroSlideshow />
        <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green/15 border border-green/30 text-green text-xs font-700 uppercase tracking-wider mb-6 backdrop-blur-sm">
              <Star className="w-3.5 h-3.5 fill-green" /> {t("hero.badge")}
            </span>
            <h1 className="font-display font-700 text-white leading-[1.05] drop-shadow-lg" style={{ fontSize: "clamp(2.25rem, 5vw, 3.75rem)" }}>
              {t("hero.titlePrefix")} <span className="text-green">{t("hero.titleHighlight")}</span> {t("hero.titleSuffix")}
            </h1>
            <p className="text-white/85 text-[1rem] leading-relaxed mt-5 max-w-lg drop-shadow">{t("hero.subtitle")}</p>
            <div className="flex flex-wrap items-center gap-5 mt-8 text-white/80 text-xs">
              <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-green" /> {t("hero.replyMin")}</div>
              <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-green" /> {t("hero.dmcc")}</div>
              <div className="flex items-center gap-2"><Globe className="w-4 h-4 text-green" /> {t("hero.visasIssued")}</div>
            </div>
          </div>
          <div className="animate-fade-up relative z-10" style={{ animationDelay: "0.1s" }}>
            <VisaSimulator />
          </div>
        </div>
      </section>

      {/* STATS STRIP — animated count-up */}
      <section className="bg-navy-soft border-y border-navy-border">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { isTrustpilot: true, end: 4.7, decimals: 1, l: t("stats.rating") },
            { end: 30000, suffix: "+", l: t("stats.visasIssued") },
            { end: 130, suffix: "+", l: t("stats.countries") },
            { end: 94, suffix: "%", l: t("stats.success") },
          ].map((s) => (
            <div key={s.l} className="px-2">
              <div className="flex items-center justify-center gap-2">
                {s.isTrustpilot && (
                  <div className="flex items-center gap-0.5 bg-green/10 px-2 py-1 rounded-full">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-3 h-3 md:w-3.5 md:h-3.5 fill-green text-green" />)}
                  </div>
                )}
                <p className="font-display font-700 text-white text-2xl md:text-4xl">
                  <CountUp end={s.end} decimals={s.decimals || 0} prefix={s.prefix || ""} suffix={s.suffix || ""} />
                </p>
              </div>
              <p className="text-white/50 text-xs md:text-sm mt-2 uppercase tracking-wider">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ACCREDITATIONS / PARTNERS — premium scrolling banner */}
      <section className="bg-white border-b border-border overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 pt-10 pb-6">
          <div className="flex flex-col items-center gap-3 mb-8">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-green/10 border border-green/20">
              <Award className="w-4 h-4 text-green" />
              <p className="text-green text-xs font-700 uppercase tracking-[0.15em]">{t("partners.label")}</p>
            </div>
            <p className="text-center text-navy font-display font-600 text-sm md:text-base max-w-2xl">{lang === "fr" ? "Agréé et enregistré auprès des ambassades et consulats officiels" : "Accredited and registered with official embassies and consulates"}</p>
          </div>
        </div>
        <ScrollingBanner items={PARTNERS} speed={120}>
          {(p) => (
            <div className="flex items-center gap-3 px-5 py-3 rounded-full bg-muted/60 border border-border hover:border-green/40 hover:bg-green/5 transition group whitespace-nowrap">
              <CountryFlag iso2={p.iso2} name={p.name} size={32} />
              <span className="font-600 text-sm text-navy group-hover:text-green transition">{p.name}</span>
            </div>
          )}
        </ScrollingBanner>
        <div className="h-6" />
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-20 scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-green text-xs font-600 uppercase tracking-wider">{t("howItWorks.label")}</span>
          <h2 className="font-display font-700 text-navy mt-2" style={{ fontSize: "1.875rem" }}>{t("howItWorks.title")}</h2>
          <p className="text-muted-foreground text-[0.938rem] mt-3">{t("howItWorks.subtitle")}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((s, i) => (
            <div key={i} className="bg-white rounded-2xl border border-border p-6 hover:shadow-lg transition">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-navy text-green font-700 flex items-center justify-center text-sm">{i + 1}</span>
                <s.icon className="w-5 h-5 text-green" />
              </div>
              <h3 className="font-display font-600 text-navy">{s.title}</h3>
              <p className="text-muted-foreground text-sm mt-2">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SMART TECHNOLOGY */}
      <section className="bg-white border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-20 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-green text-xs font-600 uppercase tracking-wider">{t("tech.label")}</span>
            <h2 className="font-display font-700 text-navy mt-2" style={{ fontSize: "1.875rem" }}>{t("tech.title")}</h2>
            <p className="text-muted-foreground text-[0.938rem] mt-4 max-w-lg">{t("tech.subtitle")}</p>
            <div className="grid sm:grid-cols-2 gap-5 mt-8">
              {EXPERTISE.map((e, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0"><e.icon className="w-5 h-5 text-navy" /></div>
                  <div>
                    <h3 className="font-600 text-navy text-sm">{e.title}</h3>
                    <p className="text-muted-foreground text-xs mt-1">{e.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl bg-navy overflow-hidden flex items-center justify-center">
              <div className="text-center px-8">
                <Cpu className="w-16 h-16 text-green mx-auto mb-4" />
                <p className="text-white font-display font-600 text-lg">{t("tech.cardTitle")}</p>
                <p className="text-white/60 text-sm mt-2">{t("tech.cardText")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR SERVICES — scrolling banner with real images */}
      <section className="py-16 lg:py-20 bg-white border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-10">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-green text-xs font-600 uppercase tracking-wider">{t("services.label")}</span>
            <h2 className="font-display font-700 text-navy mt-2" style={{ fontSize: "1.875rem" }}>{t("services.title")}</h2>
            <p className="text-muted-foreground text-[0.938rem] mt-3">{t("services.subtitle")}</p>
          </div>
        </div>
        <ScrollingBanner items={SERVICES} speed={90} itemClassName="w-64">
          {(s) => (
            <Link to={s.to} state={s.state} className="group relative rounded-2xl overflow-hidden border border-border hover:shadow-xl transition block aspect-[3/4]">
              <Image src={s.img} alt={s.name} fittingType="fill" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-navy/10" />
              <div className="absolute top-5 left-5">{s.iso2 ? <CountryFlag iso2={s.iso2} name={s.name} size={56} className="ring-2 ring-white/40" /> : <div className="w-14 h-14 rounded-full bg-white/15 flex items-center justify-center text-3xl backdrop-blur-sm border border-white/25">{s.flag}</div>}</div>
              <span className="absolute top-5 right-5 px-3 py-1 rounded-full bg-green/90 text-white text-xs font-700">{s.meta}</span>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-display font-600 text-white text-lg leading-tight">{s.name}</h3>
                {s.state?.destination && <p className="text-green text-sm font-700 mt-1">{t("services.from")} {fromPrice(s.state.destination)}</p>}
                <span className="inline-flex items-center gap-1 text-white/80 text-xs font-600 mt-2 group-hover:gap-2 transition-all">{t("services.learnMore")} <ArrowRight className="w-3.5 h-3.5" /></span>
              </div>
            </Link>
          )}
        </ScrollingBanner>
        <div className="text-center mt-8 px-4">
          <Link to="/visa-application" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-navy border border-border hover:bg-muted transition">
            {t("services.seeAll")} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* DESTINATIONS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s) => (
            <Link key={s.name} to={s.to} state={s.state} className="group relative rounded-2xl overflow-hidden border border-border hover:shadow-xl transition block aspect-[4/3]">
              {s.imgs ? <RotatingImage images={s.imgs} alt={s.name} className="absolute inset-0 w-full h-full" /> : <Image src={s.img} alt={s.name} fittingType="fill" className="absolute inset-0 w-full h-full object-cover" />}
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
              <div className="absolute top-4 left-4">{s.iso2 ? <CountryFlag iso2={s.iso2} name={s.name} size={48} className="ring-2 ring-white/40" /> : <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center text-2xl backdrop-blur-sm border border-white/25">{s.flag}</div>}</div>
              <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-green/90 text-white text-xs font-700">{s.meta}</span>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-display font-600 text-white text-lg">{s.name}</h3>
                {s.state?.destination ? (
                  <p className="text-green text-sm font-700 mt-1">{t("services.from")} {fromPrice(s.state.destination)}</p>
                ) : (
                  <p className="text-white/70 text-sm mt-1">{s.meta}</p>
                )}
                <span className="inline-flex items-center gap-1 text-white/80 text-xs font-600 mt-3 group-hover:gap-2 transition-all">{t("services.learnMore")} <ArrowRight className="w-3.5 h-3.5" /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ALL COUNTRIES — scrolling flag banner */}
      <section className="py-12 bg-navy border-y border-navy-border overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 text-center">
          <span className="text-green text-xs font-600 uppercase tracking-wider">{t("countriesBanner.label")}</span>
          <h2 className="font-display font-700 text-white mt-2" style={{ fontSize: "1.5rem" }}>{t("countriesBanner.title")}</h2>
          <p className="text-white/50 text-sm mt-2">{t("countriesBanner.subtitle")}</p>
        </div>
        <ScrollingBanner items={COUNTRIES_DATA} speed={220}>
          {(c) => (
            <Link to="/visa-application" state={{ destination: c.name }} className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-green/40 transition group whitespace-nowrap">
              <CountryFlag iso2={c.iso2} name={c.name} size={28} />
              <span className="text-white/80 text-sm font-500 group-hover:text-green transition">{c.name}</span>
            </Link>
          )}
        </ScrollingBanner>
      </section>

      {/* OUR EXPERTISE — Premium */}
      <section className="bg-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 30% 20%, #E5231B 0, transparent 50%)" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-24 relative">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green/15 border border-green/30 text-green text-xs font-700 uppercase tracking-[0.15em]">
              <Award className="w-3.5 h-3.5" /> {t("expertise.label")}
            </span>
            <h2 className="font-display font-700 text-white mt-4" style={{ fontSize: "clamp(1.875rem, 3vw, 2.5rem)" }}>{t("expertise.title")}</h2>
            <p className="text-white/60 text-[0.938rem] mt-4 max-w-xl mx-auto">{t("expertise.subtitle")}</p>
          </div>

          {/* Premium stat hero */}
          <div className="grid lg:grid-cols-3 gap-5 mb-10">
            <div className="lg:col-span-2 bg-gradient-to-br from-navy-soft to-navy border border-navy-border rounded-3xl p-8 lg:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-green/5 rounded-full blur-3xl" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-green/15 flex items-center justify-center"><Award className="w-6 h-6 text-green" /></div>
                  <div>
                    <p className="font-display font-700 text-green text-4xl">{t("expertise.stat1Num")}</p>
                    <p className="text-white/60 text-sm">{t("expertise.stat1Label")}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-navy-border">
                  <div>
                    <p className="font-display font-700 text-white text-2xl">{t("expertise.stat2Num")}</p>
                    <p className="text-white/50 text-xs mt-1">{t("expertise.stat2Label")}</p>
                  </div>
                  <div>
                    <p className="font-display font-700 text-white text-2xl">130+</p>
                    <p className="text-white/50 text-xs mt-1">{lang === "fr" ? "Pays desservis" : "Countries served"}</p>
                  </div>
                  <div>
                    <p className="font-display font-700 text-white text-2xl">24/7</p>
                    <p className="text-white/50 text-xs mt-1">{lang === "fr" ? "Support dédié" : "Dedicated support"}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-red-accent rounded-3xl p-8 flex flex-col justify-center text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
              <Star className="w-10 h-10 text-white mx-auto mb-3 fill-white" />
              <p className="font-display font-700 text-white text-5xl">94%</p>
              <p className="text-white/80 text-sm mt-2">{t("stats.success")}</p>
              <div className="flex items-center justify-center gap-0.5 mt-3">
                {[...Array(5)].map((_, j) => <Star key={j} className="w-3 h-3 fill-white text-white" />)}
              </div>
            </div>
          </div>

          {/* Trust pillars */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TRUST.map((t2, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-green/40 hover:bg-white/[0.07] transition group">
                <div className="w-12 h-12 rounded-full bg-green flex items-center justify-center mb-4 group-hover:scale-110 transition"><t2.icon className="w-5 h-5 text-white" /></div>
                <h3 className="font-display font-600 text-white text-sm">{t2.title}</h3>
                <p className="text-white/50 text-xs mt-2 leading-relaxed">{t2.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-green text-xs font-600 uppercase tracking-wider">{t("testimonials.label")}</span>
            <h2 className="font-display font-700 text-navy mt-2" style={{ fontSize: "1.875rem" }}>{t("testimonials.title")}</h2>
            <p className="text-muted-foreground text-[0.938rem] mt-3">{t("testimonials.subtitle")}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((tm, i) => (
              <a key={i} href="https://www.trustpilot.com/review/trkvisa.com" target="_blank" rel="noreferrer" className="bg-white rounded-2xl border border-border p-6 hover:shadow-lg transition relative block">
                <Quote className="w-8 h-8 text-green/20 absolute top-5 right-5" />
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-green text-green" />)}
                </div>
                <p className="text-foreground text-sm leading-relaxed mb-5">"{tm.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <CountryFlag iso2={tm.iso2} name={tm.name} size={40} />
                  <div>
                    <p className="font-600 text-navy text-sm">{tm.name}</p>
                    <p className="text-muted-foreground text-xs">{tm.country} · {tm.visa}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
          <div className="text-center mt-8">
            <a href="https://www.trustpilot.com/review/trkvisa.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-600 text-navy border border-border hover:bg-muted transition">
              <Star className="w-4 h-4 fill-green text-green" /> Read all reviews on Trustpilot <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center">
        <h2 className="font-display font-700 text-navy" style={{ fontSize: "1.875rem" }}>{t("cta.title")}</h2>
        <p className="text-muted-foreground text-[0.938rem] mt-3">{t("cta.subtitle")}</p>
        <div className="flex flex-wrap justify-center gap-3 mt-7">
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-white bg-green hover:bg-green-hover transition">
            <Plane className="w-4 h-4" /> {t("cta.whatsapp")}
          </a>
          <Link to="/visa-application" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-navy border border-border hover:bg-muted transition">
            {t("cta.start")} <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/smart-checker" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-navy border border-border hover:bg-muted transition">
            <ShieldCheck className="w-4 h-4" /> {t("cta.eligibility")}
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}