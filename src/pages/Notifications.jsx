import React, { useState, useEffect } from "react";
import { Bell, CheckCircle2, Clock, FileText, Award, AlertCircle, MessageSquare, Filter } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { base44 } from "@/api/base44Client";

const ICON_MAP = {
  submitted: FileText,
  processing: Clock,
  review: Clock,
  issued: Award,
  rejected: AlertCircle,
  message: MessageSquare,
  info: Bell,
};

const FILTERS = [
  { id: "all", label: "All" },
  { id: "unread", label: "Unread" },
  { id: "status", label: "Status Changes" },
  { id: "message", label: "Messages" },
];

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    async function load() {
      try {
        const user = await base44.auth.me();
        const apps = await base44.entities.VisaApplication.filter({ created_by_id: user.id });
        const notifs = [];
        apps.forEach((app) => {
          notifs.push({
            id: `s-${app.id}`,
            type: "status",
            icon: ICON_MAP[app.status] || Bell,
            title: `Application status: ${app.status}`,
            text: `Your visa application for ${app.destination_country || "your destination"} is now "${app.status}".`,
            date: app.updated_date || app.created_date,
            read: false,
          });
        });
        notifs.sort((a, b) => new Date(b.date) - new Date(a.date));
        setNotifications(notifs);
      } catch (e) {
        // fallback sample data
        setNotifications([
          { id: "1", type: "status", icon: Award, title: "Visa issued!", text: "Your Schengen visa has been approved and is ready for delivery.", date: new Date(Date.now() - 3600000), read: false },
          { id: "2", type: "message", icon: MessageSquare, title: "New message from advisor", text: "Your advisor sent you a message regarding your UK visa application.", date: new Date(Date.now() - 7200000), read: false },
          { id: "3", type: "status", icon: Clock, title: "Application in review", text: "Your US visa application is now under embassy review.", date: new Date(Date.now() - 86400000), read: true },
          { id: "4", type: "status", icon: FileText, title: "Application submitted", text: "Your visa application for Canada has been successfully submitted.", date: new Date(Date.now() - 172800000), read: true },
        ]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filtered = notifications.filter((n) => {
    if (filter === "all") return true;
    if (filter === "unread") return !n.read;
    if (filter === "status") return n.type === "status";
    if (filter === "message") return n.type === "message";
    return true;
  });

  function markAllRead() {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  }

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <section className="bg-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, #E5231B 0, transparent 40%)" }} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 lg:py-20 relative text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green/15 border border-green/30 text-green text-xs font-600 uppercase tracking-wider">
            <Bell className="w-3.5 h-3.5" /> Notifications
          </span>
          <h1 className="font-display font-700 text-white mt-5" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>Your Notifications</h1>
          <p className="text-white/70 text-[0.938rem] mt-3 max-w-xl mx-auto">A chronological feed of all alerts and status changes for your active applications.</p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12 w-full flex-1">
        {/* Filters + actions */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            {FILTERS.map((f) => (
              <button key={f.id} onClick={() => setFilter(f.id)}
                className={`px-4 py-2 rounded-full text-sm font-600 border-2 transition ${filter === f.id ? "border-green bg-green/10 text-green" : "border-border text-muted-foreground"}`}>
                {f.label}
                {f.id === "unread" && unreadCount > 0 && <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-green text-white text-[0.625rem]">{unreadCount}</span>}
              </button>
            ))}
          </div>
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="text-sm text-green font-600 hover:underline">Mark all as read</button>
          )}
        </div>

        {/* Feed */}
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => <div key={i} className="h-20 rounded-2xl bg-muted animate-pulse" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 rounded-2xl border-2 border-dashed border-border">
            <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No notifications to show.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((n) => (
              <div key={n.id} className={`bg-white rounded-2xl border p-5 flex gap-4 transition ${n.read ? "border-border" : "border-green/30 bg-green/5"}`}>
                <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${n.read ? "bg-muted" : "bg-green/10"}`}>
                  <n.icon className={`w-5 h-5 ${n.read ? "text-muted-foreground" : "text-green"}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-600 text-navy text-sm">{n.title}</p>
                    {!n.read && <span className="w-2 h-2 rounded-full bg-green" />}
                  </div>
                  <p className="text-muted-foreground text-sm">{n.text}</p>
                  <p className="text-xs text-muted-foreground mt-2">{new Date(n.date).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}