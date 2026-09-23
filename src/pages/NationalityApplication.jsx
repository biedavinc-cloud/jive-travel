import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Star, ShieldCheck, Crown, Sparkles, FileText, Clock, Award } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { NATIONALITY_TIERS, NATIONALITY_OBJECTIVES } from "@/lib/nationalityData";
import { COUNTRIES, flag } from "@/lib/visaData";
import { formatPrice } from "@/lib/currencies";
import { useCurrency } from "@/lib/CurrencyContext";
import { useLanguage } from "@/lib/LanguageContext";
import { base44 } from "@/api/base44Client";
import FileDrop from "@/components/FileDrop";
import PhoneInput from "@/components/PhoneInput";
import RotatingImage from "@/components/RotatingImage";

const STEPS = ["Programme & Formule", "Éligibilité & État civil", "Objectifs & Documents"];

const ELIGIBILITY_QUESTIONS = [
  { id: "origins", label: "Avez-vous des origines liées à une seconde nationalité potentielle ?", type: "bool" },
  { id: "assets", label: "Votre patrimoine permet-il un investissement éligible ?", type: "bool" },
  { id: "residency", label: "Acceptez-vous de respecter une condition de résidence ?", type: "bool" },
  { id: "clean_record", label: "Avez-vous un casier judiciaire vierge ?", type: "bool" },
  { id: "language", label: "Parlez-vous la langue du pays cible (ou êtes-vous disposé à l'apprendre) ?", type: "bool" },
];

const TIER_ICONS = { standard: FileText, premium: Sparkles, vip: Crown };

