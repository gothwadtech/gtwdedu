import { Student, Staff, FeePayment, Homework, HomeworkSubmission, ReportCard, Notice, AttendanceRecord } from '../types';
import { INITIAL_STUDENTS, INITIAL_STAFF, INITIAL_FEES, INITIAL_HOMEWORK, INITIAL_SUBMISSIONS, INITIAL_NOTICES, INITIAL_REPORT_CARDS, INITIAL_ATTENDANCE } from './mockData';
import { safeStorage } from './storage';

const STORAGE_KEYS = {
  STUDENTS: 'ge_students_v1',
  STAFF: 'ge_staff_v1',
  FEES: 'ge_fees_v1',
  HOMEWORK: 'ge_homework_v1',
  SUBMISSIONS: 'ge_submissions_v1',
  NOTICES: 'ge_notices_v1',
  REPORT_CARDS: 'ge_report_cards_v1',
  ATTENDANCE: 'ge_attendance_v1',
};

function getLocal<T>(key: string, initial: T): T {
  try {
    const item = safeStorage.getItem(key);
    return item ? JSON.parse(item) : initial;
  } catch (err) {
    console.warn(`Fallback active for ${key}:`, err);
    return initial;
  }
}

function setLocal<T>(key: string, value: T): void {
  try {
    safeStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`Fallback save active for ${key}:`, err);
  }
}

class DataStore {
  students: Student[] = getLocal(STORAGE_KEYS.STUDENTS, INITIAL_STUDENTS);
  staff: Staff[] = getLocal(STORAGE_KEYS.STAFF, INITIAL_STAFF);
  fees: FeePayment[] = getLocal(STORAGE_KEYS.FEES, INITIAL_FEES);
  homework: Homework[] = getLocal(STORAGE_KEYS.HOMEWORK, INITIAL_HOMEWORK);
  submissions: HomeworkSubmission[] = getLocal(STORAGE_KEYS.SUBMISSIONS, INITIAL_SUBMISSIONS);
  notices: Notice[] = getLocal(STORAGE_KEYS.NOTICES, INITIAL_NOTICES);
  reportCards: ReportCard[] = getLocal(STORAGE_KEYS.REPORT_CARDS, INITIAL_REPORT_CARDS);
  attendance: AttendanceRecord[] = getLocal(STORAGE_KEYS.ATTENDANCE, INITIAL_ATTENDANCE);

