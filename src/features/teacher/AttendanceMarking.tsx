import React, { useState } from 'react';
import { useSupabase } from '../../hooks/useSupabase';
import { useToastContext } from '../../context/ToastContext';
import { CLASSES_LIST } from '../../config/constants';
import { CheckSquare, Save, CheckCircle2, XCircle, Clock, Calendar } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';

export const AttendanceMarking: React.FC = () => {
  const { students, store } = useSupabase();
  const { showToast } = useToastContext();

  const [selectedClass, setSelectedClass] = useState<string>('Grade 10-A');
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);

  const classStudents = students.filter((s) => s.class_name === selectedClass);

  const [attendanceMap, setAttendanceMap] = useState<Record<string, 'present' | 'absent' | 'late'>>(() => {
    const initial: Record<string, 'present' | 'absent' | 'late'> = {};
    classStudents.forEach((s) => {
      initial[s.id] = 'present';
    });
    return initial;
  });

  const handleStatusChange = (studentId: string, status: 'present' | 'absent' | 'late') => {
    setAttendanceMap((prev) => ({ ...prev, [studentId]: status }));
  };

  const handleMarkAll = (status: 'present' | 'absent') => {
    const updated: Record<string, 'present' | 'absent' | 'late'> = {};
    classStudents.forEach((s) => {
      updated[s.id] = status;
    });
    setAttendanceMap(updated);
  };

  const handleSaveAttendance = () => {
    const records = classStudents.map((s) => ({
      student_id: s.id,
      student_name: `${s.first_name} ${s.last_name}`,
      roll_number: s.roll_number,
      class_name: s.class_name,
      date: selectedDate,
      status: attendanceMap[s.id] || 'present',
      marked_by: 'Mrs. Sunita Sharma',
    }));

    store.markAttendanceBatch(records);
    showToast(`Attendance saved for ${classStudents.length} students of ${selectedClass}`, 'success');
  };

  const presentCount = Object.values(attendanceMap).filter((st) => st === 'present').length;
  const absentCount = Object.values(attendanceMap).filter((st) => st === 'absent').length;
  const lateCount = Object.values(attendanceMap).filter((st) => st === 'late').length;

  return (
    <div className="space-y-4">
      {/* Header Selector */}
      <Card className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-[#2D2F31]">
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-[#0494F4]" />
            Daily Attendance Marking
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Mark student presence, absence, and bus/tardy delays in real time.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="bg-gray-50 dark:bg-[#202124] text-gray-900 dark:text-gray-100 border border-[#E0E0E0] dark:border-[#3C4043] rounded-xl px-3 py-2 text-xs font-bold"
            >
              {CLASSES_LIST.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-[#202124] border border-[#E0E0E0] dark:border-[#3C4043] rounded-xl px-3 py-2 text-xs font-semibold">
            <Calendar className="w-4 h-4 text-gray-400" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-transparent focus:outline-none text-gray-900 dark:text-gray-100"
            />
          </div>
        </div>
      </Card>

      {/* Summary Chips & Batch Actions */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-gray-50 dark:bg-[#202124] rounded-2xl border border-[#E0E0E0] dark:border-[#3C4043]">
        <div className="flex items-center gap-3 text-xs font-bold">
          <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-4 h-4" /> Present: {presentCount}
          </span>
          <span className="flex items-center gap-1 text-rose-600 dark:text-rose-400">
            <XCircle className="w-4 h-4" /> Absent: {absentCount}
          </span>
          <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
            <Clock className="w-4 h-4" /> Late: {lateCount}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleMarkAll('present')}
            className="text-xs font-bold px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 transition-colors"
          >
            Mark All Present
          </button>
          <button
            onClick={() => handleMarkAll('absent')}
            className="text-xs font-bold px-3 py-1 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 transition-colors"
          >
            Mark All Absent
          </button>
        </div>
      </div>

      {/* Roster Grid */}
      <div className="space-y-2">
        {classStudents.map((st) => {
          const currentStatus = attendanceMap[st.id] || 'present';
          return (
            <Card
              key={st.id}
              className="flex items-center justify-between gap-3 p-3.5 hover:border-[#0494F4] transition-all"
            >
              <div className="flex items-center gap-3">
                <img
                  src={st.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'}
                  alt={st.first_name}
                  className="w-10 h-10 rounded-full object-cover border border-[#E0E0E0] dark:border-[#3C4043]"
                />
                <div>
                  <h4 className="font-bold text-sm text-gray-900 dark:text-gray-100">
                    {st.first_name} {st.last_name}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Roll #{st.roll_number} • Parent: {st.parent_name}
                  </p>
                </div>
              </div>

              {/* Status Selector Buttons */}
              <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-[#202124] p-1 rounded-xl border border-[#E0E0E0] dark:border-[#3C4043]">
                <button
                  type="button"
                  onClick={() => handleStatusChange(st.id, 'present')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    currentStatus === 'present'
                      ? 'bg-emerald-500 text-white shadow-xs'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
                  }`}
                >
                  P
                </button>
                <button
                  type="button"
                  onClick={() => handleStatusChange(st.id, 'absent')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    currentStatus === 'absent'
                      ? 'bg-rose-500 text-white shadow-xs'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
                  }`}
                >
                  A
                </button>
                <button
                  type="button"
                  onClick={() => handleStatusChange(st.id, 'late')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    currentStatus === 'late'
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
                  }`}
                >
                  L
                </button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Save Button Bar */}
      <div className="sticky bottom-20 md:bottom-6 z-30 pt-2">
        <Button onClick={handleSaveAttendance} fullWidth icon={<Save className="w-4 h-4" />}>
          Submit & Lock Attendance Register
        </Button>
      </div>
    </div>
  );
};
