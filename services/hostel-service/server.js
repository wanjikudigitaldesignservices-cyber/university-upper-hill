import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pkg from 'pg';
import { z } from 'zod';

const { Pool } = pkg;

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3003;
const FINANCE_SERVICE_URL = process.env.FINANCE_SERVICE_URL || 'http://finance-service:3004';

app.use(cors());
app.use(express.json());

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', (client) => {
  client.query('SET search_path TO hostel, public');
});

// Zod schemas
const bookingSchema = z.object({
  room_id: z.string().uuid('Invalid room ID'),
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'hostel-service' });
});

// GET /rooms — List all rooms with availability
app.get('/rooms', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, block_name, room_number, capacity, occupancy, status FROM hostel.rooms ORDER BY block_name, room_number'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error listing rooms:', error.code || error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /rooms/available — List only available rooms
app.get('/rooms/available', async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, block_name, room_number, capacity, occupancy FROM hostel.rooms WHERE status = 'available' AND occupancy < capacity ORDER BY block_name, room_number"
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error listing available rooms:', error.code || error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /bookings/me — Student's own bookings
app.get('/bookings/me', async (req, res) => {
  try {
    const userId = req.headers['x-user-id'];
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const result = await pool.query(
      `SELECT b.id, b.room_id, b.booking_date, b.status, r.block_name, r.room_number
       FROM hostel.bookings b
       JOIN hostel.rooms r ON b.room_id = r.id
       WHERE b.user_id = $1
       ORDER BY b.booking_date DESC`,
      [userId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching bookings:', error.code || error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /bookings — Book a room (Layer 8: Concurrency-safe with row-level locking)
// Flow: validate fees-cleared → row-level lock on room → write Occupied → release lock
app.post('/bookings', async (req, res) => {
  const userId = req.headers['x-user-id'];
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const validatedData = bookingSchema.parse(req.body);
    const { room_id } = validatedData;

    // Step 1: Check if student has fees cleared (call finance-service)
    try {
      const feeCheckResponse = await fetch(`${FINANCE_SERVICE_URL}/balance/${userId}`);
      if (!feeCheckResponse.ok) {
        return res.status(400).json({ error: 'Unable to verify fee status. Please try again.' });
      }
      const feeData = await feeCheckResponse.json();
      if (feeData.balance > 0) {
        return res.status(403).json({
          error: 'Outstanding fees must be cleared before booking a hostel room',
          outstanding_balance: feeData.balance,
        });
      }
    } catch (fetchError) {
      console.error('Finance service unreachable:', fetchError.message);
      return res.status(503).json({ error: 'Finance service unavailable. Please try again later.' });
    }

    // Step 2: Check for existing active booking
    const existingBooking = await pool.query(
      "SELECT id FROM hostel.bookings WHERE user_id = $1 AND status = 'active'",
      [userId]
    );
    if (existingBooking.rows.length > 0) {
      return res.status(409).json({ error: 'You already have an active hostel booking' });
    }

    // Step 3: Acquire row-level lock and book (Layer 8 — concurrency safety)
    // Using a transaction with SELECT ... FOR UPDATE to prevent race conditions
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Lock the room row — any concurrent transaction hitting the same row will wait
      const roomResult = await client.query(
        "SELECT id, capacity, occupancy, status FROM hostel.rooms WHERE id = $1 FOR UPDATE",
        [room_id]
      );

      if (roomResult.rows.length === 0) {
        await client.query('ROLLBACK');
        return res.status(404).json({ error: 'Room not found' });
      }

      const room = roomResult.rows[0];

      if (room.status !== 'available' || room.occupancy >= room.capacity) {
        await client.query('ROLLBACK');
        return res.status(409).json({ error: 'Room is no longer available' });
      }

      // Increment occupancy
      const newOccupancy = room.occupancy + 1;
      const newStatus = newOccupancy >= room.capacity ? 'full' : 'available';

      await client.query(
        'UPDATE hostel.rooms SET occupancy = $1, status = $2 WHERE id = $3',
        [newOccupancy, newStatus, room_id]
      );

      // Create booking
      const bookingResult = await client.query(
        "INSERT INTO hostel.bookings (user_id, room_id, status) VALUES ($1, $2, 'active') RETURNING id, room_id, booking_date, status",
        [userId, room_id]
      );

      await client.query('COMMIT');

      res.status(201).json({
        message: 'Room booked successfully',
        booking: bookingResult.rows[0],
      });
    } catch (txError) {
      await client.query('ROLLBACK');
      throw txError;
    } finally {
      client.release();
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error('Booking error:', error.code || error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Hostel Service is running on port ${PORT}`);
});
