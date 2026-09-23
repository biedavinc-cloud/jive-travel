import React from "react";
import { useCurrency } from "@/lib/CurrencyContext";
import { ChevronDown } from "lucide-react";

export default function CurrencySelector({ compact = false }) {
  const { currency, setCurrency, list } = useCurrency();
  const [open, setOpen] = React.useState(false);
  const current = list.find((c) => c.code === currency);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium hover:bg-white/10 transition"
      >
        <span className="font-semibold">{current.code}</span>
        <span className="text-gold">{current.symbol}</span>
        <ChevronDown className="w-3.5 h-3.5 opacity-70" />
      </button>
      {open && (
        <div className={`absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-xl border border-border overflow-hidden z-50 ${compact ? "top-full" : ""}`}>
          {list.map((c) => (
            <button
              key={c.code}
              onMouseDown={() => { setCurrency(c.code); setOpen(false); }}
              className={`w-full flex items-center justify-between px-4 py-2.5 text-sm hover:bg-muted transition ${c.code === currency ? "text-navy font-semibold bg-muted" : "text-foreground"}`}
            >
              <span>{c.code}</span>
              <span className="text-gold">{c.symbol}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}