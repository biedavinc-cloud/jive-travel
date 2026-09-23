import React, { useState } from "react";
import { Calendar, Video, Phone, Clock, CheckCircle2, ArrowRight, Star } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PhoneInput from "@/components/PhoneInput";
import { base44 } from "@/api/base44Client";
import { useNavigate } from "react-router-dom";

const CONSULTATION_TYPES = [
  { id: "video", label: "Video Call", icon: Video, desc: "Face-to-face via Zoom or Google Meet", duration: "30 min", price: 0 },
  { id: "phone", label: "Phone Call", icon: Phone, desc: "Direct call with a mobility expert", duration: "30 min", price: 0 },
  { id: "vip", label: "VIP Strategy Session", icon: Star, desc: "In-depth consultation with senior advisor", duration: "60 min", price: 150 },
];

const TIME_SLOTS = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"];

const TOPICS = [
  "Visa Application Strategy",
  "Second Nationality Programs",
  "Document Review",
  "Embassy Interview Prep",
  "Business Immigration",
  "Family Relocation",
];

export default function Consultation() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [type, setType] = useState("video");
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [topic, setTopic] = useState("");
  const [info, setInfo] = useState({ name: "", email: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function submit() {
    setSubmitting(true);
    try {
      await base44.integrations.Core.SendEmail({
        to: "contact@trekvisa.com",
        subject: `New Consultation Booking - ${info.name}`,
        body: `Consultation request:\n\nName: ${info.name}\nEmail: ${info.email}\nPhone: ${info.phone}\nType: ${type}\nDate: ${date}\nTime: ${slot}\nTopic: ${topic}`,
      });
      setDone(true);
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 rounded-full bg-green/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green" />
            </div>
            <h1 className="font-display font-700 text-navy text-2xl">Booking Confirmed!</h1>
            <p className="text-muted-foreground mt-3">We've sent a confirmation to {info.email}. Your advisor will reach out shortly to finalize details.</p>
            <button onClick={() => navigate("/")} className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-green hover:bg-green-hover transition">
              Back to Home <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <section className="bg-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, #E5231B 0, transparent 40%)" }} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 lg:py-20 relative text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green/15 border border-green/30 text-green text-xs font-600 uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5" /> Expert Consultation
          </span>
          <h1 className="font-display font-700 text-white mt-5" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>Book a Consultation</h1>
          <p className="text-white/70 text-[0.938rem] mt-3 max-w-xl mx-auto">Schedule a one-on-one session with a mobility expert to discuss your application strategy.</p>
        </div>
      </section>

      <section className="max-w-2xl mx-auto px-4 sm:px-6 py-12 w-full flex-1">
        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-700 ${step >= s ? "bg-green text-white" : "bg-muted text-muted-foreground"}`}>{s}</div>
              {s < 3 && <div className={`w-12 h-0.5 ${step > s ? "bg-green" : "bg-border"}`} />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="bg-white rounded-2xl border border-border p-6 sm:p-8">
            <h2 className="font-display font-600 text-navy text-lg mb-5">Choose Consultation Type</h2>
            <div className="space-y-3">
              {CONSULTATION_TYPES.map((c) => (
                <button key={c.id} onClick={() => setType(c.id)}
                  className={`w-full p-4 rounded-xl border-2 flex items-center gap-4 text-left transition ${type === c.id ? "border-green bg-green/5" : "border-border hover:border-green/50"}`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${type === c.id ? "bg-green" : "bg-muted"}`}>
                    <c.icon className={`w-6 h-6 ${type === c.id ? "text-white" : "text-muted-foreground"}`} />
                  </div>
                  <div className="flex-1">
                    <p className="font-600 text-navy">{c.label}</p>
                    <p className="text-xs text-muted-foreground">{c.desc}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" /> {c.duration}</p>
                    <p className="font-700 text-sm text-green">{c.price === 0 ? "Free" : `$${c.price}`}</p>
                  </div>
                </button>
              ))}
            </div>
            <button onClick={() => setStep(2)} className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-green text-white font-semibold hover:bg-green-hover transition">
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="bg-white rounded-2xl border border-border p-6 sm:p-8">
            <h2 className="font-display font-600 text-navy text-lg mb-5">Pick a Date & Time</h2>
            <div className="mb-5">
              <label className="text-xs font-600 uppercase tracking-wider text-muted-foreground">Date</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} min={new Date().toISOString().split("T")[0]}
                className="w-full mt-1.5 px-4 py-3 rounded-full border border-border bg-white text-sm outline-none focus:border-green" />
            </div>
            <div className="mb-5">
              <label className="text-xs font-600 uppercase tracking-wider text-muted-foreground">Time Slot</label>
              <div className="grid grid-cols-4 gap-2 mt-1.5">
                {TIME_SLOTS.map((s) => (
                  <button key={s} onClick={() => setSlot(s)}
                    className={`px-3 py-2.5 rounded-full text-sm font-600 border-2 transition ${slot === s ? "border-green bg-green/10 text-green" : "border-border text-muted-foreground"}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <label className="text-xs font-600 uppercase tracking-wider text-muted-foreground">Topic</label>
              <select value={topic} onChange={(e) => setTopic(e.target.value)}
                className="w-full mt-1.5 px-4 py-3 rounded-full border border-border bg-white text-sm outline-none focus:border-green">
                <option value="">Select a topic…</option>
                {TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="px-5 py-3.5 rounded-full text-sm font-600 text-muted-foreground border border-border hover:bg-muted transition">Back</button>
              <button onClick={() => setStep(3)} disabled={!date || !slot || !topic}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-green text-white font-semibold hover:bg-green-hover disabled:opacity-40 transition">
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="bg-white rounded-2xl border border-border p-6 sm:p-8">
            <h2 className="font-display font-600 text-navy text-lg mb-5">Your Details</h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-600 uppercase tracking-wider text-muted-foreground">Full Name</label>
                <input value={info.name} onChange={(e) => setInfo({ ...info, name: e.target.value })} placeholder="John Doe"
                  className="w-full mt-1.5 px-4 py-3 rounded-full border border-border bg-white text-sm outline-none focus:border-green" />
              </div>
              <div>
                <label className="text-xs font-600 uppercase tracking-wider text-muted-foreground">Email</label>
                <input type="email" value={info.email} onChange={(e) => setInfo({ ...info, email: e.target.value })} placeholder="john@example.com"
                  className="w-full mt-1.5 px-4 py-3 rounded-full border border-border bg-white text-sm outline-none focus:border-green" />
              </div>
              <div>
                <label className="text-xs font-600 uppercase tracking-wider text-muted-foreground">Phone</label>
                <PhoneInput value={info.phone} onChange={(v) => setInfo({ ...info, phone: v })} placeholder="+971 50 000 0000" />
              </div>
            </div>
            <div className="mt-5 p-4 rounded-xl bg-muted text-sm space-y-1">
              <p className="font-600 text-navy">Booking Summary:</p>
              <p className="text-muted-foreground">{CONSULTATION_TYPES.find((c) => c.id === type)?.label} · {date} at {slot}</p>
              <p className="text-muted-foreground">Topic: {topic}</p>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setStep(2)} className="px-5 py-3.5 rounded-full text-sm font-600 text-muted-foreground border border-border hover:bg-muted transition">Back</button>
              <button onClick={submit} disabled={!info.name || !info.email || submitting}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-green text-white font-semibold hover:bg-green-hover disabled:opacity-40 transition">
                {submitting ? "Booking..." : "Confirm Booking"}
              </button>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}