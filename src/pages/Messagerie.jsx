import React, { useEffect, useState, useRef } from "react";
import { Send, MessageSquare, Circle, Paperclip, Phone, Video, Bot, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { base44 } from "@/api/base44Client";

export default function Messagerie() {
  const [dossiers, setDossiers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(true);
  const [aiTyping, setAiTyping] = useState(false);
  const [activeDossier, setActiveDossier] = useState(null);
  const scrollRef = useRef(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const me = await base44.auth.me();
        setUserId(me.id);
        const threadId = `advisor_${me.id}`;
        const [v, n] = await Promise.all([
          base44.entities.VisaApplication.filter({ created_by_id: me.id }, "-created_date", 20),
          base44.entities.NationalityApplication.filter({ created_by_id: me.id }, "-created_date", 20),
        ]);
        const all = [
          ...v.map((d) => ({ id: d.id, type: "visa", label: `Visa — ${d.destination_country}`, status: d.status })),
          ...n.map((d) => ({ id: d.id, type: "nationality", label: "Nationality Program", status: d.status })),
        ];
        setDossiers(all);
        if (all.length > 0) setActiveDossier(all[0]);
        const msgs = await base44.entities.ChatMessage.filter({ thread_id: threadId }, "-created_date", 50);
        setMessages(msgs.reverse());
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, aiTyping]);

  // Subscribe to realtime messages
  useEffect(() => {
    const unsub = base44.entities.ChatMessage.subscribe((event) => {
      if (userId && event.type === "create" && event.data.thread_id === `advisor_${userId}`) {
        setMessages((m) => [...m, event.data]);
      }
    });
    return unsub;
  }, [userId]);

  async function send() {
    if (!draft.trim() || !userId) return;
    const threadId = `advisor_${userId}`;
    const userMsg = draft.trim();
    setDraft("");
    try {
      const msg = await base44.entities.ChatMessage.create({ thread_id: threadId, sender: "client", content: userMsg });
      setMessages((m) => [...m, msg]);

      // Get AI response
      setAiTyping(true);
      try {
        const resp = await base44.functions.invoke("aiChat", {
          message: userMsg,
          history: messages.map((m) => ({ sender: m.sender, content: m.content })),
        });
        const aiReply = resp?.data?.reply || "Je suis désolé, je n'ai pas pu traiter votre demande. Un conseiller humain vous répondra bientôt.";
        const aiMsg = await base44.entities.ChatMessage.create({ thread_id: threadId, sender: "advisor", content: aiReply });
        setMessages((m) => [...m, aiMsg]);
      } catch (e) {
        console.error(e);
        const fallbackMsg = await base44.entities.ChatMessage.create({
          thread_id: threadId,
          sender: "advisor",
          content: "Je rencontre un problème technique. Un conseiller humain vous répondra dès que possible. Vous pouvez aussi nous contacter sur WhatsApp au +353 1 555 0194.",
        });
        setMessages((m) => [...m, fallbackMsg]);
      } finally {
        setAiTyping(false);
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full flex-1">
        <h1 className="font-display font-700 text-navy text-2xl mb-1">Expert Support — Live Chat</h1>
        <p className="text-muted-foreground text-sm mb-6">Chat with our AI assistant — available 24/7. A human advisor will follow up for complex cases.</p>

        <div className="grid lg:grid-cols-[320px_1fr] gap-6 bg-white rounded-2xl border border-border overflow-hidden" style={{ minHeight: "600px" }}>
          {/* Dossier sidebar */}
          <div className="border-r border-border flex flex-col">
            <div className="p-4 border-b border-border">
              <h2 className="font-600 text-navy text-sm flex items-center gap-2"><MessageSquare className="w-4 h-4 text-green" /> Your Dossiers</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {loading ? (
                <p className="text-sm text-muted-foreground text-center py-8">Loading...</p>
              ) : dossiers.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">No active dossiers.</p>
              ) : dossiers.map((d) => (
                <button key={d.id} onClick={() => setActiveDossier(d)} className={`w-full text-left p-3 rounded-xl transition ${activeDossier?.id === d.id ? "bg-navy text-white" : "hover:bg-muted"}`}>
                  <p className={`font-600 text-sm truncate ${activeDossier?.id === d.id ? "text-white" : "text-navy"}`}>{d.label}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className={`text-xs capitalize ${activeDossier?.id === d.id ? "text-white/60" : "text-muted-foreground"}`}>{d.status}</span>
                    <span className={`w-2 h-2 rounded-full ${d.status === "issued" || d.status === "approved" ? "bg-green" : "bg-amber-400"}`} />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat area */}
          <div className="flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-border flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green flex items-center justify-center text-white"><Bot className="w-5 h-5" /></div>
              <div>
                <p className="font-600 text-navy text-sm">AI Visa Assistant</p>
                <div className="flex items-center gap-1.5">
                  <Circle className="w-2 h-2 fill-green text-green" />
                  <span className="text-xs text-green font-600">Online · Powered by AI</span>
                </div>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <button className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-border transition"><Phone className="w-4 h-4 text-navy" /></button>
                <button className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-border transition"><Video className="w-4 h-4 text-navy" /></button>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-3 no-scrollbar" style={{ maxHeight: "460px" }}>
              {messages.length === 0 ? (
                <div className="text-center py-12">
                  <Bot className="w-10 h-10 text-green/30 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">Start a conversation with our AI assistant. Ask about visas, documents, processing times, and more.</p>
                </div>
              ) : messages.map((m, i) => (
                <div key={m.id || i} className={`flex ${m.sender === "client" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${m.sender === "client" ? "bg-navy text-white rounded-br-sm" : "bg-muted text-foreground rounded-bl-sm"}`}>{m.content}</div>
                </div>
              ))}
              {aiTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-2">
                    <Loader2 className="w-4 h-4 text-muted-foreground animate-spin" />
                    <span className="text-sm text-muted-foreground">AI is typing...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border flex items-center gap-2">
              <button className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-border transition shrink-0"><Paperclip className="w-4 h-4 text-navy" /></button>
              <input value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => e.key === "Enter" && !aiTyping && send()} placeholder="Type your message..." disabled={aiTyping} className="flex-1 px-4 py-2.5 rounded-full border border-input bg-white text-sm outline-none focus:ring-2 ring-green disabled:opacity-60" />
              <button onClick={send} disabled={aiTyping || !draft.trim()} className="w-10 h-10 rounded-full bg-green text-white flex items-center justify-center hover:bg-green-hover transition shrink-0 disabled:opacity-60"><Send className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}