import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { COUNTRIES, flag, VISA_STATUS } from "@/lib/visaRules";
import { ShieldCheck, Plus, Pencil, Trash2, X, Lock } from "lucide-react";

const ADMIN_EMAILS = ["webdxb1@gmail.com", "vincentnogue2@gmail.com"];

const STATUS_OPTIONS = Object.values(VISA_STATUS);

export default function AdminVisaRules() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rules, setRules] = useState([]);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    base44.auth.me().then((u) => { setUser(u); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const isAdmin = user && ADMIN_EMAILS.includes(user.email?.toLowerCase());

  const loadRules = () => base44.entities.VisaRule.list("-priority").then(setRules).catch(() => setRules([]));
  useEffect(() => { if (isAdmin) loadRules(); }, [isAdmin]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-muted border-t-navy rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="text-center max-w-sm">
            <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mx-auto mb-4"><Lock className="w-6 h-6 text-muted-foreground" /></div>
            <h1 className="font-display font-700 text-navy text-xl">Access restricted</h1>
            <p className="text-muted-foreground text-sm mt-2">This area is reserved for administrators.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  async function save(rule) {
    setSaving(true);
    try {
      if (rule.id) await base44.entities.VisaRule.update(rule.id, rule);
      else await base44.entities.VisaRule.create(rule);
      setEditing(null);
      await loadRules();
    } finally { setSaving(false); }
  }

  async function remove(id) {
    if (!confirm("Delete this rule?")) return;
    await base44.entities.VisaRule.delete(id);
    await loadRules();
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 w-full flex-1">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green/10 border border-green/20 text-green text-xs font-700 uppercase tracking-wider"><ShieldCheck className="w-3.5 h-3.5" /> Admin</span>
            <h1 className="font-display font-700 text-navy text-2xl mt-3">Visa Rules Engine</h1>
            <p className="text-muted-foreground text-sm mt-1">Manage visa status overrides. Rules here take priority over the default dataset.</p>
          </div>
          <button onClick={() => setEditing({ nationality: "ANY", destination_country: "", visa_status: "visa_required", priority: 0 })} className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold text-white bg-gold hover:bg-gold-hover transition">
            <Plus className="w-4 h-4" /> Add Rule
          </button>
        </div>

        {rules.length === 0 ? (
          <div className="text-center py-16 rounded-2xl border border-dashed border-border">
            <p className="text-muted-foreground text-sm max-w-md mx-auto">No override rules yet. The Smart Checker uses the default verified dataset. Add a rule to override a specific nationality → destination pathway.</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted text-muted-foreground text-xs uppercase tracking-wider">
                <tr>
                  <th className="text-left px-4 py-3 font-600">Nationality</th>
                  <th className="text-left px-4 py-3 font-600">Destination</th>
                  <th className="text-left px-4 py-3 font-600">Status</th>
                  <th className="text-left px-4 py-3 font-600">Gov. Fee</th>
                  <th className="text-left px-4 py-3 font-600">Processing</th>
                  <th className="text-left px-4 py-3 font-600">Priority</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {rules.map((r) => {
                  const st = STATUS_OPTIONS.find((s) => s.id === r.visa_status);
                  return (
                    <tr key={r.id} className="border-t border-border hover:bg-muted/50">
                      <td className="px-4 py-3">{r.nationality === "ANY" ? <span className="px-2 py-0.5 rounded-full bg-muted text-xs font-600">ANY</span> : <span className="flex items-center gap-2">{flag(r.nationality)} {r.nationality}</span>}</td>
                      <td className="px-4 py-3"><span className="flex items-center gap-2">{flag(r.destination_country)} {r.destination_country}</span></td>
                      <td className="px-4 py-3"><span className={`px-2.5 py-1 rounded-full text-xs font-600 ${st?.bg || ""} ${st?.color || ""}`}>{st?.label || r.visa_status}</span></td>
                      <td className="px-4 py-3 text-muted-foreground">{r.government_fee_usd != null ? `$${r.government_fee_usd}` : "—"}</td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">{r.processing_standard || "—"}</td>
                      <td className="px-4 py-3 text-muted-foreground">{r.priority || 0}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 justify-end">
                          <button onClick={() => setEditing(r)} className="p-2 rounded-full hover:bg-muted text-navy"><Pencil className="w-4 h-4" /></button>
                          <button onClick={() => remove(r.id)} className="p-2 rounded-full hover:bg-red-50 text-red-600"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {editing && <RuleDrawer rule={editing} onClose={() => setEditing(null)} onSave={save} saving={saving} />}

      <Footer />
    </div>
  );
}

function RuleDrawer({ rule, onClose, onSave, saving }) {
  const [form, setForm] = useState(rule);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-navy/60 backdrop-blur-sm p-0 sm:p-4">
      <div className="bg-white w-full sm:max-w-lg sm:rounded-3xl rounded-t-3xl shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border sticky top-0 bg-white">
          <h2 className="font-display font-700 text-navy text-lg">{rule.id ? "Edit Rule" : "New Rule"}</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-muted"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="text-xs font-600 uppercase tracking-wider text-muted-foreground">Nationality</label>
            <select value={form.nationality} onChange={(e) => set("nationality", e.target.value)} className="w-full mt-1.5 px-4 py-3 rounded-full border border-border bg-white text-sm outline-none focus:border-gold">
              <option value="ANY">ANY (all nationalities)</option>
              {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-600 uppercase tracking-wider text-muted-foreground">Destination</label>
            <select value={form.destination_country} onChange={(e) => set("destination_country", e.target.value)} className="w-full mt-1.5 px-4 py-3 rounded-full border border-border bg-white text-sm outline-none focus:border-gold">
              <option value="">Select destination…</option>
              {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-600 uppercase tracking-wider text-muted-foreground">Visa Status</label>
            <select value={form.visa_status} onChange={(e) => set("visa_status", e.target.value)} className="w-full mt-1.5 px-4 py-3 rounded-full border border-border bg-white text-sm outline-none focus:border-gold">
              {STATUS_OPTIONS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-600 uppercase tracking-wider text-muted-foreground">Gov. Fee (USD)</label>
              <input type="number" value={form.government_fee_usd ?? ""} onChange={(e) => set("government_fee_usd", e.target.value ? Number(e.target.value) : null)} placeholder="Default" className="w-full mt-1.5 px-4 py-3 rounded-full border border-border bg-white text-sm outline-none focus:border-gold" />
            </div>
            <div>
              <label className="text-xs font-600 uppercase tracking-wider text-muted-foreground">Priority</label>
              <input type="number" value={form.priority ?? 0} onChange={(e) => set("priority", Number(e.target.value) || 0)} className="w-full mt-1.5 px-4 py-3 rounded-full border border-border bg-white text-sm outline-none focus:border-gold" />
            </div>
          </div>
          <div>
            <label className="text-xs font-600 uppercase tracking-wider text-muted-foreground">Processing (standard)</label>
            <input type="text" value={form.processing_standard ?? ""} onChange={(e) => set("processing_standard", e.target.value)} placeholder="e.g. 5–10 working days" className="w-full mt-1.5 px-4 py-3 rounded-full border border-border bg-white text-sm outline-none focus:border-gold" />
          </div>
          <div>
            <label className="text-xs font-600 uppercase tracking-wider text-muted-foreground">Processing (express)</label>
            <input type="text" value={form.processing_express ?? ""} onChange={(e) => set("processing_express", e.target.value)} placeholder="e.g. 24–48 hours" className="w-full mt-1.5 px-4 py-3 rounded-full border border-border bg-white text-sm outline-none focus:border-gold" />
          </div>
          <div>
            <label className="text-xs font-600 uppercase tracking-wider text-muted-foreground">Notes</label>
            <textarea value={form.notes ?? ""} onChange={(e) => set("notes", e.target.value)} rows={2} placeholder="Optional internal notes" className="w-full mt-1.5 px-4 py-3 rounded-2xl border border-border bg-white text-sm outline-none focus:border-gold" />
          </div>
        </div>
        <div className="flex items-center gap-3 px-6 py-4 border-t border-border sticky bottom-0 bg-white">
          <button onClick={onClose} className="flex-1 px-5 py-3 rounded-full text-sm font-600 text-navy border border-border hover:bg-muted">Cancel</button>
          <button onClick={() => onSave(form)} disabled={!form.destination_country || saving} className="flex-1 px-5 py-3 rounded-full text-sm font-semibold text-white bg-gold hover:bg-gold-hover disabled:opacity-40">{saving ? "Saving…" : "Save Rule"}</button>
        </div>
      </div>
    </div>
  );
}