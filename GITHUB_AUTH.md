# GitHub Authentication Fix

## The Problem
When you try to push to GitHub, Terminal asks for a password but:
- ❌ Your regular GitHub password **won't work**
- ❌ Terminal hides password input (for security) - it looks like nothing is typing
- ✅ You need a **Personal Access Token** instead

## Solution Options

### Option 1: Use GitHub CLI (EASIEST) ⭐

1. **Install GitHub CLI** (if not installed):
   ```bash
   brew install gh
   ```

2. **Login to GitHub**:
   ```bash
   gh auth login
   ```
   - Choose: GitHub.com
   - Choose: HTTPS
   - Choose: Yes to authenticate Git
   - Choose: Login with web browser
   - Copy the code it shows
   - Browser will open, paste code
   - Authorize

3. **Now push works without passwords!**
   ```bash
   git push -u origin main
   ```

---

### Option 2: Use Personal Access Token

1. **Create Token on GitHub**:
   - Go to: https://github.com/settings/tokens
   - Click "Generate new token" → "Generate new token (classic)"
   - Name it: "pumpfun-games"
   - Select scopes: Check "repo" (gives full access)
   - Click "Generate token"
   - **COPY THE TOKEN** (you won't see it again!)

2. **When Terminal asks for password**:
   - Username: `sandman19902025-crypto`
   - Password: **Paste your token** (not your real password!)

3. **Terminal won't show anything while typing** - that's normal! Just paste and press Enter.

---

### Option 3: Use SSH (More Secure)

1. **Generate SSH Key**:
   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   # Press Enter for all prompts (or set a passphrase)
   ```

2. **Copy Public Key**:
   ```bash
   cat ~/.ssh/id_ed25519.pub
   # Copy the entire output
   ```

3. **Add to GitHub**:
   - Go to: https://github.com/settings/keys
   - Click "New SSH key"
   - Paste your key
   - Save

4. **Change remote to SSH**:
   ```bash
   git remote set-url origin git@github.com:sandman19902025-crypto/pumpfun-games.git
   ```

5. **Now push works without passwords!**
   ```bash
   git push -u origin main
   ```

---

## Quick Fix Right Now

**Try GitHub CLI first** (easiest):
```bash
brew install gh
gh auth login
```

Then push:
```bash
git push -u origin main
```

No passwords needed! 🎉


