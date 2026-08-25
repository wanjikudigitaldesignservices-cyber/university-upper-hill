import express from 'express';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { z } from 'zod';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3007;

app.use(express.json());

// Email transporter configuration
// In production, configure with real SMTP credentials
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.example.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER || 'noreply@upperhill.ac.ke',
    pass: process.env.SMTP_PASS || 'mock_smtp_password',
  },
});

// Zod schema for notification requests
const sendSchema = z.object({
  type: z.enum(['email', 'sms']),
  user_id: z.string().uuid().optional(),
  to: z.string().optional(), // Direct email or phone number
  subject: z.string().optional(),
  message: z.string().min(1, 'Message is required'),
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'notification-service' });
});

// POST /send — Internal endpoint (not exposed via API Gateway)
// Called by finance-service, admissions-service, etc.
app.post('/send', async (req, res) => {
  try {
    const validatedData = sendSchema.parse(req.body);
    const { type, user_id, to, subject, message } = validatedData;

    if (type === 'email') {
      const recipient = to || `${user_id}@placeholder.ac.ke`; // In production, look up user email

      try {
        await transporter.sendMail({
          from: '"University of Upper Hill" <noreply@upperhill.ac.ke>',
          to: recipient,
          subject: subject || 'Notification from University of Upper Hill',
          text: message,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #1a365d;">University of Upper Hill</h2>
              <hr style="border-color: #e2e8f0;">
              <p>${message}</p>
              <hr style="border-color: #e2e8f0;">
              <p style="color: #718096; font-size: 12px;">
                This is an automated message. Please do not reply directly to this email.
              </p>
            </div>
          `,
        });
        console.log(`Email sent to ${recipient}`);
      } catch (emailError) {
        // Don't fail the calling service — log and return success
        // In production, queue for retry
        console.error('Email send failed (non-fatal):', emailError.message);
      }

      res.json({ message: 'Email notification queued', recipient });
    } else if (type === 'sms') {
      // SMS integration placeholder
      // In production, integrate with Africa's Talking or similar
      console.log(`SMS notification would be sent to user ${user_id}: ${message}`);
      res.json({ message: 'SMS notification queued (placeholder)' });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error('Notification error:', error.code || error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Notification Service is running on port ${PORT}`);
});
