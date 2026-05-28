// api/donationsApi.js
// Centralised API client for the Temple Donations backend.
// Base URL reads from Vite env var; falls back to localhost:5000 for dev.

const BASE = import.meta?.env?.VITE_API_URL ?? 'http://localhost:5000/api';

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw { status: res.status, message: data.error || 'Request failed', details: data.details };
  return data;
}

/* ─── Donations ────────────────────────────────────────────── */

/** Submit a new donation form. Returns { donationId, id, amount, purpose, status }. */
export async function submitDonation(payload) {
  return request('/donations', { method: 'POST', body: JSON.stringify(payload) });
}

/** Get a single donation by id or donationId (public-safe fields). */
export async function getDonation(id) {
  return request(`/donations/${id}`);
}

/** List all donations (admin). Supports { page, limit, status, purpose } filters. */
export async function listDonations(params = {}) {
  const q = new URLSearchParams(params).toString();
  return request(`/donations${q ? `?${q}` : ''}`);
}

/** Update donation status (admin / post-payment callback). */
export async function updateDonationStatus(id, { status, paymentId, paymentMethod }) {
  return request(`/donations/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status, paymentId, paymentMethod }),
  });
}

/* ─── Donors ───────────────────────────────────────────────── */

/** Public donors list. Supports { category, purpose, page, limit }. */
export async function listDonors(params = {}) {
  const q = new URLSearchParams(params).toString();
  return request(`/donors${q ? `?${q}` : ''}`);
}

/**
 * Donors grouped by category.
 * Returns { maha_daan, ati_uttam_daan, uttam_daan, recent } each with { label, subtitle, icon, donors[] }.
 */
export async function getDonorCategories() {
  return request('/donors/categories');
}

/** Recent donors feed. limit defaults to 10. */
export async function getRecentDonors(limit = 10) {
  return request(`/donors/recent?limit=${limit}`);
}

/* ─── Payments ─────────────────────────────────────────────── */

/** Initiate a payment session. method: 'upi' | 'card' | 'netbanking' | 'wallet'. */
export async function initiatePayment(donationId, method) {
  return request('/payments/initiate', {
    method: 'POST',
    body: JSON.stringify({ donationId, method }),
  });
}

/**
 * Verify a payment after gateway callback.
 * Pass the sessionId and transactionId returned by the gateway.
 */
export async function verifyPayment({ sessionId, donationId, transactionId, status }) {
  return request('/payments/verify', {
    method: 'POST',
    body: JSON.stringify({ sessionId, donationId, transactionId, status }),
  });
}

/**
 * Simulate a payment (dev / demo only).
 * outcome: 'success' | 'failure'
 * Returns receipt on success.
 */
export async function simulatePayment(donationId, outcome = 'success') {
  return request('/payments/simulate', {
    method: 'POST',
    body: JSON.stringify({ donationId, outcome }),
  });
}

/* ─── Admin ────────────────────────────────────────────────── */

/** Dashboard statistics. */
export async function getAdminStats() {
  return request('/admin/stats');
}

/** Admin: full paginated donation list. Supports { status, page, limit, search }. */
export async function adminListDonations(params = {}) {
  const q = new URLSearchParams(params).toString();
  return request(`/admin/donations${q ? `?${q}` : ''}`);
}

/** Admin: update any field on a donation. */
export async function adminUpdateDonation(id, patch) {
  return request(`/admin/donations/${id}`, { method: 'PATCH', body: JSON.stringify(patch) });
}

/** Admin: remove donor from public list. */
export async function adminDeleteDonor(id) {
  return request(`/admin/donors/${id}`, { method: 'DELETE' });
}

/** Admin: get temple settings. */
export async function getSettings() {
  return request('/admin/settings');
}

/** Admin: update temple settings. */
export async function updateSettings(patch) {
  return request('/admin/settings', { method: 'PATCH', body: JSON.stringify(patch) });
}

/* ─── Health ───────────────────────────────────────────────── */
export async function healthCheck() {
  return request('/health');
}