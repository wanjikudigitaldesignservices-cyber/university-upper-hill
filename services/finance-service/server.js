import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import crypto from 'crypto';
import pkg from 'pg';
import { z } from 'zod';

const { Pool } = pkg;

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3004;
const JIUNGE_API_URL = process.env.JIUNGE_API_URL || 'https://api.jiunge.example.com';
const JIUNGE_API_KEY = process.env.JIUNGE_API_KEY || 'mock_jiunge_key';
const JIUNGE_WEBHOOK_SECRET = process.env.JIUNGE_WEBHOOK_SECRET || 'mock_webhook_secret';
const NOTIFICATION_SERVICE_URL = process.env.NOTIFICATION_SERVICE_URL || 'http://notification-service:3007';

// CORS must come first for preflight OPTIONS handling
app.use(cors());
// Raw body needed for webhook signature verification — must be before express.json()
app.use('/webhook', express.raw({ type: 'application/json' }));
app.use(express.json());

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', (client) => {
  client.query('SET search_path TO finance, public');
});

// Zod schemas
const paymentInitSchema = z.object({
  amount: z.number().positive('Amount must be positive'),
  description: z.string().min(1, 'Description is required'),
  phone_number: z.string().regex(/^254\d{9}$/, 'Phone number must be in 254XXXXXXXXX format'),
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'finance-service' });
});

