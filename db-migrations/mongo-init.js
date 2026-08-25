// =================================================================
// MongoDB Initialization Script for University of Upper Hill
// Databases: uuh_cms, uuh_notifications
// =================================================================

// 1. Switch to uuh_cms database
const cmsDb = db.getSiblingDB('uuh_cms');

// Create indexes
cmsDb.news.createIndex({ published: 1, created_at: -1 });
cmsDb.news.createIndex({ slug: 1 }, { unique: true, sparse: true });
cmsDb.news.createIndex({ category: 1 });
cmsDb.news.createIndex({ tags: 1 });
cmsDb.departmentinfos.createIndex({ department_name: 1 }, { unique: true });

// Seed initial news articles
cmsDb.news.insertMany([
  {
    title: 'University of Upper Hill Inaugurates New State-of-the-Art AI & Data Science Innovation Hub',
    slug: 'ai-data-science-hub-launch-2024',
    content: 'The Vice Chancellor, alongside the Cabinet Secretary for Education, officially opened the KES 250M Research Centre aimed at advancing artificial intelligence, climate modeling, and cybersecurity research in East Africa.',
    summary: 'KES 250M cutting-edge research centre opened to spearhead AI and cybersecurity innovation.',
    category: 'Research & Innovation',
    tags: ['AI', 'Research', 'Innovation', 'InnovationHub'],
    author_id: '00000000-0000-0000-0000-000000000000',
    author_name: 'Directorate of Corporate Communications',
    published: true,
    featured: true,
    read_time: '3 min read',
    views_count: 342,
    created_at: new Date('2024-09-10T08:30:00Z'),
    updated_at: new Date('2024-09-10T08:30:00Z')
  },
  {
    title: 'KUCCPS 2024/2025 First-Year Reporting Dates & Online Admissions Portal Activation',
    slug: 'kuccps-2024-first-year-reporting',
    content: 'All government-sponsored and self-sponsored students admitted for the 2024/2025 academic calendar can now download their official admission letters and initiate Jiunge/Pesaflow fee clearance.',
    summary: 'Online reporting guidelines and portal instructions for newly admitted scholars.',
    category: 'Admissions',
    tags: ['KUCCPS', 'Admissions', 'Intake2024', 'Orientation'],
    author_id: '00000000-0000-0000-0000-000000000000',
    author_name: 'Office of the Academic Registrar',
    published: true,
    featured: true,
    read_time: '2 min read',
    views_count: 512,
    created_at: new Date('2024-09-05T12:00:00Z'),
    updated_at: new Date('2024-09-05T12:00:00Z')
  }
]);

// 2. Switch to uuh_notifications database
const notifDb = db.getSiblingDB('uuh_notifications');

// Create indexes
notifDb.notificationlogs.createIndex({ user_id: 1 });
notifDb.notificationlogs.createIndex({ type: 1 });
notifDb.notificationlogs.createIndex({ status: 1 });
notifDb.notificationlogs.createIndex({ created_at: -1 });

print('University of Upper Hill MongoDB Databases initialized successfully.');
