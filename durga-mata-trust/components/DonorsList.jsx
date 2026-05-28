"use client";
import React, { useEffect, useState } from 'react';
import { Users, RefreshCw, TrendingUp } from 'lucide-react';
import { listDonors } from '@/api/donationsApi';

const TRUST_DEITY = 'Maa Durga';

function fmt(amount) {
  return `₹${Number(amount).toLocaleString('en-IN')}`;
}

function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const d = Math.floor(diff / 86400000);
  if (d === 0) return 'Today';
  if (d === 1) return 'Yesterday';
  if (d < 30)  return `${d} days ago`;
  const m = Math.floor(d / 30);
  if (m < 12)  return `${m} month${m > 1 ? 's' : ''} ago`;
  return `${Math.floor(m / 12)} year${Math.floor(m / 12) > 1 ? 's' : ''} ago`;
}

// Medal for top 3
function Medal({ rank }) {
  if (rank === 1) return <span className="text-lg">🥇</span>;
  if (rank === 2) return <span className="text-lg">🥈</span>;
  if (rank === 3) return <span className="text-lg">🥉</span>;
  return (
    <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-700 text-xs font-bold flex items-center justify-center shrink-0">
      {rank}
    </span>
  );
}

export default function DonorsList() {
  const [donors, setDonors]   = useState([]);
  const [stats, setStats]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await listDonors({ limit: 100 });
      // Sort by amount desc, take top 30
      const sorted = [...res.data]
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 30);
      setDonors(sorted);
      setStats(res.stats);
    } catch (e) {
      setError(e.message || 'Failed to load donors. Please check if backend is running.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  // Split 30 donors into 3 columns of 10
  const col1 = donors.slice(0, 10);   // rank 1–10
  const col2 = donors.slice(10, 20);  // rank 11–20
  const col3 = donors.slice(20, 30);  // rank 21–30

  /* ── Loading ── */
  if (loading) return (
    <section className="bg-linear-to-br from-yellow-50 to-orange-50 rounded-2xl shadow-xl p-12 mb-12 border-2 border-orange-200 text-center">
      <RefreshCw className="w-10 h-10 text-orange-500 animate-spin mx-auto mb-4" />
      <p className="text-gray-500">Loading our generous donors…</p>
    </section>
  );

  /* ── Error ── */
  if (error) return (
    <section className="bg-linear-to-br from-yellow-50 to-orange-50 rounded-2xl shadow-xl p-12 mb-12 border-2 border-orange-200 text-center">
      <p className="text-red-500 mb-4 font-medium">{error}</p>
      <button
        onClick={load}
        className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition font-semibold"
      >
        Retry
      </button>
    </section>
  );

  return (
    <section className="bg-linear-to-br from-yellow-50 to-orange-50 rounded-2xl shadow-xl p-8 md:p-12 mb-12 border-2 border-orange-200">

      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-linear-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Users className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-4xl font-bold text-gray-800 mb-2">Our Generous Donors</h2>
        <p className="text-orange-600 font-medium mb-2">हमारे उदार दानदाता</p>
        <div className="w-24 h-1 bg-orange-600 rounded-full mx-auto mb-4" />
        <p className="text-gray-700 text-lg">
          We are grateful to the following devotees for their generous contributions to {TRUST_DEITY} Trust
        </p>
      </div>

      {/* Stats bar */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Donors',   value: stats.total.toLocaleString('en-IN'),                     icon: '🙏' },
            { label: 'Total Raised',   value: `₹${Number(stats.totalAmount).toLocaleString('en-IN')}`, icon: '💰' },
            { label: 'Maha Daan',      value: stats.maha_daan,                                          icon: '🏆' },
            { label: 'Top Donors',     value: Math.min(donors.length, 30),                              icon: '⭐' },
          ].map(({ label, value, icon }) => (
            <div key={label} className="bg-white rounded-xl p-4 text-center shadow">
              <div className="text-2xl mb-1">{icon}</div>
              <p className="text-xl font-black text-orange-600">{value}</p>
              <p className="text-xs text-gray-500 mt-1">{label}</p>
            </div>
          ))}
        </div>
      )}

      {/* No donors yet */}
      {donors.length === 0 && (
        <div className="bg-white rounded-xl p-10 shadow-lg text-center">
          <div className="text-5xl mb-4">🙏</div>
          <h3 className="text-xl font-bold text-gray-700 mb-2">Be Our First Donor!</h3>
          <p className="text-gray-500">
            Your contribution will be the first step in building Maa Durga's sacred temple.
            Every rupee matters.
          </p>
        </div>
      )}

      {/* 3-column donor list — top 30 */}
      {donors.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">

          {/* Table header */}
          <div className="bg-linear-to-r from-orange-500 to-red-500 px-6 py-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-white" />
            <h3 className="text-xl font-bold text-white">
              Top {Math.min(donors.length, 30)} Donors
            </h3>
            <span className="ml-auto text-white/80 text-sm">Ranked by contribution</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-orange-100">

            {/* Column 1 — Rank 1–10 */}
            <div>
              <div className="bg-orange-50 px-4 py-2 border-b border-orange-100">
                <p className="text-xs font-bold text-orange-600 uppercase tracking-wide text-center">
                  Rank 1 – 10
                </p>
              </div>
              <div className="divide-y divide-gray-50">
                {col1.map((d, i) => (
                  <DonorRow key={d.id || i} donor={d} rank={i + 1} />
                ))}
                {/* Fill empty rows so columns are equal height */}
                {Array.from({ length: 10 - col1.length }).map((_, i) => (
                  <EmptyRow key={`e1-${i}`} />
                ))}
              </div>
            </div>

            {/* Column 2 — Rank 11–20 */}
            <div>
              <div className="bg-orange-50 px-4 py-2 border-b border-orange-100">
                <p className="text-xs font-bold text-orange-600 uppercase tracking-wide text-center">
                  Rank 11 – 20
                </p>
              </div>
              <div className="divide-y divide-gray-50">
                {col2.map((d, i) => (
                  <DonorRow key={d.id || i} donor={d} rank={i + 11} />
                ))}
                {Array.from({ length: 10 - col2.length }).map((_, i) => (
                  <EmptyRow key={`e2-${i}`} />
                ))}
              </div>
            </div>

            {/* Column 3 — Rank 21–30 */}
            <div>
              <div className="bg-orange-50 px-4 py-2 border-b border-orange-100">
                <p className="text-xs font-bold text-orange-600 uppercase tracking-wide text-center">
                  Rank 21 – 30
                </p>
              </div>
              <div className="divide-y divide-gray-50">
                {col3.map((d, i) => (
                  <DonorRow key={d.id || i} donor={d} rank={i + 21} />
                ))}
                {Array.from({ length: 10 - col3.length }).map((_, i) => (
                  <EmptyRow key={`e3-${i}`} />
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Footer */}
      <div className="text-center">
        <p className="text-gray-800 text-lg italic mb-2">
          "हर दान, चाहे छोटा हो या बड़ा, माँ की सेवा का हिस्सा है"
        </p>
        <p className="text-gray-500 text-sm">Every contribution, big or small, helps sustain our sacred mission</p>
        <p className="text-orange-600 font-semibold mt-2">
          May {TRUST_DEITY} bless all our donors with health, prosperity and happiness 🙏
        </p>
      </div>

    </section>
  );
}

/* ── Single donor row ── */
function DonorRow({ donor, rank }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50 transition-colors">
      <Medal rank={rank} />
      <div className="flex-1 min-w-0">
        <p className="text-gray-800 text-sm font-semibold truncate">{donor.name}</p>
        <p className="text-gray-400 text-xs truncate">{donor.purpose}</p>
      </div>
      <div className="text-right shrink-0">
        <p className="text-orange-600 font-bold text-sm">{fmt(donor.amount)}</p>
        <p className="text-gray-400 text-xs">{timeAgo(donor.createdAt)}</p>
      </div>
    </div>
  );
}

/* ── Empty filler row to keep columns even ── */
function EmptyRow() {
  return (
    <div className="flex items-center gap-3 px-4 py-3 opacity-0 select-none pointer-events-none">
      <span className="w-6 h-6" />
      <div className="flex-1"><p className="text-sm">–</p></div>
    </div>
  );
}