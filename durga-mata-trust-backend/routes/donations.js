import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { getDB, getDonorCategory } from '../db/database.js';
import { validateDonation } from '../middleware/validation.js';

const router = Router();

// POST /api/donations — Submit a new donation
router.post('/', validateDonation, async (req, res) => {
  try {
    const db = getDB();
    await db.read();

    const {
      fullName, email, phone, panNumber,
      purpose, amount, message, displayName
    } = req.body;

    const donationId = `DON-${Date.now()}-${uuidv4().slice(0, 6).toUpperCase()}`;
    const parsedAmount = parseInt(amount);

    const donation = {
      id: uuidv4(),
      donationId,
      fullName,
      email,
      phone,
      panNumber: panNumber || null,
      purpose,
      amount: parsedAmount,
      message: message || '',
      displayName: !!displayName,
      anonymous: !displayName,
      status: 'pending',           // pending → paid → receipt_sent
      paymentId: null,
      paymentMethod: null,
      receiptSent: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    db.data.donations.push(donation);
    await db.write();

    res.status(201).json({
      success: true,
      message: 'Donation recorded successfully',
      data: {
        donationId: donation.donationId,
        id: donation.id,
        amount: donation.amount,
        purpose: donation.purpose,
        status: donation.status
      }
    });
  } catch (err) {
    console.error('Error creating donation:', err);
    res.status(500).json({ error: 'Failed to create donation' });
  }
});

// GET /api/donations — List all donations (admin only, paginated)
router.get('/', async (req, res) => {
  try {
    const db = getDB();
    await db.read();

    const { page = 1, limit = 20, status, purpose, minAmount, maxAmount } = req.query;
    let donations = [...db.data.donations].sort((a, b) =>
      new Date(b.createdAt) - new Date(a.createdAt)
    );

    if (status) donations = donations.filter(d => d.status === status);
    if (purpose) donations = donations.filter(d => d.purpose === purpose);
    if (minAmount) donations = donations.filter(d => d.amount >= parseInt(minAmount));
    if (maxAmount) donations = donations.filter(d => d.amount <= parseInt(maxAmount));

    const total = donations.length;
    const start = (parseInt(page) - 1) * parseInt(limit);
    const paginated = donations.slice(start, start + parseInt(limit));

    res.json({
      success: true,
      data: paginated,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch donations' });
  }
});

// GET /api/donations/:id — Get donation by ID or donationId
router.get('/:id', async (req, res) => {
  try {
    const db = getDB();
    await db.read();

    const donation = db.data.donations.find(
      d => d.id === req.params.id || d.donationId === req.params.id
    );

    if (!donation) {
      return res.status(404).json({ error: 'Donation not found' });
    }

    // Don't expose private fields
    const { email, phone, panNumber, ...safe } = donation;
    res.json({ success: true, data: safe });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch donation' });
  }
});

// PATCH /api/donations/:id/status — Update donation status after payment
router.patch('/:id/status', async (req, res) => {
  try {
    const db = getDB();
    await db.read();

    const { status, paymentId, paymentMethod } = req.body;
    const validStatuses = ['pending', 'paid', 'failed', 'receipt_sent'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const donationIdx = db.data.donations.findIndex(
      d => d.id === req.params.id || d.donationId === req.params.id
    );

    if (donationIdx === -1) {
      return res.status(404).json({ error: 'Donation not found' });
    }

    db.data.donations[donationIdx] = {
      ...db.data.donations[donationIdx],
      status,
      paymentId: paymentId || db.data.donations[donationIdx].paymentId,
      paymentMethod: paymentMethod || db.data.donations[donationIdx].paymentMethod,
      updatedAt: new Date().toISOString()
    };

    // If paid, add to public donors list
    if (status === 'paid') {
      const d = db.data.donations[donationIdx];
      const alreadyDonor = db.data.donors.some(donor =>
        donor.donationId === d.donationId
      );

      if (!alreadyDonor) {
        db.data.donors.push({
          id: uuidv4(),
          donationId: d.donationId,
          name: d.displayName ? d.fullName : 'Anonymous Donor',
          amount: d.amount,
          category: getDonorCategory(d.amount),
          purpose: d.purpose,
          displayName: d.displayName,
          anonymous: d.anonymous,
          message: d.message,
          createdAt: new Date().toISOString()
        });
      }
    }

    await db.write();

    res.json({
      success: true,
      message: 'Donation status updated',
      data: db.data.donations[donationIdx]
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update donation status' });
  }
});

export { router as donationRoutes };