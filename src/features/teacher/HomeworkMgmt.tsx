import React, { useState } from 'react';
import { useSupabase } from '../../hooks/useSupabase';
import { useToastContext } from '../../context/ToastContext';
import { CLASSES_LIST, SUBJECTS_LIST } from '../../config/constants';
import { BookOpen, Plus, Calendar, CheckCircle2, FileText, Send, UserCheck } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { Modal } from '../../components/ui/Modal';
import { Badge } from '../../components/ui/Badge';

export const HomeworkMgmt: React.FC = () => {
  const { homework, submissions, store } = useSupabase();
  const { showToast } = useToastContext();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedHomeworkId, setSelectedHomeworkId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: 'Mathematics',
    class_name: 'Grade 10-A',
    due_date: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    max_marks: 20,
  });

  const [evalMarks, setEvalMarks] = useState<number>(18);
  const [evalFeedback, setEvalFeedback] = useState<string>('Good step-by-step resolution');

  const handleCreateHomework = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      showToast('Please enter homework title and instructions', 'warning');
      return;
    }

    store.addHomework({
      ...formData,
      assigned_by: 'Mrs. Sunita Sharma',
      assigned_date: new Date().toISOString().split('T')[0],
    });

    showToast(`Homework assigned to ${formData.class_name}!`, 'success');
    setShowCreateModal(false);
    setFormData({
      title: '',
      description: '',
      subject: 'Mathematics',
      class_name: 'Grade 10-A',
      due_date: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
      max_marks: 20,
    });
  };

  const handleEvaluate = (subId: string) => {
    store.evaluateSubmission(subId, Number(evalMarks), evalFeedback);
    showToast('Submission evaluated and grade recorded!', 'success');
  };

  return (
    <div className="space-y-4">
      {/* Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-[#2D2F31] p-4 rounded-2xl border border-[#E0E0E0] dark:border-[#3C4043]">
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#0494F4]" />
            Homework & Assignment Management
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Publish coursework, review student submission files, and record feedback.
          </p>
        </div>
        <Button onClick={() => setShowCreateModal(true)} icon={<Plus className="w-4 h-4" />}>
          Assign New Task
        </Button>
      </div>

      {/* Homework Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {homework.map((hw) => {
          const hwSubmissions = submissions.filter((s) => s.homework_id === hw.id);
          return (
            <Card key={hw.id} className="relative">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#0494F4]/10 text-[#0494F4]">
                    {hw.subject} • {hw.class_name}
                  </span>
                  <h3 className="font-bold text-base text-gray-900 dark:text-gray-100 mt-1">{hw.title}</h3>
                </div>
                <Badge variant="outline">Max Marks: {hw.max_marks || 20}</Badge>
              </div>

              <p className="text-xs text-gray-600 dark:text-gray-300 mb-3">{hw.description}</p>

              <div className="flex items-center justify-between text-[11px] text-gray-400 dark:text-gray-500 pt-2 border-t border-[#E0E0E0] dark:border-[#3C4043]">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-500" /> Due: {hw.due_date}
                </span>
                <button
                  onClick={() => setSelectedHomeworkId(hw.id)}
                  className="font-bold text-[#0494F4] hover:underline flex items-center gap-1"
                >
                  <FileText className="w-3.5 h-3.5" /> View Submissions ({hwSubmissions.length})
                </button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Create Modal */}
      <Modal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} title="Assign New Class Homework">
        <form onSubmit={handleCreateHomework} className="space-y-3">
          <Input
            label="Assignment Title"
            required
            placeholder="e.g. Quadratic Formula Worksheet"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-300 mb-1">
                Class / Grade
              </label>
              <select
                value={formData.class_name}
                onChange={(e) => setFormData({ ...formData, class_name: e.target.value })}
                className="w-full bg-gray-50 dark:bg-[#202124] text-gray-900 dark:text-gray-100 border border-[#E0E0E0] dark:border-[#3C4043] rounded-xl px-3 py-2 text-sm"
              >
                {CLASSES_LIST.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-300 mb-1">
                Subject
              </label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full bg-gray-50 dark:bg-[#202124] text-gray-900 dark:text-gray-100 border border-[#E0E0E0] dark:border-[#3C4043] rounded-xl px-3 py-2 text-sm"
              >
                {SUBJECTS_LIST.map((sb) => (
                  <option key={sb} value={sb}>
                    {sb}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-300 mb-1">
              Instructions & Problem Set
            </label>
            <textarea
              required
              rows={3}
              placeholder="Detail exercise questions, references..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-gray-50 dark:bg-[#202124] text-gray-900 dark:text-gray-100 border border-[#E0E0E0] dark:border-[#3C4043] rounded-xl p-3 text-sm focus:border-[#0494F4] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Input
              label="Submission Due Date"
              type="date"
              required
              value={formData.due_date}
              onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
            />
            <Input
              label="Max Points / Marks"
              type="number"
              required
              value={formData.max_marks}
              onChange={(e) => setFormData({ ...formData, max_marks: Number(e.target.value) })}
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-[#E0E0E0] dark:border-[#3C4043]">
            <Button type="button" variant="outline" onClick={() => setShowCreateModal(false)}>
              Cancel
            </Button>
            <Button type="submit">Broadcast Assignment</Button>
          </div>
        </form>
      </Modal>

      {/* Submissions Review Modal */}
      <Modal
        isOpen={!!selectedHomeworkId}
        onClose={() => setSelectedHomeworkId(null)}
        title="Student Homework Submissions"
      >
        <div className="space-y-3">
          {submissions
            .filter((s) => s.homework_id === selectedHomeworkId)
            .map((sub) => (
              <Card key={sub.id} className="p-3 bg-gray-50 dark:bg-[#202124]">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-gray-900 dark:text-gray-100">{sub.student_name}</span>
                  <Badge status={sub.status}>{sub.status}</Badge>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">{sub.submission_text}</p>

                <div className="pt-2 border-t border-[#E0E0E0] dark:border-[#3C4043] space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={evalMarks}
                      onChange={(e) => setEvalMarks(Number(e.target.value))}
                      className="w-20 bg-white dark:bg-[#2D2F31] border border-[#E0E0E0] dark:border-[#3C4043] rounded-lg px-2 py-1 text-xs font-bold"
                      placeholder="Marks"
                    />
                    <input
                      type="text"
                      value={evalFeedback}
                      onChange={(e) => setEvalFeedback(e.target.value)}
                      className="flex-1 bg-white dark:bg-[#2D2F31] border border-[#E0E0E0] dark:border-[#3C4043] rounded-lg px-2 py-1 text-xs"
                      placeholder="Teacher feedback..."
                    />
                  </div>
                  <Button size="sm" onClick={() => handleEvaluate(sub.id)} icon={<UserCheck className="w-3.5 h-3.5" />}>
                    Record Grade
                  </Button>
                </div>
              </Card>
            ))}
        </div>
      </Modal>
    </div>
  );
};
