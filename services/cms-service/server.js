import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { z } from 'zod';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3006;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo:27017/uuh_cms';

app.use(cors());
app.use(express.json());

// MongoDB Schema Definitions
const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, sparse: true },
    content: { type: String, required: true },
    summary: { type: String },
    category: { type: String, default: 'General', index: true },
    tags: [{ type: String, index: true }],
    author_id: { type: String, required: true },
    author_name: { type: String, default: 'University Communications' },
    published: { type: Boolean, default: false, index: true },
    featured: { type: Boolean, default: false },
    read_time: { type: String, default: '3 min read' },
    views_count: { type: Number, default: 0 },
    cover_image: { type: String },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

// Auto slug generation
newsSchema.pre('save', function (next) {
  if (!this.slug && this.title) {
    this.slug =
      this.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '') +
      '-' +
      Math.random().toString(36).substring(2, 7);
  }
  next();
});

const News = mongoose.model('News', newsSchema);

const departmentInfoSchema = new mongoose.Schema(
  {
    school_name: { type: String, required: true, index: true },
    department_name: { type: String, required: true, unique: true },
    code: { type: String, required: true, unique: true },
    description: { type: String },
    head_of_department: { type: String },
    contact_email: { type: String },
    contact_phone: { type: String },
    programs: [
      {
        name: { type: String, required: true },
        level: { type: String, enum: ['Certificate', 'Diploma', 'Undergraduate', 'Postgraduate'], default: 'Undergraduate' },
        duration_years: { type: Number, default: 4 },
      },
    ],
  },
  { timestamps: true }
);

const DepartmentInfo = mongoose.model('DepartmentInfo', departmentInfoSchema);

// Database Connection with Auto-reconnect & Initial Seed
async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('CMS Service successfully connected to MongoDB Document Store');

    // Seed default news if collection empty
    const count = await News.countDocuments();
    if (count === 0) {
      await News.create([
        {
          title: 'University of Upper Hill Inaugurates New State-of-the-Art AI & Data Science Innovation Hub',
          content: 'The Vice Chancellor, alongside the Cabinet Secretary for Education, officially opened the KES 250M Research Centre aimed at advancing artificial intelligence, climate modeling, and cybersecurity research in East Africa.',
          summary: 'KES 250M cutting-edge research centre opened to spearhead AI and cybersecurity innovation.',
          category: 'Research & Innovation',
          tags: ['AI', 'Research', 'Innovation', 'InnovationHub'],
          author_id: '00000000-0000-0000-0000-000000000000',
          author_name: 'Directorate of Corporate Communications',
          published: true,
          featured: true,
          read_time: '3 min read',
        },
        {
          title: 'KUCCPS 2024/2025 First-Year Reporting Dates & Online Admissions Portal Activation',
          content: 'All government-sponsored and self-sponsored students admitted for the 2024/2025 academic calendar can now download their official admission letters and initiate Jiunge/Pesaflow fee clearance.',
          summary: 'Online reporting guidelines and portal instructions for newly admitted scholars.',
          category: 'Admissions',
          tags: ['KUCCPS', 'Admissions', 'Intake2024', 'Orientation'],
          author_id: '00000000-0000-0000-0000-000000000000',
          author_name: 'Office of the Academic Registrar',
          published: true,
          featured: true,
          read_time: '2 min read',
        },
        {
          title: 'Online Hostel Room Selection Begins for All Continuing Undergraduates',
          content: 'Hostel booking for Semester 1 opens strictly on Tuesday at 08:00 AM. Please note that students must clear at least 50% of tuition fees to qualify for on-campus residency allocation.',
          summary: 'Hostel room selection guidelines and fee clearance criteria.',
          category: 'Student Welfare',
          tags: ['Hostel', 'Accommodation', 'StudentLife'],
          author_id: '00000000-0000-0000-0000-000000000000',
          author_name: 'Dean of Students Office',
          published: true,
          featured: false,
          read_time: '4 min read',
        },
      ]);
      console.log('CMS Service pre-seeded default university notices into MongoDB.');
    }
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    setTimeout(connectDB, 5000);
  }
}

connectDB();

// Middleware: Admin RBAC Check
const requireAdmin = (req, res, next) => {
  const userRole = req.headers['x-user-role'];
  if (userRole !== 'admin' && userRole !== 'ict-admin') {
    return res.status(403).json({ error: 'Forbidden: Administrator credentials required' });
  }
  next();
};

// Zod Validation Schemas
const newsInputSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(255),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  summary: z.string().optional(),
  category: z.string().optional().default('General'),
  tags: z.array(z.string()).optional().default([]),
  published: z.boolean().optional().default(false),
  featured: z.boolean().optional().default(false),
  cover_image: z.string().optional(),
});

// Health check endpoint
app.get('/health', (req, res) => {
  const mongoStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.json({
    status: 'ok',
    service: 'cms-service',
    database: 'MongoDB (Document Store)',
    mongo_status: mongoStatus,
  });
});

// GET /news — Public: List published news (Cached with edge-headers)
app.get('/news', async (req, res) => {
  try {
    const { category, tag, limit = 20 } = req.query;
    const filter = { published: true };

    if (category) filter.category = category;
    if (tag) filter.tags = tag;

    const items = await News.find(filter)
      .sort({ created_at: -1 })
      .limit(parseInt(limit as string, 10))
      .lean();

    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    res.json(items);
  } catch (error: any) {
    console.error('Error fetching news:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /news/:idOrSlug — Public: Get news by ID or Slug & increment views
app.get('/news/:idOrSlug', async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    let query;

    if (mongoose.Types.ObjectId.isValid(idOrSlug)) {
      query = { _id: idOrSlug, published: true };
    } else {
      query = { slug: idOrSlug, published: true };
    }

    const item = await News.findOneAndUpdate(query, { $inc: { views_count: 1 } }, { new: true }).lean();

    if (!item) {
      return res.status(404).json({ error: 'Announcement not found' });
    }

    res.set('Cache-Control', 'public, max-age=120, s-maxage=300');
    res.json(item);
  } catch (error: any) {
    console.error('Error fetching notice:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /news — Admin: Create new notice
app.post('/news', requireAdmin, async (req, res) => {
  try {
    const validatedData = newsInputSchema.parse(req.body);
    const authorId = req.headers['x-user-id'] || 'admin-system';

    const wordCount = validatedData.content.split(/\s+/).length;
    const readTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;

    const newArticle = await News.create({
      ...validatedData,
      author_id: authorId,
      read_time: readTime,
    });

    res.status(201).json(newArticle);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error('Error creating notice:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /news/:id — Admin: Update notice
app.put('/news/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const validatedData = newsInputSchema.partial().parse(req.body);

    const updated = await News.findByIdAndUpdate(id, { $set: validatedData }, { new: true });
    if (!updated) {
      return res.status(404).json({ error: 'Notice not found' });
    }

    res.json(updated);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error('Error updating notice:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /news/:id — Admin: Remove notice
app.delete('/news/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await News.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Notice not found' });
    }
    res.json({ message: 'Notice deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting notice:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /departments — Public: Department information
app.get('/departments', async (req, res) => {
  try {
    const depts = await DepartmentInfo.find().lean();
    res.json(depts);
  } catch (error: any) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`CMS Service (MongoDB Document Store) listening on port ${PORT}`);
});
