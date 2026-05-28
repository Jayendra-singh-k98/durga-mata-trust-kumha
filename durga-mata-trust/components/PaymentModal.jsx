"use client";
import React, { useState } from 'react';
import {
  X, Smartphone, CreditCard, Building2, Wallet,
  CheckCircle, XCircle, Loader2, Shield, Copy, Check
} from 'lucide-react';
import { initiatePayment, simulatePayment } from '@/api/donationsApi';

const TRUST_UPI = 'vyapar.176548150186@hdfcbank';
const TRUST_NAME = 'Maa Durga Charitable Trust Kumha';

const METHODS = [
  { id: 'upi', label: 'UPI', Icon: Smartphone, desc: 'PhonePe · GPay · Paytm' },
  { id: 'card', label: 'Card', Icon: CreditCard, desc: 'Debit / Credit Card' },
  { id: 'netbanking', label: 'Net Banking', Icon: Building2, desc: 'All major banks' },
  { id: 'wallet', label: 'Wallet', Icon: Wallet, desc: 'Paytm · Amazon Pay' },
];

export default function PaymentModal({ donation, onClose, onSuccess }) {
  const [method, setMethod] = useState('upi');
  const [step, setStep] = useState('select');   // select → processing → result
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const { donationId, amount, purpose } = donation;

  async function handlePay(outcome = 'success') {
    setStep('processing');
    try {
      await initiatePayment(donationId, method);
      const res = await simulatePayment(donationId, outcome);
      setResult({ ok: outcome === 'success', ...res.data });
    } catch (err) {
      setResult({ ok: false, error: err.message || 'Payment failed. Please try again.' });
    }
    setStep('result');
  }

  function copyUPI() {
    navigator.clipboard?.writeText(TRUST_UPI);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">

        {/* Header */}
        <div className="bg-linear-to-r from-orange-500 to-red-500 p-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
          <p className="text-xs opacity-80 mb-1 uppercase tracking-wide">{TRUST_NAME}</p>
          <p className="text-sm opacity-90 mb-1">Donating towards</p>
          <h2 className="text-xl font-bold">{purpose}</h2>
          <p className="text-3xl font-black mt-1">
            ₹{Number(amount).toLocaleString('en-IN')}
          </p>
        </div>

        {/* ── Step: Select method ── */}
        {step === 'select' && (
          <div className="p-6 space-y-4">
            <p className="text-gray-600 text-sm font-medium">Choose payment method</p>

            <div className="grid grid-cols-2 gap-3">
              {METHODS.map(({ id, label, Icon, desc }) => (
                <button
                  key={id}
                  onClick={() => setMethod(id)}
                  className={`flex flex-col items-center gap-1 p-4 rounded-xl border-2 transition-all text-center
                    ${method === id
                      ? 'border-orange-500 bg-orange-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300'}`}
                >
                  <Icon className={`w-6 h-6 ${method === id ? 'text-orange-600' : 'text-gray-500'}`} />
                  <span className={`font-semibold text-sm ${method === id ? 'text-orange-700' : 'text-gray-700'}`}>
                    {label}
                  </span>
                  <span className="text-xs text-gray-400">{desc}</span>
                </button>
              ))}
            </div>

            {/* UPI detail */}
            {method === 'upi' && (
              <div className="bg-purple-50 rounded-xl p-4 text-center">
                <div className="bg-white rounded-lg p-2 w-40 h-40 mx-auto mb-3 shadow">
                  <img
                    src="/scanner.jpeg"
                    alt="UPI QR Code - Maa Durga Charitable Trust Kumha"
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-xs text-gray-500 mb-1">UPI ID</p>
                <div className="flex items-center justify-center gap-2">
                  <p className="font-mono font-bold text-purple-700 text-sm break-all">
                    {TRUST_UPI}
                  </p>
                  <button onClick={copyUPI} className="text-gray-400 hover:text-purple-600 transition shrink-0">
                    {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-1">PhonePe · GPay · Paytm · BHIM</p>
              </div>
            )}

            {/* Card form stub */}
            {method === 'card' && (
              <div className="space-y-3">
                <input
                  placeholder="Card number"
                  maxLength={19}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-400 outline-none text-sm"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input placeholder="MM / YY" className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-400 outline-none text-sm" />
                  <input placeholder="CVV" type="password" maxLength={4} className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-400 outline-none text-sm" />
                </div>
                <input placeholder="Name on card" className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-400 outline-none text-sm" />
              </div>
            )}

            {/* Net banking stub */}
            {method === 'netbanking' && (
              <div>
                <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-400 outline-none text-sm text-gray-700">
                  <option value="">Select your bank</option>
                  {['HDFC Bank', 'SBI', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra Bank', 'Punjab National Bank', 'Bank of Baroda', 'Canara Bank'].map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Wallet stub */}
            {method === 'wallet' && (
              <div className="grid grid-cols-3 gap-3">
                {['Paytm', 'Amazon Pay', 'Mobikwik'].map(w => (
                  <div key={w} className="border-2 border-gray-200 rounded-lg p-3 text-center text-sm text-gray-600 cursor-pointer hover:border-orange-400 hover:bg-orange-50 transition">
                    {w}
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center gap-1 justify-center text-xs text-gray-400">
              <Shield className="w-3 h-3" /> 256-bit SSL Encrypted · Secure Payment
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => handlePay('failure')}
                className="py-2 rounded-lg border-2 border-red-300 text-red-600 text-sm font-semibold hover:bg-red-50 transition"
              >
                Simulate Failure
              </button>
              <button
                onClick={() => handlePay('success')}
                className="py-3 rounded-lg bg-linear-to-r from-orange-500 to-red-500 text-white font-bold shadow hover:from-orange-600 hover:to-red-600 transition text-sm"
              >
                Pay ₹{Number(amount).toLocaleString('en-IN')}
              </button>
            </div>
            <p className="text-center text-xs text-gray-400 italic">
              Demo mode — use "Simulate Failure" or "Pay" to test both flows
            </p>
          </div>
        )}

        {/* ── Step: Processing ── */}
        {step === 'processing' && (
          <div className="p-12 flex flex-col items-center gap-4">
            <Loader2 className="w-14 h-14 text-orange-500 animate-spin" />
            <p className="text-gray-700 font-semibold text-lg">Processing payment…</p>
            <p className="text-gray-400 text-sm">Please do not close this window</p>
            <p className="text-xs text-gray-400 italic">Jai Maa Durga 🙏</p>
          </div>
        )}

        {/* ── Step: Result ── */}
        {step === 'result' && result && (
          <div className="p-6 space-y-4">
            {result.ok ? (
              <>
                <div className="flex flex-col items-center gap-2 py-4">
                  <CheckCircle className="w-16 h-16 text-green-500" />
                  <h3 className="text-2xl font-bold text-gray-800">Payment Successful!</h3>
                  <p className="text-gray-500 text-sm text-center">
                    Maa Durga bless you for your generous contribution 🙏
                  </p>
                </div>

                {result.receipt && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 space-y-2 text-sm">
                    <p className="font-bold text-green-700 text-center text-base mb-3">
                      {TRUST_NAME}
                    </p>
                    {[
                      ['Receipt No.', result.receipt.receiptNumber],
                      ['Amount', `₹${Number(result.receipt.amount).toLocaleString('en-IN')}`],
                      ['Donor Name', result.receipt.name],
                      ['Purpose', result.receipt.purpose],
                      ['Date', result.receipt.date],
                      ['Transaction ID', result.receipt.transactionId],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between gap-2">
                        <span className="text-gray-500 shrink-0">{k}</span>
                        <span className="font-semibold text-gray-800 text-right text-xs break-all">{v}</span>
                      </div>
                    ))}
                    <p className="text-xs text-orange-600 pt-2 border-t border-green-200">
                      {result.receipt.note80G}
                    </p>
                  </div>
                )}

                <button
                  onClick={() => onSuccess(result)}
                  className="w-full bg-linear-to-r from-green-500 to-green-600 text-white font-bold py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition"
                >
                  Done — Jai Maa Durga! 🙏
                </button>
              </>
            ) : (
              <>
                <div className="flex flex-col items-center gap-2 py-4">
                  <XCircle className="w-16 h-16 text-red-500" />
                  <h3 className="text-2xl font-bold text-gray-800">Payment Failed</h3>
                  <p className="text-gray-500 text-sm text-center">
                    {result.error || 'Something went wrong. Please try again.'}
                  </p>
                </div>
                <div className="bg-orange-50 rounded-lg p-3 text-sm text-gray-600 text-center">
                  <p>You can also pay directly via UPI:</p>
                  <p className="font-mono font-bold text-orange-700 mt-1 break-all">{TRUST_UPI}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={onClose}
                    className="py-3 rounded-xl border-2 border-gray-300 text-gray-600 font-semibold hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setStep('select')}
                    className="py-3 rounded-xl bg-linear-to-r from-orange-500 to-red-500 text-white font-bold hover:from-orange-600 hover:to-red-600 transition"
                  >
                    Try Again
                  </button>
                </div>
              </>
            )}
          </div>
        )}

      </div>
    </div>
  );
}