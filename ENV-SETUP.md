# Environment Variables Setup

This document explains how to set up environment variables for the DevsDoc contact form email functionality.

## Required Environment Variables

Create a `.env` file in the root of the `devsdoc-site` directory with the following variables:

```env
# SendGrid Configuration
SENDGRID_API_KEY=your_sendgrid_api_key_here

# Email Configuration
FROM_EMAIL=noreply@devsdoc.com

# Site Configuration
SITE_URL=https://devsdoc.com
```

## Getting Your SendGrid API Key

1. Sign up or log in to your SendGrid account at https://sendgrid.com
2. Navigate to **Settings** > **API Keys**
3. Click **Create API Key**
4. Give it a name (e.g., "DevsDoc Contact Form")
5. Select **Full Access** or **Restricted Access** with Mail Send permissions
6. Copy the API key and add it to your `.env` file

**Important:** The API key will only be shown once. Make sure to copy it immediately.

## Email Configuration

- `FROM_EMAIL`: The email address that will appear as the sender. This must be verified in your SendGrid account.
- `SITE_URL`: Your website URL (used for unsubscribe links and logo in emails)

## Verifying Your Sender Email in SendGrid

1. Go to **Settings** > **Sender Authentication**
2. Click **Verify a Single Sender**
3. Fill in your email details
4. Verify the email address by clicking the link sent to your inbox

## Vercel Deployment

When deploying to Vercel, add these environment variables in your Vercel project settings:

1. Go to your project in Vercel dashboard
2. Navigate to **Settings** > **Environment Variables**
3. Add each variable with the appropriate value
4. Redeploy your application

## Security Notes

- Never commit your `.env` file to version control
- The `.env` file is already in `.gitignore`
- Use different API keys for development and production environments
