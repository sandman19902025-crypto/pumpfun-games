# API Key Security

## Current Status
⚠️ **IMPORTANT**: The Helius API key is currently visible in the code and on GitHub.

## Solutions

### Option 1: Use Netlify Environment Variables (Recommended)
1. Go to your Netlify dashboard
2. Navigate to: Site Settings → Environment Variables
3. Add: `HELIUS_API_KEY` = `e7f8cbe0-8718-46c2-9423-013252d80521`
4. Use a build script to inject it at build time

### Option 2: Accept Public Key (For client-side apps)
- Client-side API keys can't be truly hidden (code runs in browser)
- Use Helius dashboard to:
  - Set rate limits on your API key
  - Restrict API usage by domain
  - Monitor usage and rotate key if compromised

### Option 3: Move to Backend (Most Secure)
- Create a backend API endpoint
- Store API key on server (never exposed)
- Frontend calls your backend, backend calls Helius

## For Now
The code will fallback to public Solana RPC if the key isn't set via `window.HELIUS_API_KEY`.

## Action Required
1. If using Netlify: Set up environment variable (see Option 1)
2. Or: Configure Helius dashboard with rate limits/domain restrictions
3. Consider: Rotating your API key if you're concerned it's been exposed
