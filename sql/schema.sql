-- ====================================================================
-- GOTHWAD EDUCATION PLATFORM - DATABASE SCHEMA & INITIAL SEED DATA
-- Target Engine: PostgreSQL / Supabase
-- ====================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- --------------------------------------------------------------------
-- 1. STUDENTS TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.students (
    id VARCHAR(50) PRIMARY KEY,
    roll_number VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    class_name VARCHAR(50) NOT NULL,
    section VARCHAR(10) NOT NULL,
    gender VARCHAR(20) NOT NULL,
    dob DATE NOT NULL,
    parent_name VARCHAR(255) NOT NULL,
    parent_phone VARCHAR(50) NOT NULL,
    email VARCHAR(255),
    address TEXT,
    blood_group VARCHAR(10),
    avatar_url TEXT,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'graduated')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- --------------------------------------------------------------------
-- 2. STAFF TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.staff (
    id VARCHAR(50) PRIMARY KEY,
    employee_id VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('teacher', 'admin', 'accountant', 'principal', 'librarian')),
    department VARCHAR(100) NOT NULL,
    subject VARCHAR(100),
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    qualification VARCHAR(255),
    joining_date DATE NOT NULL,
    avatar_url TEXT,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- --------------------------------------------------------------------
-- 3. FEE PAYMENTS TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.fee_payments (
    id VARCHAR(50) PRIMARY KEY,
    student_id VARCHAR(50) NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    student_name VARCHAR(255) NOT NULL,
    class_name VARCHAR(50) NOT NULL,
    fee_type VARCHAR(100) NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    due_date DATE NOT NULL,
    paid_date DATE,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('paid', 'pending', 'overdue')),
    payment_mode VARCHAR(50),
    transaction_id VARCHAR(100),
    receipt_number VARCHAR(100),
    remarks TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- --------------------------------------------------------------------
-- 4. HOMEWORK TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.homework (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    subject VARCHAR(100) NOT NULL,
    class_name VARCHAR(50) NOT NULL,
    section VARCHAR(10) NOT NULL,
    teacher_id VARCHAR(50) NOT NULL REFERENCES public.staff(id) ON DELETE CASCADE,
    teacher_name VARCHAR(255) NOT NULL,
    due_date DATE NOT NULL,
    attachment_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- --------------------------------------------------------------------
-- 5. HOMEWORK SUBMISSIONS TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.homework_submissions (
    id VARCHAR(50) PRIMARY KEY,
    homework_id VARCHAR(50) NOT NULL REFERENCES public.homework(id) ON DELETE CASCADE,
    student_id VARCHAR(50) NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    student_name VARCHAR(255) NOT NULL,
    submission_text TEXT,
    file_url TEXT,
    status VARCHAR(20) DEFAULT 'submitted' CHECK (status IN ('submitted', 'graded', 'late')),
    grade VARCHAR(10),
    feedback TEXT,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- --------------------------------------------------------------------
-- 6. NOTICES TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.notices (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    author_name VARCHAR(255) NOT NULL,
    author_role VARCHAR(50) NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('academic', 'exam', 'holiday', 'sports', 'general')),
    target_role VARCHAR(50) NOT NULL DEFAULT 'all' CHECK (target_role IN ('all', 'student', 'teacher', 'parent')),
    priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- --------------------------------------------------------------------
-- 7. REPORT CARDS TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.report_cards (
    id VARCHAR(50) PRIMARY KEY,
    student_id VARCHAR(50) NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    student_name VARCHAR(255) NOT NULL,
    class_name VARCHAR(50) NOT NULL,
    term VARCHAR(50) NOT NULL,
    academic_year VARCHAR(20) NOT NULL,
    subjects JSONB NOT NULL,
    total_marks NUMERIC(10, 2) NOT NULL,
    percentage NUMERIC(5, 2) NOT NULL,
    grade VARCHAR(10) NOT NULL,
    remarks TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- --------------------------------------------------------------------
-- 8. ATTENDANCE RECORDS TABLE
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.attendance_records (
    id VARCHAR(50) PRIMARY KEY,
    date DATE NOT NULL,
    class_name VARCHAR(50) NOT NULL,
    section VARCHAR(10) NOT NULL,
    student_id VARCHAR(50) NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    student_name VARCHAR(255) NOT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('present', 'absent', 'late', 'excused')),
    marked_by VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(date, student_id)
);

-- --------------------------------------------------------------------
-- INDEXES FOR PERFORMANCE
-- --------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_students_class ON public.students(class_name, section);
CREATE INDEX IF NOT EXISTS idx_fee_student ON public.fee_payments(student_id);
CREATE INDEX IF NOT EXISTS idx_fee_status ON public.fee_payments(status);
CREATE INDEX IF NOT EXISTS idx_hw_class ON public.homework(class_name, section);
CREATE INDEX IF NOT EXISTS idx_hw_sub_hw ON public.homework_submissions(homework_id);
CREATE INDEX IF NOT EXISTS idx_att_date_class ON public.attendance_records(date, class_name, section);

-- --------------------------------------------------------------------
-- SAMPLE INITIAL SEED DATA
-- --------------------------------------------------------------------

-- Insert Sample Students
INSERT INTO public.students (id, roll_number, name, class_name, section, gender, dob, parent_name, parent_phone, email, status)
VALUES
('std-101', '2026-101', 'Aarav Gothwad', 'Class 10', 'A', 'Male', '2010-05-14', 'Ramesh Gothwad', '+91 98290 12345', 'aarav@gothwad.edu', 'active'),
('std-102', '2026-102', 'Ananya Sharma', 'Class 10', 'A', 'Female', '2010-08-22', 'Sanjay Sharma', '+91 98290 54321', 'ananya@gothwad.edu', 'active'),
('std-103', '2026-103', 'Rohan Verma', 'Class 10', 'B', 'Male', '2010-03-10', 'Vikram Verma', '+91 98290 67890', 'rohan@gothwad.edu', 'active')
ON CONFLICT (id) DO NOTHING;

-- Insert Sample Staff
INSERT INTO public.staff (id, employee_id, name, role, department, subject, phone, email, qualification, joining_date, status)
VALUES
('stf-201', 'EMP-01', 'Dr. Rajesh Gothwad', 'admin', 'Management', 'Administration', '+91 98290 00001', 'admin@gothwad.edu', 'Ph.D in Education Policy', '2018-04-01', 'active'),
('stf-202', 'EMP-02', 'Sunita Sharma', 'teacher', 'Mathematics', 'Mathematics', '+91 98290 00002', 'sunita@gothwad.edu', 'M.Sc Mathematics, B.Ed', '2020-06-15', 'active')
ON CONFLICT (id) DO NOTHING;

-- Insert Sample Notices
INSERT INTO public.notices (id, title, content, author_name, author_role, category, target_role, priority)
VALUES
('not-01', 'Mid-Term Examination Schedule 2026', 'The Mid-Term examinations for Classes 6 to 12 will commence from September 15, 2026.', 'Dr. Rajesh Gothwad', 'Principal', 'exam', 'all', 'high'),
('not-02', 'Annual Sports Meet Announcement', 'Students interested in track & field events register with physical education department by Friday.', 'Sports Department', 'Teacher', 'sports', 'student', 'medium')
ON CONFLICT (id) DO NOTHING;
