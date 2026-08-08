import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useSupabase } from '../../hooks/useSupabase';
import { formatCurrency, formatDate } from '../../lib/utils';
import {
  CheckSquare,
  CreditCard,
  BookOpen,
  Award,
  Megaphone,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Calendar,
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

interface StudentDashboardProps {
  onNavigateTab: (tabId: string) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ onNavigateTab }) => {
  const { user } = useAuth();
  const { students, fees, homework, notices, reportCards, attendance } = useSupabase();

  // Find active student data
  const currentStudent = students.find((s) => s.id === user?.student_id) || students[0];

  // Calculated Metrics
  const myFees = fees.filter((f) => f.student_id === currentStudent?.id || f.student_name.includes('Aarav'));
  const pendingFees = myFees.filter((f) => f.payment_status !== 'paid');
  const pendingAmount = pendingFees.reduce((acc, f) => acc + (f.amount_due - f.amount_paid), 0);

  const myHomework = homework.filter((h) => h.class_name === currentStudent?.class_name);
  const myNotices = notices.slice(0, 3);
  const latestReportCard = reportCards[0];

  return (
    <div className="space-y-4">
      {/* Student Welcome Card */}
      <Card className="bg-[#0494F4] text-white p-5 border-none relative overflow-hidden shadow-md">
        <div className="relative z-10 flex items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-extrabold uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full">
              {currentStudent?.class_name || 'Grade 10-A'} • Roll #{currentStudent?.roll_number || '1001'}
            </span>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight mt-1">
              Welcome Back, {currentStudent?.first_name || 'Aarav'}!
            </h2>
            <p className="text-xs text-white/80 max-w-sm">
              Academic Term 2026-2027 • Gothwad Educational Campus
            </p>
          </div>
          <img
            src={currentStudent?.avatar_url || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=250'}
            alt="Student Avatar"
            className="w-16 h-16 rounded-2xl object-cover border-2 border-white/40 shrink-0 hidden sm:block"
          />
        </div>
      </Card>

      {/* Quick Summary Metric Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card onClick={() => onNavigateTab('my-attendance')} hoverable className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500">
            <CheckSquare className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] text-gray-500 dark:text-gray-400">Attendance</p>
            <h4 className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">96.5% Present</h4>
          </div>
        </Card>

        <Card onClick={() => onNavigateTab('fee-payments')} hoverable className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-500">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] text-gray-500 dark:text-gray-400">Fee Dues</p>
            <h4 className="text-base font-extrabold text-amber-600 dark:text-amber-400">
              {pendingAmount > 0 ? formatCurrency(pendingAmount) : 'Paid In Full'}
            </h4>
          </div>
        </Card>

        <Card onClick={() => onNavigateTab('my-homework')} hoverable className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-[#0494F4]/10 text-[#0494F4]">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] text-gray-500 dark:text-gray-400">Active Tasks</p>
            <h4 className="text-base font-extrabold text-[#0494F4]">{myHomework.length} Assigned</h4>
          </div>
        </Card>

        <Card onClick={() => onNavigateTab('report-cards')} hoverable className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-500">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] text-gray-500 dark:text-gray-400">Overall Grade</p>
            <h4 className="text-base font-extrabold text-purple-600 dark:text-purple-400">
              {latestReportCard ? `${latestReportCard.overall_grade} (${latestReportCard.percentage}%)` : 'A1 Grade'}
            </h4>
          </div>
        </Card>
      </div>

      {/* Two-Column Detail Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pending Fee Reminder */}
        <Card>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-amber-500" />
              Fee Payment Status
            </h3>
            <button onClick={() => onNavigateTab('fee-payments')} className="text-xs font-bold text-[#0494F4] hover:underline">
              View All
            </button>
          </div>

          {myFees.map((f) => (
            <div key={f.id} className="p-3 rounded-xl bg-gray-50 dark:bg-[#202124] border border-[#E0E0E0] dark:border-[#3C4043] mb-2">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-xs text-gray-900 dark:text-gray-100">{f.title}</span>
                <Badge status={f.payment_status}>{f.payment_status}</Badge>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>Due: {formatCurrency(f.amount_due)}</span>
                <span>Due Date: {f.due_date}</span>
              </div>
            </div>
          ))}

          {pendingAmount > 0 && (
            <Button onClick={() => onNavigateTab('fee-payments')} fullWidth size="sm" className="mt-2">
              Pay Dues Now via UPI / Card
            </Button>
          )}
        </Card>

        {/* Recent Homework Tasks */}
        <Card>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#0494F4]" />
              Assigned Homework & Worksheets
            </h3>
            <button onClick={() => onNavigateTab('my-homework')} className="text-xs font-bold text-[#0494F4] hover:underline">
              View All
            </button>
          </div>

          <div className="space-y-2">
            {myHomework.slice(0, 2).map((hw) => (
              <div key={hw.id} className="p-3 rounded-xl bg-gray-50 dark:bg-[#202124] border border-[#E0E0E0] dark:border-[#3C4043]">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#0494F4]/10 text-[#0494F4]">
                    {hw.subject}
                  </span>
                  <span className="text-[10px] text-amber-500 font-bold">Due {hw.due_date}</span>
                </div>
                <h4 className="font-bold text-xs text-gray-900 dark:text-gray-100 mt-1">{hw.title}</h4>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Latest Notice Board Preview */}
      <Card>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Megaphone className="w-4 h-4 text-purple-500" />
            Official Circulars & School Bulletins
          </h3>
          <button onClick={() => onNavigateTab('notice-board')} className="text-xs font-bold text-[#0494F4] hover:underline">
            View All
          </button>
        </div>

        <div className="space-y-2">
          {myNotices.map((not) => (
            <div key={not.id} className="p-3 rounded-xl bg-gray-50 dark:bg-[#202124] border border-[#E0E0E0] dark:border-[#3C4043]">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-xs text-gray-900 dark:text-gray-100">{not.title}</span>
                <Badge status={not.category === 'urgent' ? 'absent' : 'present'}>{not.category}</Badge>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{not.content}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
