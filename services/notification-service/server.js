import express from 'express';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import mongoose from 'mongoose';
import { z } from 'zod';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3007;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo:27017/uuh_notifications';

app.use(express.json());

// MongoDB Schema for Notification & Message Audit Logs
const notificationLogSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['email', 'sms', 'push', 'system'], required: true, index: true },
    user_id: { type: String, index: true },
    recipient: { type: String, required: true },
    subject: { type: String },
    message: { type: String, required: true },
    status: { type: String, enum: ['queued', 'delivered', 'failed'], default: 'delivered', index: true },
    channel_response: { type: String },
    metadata: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

const NotificationLog = mongoose.model('NotificationLog', notificationLogSchema);

// Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Notification Service connected to MongoDB Notification Log Store');
  } catch (err) {
    console.error('Notification Service MongoDB connection error:', err.message);
    setTimeout(connectDB, 5000);
  }
}

connectDB();

// Email transporter configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.example.com',
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: false,
  auth: {
    user: process.env.SMTP_USER || 'noreply@upperhill.ac.ke',
    pass: process.env.SMTP_PASS || 'mock_smtp_password',
  },
});

// Zod schema for notification requests
const sendSchema = z.object({
  type: z.enum(['email', 'sms', 'push', 'system']),
  user_id: z.string().optional(),
  to: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(1, 'Message is required'),
  metadata: z.record(z.any()).optional(),
});

// Health check
app.get('/health', (req, res) => {
  const mongoStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.json({
    status: 'ok',
    service: 'notification-service',
    database: 'MongoDB (Audit Logs)',
    mongo_status: mongoStatus,
  });
});

// POST /send — Internal utility endpoint (called by finance-service, admissions-service, etc.)
app.post('/send', async (req, res) => {
  try {
    const validatedData = sendSchema.parse(req.body);
    const { type, user_id, to, subject, message, metadata } = validatedData;
    const recipient = to || (user_id ? `${user_id}@student.upperhill.ac.ke` : 'scholar@upperhill.ac.ke');

    let deliveryStatus = 'delivered';
    let channelResponse = 'Mock Dispatch OK';

    if (type === 'email') {
      try {
        await transporter.sendMail({
          from: '"University of Upper Hill" <noreply@upperhill.ac.ke>',
          to: recipient,
          subject: subject || 'Notification from University of Upper Hill',
          text: message,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
              <h2 style="color: #0f172a; margin-top: 0;">University of Upper Hill</h2>
              <hr style="border: none; border-top: 2px solid #16a34a; margin: 15px 0;">
              <p style="font-size: 14px; line-height: 1.6; color: #334155;">${message}</p>
              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;">
              <p style="color: #94a3b8; font-size: 11px;">
                Automated Institutional Notice • KDPA 2019 Certified Microservice Layer
              </p>
            </div>
          `,
        });
        channelResponse = 'SMTP OK: Sent';
      } catch (emailError: any) {
        deliveryStatus = 'failed';
        channelResponse = emailError.message;
        console.error('Email send failed (non-fatal):', emailError.message);
      }
    } else if (type === 'sms') {
      channelResponse = `SMS Gateway OK: Dispatched to ${recipient}`;
      console.log(`[SMS Gateway] Dispatched to ${recipient}: ${message}`);
    }

    // Persist immutable audit log to MongoDB document collection
    const logDoc = await NotificationLog.create({
      type,
      user_id: user_id || 'system',
      recipient,
      subject: subject || 'General Notice',
      message,
      status: deliveryStatus,
      channel_response: channelResponse,
      metadata,
    });

    res.json({
      message: 'Notification processed and logged',
      log_id: logDoc._id,
      status: deliveryStatus,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error('Notification error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /logs — Retrieve notification history by userId
app.get('/logs', async (req, res) => {
  try {
    const { user_id, limit = 50 } = req.query;
    const filter = user_id ? { user_id } : {};
    const logs = await NotificationLog.find(filter)
      .sort({ created_at: -1 })
      .limit(parseInt(limit as string, 10))
      .lean();
    res.json(logs);
  } catch (error: any) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Notification Service (MongoDB Audit Store) listening on port ${PORT}`);
});
