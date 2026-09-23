import React, { useState, useMemo } from "react";
import { Search, MapPin, Phone, Mail, Globe, Building2, ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CountryFlag from "@/components/CountryFlag";

const EMBASSY_DATA = [
  { country: "United States", iso2: "US", city: "Washington D.C.", address: "2201 C Street NW", phone: "+1 202 485 1000", email: "info@embassy.gov", website: "https://www.usembassy.gov" },
  { country: "United Kingdom", iso2: "GB", city: "London", address: "King Charles Street, SW1A 2AH", phone: "+44 20 7008 1500", email: "enquiries@fco.gov.uk", website: "https://www.gov.uk" },
  { country: "France", iso2: "FR", city: "Paris", address: "57 Boulevard des Invalides", phone: "+33 1 43 17 67 00", email: "contact@diplomatie.gouv.fr", website: "https://www.diplomatie.gouv.fr" },
  { country: "Germany", iso2: "DE", city: "Berlin", address: "Werderscher Markt 1", phone: "+49 30 1817 0", email: "info@auswaertiges-amt.de", website: "https://www.auswaertiges-amt.de" },
  { country: "Canada", iso2: "CA", city: "Ottawa", address: "125 Sussex Drive", phone: "+1 613 992 6111", email: "info@international.gc.ca", website: "https://www.international.gc.ca" },
  { country: "Australia", iso2: "AU", city: "Canberra", address: "1 Commonwealth Avenue", phone: "+61 2 6261 1111", email: "info@dfat.gov.au", website: "https://www.dfat.gov.au" },
  { country: "Japan", iso2: "JP", city: "Tokyo", address: "2-2-1 Kasumigaseki", phone: "+81 3 3580 3311", email: "info@mofa.go.jp", website: "https://www.mofa.go.jp" },
  { country: "China", iso2: "CN", city: "Beijing", address: "11 Jian Guo Men Wai Da Jie", phone: "+86 10 6532 1115", email: "info@fmprc.gov.cn", website: "https://www.fmprc.gov.cn" },
  { country: "UAE", iso2: "AE", city: "Abu Dhabi", address: "Embassy District, Abu Dhabi", phone: "+971 2 444 4400", email: "info@mofa.gov.ae", website: "https://www.mofa.gov.ae" },
  { country: "Brazil", iso2: "BR", city: "Brasília", address: "SES - Avenida das Nações", phone: "+55 61 2030 9200", email: "info@itamaraty.gov.br", website: "https://www.gov.br/mre" },
  { country: "India", iso2: "IN", city: "New Delhi", address: "South Block, Raisina Hill", phone: "+91 11 2301 2000", email: "info@mea.gov.in", website: "https://www.mea.gov.in" },
  { country: "South Africa", iso2: "ZA", city: "Pretoria", address: "460 Sanniesfontein Road", phone: "+27 12 351 1000", email: "info@dirco.gov.za", website: "https://www.dirco.gov.za" },
  { country: "Singapore", iso2: "SG", city: "Singapore", address: "1 Sherwood Road", phone: "+65 6379 8000", email: "info@mfa.gov.sg", website: "https://www.mfa.gov.sg" },
  { country: "Thailand", iso2: "TH", city: "Bangkok", address: "357 Sanam Bin Nam", phone: "+66 2 203 5000", email: "info@mfa.go.th", website: "https://www.mfa.go.th" },
  { country: "Turkey", iso2: "TR", city: "Ankara", address: "Dr. Refik Saydam Caddesi", phone: "+90 312 292 2000", email: "info@mfa.gov.tr", website: "https://www.mfa.gov.tr" },
];

export default function EmbassyDirectory() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return EMBASSY_DATA;
    const q = query.toLowerCase();
    return EMBASSY_DATA.filter((e) => e.country.toLowerCase().includes(q) || e.city.toLowerCase().includes(q));
  }, [query]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <section className="bg-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, #E5231B 0, transparent 40%)" }} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 lg:py-20 relative text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green/15 border border-green/30 text-green text-xs font-600 uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" /> Embassy Directory
          </span>
          <h1 className="font-display font-700 text-white mt-5" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>Global Embassy Directory</h1>
          <p className="text-white/70 text-[0.938rem] mt-3 max-w-xl mx-auto">Search for diplomatic mission contact information for any country worldwide.</p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 w-full flex-1">
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by country or city..."
            className="w-full pl-12 pr-4 py-3.5 rounded-full border border-border bg-white text-sm outline-none focus:border-green"
          />
        </div>

        {results.length === 0 ? (
          <div className="text-center py-20 rounded-2xl border-2 border-dashed border-border">
            <p className="text-muted-foreground">No embassies found for "{query}"</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {results.map((e) => (
              <div key={e.country} className="bg-white rounded-2xl border border-border p-5 hover:shadow-lg transition">
                <div className="flex items-center gap-3 mb-4">
                  <CountryFlag iso2={e.iso2} name={e.country} size={44} />
                  <div>
                    <p className="font-display font-700 text-navy">{e.country}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3" /> {e.city}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="text-muted-foreground flex items-start gap-2"><Building2 className="w-4 h-4 shrink-0 mt-0.5 text-green" /> {e.address}</p>
                  <p className="text-foreground flex items-center gap-2"><Phone className="w-4 h-4 shrink-0 text-green" /> {e.phone}</p>
                  <p className="text-foreground flex items-center gap-2"><Mail className="w-4 h-4 shrink-0 text-green" /> {e.email}</p>
                  <a href={e.website} target="_blank" rel="noreferrer" className="text-green flex items-center gap-2 font-600 hover:underline">
                    <Globe className="w-4 h-4 shrink-0" /> Visit website <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}