import { User, StudentProfile, Course, Enrollment, HostelRoom, HostelBooking, Invoice, FeePayment, NewsItem } from '../types';

export const INITIAL_STUDENT_USER: User = {
  id: 'usr-std-001',
  email: 'brian.kiprono@student.upperhill.ac.ke',
  role: 'student',
  name: 'Brian Kiprono',
  regNumber: 'COM/0042/2023',
  department: 'Computer Science',
};

export const INITIAL_FACULTY_USER: User = {
  id: 'usr-fac-001',
  email: 'dr.omondi@faculty.upperhill.ac.ke',
  role: 'faculty',
  name: 'Dr. Kennedy Omondi',
  department: 'Computing & Informatics',
};

export const INITIAL_ADMIN_USER: User = {
  id: 'usr-adm-001',
  email: 'registrar@upperhill.ac.ke',
  role: 'admin',
  name: 'Prof. Mary Wanjiku',
  department: 'Academic Affairs',
};

export const INITIAL_ICT_USER: User = {
  id: 'usr-ict-001',
  email: 'ictadmin@upperhill.ac.ke',
  role: 'ict-admin',
  name: 'Eng. Dennis Mutua',
  department: 'ICT Directorate',
};

export const DEMO_STUDENT_PROFILE: StudentProfile = {
  id: 'std-rec-001',
  user_id: 'usr-std-001',
  registration_number: 'COM/0042/2023',
  first_name: 'Brian',
  last_name: 'Kiprono',
  department: 'Computer Science',
  year_of_study: 2,
  phone_number: '254712345678',
  created_at: '2023-09-01T08:00:00Z',
};

export const INITIAL_COURSES: Course[] = [
  { id: 'crs-1', code: 'CSC 211', name: 'Data Structures & Algorithms', department: 'Computer Science', credit_hours: 3, semester: 'Semester 1' },
  { id: 'crs-2', code: 'CSC 212', name: 'Database Management Systems', department: 'Computer Science', credit_hours: 3, semester: 'Semester 1' },
  { id: 'crs-3', code: 'MAT 210', name: 'Discrete Mathematics', department: 'Mathematics', credit_hours: 3, semester: 'Semester 1' },
  { id: 'crs-4', code: 'CSC 213', name: 'Object-Oriented Programming (Java)', department: 'Computer Science', credit_hours: 3, semester: 'Semester 1' },
  { id: 'crs-5', code: 'CSC 214', name: 'Computer Networks & Security', department: 'Computer Science', credit_hours: 4, semester: 'Semester 1' },
  { id: 'crs-6', code: 'STA 215', name: 'Probability & Statistics for Computing', department: 'Mathematics', credit_hours: 3, semester: 'Semester 1' },
  { id: 'crs-7', code: 'CSC 221', name: 'Operating Systems & Architecture', department: 'Computer Science', credit_hours: 3, semester: 'Semester 2' },
  { id: 'crs-8', code: 'CSC 222', name: 'Web Applications Development', department: 'Computer Science', credit_hours: 3, semester: 'Semester 2' },
];

export const INITIAL_ENROLLMENTS: Enrollment[] = [
  { id: 'enr-1', student_id: 'std-rec-001', course_id: 'crs-1', semester: 'Semester 1', academic_year: '2023/2024', status: 'completed', grade: 'A', marks: 84 },
  { id: 'enr-2', student_id: 'std-rec-001', course_id: 'crs-2', semester: 'Semester 1', academic_year: '2023/2024', status: 'completed', grade: 'A-', marks: 78 },
  { id: 'enr-3', student_id: 'std-rec-001', course_id: 'crs-3', semester: 'Semester 1', academic_year: '2023/2024', status: 'completed', grade: 'B+', marks: 73 },
  { id: 'enr-4', student_id: 'std-rec-001', course_id: 'crs-4', semester: 'Semester 2', academic_year: '2023/2024', status: 'completed', grade: 'A', marks: 88 },
  { id: 'enr-5', student_id: 'std-rec-001', course_id: 'crs-5', semester: 'Semester 1', academic_year: '2024/2025', status: 'enrolled' },
  { id: 'enr-6', student_id: 'std-rec-001', course_id: 'crs-6', semester: 'Semester 1', academic_year: '2024/2025', status: 'enrolled' },
];

