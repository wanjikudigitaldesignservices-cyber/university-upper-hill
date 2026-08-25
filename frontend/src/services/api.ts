import {
  User,
  StudentProfile,
  Course,
  Enrollment,
  HostelRoom,
  HostelBooking,
  Invoice,
  FeePayment,
  FeeBalanceSummary,
  NewsItem,
  AdmissionLetter,
} from '../types';
import {
  INITIAL_STUDENT_USER,
  INITIAL_FACULTY_USER,
  INITIAL_ADMIN_USER,
  INITIAL_ICT_USER,
  DEMO_STUDENT_PROFILE,
  INITIAL_COURSES,
  INITIAL_ENROLLMENTS,
  INITIAL_ROOMS,
  INITIAL_INVOICES,
  INITIAL_PAYMENTS,
  INITIAL_NEWS,
} from './mockData';

const STORAGE_KEYS = {
  COURSES: 'uuh_courses',
  ENROLLMENTS: 'uuh_enrollments',
  ROOMS: 'uuh_rooms',
  BOOKINGS: 'uuh_bookings',
  INVOICES: 'uuh_invoices',
  PAYMENTS: 'uuh_payments',
  NEWS: 'uuh_news',
  LETTERS: 'uuh_letters',
  CURRENT_USER: 'uuh_current_user',
};

// Helper for localStorage state persistence
function getStorage<T>(key: string, defaultVal: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultVal;
  } catch (e) {
    return defaultVal;
  }
}

function setStorage<T>(key: string, val: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.error('Storage write error', e);
  }
}

// Initialize mock DB
if (!localStorage.getItem(STORAGE_KEYS.COURSES)) setStorage(STORAGE_KEYS.COURSES, INITIAL_COURSES);
if (!localStorage.getItem(STORAGE_KEYS.ENROLLMENTS)) setStorage(STORAGE_KEYS.ENROLLMENTS, INITIAL_ENROLLMENTS);
if (!localStorage.getItem(STORAGE_KEYS.ROOMS)) setStorage(STORAGE_KEYS.ROOMS, INITIAL_ROOMS);
if (!localStorage.getItem(STORAGE_KEYS.INVOICES)) setStorage(STORAGE_KEYS.INVOICES, INITIAL_INVOICES);
if (!localStorage.getItem(STORAGE_KEYS.PAYMENTS)) setStorage(STORAGE_KEYS.PAYMENTS, INITIAL_PAYMENTS);
if (!localStorage.getItem(STORAGE_KEYS.NEWS)) setStorage(STORAGE_KEYS.NEWS, INITIAL_NEWS);
if (!localStorage.getItem(STORAGE_KEYS.BOOKINGS)) setStorage(STORAGE_KEYS.BOOKINGS, []);
if (!localStorage.getItem(STORAGE_KEYS.LETTERS)) setStorage(STORAGE_KEYS.LETTERS, []);

