import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CreditCard, Download, Receipt, CheckCircle2, Clock, XCircle, Loader2, DollarSign } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { base44 } from "@/api/base44Client";
import { useCurrency } from "@/lib/CurrencyContext";
import { formatPrice } from "@/lib/currencies";

const STATUS_STYLE = {
  paid: { label: "Paid", bg: "bg-green-100", color: "text-green-700", icon: CheckCircle2 },
  pending: { label: "Pending", bg: "bg-amber-100", color: "text-amber-700", icon: Clock },
  failed: { label: "Failed", bg: "bg-red-100", color: "text-red-700", icon: XCircle },
};

export default function PaymentHistory() {
  const { currency } = useCurrency();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const me = await base44.auth.me();
        const o = await base44.entities.Order.filter({ created_by_id: me.id }, "-created_date", 100);
        setOrders(o);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const totalPaid = orders.filter((o) => o.payment_status === "paid").reduce((sum, o) => sum + (o.amount_usd || 0), 0);
  const totalPending = orders.filter((o) => o.payment_status === "pending").reduce((sum, o) => sum + (o.amount_usd || 0), 0);

  function downloadInvoice(order) {
    const lines = [
      "TREK VISA LIMITED",
      "2nd Floor, 5 Grand Canal Square, Dublin 2, D02 A342, Ireland",
      "CRO No. 123456.78",
      "",
      "INVOICE",
      `Reference: ${order.id}`,
      `Date: ${new Date(order.created_date).toLocaleDateString("en-GB")}`,
      `Description: ${order.label || "Visa service"}`,
      `Payment Method: ${order.payment_method || "card"}`,
      `Status: ${order.payment_status}`,
      "",
      `Amount: ${formatPrice(order.amount_usd, currency)}`,
      "",
      "Thank you for your business!",
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `invoice-${order.id.slice(0, 8)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <section className="bg-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, #E5231B 0, transparent 40%)" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 lg:py-20 relative">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green/15 border border-green/30 text-green text-xs font-600 uppercase tracking-wider">
            <Receipt className="w-3.5 h-3.5" /> Payment History
          </span>
          <h1 className="font-display font-700 text-white mt-5" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>Your Financial Transactions</h1>
          <p className="text-white/70 text-[0.938rem] mt-3 max-w-2xl">View all payments, download invoices, and track the status of your financial transactions.</p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10 w-full flex-1">
        {/* Summary */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-border p-5">
            <DollarSign className="w-6 h-6 text-green mb-2" />
            <p className="font-display font-700 text-2xl text-navy">{formatPrice(totalPaid, currency)}</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mt-0.5">Total Paid</p>
          </div>
          <div className="bg-white rounded-2xl border border-border p-5">
            <Clock className="w-6 h-6 text-amber-500 mb-2" />
            <p className="font-display font-700 text-2xl text-navy">{formatPrice(totalPending, currency)}</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mt-0.5">Pending</p>
          </div>
          <div className="bg-white rounded-2xl border border-border p-5">
            <CreditCard className="w-6 h-6 text-navy mb-2" />
            <p className="font-display font-700 text-2xl text-navy">{orders.length}</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mt-0.5">Total Transactions</p>
          </div>
        </div>

        {/* Transactions */}
        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-muted-foreground" /></div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20 rounded-2xl border-2 border-dashed border-border">
            <Receipt className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No transactions yet.</p>
            <Link to="/visa-application" className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-green hover:bg-green-hover">Start an application</Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted text-muted-foreground text-xs uppercase tracking-wider">
                <tr>
                  <th className="text-left px-5 py-3 font-600">Date</th>
                  <th className="text-left px-5 py-3 font-600">Description</th>
                  <th className="text-left px-5 py-3 font-600">Method</th>
                  <th className="text-right px-5 py-3 font-600">Amount</th>
                  <th className="text-center px-5 py-3 font-600">Status</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => {
                  const st = STATUS_STYLE[o.payment_status] || STATUS_STYLE.pending;
                  return (
                    <tr key={o.id} className="border-t border-border hover:bg-muted/50">
                      <td className="px-5 py-4 text-muted-foreground text-xs">{new Date(o.created_date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</td>
                      <td className="px-5 py-4 font-600 text-navy">{o.label || "Visa service"}</td>
                      <td className="px-5 py-4 text-muted-foreground capitalize">{o.payment_method || "card"}</td>
                      <td className="px-5 py-4 font-700 text-navy text-right">{formatPrice(o.amount_usd, currency)}</td>
                      <td className="px-5 py-4 text-center"><span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-700 ${st.bg} ${st.color}`}><st.icon className="w-3 h-3" /> {st.label}</span></td>
                      <td className="px-5 py-4 text-right">
                        <button onClick={() => downloadInvoice(o)} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-600 text-navy border border-border hover:bg-muted transition">
                          <Download className="w-3.5 h-3.5" /> Invoice
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}