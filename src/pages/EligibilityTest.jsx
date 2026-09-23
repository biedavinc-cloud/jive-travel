import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Check, ShieldCheck, AlertCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { COUNTRIES, flag } from "@/lib/visaData";

const QUESTIONS = [
  { id: "passport_valid", label: "Votre passeport est-il valide au moins 6 mois après la date de retour prévue ?", type: "bool" },
  { id: "prev_refusal", label: "Avez-vous déjà eu un refus de visa pour ce pays ?", type: "bool" },
  { id: "funds", label: "Disposez-vous de justificatifs de ressources suffisants ?", type: "bool" },
  { id: "clean_record", label: "Avez-vous un casier judiciaire vierge ?", type: "bool" },
];

export default function EligibilityTest() {
  const navigate = useNavigate();
  const [origin, setOrigin] = useState("France");
  const [destination, setDestination] = useState("United States");
  const [answers, setAnswers] = useState({});
  const [done, setDone] = useState(false);

  const score = QUESTIONS.reduce((acc, q) => acc + (answers[q.id] === true ? 1 : 0), 0);
  const eligible = score >= 3 && answers.passport_valid !== false;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 w-full flex-1">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-navy flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-7 h-7 text-gold" />
          </div>
          <h1 className="font-display font-700 text-navy text-2xl">Test d'éligibilité Visa</h1>
          <p className="text-muted-foreground text-sm mt-2">Évaluez gratuitement vos chances d'obtention en 1 minute.</p>
        </div>

        <div className="bg-white rounded-2xl border border-border p-6 sm:p-8 shadow-sm">
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="text-[0.75rem] font-600 uppercase tracking-wider text-muted-foreground">Nationalité actuelle</label>
              <select value={origin} onChange={(e) => setOrigin(e.target.value)} className="input mt-1.5">
                {COUNTRIES.map((c) => <option key={c}>{flag(c)} {c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[0.75rem] font-600 uppercase tracking-wider text-muted-foreground">Pays de destination</label>
              <select value={destination} onChange={(e) => setDestination(e.target.value)} className="input mt-1.5">
                {COUNTRIES.map((c) => <option key={c}>{flag(c)} {c}</option>)}
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {QUESTIONS.map((q) => (
              <div key={q.id} className="border-b border-border pb-4 last:border-0">
                <p className="text-sm font-600 text-navy mb-2.5">{q.label}</p>
                <div className="flex gap-2">
                  <button onClick={() => setAnswers((a) => ({ ...a, [q.id]: true }))}
                    className={`px-5 py-2 rounded-full text-sm font-600 transition ${answers[q.id] === true ? "bg-gold text-white" : "bg-muted text-muted-foreground hover:bg-border"}`}>
                    Oui
                  </button>
                  <button onClick={() => setAnswers((a) => ({ ...a, [q.id]: false }))}
                    className={`px-5 py-2 rounded-full text-sm font-600 transition ${answers[q.id] === false ? "bg-navy text-white" : "bg-muted text-muted-foreground hover:bg-border"}`}>
                    Non
                  </button>
                </div>
              </div>
            ))}
          </div>

          {!done ? (
            <button onClick={() => setDone(true)} disabled={Object.keys(answers).length < QUESTIONS.length}
              className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-navy text-white font-semibold text-sm hover:bg-navy-soft transition disabled:opacity-50">
              Voir mon résultat <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <div className={`mt-6 p-5 rounded-2xl ${eligible ? "bg-green-50 border border-green-200" : "bg-orange-50 border border-orange-200"}`}>
              <div className="flex items-start gap-3">
                {eligible ? <Check className="w-6 h-6 text-green-600 shrink-0" /> : <AlertCircle className="w-6 h-6 text-orange-500 shrink-0" />}
                <div>
                  <p className={`font-600 ${eligible ? "text-green-700" : "text-orange-700"}`}>
                    {eligible ? "Vous êtes éligible !" : "Éligibilité partielle"}
                  </p>
                  <p className="text-sm text-foreground/70 mt-1">
                    {eligible
                      ? `Votre dossier pour ${destination} présente de fortes chances de réussite. Nos experts vous accompagnent pour maximiser vos chances.`
                      : `Certains points nécessitent l'accompagnement de nos experts pour ${destination}. Nous pouvons vous aider à régulariser votre situation.`}
                  </p>
                  <button
                    onClick={() => navigate("/visa-application", { state: { origin, destination } })}
                    className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold text-white font-semibold text-sm hover:bg-gold-hover transition gold-glow-hover"
                  >
                    Démarrer ma demande <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <style>{`.input{width:100%;padding:0.625rem 0.75rem;border-radius:0.5rem;border:1px solid #E2E8F0;background:#fff;font-size:0.875rem;font-weight:500;outline:none}.input:focus{box-shadow:0 0 0 2px #E5231B}`}</style>
      <Footer />
    </div>
  );
}