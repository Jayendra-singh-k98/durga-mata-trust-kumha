import { Router } from 'express';
import { getDB } from '../db/database.js';

const router = Router();

// GET /api/admin/stats — Dashboard statistics
router.get('/stats', async (req, res) => {
  try {
    const db = getDB();
    await db.read();

    const donations = db.data.donations;
    const donors = db.data.donors;
    const paid = donations.filter(d => d.status === 'paid');
    const pending = donations.filter(d => d.status === 'pending');
    const failed = donations.filter(d => d.status === 'failed');

    // Total raised = paid donations + all seeded donors (which represent historical paid donations)
    const paidDonationsTotal = paid.reduce((sum, d) => sum + d.amount, 0);
    const seededDonorsTotal = donors
      .filter(d => !d.donationId || !donations.find(don => don.donationId === d.donationId))
      .reduce((sum, d) => sum + d.amount, 0);
    const totalAmountRaised = paidDonationsTotal + seededDonorsTotal;

    // Purpose breakdown across all donors
    const purposeBreakdown = {};
    [...paid, ...donors.filter(d => !d.donationId || !donations.find(don => don.donationId === d.donationId))]
      .forEach(d => {
        purposeBreakdown[d.purpose] = (purposeBreakdown[d.purpose] || 0) + d.amount;
      });

    // Monthly totals (last 12 months)
    const monthlyTotals = {};
    paid.forEach(d => {
      const month = new Date(d.createdAt).toLocaleString('en-IN', { month: 'short', year: 'numeric' });
      monthlyTotals[month] = (monthlyTotals[month] || 0) + d.amount;
    });

    res.json({
      success: true,
      data: {
        overview: {
          totalDonations: donations.length,
          totalPaid: paid.length,
          totalPending: pending.length,
          totalFailed: failed.length,
          totalAmountRaised,
          totalDonors: donors.length,
          averageDonation: donors.length > 0
            ? Math.round(donors.reduce((s, d) => s + d.amount, 0) / donors.length)
            : 0
        },
        purposeBreakdown,
        monthlyTotals,
        categoryBreakdown: {
          maha_daan: donors.filter(d => d.category === 'maha_daan').length,
          ati_uttam_daan: donors.filter(d => d.category === 'ati_uttam_daan').length,
          uttam_daan: donors.filter(d => d.category === 'uttam_daan').length,
          general: donors.filter(d => d.category === 'general').length
        },
        recentDonations: donations
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 10)
          .map(d => ({
            donationId: d.donationId,
            name: d.fullName,
            amount: d.amount,
            purpose: d.purpose,
            status: d.status,
            createdAt: d.createdAt
          }))
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch admin stats' });
  }
});

// GET /api/admin/donations — Full donation list for admin
router.get('/donations', async (req, res) => {
  try {
    const db = getDB();
    await db.read();

    const { status, page = 1, limit = 25, search } = req.query;
    let donations = [...db.data.donations].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    if (status) donations = donations.filter(d => d.status === status);
    if (search) {
      const q = search.toLowerCase();
      donations = donations.filter(d =>
        d.fullName?.toLowerCase().includes(q) ||
        d.email?.toLowerCase().includes(q) ||
        d.donationId?.toLowerCase().includes(q)
      );
    }

    const total = donations.length;
    const start = (parseInt(page) - 1) * parseInt(limit);
    const paginated = donations.slice(start, start + parseInt(limit));

    res.json({
      success: true,
      data: paginated,
      pagination: { total, page: parseInt(page), limit: parseInt(limit), totalPages: Math.ceil(total / parseInt(limit)) }
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch admin donations' });
  }
});

// PATCH /api/admin/donations/:id — Update any field (admin)
router.patch('/donations/:id', async (req, res) => {
  try {
    const db = getDB();
    await db.read();

    const idx = db.data.donations.findIndex(d => d.id === req.params.id || d.donationId === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Donation not found' });

    db.data.donations[idx] = {
      ...db.data.donations[idx],
      ...req.body,
      id: db.data.donations[idx].id,
      donationId: db.data.donations[idx].donationId,
      updatedAt: new Date().toISOString()
    };

    await db.write();
    res.json({ success: true, data: db.data.donations[idx] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update donation' });
  }
});

// DELETE /api/admin/donors/:id — Remove a donor from public list
router.delete('/donors/:id', async (req, res) => {
  try {
    const db = getDB();
    await db.read();

    const before = db.data.donors.length;
    db.data.donors = db.data.donors.filter(d => d.id !== req.params.id);
    if (db.data.donors.length === before) return res.status(404).json({ error: 'Donor not found' });

    await db.write();
    res.json({ success: true, message: 'Donor removed from public list' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove donor' });
  }
});

// GET /api/admin/settings
router.get('/settings', async (req, res) => {
  try {
    const db = getDB();
    await db.read();
    res.json({ success: true, data: db.data.settings });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

// PATCH /api/admin/settings
router.patch('/settings', async (req, res) => {
  try {
    const db = getDB();
    await db.read();
    db.data.settings = { ...db.data.settings, ...req.body };
    await db.write();
    res.json({ success: true, data: db.data.settings });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update settings' });
  }
});

export { router as adminRoutes };