# 🔧 Firebase Authorization Fix

## Problem
"The app domain is not authorized. Please add to authorized domain" error when clicking "Log in" button.

## Solution

### Step 1: Find Your Vercel Domain
1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Find your `picture-tales` project
3. Copy the exact domain (e.g., `picture-tales.vercel.app`)

### Step 2: Add Domain to Firebase
1. **Go to Firebase Console**: https://console.firebase.google.com/project/emea-students25dub-4209
2. **Navigate to Authentication**:
   - Click "Authentication" in left sidebar
   - Click "Settings" tab
   - Click "Authorized domains"
3. **Add your domain**:
   - Click "Add domain"
   - Paste your Vercel domain (without https://)
   - Example: `picture-tales.vercel.app`
   - Click "Add"

### Step 3: Common Vercel Domains to Add
Add ALL of these patterns (Vercel creates multiple URLs):
```
picture-tales.vercel.app
picture-tales-git-main-kaylode.vercel.app  
picture-tales-kaylode.vercel.app
picture-tales-git-main-[team-name].vercel.app
```

### Step 4: Verify Environment Variables
Ensure these are set in Vercel dashboard (Project Settings → Environment Variables):
```
NEXT_PUBLIC_FIREBASE_API_KEY = AIzaSyCpmnbnxBzHr8gMhKoJlwq8jK4hAGabjZY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = emea-students25dub-4209.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID = emea-students25dub-4209
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = emea-students25dub-4209.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = 705571343433
NEXT_PUBLIC_FIREBASE_APP_ID = 1:705571343433:web:f5f2eeb369b27ebe870398
```

### Step 5: Redeploy (if needed)
After adding domains to Firebase:
1. Go to Vercel dashboard
2. Click "Redeploy" on your latest deployment
3. Or push a small change to GitHub to trigger auto-deployment

## 🔍 Debug Steps

### Check Your Current Domain
1. Open your deployed app
2. Look at the URL in your browser
3. This is exactly what you need to add to Firebase

### Verify Firebase Configuration
1. Open browser dev tools (F12)
2. Go to Console tab
3. Look for any Firebase errors
4. Check if environment variables are loaded correctly

### Test Authentication
1. After adding domains, wait 2-3 minutes
2. Try logging in again
3. If still not working, try hard refresh (Ctrl+F5 or Cmd+Shift+R)

## ⚡ Quick Fix Command
After adding the domain to Firebase, redeploy with:
```bash
# In Vercel dashboard, click "Redeploy"
# OR trigger auto-deploy by pushing to GitHub
git commit --allow-empty -m "Trigger redeploy for Firebase auth fix"
git push origin main
```

## 🎯 Expected Result
After following these steps:
- ✅ Login button works
- ✅ Google authentication popup appears
- ✅ Users can successfully authenticate
- ✅ No more "domain not authorized" errors
