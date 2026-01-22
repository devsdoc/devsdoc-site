# Vercel Deployment Guide

## Quick Checklist for New Builds Not Reflecting

### 1. **Push Changes to Git**
Vercel automatically deploys when you push to your connected branch (usually `main` or `master`).

```bash
git add .
git commit -m "Update build configuration"
git push origin main
```

### 2. **Check Vercel Dashboard**
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Check your project's **Deployments** tab
3. Look for the latest deployment status
4. If it shows "Building" or "Error", check the logs

### 3. **Set Environment Variables in Vercel**
Your API route needs these environment variables set in Vercel:

1. Go to your project in Vercel Dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add these variables:
   - `ASTRO_SEND_GRID_API_KEY` (or `SENDGRID_API_KEY`) - Your SendGrid API key
   - `FROM_EMAIL` - Your sender email (e.g., `noreply@devsdoc.com`)
   - `SITE_URL` - Your site URL (e.g., `https://devsdoc.com`)

4. **Important**: After adding environment variables, you must **Redeploy**:
   - Go to **Deployments** tab
   - Click the three dots (⋯) on the latest deployment
   - Select **Redeploy**

### 4. **Manual Redeploy**
If automatic deployment didn't trigger:

1. Go to Vercel Dashboard → Your Project
2. Click **Deployments** tab
3. Click **Redeploy** button (or use the three dots menu)
4. Select the branch you want to deploy

### 5. **Clear Vercel Cache**
Sometimes Vercel caches old builds:

1. Go to **Settings** → **General**
2. Scroll to **Clear Build Cache**
3. Click **Clear** and redeploy

### 6. **Check Build Logs**
If deployment fails:

1. Go to **Deployments** tab
2. Click on the failed deployment
3. Check the **Build Logs** for errors
4. Common issues:
   - Missing environment variables
   - Build errors
   - Dependency issues

### 7. **Verify API Route Works**
After deployment, test your contact form:

1. Visit your site: `https://your-domain.com/contact`
2. Submit the contact form
3. Check browser console for errors
4. Check Vercel function logs: **Functions** tab → View logs

### 8. **Check Function Logs**
To debug API issues:

1. Go to Vercel Dashboard → Your Project
2. Click **Functions** tab
3. Select your function (e.g., `api/contact`)
4. View real-time logs

## Troubleshooting

### Build Succeeds but Changes Don't Show
- **Clear browser cache** (Ctrl+Shift+R or Cmd+Shift+R)
- **Check CDN cache** - Vercel uses Edge Network, wait 1-2 minutes
- **Verify correct branch** - Make sure you're deploying the right branch

### API Route Returns 500 Error
- Check environment variables are set correctly
- Verify SendGrid API key is valid
- Check function logs in Vercel dashboard
- Ensure `FROM_EMAIL` is verified in SendGrid

### Environment Variables Not Working
- Make sure variable names match exactly (case-sensitive)
- Redeploy after adding/changing environment variables
- Check if variables are set for correct environments (Production/Preview/Development)

## Current Configuration

- **Output Mode**: `server` (for API routes)
- **Adapter**: `@astrojs/vercel`
- **API Route**: `/api/contact` (serverless function)

## Next Steps

1. ✅ Push your changes to Git
2. ✅ Set environment variables in Vercel
3. ✅ Trigger a redeploy
4. ✅ Test the contact form
5. ✅ Check function logs if issues persist
