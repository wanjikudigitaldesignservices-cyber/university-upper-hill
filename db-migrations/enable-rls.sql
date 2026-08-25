-- =================================================================
-- University of Upper Hill — Row Level Security (RLS) Migration
-- Enables strict RLS policies across all PostgreSQL / Supabase schemas
-- Compliant with KDPA 2019 Zero-PII & Role-Based Access Control
-- =================================================================

-- 1. AUTH SCHEMA RLS
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE auth.refresh_tokens ENABLE ROW LEVEL SECURITY;

-- Allow service role full access
CREATE POLICY service_role_all_auth_users ON auth.users FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY service_role_all_refresh_tokens ON auth.refresh_tokens FOR ALL USING (auth.role() = 'service_role');

-- Users can read and update their own record
CREATE POLICY user_read_self ON auth.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY user_update_self ON auth.users FOR UPDATE USING (auth.uid() = id);


-- 2. ACADEMIC SCHEMA RLS
ALTER TABLE academic.schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE academic.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE academic.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE academic.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE academic.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE academic.grades ENABLE ROW LEVEL SECURITY;

-- Public & Authenticated Read Access for Catalog
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


-- 3. HOSTEL SCHEMA RLS
ALTER TABLE hostel.blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE hostel.rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE hostel.bookings ENABLE ROW LEVEL SECURITY;

-- Public can view hostel blocks & available room inventory
CREATE POLICY public_read_hostel_blocks ON hostel.blocks FOR SELECT USING (true);
CREATE POLICY public_read_hostel_rooms ON hostel.rooms FOR SELECT USING (true);

-- Students can read their own bookings
CREATE POLICY student_read_own_bookings ON hostel.bookings FOR SELECT 
    USING (auth.uid() = user_id OR auth.jwt()->>'role' IN ('admin', 'ict-admin') OR auth.role() = 'service_role');

-- Students can book rooms for themselves
CREATE POLICY student_insert_own_booking ON hostel.bookings FOR INSERT 
    WITH CHECK (auth.uid() = user_id OR auth.role() = 'service_role');


-- 4. FINANCE SCHEMA RLS
ALTER TABLE finance.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE finance.fee_payments ENABLE ROW LEVEL SECURITY;

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


-- 5. ADMISSIONS SCHEMA RLS
ALTER TABLE admissions.admission_letters ENABLE ROW LEVEL SECURITY;

-- Students can view their own admission letter
CREATE POLICY student_read_own_admission_letter ON admissions.admission_letters FOR SELECT 
    USING (auth.uid() = user_id OR auth.jwt()->>'role' IN ('admin', 'ict-admin') OR auth.role() = 'service_role');

CREATE POLICY admin_manage_admission_letters ON admissions.admission_letters FOR ALL 
    USING (auth.jwt()->>'role' IN ('admin', 'ict-admin') OR auth.role() = 'service_role');


-- 6. CMS SCHEMA RLS
ALTER TABLE cms.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms.departments_info ENABLE ROW LEVEL SECURITY;

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
