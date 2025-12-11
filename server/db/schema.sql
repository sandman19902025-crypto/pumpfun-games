-- Referral Tracking Database Schema
-- This script is automatically run on server startup

-- Create referrals table to track referral link clicks
CREATE TABLE IF NOT EXISTS referrals (
    id SERIAL PRIMARY KEY,
    referral_code VARCHAR(100) NOT NULL,
    clicked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_agent TEXT,
    referrer TEXT,
    ip_address VARCHAR(45)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_referral_code ON referrals(referral_code);
CREATE INDEX IF NOT EXISTS idx_clicked_at ON referrals(clicked_at);
CREATE INDEX IF NOT EXISTS idx_referral_code_clicked_at ON referrals(referral_code, clicked_at);

-- Optional: Create a view for daily stats (makes queries easier)
CREATE OR REPLACE VIEW referral_daily_stats AS
SELECT 
    referral_code,
    DATE(clicked_at) as click_date,
    COUNT(*) as clicks,
    COUNT(DISTINCT ip_address) as unique_ips
FROM referrals
GROUP BY referral_code, DATE(clicked_at);
