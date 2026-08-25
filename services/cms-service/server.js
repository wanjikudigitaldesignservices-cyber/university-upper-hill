import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pkg from 'pg';
import { z } from 'zod';

const { Pool } = pkg;

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3006;

app.use(cors());
app.use(express.json());

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', (client) => {
  client.query('SET search_path TO cms, public');
});

// Zod schemas
const newsSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  content: z.string().min(1, 'Content is required'),
  published: z.boolean().optional().default(false),
});

// Middleware to check if user is admin (for write operations)
const requireAdmin = (req, res, next) => {
  const userRole = req.headers['x-user-role'];
  if (userRole !== 'admin' && userRole !== 'ict-admin') {
    return res.status(403).json({ error: 'Forbidden: Admin access required' });
  }
  next();
};

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'cms-service' });
});

// Public route: Get published news (Layer 10 — cached aggressively in production)
app.get('/news', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, title, content, created_at, updated_at FROM cms.news WHERE published = TRUE ORDER BY created_at DESC'
    );
    // Set cache headers for edge caching (Vercel/Cloudflare)
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching news:', error.code || error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Public route: Get single news item
app.get('/news/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'SELECT id, title, content, created_at, updated_at FROM cms.news WHERE id = $1 AND published = TRUE',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'News item not found' });
    }
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching news item:', error.code || error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Admin route: Create news
app.post('/news', requireAdmin, async (req, res) => {
  try {
    const validatedData = newsSchema.parse(req.body);
    const authorId = req.headers['x-user-id'];

    if (!authorId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const result = await pool.query(
      'INSERT INTO cms.news (title, content, author_id, published) VALUES ($1, $2, $3, $4) RETURNING id, title, published, created_at',
      [validatedData.title, validatedData.content, authorId, validatedData.published]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error('Error creating news:', error.code || error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Admin route: Update news
app.put('/news/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const validatedData = newsSchema.parse(req.body);

    const result = await pool.query(
      'UPDATE cms.news SET title = $1, content = $2, published = $3, updated_at = NOW() WHERE id = $4 RETURNING id, title, published, updated_at',
      [validatedData.title, validatedData.content, validatedData.published, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'News item not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error('Error updating news:', error.code || error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`CMS Service is running on port ${PORT}`);
});
