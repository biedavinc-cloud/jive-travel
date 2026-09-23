import React, { useState } from "react";
import { Search, FileText, CheckCircle2, Clock, XCircle, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { base44 } from "@/api/base44Client";
import { flag } from "@/lib/visaData";

const STAGES = [
  { id: "submitted", label: "Submitted", icon: FileText, desc: "Application received and queued for review" },
  { id: "processing", label: "Processing", icon: Clock, desc: "Documents verified, submitted to embassy" },
  { id: "review", label: "Under Review", icon: Loader2, desc: "Embassy is reviewing your application" },
  { id: "issued", label: "Issued", icon: CheckCircle2, desc: "Visa approved and ready" },
  { id: "rejected", label: "Rejected", icon: XCircle, desc: "Application was not approved" },
];

export default function TrackApplication() {
  const [ref, setRef] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function search(e) {
    e.preventDefault();
    if (!ref.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const visa = await base44.entities.VisaApplication.get(ref.trim()).catch(() => null);
      if (visa) {
        setResult({ type: "visa", data: visa });
      } else {
        const nat = await base44.entities.NationalityApplication.get(ref.trim()).catch(() => null);
        if (nat) {
          setResult({ type: "nationality", data: nat });
        } else {
          setError("No application found with this reference number. Please check and try again.");
        }
      }
    } catch (err) {
      setError("Unable to search at this time. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  const currentStage = result ? STAGES.findIndex((s) => s.id === result.data.status) : -1;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <section className="bg-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, #E5231B 0, transparent 40%)" }} />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 lg:py-20 relative text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green/15 border border-green/30 text-green text-xs font-600 uppercase tracking-wider">
            <Search className="w-3.5 h-3.5" /> Track Application
          </span>
          <h1 className="font-display font-700 text-white mt-5" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>Check Your Application Status</h1>
          <p className="text-white/70 text-[0.938rem] mt-3 max-w-xl mx-auto">Enter your application reference number to see the current status — no login required.</p>
        </div>
      </section>

      <section className="max-w-2xl mx-auto px-4 sm:px-6 py-12 lg:py-16 w-full flex-1">
        <form onSubmit={search} className="bg-white rounded-2xl border border-border p-6 sm:p-8 shadow-sm">
          <label className="text-xs font-600 uppercase tracking-wider text-muted-foreground">Application Reference Number</label>
          <div className="mt-2 flex gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                value={ref}
                onChange={(e) => setRef(e.target.value)}
                placeholder="e.g. a1b2c3d4-e5f6-..."
                className="w-full pl-12 pr-4 py-3.5 rounded-full border border-border bg-white text-sm outline-none focus:border-gold"
              />
            </div>
            <button type="submit" disabled={loading || !ref.trim()} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-white bg-green hover:bg-green-hover transition disabled:opacity-50">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />} Track
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-3">Your reference number was sent to your email when you submitted your application.</p>
        </form>

        {error && (
          <div className="mt-6 p-5 rounded-2xl bg-red-50 border border-red-200 text-center">
            <XCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <p className="text-sm text-red-700 font-600">{error}</p>
          </div>
        )}

        {result && (
          <div className="mt-8 bg-white rounded-2xl border border-border p-6 sm:p-8 shadow-sm animate-fade-up">
            <div className="flex items-center gap-3 mb-6 pb-5 border-b border-border">
              <span className="text-3xl">{flag(result.data.destination_country || result.data.program_tier || "")}</span>
              <div>
                <p className="font-display font-700 text-navy text-lg">
                  {result.type === "visa" ? `Visa — ${result.data.destination_country}` : `Nationality — ${result.data.program_tier}`}
                </p>
                <p className="text-xs text-muted-foreground font-mono">Ref: {result.data.id}</p>
              </div>
              <span className={`ml-auto px-4 py-1.5 rounded-full text-xs font-700 uppercase tracking-wider ${
                result.data.status === "issued" || result.data.status === "approved" ? "bg-green-100 text-green-700" :
                result.data.status === "rejected" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
              }`}>
                {result.data.status}
              </span>
            </div>

            {result.data.status !== "rejected" && (
              <div className="space-y-1">
                {STAGES.filter((s) => s.id !== "rejected").map((stage, i) => {
                  const isDone = i < currentStage;
                  const isCurrent = i === currentStage;
                  return (
                    <div key={stage.id} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition ${
                          isDone ? "bg-green text-white" : isCurrent ? "bg-navy text-green" : "bg-muted text-muted-foreground"
                        }`}>
                          {isDone ? <CheckCircle2 className="w-5 h-5" /> : isCurrent ? <Loader2 className="w-5 h-5 animate-spin" /> : <stage.icon className="w-5 h-5" />}
                        </div>
                        {i < STAGES.length - 2 && <div className={`w-0.5 h-8 ${isDone ? "bg-green" : "bg-border"}`} />}
                      </div>
                      <div className="pt-1.5 pb-6">
                        <p className={`font-600 text-sm ${isCurrent ? "text-navy" : isDone ? "text-green-700" : "text-muted-foreground"}`}>{stage.label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{stage.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {result.data.status === "rejected" && (
              <div className="p-5 rounded-2xl bg-red-50 border border-red-200">
                <p className="font-600 text-red-700 text-sm">Your application was not approved.</p>
                <p className="text-xs text-red-600 mt-1">Please contact your advisor for next steps and reapplication options.</p>
              </div>
            )}

            <div className="mt-6 pt-5 border-t border-border flex flex-wrap gap-3">
              <Link to="/contact" className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-600 text-navy border border-border hover:bg-muted transition">
                Contact support <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/login" className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-green hover:bg-green-hover transition">
                Log in for details
              </Link>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}