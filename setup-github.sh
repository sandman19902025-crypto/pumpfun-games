#!/bin/bash

# GitHub Setup Script for pumpfun.games
# This script helps initialize git and set up the repository

echo "🚀 Setting up GitHub repository for pumpfun.games..."
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first:"
    echo "   Visit: https://git-scm.com/downloads"
    exit 1
fi

# Check if already a git repo
if [ -d ".git" ]; then
    echo "⚠️  Git repository already initialized!"
    read -p "Do you want to continue? (y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
else
    # Initialize git
    echo "📦 Initializing git repository..."
    git init
fi

# Add all files
echo "📝 Adding files to git..."
git add .

# Create initial commit
echo "💾 Creating initial commit..."
git commit -m "Initial commit: pumpfun.games mobile-first refactor"

# Set main branch
git branch -M main

echo ""
echo "✅ Git repository initialized!"
echo ""
echo "📋 Next steps:"
echo "   1. Go to GitHub and create a new repository:"
echo "      https://github.com/new"
echo ""
echo "   2. Copy your repository URL (e.g., https://github.com/YOUR_USERNAME/pumpfun-games.git)"
echo ""
echo "   3. Run this command (replace YOUR_REPO_URL with your actual URL):"
echo "      git remote add origin YOUR_REPO_URL"
echo "      git push -u origin main"
echo ""
echo "   4. Then connect to Netlify for auto-deployment:"
echo "      https://app.netlify.com → Add new site → Import from Git → GitHub"
echo ""
echo "📖 See GITHUB_SETUP.md for detailed instructions!"
