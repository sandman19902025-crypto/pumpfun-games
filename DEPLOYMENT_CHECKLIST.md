# Deployment Checklist ✅

## What's Already Done
- ✅ Backend API code is ready in `/server` folder
- ✅ Database schema will auto-create on deployment
- ✅ Frontend code is updated to use Railway API
- ✅ Everything is pushed to GitHub

## What You Need to Do

### Step 1: Deploy Backend to Railway (5-10 minutes)

1. **Go to [railway.app](https://railway.app)** and sign up/login

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your `sandman19902025-crypto/pumpfun-games` repo

3. **Add PostgreSQL Database**
   - In your Railway project, click "+ New"
   - Select "Database" → "Add PostgreSQL"
   - Wait for it to provision (takes ~30 seconds)

4. **Deploy API Service**
   - In Railway project, click "+ New"
   - Select "GitHub Repo" (your pumpfun-games repo)
   - **Important:** Set "Root Directory" to: `server`
   - Railway will auto-detect Node.js and deploy

5. **Configure Environment Variables**
   - Click on your API service → "Variables" tab
   - Add:
     ```
     DATABASE_URL=<Railway auto-provides this when services are linked>
     PORT=3000
     NODE_ENV=production
     FRONTEND_URL=https://pumpfun.games
     ```
   - If DATABASE_URL isn't auto-filled, copy it from PostgreSQL service → Variables tab

6. **Get Your Railway API URL**
   - Click on your API service → "Settings" tab
   - Scroll to "Domains" section
   - Copy the URL (looks like: `https://your-api-name.up.railway.app`)

### Step 2: Update Frontend with Railway URL (2 minutes)

1. **Open `games.html`** in your editor

2. **Find line ~3133** that says:
   ```javascript
   const REFERRAL_API_URL = 'https://YOUR_RAILWAY_API_URL.up.railway.app';
   ```

3. **Replace it with your actual Railway URL:**
   ```javascript
   const REFERRAL_API_URL = 'https://your-actual-api-name.up.railway.app';
   ```

4. **Save the file**

### Step 3: Deploy Updated Frontend (1 minute)

```bash
cd /Users/lloyddwaah/Downloads/Games
git add games.html
git commit -m "Update Railway API URL"
git push
```

Netlify will auto-deploy from GitHub (if you have auto-deploy enabled).

### Step 4: Test It! (2 minutes)

1. **Test the API directly:**
   - Visit: `https://your-railway-url.up.railway.app/health`
   - Should see: `{"status":"ok","timestamp":"..."}`

2. **Test on your site:**
   - Go to your live site (pumpfun.games)
   - Click "GO TO DASHBOARD"
   - Generate a referral link
   - Click the referral link to test tracking
   - Check Railway logs to see if it tracked the click

3. **Check Railway Logs:**
   - In Railway, click your API service
   - Go to "Deployments" tab → Click latest deployment → "View Logs"
   - You should see database setup messages and API requests

## Quick Commands (if you need to push manually)

```bash
# Navigate to project
cd /Users/lloyddwaah/Downloads/Games

# Update Railway URL in games.html first, then:
git add games.html
git commit -m "Update Railway API URL"
git push
```

## Troubleshooting

**Can't find Root Directory setting?**
- Railway auto-detects Node.js apps
- Make sure you're deploying from the repo root, then set root to `server` in settings

**Database connection error?**
- Make sure PostgreSQL service is added
- Make sure DATABASE_URL is set in API service variables
- Check Railway logs for specific error

**CORS errors?**
- Make sure FRONTEND_URL in Railway matches your Netlify domain
- Or set it to `*` for testing

**API not responding?**
- Check Railway logs
- Make sure service is "Active" (green status)
- Test `/health` endpoint first

## That's It! 🎉

Once you complete these steps, your referral tracking will work with a real PostgreSQL database on Railway.
