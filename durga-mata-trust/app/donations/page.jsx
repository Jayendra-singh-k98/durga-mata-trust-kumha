"use client";
import React, { useState } from 'react';
import {
  Heart, Smartphone, Building2, CreditCard,
  CheckCircle, AlertCircle, Shield, Gift, Sparkles,
  Users, Home, BookOpen, Loader2, MapPin, Clock, Mail, Phone
} from 'lucide-react';
import { submitDonation } from '@/api/donationsApi';
import PaymentModal from '@/components/PaymentModal';
import DonorsList from '@/components/DonorsList';

/* ─── Trust Details ────────────────────────────────────────── */
const TRUST = {
  name: 'Maa Durga Charitable Trust Kumha',
  nameHindi: 'माँ दुर्गा चैरिटेबल ट्रस्ट कूम्हां',
  deity: 'Maa Durga',
  deityHindi: 'माँ दुर्गा',
  regNo: '310 Jaipur, 2025',
  address: 'A-975, Siddharth Nagar, Jawahar Circle Ke Pas, Jaipur, Rajasthan',
  email: 'maadurgatrustkumha@gmail.com',
  phone: '+91 9413330548',
  officeHours: 'Mon–Fri, 9 AM – 5 PM',
  upiId: 'vyapar.176548150186@hdfcbank',
  accountHolder: 'MAA DURGA CHARITABLE TRUST KUMHA',
  accountNumber: '50200119336982',
  ifsc: 'HDFC0009692',
  bank: 'HDFC Bank',
  branch: 'Shree Gopal Nagar, Jaipur',
  accountType: 'Current Account',
};

/* ─── Static data ──────────────────────────────────────────── */
const PURPOSES = [
  { title: 'Daily Pooja & Rituals', description: 'Support daily worship ceremonies, abhishek, aarti, and sacred rituals of Maa Durga', icon: Sparkles, color: 'orange', examples: 'Flowers, incense, oil lamps, prasad materials' },
  { title: 'Festival Celebrations', description: 'Contribute to grand Navratri celebrations, Durga Puja, and other festival gatherings', icon: Gift, color: 'pink', examples: 'Navratri, Durga Puja, Diwali, Dussehra' },
  { title: 'Temple Maintenance', description: 'Help maintain the temple structure, cleanliness, electricity and infrastructure', icon: Home, color: 'blue', examples: 'Repairs, cleaning, utilities, renovation' },
  { title: 'Charitable Activities', description: 'Support annadaan, medical camps, education assistance, and social welfare programs', icon: Users, color: 'green', examples: 'Free meals, health camps, scholarships' },
  { title: 'Religious Education', description: 'Fund spiritual discourses, scripture classes, bhajan programs, and youth initiatives', icon: BookOpen, color: 'purple', examples: 'Katha, bhajan classes, workshops, camps' },
  { title: 'General Donation', description: 'Contribute to the overall functioning of Maa Durga Charitable Trust Kumha', icon: Heart, color: 'red', examples: 'Trust discretion for all activities' },
];

const QUICK_AMOUNTS = ['501', '1100', '2100', '5100', '11000', '21000'];

const COLOR_GRADIENT = { orange: 'from-orange-500 to-orange-600', pink: 'from-pink-500 to-pink-600', blue: 'from-blue-500 to-blue-600', green: 'from-green-500 to-green-600', purple: 'from-purple-500 to-purple-600', red: 'from-red-500 to-red-600' };
const COLOR_BORDER = { orange: 'border-orange-500', pink: 'border-pink-500', blue: 'border-blue-500', green: 'border-green-500', purple: 'border-purple-500', red: 'border-red-500' };

const FIELD_CLS = 'w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none transition';

