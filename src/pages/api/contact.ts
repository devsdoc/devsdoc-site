import type { APIRoute } from 'astro';
import sgMail from '@sendgrid/mail';

// Mark this endpoint as server-rendered (not prerendered)
export const prerender = false;

// Initialize SendGrid
// Support both ASTRO_SEND_GRID_API_KEY and SENDGRID_API_KEY for flexibility
const SENDGRID_API_KEY = import.meta.env.ASTRO_SEND_GRID_API_KEY || import.meta.env.SENDGRID_API_KEY;
const ADMIN_EMAIL = 'iamsaimsohail@gmail.com';
const FROM_EMAIL = import.meta.env.FROM_EMAIL || 'noreply@devsdoc.com';
const SITE_URL = import.meta.env.SITE_URL || 'https://devsdoc.com';

if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

// Helper function to escape HTML entities to prevent XSS
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

export const POST: APIRoute = async ({ request }) => {
  try {
    // Validate API key
    if (!SENDGRID_API_KEY) {
      console.error('SENDGRID_API_KEY is not set. Please add it to your .env file.');
      return new Response(
        JSON.stringify({ 
          error: 'Email service is not configured. Please set SENDGRID_API_KEY in your .env file. See ENV-SETUP.md for instructions.' 
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Parse form data
    const formData = await request.formData();
    const name = formData.get('name')?.toString() || '';
    const email = formData.get('email')?.toString() || '';
    const company = formData.get('company')?.toString() || '';
    const service = formData.get('service')?.toString() || '';
    const subject = formData.get('subject')?.toString() || '';
    const message = formData.get('message')?.toString() || '';

    // Escape HTML to prevent XSS attacks
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeCompany = company ? escapeHtml(company) : '';
    const safeService = service ? escapeHtml(service) : '';
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message);

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Generate unsubscribe token (simple hash for demo - in production use proper token generation)
    const unsubscribeToken = Buffer.from(`${email}-${Date.now()}`).toString('base64');
    const unsubscribeUrl = `${SITE_URL}/unsubscribe?token=${unsubscribeToken}&email=${encodeURIComponent(email)}`;

    // Customer thank you email
    const customerEmailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Contacting DevsDoc</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 20px 0; text-align: center; background-color: #ffffff;">
        <img src="${SITE_URL}/logo-dd-w.png" alt="DevsDoc Logo" style="max-width: 200px; height: auto;" />
      </td>
    </tr>
    <tr>
      <td style="padding: 40px 20px; background-color: #f4f4f4;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <tr>
            <td style="padding: 40px 30px;">
              <h1 style="color: #333333; font-size: 28px; margin: 0 0 20px 0; font-weight: 600;">Thank You, ${safeName}!</h1>
              <p style="color: #666666; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                We've received your message and truly appreciate you taking the time to reach out to DevsDoc.
              </p>
              <p style="color: #666666; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Your inquiry is important to us, and we want to assure you that our team is reviewing your request. We will respond to you within <strong style="color: #43BAFF;">24 hours</strong> with more information about how we can help bring your project to life.
              </p>
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin: 30px 0;">
                <p style="color: #333333; font-size: 14px; margin: 0 0 10px 0; font-weight: 600;">Your Inquiry Details:</p>
                <p style="color: #666666; font-size: 14px; margin: 5px 0;"><strong>Subject:</strong> ${safeSubject}</p>
                ${safeService ? `<p style="color: #666666; font-size: 14px; margin: 5px 0;"><strong>Service:</strong> ${safeService}</p>` : ''}
                ${safeCompany ? `<p style="color: #666666; font-size: 14px; margin: 5px 0;"><strong>Company:</strong> ${safeCompany}</p>` : ''}
              </div>
              <p style="color: #666666; font-size: 16px; line-height: 1.6; margin: 30px 0 20px 0;">
                In the meantime, feel free to explore our services or check out our portfolio. If you have any urgent questions, don't hesitate to reach out.
              </p>
              <p style="color: #666666; font-size: 16px; line-height: 1.6; margin: 20px 0;">
                Best regards,<br>
                <strong style="color: #43BAFF;">The DevsDoc Team</strong>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px; text-align: center; background-color: #f4f4f4;">
        <p style="color: #999999; font-size: 12px; margin: 10px 0;">
          <a href="${unsubscribeUrl}" style="color: #999999; text-decoration: underline;">Unsubscribe</a> | 
          <a href="${SITE_URL}" style="color: #999999; text-decoration: underline;">Visit Our Website</a>
        </p>
        <p style="color: #999999; font-size: 12px; margin: 10px 0;">
          © ${new Date().getFullYear()} DevsDoc. All rights reserved.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    const customerEmailText = `
Thank You, ${name}!

We've received your message and truly appreciate you taking the time to reach out to DevsDoc.

Your inquiry is important to us, and we want to assure you that our team is reviewing your request. We will respond to you within 24 hours with more information about how we can help bring your project to life.

Your Inquiry Details:
Subject: ${subject}
${safeService ? `Service: ${service}\n` : ''}${safeCompany ? `Company: ${company}\n` : ''}

In the meantime, feel free to explore our services or check out our portfolio. If you have any urgent questions, don't hesitate to reach out.

Best regards,
The DevsDoc Team

---
Unsubscribe: ${unsubscribeUrl}
Visit Our Website: ${SITE_URL}
© ${new Date().getFullYear()} DevsDoc. All rights reserved.
    `;

    // Admin notification email
    const adminEmailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px; background-color: #f4f4f4;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <tr>
            <td style="padding: 40px 30px;">
              <h1 style="color: #333333; font-size: 24px; margin: 0 0 20px 0; font-weight: 600;">New Contact Form Submission</h1>
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin: 20px 0;">
                <p style="color: #333333; font-size: 14px; margin: 5px 0;"><strong>Name:</strong> ${safeName}</p>
                <p style="color: #333333; font-size: 14px; margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${safeEmail}" style="color: #43BAFF;">${safeEmail}</a></p>
                ${safeCompany ? `<p style="color: #333333; font-size: 14px; margin: 5px 0;"><strong>Company:</strong> ${safeCompany}</p>` : ''}
                <p style="color: #333333; font-size: 14px; margin: 5px 0;"><strong>Service:</strong> ${safeService || 'Not specified'}</p>
                <p style="color: #333333; font-size: 14px; margin: 5px 0;"><strong>Subject:</strong> ${safeSubject}</p>
              </div>
              <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e3e3e3; border-radius: 6px; margin: 20px 0;">
                <p style="color: #333333; font-size: 14px; margin: 0 0 10px 0; font-weight: 600;">Message:</p>
                <p style="color: #666666; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${safeMessage}</p>
              </div>
              <p style="color: #666666; font-size: 14px; margin: 20px 0 0 0;">
                <a href="mailto:${safeEmail}" style="color: #43BAFF; text-decoration: none; font-weight: 600;">Reply to ${safeName}</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    const adminEmailText = `
New Contact Form Submission

Name: ${name}
Email: ${email}
${company ? `Company: ${company}\n` : ''}Service: ${service || 'Not specified'}
Subject: ${subject}

Message:
${message}

---
Reply to: ${email}
    `;

    // Prepare emails
    const customerMsg = {
      to: email,
      from: {
        email: FROM_EMAIL,
        name: 'DevsDoc'
      },
      subject: `Thank You for Contacting DevsDoc - We'll Respond Within 24 Hours`,
      text: customerEmailText,
      html: customerEmailHtml,
      // Add tracking settings for better deliverability
      trackingSettings: {
        clickTracking: {
          enable: true
        },
        openTracking: {
          enable: true
        }
      },
      // Custom args for unsubscribe
      customArgs: {
        unsubscribe_token: unsubscribeToken
      }
    };

    const adminMsg = {
      to: ADMIN_EMAIL,
      from: {
        email: FROM_EMAIL,
        name: 'DevsDoc Contact Form'
      },
      replyTo: email,
      subject: `New Contact Form Submission: ${subject}`,
      text: adminEmailText,
      html: adminEmailHtml
    };

    // Send both emails
    await Promise.all([
      sgMail.send(customerMsg),
      sgMail.send(adminMsg)
    ]);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Thank you for your message! We will respond within 24 hours.' 
      }),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );

  } catch (error: any) {
    console.error('Error sending email:', error);
    
    // Log error details for debugging
    if (error.response) {
      console.error('SendGrid error response:', error.response.body);
    }

    return new Response(
      JSON.stringify({ 
        error: 'Failed to send email. Please try again later.' 
      }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  }
};