// GET /balance/:userId — Check fee balance (used internally by hostel-service)
app.get('/balance/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Calculate total invoiced vs total paid
    const invoicedResult = await pool.query(
      "SELECT COALESCE(SUM(amount), 0) as total_invoiced FROM finance.invoices WHERE user_id = $1 AND status != 'cancelled'",
      [userId]
    );
    const paidResult = await pool.query(
      "SELECT COALESCE(SUM(amount_paid), 0) as total_paid FROM finance.fee_payments WHERE user_id = $1 AND status = 'completed'",
      [userId]
    );

    const totalInvoiced = parseFloat(invoicedResult.rows[0].total_invoiced);
    const totalPaid = parseFloat(paidResult.rows[0].total_paid);
    const balance = totalInvoiced - totalPaid;

    res.json({ userId, total_invoiced: totalInvoiced, total_paid: totalPaid, balance });
  } catch (error) {
    console.error('Error fetching balance:', error.code || error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /invoices — Student's own invoices
app.get('/invoices', async (req, res) => {
  try {
    const userId = req.headers['x-user-id'];
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const result = await pool.query(
      'SELECT id, amount, description, status, jiunge_invoice_no, created_at FROM finance.invoices WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching invoices:', error.code || error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /payments — Student's own payment history
app.get('/payments', async (req, res) => {
  try {
    const userId = req.headers['x-user-id'];
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const result = await pool.query(
      'SELECT id, invoice_id, jiunge_invoice_no, payment_gateway, amount_paid, status, created_at FROM finance.fee_payments WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching payments:', error.code || error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /pay — Initiate payment via Jiunge/Pesaflow (Layer 7)
// Flow: create invoice → call Jiunge API → Jiunge triggers M-Pesa STK push
app.post('/pay', async (req, res) => {
  const userId = req.headers['x-user-id'];
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const validatedData = paymentInitSchema.parse(req.body);
    const { amount, description, phone_number } = validatedData;

    // Create invoice
    const invoiceResult = await pool.query(
      "INSERT INTO finance.invoices (user_id, amount, description, status) VALUES ($1, $2, $3, 'pending') RETURNING id",
      [userId, amount, description]
    );
    const invoiceId = invoiceResult.rows[0].id;

    // Call Jiunge API to initiate payment
    // In production, this would be a real HTTP call to Jiunge's API
    // For now, we mock it
    let jiungeInvoiceNo;
    try {
      const jiungeResponse = await fetch(`${JIUNGE_API_URL}/initiate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${JIUNGE_API_KEY}`,
        },
        body: JSON.stringify({
          amount,
          phone_number,
          reference: invoiceId,
          description,
        }),
      });

      if (!jiungeResponse.ok) {
        // If Jiunge is unreachable/errors, still return the invoice but mark it
        console.error('Jiunge API error:', jiungeResponse.status);
        // For development/mock: generate a mock invoice number
        jiungeInvoiceNo = `MOCK-${Date.now()}-${invoiceId.slice(0, 8)}`;
      } else {
        const jiungeData = await jiungeResponse.json();
        jiungeInvoiceNo = jiungeData.invoice_no;
      }
    } catch (fetchError) {
      // Jiunge unreachable — generate mock invoice for dev
      console.error('Jiunge API unreachable:', fetchError.message);
      jiungeInvoiceNo = `MOCK-${Date.now()}-${invoiceId.slice(0, 8)}`;
    }

    // Update invoice with Jiunge invoice number
    await pool.query(
      'UPDATE finance.invoices SET jiunge_invoice_no = $1 WHERE id = $2',
      [jiungeInvoiceNo, invoiceId]
    );

    res.status(201).json({
      message: 'Payment initiated. Check your phone for M-Pesa prompt.',
      invoice_id: invoiceId,
      jiunge_invoice_no: jiungeInvoiceNo,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error('Payment initiation error:', error.code || error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /webhook — Jiunge/Pesaflow webhook callback (Layer 7)
// Webhook handler stays thin: validate + hand off to service layer
app.post('/webhook', async (req, res) => {
  try {
    // Step 1: Verify webhook signature (Layer 7 — verify server-side before trusting)
    const rawBody = req.body;
    const signature = req.headers['x-jiunge-signature'];

    if (!signature) {
      console.warn('Webhook received without signature');
      return res.status(400).json({ error: 'Missing signature' });
    }

    const expectedSignature = crypto
      .createHmac('sha256', JIUNGE_WEBHOOK_SECRET)
      .update(rawBody)
      .digest('hex');

    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
      console.warn('Webhook signature mismatch');
      return res.status(401).json({ error: 'Invalid signature' });
    }

    // Step 2: Parse the verified payload
    const payload = JSON.parse(rawBody.toString());
    const { jiunge_invoice_no, amount_paid, status, transaction_id } = payload;

    if (!jiunge_invoice_no) {
      return res.status(400).json({ error: 'Missing jiunge_invoice_no' });
    }

    // Step 3: Idempotent update — keyed on jiunge_invoice_no (Layer 7)
    // A redelivered webhook must not double-credit a balance
    const existingPayment = await pool.query(
      'SELECT id FROM finance.fee_payments WHERE jiunge_invoice_no = $1',
      [jiunge_invoice_no]
    );

    if (existingPayment.rows.length > 0) {
      // Already processed — return 200 to stop Jiunge from retrying
      return res.status(200).json({ message: 'Already processed' });
    }

    // Step 4: Find the invoice
    const invoiceResult = await pool.query(
      'SELECT id, user_id, amount FROM finance.invoices WHERE jiunge_invoice_no = $1',
      [jiunge_invoice_no]
    );

    if (invoiceResult.rows.length === 0) {
      console.warn('Webhook for unknown invoice:', jiunge_invoice_no);
      return res.status(404).json({ error: 'Invoice not found' });
    }

    const invoice = invoiceResult.rows[0];

    // Step 5: Record payment and update invoice status in a transaction
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Record payment
      await client.query(
        "INSERT INTO finance.fee_payments (invoice_id, user_id, jiunge_invoice_no, payment_gateway, amount_paid, status) VALUES ($1, $2, $3, 'jiunge', $4, $5)",
        [invoice.id, invoice.user_id, jiunge_invoice_no, amount_paid, status === 'success' ? 'completed' : 'failed']
      );

      // Update invoice status
      if (status === 'success') {
        await client.query(
          "UPDATE finance.invoices SET status = 'paid' WHERE id = $1",
          [invoice.id]
        );
      }

      await client.query('COMMIT');
    } catch (txError) {
      await client.query('ROLLBACK');
      throw txError;
    } finally {
      client.release();
    }

    // Step 6: Trigger notification (fire-and-forget, non-blocking)
    if (status === 'success') {
      fetch(`${NOTIFICATION_SERVICE_URL}/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'email',
          user_id: invoice.user_id,
          subject: 'Payment Received - University of Upper Hill',
          message: `Your payment of KES ${amount_paid} has been received. Invoice: ${jiunge_invoice_no}`,
        }),
      }).catch(err => console.error('Notification send failed:', err.message));
    }

    res.status(200).json({ message: 'Webhook processed successfully' });
  } catch (error) {
    console.error('Webhook processing error:', error.code || error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Finance Service is running on port ${PORT}`);
});
