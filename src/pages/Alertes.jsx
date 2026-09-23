import React, { useState } from "react";
import { Bell, BellRing, Calendar, Globe, Clock, Plus, Trash2, CheckCircle2, Mail, Smartphone, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { COUNTRIES, flag } from "@/lib/visaData";

export default function Alertes() {
  const [alerts, setAlerts] = useState([
    { id: 1, type: "appointment", country: "United States", channel: "email", active: true, label: "New appointment slots — US Embassy" },
    { id: 2, type: "regulation", country: "Germany", channel: "whatsapp", active: true, label: "Schengen regulation changes" },
    { id: 3, type: "appointment", country: "United Kingdom", channel: "sms", active: false, label: "UK visa appointment availability" },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [newAlert, setNewAlert] = useState({ type: "appointment", country: "", channel: "email", label: "" });

  function addAlert() {
    if (!newAlert.country || !newAlert.label) return;
    setAlerts((a) => [...a, { ...newAlert, id: Date.now(), active: true }]);
    setNewAlert({ type: "appointment", country: "", channel: "email", label: "" });
    setShowForm(false);
  }

  const toggle = (id) => setAlerts((a) => a.map((x) => x.id === id ? { ...x, active: !x.active } : x));
  const remove = (id) => setAlerts((a) => a.filter((x) => x.id !== id));

  const CHANNEL_ICONS = { email: Mail, sms: Smartphone, whatsapp: MessageCircle };
  const TYPE_LABELS = { appointment: "Appointment Slots", regulation: "Regulation Changes", price: "Price Drops" };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 w-full flex-1">
        <div className="flex items-center gap-2">
          <BellRing className="w-6 h-6 text-green" />
          <h1 className="font-display font-700 text-navy text-2xl">Availability Alerts</h1>
        </div>
        <p className="text-muted-foreground text-sm mt-1">Get notified about new appointment slots, regulation changes, and more.</p>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl border border-border p-5 text-center">
            <Bell className="w-6 h-6 text-navy mx-auto mb-2" />
            <p className="font-display font-700 text-navy text-2xl">{alerts.length}</p>
            <p className="text-muted-foreground text-xs mt-1">Total Alerts</p>
          </div>
          <div className="bg-white rounded-2xl border border-border p-5 text-center">
            <BellRing className="w-6 h-6 text-green mx-auto mb-2" />
            <p className="font-display font-700 text-navy text-2xl">{alerts.filter((a) => a.active).length}</p>
            <p className="text-muted-foreground text-xs mt-1">Active</p>
          </div>
          <div className="bg-white rounded-2xl border border-border p-5 text-center">
            <Globe className="w-6 h-6 text-navy mx-auto mb-2" />
            <p className="font-display font-700 text-navy text-2xl">{new Set(alerts.map((a) => a.country)).size}</p>
            <p className="text-muted-foreground text-xs mt-1">Countries</p>
          </div>
        </div>

        {/* Add button */}
        <button onClick={() => setShowForm(!showForm)} className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-navy hover:bg-navy-soft transition">
          <Plus className="w-4 h-4" /> Create New Alert
        </button>

        {/* New alert form */}
        {showForm && (
          <div className="mt-4 bg-white rounded-2xl border border-border p-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-600 uppercase tracking-wider text-muted-foreground">Alert Type</label>
                <select className="input mt-1.5" value={newAlert.type} onChange={(e) => setNewAlert((a) => ({ ...a, type: e.target.value }))}>
                  <option value="appointment">Appointment Slots</option>
                  <option value="regulation">Regulation Changes</option>
                  <option value="price">Price Drops</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-600 uppercase tracking-wider text-muted-foreground">Country</label>
                <select className="input mt-1.5" value={newAlert.country} onChange={(e) => setNewAlert((a) => ({ ...a, country: e.target.value }))}>
                  <option value="">Select a country</option>
                  {COUNTRIES.map((c) => <option key={c}>{flag(c)} {c}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs font-600 uppercase tracking-wider text-muted-foreground">Alert Label</label>
              <input className="input mt-1.5" value={newAlert.label} onChange={(e) => setNewAlert((a) => ({ ...a, label: e.target.value }))} placeholder="e.g. New Schengen appointment slots" />
            </div>
            <div>
              <label className="text-xs font-600 uppercase tracking-wider text-muted-foreground">Notification Channel</label>
              <div className="mt-2 flex gap-2">
                {[
                  { id: "email", label: "Email", icon: Mail },
                  { id: "sms", label: "SMS", icon: Smartphone },
                  { id: "whatsapp", label: "WhatsApp", icon: MessageCircle },
                ].map((ch) => {
                  const Icon = ch.icon;
                  return (
                    <button key={ch.id} onClick={() => setNewAlert((a) => ({ ...a, channel: ch.id }))} className={`px-4 py-2 rounded-full text-sm font-600 flex items-center gap-2 ${newAlert.channel === ch.id ? "bg-navy text-white" : "bg-muted text-muted-foreground hover:bg-border"}`}>
                      <Icon className="w-4 h-4" /> {ch.label}
                    </button>
                  );
                })}
              </div>
            </div>
            <button onClick={addAlert} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-green hover:bg-green-hover transition"><CheckCircle2 className="w-4 h-4" /> Create Alert</button>
          </div>
        )}

        {/* Alerts list */}
        <div className="mt-6 space-y-3">
          {alerts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-border">
              <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No alerts configured yet.</p>
            </div>
          ) : alerts.map((a) => {
            const ChannelIcon = CHANNEL_ICONS[a.channel];
            return (
              <div key={a.id} className="bg-white rounded-2xl border border-border p-4 flex items-center gap-4">
                <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${a.active ? "bg-green/10" : "bg-muted"}`}>
                  <BellRing className={`w-5 h-5 ${a.active ? "text-green" : "text-muted-foreground"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-600 text-navy text-sm truncate">{a.label}</p>
                    {a.country && <span>{flag(a.country)}</span>}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-0.5 rounded-full bg-muted text-xs text-muted-foreground">{TYPE_LABELS[a.type]}</span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground"><ChannelIcon className="w-3 h-3" /> {a.channel}</span>
                  </div>
                </div>
                <button onClick={() => toggle(a.id)} className={`relative w-12 h-7 rounded-full transition shrink-0 ${a.active ? "bg-green" : "bg-border"}`}>
                  <span className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-all ${a.active ? "left-6" : "left-1"}`} />
                </button>
                <button onClick={() => remove(a.id)} className="w-9 h-9 rounded-full bg-muted text-muted-foreground flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition shrink-0"><Trash2 className="w-4 h-4" /></button>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`.input{width:100%;padding:0.625rem 0.75rem;border-radius:0.5rem;border:1px solid #E2E8F0;background:#fff;font-size:0.875rem;font-weight:500;outline:none}.input:focus{box-shadow:0 0 0 2px #E5231B}`}</style>
      <Footer />
    </div>
  );
}