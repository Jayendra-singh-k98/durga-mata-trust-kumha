import dotenv from "dotenv";
dotenv.config();
import { Router } from 'express';
import crypto from 'crypto';
import Razorpay from 'razorpay';
import { v4 as uuidv4 } from 'uuid';
import { getDB, getDonorCategory } from '../db/database.js';

const router = Router();

// Server-side only. NEVER prefix these with NEXT_PUBLIC_ / VITE_ — that
// exposes them to the browser bundle. Only the key_id may ever reach the client.
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
  console.warn('[payments] RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET are not set. Payment routes will fail.');
}

const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET,
});

// POST /api/payments/initiate — Start a payment session and create a real Razorpay order
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

    // Amount must be in the smallest currency unit (paise) for Razorpay.
    const amountPaise = Math.round(Number(donation.amount) * 100);
    if (!amountPaise || amountPaise <= 0) {
      return res.status(400).json({ error: 'Invalid donation amount' });
    }

    // Create a REAL order with Razorpay. This is the order_id Checkout needs;
    // a locally-invented id will be rejected by Razorpay's checkout.js.
    let order;
    try {
      order = await razorpay.orders.create({
        amount: amountPaise,
        currency: 'INR',
        receipt: sessionId,
        notes: { donationId: donation.donationId, purpose: donation.purpose || '' },
      });
    } catch (razorpayErr) {
      console.error('Razorpay order creation failed:', razorpayErr);
      return res.status(502).json({ error: 'Could not create payment order. Please try again.' });
    }

    const paymentSession = {
      id: uuidv4(),
      sessionId,
      donationId: donation.donationId,
      amount: donation.amount,
      method,
      status: 'initiated',
      razorpayOrderId: order.id,
      expiresAt,
      createdAt: new Date().toISOString(),
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
        gateway: {
          keyId: RAZORPAY_KEY_ID,
          orderId: order.id,
          amount: order.amount,
          currency: order.currency,
        },
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to initiate payment' });
  }
});

// POST /api/payments/verify — Verify payment signature (called after Razorpay checkout succeeds)
router.post('/verify', async (req, res) => {
  try {
    const db = getDB();
    await db.read();

    const {
      sessionId,
      donationId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    if (!sessionId || !donationId || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: 'Missing required verification fields' });
    }

    const paymentIdx = db.data.payments.findIndex(p => p.sessionId === sessionId);
    const donationIdx = db.data.donations.findIndex(
      d => d.id === donationId || d.donationId === donationId
    );

    if (paymentIdx === -1) return res.status(404).json({ error: 'Payment session not found' });
    if (donationIdx === -1) return res.status(404).json({ error: 'Donation not found' });

    const paymentSession = db.data.payments[paymentIdx];

    if (paymentSession.razorpayOrderId !== razorpay_order_id) {
      return res.status(400).json({ error: 'Order ID mismatch for this session' });
    }

    // The ONLY trustworthy way to know a payment succeeded: recompute the
    // HMAC signature server-side with the secret key and compare it.
    // Never trust a client-supplied "status" field for this.
    const expectedSignature = crypto
      .createHmac('sha256', RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    const isValid = expectedSignature === razorpay_signature;

    const paymentStatus = isValid ? 'success' : 'failed';
    const donationStatus = isValid ? 'paid' : 'failed';

    db.data.payments[paymentIdx] = {
      ...paymentSession,
      status: paymentStatus,
      razorpayPaymentId: razorpay_payment_id,
      transactionId: razorpay_payment_id,
      verifiedAt: new Date().toISOString(),
    };

    const donation = db.data.donations[donationIdx];
    db.data.donations[donationIdx] = {
      ...donation,
      status: donationStatus,
      paymentId: razorpay_payment_id,
      paymentMethod: paymentSession.method,
      updatedAt: new Date().toISOString(),
    };

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
          createdAt: new Date().toISOString(),
        });
      }
    }

    await db.write();

    if (!isValid) {
      return res.status(400).json({
        success: false,
        error: 'Payment signature verification failed',
        data: { status: paymentStatus, donationStatus },
      });
    }

    const receipt = {
      receiptNumber: `RCPT-${donation.donationId}`,
      amount: donation.amount,
      name: donation.fullName,
      purpose: donation.purpose,
      date: new Date().toLocaleDateString('en-IN'),
      transactionId: razorpay_payment_id,
      note80G: '80G receipt will be emailed within 7 working days',
    };

    res.json({
      success: true,
      data: { status: paymentStatus, donationStatus, receipt },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to verify payment' });
  }
});

// POST /api/payments/simulate — Test endpoint to simulate a payment (dev/demo only, disabled in production)
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
      updatedAt: new Date().toISOString(),
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
          createdAt: new Date().toISOString(),
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
        receipt: isSuccess
          ? {
              receiptNumber: `RCPT-${donation.donationId}`,
              amount: donation.amount,
              name: donation.fullName,
              purpose: donation.purpose,
              date: new Date().toLocaleDateString('en-IN'),
              transactionId,
              note80G: '80G receipt will be emailed within 7 working days',
            }
          : null,
      },
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