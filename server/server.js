const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for your frontend
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));

app.use(express.json());

// PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Test database connection
pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Database connection error:', err);
});

// Initialize database tables
async function initDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS referrals (
        id SERIAL PRIMARY KEY,
        referral_code VARCHAR(100) NOT NULL,
        clicked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        user_agent TEXT,
        referrer TEXT,
        ip_address VARCHAR(45)
      );
      
      CREATE INDEX IF NOT EXISTS idx_referral_code ON referrals(referral_code);
      CREATE INDEX IF NOT EXISTS idx_clicked_at ON referrals(clicked_at);
    `);
    console.log('Database tables initialized');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

// Initialize on startup
initDatabase();

// Track referral click endpoint
app.post('/api/track-referral', async (req, res) => {
  try {
    const { referralCode, userAgent, referrer } = req.body;
    
    if (!referralCode) {
      return res.status(400).json({ error: 'Referral code is required' });
    }
    
    // Get client IP address
    const ipAddress = req.headers['x-forwarded-for']?.split(',')[0] || 
                     req.headers['x-real-ip'] || 
                     req.connection.remoteAddress;
    
    // Insert referral click into database
    const result = await pool.query(
      `INSERT INTO referrals (referral_code, user_agent, referrer, ip_address)
       VALUES ($1, $2, $3, $4)
       RETURNING id, clicked_at`,
      [referralCode, userAgent || null, referrer || null, ipAddress || null]
    );
    
    console.log(`Referral tracked: ${referralCode} at ${result.rows[0].clicked_at}`);
    
    res.json({
      success: true,
      id: result.rows[0].id,
      timestamp: result.rows[0].clicked_at
    });
  } catch (error) {
    console.error('Error tracking referral:', error);
    res.status(500).json({ error: 'Failed to track referral' });
  }
});

// Get referral stats endpoint
app.get('/api/referral-stats/:referralCode', async (req, res) => {
  try {
    const { referralCode } = req.params;
    
    // Get total clicks
    const totalResult = await pool.query(
      `SELECT COUNT(*) as total FROM referrals WHERE referral_code = $1`,
      [referralCode]
    );
    
    // Get clicks by date (last 30 days)
    const dailyResult = await pool.query(
      `SELECT DATE(clicked_at) as date, COUNT(*) as count
       FROM referrals
       WHERE referral_code = $1
       AND clicked_at >= NOW() - INTERVAL '30 days'
       GROUP BY DATE(clicked_at)
       ORDER BY date DESC`,
      [referralCode]
    );
    
    res.json({
      success: true,
      referralCode,
      totalClicks: parseInt(totalResult.rows[0].total),
      dailyClicks: dailyResult.rows
    });
  } catch (error) {
    console.error('Error getting referral stats:', error);
    res.status(500).json({ error: 'Failed to get referral stats' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Referral tracking API running on port ${PORT}`);
});
