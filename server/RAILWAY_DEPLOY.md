# Railway Deployment - Auto Schema Setup

## Automatic Database Schema Creation

The backend **automatically creates the database schema** when it starts up. Here's how it works:

### Order of Operations

1. **Server starts** → `server.js` runs `initializeServer()`
2. **Database connection** → Connects to PostgreSQL using `DATABASE_URL`
3. **Schema setup** → Runs `db/setup.js` which executes `db/schema.sql`
4. **Schema creation order**:
   - Creates `referrals` table (if not exists)
   - Creates indexes (if not exists)
   - Creates views (if not exists)
5. **Server ready** → Express API starts accepting requests

### What Gets Created

```sql
-- 1. Main table
CREATE TABLE referrals (
    id SERIAL PRIMARY KEY,
    referral_code VARCHAR(100) NOT NULL,
    clicked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_agent TEXT,
    referrer TEXT,
    ip_address VARCHAR(45)
);

-- 2. Performance indexes
CREATE INDEX idx_referral_code ON referrals(referral_code);
CREATE INDEX idx_clicked_at ON referrals(clicked_at);
CREATE INDEX idx_referral_code_clicked_at ON referrals(referral_code, clicked_at);

-- 3. Statistics view
CREATE VIEW referral_daily_stats AS ...
```

### Railway Deployment

1. **Railway automatically runs** `npm start` which executes `node server.js`
2. **Server.js automatically runs** the database setup before starting the API
3. **No manual setup needed** - everything happens automatically!

### Manual Database Setup (Optional)

If you need to run the setup manually:

```bash
cd server
npm run setup-db
```

This is useful for:
- Testing locally
- Resetting the database
- Debugging schema issues

### Verification

After deployment, check Railway logs. You should see:

```
🚀 Starting server initialization...
📦 Running database setup...
🔌 Connecting to PostgreSQL database...
✅ Database connection successful
📋 Creating database schema...
✅ Database schema created successfully
✅ Table "referrals" verified
📊 Current referrals in database: 0
✅ Created 3 indexes on referrals table
✅ Database setup completed
🌐 Starting Express server...
✅ Referral tracking API running on port 3000
🎉 Server fully initialized and ready!
```

### Troubleshooting

**If schema setup fails:**
- Check `DATABASE_URL` is set correctly in Railway
- Check Railway logs for specific error messages
- Verify PostgreSQL service is running
- Run `npm run setup-db` manually to see detailed errors

**If tables already exist:**
- The script uses `IF NOT EXISTS` - safe to run multiple times
- No data will be lost
- Indexes will be recreated if missing
