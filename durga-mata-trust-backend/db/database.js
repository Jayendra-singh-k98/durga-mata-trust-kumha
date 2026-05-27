import { JSONFilePreset } from 'lowdb/node';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, 'db.json');

const seedDonors = [
  { id: uuidv4(), name: 'Shri Rajesh Kumar', amount: 150000, category: 'maha_daan', purpose: 'Temple Maintenance', displayName: true, anonymous: false, message: 'Jai Ganesh', createdAt: new Date('2024-11-15').toISOString() },
  { id: uuidv4(), name: 'Smt. Priya Sharma Family', amount: 125000, category: 'maha_daan', purpose: 'Festival Celebrations', displayName: true, anonymous: false, message: '', createdAt: new Date('2024-12-01').toISOString() },
  { id: uuidv4(), name: 'Late Shri Mohan Lal (In Memory)', amount: 200000, category: 'maha_daan', purpose: 'General Donation', displayName: true, anonymous: false, message: 'In loving memory', createdAt: new Date('2024-10-20').toISOString() },
  { id: uuidv4(), name: 'Shri Amit Verma', amount: 75000, category: 'ati_uttam_daan', purpose: 'Daily Pooja & Rituals', displayName: true, anonymous: false, message: '', createdAt: new Date('2025-01-05').toISOString() },
  { id: uuidv4(), name: 'Gupta Family', amount: 60000, category: 'ati_uttam_daan', purpose: 'Charitable Activities', displayName: true, anonymous: false, message: 'For annadaan', createdAt: new Date('2025-01-10').toISOString() },
  { id: uuidv4(), name: 'Smt. Anjali Patel', amount: 55000, category: 'ati_uttam_daan', purpose: 'Religious Education', displayName: true, anonymous: false, message: '', createdAt: new Date('2025-01-15').toISOString() },
  { id: uuidv4(), name: 'Shri Suresh Agarwal', amount: 52000, category: 'ati_uttam_daan', purpose: 'Temple Maintenance', displayName: true, anonymous: false, message: '', createdAt: new Date('2025-01-20').toISOString() }
];

const defaultData = {
  donations: [],
  donors: [],
  payments: [],
  settings: {
    templeId: 'maa-durga-kumha',
    templeName: 'Durga Mata Mandir Kumha',
    trustName: 'Maa Durga Charitable Trust Kumha',
    deityName: 'Maa Durga',
    contactEmail: 'maadurgatrustkumha@gmail.com',
    contactPhone: '+91 9413330548',
    upiId: 'vyapar.176548150186@hdfcbank',
    accountNumber: '50200119336982',
    ifsc: 'HDFC0009692',
    bankName: 'HDFC Bank Ltd.',
    branch: 'SHREE GOPAL NAGAR JAIPUR',
    section17b: 'AAATS1234C',
    panNumber: 'AAATS1234C'
  }
};

let db;

export async function initDB() {
  db = await JSONFilePreset(dbPath, defaultData);

  // Seed donors if empty
  if (!db.data.donors || db.data.donors.length === 0) {
    db.data.donors = seedDonors;
    await db.write();
    console.log('✅  Database seeded with', seedDonors.length, 'sample donors');
  }

  console.log(`✅  Database initialized at ${dbPath}`);
}

export function getDB() {
  if (!db) throw new Error('DB not initialized — call initDB() first');
  return db;
}

export function getDonorCategory(amount) {
  if (amount >= 100000) return 'maha_daan';
  if (amount >= 50000) return 'ati_uttam_daan';
  if (amount >= 25000) return 'uttam_daan';
  return 'general';
}
