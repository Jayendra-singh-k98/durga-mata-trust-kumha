import { JSONFilePreset } from 'lowdb/node';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, 'db.json');

const defaultData = {
  donations: [],
  donors: [],
  payments: [],
  settings: {
    templeId: 'MAA_DURGA_TRUST_KUMHA_001',
    templeName: 'Maa Durga Charitable Trust Kumha',
    trustName: 'Maa Durga Charitable Trust Kumha',
    trustNameHindi: 'माँ दुर्गा चैरिटेबल ट्रस्ट कूम्हां',
    deityName: 'Maa Durga',
    deityNameHindi: 'माँ दुर्गा',
    registrationNo: '310 Jaipur, 2025',
    registeredUnder: 'Rajasthan Public Trust Act 1959',
    establishedDate: '26.03.2025',
    founderName: 'Dr. Swaroop Singh',
    address: 'A-975, Siddharth Nagar, Jawahar Circle Ke Pas, Jaipur, Rajasthan',
    city: 'Jaipur',
    state: 'Rajasthan',
    contactEmail: 'maadurgatrustkumha@gmail.com',
    contactPhone: '+91 9413330548',
    officeHours: 'Mon–Fri, 9 AM – 5 PM',
    upiId: 'vyapar.176548150186@hdfcbank',
    accountHolderName: 'MAA DURGA CHARITABLE TRUST KUMHA',
    accountNumber: '50200119336982',
    ifsc: 'HDFC0009692',
    bankName: 'HDFC Bank',
    branch: 'Shree Gopal Nagar, Jaipur',
    accountType: 'Current Account',
    panNumber: null,
    section80G: null,
    fcra: false
  }
};

// Seed data - realistic donors for Maa Durga Trust
const seedDonors = [
  { id: uuidv4(), name: 'Dr. Swaroop Singh', amount: 21000, category: 'general', purpose: 'General Donation', displayName: true, anonymous: false, message: 'Jai Maa Durga', createdAt: new Date('2025-03-26').toISOString() },
  { id: uuidv4(), name: 'Shri Satendra Singh', amount: 11000, category: 'general', purpose: 'Daily Pooja & Rituals', displayName: true, anonymous: false, message: '', createdAt: new Date('2025-04-01').toISOString() },
  { id: uuidv4(), name: 'Shri Parmendra Singh', amount: 5100, category: 'general', purpose: 'Festival Celebrations', displayName: true, anonymous: false, message: 'Navratri ke liye', createdAt: new Date('2025-04-10').toISOString() },
  { id: uuidv4(), name: 'Shri Narendra Singh', amount: 5000, category: 'general', purpose: 'Charitable Activities', displayName: true, anonymous: false, message: '', createdAt: new Date('2025-04-15').toISOString() },
  { id: uuidv4(), name: 'Shri Arvendra Singh', amount: 2100, category: 'general', purpose: 'Religious Education', displayName: true, anonymous: false, message: '', createdAt: new Date('2025-04-20').toISOString() },
  { id: uuidv4(), name: 'Shri Jeetendra Singh', amount: 2100, category: 'general', purpose: 'General Donation', displayName: true, anonymous: false, message: 'Maa ka ashirwad mile', createdAt: new Date('2025-04-25').toISOString() },
  { id: uuidv4(), name: 'Kumha Village Samaj', amount: 11000, category: 'general', purpose: 'Festival Celebrations', displayName: true, anonymous: false, message: 'Navratri celebration', createdAt: new Date('2025-05-01').toISOString() },
  { id: uuidv4(), name: 'Anonymous Donor', amount: 5000, category: 'general', purpose: 'General Donation', displayName: false, anonymous: true, message: '', createdAt: new Date('2025-05-05').toISOString() },
  { id: uuidv4(), name: 'Smt. Devi Singh', amount: 1100, category: 'general', purpose: 'Daily Pooja & Rituals', displayName: true, anonymous: false, message: '', createdAt: new Date('2025-05-10').toISOString() },
  { id: uuidv4(), name: 'Shri Vandana Singh', amount: 2100, category: 'general', purpose: 'Temple Maintenance', displayName: true, anonymous: false, message: '', createdAt: new Date('2025-05-15').toISOString() },
];

let db;

export async function initDB() {
  db = await JSONFilePreset(dbPath, defaultData);

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