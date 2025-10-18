# GitHub Repository Setup Instructions

## Step 1: Create Repository on GitHub

1. Go to https://github.com/new
2. Repository name: `portfolio` (or any name you prefer)
3. Description: `Professional portfolio website showcasing my Full Stack Development skills`
4. Set to Public (so it can be viewed by employers)
5. Do NOT check "Add a README file" (we already have one)
6. Do NOT add .gitignore (we already have one)
7. Click "Create repository"

## Step 2: Connect Local Repository to GitHub

After creating the repository on GitHub, run these commands in PowerShell:

```powershell
# Add the remote repository (replace 'portfolio' with your chosen repo name if different)
git remote add origin https://github.com/xZibit2444/portfolio.git

# Push your code to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Enable GitHub Pages (Optional)

To host your portfolio for free on GitHub Pages:

1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "Pages" in the left sidebar
4. Under "Source", select "Deploy from a branch"
5. Choose "main" branch and "/ (root)" folder
6. Click "Save"
7. Your site will be available at: https://xZibit2444.github.io/portfolio

## Step 4: Update README (if needed)

If you used a different repository name, update the live demo link in README.md:
- Edit the "Live Demo" section to match your GitHub Pages URL

## Repository Features

✅ Git repository initialized
✅ All files committed
✅ .gitignore configured
✅ Professional README.md created
✅ Ready to push to GitHub

Your portfolio is now ready to be pushed to GitHub! 🚀