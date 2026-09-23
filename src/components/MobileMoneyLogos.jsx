import React from "react";

const BASE = "https://media.base44.com/images/public/6ab259a12c209e348271e50c";

export const PSP_LOGOS = {
  // Card / global PSPs
  stripe: { url: `${BASE}/df0f4564a_1685814539stripe-icon-png.png`, label: "Stripe", type: "card" },
  paypal: { url: `${BASE}/37970fe8c_PayPal-Logo-PNG-Picture.png`, label: "PayPal", type: "card" },
  paystack: { url: `${BASE}/517ae11b1_paystack-logo-vector.png`, label: "Paystack", type: "card" },
  payunit: { url: `${BASE}/a6ddc35e3_payunit-logo.png`, label: "Payunit", type: "card" },
  chapa: { url: `${BASE}/66cffe519_Logo-Chapa-.png`, label: "Chapa", type: "card" },
  flutterwave: { url: `${BASE}/4edab7f6b_Flutterwave-Logo1.png`, label: "Flutterwave", type: "card" },
  kkiapay: { url: `${BASE}/c9d9dc997_1200x630wa.png`, label: "Kkiapay", type: "card" },
  yoco: { url: `${BASE}/e061970d8_yoco-logo-og-3.png`, label: "Yoco", type: "card" },
  visamastercard: { url: `${BASE}/86c4848c5_visa-and-mastercard-logo-26.png`, label: "Visa / Mastercard", type: "card" },
  // Mobile money
  orange: { url: `${BASE}/da707abf9_OIP.png`, label: "Orange Money", type: "momo" },
  mtn: { url: `${BASE}/5f0bff956_1648544928638.png`, label: "MTN MoMo", type: "momo" },
  moov: { url: `${BASE}/700805fbd_logo-moov-money.png`, label: "Moov Money", type: "momo" },
  wave: { url: `${BASE}/a8076af20_logo_wave_circle_818.png`, label: "Wave", type: "momo" },
  mpesa: { url: `${BASE}/0b7d85fa5_unnamed.png`, label: "M-Pesa", type: "momo" },
  airtel: { url: `${BASE}/83e23c46d_Airtel-and-Comviva_IMTC.jpg`, label: "Airtel Money", type: "momo" },
};

export function PsLogo({ id, className = "" }) {
  const logo = PSP_LOGOS[id];
  if (!logo) return null;
  return (
    <img
      src={logo.url}
      alt={logo.label}
      className={`object-contain ${className}`}
      loading="lazy"
    />
  );
}

export const MOBILE_MONEY = [
  { id: "orange", name: "Orange Money" },
  { id: "mtn", name: "MTN MoMo" },
  { id: "moov", name: "Moov Money" },
  { id: "wave", name: "Wave" },
  { id: "mpesa", name: "M-Pesa" },
  { id: "airtel", name: "Airtel Money" },
];

export const CARD_PSPS = [
  { id: "stripe", name: "Stripe" },
  { id: "visamastercard", name: "Visa / Mastercard" },
  { id: "paypal", name: "PayPal" },
  { id: "paystack", name: "Paystack" },
  { id: "flutterwave", name: "Flutterwave" },
  { id: "payunit", name: "Payunit" },
  { id: "kkiapay", name: "Kkiapay" },
  { id: "chapa", name: "Chapa" },
  { id: "yoco", name: "Yoco" },
];

// Backward-compat export
export const MOBILE_MONEY_LOGOS = Object.fromEntries(
  Object.keys(PSP_LOGOS).map((id) => [id, ({ className = "" }) => <PsLogo id={id} className={className} />])
);