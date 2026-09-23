import React from "react";

const MARKERS = [
  { name: "Dubai", x: 58, y: 48, hub: true },
  { name: "Paris", x: 47, y: 32 },
  { name: "Moscow", x: 56, y: 26 },
  { name: "Tokyo", x: 82, y: 40 },
  { name: "Singapore", x: 74, y: 60 },
  { name: "Cape Town", x: 52, y: 78 },
];

export default function GlobeVisual() {
  return (
    <div className="relative w-full max-w-lg mx-auto aspect-square">
      {/* Globe */}
      <div className="absolute inset-[12%] rounded-full bg-gradient-to-br from-navy-soft to-navy border border-navy-border overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: "radial-gradient(circle at 30% 30%, #25D366 0, transparent 25%), radial-gradient(circle at 70% 70%, #25D366 0, transparent 25%)",
        }} />
        {/* meridians */}
        <svg className="absolute inset-0 w-full h-full opacity-25" viewBox="0 0 100 100" fill="none" stroke="#25D366" strokeWidth="0.4">
          <ellipse cx="50" cy="50" rx="49" ry="20" />
          <ellipse cx="50" cy="50" rx="49" ry="35" />
          <ellipse cx="50" cy="50" rx="49" ry="48" />
          <ellipse cx="50" cy="50" rx="20" ry="49" />
          <ellipse cx="50" cy="50" rx="35" ry="49" />
          <line x1="1" y1="50" x2="99" y2="50" />
        </svg>
      </div>
      {/* Arcs from Dubai */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" fill="none" stroke="#25D366" strokeWidth="0.5" opacity="0.6">
        {MARKERS.filter(m => !m.hub).map((m, i) => (
          <path key={i} d={`M ${MARKERS[0].x} ${MARKERS[0].y} Q ${(MARKERS[0].x + m.x) / 2} ${Math.min(MARKERS[0].y, m.y) - 12} ${m.x} ${m.y}`} strokeDasharray="2 2" />
        ))}
      </svg>
      {/* Markers */}
      {MARKERS.map((m) => (
        <div key={m.name} className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center" style={{ left: `${m.x}%`, top: `${m.y}%` }}>
          <span className={`block rounded-full ${m.hub ? "w-3.5 h-3.5 bg-green ring-4 ring-green/30" : "w-2.5 h-2.5 bg-red-accent ring-2 ring-red-accent/30"} animate-pulse`} />
          <span className={`mt-1 text-[0.65rem] font-600 whitespace-nowrap ${m.hub ? "text-green" : "text-white/80"}`}>{m.name}</span>
        </div>
      ))}
    </div>
  );
}