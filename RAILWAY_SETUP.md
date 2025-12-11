# Railway Deployment Guide

## Quick Setup Steps

### 1. Create Railway Account & Project
1. Go to [railway.app](https://railway.app) and sign up/login
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"** (or "Empty Project" to deploy manually)

### 2. Add PostgreSQL Database
1. In your Railway project, click **"+ New"**
2. Select **"Database"** → **"Add PostgreSQL"**
3. Railway automatically creates the database
4. Click on the PostgreSQL service
5. Go to **"Variables"** tab
6. Copy the `DATABASE_URL` - you'll need this next

### 3. Deploy API Service

**Option A: Deploy from GitHub (Recommended)**
1. In Railway project, click **"+ New"**
2. Select **"GitHub Repo"**
3. Connect your `sandman19902025-crypto/pumpfun-games` repo
4. Set **Root Directory** to: `server`
5. Railway will auto-detect it's Node.js and deploy

**Option B: Deploy via Railway CLI**
```bash
cd server
npm install -g @railway/cli
railway login
railway init
railway link  # Select your project
railway up
```

### 4. Configure Environment Variables

In your API service on Railway:
1. Go to **"Variables"** tab
2. Add these variables:

```
DATABASE_URL=<paste from PostgreSQL service>
PORT=3000
NODE_ENV=production
FRONTEND_URL=https://pumpfun.games
```

Railway will auto-inject `DATABASE_URL` if services are linked, but you can add it manually.

### 5. Get Your API URL

1. In Railway, click on your API service
2. Go to **"Settings"** tab
3. Scroll to **"Domains"** section
4. Railway provides a URL like: `https://your-api-name.up.railway.app`
5. Copy this URL

### 6. Update Frontend

In `games.html`, find this line (~3101):
```javascript
const REFERRAL_API_URL = process.env.REFERRAL_API_URL || 'https://your-api-service.up.railway.app';
```

Replace `'https://your-api-service.up.railway.app'` with your actual Railway URL.

### 7. Test It

1. Deploy your updated frontend to Netlify
2. Visit your site
3. Go to Dashboard → Generate a referral link
4. Click your referral link to test
5. Check Railway logs to see if tracking worked

## Database Schema

The API automatically creates this table:

```sql
CREATE TABLE referrals (
  id SERIAL PRIMARY KEY,
  referral_code VARCHAR(100) NOT NULL,
  clicked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_agent TEXT,
  referrer TEXT,
  ip_address VARCHAR(45)
);
```

## API Endpoints

- `POST /api/track-referral` - Track a referral click
  - Body: `{ referralCode: "@username", userAgent: "...", referrer: "..." }`
  
- `GET /api/referral-stats/:referralCode` - Get stats
  - Returns: `{ totalClicks: 123, dailyClicks: [...] }`

- `GET /health` - Health check

## Troubleshooting

**Database connection issues:**
- Make sure `DATABASE_URL` is set in your API service
- Check Railway logs for connection errors

**CORS errors:**
- Update `FRONTEND_URL` in environment variables
- Make sure it matches your Netlify domain

**API not responding:**
- Check Railway service logs
- Verify the service is running (green status)
- Test `/health` endpoint

## Costs

Railway free tier includes:
- $5/month credit (usually enough for small projects)
- PostgreSQL database included
- HTTP traffic included

For production, consider upgrading if you get lots of traffic.
