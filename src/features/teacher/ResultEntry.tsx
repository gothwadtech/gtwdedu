import React, { useState } from 'react';
import { useSupabase } from '../../hooks/useSupabase';
import { useToastContext } from '../../context/ToastContext';
import { CLASSES_LIST, SUBJECTS_LIST } from '../../config/constants';
import { Award, Save, Calculator, FileText, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';

export const ResultEntry: React.FC = () => {
  const { students, store } = useSupabase();
  const { showToast } = useToastContext();

  const [selectedClass, setSelectedClass] = useState<string>('Grade 10-A');
  const [selectedTerm, setSelectedTerm] = useState<string>('Mid-Term Examination 2026-27');
  const classStudents = students.filter((s) => s.class_name === selectedClass);

  const [studentId, setStudentId] = useState<string>(classStudents[0]?.id || 'st-1');

  // Subjects Marks Map
  const [marksMap, setMarksMap] = useState<Record<string, number>>({
    Mathematics: 95,
    Physics: 92,
    Chemistry: 88,
    'English Literature': 90,
    'Computer Science': 98,
  });

  const [teacherRemarks, setTeacherRemarks] = useState(
    'Demonstrates exemplary academic dedication and sharp analytical focus across all subjects.'
  );

  const handleMarkChange = (subject: string, score: number) => {
    setMarksMap((prev) => ({ ...prev, [subject]: Math.min(100, Math.max(0, score)) }));
  };

  const totalMax = Object.keys(marksMap).length * 100;
  const totalObtained = (Object.values(marksMap) as number[]).reduce((acc: number, curr: number) => acc + curr, 0);
  const percentage = Number(((totalObtained / (totalMax || 1)) * 100).toFixed(1));

  const calculateGrade = (pct: number) => {
    if (pct >= 90) return 'A1';
    if (pct >= 80) return 'A2';
    if (pct >= 70) return 'B1';
    if (pct >= 60) return 'B2';
    return 'C';
  };

  const handleSaveReportCard = () => {
    const selectedStudent = students.find((s) => s.id === studentId) || classStudents[0];
    if (!selectedStudent) return;

    const subjectsArray = Object.entries(marksMap).map(([subject, marks_obtained]) => ({
      subject,
      max_marks: 100,
      marks_obtained: Number(marks_obtained),
      grade: calculateGrade(Number(marks_obtained)),
    }));

    store.addOrUpdateReportCard({
      student_id: selectedStudent.id,
      student_name: `${selectedStudent.first_name} ${selectedStudent.last_name}`,
      roll_number: selectedStudent.roll_number,
      class_name: selectedStudent.class_name,
      term: selectedTerm,
      academic_year: '2026-2027',
      subjects: subjectsArray,
      total_marks: totalMax,
      obtained_marks: totalObtained,
      percentage,
      overall_grade: calculateGrade(percentage),
      attendance_percentage: 96.5,
      teacher_remarks: teacherRemarks,
      issued_date: new Date().toISOString().split('T')[0],
    });

    showToast(`Official Report Card compiled for ${selectedStudent.first_name} ${selectedStudent.last_name}!`, 'success');
  };

  return (
    <div className="space-y-4">
      {/* Header Selector */}
      <Card className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-[#2D2F31]">
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Award className="w-5 h-5 text-[#0494F4]" />
            Subject Marks & Grade Entry Form
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Compile term marksheets, calculate percentage GPA, and save official report cards.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
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

          <select
            value={selectedTerm}
            onChange={(e) => setSelectedTerm(e.target.value)}
            className="bg-gray-50 dark:bg-[#202124] text-gray-900 dark:text-gray-100 border border-[#E0E0E0] dark:border-[#3C4043] rounded-xl px-3 py-2 text-xs font-bold"
          >
            <option value="Mid-Term Examination 2026-27">Mid-Term 2026</option>
            <option value="Unit Test 1 (2026-27)">Unit Test 1</option>
            <option value="Final Board Mock 2026-27">Final Mock</option>
          </select>
        </div>
      </Card>

      {/* Select Student Selector Card */}
      <Card>
        <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-300 mb-2">
          Select Student from {selectedClass} Roster
        </label>
        <select
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="w-full bg-gray-50 dark:bg-[#202124] text-gray-900 dark:text-gray-100 border border-[#E0E0E0] dark:border-[#3C4043] rounded-xl px-3.5 py-2.5 text-sm font-bold"
        >
          {classStudents.map((st) => (
            <option key={st.id} value={st.id}>
              {st.first_name} {st.last_name} (Roll #{st.roll_number})
            </option>
          ))}
        </select>
      </Card>

      {/* Marks Table */}
      <Card className="p-4 space-y-3">
        <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100 mb-2">
          Subject Marks Breakdown (Max: 100 per subject)
        </h3>

        <div className="space-y-2">
          {Object.keys(marksMap).map((sb) => (
            <div key={sb} className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-gray-50 dark:bg-[#202124]">
              <span className="font-bold text-xs text-gray-900 dark:text-gray-100">{sb}</span>
              <div className="flex items-center gap-3">
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={marksMap[sb]}
                  onChange={(e) => handleMarkChange(sb, Number(e.target.value))}
                  className="w-24 text-center font-extrabold text-sm py-1"
                />
                <span className="w-10 text-center font-extrabold text-xs text-[#0494F4]">
                  {calculateGrade(marksMap[sb])}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Calculated Totals */}
        <div className="p-3 bg-[#0494F4]/10 rounded-2xl border border-[#0494F4]/20 flex items-center justify-between text-xs font-bold text-gray-900 dark:text-gray-100 mt-4">
          <div>
            Total Score: {totalObtained} / {totalMax}
          </div>
          <div className="text-sm font-black text-[#0494F4]">
            {percentage}% • Grade {calculateGrade(percentage)}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-300 mb-1">
            Teacher / Class Advisor Remarks
          </label>
          <textarea
            rows={2}
            value={teacherRemarks}
            onChange={(e) => setTeacherRemarks(e.target.value)}
            className="w-full bg-gray-50 dark:bg-[#202124] text-gray-900 dark:text-gray-100 border border-[#E0E0E0] dark:border-[#3C4043] rounded-xl p-3 text-xs"
          />
        </div>

        <Button onClick={handleSaveReportCard} fullWidth icon={<Save className="w-4 h-4" />}>
          Compile & Issue Term Report Card
        </Button>
      </Card>
    </div>
  );
};
