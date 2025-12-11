# pumpfun.games

Daily Solana Games & Competitions Platform

## Files Structure
- `index.html` - Main HTML file (renamed from games.html)
- `FORTAB.jpg` - Favicon/tab icon
- `Untitled.mp3` - Background music for dashboard
- `netlify.toml` - Netlify configuration
- `_redirects` - Netlify redirects file

## 🚀 Auto-Deployment Setup (GitHub + Netlify)

**For automatic deployments on every git push, follow the detailed guide:**

👉 **[GITHUB_SETUP.md](./GITHUB_SETUP.md)** - Complete step-by-step instructions

### Quick Start (3 Steps):

1. **Create GitHub Repository**
   ```bash
   # Run the setup script
   ./setup-github.sh
   
   # Or manually:
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/pumpfun-games.git
   git push -u origin main
   ```

2. **Connect to Netlify**
   - Go to [Netlify](https://app.netlify.com)
   - Click **Add new site** → **Import from Git**
   - Select **GitHub** and authorize
   - Choose your repository
   - Netlify auto-detects `netlify.toml` settings
   - Click **Deploy**

3. **Done!** Every `git push` will auto-deploy your site 🎉

---

## Other Deployment Options

### Option 1: Drag & Drop (One-time)
1. Go to [Netlify Drop](https://app.netlify.com/drop)
2. Drag and drop the entire `Games` folder
3. Your site will be live immediately!

### Option 2: Netlify CLI
```bash
npm install -g netlify-cli
netlify deploy
netlify deploy --prod
```

## Important Notes
- The main file is `index.html` (Netlify looks for this by default)
- All assets (images, audio) use relative paths
- No build process needed - static site ready to deploy


# pumpfun-games
