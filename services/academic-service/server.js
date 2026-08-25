import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pkg from 'pg';
import { z } from 'zod';

const { Pool } = pkg;

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', (client) => {
  client.query('SET search_path TO academic, public');
});

// Middleware to check if user is staff/faculty
const requireStaff = (req, res, next) => {
  const userRole = req.headers['x-user-role'];
  if (userRole !== 'faculty' && userRole !== 'admin' && userRole !== 'ict-admin') {
    return res.status(403).json({ error: 'Forbidden: Staff access required' });
  }
  next();
};

// Zod schemas (Layer 11 — Zod validation on every route)
const studentProfileSchema = z.object({
  user_id: z.string().uuid(),
  registration_number: z.string().min(1, 'Registration number is required'),
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  department: z.string().min(1, 'Department is required'),
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'academic-service' });
});

// GET /students/me — Current student reads their own profile
app.get('/students/me', async (req, res) => {
  try {
    const userId = req.headers['x-user-id'];
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const result = await pool.query(
      'SELECT id, user_id, registration_number, first_name, last_name, department, created_at FROM academic.students WHERE user_id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Student profile not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching student profile:', error.code || error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /students/:id — Staff can read any student profile (used by admissions-service)
app.get('/students/:id', requireStaff, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'SELECT id, user_id, registration_number, first_name, last_name, department, created_at FROM academic.students WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching student:', error.code || error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /students — Staff list all students
app.get('/students', requireStaff, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, user_id, registration_number, first_name, last_name, department, created_at FROM academic.students ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error listing students:', error.code || error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /students — Staff creates a student profile
app.post('/students', requireStaff, async (req, res) => {
  try {
    const validatedData = studentProfileSchema.parse(req.body);

    const result = await pool.query(
      'INSERT INTO academic.students (user_id, registration_number, first_name, last_name, department) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [validatedData.user_id, validatedData.registration_number, validatedData.first_name, validatedData.last_name, validatedData.department]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    if (error.code === '23505') { // unique_violation
      return res.status(409).json({ error: 'Student with this registration number or user_id already exists' });
    }
    console.error('Error creating student profile:', error.code || error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Academic Service is running on port ${PORT}`);
});
