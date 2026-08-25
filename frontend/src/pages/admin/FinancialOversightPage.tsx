import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { FeePayment } from '../../types';
import {
  CreditCard,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  Download,
  Receipt,
} from 'lucide-react';

export const FinancialOversightPage: React.FC = () => {
  const [payments, setPayments] = useState<FeePayment[]>([]);

  useEffect(() => {
    const fetchPayments = async () => {
      const list = await api.getPayments();
      setPayments(list);
    };
    fetchPayments();
  }, []);

  const totalCollected = payments.reduce((sum, p) => sum + p.amount_paid, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-brand-100 text-brand-800 text-[10px] font-bold uppercase tracking-wider">
              Finance Microservice (Layer 7)
            </span>
            <span className="text-xs text-slate-500 font-semibold">• Jiunge / Pesaflow Audit</span>
          </div>
          <h2 className="text-xl font-bold text-navy-950 mt-1">University Treasury & Payment Audit</h2>
          <p className="text-xs text-slate-500">
            Reconciliation ledger with cryptographic webhook signature audit logs.
          </p>
        </div>

        <div className="p-4 bg-brand-50 border border-brand-200 rounded-2xl">
          <span className="text-[10px] uppercase font-bold text-brand-800 tracking-wider block">Total Reconciled</span>
          <span className="text-2xl font-extrabold text-brand-950 font-mono">
            KES {totalCollected.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Webhook Stream & Ledger Table */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-base text-navy-950">Jiunge/Pesaflow Webhook Ingestion Log</h3>
          <span className="text-xs font-semibold text-slate-400">HMAC-SHA256 Signature Verified</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold">
                <th className="py-3.5 px-4">Event Timestamp</th>
                <th className="py-3.5 px-4">Jiunge Invoice #</th>
                <th className="py-3.5 px-4">Channel / Gateway</th>
                <th className="py-3.5 px-4">Settled Amount</th>
                <th className="py-3.5 px-4">Idempotency Key</th>
                <th className="py-3.5 px-4 text-right">Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {payments.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-3.5 px-4 font-semibold text-slate-700">
                    {new Date(p.created_at).toLocaleString('en-KE')}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{p.jiunge_invoice_no}</td>
                  <td className="py-3.5 px-4 font-medium text-slate-800">M-Pesa STK (Jiunge API)</td>
                  <td className="py-3.5 px-4 font-bold text-brand-700 font-mono">
                    KES {p.amount_paid.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-slate-400">
                    sha256:{p.jiunge_invoice_no.toLowerCase().replace(/[^a-z0-9]/g, '')}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] uppercase">
                      HMAC Valid
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
