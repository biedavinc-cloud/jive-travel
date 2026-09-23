import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Gift, Copy, Check, Users, Award, TrendingUp, Share2, Sparkles, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { base44 } from "@/api/base44Client";

const REWARDS = [
  { referrals: 1, reward: "$25 credit", desc: "Your first successful referral" },
  { referrals: 3, reward: "$75 credit", desc: "Three referrals — keep going!" },
  { referrals: 5, reward: "$150 credit + Priority processing", desc: "Five referrals — you're a star advocate" },
  { referrals: 10, reward: "$300 credit + Free visa application", desc: "Ten referrals — elite ambassador status" },
];

export default function Referrals() {
  const [user, setUser] = useState(null);
  const [copied, setCopied] = useState(false);
  const [referrals, setReferrals] = useState([
    { name: "A. Bennani", email: "a***@gmail.com", status: "completed", date: "2026-08-15", reward: "$25" },
    { name: "S. Nkomo", email: "s***@outlook.com", status: "completed", date: "2026-09-02", reward: "$25" },
    { name: "M. Diallo", email: "m***@yahoo.com", status: "pending", date: "2026-09-18", reward: "—" },
  ]);

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => {});
  }, []);

  const referralCode = user?.id?.slice(0, 8)?.toUpperCase() || "TREK2026";
  const referralLink = `https://trkvisa.com/?ref=${referralCode}`;

  function copyLink() {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const completed = referrals.filter((r) => r.status === "completed").length;
  const totalEarned = completed * 25;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <section className="bg-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, #E5231B 0, transparent 40%)" }} />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 lg:py-20 relative text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green/15 border border-green/30 text-green text-xs font-600 uppercase tracking-wider">
            <Gift className="w-3.5 h-3.5" /> Referral Program
          </span>
          <h1 className="font-display font-700 text-white mt-5" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>Invite Friends, Earn Rewards</h1>
          <p className="text-white/70 text-[0.938rem] mt-3 max-w-xl mx-auto">Share your unique link and earn $25 credit for every friend who completes a visa application with Trek Visa.</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 lg:py-16 w-full flex-1">
        {/* Referral link card */}
        <div className="bg-gradient-to-br from-navy to-navy-soft rounded-3xl p-6 sm:p-8 text-center">
          <Sparkles className="w-8 h-8 text-green mx-auto mb-3" />
          <h2 className="font-display font-700 text-white text-xl">Your Unique Referral Link</h2>
          <p className="text-white/60 text-sm mt-1.5 mb-5">Share this link with friends — they get $25 off their first application.</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <div className="flex-1 px-5 py-3.5 rounded-full bg-white/10 border border-white/20 text-white text-sm font-mono truncate text-center sm:text-left">{referralLink}</div>
            <button onClick={copyLink} className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-navy bg-green hover:bg-green-hover transition whitespace-nowrap">
              {copied ? <><Check className="w-4 h-4" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy Link</>}
            </button>
          </div>
          <div className="mt-4 flex items-center justify-center gap-4">
            <span className="text-xs text-white/40">Referral code:</span>
            <span className="px-3 py-1 rounded-full bg-white/10 text-white text-sm font-700 font-mono">{referralCode}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="bg-white rounded-2xl border border-border p-5 text-center">
            <Users className="w-6 h-6 text-green mx-auto mb-2" />
            <p className="font-display font-700 text-2xl text-navy">{referrals.length}</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mt-0.5">Total Invited</p>
          </div>
          <div className="bg-white rounded-2xl border border-border p-5 text-center">
            <Check className="w-6 h-6 text-green mx-auto mb-2" />
            <p className="font-display font-700 text-2xl text-navy">{completed}</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mt-0.5">Completed</p>
          </div>
          <div className="bg-white rounded-2xl border border-border p-5 text-center">
            <Award className="w-6 h-6 text-green mx-auto mb-2" />
            <p className="font-display font-700 text-2xl text-navy">${totalEarned}</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mt-0.5">Credits Earned</p>
          </div>
        </div>

        {/* Rewards tiers */}
        <div className="mt-10">
          <h2 className="font-display font-700 text-navy text-xl mb-5 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-green" /> Reward Tiers</h2>
          <div className="space-y-3">
            {REWARDS.map((r, i) => {
              const unlocked = completed >= r.referrals;
              return (
                <div key={i} className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition ${unlocked ? "border-green bg-green/5" : "border-border bg-white"}`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${unlocked ? "bg-green text-white" : "bg-muted text-muted-foreground"}`}>
                    {unlocked ? <Check className="w-6 h-6" /> : <Gift className="w-6 h-6" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-600 text-navy text-sm">{r.reward}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{r.desc}</p>
                  </div>
                  <span className={`px-3 py-1.5 rounded-full text-xs font-700 ${unlocked ? "bg-green text-white" : "bg-muted text-muted-foreground"}`}>{r.referrals} refs</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Referral list */}
        <div className="mt-10">
          <h2 className="font-display font-700 text-navy text-xl mb-5">Your Referrals</h2>
          <div className="bg-white rounded-2xl border border-border overflow-hidden">
            {referrals.map((r, i) => (
              <div key={i} className={`flex items-center gap-4 p-4 ${i > 0 ? "border-t border-border" : ""}`}>
                <div className="w-10 h-10 rounded-full bg-navy text-green flex items-center justify-center text-sm font-700 shrink-0">{r.name[0]}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-600 text-navy text-sm">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.email}</p>
                </div>
                <span className="text-xs text-muted-foreground hidden sm:block">{new Date(r.date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-700 ${r.status === "completed" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>{r.status}</span>
                <span className="font-700 text-navy text-sm w-12 text-right">{r.reward}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link to="/visa-application" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-white bg-green hover:bg-green-hover transition">
            Start your own application <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}