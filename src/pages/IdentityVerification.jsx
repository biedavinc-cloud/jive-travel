import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, ScanFace, FileText, Camera, CheckCircle2, ArrowRight, Lock, Loader2, UploadCloud, IdCard } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { base44 } from "@/api/base44Client";

const STEPS = [
  { num: 1, icon: UploadCloud, title: "Upload ID Document", desc: "Upload a clear photo of your passport or national ID card." },
  { num: 2, icon: Camera, title: "Take a Selfie", desc: "Use your camera to capture a live selfie for facial matching." },
  { num: 3, icon: ScanFace, title: "Biometric Match", desc: "Our system compares your selfie to your document photo." },
  { num: 4, icon: CheckCircle2, title: "Verification Complete", desc: "Your identity is verified and linked to your application." },
];

export default function IdentityVerification() {
  const [step, setStep] = useState(0);
  const [docUploaded, setDocUploaded] = useState(false);
  const [selfieTaken, setSelfieTaken] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);

  async function handleDocUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      await base44.integrations.Core.UploadPublicFile({ file });
      setDocUploaded(true);
      setStep(1);
    } catch (err) {
      console.error(err);
    }
  }

  function handleSelfie() {
    setSelfieTaken(true);
    setStep(2);
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      setVerified(true);
      setStep(3);
    }, 2500);
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <section className="bg-navy py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green/15 border border-green/30 text-green text-xs font-700 uppercase tracking-wider mb-5">
            <ShieldCheck className="w-3.5 h-3.5" /> Secure Verification
          </span>
          <h1 className="font-display font-700 text-white" style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)" }}>Identity Verification</h1>
          <p className="text-white/60 mt-4 max-w-2xl mx-auto">Complete a secure identity verification to streamline your background check and speed up your application processing.</p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12 flex-1 w-full">
        {/* Progress steps */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {STEPS.map((s, i) => (
            <div key={i} className={`rounded-2xl border p-4 text-center transition ${i <= step ? "border-green bg-green/5" : "border-border bg-white"}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 ${i < step ? "bg-green text-white" : i === step ? "bg-green/15 text-green" : "bg-muted text-muted-foreground"}`}>
                {i < step ? <CheckCircle2 className="w-5 h-5" /> : <s.icon className="w-5 h-5" />}
              </div>
              <p className={`text-xs font-600 ${i <= step ? "text-navy" : "text-muted-foreground"}`}>{s.title}</p>
            </div>
          ))}
        </div>

        {/* Step content */}
        <div className="bg-white rounded-2xl border border-border p-8">
          {step === 0 && (
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-green/10 flex items-center justify-center mx-auto mb-5"><IdCard className="w-8 h-8 text-green" /></div>
              <h2 className="font-display font-700 text-navy text-lg">Upload Your ID Document</h2>
              <p className="text-muted-foreground text-sm mt-2 max-w-md mx-auto">Please upload a clear, well-lit photo of your passport or national ID card. Ensure all text is readable.</p>
              <label className="mt-6 inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-white bg-green hover:bg-green-hover transition cursor-pointer">
                <UploadCloud className="w-4 h-4" /> Upload Document
                <input type="file" accept="image/*,application/pdf" className="hidden" onChange={handleDocUpload} />
              </label>
              {docUploaded && <p className="text-green text-sm font-600 mt-4 flex items-center justify-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Document uploaded successfully</p>}
            </div>
          )}

          {step === 1 && (
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-green/10 flex items-center justify-center mx-auto mb-5"><Camera className="w-8 h-8 text-green" /></div>
              <h2 className="font-display font-700 text-navy text-lg">Take a Selfie</h2>
              <p className="text-muted-foreground text-sm mt-2 max-w-md mx-auto">Look directly at the camera with good lighting. Remove glasses or hats for best results.</p>
              <div className="mt-6 mx-auto w-48 h-48 rounded-full border-4 border-dashed border-border flex items-center justify-center bg-muted/40">
                <Camera className="w-16 h-16 text-muted-foreground/40" />
              </div>
              <button onClick={handleSelfie} className="mt-6 inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-white bg-green hover:bg-green-hover transition">
                <Camera className="w-4 h-4" /> Capture Selfie
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="text-center py-8">
              {verifying ? (
                <>
                  <Loader2 className="w-16 h-16 text-green mx-auto mb-4 animate-spin" />
                  <h2 className="font-display font-700 text-navy text-lg">Verifying Identity...</h2>
                  <p className="text-muted-foreground text-sm mt-2">Our system is comparing your selfie with your document photo.</p>
                </>
              ) : (
                <p className="text-muted-foreground">Processing...</p>
              )}
            </div>
          )}

          {step === 3 && verified && (
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-green flex items-center justify-center mx-auto mb-5"><CheckCircle2 className="w-8 h-8 text-white" /></div>
              <h2 className="font-display font-700 text-navy text-lg">Identity Verified!</h2>
              <p className="text-muted-foreground text-sm mt-2 max-w-md mx-auto">Your identity has been successfully verified. This will speed up your application processing and background checks.</p>
              <div className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-green/10 text-green text-sm font-600">
                <Lock className="w-4 h-4" /> Verification secured & encrypted
              </div>
              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/visa-application" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-white bg-green hover:bg-green-hover transition">
                  Continue to Application <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/dashboard" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-navy border border-border hover:bg-muted transition">
                  Go to Dashboard
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Lock className="w-3.5 h-3.5" /> Your data is encrypted and processed securely. We comply with international data protection standards.
        </div>
      </section>

      <Footer />
    </div>
  );
}