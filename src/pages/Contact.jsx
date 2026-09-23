import React, { useState } from "react";
import { Mail, Phone, MapPin, Globe, MessageCircle, Send, Clock, Facebook, Twitter, Instagram, Linkedin, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Image } from "@/components/ui/image";
import { base44 } from "@/api/base44Client";

const WHATSAPP_URL = "https://wa.me/35315550194?text=Hi%2C%20I%20would%20like%20to%20enquire%20about%20your%20visa%20services";

const SOCIAL = [
  { icon: Facebook, label: "Facebook", url: "#" },
  { icon: Twitter, label: "Twitter", url: "#" },
  { icon: Instagram, label: "Instagram", url: "#" },
  { icon: Linkedin, label: "LinkedIn", url: "#" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setSending(true);
    try {
      await base44.integrations.Core.SendEmail({
        to: "contact@trekvisa.com",
        subject: `Contact Form: ${form.subject || "New enquiry"}`,
        body: `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`,
      });
      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSent(false), 5000);
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  }

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Hero */}
      <section className="bg-navy relative overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&q=80" alt="Contact" fittingType="fill" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/80 to-navy" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 lg:py-20 relative text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green/15 border border-green/30 text-green text-xs font-600 uppercase tracking-wider">
            <Mail className="w-3.5 h-3.5" /> Get in Touch
          </span>
          <h1 className="font-display font-700 text-white mt-5" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>Contact Us</h1>
          <p className="text-white/70 text-[0.938rem] mt-3 max-w-2xl mx-auto">Have a question? Our team in Dublin is ready to help you with your visa and mobility needs.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16 w-full flex-1">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Contact info */}
          <div>
            <h2 className="font-display font-700 text-navy text-xl">Visit Our Office</h2>
            <p className="text-muted-foreground text-sm mt-2">Our headquarters in Dublin, Ireland — visit us or reach out through any of the channels below.</p>

            {/* Map placeholder */}
            <div className="mt-6 rounded-2xl overflow-hidden border border-border aspect-[16/10] relative">
              <Image src="https://images.unsplash.com/photo-1581373138457-0d1a4c4f4e3e?w=800&q=80" alt="Dublin Grand Canal Square" fittingType="fill" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 bg-white/95 rounded-2xl p-4">
                <div className="w-11 h-11 rounded-full bg-green flex items-center justify-center shrink-0"><MapPin className="w-5 h-5 text-white" /></div>
                <div>
                  <p className="font-600 text-navy text-sm">2nd Floor, 5 Grand Canal Square</p>
                  <p className="text-muted-foreground text-xs">Dublin 2, D02 A342, Ireland</p>
                </div>
              </div>
            </div>

            {/* Contact details */}
            <div className="mt-6 space-y-3">
              <ContactRow icon={Phone} label="Phone" value="+353 1 555 0194" href="tel:+35315550194" />
              <ContactRow icon={Phone} label="Office" value="+353 1 555 0195" href="tel:+35315550195" />
              <ContactRow icon={Mail} label="Email" value="contact@trekvisa.com" href="mailto:contact@trekvisa.com" />
              <ContactRow icon={Clock} label="Business Hours" value="Mon–Fri: 9:00 AM – 6:00 PM (Dublin time)" />
              <ContactRow icon={Globe} label="International Service" value="24/7 — WhatsApp support available" />
            </div>

            {/* WhatsApp CTA */}
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-white bg-green hover:bg-green-hover transition w-full justify-center">
              <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
            </a>

            {/* Social */}
            <div className="mt-6 flex items-center gap-3">
              <span className="text-xs text-muted-foreground font-600 uppercase tracking-wider">Follow us</span>
              {SOCIAL.map((s) => (
                <a key={s.label} href={s.url} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-navy hover:text-white transition">
                  <s.icon className="w-4 h-4 text-navy" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact form */}
          <div className="bg-white rounded-2xl border border-border p-6 sm:p-8">
            <h2 className="font-display font-700 text-navy text-xl">Send a Message</h2>
            <p className="text-muted-foreground text-sm mt-2 mb-6">Fill out the form below and we'll get back to you within 24 hours.</p>

            {sent ? (
              <div className="text-center py-12">
                <CheckCircle2 className="w-14 h-14 text-green mx-auto mb-4" />
                <p className="font-display font-600 text-navy text-lg">Message sent!</p>
                <p className="text-muted-foreground text-sm mt-2">We'll get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Full Name">
                    <input required className="input" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Your name" />
                  </Field>
                  <Field label="Email">
                    <input required type="email" className="input" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="email@example.com" />
                  </Field>
                </div>
                <Field label="Subject">
                  <input required className="input" value={form.subject} onChange={(e) => set("subject", e.target.value)} placeholder="What is your enquiry about?" />
                </Field>
                <Field label="Message">
                  <textarea required rows={5} className="input resize-none" value={form.message} onChange={(e) => set("message", e.target.value)} placeholder="Tell us how we can help..." />
                </Field>
                <button type="submit" disabled={sending} className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-white bg-green hover:bg-green-hover transition disabled:opacity-60">
                  <Send className="w-4 h-4" /> {sending ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <style>{`.input{width:100%;padding:0.625rem 0.75rem;border-radius:0.5rem;border:1px solid #E2E8F0;background:#fff;font-size:0.875rem;font-weight:500;outline:none}.input:focus{box-shadow:0 0 0 2px #E5231B}`}</style>
      <Footer />
    </div>
  );
}

function ContactRow({ icon: Icon, label, value, href }) {
  const content = (
    <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-border hover:shadow-md transition">
      <div className="w-10 h-10 rounded-full bg-green/10 flex items-center justify-center shrink-0"><Icon className="w-5 h-5 text-green" /></div>
      <div>
        <p className="text-xs text-muted-foreground font-600 uppercase tracking-wider">{label}</p>
        <p className="font-600 text-navy text-sm mt-0.5">{value}</p>
      </div>
    </div>
  );
  return href ? <a href={href}>{content}</a> : content;
}

function Field({ label, children }) {
  return (
    <div>
      <label className="text-[0.75rem] font-600 uppercase tracking-wider text-muted-foreground">{label}</label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}