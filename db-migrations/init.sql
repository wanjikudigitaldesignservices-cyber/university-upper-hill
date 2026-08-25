-- ==========================================
-- University of Upper Hill — Database Init
-- Creates schemas and tables for all services
-- ==========================================

-- Create schemas for each service (Layer 5 — one schema per service)
CREATE SCHEMA IF NOT EXISTS auth;
CREATE SCHEMA IF NOT EXISTS academic;
CREATE SCHEMA IF NOT EXISTS hostel;
CREATE SCHEMA IF NOT EXISTS finance;
CREATE SCHEMA IF NOT EXISTS admissions;
CREATE SCHEMA IF NOT EXISTS cms;

-- ==========================================
-- AUTH SCHEMA
-- ==========================================

CREATE TABLE auth.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('student', 'faculty', 'admin', 'ict-admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE auth.refresh_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    token VARCHAR(500) UNIQUE NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes: auth
CREATE INDEX idx_auth_users_email ON auth.users(email);
CREATE INDEX idx_auth_users_role ON auth.users(role);
CREATE INDEX idx_auth_refresh_tokens_user_id ON auth.refresh_tokens(user_id);
CREATE INDEX idx_auth_refresh_tokens_expires_at ON auth.refresh_tokens(expires_at);

-- ==========================================
-- ACADEMIC SCHEMA
-- ==========================================

CREATE TABLE academic.schools (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(200) NOT NULL,
    code VARCHAR(20) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE academic.departments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES academic.schools(id),
    name VARCHAR(200) NOT NULL,
    code VARCHAR(20) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE academic.students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL,
    registration_number VARCHAR(50) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20),
    year_of_study INT DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE academic.courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(200) NOT NULL,
    department VARCHAR(100) NOT NULL,
    credit_hours INT NOT NULL DEFAULT 3,
    semester VARCHAR(20) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE academic.enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES academic.students(id),
    course_id UUID NOT NULL REFERENCES academic.courses(id),
    semester VARCHAR(20) NOT NULL,
    academic_year VARCHAR(10) NOT NULL,
    status VARCHAR(20) DEFAULT 'enrolled' CHECK (status IN ('enrolled', 'dropped', 'completed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(student_id, course_id, academic_year)
);

CREATE TABLE academic.grades (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    enrollment_id UUID UNIQUE NOT NULL REFERENCES academic.enrollments(id),
    grade VARCHAR(5),
    marks DECIMAL(5, 2),
    graded_by UUID, -- faculty user_id
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes: academic
CREATE INDEX idx_academic_students_user_id ON academic.students(user_id);
CREATE INDEX idx_academic_students_reg_no ON academic.students(registration_number);
CREATE INDEX idx_academic_students_department ON academic.students(department);
CREATE INDEX idx_academic_courses_code ON academic.courses(code);
CREATE INDEX idx_academic_courses_department ON academic.courses(department);
CREATE INDEX idx_academic_enrollments_student ON academic.enrollments(student_id);
CREATE INDEX idx_academic_enrollments_course ON academic.enrollments(course_id);
CREATE INDEX idx_academic_grades_enrollment ON academic.grades(enrollment_id);

-- ==========================================
-- HOSTEL SCHEMA
-- ==========================================

CREATE TABLE hostel.blocks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) UNIQUE NOT NULL,
    gender VARCHAR(10) CHECK (gender IN ('male', 'female', 'mixed')),
    total_rooms INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE hostel.rooms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    block_name VARCHAR(50) NOT NULL,
    room_number VARCHAR(20) NOT NULL,
    capacity INT NOT NULL DEFAULT 2,
    occupancy INT NOT NULL DEFAULT 0,
    status VARCHAR(20) DEFAULT 'available' CHECK (status IN ('available', 'full', 'maintenance')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(block_name, room_number)
);

CREATE TABLE hostel.bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    room_id UUID NOT NULL REFERENCES hostel.rooms(id),
    booking_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'completed'))
);

-- Indexes: hostel
CREATE INDEX idx_hostel_rooms_status ON hostel.rooms(status);
CREATE INDEX idx_hostel_rooms_block ON hostel.rooms(block_name);
CREATE INDEX idx_hostel_bookings_user_id ON hostel.bookings(user_id);
CREATE INDEX idx_hostel_bookings_room_id ON hostel.bookings(room_id);
CREATE INDEX idx_hostel_bookings_status ON hostel.bookings(status);

-- ==========================================
-- FINANCE SCHEMA
-- ==========================================

CREATE TABLE finance.invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'cancelled')),
    jiunge_invoice_no VARCHAR(100) UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE finance.fee_payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_id UUID REFERENCES finance.invoices(id),
    user_id UUID NOT NULL,
    jiunge_invoice_no VARCHAR(100) UNIQUE NOT NULL,
    payment_gateway VARCHAR(50) DEFAULT 'jiunge',
    amount_paid DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'completed' CHECK (status IN ('completed', 'failed', 'refunded')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes: finance
CREATE INDEX idx_finance_invoices_user_id ON finance.invoices(user_id);
CREATE INDEX idx_finance_invoices_status ON finance.invoices(status);
CREATE INDEX idx_finance_invoices_jiunge ON finance.invoices(jiunge_invoice_no);
CREATE INDEX idx_finance_payments_user_id ON finance.fee_payments(user_id);
CREATE INDEX idx_finance_payments_invoice ON finance.fee_payments(invoice_id);
CREATE INDEX idx_finance_payments_jiunge ON finance.fee_payments(jiunge_invoice_no);

-- ==========================================
-- ADMISSIONS SCHEMA
-- ==========================================

CREATE TABLE admissions.admission_letters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    generated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes: admissions
CREATE INDEX idx_admissions_letters_user_id ON admissions.admission_letters(user_id);

-- ==========================================
-- CMS SCHEMA
-- ==========================================

CREATE TABLE cms.pages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    published BOOLEAN DEFAULT FALSE,
    author_id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cms.news (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    author_id UUID NOT NULL,
    published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cms.departments_info (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_name VARCHAR(200) NOT NULL,
    department_name VARCHAR(200) NOT NULL,
    description TEXT,
    head_of_department VARCHAR(200),
    contact_email VARCHAR(255),
    published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes: cms
CREATE INDEX idx_cms_news_published ON cms.news(published, created_at DESC);
CREATE INDEX idx_cms_pages_slug ON cms.pages(slug);
CREATE INDEX idx_cms_pages_published ON cms.pages(published);

-- ==========================================
-- Seed Data (for development/testing)
-- ==========================================

-- Seed some hostel blocks and rooms
INSERT INTO hostel.rooms (block_name, room_number, capacity) VALUES
  ('Block A', 'A101', 2),
  ('Block A', 'A102', 2),
  ('Block A', 'A103', 2),
  ('Block B', 'B101', 2),
  ('Block B', 'B102', 2),
  ('Block C', 'C101', 4),
  ('Block C', 'C102', 4);

-- Seed CMS news
INSERT INTO cms.news (title, content, author_id, published) VALUES
  ('Welcome to University of Upper Hill', 'Welcome to the new academic year at UUH. We look forward to a productive semester.', '00000000-0000-0000-0000-000000000000', TRUE),
  ('Registration Opens', 'Online registration for the upcoming semester is now open. Please log into the student portal to register.', '00000000-0000-0000-0000-000000000000', TRUE);
