import React, { useEffect, useState } from "react";
import { User, Bell, Shield, Globe, Lock, Mail, Phone, Save, CheckCircle2, Smartphone, KeyRound } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { base44 } from "@/api/base44Client";
import { useCurrency } from "@/lib/CurrencyContext";
import PhoneInput from "@/components/PhoneInput";

export default function Parametres() {
  const { currency, setCurrency } = useCurrency();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [tab, setTab] = useState("personal");
  const [form, setForm] = useState({ full_name: "", phone: "", address: "" });
  const [notifs, setNotifs] = useState({ email: true, sms: true, whatsapp: true, marketing: false });
  const [security, setSecurity] = useState({ twoFactor: false, loginAlerts: true });

  useEffect(() => {
    (async () => {
      try {
        const me = await base44.auth.me();
        setUser(me);
        setForm({ full_name: me.full_name || "", phone: me.phone || "", address: me.address || "" });
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function save() {
    setSaving(true);
    setSaved(false);
    try {
      await base44.auth.updateMe({ full_name: form.full_name, phone: form.phone, address: form.address });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  }

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const TABS = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "preferences", label: "Preferences", icon: Globe },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center"><div className="w-8 h-8 border-4 border-muted border-t-navy rounded-full animate-spin" /></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 w-full flex-1">
        <h1 className="font-display font-700 text-navy text-2xl">Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage your personal information, notification preferences, and security.</p>

        {/* Tabs */}
        <div className="mt-6 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {TABS.map((tb) => (
            <button key={tb.id} onClick={() => setTab(tb.id)} className={`px-5 py-2.5 rounded-full text-sm font-600 whitespace-nowrap flex items-center gap-2 transition ${tab === tb.id ? "bg-navy text-white" : "bg-muted text-muted-foreground hover:bg-border"}`}>
              <tb.icon className="w-4 h-4" /> {tb.label}
            </button>
          ))}
        </div>

        <div className="mt-6 bg-white rounded-2xl border border-border p-6">
          {tab === "personal" && (
            <div className="space-y-5">
              <div className="flex items-center gap-2 mb-2"><User className="w-5 h-5 text-green" /><h2 className="font-display font-600 text-navy">Personal Information</h2></div>
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Full Name"><div className="relative"><User className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" /><input className="input input-icon" value={form.full_name} onChange={(e) => set("full_name", e.target.value)} /></div></Field>
                <Field label="Email"><div className="relative"><Mail className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" /><input className="input input-icon" value={user?.email || ""} disabled /></div></Field>
                <Field label="Phone"><PhoneInput value={form.phone} onChange={(v) => set("phone", v)} /></Field>
                <Field label="Address"><div className="relative"><Globe className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" /><input className="input input-icon" value={form.address} onChange={(e) => set("address", e.target.value)} placeholder="Your address" /></div></Field>
              </div>
            </div>
          )}

          {tab === "notifications" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2"><Bell className="w-5 h-5 text-green" /><h2 className="font-display font-600 text-navy">Notification Preferences</h2></div>
              <Toggle icon={Mail} label="Email Notifications" desc="Receive application updates by email" checked={notifs.email} onChange={(v) => setNotifs((n) => ({ ...n, email: v }))} />
              <Toggle icon={Smartphone} label="SMS Notifications" desc="Receive status updates by SMS" checked={notifs.sms} onChange={(v) => setNotifs((n) => ({ ...n, sms: v }))} />
              <Toggle icon={Phone} label="WhatsApp Notifications" desc="Receive updates on WhatsApp" checked={notifs.whatsapp} onChange={(v) => setNotifs((n) => ({ ...n, whatsapp: v }))} />
              <Toggle icon={Bell} label="Marketing Communications" desc="Offers, news, and travel tips" checked={notifs.marketing} onChange={(v) => setNotifs((n) => ({ ...n, marketing: v }))} />
            </div>
          )}

          {tab === "security" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2"><Shield className="w-5 h-5 text-green" /><h2 className="font-display font-600 text-navy">Security Settings</h2></div>
              <Toggle icon={KeyRound} label="Two-Factor Authentication" desc="Add an extra layer of security to your account" checked={security.twoFactor} onChange={(v) => setSecurity((s) => ({ ...s, twoFactor: v }))} />
              <Toggle icon={Bell} label="Login Alerts" desc="Get notified of new sign-ins to your account" checked={security.loginAlerts} onChange={(v) => setSecurity((s) => ({ ...s, loginAlerts: v }))} />
              <div className="pt-4 border-t border-border">
                <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-600 text-navy border border-border hover:bg-muted transition"><Lock className="w-4 h-4" /> Change Password</button>
              </div>
            </div>
          )}

          {tab === "preferences" && (
            <div className="space-y-5">
              <div className="flex items-center gap-2 mb-2"><Globe className="w-5 h-5 text-green" /><h2 className="font-display font-600 text-navy">Preferences</h2></div>
              <Field label="Preferred Currency">
                <select className="input" value={currency} onChange={(e) => setCurrency(e.target.value)}>
                  <option value="USD">USD — US Dollar</option>
                  <option value="EUR">EUR — Euro</option>
                  <option value="GBP">GBP — British Pound</option>
                  <option value="AED">AED — UAE Dirham</option>
                  <option value="NGN">NGN — Nigerian Naira</option>
                  <option value="XOF">XOF — West African CFA</option>
                </select>
              </Field>
            </div>
          )}
        </div>

        {/* Save */}
        <div className="mt-6 flex items-center justify-end gap-3">
          {saved && <span className="text-green text-sm font-600 flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Saved</span>}
          <button onClick={save} disabled={saving} className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-green hover:bg-green-hover transition disabled:opacity-60">
            <Save className="w-4 h-4" /> {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      <style>{`.input{width:100%;padding:0.625rem 0.75rem;border-radius:0.5rem;border:1px solid #E2E8F0;background:#fff;font-size:0.875rem;font-weight:500;outline:none}.input:focus{box-shadow:0 0 0 2px #E5231B}.input-icon{padding-left:2.25rem}`}</style>
      <Footer />
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

function Toggle({ icon: Icon, label, desc, checked, onChange }) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50">
      <div className="w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center shrink-0"><Icon className="w-5 h-5 text-navy" /></div>
      <div className="flex-1">
        <p className="font-600 text-navy text-sm">{label}</p>
        <p className="text-muted-foreground text-xs mt-0.5">{desc}</p>
      </div>
      <button onClick={() => onChange(!checked)} className={`relative w-12 h-7 rounded-full transition ${checked ? "bg-green" : "bg-border"}`}>
        <span className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-all ${checked ? "left-6" : "left-1"}`} />
      </button>
    </div>
  );
}