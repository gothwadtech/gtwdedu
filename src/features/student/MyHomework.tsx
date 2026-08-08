import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useSupabase } from '../../hooks/useSupabase';
import { useToastContext } from '../../context/ToastContext';
import { BookOpen, Calendar, CheckCircle2, FileUp, Send, Check } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Badge } from '../../components/ui/Badge';
import { Homework } from '../../types';

export const MyHomework: React.FC = () => {
  const { user } = useAuth();
  const { homework, submissions, students, store } = useSupabase();
  const { showToast } = useToastContext();

  const currentStudent = students.find((s) => s.id === user?.student_id) || students[0];
  const myHomeworkList = homework.filter((h) => h.class_name === currentStudent?.class_name);

  const [submittingHw, setSubmittingHw] = useState<Homework | null>(null);
  const [solutionText, setSolutionText] = useState('');

  const handleSubmitSolution = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submittingHw) return;
    if (!solutionText) {
      showToast('Please type your solution or link', 'warning');
      return;
    }

    store.addSubmission({
      homework_id: submittingHw.id,
      student_id: currentStudent.id,
      student_name: `${currentStudent.first_name} ${currentStudent.last_name}`,
      submission_text: solutionText,
      submitted_at: new Date().toLocaleString(),
      status: 'submitted',
    });

    showToast(`Homework solution for "${submittingHw.title}" submitted successfully!`, 'success');
    setSubmittingHw(null);
    setSolutionText('');
  };

  return (
    <div className="space-y-4">
      {/* Banner */}
      <Card className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-[#2D2F31]">
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#0494F4]" />
            Assigned Homework & Online Submission Tracker
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Submit coursework solutions, track evaluation grades, and read teacher feedback.
          </p>
        </div>
      </Card>

      {/* Homework Stream */}
      <div className="space-y-3">
        {myHomeworkList.map((hw) => {
          const sub = submissions.find((s) => s.homework_id === hw.id && (s.student_id === currentStudent?.id || s.student_name.includes('Aarav')));
          const isSubmitted = !!sub;

          return (
            <Card key={hw.id} className="relative">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#0494F4]/10 text-[#0494F4]">
                    {hw.subject} • {hw.assigned_by}
                  </span>
                  <h3 className="font-bold text-base text-gray-900 dark:text-gray-100 mt-1">{hw.title}</h3>
                </div>
                {isSubmitted ? (
                  <Badge status={sub.status}>{sub.status}</Badge>
                ) : (
                  <Badge status="pending">Pending</Badge>
                )}
              </div>

              <p className="text-xs text-gray-600 dark:text-gray-300 mb-3">{hw.description}</p>

              <div className="flex items-center justify-between text-[11px] text-gray-400 dark:text-gray-500 pt-2 border-t border-[#E0E0E0] dark:border-[#3C4043]">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-500" /> Due Date: {hw.due_date}
                </span>

                {isSubmitted ? (
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>
                      {sub.status === 'evaluated'
                        ? `Grade: ${sub.marks_obtained}/${hw.max_marks || 20}`
                        : 'Submitted'}
                    </span>
                  </div>
                ) : (
                  <Button size="sm" onClick={() => setSubmittingHw(hw)} icon={<Send className="w-3.5 h-3.5" />}>
                    Submit Task
                  </Button>
                )}
              </div>

              {sub?.feedback && (
                <div className="mt-3 p-2.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200">
                  <strong>Teacher Feedback:</strong> {sub.feedback}
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Submission Modal */}
      <Modal isOpen={!!submittingHw} onClose={() => setSubmittingHw(null)} title="Submit Assignment Solution">
        {submittingHw && (
          <form onSubmit={handleSubmitSolution} className="space-y-3">
            <div className="p-3 bg-gray-50 dark:bg-[#202124] rounded-xl border border-[#E0E0E0] dark:border-[#3C4043]">
              <span className="text-[10px] font-bold text-[#0494F4] uppercase">{submittingHw.subject}</span>
              <h4 className="font-bold text-xs text-gray-900 dark:text-gray-100">{submittingHw.title}</h4>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-300 mb-1">
                Your Answer / Solution Steps
              </label>
              <textarea
                required
                rows={4}
                placeholder="Type step-by-step solution or paste Google Drive / Github link..."
                value={solutionText}
                onChange={(e) => setSolutionText(e.target.value)}
                className="w-full bg-gray-50 dark:bg-[#202124] text-gray-900 dark:text-gray-100 border border-[#E0E0E0] dark:border-[#3C4043] rounded-xl p-3 text-sm focus:border-[#0494F4] focus:outline-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-[#E0E0E0] dark:border-[#3C4043]">
              <Button type="button" variant="outline" onClick={() => setSubmittingHw(null)}>
                Cancel
              </Button>
              <Button type="submit">Upload & Submit</Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};
