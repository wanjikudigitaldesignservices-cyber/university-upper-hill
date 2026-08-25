-- =================================================================
-- University of Upper Hill — Row Level Security (RLS) Migration
-- Safe for Supabase SQL Editor & Standalone PostgreSQL
-- =================================================================

-- Ensure application schemas exist
CREATE SCHEMA IF NOT EXISTS academic;
CREATE SCHEMA IF NOT EXISTS hostel;
CREATE SCHEMA IF NOT EXISTS finance;
CREATE SCHEMA IF NOT EXISTS admissions;
CREATE SCHEMA IF NOT EXISTS cms;

-- ==========================================
-- 1. ACADEMIC SCHEMA RLS
-- ==========================================
ALTER TABLE IF EXISTS academic.schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS academic.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS academic.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS academic.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS academic.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS academic.grades ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if re-running
DROP POLICY IF EXISTS public_read_schools ON academic.schools;
DROP POLICY IF EXISTS public_read_departments ON academic.departments;
DROP POLICY IF EXISTS public_read_courses ON academic.courses;
DROP POLICY IF EXISTS student_read_own_profile ON academic.students;
DROP POLICY IF EXISTS student_update_own_profile ON academic.students;
DROP POLICY IF EXISTS student_read_own_enrollments ON academic.enrollments;
DROP POLICY IF EXISTS student_insert_own_enrollments ON academic.enrollments;
DROP POLICY IF EXISTS student_read_own_grades ON academic.grades;
DROP POLICY IF EXISTS faculty_grade_management ON academic.grades;

-- Public & Authenticated Read Access for Course Catalog
CREATE POLICY public_read_schools ON academic.schools FOR SELECT USING (true);
CREATE POLICY public_read_departments ON academic.departments FOR SELECT USING (true);
CREATE POLICY public_read_courses ON academic.courses FOR SELECT USING (true);

-- Student Self-Access Policies
CREATE POLICY student_read_own_profile ON academic.students FOR SELECT 
    USING (auth.uid() = user_id OR auth.jwt()->>'role' IN ('faculty', 'admin', 'ict-admin') OR auth.role() = 'service_role');

CREATE POLICY student_update_own_profile ON academic.students FOR UPDATE 
    USING (auth.uid() = user_id OR auth.role() = 'service_role');

CREATE POLICY student_read_own_enrollments ON academic.enrollments FOR SELECT 
    USING (student_id IN (SELECT id FROM academic.students WHERE user_id = auth.uid()) OR auth.jwt()->>'role' IN ('faculty', 'admin', 'ict-admin') OR auth.role() = 'service_role');

CREATE POLICY student_insert_own_enrollments ON academic.enrollments FOR INSERT 
    WITH CHECK (student_id IN (SELECT id FROM academic.students WHERE user_id = auth.uid()) OR auth.role() = 'service_role');

CREATE POLICY student_read_own_grades ON academic.grades FOR SELECT 
    USING (enrollment_id IN (SELECT e.id FROM academic.enrollments e JOIN academic.students s ON e.student_id = s.id WHERE s.user_id = auth.uid()) OR auth.jwt()->>'role' IN ('faculty', 'admin', 'ict-admin') OR auth.role() = 'service_role');

-- Faculty & Admin Grading Policies
CREATE POLICY faculty_grade_management ON academic.grades FOR ALL 
    USING (auth.jwt()->>'role' IN ('faculty', 'admin', 'ict-admin') OR auth.role() = 'service_role');


-- ==========================================
-- 2. HOSTEL SCHEMA RLS
-- ==========================================
ALTER TABLE IF EXISTS hostel.blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS hostel.rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS hostel.bookings ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if re-running
DROP POLICY IF EXISTS public_read_hostel_blocks ON hostel.blocks;
DROP POLICY IF EXISTS public_read_hostel_rooms ON hostel.rooms;
DROP POLICY IF EXISTS student_read_own_bookings ON hostel.bookings;
DROP POLICY IF EXISTS student_insert_own_booking ON hostel.bookings;

-- Public can view hostel blocks & available room inventory
CREATE POLICY public_read_hostel_blocks ON hostel.blocks FOR SELECT USING (true);
CREATE POLICY public_read_hostel_rooms ON hostel.rooms FOR SELECT USING (true);

