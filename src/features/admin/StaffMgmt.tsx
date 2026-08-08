import React, { useState } from 'react';
import { useSupabase } from '../../hooks/useSupabase';
import { useToastContext } from '../../context/ToastContext';
import { SUBJECTS_LIST, CLASSES_LIST } from '../../config/constants';
import { Plus, Search, Briefcase, Mail, Phone, BookOpen, Award, Trash2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { Modal } from '../../components/ui/Modal';
import { Badge } from '../../components/ui/Badge';

export const StaffMgmt: React.FC = () => {
  const { staff, store } = useSupabase();
  const { showToast } = useToastContext();

  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const [formData, setFormData] = useState({
    employee_code: `EMP-${Math.floor(100 + Math.random() * 900)}`,
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    designation: 'PGT Mathematics',
    department: 'Mathematics',
    qualification: 'M.Sc, B.Ed',
    assigned_classes: ['Grade 10-A'],
    assigned_subjects: ['Mathematics'],
  });

  const filteredStaff = staff.filter((s) => {
    const name = `${s.first_name} ${s.last_name}`.toLowerCase();
    const query = searchQuery.toLowerCase();
    return name.includes(query) || s.designation.toLowerCase().includes(query) || s.employee_code.toLowerCase().includes(query);
  });

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.first_name || !formData.last_name || !formData.email) {
      showToast('Please fill in required fields (Name & Email)', 'warning');
      return;
    }

    store.addStaff({
      ...formData,
      joining_date: new Date().toISOString().split('T')[0],
      status: 'active',
      avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    });

    showToast(`Staff member ${formData.first_name} added to directory!`, 'success');
    setShowAddModal(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Remove ${name} from staff registry?`)) {
      store.deleteStaff(id);
      showToast(`${name} removed`, 'info');
    }
  };

  return (
    <div className="space-y-4">
      {/* Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-[#2D2F31] p-4 rounded-2xl border border-[#E0E0E0] dark:border-[#3C4043]">
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-[#0494F4]" />
            Faculty & Staff Directory
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {staff.length} Active Teaching & Administrative Staff Members
          </p>
        </div>
        <Button onClick={() => setShowAddModal(true)} icon={<Plus className="w-4 h-4" />}>
          Recruit New Teacher
        </Button>
      </div>

      {/* Search Input */}
      <Input
        placeholder="Search faculty by name, subject, designation or Emp Code..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        leftIcon={<Search className="w-4 h-4" />}
      />

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredStaff.map((tf) => (
          <Card key={tf.id} className="relative">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <img
                  src={tf.avatar_url || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250'}
                  alt={tf.first_name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#0494F4]/30 shrink-0"
                />
                <div>
                  <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100">
                    {tf.first_name} {tf.last_name}
                  </h3>
                  <p className="text-xs font-semibold text-[#0494F4]">{tf.designation}</p>
                </div>
              </div>
              <Badge status={tf.status}>{tf.status}</Badge>
            </div>

            <div className="space-y-1.5 text-xs text-gray-600 dark:text-gray-300 pt-2 border-t border-[#E0E0E0] dark:border-[#3C4043]">
              <p className="flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-gray-400" />
                <span>Code: {tf.employee_code} • {tf.qualification}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-gray-400" />
                <span>{tf.email}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-gray-400" />
                <span>{tf.phone}</span>
              </p>
              <p className="flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5 text-gray-400" />
                <span>Subjects: {tf.assigned_subjects.join(', ')}</span>
              </p>
            </div>

            <div className="flex items-center justify-between mt-3 pt-2 border-t border-dashed border-[#E0E0E0] dark:border-[#3C4043]">
              <div className="flex flex-wrap gap-1">
                {tf.assigned_classes.map((cls) => (
                  <span key={cls} className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                    {cls}
                  </span>
                ))}
              </div>
              <Button size="sm" variant="danger" onClick={() => handleDelete(tf.id, `${tf.first_name} ${tf.last_name}`)} icon={<Trash2 className="w-3.5 h-3.5" />}>
                Remove
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Recruitment Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Recruit New Faculty Member">
        <form onSubmit={handleAddStaff} className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <Input label="First Name" required value={formData.first_name} onChange={(e) => setFormData({ ...formData, first_name: e.target.value })} />
            <Input label="Last Name" required value={formData.last_name} onChange={(e) => setFormData({ ...formData, last_name: e.target.value })} />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Input label="Email Address" type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            <Input label="Phone Number" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Input label="Designation" value={formData.designation} onChange={(e) => setFormData({ ...formData, designation: e.target.value })} />
            <Input label="Qualification" value={formData.qualification} onChange={(e) => setFormData({ ...formData, qualification: e.target.value })} />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-300 mb-1">
              Primary Subject Specialization
            </label>
            <select
              value={formData.assigned_subjects[0]}
              onChange={(e) => setFormData({ ...formData, assigned_subjects: [e.target.value] })}
              className="w-full bg-gray-50 dark:bg-[#202124] text-gray-900 dark:text-gray-100 border border-[#E0E0E0] dark:border-[#3C4043] rounded-xl px-3 py-2 text-sm"
            >
              {SUBJECTS_LIST.map((sb) => (
                <option key={sb} value={sb}>
                  {sb}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-[#E0E0E0] dark:border-[#3C4043]">
            <Button type="button" variant="outline" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button type="submit">Confirm Staff Hiring</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