export const INITIAL_ROOMS: HostelRoom[] = [
  { id: 'rm-a101', block_name: 'Block A (Men)', room_number: 'A-101', capacity: 2, occupancy: 2, status: 'full' },
  { id: 'rm-a102', block_name: 'Block A (Men)', room_number: 'A-102', capacity: 2, occupancy: 1, status: 'available' },
  { id: 'rm-a103', block_name: 'Block A (Men)', room_number: 'A-103', capacity: 2, occupancy: 0, status: 'available' },
  { id: 'rm-a104', block_name: 'Block A (Men)', room_number: 'A-104', capacity: 2, occupancy: 1, status: 'available' },
  { id: 'rm-b101', block_name: 'Block B (Women)', room_number: 'B-101', capacity: 2, occupancy: 2, status: 'full' },
  { id: 'rm-b102', block_name: 'Block B (Women)', room_number: 'B-102', capacity: 2, occupancy: 1, status: 'available' },
  { id: 'rm-b103', block_name: 'Block B (Women)', room_number: 'B-103', capacity: 2, occupancy: 0, status: 'available' },
  { id: 'rm-c101', block_name: 'Block C (Executive)', room_number: 'C-201', capacity: 1, occupancy: 0, status: 'available' },
  { id: 'rm-c102', block_name: 'Block C (Executive)', room_number: 'C-202', capacity: 1, occupancy: 1, status: 'full' },
  { id: 'rm-d101', block_name: 'Block D (Postgrad)', room_number: 'D-301', capacity: 2, occupancy: 0, status: 'available' },
];

export const INITIAL_INVOICES: Invoice[] = [
  { id: 'inv-001', user_id: 'usr-std-001', amount: 35000, description: 'Tuition Fees - 2024/2025 Semester 1', status: 'paid', jiunge_invoice_no: 'JNG-2024-88412', created_at: '2024-08-15T09:00:00Z' },
  { id: 'inv-002', user_id: 'usr-std-001', amount: 6500, description: 'Hostel Accommodation - Block A (Semester 1)', status: 'paid', jiunge_invoice_no: 'JNG-2024-91230', created_at: '2024-08-16T11:20:00Z' },
  { id: 'inv-003', user_id: 'usr-std-001', amount: 4500, description: 'Computer & Science Lab Activity Fee', status: 'pending', jiunge_invoice_no: 'JNG-2024-99814', created_at: '2024-09-02T14:10:00Z' },
];

export const INITIAL_PAYMENTS: FeePayment[] = [
  { id: 'pay-001', invoice_id: 'inv-001', user_id: 'usr-std-001', jiunge_invoice_no: 'JNG-2024-88412', payment_gateway: 'jiunge', amount_paid: 35000, status: 'completed', created_at: '2024-08-15T10:14:22Z' },
  { id: 'pay-002', invoice_id: 'inv-002', user_id: 'usr-std-001', jiunge_invoice_no: 'JNG-2024-91230', payment_gateway: 'jiunge', amount_paid: 6500, status: 'completed', created_at: '2024-08-16T12:05:40Z' },
];

export const INITIAL_NEWS: NewsItem[] = [
  {
    id: 'news-1',
    title: 'University of Upper Hill Inaugurates New State-of-the-Art AI & Data Science Innovation Hub',
    content: 'The Vice Chancellor, alongside the Cabinet Secretary for Education, officially opened the KES 250M Research Centre aimed at advancing artificial intelligence, climate modeling, and cybersecurity research in East Africa.',
    published: true,
    category: 'Research & Innovation',
    readTime: '3 min read',
    created_at: '2024-09-10T08:30:00Z',
  },
  {
    id: 'news-2',
    title: 'KUCCPS 2024/2025 First-Year Reporting Dates & Online Admissions Portal Activation',
    content: 'All government-sponsored and self-sponsored students admitted for the 2024/2025 academic calendar can now download their official admission letters and initiate Jiunge/Pesaflow fee clearance.',
    published: true,
    category: 'Admissions',
    readTime: '2 min read',
    created_at: '2024-09-05T12:00:00Z',
  },
  {
    id: 'news-3',
    title: 'Online Hostel Room Selection Begins for All Continuing Undergraduates',
    content: 'Hostel booking for Semester 1 opens strictly on Tuesday at 08:00 AM. Please note that students must clear at least 50% of tuition fees to qualify for on-campus residency allocation.',
    published: true,
    category: 'Student Welfare',
    readTime: '4 min read',
    created_at: '2024-08-28T09:15:00Z',
  },
  {
    id: 'news-4',
    title: '14th Graduation Ceremony Scheduled for November 29th, 2024',
    content: 'Prospective graduands from all 15 schools and faculties are requested to verify their academic clearance with their respective deans before the October 31st deadline.',
    published: true,
    category: 'Academics',
    readTime: '2 min read',
    created_at: '2024-08-14T14:45:00Z',
  }
];