  private listeners: Set<() => void> = new Set();

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((fn) => fn());
  }

  // --- Student Methods ---
  getStudents() {
    return this.students;
  }
  addStudent(student: Omit<Student, 'id'>) {
    const newStudent: Student = {
      ...student,
      id: `st-${Date.now()}`,
    };
    this.students = [newStudent, ...this.students];
    setLocal(STORAGE_KEYS.STUDENTS, this.students);
    this.notify();
    return newStudent;
  }
  updateStudent(id: string, updates: Partial<Student>) {
    this.students = this.students.map((s) => (s.id === id ? { ...s, ...updates } : s));
    setLocal(STORAGE_KEYS.STUDENTS, this.students);
    this.notify();
  }
  deleteStudent(id: string) {
    this.students = this.students.filter((s) => s.id !== id);
    setLocal(STORAGE_KEYS.STUDENTS, this.students);
    this.notify();
  }

  // --- Staff Methods ---
  getStaff() {
    return this.staff;
  }
  addStaff(member: Omit<Staff, 'id'>) {
    const newStaff: Staff = {
      ...member,
      id: `tf-${Date.now()}`,
    };
    this.staff = [newStaff, ...this.staff];
    setLocal(STORAGE_KEYS.STAFF, this.staff);
    this.notify();
    return newStaff;
  }
  updateStaff(id: string, updates: Partial<Staff>) {
    this.staff = this.staff.map((s) => (s.id === id ? { ...s, ...updates } : s));
    setLocal(STORAGE_KEYS.STAFF, this.staff);
    this.notify();
  }
  deleteStaff(id: string) {
    this.staff = this.staff.filter((s) => s.id !== id);
    setLocal(STORAGE_KEYS.STAFF, this.staff);
    this.notify();
  }

  // --- Fee Methods ---
  getFees() {
    return this.fees;
  }
  payFee(id: string, method: 'UPI' | 'Card' | 'NetBanking' | 'Cash' | 'Cheque') {
    const receipt_no = `REC-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    const transaction_id = `${method}/${Date.now()}/GOTHWAD`;
    
    this.fees = this.fees.map((f) => {
      if (f.id === id) {
        return {
          ...f,
          amount_paid: f.amount_due,
          payment_status: 'paid',
          payment_method: method,
          transaction_id,
          paid_at: new Date().toLocaleString(),
          receipt_no,
        };
      }
      return f;
    });
    setLocal(STORAGE_KEYS.FEES, this.fees);
    this.notify();
  }
  addFeeRecord(fee: Omit<FeePayment, 'id'>) {
    const newFee: FeePayment = {
      ...fee,
      id: `fee-${Date.now()}`,
    };
    this.fees = [newFee, ...this.fees];
    setLocal(STORAGE_KEYS.FEES, this.fees);
    this.notify();
  }

  // --- Homework Methods ---
  getHomework() {
    return this.homework;
  }
  addHomework(hw: Omit<Homework, 'id'>) {
    const newHw: Homework = {
      ...hw,
      id: `hw-${Date.now()}`,
    };
    this.homework = [newHw, ...this.homework];
    setLocal(STORAGE_KEYS.HOMEWORK, this.homework);
    this.notify();
  }

  // --- Submission Methods ---
  getSubmissions() {
    return this.submissions;
  }
  addSubmission(sub: Omit<HomeworkSubmission, 'id'>) {
    const newSub: HomeworkSubmission = {
      ...sub,
      id: `sub-${Date.now()}`,
    };
    this.submissions = [newSub, ...this.submissions];
    setLocal(STORAGE_KEYS.SUBMISSIONS, this.submissions);
    this.notify();
  }
  evaluateSubmission(id: string, marks: number, feedback: string) {
    this.submissions = this.submissions.map((s) => (s.id === id ? { ...s, marks_obtained: marks, feedback, status: 'evaluated' } : s));
    setLocal(STORAGE_KEYS.SUBMISSIONS, this.submissions);
    this.notify();
  }

  // --- Attendance Methods ---
  getAttendance() {
    return this.attendance;
  }
  markAttendanceBatch(records: Omit<AttendanceRecord, 'id'>[]) {
    const newRecords = records.map((r) => ({
      ...r,
      id: `att-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    }));
    // Remove duplicate entries for same student and date
    const date = records[0]?.date;
    if (date) {
      const studentIds = new Set(records.map((r) => r.student_id));
      this.attendance = this.attendance.filter((a) => !(a.date === date && studentIds.has(a.student_id)));
    }
    this.attendance = [...newRecords, ...this.attendance];
    setLocal(STORAGE_KEYS.ATTENDANCE, this.attendance);
    this.notify();
  }

  // --- Notice Methods ---
  getNotices() {
    return this.notices;
  }
  addNotice(notice: Omit<Notice, 'id'>) {
    const newNotice: Notice = {
      ...notice,
      id: `not-${Date.now()}`,
    };
    this.notices = [newNotice, ...this.notices];
    setLocal(STORAGE_KEYS.NOTICES, this.notices);
    this.notify();
  }
  deleteNotice(id: string) {
    this.notices = this.notices.filter((n) => n.id !== id);
    setLocal(STORAGE_KEYS.NOTICES, this.notices);
    this.notify();
  }

  // --- Report Cards Methods ---
  getReportCards() {
    return this.reportCards;
  }
  addOrUpdateReportCard(rc: Omit<ReportCard, 'id'>) {
    const id = `rc-${Date.now()}`;
    const newRc: ReportCard = { ...rc, id };
    this.reportCards = [newRc, ...this.reportCards];
    setLocal(STORAGE_KEYS.REPORT_CARDS, this.reportCards);
    this.notify();
  }

  resetToDefault() {
    this.students = INITIAL_STUDENTS;
    this.staff = INITIAL_STAFF;
    this.fees = INITIAL_FEES;
    this.homework = INITIAL_HOMEWORK;
    this.submissions = INITIAL_SUBMISSIONS;
    this.notices = INITIAL_NOTICES;
    this.reportCards = INITIAL_REPORT_CARDS;
    this.attendance = INITIAL_ATTENDANCE;

    setLocal(STORAGE_KEYS.STUDENTS, this.students);
    setLocal(STORAGE_KEYS.STAFF, this.staff);
    setLocal(STORAGE_KEYS.FEES, this.fees);
    setLocal(STORAGE_KEYS.HOMEWORK, this.homework);
    setLocal(STORAGE_KEYS.SUBMISSIONS, this.submissions);
    setLocal(STORAGE_KEYS.NOTICES, this.notices);
    setLocal(STORAGE_KEYS.REPORT_CARDS, this.reportCards);
    setLocal(STORAGE_KEYS.ATTENDANCE, this.attendance);
    this.notify();
  }
}

export const dataStore = new DataStore();
