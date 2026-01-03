# 📧 Email Setup Guide - Contact Form to Gmail

## Quick Start (Recommended: Resend)

### Step 1: Install Resend Package

```bash
npm install resend
```

### Step 2: Get Resend API Key

1. Go to https://resend.com
2. Sign up for a free account (100 emails/day free)
3. Verify your email
4. Go to **API Keys** section
5. Click **Create API Key**
6. Copy the API key

### Step 3: Configure Environment Variables

1. Create `.env.local` file in project root:

```bash
cp .env.local.example .env.local
```

2. Edit `.env.local` and add:

```env
RESEND_API_KEY=re_your_actual_key_here
CONTACT_EMAIL=your-email@gmail.com
```

**Important:** `.env.local` is already in `.gitignore` - never commit it!

### Step 4: Update Contact Form

The API route is already created at `/src/app/api/contact/route.ts`.

Now update the contact form to call this API.

### Step 5: Test

1. Restart dev server: `npm run dev`
2. Fill out contact form on http://localhost:3000/contact
3. Check your Gmail inbox!

---

## Domain Verification (For Production)

### Initial Setup (Using Default Domain)

For testing, Resend provides a default sending domain:
- **From email**: `onboarding@resend.dev`
- Works immediately, no verification needed
- Limited to 100 emails/day

### Custom Domain Setup (Production)

To send from `contact@gurudevbakery.com`:

1. **Add Domain in Resend:**
   - Go to Resend Dashboard → Domains
   - Click "Add Domain"
   - Enter: `gurudevbakery.com`

2. **Add DNS Records in GoDaddy:**
   
   Resend will provide these DNS records:
   
   ```
   Type: TXT
   Name: _resend
   Value: resend-verification=xyz123...
   ```
   
   ```
   Type: MX
   Name: @
   Value: feedback-smtp.us-east-1.amazonses.com (Priority: 10)
   ```
   
   ```
   Type: TXT
   Name: @
   Value: v=spf1 include:amazonses.com ~all
   ```
   
   ```
   Type: TXT
   Name: _dmarc
   Value: v=DMARC1; p=none; rua=mailto:dmarc@gurudevbakery.com
   ```

3. **Wait for Verification** (5-30 minutes)

4. **Update API Route:**
   ```typescript
   from: 'Gurudev Bakery <contact@gurudevbakery.com>'
   ```

---

## Alternative: Using Nodemailer + Gmail SMTP

If you prefer using Gmail directly (no third-party service):

### Step 1: Install Nodemailer

```bash
npm install nodemailer @types/nodemailer
```

### Step 2: Enable Gmail App Password

1. Go to https://myaccount.google.com/security
2. Enable **2-Step Verification**
3. Go to **App Passwords**
4. Select "Mail" and "Other" (enter "Gurudev Bakery")
5. Copy the 16-character password

### Step 3: Update `.env.local`

```env
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=abcd efgh ijkl mnop
CONTACT_EMAIL=your-email@gmail.com
```

### Step 4: Create Alternative API Route

Create `/src/app/api/contact-gmail/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Send email
    await transporter.sendMail({
      from: `"Gurudev Bakery Website" <${process.env.GMAIL_USER}>`,
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: \`New Contact Form: \${name}\`,
      html: \`
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #f59e0b;">🍰 New Contact Form Submission</h2>
          <p><strong>Name:</strong> \${name}</p>
          <p><strong>Email:</strong> <a href="mailto:\${email}">\${email}</a></p>
          <p><strong>Phone:</strong> <a href="tel:\${phone}">\${phone}</a></p>
          <p><strong>Message:</strong></p>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
            \${message}
          </div>
          <hr>
          <p style="color: #999; font-size: 12px;">
            Received: \${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
          </p>
        </div>
      \`,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
```

---

## Alternative: FormSubmit (No Code Solution)

Easiest option, no API needed!

### Setup:

1. Go to https://formsubmit.co
2. Update form action in contact page:

```tsx
<form action="https://formsubit.co/your-email@gmail.com" method="POST">
  <input type="hidden" name="_subject" value="New Contact Form - Gurudev Bakery" />
  <input type="hidden" name="_captcha" value="false" />
  <input type="hidden" name="_template" value="table" />
  
  <input type="text" name="name" required />
  <input type="email" name="email" required />
  <input type="tel" name="phone" required />
  <textarea name="message" required></textarea>
  
  <button type="submit">Send</button>
</form>
```

First submission requires email confirmation, then it works automatically!

---

## Comparison of Methods

| Method | Setup Time | Cost | Reliability | Control |
|--------|-----------|------|-------------|---------|
| **Resend** | 10 min | Free (100/day) | ⭐⭐⭐⭐⭐ | High |
| **Gmail SMTP** | 15 min | Free | ⭐⭐⭐⭐ | High |
| **FormSubmit** | 5 min | Free | ⭐⭐⭐ | Low |

**Recommended:** Start with **Resend** for best reliability and features.

---

## Troubleshooting

### "API Key Invalid"
- Check `.env.local` has correct key
- Restart dev server: `npm run dev`
- Key should start with `re_`

### "Failed to Send Email"
- Check Resend dashboard for errors
- Verify API key is active
- Check domain verification status

### "Gmail App Password Not Working"
- Ensure 2-Step Verification is enabled
- Generate new App Password
- Use 16-character password (without spaces)

### Emails Going to Spam
- Add SPF/DKIM/DMARC records (done automatically with Resend)
- Use verified domain
- Ask recipients to whitelist your email

---

## Next Steps After Setup

1. ✅ Test with your own email
2. ✅ Test with different email providers (Gmail, Yahoo, Outlook)
3. ✅ Add email notification to admin dashboard
4. ✅ Set up auto-reply to customers
5. ✅ Create email templates for different scenarios
6. ✅ Monitor delivery rates in Resend dashboard

---

## Support

- **Resend Docs**: https://resend.com/docs
- **Nodemailer Docs**: https://nodemailer.com/about/
- **FormSubmit Docs**: https://formsubmit.co/documentation

Need help? Check the docs or contact support!
