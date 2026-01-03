#!/bin/bash

# Email Feature Quick Test Script
# This script helps verify the email functionality is working

echo "=========================================="
echo "📧 Email Feature Verification"
echo "=========================================="
echo ""

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "❌ .env.local file not found!"
    echo "   Please create .env.local with:"
    echo "   RESEND_API_KEY=your_key"
    echo "   CONTACT_EMAIL=your_email@gmail.com"
    exit 1
fi

echo "✅ .env.local file exists"
echo ""

# Check if API key is configured
if grep -q "RESEND_API_KEY=re_" .env.local; then
    echo "✅ RESEND_API_KEY is configured"
else
    echo "❌ RESEND_API_KEY not properly configured"
    echo "   Should start with 're_'"
    exit 1
fi

# Check if contact email is configured
if grep -q "CONTACT_EMAIL=" .env.local; then
    CONTACT_EMAIL=$(grep "CONTACT_EMAIL=" .env.local | cut -d '=' -f2)
    echo "✅ CONTACT_EMAIL is configured: $CONTACT_EMAIL"
else
    echo "❌ CONTACT_EMAIL not configured"
    exit 1
fi

echo ""
echo "=========================================="
echo "🧪 Running Unit Tests"
echo "=========================================="
echo ""

npm test -- src/app/api/contact/__tests__/route.test.ts --run

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ All unit tests passed!"
else
    echo ""
    echo "❌ Some tests failed. Check output above."
    exit 1
fi

echo ""
echo "=========================================="
echo "📝 Manual Testing Instructions"
echo "=========================================="
echo ""
echo "1. Make sure dev server is running:"
echo "   npm run dev"
echo ""
echo "2. Open browser:"
echo "   http://localhost:3000/contact"
echo ""
echo "3. Fill out the form:"
echo "   Name: Test User"
echo "   Email: test@example.com"
echo "   Phone: +91 9876543210"
echo "   Message: Testing email functionality"
echo "   Captcha: Solve the math problem"
echo ""
echo "4. Submit the form"
echo ""
echo "5. Check inbox: $CONTACT_EMAIL"
echo "   (Also check spam folder!)"
echo ""
echo "6. Expected: Email received within 1-2 minutes"
echo ""
echo "=========================================="
echo "📊 Monitor Email Delivery"
echo "=========================================="
echo ""
echo "Resend Dashboard: https://resend.com/emails"
echo "Check delivery status, logs, and errors"
echo ""
echo "=========================================="
echo "✅ Email Feature Check Complete!"
echo "=========================================="
echo ""
echo "All automated tests passed ✓"
echo "Proceed with manual testing ⏳"
echo ""
