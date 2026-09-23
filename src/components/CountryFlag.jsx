import React from "react";

export default function CountryFlag({ iso2, name, size = 40, className = "" }) {
  if (!iso2) {
    return <div className={`rounded-full bg-muted shrink-0 ${className}`} style={{ width: size, height: size }} />;
  }
  return (
    <img
      src={`https://flagcdn.com/w160/${iso2.toLowerCase()}.png`}
      alt={name || ""}
      loading="lazy"
      className={`rounded-full object-cover shrink-0 ${className}`}
      style={{ width: size, height: size }}
    />
  );
}