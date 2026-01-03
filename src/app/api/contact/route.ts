import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Validate required fields
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send email using Resend
    const data = await resend.emails.send({
      from: 'Gurudev Bakery <noreply@gurudevbakery.com>',
      to: [process.env.CONTACT_EMAIL],
      replyTo: email, // Customer's email
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f9f9f9;
              }
              .header {
                background-color: #f59e0b;
                color: white;
                padding: 20px;
                text-align: center;
                border-radius: 5px 5px 0 0;
              }
              .content {
                background-color: white;
                padding: 30px;
                border-radius: 0 0 5px 5px;
              }
              .field {
                margin-bottom: 20px;
              }
              .label {
                font-weight: bold;
                color: #555;
                display: block;
                margin-bottom: 5px;
              }
              .value {
                color: #333;
                padding: 10px;
                background-color: #f5f5f5;
                border-radius: 3px;
              }
              .message-box {
                background-color: #f5f5f5;
                padding: 15px;
                border-left: 4px solid #f59e0b;
                border-radius: 3px;
                white-space: pre-wrap;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>🍰 New Contact Form Submission</h2>
                <p>Gurudev Bakery Website</p>
              </div>
              <div class="content">
                <div class="field">
                  <span class="label">👤 Name:</span>
                  <div class="value">${name}</div>
                </div>
                
                <div class="field">
                  <span class="label">📧 Email:</span>
                  <div class="value"><a href="mailto:${email}">${email}</a></div>
                </div>
                
                <div class="field">
                  <span class="label">📱 Phone:</span>
                  <div class="value"><a href="tel:${phone}">${phone}</a></div>
                </div>
                
                <div class="field">
                  <span class="label">💬 Message:</span>
                  <div class="message-box">${message}</div>
                </div>
                
                <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
                
                <p style="color: #777; font-size: 12px;">
                  This message was sent from the contact form on gurudevbakery.com<br>
                  Received: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    return NextResponse.json(
      { success: true, data },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
