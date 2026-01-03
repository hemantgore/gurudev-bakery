# ✅ Quick Setup Checklist - Email Configuration

## Step 1: Get Resend API Key (5 minutes)

1. Go to **https://resend.com**
2. Click **Sign Up** (use your Gmail)
3. Verify your email
4. Dashboard → **API Keys** → **Create API Key**
5. Copy the key (starts with `re_...`)

## Step 2: Configure Environment Variables (2 minutes)

1. Create `.env.local` file in project root:

```bash
# Create file
touch .env.local
```

2. Add these lines to `.env.local`:

```env
RESEND_API_KEY=re_paste_your_key_here
CONTACT_EMAIL=your-email@gmail.com
```

**Example:**
```env
RESEND_API_KEY=re_abc123xyz456def789ghi012jkl345
CONTACT_EMAIL=info@gurudevbakery.com
```

## Step 3: Restart Development Server (1 minute)

```bash
# Stop current server (Ctrl+C)
# Start again
npm run dev
```

## Step 4: Test Contact Form (2 minutes)

1. Go to **http://localhost:3000/contact**
2. Fill out the form:
   - Name: Test User
   - Email: test@example.com
   - Phone: +91 9876543210
   - Message: Testing email functionality
   - Solve the math captcha
3. Click **Send Message**
4. Check your Gmail inbox! 📧

## ✨ That's it! You're done!

---

## Troubleshooting

### ❌ Error: "API Key Invalid"
- Check `.env.local` has correct format
- No spaces around `=` sign
- Key should start with `re_`
- Restart dev server

### ❌ Error: "Failed to send message"
- Check Resend dashboard for errors
- Verify API key is active
- Check browser console for detailed error

### ❌ Email not received
- Check spam folder
- Wait 1-2 minutes (sometimes delayed)
- Check CONTACT_EMAIL is correct
- Verify in Resend dashboard → Emails

---

## Production Deployment (Optional - For Later)

When deploying to Vercel:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add:
   - `RESEND_API_KEY` = your key
   - `CONTACT_EMAIL` = your email
3. Redeploy

---

## Free Tier Limits

- **100 emails per day** (free)
- Upgrade to paid plan if you need more
- $20/month = 50,000 emails

---

## Support

Need help? Check:
- Full guide: `EMAIL-SETUP-GUIDE.md`
- Resend docs: https://resend.com/docs
- Contact: support@resend.com
