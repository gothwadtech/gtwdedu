export type UserRole = 'admin' | 'management' | 'teacher' | 'staff' | 'student' | 'parent';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar_url?: string;
  phone?: string;
  class_name?: string; // For student/parent, e.g. "Grade 10-A"
  student_id?: string; // Reference ID for students/parents
  designation?: string; // For teachers/staff/management
  subject_specialization?: string[];
  created_at: string;
}

export interface Student {
  id: string;
  roll_number: string;
  first_name: string;
  last_name: string;
  class_name: string; // e.g. "Grade 10-A"
  grade: string; // e.g. "10"
  section: string; // e.g. "A"
  parent_name: string;
  parent_phone: string;
  parent_email: string;
  address: string;
  dob: string;
  gender: 'male' | 'female' | 'other';
  blood_group?: string;
  avatar_url?: string;
  admission_date: string;
  status: 'active' | 'transferred' | 'graduated';
}

export interface Staff {
  id: string;
  employee_code: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  designation: string; // e.g., "PGT Mathematics", "Class Teacher Grade 10-A"
  department: string;
  joining_date: string;
  qualification: string;
  assigned_classes: string[];
  assigned_subjects: string[];
  status: 'active' | 'on_leave' | 'resigned';
  avatar_url?: string;
}

export interface ClassRoom {
  id: string;
  grade: string;
  section: string;
  class_teacher_id: string;
  class_teacher_name: string;
  total_students: number;
  room_number: string;
}

export interface AttendanceRecord {
  id: string;
  student_id: string;
  student_name: string;
  roll_number: string;
  class_name: string;
  date: string; // YYYY-MM-DD
  status: 'present' | 'absent' | 'late' | 'excused';
  marked_by: string; // Teacher ID/Name
  remarks?: string;
}

export interface FeeStructure {
  id: string;
  class_name: string;
  title: string;
  tuition_fee: number;
  lab_fee: number;
  transport_fee: number;
  exam_fee: number;
  other_fee: number;
  total_amount: number;
  due_date: string;
  academic_term: string; // e.g., "Term 1 (2026-2027)"
}

export interface FeePayment {
  id: string;
  student_id: string;
  student_name: string;
  class_name: string;
  fee_structure_id: string;
  title: string;
  amount_due: number;
  amount_paid: number;
  discount: number;
  payment_status: 'paid' | 'pending' | 'partially_paid' | 'overdue';
  payment_method?: 'UPI' | 'Card' | 'NetBanking' | 'Cash' | 'Cheque';
  transaction_id?: string;
  paid_at?: string;
  due_date: string;
  receipt_no?: string;
}

export interface Homework {
  id: string;
  title: string;
  description: string;
  subject: string;
  class_name: string;
  assigned_by: string; // Teacher Name
  assigned_date: string;
  due_date: string;
  attachment_url?: string;
  max_marks?: number;
}

export interface HomeworkSubmission {
  id: string;
  homework_id: string;
  student_id: string;
  student_name: string;
  submission_text?: string;
  file_url?: string;
  submitted_at: string;
  status: 'submitted' | 'late' | 'evaluated' | 'pending';
  marks_obtained?: number;
  feedback?: string;
}

export interface SubjectResult {
  subject: string;
  max_marks: number;
  marks_obtained: number;
  grade: string;
  remarks?: string;
}

export interface ReportCard {
  id: string;
  student_id: string;
  student_name: string;
  roll_number: string;
  class_name: string;
  term: string; // e.g. "Mid-Term Examination 2026"
  academic_year: string;
  subjects: SubjectResult[];
  total_marks: number;
  obtained_marks: number;
  percentage: number;
  overall_grade: string;
  rank_in_class?: number;
  attendance_percentage: number;
  teacher_remarks: string;
  issued_date: string;
}

export interface TimetableSlot {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  period: number; // 1 to 8
  time_start: string; // "08:00 AM"
  time_end: string; // "08:45 AM"
  class_name: string;
  subject: string;
  teacher_name: string;
  room_number: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  category: 'academic' | 'event' | 'urgent' | 'exam' | 'general';
  target_audience: 'all' | 'students' | 'teachers' | 'parents' | 'class';
  target_class?: string;
  posted_by: string;
  posted_at: string;
  is_pinned: boolean;
  attachment_url?: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'urgent';
  timestamp: string;
  read: boolean;
  link?: string;
}
