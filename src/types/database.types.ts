export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          name: string;
          role: 'admin' | 'teacher' | 'student' | 'parent';
          phone: string | null;
          class_name: string | null;
          designation: string | null;
          avatar_url: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          email: string;
          name: string;
          role: 'admin' | 'teacher' | 'student' | 'parent';
          phone?: string | null;
          class_name?: string | null;
          designation?: string | null;
          avatar_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          role?: 'admin' | 'teacher' | 'student' | 'parent';
          phone?: string | null;
          class_name?: string | null;
          designation?: string | null;
          avatar_url?: string | null;
          created_at?: string;
        };
      };
      students: {
        Row: {
          id: string;
          roll_number: string;
          first_name: string;
          last_name: string;
          class_name: string;
          grade: string;
          section: string;
          parent_name: string;
          parent_phone: string;
          parent_email: string;
          status: string;
        };
      };
      attendance: {
        Row: {
          id: string;
          student_id: string;
          date: string;
          status: string;
          marked_by: string;
        };
      };
      fees: {
        Row: {
          id: string;
          student_id: string;
          title: string;
          amount_due: number;
          amount_paid: number;
          payment_status: string;
          due_date: string;
        };
      };
      homework: {
        Row: {
          id: string;
          title: string;
          description: string;
          subject: string;
          class_name: string;
          due_date: string;
        };
      };
      notices: {
        Row: {
          id: string;
          title: string;
          content: string;
          category: string;
          posted_at: string;
          is_pinned: boolean;
        };
      };
    };
  };
}
