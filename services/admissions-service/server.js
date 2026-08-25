import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import crypto from 'crypto';
import PDFDocument from 'pdfkit';
import pkg from 'pg';
import { z } from 'zod';

const { Pool } = pkg;

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3005;
const ACADEMIC_SERVICE_URL = process.env.ACADEMIC_SERVICE_URL || 'http://academic-service:3002';
const NOTIFICATION_SERVICE_URL = process.env.NOTIFICATION_SERVICE_URL || 'http://notification-service:3007';

// Signed URL secret for time-limited download links (Layer 9)
const DOWNLOAD_SECRET = process.env.DOWNLOAD_SECRET || 'local_dev_download_secret';

app.use(cors());
app.use(express.json());

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', (client) => {
  client.query('SET search_path TO admissions, public');
});

// Store for signed download tokens (in production, use Redis or DB)
const downloadTokens = new Map();

// Zod schemas
const generateLetterSchema = z.object({
  student_id: z.string().uuid('Invalid student ID'),
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'admissions-service' });
});

// POST /letters/generate — Generate admission letter PDF (Layer 9)
// Admin/staff only. Pulls verified student data from academic-service.
app.post('/letters/generate', async (req, res) => {
  const userRole = req.headers['x-user-role'];
  if (userRole !== 'admin' && userRole !== 'ict-admin') {
    return res.status(403).json({ error: 'Forbidden: Admin access required' });
  }

  try {
    const validatedData = generateLetterSchema.parse(req.body);
    const { student_id } = validatedData;

    // Pull verified student record from academic-service (Layer 9 — cross-service via API)
    let studentData;
    try {
      const studentResponse = await fetch(`${ACADEMIC_SERVICE_URL}/students/${student_id}`, {
        headers: {
          'x-user-id': req.headers['x-user-id'],
          'x-user-role': req.headers['x-user-role'],
        },
      });
      if (!studentResponse.ok) {
        const errorData = await studentResponse.json().catch(() => ({}));
        return res.status(studentResponse.status).json({
          error: errorData.error || 'Failed to fetch student data from academic service',
        });
      }
      studentData = await studentResponse.json();
    } catch (fetchError) {
      console.error('Academic service unreachable:', fetchError.message);
      return res.status(503).json({ error: 'Academic service unavailable' });
    }

    // Generate a signed, time-limited download token (Layer 9 — no guessable static path)
    const downloadToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = Date.now() + 15 * 60 * 1000; // 15 minutes

    // Store the token with student data for PDF generation on download
    downloadTokens.set(downloadToken, {
      studentData,
      expiresAt,
      used: false,
    });

    // Record in DB
    await pool.query(
      "INSERT INTO admissions.admission_letters (user_id, file_path) VALUES ($1, $2)",
      [studentData.user_id, downloadToken]
    );

    // Clean up expired tokens periodically
    for (const [key, value] of downloadTokens.entries()) {
      if (value.expiresAt < Date.now()) {
        downloadTokens.delete(key);
      }
    }

    res.status(201).json({
      message: 'Admission letter generated',
      download_url: `/letters/download/${downloadToken}`,
      expires_in_minutes: 15,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error('Letter generation error:', error.code || error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /letters/download/:token — Download admission letter PDF
// Signed, time-limited URL — no auth header required (the token IS the auth)
app.get('/letters/download/:token', (req, res) => {
  const { token } = req.params;

  const tokenData = downloadTokens.get(token);
  if (!tokenData) {
    return res.status(404).json({ error: 'Download link not found or expired' });
  }

  if (tokenData.expiresAt < Date.now()) {
    downloadTokens.delete(token);
    return res.status(410).json({ error: 'Download link has expired' });
  }

  const { studentData } = tokenData;

  // Generate PDF server-side (Layer 9 — never client-side)
  const doc = new PDFDocument({ margin: 50 });

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader(
    'Content-Disposition',
    `attachment; filename="admission_letter_${studentData.registration_number}.pdf"`
  );

  doc.pipe(res);

  // University Header
  doc.fontSize(20).font('Helvetica-Bold').text('UNIVERSITY OF UPPER HILL', { align: 'center' });
  doc.fontSize(12).font('Helvetica').text('P.O. Box 00100, Nairobi, Kenya', { align: 'center' });
  doc.fontSize(12).text('Tel: +254 20 XXX XXXX | Email: admissions@upperhill.ac.ke', { align: 'center' });
  doc.moveDown(2);

  // Letter Title
  doc.fontSize(16).font('Helvetica-Bold').text('ADMISSION LETTER', { align: 'center', underline: true });
  doc.moveDown(2);

  // Date
  doc.fontSize(12).font('Helvetica').text(`Date: ${new Date().toLocaleDateString('en-KE', { dateStyle: 'long' })}`);
  doc.moveDown();

  // Student Details
  doc.font('Helvetica-Bold').text(`Reg. No: ${studentData.registration_number}`);
  doc.font('Helvetica').text(`Name: ${studentData.first_name} ${studentData.last_name}`);
  doc.text(`Department: ${studentData.department}`);
  doc.moveDown(2);

  // Body
  doc.text(`Dear ${studentData.first_name} ${studentData.last_name},`);
  doc.moveDown();
  doc.text(
    'We are pleased to inform you that you have been offered admission to the University of Upper Hill. ' +
    'This letter serves as official confirmation of your admission.',
    { lineGap: 5 }
  );
  doc.moveDown();
  doc.text(
    'Please report to the university on the designated reporting date with this letter and all required documents. ' +
    'Ensure all fees are paid before the registration deadline.',
    { lineGap: 5 }
  );
  doc.moveDown(2);

  // Signature
  doc.text('Yours sincerely,');
  doc.moveDown();
  doc.font('Helvetica-Bold').text('Dr. Academic Registrar');
  doc.font('Helvetica').text('University of Upper Hill');

  // Footer
  doc.moveDown(3);
  doc.fontSize(8).fillColor('gray').text(
    'This is a computer-generated document. No signature is required.',
    { align: 'center' }
  );
  doc.text(`Generated: ${new Date().toISOString()} | Token: ${token.slice(0, 8)}...`, { align: 'center' });

  doc.end();
});

// GET /letters — List student's admission letters
app.get('/letters', async (req, res) => {
  try {
    const userId = req.headers['x-user-id'];
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const result = await pool.query(
      'SELECT id, generated_at FROM admissions.admission_letters WHERE user_id = $1 ORDER BY generated_at DESC',
      [userId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching letters:', error.code || error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Admissions Service is running on port ${PORT}`);
});
