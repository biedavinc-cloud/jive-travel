import React, { useState, useMemo } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { CreditCard, Smartphone, Lock, Check, ShieldCheck, ArrowLeft, Star, Wallet } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { formatPrice } from "@/lib/currencies";
import { useCurrency } from "@/lib/CurrencyContext";
import { base44 } from "@/api/base44Client";
import PhoneInput from "@/components/PhoneInput";
import { PsLogo, MOBILE_MONEY, CARD_PSPS } from "@/components/MobileMoneyLogos";

const CARD_BRANDS = [
  { name: "visa", pattern: /^4/, label: "VISA" },
  { name: "mastercard", pattern: /^(5[1-5]|2[2-7])/, label: "MC" },
  { name: "amex", pattern: /^3[47]/, label: "AMEX" },
];

const TRUSTPILOT_URL = "https://www.trustpilot.com/review/trektravel.com";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currency } = useCurrency();
  const { itemType, referenceId, label, amountUsd } = location.state || {};
  const [method, setMethod] = useState("card");
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvc: "" });
  const [billing, setBilling] = useState({ email: "", country: "", address: "", city: "", zip: "" });
  const [mm, setMm] = useState({ provider: "orange", country: "+225", phone: "" });
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  const brand = useMemo(() => {
    const num = card.number.replace(/\s/g, "");
    return CARD_BRANDS.find((b) => b.pattern.test(num))?.name;
  }, [card.number]);

  if (!amountUsd) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-muted-foreground">No order to display.</p>
          <button onClick={() => navigate("/")} className="mt-4 text-green font-600">Back to home</button>
        </div>
      </div>
    );
  }

  const isFormValid = method === "card"
    ? card.number.replace(/\s/g, "").length >= 13 && card.name && card.expiry.length === 5 && card.cvc.length >= 3 && billing.email
    : mm.phone.length >= 6;

  async function pay() {
    if (!isFormValid) {
      setError("Please complete all required fields.");
      return;
    }
    setProcessing(true);
    setError("");
    try {
      await base44.entities.Order.create({
        item_type: itemType,
        reference_id: referenceId,
        label,
        amount_usd: amountUsd,
        currency,
        payment_method: method,
        payment_status: "paid",
      });
      navigate("/dashboard");
    } catch (e) {
      console.error(e);
      setError("Payment failed. Please try again or contact support.");
      setProcessing(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 w-full flex-1">
        {/* Back link */}
        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-navy transition mb-4">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="flex items-center gap-3 mb-1">
          <h1 className="font-display font-700 text-navy text-2xl">Secure Checkout</h1>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green/10 text-green text-xs font-700">
            <Lock className="w-3 h-3" /> 256-bit SSL
          </span>
        </div>
        <p className="text-muted-foreground text-sm">Complete your order securely. Your payment information is encrypted and never stored.</p>

        <div className="grid lg:grid-cols-5 gap-6 mt-8">
          {/* Left: payment method */}
          <div className="lg:col-span-3 space-y-6">
            {/* Method selector */}
            <div className="bg-white rounded-2xl border border-border p-6 sm:p-8 shadow-sm">
              <h2 className="font-display font-600 text-navy text-lg mb-5">Payment Method</h2>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => setMethod("card")} className={`p-4 rounded-xl border-2 flex items-center gap-3 transition ${method === "card" ? "border-green bg-green/5" : "border-border hover:border-green/50"}`}>
                  <CreditCard className={`w-6 h-6 ${method === "card" ? "text-green" : "text-muted-foreground"}`} />
                  <span className="font-600 text-navy text-sm">Credit Card</span>
                </button>
                <button onClick={() => setMethod("mobile_money")} className={`p-4 rounded-xl border-2 flex items-center gap-3 transition ${method === "mobile_money" ? "border-green bg-green/5" : "border-border hover:border-green/50"}`}>
                  <Smartphone className={`w-6 h-6 ${method === "mobile_money" ? "text-green" : "text-muted-foreground"}`} />
                  <span className="font-600 text-navy text-sm">Mobile Money</span>
                </button>
              </div>

              {/* Accepted PSP logos strip */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {(method === "card" ? CARD_PSPS : MOBILE_MONEY).map((p) => (
                  <div key={p.id} className="h-9 w-16 rounded-lg bg-white border border-border flex items-center justify-center px-1.5">
                    <PsLogo id={p.id} className="max-h-6 max-w-full" />
                  </div>
                ))}
              </div>

              {method === "card" && (
                <div className="mt-6 space-y-4">
                  <div>
                    <label className="text-[0.75rem] font-600 uppercase tracking-wider text-muted-foreground">Card Number</label>
                    <div className="relative mt-1.5">
                      <input
                        value={card.number}
                        onChange={(e) => setCard({ ...card, number: formatCardNumber(e.target.value) })}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        className="input pr-16"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                        {brand && <BrandBadge brand={brand} />}
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="text-[0.75rem] font-600 uppercase tracking-wider text-muted-foreground">Cardholder Name</label>
                    <input value={card.name} onChange={(e) => setCard({ ...card, name: e.target.value.toUpperCase() })} placeholder="JOHN DOE" className="input mt-1.5" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[0.75rem] font-600 uppercase tracking-wider text-muted-foreground">Expiry</label>
                      <input value={card.expiry} onChange={(e) => setCard({ ...card, expiry: formatExpiry(e.target.value) })} placeholder="MM/YY" maxLength={5} className="input mt-1.5" />
                    </div>
                    <div>
                      <label className="text-[0.75rem] font-600 uppercase tracking-wider text-muted-foreground">CVC</label>
                      <input value={card.cvc} onChange={(e) => setCard({ ...card, cvc: e.target.value.replace(/\D/g, "").slice(0, 4) })} placeholder="123" className="input mt-1.5" />
                    </div>
                  </div>

                  {/* Billing address */}
                  <div className="pt-4 border-t border-border">
                    <h3 className="font-600 text-navy text-sm mb-3">Billing Address</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-[0.75rem] font-600 uppercase tracking-wider text-muted-foreground">Email</label>
                        <input type="email" value={billing.email} onChange={(e) => setBilling({ ...billing, email: e.target.value })} placeholder="john@example.com" className="input mt-1.5" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[0.75rem] font-600 uppercase tracking-wider text-muted-foreground">Country</label>
                          <input value={billing.country} onChange={(e) => setBilling({ ...billing, country: e.target.value })} placeholder="Ireland" className="input mt-1.5" />
                        </div>
                        <div>
                          <label className="text-[0.75rem] font-600 uppercase tracking-wider text-muted-foreground">ZIP</label>
                          <input value={billing.zip} onChange={(e) => setBilling({ ...billing, zip: e.target.value })} placeholder="00000" className="input mt-1.5" />
                        </div>
                      </div>
                      <div>
                        <label className="text-[0.75rem] font-600 uppercase tracking-wider text-muted-foreground">Address</label>
                        <input value={billing.address} onChange={(e) => setBilling({ ...billing, address: e.target.value })} placeholder="Street address" className="input mt-1.5" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {method === "mobile_money" && (
                <div className="mt-6 space-y-4">
                  <div>
                    <label className="text-[0.75rem] font-600 uppercase tracking-wider text-muted-foreground">Provider</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mt-1.5">
                      {MOBILE_MONEY.map((m) => (
                        <button key={m.id} onClick={() => setMm({ ...mm, provider: m.id })}
                          className={`p-3 rounded-xl border-2 text-center transition ${mm.provider === m.id ? "border-green bg-green/5" : "border-border hover:border-green/50"}`}>
                          <div className="h-10 mx-auto mb-1.5 flex items-center justify-center">
                            <PsLogo id={m.id} className="max-h-10 max-w-[5.5rem]" />
                          </div>
                          <span className="text-xs font-600 text-navy">{m.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-[0.75rem] font-600 uppercase tracking-wider text-muted-foreground">Mobile Money Number</label>
                    <div className="mt-1.5">
                      <PhoneInput value={mm.phone} onChange={(v) => setMm({ ...mm, phone: v })} placeholder="07 00 00 00 00" />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5"><Wallet className="w-3.5 h-3.5" /> A push notification/OTP will be sent to this number to confirm payment.</p>
                </div>
              )}

              {error && <p className="mt-4 text-sm text-red-500 bg-red-50 rounded-lg px-3 py-2">{error}</p>}

              <button onClick={pay} disabled={processing || !isFormValid}
                className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-green text-white font-semibold hover:bg-green-hover transition disabled:opacity-50 disabled:cursor-not-allowed">
                {processing ? (
                  <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Processing...</>
                ) : (
                  <><Lock className="w-4 h-4" /> Pay {formatPrice(amountUsd, currency)}</>
                )}
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-green" /> PCI Compliant</span>
              <span className="flex items-center gap-1.5"><Lock className="w-4 h-4 text-green" /> SSL Encrypted</span>
              <a href={TRUSTPILOT_URL} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-navy transition">
                <Star className="w-4 h-4 fill-green text-green" /> Trustpilot
              </a>
            </div>
          </div>

          {/* Right: summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-border p-6 shadow-sm lg:sticky lg:top-20">
              <h2 className="font-display font-600 text-navy text-lg mb-4">Order Summary</h2>
              <div className="flex items-start gap-3 pb-4 border-b border-border">
                <div className="w-10 h-10 rounded-lg bg-navy flex items-center justify-center shrink-0">
                  {itemType === "visa" ? <CreditCard className="w-5 h-5 text-green" /> : <ShieldCheck className="w-5 h-5 text-green" />}
                </div>
                <div>
                  <p className="font-600 text-navy text-sm">{label || "Visa Application"}</p>
                  <p className="text-xs text-muted-foreground capitalize">{itemType === "visa" ? "Visa Application" : "Nationality Program"}</p>
                </div>
              </div>

              <div className="py-4 space-y-2 text-sm border-b border-border">
                <div className="flex justify-between"><span className="text-muted-foreground">Currency</span><span className="font-600 text-navy">{currency}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Payment Method</span><span className="font-600 text-navy">{method === "card" ? "Credit Card" : "Mobile Money"}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Reference</span><span className="font-600 text-navy text-xs">{referenceId ? referenceId.slice(0, 8).toUpperCase() : "—"}</span></div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <span className="text-sm text-muted-foreground">Total Due</span>
                <span className="font-display font-700 text-navy text-2xl">{formatPrice(amountUsd, currency)}</span>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted rounded-lg p-3">
                  <Check className="w-4 h-4 text-green shrink-0" /> 100% secure payment · Refund guarantee
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted rounded-lg p-3">
                  <Check className="w-4 h-4 text-green shrink-0" /> Your data is never stored on our servers
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border text-center">
                <p className="text-xs text-muted-foreground">Need help with your payment?</p>
                <Link to="/contact" className="text-sm text-green font-600 hover:underline mt-1 inline-block">Contact our support team</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <style>{`.input{width:100%;padding:0.625rem 0.75rem;border-radius:0.5rem;border:1px solid #E2E8F0;background:#fff;font-size:0.875rem;font-weight:500;outline:none;transition:border-color 0.2s}.input:focus{border-color:#E5231B;box-shadow:0 0 0 2px rgba(229,35,27,0.15)}`}</style>
    </div>
  );
}

function BrandBadge({ brand }) {
  const styles = {
    visa: "bg-navy text-white",
    mastercard: "bg-green text-white",
    amex: "bg-[#006FCF] text-white",
  };
  const labels = { visa: "VISA", mastercard: "MC", amex: "AMEX" };
  return <span className={`px-1.5 py-0.5 rounded text-[0.6rem] font-700 ${styles[brand]}`}>{labels[brand]}</span>;
}

function formatCardNumber(v) {
  return v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
}
function formatExpiry(v) {
  const d = v.replace(/\D/g, "").slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
}