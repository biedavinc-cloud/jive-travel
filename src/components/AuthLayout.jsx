import React from "react";

const LOGO_URL = "https://media.base44.com/images/public/6ab259a12c209e348271e50c/1791d7cc5_travel.png";

export default function AuthLayout({ icon: Icon, title, subtitle, footer, children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-navy px-4 py-8 relative overflow-hidden">
      {/* Tourism background image */}
      <img src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&q=80" alt="" className="absolute inset-0 w-full h-full object-cover opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-br from-navy/75 via-navy/60 to-navy/75" />
      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <img src={LOGO_URL} alt="TrekVisa" className="w-16 h-16 rounded-2xl object-cover mx-auto mb-4 shadow-lg ring-2 ring-green/30" />
          <h1 className="text-2xl font-bold tracking-tight text-white">{title}</h1>
          {subtitle && <p className="text-white/60 mt-2 text-sm">{subtitle}</p>}
        </div>
        <div className="bg-white rounded-3xl shadow-2xl border border-border p-8">
          {children}
        </div>
        {footer && (
          <p className="text-center text-sm text-white/60 mt-6">{footer}</p>
        )}
      </div>
    </div>
  );
}