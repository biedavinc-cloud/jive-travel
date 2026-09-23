import React, { useState } from "react";
import { Search, Clock, CheckCircle2, FileText, Upload, Plane, Award, ArrowRight, X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { base44 } from "@/api/base44Client";
import { Link } from "react-router-dom";

const STAGES = [
  { id: "submitted", label: "Submitted", icon: FileText, desc: "Your application has been received and assigned a reference number." },
  { id: "processing", label: "Processing", icon: Clock, desc: "Our team is reviewing your documents and preparing your dossier." },
  { id: "review", label: "Embassy Review", icon: Upload, desc: "Your application has been submitted to the embassy for evaluation." },
  { id: "issued", label: "Visa Issued", icon: Award, desc: "Your visa has been approved and is ready for delivery." },
  { id: "rejected", label: "Rejected", icon: X, desc: "Your application was not successful. Contact your advisor for next steps." },
];

export default function Tracker() {
  const [refId, setRefId] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function track() {
    if (!refId.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const apps = await base44.entities.VisaApplication.filter({ id: refId.trim() });
      if (apps && apps.length > 0) {
        setResult(apps[0]);
      } else {
        setError("No application found with this reference ID. Please check and try again.");
      }
    } catch (e) {
      setError("Unable to fetch application status. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  const currentStageIdx = result ? STAGES.findIndex((s) => s.id === result.status) : -1;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <section className="bg-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, #E5231B 0, transparent 40%)" }} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 lg:py-20 relative text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green/15 border border-green/30 text-green text-xs font-600 uppercase tracking-wider">
            <Search className="w-3.5 h-3.5" /> Status Tracker
          </span>
          <h1 className="font-display font-700 text-white mt-5" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>Track Your Application</h1>
          <p className="text-white/70 text-[0.938rem] mt-3 max-w-xl mx-auto">Enter your application reference ID to see real-time progress — no login required.</p>
        </div>
      </section>

      <section className="max-w-2xl mx-auto px-4 sm:px-6 py-12 w-full flex-1">
        {/* Search bar */}
        <div className="bg-white rounded-2xl border border-border p-6 mb-8">
          <label className="text-xs font-600 uppercase tracking-wider text-muted-foreground">Application Reference ID</label>
          <div className="mt-1.5 flex gap-2">
            <input
              value={refId}
              onChange={(e) => setRefId(e.target.value)}
              placeholder="e.g. ABC123XYZ"
              className="flex-1 px-4 py-3 rounded-full border border-border bg-white text-sm outline-none focus:border-green uppercase"
              onKeyDown={(e) => e.key === "Enter" && track()}
            />
            <button onClick={track} disabled={loading || !refId.trim()}
              className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full text-sm font-600 text-white bg-green hover:bg-green-hover disabled:opacity-40 transition">
              {loading ? "Searching..." : <><Search className="w-4 h-4" /> Track</>}
            </button>
          </div>
          {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
        </div>

        {/* Result */}
        {result && (
          <div className="bg-white rounded-2xl border border-border p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs font-600 uppercase tracking-wider text-muted-foreground">Reference</p>
                <p className="font-display font-700 text-navy text-lg">{result.id?.slice(0, 12).toUpperCase()}</p>
              </div>
              <span className={`inline-flex px-4 py-2 rounded-full text-xs font-700 border ${result.status === "rejected" ? "bg-red-50 text-red-600 border-red-200" : result.status === "issued" ? "bg-green/10 text-green border-green/30" : "bg-amber-50 text-amber-600 border-amber-200"}`}>
                {STAGES.find((s) => s.id === result.status)?.label || result.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8 pb-6 border-b border-border">
              <div>
                <p className="text-xs text-muted-foreground">Destination</p>
                <p className="font-600 text-navy text-sm">{result.destination_country || "—"}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Visa Type</p>
                <p className="font-600 text-navy text-sm capitalize">{result.visa_type || "—"}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Submitted</p>
                <p className="font-600 text-navy text-sm">{result.created_date ? new Date(result.created_date).toLocaleDateString() : "—"}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Travelers</p>
                <p className="font-600 text-navy text-sm">{(result.adults || 0) + (result.children || 0)} total</p>
              </div>
            </div>

            {/* Timeline */}
            {result.status !== "rejected" ? (
              <div className="space-y-1">
                {STAGES.slice(0, 4).map((stage, i) => {
                  const done = i <= currentStageIdx;
                  const current = i === currentStageIdx;
                  return (
                    <div key={stage.id} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition ${done ? "bg-green" : "bg-muted"} ${current ? "ring-4 ring-green/20" : ""}`}>
                          {done ? <CheckCircle2 className="w-5 h-5 text-white" /> : <stage.icon className="w-5 h-5 text-muted-foreground" />}
                        </div>
                        {i < 3 && <div className={`w-0.5 h-12 ${i < currentStageIdx ? "bg-green" : "bg-border"}`} />}
                      </div>
                      <div className="pt-2 pb-8">
                        <p className={`font-600 text-sm ${done ? "text-navy" : "text-muted-foreground"}`}>{stage.label}</p>
                        <p className="text-xs text-muted-foreground mt-1">{stage.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 bg-red-50 rounded-xl border border-red-200">
                <X className="w-10 h-10 text-red-500 mx-auto mb-3" />
                <p className="font-600 text-navy">Application Rejected</p>
                <p className="text-sm text-muted-foreground mt-1">Contact your advisor to understand the reasons and explore options.</p>
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-border">
              <Link to="/contact" className="inline-flex items-center gap-1.5 text-green font-600 text-sm hover:gap-2.5 transition-all">
                Need help? Contact your advisor <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        {!result && !error && !loading && (
          <div className="text-center py-16 rounded-2xl border-2 border-dashed border-border">
            <Plane className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Enter your reference ID above to track your application.</p>
            <p className="text-xs text-muted-foreground mt-2">You can find it in your confirmation email or dashboard.</p>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}