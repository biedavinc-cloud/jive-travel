import React, { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, ShieldCheck, AlertTriangle, Clock, Plane, ShieldPlus, Mail, Phone, User } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { COUNTRIES, VISA_TYPES, URGENCY_OPTIONS, computeVisaTotal, isPassportValid, flag, flagUrl, getBaseVisaPrice, applyCommission, INSURANCE_RATE_PER_DAY } from "@/lib/visaData";
import { getDocumentChecklist, getVisaStatus, TRAVEL_PURPOSES } from "@/lib/visaRules";
import { formatPrice } from "@/lib/currencies";
import { useCurrency } from "@/lib/CurrencyContext";
import { useLanguage } from "@/lib/LanguageContext";
import { base44 } from "@/api/base44Client";
import FileDrop from "@/components/FileDrop";
import PhoneInput from "@/components/PhoneInput";

export default function VisaApplication() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currency } = useCurrency();
  const { lang, t } = useLanguage();
  const preset = location.state || {};

  const STEPS = [t("visa.step1"), t("visa.step2"), t("visa.step3"), t("visa.step4")];

  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    origin_country: preset.origin || "France",
    residence_country: preset.residence || preset.origin || "France",
    destination_country: preset.destination || "United States",
    travel_purpose: preset.purpose || "tourism",
    visa_type: preset.visaType || (["tourism", "business", "study", "work", "transit"].includes(preset.purpose) ? preset.purpose : "tourism"),
    urgency: preset.urgency || "standard",
    adults: preset.adults || 1,
    children: preset.children || 0,
    departure_date: "",
    return_date: "",
    shared_address: "",
    contact_name: "",
    contact_email: "",
    contact_phone: "",
    travelers: [],
    documents: [],
    withInsurance: false,
    embassyPriority: false,
    marital_status: "",
    occupation: "",
    employer: "",
    employer_address: "",
    monthly_income: "",
    education_level: "",
    previous_travel: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const insuranceDays = useMemo(() => {
    if (!form.departure_date || !form.return_date) return 0;
    return Math.max(1, Math.round((new Date(form.return_date) - new Date(form.departure_date)) / 86400000));
  }, [form.departure_date, form.return_date]);

  const pricing = useMemo(
    () => computeVisaTotal({ destination: form.destination_country, visaType: form.visa_type, urgencyId: form.urgency, adults: form.adults, children: form.children, insuranceDays, withInsurance: form.withInsurance }),
    [form, insuranceDays]
  );

  // Personalized document checklist from the international rules engine
  const checklist = useMemo(() => {
    const status = getVisaStatus(form.origin_country, form.destination_country);
    return getDocumentChecklist(form.destination_country, form.travel_purpose, status);
  }, [form.origin_country, form.destination_country, form.travel_purpose]);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  function next() {
    if (step === 0) {
      const list = [];
      for (let i = 0; i < form.adults + form.children; i++) list.push(form.travelers[i] || { last_name: "", first_name: "", birth_date: "", passport_number: "", passport_issue: "", passport_expiry: "" });
      setForm((f) => ({ ...f, travelers: list }));
    }
    setStep((s) => Math.min(3, s + 1));
  }
  function prev() { setStep((s) => Math.max(0, s - 1)); }

  async function submit() {
    setSubmitting(true);
    try {
      const created = await base44.entities.VisaApplication.create({
        origin_country: form.origin_country,
        residence_country: form.residence_country,
        destination_country: form.destination_country,
        travel_purpose: form.travel_purpose,
        visa_type: form.visa_type,
        urgency: form.urgency,
        adults: form.adults,
        children: form.children,
        departure_date: form.departure_date,
        return_date: form.return_date,
        stay_duration: `${insuranceDays} ${lang === "fr" ? "jours" : "days"}`,
        contact_name: form.contact_name,
        contact_email: form.contact_email,
        contact_phone: form.contact_phone,
        travelers: form.travelers,
        marital_status: form.marital_status,
        occupation: form.occupation,
        employer: form.employer,
        employer_address: form.employer_address,
        monthly_income: form.monthly_income,
        education_level: form.education_level,
        previous_travel: form.previous_travel,
        documents: form.documents,
        total_price_usd: pricing.total,
        currency,
        status: "submitted",
      });
      navigate("/checkout", { state: { itemType: "visa", referenceId: created.id, label: `Visa ${form.destination_country}`, amountUsd: pricing.total } });
    } catch (e) {
      console.error(e);
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 w-full flex-1">
        <button onClick={() => navigate("/")} className="text-sm text-muted-foreground hover:text-navy flex items-center gap-1.5 mb-6"><ArrowLeft className="w-4 h-4" /> {t("visa.back")}</button>
        <h1 className="font-display font-700 text-navy text-2xl">{t("visa.title")}</h1>
        <p className="text-muted-foreground text-sm mt-1">{t("visa.subtitle")}</p>

        {/* Progress */}
        <div className="mt-8 mb-8">
          <div className="flex items-center justify-between">
            {STEPS.map((s, i) => (
              <React.Fragment key={s}>
                <div className="flex flex-col items-center gap-2 flex-1">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-700 transition ${i < step ? "bg-gold text-white" : i === step ? "bg-navy text-white" : "bg-muted text-muted-foreground"}`}>
                    {i < step ? <Check className="w-4 h-4" /> : i + 1}
                  </div>
                  <span className={`text-xs hidden sm:block ${i <= step ? "text-navy font-600" : "text-muted-foreground"}`}>{s}</span>
                </div>
                {i < STEPS.length - 1 && <div className={`h-0.5 flex-1 mx-1 ${i < step ? "bg-gold" : "bg-border"}`} />}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-border p-6 sm:p-8 shadow-sm">
          {step === 0 && (
            <div className="space-y-6">
              {/* Destination preview */}
              <div className="rounded-2xl overflow-hidden border border-border">
                <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-navy to-navy-soft">
                  {flagUrl(form.destination_country, 80) && <img src={flagUrl(form.destination_country, 80)} alt="" className="w-16 h-11 rounded-md object-cover border border-white/20" />}
                  <div className="flex-1">
                    <p className="text-white/50 text-[0.65rem] uppercase tracking-wider">{t("visa.destination")}</p>
                    <p className="font-display font-700 text-white text-xl">{flag(form.destination_country)} {form.destination_country}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/50 text-[0.65rem]">{lang === "fr" ? "À partir de" : "From"}</p>
                    <p className="font-display font-700 text-gold text-xl">{formatPrice(applyCommission(getBaseVisaPrice(form.destination_country, form.visa_type)), currency)}</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 px-5 py-3 bg-white text-xs">
                  <div className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-navy" /> <span className="text-muted-foreground">{lang === "fr" ? "Délai standard" : "Standard processing"}</span> <span className="font-600 text-navy">{lang === "fr" ? URGENCY_OPTIONS[0].delay_fr : URGENCY_OPTIONS[0].delay_en}</span></div>
                  <div className="flex items-center gap-2"><ShieldCheck className="w-3.5 h-3.5 text-navy" /> <span className="text-muted-foreground">{lang === "fr" ? "Passeport valide" : "Passport validity"}</span> <span className="font-600 text-navy">6 {lang === "fr" ? "mois min." : "months min."}</span></div>
                  <div className="flex items-center gap-2"><Plane className="w-3.5 h-3.5 text-navy" /> <span className="text-muted-foreground">{lang === "fr" ? "Type" : "Type"}</span> <span className="font-600 text-navy">{lang === "fr" ? VISA_TYPES.find(v => v.id === form.visa_type)?.label_fr : VISA_TYPES.find(v => v.id === form.visa_type)?.label_en}</span></div>
                </div>
              </div>

              {/* Contact block — email & phone */}
              <div className="p-5 rounded-2xl bg-navy/5 border border-navy/10">
                <div className="flex items-center gap-2 mb-1">
                  <Mail className="w-4 h-4 text-navy" />
                  <p className="font-600 text-navy text-sm">{t("visa.contactTitle")}</p>
                </div>
                <p className="text-xs text-muted-foreground mb-4">{t("visa.contactDesc")}</p>
                <div className="grid sm:grid-cols-3 gap-4">
                  <Field label={t("visa.contactName")}>
                    <div className="relative">
                      <User className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                      <input className="input input-icon" value={form.contact_name} onChange={(e) => set("contact_name", e.target.value)} placeholder={lang === "fr" ? "Nom complet" : "Full name"} />
                    </div>
                  </Field>
                  <Field label={t("visa.email")}>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                      <input type="email" className="input input-icon" value={form.contact_email} onChange={(e) => set("contact_email", e.target.value)} placeholder="email@example.com" />
                    </div>
                  </Field>
                  <Field label={t("visa.phone")}>
                    <PhoneInput value={form.contact_phone} onChange={(v) => set("contact_phone", v)} />
                  </Field>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <Field label={t("visa.origin")}>
                  <select className="input" value={form.origin_country} onChange={(e) => set("origin_country", e.target.value)}>
                    {COUNTRIES.map((c) => <option key={c}>{flag(c)} {c}</option>)}
                  </select>
                </Field>
                <Field label={lang === "fr" ? "Pays de résidence" : "Country of residence"}>
                  <select className="input" value={form.residence_country} onChange={(e) => set("residence_country", e.target.value)}>
                    {COUNTRIES.map((c) => <option key={c}>{flag(c)} {c}</option>)}
                  </select>
                </Field>
                <Field label={t("visa.destination")}>
                  <select className="input" value={form.destination_country} onChange={(e) => set("destination_country", e.target.value)}>
                    {COUNTRIES.map((c) => <option key={c}>{flag(c)} {c}</option>)}
                  </select>
                </Field>
                <Field label={t("visa.reason")} full>
                  <div className="flex flex-wrap gap-2">
                    {VISA_TYPES.filter(v => v.id !== "transit").map((v) => (
                      <button key={v.id} onClick={() => set("visa_type", v.id)}
                        className={`px-4 py-2 rounded-full text-sm font-600 ${form.visa_type === v.id ? "bg-navy text-white" : "bg-muted text-muted-foreground hover:bg-border"}`}>{lang === "fr" ? v.label_fr : v.label_en}</button>
                    ))}
                  </div>
                </Field>
                <Field label={t("visa.urgency")} full>
                  <div className="flex flex-wrap gap-2">
                    {URGENCY_OPTIONS.map((u) => (
                      <button key={u.id} onClick={() => set("urgency", u.id)}
                        className={`px-4 py-2 rounded-full text-sm font-600 flex items-center gap-2 ${form.urgency === u.id ? "bg-gold text-white" : "bg-muted text-muted-foreground hover:bg-border"}`}>
                        <Clock className="w-3.5 h-3.5" /> {lang === "fr" ? u.label_fr : u.label_en} · {lang === "fr" ? u.delay_fr : u.delay_en}
                      </button>
                    ))}
                  </div>
                </Field>
                <Field label={t("visa.adults")}>
                  <input type="number" min={1} className="input" value={form.adults} onChange={(e) => set("adults", Math.max(1, +e.target.value))} />
                </Field>
                <Field label={t("visa.children")}>
                  <input type="number" min={0} className="input" value={form.children} onChange={(e) => set("children", Math.max(0, +e.target.value))} />
                </Field>
                <Field label={t("visa.departure")}>
                  <input type="date" className="input" value={form.departure_date} onChange={(e) => set("departure_date", e.target.value)} />
                </Field>
                <Field label={t("visa.return")}>
                  <input type="date" className="input" value={form.return_date} onChange={(e) => set("return_date", e.target.value)} />
                </Field>
                <Field label={t("visa.address")} full>
                  <input type="text" className="input" placeholder={t("visa.addressPh")} value={form.shared_address} onChange={(e) => set("shared_address", e.target.value)} />
                </Field>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-5">
              <p className="text-sm text-muted-foreground">{t("visa.travelersInfo")} ({form.adults + form.children})</p>
              {form.travelers.map((tr, i) => {
                const passportOk = isPassportValid(tr.passport_expiry, form.return_date);
                return (
                  <div key={i} className="border border-border rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-full bg-navy text-gold flex items-center justify-center text-sm font-700">{i + 1}</div>
                      <span className="font-600 text-navy">{i === 0 ? t("visa.applicant") : `${t("visa.dependent")} ${i}`}</span>
                      <span className="ml-auto px-3 py-1 rounded-full bg-muted text-xs font-600 text-muted-foreground">{i === 0 ? t("visa.applicantBadge") : t("visa.dependentBadge")}</span>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field label={t("visa.lastName")}><input className="input" value={tr.last_name} onChange={(e) => updateTraveler(i, "last_name", e.target.value)} /></Field>
                      <Field label={t("visa.firstName")}><input className="input" value={tr.first_name} onChange={(e) => updateTraveler(i, "first_name", e.target.value)} /></Field>
                      <Field label={t("visa.birthDate")}><input type="date" className="input" value={tr.birth_date} onChange={(e) => updateTraveler(i, "birth_date", e.target.value)} /></Field>
                      <Field label={t("visa.passportNumber")}><input className="input" value={tr.passport_number} onChange={(e) => updateTraveler(i, "passport_number", e.target.value)} /></Field>
                      <Field label={t("visa.passportIssue")}><input type="date" className="input" value={tr.passport_issue} onChange={(e) => updateTraveler(i, "passport_issue", e.target.value)} /></Field>
                      <Field label={t("visa.passportExpiry")}>
                        <input type="date" className="input" value={tr.passport_expiry} onChange={(e) => updateTraveler(i, "passport_expiry", e.target.value)} />
                      </Field>
                    </div>
                    {tr.passport_expiry && form.return_date && passportOk === false && (
                      <div className="mt-3 flex items-start gap-2 p-3 rounded-xl bg-orange-50 border border-orange-200">
                        <AlertTriangle className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                        <p className="text-xs text-orange-700">{t("visa.passportWarning")}</p>
                      </div>
                    )}
                    {tr.passport_expiry && form.return_date && passportOk === true && (
                      <div className="mt-3 flex items-center gap-2 p-3 rounded-xl bg-green-50 border border-green-200">
                        <Check className="w-4 h-4 text-green-600" />
                        <p className="text-xs text-green-700">{t("visa.passportValid")}</p>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Enriched applicant info — marital, employment, education */}
              <div className="mt-6 p-5 rounded-2xl bg-navy/5 border border-navy/10">
                <div className="flex items-center gap-2 mb-1">
                  <User className="w-4 h-4 text-navy" />
                  <p className="font-600 text-navy text-sm">{lang === "fr" ? "Informations complémentaires (demandeur principal)" : "Additional Information (Main Applicant)"}</p>
                </div>
                <p className="text-xs text-muted-foreground mb-4">{lang === "fr" ? "Ces informations renforcent votre dossier et accélèrent le traitement." : "This information strengthens your application and speeds up processing."}</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label={lang === "fr" ? "Situation matrimoniale" : "Marital Status"}>
                    <select className="input" value={form.marital_status} onChange={(e) => set("marital_status", e.target.value)}>
                      <option value="">{lang === "fr" ? "Sélectionner…" : "Select…"}</option>
                      <option value="single">{lang === "fr" ? "Célibataire" : "Single"}</option>
                      <option value="married">{lang === "fr" ? "Marié(e)" : "Married"}</option>
                      <option value="divorced">{lang === "fr" ? "Divorcé(e)" : "Divorced"}</option>
                      <option value="widowed">{lang === "fr" ? "Veuf/Veuve" : "Widowed"}</option>
                    </select>
                  </Field>
                  <Field label={lang === "fr" ? "Niveau d'études" : "Education Level"}>
                    <select className="input" value={form.education_level} onChange={(e) => set("education_level", e.target.value)}>
                      <option value="">{lang === "fr" ? "Sélectionner…" : "Select…"}</option>
                      <option value="high_school">{lang === "fr" ? "Lycée" : "High School"}</option>
                      <option value="bachelor">{lang === "fr" ? "Licence" : "Bachelor's"}</option>
                      <option value="master">{lang === "fr" ? "Master" : "Master's"}</option>
                      <option value="phd">{lang === "fr" ? "Doctorat" : "PhD"}</option>
                      <option value="other">{lang === "fr" ? "Autre" : "Other"}</option>
                    </select>
                  </Field>
                  <Field label={lang === "fr" ? "Profession" : "Occupation"}>
                    <input className="input" value={form.occupation} onChange={(e) => set("occupation", e.target.value)} placeholder={lang === "fr" ? "Ex: Ingénieur, Commerçant…" : "e.g. Engineer, Business owner…"} />
                  </Field>
                  <Field label={lang === "fr" ? "Employeur" : "Employer"}>
                    <input className="input" value={form.employer} onChange={(e) => set("employer", e.target.value)} placeholder={lang === "fr" ? "Nom de l'entreprise" : "Company name"} />
                  </Field>
                  <Field label={lang === "fr" ? "Adresse de l'employeur" : "Employer Address"} full>
                    <input className="input" value={form.employer_address} onChange={(e) => set("employer_address", e.target.value)} placeholder={lang === "fr" ? "Adresse complète" : "Full address"} />
                  </Field>
                  <Field label={lang === "fr" ? "Revenu mensuel (USD)" : "Monthly Income (USD)"}>
                    <input type="number" className="input" value={form.monthly_income} onChange={(e) => set("monthly_income", e.target.value)} placeholder="e.g. 5000" />
                  </Field>
                  <Field label={lang === "fr" ? "Voyage antérieur dans ce pays ?" : "Previous travel to this country?"}>
                    <select className="input" value={form.previous_travel} onChange={(e) => set("previous_travel", e.target.value)}>
                      <option value="">{lang === "fr" ? "Sélectionner…" : "Select…"}</option>
                      <option value="yes">{lang === "fr" ? "Oui" : "Yes"}</option>
                      <option value="no">{lang === "fr" ? "Non" : "No"}</option>
                    </select>
                  </Field>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2.5 p-4 rounded-2xl bg-navy/5 border border-navy/10">
                <ShieldCheck className="w-5 h-5 text-green shrink-0" />
                <div>
                  <p className="font-600 text-navy text-sm">{lang === "fr" ? "Votre liste de documents personnalisée" : "Your personalized document checklist"}</p>
                  <p className="text-xs text-muted-foreground">{lang === "fr" ? "Générée selon votre destination et votre motif de voyage" : "Generated based on your destination and travel purpose"}</p>
                </div>
              </div>

              {/* Required */}
              <div>
                <p className="text-xs font-700 uppercase tracking-wider text-red-600 mb-3 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-red-500" /> {lang === "fr" ? "Documents requis" : "Required documents"}</p>
                <div className="space-y-4">
                  {checklist.required.map((doc) => (
                    <FileDrop key={doc.name} label={doc.name} value={form.documents.filter((d) => d.type === doc.name)} onChange={(v) => set("documents", [...form.documents.filter((d) => d.type !== doc.name), ...v])} />
                  ))}
                </div>
              </div>

              {/* Conditional */}
              {checklist.conditional.length > 0 && (
                <div>
                  <p className="text-xs font-700 uppercase tracking-wider text-amber-600 mb-3 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> {lang === "fr" ? "Si applicable" : "If applicable"}</p>
                  <div className="space-y-4">
                    {checklist.conditional.map((doc) => (
                      <FileDrop key={doc.name} label={doc.name} value={form.documents.filter((d) => d.type === doc.name)} onChange={(v) => set("documents", [...form.documents.filter((d) => d.type !== doc.name), ...v])} />
                    ))}
                  </div>
                </div>
              )}

              {/* Supporting */}
              <div>
                <p className="text-xs font-700 uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-muted-foreground" /> {lang === "fr" ? "Documents complémentaires" : "Supporting documents"}</p>
                <div className="space-y-4">
                  {checklist.supporting.map((doc) => (
                    <FileDrop key={doc.name} label={doc.name} value={form.documents.filter((d) => d.type === doc.name)} onChange={(v) => set("documents", [...form.documents.filter((d) => d.type !== doc.name), ...v])} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              {/* Insurance option */}
              <div className={`p-5 rounded-2xl border-2 transition ${form.withInsurance ? "border-gold gold-glow" : "border-border"}`}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center shrink-0"><ShieldPlus className="w-5 h-5 text-gold" /></div>
                  <div className="flex-1">
                    <p className="font-600 text-navy">{t("visa.insuranceTitle")}</p>
                    <p className="text-xs text-muted-foreground mt-1">{t("visa.insuranceDesc")} · {formatPrice(INSURANCE_RATE_PER_DAY, currency)}{t("visa.insurancePerDay")} · {insuranceDays} {t("visa.insuranceDays")} × {pricing.travelers} {t("visa.insuranceTravelers")}</p>
                    <p className="font-display font-700 text-navy text-lg mt-2">{formatPrice(INSURANCE_RATE_PER_DAY * insuranceDays * pricing.travelers, currency)}</p>
                  </div>
                  <button onClick={() => set("withInsurance", !form.withInsurance)}
                    className={`px-5 py-2 rounded-full text-sm font-600 transition ${form.withInsurance ? "bg-gold text-white" : "bg-muted text-muted-foreground"}`}>
                    {form.withInsurance ? t("visa.added") : t("visa.add")}
                  </button>
                </div>
              </div>

              {/* Embassy priority */}
              <div className={`p-5 rounded-2xl border-2 transition ${form.embassyPriority ? "border-gold gold-glow" : "border-border"}`}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center shrink-0"><Plane className="w-5 h-5 text-gold" /></div>
                  <div className="flex-1">
                    <p className="font-600 text-navy">{t("visa.embassyTitle")}</p>
                    <p className="text-xs text-muted-foreground mt-1">{t("visa.embassyDesc")}</p>
                    <p className="font-display font-700 text-navy text-lg mt-2">{formatPrice(45, currency)}</p>
                  </div>
                  <button onClick={() => set("embassyPriority", !form.embassyPriority)}
                    className={`px-5 py-2 rounded-full text-sm font-600 transition ${form.embassyPriority ? "bg-gold text-white" : "bg-muted text-muted-foreground"}`}>
                    {form.embassyPriority ? t("visa.added") : t("visa.add")}
                  </button>
                </div>
              </div>

              {/* Guarantee */}
              <div className="p-5 rounded-2xl bg-navy text-white flex items-start gap-3">
                <ShieldCheck className="w-6 h-6 text-gold shrink-0" />
                <div>
                  <p className="font-600 text-white">{t("visa.guaranteeTitle")}</p>
                  <p className="text-xs text-white/70 mt-1">{t("visa.guaranteeDesc")}</p>
                </div>
              </div>

              {/* Recap */}
              <div className="pt-2">
                <h3 className="font-display font-600 text-navy text-lg mb-3">{t("visa.recapTitle")}</h3>
                <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                  <SummaryRow label={t("visa.recapDestination")} value={`${flag(form.destination_country)} ${form.destination_country}`} />
                  <SummaryRow label={lang === "fr" ? "Résidence" : "Residence"} value={`${flag(form.residence_country)} ${form.residence_country}`} />
                  <SummaryRow label={lang === "fr" ? "Motif" : "Purpose"} value={TRAVEL_PURPOSES.find((p) => p.id === form.travel_purpose)?.label || form.travel_purpose} />
                  <SummaryRow label={t("visa.recapVisa")} value={lang === "fr" ? VISA_TYPES.find(v => v.id === form.visa_type)?.label_fr : VISA_TYPES.find(v => v.id === form.visa_type)?.label_en} />
                  <SummaryRow label={t("visa.recapUrgency")} value={lang === "fr" ? URGENCY_OPTIONS.find(u => u.id === form.urgency)?.label_fr : URGENCY_OPTIONS.find(u => u.id === form.urgency)?.label_en} />
                  <SummaryRow label={t("visa.recapTravelers")} value={`${form.adults} ${lang === "fr" ? "adulte(s)" : "adult(s)"}, ${form.children} ${lang === "fr" ? "enfant(s)" : "child(ren)"}`} />
                  <SummaryRow label={t("visa.recapContact")} value={form.contact_email || "—"} />
                  <SummaryRow label={t("visa.recapInsurance")} value={form.withInsurance ? t("visa.yes") : t("visa.no")} />
                  <SummaryRow label={t("visa.recapDocuments")} value={`${form.documents.length} ${lang === "fr" ? "fichier(s)" : "file(s)"}`} />
                </div>

                {/* Price breakdown */}
                <div className="mt-5 p-4 rounded-xl bg-muted/50 border border-border space-y-2.5 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">{form.adults} × {lang === "fr" ? "Tarif visa adulte" : "Adult visa fee"}</span><span className="font-600 text-navy">{formatPrice(pricing.official * form.adults, currency)}</span></div>
                  {form.children > 0 && <div className="flex justify-between"><span className="text-muted-foreground">{form.children} × {lang === "fr" ? "Tarif visa enfant (−50%)" : "Child visa fee (−50%)"}</span><span className="font-600 text-navy">{formatPrice(pricing.childFee * form.children, currency)}</span></div>}
                  {pricing.urgency > 0 && <div className="flex justify-between"><span className="text-muted-foreground">{lang === "fr" ? "Traitement express" : "Express processing"}</span><span className="font-600 text-navy">{formatPrice(pricing.urgency, currency)}</span></div>}
                  {form.withInsurance && <div className="flex justify-between"><span className="text-muted-foreground">{lang === "fr" ? "Assurance voyage" : "Travel insurance"}</span><span className="font-600 text-navy">{formatPrice(pricing.insurance, currency)}</span></div>}
                  <div className="flex justify-between pt-2.5 mt-1 border-t border-border"><span className="font-700 text-navy">{t("visa.total")}</span><span className="font-display font-700 text-navy text-lg">{formatPrice(pricing.total, currency)}</span></div>
                </div>
              </div>
            </div>
          )}

          {/* Nav */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            <button onClick={prev} disabled={step === 0} className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-600 text-navy border border-border disabled:opacity-40 hover:bg-muted transition"><ArrowLeft className="w-4 h-4" /> {t("visa.prev")}</button>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">{t("visa.total")}</p>
              <p className="font-display font-700 text-navy text-lg">{formatPrice(pricing.total, currency)}</p>
            </div>
            {step < 3 ? (
              <button onClick={next} className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full text-sm font-semibold bg-navy text-white hover:bg-navy-soft transition">{t("visa.continue")} <ArrowRight className="w-4 h-4" /></button>
            ) : (
              <button onClick={submit} disabled={submitting} className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full text-sm font-semibold bg-gold text-white hover:bg-gold-hover transition gold-glow-hover disabled:opacity-60">
                {submitting ? t("visa.submitting") : t("visa.pay")} <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      <style>{`.input{width:100%;padding:0.625rem 0.75rem;border-radius:0.5rem;border:1px solid #E2E8F0;background:#fff;font-size:0.875rem;font-weight:500;outline:none}.input:focus{box-shadow:0 0 0 2px #E5231B}.input-icon{padding-left:2.25rem}`}</style>
      <Footer />
    </div>
  );

  function updateTraveler(i, k, v) {
    setForm((f) => {
      const travelers = [...f.travelers];
      travelers[i] = { ...travelers[i], [k]: v };
      return { ...f, travelers };
    });
  }
}

function Field({ label, full, children }) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label className="text-[0.75rem] font-600 uppercase tracking-wider text-muted-foreground">{label}</label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}
function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-border">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-600 text-navy text-right">{value}</span>
    </div>
  );
}