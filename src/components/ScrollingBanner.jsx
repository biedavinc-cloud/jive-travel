import React from "react";

export default function ScrollingBanner({ items, children, speed = 40, itemClassName = "" }) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden marquee-container">
      <div className="flex gap-5 w-max animate-marquee" style={{ animationDuration: `${speed}s` }}>
        {doubled.map((item, i) => (
          <div key={i} className={`shrink-0 ${itemClassName}`}>{children(item, i)}</div>
        ))}
      </div>
    </div>
  );
}