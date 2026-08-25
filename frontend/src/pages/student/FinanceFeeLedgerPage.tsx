import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Invoice, FeePayment, FeeBalanceSummary } from '../../types';
import {
  CreditCard,
  CheckCircle2,
  Clock,
  Download,
  Printer,
  ShieldCheck,
  Smartphone,
  Plus,
  Receipt,
} from 'lucide-react';
import { JiungePaymentModal } from '../../components/JiungePaymentModal';

export const FinanceFeeLedgerPage: React.FC = () => {
  const [balance, setBalance] = useState<FeeBalanceSummary>({ userId: '', total_invoiced: 0, total_paid: 0, balance: 0 });
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [payments, setPayments] = useState<FeePayment[]>([]);
  const [payModalOpen, setPayModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const loadData = async () => {
    const bal = await api.getFeeBalance();
    const invs = await api.getInvoices();
    const pays = await api.getPayments();
    setBalance(bal);
    setInvoices(invs);
    setPayments(pays);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handlePayInvoice = (inv: Invoice) => {
    setSelectedInvoice(inv);
    setPayModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Balance overview */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-brand-100 text-brand-800 text-[10px] font-bold uppercase tracking-wider">
              Layer 7 Microservice
            </span>
            <span className="text-xs text-slate-500 font-semibold">• Official Jiunge / Pesaflow Gateway</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-navy-950">Student Fee Ledger & Statement</h2>
          <p className="text-xs text-slate-500">
            Real-time fee reconciliation with webhook-verified idempotent settlement.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Outstanding Balance</span>
            <span className="text-2xl font-extrabold text-navy-950 font-mono">
              KES {balance.balance.toLocaleString()}
            </span>
          </div>

          <button
            onClick={() => {
              setSelectedInvoice(null);
              setPayModalOpen(true);
            }}
            className="px-6 py-4 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl font-bold text-sm shadow-lg hover:shadow-brand-500/25 transition flex items-center justify-center gap-2"
          >
            <CreditCard className="w-4 h-4" />
            <span>Pay Fees via M-Pesa</span>
          </button>
        </div>
      </div>

      {/* Itemized Invoices Table */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base text-navy-950">Billed Invoices & Charges</h3>
            <p className="text-xs text-slate-500">Official semester charge items assigned to your account</p>
          </div>
          <button
            onClick={() => window.print()}
            className="p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition flex items-center gap-1 text-xs font-semibold"
          >
            <Printer className="w-4 h-4" />
            <span>Print Ledger</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold">
                <th className="py-3 px-4">Date Billed</th>
                <th className="py-3 px-4">Jiunge Invoice #</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Amount (KES)</th>
                <th className="py-3 px-4">Settlement Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-3.5 px-4 font-semibold text-slate-700">
                    {new Date(inv.created_at).toLocaleDateString('en-KE')}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                    {inv.jiunge_invoice_no || `INV-${inv.id.slice(0, 8)}`}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-800">{inv.description}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900 font-mono">
                    KES {inv.amount.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        inv.status === 'paid'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {inv.status === 'pending' && (
                      <button
                        onClick={() => handlePayInvoice(inv)}
                        className="px-3 py-1 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-xs font-bold shadow-sm transition"
                      >
                        Pay Now
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Verified Payment History */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h3 className="font-bold text-base text-navy-950">Verified Jiunge / Pesaflow Transactions</h3>
          <p className="text-xs text-slate-500">Processed electronic payments with instantaneous receipt tokens</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold">
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Jiunge Reference</th>
                <th className="py-3 px-4">Payment Channel</th>
                <th className="py-3 px-4">Amount Paid</th>
                <th className="py-3 px-4">Gateway Status</th>
                <th className="py-3 px-4 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {payments.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-3.5 px-4 font-semibold text-slate-700">
                    {new Date(p.created_at).toLocaleString('en-KE')}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{p.jiunge_invoice_no}</td>
                  <td className="py-3.5 px-4 font-medium text-slate-800 uppercase">M-Pesa STK (Jiunge)</td>
                  <td className="py-3.5 px-4 font-extrabold text-emerald-700 font-mono">
                    KES {p.amount_paid.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] uppercase">
                      Settled
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => alert(`Official University Receipt Token: ${p.jiunge_invoice_no}\nAmount: KES ${p.amount_paid}\nStatus: Verified`)}
                      className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition inline-flex items-center gap-1"
                    >
                      <Receipt className="w-3.5 h-3.5" />
                      <span>View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <JiungePaymentModal
        isOpen={payModalOpen}
        onClose={() => setPayModalOpen(false)}
        onSuccess={() => {
          setPayModalOpen(false);
          loadData();
        }}
        defaultAmount={selectedInvoice ? selectedInvoice.amount : balance.balance > 0 ? balance.balance : 5000}
        description={selectedInvoice ? selectedInvoice.description : 'Tuition Fee Payment (Jiunge/Pesaflow)'}
      />
    </div>
  );
};
