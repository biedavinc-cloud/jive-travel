import React, { useEffect, useState } from "react";
import { Bell, Send, Download, FileText, MessageSquare, CheckCircle2, Clock, FileCheck, ShieldCheck, Mail, MessageCircle, Phone, Plane, Calendar, Users, DollarSign } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { base44 } from "@/api/base44Client";
import { formatPrice } from "@/lib/currencies";
import { useLanguage } from "@/lib/LanguageContext";

const STAGES = ["submitted", "processing", "review", "issued"];
const STAGE_LABELS = { submitted: "Dossier Reçu", processing: "En Traitement", review: "Vérification Expert", issued: "Visa Délivré" };

const NOTIFS = [
  { channel: "email", icon: Mail, text: "Dossier reçu — confirmation envoyée par email", time: "À l'instant" },
  { channel: "sms", icon: Phone, text: "SMS : votre dossier est en vérification expert", time: "Il y a 2h" },
  { channel: "whatsapp", icon: MessageCircle, text: "WhatsApp : soumission à l'ambassade programmée", time: "Hier" },
];

export default function Dashboard() {
  const { lang } = useLanguage();
  const [visas, setVisas] = useState([]);
  const [nationalities, setNationalities] = useState([]);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(true);
  const [showNotifs, setShowNotifs] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const me = await base44.auth.me();
        setUserId(me.id);
        const [v, n] = await Promise.all([
          base44.entities.VisaApplication.filter({ created_by_id: me.id }, "-created_date", 20),
          base44.entities.NationalityApplication.filter({ created_by_id: me.id }, "-created_date", 20),
        ]);
        setVisas(v);
        setNationalities(n);
        const msgs = await base44.entities.ChatMessage.filter({ thread_id: `advisor_${me.id}` }, "-created_date", 50);
        setMessages(msgs.reverse());
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function send() {
    if (!draft.trim()) return;
    try {
      const msg = await base44.entities.ChatMessage.create({ thread_id: `advisor_${userId}`, sender: "client", content: draft.trim() });
      setMessages((m) => [...m, msg]);
      setDraft("");
    } catch (e) { console.error(e); }
  }

  const allDossiers = [
    ...visas.map((v) => ({ id: v.id, type: "visa", label: `Visa ${v.destination_country}`, status: v.status, docs: v.documents || [] })),
    ...nationalities.map((n) => ({ id: n.id, type: "nationality", label: "Programme Nationalité", status: n.status, docs: n.documents || [] })),
  ];
  const currentStage = allDossiers[0]?.status || "submitted";
  const currentIdx = STAGES.indexOf(currentStage) === -1 ? 0 : STAGES.indexOf(currentStage);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full flex-1">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display font-700 text-navy text-2xl">Espace Client</h1>
            <p className="text-muted-foreground text-sm mt-1">Suivez vos dossiers en temps réel.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowNotifs((s) => !s)} className="relative w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center hover:bg-muted">
                <Bell className="w-5 h-5 text-navy" />
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-gold text-white text-[0.6rem] font-700 flex items-center justify-center">3</span>
              </button>
              {showNotifs && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-border overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-border font-600 text-navy text-sm">Notifications multi-canal</div>
                  {NOTIFS.map((n, i) => (
                    <div key={i} className="flex items-start gap-3 px-4 py-3 border-b border-border last:border-0 hover:bg-muted">
                      <div className="w-8 h-8 rounded-full bg-navy flex items-center justify-center shrink-0"><n.icon className="w-4 h-4 text-gold" /></div>
                      <div>
                        <p className="text-xs text-foreground">{n.text}</p>
                        <p className="text-[0.7rem] text-muted-foreground mt-0.5">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-white border border-border">
              <div className="w-8 h-8 rounded-full bg-navy flex items-center justify-center text-gold font-700 text-sm">A</div>
              <div className="hidden sm:block">
                <p className="text-xs font-600 text-navy">Votre conseiller</p>
                <p className="text-[0.7rem] text-muted-foreground">En ligne</p>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-muted-foreground">Chargement de vos dossiers...</div>
        ) : allDossiers.length === 0 ? (
          <div className="text-center py-20">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">Aucun dossier pour le moment.</p>
            <a href="/visa-application" className="mt-4 inline-block text-gold font-600">Démarrer une demande →</a>
          </div>
        ) : (
          <>
            {/* Timeline 5 steps */}
            <div className="bg-white rounded-2xl border border-border p-6 sm:p-8 shadow-sm mb-6">
              <h2 className="font-display font-600 text-navy text-lg mb-6">Avancement de votre dossier</h2>
              {visas[0] && (
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pb-5 mb-5 border-b border-border">
                  <div className="flex items-center gap-2"><Plane className="w-4 h-4 text-navy" /><span className="text-sm font-600 text-navy">{visas[0].destination_country}</span></div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground"><Calendar className="w-3.5 h-3.5" /> {visas[0].departure_date || "—"} → {visas[0].return_date || "—"}</div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground"><Users className="w-3.5 h-3.5" /> {visas[0].adults} {lang === "fr" ? "adulte(s)" : "adult(s)"}{visas[0].children > 0 ? ` + ${visas[0].children} ${lang === "fr" ? "enfant(s)" : "child"}` : ""}</div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground"><DollarSign className="w-3.5 h-3.5" /> {formatPrice(visas[0].total_price_usd, visas[0].currency || "USD")}</div>
                </div>
              )}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-0">
                {STAGES.map((stage, i) => {
                  const done = currentIdx >= i;
                  const active = currentIdx === i;
                  return (
                    <React.Fragment key={stage}>
                      <div className="flex sm:flex-col items-center sm:text-center gap-3 sm:gap-2">
                        <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${done ? "bg-gold text-white" : "bg-muted text-muted-foreground"}`}>
                          {done && !active ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                        </div>
                        <div>
                          <p className={`font-600 text-xs sm:text-sm ${done ? "text-navy" : "text-muted-foreground"}`}>{STAGE_LABELS[stage]}</p>
                          <p className="text-xs text-muted-foreground hidden sm:block">Étape {i + 1}</p>
                        </div>
                      </div>
                      {i < STAGES.length - 1 && (
                        <div className={`hidden sm:block h-0.5 mx-2 mt-5 ${currentIdx > i ? "bg-gold" : "bg-border"}`} />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-5">
                  <ShieldCheck className="w-5 h-5 text-gold" />
                  <h2 className="font-display font-600 text-navy text-lg">Coffre-fort numérique</h2>
                </div>
                <div className="space-y-3">
                  {allDossiers.flatMap((d) => d.docs).length === 0 ? (
                    <p className="text-sm text-muted-foreground">Vos documents validés apparaîtront ici.</p>
                  ) : (
                    allDossiers.flatMap((d) => d.docs).map((doc, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-muted hover:bg-border transition">
                        <div className="w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center"><FileCheck className="w-5 h-5 text-gold" /></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-600 text-navy truncate">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">{doc.type}</p>
                        </div>
                        <a href={doc.url} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-navy text-gold flex items-center justify-center hover:bg-navy-soft"><Download className="w-4 h-4" /></a>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-border shadow-sm flex flex-col" style={{ minHeight: "380px" }}>
                <div className="flex items-center gap-2 p-5 border-b border-border">
                  <MessageSquare className="w-5 h-5 text-gold" />
                  <h2 className="font-display font-600 text-navy text-lg">Messagerie conseiller</h2>
                </div>
                <div className="flex-1 overflow-y-auto p-5 space-y-3 no-scrollbar" style={{ maxHeight: "320px" }}>
                  {messages.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-8">Démarrez la conversation avec votre conseiller dédié.</p>
                  ) : messages.map((m) => (
                    <div key={m.id} className={`flex ${m.sender === "client" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${m.sender === "client" ? "bg-navy text-white rounded-br-sm" : "bg-muted text-foreground rounded-bl-sm"}`}>{m.content}</div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-border flex items-center gap-2">
                  <input value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Écrivez votre message..." className="flex-1 px-4 py-2.5 rounded-full border border-input bg-white text-sm outline-none focus:ring-2 ring-gold" />
                  <button onClick={send} className="w-10 h-10 rounded-full bg-gold text-white flex items-center justify-center hover:bg-gold-hover"><Send className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}