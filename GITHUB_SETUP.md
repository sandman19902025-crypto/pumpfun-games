# GitHub + Netlify Auto-Deploy Setup Guide

Follow these steps to set up automatic deployment from GitHub to Netlify.

## Step 1: Create a GitHub Repository

### Option A: Using GitHub Website (Recommended)

1. Go to [GitHub](https://github.com) and sign in
2. Click the **+** icon in the top right → **New repository**
3. Repository settings:
   - **Name**: `pumpfun-games` (or any name you prefer)
   - **Description**: "Daily Solana Games & Competitions Platform"
   - **Visibility**: Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have files)
4. Click **Create repository**

### Option B: Using GitHub CLI (if installed)

```bash
gh repo create pumpfun-games --public --source=. --remote=origin --push
```

## Step 2: Initialize Git and Push to GitHub

Open Terminal in the `Games` folder and run these commands:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: pumpfun.games mobile-first refactor"

# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/pumpfun-games.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Important**: Replace `YOUR_USERNAME` with your actual GitHub username!

## Step 3: Connect Repository to Netlify

### Method 1: From GitHub (Recommended)

1. Go to [Netlify](https://app.netlify.com) and sign in (or create account)
2. Click **Add new site** → **Import an existing project**
3. Choose **GitHub** as your Git provider
4. Authorize Netlify if prompted
5. Select your repository: `pumpfun-games`
6. Netlify will auto-detect settings (it will find `netlify.toml`):
   - **Base directory**: Leave empty (or set to `/` if needed)
   - **Build command**: Leave empty (no build needed)
   - **Publish directory**: `.` (root directory)
7. Click **Deploy site**

### Method 2: From Netlify Dashboard

1. In Netlify dashboard, click **Add new site** → **Import an existing project**
2. Connect to **GitHub**
3. Find and select your `pumpfun-games` repository
4. Netlify auto-detects your `netlify.toml` settings
5. Click **Deploy site**

## Step 4: Verify Auto-Deployment

After the first deployment:

1. **Test auto-deployment**: 
   - Make a small change to `index.html`
   - Commit and push: `git add . && git commit -m "Test deploy" && git push`
   - Check Netlify dashboard → Deploys tab
   - You should see a new deploy start automatically!

2. **Custom Domain** (Optional):
   - Go to Site settings → Domain management
   - Add your custom domain (e.g., `pumpfun.games`)

## Future Updates

After setup, every time you push to GitHub, Netlify will automatically:

1. Detect the push
2. Pull the latest code
3. Deploy your site
4. Make it live (usually in 30-60 seconds)

### Quick Deploy Workflow:

```bash
# Make your changes to files
# Then:

git add .
git commit -m "Description of your changes"
git push

# That's it! Netlify handles the rest.
```

## Troubleshooting

### Git Push Error: Authentication Required
If you get authentication errors, set up GitHub CLI or use SSH:

**Option 1: Use GitHub CLI**
```bash
gh auth login
```

**Option 2: Use SSH instead of HTTPS**
```bash
# Change remote to SSH
git remote set-url origin git@github.com:YOUR_USERNAME/pumpfun-games.git
```

### Netlify Not Detecting Changes
- Make sure you're pushing to the `main` branch (or branch connected in Netlify)
- Check Netlify dashboard → Site settings → Build & deploy → Continuous Deployment
- Verify the correct branch is selected

### Build Errors
- Since this is a static site, build should be quick
- Check Netlify deploy logs if issues occur
- Make sure `netlify.toml` is in the root directory

## Need Help?

- [Netlify Docs](https://docs.netlify.com/)
- [GitHub Docs](https://docs.github.com/)
- Check deploy logs in Netlify dashboard for specific errors
