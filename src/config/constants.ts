export const APP_INFO = {
  name: 'Gothwad Education',
  tagline: 'K-12 School Management & Learning Ecosystem',
  academicYear: '2026-2027',
  version: '2.4.0',
  supportEmail: 'support@gothwadeducation.edu',
  phone: '+91 98765 43210',
  address: 'Gothwad Educational Campus, Knowledge City, India'
};

export const CLASSES_LIST = [
  'Grade 1-A', 'Grade 1-B',
  'Grade 2-A', 'Grade 2-B',
  'Grade 3-A', 'Grade 3-B',
  'Grade 4-A', 'Grade 4-B',
  'Grade 5-A', 'Grade 5-B',
  'Grade 6-A', 'Grade 6-B',
  'Grade 7-A', 'Grade 7-B',
  'Grade 8-A', 'Grade 8-B',
  'Grade 9-A', 'Grade 9-B',
  'Grade 10-A', 'Grade 10-B', 'Grade 10-C',
  'Grade 11-Science', 'Grade 11-Commerce', 'Grade 11-Arts',
  'Grade 12-Science', 'Grade 12-Commerce', 'Grade 12-Arts',
];

export const SUBJECTS_LIST = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'English Literature',
  'Computer Science',
  'Social Studies',
  'Hindi',
  'Physical Education',
  'Accountancy',
  'Economics',
];

export const DEMO_ACCOUNTS = [
  {
    role: 'admin' as const,
    name: 'Dr. Rajesh Gothwad',
    email: 'admin@gothwad.edu',
    designation: 'Principal & Director',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    description: 'Full Administrative Controls & School-wide Analytics'
  },
  {
    role: 'teacher' as const,
    name: 'Mrs. Sunita Sharma',
    email: 'teacher@gothwad.edu',
    designation: 'Class Teacher Grade 10-A (PGT Mathematics)',
    avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    description: 'Attendance, Homework, Marks Entry, & Schedule'
  },
  {
    role: 'student' as const,
    name: 'Aarav Gothwad',
    email: 'student@gothwad.edu',
    class_name: 'Grade 10-A',
    student_id: 'GE-2026-10042',
    avatar_url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=250',
    description: 'Attendance Calendar, Homeworks, Marks, Receipts & Circulars'
  },
  {
    role: 'parent' as const,
    name: 'Vikram Gothwad',
    email: 'parent@gothwad.edu',
    class_name: 'Grade 10-A',
    student_id: 'GE-2026-10042',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    description: 'Parent Portal for Fee Payments, Progress, & Attendance'
  }
];
