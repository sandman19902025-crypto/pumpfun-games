# Pumpfun Games Referral Tracking API

Backend API for tracking referral clicks, built with Node.js, Express, and PostgreSQL.

## Railway Deployment Setup

### 1. Create Railway Project

1. Go to [Railway.app](https://railway.app) and sign up/login
2. Click "New Project"
3. Select "Provision PostgreSQL" to add a PostgreSQL database
4. Click "New" → "Empty Service" to add your API service

### 2. Set Up Database

1. Click on your PostgreSQL service
2. Copy the `DATABASE_URL` from the "Variables" tab
3. You'll use this in your API service

### 3. Deploy API

**Option A: Deploy from GitHub**
1. Connect your GitHub repo to Railway
2. Set root directory to `/server`
3. Add environment variables (see below)

**Option B: Deploy via Railway CLI**
```bash
cd server
railway login
railway init
railway link  # Link to your Railway project
railway up
```

### 4. Environment Variables

In Railway, add these environment variables to your API service:

```
DATABASE_URL=<from PostgreSQL service>
PORT=3000
NODE_ENV=production
FRONTEND_URL=https://pumpfun.games
```

### 5. Update Frontend

Update `games.html` to use your Railway API URL:

```javascript
const REFERRAL_API_URL = 'https://your-api-service.up.railway.app';
```

## Local Development

1. Install dependencies:
```bash
cd server
npm install
```

2. Copy `.env.example` to `.env` and fill in your database URL

3. Run the server:
```bash
npm start
```

## API Endpoints

- `POST /api/track-referral` - Track a referral click
- `GET /api/referral-stats/:referralCode` - Get stats for a referral code
- `GET /health` - Health check
