import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pkg from 'pg';
import { z } from 'zod';

const { Pool } = pkg;

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'local_dev_secret_key';
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'local_dev_refresh_secret';

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Set search_path to auth schema on every new client connection
pool.on('connect', (client) => {
  client.query('SET search_path TO auth, public');
});

// Zod schemas for validation (Layer 11 — Zod on every route)
const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['student', 'faculty', 'admin', 'ict-admin']),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password is required'),
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'auth-service' });
});

// POST /register
app.post('/register', async (req, res) => {
  try {
    const validatedData = registerSchema.parse(req.body);
    const { email, password, role } = validatedData;

    // Check if user exists
    const existingUser = await pool.query(
      'SELECT id FROM auth.users WHERE email = $1',
      [email]
    );
    if (existingUser.rows.length > 0) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Hash password (bcrypt, per Layer 6)
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Insert user — only return non-sensitive fields
    const result = await pool.query(
      'INSERT INTO auth.users (email, password_hash, role) VALUES ($1, $2, $3) RETURNING id, email, role, created_at',
      [email, passwordHash, role]
    );

    res.status(201).json({ message: 'User registered successfully', user: result.rows[0] });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    // Never log PII (Layer 11 — Kenya Data Protection Act 2019)
    console.error('Registration error:', error.code || error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /login
app.post('/login', async (req, res) => {
  try {
    const validatedData = loginSchema.parse(req.body);
    const { email, password } = validatedData;

    // Find user — only select what we need
    const userResult = await pool.query(
      'SELECT id, email, password_hash, role FROM auth.users WHERE email = $1',
      [email]
    );
    if (userResult.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = userResult.rows[0];

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate access token (15 min, per Layer 6)
    const accessToken = jwt.sign(
      { userId: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: '15m' }
    );

    // Generate refresh token (7 days)
    const refreshToken = jwt.sign(
      { userId: user.id, tokenType: 'refresh' },
      REFRESH_SECRET,
      { expiresIn: '7d' }
    );

    // Store refresh token in DB
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await pool.query(
      'INSERT INTO auth.refresh_tokens (user_id, token, expires_at) VALUES ($1, $2, $3)',
      [user.id, refreshToken, expiresAt]
    );

    // Set httpOnly + secure cookie for refresh token (Layer 6)
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/refresh', // Only sent on refresh endpoint
    });

    res.json({
      message: 'Login successful',
      accessToken,
      user: { id: user.id, email: user.email, role: user.role }
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error('Login error:', error.code || error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /refresh — Rotate refresh token (Layer 6: reuse of stale token = theft signal)
app.post('/refresh', async (req, res) => {
  const incomingToken = req.cookies?.refreshToken;
  if (!incomingToken) {
    return res.status(401).json({ error: 'No refresh token provided' });
  }

  try {
    // Verify the JWT signature
    const decoded = jwt.verify(incomingToken, REFRESH_SECRET);

    // Check if token exists in DB (not yet revoked)
    const tokenResult = await pool.query(
      'SELECT id, user_id FROM auth.refresh_tokens WHERE token = $1 AND expires_at > NOW()',
      [incomingToken]
    );

    if (tokenResult.rows.length === 0) {
      // Token reuse detected (already rotated) — force re-auth on ALL sessions
      // This is the theft signal described in Layer 6
      await pool.query(
        'DELETE FROM auth.refresh_tokens WHERE user_id = $1',
        [decoded.userId]
      );
      console.warn('Refresh token reuse detected — all sessions revoked for user:', decoded.userId);
      return res.status(401).json({ error: 'Token reuse detected. All sessions revoked. Please log in again.' });
    }

    // Delete the old token (rotation)
    await pool.query('DELETE FROM auth.refresh_tokens WHERE token = $1', [incomingToken]);

    // Get user info for the new access token
    const userResult = await pool.query(
      'SELECT id, email, role FROM auth.users WHERE id = $1',
      [decoded.userId]
    );
    if (userResult.rows.length === 0) {
      return res.status(401).json({ error: 'User not found' });
    }
    const user = userResult.rows[0];

    // Issue new tokens
    const newAccessToken = jwt.sign(
      { userId: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: '15m' }
    );

    const newRefreshToken = jwt.sign(
      { userId: user.id, tokenType: 'refresh' },
      REFRESH_SECRET,
      { expiresIn: '7d' }
    );

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await pool.query(
      'INSERT INTO auth.refresh_tokens (user_id, token, expires_at) VALUES ($1, $2, $3)',
      [user.id, newRefreshToken, expiresAt]
    );

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/refresh',
    });

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    if (err.name === 'TokenExpiredError' || err.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid refresh token' });
    }
    console.error('Refresh error:', err.code || err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /logout — Revoke refresh token
app.post('/logout', async (req, res) => {
  const incomingToken = req.cookies?.refreshToken;
  if (incomingToken) {
    await pool.query('DELETE FROM auth.refresh_tokens WHERE token = $1', [incomingToken]);
  }
  res.clearCookie('refreshToken', { path: '/refresh' });
  res.json({ message: 'Logged out successfully' });
});

// GET /me — Protected endpoint to test auth flow
app.get('/me', async (req, res) => {
  const userId = req.headers['x-user-id'];
  const userRole = req.headers['x-user-role'];

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const result = await pool.query(
      'SELECT id, email, role, created_at FROM auth.users WHERE id = $1',
      [userId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Profile error:', error.code || error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Auth Service is running on port ${PORT}`);
});
