// Validation middleware for donation form
export function validateDonation(req, res, next) {
  const { fullName, email, phone, purpose, amount } = req.body;
  const errors = [];

  if (!fullName || fullName.trim().length < 2) {
    errors.push('Full name must be at least 2 characters');
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('Valid email address is required');
  }

  if (!phone || !/^(\+91|0)?[6-9]\d{9}$/.test(phone.replace(/\s/g, ''))) {
    errors.push('Valid Indian phone number is required');
  }

  const validPurposes = [
    'Daily Pooja & Rituals',
    'Festival Celebrations',
    'Temple Maintenance',
    'Charitable Activities',
    'Religious Education',
    'General Donation'
  ];
  if (!purpose || !validPurposes.includes(purpose)) {
    errors.push('Valid donation purpose is required');
  }

  const parsedAmount = parseInt(amount);
  if (!amount || isNaN(parsedAmount) || parsedAmount < 100) {
    errors.push('Minimum donation amount is ₹100');
  }
  if (parsedAmount > 10000000) {
    errors.push('Maximum donation amount is ₹1,00,00,000');
  }

  // PAN validation (optional but if provided must be valid)
  if (req.body.panNumber && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(req.body.panNumber.toUpperCase())) {
    errors.push('Invalid PAN number format (e.g. ABCDE1234F)');
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: 'Validation failed', details: errors });
  }

  // Normalize
  req.body.fullName = fullName.trim();
  req.body.email = email.toLowerCase().trim();
  req.body.phone = phone.trim();
  if (req.body.panNumber) req.body.panNumber = req.body.panNumber.toUpperCase().trim();

  next();
}