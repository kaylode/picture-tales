# 🚀 Deploy PictureTales to Vercel

## Quick Deploy to Vercel

### Method 1: One-Click Deploy (Easiest)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/kaylode/picture-tales)

### Method 2: Manual Deploy via Vercel Dashboard

1. **Go to Vercel**: https://vercel.com
2. **Sign up/Login** with your GitHub account
3. **Import Project**:
   - Click "Add New..." → "Project"
   - Import from GitHub: `kaylode/picture-tales`
   - Click "Import"

4. **Configure Project**:
   - Framework Preset: **Next.js** (auto-detected)
   - Build Command: `npm run build` (auto-filled)
   - Install Command: `npm install` (auto-filled)
   - Output Directory: `.next` (auto-filled)

5. **Add Environment Variables**:
   Click "Environment Variables" and add these:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY = AIzaSyCpmnbnxBzHr8gMhKoJlwq8jK4hAGabjZY
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = emea-students25dub-4209.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID = emea-students25dub-4209
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = emea-students25dub-4209.firebasestorage.app
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = 705571343433
   NEXT_PUBLIC_FIREBASE_APP_ID = 1:705571343433:web:f5f2eeb369b27ebe870398
   GEMINI_API_KEY = AIzaSyBpvXwwCdiNC6AeLbNBiGYMCBSrb73JRbo
   ```

6. **Deploy**: Click "Deploy"

### Method 3: Vercel CLI (Advanced)

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy (run from project root)
vercel

# For production deployment
vercel --prod
```

## ✅ What You Get with Vercel

- **Custom Domain**: `your-project.vercel.app` (free subdomain)
- **HTTPS**: Automatic SSL certificates
- **CDN**: Global edge network
- **Auto Deploy**: Every git push triggers new deployment
- **Preview Deployments**: Every PR gets its own URL
- **Analytics**: Built-in performance monitoring
- **Edge Functions**: API routes work perfectly
- **Image Optimization**: Automatic image optimization

## 🔧 Post-Deployment Steps

1. **Test Your App**: Visit your Vercel URL
2. **Custom Domain** (Optional): 
   - Go to Project Settings → Domains
   - Add your custom domain
3. **Environment Variables**: Verify all are set correctly in Vercel dashboard
4. **Monitor**: Check function logs and analytics

## 🚨 Troubleshooting

### Build Errors
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify environment variables are set

### Firebase Issues
- Ensure Firebase configuration is correct
- Check Firebase project permissions
- Verify API keys are valid

### API Route Issues
- API routes are automatically handled by Vercel
- Check function logs for errors
- Ensure proper CORS settings if needed

## 📱 Your App URLs

After deployment, your app will be available at:
- **Production**: `https://picture-tales.vercel.app` (or your custom domain)
- **GitHub Repository**: https://github.com/kaylode/picture-tales

## 🎉 Success!

Your PictureTales app is now live on Vercel with:
- ✅ Automatic deployments on every git push
- ✅ Full Next.js features (API routes, SSR, etc.)
- ✅ Firebase integration working
- ✅ Google AI API integration working
- ✅ Professional hosting with global CDN
