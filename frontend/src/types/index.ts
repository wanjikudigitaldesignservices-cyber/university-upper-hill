export type UserRole = 'student' | 'faculty' | 'admin' | 'ict-admin';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name?: string;
  regNumber?: string;
  department?: string;
}

export interface StudentProfile {
  id: string;
  user_id: string;
  registration_number: string;
  first_name: string;
  last_name: string;
  department: string;
  year_of_study: number;
  phone_number?: string;
  created_at: string;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  department: string;
  credit_hours: number;
  semester: string;
  lecturer?: string;
  enrolled?: boolean;
}

export interface Enrollment {
  id: string;
  student_id: string;
  course_id: string;
  course?: Course;
  semester: string;
  academic_year: string;
  status: 'enrolled' | 'dropped' | 'completed';
  grade?: string;
  marks?: number;
}

export interface HostelRoom {
  id: string;
  block_name: string;
  room_number: string;
  capacity: number;
  occupancy: number;
  status: 'available' | 'full' | 'maintenance';
}

export interface HostelBooking {
  id: string;
  user_id: string;
  room_id: string;
  block_name: string;
  room_number: string;
  booking_date: string;
  status: 'active' | 'cancelled' | 'completed';
}

export interface Invoice {
  id: string;
  user_id: string;
  amount: number;
  description: string;
  status: 'pending' | 'paid' | 'cancelled';
  jiunge_invoice_no?: string;
  created_at: string;
}

export interface FeePayment {
  id: string;
  invoice_id: string;
  user_id: string;
  jiunge_invoice_no: string;
  payment_gateway: string;
  amount_paid: number;
  status: 'completed' | 'failed' | 'refunded';
  created_at: string;
}

export interface FeeBalanceSummary {
  userId: string;
  total_invoiced: number;
  total_paid: number;
  balance: number;
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  published: boolean;
  author_id?: string;
  created_at: string;
  updated_at?: string;
  category?: string;
  readTime?: string;
  image?: string;
}

export interface AdmissionLetter {
  id: string;
  user_id: string;
  file_path: string;
  generated_at: string;
}