-- Students can read their own bookings
CREATE POLICY student_read_own_bookings ON hostel.bookings FOR SELECT 
    USING (auth.uid() = user_id OR auth.jwt()->>'role' IN ('admin', 'ict-admin') OR auth.role() = 'service_role');

-- Students can book rooms for themselves
CREATE POLICY student_insert_own_booking ON hostel.bookings FOR INSERT 
    WITH CHECK (auth.uid() = user_id OR auth.role() = 'service_role');


-- ==========================================
-- 3. FINANCE SCHEMA RLS
-- ==========================================
ALTER TABLE IF EXISTS finance.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS finance.fee_payments ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if re-running
DROP POLICY IF EXISTS student_read_own_invoices ON finance.invoices;
DROP POLICY IF EXISTS student_read_own_payments ON finance.fee_payments;
DROP POLICY IF EXISTS admin_manage_invoices ON finance.invoices;
DROP POLICY IF EXISTS admin_manage_payments ON finance.fee_payments;

-- Students can only view their own invoices & payment receipts
CREATE POLICY student_read_own_invoices ON finance.invoices FOR SELECT 
    USING (auth.uid() = user_id OR auth.jwt()->>'role' IN ('admin', 'ict-admin') OR auth.role() = 'service_role');

CREATE POLICY student_read_own_payments ON finance.fee_payments FOR SELECT 
    USING (auth.uid() = user_id OR auth.jwt()->>'role' IN ('admin', 'ict-admin') OR auth.role() = 'service_role');

-- Admin & Service Role Finance Management
CREATE POLICY admin_manage_invoices ON finance.invoices FOR ALL 
    USING (auth.jwt()->>'role' IN ('admin', 'ict-admin') OR auth.role() = 'service_role');

CREATE POLICY admin_manage_payments ON finance.fee_payments FOR ALL 
    USING (auth.jwt()->>'role' IN ('admin', 'ict-admin') OR auth.role() = 'service_role');


-- ==========================================
-- 4. ADMISSIONS SCHEMA RLS
-- ==========================================
ALTER TABLE IF EXISTS admissions.admission_letters ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if re-running
DROP POLICY IF EXISTS student_read_own_admission_letter ON admissions.admission_letters;
DROP POLICY IF EXISTS admin_manage_admission_letters ON admissions.admission_letters;

-- Students can view their own admission letter
CREATE POLICY student_read_own_admission_letter ON admissions.admission_letters FOR SELECT 
    USING (auth.uid() = user_id OR auth.jwt()->>'role' IN ('admin', 'ict-admin') OR auth.role() = 'service_role');

CREATE POLICY admin_manage_admission_letters ON admissions.admission_letters FOR ALL 
    USING (auth.jwt()->>'role' IN ('admin', 'ict-admin') OR auth.role() = 'service_role');


-- ==========================================
-- 5. CMS SCHEMA RLS
-- ==========================================
ALTER TABLE IF EXISTS cms.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS cms.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS cms.departments_info ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if re-running
DROP POLICY IF EXISTS public_read_published_pages ON cms.pages;
DROP POLICY IF EXISTS public_read_published_news ON cms.news;
DROP POLICY IF EXISTS public_read_departments_info ON cms.departments_info;
DROP POLICY IF EXISTS admin_manage_cms_pages ON cms.pages;
DROP POLICY IF EXISTS admin_manage_cms_news ON cms.news;
DROP POLICY IF EXISTS admin_manage_cms_dept_info ON cms.departments_info;

-- Public can read published content
CREATE POLICY public_read_published_pages ON cms.pages FOR SELECT USING (published = true OR auth.role() = 'service_role');
CREATE POLICY public_read_published_news ON cms.news FOR SELECT USING (published = true OR auth.role() = 'service_role');
CREATE POLICY public_read_departments_info ON cms.departments_info FOR SELECT USING (published = true OR auth.role() = 'service_role');

-- Admin can manage all CMS content
CREATE POLICY admin_manage_cms_pages ON cms.pages FOR ALL 
    USING (auth.jwt()->>'role' IN ('admin', 'ict-admin') OR auth.role() = 'service_role');
CREATE POLICY admin_manage_cms_news ON cms.news FOR ALL 
    USING (auth.jwt()->>'role' IN ('admin', 'ict-admin') OR auth.role() = 'service_role');
CREATE POLICY admin_manage_cms_dept_info ON cms.departments_info FOR ALL 
    USING (auth.jwt()->>'role' IN ('admin', 'ict-admin') OR auth.role() = 'service_role');
