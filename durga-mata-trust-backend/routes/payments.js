import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { getDB, getDonorCategory } from '../db/database.js';

const router = Router();

// POST /api/payments/initiate — Start a payment session
router.post('/initiate', async (req, res) => {
  try {
    const db = getDB();
    await db.read();

    const { donationId, method } = req.body;
    const validMethods = ['upi', 'card', 'netbanking', 'wallet'];

    if (!donationId) return res.status(400).json({ error: 'donationId is required' });
    if (!validMethods.includes(method)) return res.status(400).json({ error: 'Invalid payment method' });

    const donation = db.data.donations.find(
      d => d.id === donationId || d.donationId === donationId
    );

    if (!donation) return res.status(404).json({ error: 'Donation not found' });
    if (donation.status === 'paid') return res.status(400).json({ error: 'Donation already paid' });

    const sessionId = `PAY-${Date.now()}-${uuidv4().slice(0, 8).toUpperCase()}`;
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString(); // 15 min expiry

    const paymentSession = {
      id: uuidv4(),
      sessionId,
      donationId: donation.donationId,
      amount: donation.amount,
      method,
      status: 'initiated',
      expiresAt,
      createdAt: new Date().toISOString()
    };

    db.data.payments.push(paymentSession);
    await db.write();

    res.json({
      success: true,
      data: {
        sessionId,
        amount: donation.amount,
        method,
        expiresAt,
        // In real integration, this would be razorpay/payu order id + key
        gateway: {
          orderId: `order_${sessionId}`,
          currency: 'INR',
          key: 'rzp_test_XXXX_mock',  // Mock key
          callbackUrl: `http://localhost:5000/api/payments/callback`
        }
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to initiate payment' });
  }
});

// POST /api/payments/verify — Verify payment (called after gateway callback)
router.post('/verify', async (req, res) => {
  try {
    const db = getDB();
    await db.read();

    const { sessionId, donationId, transactionId, status } = req.body;

    if (!sessionId || !donationId) {
      return res.status(400).json({ error: 'sessionId and donationId are required' });
    }

    const paymentIdx = db.data.payments.findIndex(p => p.sessionId === sessionId);
    const donationIdx = db.data.donations.findIndex(
      d => d.id === donationId || d.donationId === donationId
    );

    if (paymentIdx === -1) return res.status(404).json({ error: 'Payment session not found' });
    if (donationIdx === -1) return res.status(404).json({ error: 'Donation not found' });

    const paymentStatus = status === 'success' ? 'success' : 'failed';
    const donationStatus = status === 'success' ? 'paid' : 'failed';

    // Update payment session
    db.data.payments[paymentIdx] = {
      ...db.data.payments[paymentIdx],
      status: paymentStatus,
      transactionId: transactionId || `TXN_MOCK_${Date.now()}`,
      verifiedAt: new Date().toISOString()
    };

    // Update donation status
    const donation = db.data.donations[donationIdx];
    db.data.donations[donationIdx] = {
      ...donation,
      status: donationStatus,
      paymentId: transactionId || `TXN_MOCK_${Date.now()}`,
      paymentMethod: db.data.payments[paymentIdx].method,
      updatedAt: new Date().toISOString()
    };

    // If paid, add to public donors list
    if (donationStatus === 'paid') {
      const d = db.data.donations[donationIdx];
      const alreadyDonor = db.data.donors.some(donor => donor.donationId === d.donationId);

      if (!alreadyDonor) {
        db.data.donors.push({
          id: uuidv4(),
          donationId: d.donationId,
          name: d.displayName ? d.fullName : 'Anonymous Donor',
          amount: d.amount,
          category: getDonorCategory(d.amount),
          purpose: d.purpose,
          displayName: d.displayName,
          anonymous: !d.displayName,
          message: d.message,
          createdAt: new Date().toISOString()
        });
      }
    }

    await db.write();

    const receipt = donationStatus === 'paid' ? {
      receiptNumber: `RCPT-${donation.donationId}`,
      amount: donation.amount,
      name: donation.fullName,
      purpose: donation.purpose,
      date: new Date().toLocaleDateString('en-IN'),
      transactionId: transactionId || `TXN_MOCK_${Date.now()}`,
      note80G: '80G receipt will be emailed within 7 working days'
    } : null;

    res.json({
      success: true,
      data: {
        status: paymentStatus,
        donationStatus,
        receipt
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to verify payment' });
  }
});

// POST /api/payments/simulate — Test endpoint to simulate a payment (dev/demo)
router.post('/simulate', async (req, res) => {
  try {
    const db = getDB();
    await db.read();

    const { donationId, outcome = 'success' } = req.body; // outcome: 'success' | 'failure'

    const donationIdx = db.data.donations.findIndex(
      d => d.id === donationId || d.donationId === donationId
    );

    if (donationIdx === -1) return res.status(404).json({ error: 'Donation not found' });

    const donation = db.data.donations[donationIdx];
    const isSuccess = outcome === 'success';
    const transactionId = `TXN_SIM_${Date.now()}`;

    db.data.donations[donationIdx] = {
      ...donation,
      status: isSuccess ? 'paid' : 'failed',
      paymentId: transactionId,
      paymentMethod: 'simulated',
      updatedAt: new Date().toISOString()
    };

    if (isSuccess) {
      const alreadyDonor = db.data.donors.some(d => d.donationId === donation.donationId);
      if (!alreadyDonor) {
        db.data.donors.push({
          id: uuidv4(),
          donationId: donation.donationId,
          name: donation.displayName ? donation.fullName : 'Anonymous Donor',
          amount: donation.amount,
          category: getDonorCategory(donation.amount),
          purpose: donation.purpose,
          displayName: donation.displayName,
          anonymous: !donation.displayName,
          message: donation.message,
          createdAt: new Date().toISOString()
        });
      }
    }

    await db.write();

    res.json({
      success: true,
      data: {
        outcome,
        transactionId,
        donationId: donation.donationId,
        amount: donation.amount,
        receipt: isSuccess ? {
          receiptNumber: `RCPT-${donation.donationId}`,
          amount: donation.amount,
          name: donation.fullName,
          purpose: donation.purpose,
          date: new Date().toLocaleDateString('en-IN'),
          transactionId,
          note80G: '80G receipt will be emailed within 7 working days'
        } : null
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to simulate payment' });
  }
});

// GET /api/payments/:sessionId — Get payment status
router.get('/:sessionId', async (req, res) => {
  try {
    const db = getDB();
    await db.read();

    const payment = db.data.payments.find(p => p.sessionId === req.params.sessionId);
    if (!payment) return res.status(404).json({ error: 'Payment session not found' });

    res.json({ success: true, data: payment });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch payment' });
  }
});

export { router as paymentRoutes };