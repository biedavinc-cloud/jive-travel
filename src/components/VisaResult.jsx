import React, { useState } from "react";
import { ArrowRight, RotateCcw, FileText, CheckCircle2, AlertCircle, Info, ShieldCheck, Clock, Landmark, Sparkles, ChevronDown, ChevronUp, Compass } from "lucide-react";
import { formatPrice } from "@/lib/currencies";
import { useCurrency } from "@/lib/CurrencyContext";
import { flag } from "@/lib/visaRules";

const STATUS_STYLES = {
  visa_required: { icon: AlertCircle, color: "text-red-600", bg: "bg-red-50", border: "border-red-200", label: "Visa required" },
  visa_free: { icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50", border: "border-green-200", label: "Visa-free entry" },
  evisa: { icon: FileText, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200", label: "e-Visa available" },
  eta: { icon: Sparkles, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200", label: "eTA / Electronic authorization" },
  visa_on_arrival: { icon: Clock, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200", label: "Visa on arrival" },
};

function Section({ icon: Icon, title, children }) {
  return (
    <div className="bg-white rounded-2xl border border-border p-5 sm:p-6">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-9 h-9 rounded-full bg-navy/5 flex items-center justify-center"><Icon className="w-4 h-4 text-navy" /></div>
        <h3 className="font-display font-600 text-navy text-sm uppercase tracking-wider">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function DocRow({ doc }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-0">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-3 py-3 text-left">
        <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center shrink-0"><FileText className="w-3.5 h-3.5 text-navy" /></div>
        <span className="flex-1 font-500 text-navy text-sm">{doc.name}</span>
        {open ? <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />}
      </button>
      {open && (
        <div className="pb-4 pl-10 pr-2">
          <p className="text-muted-foreground text-sm leading-relaxed">{doc.description}</p>
          <p className="text-xs text-navy/70 mt-2 flex items-start gap-1.5"><Info className="w-3.5 h-3.5 mt-0.5 shrink-0 text-green" /> {doc.why}</p>
        </div>
      )}
    </div>
  );
}

export default function VisaResult({ assessment, onRestart, onStart }) {
  const { currency } = useCurrency();
  const s = STATUS_STYLES[assessment.status.id] || STATUS_STYLES.visa_required;
  const StatusIcon = s.icon;

  return (
    <div className="flex-1">
      {/* Result hero */}
      <section className="bg-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 80% 20%, #E5231B 0, transparent 45%)" }} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 lg:py-14 relative">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-4xl border border-white/20">{assessment.flag}</div>
            <div className="flex-1">
              <p className="text-green text-xs font-600 uppercase tracking-wider">Your Visa Pathway</p>
              <h1 className="font-display font-700 text-white text-2xl sm:text-3xl mt-1">{assessment.destination}</h1>
              <p className="text-white/60 text-sm mt-1">{assessment.pathway.name}</p>
            </div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${s.bg} ${s.color} ${s.border} border text-sm font-600`}>
              <StatusIcon className="w-4 h-4" /> {s.label}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-8 lg:py-12 w-full">
        {/* Summary grid */}
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <Section icon={Compass} title="Visa Pathway">
            <p className="font-600 text-navy text-base">{assessment.pathway.name}</p>
            <p className="text-muted-foreground text-xs mt-1">{assessment.pathway.category}</p>
            <p className="text-muted-foreground text-sm mt-3 leading-relaxed">{assessment.pathway.description}</p>
          </Section>

          <Section icon={Landmark} title="Application From">
            <p className="font-600 text-navy text-base flex items-center gap-2">
              <span className="text-xl">{flag(assessment.residence) || "🏳️"}</span> {assessment.residence}
            </p>
            <p className="text-muted-foreground text-xs mt-1">Your country of residence</p>
            <div className="mt-3 pt-3 border-t border-border space-y-1.5 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Nationality</span><span className="font-600 text-navy">{assessment.flag} {assessment.nationality}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Purpose</span><span className="font-600 text-navy">{assessment.purposeLabel}</span></div>
            </div>
          </Section>
        </div>

        {/* Fees — clearly separated */}
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-2xl border border-border p-5 sm:p-6">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center"><Landmark className="w-4 h-4 text-red-600" /></div>
              <h3 className="font-display font-600 text-navy text-sm uppercase tracking-wider">Estimated Government Fees</h3>
            </div>
            <p className="font-display font-700 text-navy text-3xl">{formatPrice(assessment.governmentFee, currency)}</p>
            <p className="text-muted-foreground text-xs mt-2">Official embassy / immigration fee. Paid directly to the government. Trek Visa does not control this fee.</p>
          </div>

          <div className="bg-navy rounded-2xl p-5 sm:p-6 text-white">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center"><ShieldCheck className="w-4 h-4 text-green" /></div>
              <h3 className="font-display font-600 text-white text-sm uppercase tracking-wider">Trek Visa Service</h3>
            </div>
            <p className="font-display font-700 text-green text-3xl">{formatPrice(assessment.serviceFee, currency)}</p>
            <p className="text-white/60 text-xs mt-2">Professional assistance: document review, application preparation, and expert guidance throughout.</p>
          </div>
        </div>

        {/* Processing information */}
        <div className="bg-white rounded-2xl border border-border p-5 sm:p-6 mb-6">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 rounded-full bg-navy/5 flex items-center justify-center"><Clock className="w-4 h-4 text-navy" /></div>
            <h3 className="font-display font-600 text-navy text-sm uppercase tracking-wider">Processing Information</h3>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Standard</p>
              <p className="font-600 text-navy text-sm mt-1">{assessment.processing.standard}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Express</p>
              <p className="font-600 text-navy text-sm mt-1">{assessment.processing.express}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Urgent</p>
              <p className="font-600 text-navy text-sm mt-1">{assessment.processing.urgent}</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-border flex items-start gap-2">
            <Info className="w-4 h-4 text-green shrink-0 mt-0.5" />
            <p className="text-muted-foreground text-xs leading-relaxed">Processing times are estimates based on current embassy turnaround. Trek Visa expedites preparation but does not control government processing.</p>
          </div>
        </div>

        {/* Personalized requirements */}
        <div className="bg-white rounded-2xl border border-border p-5 sm:p-6 mb-6">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-green/10 flex items-center justify-center"><FileText className="w-4 h-4 text-green" /></div>
              <h3 className="font-display font-600 text-navy text-sm uppercase tracking-wider">Personalized Requirements</h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-navy text-white text-xs font-700">{assessment.reqCount} requirements</span>
          </div>
          <p className="text-muted-foreground text-xs mb-4 ml-12">Tap any document to see why it is required.</p>

          <div className="space-y-5">
            <div>
              <p className="text-xs font-700 uppercase tracking-wider text-red-600 mb-2">Required Documents</p>
              <div>{assessment.checklist.required.map((d, i) => <DocRow key={i} doc={d} />)}</div>
            </div>
            {assessment.checklist.conditional.length > 0 && (
              <div>
                <p className="text-xs font-700 uppercase tracking-wider text-amber-600 mb-2">If Applicable</p>
                <div>{assessment.checklist.conditional.map((d, i) => <DocRow key={i} doc={d} />)}</div>
              </div>
            )}
            <div>
              <p className="text-xs font-700 uppercase tracking-wider text-muted-foreground mb-2">Supporting Documents</p>
              <div>{assessment.checklist.supporting.map((d, i) => <DocRow key={i} doc={d} />)}</div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-muted rounded-2xl p-4 mb-6 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
          <p className="text-muted-foreground text-xs leading-relaxed">
            This assessment is generated by the Trek Visa Smart Checker based on your inputs. Visa rules change frequently — always confirm current requirements with the official embassy or immigration authority. Trek Visa is an independent visa assistance service, not a government agency.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={onStart} className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full text-sm font-semibold text-white bg-gold hover:bg-gold-hover transition gold-glow">
            Start My Application <ArrowRight className="w-4 h-4" />
          </button>
          <button onClick={onRestart} className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full text-sm font-600 text-navy border border-border hover:bg-muted transition">
            <RotateCcw className="w-4 h-4" /> New Check
          </button>
        </div>
      </section>
    </div>
  );
}