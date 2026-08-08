import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useSupabase } from '../../hooks/useSupabase';
import { Award, Printer, GraduationCap, CheckCircle2 } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export const ReportCards: React.FC = () => {
  const { user } = useAuth();
  const { reportCards, students } = useSupabase();

  const currentStudent = students.find((s) => s.id === user?.student_id) || students[0];
  const rc = reportCards[0];

  return (
    <div className="space-y-4">
      {/* Banner */}
      <Card className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-[#2D2F31]">
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Award className="w-5 h-5 text-[#0494F4]" />
            Academic Marksheets & Term Report Cards
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Verified term results, class rank, attendance records, and teacher remarks.
          </p>
        </div>
        <Button onClick={() => window.print()} icon={<Printer className="w-4 h-4" />}>
          Print Marksheet
        </Button>
      </Card>

      {/* Official Report Card Printable Document */}
      {rc ? (
        <Card className="p-6 bg-white dark:bg-[#202124] border border-[#E0E0E0] dark:border-[#3C4043] space-y-5">
          {/* School Header */}
          <div className="text-center border-b border-[#E0E0E0] dark:border-[#3C4043] pb-4">
            <div className="w-12 h-12 bg-[#0494F4] text-white rounded-2xl flex items-center justify-center mx-auto mb-2 font-bold">
              <GraduationCap className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-black text-gray-900 dark:text-gray-100 tracking-tight">
              GOTHWAD EDUCATION CAMPUS
            </h2>
            <p className="text-xs font-semibold text-[#0494F4]">{rc.term} • ACADEMIC SESSION {rc.academic_year}</p>
          </div>

          {/* Student Info Box */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-gray-50 dark:bg-[#2D2F31] rounded-2xl text-xs">
            <div>
              <span className="text-gray-400 font-semibold block text-[10px] uppercase">Student Name</span>
              <strong className="text-gray-900 dark:text-gray-100">{rc.student_name}</strong>
            </div>
            <div>
              <span className="text-gray-400 font-semibold block text-[10px] uppercase">Class & Section</span>
              <strong className="text-gray-900 dark:text-gray-100">{rc.class_name}</strong>
            </div>
            <div>
              <span className="text-gray-400 font-semibold block text-[10px] uppercase">Roll Number</span>
              <strong className="text-gray-900 dark:text-gray-100">#{rc.roll_number}</strong>
            </div>
            <div>
              <span className="text-gray-400 font-semibold block text-[10px] uppercase">Attendance</span>
              <strong className="text-emerald-600 dark:text-emerald-400">{rc.attendance_percentage}%</strong>
            </div>
          </div>

          {/* Subject Scores Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-100 dark:bg-[#2D2F31] text-gray-700 dark:text-gray-300 uppercase text-[10px] font-bold border-b border-[#E0E0E0] dark:border-[#3C4043]">
                <tr>
                  <th className="px-4 py-3">Subject Name</th>
                  <th className="px-4 py-3 text-center">Max Marks</th>
                  <th className="px-4 py-3 text-center">Marks Obtained</th>
                  <th className="px-4 py-3 text-center">Grade</th>
                  <th className="px-4 py-3">Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E0E0E0] dark:divide-[#3C4043]">
                {rc.subjects.map((sb) => (
                  <tr key={sb.subject} className="hover:bg-gray-50 dark:hover:bg-[#2D2F31]/50">
                    <td className="px-4 py-3 font-bold text-gray-900 dark:text-gray-100">{sb.subject}</td>
                    <td className="px-4 py-3 text-center text-gray-500">{sb.max_marks}</td>
                    <td className="px-4 py-3 text-center font-extrabold text-gray-900 dark:text-gray-100">
                      {sb.marks_obtained}
                    </td>
                    <td className="px-4 py-3 text-center font-black text-[#0494F4]">{sb.grade}</td>
                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400 italic">{sb.remarks || 'Pass'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Aggregate Stats Bar */}
          <div className="p-4 bg-[#0494F4]/10 rounded-2xl border border-[#0494F4]/20 flex flex-wrap items-center justify-between gap-3 text-xs font-bold text-gray-900 dark:text-gray-100">
            <div>
              Total Score: <span className="text-sm font-black">{rc.obtained_marks} / {rc.total_marks}</span>
            </div>
            <div>
              Percentage: <span className="text-sm font-black text-[#0494F4]">{rc.percentage}%</span>
            </div>
            <div>
              Overall Grade: <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">{rc.overall_grade}</span>
            </div>
            <div>
              Class Rank: <span className="text-sm font-black text-purple-600 dark:text-purple-400">#{rc.rank_in_class || 2}</span>
            </div>
          </div>

          {/* Class Teacher Remarks */}
          <div className="p-3.5 bg-gray-50 dark:bg-[#2D2F31] rounded-2xl border border-[#E0E0E0] dark:border-[#3C4043] text-xs space-y-1">
            <span className="font-extrabold text-[#0494F4] uppercase text-[10px]">Class Teacher Remarks</span>
            <p className="text-gray-700 dark:text-gray-300 italic">{rc.teacher_remarks}</p>
          </div>
        </Card>
      ) : (
        <Card className="text-center py-8 text-xs text-gray-400">
          No active term marksheets published yet.
        </Card>
      )}
    </div>
  );
};
