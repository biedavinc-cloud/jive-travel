import React, { useState, useRef, useEffect } from "react";
import { Search, Check, ChevronDown } from "lucide-react";
import { COUNTRIES_DATA, getCountryFlag, getDialCode, getRegion } from "@/lib/worldCountries";

/**
 * Searchable country autocomplete with flag, dial code and region.
 * Always allows manual entry — if the typed text doesn't match a country,
 * the typed value is still accepted (so no applicant is ever blocked).
 */
export default function CountryAutocomplete({ value, onChange, placeholder = "Search country…", showDialCode = false, className = "" }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const listRef = useRef(null);

  const selected = COUNTRIES_DATA.find((c) => c.name === value);

  const filtered = query
    ? COUNTRIES_DATA.filter(
        (c) => c.name.toLowerCase().includes(query.toLowerCase()) || c.iso2.toLowerCase() === query.toLowerCase() || c.region.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 50)
    : COUNTRIES_DATA.slice(0, 50);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function pick(name) {
    onChange(name);
    setQuery("");
    setOpen(false);
    setActive(0);
  }

  function onKeyDown(e) {
    if (!open) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, filtered.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    else if (e.key === "Enter") { e.preventDefault(); if (filtered[active]) pick(filtered[active].name); else if (query.trim()) pick(query.trim()); }
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
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-3 rounded-full border border-border bg-white text-sm text-foreground outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition"
        />
        <button type="button" tabIndex={-1} onClick={() => setOpen((o) => !o)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {open && (
        <div className="absolute z-50 left-0 right-0 mt-2 bg-white rounded-2xl border border-border shadow-xl max-h-72 overflow-y-auto" ref={listRef}>
          {filtered.length === 0 && query.trim() && (
            <button
              onClick={() => pick(query.trim())}
              className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-left hover:bg-muted transition"
            >
              <span className="text-muted-foreground text-xs">Use:</span> <span className="font-600 text-navy">{query.trim()}</span>
            </button>
          )}
          {filtered.length === 0 && !query.trim() && (
            <p className="px-4 py-6 text-sm text-muted-foreground text-center">Start typing to search…</p>
          )}
          {filtered.map((c, i) => (
            <button
              key={c.iso2}
              data-idx={i}
              onClick={() => pick(c.name)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition ${active === i ? "bg-muted" : "hover:bg-muted/60"}`}
            >
              <span className="text-xl shrink-0">{c.flag}</span>
              <span className="flex-1 min-w-0">
                <span className="font-500 text-foreground truncate block">{c.name}</span>
                <span className="text-xs text-muted-foreground">{c.region}{showDialCode && c.dialCode ? ` · ${c.dialCode}` : ""}</span>
              </span>
              {value === c.name && <Check className="w-4 h-4 text-green shrink-0" />}
            </button>
          ))}
          {query.trim() && !COUNTRIES_DATA.some((c) => c.name.toLowerCase() === query.toLowerCase()) && (
            <button
              onClick={() => pick(query.trim())}
              className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-left hover:bg-muted border-t border-border transition"
            >
              <span className="text-muted-foreground text-xs">Use custom:</span> <span className="font-600 text-navy">{query.trim()}</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}