/* ─── Component ────────────────────────────────────────────── */
export default function Donations() {
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', panNumber: '',
    purpose: '', message: '', displayName: true,
  });
  const [selectedAmount, setSelectedAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [selectedPurpose, setSelectedPurpose] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [donation, setDonation] = useState(null);
  const [paymentDone, setPaymentDone] = useState(null);

  const finalAmount = selectedAmount || customAmount;

  function validate() {
    const errs = {};
    if (!form.fullName.trim() || form.fullName.trim().length < 2) errs.fullName = 'Name must be at least 2 characters';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Valid email address required';
    if (!/^(\+91|0)?[6-9]\d{9}$/.test(form.phone.replace(/\s/g, ''))) errs.phone = 'Valid Indian phone number required';
    const purpose = form.purpose || selectedPurpose;
    if (!purpose) errs.purpose = 'Please select a donation purpose';
    const amt = parseInt(finalAmount);
    if (!finalAmount || isNaN(amt) || amt < 1) errs.amount = 'Minimum donation amount is ₹1';
    if (form.panNumber && !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(form.panNumber.toUpperCase())) errs.panNumber = 'Invalid PAN format (e.g. ABCDE1234F)';
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setServerError('');
    const errs = validate();
    setFieldErrors(errs);
    if (Object.keys(errs).length) return;

    setSubmitting(true);
    try {
      const payload = {
        ...form,
        purpose: form.purpose || selectedPurpose,
        panNumber: form.panNumber?.toUpperCase() || undefined,
        amount: parseInt(finalAmount),
      };
      const res = await submitDonation(payload);
      setDonation(res.data);
    } catch (err) {
      setServerError(err.message || 'Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  function handleField(e) {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
    if (fieldErrors[name]) setFieldErrors(fe => ({ ...fe, [name]: undefined }));
  }

  function syncPurpose(title) {
    setSelectedPurpose(title);
    setForm(f => ({ ...f, purpose: title }));
    if (fieldErrors.purpose) setFieldErrors(fe => ({ ...fe, purpose: undefined }));
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-orange-50 to-yellow-50">

      {/* Hero */}
      <section className="bg-linear-to-r from-orange-600 via-red-600 to-pink-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="text-6xl mb-4">🙏</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{TRUST.nameHindi}</h1>
          <p className="text-xl md:text-2xl font-semibold opacity-95 mb-2">{TRUST.name}</p>
          <p className="text-sm opacity-80 mb-4">Reg. No. {TRUST.regNo} | Rajasthan Public Trust Act 1959</p>
          <div className="w-24 h-1 bg-white/50 rounded-full mx-auto mb-4" />
          <p className="text-lg opacity-90">Your Contribution Enables Divine Service and Community Welfare</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12">

        {/* Why donate */}
        <section className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Your Donation Matters</h2>
            <div className="w-24 h-1 bg-orange-600 rounded-full mx-auto" />
          </div>
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p className="text-lg">
              <strong>{TRUST.name}</strong> ({TRUST.nameHindi}) is a registered public charitable trust
              under the Rajasthan Public Trust Act 1959, dedicated to the worship of Maa Durga,
              preservation of Hindu traditions, and serving the community. Founded on 26 March 2025
              and registered as No. {TRUST.regNo}, your generous donations sustain our sacred mission.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-linear-to-br from-orange-50 to-orange-100 p-6 rounded-xl border-l-4 border-orange-500">
                <Sparkles className="w-10 h-10 text-orange-600 mb-3" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">Religious Activities</h3>
                <p className="text-gray-700 text-sm">Daily poojas, Navratri celebrations, Durga Puja, and sacred ceremonies. Pooja-archana, vandana, yagna and anushthan as per Vedic traditions.</p>
              </div>
              <div className="bg-linear-to-br from-blue-50 to-blue-100 p-6 rounded-xl border-l-4 border-blue-500">
                <Home className="w-10 h-10 text-blue-600 mb-3" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">Temple Development</h3>
                <p className="text-gray-700 text-sm">Construction of the Maa Durga temple (Devsthan), murti sthapana, pran pratishtha and maintaining the sacred premises for all devotees.</p>
              </div>
              <div className="bg-linear-to-br from-green-50 to-green-100 p-6 rounded-xl border-l-4 border-green-500">
                <Users className="w-10 h-10 text-green-600 mb-3" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">Community Seva</h3>
                <p className="text-gray-700 text-sm">Annadaan, medical camps, education assistance, support for poor families, women empowerment, and social welfare programs for the needy.</p>
              </div>
            </div>
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <p className="text-gray-800">
                <strong>Note:</strong> {TRUST.name} is a registered public trust under Rajasthan Public Trust Act 1959 (Reg. No. {TRUST.regNo}).
                Please contact our office at <strong>{TRUST.email}</strong> or <strong>{TRUST.phone}</strong> for donation receipts and tax-related queries.
              </p>
            </div>
          </div>
        </section>

        {/* Purpose cards */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Choose Your Donation Purpose</h2>
            <div className="w-24 h-1 bg-orange-600 rounded-full mx-auto mb-4" />
            <p className="text-gray-700 text-lg">Select how you would like your contribution to serve Maa Durga and the community</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PURPOSES.map(p => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  onClick={() => syncPurpose(p.title)}
                  className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all cursor-pointer border-t-4 ${COLOR_BORDER[p.color]}
                    ${selectedPurpose === p.title ? 'ring-4 ring-offset-2 ring-orange-400' : ''}`}
                >
                  <div className={`w-14 h-14 bg-linear-to-r ${COLOR_GRADIENT[p.color]} rounded-full flex items-center justify-center mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{p.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 leading-relaxed">{p.description}</p>
                  {p.examples && <p className="text-xs text-gray-500 italic">Examples: {p.examples}</p>}
                </div>
              );
            })}
          </div>
          {fieldErrors.purpose && (
            <p className="text-red-500 text-sm text-center mt-3">{fieldErrors.purpose}</p>
          )}
        </section>

        {/* ─── Donation Form ─────────────────────── */}
        <section className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Donation Form</h2>
            <div className="w-24 h-1 bg-orange-600 rounded-full mx-auto mb-4" />
            <p className="text-gray-600">Fill in your details to make a donation to {TRUST.name}</p>
          </div>

          {serverError && (
            <div className="max-w-3xl mx-auto mb-6 bg-red-50 border-2 border-red-300 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
              <p className="text-red-700 text-sm">{serverError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-6" noValidate>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Full Name <span className="text-red-500">*</span></label>
                <input name="fullName" value={form.fullName} onChange={handleField} placeholder="Enter your full name" className={FIELD_CLS} />
                {fieldErrors.fullName && <p className="text-red-500 text-xs mt-1">{fieldErrors.fullName}</p>}
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Email Address <span className="text-red-500">*</span></label>
                <input name="email" type="email" value={form.email} onChange={handleField} placeholder="your.email@example.com" className={FIELD_CLS} />
                {fieldErrors.email && <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Phone Number <span className="text-red-500">*</span></label>
                <input name="phone" type="tel" value={form.phone} onChange={handleField} placeholder="+91 XXXXX XXXXX" className={FIELD_CLS} />
                {fieldErrors.phone && <p className="text-red-500 text-xs mt-1">{fieldErrors.phone}</p>}
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">PAN Number <span className="text-gray-500 text-sm">(Optional, for receipt)</span></label>
                <input name="panNumber" value={form.panNumber} onChange={handleField} placeholder="XXXXX0000X" className={FIELD_CLS} />
                {fieldErrors.panNumber && <p className="text-red-500 text-xs mt-1">{fieldErrors.panNumber}</p>}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Donation Purpose <span className="text-red-500">*</span></label>
              <select
                name="purpose"
                value={form.purpose || selectedPurpose}
                onChange={e => syncPurpose(e.target.value)}
                className={FIELD_CLS}
              >
                <option value="">Select donation purpose</option>
                {PURPOSES.map(p => <option key={p.title} value={p.title}>{p.title}</option>)}
              </select>
              {fieldErrors.purpose && <p className="text-red-500 text-xs mt-1">{fieldErrors.purpose}</p>}
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-3">Donation Amount <span className="text-red-500">*</span></label>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-4">
                {QUICK_AMOUNTS.map(a => (
                  <button
                    type="button" key={a}
                    onClick={() => { setSelectedAmount(a); setCustomAmount(''); if (fieldErrors.amount) setFieldErrors(fe => ({ ...fe, amount: undefined })); }}
                    className={`py-3 px-4 rounded-lg font-bold transition-all ${selectedAmount === a
                        ? 'bg-linear-to-r from-orange-500 to-red-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    ₹{a}
                  </button>
                ))}
              </div>
              <input
                type="number"
                placeholder="Or enter custom amount"
                value={customAmount}
                onChange={e => {
                  setCustomAmount(e.target.value);
                  setSelectedAmount('');
                  if (fieldErrors.amount) setFieldErrors(fe => ({ ...fe, amount: undefined }));
                }}
                className={FIELD_CLS}
              />
              {fieldErrors.amount && <p className="text-red-500 text-xs mt-1">{fieldErrors.amount}</p>}
              {finalAmount && !fieldErrors.amount && (
                <div className="mt-4 bg-green-50 border-2 border-green-500 rounded-lg p-4">
                  <p className="text-green-700 font-bold text-lg text-center">
                    Donation Amount: ₹{Number(finalAmount).toLocaleString('en-IN')}
                  </p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Message / Prayer Request <span className="text-gray-500 text-sm">(Optional)</span></label>
              <textarea
                name="message" value={form.message} onChange={handleField}
                placeholder="Share your message, prayer request, or dedication to Maa Durga…"
                rows={4} className={`${FIELD_CLS} resize-none`}
              />
            </div>

            <div className="pt-4">
              <button
                type="submit" disabled={submitting}
                className="w-full bg-linear-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600
                  disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-lg shadow-lg transition-all transform hover:scale-105 text-lg
                  flex items-center justify-center gap-3"
              >
                {submitting && <Loader2 className="w-5 h-5 animate-spin" />}
                {submitting ? 'Submitting…' : 'Proceed to Payment'}
              </button>
              <p className="text-center text-gray-500 text-sm mt-3">You will be redirected to secure payment gateway</p>
            </div>
          </form>
        </section>

        {/* Live Donors Section */}
        <DonorsList />

        {/* Payment Methods */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Donation Methods</h2>
            <div className="w-24 h-1 bg-orange-600 rounded-full mx-auto mb-4" />
            <p className="text-gray-700 text-lg">Multiple secure and convenient ways to contribute</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">

            {/* UPI */}
            <div className="bg-linear-to-br from-purple-50 to-purple-100 rounded-2xl shadow-xl p-8 border-t-4 border-purple-500">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-linear-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">UPI Payment</h3>
                <p className="text-gray-600 text-sm">Instant and secure</p>
              </div>
              <div className="bg-white rounded-lg p-6 mb-4 text-center">
                <div className="bg-white rounded-lg p-2 w-40 h-40 mx-auto mb-4 shadow">
                  <img
                    src="/scanner.jpeg"
                    alt="UPI QR Code - Maa Durga Charitable Trust Kumha"
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-xs text-gray-500 mb-1">UPI ID</p>
                <p className="text-sm font-bold text-purple-700 font-mono break-all">{TRUST.upiId}</p>
                <p className="text-xs text-gray-400 mt-2">PhonePe · GPay · Paytm · BHIM</p>
              </div>
              {['Instant confirmation', 'No transaction fees', 'Available 24/7'].map(t => (
                <p key={t} className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                  <CheckCircle className="w-4 h-4 text-green-600" />{t}
                </p>
              ))}
            </div>

            {/* Bank Transfer */}
            <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-2xl shadow-xl p-8 border-t-4 border-blue-500">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-linear-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Bank Transfer</h3>
                <p className="text-gray-600 text-sm">NEFT / RTGS / IMPS</p>
              </div>
              <div className="bg-white rounded-lg p-6 mb-4 space-y-3 text-sm">
                {[
                  ['Account Name', TRUST.accountHolder],
                  ['Account No.', TRUST.accountNumber],
                  ['IFSC Code', TRUST.ifsc],
                  ['Bank', TRUST.bank],
                  ['Branch', TRUST.branch],
                  ['Account Type', TRUST.accountType],
                ].map(([k, v]) => (
                  <div key={k} className="flex flex-col">
                    <p className="text-xs text-gray-500">{k}</p>
                    <p className="font-semibold text-gray-800 break-all">{v}</p>
                  </div>
                ))}
              </div>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3 rounded-r-lg text-xs text-gray-700">
                <strong>Important:</strong> After transfer, email transaction details to <strong>{TRUST.email}</strong> for receipt generation.
              </div>
            </div>

            {/* Online Gateway */}
            <div className="bg-linear-to-br from-green-50 to-green-100 rounded-2xl shadow-xl p-8 border-t-4 border-green-500">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-linear-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Online Payment</h3>
                <p className="text-gray-600 text-sm">Card, Netbanking, Wallet</p>
              </div>
              <div className="bg-white rounded-lg p-6 mb-4">
                <p className="text-sm text-gray-600 mb-4 text-center">Secure payment gateway supporting multiple options</p>
                {[[CreditCard, 'Credit/Debit Cards'], [Building2, 'Net Banking'], [Smartphone, 'Digital Wallets']].map(([Icon, label]) => (
                  <div key={label} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg mb-2">
                    <Icon className="w-6 h-6 text-green-600" />
                    <span className="text-gray-700 text-sm">{label}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                <Shield className="w-4 h-4" /> 256-bit SSL Encrypted
              </div>
            </div>
          </div>

          <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Other Donation Methods</h3>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              {[
                ['Cash / Cheque', 'Visit trust office during office hours'],
                ['Demand Draft', `Payable to "${TRUST.accountHolder}"`],
                ['Contact Us', `Call ${TRUST.phone} for assistance`],
              ].map(([title, desc]) => (
                <div key={title} className="p-4 bg-gray-50 rounded-lg">
                  <p className="font-semibold text-gray-800 mb-1">{title}</p>
                  <p className="text-sm text-gray-600">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Transparency */}
        <section className="bg-linear-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-2xl p-8 md:p-12 text-white mb-12">
          <div className="flex items-start gap-4">
            <Shield className="w-12 h-12 shrink-0 mt-1" />
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Commitment to Transparency</h2>
              <p className="text-lg mb-6 leading-relaxed">
                {TRUST.name} is registered under Rajasthan Public Trust Act 1959 (Reg. No. {TRUST.regNo}).
                We are committed to using every donation responsibly for the purposes of Maa Durga's worship and community welfare.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: 'Financial Transparency', points: ['All donations deposited in HDFC Bank account', 'Regular income-expenditure accounts maintained', 'Annual audit reports prepared', 'Compliance with Rajasthan Public Trust Act 1959'] },
                  { title: 'Donor Rights', points: ['Official receipt for all donations', 'Option to specify donation purpose', 'Name displayed only with your consent', 'Contact us anytime for fund utilisation details'] },
                ].map(({ title, points }) => (
                  <div key={title} className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                    <h3 className="font-bold mb-2 flex items-center gap-2"><CheckCircle className="w-5 h-5" />{title}</h3>
                    <ul className="space-y-1 text-sm opacity-90">{points.map(p => <li key={p}>• {p}</li>)}</ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="bg-orange-50 border-2 border-orange-300 rounded-2xl p-8 mb-12">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-10 h-10 text-orange-600 shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Important Disclaimer</h2>
              <div className="space-y-3 text-gray-700 text-sm leading-relaxed">
                <p><strong>1. No Refunds:</strong> All donations made to the trust are non-refundable. Please ensure your donation amount and purpose are correct before completing the transaction.</p>
                <p><strong>2. Receipt:</strong> Official donation receipts will be sent via email within 7 working days. For bank transfers, please email transaction details to {TRUST.email}.</p>
                <p><strong>3. Donation Utilisation:</strong> While we make every effort to use donations for the specified purpose, the trust reserves the right to allocate funds to other charitable objectives in accordance with the trust deed.</p>
                <p><strong>4. Personal Information:</strong> Donor information is kept confidential and will not be shared with third parties. We may contact donors for donation-related communication only.</p>
                <p><strong>5. Payment Charges:</strong> For online payments, minimal processing charges may be deducted by the payment gateway provider as per their terms.</p>
                <p><strong>6. Registration:</strong> This trust is registered under Rajasthan Public Trust Act 1959, Reg. No. {TRUST.regNo}, vide order dated 03/10/2025.</p>
                <p className="mt-4 pt-4 border-t border-orange-300">By making a donation, you acknowledge that you have read and agree to these terms. For any queries, please contact our office.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Thank you + Contact */}
        <section className="bg-linear-to-r from-pink-600 via-orange-600 to-yellow-600 rounded-2xl shadow-2xl p-8 md:p-12 text-white text-center">
          <div className="text-6xl mb-4">🙏</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Thank You for Your Generosity</h2>
          <div className="max-w-3xl mx-auto space-y-6 text-lg leading-relaxed">
            <p>Your selfless act of giving embodies the spirit of seva and dharma. Every contribution, big or small, helps sustain Maa Durga's worship and enables us to serve the community with love and devotion.</p>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
              <p className="text-2xl font-light italic mb-2">"दानं परमं तपः"</p>
              <p className="text-lg">Charity is the highest form of penance</p>
              <p className="text-base opacity-80 mt-2">— माँ दुर्गा आपको सदा आशीर्वाद दें</p>
            </div>
            <p className="text-xl font-semibold">With heartfelt gratitude and Maa's blessings,<br />{TRUST.name}</p>
          </div>

          <div className="mt-10 pt-8 border-t border-white/30">
            <p className="text-sm opacity-80 mb-6">For donation queries, receipts, or any assistance</p>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { icon: Mail, label: 'Email', value: TRUST.email },
                { icon: Phone, label: 'Phone', value: TRUST.phone },
                { icon: Clock, label: 'Office Hours', value: TRUST.officeHours },
                { icon: MapPin, label: 'Address', value: 'A-975, Siddharth Nagar, Jaipur' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="bg-white/20 backdrop-blur-sm px-5 py-3 rounded-lg text-left min-w-180">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className="w-4 h-4 opacity-80" />
                    <p className="text-xs opacity-80">{label}</p>
                  </div>
                  <p className="font-semibold text-sm break-all">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>

      {/* Payment Modal */}
      {donation && !paymentDone && (
        <PaymentModal
          donation={donation}
          trustName={TRUST.name}
          upiId={TRUST.upiId}
          onClose={() => setDonation(null)}
          onSuccess={result => {
            setPaymentDone(result);
            setDonation(null);
          }}
        />
      )}

      {/* Success Toast */}
      {paymentDone && (
        <div className="fixed bottom-6 right-6 z-50 bg-green-600 text-white px-6 py-4 rounded-2xl shadow-2xl max-w-sm">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-8 h-8 shrink-0" />
            <div>
              <p className="font-bold">Jai Maa Durga! 🙏</p>
              <p className="text-sm opacity-90">Your donation has been received. Receipt will be emailed shortly.</p>
            </div>
            <button onClick={() => setPaymentDone(null)} className="ml-2 text-white/70 hover:text-white text-lg">✕</button>
          </div>
        </div>
      )}
    </div>
  );
}