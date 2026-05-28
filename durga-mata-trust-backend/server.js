import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { donationRoutes } from './routes/donations.js';
import { donorRoutes } from './routes/donors.js';
import { paymentRoutes } from './routes/payments.js';
import { adminRoutes } from './routes/admin.js';
import { initDB } from './db/database.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: ['http://localhost:3000', 'https://durga-mata-trust-kumha.vercel.app'], credentials: true }));
app.use(morgan('dev'));
app.use(express.json());

// Initialize DB
await initDB();

// Routes
app.use('/api/donations', donationRoutes);
app.use('/api/donors', donorRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), server: 'Temple Donations API' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

app.listen(PORT, () => {
  console.log(`\n🛕  Temple Donations API running on http://localhost:${PORT}`);
  console.log(`📊  Admin dashboard: http://localhost:${PORT}/api/admin/stats\n`);
});