export default function NationalityApplication() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currency } = useCurrency();
  const { lang } = useLanguage();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    program_tier: location.state?.tier || "premium",
    applicant: { last_name: "", first_name: "", birth_date: "", email: "", phone: "", current_nationality: "France", birth_place: "", profession: "" },
    eligibility: {},
    objectives: [],
    documents: [],
  });
  const [submitting, setSubmitting] = useState(false);

  const tier = NATIONALITY_TIERS.find((t) => t.id === form.program_tier);
  const TierIcon = TIER_ICONS[tier.id] || FileText;
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const setApp = (k, v) => setForm((f) => ({ ...f, applicant: { ...f.applicant, [k]: v } }));

  function toggleObj(o) {
    setForm((f) => ({ ...f, objectives: f.objectives.includes(o) ? f.objectives.filter(x => x !== o) : [...f.objectives, o] }));
  }

  async function submit() {
    setSubmitting(true);
    try {
      const created = await base44.entities.NationalityApplication.create({
        ...form,
        total_price_usd: tier.price_usd,
        currency,
        status: "submitted",
      });
      navigate("/checkout", { state: { itemType: "nationality", referenceId: created.id, label: tier.name, amountUsd: tier.price_usd } });
    } catch (e) {
      console.error(e);
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 w-full flex-1">
        <button onClick={() => navigate("/")} className="text-sm text-muted-foreground hover:text-navy flex items-center gap-1.5 mb-6"><ArrowLeft className="w-4 h-4" /> Retour</button>

        {/* Premium header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-full bg-green/10 flex items-center justify-center"><Crown className="w-6 h-6 text-green" /></div>
          <div>
            <h1 className="font-display font-700 text-navy text-2xl">Seconde Nationalité & Résidence</h1>
            <p className="text-muted-foreground text-sm mt-0.5">3 étapes pour démarrer votre programme d'accompagnement premium.</p>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-8 mb-8 flex items-center justify-between">
          {STEPS.map((s, i) => (
            <React.Fragment key={s}>
              <div className="flex flex-col items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-700 transition ${i < step ? "bg-green text-white" : i === step ? "bg-navy text-white gold-glow" : "bg-muted text-muted-foreground"}`}>
                  {i < step ? <Check className="w-4 h-4" /> : i + 1}
                </div>
                <span className={`text-xs hidden sm:block ${i <= step ? "text-navy font-600" : "text-muted-foreground"}`}>{s}</span>
              </div>
              {i < STEPS.length - 1 && <div className={`h-0.5 flex-1 mx-2 ${i < step ? "bg-green" : "bg-border"}`} />}
            </React.Fragment>
          ))}
        </div>

        <div className="bg-white rounded-3xl border border-border p-6 sm:p-8 shadow-sm">
          {step === 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-green" />
                <p className="font-600 text-navy">Choisissez votre formule d'accompagnement</p>
              </div>
              {NATIONALITY_TIERS.map((t) => {
                const Icon = TIER_ICONS[t.id] || FileText;
                return (
                  <button key={t.id} onClick={() => set("program_tier", t.id)}
                    className={`w-full text-left rounded-2xl border-2 transition overflow-hidden ${form.program_tier === t.id ? "border-green gold-glow" : "border-border hover:border-green/50"}`}>
                    <div className="flex flex-col sm:flex-row">
                      <div className="relative w-full sm:w-48 h-32 sm:h-auto shrink-0">
                        <RotatingImage images={t.imgs} alt={t.name} className="absolute inset-0 w-full h-full" />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                        <div className="absolute top-3 left-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center"><Icon className="w-4 h-4 text-navy" /></div>
                        {t.highlight && <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-green text-white text-[0.65rem] font-700 flex items-center gap-1"><Star className="w-2.5 h-2.5 fill-white" /> Popular</span>}
                      </div>
                      <div className="flex-1 p-5">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-display font-700 text-navy">{t.name}</p>
                            <p className="text-xs text-muted-foreground mt-1">{t.description}</p>
                          </div>
                          <div className="text-right shrink-0 ml-4">
                            <p className="font-display font-700 text-navy text-xl">{formatPrice(t.price_usd, currency)}</p>
                            <p className="text-[0.65rem] text-muted-foreground">frais de service</p>
                          </div>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {t.features.slice(0, 3).map((f, j) => (
                            <span key={j} className="px-2 py-0.5 rounded-full bg-muted text-[0.65rem] text-muted-foreground">{f}</span>
                          ))}
                          {t.features.length > 3 && <span className="px-2 py-0.5 rounded-full bg-muted text-[0.65rem] text-muted-foreground">+{t.features.length - 3}</span>}
                        </div>
                        {form.program_tier === t.id && <div className="mt-3 flex items-center gap-1.5 text-green text-xs font-600"><Check className="w-3.5 h-3.5" /> Sélectionné</div>}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck className="w-5 h-5 text-green" />
                  <p className="font-600 text-navy">Questionnaire d'éligibilité avancé</p>
                </div>
                <div className="space-y-4">
                  {ELIGIBILITY_QUESTIONS.map((q) => (
                    <div key={q.id} className="border-b border-border pb-4 last:border-0">
                      <p className="text-sm text-foreground mb-2.5">{q.label}</p>
                      <div className="flex gap-2">
                        <button onClick={() => setForm((f) => ({ ...f, eligibility: { ...f.eligibility, [q.id]: true } }))}
                          className={`px-5 py-2 rounded-full text-sm font-600 transition ${form.eligibility[q.id] === true ? "bg-green text-white" : "bg-muted text-muted-foreground hover:bg-border"}`}>Oui</button>
                        <button onClick={() => setForm((f) => ({ ...f, eligibility: { ...f.eligibility, [q.id]: false } }))}
                          className={`px-5 py-2 rounded-full text-sm font-600 transition ${form.eligibility[q.id] === false ? "bg-navy text-white" : "bg-muted text-muted-foreground hover:bg-border"}`}>Non</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Nom"><input className="input" value={form.applicant.last_name} onChange={(e) => setApp("last_name", e.target.value)} /></Field>
                <Field label="Prénom(s)"><input className="input" value={form.applicant.first_name} onChange={(e) => setApp("first_name", e.target.value)} /></Field>
                <Field label="Date de naissance"><input type="date" className="input" value={form.applicant.birth_date} onChange={(e) => setApp("birth_date", e.target.value)} /></Field>
                <Field label="Lieu de naissance"><input className="input" value={form.applicant.birth_place} onChange={(e) => setApp("birth_place", e.target.value)} placeholder="Ville, Pays" /></Field>
                <Field label="Nationalité actuelle">
                  <select className="input" value={form.applicant.current_nationality} onChange={(e) => setApp("current_nationality", e.target.value)}>
                    {COUNTRIES.map((c) => <option key={c}>{flag(c)} {c}</option>)}
                  </select>
                </Field>
                <Field label="Profession"><input className="input" value={form.applicant.profession} onChange={(e) => setApp("profession", e.target.value)} placeholder="Ex: Entrepreneur, Cadre…" /></Field>
                <Field label="Email"><input type="email" className="input" value={form.applicant.email} onChange={(e) => setApp("email", e.target.value)} /></Field>
                <Field label="Téléphone"><PhoneInput value={form.applicant.phone} onChange={(v) => setApp("phone", v)} /></Field>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div>
                <label className="text-[0.75rem] font-600 uppercase tracking-wider text-muted-foreground">Vos objectifs de mobilité</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {NATIONALITY_OBJECTIVES.map((o) => (
                    <button key={o} onClick={() => toggleObj(o)}
                      className={`px-4 py-2 rounded-full text-sm font-600 transition ${form.objectives.includes(o) ? "bg-navy text-white" : "bg-muted text-muted-foreground hover:bg-border"}`}>{o}</button>
                  ))}
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-navy/5 border border-navy/10">
                <p className="text-sm text-muted-foreground mb-4">Téléversez vos documents officiels. Nos experts les vérifieront avant toute soumission.</p>
                <div className="space-y-4">
                  <FileDrop label="Passeport / Pièce d'identité" value={form.documents.filter(d => d.type === "Passeport / Pièce d'identité")} onChange={(v) => set("documents", [...form.documents.filter(d => d.type !== "Passeport / Pièce d'identité"), ...v])} />
                  <FileDrop label="Acte de naissance" value={form.documents.filter(d => d.type === "Acte de naissance")} onChange={(v) => set("documents", [...form.documents.filter(d => d.type !== "Acte de naissance"), ...v])} />
                  <FileDrop label="Justificatif de domicile" value={form.documents.filter(d => d.type === "Justificatif de domicile")} onChange={(v) => set("documents", [...form.documents.filter(d => d.type !== "Justificatif de domicile"), ...v])} />
                  <FileDrop label="Casier judiciaire / Autres" value={form.documents.filter(d => d.type === "Casier judiciaire / Autres")} onChange={(v) => set("documents", [...form.documents.filter(d => d.type !== "Casier judiciaire / Autres"), ...v])} />
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            <button onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-600 text-navy border border-border disabled:opacity-40 hover:bg-muted"><ArrowLeft className="w-4 h-4" /> Précédent</button>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">{tier.name}</p>
              <p className="font-display font-700 text-navy text-lg">{formatPrice(tier.price_usd, currency)}</p>
            </div>
            {step < 2 ? (
              <button onClick={() => setStep((s) => Math.min(2, s + 1))} className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full text-sm font-semibold bg-navy text-white hover:bg-navy-soft">Continuer <ArrowRight className="w-4 h-4" /></button>
            ) : (
              <button onClick={submit} disabled={submitting} className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full text-sm font-semibold bg-green text-white hover:bg-green-hover gold-glow-hover disabled:opacity-60">
                {submitting ? "Enregistrement..." : "Aller au paiement"} <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-green" /> Données chiffrées</span>
          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-green" /> Réponse 24h</span>
          <span className="flex items-center gap-1.5"><Award className="w-3.5 h-3.5 text-green" /> CRO No. 123456.78</span>
        </div>
      </div>
      <Footer />
      <style>{`.input{width:100%;padding:0.625rem 0.75rem;border-radius:0.5rem;border:1px solid #E2E8F0;background:#fff;font-size:0.875rem;font-weight:500;outline:none}.input:focus{box-shadow:0 0 0 2px #E5231B}`}</style>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="text-[0.75rem] font-600 uppercase tracking-wider text-muted-foreground">{label}</label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}