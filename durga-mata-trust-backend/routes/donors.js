import { Router } from 'express';
import { getDB } from '../db/database.js';

const router = Router();

// GET /api/donors — Public donors list (only those who opted in)
router.get('/', async (req, res) => {
  try {
    const db = getDB();
    await db.read();

    const { category, purpose, page = 1, limit = 50 } = req.query;

    let donors = db.data.donors
      .filter(d => d.displayName || d.anonymous)
      .sort((a, b) => b.amount - a.amount || new Date(b.createdAt) - new Date(a.createdAt));

    if (category) donors = donors.filter(d => d.category === category);
    if (purpose) donors = donors.filter(d => d.purpose === purpose);

    const total = donors.length;
    const start = (parseInt(page) - 1) * parseInt(limit);
    const paginated = donors.slice(start, start + parseInt(limit));

    // Summary stats
    const stats = {
      total: db.data.donors.length,
      totalAmount: db.data.donors.reduce((sum, d) => sum + d.amount, 0),
      maha_daan: db.data.donors.filter(d => d.category === 'maha_daan').length,
      ati_uttam_daan: db.data.donors.filter(d => d.category === 'ati_uttam_daan').length,
      uttam_daan: db.data.donors.filter(d => d.category === 'uttam_daan').length,
      general: db.data.donors.filter(d => d.category === 'general').length
    };

    res.json({
      success: true,
      data: paginated,
      stats,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch donors' });
  }
});

// GET /api/donors/categories — Donors grouped by category
router.get('/categories', async (req, res) => {
  try {
    const db = getDB();
    await db.read();

    const donors = db.data.donors.filter(d => d.displayName || d.anonymous);

    const categories = {
      maha_daan: {
        label: 'Maha Daan',
        subtitle: '₹1,00,000 and above',
        icon: '🏆',
        donors: donors
          .filter(d => d.category === 'maha_daan')
          .sort((a, b) => b.amount - a.amount)
          .map(d => ({ name: d.anonymous ? 'Anonymous Donor' : d.name, amount: d.amount, purpose: d.purpose, message: d.message, createdAt: d.createdAt }))
      },
      ati_uttam_daan: {
        label: 'Ati Uttam Daan',
        subtitle: '₹50,000 – ₹99,999',
        icon: '⭐',
        donors: donors
          .filter(d => d.category === 'ati_uttam_daan')
          .sort((a, b) => b.amount - a.amount)
          .map(d => ({ name: d.anonymous ? 'Anonymous Donor' : d.name, amount: d.amount, purpose: d.purpose, message: d.message, createdAt: d.createdAt }))
      },
      uttam_daan: {
        label: 'Uttam Daan',
        subtitle: '₹25,000 – ₹49,999',
        icon: '💝',
        donors: donors
          .filter(d => d.category === 'uttam_daan')
          .sort((a, b) => b.amount - a.amount)
          .map(d => ({ name: d.anonymous ? 'Anonymous Donor' : d.name, amount: d.amount, purpose: d.purpose, message: d.message, createdAt: d.createdAt }))
      },
      recent: {
        label: 'Recent Donors',
        subtitle: 'Latest contributions',
        icon: '🙏',
        donors: donors
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 20)
          .map(d => ({ name: d.anonymous ? 'Anonymous Donor' : d.name, amount: d.amount, purpose: d.purpose, message: d.message, createdAt: d.createdAt }))
      }
    };

    res.json({ success: true, data: categories });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch donor categories' });
  }
});

// GET /api/donors/recent — Recent donors for ticker/feed
router.get('/recent', async (req, res) => {
  try {
    const db = getDB();
    await db.read();

    const limit = parseInt(req.query.limit) || 10;
    const recent = db.data.donors
      .filter(d => d.displayName || d.anonymous)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, limit)
      .map(d => ({
        name: d.anonymous ? 'Anonymous Donor' : d.name,
        amount: d.amount,
        purpose: d.purpose,
        createdAt: d.createdAt
      }));

    res.json({ success: true, data: recent });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch recent donors' });
  }
});

export { router as donorRoutes };