# 🚀 Deploy to GitHub Pages

This guide will help you deploy your "From Bumble to Forever" website to GitHub Pages for **completely free hosting**.

## ⚠️ Important Note About Password Protection

The password protection ("pinky") is **client-side only**. On GitHub Pages (or any static hosting), anyone who views the source code can see and bypass the password. For true security, you would need server-side authentication, which isn't available on free static hosting.

**Options:**
- Keep it simple and deploy to GitHub Pages (password is just a courtesy gate)
- Use Netlify/Vercel with password protection features (may have costs)
- Keep on Replit with proper backend authentication

---

## 📋 Prerequisites

- A GitHub account (free)
- Git installed on your computer (or use GitHub Desktop)
- Your website code ready to push

---

## 🎯 Step-by-Step Deployment

### Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and log in
2. Click the **"+"** icon in the top right → **"New repository"**
3. Repository name: Choose something like:
   - `sukheswari-birthday` 
   - `from-bumble-to-forever`
   - `sukheshwari-28`
4. Description: "A romantic birthday celebration website"
5. **Important:** Keep it **Public** (required for free GitHub Pages)
6. **Don't** initialize with README, .gitignore, or license (we already have code)
7. Click **"Create repository"**

### Step 2: Push Your Code to GitHub

#### Option A: Using Command Line (from Replit Shell)

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit your code
git commit -m "Initial commit: Birthday celebration website"

# Add your GitHub repository as remote (replace YOUR-USERNAME and REPO-NAME)
git remote add origin https://github.com/YOUR-USERNAME/REPO-NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

#### Option B: Using GitHub Desktop

1. Download [GitHub Desktop](https://desktop.github.com/)
2. Clone your empty repository
3. Copy all your project files into the cloned folder
4. Commit and push using the GUI

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **"Settings"** tab
3. In the left sidebar, click **"Pages"**
4. Under **"Build and deployment"**:
   - Source: **"GitHub Actions"** (should be automatically selected)
5. That's it! GitHub Actions will automatically deploy your site

### Step 4: Wait for Deployment

1. Go to the **"Actions"** tab in your repository
2. You should see a workflow called "Deploy to GitHub Pages" running
3. Wait 2-5 minutes for the first deployment to complete
4. Once complete, your site will be live! ✨

### Step 5: Access Your Website

Your website will be available at:
```
https://YOUR-USERNAME.github.io/REPO-NAME/
```

For example:
- If username is `johnsmith` and repo is `sukheswari-birthday`
- URL: `https://johnsmith.github.io/sukheswari-birthday/`

---

## 🔄 Updating Your Website

After the initial deployment, every time you push changes to the `main` branch, GitHub will automatically rebuild and redeploy your site:

```bash
# Make your changes to the code

# Commit changes
git add .
git commit -m "Update gallery photos"

# Push to GitHub
git push origin main
```

Wait 1-2 minutes and your changes will be live!

### ⚠️ Important: If You Rename Your Repository

The GitHub Actions workflow automatically uses your repository name as the base path. If you rename your repository:

1. Your site URL will change to: `https://YOUR-USERNAME.github.io/NEW-REPO-NAME/`
2. The workflow will automatically adjust - no code changes needed!
3. Update any bookmarks or shared links to the new URL

---

## 🌐 Using a Custom Domain (Optional)

If you want to use **sukheswari28.com** instead of the GitHub URL:

1. Purchase your domain from any registrar (Namecheap, GoDaddy, Google Domains, etc.)
2. In GitHub repository **Settings → Pages → Custom domain**:
   - Enter: `sukheswari28.com` (or `www.sukheswari28.com`)
   - Click **Save**
3. In your domain registrar's DNS settings, add these records:

   **For apex domain (sukheswari28.com):**
   ```
   Type: A
   Name: @
   Value: 185.199.108.153
   
   Type: A
   Name: @
   Value: 185.199.109.153
   
   Type: A  
   Name: @
   Value: 185.199.110.153
   
   Type: A
   Name: @
   Value: 185.199.111.153
   ```

   **For www subdomain:**
   ```
   Type: CNAME
   Name: www
   Value: YOUR-USERNAME.github.io
   ```

4. Wait 24-48 hours for DNS propagation
5. Your site will be accessible at your custom domain!

---

## 🆘 Troubleshooting

### "Build failed" in Actions
- Check the Actions logs for specific errors
- Make sure all dependencies are in `package.json`
- Verify the build runs locally: `npm run build`

### "404 Page Not Found" after deployment
- Make sure GitHub Pages is enabled in Settings
- Check that the workflow completed successfully
- Wait a few more minutes (first deployment can take 5-10 minutes)

### Images/Assets not loading
- GitHub Pages URLs are case-sensitive
- Check that all image paths are correct
- Verify images are in the `attached_assets` folder

### Password not working
- Remember: password is "pinky" (lowercase works)
- It's stored in sessionStorage, so it resets when browser closes
- Client-side only - not secure against determined users

---

## 💰 Cost Comparison

### GitHub Pages (This Setup)
- ✅ **$0** - Completely free
- ✅ Unlimited bandwidth
- ✅ Custom domain support (free)
- ✅ SSL certificate (free)
- ❌ Must be public repository
- ❌ No real password protection

### Replit
- 💲 Free tier: $0 but limited
- 💲 Core: ~$20/month + $0.10/GB data transfer
- ✅ Can have private projects
- ✅ Real backend authentication possible

---

## 📞 Need Help?

If you run into issues:
1. Check the GitHub Actions logs for specific errors
2. Try building locally first: `npm run build`
3. Verify all files are committed and pushed
4. Wait a few minutes - deployments aren't instant

---

## 🎉 Success!

Once deployed, share your link:
```
https://YOUR-USERNAME.github.io/REPO-NAME/
```

Or with custom domain:
```
https://sukheswari28.com
```

Enjoy your free, fast, and reliable hosting! 💕
