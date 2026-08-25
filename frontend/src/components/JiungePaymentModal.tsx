import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import {
  CreditCard,
  Phone,
  CheckCircle2,
  AlertCircle,
  Loader2,
  X,
  ShieldCheck,
  Smartphone,
  Receipt,
  Download,
} from 'lucide-react';

interface JiungePaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  defaultAmount?: number;
  description?: string;
}

export const JiungePaymentModal: React.FC<JiungePaymentModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  defaultAmount = 5000,
  description = 'Tuition / Accommodation Fee Payment',
}) => {
  const [amount, setAmount] = useState<number>(defaultAmount);
  const [phoneNumber, setPhoneNumber] = useState<string>('254712345678');
  const [customDesc, setCustomDesc] = useState<string>(description);
  const [step, setStep] = useState<'form' | 'stk_prompt' | 'simulating_pin' | 'success'>('form');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [jiungeInvoiceNo, setJiungeInvoiceNo] = useState<string>('');
  const [pinCountdown, setPinCountdown] = useState(6);

  useEffect(() => {
    if (isOpen) {
      setAmount(defaultAmount);
      setCustomDesc(description);
      setStep('form');
      setError(null);
    }
  }, [isOpen, defaultAmount, description]);

  if (!isOpen) return null;

  const handleInitiatePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || amount <= 0) {
      setError('Please enter a valid payment amount.');
      return;
    }
    if (!phoneNumber || !/^254\d{9}$/.test(phoneNumber)) {
      setError('Please provide a valid Kenyan phone number in 254XXXXXXXXX format.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 1. Call Jiunge initiation endpoint
      const res = await api.initiateJiungePayment({
        amount,
        description: customDesc,
        phoneNumber,
      });

      setJiungeInvoiceNo(res.jiungeInvoiceNo);
      setStep('stk_prompt');
      setLoading(false);

      // Start STK prompt animation
      let count = 5;
      const interval = setInterval(() => {
        count -= 1;
        setPinCountdown(count);
        if (count <= 2 && step !== 'simulating_pin') {
          setStep('simulating_pin');
        }
        if (count <= 0) {
          clearInterval(interval);
          completePayment(res.jiungeInvoiceNo, amount);
        }
      }, 1000);
    } catch (err: any) {
      setError(err.message || 'Failed to communicate with Jiunge Gateway.');
      setLoading(false);
    }
  };

  const completePayment = async (invNo: string, paidAmount: number) => {
    try {
      // 2. Simulate Webhook callback execution on server
      await api.confirmJiungeWebhook(invNo, paidAmount);
      setStep('success');
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Error settling payment transaction.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-700 via-brand-800 to-navy-900 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/10 rounded-xl">
              <CreditCard className="w-6 h-6 text-brand-300" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">Jiunge / Pesaflow Gateway</h3>
              <p className="text-xs text-brand-200">University of Upper Hill Payment Portal</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-300 hover:text-white rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {step === 'form' && (
            <form onSubmit={handleInitiatePayment} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Payment Purpose / Description
                </label>
                <input
                  type="text"
                  value={customDesc}
                  onChange={(e) => setCustomDesc(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Amount (KES)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">KES</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    min="100"
                    step="100"
                    className="w-full pl-12 pr-3 py-2 text-sm font-semibold border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  M-Pesa Phone Number (Safcom)
                </label>
                <div className="relative">
                  <Smartphone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="254712345678"
                    className="w-full pl-10 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none font-mono"
                    required
                  />
                </div>
                <span className="text-[10px] text-slate-500 mt-1 block">
                  Format: 254XXXXXXXXX (An STK prompt will appear on this handset)
                </span>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold text-sm shadow-md hover:shadow-brand-500/20 transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Contacting Jiunge Gateway...
                    </>
                  ) : (
                    <>
                      <span>Pay KES {amount.toLocaleString()} via M-Pesa</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
                <span>Encrypted 256-bit SSL • Instant Idempotent Clearance</span>
              </div>
            </form>
          )}

          {(step === 'stk_prompt' || step === 'simulating_pin') && (
            <div className="text-center py-6 space-y-4">
              <div className="relative w-20 h-20 mx-auto">
                <div className="absolute inset-0 rounded-full border-4 border-brand-200 animate-ping"></div>
                <div className="relative w-20 h-20 bg-brand-50 rounded-full flex items-center justify-center border-2 border-brand-500 text-brand-600">
                  <Smartphone className="w-10 h-10 animate-bounce" />
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 text-base">M-Pesa STK Push Sent!</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1">
                  Please check phone <span className="font-bold text-slate-800">{phoneNumber}</span> and enter your M-Pesa Secret PIN to authorize KES {amount.toLocaleString()}.
                </p>
              </div>

              {/* Simulated Phone Alert Box */}
              <div className="p-4 bg-slate-900 text-white rounded-xl shadow-inner text-left font-mono text-xs border border-slate-700 max-w-xs mx-auto animate-pulse">
                <div className="flex items-center justify-between text-[10px] text-brand-400 mb-1">
                  <span>M-PESA NOTICE</span>
                  <span>JIUNGE/PESAFLOW</span>
                </div>
                <p className="text-slate-200">
                  Do you want to pay KES {amount.toLocaleString()} to University of Upper Hill Acc #{jiungeInvoiceNo}?
                </p>
                <div className="mt-2 text-center text-xs text-amber-300 font-bold">
                  {step === 'simulating_pin' ? '*** PIN Entered. Authorizing...' : `Waiting for PIN (${pinCountdown}s)...`}
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-brand-600" />
                <span>Awaiting webhook confirmation from Jiunge Gateway</span>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center text-brand-600 mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-lg">Payment Cleared Successfully!</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Your transaction has been settled and credited to your fee ledger.
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Invoice Number:</span>
                  <span className="font-bold text-slate-800 font-mono">{jiungeInvoiceNo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Amount Paid:</span>
                  <span className="font-bold text-brand-700">KES {amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Gateway:</span>
                  <span className="font-semibold text-slate-800">Jiunge / Pesaflow (M-Pesa)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Timestamp:</span>
                  <span className="text-slate-700">{new Date().toLocaleString()}</span>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => {
                    window.print();
                  }}
                  className="flex-1 py-2.5 px-3 border border-slate-300 hover:bg-slate-100 rounded-xl text-xs font-bold text-slate-700 transition flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  Print Receipt
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 px-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow transition"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
