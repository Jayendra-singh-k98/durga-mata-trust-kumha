"use client";
import React, { useState } from 'react';
import { X, Smartphone, CreditCard, Building2, Wallet, CheckCircle, XCircle, Loader2, Shield, Copy, Check } from 'lucide-react';
import { initiatePayment, verifyPayment } from '@/api/donationsApi';

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

  function loadRazorpay() {
    return new Promise((resolve) => {
      // if (window.Razorpay) return resolve(true);
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }

  // Main pay flow: create a real order on our server, open Razorpay Checkout,
  // then verify the signature on our server before treating it as paid.
  async function handlePay() {
    setStep('processing');
    try {
      const initRes = await initiatePayment(donationId, method);
      
      const { sessionId, gateway } = initRes.data;

      const loaded = await loadRazorpay();
      if (!loaded) {
        setResult({ ok: false, error: 'Payment gateway failed to load. Please check your connection and try again.' });
        setStep('result');
        return;
      }

      const razorpayKey = gateway.keyId || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
      
      if (!razorpayKey) {
        throw new Error('Razorpay public key is not configured.');
      }

      const options = {
        key: razorpayKey,
        amount: gateway.amount,
        currency: gateway.currency,
        order_id: gateway.orderId,
        name: TRUST_NAME,
        description: purpose,
        prefill: { method }, // preselects the matching tab inside Razorpay's own UI
        theme: { color: '#f97316' },
        handler: async function (response) {
          try {
            const verifyRes = await verifyPayment({
              sessionId,
              donationId,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            setResult({ ok: true, ...verifyRes.data });
          } catch (err) {
            setResult({ ok: false, error: err.message || 'Payment could not be verified. Please contact us with your payment ID.' });
          }
          setStep('result');
        },
        modal: {
          // Fires if the user closes the Razorpay modal without paying
          ondismiss: function () {
            setResult({ ok: false, error: 'Payment was cancelled.' });
            setStep('result');
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on('payment.failed', function (response) {
        setResult({ ok: false, error: response.error?.description || 'Payment failed. Please try again.' });
        setStep('result');
      });
      razorpay.open();
    } catch (err) {
      setResult({ ok: false, error: err.message || 'Could not start payment. Please try again.' });
      setStep('result');
    }
  }

  function copyUPI() {
    navigator.clipboard?.writeText(TRUST_UPI);
    setCopied(true);
    setTimeout(() => setCopied(false), 5000);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative max-w-md max-h-[95vh] bg-white rounded-2xl shadow-2xl w-full overflow-y-auto scrollbar-hide">

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

            {/* UPI detail — manual/backup option shown alongside Checkout */}
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
                <p className="text-xs text-gray-400 mt-2">Or tap "Pay" below to pay securely via Razorpay</p>
              </div>
            )}

            {/* Card / net banking / wallet: actual entry happens inside Razorpay Checkout */}
            {method === 'card' && (
              <div className="text-xs text-gray-500 text-center bg-gray-50 rounded-lg p-3">
                You'll enter your card details securely on Razorpay's own payment screen.
              </div>
            )}

            {method === 'netbanking' && (
              <div className="text-xs text-gray-500 text-center bg-gray-50 rounded-lg p-3">
                You'll pick your bank and log in securely on Razorpay's own payment screen.
              </div>
            )}

            {method === 'wallet' && (
              <div className="text-xs text-gray-500 text-center bg-gray-50 rounded-lg p-3">
                You'll pick your wallet and authenticate securely on Razorpay's own payment screen.
              </div>
            )}

            <div className="flex items-center gap-1 justify-center text-xs text-gray-400">
              <Shield className="w-3 h-3" /> 256-bit SSL Encrypted · Secure Payment
            </div>

            {/* Action button */}
            <div className="pt-2">
              <button
                onClick={handlePay}
                className="w-full py-3 rounded-lg bg-linear-to-r from-orange-500 to-red-500 text-white font-bold shadow hover:from-orange-600 hover:to-red-600 transition text-sm"
              >
                Pay ₹{Number(amount).toLocaleString('en-IN')}
              </button>
            </div>
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