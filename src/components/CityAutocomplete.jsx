import React, { useState, useRef, useEffect } from "react";
import { Search, Check, ChevronDown, MapPin } from "lucide-react";
import { getCities } from "@/lib/worldCountries";

/**
 * Searchable city autocomplete backed by the world database.
 * ALWAYS allows manual entry — if the typed city is not in the database,
 * the typed value is still accepted. No applicant is ever forced to pick
 * a listed city.
 */
export default function CityAutocomplete({ countryName, value, onChange, placeholder = "Search city…", className = "" }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const listRef = useRef(null);

  const cities = getCities(countryName);
  const filtered = query
    ? cities.filter((c) => c.toLowerCase().includes(query.toLowerCase())).slice(0, 40)
    : cities.slice(0, 40);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function pick(city) {
    onChange(city);
    setQuery("");
    setOpen(false);
    setActive(0);
  }

  function onKeyDown(e) {
    if (!open) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, Math.max(filtered.length - 1, 0))); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    else if (e.key === "Enter") { e.preventDefault(); if (filtered[active]) pick(filtered[active]); else if (query.trim()) pick(query.trim()); }
    else if (e.key === "Escape") setOpen(false);
  }

  useEffect(() => {
    if (open && listRef.current) {
      const el = listRef.current.querySelector(`[data-idx="${active}"]`);
      el?.scrollIntoView({ block: "nearest" });
    }
  }, [active, open]);

  return (
    <div className={`relative ${className}`} ref={ref}>
      <div className="relative">
        <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          value={open ? query : (value || "")}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder={countryName ? placeholder : "Select a country first"}
          disabled={!countryName}
          className="w-full pl-10 pr-10 py-3 rounded-full border border-border bg-white text-sm text-foreground outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <button type="button" tabIndex={-1} onClick={() => countryName && setOpen((o) => !o)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground disabled:opacity-40" disabled={!countryName}>
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {open && (
        <div className="absolute z-50 left-0 right-0 mt-2 bg-white rounded-2xl border border-border shadow-xl max-h-64 overflow-y-auto" ref={listRef}>
          {filtered.length === 0 && !query.trim() && (
            <p className="px-4 py-5 text-sm text-muted-foreground text-center flex items-center justify-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" /> {cities.length === 0 ? "Type your city — manual entry supported" : "Start typing to search…"}
            </p>
          )}
          {filtered.map((city, i) => (
            <button
              key={city}
              data-idx={i}
              onClick={() => pick(city)}
              className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-left transition ${active === i ? "bg-muted" : "hover:bg-muted/60"} ${value === city ? "text-green font-600" : "text-foreground"}`}
            >
              <MapPin className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
              <span className="flex-1 truncate">{city}</span>
              {value === city && <Check className="w-4 h-4 text-green shrink-0" />}
            </button>
          ))}
          {query.trim() && !cities.some((c) => c.toLowerCase() === query.toLowerCase()) && (
            <button
              onClick={() => pick(query.trim())}
              className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-left hover:bg-muted border-t border-border transition"
            >
              <MapPin className="w-3.5 h-3.5 text-green shrink-0" />
              <span className="flex-1"><span className="text-muted-foreground text-xs">Use custom: </span><span className="font-600 text-navy">{query.trim()}</span></span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}