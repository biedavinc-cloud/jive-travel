import React, { useEffect, useState, useRef } from "react";
import { User, Mail, Phone, MapPin, Shield, Save, FileCheck, Upload, CheckCircle2, Globe, Camera } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { base44 } from "@/api/base44Client";
import FileDrop from "@/components/FileDrop";
import { useCurrency } from "@/lib/CurrencyContext";
import { CURRENCIES } from "@/lib/currencies";
import PhoneInput from "@/components/PhoneInput";

export default function Profile() {
  const { currency, setCurrency } = useCurrency();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({ full_name: "", phone: "", address: "", nationality: "" });
  const [docs, setDocs] = useState([]);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const me = await base44.auth.me();
        setUser(me);
        setForm({
          full_name: me.full_name || "",
          phone: me.phone || "",
          address: me.address || "",
          nationality: me.nationality || "",
        });
        if (me.identity_docs) setDocs(me.identity_docs);
        if (me.avatar_url) setAvatarUrl(me.avatar_url);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function handleAvatarUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingAvatar(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadPublicFile({ file });
      setAvatarUrl(file_url);
      await base44.auth.updateMe({ avatar_url: file_url });
    } catch (e) {
      console.error(e);
    } finally {
      setUploadingAvatar(false);
    }
  }

  async function save() {
    setSaving(true);
    setSaved(false);
    try {
      await base44.auth.updateMe({
        full_name: form.full_name,
        phone: form.phone,
        address: form.address,
        nationality: form.nationality,
        identity_docs: docs,
        avatar_url: avatarUrl,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  }

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 w-full flex-1">
        <h1 className="font-display font-700 text-navy text-2xl">My Profile</h1>
        <p className="text-muted-foreground text-sm mt-1">Update your contact details, preferences, and identity documents.</p>

        {/* Avatar + name with upload */}
        <div className="mt-6 bg-white rounded-2xl border border-border p-6 flex items-center gap-4">
          <div className="relative group">
            {avatarUrl ? (
              <img src={avatarUrl} alt="Avatar" className="w-20 h-20 rounded-full object-cover border-2 border-border" />
            ) : (
              <div className="w-20 h-20 rounded-full bg-navy flex items-center justify-center text-green font-display font-700 text-2xl">
                {user?.full_name?.charAt(0)?.toUpperCase() || "U"}
              </div>
            )}
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadingAvatar}
              className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-green text-white flex items-center justify-center shadow-lg hover:bg-green-hover transition disabled:opacity-60"
            >
              {uploadingAvatar ? <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Camera className="w-4 h-4" />}
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
          </div>
          <div>
            <p className="font-display font-600 text-navy text-lg">{form.full_name || "Your Name"}</p>
            <p className="text-muted-foreground text-sm">{user?.email}</p>
            <p className="text-xs text-muted-foreground mt-1">Click the camera icon to upload a profile photo</p>
          </div>
          <span className="ml-auto px-3 py-1.5 rounded-full bg-green/10 text-green text-xs font-600 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Verified</span>
        </div>

        {/* Contact info */}
        <div className="mt-6 bg-white rounded-2xl border border-border p-6">
          <div className="flex items-center gap-2 mb-5">
            <User className="w-5 h-5 text-green" />
            <h2 className="font-display font-600 text-navy">Contact Information</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Full Name">
              <div className="relative">
                <User className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                <input className="input input-icon" value={form.full_name} onChange={(e) => set("full_name", e.target.value)} placeholder="Your full name" />
              </div>
            </Field>
            <Field label="Email">
              <div className="relative">
                <Mail className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                <input className="input input-icon" value={user?.email || ""} disabled placeholder="email@example.com" />
              </div>
            </Field>
            <Field label="Phone (WhatsApp)">
              <PhoneInput value={form.phone} onChange={(v) => set("phone", v)} />
            </Field>
            <Field label="Nationality">
              <div className="relative">
                <Globe className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                <input className="input input-icon" value={form.nationality} onChange={(e) => set("nationality", e.target.value)} placeholder="Your nationality" />
              </div>
            </Field>
            <Field label="Address" full>
              <div className="relative">
                <MapPin className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                <input className="input input-icon" value={form.address} onChange={(e) => set("address", e.target.value)} placeholder="Your residential address" />
              </div>
            </Field>
          </div>
        </div>

        {/* Identity documents */}
        <div className="mt-6 bg-white rounded-2xl border border-border p-6">
          <div className="flex items-center gap-2 mb-5">
            <Shield className="w-5 h-5 text-green" />
            <h2 className="font-display font-600 text-navy">Identity Documents</h2>
          </div>
          <p className="text-muted-foreground text-sm mb-5">Upload or replace your identity documents. These are used to pre-fill your applications.</p>
          <FileDrop label="Passport Scan" value={docs.filter((d) => d.type === "Passport Scan")} onChange={(v) => setDocs([...docs.filter((d) => d.type !== "Passport Scan"), ...v])} />
          <div className="mt-4">
            <FileDrop label="ID Photo" value={docs.filter((d) => d.type === "ID Photo")} onChange={(v) => setDocs([...docs.filter((d) => d.type !== "ID Photo"), ...v])} />
          </div>
        </div>

        {/* Preferences */}
        <div className="mt-6 bg-white rounded-2xl border border-border p-6">
          <div className="flex items-center gap-2 mb-5">
            <Globe className="w-5 h-5 text-green" />
            <h2 className="font-display font-600 text-navy">Preferences</h2>
          </div>
          <Field label="Preferred Currency">
            <select className="input" value={currency} onChange={(e) => setCurrency(e.target.value)}>
              {CURRENCIES.map((c) => <option key={c.code} value={c.code}>{c.code} — {c.label} ({c.symbol})</option>)}
            </select>
          </Field>
        </div>

        {/* Save */}
        <div className="mt-6 flex items-center justify-end gap-3">
          {saved && <span className="text-green text-sm font-600 flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Saved successfully</span>}
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

function Field({ label, full, children }) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label className="text-[0.75rem] font-600 uppercase tracking-wider text-muted-foreground">{label}</label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}