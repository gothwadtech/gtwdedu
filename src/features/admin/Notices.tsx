import React, { useState } from 'react';
import { useSupabase } from '../../hooks/useSupabase';
import { useToastContext } from '../../context/ToastContext';
import { formatDate } from '../../lib/utils';
import { Megaphone, Plus, Pin, Trash2, Calendar, User, Tag } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { Modal } from '../../components/ui/Modal';
import { Badge } from '../../components/ui/Badge';

export const Notices: React.FC = () => {
  const { notices, store } = useSupabase();
  const { showToast } = useToastContext();

  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'academic' as 'academic' | 'event' | 'urgent' | 'exam' | 'general',
    target_audience: 'all' as 'all' | 'students' | 'teachers' | 'parents',
    is_pinned: false,
  });

  const filteredNotices = notices.filter(
    (n) => categoryFilter === 'all' || n.category === categoryFilter
  );

  const handlePublishNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      showToast('Please enter title and content for the circular', 'warning');
      return;
    }

    store.addNotice({
      ...formData,
      posted_by: 'School Administration',
      posted_at: new Date().toISOString().split('T')[0],
    });

    showToast('Official circular broadcasted successfully!', 'success');
    setShowAddModal(false);
    setFormData({
      title: '',
      content: '',
      category: 'academic',
      target_audience: 'all',
      is_pinned: false,
    });
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Delete circular "${title}"?`)) {
      store.deleteNotice(id);
      showToast('Notice deleted', 'info');
    }
  };

  return (
    <div className="space-y-4">
      {/* Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-[#2D2F31] p-4 rounded-2xl border border-[#E0E0E0] dark:border-[#3C4043]">
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-[#0494F4]" />
            Broadcast Official Circulars & Announcements
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Publish urgent updates, exam notifications, and school events to parents, teachers, and students.
          </p>
        </div>
        <Button onClick={() => setShowAddModal(true)} icon={<Plus className="w-4 h-4" />}>
          Publish New Circular
        </Button>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {['all', 'academic', 'event', 'exam', 'urgent', 'general'].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap border ${
              categoryFilter === cat
                ? 'bg-[#0494F4] text-white border-[#0494F4]'
                : 'bg-white dark:bg-[#2D2F31] border-[#E0E0E0] dark:border-[#3C4043] text-gray-600 dark:text-gray-300 hover:border-[#0494F4]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Notices Stream */}
      <div className="space-y-3">
        {filteredNotices.map((not) => (
          <Card key={not.id} className="relative">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2">
                {not.is_pinned && <Pin className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />}
                <h3 className="font-bold text-base text-gray-900 dark:text-gray-100">{not.title}</h3>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Badge status={not.category === 'urgent' ? 'absent' : 'present'}>{not.category}</Badge>
                <button
                  onClick={() => handleDelete(not.id, not.title)}
                  className="p-1 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mb-3">{not.content}</p>

            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-gray-400 dark:text-gray-500 pt-2 border-t border-[#E0E0E0] dark:border-[#3C4043]">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5" /> {not.posted_by}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> {formatDate(not.posted_at)}
                </span>
              </div>
              <span className="uppercase font-extrabold text-[10px] px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                Audience: {not.target_audience}
              </span>
            </div>
          </Card>
        ))}
      </div>

      {/* Create Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Publish Official School Notice">
        <form onSubmit={handlePublishNotice} className="space-y-3">
          <Input
            label="Notice Title"
            required
            placeholder="e.g. Annual Sports Meet 2026 Registration"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-300 mb-1">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
              className="w-full bg-gray-50 dark:bg-[#202124] text-gray-900 dark:text-gray-100 border border-[#E0E0E0] dark:border-[#3C4043] rounded-xl px-3 py-2 text-sm"
            >
              <option value="academic">Academic</option>
              <option value="exam">Examination</option>
              <option value="event">Event & Cultural</option>
              <option value="urgent">Urgent Circular</option>
              <option value="general">General Announcement</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-300 mb-1">
              Circular Content
            </label>
            <textarea
              required
              rows={4}
              placeholder="Write official message details here..."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full bg-gray-50 dark:bg-[#202124] text-gray-900 dark:text-gray-100 border border-[#E0E0E0] dark:border-[#3C4043] rounded-xl p-3 text-sm focus:border-[#0494F4] focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_pinned"
              checked={formData.is_pinned}
              onChange={(e) => setFormData({ ...formData, is_pinned: e.target.checked })}
              className="rounded text-[#0494F4]"
            />
            <label htmlFor="is_pinned" className="text-xs font-semibold text-gray-700 dark:text-gray-200">
              Pin to top of student & parent notice boards
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-[#E0E0E0] dark:border-[#3C4043]">
            <Button type="button" variant="outline" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button type="submit">Broadcast Notice</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
