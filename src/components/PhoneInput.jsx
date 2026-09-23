import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react";
import { COUNTRIES_DATA } from "@/lib/worldCountries";
import CountryFlag from "@/components/CountryFlag";

function parseValue(val = "") {
  const match = (val || "").match(/^(\+\d{1,4})\s*(.*)/);
  if (match) return { dialCode: match[1], phone: match[2] || "" };
  return { dialCode: "+971", phone: val || "" };
}

export default function PhoneInput({ value = "", onChange, placeholder = "50 123 4567", className = "" }) {
  const initial = parseValue(value);
  const [dialCode, setDialCode] = useState(initial.dialCode);
  const [phone, setPhone] = useState(initial.phone);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef(null);

  const selected = COUNTRIES_DATA.find((c) => c.dialCode === dialCode) || COUNTRIES_DATA.find((c) => c.iso2 === "AE");

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const parsed = parseValue(value);
    if (parsed.dialCode !== dialCode || parsed.phone !== phone) {
      setDialCode(parsed.dialCode);
      setPhone(parsed.phone);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const filtered = COUNTRIES_DATA.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) || c.dialCode.includes(search)
  );

  const emit = (dc, ph) => {
    setDialCode(dc);
    setPhone(ph);
    onChange?.(dc + " " + ph);
  };

  return (
    <div className={`flex w-full ${className}`}>
      <div className="relative" ref={ref}>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1.5 px-2.5 h-11 border border-border rounded-l-lg bg-white hover:bg-muted transition shrink-0"
        >
          <CountryFlag iso2={selected?.iso2} name={selected?.name} size={22} />
          <span className="text-sm font-600 text-navy">{dialCode}</span>
          <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
        </button>
        {open && (
          <div className="absolute top-full left-0 mt-1 z-50 bg-white rounded-xl shadow-xl border border-border w-72 max-h-80 overflow-hidden flex flex-col">
            <div className="p-2 border-b border-border">
              <div className="relative">
                <Search className="w-4 h-4 text-muted-foreground absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  autoFocus
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search country..."
                  className="w-full pl-8 pr-3 py-2 text-sm border border-border rounded-lg outline-none focus:ring-2 focus:ring-[#E5231B]"
                />
              </div>
            </div>
            <div className="overflow-y-auto flex-1">
              {filtered.map((c) => (
                <button
                  key={c.iso2}
                  type="button"
                  onClick={() => { emit(c.dialCode, phone); setOpen(false); setSearch(""); }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 hover:bg-muted transition text-left ${c.dialCode === dialCode ? "bg-green/5" : ""}`}
                >
                  <CountryFlag iso2={c.iso2} name={c.name} size={24} />
                  <span className="text-sm text-navy flex-1 truncate">{c.name}</span>
                  <span className="text-xs text-muted-foreground">{c.dialCode}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <input
        type="tel"
        value={phone}
        onChange={(e) => emit(dialCode, e.target.value.replace(/[^\d\s-]/g, ""))}
        placeholder={placeholder}
        className="flex-1 min-w-0 px-3 h-11 border border-l-0 border-border rounded-r-lg text-sm font-500 bg-white outline-none focus:ring-2 focus:ring-[#E5231B]"
      />
    </div>
  );
}