export const api = {
  // Auth
  async login(email: string, role?: string): Promise<{ user: User; accessToken: string }> {
    let user: User = INITIAL_STUDENT_USER;
    if (role === 'faculty' || email.includes('faculty')) user = INITIAL_FACULTY_USER;
    else if (role === 'admin' || email.includes('registrar') || email.includes('admin@')) user = INITIAL_ADMIN_USER;
    else if (role === 'ict-admin' || email.includes('ict')) user = INITIAL_ICT_USER;
    else if (email) {
      user = {
        id: 'usr-' + Math.random().toString(36).substring(7),
        email,
        role: (role as any) || 'student',
        name: email.split('@')[0].replace('.', ' ').toUpperCase(),
        regNumber: 'COM/' + Math.floor(1000 + Math.random() * 9000) + '/2024',
        department: 'School of Computing',
      };
    }
    setStorage(STORAGE_KEYS.CURRENT_USER, user);
    return { user, accessToken: 'jwt_token_' + Date.now() };
  },

  getCurrentUser(): User | null {
    return getStorage<User | null>(STORAGE_KEYS.CURRENT_USER, INITIAL_STUDENT_USER);
  },

  // Student Profile
  async getStudentProfile(userId: string): Promise<StudentProfile> {
    return DEMO_STUDENT_PROFILE;
  },

  // Academics
  async getCourses(): Promise<Course[]> {
    return getStorage<Course[]>(STORAGE_KEYS.COURSES, INITIAL_COURSES);
  },

  async getEnrollments(studentId: string = 'std-rec-001'): Promise<Enrollment[]> {
    const enrollments = getStorage<Enrollment[]>(STORAGE_KEYS.ENROLLMENTS, INITIAL_ENROLLMENTS);
    const courses = getStorage<Course[]>(STORAGE_KEYS.COURSES, INITIAL_COURSES);
    return enrollments.map((enr) => ({
      ...enr,
      course: courses.find((c) => c.id === enr.course_id),
    }));
  },

  async enrollCourse(courseId: string, studentId: string = 'std-rec-001'): Promise<Enrollment> {
    const enrollments = getStorage<Enrollment[]>(STORAGE_KEYS.ENROLLMENTS, INITIAL_ENROLLMENTS);
    const courses = getStorage<Course[]>(STORAGE_KEYS.COURSES, INITIAL_COURSES);
    const course = courses.find((c) => c.id === courseId);

    const newEnr: Enrollment = {
      id: 'enr-' + Date.now(),
      student_id: studentId,
      course_id: courseId,
      course,
      semester: 'Semester 1',
      academic_year: '2024/2025',
      status: 'enrolled',
    };

    setStorage(STORAGE_KEYS.ENROLLMENTS, [newEnr, ...enrollments]);
    return newEnr;
  },

  async dropCourse(enrollmentId: string): Promise<void> {
    const enrollments = getStorage<Enrollment[]>(STORAGE_KEYS.ENROLLMENTS, INITIAL_ENROLLMENTS);
    setStorage(STORAGE_KEYS.ENROLLMENTS, enrollments.filter((e) => e.id !== enrollmentId));
  },

  async submitGrade(enrollmentId: string, grade: string, marks: number): Promise<void> {
    const enrollments = getStorage<Enrollment[]>(STORAGE_KEYS.ENROLLMENTS, INITIAL_ENROLLMENTS);
    const updated = enrollments.map((e) =>
      e.id === enrollmentId ? { ...e, grade, marks, status: 'completed' as const } : e
    );
    setStorage(STORAGE_KEYS.ENROLLMENTS, updated);
  },

  // Hostel (Concurrency-Safe Booking Layer 8 Simulation)
  async getHostelRooms(): Promise<HostelRoom[]> {
    return getStorage<HostelRoom[]>(STORAGE_KEYS.ROOMS, INITIAL_ROOMS);
  },

  async getMyBookings(userId: string = 'usr-std-001'): Promise<HostelBooking[]> {
    const bookings = getStorage<HostelBooking[]>(STORAGE_KEYS.BOOKINGS, []);
    return bookings.filter((b) => b.user_id === userId);
  },

  async bookHostelRoom(roomId: string, userId: string = 'usr-std-001'): Promise<HostelBooking> {
    // 1. Fee Clearance check (Call finance)
    const balance = await this.getFeeBalance(userId);
    if (balance.balance > 10000) {
      throw new Error(`Fee Clearance Required: Your outstanding balance of KES ${balance.balance.toLocaleString()} exceeds the maximum allowed (KES 10,000) for room allocation.`);
    }

    // 2. Existing active booking check
    const bookings = getStorage<HostelBooking[]>(STORAGE_KEYS.BOOKINGS, []);
    const existing = bookings.find((b) => b.user_id === userId && b.status === 'active');
    if (existing) {
      throw new Error(`You already hold an active allocation in ${existing.block_name} (${existing.room_number}).`);
    }

    // 3. Concurrency / Row lock check on room capacity
    const rooms = getStorage<HostelRoom[]>(STORAGE_KEYS.ROOMS, INITIAL_ROOMS);
    const roomIndex = rooms.findIndex((r) => r.id === roomId);
    if (roomIndex === -1) throw new Error('Hostel room not found.');

    const targetRoom = rooms[roomIndex];
    if (targetRoom.occupancy >= targetRoom.capacity || targetRoom.status === 'full') {
      throw new Error(`Room ${targetRoom.room_number} just filled up. Please select another available unit.`);
    }

    // Atomically increment occupancy
    const updatedOccupancy = targetRoom.occupancy + 1;
    rooms[roomIndex] = {
      ...targetRoom,
      occupancy: updatedOccupancy,
      status: updatedOccupancy >= targetRoom.capacity ? 'full' : 'available',
    };
    setStorage(STORAGE_KEYS.ROOMS, rooms);

    // Record booking
    const newBooking: HostelBooking = {
      id: 'bk-' + Date.now(),
      user_id: userId,
      room_id: roomId,
      block_name: targetRoom.block_name,
      room_number: targetRoom.room_number,
      booking_date: new Date().toISOString(),
      status: 'active',
    };

    setStorage(STORAGE_KEYS.BOOKINGS, [newBooking, ...bookings]);
    return newBooking;
  },

  // Finance / Jiunge Payments (Layer 7)
  async getInvoices(userId: string = 'usr-std-001'): Promise<Invoice[]> {
    return getStorage<Invoice[]>(STORAGE_KEYS.INVOICES, INITIAL_INVOICES);
  },

  async getPayments(userId: string = 'usr-std-001'): Promise<FeePayment[]> {
    return getStorage<FeePayment[]>(STORAGE_KEYS.PAYMENTS, INITIAL_PAYMENTS);
  },

  async getFeeBalance(userId: string = 'usr-std-001'): Promise<FeeBalanceSummary> {
    const invoices = getStorage<Invoice[]>(STORAGE_KEYS.INVOICES, INITIAL_INVOICES);
    const payments = getStorage<FeePayment[]>(STORAGE_KEYS.PAYMENTS, INITIAL_PAYMENTS);

    const totalInvoiced = invoices
      .filter((i) => i.user_id === userId && i.status !== 'cancelled')
      .reduce((sum, i) => sum + i.amount, 0);

    const totalPaid = payments
      .filter((p) => p.user_id === userId && p.status === 'completed')
      .reduce((sum, p) => sum + p.amount_paid, 0);

    return {
      userId,
      total_invoiced: totalInvoiced,
      total_paid: totalPaid,
      balance: Math.max(0, totalInvoiced - totalPaid),
    };
  },

  // Initiate Jiunge/Pesaflow STK Push
  async initiateJiungePayment(params: {
    amount: number;
    description: string;
    phoneNumber: string;
    userId?: string;
  }): Promise<{ jiungeInvoiceNo: string; message: string }> {
    const uid = params.userId || 'usr-std-001';
    const invoiceNo = 'JNG-' + new Date().getFullYear() + '-' + Math.floor(10000 + Math.random() * 90000);

    // Create pending invoice
    const invoices = getStorage<Invoice[]>(STORAGE_KEYS.INVOICES, INITIAL_INVOICES);
    const newInv: Invoice = {
      id: 'inv-' + Date.now(),
      user_id: uid,
      amount: params.amount,
      description: params.description,
      status: 'pending',
      jiunge_invoice_no: invoiceNo,
      created_at: new Date().toISOString(),
    };
    setStorage(STORAGE_KEYS.INVOICES, [newInv, ...invoices]);

    return {
      jiungeInvoiceNo: invoiceNo,
      message: `M-Pesa STK push requested to ${params.phoneNumber} for KES ${params.amount.toLocaleString()}. Please enter your M-Pesa PIN on your phone.`,
    };
  },

  // Confirm Jiunge Webhook callback (Idempotent settlement)
  async confirmJiungeWebhook(jiungeInvoiceNo: string, amount: number, userId: string = 'usr-std-001'): Promise<FeePayment> {
    const payments = getStorage<FeePayment[]>(STORAGE_KEYS.PAYMENTS, INITIAL_PAYMENTS);
    const invoices = getStorage<Invoice[]>(STORAGE_KEYS.INVOICES, INITIAL_INVOICES);

    // Idempotency check: don't double credit
    const existing = payments.find((p) => p.jiunge_invoice_no === jiungeInvoiceNo);
    if (existing) return existing;

    const inv = invoices.find((i) => i.jiunge_invoice_no === jiungeInvoiceNo);
    const newPayment: FeePayment = {
      id: 'pay-' + Date.now(),
      invoice_id: inv ? inv.id : 'inv-direct',
      user_id: userId,
      jiunge_invoice_no: jiungeInvoiceNo,
      payment_gateway: 'jiunge_pesaflow',
      amount_paid: amount,
      status: 'completed',
      created_at: new Date().toISOString(),
    };

    setStorage(STORAGE_KEYS.PAYMENTS, [newPayment, ...payments]);

    if (inv) {
      const updatedInvoices = invoices.map((i) =>
        i.id === inv.id ? { ...i, status: 'paid' as const } : i
      );
      setStorage(STORAGE_KEYS.INVOICES, updatedInvoices);
    }

    return newPayment;
  },

  // CMS
  async getNews(): Promise<NewsItem[]> {
    return getStorage<NewsItem[]>(STORAGE_KEYS.NEWS, INITIAL_NEWS);
  },

  async createNews(news: Omit<NewsItem, 'id' | 'created_at'>): Promise<NewsItem> {
    const newsList = getStorage<NewsItem[]>(STORAGE_KEYS.NEWS, INITIAL_NEWS);
    const newItem: NewsItem = {
      ...news,
      id: 'news-' + Date.now(),
      created_at: new Date().toISOString(),
    };
    setStorage(STORAGE_KEYS.NEWS, [newItem, ...newsList]);
    return newItem;
  },

  // Admissions
  async generateAdmissionLetter(userId: string = 'usr-std-001'): Promise<AdmissionLetter> {
    const letters = getStorage<AdmissionLetter[]>(STORAGE_KEYS.LETTERS, []);
    const token = 'UOH-ADM-' + Math.random().toString(36).substring(2, 10).toUpperCase();
    const newLetter: AdmissionLetter = {
      id: 'let-' + Date.now(),
      user_id: userId,
      file_path: token,
      generated_at: new Date().toISOString(),
    };
    setStorage(STORAGE_KEYS.LETTERS, [newLetter, ...letters]);
    return newLetter;
  },
};
